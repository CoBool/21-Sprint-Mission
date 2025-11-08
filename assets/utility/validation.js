// 상수선언
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // 이메일 정규식
const NICKNAME_REGEX_KR = /^[가-힣]{2,}$/; // 한글 2자 이상 정규식
const NICKNAME_REGEX_EN = /^[a-zA-Z\s]{2,}$/; // 영문 2자 이상 정규식
const PASSWORD_MIN_LENGTH = 8; // 비밀번호 최소 길이

/* 
  * 이메일 검증
  * @param {string} value - 이메일 값
  * @returns {object} - 검증 결과
  * @returns {boolean} valid - 검증 결과
  * @returns {string} message - 검증 메시지
*/
export function validatorEmail(value) {
  if (!value.trim()) {
    return {
      valid: false,
      message: "이메일을 입력해주세요.",
    };
  }

  if (!EMAIL_REGEX.test(value)) {
    return {
      valid: false,
      message: "잘못된 이메일 형식입니다.",
    };
  }

  return { valid: true, message: "" };
}

/* 
  * 닉네임 검증
  * @param {string} value - 닉네임 값
  * @returns {object} - 검증 결과
  * @returns {boolean} valid - 검증 결과
  * @returns {string} message - 검증 메시지
*/
export function validatorNickname(value) {
  if (!value.trim()) {
    return {
      valid: false,
      message: "닉네임을 입력해주세요.",
    };
  }

  if (!NICKNAME_REGEX_KR.test(value.trim()) && !NICKNAME_REGEX_EN.test(value.trim())) {
    return {
      valid: false,
      message: "닉네임은 한글 2자 이상 또는 영문 2자 이상이여아 합니다.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}

/* 
  * 비밀번호 검증
  * @param {string} value - 비밀번호 값
  * @returns {object} - 검증 결과
  * @returns {boolean} valid - 검증 결과
  * @returns {string} message - 검증 메시지
*/
export function validatorPassword(value) {
  if(!value) {
    return {
      valid: false,
      message: "비밀번호를 입력해주세요.",
    };
  }

  if(value.length < PASSWORD_MIN_LENGTH) {
    return {
      valid: false,
      message: `비밀번호를 ${PASSWORD_MIN_LENGTH}자 이상 입력해주세요.`,
    };
  }

  return {
    valid: true,
    message: "",
  };
}

/* 
  * 비밀번호 확인 검증
  * @param {string} value - 비밀번호 확인 값
  * @param {string} password - 비밀번호 값
  * @returns {object} - 검증 결과
  * @returns {boolean} valid - 검증 결과
  * @returns {string} message - 검증 메시지
*/
export function validatorPasswordConfirm(value, password) {
  if(!value) {
    return {
      valid: false,
      message: "비밀번호 확인을 입력해주세요.",
    };
  }

  if(value !== password) {
    return {
      valid: false,
      message: "비밀번호가 일치하지 않습니다.",
    };
  }

  return {
    valid: true,
    message: "",
  };
}

