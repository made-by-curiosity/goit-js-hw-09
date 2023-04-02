import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let isTimerActive = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!selectedDates[0]) {
      alert('Please choose a date');
      return;
    }
    if (selectedDates[0].getTime() < Date.now()) {
      alert('Please choose a date in the future');
      this.clear();
      return;
    }
    refs.startBtn.disabled = false;
  },
};

const timePicker = flatpickr('#datetime-picker', options);

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  if (isTimerActive) {
    return;
  }
  timePicker.input.disabled = true;
  isTimerActive = true;
  const timerId = setInterval(() => {
    const pickedTime = timePicker.selectedDates[0].getTime();
    const currentTime = Date.now();
    let deltaTime = pickedTime - currentTime;
    const convertedTime = convertMs(deltaTime);

    updateTimerElements(convertedTime);

    if (deltaTime < 1000) {
      clearInterval(timerId);
    }
  }, 1000);
}

function updateTimerElements({ days, hours, minutes, seconds }) {
  refs.daysValue.textContent = days;
  refs.hoursValue.textContent = hours;
  refs.minutesValue.textContent = minutes;
  refs.secondsValue.textContent = seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
