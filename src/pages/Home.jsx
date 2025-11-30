import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

import { Link } from "react-router";

import styles from "./Home/Home.module.css";
import FeatureCard from '../features/home/components/FeatureCard/FeatureCard'

import hotImage from '../assets/images/home/hot-item.png';
import registerImage from '../assets/images/home/register-item.png';
import searchImage from '../assets/images/home/search-item.png';

/*
 * Home 페이지
 * 홈페이지 메인 페이지
 * 
 * Hero 컴포넌트를 어떤식으로 할지 고민중.. 사이즈가 작기에 안하기로 결정.
 * @returns {JSX.Element} Home 페이지
 */
export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* Hero 영역 */}
        <section className={`${styles['hero']} ${styles["hero-first"]}`}>
          <div className={`container ${styles['hero__container']}`}>
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
          <FeatureCard
            src={hotImage}
            alt="인기 상품을 확인해 보세요"
            label="Hot item"
            title="인기 상품을 확인해 보세요"
            description="가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요"
          />
          <FeatureCard
            src={registerImage}
            alt="상품 검색 기능을 보여주는 일러스트레이션"
            label="Search"
            title="구매를 원하는 상품을 검색하세요"
            description="구매하고 싶은 물품은 검색해서 쉽게 찾아보세요"
            reverse="true"
          />
          <FeatureCard
            src={searchImage}
            alt="상품 등록 기능을 보여주는 일러스트레이션"
            label="Register"
            title="판매를 원하는 상품을 등록하세요"
            description="어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요"
          />
        </div>

        {/* Hero 영역 */}
        <section className={`${styles['hero']} ${styles["hero-second"]}`}>
          <div className={`container ${styles['hero__container']}`}>
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
