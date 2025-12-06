/*
 * Signup 페이지
 * @returns {JSX.Element} Signup 페이지
 */

import kakaoIcon from "../../../assets/images/icons/kakao_oauth.png";
import googleIcon from "../../../assets/images/icons/google_oauth.png";

import styles from "../Auth.module.css";
import { Link } from "react-router";

export default function Signup() {
  return (
    <>
      <form className={styles.form}>
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

        {/* 닉네임 */}
        <div className={styles.formGroup}>
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
          />
          <span
            id="nickname-error"
            role="alert"
          ></span>
        </div>

        {/* 비밀번호 입력 */}
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

        {/* 비밀번호 확인 */}
        <div className={styles.formGroup}>
          <label
            className={styles.label}
            htmlFor="passwordConfirm"
          >
            비밀번호 확인
          </label>
          <input
            className={styles.input}
            type="password"
            id="passwordConfirm"
            name="passwordConfirm"
            placeholder="비밀번호를 확인해주세요."
            aria-describedby="passwordConfirm-error"
          />
          <span
            id="passwordConfirm-error"
            role="alert"
          ></span>
        </div>

        {/* 제출 */}
        <button className={styles.button} type="submit">
          회원가입
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
