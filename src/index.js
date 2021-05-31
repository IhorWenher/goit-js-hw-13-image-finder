import './sass/main.scss';
import cardsTmpl from './image-markup.hbs';

const refs = {
    input: document.querySelector('.js-input'),
    gallery: document.querySelector('.gallery'),
};

refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
});

function createImageMarkup(image) {
    const imageArray = image.hits;
    return imageArray.map(cardsTmpl).join('');
}

function searchPhoto() {
    const pageNumber = '1';
    const perPage = 12;
    const inputValue = refs.input.value;
    const key = '21876535-6bbe37fb3a30d88be5a7a76ee';
    const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${inputValue}&page=${pageNumber}&per_page=${perPage}&key=${key}`;

    refs.gallery.textContent = '';

    return fetch(url)
        .then(responce => {
            return responce.json();
        })
        .then(image => {
            refs.gallery.insertAdjacentHTML('beforeend', createImageMarkup(image));
        });
}

refs.input.addEventListener('input', searchPhoto);