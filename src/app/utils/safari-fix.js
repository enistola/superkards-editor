// Check if browser is safari; if so, remove flex on content-items with multiple inputs
const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function (p) {
    return p.toString() === '[object SafariRemoteNotification]';
  })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));

export const fixSafariPadding = function () {
  if (isSafari) {
    document.getElementById('main-product').querySelector('.content-item').classList.add('display-block');
    document.getElementById('more-products').querySelector('.content-item').classList.add('display-block');
  }
};
