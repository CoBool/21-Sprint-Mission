import { required, email, minLength, match } from '../validation/rules.js';
import { createValidator } from '../validation/validationEngine.js'

const NICKNAME_MIN_LENGTH = 2;
const PASSWORD_MIN_LENGTH = 8;

/**
 * 회원가입 폼 검증 규칙
 * 
 * @type {Object}
 * @property {Array} email 이메일 검증 규칙
 * @property {Array} nickname 닉네임 검증 규칙
 * @property {Array} password 비밀번호 검증 규칙
 * @property {Array} passwordConfirm 비밀번호확인 검증 규칙
 */

const signupSchema = {
  email: [required('이메일을 입력해주세요.'), email('잘못된 이메일 형식입니다.')],
  nickname: [required('닉네임을 입력해주세요.'), minLength(NICKNAME_MIN_LENGTH, `닉네임을 ${NICKNAME_MIN_LENGTH}자 이상 입력해주세요.`)],
  password: [required('비밀번호를 입력해주세요.'), minLength(PASSWORD_MIN_LENGTH, `비밀번호를 ${PASSWORD_MIN_LENGTH}자 이상 입력해주세요.`)],
  passwordConfirm: [required('비밀번호확인을 입력해주세요.'), match('password', '비밀번호가 일치하지 않습니다.')]
}

export function signupForm() {
  const $form = document.getElementById('signupForm');

  if ( !$form ) return;
  const validator = createValidator(signupSchema, $form, (data) => {
    console.log(data);
  });

  $form.addEventListener('blur', validator.handleBlur, true);
  $form.addEventListener('input', validator.handleInput, true);
  $form.addEventListener('submit', validator.handleSubmit);
}