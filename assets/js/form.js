const messages = {
  email: {
    required: "이메일을 입력해주세요.",
    invalid: "이메일 형식이 올바르지 않습니다.",
  },
  nickname: {
    required: "닉네임을 입력해주세요.",
    invalid: "닉네임은 2자 이상이어야 합니다.",
  },
  password: {
    required: "비밀번호를 입력해주세요.",
    invalid: "비밀번호는 8자 이상이어야 합니다.",
  },
  passwordConfirm: {
    required: "비밀번호 확인을 입력해주세요.",
    invalid: "비밀번호가 일치하지 않습니다.",
  },
};

const form = document?.querySelector(".form-block");
const button = form?.querySelector(".form-block__button");

const config = {
  login: {
    email: { validator: validateEmail, isInvalid: true },
    password: { validator: validatePassword, isInvalid: true },
  },
  signup: {
    email: { validator: validateEmail, isInvalid: true },
    nickname: { validator: validateNickname, isInvalid: true },
    password: { validator: validatePassword, isInvalid: true },
    passwordConfirm: {
      validator: (passwordConfirm) => {
        const passwordInput = form?.querySelector('[name="password"]');
        const password = passwordInput?.value;

        // 비밀번호가 입력되지 않은 경우 통과
        if (!password || password.trim() === "") {
          return true;
        }

        return validatePasswordMatch(passwordConfirm, password);
      },
      isInvalid: true,
    },
  },
};

// 에러 표시 함수
function showError(group, msg) {
  group.classList.add("form-block__group--error");
  group.querySelector(".form-block__error-message").textContent = msg;
}
function clearError(group) {
  group.classList.remove("form-block__group--error");
  group.querySelector(".form-block__error-message").textContent = "";
}

// 이벤트 나중에 함수로 분리해서 사용
form.addEventListener("focusout", (e) => {
  const formType = form.dataset.type;
  const target = e.target;
  const name = target.name;
  const value = target.value.trim();
  const group = target.closest(".form-block__group");
  if (!config[formType]?.[name]) return;

  if (!value) {
    showError(group, messages[name].required);
    config[formType][name].isInvalid = true;
  } else if (!config[formType]?.[name].validator(value)) {
    showError(group, messages[name].invalid);
    config[formType][name].isInvalid = true;
  } else {
    clearError(group);
    config[formType][name].isInvalid = false;
  }

  // 버튼 제어
  const hasInvalid = Object.values(config[formType]).some((f) => f.isInvalid);

  button.disabled = hasInvalid;
});

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
