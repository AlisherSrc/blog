const mongoose = require('mongoose');
const {Schema,model} = mongoose;

const PostSchema = new Schema({
    title: {type:String,required: true}
})

