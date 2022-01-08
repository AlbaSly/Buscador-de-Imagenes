import { displayImages, generatePagination, getTotalPages, displayPagination } from "./selectors.js";

export let currentTerm = '';
export default class PixabayAPI {
    constructor(searchTerm, currentPage = 1) {
        this.API_KEY = '25141443-53c859ff10a621ecb8dd2b5d4';
        this.searchTerm = searchTerm;
        this.currentPage = currentPage;
    }
    search() {
        const PER_PAGE = 30;
        const URL = `https://pixabay.com/api/?key=${this.API_KEY}&q=${this.searchTerm}&per_page=${PER_PAGE}&page=${this.currentPage}`;
        fetch(URL).then(response => response.json()).then(data => {
            console.log(data);
            displayImages(data.hits);
            const totalPages = getTotalPages(data.totalHits, PER_PAGE);
            displayPagination(totalPages);
        });

        currentTerm = this.searchTerm;
    }
}