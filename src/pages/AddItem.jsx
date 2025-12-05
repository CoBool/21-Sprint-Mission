import styles from "./AddItem.module.css";

// 여기도 custom hook 사용해서 구현하기.
// 대충 디자인만 하고 숙면.

export default function AddItem() {
  return (
    <main>
      <div className={`container ${styles["addItem__container"]}`}>
        <section className={`${styles["addItems__section"]}`}>
          <h1 className={`${styles["addItems__section__title"]}`}>
            상품 등록하기
          </h1>
          <form action={`${styles["addItems__section__form"]}`}>
            <div className={`${styles["addItems__section__form--group"]}`}>
              <label>상품 이미지</label>
              <input type="file" />
            </div>
            <div className={`${styles["addItems__section__form--group"]}`}>
              <label>상품명</label>
              <input type="text" />
            </div>
            <div className={`${styles["addItems__section__form--group"]}`}>
              <label>상품 소개</label>
              <textarea></textarea>
            </div>
            <div className={`${styles["addItems__section__form--group"]}`}>
              <label>판매가격</label>
              <input type="number" />
            </div>
            <div className={`${styles["addItems__section__form--group"]}`}>
              <label>태그</label>
              <input type="text" />
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}