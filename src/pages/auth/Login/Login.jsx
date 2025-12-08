/*
 * Login 페이지
 * RHF 사용하지않음. 그냥 순수 리액트로 구현할 예정..
 * 추후 리팩토링 필요.
 * @returns {JSX.Element} Login 페이지
 */

import kakaoIcon from "../../../assets/images/icons/kakao_oauth.png";
import googleIcon from "../../../assets/images/icons/google_oauth.png";

import styles from "../Auth.module.css";
import { useFormStatus } from "react-dom";
import { Link, useNavigate } from "react-router";

import { useForm } from "../../../hooks/useForm";
import { useAuth } from "../../../context/AuthContext.js";
import { useEffect } from "react";


function Submit({className, disabled}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending || disabled}>
      {pending ? "대기중..." : "로그인"}
    </button>
  );
}

const initialValues = {
  email: "",
  password: "",
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validate = (values) => {
  const errors = {};

  // 이메일 필수 체크
  if (!values.email.trim()) errors.email = '이메일을 입력해주세요.';
  else if (!EMAIL_REGEX.test(values.email)) errors.email = '이메일 형식에 맞지 않습니다.';

  // 비밀번호 필수 체크
  if (!values.password.trim()) errors.password = '비밀번호를 입력해주세요.';
  
  return errors;
};

export default function Login() {
  let navigate = useNavigate();
  const { user,login } = useAuth();

  const { values, handlers, controls } = useForm({
    initialValues,
    validate,
    onAction: async (values) => {
      try {
        await login(values.email, values.password);
        navigate('/');
      } catch (error) {
        console.log('로그인 실패!!', error);
      }
    },
  });

  const { handleBlur, handleChange, handleAction } = handlers;
  const { touched, errors } = controls;

  // 제출 가능 여부 실시간 계산
  const currentErrors = validate(values);
  const isSubmitable = Object.keys(currentErrors).length === 0;

  useEffect(() => {
    if(user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <>
      <form className={styles.form} action={handleAction}>
        {/* 이메일 */}
        <div className={`${styles.formGroup} ${touched?.email && errors?.email ? styles.invalid : touched?.email && !errors?.email ? styles.valid : ""}`}>
          <label className={styles.label} htmlFor="email">
            이메일
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
            aria-describedby="email-error"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <span
            id="email-error"
            role="alert"
            className={styles.errorMessage}
          >
            {touched?.email && errors?.email && (
              errors.email
            )}
          </span>
        </div>

        {/* 비밀번호 */}
        <div className={`${styles.formGroup} ${touched?.password && errors?.password ? styles.invalid : touched?.password && !errors?.password ? styles.valid : ""}`}>
          <label className={styles.label} htmlFor="password">
            비밀번호
          </label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            placeholder="비밀번호를 입력해주세요."
            aria-describedby="password-error"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <span
            id="password-error"
            role="alert"
            className={styles.errorMessage}
          >
            {touched?.password && errors?.password && (
              errors.password
            )}
          </span>
        </div>

        {/* 제출 */}
        <Submit className={styles.button} disabled={!isSubmitable}/>
      </form>

      <div className={styles.oauth}>
        <span className={styles.oauthText}>간편 로그인하기</span>

        <div className={styles.oauthGroup}>
          <a
            href="https://www.google.com/"
            target="_blank"
          >
            <img
              src={googleIcon}
              alt="Google로 로그인"
            />
          </a>
          <a
            href="https://www.kakaocorp.com/page/"
            target="_blank"
          >
            <img
              src={kakaoIcon}
              alt="카카오로 로그인"
            />
          </a>
        </div>
      </div>

      <div className={styles.footer}>
        판다마켓이 처음이신가요?
        <Link to="/signup" className={styles.footerLink}>
          회원가입
        </Link>
      </div>
    </>
  );
}
