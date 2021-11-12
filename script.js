let currentQuote = '';
let currentAuthor = '';
let quotesData;

function loadQuotes(){
  return $.ajax({
    accepts: 'application/json',
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
    success: function(data){
      if(typeof(data) === 'string'){
        quotesData = JSON.parse(data);
      };
    }
  })
}

function requestQuote(){
  let index = Math.floor(Math.random() * quotesData.quotes.length);
  return quotesData.quotes[index];
}

function newQuote(){
  //send request to json, random index
  let randomQuote = requestQuote();
  //declare the quote
  currentQuote = randomQuote.quote;
  //declare the author
  currentAuthor = randomQuote.author;
  
  $('#text').animate({opacity:0}, 500, function(){
    $('#text').text(currentQuote);
    $('#text').animate({opacity:1}, 500, function(){})
  })
  
  $('#author').animate({opacity:0}, 500, function(){
    $('#author').text(currentAuthor);
    $('#author').animate({opacity:1}, 500, function(){})
  })
  
}
//On first load, display a random quote
$('document').ready(function(){
  loadQuotes().then(() => newQuote());
  
  $('#new-quote').on('click', newQuote)
})
//when #new-quote is clicked, it fetches new random quote and author
