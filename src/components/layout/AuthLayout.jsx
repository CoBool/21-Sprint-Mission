import { Outlet } from "react-router";

import { Link } from "react-router";

import styles from './AuthLayout.module.css';

import PandaMarketLogo_PC from '../../assets/images/logo.svg'

export default function DefaultLayout() {
  return (
    <>
      <div className={styles.form}>
        <div className={`container`}>
          <header className={styles.header}>
            <div>
              <Link to="/" className={styles.headerLink}>
                <img
                  src={PandaMarketLogo_PC}
                  alt="판다마켓 로고"
                  className={styles.logoImage}
                />
              </Link>
            </div>
          </header>
          <Outlet/>
        </div>
      </div>
    </>
  );
}
