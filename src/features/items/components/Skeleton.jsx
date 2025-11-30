import skeletonStyles from "./Skeleton.module.css";
import itemsStyles from "../../../pages/Items.module.css";

export default function Skeleton({ bestPageSize = 4, pageSize = 10 }) {
  return (
    <main>
      <div className={`container ${itemsStyles["items__container"]}`}>
        {/* 베스트 상품 스켈레톤 */}
        <section
          className={`${itemsStyles["items__section"]} ${itemsStyles["items__section--best"]}`}
        >
          <div
            className={`${itemsStyles["items__section__title"]} ${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--text"]}`}
          ></div>
          <div className={`${itemsStyles["items__section__lists"]}`}>
            {Array.from({ length: bestPageSize }).map((_, index) => (
              <div key={index} className={`${skeletonStyles["skeleton__item"]}`}>
                <div
                  className={`${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--image"]}`}
                ></div>
                <div className={`${skeletonStyles["skeleton__item__text"]}`}>
                  <div
                    className={`${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--line"]} ${skeletonStyles["skeleton--title"]}`}
                  ></div>
                  <div
                    className={`${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--line"]} ${skeletonStyles["skeleton--price"]}`}
                  ></div>
                  <div
                    className={`${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--line"]} ${skeletonStyles["skeleton--favorite"]}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 전체 상품 스켈레톤 */}
        <section
          className={`${itemsStyles["items__section"]} ${itemsStyles["items__section--all"]}`}
        >
          <div className={`${itemsStyles["items__section__header"]}`}>
            <div
              className={`${itemsStyles["items__section__title"]} ${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--text"]}`}
            ></div>
            <div
              className={`${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--search"]}`}
            ></div>
            <div
              className={`${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--button"]}`}
            ></div>
            <div
              className={`${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--sort"]}`}
            ></div>
          </div>
          <div className={`${itemsStyles["items__section__lists"]}`}>
            {Array.from({ length: pageSize }).map((_, index) => (
              <div key={index} className={`${skeletonStyles["skeleton__item"]}`}>
                <div
                  className={`${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--image"]}`}
                ></div>
                <div className={`${skeletonStyles["skeleton__item__text"]}`}>
                  <div
                    className={`${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--line"]} ${skeletonStyles["skeleton--title"]}`}
                  ></div>
                  <div
                    className={`${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--line"]} ${skeletonStyles["skeleton--price"]}`}
                  ></div>
                  <div
                    className={`${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--line"]} ${skeletonStyles["skeleton--favorite"]}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          {/* 페이지네이션 스켈레톤 */}
          <div
            className={`${skeletonStyles["skeleton"]} ${skeletonStyles["skeleton--pagination"]}`}
          ></div>
        </section>
      </div>
    </main>
  );
}