import { validateLogin } from "../schemas/login.js";
import { validateSignup } from "../schemas/signup.js";
import { formPasswordEyeButton } from "./script.js";

document.addEventListener("DOMContentLoaded", () => {

  const $passwordEyeButtons = document.querySelectorAll(".form-block__button-eye");

  $passwordEyeButtons.forEach(button => {
    button.addEventListener("click", formPasswordEyeButton);
  });

  validateLogin();
  validateSignup();
});
