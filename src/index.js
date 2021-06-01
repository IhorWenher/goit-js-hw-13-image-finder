import './sass/main.scss';
import cardsTmpl from './image-markup.hbs';
import NewApiService from './apiService';
import { debounce } from 'debounce';

const refs = {
    input: document.querySelector('.js-input'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
};

const newApiService = new NewApiService();

refs.input.addEventListener('input', onSearchPhoto);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

function createImageMarkup(imageArray) {
    return imageArray.map(cardsTmpl).join('');
}

function onSearchPhoto(e) {
    refs.gallery.textContent = '';
    newApiService.query = e.currentTarget.value;
    newApiService.resetPage();
    newApiService.searchImage().then(appendImageMarkup);
}

function onLoadMore() {
    newApiService.searchImage().then(appendImageMarkup);
    refs.gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
    });
}

function appendImageMarkup(image) {
    refs.gallery.insertAdjacentHTML('beforeend', createImageMarkup(image));
}