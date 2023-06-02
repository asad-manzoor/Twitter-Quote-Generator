const quoteContainer = document.getElementById("quote-container")
const quoteTxt = document.getElementById("quote")
const authorText = document.getElementById("author")
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let data = ""
let tweetData = ""

// showing loading animation
function loading() {
    loader.hidden  = false;
    quoteContainer.hidden = true;
}

//hide loading
function complete() {
   if (!loader.hidden){
    quoteContainer.hidden = false
    loader.hidden  = true;
   }
}

// get new quote
function getNewQuote(){
    var randomNumber = Math.floor(Math.random() * 1601);
    tweetData = data[randomNumber].text;
    quoteTxt.innerText = tweetData;
    if(data[randomNumber].author==null){
        authorText.innerText = "unknown";
    }else{
        authorText.innerText = data[randomNumber].author;
    }
    complete()
}

//get quote from api
async function getQuote(){
    loading();
    try {
        const response = await fetch('https://type.fit/api/quotes');
        data = await response.json();
        getNewQuote();
    }

    catch(error){
        console.log ('opps, no quote', error);
    }
}

//tweet on twiter window
function tweetQuote(){
    window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweetData), "_blank");
}
newQuoteBtn.addEventListener("click", getNewQuote);
twitterBtn.addEventListener("click", tweetQuote);
//on load
getQuote();