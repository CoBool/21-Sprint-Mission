import styles from "./AddItem.module.css";

import { useForm } from "../../../hooks/useForm";
import { useFilePreview } from "../../../hooks/useFilePreview";

const initialValues = {
  image: "",
  name: "",
  description: "",
  price: "",
  tags: "",
};

const validate = (values) => {
  console.log(values);
};

export default function AddItem() {
  const { values, handlers, controls } = useForm({
    initialValues,
    validate,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const { handleBlur, handleChange, handleSubmit } = handlers;
  const { touched, errors } = controls;

  const preview = useFilePreview(values?.image);

  return (
    <main>
      <div className={`container ${styles["addItem__container"]}`}>
        <section className={`${styles["addItem__section"]}`}>
          <form
            className={`${styles["addItem__section__form"]}`}
            action={handleSubmit}
          >
            <div className={`${styles["addItem__section__form--header"]}`}>
              <h1
                className={`${styles["addItem__section__form--header__title"]}`}
              >
                상품 등록하기
              </h1>

              <button
                type="submit"
                className={`${styles["addItem__section__form--header__button"]}`}
              >
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
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                multiple
              />
              {touched?.image && errors?.image && (
                <span className="error-msg">에러!</span>
              )}
              <div>{preview && preview.map(preview => <img key={preview} src={preview} alt="상품 이미지" />)}</div>
            </div>

            <div className={`${styles["addItem__section__form--group"]}`}>
              <label
                htmlFor="name"
                className={`${styles["addItem__section__form--group__label"]}`}
              >
                상품명
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div className={`${styles["addItem__section__form--group"]}`}>
              <label
                htmlFor="description"
                className={`${styles["addItem__section__form--group__label"]}`}
              >
                상품 소개
              </label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className={`${styles["addItem__section__form--group"]}`}>
              <label
                htmlFor="price"
                className={`${styles["addItem__section__form--group__label"]}`}
              >
                판매가격
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={values.price}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
            <div className={`${styles["addItem__section__form--group"]}`}>
              <label
                htmlFor="tags"
                className={`${styles["addItem__section__form--group__label"]}`}
              >
                태그
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={values.tags}
                onBlur={handleBlur}
                onChange={handleChange}
              />
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
