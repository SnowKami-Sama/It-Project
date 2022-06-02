import { stringify } from "querystring";

const express = require("express");
const app = express();
const ejs = require("ejs");
const html = require("html-entities");
const mongoose = require("mongoose");

const ObjectId = require('mongodb').ObjectId;
const db = require('./assets/public/js/db.js');
const HighscoreSudden : any = require('./models/highscoreSudden');
const HighscoreNormal : any = require('./models/highscoreNormal');
const Dislike : any = require('./models/dislikeSchema');
const Like : any = require('./models/likeSchema');
let allDislikes : Array<string> = [];
let allLikes : Array<string> = [];
let content = "";
let contentSudden = "";
let normalScores : any = [];
let suddenScores : any = [];
let titleSudden : string = "-SUDDEN DEATH-";
let title : string = "-NORMAL MODE-";
let lastSuddenScore = 0;
let lastNormalScore = 0;
let fetchAllLikes : any = [];

const fetchScoreBoard = async(path:string) => {
  const normaldocs = await HighscoreNormal.find().sort({"highscore": -1}).exec();
  const suddendocs = await HighscoreSudden.find().sort({"highscore": -1}).exec();
  normalScores = normaldocs
  suddenScores = suddendocs
  
    content = "";
    for (let i = 0; i < normalScores.length; i++) {
      content+=`<li class='score'><b>${normalScores[i].playerName} ${normalScores[i].highscore}</b></li>`
    }
    contentSudden = "";
    for (let i = 0; i < suddenScores.length; i++) {
      contentSudden+=`<li class='score'><b>${suddenScores[i].playerName} ${suddenScores[i].highscore}</b></li>`
    }
    if(path == "/quiz" ){
      lastSuddenScore = 0;
      lastNormalScore = 0;
      if(suddenScores.length == 5){
        lastSuddenScore = suddenScores[suddenScores.length - 1].highscore;
      }
      if(suddenScores.length == 5){
        lastNormalScore = normalScores[normalScores.length - 1].highscore;
      }
    }
    else if(path == "/blacklist" ){
      fetchAllLikes = await mongoose.connection.collection('Dislikes').find({}).toArray();
  
      allDislikes = fetchAllLikes;
    }
    else if(path == "/favorites" ){
      fetchAllLikes = await mongoose.connection.collection('Likes').find({}).toArray();
  
      allLikes = fetchAllLikes;
    }
}

app.use(express.static(__dirname + "/assets/public/"));

app.set("view engine", "ejs"); // EJS als view engine
app.set("port", 3000);
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended:true}));

app.get("/index", (req: any, res: any) => {
  res.render("landing", {});
});

app.route("/quiz")
.get(async function(req: any, res: any){
    
    await fetchScoreBoard(req.route.path);
    
    res.render("quiz", {content,contentSudden,titleSudden,title,lastNormalScore,lastSuddenScore});
 
})
.post(async function(req: any, res: any){
  try{
    fetchScoreBoard(req.route.path);
    res.send({response:contentSudden,titleSudden,content,title});
  }
  catch(e) {
    console.log(e);
  }
 
});
app.get("/blacklist", async(req: any, res: any) => {
  await fetchScoreBoard(req.route.path);
  res.render("blacklist", {content,contentSudden,titleSudden,title,allDislikes});
})
app.post("/blacklist", async(req: any, res: any) => {
try{
  await fetchScoreBoard(req.route.path);
  res.send({response:contentSudden,titleSudden,content,title});
}
catch(e) {
  console.log(e);
}

});
app.get("/favorites", async(req: any, res: any) => {
  await fetchScoreBoard(req.route.path);
  res.render("favorite", {content,contentSudden,titleSudden,title,allLikes});

})
app.post("/favorites", async(req: any, res: any) => {
try{
  await fetchScoreBoard(req.route.path);
  res.send({response:contentSudden,titleSudden,content,title});
}
catch(e) {
  console.log(e);
}

});
app.post("/deletefav", async (req: any, res: any) => {
  let idToDelete = req.body.id;
  await mongoose.connection.collection('Likes').deleteOne({id:idToDelete});
 
  allLikes = await mongoose.connection.collection('Likes').find({}).toArray();
  res.send({response:{idToDelete,allLikes}});
});
app.post("/delete", async (req: any, res: any) => {
  let idToDelete = req.body.id;
  await mongoose.connection.collection('Dislikes').deleteOne({id:idToDelete});
 
  allDislikes = await mongoose.connection.collection('Dislikes').find({}).toArray();
  res.send({response:{idToDelete,allDislikes}});
});
app.post("/quizNormal", async (req: any, res: any) => {
  
  let myScore = req.body.score;
  let name = req.body.name.toUpperCase();
  let found = false;
  
  if(!(req.body.name.match(/^([A-z]{3})$/))){
    res.redirect('/quiz');
    return;
  }
    let normalScores = await mongoose.connection.collection('HighscoresNormal').find({}).toArray();

    if(normalScores.length < 5){
      const highscore = new HighscoreNormal({
        playerName: html.encode(name),
        highscore: myScore
      })
      highscore.save()
      .catch((err : any) => {
        console.log(err);
      })
    }
    else{
      for (let i = 0; i < normalScores.length; i++) {
        const normalScore = normalScores[i];
        if(parseInt(normalScore.highscore) < parseInt(myScore) && found == false){
            await mongoose.connection.collection('HighscoresNormal').updateOne({_id:normalScores[i]._id},{$set: {playerName: name, highscore: myScore }});
            found = true;
        }
      }
      
    }
      res.redirect('/quiz');
  
});

