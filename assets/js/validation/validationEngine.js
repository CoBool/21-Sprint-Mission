import { createFormState } from './formState.js';

export function createValidator(schema, $formEl) {
  const state = createFormState();

  function getAllValues() {
    const formData = Object.fromEntries(new FormData($formEl));

    return formData;
  }

  function runRules(name, value, ctx) {
    const rules = schema[name];

    for(let rule of rules) {
      const error = rule(value, ctx);
      if(error) return error;
    }

    return null;
  }

  function validateField(name) {
    const ctx = getAllValues();
    const value = ctx[name];
    
    const error = runRules(name, value, ctx);

    state.updateTouched(name);
    state.updateErrors(name, error);

    applyUI(name);
  }

  function applyUI(name) {
    const $input = $formEl?.querySelector(`[name="${name}"]`);
    const $group = $input?.closest('.form-block__group');

    if ( !$input || !$group ) return;

    console.log('여기서 책임분리 필요한데?');
  }

  const handleBlur = function(e) {
    const { name } = e.target;

    validateField(name)
  }

  const handleInput = function(e) {
    const { name } = e.target;
    const touched = state.isTouched(name);

    if (!touched) return;

    validateField(name);
  };

  const handleSubmit = function(e) {
    console.log('준비중~');
  }

  return { handleBlur, handleInput, handleSubmit }
}