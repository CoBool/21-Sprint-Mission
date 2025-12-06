import FacebookIcon from '../../assets/images/icons/ic_facebook.png';
import TwitterIcon from '../../assets/images/icons/ic_twitter.png';
import YoutubeIcon from '../../assets/images/icons/ic_youtube.png';
import InstagramIcon from '../../assets/images/icons/ic_instagram.png';

import styles from './Footer.module.css';
import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.container}`}>
        <div className={styles.copyright}>
          <p>©BooleanMarket - 2025</p>
        </div>

        <ul className={styles.nav}>
          <li>
            <Link to="/privacy" className={styles.navLink}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/faq" className={styles.navLink}>
              FAQ
            </Link>
          </li>
        </ul>

        <ul className={styles.social}>
          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              className={styles.socialLink}
            >
              <img
                className={styles.socialIcon}
                src={FacebookIcon}
                alt="페이스북"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              className={styles.socialLink}
            >
              <img
                className={styles.socialIcon}
                src={TwitterIcon}
                alt="트위터"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              className={styles.socialLink}
            >
              <img
                className={styles.socialIcon}
                src={YoutubeIcon}
                alt="유튜브"
              />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              className={styles.socialLink}
            >
              <img
                className={styles.socialIcon}
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
