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

console.log(headersList.length);

let tokenNumber  = 0;
let score  = 0;

const quiz = async () => {
    const rawQuotes = await fetch('https://the-one-api.dev/v2/quote', { headers: headersList[tokenNumber] })
    if (rawQuotes.status == 429) {
        tokenNumber++
    };
    const quotes = await rawQuotes.json();
    let quoteA = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
    let quoteB = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
    let quoteC = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
    do {
        quoteA = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
        quoteB = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
        quoteC = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
        
    } while (quoteA.character == quoteB.character || quoteA.character == quoteC.character || quoteB.character == quoteC.character);
    console.log(quoteA);
    console.log(quoteB);
    console.log(quoteC);
    document.getElementById("question").innerHTML = quoteA.dialog;
    const answerCharacter = await fetch('https://the-one-api.dev/v2/character/' + quoteA.character, { headers: headersList[tokenNumber] });
    const randomCharacterA = await fetch('https://the-one-api.dev/v2/character/' + quoteB.character, { headers: headersList[tokenNumber] });
    const randomCharacterB = await fetch('https://the-one-api.dev/v2/character/' + quoteC.character, { headers: headersList[tokenNumber] });
    const answerJson = await answerCharacter.json();
    const randomJsonA = await randomCharacterA.json();
    const randomJsonB = await randomCharacterB.json();
    
    
    //console.log(charJson.find(id => quote._id === charJson[id]._id));
    let answer = answerJson.docs[0].name;
    let randomAnswerA = randomJsonA.docs[0].name;
    let randomAnswerB = randomJsonB.docs[0].name;

    let characterArray = [answer, randomAnswerA, randomAnswerB];
    let shuffledArray = shuffle(characterArray);

    for(let i = 0; i < 3; i++){
        console.log(`${i+1}. ${shuffledArray[i]}`);
        document.getElementById(`button${i+1}`).innerHTML = shuffledArray[i];
    }
    console.log(answer);
    document.querySelector(".button").addEventListener("click",async function(){
        if(this.innerHTML == answer){
            score+=10;
            document.getElementById("extra").innerHTML = score;
            await quiz();
        }
    })

    //checks the calls left on ur token
    /*const callsLeft = rawQuotes.headers.get("X-RateLimit-Remaining");
    if(callsLeft < 5 && tokenNumber < headersList.length){
        tokenNumber++;
    } else {
        tokenNumber = 0;
    }*/
    // console.log(`Calls left: ${callsLeft}`);
};

function shuffle(array) {
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

let timesplayed = 0;
const runQuiz = async () => {

    await quiz();

}
/*
const runQuiz = async () => {
    do{
        await quiz();
        timesplayed++;
        console.log(`\nScore = ${score}/${timesplayed}\n`);
    } while(timesplayed < 10);
}
*/ 

runQuiz();