const accesskey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";
const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

showMoreButtonEl.style.display = "none";

async function searchImages() {
    inputData = searchInputEl.value.trim();

    if (!inputData) {
        return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResultsEl.innerHTML = "";
    }

    const results = data.results;

    if (!results || results.length === 0) {
        showMoreButtonEl.style.display = "none";
        return;
    }

    results.forEach((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result");

        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description || "Unsplash image";

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.rel = "noopener noreferrer";
        imageLink.textContent = result.alt_description || "View image";

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResultsEl.appendChild(imageWrapper);
    });

    if (page >= data.total_pages) {
        showMoreButtonEl.style.display = "none";
        return;
    }

    page += 1;
    showMoreButtonEl.style.display = "block";
}

formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    showMoreButtonEl.style.display = "none";
    searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
    searchImages();
});
