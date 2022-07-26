let apiQuotes = [];

// Show new quote
function newQuote () {
  // pick a random quote from apiQuote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
}

// Get Quotes From API
async function getQuotes () {
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

// On load
getQuotes();
