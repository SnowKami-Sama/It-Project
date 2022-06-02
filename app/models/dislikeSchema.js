const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dislikeSchema = new Schema({
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

const Dislike = mongoose.model('Dislike',dislikeSchema,'Dislikes');

module.exports = Dislike;