import itemsStyles from '../../../pages/Items.module.css'
import styles from './ProductsListHeader.module.css';

import { Link } from "react-router";

import ItemsSort from './ItemsSort';

export default function ProductsListHeader({
  debouncedSearch,
  orderBy,
  setOrderBy,
}) {
  return (
    <div className={`${styles["items__section__header"]}`}>
      <h1 className={`${itemsStyles["items__section__title"]}`}>전체 상품</h1>
      <div
        className={`${styles["items__section__controls__search__container"]}`}
      >
        <input
          type="text"
          placeholder="검색할 상품을 입력해주세요."
          onChange={(e) => {
            debouncedSearch(e.target.value);
          }}
          className={`${styles["items__section__controls__search__input"]}`}
        />
      </div>
      <Link
        to="/items/additem"
        className={`${styles["items__section__controls__button"]}`}
      >
        상품 등록하기
      </Link>
      <div className={`${styles["items__section__sort__container"]}`}>
        <ItemsSort orderBy={orderBy} setOrderBy={setOrderBy} />
      </div>
    </div>
  );
}
