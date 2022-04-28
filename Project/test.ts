const fetch = require("node-fetch");
const readline = require("readline-sync");

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

const quiz = async () => {
    const rawQuotes = await fetch('https://the-one-api.dev/v2/quote', { headers: headersList[0] })
    const quotes = await rawQuotes.json();
    const quote = quotes.docs[Math.floor(Math.random() * quotes.docs.length)];
    console.log(quote.dialog);
    const rawCharacters = await fetch('https://the-one-api.dev/v2/character/' + quote.character, { headers: headersList[1] })
    const characters = await rawCharacters.json();
    const character = characters.docs[0];
    const rawCharactersRandom = await fetch('https://the-one-api.dev/v2/character', { headers: headersList[2] })
    const charactersRand = await rawCharactersRandom.json();
    let characterB : any;
    do{
        characterB = charactersRand.docs[Math.floor(Math.random() * charactersRand.docs.length)];
    } while(character.name == characterB.name);
    let characterC : any;
    do{
        characterC = charactersRand.docs[Math.floor(Math.random() * charactersRand.docs.length)];
    } while(characterB.name == characterC.name);

    let characterArray : string[] = [character.name, characterB.name, characterC.name];
    let shuffledArray : string[] = shuffle(characterArray);

    for(let i = 0; i < shuffledArray.length; i++){
        console.log(`${i+1}. ${shuffledArray[i]}`);
    }

    let keuze : number = parseInt(readline.question("Kies een antwoord (getal 1 tot 3): "));

    switch(keuze) { 
        case 1:  
        if(shuffledArray[0] == character.name){
            console.log("Proficiat, juist antwoord!");
        } 
        else{
            console.log("Fout antwoord!");
        }
       break; 
        
        case 2: 
            if(shuffledArray[1] == character.name){
                console.log("Proficiat, juist antwoord!");
            } 
            else{
                console.log("Fout antwoord!");
            }
           break; 
        
        case 3: 
            if(shuffledArray[2] == character.name){
                console.log("Proficiat, juist antwoord!");
            } 
            else{
                console.log("Fout antwoord!");
            }
            break; 
         
        default: 
            console.log('case broken');
            break; 
     }
    

    //checks the calls left on ur token
    const callsLeft = rawCharacters.headers.get("X-RateLimit-Remaining");
    console.log(`Calls left: ${callsLeft}`);
}

function shuffle(array:string[]) {
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

quiz();
export{};