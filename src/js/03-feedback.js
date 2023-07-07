
import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

// Заповнення полів форми з локального сховища при завантаженні сторінки
window.addEventListener('DOMContentLoaded', () => {
  const savedState = localStorage.getItem(storageKey);
  if (savedState) {
    const { email, message } = JSON.parse(savedState);
    emailInput.value = email;
    messageInput.value = message;
  }
});

// Збереження значень полів у локальне сховище при введенні
const saveState = throttle(() => {
  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(state));
}, 500);

form.addEventListener('input', saveState);

// Очищення сховища та полів форми при сабміті
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const state = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';

  console.log(state);
});
