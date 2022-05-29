const mongoose = require("mongoose");
const dotEnv = require('dotenv');
dotEnv.config();
mongoose.Promise = global.Promise;
const dbUrl = process.env.MONGOLAB_URI;
const connect = async () => {
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
    const db = mongoose.connection;
    db.on("error", () => {
        console.log("could not connect");
    });
    db.once("open", () => {
        console.log("> Successfully connected to database");
    });
};
module.exports = { connect };