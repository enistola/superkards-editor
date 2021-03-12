/**
 * To add a new image upload, follow these steps:
 *
 *  1. Add EventListener
 *  2. Add target check and according @param arrayIndex in @function createImageObject()
 *  3. Add target check as well as functionality in @function insertIntoTemplate()
 *  4. Add targets in the deleteImage() eventListener
 *  5. Add target if() in @function deleteImage()
 */

/* ------- IMAGE UPLOAD ----------- */

import { getCurrentProduct } from './more-products';

let imageData = [];

export const initUpload = function (innerDoc) {
  document.querySelector('#top-section-image--upload').onchange = function (e) {
    if (checkFileEgibility(e)) uploadImage(e, innerDoc, '.intro');
  };
  document.querySelector('#about-image--upload').onchange = function (e) {
    if (checkFileEgibility(e)) uploadImage(e, innerDoc, '.profile-image');
  };
  document.querySelector('#favicon--upload').onchange = function (e) {
    if (checkFileEgibility(e)) uploadImage(e, innerDoc, 'favicon');
  };
  document.querySelector('#more-products-image--upload').onchange = function (e) {
    if (checkFileEgibility(e)) uploadImage(e, innerDoc, '#product-item-' + getCurrentProduct());
  };

  const deletePreviewSelectors = document.getElementsByClassName('delete-preview-image');
  for (let k = 0; k < deletePreviewSelectors.length; k++) {
    deletePreviewSelectors[k].addEventListener('click', function (e) {
      // TODO: Get getCurrentProduct() element back
      const targets = ['.intro', '.profile-image', '#product-item-' + getCurrentProduct(), 'favicon'];
      deleteImage(this, targets[k], innerDoc);
    });
  }
};

// @@ Check whether file is of correct file type and <2MB file size
function checkFileEgibility(e) {
  // For Regex end with .jpg or .png: /\.jpg$/ <- the '$' representing that it has to end with that expression
  if ((e.target.files[0].type !== 'image/jpeg' && e.target.files[0].type !== 'image/png') || e.target.files[0].size > 2000000) {
    e.target.parentElement.parentElement.children[0].classList.add('hide-element');
    e.target.parentElement.parentElement.children[1].classList.remove('hide-element');
    setTimeout(() => {
      e.target.parentElement.parentElement.children[1].classList.add('hide-element');
      e.target.parentElement.parentElement.children[0].classList.remove('hide-element');
    }, 2000);
    return false;
  }

  return true;
}

function uploadImage(e, innerDoc, target) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.addEventListener('load', function () {
    const arrayIndex = createImageObject(e.target, e.target.files, reader.result, target);
    showUploadPreview(imageData[arrayIndex]);
    insertIntoTemplate(imageData[arrayIndex], innerDoc);
  });

  if (file) {
    reader.readAsDataURL(file);
  }
}

function createImageObject(eventTrigger, files, img, target) {
  let arrayIndex;

  if (target === '.intro') arrayIndex = 0;
  else if (target === '.profile-image') arrayIndex = 1;
  else if (target === 'favicon') arrayIndex = 2;
  else if (target.substring(0, 13) === '#product-item') arrayIndex = getCurrentProduct() + 2;

  imageData[arrayIndex] = {
    trigger: eventTrigger,
    name:
      files[0].name.split('\\').pop().length < 20
        ? files[0].name.split('\\').pop()
        : files[0].name.split('\\').pop().substring(0, 19) + '...' + files[0].name.split('\\').pop().split('.').pop(),
    size: parseFloat(files[0].size / 1000000).toFixed(1),
    type: files[0].type === 'image/jpeg' ? '.jpg' : '.png',
    image: img,
    imageURL: img.split(',')[1],
    target: target,
  };
  console.log(imageData);
  return arrayIndex;
}

function insertIntoTemplate(imgObj, innerDoc) {
  if (imgObj.target === '.intro') {
    innerDoc.querySelector(imgObj.target).style.backgroundImage = "url('" + imgObj.image + "')";
  } else if (imgObj.target === '.profile-image') {
    innerDoc.querySelector(imgObj.target).style.backgroundImage = "url('" + imgObj.image + "')";
  } else if (imgObj.target === '#product-item-' + getCurrentProduct()) {
    innerDoc.querySelector(imgObj.target).style.backgroundImage =
      "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('" + imgObj.image + "')";
    // Update image target label in the upper-left corner
    document.getElementById(
      'more-products-image--upload'
    ).parentElement.parentElement.children[2].children[1].innerHTML = `Product ${getCurrentProduct()}`;
  }
}

export function showUploadPreview(imgObj) {
  // Hide upload input
  document.getElementById(imgObj.trigger.id).parentElement.classList.add('hide-element');
  // Add upload preview
  document.getElementById(imgObj.trigger.id.split('--')[0] + '--preview').classList.remove('hide-element');
  document.getElementById(imgObj.trigger.id.split('--')[0] + '--preview').style.backgroundImage =
    "linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.25)), url('" + imgObj.image + "')";
  // Update image data
  const previewElements = imgObj.trigger.parentElement.parentElement.children[2].children;
  previewElements[2].innerHTML = imgObj.name;
  previewElements[3].innerHTML = imgObj.size + 'MB';
}

// @@ Delete image on 'x' click
const deleteImage = function (element, target, innerDoc) {
  element.parentElement.parentElement.children[2].classList.add('hide-element');
  element.parentElement.parentElement.children[0].classList.remove('hide-element');
  // Remove image inside template if it's not favicon
  if (target !== 'favicon') innerDoc.querySelector(target).style.backgroundImage = 'url("")';
  // Remove imageData object
  if (target === '.intro') imageData[0] = null;
  else if (target === '.profile-image') imageData[1] = null;
  else if (target === 'favicon') imageData[2] = null;
  else if (target === '#product-item-' + getCurrentProduct()) imageData[getCurrentProduct() + 2] = null;
  console.log(imageData);
};

export function getImageData() {
  return imageData;
}
