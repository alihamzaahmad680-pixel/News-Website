// // const API_KEY = "14c6ced6bb6c43309e4b6b4cd2a83e7d";
// const API_KEY = "234e6173f7f34c26a7a30d99d93a0d91";
// const url = "https://newsapi.org/v2/everything?";

// window.addEventListener('load', () => fetchNews('pakistan'));

// function reload() {
//   window.location.reload();
// }
// async function fetchNews(query) {
//   const res = await fetch(`${url}q=${query}&apiKey=${API_KEY}`);
//   const data = await res.json();
//   bindData(data.articles);
// }
// function bindData(articles) {
//   const cardContainer = document.getElementById('card-container');
//   const newsCardTemplate = document.getElementById('template-news-card');

//   cardContainer.innerHTML = '';

//   articles.forEach(article => {
//     if (!article.urlToImage) return;

//     const cardClone = newsCardTemplate.content.cloneNode(true);

//     cardClone.querySelector('.news-img').src = article.urlToImage;
//     cardClone.querySelector('.news-title').innerText = article.title;
//     cardClone.querySelector('.news-source').innerText = article.source.name;
//     const newsdesc = cardClone.querySelector("#news-desc")
//     const card = cardClone.firstElementChild;
//     card.addEventListener("click", () => {
//       window.open(article.url, "_blank");
//     });
//     cardContainer.appendChild(cardClone);
//   });
// };

// async function onNavItemClick(id) {
//   await fetchNews(id);
// }
// const searchButton = document.getElementById("search-button")
// const searchText = document.getElementById("search-text")
// searchButton.addEventListener("click", () => {
//   const query = searchText.value;
//   if (!query) return
//   fetchNews(query);

// });

// const mobileMenu = document.getElementById("mobile-menu");

// function openMenu() {
//   mobileMenu.classList.remove("translate-x-full");
// }

// function closeMenu() {
//   mobileMenu.classList.add("translate-x-full");
// }

// function mobileSearch() {
//   const query = document.getElementById("search-text-mobile").value;
//   if (!query) return;
//   fetchNews(query);
//   closeMenu();
// }
// GNews API - Yeh production par work karegi
// NOTE: Apni API Key ko environment variables mein rakhna best practice hai.
// Security ke liye GNews par ja kar apni key reset zaroor kar lein.
const API_KEY = "b79fd922cc06b7d9368dbe3222621166";
const url = "https://gnews.io/api/v4/search?";

window.addEventListener("load", () => fetchNews("pakistan"));

async function fetchNews(query) {
  try {
    const res = await fetch(`${url}q=${query}&lang=en&apikey=${API_KEY}`);
    const data = await res.json();

    // GNews ka data 'articles' array mein hota hai
    if (data && data.articles) {
      bindData(data.articles);
    } else {
      console.error("Data ya articles nahi mile:", data);
    }
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

function bindData(articles) {
  const cardContainer = document.getElementById("card-container");
  const newsCardTemplate = document.getElementById("template-news-card");

  if (!cardContainer || !newsCardTemplate) return;

  cardContainer.innerHTML = "";

  articles.forEach((article) => {
    // GNews mein image ka field 'image' hai
    if (!article.image) return;

    const cardClone = newsCardTemplate.content.cloneNode(true);

    // Elements safely set karein
    const img = cardClone.querySelector(".news-img");
    if (img) img.src = article.image;

    const title = cardClone.querySelector(".news-title");
    if (title) title.innerText = article.title;

    const source = cardClone.querySelector(".news-source");
    if (source && article.source) source.innerText = article.source.name;

    const card = cardClone.firstElementChild;
    card.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    cardContainer.appendChild(cardClone);
  });
}
