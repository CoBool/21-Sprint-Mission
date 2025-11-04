const form = document.querySelector("form.form-block");
const submitButton = form.querySelector("button.form-block__button");

const rules = {
  required: (val) => val.trim() !== "",
  email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val),
  min: (val, len) => val.trim().length >= Number(len),
  max: (val, len) => val.trim().length <= Number(len),
  match: (val, targetName, input) => {
    const currentForm = input.closest("form");
    const target = currentForm?.querySelector(`[name="${targetName}"]`);
    if (!target) return true;
    return val === target.value;
  },
}

const messages = {
  required: "필수 입력 항목입니다.",
  email: "이메일 형식이 올바르지 않습니다.",
  min: (len) => `최소 ${len}자 이상 입력해주세요.`,
  max: (len) => `최대 ${len}자 이하 입력해주세요.`,
  match: "비밀번호가 일치하지 않습니다.",
}

function showError(input, message) {
  const field = input.closest(".form-block__group");
  const errorEl = field.querySelector(".form-block__error-message");
  field.classList.add("invalid");
  field.classList.remove("valid");
  errorEl.textContent = message;
}

function showSuccess(input) {
  const field = input.closest(".form-block__group");
  const errorEl = field.querySelector(".form-block__error-message");
  field.classList.remove("invalid");
  field.classList.add("valid");
  errorEl.textContent = "";
}

function validateInput(input) {
  const value = input.value;
  const validateSet = input.dataset.validate;

  if (!validateSet) return true;

  const validators = validateSet.split("|");

  for (const rule of validators) {
    const [name, param] = rule.split(":");
    const fn = rules[name];
    if (!fn) continue;

    const isValid = param ? fn(value, param, input) : fn(value);

    if (!isValid) {
      const msg = typeof messages[name] === "function" ? messages[name](param) : messages[name];
      showError(input, msg);

      return false;
    }
  }

  showSuccess(input);
  return true;
}

function updateButtonState() {
  const inputs = form.querySelectorAll("input[data-validate]");
  const allValid = [...inputs].every((input) => validateInput(input));
  submitButton.disabled = !allValid;
}

form.addEventListener("focusout", (e) => {
  if (e.target.matches("input")) {
    validateInput(e.target);
    updateButtonState();
  }
})

// 눈 버튼 이벤트 나중에 함수로 분리해서 사용
const eyeButton = form.querySelectorAll("button.form-block__button-eye");
eyeButton.forEach((button) => {
  button.addEventListener("click", () => {
    const group = button.closest(".form-block__group");
    const input = group.querySelector(".form-block__input");
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";

    if (input.type === "text") {
      button.classList.add("form-block__button-eye--active");
    } else {
      button.classList.remove("form-block__button-eye--active");
    }
  });
});
