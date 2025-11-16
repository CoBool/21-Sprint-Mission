import { EMAIL_REGEX } from './regex.js';

/**
 * 모든 규칙 함수는 다음 시그니처를 따른다:
 * 
 * (value: string, ctx: object) => string | null
 * 
 * value: 현재 필드 값
 * ctx:   전체 form 값(필드 간 비교용)
 * null:  성공
 * string: 에러 메시지
 */

/* 필수 입력 */
export function required(message = '필수 입력입니다.') {
  return function validator(value, ctx = {}) {
    return value && value.trim() ? null : message;
  };
}

/* 이메일 형식 */
export function email(message = '올바른 이메일 형식이 아닙니다.') {
  return function validator(value, ctx = {}) {
    return EMAIL_REGEX.test(value) ? null : message;
  };
}

/* 최소 길이 */
export function minLength(min, message = `${min}자 이상이어야 합니다.`) {
  return function validator(value, ctx = {}) {
    return value.length >= min ? null : message;
  };
}

/* 최대 길이 */
export function maxLength(max, message = `${max}자 이하이어야 합니다.`) {
  return function validator(value, ctx = {}) {
    return value.length <= max ? null : message;
  };
}

/* 패턴 검사 */
export function pattern(regex, message = '형식이 올바르지 않습니다.') {
  return function validator(value, ctx = {}) {
    return regex.test(value) ? null : message;
  };
}

/* 특정 필드와 값 비교 */
export function match(target, message = '값이 서로 일치하지 않습니다.') {
  return function validator(value, ctx = {}) {
    return ctx[target] === value ? null : message;
  };
}