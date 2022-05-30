const express = require("express");
const app = express();
const ejs = require("ejs");

const mongoose = require("mongoose");

const ObjectId = require('mongodb').ObjectId;
const db = require('./assets/public/js/db.js');
const HighscoreSudden : any = require('./models/highscoreSudden');
const HighscoreNormal : any = require('./models/highscoreNormal');
const Dislike : any = require('./models/dislikeSchema');
const Like : any = require('./models/likeSchema');
let allDislikes : Array<string> = [];
let allLikes : Array<string> = [];


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
    
    let normalScores = await mongoose.connection.collection('HighscoresNormal').find({}).sort({highscore:-1}).collation({locale: "en_US", numericOrdering: true}).toArray();
    let suddenScores = await mongoose.connection.collection('HighscoresSudden').find({}).sort({highscore:-1}).collation({locale: "en_US", numericOrdering: true}).toArray();
    let content = "";
    for (let i = 0; i < normalScores.length; i++) {
      content+=`<li class='score'>${normalScores[i].playerName} ${normalScores[i].highscore}</li>`
    }
    let contentSudden = "";
    for (let i = 0; i < suddenScores.length; i++) {
      contentSudden+=`<li class='score'>${suddenScores[i].playerName} ${suddenScores[i].highscore}</li>`
    }
    let titleSudden = "-SUDDEN DEATH-";
    let title = "-NORMAL MODE-";
    let lastNormalScore = normalScores[normalScores.length - 1].highscore;
    let lastSuddenScore = suddenScores[suddenScores.length - 1].highscore;
    res.render("quiz", {content,contentSudden,titleSudden,title,lastNormalScore,lastSuddenScore});
 
})
.post(async function(req: any, res: any){
  try{

    let normalScores = await mongoose.connection.collection('HighscoresNormal').find({}).sort({highscore:-1}).collation({locale: "en_US", numericOrdering: true}).toArray();
    let suddenScores = await mongoose.connection.collection('HighscoresSudden').find({}).sort({highscore:-1}).collation({locale: "en_US", numericOrdering: true}).toArray();
    
    let content = "";
    for (let i = 0; i < normalScores.length; i++) {
      content+=`<li class='score'>${normalScores[i].playerName} ${normalScores[i].highscore}</li>`
    }
    let contentSudden = "";
    for (let i = 0; i < suddenScores.length; i++) {
      contentSudden+=`<li class='score'>${suddenScores[i].playerName} ${suddenScores[i].highscore}</li>`
    }
    let titleSudden = "-SUDDEN DEATH-";
    let title = "-NORMAL MODE-";
    res.send({response:contentSudden,titleSudden,content,title});
  }
  catch(e) {
    console.log(e);
  }
 
});
app.get("/blacklist", async(req: any, res: any) => {
  const normaldocs = await HighscoreNormal.find();
  const suddendocs = await HighscoreSudden.find();
  let normalScores = normaldocs.sort();
  let suddenScores = suddendocs.sort();

  let fetchAllLikes = await mongoose.connection.collection('Dislikes').find({}).toArray();
  
  allDislikes = fetchAllLikes;
  
  let content = "";
  for (let i = 0; i < normalScores.length; i++) {
    content+=`<li class='score'>${normalScores[i].playerName} ${normalScores[i].highscore}</li>`
  }
  let contentSudden = "";
  for (let i = 0; i < suddenScores.length; i++) {
    contentSudden+=`<li class='score'>${suddenScores[i].playerName} ${suddenScores[i].highscore}</li>`
  }
  let titleSudden = "-SUDDEN DEATH-";
  let title = "-NORMAL MODE-";
  res.render("blacklist", {content,contentSudden,titleSudden,title,allDislikes});

})
app.post("/blacklist", async(req: any, res: any) => {
try{
  const normaldocs = await HighscoreNormal.find();
  const suddendocs = await HighscoreSudden.find();
  let normalScores = normaldocs.sort();
  let suddenScores = suddendocs.sort();
  
  let content = "";
  for (let i = 0; i < normalScores.length; i++) {
    content+=`<li class='score'>${normalScores[i].playerName} ${normalScores[i].highscore}</li>`
  }
  let contentSudden = "";
  for (let i = 0; i < suddenScores.length; i++) {
    contentSudden+=`<li class='score'>${suddenScores[i].playerName} ${suddenScores[i].highscore}</li>`
  }
  let titleSudden = "-SUDDEN DEATH-";
  let title = "-NORMAL MODE-";
  res.send({response:contentSudden,titleSudden,content,title});
}
catch(e) {
  console.log(e);
}

});
app.get("/favorites", async(req: any, res: any) => {
  const normaldocs = await HighscoreNormal.find();
  const suddendocs = await HighscoreSudden.find();
  let normalScores = normaldocs.sort();
  let suddenScores = suddendocs.sort();

  let fetchAllLikes = await mongoose.connection.collection('Likes').find({}).toArray();
  
  allLikes = fetchAllLikes;
  
  let content = "";
  for (let i = 0; i < normalScores.length; i++) {
    content+=`<li class='score'>${normalScores[i].playerName} ${normalScores[i].highscore}</li>`
  }
  let contentSudden = "";
  for (let i = 0; i < suddenScores.length; i++) {
    contentSudden+=`<li class='score'>${suddenScores[i].playerName} ${suddenScores[i].highscore}</li>`
  }
  let titleSudden = "-SUDDEN DEATH-";
  let title = "-NORMAL MODE-";
  res.render("favorite", {content,contentSudden,titleSudden,title,allLikes});

})
app.post("/favorites", async(req: any, res: any) => {
try{
  const normaldocs = await HighscoreNormal.find();
  const suddendocs = await HighscoreSudden.find();
  let normalScores = normaldocs.sort();
  let suddenScores = suddendocs.sort();
  
  let content = "";
  for (let i = 0; i < normalScores.length; i++) {
    content+=`<li class='score'>${normalScores[i].playerName} ${normalScores[i].highscore}</li>`
  }
  let contentSudden = "";
  for (let i = 0; i < suddenScores.length; i++) {
    contentSudden+=`<li class='score'>${suddenScores[i].playerName} ${suddenScores[i].highscore}</li>`
  }
  let titleSudden = "-SUDDEN DEATH-";
  let title = "-NORMAL MODE-";
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

app.post("/deleteall", async (req: any, res: any) => {
  allDislikes = await mongoose.connection.collection('Dislikes').find({}).toArray();
  await mongoose.connection.collection('Dislikes').deleteMany({});
});

app.post("/quizNormal", async (req: any, res: any) => {
  
  let myScore = req.body.score;
  let name = req.body.name.toUpperCase();
  let found = false;

    let normalScores = await mongoose.connection.collection('HighscoresNormal').find({}).toArray();

    if(normalScores.length < 5){
      const highscore = new HighscoreNormal({
        playerName: name,
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

app.post("/quizSudden", (req: any, res: any) => {
  
  let myScore = req.body.score;
  let name = req.body.name.toUpperCase();
  let found = false;

  const main = async() => {
    let suddenScores = await mongoose.connection.collection('HighscoresSudden').find({}).toArray();

    if(suddenScores.length < 5){
      const highscore = new HighscoreSudden({
        playerName: name,
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
  try{
    main();
  }
  catch(e){
    console.log(e);
  };

  
});

app.post("/like", (req: any, res: any) => {
  const main = async() => {
    
    let quoteId = req.body.id;
    let content = req.body.content;
    let character = req.body.character;

    let fetchAllLikes = await mongoose.connection.collection('Likes').find({}).toArray();
    let lookforLikes = await mongoose.connection.collection('Likes').find({id:quoteId}).toArray();
    if(lookforLikes.length == 0){
      const like = new Like({
        id: quoteId,
        content: content,
        character: character
      })
      like.save()
      .catch((err : any) => {
        console.log(err);
      })
    }
      allLikes = fetchAllLikes;
    res.send({response:quoteId,allLikes});
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

    let fetchAllLikes = await mongoose.connection.collection('Dislikes').find({}).toArray();
    let lookforLikes = await mongoose.connection.collection('Dislikes').find({id:quoteId}).toArray();
    if(lookforLikes.length == 0){
      const dislike = new Dislike({
        id: quoteId,
        content: content,
        character: character
      })
      dislike.save()
      .catch((err : any) => {
        console.log(err);
      })
    }
      allDislikes = fetchAllLikes;
    res.send({response:quoteId,allDislikes});
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
try{
  db.connect()
  .then(() => {
    app.listen(app.get("port"), () =>
      console.log("[server] http://localhost:" + app.get("port") + "/index")
    );
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
