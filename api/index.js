require('dotenv').config();

const User = require('./models/User');
const Post = require('./models/Post');

const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const multer = require("multer");
const fs = require('fs');
const { body, validationResult } = require("express-validator");

console.log("Lox")
app.use(cors({
    origin: "https://alishersk-blog.web.app", // Replace with your actual frontend host
    credentials: true, // This allows cookies to be sent with requests
}));

const requireAdmin = async (req, res, next) => {
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jwt.verify(token, secret);
        const user = await User.findById(decoded.id);
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Requires admin role" });
        }
        req.user = user; // Store the user in the request for further use
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};


// Check data types
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = new Set(['image/jpeg', 'image/png', 'image/gif']);
    if (allowedMimeTypes.has(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'), false);
    }
};

const uploadMiddleware = multer({
    dest: 'uploads/',
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter: fileFilter
});

app.use(express.json());
app.use(cookieParser());
// for responding with files without creating an endpoint for it
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use((err, req, res, next) => {
    console.error(err.stack);  // Log error stack for debugging
    const status = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ error: { message, status } });
});


const secret = process.env.JWT_SECRET;
console.log("Lox2")

mongoose.connect('mongodb+srv://blog:yIt8sO9k8UTVzXjB@cluster0.cz99cmu.mongodb.net/?retryWrites=true&w=majority');
// mongoose.connect('mongodb+srv://blog:yIt8sO9k8UTVzXjB@cluster0.cz99cmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

app.post('/register',// Validation middleware
    body('username').isAlphanumeric().withMessage('Username must be alphanumeric'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    async (req, res) => {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { username, password } = req.body;

        const saltRounds = 10; // or another appropriate number
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPassword = bcrypt.hashSync(password, salt);

        try {
            const userDoc = await User.create({
                username,
                password: hashedPassword,
                role: "user"
            });
            res.json(userDoc);
        } catch (error) {
            res.status(400).json(error);
        }
    });

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        if(!username || !password) return res.status(500).json({message: "No username or password was provided"})
        const userDoc = await User.findOne({ username });
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Error generating token" });
                }
                res.cookie("token", token, {
                    httpOnly: true,
                    // secure: true, // set to true if using https
                    sameSite: 'strict', // can use 'lax' or 'strict'
                    expires: new Date(Date.now() + 3600000) // cookie will be removed after 1 hour
                }).json({
                    id: userDoc._id,
                    username,
                    role: userDoc.role
                });
            });
        } else {
            res.status(400).json("Wrong credentials.");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while processing your request." });
    }
});
console.log("Lox3")

app.get("/profile", (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) {
            return res.status(401).send("Invalid token.");
        }
        res.json(info);
    });
});

app.post("/logout", (req, res) => {
    res.clearCookie("token", { path: '/' });
    res.status(200).json("ok");
});

app.post("/post", uploadMiddleware.single('file'), async (req, res) => {

    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);

    // Done with file

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) {
            return res.status(401).send("Invalid token.");
        }

        const {
            title,
            description,
            content
        } = req.body;

        const postDoc = await Post.create({
            title,
            description,
            content,
            cover: newPath,
            author: info.id
        });

        res.json(postDoc);
    });
});

app.get('/post', async (req, res) => {
    const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 });

    res.json(posts);
});

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id).populate('author', ['username']);

    res.json(post);
});

app.put('/post/:id', uploadMiddleware.single('file'), async (req, res) => {
    // Define newPath outside of the conditional scope so it can be used later.
    let newPath = null;

    // Extract id from req.params, not req.body
    const { id } = req.params;

    // Process the file if it exists
    if (req.file) {
        const { originalname, path } = req.file;
        try {
            const parts = originalname.split(".");
            const ext = parts[parts.length - 1];
            newPath = `${path}.${ext}`;
            fs.renameSync(path, newPath);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error processing file upload" });
        }
    }

    // Token handling
    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    // Secret should be defined or come from environment variables
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error('JWT secret is not set.');
        return res.status(500).json({ message: "Server misconfiguration" });
    }

    jwt.verify(token, secret, {}, async (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ message: "Invalid token" });
        }

        try {
            const user = await User.findById(decodedToken.id);
            if (!user) {
                return res.status(401).json({ message: "User not found" });
            }

            const postDoc = await Post.findById(id);
            if (!postDoc) {
                return res.status(404).json({ message: "Post not found" });
            }

            // Check if the user is the author or an admin
            const isAuthor = postDoc.author.equals(user._id);
            const isAdmin = user.role === 'admin';

            if (!isAuthor && !isAdmin) {
                return res.status(403).json({ message: "You are not authorized to edit this post" });
            }

            // Update the post
            const { title, description, content } = req.body;
            const updateData = {
                title,
                description,
                content,
                cover: newPath || postDoc.cover
            };

            // Validate your data before updating
            // If there's a validation function, call it here
            // ...

            await Post.findByIdAndUpdate(id, updateData, { new: true });

            res.json(updateData); // It's often good practice to return the updated document
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error during the post update" });
        }
    });
});

console.log("Lox4")

app.delete('/post/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json('Post not found');
        }
        res.json("Post deleted succesfully");
    } catch (error) {
        res.status(500).json("Error deleting post");
    }
});


console.log("Lox5")

app.listen(4000);