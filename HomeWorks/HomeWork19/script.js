
import MovieService from './movieService.js';
import { showLoader, hideLoader, displayResults, displayPagination, showDetails } from './domUtils.js';

document.addEventListener('DOMContentLoaded', function() {
    const apiKey = '7c28e0b1';
    const movieService = new MovieService(apiKey);
    const searchForm = document.getElementById('search-form');
    const resultsContainer = document.getElementById('results-container');
    const paginationContainer = document.getElementById('pagination-container');
    const detailsContainer = document.getElementById('details-container');
    let currentPage = 1;
    let currentQuery = '';
    let currentType = '';

    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        currentQuery = document.getElementById('movie-title').value;
        currentType = document.getElementById('movie-type').value;
        currentPage = 1;
        searchMovies(currentQuery, currentType, currentPage);
    });

    async function searchMovies(query, type, page) {
        showLoader(resultsContainer);
        const data = await movieService.search(query, type, page);
        hideLoader(resultsContainer);
        if (data.Response === 'True') {
            displayResults(data.Search, resultsContainer);
            displayPagination(Math.ceil(data.totalResults / 10), currentPage, paginationContainer, page => searchMovies(query, type, page));
        } else {
            resultsContainer.innerHTML = '<p>Movie not found!</p>';
            paginationContainer.innerHTML = '';
        }
    }

    window.showDetails = async function(imdbID) {
        showLoader(detailsContainer);
        const data = await movieService.getMovie(imdbID);
        hideLoader(detailsContainer);
        detailsContainer.innerHTML = `
            <h2>${data.Title}</h2>
            <p>${data.Plot}</p>
            <p><strong>Director:</strong> ${data.Director}</p>
            <p><strong>Actors:</strong> ${data.Actors}</p>
        `;
    };
});