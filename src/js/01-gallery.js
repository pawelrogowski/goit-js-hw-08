// This script does the following:
// - Renders a gallery of images using the provided `galleryItems` array
// - Initializes a lightbox for the gallery items using the simpleLightbox library
// - Disables scrolling when the lightbox is open if the page content overflows the viewport (workaround for lightbox adding padding to compensate for missing scrollbar even if not needed)

import { debounce } from 'lodash';
import simpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { galleryItems } from './gallery-items';

const galleryElement = document.querySelector('.gallery');

let galleryTemplate = '';
galleryItems.forEach(item => {
  galleryTemplate += `
    <a class="gallery__item" href="${item.original}">
      <img class="gallery__image" src="${item.preview}" alt="${item.description}">
    </a>
  `;
});

galleryElement.insertAdjacentHTML('beforeend', galleryTemplate);

function overflowsViewport() {
  const elements = document.querySelectorAll('*');

  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  for (let i = 0; i < elements.length; i++) {
    const element = elements[i];

    const elementRect = element.getBoundingClientRect();

    if (
      elementRect.right > viewportWidth ||
      elementRect.left < 0 ||
      elementRect.top < 0 ||
      elementRect.bottom > viewportHeight
    ) {
      return true;
    }
  }
  return false;
}

const lightbox = new SimpleLightbox('.gallery .gallery__item', {
  captionsData: 'alt',
  captionPosition: 250,
  disableScroll: overflowsViewport(),
});

window.addEventListener(
  'resize',
  debounce(function () {
    overflowsViewport()
      ? (lightbox.defaultOptions.disableScroll = true)
      : (lightbox.defaultOptions.disableScroll = false);
  }, 100)
);
