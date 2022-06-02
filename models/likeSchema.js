const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    id: {
        type: "string",
        required: true
    },
    content: {
        type: "string",
        required: true
    },
    character: {
        type: "string",
        required: true
    }
});

const Like = mongoose.model('Like',likeSchema,'Likes');

module.exports = Like;