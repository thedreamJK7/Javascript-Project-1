const quoties = document.getElementById('quoties');
const quotiesauthorName = document.getElementById('author-name');
const btn = document.getElementById('btn');

async function getQuote() {
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
    const ApiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response = await fetch(proxyUrl + ApiUrl);
        const data = await response.json();
        if(data.quoteText === '') {
            quoties.innerHTML = 'Unknown';
        } else {
            quoties.innerHTML = data.quoteText;
        }
        if(data.quoteText.length > 50 ) {
            quoties.classList.add('quote-long');
        } else {
            quoties.classList.remove('quote-long');
        }
        quotiesauthorName.innerHTML = data.quoteAuthor;
    } catch(error) {
        getQuote();
    }
}

btn.addEventListener('click', getQuote);

getQuote();