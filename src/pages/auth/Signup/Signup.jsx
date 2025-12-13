/*
 * Signup 페이지
 * @returns {JSX.Element} Signup 페이지
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
  nickname: "",
  password: "",
  passwordConfirmation: "",
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validate = (values) => {
  const errors = {};

  // 이메일 필수 체크
  if (!values.email.trim()) errors.email = '이메일을 입력해주세요.';
  else if (!EMAIL_REGEX.test(values.email)) errors.email = '이메일 형식에 맞지 않습니다.';

  // 닉네임 필수 체크
  if (!values.nickname.trim()) errors.nickname = '닉네임을 입력해주세요.';

  // 비밀번호 필수 체크
  if (!values.password.trim()) errors.password = '비밀번호를 입력해주세요.';

  // 비밀번호 확인 필수 체크
  if (!values.passwordConfirmation.trim()) errors.passwordConfirmation = '비밀번호 확인을 입력해주세요.';
  else if (values.password !== values.passwordConfirmation) errors.passwordConfirmation = '비밀번호가 일치하지 않습니다.';
  
  return errors;
};

export default function Signup() {
  const { pending } = useFormStatus();
  const { signup } = useAuth();

  const { handlers, controls } = useForm({
    initialValues,
    validate,
    onAction: async (values) => {
      try {
        await signup(values.email, values.nickname, values.password, values.passwordConfirmation);
      } catch (error) {
        toast({
          title: "회원가입 실패",
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

        {/* 닉네임 */}
        <div className={`${styles.formGroup} ${touched?.nickname && errors?.nickname ? styles.invalid : touched?.nickname && !errors?.nickname ? styles.valid : ""}`}>
          <label className={styles.label} htmlFor="nickname">
            닉네임
          </label>
          <input
            className={styles.input}
            type="text"
            id="nickname"
            name="nickname"
            placeholder="닉네임을 입력해주세요."
            aria-describedby="nickname-error"
            {...register("nickname")}
          />
          <span
            id="nickname-error"
            role="alert"
            className={styles.errorMessage}
          >
            {touched?.nickname && errors?.nickname && (
              errors.nickname
            )}
          </span>
        </div>

        {/* 비밀번호 입력 */}
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

        {/* 비밀번호 확인 */}
        <div className={`${styles.formGroup} ${touched?.passwordConfirmation && errors?.passwordConfirmation ? styles.invalid : touched?.passwordConfirmation && !errors?.passwordConfirmation ? styles.valid : ""}`}>
          <label
            className={styles.label}
            htmlFor="passwordConfirmation"
          >
            비밀번호 확인
          </label>
          <input
            className={styles.input}
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="비밀번호를 확인해주세요."
            aria-describedby="passwordConfirmation-error"
            {...register("passwordConfirmation")}
          />
          <span
            id="passwordConfirmation-error"
            role="alert"
            className={styles.errorMessage}
          >
            {touched?.passwordConfirmation && errors?.passwordConfirmation && (
              errors.passwordConfirmation
            )}
          </span>
        </div>

        {/* 제출 */}
        <button className={styles.button} type="submit" disabled={pending}>
          {pending ? "회원가입 중..." : "회원가입"}
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
        이미 회원이신가요?
        <Link to="/login" className={styles.footerLink}>
          로그인
        </Link>
      </div>
    </>
  );
}
