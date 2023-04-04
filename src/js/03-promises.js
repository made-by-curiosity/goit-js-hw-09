import Notiflix from 'notiflix';

const refs = {
  createPromisesBtn: document.querySelector('button[type="submit"]'),
  firstDelayInput: document.querySelector('input[name="delay"]'),
  delayStepInput: document.querySelector('input[name="step"]'),
  delaysAmountInput: document.querySelector('input[name="amount"]'),
};

refs.createPromisesBtn.addEventListener('click', onPromiseBtnClick);

function onPromiseBtnClick(e) {
  const firstDelay = Number(refs.firstDelayInput.value);
  const delayStep = Number(refs.delayStepInput.value);
  const amount = Number(refs.delaysAmountInput.value);
  let promiseTimeout = firstDelay;

  e.preventDefault();

  if (amount > 100) {
    showTooManyPromisesNotification();
    return;
  }

  if (firstDelay <= 0 || delayStep === 0 || amount <= 0) {
    showEmptyFieldsNotification();
    return;
  }

  for (let i = 1; i <= amount; i += 1) {
    if (promiseTimeout < 0) {
      showTimeoutNotification();
      break;
    }

    createPromise(i, promiseTimeout)
      .then(({ position, delay }) => {
        showSuccessNotification(position, delay);
      })
      .catch(({ position, delay }) => {
        showErrorNotification(position, delay);
      });

    promiseTimeout += delayStep;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

function showSuccessNotification(position, delay) {
  const message = `✅ Fulfilled promise ${position} in ${delay}ms`;

  Notiflix.Notify.success(message);
}

function showErrorNotification(position, delay) {
  const message = `❌ Rejected promise ${position} in ${delay}ms`;

  Notiflix.Notify.failure(message);
}

function showEmptyFieldsNotification() {
  const message = `Все поля должны быть заполнены, а First delay и Amount должны быть больше 0`;

  Notiflix.Notify.warning(message);
}

function showTimeoutNotification() {
  const message = `Время таймаута не может быть меньше 0. Пожалуйста, выберите другие значения`;

  Notiflix.Notify.warning(message);
}

function showTooManyPromisesNotification() {
  const message = `Ну это слишком! Вы уверены, что вам нужно столько промисов? Я бы не выбирал больше 100`;

  Notiflix.Notify.warning(message);
}
