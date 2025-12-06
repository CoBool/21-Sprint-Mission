import styles from './ProductsListHeader.module.css';
import sharedStyles from '../../../../assets/styles/layout.module.css';

import { Link } from "react-router";

import ItemsSort from '../ItemsSort';

export default function ProductsListHeader({
  debouncedSearch,
  orderBy,
  setOrderBy,
}) {
  return (
    <div className={styles.header}>
      <h1 className={sharedStyles.sectionTitle}>전체 상품</h1>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요."
          onChange={(e) => {
            debouncedSearch(e.target.value);
          }}
          className={styles.searchInput}
        />
      </div>
      <Link
        to="/items/additem"
        className={styles.createButton}
      >
        상품 등록하기
      </Link>
      <div className={styles.sortContainer}>
        <ItemsSort orderBy={orderBy} setOrderBy={setOrderBy} />
      </div>
    </div>
  );
}
