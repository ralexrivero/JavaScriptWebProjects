const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter-button');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// show loading animation and hide container
function loading () {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide loading and show container
function complete () {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// Show new quote
function newQuote () {
  loading();
  // pick a random quote from apiQuote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  if (quote.text.length > 70) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  quoteText.textContent = quote.text;
  if (quote.author === null) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  complete();
}

// Get Quotes From API
async function getQuotes () {
  loading();
  const apiURL = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    window.alert(error);
    // Catch Error Here
  }
}

// Tweet Quote

function tweetQuote () {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent}%0A${authorText.textContent}`;
  window.open(twitterURL, '_blank');
}

// event listener

newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

// On load
getQuotes();
