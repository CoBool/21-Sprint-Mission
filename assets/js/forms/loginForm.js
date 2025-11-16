import { required, email, minLength } from '../validation/rules.js';
import { createValidator } from '../validation/validationEngine.js'

const PASSWORD_MIN_LENGTH = 8;

/**
 * 로그인 폼 검증 규칙
 * 
 * @type {Object}
 * @property {Array} email 이메일 검증 규칙
 * @property {Array} password 비밀번호 검증 규칙
 */
const loginSchema = {
  email: [required('이메일을 입력해주세요.'), email('잘못된 이메일 형식입니다.')],
  password: [required('비밀번호를 입력해주세요.'), minLength(PASSWORD_MIN_LENGTH, `비밀번호를 ${PASSWORD_MIN_LENGTH}자 이상 입력해주세요.`)]
}

export function loginForm() {
  const $form = document.getElementById('loginForm');

  if ( !$form ) return;
  const validator = createValidator(loginSchema, $form);

  $form.addEventListener('blur', validator.handleBlur, true);
  $form.addEventListener('input', validator.handleInput, true);
  $form.addEventListener('submit', validator.handleSubmit);
}

