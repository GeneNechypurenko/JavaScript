document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '7c28e0b1';
    const searchForm = document.getElementById('search-form');
    const resultsContainer = document.getElementById('results-container');
    const paginationContainer = document.getElementById('pagination-container');
    const detailsContainer = document.getElementById('details-container');
    let currentPage = 1;
    let currentQuery = '';
    let currentType = '';
    let totalPages = 0;

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        currentQuery = document.getElementById('movie-title').value;
        currentType = document.getElementById('movie-type').value;
        currentPage = 1;
        searchMovies(currentQuery, currentType, currentPage);
    });

    function searchMovies(query, type, page) {
        console.log(`Searching for: ${query}, type: ${type}, page: ${page}`);
        fetch(`http://www.omdbapi.com/?s=${query}&type=${type}&page=${page}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log('Response data:', data);
                if (data.Response === 'True') {
                    displayResults(data.Search);
                    totalPages = Math.ceil(data.totalResults / 10);
                    displayPagination();
                } else {
                    resultsContainer.innerHTML = '<p>Movie not found!</p>';
                    paginationContainer.innerHTML = '';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                resultsContainer.innerHTML = '<p>An error occurred while fetching data.</p>';
            });
    }

    function displayResults(movies) {
        resultsContainer.innerHTML = movies.map(movie => `
            <div class="movie">
                <img src="${movie.Poster}" alt="${movie.Title} Poster">
                <div class="movie-info">
                    <h3>${movie.Title}</h3>
                    <p>Year: ${movie.Year}</p>
                    <p>Type: ${movie.Type}</p>
                    <button onclick="showDetails('${movie.imdbID}')">Details</button>
                </div>
            </div>
        `).join('');
    }

    function displayPagination() {
        paginationContainer.innerHTML = '';
        const startPage = Math.max(currentPage - 4, 1);
        const endPage = Math.min(startPage + 8, totalPages);

        if (currentPage > 1) {
            const prevButton = document.createElement('button');
            prevButton.innerText = '<';
            prevButton.addEventListener('click', () => {
                currentPage--;
                searchMovies(currentQuery, currentType, currentPage);
            });
            paginationContainer.appendChild(prevButton);
        }

        for (let i = startPage; i <= endPage; i++) {
            const button = document.createElement('button');
            button.innerText = i;
            if (i === currentPage) {
                button.classList.add('active');
            }
            button.addEventListener('click', () => {
                currentPage = i;
                searchMovies(currentQuery, currentType, currentPage);
            });
            paginationContainer.appendChild(button);
        }

        if (endPage < totalPages) {
            const dots = document.createElement('span');
            dots.innerText = '...';
            paginationContainer.appendChild(dots);
        }

        if (currentPage < totalPages) {
            const nextButton = document.createElement('button');
            nextButton.innerText = '>';
            nextButton.addEventListener('click', () => {
                currentPage++;
                searchMovies(currentQuery, currentType, currentPage);
            });
            paginationContainer.appendChild(nextButton);
        }
    }

    window.showDetails = function(imdbID) {
        console.log(`Fetching details for: ${imdbID}`);
        fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => {
                console.log('Movie details:', data);
                detailsContainer.innerHTML = `
                    <h2>${data.Title}</h2>
                    <p>${data.Plot}</p>
                    <p><strong>Director:</strong> ${data.Director}</p>
                    <p><strong>Actors:</strong> ${data.Actors}</p>
                `;
            })
            .catch(error => {
                console.error('Error:', error);
                detailsContainer.innerHTML = '<p>An error occurred while fetching details.</p>';
            });
    }
});