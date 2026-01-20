import { Link } from 'react-router';

import styles from './Home.module.css';

function Home() {
  return (
    <main >
      <section className={`${styles.Hero} ${styles.HeroFirst}`}>
        <div className={`layout-container`}>
          <div className={`${styles.HeroContainer}`}>
            <div className={`${styles.HeroText}`}>
              <h1 className={`${styles.HeroTitle}`}>
                일상의 모든 물건을 거래해보세요
              </h1>
              <Link to="/items" className={`${styles.HeroButton}`}>
                구경하러 가기
              </Link>
            </div>
            <div className={styles.HeroImage}></div>
          </div>
        </div>
      </section>

      <section>
        <div>카드1</div>
        <div>카드2</div>
        <div>카드3</div>
      </section>

      <section className={`${styles.Hero} ${styles.HeroSecond}`}>
        <div className={`layout-container`}>
          <div className={`${styles.HeroContainer}`}>
            <div className={`${styles.HeroText}`}>
              <h1 className={`${styles.HeroTitle}`}>
                믿을 수 있는 판다마켓 중고 거래
              </h1>
            </div>
            <div className={styles.HeroImage}></div>
          </div>
        </div>
      </section>
    </main>
  )
}

export { Home }