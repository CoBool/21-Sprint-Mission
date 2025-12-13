/*
 * Login 페이지
 * RHF 사용하지않음. 그냥 순수 리액트로 구현할 예정..
 * 추후 리팩토링 필요.
 * @returns {JSX.Element} Login 페이지
 */

import kakaoIcon from "../../../assets/images/icons/kakao_oauth.png";
import googleIcon from "../../../assets/images/icons/google_oauth.png";

import styles from "../Auth.module.css";
import { Link } from "react-router";
import { useFormStatus } from "react-dom";

import { useForm } from "../../../hooks/useForm";
import { useAuth } from "../../../context/AuthContext.js";

import { toast } from "../../../components/ui/Toast/toast-store";

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
  const { pending } = useFormStatus();
  const { login } = useAuth();

  const { handlers, controls } = useForm({
    initialValues,
    validate,
    onAction: async (values) => {
      try {
        await login(values.email, values.password);
      } catch (error) {
        toast({
          title: "로그인 실패",
          description: error.message,
          type: "error",
        });
      }
    },
  });

  const { register, handleAction } = handlers;
  const { touched, errors } = controls;

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
            {...register("email")}
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
            {...register("password")}
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
        <button type="submit" className={styles.button} disabled={pending}>
          {pending ? "로그인 중..." : "로그인"}
        </button>
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
