import axios from 'axios';
import { Notify } from 'notiflix';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const axios = require('axios').default;
const BASE_URL = 'https://pixabay.com/api/';

const refs = {
  form: document.querySelector('.search-form'),
  input: document.querySelector('.header-input'),
  button: document.querySelector('.header-search-button'),
};

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const value = refs.form.firstElementChild.value;
  console.log(value);
  fetchAPI(value);
}

async function fetchAPI(value) {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${value}&key=32809248-e617eb740123e44583fb94c77&image_type=photo&orientation=horizontal&safesearch=true&`
  );
  const responseObj = await response.data.hits;
  console.log(responseObj);
}
