import { addOpenEditorListeners } from './editor';
import { showUploadPreview, getImageData } from './image-upload';

/* ======================  ADD / REMOVE PRODUCTS  ============================= */

let currentCounterValue = Number(document.querySelector('.counter-value').innerHTML);

const removeProduct = function (innerDoc) {
  const productRows = innerDoc.getElementsByClassName('products-row');
  if (currentCounterValue > 0) {
    const currentRow = currentCounterValue > 1 ? productRows[Math.ceil(currentCounterValue / 2) - 1] : productRows[0];
    if (currentCounterValue % 2 == 0) {
      currentRow.removeChild(currentRow.children[1]);
    } else {
      currentRow.remove();
      if (currentCounterValue < 2) {
        innerDoc.querySelector('.more-products').style.display = 'none';
        innerDoc.querySelector('.more-products-hidden').classList.remove('hide-element');
        addOpenEditorListeners(innerDoc);
      }
    }

    // decrease counter and add that number to the html element
    currentCounterValue = Number(document.querySelector('.counter-value').innerHTML) - 1;
    document.querySelector('.counter-value').innerHTML = currentCounterValue;
  }
};

const addProduct = function (innerDoc) {
  // Check whether to add row or item
  const productRows = innerDoc.getElementsByClassName('products-row');
  const currentRow = currentCounterValue > 1 ? productRows[Math.ceil(currentCounterValue / 2) - 1] : productRows[0];
  if (currentCounterValue < 1) innerDoc.querySelector('.more-products').style.display = 'flex';
  if (currentCounterValue < 1) innerDoc.querySelector('.more-products-hidden').classList.add('hide-element');
  if (currentCounterValue % 2 == 0) {
    addProductRow(innerDoc);
  } else {
    addProductItem(innerDoc);
  }

  addOpenEditorListeners(innerDoc);

  // increase counter and add that number to the html element
  currentCounterValue = Number(document.querySelector('.counter-value').innerHTML) + 1;
  document.querySelector('.counter-value').innerHTML = currentCounterValue;
};

function addProductItem(innerDoc) {
  const productItem = innerDoc.createElement('div');
  productItem.classList.add('products-item');
  productItem.classList.add('on-hover');
  productItem.classList.add('open-editor');
  productItem.id = `product-item-${currentCounterValue + 1}`;
  const productText = innerDoc.createElement('div');
  productText.classList.add('products-text');
  const productHeading = innerDoc.createElement('h4');
  productHeading.classList.add('products-heading');
  productHeading.innerHTML = 'Product Title';
  const productSubheading = innerDoc.createElement('h5');
  productSubheading.classList.add('products-subheading');
  productSubheading.innerHTML = 'Some text to describe your product';
  const productBtn = innerDoc.createElement('a');
  productBtn.classList.add('buy-btn');
  productBtn.classList.add('products-btn');
  productBtn.innerHTML = 'Purchase &mdash; $39';

  productItem.appendChild(productText);
  productText.appendChild(productHeading);
  productText.appendChild(productSubheading);
  productItem.appendChild(productBtn);

  const target = innerDoc.querySelectorAll('.products-row:last-child');
  target[0].appendChild(productItem);
}

function addProductRow(innerDoc) {
  const productRow = innerDoc.createElement('div');
  productRow.classList.add('products-row');
  productRow.classList.add('open-editor');

  innerDoc.querySelector('.more-products').appendChild(productRow);
  addProductItem(innerDoc);
}

/* ======================  EDIT PRODUCT  ============================= */
let currentProduct = 1;

const productItemInputs = document.getElementById('more-products').getElementsByClassName('input');
let productItems, productItemButtons;

export function getProductItemData(productIndex) {
  currentProduct = productIndex + 1;
  // Reset image preview
  document.getElementById('more-products').querySelector('.upload-preview').classList.add('hide-element');
  document.getElementById('more-products').querySelector('.upload-wrapper').classList.remove('hide-element');
  // Change content header tab description to "Product " + currentProduct
  document.getElementById('more-products').querySelector('.content-header-item').children[0].innerText = `Product ${currentProduct}`;
  // Add image data, if available
  if (getImageData()[currentProduct + 2]) showUploadPreview(getImageData()[currentProduct + 2]);
  // Get data for input fields
  productItemInputs[0].value = productItems[currentProduct - 1].querySelector('.products-heading').innerText;
  productItemInputs[1].value = productItems[currentProduct - 1].querySelector('.products-subheading').innerText;
  productItemInputs[2].value = productItemButtons[currentProduct - 1].innerText;
  productItemInputs[3].value = productItemButtons[currentProduct - 1].href;
}

/* ======================  EXPORT STUFF  ============================= */

export function getCurrentProduct() {
  return currentProduct;
}

export function initMoreProducts(innerDoc) {
  document.querySelector('.counter-minus').addEventListener('click', function () {
    removeProduct(innerDoc);
  });
  document.querySelector('.counter-plus').addEventListener('click', function () {
    addProduct(innerDoc);
  });

  productItems = innerDoc.getElementsByClassName('products-item');
  productItemButtons = innerDoc.getElementsByClassName('products-btn');

  productItemInputs[0].addEventListener('input', function () {
    productItems[currentProduct - 1].querySelector('.products-heading').innerText = this.value;
  });
  productItemInputs[1].addEventListener('input', function () {
    productItems[currentProduct - 1].querySelector('.products-subheading').innerText = this.value;
  });
  productItemInputs[2].addEventListener('input', function () {
    productItemButtons[currentProduct - 1].innerText = this.value;
  });
  productItemInputs[3].addEventListener('input', function () {
    productItemButtons[currentProduct - 1].href = this.value;
  });
}
