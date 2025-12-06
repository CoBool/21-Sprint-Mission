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
import { Link } from "react-router";

// import { authLogin } from "../../../features/auth/api/authApi.js";

// import { useAuth } from "../../../context/AuthContext.js";

function Submit({className}) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? "대기중..." : "로그인"}
    </button>
  );
}

function submitForm(formData) {
  console.log(formData.get('email'));
  console.log(formData.get('password'));
}

export default function Login() {
  // let navigate = useNavigate();
  // const { login } = useAuth();

  return (
    <>
      <form className={styles.form} action={submitForm}>
        {/* 이메일 */}
        <div className={styles.formGroup}>
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
          />
          <span
            id="email-error"
            role="alert"
          ></span>
        </div>

        {/* 비밀번호 */}
        <div className={styles.formGroup}>
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
          />
          <span
            id="password-error"
            role="alert"
          ></span>
        </div>

        {/* 제출 */}
        <Submit className={styles.button}/>
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
