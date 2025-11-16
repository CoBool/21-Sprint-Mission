export function createFormState() {
  let errors = {};
  let touched = {};

  const updateErrors = function (name, message) {
    if (message) {
      errors[name] = message;
    } else {
      delete errors[name];
    }
  };

  const updateTouched = function (name) {
    touched[name] = true;
  };

  const isTouched = function(name) {
    return touched[name]
  }

  const getErrors = function() {
    return {...errors};
  }

  const getTouched = function() {
    return {...touched};
  }

  const reset = function () {
    errors = {};
    touched = {};
  };

  return { updateErrors, updateTouched, isTouched, getErrors, getTouched ,reset };
}
