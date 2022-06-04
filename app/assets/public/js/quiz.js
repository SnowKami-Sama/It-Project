
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
let retryQuiz = document.getElementById('retryQuiz');
let retryQuizSudden = document.getElementById('retryQuizSudden');
let buttonsCharacter = document.querySelectorAll(".character");
let buttonsMovie = document.querySelectorAll(".movie");
let allButtons = document.querySelectorAll(".button");
let rawQuotes = "";
let Characters = "";
let Movies = "";
let quotes = "";
let tempQuoteId = ""
let counter = 1;
let nocounter = false;
let reset = false;
let suddenValue = document.querySelector("#lastInputSudden").value;
let normalValue = document.querySelector("#lastInput").value;

let dislikedQuotes = [];
// quiz function
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
                    window.location.replace("./429");
                }
            }
            else{
                run = false;
            }
        } while (run);
        quotes = await rawQuotes.json();
        result = quotes.docs.filter(quote => !dislikedQuotes.includes(quote._id));
        
    }
    
    // fetch quotes
    
    let quoteA = "";
    let quoteB = "";
    let quoteC = "";
    do {
        quoteA = result[Math.floor(Math.random() * quotes.docs.length)];
        quoteB = result[Math.floor(Math.random() * quotes.docs.length)];
        quoteC = result[Math.floor(Math.random() * quotes.docs.length)];
        
    } while (quoteA.character == quoteB.character || quoteA.character == quoteC.character || quoteB.character == quoteC.character);
    document.getElementById("question").textContent = quoteA.dialog;
    let quoteIdArr = document.querySelectorAll(".quoteId");
    quoteIdArr.forEach(input => {
        input.value = quoteA._id;
    });

    let contentArr = document.querySelectorAll(".content");
    contentArr.forEach(input => {
        input.value = quoteA.dialog;
    });

    

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
    let characterArr = document.querySelectorAll(".characterForm");
    characterArr.forEach(input => {
        input.value = answer;
    });
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
        target.classList.toggle('activeButton');
    }
    else if(target.classList.contains('movie')){
        
        buttonsMovie.forEach(remove =>{
            remove.classList.remove('activeButton');
        })
        target.classList.toggle('activeButton');
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

const runQuiz = async (nocounter,wrong,reset) => {
    if(reset){
        counter = 1;
        localStorage.setItem('score',"0");
        addScore();
    }
    if(nocounter == false){
        if(counter == 11){
            document.getElementById('quizHolder').style.display = 'none';
            document.getElementById('finished').style.display = 'flex';
            document.getElementById('endScore').textContent = localStorage.score;
            document.getElementById("scoreInput").value = localStorage.score;
            if(parseInt(document.getElementById("scoreInput").value) > parseInt(normalValue)){
                document.getElementById('formNormalInput').style.display = 'block';
            }
        }
        else{
            document.getElementById('numberOfQuestion').textContent = `quote ${counter} of 10`;
            await quiz();
            counter ++;
        }
        
    }
    else if (nocounter == true){
        if(wrong){
            
            document.getElementById('quizHolder').style.display = 'none';
            document.getElementById('finishedSudden').style.display = 'flex';
            document.getElementById('endScoreSudden').textContent = localStorage.score;
            document.getElementById("scoreInputSudden").value = localStorage.score;
            if(parseInt(document.getElementById("scoreInputSudden").value) > parseInt(suddenValue)){
                document.getElementById('formSuddenInput').style.display = 'block';
            }
        }
        else{
            document.getElementById('numberOfQuestion').textContent = `quote ${counter} of ?`;
            await quiz();
            counter++;
        }
    }
}

// Start/retry quiz button

startQuiz.addEventListener('click', () => {
    start.style.display = 'none';
    nocounter = false;
    wrong = false;
    reset = false;
    runQuiz(nocounter,wrong,reset);
    document.getElementById('quizHolder').style.display = 'flex';
});

startQuizSudden.addEventListener('click', () => {
    start.style.display = 'none';
    nocounter = true;
    wrong = false;
    reset = false;
    runQuiz(nocounter,wrong,reset);
    document.getElementById('quizHolder').style.display = 'flex';
    
});

retryQuiz.addEventListener('click', () => {
    document.getElementById('finished').style.display = 'none';
    nocounter = false;
    wrong = false;
    reset = true;
    runQuiz(nocounter,wrong,reset);
    document.getElementById('quizHolder').style.display = 'flex';
});

retryQuizSudden.addEventListener('click', () => {
    document.getElementById('finishedSudden').style.display = 'none';
    nocounter = true;
    wrong = false;
    reset = true;
    runQuiz(nocounter,wrong,reset);
    document.getElementById('quizHolder').style.display = 'flex';
    
});
// AJAX CALLS
$('#startQuiz').on('click', () => {
    $.ajax({
        url: "/fetch",
        type: 'POST',
        success: function(response) {
           dislikedQuotes = response.response;
        }
      });
})
$('#startQuizSudden').on('click', () => {
    $.ajax({
        url: "/fetch",
        type: 'POST',
        success: function(response) {
           dislikedQuotes = response.response;
        }
      });
})
$(buttonNormal).on('click',function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr("href"),
      type: 'POST',
      contentType: 'application/json',
      success: function(response) {
        document.getElementById("list").innerHTML = response.content;
        document.getElementById("scoreTitle").innerHTML = response.title;
      }
    });
  })
  $(buttonSudden).on('click',function(e) {
    e.preventDefault();
    $.ajax({
      url: $(this).attr("href"),
      type: 'POST',
      contentType: 'application/json',
      success: function(response) {
        document.getElementById("list").innerHTML = response.response;
        document.getElementById("scoreTitle").innerHTML = response.titleSudden;
      }
    });
  })
  const btn = document.getElementById("dislikeButton");
  var modal = document.getElementById("myModal");
  var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
    modal.classList.add("displayModal");
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.classList.remove("displayModal");
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
    if (event.target == modal) {
        modal.classList.remove("displayModal");
    }
    }
    $('#dislikeForm').on('submit',function(e) {
      var data = {
        id: $('#dislikeForm .quoteId').val(),
        content: $('#dislikeForm .content').val(),
        character: $('#dislikeForm .characterForm').val(),
        reason: $('#dislikeForm').find("#reason").val(),
      }
      e.preventDefault();
      
      $.ajax({
        url: "/dislike",
        type: 'POST',
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        success: async function(response) {
        modal.classList.remove("displayModal");
          if(response.response.added){
              
              document.getElementById("userMessage").textContent = "Quote added";
              setTimeout(function() {
              document.getElementById("userMessage").textContent = "";
              },2000);
          }
          else{
              document.getElementById("userMessage").textContent = "Quote exists";
              setTimeout(function() {
              document.getElementById("userMessage").textContent = "";
              },2000);
          }
          counter--;
        }
      });
      
  });
