export const initSocialMedia = function (innerDoc) {
  const plusSymbol = document.querySelector('.socials-header--plus');

  let socialEditorIcons = document.getElementsByClassName('socials-header--icon');
  let templateSocials = innerDoc.getElementsByClassName('socialmedia');

  // EventListener - Change URL and icon when inputs get changed
  document.getElementById('socials-select').addEventListener('change', function () {
    socialEditorIcons[getcurrentSocial()].innerHTML = this.value;
    templateSocials[getcurrentSocial()].innerHTML = this.value;
  });
  document.getElementById('socials-url').addEventListener('input', function () {
    templateSocials[getcurrentSocial()].href = this.value;
  });

  // @@ Add eventListener to social header icons (+ whenever icon gets added / deleted)
  function addEventListenerTosocialEditorIcons() {
    for (let k = 0; k < socialEditorIcons.length; k++) {
      socialEditorIcons[k].onclick = function () {
        switchBetweenSocials(socialEditorIcons[k], k);
      };
    }
  }
  addEventListenerTosocialEditorIcons();

  function switchBetweenSocials(element, index) {
    for (let k = 0; k < socialEditorIcons.length; k++) {
      socialEditorIcons[k].classList.remove('active');
    }
    element.classList.add('active');
    document.getElementById('socials-select').value = templateSocials[index].innerHTML;
    document.getElementById('socials-url').value = templateSocials[index].href;
  }

  function deleteSocial() {
    try {
      // remove elements
      templateSocials[getcurrentSocial()].remove();
      socialEditorIcons[getcurrentSocial()].remove();
      // refresh data
      socialEditorIcons = document.getElementsByClassName('socials-header--icon');
      templateSocials = innerDoc.getElementsByClassName('socialmedia');
      if (socialEditorIcons.length > 0) {
        socialEditorIcons[0].classList.add('active');
        document.getElementById('socials-select').value = templateSocials[0].innerHTML;
        document.getElementById('socials-url').value = templateSocials[0].href;
      } else {
        document.getElementById('socials-select').value = '<i class="fab fa-angellist socials-fontawesome angellist"></i>';
        document.getElementById('socials-url').value = '';
      }
      // show "add" symbol
      plusSymbol.classList.remove('hide-element');
      // reapply eventListeners
      addEventListenerTosocialEditorIcons();
    } catch (err) {
      console.log(`You've already deleted all social media`);
    }
  }
  document.querySelector('.socials-delete').addEventListener('click', deleteSocial);

  function addSocial() {
    // add icon to innerDoc socialmedia
    createInnerDocIcon();
    // add icon to social header
    createSocialHeaderIcon();
    // remove "add" button if there're 5 icons
    if (socialEditorIcons.length >= 5) plusSymbol.classList.add('hide-element');
  }
  plusSymbol.addEventListener('click', addSocial);

  function createSocialHeaderIcon() {
    // create new icon
    const newSocial = document.createElement('div');
    newSocial.classList.add('socials-header--icon');
    newSocial.innerHTML = `<i class="fab fa-angellist socials-fontawesome angellist"></i>`;
    // insert new icon
    plusSymbol.parentNode.insertBefore(newSocial, plusSymbol);
    // refresh socialEditorIcons + eventListener
    socialEditorIcons = document.getElementsByClassName('socials-header--icon');
    addEventListenerTosocialEditorIcons();
    // refresh editor input fields if all socials were deleted and new one is added
    if (getcurrentSocial() === -1) {
      socialEditorIcons[0].classList.add('active');
      document.getElementById('socials-select').value = templateSocials[0].innerHTML;
      document.getElementById('socials-url').value = templateSocials[0].href;
    }
  }

  function createInnerDocIcon() {
    // create new icon
    const newTemplateIcon = document.createElement('a');
    newTemplateIcon.classList.add('socialmedia');
    newTemplateIcon.href = 'https://superkards.com';
    newTemplateIcon.target = '_blank';
    newTemplateIcon.innerHTML = '<i class="fab fa-angellist socials-fontawesome angellist"></i>';
    // insert new icon
    innerDoc.querySelector('.socials').appendChild(newTemplateIcon);
    // refresh templateSocials
    templateSocials = innerDoc.getElementsByClassName('socialmedia');
  }

  function getcurrentSocial() {
    for (let k = 0; k < socialEditorIcons.length; k++) {
      if (socialEditorIcons[k].classList.contains('active')) return k;
    }
    return -1;
  }
};
