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
exports.__esModule = true;
var fetch = require("node-fetch");
var readline = require("readline-sync");
var headersList = [{
        "Accept": "application/json",
        "Authorization": "Bearer W-z_z66pT1CTDgHxDGIg"
    },
    {
        "Accept": "application/json",
        "Authorization": "Bearer v6tlGZ4p2DhxSEV0vmWh"
    },
    {
        "Accept": "application/json",
        "Authorization": "Bearer g8IO4K_w3cUYcXWJJ3Y5"
    },
    {
        "Accept": "application/json",
        "Authorization": "Bearer jAbtFiZwc1r3MvkGseSt"
    },
    {
        "Accept": "application/json",
        "Authorization": "Bearer XaGaBR8uAccCHCQrr-7Q"
    }];
var quiz = function () { return __awaiter(void 0, void 0, void 0, function () {
    var rawQuotes, quotes, quote, rawCharacters, characters, character, rawCharactersRandom, charactersRand, characterB, characterC, characterArray, shuffledArray, i, keuze, callsLeft;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('https://the-one-api.dev/v2/quote', { headers: headersList[0] })];
            case 1:
                rawQuotes = _a.sent();
                return [4 /*yield*/, rawQuotes.json()];
            case 2:
                quotes = _a.sent();
                quote = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
                console.log(quote.dialog);
                return [4 /*yield*/, fetch('https://the-one-api.dev/v2/character/' + quote.character, { headers: headersList[1] })];
            case 3:
                rawCharacters = _a.sent();
                return [4 /*yield*/, rawCharacters.json()];
            case 4:
                characters = _a.sent();
                character = characters.docs[0];
                return [4 /*yield*/, fetch('https://the-one-api.dev/v2/character', { headers: headersList[2] })];
            case 5:
                rawCharactersRandom = _a.sent();
                return [4 /*yield*/, rawCharactersRandom.json()];
            case 6:
                charactersRand = _a.sent();
                do {
                    characterB = charactersRand.docs[Math.floor(Math.random() * charactersRand.docs.length)];
                } while (character.name == characterB.name);
                do {
                    characterC = charactersRand.docs[Math.floor(Math.random() * charactersRand.docs.length)];
                } while (characterB.name == characterC.name);
                characterArray = [character.name, characterB.name, characterC.name];
                shuffledArray = shuffle(characterArray);
                for (i = 0; i < shuffledArray.length; i++) {
                    console.log(i + 1 + ". " + shuffledArray[i]);
                }
                keuze = parseInt(readline.question("Kies een antwoord (getal 1 tot 3): "));
                switch (keuze) {
                    case 1:
                        if (shuffledArray[0] == character.name) {
                            console.log("Proficiat, juist antwoord!");
                        }
                        else {
                            console.log("Fout antwoord!");
                        }
                        break;
                    case 2:
                        if (shuffledArray[1] == character.name) {
                            console.log("Proficiat, juist antwoord!");
                        }
                        else {
                            console.log("Fout antwoord!");
                        }
                        break;
                    case 3:
                        if (shuffledArray[2] == character.name) {
                            console.log("Proficiat, juist antwoord!");
                        }
                        else {
                            console.log("Fout antwoord!");
                        }
                        break;
                    default:
                        console.log('case broken');
                        break;
                }
                callsLeft = rawCharacters.headers.get("X-RateLimit-Remaining");
                console.log("Calls left: " + callsLeft);
                return [2 /*return*/];
        }
    });
}); };
function shuffle(array) {
    var max = array.length;
    var i;
    var j;
    while (max) {
        j = Math.floor(Math.random() * max--);
        i = array[max];
        array[max] = array[j];
        array[j] = i;
    }
    return array;
}
quiz();
