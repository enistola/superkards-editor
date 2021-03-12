import { getProductItemData } from '../more-products';
import { initTextArea, adjustTextareaHeight } from '../text-edit';

const contentFooter = document.getElementsByClassName('content-footer');
const editor = {
  editorWrapper: document.querySelector('.editor-wrapper'),
  editor: document.querySelector('.editor'),
  content: document.getElementsByClassName('content'),
  contentFooter1: contentFooter[0],
  contentFooter2: contentFooter[1],
  close: contentFooter[1].children[0],
  back: contentFooter[1].children[1],
  next: contentFooter[1].children[2],
  done: contentFooter[1].children[3],
};

/* ======================  MOVE EDITOR  ============================= */

/* @@ moveEditor() */
export function move(editor, contentHeader) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  contentHeader.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // disable transition css on opened-editor; caused slow movement
    editor.classList.add('editor-no-transition');
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    editor.style.top = editor.offsetTop - pos2 + 'px';
    editor.style.left = editor.offsetLeft - pos1 + 'px';
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
    // add transition to opened editor after dragging ends
    editor.classList.remove('editor-no-transition');
  }
}

/* ======================  OPEN & CLOSE  ============================= */

export const open = function (element, innerDoc) {
  // Check which content frame to show
  if (element.classList.contains('section-text')) initTextArea(element);
  if (element.classList.contains('intro')) document.getElementById('intro').classList.remove('hide-element');
  if (element.classList.contains('main-product-buy')) document.getElementById('main-product').classList.remove('hide-element');
  if (element.classList.contains('profile-image')) document.getElementById('about').classList.remove('hide-element');
  if (element.classList.contains('socials')) document.getElementById('social-media-editor').classList.remove('hide-element');
  if (element.classList.contains('more-products-hidden') || element.classList.contains('more-products-hover'))
    document.getElementById('more-products-counter').classList.remove('hide-element');
  if (element.classList.contains('products-item')) {
    const allProducts = innerDoc.getElementsByClassName('products-item');
    for (let k = 0; k < allProducts.length; k++) if (allProducts[k] === element) getProductItemData(k);
    document.getElementById('more-products').classList.remove('hide-element');
  }
  if (element.classList.contains('download-template')) prepareDownloadEditor();

  editor.editorWrapper.classList.remove('closed-editor-wrapper');
  editor.editor.classList.remove('closed-editor');
  editor.editorWrapper.classList.add('opened-editor-wrapper');
  editor.editor.classList.add('opened-editor');
  document.querySelector('.close-editor-wrapper').classList.remove('hide-element');
};

export const close = function () {
  editor.editorWrapper.classList.remove('opened-editor-wrapper');
  editor.editor.classList.remove('opened-editor');
  editor.editorWrapper.classList.add('closed-editor-wrapper');
  editor.editor.classList.add('closed-editor');
  document.querySelector('.close-editor-wrapper').classList.add('hide-element');

  setTimeout(() => {
    editor.contentFooter2.classList.add('hide-element');
    editor.contentFooter1.classList.remove('hide-element');

    for (let k = 0; k < editor.content.length; k++) {
      editor.content[k].classList.add('hide-element');
    }
  }, 220);
};

function prepareDownloadEditor() {
  editor.contentFooter1.classList.add('hide-element');
  editor.contentFooter2.classList.remove('hide-element');
  document.getElementById('final-touch').classList.remove('hide-element');
}

/* =====================  SWITCH BETWEEN TABS  ============================= */

export function switchTabs() {
  const frameElements = this.parentElement.parentElement.children;
  const headerElements = this.parentElement.children;
  let currentHeaderElement;
  // Switch active class to clicked header element
  for (let k = 0; k < headerElements.length; k++) {
    headerElements[k].classList.remove('active');
    if (this === headerElements[k]) currentHeaderElement = k;
  }
  this.classList.add('active');
  // Display element according to clicked header element
  for (let k = 1; k < frameElements.length; k++) {
    frameElements[k].classList.add('hide-element');
  }
  frameElements[currentHeaderElement + 1].classList.remove('hide-element');
}

/* ======================  FOOTER BACK / NEXT  ============================= */

export const back = function () {
  if (activeContent() === 1) {
    editor.back.classList.add('hide-element');
    editor.close.classList.remove('hide-element');
  }
  if (activeContent() === editor.content.length - 1) {
    editor.done.classList.add('hide-element');
    editor.next.classList.remove('hide-element');
  }
  const previousContent = editor.content[activeContent() - 1];
  editor.content[activeContent()].classList.add('hide-element');
  previousContent.classList.remove('hide-element');
};

export const next = function () {
  if (activeContent() === 0) {
    editor.close.classList.add('hide-element');
    editor.back.classList.remove('hide-element');
  }
  if (activeContent() === editor.content.length - 2) {
    editor.next.classList.add('hide-element');
    editor.done.classList.remove('hide-element');
  }
  const nextContent = editor.content[activeContent() + 1];
  editor.content[activeContent()].classList.add('hide-element');
  nextContent.classList.remove('hide-element');
};

function activeContent() {
  for (let k = 0; k < editor.content.length; k++) {
    if (!editor.content[k].classList.contains('hide-element')) return k;
  }
}
