import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate = null;
const startButton = document.querySelector('button[data-start]');
const datetimePicker = document.querySelector('#datetime-picker');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');
let countdownInterval = null;
startButton.disabled = true; // button is disabled after the page loading

const options = {
  enableTime: true, // date and time
  time_24hr: true,
  defaultDate: new Date(), // Current date
  minuteIncrement: 1, // Minute increment 1
  onClose(selectedDates) {
    const now = new Date(); // date now
    userSelectedDate = selectedDates[0]; // Store the selected date
    console.log(userSelectedDate);

    // Ensure the selected date is not in the past
    if (userSelectedDate <= now) {
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

// Initialization of flatpickr library (data selector) on #datetime-picker element
flatpickr('#datetime-picker', options);

// Start the countdown after click on button
startButton.addEventListener('click', function () {
  if (userSelectedDate) {
    startButton.disabled = true; // block the button and input after the cutdown start
    datetimePicker.disabled = true;
    startCountdown(userSelectedDate);
  }
});

// Start the countdown
function startCountdown(endDate) {
  clearInterval(countdownInterval); // Clear any previous interval

  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = endDate - now;

    // Stop the countdown and re-enable input when time is over
    if (timeRemaining <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay(0, 0, 0, 0);
      datetimePicker.disabled = false; // Re-enable input
      return;
    }

    // Calculate remaining time (days, hours, minutes, seconds)
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);

    // Update the timer display
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000); // each second
}

// Function to update the timer display
function updateTimerDisplay(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

// Function to add leading zero to a value if it has less than 2 digits
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Convert milliseconds to days, hours, minutes, and seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
