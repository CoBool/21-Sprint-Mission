import { validateLoginForm, validateSignupForm, formPasswordEyeButton } from "./script.js";

// import { v } from "../utility/zod.js"; 

document.addEventListener("DOMContentLoaded", () => {
  /* 
    * 로그인 폼 검증
    * 회원가입 폼 검증
    * 
    * 분리 이유 - 각 페이지별로 검증로직이 다름.
    * 따라서 각 페이지별로 검증로직을 분리하여 관리하기 위함.
    * 
    * early return 패턴으로 존재하지 않는 경우 종료하여 안정성 유지
  */
  validateLoginForm();
  validateSignupForm();

  const $passwordEyeButtons = document.querySelectorAll(".form-block__button-eye");

  $passwordEyeButtons.forEach(button => {
    button.addEventListener("click", formPasswordEyeButton);
  });
});
