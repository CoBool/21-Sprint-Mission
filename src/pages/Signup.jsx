/*
 * Signup 페이지
 * @returns {JSX.Element} Signup 페이지
 */

import kakaoIcon from '../assets/images/icons/kakao_oauth.png';
import googleIcon from '../assets/images/icons/google_oauth.png';

import PandaMarketLogo_PC from '../assets/images/logo.svg';

import styles from "./Auth.module.css";
import { Link } from "react-router";

export default function Signup() {
  return (
    <>
      <div className={styles["form"]}>
        <div className={`container`}>
          <header className={styles["form-header"]}>
            <div className={styles["form-header__logo"]}>
              <Link to="/" className={styles["form-header__link"]}>
                <img
                  src={PandaMarketLogo_PC}
                  alt="판다마켓 로고"
                  className={styles["form-header__logo-image"]}
                />
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

            {/* 닉네임 */}
            <div className={styles["form-block__group"]}>
              <label className={styles["form-block__label"]} htmlFor="nickname">
                닉네임
              </label>
              <input
                className={styles["form-block__input"]}
                type="text"
                id="nickname"
                name="nickname"
                placeholder="닉네임을 입력해주세요."
                aria-describedby="nickname-error"
              />
              <span
                id="nickname-error"
                className={styles["form-block__error-message"]}
                role="alert"
              ></span>
            </div>

            {/* 비밀번호 입력 */}
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

            {/* 비밀번호 확인 */}
            <div className={styles["form-block__group"]}>
              <label
                className={styles["form-block__label"]}
                htmlFor="passwordConfirm"
              >
                비밀번호 확인
              </label>
              <input
                className={styles["form-block__input"]}
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="비밀번호를 확인해주세요."
                aria-describedby="passwordConfirm-error"
              />
              <span
                id="passwordConfirm-error"
                className={styles["form-block__error-message"]}
                role="alert"
              ></span>
            </div>

            {/* 제출 */}
            <button className={styles["form-block__button"]} type="submit">
              회원가입
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
            이미 회원이신가요?
            <Link to="/login" className={styles["form__footer-link"]}>
              로그인
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
