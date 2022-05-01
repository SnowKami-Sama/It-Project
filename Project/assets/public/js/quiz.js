// initialisation

let headersList = [{
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
}]

let tokenNumber  = 0;
let score  = localStorage.setItem('score',"0");
let run = true;

let start = document.getElementById('startHolder');
let startQuiz = document.getElementById('startQuiz');
let startQuizSudden = document.getElementById('startQuizSudden');
let buttonsCharacter = document.querySelectorAll(".character");
let buttonsMovie = document.querySelectorAll(".movie");
let allButtons = document.querySelectorAll(".button");
let rawQuotes = "";
let Characters = "";
let Movies = "";
let quotes = "";
// quiz function
let counter = 1;
let nocounter = false;
const quiz = async () => {
    let ifFetched = true;

    // fetch until status = ok => same length for all api-keys

    if(rawQuotes == ""){
        rawQuotes = await fetch('https://the-one-api.dev/v2/quote', { headers: headersList[tokenNumber] });
        do {
            if (rawQuotes.status == 429 && tokenNumber != 5) {
                tokenNumber++;
                rawQuotes = await fetch('https://the-one-api.dev/v2/quote', { headers: headersList[tokenNumber] });
                if(tokenNumber == 5 && rawQuotes.status == 429){
                    run = false;
                }
            }
            else{
                run = false;
            }
        } while (run);
        quotes = await rawQuotes.json();
    }
    
    // fetch quotes

    
    
    let quoteA = "";
    let quoteB = "";
    let quoteC = "";
    do {
        quoteA = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
        quoteB = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
        quoteC = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
        
    } while (quoteA.character == quoteB.character || quoteA.character == quoteC.character || quoteB.character == quoteC.character);
    document.getElementById("question").textContent = quoteA.dialog;

    // fetch characters

    let answer = "";
    let answerRandomA = "";
    let answerRandomB = "";
    if(Characters == ""){
        let rawCharacters = await fetch('https://the-one-api.dev/v2/character/', { headers: headersList[tokenNumber] });
        Characters = await rawCharacters.json();
            
    }
    for (let i = 0; i < Characters.docs.length; i++) {
        if(quoteA.character == Characters.docs[i]._id){
            answer = Characters.docs[i].name;
        }
        else if(quoteB.character == Characters.docs[i]._id){
            answerRandomA = Characters.docs[i].name;
        }
        else if(quoteC.character == Characters.docs[i]._id){
            answerRandomB = Characters.docs[i].name;
        }
    }

    // fetch and get the movies

    let movie = "";
    let movieA = "";
    let movieB = "";
    
    if(Movies == ""){
        let rawMovies = await fetch('https://the-one-api.dev/v2/movie?offset=5/', { headers: headersList[tokenNumber] });
        Movies = await rawMovies.json();
    }
    for (let i = 0; i < Movies.docs.length; i++) {
        if(quoteA.movie == Movies.docs[i]._id){
            movie = Movies.docs[i].name;
            for (let j = 0; j < Movies.docs.length; j++) {
                if(movie != Movies.docs[j].name && movieA == "" && movieB == ""){
                    movieA = Movies.docs[j].name;
                }
                else if(movieA != "" && movieB == ""){
                    movieB = Movies.docs[j].name;
                }
            }
        }
    }
    //console.log(answer);
    //console.log(movie);

    // shuffle answers

    let characterArray = [answer, answerRandomA, answerRandomB];
    let shuffledCharArray = shuffle(characterArray);
    let movieArray = [movie,movieA,movieB];
    let shuffledMovArray = shuffle(movieArray);

    // add values to buttons

    for(let i = 0; i < 3; i++){
        if(buttonsCharacter[i].classList.contains('character')){
            buttonsCharacter[i].textContent = shuffledCharArray[i];
        }
    }
    for(let i = 0; i < 3; i++){
        if(buttonsMovie[i].classList.contains('movie')){
            buttonsMovie[i].textContent = shuffledMovArray[i];
        }
    }
    
    // add listeners for each button
    
    allButtons.forEach(button =>{
        button.addEventListener("click",async function add(evt){
            let target = evt.target;
            if(ifFetched){
                // only add active class ifFetched is true wich is only once
                addActive(target,buttonsCharacter,buttonsMovie);
            }
            // if the active array is equal to 2 and ifFetched is true wich is only once
            if(document.querySelectorAll('.activeButton').length == 2 && ifFetched){
                allButtons.forEach(remove =>{
                    // remove eventlisteners for all buttons to prevent double clicking
                    remove.removeEventListener("click",add);
                })
                // run the compareValues function with a delay
                
                compareValues(answer,movie);
                ifFetched = false;
            }
            
        })
        
    });
    //checks the calls left on ur token
    /*let callsLeft = rawQuotes.headers.get("X-RateLimit-Remaining");
    if(callsLeft < 5 && tokenNumber <= headersList.length){
        tokenNumber++;
    } else {
        tokenNumber = 0;
    }
    console.log(rawQuotes);*/
};

