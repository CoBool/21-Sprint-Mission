import { useState } from "react";

export const useForm = ({
  initialValues, validate, onAction,
}) => {
  // --- 1. 상태 (State) 정의
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // --- 2. 로직 & 핸들러
  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched({...touched, [name]: true});

    const nextErrors = validate(values);
    setErrors(nextErrors);
  }
  
  const handleChange = (e) => {
    const { name, value, type } = e.target;

    let newValue = value;

    if ( type === "file" ) {
      const newFiles = Array.from(e.target.files || []);
      const currentValues = values[name];

      if ( Array.isArray(currentValues) ) {
        newValue = [...currentValues, ...newFiles];
      } else {
        newValue = newFiles;
      }

      e.target.value = null;
    }
    setFieldValue(name, newValue);
  }

  const handleAction = () => {
    const allTouched = Object.keys(values).reduce((acc, key) => {
      return { ...acc, [key]: true };
    }, {});

    setTouched(allTouched);

    const nextErrors = validate(values);
    setErrors(nextErrors);

    onAction(values);
  }

  const setFieldValue = (name, value) => {
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    const nextErrors = validate(nextValues);
    setErrors(nextErrors);
  }
  

  return {
    values,
    handlers: { handleBlur, handleChange, handleAction, setFieldValue },
    controls: { touched, errors },
  }
}