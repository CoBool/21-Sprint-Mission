// Form Password Eye Button
export function formPasswordEyeButton(e) {
  const $button = e.currentTarget;

  const $group = $button.closest(".form-block__group");
  const $input = $group.querySelector(".form-block__input");

  $button.classList.toggle("form-block__button-eye--active");
  $input.type = $button.classList.contains("form-block__button-eye--active") ? "text" : "password";
}

