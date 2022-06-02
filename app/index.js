"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var ejs = require("ejs");
var html = require("html-entities");
var mongoose = require("mongoose");
var path = require('path');
var ObjectId = require('mongodb').ObjectId;
var db = require('./assets/public/js/db.js');
var HighscoreSudden = require('./models/highscoreSudden');
var HighscoreNormal = require('./models/highscoreNormal');
var Dislike = require('./models/dislikeSchema');
var Like = require('./models/likeSchema');
var allDislikes = [];
var allLikes = [];
var content = "";
var contentSudden = "";
var normalScores = [];
var suddenScores = [];
var titleSudden = "-SUDDEN DEATH-";
var title = "-NORMAL MODE-";
var lastSuddenScore = 0;
var lastNormalScore = 0;
var fetchAllLikes = [];
var fetchScoreBoard = function (path) { return __awaiter(void 0, void 0, void 0, function () {
    var normaldocs, suddendocs, i, i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, HighscoreNormal.find().sort({ "highscore": -1 }).exec()];
            case 1:
                normaldocs = _a.sent();
                return [4 /*yield*/, HighscoreSudden.find().sort({ "highscore": -1 }).exec()];
            case 2:
                suddendocs = _a.sent();
                normalScores = normaldocs;
                suddenScores = suddendocs;
                content = "";
                for (i = 0; i < normalScores.length; i++) {
                    content += "<li class='score'><b>".concat(normalScores[i].playerName, " ").concat(normalScores[i].highscore, "</b></li>");
                }
                contentSudden = "";
                for (i = 0; i < suddenScores.length; i++) {
                    contentSudden += "<li class='score'><b>".concat(suddenScores[i].playerName, " ").concat(suddenScores[i].highscore, "</b></li>");
                }
                if (!(path == "/quiz")) return [3 /*break*/, 3];
                lastSuddenScore = 0;
                lastNormalScore = 0;
                if (suddenScores.length == 5) {
                    lastSuddenScore = suddenScores[suddenScores.length - 1].highscore;
                }
                if (suddenScores.length == 5) {
                    lastNormalScore = normalScores[normalScores.length - 1].highscore;
                }
                return [3 /*break*/, 7];
            case 3:
                if (!(path == "/blacklist")) return [3 /*break*/, 5];
                return [4 /*yield*/, mongoose.connection.collection('Dislikes').find({}).toArray()];
            case 4:
                fetchAllLikes = _a.sent();
                allDislikes = fetchAllLikes;
                return [3 /*break*/, 7];
            case 5:
                if (!(path == "/favorites")) return [3 /*break*/, 7];
                return [4 /*yield*/, mongoose.connection.collection('Likes').find({}).toArray()];
            case 6:
                fetchAllLikes = _a.sent();
                allLikes = fetchAllLikes;
                _a.label = 7;
            case 7: return [2 /*return*/];
        }
    });
}); };
app.use(express.static(path.join(__dirname, "/assets/public/")));
app.set("view engine", "ejs"); // EJS als view engine
app.set("port", 3000);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
app.get("/index", function (req, res) {
    res.render("landing", {});
});
app.route("/quiz")
    .get(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchScoreBoard(req.route.path)];
                case 1:
                    _a.sent();
                    res.render("quiz", { content: content, contentSudden: contentSudden, titleSudden: titleSudden, title: title, lastNormalScore: lastNormalScore, lastSuddenScore: lastSuddenScore });
                    return [2 /*return*/];
            }
        });
    });
})
    .post(function (req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                fetchScoreBoard(req.route.path);
                res.send({ response: contentSudden, titleSudden: titleSudden, content: content, title: title });
            }
            catch (e) {
                console.log(e);
            }
            return [2 /*return*/];
        });
    });
});
app.get("/blacklist", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchScoreBoard(req.route.path)];
            case 1:
                _a.sent();
                res.render("blacklist", { content: content, contentSudden: contentSudden, titleSudden: titleSudden, title: title, allDislikes: allDislikes });
                return [2 /*return*/];
        }
    });
}); });
app.post("/blacklist", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetchScoreBoard(req.route.path)];
            case 1:
                _a.sent();
                res.send({ response: contentSudden, titleSudden: titleSudden, content: content, title: title });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get("/favorites", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchScoreBoard(req.route.path)];
            case 1:
                _a.sent();
                res.render("favorite", { content: content, contentSudden: contentSudden, titleSudden: titleSudden, title: title, allLikes: allLikes });
                return [2 /*return*/];
        }
    });
}); });
app.post("/favorites", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, fetchScoreBoard(req.route.path)];
            case 1:
                _a.sent();
                res.send({ response: contentSudden, titleSudden: titleSudden, content: content, title: title });
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                console.log(e_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post("/deletefav", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idToDelete;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idToDelete = req.body.id;
                return [4 /*yield*/, mongoose.connection.collection('Likes').deleteOne({ id: idToDelete })];
            case 1:
                _a.sent();
                return [4 /*yield*/, mongoose.connection.collection('Likes').find({}).toArray()];
            case 2:
                allLikes = _a.sent();
                res.send({ response: { idToDelete: idToDelete, allLikes: allLikes } });
                return [2 /*return*/];
        }
    });
}); });
app.post("/delete", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idToDelete;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idToDelete = req.body.id;
                return [4 /*yield*/, mongoose.connection.collection('Dislikes').deleteOne({ id: idToDelete })];
            case 1:
                _a.sent();
                return [4 /*yield*/, mongoose.connection.collection('Dislikes').find({}).toArray()];
            case 2:
                allDislikes = _a.sent();
                res.send({ response: { idToDelete: idToDelete, allDislikes: allDislikes } });
                return [2 /*return*/];
        }
    });
}); });
app.post("/quizNormal", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var myScore, name, found, normalScores, highscore, i, normalScore;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                myScore = req.body.score;
                name = req.body.name.toUpperCase();
                found = false;
                if (!(req.body.name.match(/^([A-z]{3})$/))) {
                    res.redirect('/quiz');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, mongoose.connection.collection('HighscoresNormal').find({}).toArray()];
            case 1:
                normalScores = _a.sent();
                if (!(normalScores.length < 5)) return [3 /*break*/, 2];
                highscore = new HighscoreNormal({
                    playerName: html.encode(name),
                    highscore: myScore
                });
                highscore.save()
                    .catch(function (err) {
                    console.log(err);
                });
                return [3 /*break*/, 6];
            case 2:
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < normalScores.length)) return [3 /*break*/, 6];
                normalScore = normalScores[i];
                if (!(parseInt(normalScore.highscore) < parseInt(myScore) && found == false)) return [3 /*break*/, 5];
                return [4 /*yield*/, mongoose.connection.collection('HighscoresNormal').updateOne({ _id: normalScores[i]._id }, { $set: { playerName: name, highscore: myScore } })];
            case 4:
                _a.sent();
                found = true;
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6:
                res.redirect('/quiz');
                return [2 /*return*/];
        }
    });
}); });
app.post("/quizSudden", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var myScore, name, found, suddenScores, highscore, i, suddenScore;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                myScore = req.body.score;
                name = req.body.name.toUpperCase();
                found = false;
                if (!(req.body.name.match(/^([A-z]{3})$/))) {
                    res.redirect('/quiz');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, mongoose.connection.collection('HighscoresSudden').find({}).toArray()];
            case 1:
                suddenScores = _a.sent();
                if (!(suddenScores.length < 5)) return [3 /*break*/, 2];
                highscore = new HighscoreSudden({
                    playerName: html.encode(name),
                    highscore: myScore
                });
                highscore.save()
                    .catch(function (err) {
                    console.log(err);
                });
                return [3 /*break*/, 6];
            case 2:
                i = 0;
                _a.label = 3;
            case 3:
                if (!(i < suddenScores.length)) return [3 /*break*/, 6];
                suddenScore = suddenScores[i];
                if (!(parseInt(suddenScore.highscore) < parseInt(myScore) && found == false)) return [3 /*break*/, 5];
                return [4 /*yield*/, mongoose.connection.collection('HighscoresSudden').updateOne({ _id: suddenScores[i]._id }, { $set: { playerName: name, highscore: myScore } })];
            case 4:
                _a.sent();
                found = true;
                _a.label = 5;
            case 5:
                i++;
                return [3 /*break*/, 3];
            case 6:
                res.redirect('/quiz');
                return [2 /*return*/];
        }
    });
}); });
app.post("/like", function (req, res) {
    var main = function () { return __awaiter(void 0, void 0, void 0, function () {
        var quoteId, content, character, added, fetchAllLikes, lookforLike, lookforDislike, like;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    quoteId = req.body.id;
                    content = req.body.content;
                    character = req.body.character;
                    added = false;
                    return [4 /*yield*/, mongoose.connection.collection('Likes').find({}).toArray()];
                case 1:
                    fetchAllLikes = _a.sent();
                    return [4 /*yield*/, mongoose.connection.collection('Likes').find({ id: quoteId }).toArray()];
                case 2:
                    lookforLike = _a.sent();
                    return [4 /*yield*/, mongoose.connection.collection('Dislikes').find({ id: quoteId }).toArray()];
                case 3:
                    lookforDislike = _a.sent();
                    if (lookforLike.length == 0 && lookforDislike.length == 0) {
                        like = new Like({
                            id: quoteId,
                            content: content,
                            character: character
                        });
                        like.save()
                            .catch(function (err) {
                            console.log(err);
                        });
                        added = true;
                    }
                    allLikes = fetchAllLikes;
                    res.send({ response: { quoteId: quoteId, added: added }, allLikes: allLikes });
                    return [2 /*return*/];
            }
        });
    }); };
    try {
        main();
    }
    catch (e) {
        console.log(e);
    }
});
app.post("/dislike", function (req, res) {
    var main = function () { return __awaiter(void 0, void 0, void 0, function () {
        var quoteId, content, character, added, fetchAllLikes, lookforDislike, lookforLike, dislike;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    quoteId = req.body.id;
                    content = req.body.content;
                    character = req.body.character;
                    added = false;
                    return [4 /*yield*/, mongoose.connection.collection('Dislikes').find({}).toArray()];
                case 1:
                    fetchAllLikes = _a.sent();
                    return [4 /*yield*/, mongoose.connection.collection('Dislikes').find({ id: quoteId }).toArray()];
                case 2:
                    lookforDislike = _a.sent();
                    return [4 /*yield*/, mongoose.connection.collection('Likes').find({ id: quoteId }).toArray()];
                case 3:
                    lookforLike = _a.sent();
                    if (lookforLike.length == 0 && lookforDislike.length == 0) {
                        dislike = new Dislike({
                            id: quoteId,
                            content: content,
                            character: character
                        });
                        dislike.save()
                            .catch(function (err) {
                            console.log(err);
                        });
                        added = true;
                    }
                    allDislikes = fetchAllLikes;
                    res.send({ response: { quoteId: quoteId, added: added }, allDislikes: allDislikes });
                    return [2 /*return*/];
            }
        });
    }); };
    try {
        main();
    }
    catch (e) {
        console.log(e);
    }
});
app.post("/fetch", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fetchAllDisLikes;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, mongoose.connection.collection('Dislikes').find({}).toArray()];
            case 1:
                fetchAllDisLikes = _a.sent();
                if (fetchAllDisLikes.length != 0) {
                    allDislikes = fetchAllDisLikes;
                }
                res.send({ response: allDislikes });
                return [2 /*return*/];
        }
    });
}); });
app.post('/download', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var content;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                content = "";
                return [4 /*yield*/, mongoose.connection.collection('Likes').find({}).toArray()];
            case 1:
                allLikes = _a.sent();
                if (allLikes.length == 0) {
                    content = "Wow such empty";
                }
                else {
                    allLikes.forEach(function (like) {
                        content += "".concat(like.content, " -  ").concat(like.character, "\n");
                    });
                }
                res.status(200)
                    .attachment("favorites.txt")
                    .send(content);
                return [2 /*return*/];
        }
    });
}); });
try {
    db.connect()
        .then(function () {
        app.set('port', (process.env.PORT || 3000));
        app.listen(app.get('port'), function () { });
        console.log("[server] http://localhost:" + app.get("port") + "/index");
    });
}
catch (e) {
    console.log(e);
}
app.get("/header", function (req, res) {
    res.render("header", {});
});
app.get("/*", function (req, res) {
    var url = req.originalUrl;
    res.render("error", { url: url });
});