app.post("/quizSudden", async(req: any, res: any) => {
  
  let myScore = req.body.score;
  let name = req.body.name.toUpperCase();
  let found = false;
  
  if(!(req.body.name.match(/^([A-z]{3})$/))){
    res.redirect('/quiz');
    return;
  }
    let suddenScores = await mongoose.connection.collection('HighscoresSudden').find({}).toArray();

    if(suddenScores.length < 5){
      const highscore = new HighscoreSudden({
        playerName: html.encode(name),
        highscore: myScore
      })
      highscore.save()
      .catch((err : any) => {
        console.log(err);
      })
    }
    else{
      for (let i = 0; i < suddenScores.length; i++) {
        const suddenScore = suddenScores[i];
        if(parseInt(suddenScore.highscore) < parseInt(myScore) && found == false){
              await mongoose.connection.collection('HighscoresSudden').updateOne({_id:suddenScores[i]._id},{$set: {playerName: name, highscore: myScore }});
            found = true;
        }
      }
      
    }
      res.redirect('/quiz');
  }

  
);

app.post("/like", (req: any, res: any) => {
  const main = async() => {
    
    let quoteId = req.body.id;
    let content = req.body.content;
    let character = req.body.character;
    let added = false;

    let fetchAllLikes = await mongoose.connection.collection('Likes').find({}).toArray();
    let lookforLike = await mongoose.connection.collection('Likes').find({id:quoteId}).toArray();
    let lookforDislike= await mongoose.connection.collection('Dislikes').find({id:quoteId}).toArray();
    if(lookforLike.length == 0 && lookforDislike.length == 0){
      const like = new Like({
        id: quoteId,
        content: content,
        character: character
      })
      like.save()
      .catch((err : any) => {
        console.log(err);
      });
      added = true;
    }
      allLikes = fetchAllLikes;
    res.send({response:{quoteId,added},allLikes});
  }
  try{
    main();
  }
  catch(e){
    console.log(e);
  }
});

app.post("/dislike", (req: any, res: any) => {
  const main = async() => {
    
    let quoteId = req.body.id;
    let content = req.body.content;
    let character = req.body.character;
    
    let added = false;

    let fetchAllLikes = await mongoose.connection.collection('Dislikes').find({}).toArray();
    let lookforDislike= await mongoose.connection.collection('Dislikes').find({id:quoteId}).toArray();
    let lookforLike = await mongoose.connection.collection('Likes').find({id:quoteId}).toArray();
    if(lookforLike.length == 0 && lookforDislike.length == 0){
      const dislike = new Dislike({
        id: quoteId,
        content: content,
        character: character
      })
      dislike.save()
      .catch((err : any) => {
        console.log(err);
      });
      added = true;
    }
      allDislikes = fetchAllLikes;
    res.send({response:{quoteId,added},allDislikes});
  }
  try{
    main();
  }
  catch(e){
    console.log(e);
  }
});
app.post("/fetch", async(req: any, res: any) => {
  let fetchAllDisLikes = await mongoose.connection.collection('Dislikes').find({}).toArray();
  
  if(fetchAllDisLikes.length != 0){
    allDislikes = fetchAllDisLikes;
  }
  res.send({response:allDislikes});
});

app.post('/download', async (req:any, res:any) => {

  let content : any = "";

  allLikes = await mongoose.connection.collection('Likes').find({}).toArray();

  if(allLikes.length == 0){
    content = "Wow such empty";
  }
  else{
    allLikes.forEach((like:any) => {
      content += `${like.content} -  ${like.character}\n`;
    });
  }

  res.status(200)
      .attachment(`favorites.txt`)
      .send(content);
});

try{
  db.connect()
  .then(() => {
    app.set('port', (process.env.PORT || 5000));
    app.listen(app.get('port'), function() { });
    console.log("[server] http://localhost:" + app.get("port") + "/index");
  });
}
catch(e){
  console.log(e);
}

app.get("/header", (req: any, res: any) => {
  res.render("header", {});
});

app.get("/*", (req: any, res: any) => {
    var url = req.originalUrl;
    res.render("error", { url });
});

export {};
