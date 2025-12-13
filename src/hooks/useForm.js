import { useState } from "react";

export const useForm = ({ initialValues, validate, onAction }) => {
  // --- 1. 상태 (State) 정의
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});

  // --- 2. 로직 & 핸들러
  const setFieldValue = (name, value, shouldValidate = true) => {
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);

    if ( shouldValidate ) {
      const nextErrors = validate(nextValues);
      setErrors((prev) => ({
        ...prev,
        [name]: nextErrors[name] ?? null,
      }));
    }
  };

  const setFieldError = (name, error) => {
    const nextErrors = { ...errors, [name]: error ?? null };
    setErrors(nextErrors);
  };

  const setFieldTouched = (name) => {
    const nextTouched = { ...touched, [name]: true };
    setTouched(nextTouched);
  };

  // --- 3. 폼 요소 등록 로직
  const register = (name, options = {}) => {

    const { format, parse } = options;
    const rawValue = values[name] ?? "";
    const displayValue = format ? format(rawValue) : rawValue;

    return {
      name,
      value: displayValue,
      onBlur: () => {
        setFieldTouched(name);
        const nextErrors = validate(values);
        setErrors((prev) => ({
          ...prev,
          [name]: nextErrors[name] ?? null,
        }));
      },
      onChange: async (e) => {
        const { value } = e.target;

        const parsedValue = parse ? parse(value) : value;

        const nextValues = { ...values, [name]: parsedValue };
        setValues(nextValues);

        if ( touched[name] ) {
          const nextErrors = validate(nextValues);
          setErrors((prev) => ({
            ...prev,
            [name]: nextErrors[name] ?? null,
          }));
        }
      },
    };
  };

  // --- 4. 제출 핸들러 로직
  const handleAction = async (e) => {
    if ( e && e.preventDefault ) e.preventDefault();

    const allNames = Object.keys(values);
    const nextTouched = allNames.reduce((acc, name) => {
      acc[name] = true;
      return acc;
    }, {});
    setTouched(nextTouched);

    const nextErrors = validate(values);
    setErrors(prev => ({ ...prev, ...nextErrors }));

    const hasErrors = Object.values(nextErrors).some((error) => error !== null);

    if (hasErrors) return;

    await onAction(values);
  };

  // --- 6. 폼 상태 반환 로직
  return {
    values,
    controls: { errors, touched },
    handlers: {
      register,
      setFieldValue,
      setFieldTouched,
      setFieldError,
      handleAction,
    },
  };
};
