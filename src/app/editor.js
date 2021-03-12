import { move, open, close, back, next, switchTabs } from './utils/editor-actions';

export const initEditor = function (innerDoc) {
  // Make each editor window movable (add eventListeners)
  const contentHeaders = document.getElementsByClassName('content-header');
  for (let k = 0; k < contentHeaders.length; k++) {
    move(document.querySelector('.editor'), contentHeaders[k]);
  }

  const frameTabs = document.getElementsByClassName('content-header-item');
  for (let k = 1; k < frameTabs.length; k++) {
    frameTabs[k].addEventListener('click', switchTabs);
  }

  const contentFooter = document.getElementsByClassName('content-footer');
  contentFooter[1].children[0].addEventListener('click', close);
  contentFooter[1].children[1].addEventListener('click', back);
  contentFooter[1].children[2].addEventListener('click', next);
  // contentFooter[1].children[3].addEventListener('click', done);

  addOpenEditorListeners(innerDoc);

  document.querySelector('.content-footer').addEventListener('click', close);
  document.querySelector('.close-editor-wrapper').addEventListener('click', close);
};

// Open Editor eventListeners
export function addOpenEditorListeners(innerDoc) {
  const openEditorSelectors = [...innerDoc.getElementsByClassName('open-editor')];
  openEditorSelectors.push(document.querySelector('.download-template'));

  for (let k = 0; k < openEditorSelectors.length; k++) {
    openEditorSelectors[k].onclick = function () {
      open(openEditorSelectors[k], innerDoc);
    };
  }
}
