const cors = require("cors");
const mongoose = require("mongoose");
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const express = require("express");
const app = express();




app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(express.json());

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
            const secret = "dklsafnlsandfDKLA#Nrkfenkldskmfn3isadasdasklfj4l3j3l#LKIUrifJ#%*#P$IPkdjsglkvsdmkl"
            jwt.sign({username,id:userDoc._id},secret,{},(err,token) => {
                if(err) throw err;
                res.cookie("token",token).json('ok');
            })
        }else{
            res.status(400).json("Wrong credentials.")
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
})

app.listen(4000)