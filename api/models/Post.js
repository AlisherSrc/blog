const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const PostSchema = new Schema({
    title : {type: String},
    description: {type: String},
    content: {type: String},
    cover: {type: String}
},{
    timestamps: true,
});

const PostModel = model("Post",PostSchema);

module.exports = PostModel;
