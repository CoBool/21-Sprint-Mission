import { v } from "../utility/zod.js";
import { updateErrorMessage } from "../utility/form-ui.js";

const loginSchema = v.object({
  email: v
    .string()
    .trim()
    .required("이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
  password: v.string().trim().required("비밀번호를 입력해주세요."),
});

export function validateLogin() {
  const $form = document.getElementById("loginForm");
  if (!$form) return;

  const $submit = $form.querySelector("button[type='submit']");
  const errors = {};      // 각 필드별 에러 메시지 저장
  const touched = {};     // 사용자가 한 번이라도 blur한 필드 기록
  const validated = {};   // 실제 검증이 수행된 필드 기록

  // 이벤트 위임 방식: 폼 전체에 이벤트를 걸고 내부 요소에 대해 처리
  $form.addEventListener("blur", handleBlur, true);
  $form.addEventListener("submit", handleSubmit);

  /**
   * blur 이벤트 발생 시 필드 검증
   * 사용자가 처음 입력 후 벗어났을 때만 검증 수행
   */
  function handleBlur(e) {
    const { name } = e.target;
    if (!name) return;
    touched[name] = true;
    validateField(name);
  }

  /**
   * 단일 필드 검증 함수
   * - 필드 스키마 존재 여부 확인
   * - 검증 수행 후 errors / validated 상태 갱신
   * - UI 반영 및 제출 버튼 상태 갱신
   */
  function validateField(name) {
    const formData = Object.fromEntries(new FormData($form));
    const fieldSchema = loginSchema.shape[name];
    if (!fieldSchema) return;

    validated[name] = true;

    const result = fieldSchema.safeParse(formData[name], formData);
    if (result.success) {
      delete errors[name];
    } else {
      errors[name] = result.error;
    }

    updateErrorMessage($form, name, {
      valid: result.success,
      message: result.success ? "" : String(result.error),
    });

    updateSubmitState();
  }

  /**
   * 폼 전체 검증 및 제출 처리
   * - 모든 필드 일괄 검증
   * - 에러 발생 시 UI 업데이트 후 종료
   * - 통과 시 데이터 출력 및 폼 초기화
   */
  function handleSubmit(e) {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData($form));
    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      for (const key in result.error) {
        errors[key] = result.error[key];
        updateErrorMessage($form, key, {
          valid: false,
          message: result.error[key],
        });
      }
      updateSubmitState();
      return;
    }

    alert('로그인 성공!');
    window.location.href = "./items.html";
    resetForm();
  }

  /**
   * 제출 버튼 활성화 조건:
   * 1) 모든 필드가 검증 완료(validated)
   * 2) 에러가 존재하지 않음
   */
  function updateSubmitState() {
    const allValidated = Object.keys(loginSchema.shape).every(
      (key) => validated[key]
    );

    $submit.disabled = !allValidated || Object.keys(errors).length > 0;
  }

  /**
   * 폼 초기화 함수
   * - 실제 입력값 초기화
   * - 상태 객체 초기화
   * - 시각적 상태 초기화
   * - 제출 버튼 비활성화
   */
  function resetForm() {
    // 1. 실제 입력값 초기화
    $form.reset();
  
    // 2. 상태 객체 초기화
    Object.keys(errors).forEach((key) => delete errors[key]);
    Object.keys(touched).forEach((key) => delete touched[key]);
    Object.keys(validated).forEach((key) => delete validated[key]);
  
    // 3. 시각적 상태 초기화
    const groups = $form.querySelectorAll(".form-block__group");
    groups.forEach(($group) => {
      $group.classList.remove("valid", "invalid");
      const $error = $group.querySelector(".form-block__error-message");
      if ($error) $error.textContent = "";
    });
  
    // 4. 제출 버튼 비활성화
    $submit.disabled = true;
  }
}