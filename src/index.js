import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import PhotoAPI from './js/PhotoAPI';
import { getGalleryMarkup } from './js/markup';
import { galleryList, loadMoreBtn, searchForm } from './js/refs';
import { appendMarkup, clearMarkup } from './js/utils';

import 'modern-normalize';
import 'simplelightbox/dist/simple-lightbox.min.css';
import './css/styles.css';
import InfiniteScroll from './js/InfiniteScroll';

const photoAPI = new PhotoAPI();
const gallery = new SimpleLightbox('.gallery a');
const scroller = new InfiniteScroll(loadMore, 500, 250);

window.addEventListener('DOMContentLoaded', init);

function init() {
  searchForm.addEventListener('submit', onSearch);
  loadMoreBtn.addEventListener('click', loadMore);
}

async function onSearch(evt) {
  evt.preventDefault();
  const formEl = evt.currentTarget;

  const query = formEl.elements.searchQuery.value.trim();

  loadMoreBtn.classList.add('is-hidden');
  clearMarkup(galleryList);
  photoAPI.resetPage();

  try {
    const data = await photoAPI.getPhotosByQuery(query);

    renderPhotos(data.hits);

    Notify.success(`Hooray! We found ${data.totalHits} images.`);

    loadMoreBtn.classList.remove('is-hidden');

    formEl.reset();
    scroller.start();
  } catch (err) {
    onError(err);
  }
}

async function loadMore() {
  try {
    const data = await photoAPI.getNewPhotos();

    renderPhotos(data.hits);
  } catch (err) {
    loadMoreBtn.classList.add('is-hidden');
    scroller.stop();
    onError(err);
  }
}

function renderPhotos(photos) {
  const markup = getGalleryMarkup(photos);

  appendMarkup(markup, galleryList);
  gallery.refresh();
}

function onError(err) {
  let message = `${err.message}, Please try again.`;

  switch (err.message) {
    case 'No Data':
      message =
        'Sorry, there are no images matching your search query. Please try again.';
      break;

    case 'No Query':
      message = 'Please enter a query.';
      break;

    case 'Limit Reached':
      message = "We're sorry, but you've reached the end of search results.";
      break;

    default:
      break;
  }

  Notify.failure(message);
}
