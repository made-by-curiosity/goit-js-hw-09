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

  for (let i = 1; i <= amount; i += 1) {
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
