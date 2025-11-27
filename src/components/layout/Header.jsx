/*
 * Header 컴포넌트
 *
 * 해결방안으로 아직 Router 학습이 부족한 상황으로 좋은 방법은 아니지만 소규모 사이드 프로젝트인 만큼 Router 에서 레이아웃을 렌더링하는게 아니라 각 페이지 template에서 레이아웃을 렌더링하는 방식으로 해결.
 * @returns {JSX.Element} Header 컴포넌트
 */

import PandaMarketLogo_PC from "../../assets/images/logo.svg";
import PandaMarketLogo_Mobile from "../../assets/images/m_logo.svg";

import styles from "./Header.module.css";

import { Link } from "react-router";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.header__container}`}>
        <div className={styles.header__logo}>
          <Link to="/">
            <img
              src={PandaMarketLogo_PC}
              alt="판다마켓 로고"
              className={`${styles.header__logoImage} ${styles["header__logoImage--pc"]}`}
            />
            <img
              src={PandaMarketLogo_Mobile}
              alt="판다마켓 로고"
              className={`${styles.header__logoImage} ${styles["header__logoImage--mobile"]}`}
            />
          </Link>
        </div>
        <nav>
          <Link to="/items">임시 아이템!!</Link>
        </nav>
      </div>
    </header>
  );
}
