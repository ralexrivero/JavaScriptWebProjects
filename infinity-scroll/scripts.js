const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let imgReady = false;
let imgLoaded = 0;
let imgTotal = 0;
let photosArray = [];

// Unsplash API
const count = 10;
const apiKey = 'Eq7N_bjki_HpNR8C_AOGxTKgvvjNGlEjPtPfuc4LCFM';
const orient = 'landscape';
const collections = ''; // comma separated values (ID's)
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&orientation=${orient}&collections=${collections}`;

loader.hidden = false;

// images loaded checker
function imageLoaded () {
  imgLoaded++;
  if (imgLoaded < 10) {
    loader.hidden = true;
  } else if (imgLoaded === imgTotal) {
    imgReady = true;
  }
}

// helper function to set attributes on DOM elements
function setAttr (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create elements for links and photos, add to DOM
function displayPhotos () {
  imgTotal += photosArray.length;
  photosArray.forEach((photo) => {
    const anchor = document.createElement('a');
    setAttr(anchor, {
      href: photo.links.html,
      target: '_blank'
    });
    const img = document.createElement('img');
    setAttr(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.description
    });
    img.addEventListener('load', imageLoaded);
    anchor.appendChild(img);
    imageContainer.appendChild(anchor);
  });
}

// Get photos from Unsplash API

async function getPhotos () {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch error here
  }
}

// Infinite scroll: check for scroll near bottom and load more photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && imgReady === true) {
    imgReady = false;
    getPhotos();
  }
});

// On load
getPhotos();
