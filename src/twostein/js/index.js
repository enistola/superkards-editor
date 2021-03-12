/* ------------------------------------------------------------------------ */
/*                           COUNTDOWN TIMER                                */
/* ------------------------------------------------------------------------ */

// const countdownValues = document.getElementsByClassName('countdown-value');
// const countDownDate = new Date(2020, 03, 20, 15, 40);
// console.log(countDownDate);

// Add Hours to Date Object
// Date.prototype.addHours = function (h) {
//   this.setTime(this.getTime() + h * 60 * 60 * 1000);
//   return this;
// };

// const countdownValues = document.getElementsByClassName('countdown-value');
// let countDownDate;

// localStorage.setItem('lastVisit', new Date());

// if (!localStorage.getItem('date')) {
//   const date = new Date().addHours(5);
//   localStorage.setItem('date', date);
//   countDownDate = date;
// } else {
//   countDownDate = new Date(localStorage.getItem('date'));
//   if (countDownDate < new Date()) {
//     countDownDate = new Date().addHours(5.5);
//   }
// }

// const countdown = setInterval(function () {
//   // Get today's date and time
//   const now = new Date().getTime();

//   // Find the distance between now and the count down date
//   const distance = countDownDate - now;

//   // Time calculations for days, hours, minutes and seconds
//   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//   // Display the result in the element with id="demo"
//   countdownValues[0].innerHTML = days;
//   countdownValues[1].innerHTML = hours;
//   countdownValues[2].innerHTML = minutes;
//   countdownValues[3].innerHTML = seconds;

//   // If the count down is finished, write some text
//   if (distance < 1000) {
//     clearInterval(countdown);
//     countdownValues[0].innerHTML = '--';
//     countdownValues[1].innerHTML = '--';
//     countdownValues[2].innerHTML = '--';
//     countdownValues[3].innerHTML = '--';
//     // document.querySelector('.main-product-buy').classList.add('hide-element');
//     // document.getElementById('after-discount-btn').classList.remove('hide-element');
//   }
// }, 1000);