$('#favoriteForm').on('submit',function(e) {
    var data = {
      id: $('#favoriteForm .quoteId').val(),
      content: $('#favoriteForm .content').val(),
      character: $('#favoriteForm .characterForm').val(),
    }
    e.preventDefault();
    $.ajax({
      url: "/like",
      type: 'POST',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: async function(response) {
        if(response.response.added){
            document.getElementById("userMessage").textContent = "Quote added";
            setTimeout(function() {
            document.getElementById("userMessage").textContent = "";
            },2000);
        }
        else{
            document.getElementById("userMessage").textContent = "Quote exists";
            setTimeout(function() {
            document.getElementById("userMessage").textContent = "";
            },2000);
        }
        counter--;
      }
    });
})
  window.onload = function(){

    var buttonSudden = document.getElementById('buttonSudden');
    var buttonNormal = document.getElementById('buttonNormal');

    setTimeout(() => {
      buttonNormal.click();
    }, 100);

    $('input[type="Submit"]').on('click',function (e) {
      if (e.target.id == 'buttonNormal') {
        setTimeout(() => {
          buttonSudden.click();
        }, 5000);
      }
      else if(e.target.id == 'buttonSudden'){
        setTimeout(() => {
          buttonNormal.click();
        }, 5000);
      }
    });
    
};