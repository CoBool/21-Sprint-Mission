import { createFormState } from "./formState.js";

export function createValidator(schema, $formEl, onSubmit) {
  const state = createFormState();
  const $submit = $formEl.querySelector('#submitButton');
  const fieldNames = Object.keys(schema);

  function getAllValues() {
    const formData = Object.fromEntries(new FormData($formEl));

    return formData;
  }

  function runRules(name, value, ctx) {
    const rules = schema[name] ?? [];

    for (let rule of rules) {
      const error = rule(value, ctx);
      if (error) return error;
    }

    return null;
  }

  function isFormValid() {
    const errors = state.getErrors();
    const touched = state.getTouched();

    return fieldNames.every(
      (name) => touched[name] && !errors[name]
    );
  }

  function updateSubmitState() {
    if (!$submit) return;

    const valid = isFormValid();
    $submit.disabled = !valid;
  }

  function validateField(name) {
    if (!(name in schema)) return;
    const ctx = getAllValues();
    const value = ctx[name];

    const error = runRules(name, value, ctx);

    state.updateTouched(name);
    state.updateErrors(name, error);

    applyUI(name, error);
    updateSubmitState();
  }

  function validateAll() {
    const ctx = getAllValues();

    fieldNames.forEach((name) => {
      validateField(name, ctx);
    });
  }

  function applyUI(name, error) {
    const $input = $formEl?.querySelector(`[name="${name}"]`);
    if (!$input) return;

    const $group = $input.closest('.form-block__group');
    if (!$group) return;

    const $error = $group.querySelector('.form-block__error-message');

    $group.classList.toggle('valid', !error);
    $group.classList.toggle('invalid', !!error);

    if ($error) {
      $error.textContent = error || '';
    }
  }

  const handleBlur = function (e) {
    const { name } = e.target;

    validateField(name);
  };

  const handleInput = function (e) {
    const { name } = e.target;
    const touched = state.isTouched(name);

    if (!touched) return;

    validateField(name);

    /**
     * 무식하게 처리해보기.
     * 
     * 대안 1. 스키마에 참조 옵션넣기 (어떤식으로..?)
     * 대안 2. Input 이벤트 발생할때마다 validateAll() 호출?
     * 대안 3. 없음
     */
    if ( name === 'password' ) {
      validateField('passwordConfirm');
    }
  };

  const handleSubmit = function (e) {
    e.preventDefault();

    validateAll();

    if (!isFormValid()) return;
    
    const data = getAllValues();
    onSubmit(data);
  };

  return { handleBlur, handleInput, handleSubmit };
}
