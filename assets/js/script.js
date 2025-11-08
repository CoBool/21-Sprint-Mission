import {
  validatorEmail,
  validatorNickname,
  validatorPassword,
  validatorPasswordConfirm,
} from "../utility/validation.js";

/*
 * 에러 메시지 설정
 * @param {HTMLElement} element - 에러 메시지를 설정할 요소
 * @param {string} message - 에러 메시지
 */
function setError(element, message) {
  if (!element) return;

  const $group = element.closest(".form-block__group");
  const $errorElement = $group?.querySelector(".form-block__error-message");

  if ($group) {
    $group.classList.remove("valid");
    $group.classList.add("invalid");
    element.setAttribute("aria-invalid", "true");
  }

  if ($errorElement) {
    $errorElement.textContent = message;
  }
}

/*
 * 에러 메시지 초기화
 * @param {HTMLElement} element - 에러 메시지를 초기화할 요소
 */
function clearError(element) {
  if (!element) return;

  const $group = element.closest(".form-block__group");
  const $errorElement = $group?.querySelector(".form-block__error-message");

  if ($group) {
    $group.classList.add("valid");
    $group.classList.remove("invalid");
    element.setAttribute("aria-invalid", "false");
  }

  if ($errorElement) {
    $errorElement.textContent = "";
  }
}

function validatorsAll(validators) {
  let isValid = true;
  const errors = validators
    .map((validator) => {
      const result = validator.validate(validator.field.value);
      return !result.valid;
    })
    .filter(Boolean);

  if (errors.length > 0) {
    isValid = false;
  }

  return isValid;
}

export function validateLoginForm() {
  const $form = document.querySelector("#loginForm");

  // early return 패턴으로 존재하지 않는 경우 종료
  if (!$form) return;

  const $emailInput = $form.querySelector("#email");
  const $passwordInput = $form.querySelector("#password");
  const $submitButton = $form.querySelector("#submitButton");

  if (!$emailInput || !$passwordInput || !$submitButton) return;

  const validators = [
    { field: $emailInput, validate: validatorEmail },
    { field: $passwordInput, validate: validatorPassword },
  ];

  $emailInput.addEventListener("blur", () => {
    const result = validatorEmail($emailInput.value);

    if (result.valid) {
      clearError($emailInput);
    } else {
      setError($emailInput, result.message);
    }

    const isValid = validatorsAll(validators);
    $submitButton.disabled = !isValid;
  });

  $passwordInput.addEventListener("blur", () => {
    const result = validatorPassword($passwordInput.value);

    if (result.valid) {
      clearError($passwordInput);
    } else {
      setError($passwordInput, result.message);
    }

    const isValid = validatorsAll(validators);
    $submitButton.disabled = !isValid;
  });
}

export function validateSignupForm() {
  const $form = document.querySelector("#signupForm");

  // early return 패턴으로 존재하지 않는 경우 종료
  if (!$form) return;

  const $emailInput = $form.querySelector("#email");
  const $nicknameInput = $form.querySelector("#nickname");
  const $passwordInput = $form.querySelector("#password");
  const $passwordConfirmInput = $form.querySelector("#passwordConfirm");
  const $submitButton = $form.querySelector("#submitButton");

  if (
    !$emailInput ||
    !$nicknameInput ||
    !$passwordInput ||
    !$passwordConfirmInput ||
    !$submitButton
  )
    return;

  // 비밀번호 검증은 다른 Input 과 상호작용이 필요해서 함수형태로 만들고 리턴.
  const validators = [
    { field: $emailInput, validate: validatorEmail },
    { field: $nicknameInput, validate: validatorNickname },
    { field: $passwordInput, validate: validatorPassword },
    { field: $passwordConfirmInput, validate: () => { return validatorPasswordConfirm($passwordConfirmInput.value, $passwordInput.value); } },
  ];

  $emailInput.addEventListener("blur", () => {
    const result = validatorEmail($emailInput.value);

    if (result.valid) {
      clearError($emailInput);
    } else {
      setError($emailInput, result.message);
    }

    const isValid = validatorsAll(validators);
    $submitButton.disabled = !isValid;
  });

  $nicknameInput.addEventListener("blur", () => {
    const result = validatorNickname($nicknameInput.value);

    if (result.valid) {
      clearError($nicknameInput);
    } else {
      setError($nicknameInput, result.message);
    }

    const isValid = validatorsAll(validators);
    $submitButton.disabled = !isValid;
  });

  $passwordInput.addEventListener("blur", () => {
    const result = validatorPassword($passwordInput.value);

    if (result.valid) {
      clearError($passwordInput);
    } else {
      setError($passwordInput, result.message);
    }

    const isValid = validatorsAll(validators);
    $submitButton.disabled = !isValid;
  });

  $passwordConfirmInput.addEventListener("blur", () => {
    const result = validatorPasswordConfirm(
      $passwordConfirmInput.value,
      $passwordInput.value
    );

    if (result.valid) {
      clearError($passwordConfirmInput);
    } else {
      setError($passwordConfirmInput, result.message);
    }

    const isValid = validatorsAll(validators);
    $submitButton.disabled = !isValid;
  });
}

// Form Password Eye Button
export function formPasswordEyeButton(e) {
  const $button = e.target;

  console.log(e);

  const $group = $button.closest(".form-block__group");
  const $input = $group.querySelector(".form-block__input");

  $button.classList.toggle("form-block__button-eye--active");
  $input.type = $button.classList.contains("form-block__button-eye--active") ? "text" : "password";
}

