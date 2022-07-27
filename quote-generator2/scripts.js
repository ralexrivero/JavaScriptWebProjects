const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter-button');
const quoteBtn = document.getElementById('quote-btn');
const loader = document.getElementById('loader');

function showLoadingSpinner () {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner () {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

// get quote from API

async function getQuote () {
  showLoadingSpinner();
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
    hideLoadingSpinner();
  } catch (error) {
    getQuote();
  }
}

function tweetQuote () {
  const twitterUrl = `https://twitter.com/intent/tweet?text="${quoteText.innerText}"%0A${quoteAuthor.innerHTML}`;
  window.open(twitterUrl, '_blank');
}

// event listener
quoteBtn.addEventListener('click', getQuote);
twitterButton.addEventListener('click', tweetQuote);

// on load
getQuote();
