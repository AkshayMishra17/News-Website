const API_KEY = "ec55232294c34f4088c2299cef551291";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load',() => fetchNews("World"));

async function fetchNews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json(); 
    bindData(data.articles);
}

function bindData(articles){
  const cardContainer = document.getElementById("cards-container");
  const newscardTemplate = document.getElementById("news-card-template");
  
  cardContainer.innerHTML = '';

  articles.forEach((article) => {
    if(!article.urlToImage) return;
    
    const cardClone = newscardTemplate.content.cloneNode(true);
    fillDatainCard(cardClone,article);
    cardContainer.appendChild(cardClone);
  });
}

function fillDatainCard(cardClone,article){
 const newsImg = cardClone.querySelector('#news-img');
 const newsTitle = cardClone.querySelector('#news-title');
 const newsSource = cardClone.querySelector('#news-source');
 const newsDesc = cardClone.querySelector('#news-description');

 newsImg.src = article.urlToImage;
 newsTitle.innerHTML = article.title;
 newsDesc.innerHTML = article.description;

 const date = new Date(article.publishedAt).toLocaleString("en-US",{
    timeZone:"Asia/Jakarta"
 });

newsSource.innerHTML = `${article.source.name} ${date}`;

cardClone.firstElementChild.addEventListener('click',() => {
    window.open(article.url,"_blank");
});
}

function navItemClick(id){
  fetchNews(id);
}

const searchbtn = document.getElementById("search");
const searchtext = document.getElementById("search-text");

searchbtn.addEventListener('click',() => {
    const query = searchtext.value;
    if(!query)return;
    fetchNews(query);
});