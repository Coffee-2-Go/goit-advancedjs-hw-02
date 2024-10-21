import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', function (event) {
  event.preventDefault();

  // Get delay
  const delayInput = document.querySelector('input[name="delay"]');
  const delay = parseInt(delayInput.value);

  // Get state: fulfilled or rejected
  const state = document.querySelector('input[name="state"]:checked').value;

  // Create promise
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay); // Fulfill promise
      } else {
        reject(delay); // Reject promise
      }
    }, delay);
  });

  // Elaborate promise
  promise
    .then(delay => {
      iziToast.success({
        message: `Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch(delay => {
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
});
