import styles from "./pagination.module.css";
import ArrowIcon from "../../../assets/images/icons/arrow.png";

export default function Pagination({
  currentPage,
  hasPrevPage,
  visiblePages,
  hasNextPage,
  onPageChange
}) {
  return (
    <div className={`${styles["pagination__container"]}`}>
      <ul className={`${styles["pagination__list"]}`}>
        {hasPrevPage && (
          <li>
            <button
              className={`${styles["pagination__button"]} ${styles["pagination__button--prev"]}`}
              onClick={() => onPageChange('prev')}
              aria-label="이전페이지"
            >
              <img src={ArrowIcon} alt="이전페이지" />
            </button>
          </li>
        )}
        {visiblePages.map((page) => (
          <li key={page}>
            <button
              className={`${styles["pagination__button"]} ${
                page === currentPage ? styles["pagination__button--current"] : ""
              }`}
              onClick={() => onPageChange('number', page)}
            >
              {page}
            </button>
          </li>
        ))}
        {hasNextPage && (
          <li>
            <button
              className={`${styles["pagination__button"]} ${styles["pagination__button--next"]}`}
              onClick={() => onPageChange('next')}
              aria-label="다음페이지"
            >
              <img src={ArrowIcon} alt="다음페이지" />
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
