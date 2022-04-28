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
        console.log("rate limited")
    }
    else {
    const quotes = await rawQuotes.json();
    const quote = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
    document.getElementById("question").innerHTML = quote.dialog;
    //const rawCharacters = await fetch('https://the-one-api.dev/v2/character/' + quote.character, { headers: headersList[tokenNumber] })
    const rawCharacters = await fetch('https://the-one-api.dev/v2/character/', { headers: headersList[tokenNumber] });
    const charJson = await rawCharacters.json();
    
    let charArray = Object.values(charJson);
    
    const character = charArray[0];
    console.log(quote.character + " - " + character._id);
    console.log(character);
    let characterA = character.findIndex(x => quote.character === character._id);
    console.log(characterA);
    let loop = true;
    let characterB;
    do{
        characterB = character[Math.floor(Math.random() * character.length)].name;
        if (characterA != characterB) loop = false;
    } while(loop);
    console.log(characterB);
    loop = true;
    let characterC;
    do{
        characterC = character[Math.floor(Math.random() * character.length)].name;
        if (characterB != characterC && characterA != characterC) loop = false;
    } while(loop);
    console.log(characterC);

    let characterArray = [characterA, characterB, characterC];
    console.log(characterArray);
    let shuffledArray = shuffle(characterArray);
    console.log(shuffledArray);
    for(let i = 0; i < 3; i++){
        console.log(`${i+1}. ${shuffledArray[i]}`);
        document.getElementById(`button${i+1}`).innerHTML = shuffledArray[i];
    }}
    document.getElementById("button1").onclick = function() {init(1)};
    document.getElementById("button2").onclick = function() {init(2)};
    document.getElementById("button3").onclick = function() {init(3)};
    function init(keuze) {
        console.log(keuze)
    switch (keuze) {
        case 1:
            if(shuffledArray[0] == characterA.name){
                console.log("Proficiat, juist antwoord!")
                score++;
            } else{
                console.log("Fout antwoord!");
            }
            break;
        case 2:
            if(shuffledArray[1] == characterA.name){
                console.log("Proficiat, juist antwoord!")
                score++;
            } else{
                console.log("Fout antwoord!");
            }
            break;
        case 3:
            if(shuffledArray[2] == characterA.name){
                console.log("Proficiat, juist antwoord!")
                score++;
            } else{
                console.log("Fout antwoord!");
            }
            break;
        default:
            console.log('case broken')
            break;
    }

    //checks the calls left on ur token
    const callsLeft = rawCharacters.headers.get("X-RateLimit-Remaining");
    if(callsLeft < 5 && tokenNumber < headersList.length){
        tokenNumber++;
    } else {
        tokenNumber = 0;
    }
    // console.log(`Calls left: ${callsLeft}`);
};
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
    do{
        await quiz();
        timesplayed++;
        console.log(`\nScore = ${score}/${timesplayed}\n`);
    } while(timesplayed < 1);
}
const returnData = (myObject) => {
    return Object.entries(myObject).map(([key, value]) => `${key}: ${value}`);
}

runQuiz();