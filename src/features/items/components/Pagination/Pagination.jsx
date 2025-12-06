import styles from "./Pagination.module.css";
import ArrowIcon from "../../../../assets/images/icons/arrow.png";

export default function Pagination({
  currentPage,
  hasPrevPage,
  visiblePages,
  hasNextPage,
  onPageChange,
}) {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        <li>
          <button
            className={`${styles.button} ${styles.buttonPrev}`}
            onClick={() => onPageChange("prev")}
            aria-label="이전페이지"
            disabled={!hasPrevPage}
          >
            <img src={ArrowIcon} alt="이전페이지" />
          </button>
        </li>
        {visiblePages.map((page) => (
          <li key={page}>
            <button
              className={`${styles.button} ${
                page === currentPage
                  ? styles.buttonCurrent
                  : ""
              }`}
              onClick={() => onPageChange("number", page)}
            >
              {page}
            </button>
          </li>
        ))}
        <li>
          <button
            className={`${styles.button} ${styles.buttonNext}`}
            onClick={() => onPageChange("next")}
            aria-label="다음페이지"
            disabled={!hasNextPage}
          >
            <img src={ArrowIcon} alt="다음페이지" />
          </button>
        </li>
      </ul>
    </div>
  );
}
