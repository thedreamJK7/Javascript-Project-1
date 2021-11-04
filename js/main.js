const quoties = document.getElementById('quoties');
const quotiesauthorName = document.getElementById('author-name');
const btn = document.getElementById('btn');
const loading = document.getElementById('loader');
const quoteContainer = document.getElementById('quote-container');

function loader() {
    loading.hidden = false;
    quoteContainer.hidden = true;
}

function complete() {
    if(!loading.hidden) {
        quoteContainer.hidden = false;
        loading.hidden = true;
    }
}

async function getQuote() {
    loader();
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
        complete();
    } catch(error) {
        getQuote();
    }

}

btn.addEventListener('click', getQuote);

getQuote();