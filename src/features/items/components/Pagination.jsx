import styles from "./lists/lists.module.css";

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
              className={`${styles["pagination__button"]} ${styles["pagination__item--prev"]}`}
              onClick={() => onPageChange('prev')}
            >
              이전페이지
            </button>
          </li>
        )}
        {visiblePages.map((page) => (
          <li key={page}>
            <button
              className={`${styles["pagination__button"]} ${
                page === currentPage ? styles["pagination__item--current"] : ""
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
              className={`${styles["pagination__button"]} ${styles["pagination__item--next"]}`}
              onClick={() => onPageChange('next')}
            >
              다음페이지
            </button>
          </li>
        )}
      </ul>
    </div>
  );
}
