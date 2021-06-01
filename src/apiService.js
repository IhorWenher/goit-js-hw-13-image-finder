export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.pageNumber = 1;
    }

    searchImage() {
        const perPage = 12;
        const key = '21876535-6bbe37fb3a30d88be5a7a76ee';
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.pageNumber}&per_page=${perPage}&key=${key}`;

        return fetch(url)
            .then(responce => {
                return responce.json();
            })
            .then(image => {
                this.pageNumber += 1;
                return image.hits;
            });
    }

    resetPage() {
        this.pageNumber = 1;
    }

    get query() {
        return this.searchQuery;
    }

    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}