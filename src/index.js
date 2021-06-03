import './sass/main.scss';
import cardsTmpl from './image-markup.hbs';
import NewApiService from './apiService';
var debounce = require('debounce');
import * as basicLightbox from 'basiclightbox';

const refs = {
    input: document.querySelector('.js-input'),
    gallery: document.querySelector('.gallery'),
    img: document.querySelector('img'),
    loadMoreBtn: document.querySelector('.load-more-btn'),
    modalImageContainer: document.querySelector('.image-container'),
};

const newApiService = new NewApiService();

const debouncedSearchPhoto = debounce(onSearchPhoto, 500);

refs.input.addEventListener('input', debouncedSearchPhoto);
refs.gallery.addEventListener('click', respondToTheTick);
//refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearchPhoto() {
    refs.gallery.textContent = '';
    newApiService.query = refs.input.value;
    newApiService.resetPage();
    await newApiService.searchImage().then(appendImageMarkup);
    //refs.loadMoreBtn.classList.remove('is-hidden');

    //Безконечный скрол
    let options = {
        root: null,
        threshhold: 1,
        rootMargin: '0px',
    };

    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                observer.unobserve(entry.target);
                asyncLoad();
            }
        });
    }, options);

    async function asyncLoad() {
        await newApiService.searchImage().then(appendImageMarkup);
        const target = document.querySelector('.gallery').lastElementChild;
        observer.observe(target);
    }

    observer.observe(document.querySelector('.gallery').lastElementChild);
}

/*
async function onLoadMore() {
    await newApiService.searchImage().then(appendImageMarkup);

    refs.gallery.lastElementChild.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
    });
}
*/

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