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

import { useAuth } from "../../context/AuthContext";

export default function Header() {

  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <div className={styles.leftNav}>
          <div>
            <Link to="/">
              <img
                src={PandaMarketLogo_PC}
                alt="판다마켓 로고"
                className={`${styles.logoImagePc}`}
              />
              <img
                src={PandaMarketLogo_Mobile}
                alt="판다마켓 로고"
                className={`${styles.logoImageMobile}`}
              />
            </Link>
          </div>
          <ul className={styles.menu}>
            <li className={styles.menuItem}>
              <NavLink
                to="/community"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? `${styles.menuLink} ${styles.menuLinkActive}` : styles.menuLink
                }
              >
                자유게시판
              </NavLink>
            </li>
            <li className={styles.menuItem}>
              <NavLink to="/items" className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? `${styles.menuLink} ${styles.menuLinkActive}` : styles.menuLink
              }>중고마켓</NavLink>
            </li>
          </ul>
        </div>
        <nav>
          { !user ? (<Link to="/login" className={styles.loginButton}>
            로그인
          </Link>) : (<button className={styles.loginButton} onClick={logout}>로그아웃</button>)}
        </nav>
      </div>
    </header>
  );
}
