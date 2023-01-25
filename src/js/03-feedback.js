// This script does the following:
// - Saves form field values to local storage when the user types something
// - Fills in the form fields with saved data on page load
// - Clears the storage and form fields on form submission while also logging the form data to the console
// - Updates the local storage no more than once every 500 milliseconds using the lodash.throttle library

import { throttle } from 'lodash';

const updateStorage = throttle(function (email, message) {
  localStorage.setItem(
    'feedback-form-state',
    JSON.stringify({ email, message })
  );
}, 500);

const formElement = document.querySelector('.feedback-form');
const emailInput = formElement.querySelector('input[name="email"]');
const messageInput = formElement.querySelector('textarea[name="message"]');

formElement.addEventListener('input', () => {
  updateStorage(emailInput.value, messageInput.value);
});

const savedState = localStorage.getItem('feedback-form-state');

if (savedState) {
  const { email, message } = JSON.parse(savedState);
  emailInput.value = email;
  messageInput.value = message;
}

formElement.addEventListener('submit', event => {
  event.preventDefault();
  console.log({ email: emailInput.value, message: messageInput.value });
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
});
