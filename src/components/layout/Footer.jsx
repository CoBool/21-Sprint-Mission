import FacebookIcon from '../../assets/images/icons/ic_facebook.png';
import TwitterIcon from '../../assets/images/icons/ic_twitter.png';
import YoutubeIcon from '../../assets/images/icons/ic_youtube.png';
import InstagramIcon from '../../assets/images/icons/ic_instagram.png';

import styles from './Footer.module.css';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className={styles["footer"]}>
      <div className={`container ${styles["footer__container"]}`}>
        <div className={styles["footer__copyright"]}>
          <p className={styles["footer__copyright-text"]}>©BooleanMarket - 2025</p>
        </div>

        <ul className={styles["footer__nav"]}>
          <li className={styles["footer__nav-item"]}>
            <Link to="/privacy" className={styles["footer__nav-link"]}>
              Privacy Policy
            </Link>
          </li>
          <li className={styles["footer__nav-item"]}>
            <Link to="/faq" className={styles["footer__nav-link"]}>
              FAQ
            </Link>
          </li>
        </ul>

        <ul className={styles["footer__social"]}>
          <li className={styles["footer__social-item"]}>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className={styles["footer__social-link"]}
            >
              <img
                className={styles["footer__social-icon"]}
                src={FacebookIcon}
                alt="페이스북"
              />
            </a>
          </li>
          <li className={styles["footer__social-item"]}>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              className={styles["footer__social-link"]}
            >
              <img
                className={styles["footer__social-icon"]}
                src={TwitterIcon}
                alt="트위터"
              />
            </a>
          </li>
          <li className={styles["footer__social-item"]}>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              className={styles["footer__social-link"]}
            >
              <img
                className={styles["footer__social-icon"]}
                src={YoutubeIcon}
                alt="유튜브"
              />
            </a>
          </li>
          <li className={styles["footer__social-item"]}>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className={styles["footer__social-link"]}
            >
              <img
                className={styles["footer__social-icon"]}
                src={InstagramIcon}
                alt="인스타그램"
              />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
