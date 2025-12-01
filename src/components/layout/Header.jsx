/*
 * Header 컴포넌트
 *
 * 해결방안으로 아직 Router 학습이 부족한 상황으로 좋은 방법은 아니지만 소규모 사이드 프로젝트인 만큼 Router 에서 레이아웃을 렌더링하는게 아니라 각 페이지 template에서 레이아웃을 렌더링하는 방식으로 해결.
 * @returns {JSX.Element} Header 컴포넌트
 */

import PandaMarketLogo_PC from "../../assets/images/logo.svg";
import PandaMarketLogo_Mobile from "../../assets/images/m_logo.svg";

import styles from "./Header.module.css";

import { Link, NavLink } from "react-router";

export default function Header() {
  return (
    <header className={styles["header"]}>
      <div className={`container ${styles["header__container"]}`}>
        <div className={`${styles["header__left--nav"]}`}>
          <div className={styles["header__logo"]}>
            <Link to="/">
              <img
                src={PandaMarketLogo_PC}
                alt="판다마켓 로고"
                className={`${styles["header__logoImage"]} ${styles["header__logoImage--pc"]}`}
              />
              <img
                src={PandaMarketLogo_Mobile}
                alt="판다마켓 로고"
                className={`${styles["header__logoImage"]} ${styles["header__logoImage--mobile"]}`}
              />
            </Link>
          </div>
          <ul className={`${styles["header__left__nav--menu"]}`}>
            <li className={`${styles["header__left__nav--menu-item"]}`}>
              <NavLink
                to="/community"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? `${styles["header__left__nav--menu-item-link"]} ${styles["header__left__nav--menu-item-link--active"]}` : ""
                }
              >
                자유게시판
              </NavLink>
            </li>
            <li className={`${styles["header__left__nav--menu-item"]}`}>
              <NavLink to="/items" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? `${styles["header__left__nav--menu-item-link"]} ${styles["header__left__nav--menu-item-link--active"]}` : ""
              }>중고마켓</NavLink>
            </li>
          </ul>
        </div>
        <nav className={`${styles["header__right--nav"]}`}>
          <Link to="/login" className={styles["header__loginBtn"]}>
            로그인
          </Link>
        </nav>
      </div>
    </header>
  );
}
