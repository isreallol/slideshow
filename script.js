// Use this Jikan API to get all the artworks

// Select the container by its ID (matches index.html)
const containerEl = document.getElementById('slideshow_container');

// Fetch artworks (in this case, top ONA anime) from Jikan API
async function getArtworks(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data); // optional: view the data in console
        displayArtwork(data.data, data.pagination);
    } catch (error) {
        console.error("Error fetching artworks:", error);
    }
}

// Display artworks dynamically
function displayArtwork(works, pagination) {
    // Clear existing content
    containerEl.innerHTML = "";

    // Create a container for the anime cards
    const sliderInner = document.createElement("div");
    sliderInner.classList.add("slider__inner");

    works.forEach(work => {
        const card = document.createElement("div");
        card.classList.add("slider__contents");

        const img = document.createElement("img");
        img.src = work.images.jpg.image_url;
        img.alt = work.title;
        img.classList.add("slider__image");

        const title = document.createElement("h3");
        title.classList.add("slider__caption");
        title.textContent = work.title;

        const rank = document.createElement("p");
        rank.classList.add("slider__txt");
        rank.textContent = `Rank: ${work.rank || 'N/A'} | Score: ${work.score || 'N/A'}`;

        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(rank);

        sliderInner.appendChild(card);
    });

    containerEl.appendChild(sliderInner);

    // Add pagination if available
    if (pagination && pagination.has_next_page) {
        const loadMoreButton = document.createElement("button");
        loadMoreButton.textContent = "Load More";
        loadMoreButton.style.marginTop = "20px";
        loadMoreButton.addEventListener("click", () => {
            getArtworks(pagination.next_page);
        });
        containerEl.appendChild(loadMoreButton);
    }
}

// Call API
getArtworks('https://api.jikan.moe/v4/top/anime?type=ona');
