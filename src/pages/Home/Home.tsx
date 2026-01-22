import { ButtonLink } from '@/components/ui/Button';

import { FeatureCard } from '@/features/Home/components/FeatureCard/FeatureCard';

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
              <ButtonLink to="/items" variant="default" className={`h-auto ${styles.HeroButton}`}>
                구경하러 가기
              </ButtonLink>
            </div>
            <div className={styles.HeroImage}></div>
          </div>
        </div>
      </section>

      <section className={`${styles.Feature}`}>
        <FeatureCard
          src="/images/hot-item.png"
          label="Hot item"
          title="인기 상품을 확인해 보세요"
          description="가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요"
        />
        <FeatureCard
          src="/images/search-item.png"
          label="Search"
          title="구매를 원하는 상품을 검색하세요"
          description="구매하고 싶은 물품은 검색해서 쉽게 찾아보세요"
          reverse={true}
        />
        <FeatureCard
          src="/images/register-item.png"
          label="Register"
          title="판매를 원하는 상품을 등록하세요"
          description="어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요"
        />
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