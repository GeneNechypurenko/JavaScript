class MovieService {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'http://www.omdbapi.com/';
    }

    async search(title, type, page) {
        const response = await fetch(`${this.baseUrl}?s=${title}&type=${type}&page=${page}&apikey=${this.apiKey}`);
        const data = await response.json();
        return data;
    }

    async getMovie(movieId) {
        const response = await fetch(`${this.baseUrl}?i=${movieId}&apikey=${this.apiKey}`);
        const data = await response.json();
        return data;
    }
}

export default MovieService;