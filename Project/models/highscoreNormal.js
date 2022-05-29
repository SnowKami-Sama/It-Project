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

const HighscoreNormal = mongoose.model('HighscoreNormal',highscoreSchema,'HighscoresNormal');

module.exports = HighscoreNormal;