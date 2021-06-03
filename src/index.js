import './sass/main.scss';
import cardsTmpl from './image-markup.hbs';
import NewApiService from './apiService';
import { debounce } from 'debounce';
import * as basicLightbox from 'basiclightbox';

const refs = {
    input: document.querySelector('.js-input'),
    gallery: document.querySelector('.gallery'),
    img: document.querySelector('img'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
    modalImageContainer: document.querySelector('.image-container'),
};

const newApiService = new NewApiService();

refs.input.addEventListener('input', onSearchPhoto);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', respondToTheTick);

function onSearchPhoto(e) {
    refs.gallery.textContent = '';
    newApiService.query = e.currentTarget.value;
    newApiService.resetPage();
    newApiService.searchImage().then(appendImageMarkup);
    refs.loadMoreBtn.classList.remove('is-hidden');
}

function onLoadMore() {
    newApiService.searchImage().then(appendImageMarkup);

    refs.gallery.lastElementChild.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}

function appendImageMarkup(image) {
    refs.gallery.insertAdjacentHTML('beforeend', createImageMarkup(image));
}

function createImageMarkup(imageArray) {
    return imageArray.map(cardsTmpl).join('');
}

function respondToTheTick(e) {
    const largeImageUrl = e.target.nextElementSibling.src;

    const instance = basicLightbox.create(`<img src="${largeImageUrl}" width="800">`);
    if (e.target.localName === 'img') {
        instance.show();
    }
}