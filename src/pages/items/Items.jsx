import styles from "./Items.module.css";
import sharedStyles from "../../assets/styles/layout.module.css";

import { useItems } from "../../features/items/hooks/useItems";

import {
  ProductsListHeader,
  ProductsList,
  Pagination,
  Skeleton,
} from "../../features/items/components";

export default function Items() {
  const { ItemsData, pagination, controls, handlers } = useItems();

  const { bestItems, items, isLoading, isError } = ItemsData;
  const { currentPage, hasPrevPage, hasNextPage, visiblePages } = pagination;
  const { bestPageSize, pageSize, orderBy } = controls;
  const { handlePage, debouncedSearch, setOrderBy } = handlers;

  if (!isLoading) {
    return <Skeleton bestPageSize={bestPageSize} pageSize={pageSize} />;
  }

  if (isError) {
    return <div>에러가 발생했습니다.</div>;
  }

  return (
    <main>
      <div className={`container ${sharedStyles.pageContainer}`}>
        {/* 베스트 상품 Section */}
        <section
          className={`${sharedStyles.section} ${styles.bestSection}`}
        >
          <h1 className={sharedStyles.sectionTitle}>베스트 상품</h1>
          {/* 베스트 상품 리스트 */}
          <div className={styles.lists}>
            {bestItems && (
              <ProductsList lists={bestItems.slice(0, bestPageSize)} />
            )}
          </div>
        </section>

        {/* 전체 상품 Section */}
        <section
          className={`${sharedStyles.section} ${styles.allSection}`}
        >
          {/* 전체 상품 Header 컴포넌트 */}
          <ProductsListHeader orderBy={orderBy} setOrderBy={setOrderBy} debouncedSearch={debouncedSearch} />
          {/* 전체 상품 리스트 */}
          <div className={styles.lists}>
            {items && (
              <ProductsList lists={items} />
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            hasPrevPage={hasPrevPage}
            visiblePages={visiblePages}
            hasNextPage={hasNextPage}
            onPageChange={handlePage}
          />
        </section>
      </div>
    </main>
  );
}
