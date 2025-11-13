const config = {
  groupSelector: ".form-block__group",
  errorMessageSelector: ".form-block__error-message",
  validClass: "valid",
  invalidClass: "invalid",
};

export function updateErrorMessage($form, name, { valid, message }) {
  const $input = $form.querySelector(`[name="${name}"]`);
  const $group = $input?.closest(config.groupSelector);
  const $error = $group?.querySelector(config.errorMessageSelector);

  if (!$group || !$error) return;

  $group.classList.toggle(config.validClass, valid);
  $group.classList.toggle(config.invalidClass, !valid);
  $error.textContent = message || "";
}