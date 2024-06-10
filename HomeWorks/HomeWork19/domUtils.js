import MovieService from './movieService.js';

const movieService = new MovieService('7c28e0b1');

export function showLoader(container) {
    container.innerHTML = '<div class="loader"></div>';
}

export function hideLoader(container) {
    container.innerHTML = '';
}

export function displayResults(movies, container) {
    container.innerHTML = movies.map(movie => `
        <div class="movie">
            <img src="${movie.Poster}" alt="${movie.Title}">
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <p>${movie.Type}</p>
            <button onclick="showDetails('${movie.imdbID}')">Details</button>
        </div>
    `).join('');
}

export function displayPagination(totalPages, currentPage, container, callback) {
    let paginationHtml = '';
    const maxPagesToShow = 9;

    const startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (startPage > 1) {
        paginationHtml += `<button onclick="${callback}(1)">1</button>`;
        if (startPage > 2) {
            paginationHtml += `<span>...</span>`;
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationHtml += `<button onclick="${callback}(${i})" class="${i === currentPage ? 'active' : ''}">${i}</button>`;
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            paginationHtml += `<span>...</span>`;
        }
        paginationHtml += `<button onclick="${callback}(${totalPages})">${totalPages}</button>`;
    }

    container.innerHTML = paginationHtml;
}

export async function showDetails(imdbID) {
    const modal = document.getElementById('details-container');
    showLoader(modal);
    const data = await movieService.getMovie(imdbID);
    hideLoader(modal);
    modal.innerHTML = `
        <h2>${data.Title}</h2>
        <p>${data.Plot}</p>
        <p><strong>Director:</strong> ${data.Director}</p>
        <p><strong>Actors:</strong> ${data.Actors}</p>
    `;
}