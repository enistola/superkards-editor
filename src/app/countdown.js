// setInterval countdown variables - in global scope because it's needed
// to cancel running countdown before reinitiating new countdown
let countdown;

export const initCountdown = function (innerDoc, inputDate) {
  const countdownValues = innerDoc.getElementsByClassName('countdown-value');
  const mainProductButton = innerDoc.querySelector('.main-product-buy');
  const afterDiscountBUtton = innerDoc.getElementById('after-discount-btn');

  /**
   * @param inputDate is an Date Object
   * that takes input data from editor
   * and re-initializes the countdown timer
   *
   * TODO: Implement logic for @param inputDate
   *
   */
  // Add Hours to Date Object
  Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + h * 60 * 60 * 1000);
    return this;
  };

  let countDownDate;

  localStorage.setItem('lastVisit', new Date());

  if (inputDate) {
    countDownDate = inputDate;
  } else if (!localStorage.getItem('date')) {
    const date = new Date().addHours(5);
    localStorage.setItem('date', date);
    countDownDate = date;
  } else {
    countDownDate = new Date(localStorage.getItem('date'));
    if (countDownDate < new Date()) {
      countDownDate = new Date().addHours(5.5);
    }
  }

  function startCountdown() {
    afterDiscountBUtton.classList.add('hide-element');
    mainProductButton.classList.remove('hide-element');

    countdown = setInterval(function () {
      // Get today's date and time
      const now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;

      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Display the result in the element with id="demo"
      countdownValues[0].innerHTML = days;
      countdownValues[1].innerHTML = hours;
      countdownValues[2].innerHTML = minutes;
      countdownValues[3].innerHTML = seconds;

      // If the count down is finished, remove countdown, show button only
      if (distance < 1000) {
        clearInterval(countdown);
        mainProductButton.classList.add('hide-element');
        afterDiscountBUtton.classList.remove('hide-element');
      }
    }, 1000);
  }
  startCountdown();
};

export const cancelCountdown = function () {
  clearInterval(countdown);
};