// function to collect values and compare values and add to the score if the correct answer is clicked

const compareValues = async (answer,movie) => {
    let addedScore = 0;
    let wrong = false;
   
    for (let i = 0; i < document.querySelectorAll('.activeButton').length; i++) {
        const element = document.querySelectorAll('.activeButton')[i].textContent;
        if(element== answer || element == movie){
            let currentScore = parseInt(localStorage.score);
            currentScore+=5;
            localStorage.setItem("score",`${currentScore}`);
            addedScore++;
        }
    }
    
    if(nocounter){
        if(addedScore == 2){
            wrong = false;
        }
        else{
            wrong = true;
        }
    }
    // timer voor volgende vraag
    setTimeout(function(){addScore()},1000);
    setTimeout(async function(){await runQuiz(nocounter,wrong)},1000);
    setTimeout(function(){resetButtons()},1000);

}

const addScore = () =>{
    document.getElementById("extra").textContent = localStorage.score;
}

// function to add active class to one movie and character button 

const addActive = (target,buttonsCharacter,buttonsMovie) =>{
    
    if(target.classList.contains('character')){
        
        buttonsCharacter.forEach(remove =>{
            remove.classList.remove('activeButton');
        })
        target.classList.add('activeButton');
    }
    else if(target.classList.contains('movie')){
        
        buttonsMovie.forEach(remove =>{
            remove.classList.remove('activeButton');
        })
        target.classList.add('activeButton');
    }

}

// function to reset the buttons on new request

const resetButtons=()=>{
    let alltmpButtons = document.querySelectorAll("button");
    alltmpButtons.forEach(button =>{
        button.classList.remove('activeButton');
    })
}

// function to shuffle the array

const shuffle = (array) => {
    let max = array.length;
    let i;
    let j;
    while (max) {
        j = Math.floor(Math.random() * max--);
        i = array[max];
        array[max] = array[j];
        array[j] = i;
    }
    return array;
}

//function to run the quiz

const runQuiz = async (nocounter,wrong) => {
    
    if(nocounter == false){
        if(counter == 11){
            document.getElementById('quizHolder').style.display = 'none';
            document.getElementById('finished').style.display = 'flex';
            document.getElementById('endScore').textContent = localStorage.score;
            console.log('finished');
        }
        else{
            document.getElementById('numberOfQuestion').textContent = `question ${counter} of 10`;
            await quiz();
        }
        counter ++;
    }
    else if (nocounter == true){
        if(wrong){
            document.getElementById('quizHolder').style.display = 'none';
            document.getElementById('finished').style.display = 'flex';
            document.getElementById('endScore').textContent = localStorage.score;
            console.log('finished');
        }
        else{
            document.getElementById('numberOfQuestion').textContent = `question ${counter} of ?`;
            await quiz();
            counter++;
        }
    }
}

// Start quiz button

startQuiz.addEventListener('click', () => {
    start.style.display = 'none';
    nocounter = false;
    wrong = false;
    runQuiz(nocounter,wrong);
    document.getElementById('quizHolder').style.display = 'block';
})

startQuizSudden.addEventListener('click', () => {
    start.style.display = 'none';
    nocounter = true;
    wrong = false;
    runQuiz(nocounter,wrong);
    document.getElementById('quizHolder').style.display = 'block';
})
