import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');
const timerDisplay = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let countdown;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      window.alert('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(datetimePicker, options);

startButton.addEventListener('click', () => {
  startTimer();
});

function startTimer() {
  const targetDate = new Date(datetimePicker.value);
  startButton.disabled = true;

  countdown = setInterval(() => {
    const currentTime = new Date();
    const timeLeft = targetDate - currentTime;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      return;
    }

    updateTimerDisplay(convertMs(timeLeft));
  }, 1000);
}

function updateTimerDisplay(time) {
  timerDisplay.days.textContent = addLeadingZero(time.days);
  timerDisplay.hours.textContent = addLeadingZero(time.hours);
  timerDisplay.minutes.textContent = addLeadingZero(time.minutes);
  timerDisplay.seconds.textContent = addLeadingZero(time.seconds);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// style
const style = document.createElement('style');
style.type = 'text/css';

// CSS
const css = `
.timer {
  font-family: 'Arial', sans-serif;
  color: #000;
}

.field {
  margin: 0;
  padding: 10px;
  display: inline-block;
}

.value {
  font-size: 2em;
  font-weight: bold;
}

.label {
  display: block;
  font-size: 0.75em;
  margin-top: 5px;
}
`;

// CSS стили в элементе style
if (style.styleSheet) {
  style.styleSheet.cssText = css;
} else {
  style.appendChild(document.createTextNode(css));
}

// Добавляем style в head
document.head.appendChild(style);
