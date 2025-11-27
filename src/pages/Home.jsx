import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import { Link } from "react-router";

import styles from "./Home.module.css";
/*
 * Home 페이지
 * 홈페이지 메인 페이지
 * 
 * 추가 작업 예정 (Hero, Card 컴포넌트로 처리)
 * @returns {JSX.Element} Home 페이지
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero 영역 */}
        <section className={`${styles.hero} ${styles["hero-first"]}`}>
          <div className={`container`}>
            <div className={styles["hero__text"]}>
              <h1 className={styles["hero__title"]}>일상의 모든 물건을 거래해보세요</h1>
              <Link to="/items" className={styles["hero__link"]}>
                구경하러 가기
              </Link>
            </div>
            <div className={styles["hero__image"]}></div>
          </div>
        </section>

        {/* Features 영역 */}
        <div className={styles.features}>
          <section className={styles.feature}>
            <div className={`container`}>
              <div className={styles.card}>
                <div className={styles["card__image"]}>
                  <img
                    className={styles["card__img"]}
                    // src={hotItemImage}
                    alt="인기 상품을 확인해 보세요"
                  />
                </div>
                <div className={styles["card__text"]}>
                  <h3 className={styles["card__title"]}>Hot item</h3>
                  <h4 className={styles["card__main-text"]}>인기 상품을 확인해 보세요</h4>
                  <p className={styles["card__sub-text"]}>
                    가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Features 영역 */}
          <section className={styles.feature}>
            <div className={`container`}>
              <div className={styles.card}>
                <div className={styles["card__image"]}>
                  <img
                    className={styles["card__img"]}
                    // src={searchItemImage}
                    alt="상품 검색 기능을 보여주는 일러스트레이션"
                  />
                </div>
                <div className={styles["card__text"]}>
                  <h3 className={styles["card__title"]}>Search</h3>
                  <h4 className={styles["card__main-text"]}>
                    구매를 원하는 상품을 검색하세요
                  </h4>
                  <p className={styles["card__sub-text"]}>
                    구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Features 영역 */}
          <section className={styles.feature}>
            <div className={`container`}>
              <div className={styles.card}>
                <div className={styles["card__image"]}>
                  <img
                    className={styles["card__img"]}
                    // src={registerItemImage}
                    alt="상품 등록 기능을 보여주는 일러스트레이션"
                  />
                </div>
                <div className={styles["card__text"]}>
                  <h3 className={styles["card__title"]}>Register</h3>
                  <h4 className={styles["card__main-text"]}>
                    판매를 원하는 상품을 등록하세요
                  </h4>
                  <p className={styles["card__sub-text"]}>
                    어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Hero 영역 */}
        <section className={`${styles.hero} ${styles["hero-second"]}`}>
          <div className={`container`}>
            <div className={styles["hero__text"]}>
              <h2 className={styles["hero__title"]}>믿을 수 있는 판다마켓 중고 거래</h2>
            </div>
            <div className={styles["hero__image"]}></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
