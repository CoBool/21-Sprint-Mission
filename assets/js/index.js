import { loginForm } from './forms/loginForm.js'
import { signupForm } from './forms/signupForm.js'

document.addEventListener('DOMContentLoaded', () => {
  loginForm();
  signupForm();

  const $eyeButton = document.querySelectorAll('.form-block__button-eye');
  $eyeButton.forEach(($button) => {
    $button.addEventListener('click', (e) => {
      const $target = e.currentTarget;
      const $group = $target.closest('.form-block__group');
      const $input = $group.querySelector('.form-block__input');
      $target.classList.toggle('form-block__button-eye--active');
      $input.type = $input.type === 'password' ? 'text' : 'password';
    });
  });
})
