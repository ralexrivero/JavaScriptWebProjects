const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter-button');
const quoteBtn = document.getElementById('quote-btn');
// get quote from API

async function getQuote () {
  const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // proxy for cross-origin requests
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    if (data.quoteText.length > 50) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = data.quoteText;
    if (data.quoteAuthor === '') {
      quoteAuthor.innerText = 'Unknown';
    } else {
    quoteAuthor.innerText = data.quoteAuthor;
    }
  } catch (error) {
    getQuote();
  }
}

// on load
getQuote();
