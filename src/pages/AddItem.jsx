import styles from "./AddItem.module.css";

// 여기도 custom hook 사용해서 구현하기.
// 대충 디자인만 하고 숙면.

export default function AddItem() {
  return (
    <main>
      <div className={`container ${styles["addItem__container"]}`}>
        <section className={`${styles["addItem__section"]}`}>
          <form className={`${styles["addItem__section__form"]}`}>
            <div className={`${styles["addItem__section__form--header"]}`}>
              <h1 className={`${styles["addItem__section__form--header__title"]}`}>
                상품 등록하기
              </h1>

              <button type="submit" className={`${styles["addItem__section__form--header__button"]}`}>
                등록
              </button>
            </div>

            <div className={`${styles["addItem__section__form--group"]}`}>
              <label
                htmlFor="image"
                className={`${styles["addItem__section__form--group__label"]}`}
              >
                상품 이미지
              </label>
              <input type="file" id="image" />
            </div>
            <div className={`${styles["addItem__section__form--group"]}`}>
              <label
                htmlFor="name"
                className={`${styles["addItem__section__form--group__label"]}`}
              >
                상품명
              </label>
              <input type="text" id="name" />
            </div>
            <div className={`${styles["addItem__section__form--group"]}`}>
              <label
                htmlFor="description"
                className={`${styles["addItem__section__form--group__label"]}`}
              >
                상품 소개
              </label>
              <textarea id="description"></textarea>
            </div>
            <div className={`${styles["addItem__section__form--group"]}`}>
              <label
                htmlFor="price"
                className={`${styles["addItem__section__form--group__label"]}`}
              >
                판매가격
              </label>
              <input type="number" id="price" />
            </div>
            <div className={`${styles["addItem__section__form--group"]}`}>
              <label
                htmlFor="tags"
                className={`${styles["addItem__section__form--group__label"]}`}
              >
                태그
              </label>
              <input type="text" id="tags" />
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
