import skeletonStyles from "./Skeleton.module.css";
import sharedStyles from "../../../../assets/styles/layout.module.css";
import itemsStyles from "../../../../pages/items/Items.module.css";

export default function Skeleton({ bestPageSize = 4, pageSize = 10 }) {
  return (
    <main>
      <div className={`container ${sharedStyles.pageContainer}`}>
        {/* 베스트 상품 스켈레톤 */}
        <section
          className={`${sharedStyles.section} ${itemsStyles.bestSection}`}
        >
          <div
            className={`${sharedStyles.sectionTitle} ${skeletonStyles.base} ${skeletonStyles.text}`}
          ></div>
          <div className={itemsStyles.lists}>
            {Array.from({ length: bestPageSize }).map((_, index) => (
              <div key={index} className={skeletonStyles.item}>
                <div
                  className={`${skeletonStyles.base} ${skeletonStyles.image}`}
                ></div>
                <div className={skeletonStyles.itemText}>
                  <div
                    className={`${skeletonStyles.base} ${skeletonStyles.line} ${skeletonStyles.title}`}
                  ></div>
                  <div
                    className={`${skeletonStyles.base} ${skeletonStyles.line} ${skeletonStyles.price}`}
                  ></div>
                  <div
                    className={`${skeletonStyles.base} ${skeletonStyles.line} ${skeletonStyles.favorite}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 전체 상품 스켈레톤 */}
        <section
          className={`${sharedStyles.section} ${itemsStyles.allSection}`}
        >
          <div>
            <div
              className={`${sharedStyles.sectionTitle} ${skeletonStyles.base} ${skeletonStyles.text}`}
            ></div>
            <div
              className={`${skeletonStyles.base} ${skeletonStyles.search}`}
            ></div>
            <div
              className={`${skeletonStyles.base} ${skeletonStyles.button}`}
            ></div>
            <div
              className={`${skeletonStyles.base} ${skeletonStyles.sort}`}
            ></div>
          </div>
          <div className={itemsStyles.lists}>
            {Array.from({ length: pageSize }).map((_, index) => (
              <div key={index} className={skeletonStyles.item}>
                <div
                  className={`${skeletonStyles.base} ${skeletonStyles.image}`}
                ></div>
                <div className={skeletonStyles.itemText}>
                  <div
                    className={`${skeletonStyles.base} ${skeletonStyles.line} ${skeletonStyles.title}`}
                  ></div>
                  <div
                    className={`${skeletonStyles.base} ${skeletonStyles.line} ${skeletonStyles.price}`}
                  ></div>
                  <div
                    className={`${skeletonStyles.base} ${skeletonStyles.line} ${skeletonStyles.favorite}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          {/* 페이지네이션 스켈레톤 */}
          <div
            className={`${skeletonStyles.base} ${skeletonStyles.pagination}`}
          ></div>
        </section>
      </div>
    </main>
  );
}
