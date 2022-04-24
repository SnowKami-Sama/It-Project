const express = require('express');
const app = express();
const ejs= require('ejs');


app.use(express.static(__dirname + '/assets/public/'));
 
app.set('view engine','ejs'); // EJS als view engine
app.set('port', 3000);

app.get('/index',(req:any,res:any)=>{
    
    res.render('index',{});
    
});

app.get('/landing',(req:any,res:any)=>{
    
    res.render('landing',{});
    
});


app.listen(app.get('port'), ()=>console.log( '[server] http://localhost:' + app.get('port') + '/landing'));
export{}