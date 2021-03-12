export const initFixedBar = function () {
  // Switching between Desktop and Mobile view
  document.querySelector('.switch-screen').addEventListener('click', function () {
    if (document.querySelector('.switch-screen').classList.contains('desktop')) {
      document.querySelector('.iframe-wrapper').classList.add('switch-to-mobile');
      document.querySelector('.switch-screen').classList.remove('desktop');
      document.querySelector('.switch-screen').innerHTML = deviceSwitchIcons[0];
    } else {
      document.querySelector('.iframe-wrapper').classList.remove('switch-to-mobile');
      document.querySelector('.switch-screen').classList.add('desktop');
      document.querySelector('.switch-screen').innerHTML = deviceSwitchIcons[1];
    }
  });
};

const deviceSwitchIcons = [
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="#5b5b63" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
      class="feather feather-monitor">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
      <line x1="8" y1="21" x2="16" y2="21"></line>
      <line x1="12" y1="17" x2="12" y2="21"></line>
  </svg>
  <span class="disable-user-focus">Desktop</span>`,
  `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
      stroke="#5b5b63" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
      class="feather feather-smartphone">
      <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
      <line x1="12" y1="18" x2="12.01" y2="18"></line>
  </svg>
  <span class="disable-user-focus">Mobile</span>`,
];
