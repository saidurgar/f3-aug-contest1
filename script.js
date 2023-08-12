const searchBtn = document.getElementById('searchBtn');
const apiKeyInput = document.getElementById('apiKey');
const movieTitleInput = document.getElementById('movieTitle');
const loader = document.querySelector('.loader');
const resultsContainer = document.getElementById('movieResults');

searchBtn.addEventListener('click', searchMovies);

async function searchMovies() {
    const apiKey = apiKeyInput.value;
    const movieTitle = movieTitleInput.value;

    if (!apiKey || !movieTitle) {
        alert('Please enter API Key and Movie Title');
        return;
    }

    loader.style.display = 'block';
    resultsContainer.innerHTML = ''; // Clear previous results

    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${movieTitle}&apikey=${apiKey}`);
        const data = await response.json();

        if (data.Error) {
            alert(data.Error);
        } else {
            displayMovies(data.Search);
        }
    } catch (error) {
        alert('An error occurred. Please try again later.');
    }

    loader.style.display = 'none';
}

function displayMovies(movies) {
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card');

        const poster = movie.Poster === 'N/A' ? 'no-poster.png' : movie.Poster;

        card.innerHTML = `
            <img src="${poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
        `;

        resultsContainer.appendChild(card);
    });
}
