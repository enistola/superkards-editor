import { initFixedBar } from './fixed-bar';
import { initCountdown } from './countdown';
import { initEditor } from './editor';
import { initTextEdit } from './text-edit';
import { initUpload } from './image-upload';
import { initSocialMedia } from './socialmedia';
import { initMoreProducts } from './more-products';
import { generateTemplate } from './download';
import { fixSafariPadding } from './utils/safari-fix';

window.onload = function () {
  const iframe = document.getElementById('iframeId');
  const innerDoc = iframe.contentDocument || iframe.contentWindow.document;

  initCountdown(innerDoc);
  initFixedBar();
  initEditor(innerDoc);
  initTextEdit(innerDoc);
  initUpload(innerDoc);
  initSocialMedia(innerDoc);
  initMoreProducts(innerDoc);

  this.document.querySelector('.download-website').addEventListener('click', generateTemplate);

  // Fix Safari bug with padding
  fixSafariPadding();
};
