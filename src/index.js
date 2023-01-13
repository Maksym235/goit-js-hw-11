import { Notify } from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '32809248-e617eb740123e44583fb94c77';
let page = 1;
let value = '';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.header-input'),
  searchButton: document.querySelector('.header-search-button'),
  loadButton: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.loadButton.addEventListener('click', loadMore);

function onFormSubmit(evt) {
  evt.preventDefault();
  refs.loadButton.classList.remove('is-hidden');
  value = refs.form.firstElementChild.value;
  renderAPI(value);
}

async function fetchAPI() {
  try {
    const url = `${BASE_URL}?key=${KEY}&page=${page}&q=${value}&image_type=photo&orientation=horizontal&safesearch=true`;
    const response = await axios.get(url);
    return response;
  } catch (error) {
    Notify.failure(`error`);
  }

  // try {
  //   const response = await axios.get(
  //     `https://pixabay.com/api/?page=${page}&q=${value}&key=32809248-e617eb740123e44583fb94c77&image_type=photo&orientation=horizontal&safesearch=true&`
  //   );
  //   page += 1;
  //   console.log(page);
  //   const responseArr = await response.data.hits;
  //   await markupFoo(responseArr);
  // } catch (error) {
  //   console.log(error);
  // }
}

function renderAPI(value) {
  fetchAPI(value).then(arr => markupFoo(arr.data.hits), (page += 1));
}

async function loadMore() {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?page=${page}&q=${value}&key=32809248-e617eb740123e44583fb94c77&image_type=photo&orientation=horizontal&safesearch=true&`
    );
    page += 1;
    const responseArr = await response.data.hits;
    await markupFoo(responseArr);
  } catch (error) {
    console.log(error);
  }
}

function markupFoo(arr) {
  const markup = arr
    .map(
      item => `<div class="photo-card">
  <img class="photo" src="${item.webformatURL}" alt="${item.tags}" loading="lazy" width="300px" height="200px" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${item.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${item.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${item.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${item.downloads}</b>
    </p>
  </div>
</div>`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
