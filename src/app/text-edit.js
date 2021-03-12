import { initCountdown, cancelCountdown } from './countdown';

/* ======================  EXPORT  ============================= */

export const initTextEdit = function (innerDoc) {
  initIntro(innerDoc);
  initMainProduct(innerDoc);
  initSocialMediaH4(innerDoc);
  initMoreProducts(innerDoc);
};

/* ===================  SECTION TEXT  =========================== */

const sectionTextInputs = document.getElementById('text-edit').getElementsByClassName('input');

export function initTextArea(element) {
  sectionTextInputs[0].value = element.children[0].innerText;
  sectionTextInputs[1].value = element.children[1].innerText;
  document.getElementById('text-edit').querySelector('.textarea').value = element.children[2].innerText;
  document.getElementById('text-edit').classList.remove('hide-element');
  adjustTextareaHeight(document.getElementById('text-edit').querySelector('.textarea'));
  addTextEditListeners(element);
}

function adjustTextareaHeight(textarea) {
  textarea.style.height = textarea.scrollHeight + 'px';
}

function addTextEditListeners(element) {
  console.log(element);
  for (let k = 0; k < sectionTextInputs.length; k++) {
    sectionTextInputs[k].oninput = function () {
      element.children[k].innerText = this.value;
    };
  }
}

/* ======================  INTRO  ============================= */
function initIntro(innerDoc) {
  const introInput = document.getElementById('intro').querySelector('.input');
  introInput.addEventListener('input', function () {
    innerDoc.querySelector('.intro-heading').innerText = this.value;
  });
}

/* ======================  MAIN PRODUCT  ============================= */
function initMainProduct(innerDoc) {
  const mainProductButtons = innerDoc.querySelector('.main-product').getElementsByClassName('buy-btn');
  const mainProductInputs = document.getElementById('main-product').getElementsByClassName('input');

  for (let k = 0; k < 5; k++) {
    mainProductInputs[k].addEventListener('input', function () {
      const date = new Date(
        mainProductInputs[2].value,
        mainProductInputs[0].value - 1,
        mainProductInputs[1].value,
        mainProductInputs[3].value,
        mainProductInputs[4].value
      );
      console.log(
        mainProductInputs[2].value,
        mainProductInputs[0].value - 1,
        mainProductInputs[1].value,
        mainProductInputs[3].value,
        mainProductInputs[4].value
      );
      cancelCountdown();
      initCountdown(innerDoc, date);
    });
  }

  mainProductInputs[5].addEventListener('input', function () {
    mainProductButtons[0].innerText = `Get now - ` + this.value;
  });
  mainProductInputs[6].addEventListener('input', function () {
    mainProductButtons[1].innerText = `Get now - ` + this.value;
  });
  mainProductInputs[7].addEventListener('input', function () {
    mainProductButtons[0].href = this.value;
    mainProductButtons[1].href = this.value;
  });
  mainProductInputs[8].addEventListener('input', function () {
    innerDoc.querySelector('.small-info-label').innerText = this.value;
  });
}

/* ======================  SOCIAL MEDIA  ============================= */
function initSocialMediaH4(innerDoc) {
  const socialHeaderInput = document.getElementById('social-media-editor').querySelector('.input');
  socialHeaderInput.addEventListener('input', function () {
    innerDoc.querySelector('.section-h4').innerText = this.value;
  });
}

/* ======================  MORE PRODUCTS  ============================= */
function initMoreProducts(innerDoc) {
  const moreProductsHeading = document.getElementById('more-products-counter').querySelector('.input');
  const sectionH2 = innerDoc.getElementsByClassName('section-h2');
  moreProductsHeading.addEventListener('input', function () {
    sectionH2[2].innerText = this.value;
  });
}
