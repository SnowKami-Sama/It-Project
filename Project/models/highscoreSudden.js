const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const highscoreSchema = new Schema({
    playerName: {
        type: "string",
        required: true
    },
    highscore: {
        type: "string",
        required: true
    }
},{capped : true, max : 5});

const HighscoreSudden = mongoose.model('HighscoreSudden',highscoreSchema,'HighscoresSudden');

module.exports = HighscoreSudden;