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

const uploadMiddleware = multer({ dest: 'uploads/' });
const allowedOrigins = process.env.CORS_ORIGINS.split(',');

app.use(cors({
    credentials: true,
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

// app.use(cors({ credentials: true, origin: "https://alishersk-blog.web.app" }));
app.use(express.json());
app.use(cookieParser());
// for responding with files without creating an endpoint for it
app.use('/uploads', express.static(__dirname + '/uploads'));

const secret = process.env.JWT_SECRET;

mongoose.connect('mongodb+srv://blog:yIt8sO9k8UTVzXjB@cluster0.cz99cmu.mongodb.net/?retryWrites=true&w=majority')

app.post('/register', async (req, res) => {
    const { username, password } = req.body;

    const saltRounds = 10; // or another appropriate number
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        const userDoc = await User.create({
            username,
            password: hashedPassword
        });
        res.json(userDoc);
    } catch (error) {
        res.status(400).json(error);
    }

})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const userDoc = await User.findOne({ username });
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
                if (err) throw err;
                res.cookie("token", token, {
                    sameSite: 'none', // Important for cross-site cookies
                    secure: true,    // Required when sameSite='none'
                    httpOnly: true   // Recommended for security (prevents JavaScript access to the cookie)
                }).json({
                    id: userDoc._id,
                    username,
                });
            });
        } else {
            res.status(400).json("Wrong credentials.")
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err;
        res.json(info);
    })
})

app.post("/logout", (req, res) => {
    res.cookie("token", '').json("ok");
})

app.post("/post", uploadMiddleware.single('file'), async (req, res) => {

    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);


    // Done with file

    const { token } = req.cookies;

    if (!token) {
        return res.status(401).send("No token provided.");
    }
    
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
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
            author: info.id,
        });

        res.json(postDoc);
    });
})

app.get('/post', async (req, res) => {
    const posts = await Post.find().populate('author', ['username']).sort({ createdAt: -1 });

    res.json(posts);
})

app.get('/post/:id', async (req, res) => {
    const { id } = req.params;

    const post = await Post.findById(id).populate('author', ['username']);

    res.json(post);
})

app.put('/post/:id', uploadMiddleware.single('file'), async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split(".");
        const ext = parts[parts.length - 1];
        newPath = path + "." + ext;
        fs.renameSync(path, newPath);
    }
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const {
            title,
            description,
            content,
            id
        } = req.body;

        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json("You are not the author")
        }

        await postDoc.updateOne({
            title,
            description,
            content,
            cover: newPath ? newPath : postDoc.cover,
        })

        res.json(postDoc);
    });
})

app.delete('/post/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json('Post not found');
        }
        res.json("Post deleted succesfully")
    } catch (error) {
        res.status(500).json("Error deleting post");
    }
})

app.listen(4000)