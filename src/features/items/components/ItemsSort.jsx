import SortIcon from "../../../assets/images/icons/ic_sort.svg"

import styles from "./ItemsSort.module.css";
import { useState } from "react";

export default function ItemsSort({ orderBy, setOrderBy }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClick = (value) => {
    setOrderBy(value);
    setIsOpen(false);
  };

  const label = orderBy === "recent" ? "최신순" : "좋아요순";

  return (
    <div className={`${styles["items__sort"]}`}>
      <div
        className={`${styles["items__sort__trigger"]}`}
        onClick={handleToggle}
      >
        <span className={`${styles["items__sort__trigger__text"]} ${isOpen ? styles["items__sort__trigger__text--active"] : ""}`}>
          {label}
        </span>
        <span className={`${styles["items__sort__trigger__icon"]}`}>
          <img src={SortIcon} alt="정렬" />
        </span>
      </div>
      {isOpen && (
        <ul className={`${styles["items__sort__list"]}`}>
          <li>
            <button
              className={`${styles["items__sort__button"]} ${
                orderBy === "recent"
                  ? styles["items__sort__button--active"]
                  : ""
              }`}
              onClick={() => {
                handleClick("recent");
              }}
            >
              최신순
            </button>
          </li>
          <li>
            <button
              className={`${styles["items__sort__button"]} ${
                orderBy === "favorite"
                  ? styles["items__sort__button--active"]
                  : ""
              }`}
              onClick={() => {
                handleClick("favorite");
              }}
            >
              좋아요순
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
