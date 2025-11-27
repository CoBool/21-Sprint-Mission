/*
 * Login 페이지
 * RHF 사용하지않음. 그냥 순수 리액트로 구현할 예정..
 * 추후 리팩토링 필요.
 * @returns {JSX.Element} Login 페이지
 */

import kakaoIcon from '../../assets/images/icons/kakao_oauth.png';
import googleIcon from '../../assets/images/icons/google_oauth.png';

import PandaMarketLogo_PC from '../../assets/images/logo.svg';

import styles from "./Auth.module.css";
import { Link } from "react-router";

export default function Login() {
  return (
    <>
      <div className={styles["form"]}>
        <div className={`container`}>
          <header className={styles["form-header"]}>
            <div className={styles["form-header__logo"]}>
              <Link to="/" className={styles["form-header__link"]}>
                <img src={PandaMarketLogo_PC} alt="판다마켓 로고" className={styles["form-header__logo-image"]} />
              </Link>
            </div>
          </header>

          <form className={styles["form-block"]}>
            {/* 이메일 */}
            <div className={styles["form-block__group"]}>
              <label className={styles["form-block__label"]} htmlFor="email">
                이메일
              </label>
              <input
                className={styles["form-block__input"]}
                type="email"
                id="email"
                name="email"
                placeholder="example@email.com"
                aria-describedby="email-error"
              />
              <span
                id="email-error"
                className={styles["form-block__error-message"]}
                role="alert"
              ></span>
            </div>

            {/* 비밀번호 */}
            <div className={styles["form-block__group"]}>
              <label className={styles["form-block__label"]} htmlFor="password">
                비밀번호
              </label>
              <input
                  className={styles["form-block__input"]}
                  type="password"
                  id="password"
                  name="password"
                  placeholder="비밀번호를 입력해주세요."
                  aria-describedby="password-error"
                />
              <span
                id="password-error"
                className={styles["form-block__error-message"]}
                role="alert"
              ></span>
            </div>

            {/* 제출 */}
            <button
              className={styles["form-block__button"]}
              type="submit"
            >
              로그인
            </button>
          </form>

          <div className={styles["oauth-block"]}>
            <span className={styles["oauth-block__text"]}>간편 로그인하기</span>

            <div className={styles["oauth-block__group"]}>
              <a
                className={styles["oauth-block__button"]}
                href="https://www.google.com/"
                target="_blank"
              >
                <img
                  className={styles["oauth-block__icon"]}
                  src={googleIcon}
                  alt="Google로 로그인"
                />
              </a>
              <a
                className={styles["oauth-block__button"]}
                href="https://www.kakaocorp.com/page/"
                target="_blank"
              >
                <img
                  className={styles["oauth-block__icon"]}
                  src={kakaoIcon}
                  alt="카카오로 로그인"
                />
              </a>
            </div>
          </div>

          <div className={styles["form__footer"]}>
            판다마켓이 처음이신가요?
            <Link to="/signup" className={styles["form__footer-link"]}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
