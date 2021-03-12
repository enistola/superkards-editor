import * as JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { getImageData } from './image-upload';

/* ======================  PREPARE FOR DOWNLOAD  ============================= */

// function createProductItemCSS() {
//   let result = '';
//   for (let k = 0; k < currentCounterValue; k++) {
//     if (imageData[k + 3]) {
//       result += `#product-item-${k + 1} {
//           background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('../assets/img/product-item-${k + 1}${
//         imageData[k + 3].type
//       }');
//         }\n`;
//     }
//   }

//   return result;
// }

// function insertImageType(index) {
//   if (!imageData[index]) return '.jpg';

//   return imageData[index].type;
// }

// function insertProducts() {
//   let result = '';
//   const products = innerDoc.getElementsByClassName('products-item');

//   for (let k = 0; k < products.length; k++) {
//     const item = `<div class="products-item" id="product-item-${k + 1}">
//       <div class="products-text">
//         <h4 class="products-heading">${products[k].children[0].children[0].innerHTML}</h4>
//         <h5 class="products-subheading">
//         ${products[k].children[0].children[1].innerHTML}
//         </h5>
//       </div>
//       <a href="${products[k].children[1].href}" class="buy-btn products-btn">${products[k].children[1].innerHTML}</a>
//     </div>`;

//     if (k % 2 === 0) {
//       result += '<div class="products-row">' + item;
//     } else {
//       result += item + '</div>';
//     }
//   }
//   return result;
// }

/* ======================  CREATE TEMPLATE  ============================= */

export const generateTemplate = function () {
  // CREATE ZIP FUNCTIONALITY
  const zip = new JSZip();
  const cssFolder = zip.folder('css');
  const jsFolder = zip.folder('js');
  const assetsFolder = zip.folder('assets');
  const imgFolder = assetsFolder.folder('img');

  zip.file(
    'index.html',
    `<!-- ******************************************
      *
      *  @ A SUPERKARDS.COM Original
      *
      *********************************************** -->
      <!DOCTYPE html>
      <html lang="en">
      
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, height=100%, initial-scale=1" />
      
        <title>${document.getElementById('download').querySelector('.input').value}</title>
        <meta name="description" content="A superkards original" />
        <meta name="author" content="superkards" />
      
        <!-- WEBFONTS & MORE -->
        <link href="https://fonts.googleapis.com/css?family=Poppins:300,400,700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css" crossorigin="anonymous" />
      
        <!-- CUSTOM CSS -->
        <link rel="stylesheet" href="css/index.css" />
        <link rel="shortcut icon" type="image/x-icon" href="assets/img/favicon${insertImageType(2)}" />
        
        <!-- GUMROAD JS -->
        <script src="https://gumroad.com/js/gumroad.js"></script>
      </head>
      
      <body>
        <div class="main main-visible">
          <section class="intro">
            <h1 class="intro-heading">
              ${innerDoc.querySelector('.intro-heading').innerHTML}
            </h1>
          </section>
          <section class="main-product">
            <h2 class="section-h2">${sectionH2[0].innerHTML}</h2>
            <h3 class="section-h3">${sectionH3[0].innerHTML}</h3>
            <p class="section-paragraph">
            ${sectionParagraph[0].innerHTML}
            </p>
            <div class="main-product-buy">
              <div class="countdown">
                <div class="countdown-item">
                  <div class="countdown-value">--</div>
                  <div class="countdown-label">Days</div>
                </div>
                <div class="countdown-item">
                  <div class="countdown-value">--</div>
                  <div class="countdown-label">Hrs</div>
                </div>
                <div class="countdown-item">
                  <div class="countdown-value">--</div>
                  <div class="countdown-label">Mins</div>
                </div>
                <div class="countdown-item">
                  <div class="countdown-value">--</div>
                  <div class="countdown-label">Secs</div>
                </div>
              </div>
              <a href="${innerDoc.querySelector('.buy-btn').href}" class="buy-btn">${innerDoc.querySelector('.buy-btn').innerHTML}</a>
            </div>
            <a href="${innerDoc.querySelector('#after-discount-btn').href}" class="buy-btn hide-element" id="after-discount-btn">${
      innerDoc.querySelector('#after-discount-btn').innerHTML
    }</a>
            <span class="small-info-label">${innerDoc.querySelector('.small-info-label').innerHTML}</span>
          </section>
          <section class="about">
            <div class="profile-image"></div>
            <h2 class="section-h2">${sectionH2[1].innerHTML}</h2>
            <h3 class="section-h3">${sectionH3[1].innerHTML}</h3>
            <p class="section-paragraph">
            ${sectionParagraph[1].innerHTML}
            </p>
            <div class="divider"></div>
            <h4 class="section-h4">${innerDoc.querySelector('.section-h4').innerHTML}</h4>
            <div class="socials">
              ${innerDoc.querySelector('.socials').innerHTML}
            </div>
          </section>
          <section class="more-products">
            <h2 class="section-h2">${sectionH2[2].innerHTML}</h2>
            ${insertProducts()}
          </section>
        </div>
      
        <script src="js/index.js"></script>
      </body>
      
      </html>
      `
  );

  zip.generateAsync({ type: 'blob' }).then(function (content) {
    saveAs(content, 'superkards.zip');
  });
};
