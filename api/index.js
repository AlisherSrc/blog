require('dotenv').config();

const cors = require("cors");
const mongoose = require("mongoose");
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();



app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(express.json());
app.use(cookieParser());


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
            password:hashedPassword
        });
        res.json(userDoc);
    } catch (error) {
        res.status(400).json(error);
    }

})

app.post('/login', async (req,res) => {
    const { username, password } = req.body;

    try {
        const userDoc = await User.findOne({username});
        const passOk = bcrypt.compareSync(password,userDoc.password);
        if(passOk){
            jwt.sign({username,id:userDoc._id},secret,{},(err,token) => {
                if(err) throw err;
                res.cookie("token",token).json({
                    id:userDoc._id,
                    username,
                });
            })
        }else{
            res.status(400).json("Wrong credentials.")
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

app.get("/profile",(req,res) => {
    const {token} = req.cookies;
    jwt.verify(token,secret,{},(err,info) => {
        if(err) throw err;
        res.json(info);
    })
})

app.post("/logout",(req,res) => {
    res.cookie("token",'').json("ok");
})


app.listen(4000)