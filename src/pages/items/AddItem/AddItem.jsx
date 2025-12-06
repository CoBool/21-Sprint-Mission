import styles from "./AddItem.module.css";
import sharedStyles from "../../../assets/styles/layout.module.css";
import { useForm } from "../../../hooks/useForm";
import { useFilePreview } from "../../../hooks/useFilePreview";

const initialValues = {
  image: [],
  name: "",
  description: "",
  price: "",
  tags: [],
};

const validate = (values) => {
  const errors = {};
  if (!values.name.trim()) errors.name = '상품명을 입력해주세요.';
  if (!values.description.trim()) errors.description = '상품 소개를 입력해주세요.';
  if (!values.price) errors.price = '판매가격을 입력해주세요.';
  else if (values.price <= 0) errors.price = '판매가격은 0원 이상이어야 합니다.';
  if (!values.tags) errors.tags = '태그를 입력해주세요.';
  
  // 이미지 필수 체크가 필요하다면 추가
  // if (values.image.length === 0) errors.image = '이미지를 최소 1장 등록해주세요.';
  
  return errors;
};

export default function AddItem() {

  const { values, handlers, controls } = useForm({
    initialValues,
    validate,
    onAction: (values) => {
      console.log("제출 성공:", values);
      return false;
    },
  });

  const { handleBlur, handleChange, handleAction, setFieldValue } = handlers;
  const { touched, errors } = controls;
  
  // 제출 가능 여부 실시간 계산
  const currentErrors = validate(values);
  const isSubmitable = Object.keys(currentErrors).length === 0;

  const preview = useFilePreview(values?.image);

  const handleRemoveFile = (indexToRemove) => {
    const nextFiles = values.image.filter((_, index) => index !== indexToRemove);
    setFieldValue("image", nextFiles);
  };  

  return (
    <main>
      <div className={`container ${sharedStyles.pageContainer}`}>
        <section className={sharedStyles.section}>
          <form className={styles.form} action={handleAction}>
            
            {/* 헤더 영역 */}
            <div className={styles.header}>
              <h1 className={styles.title}>상품 등록하기</h1>
              <button
                type="submit"
                className={styles.button}
                disabled={!isSubmitable}
              >
                등록
              </button>
            </div>

            {/* 1. 이미지 업로드 그룹 */}
            <div className={styles.formGroup}>
              <label htmlFor="image" className={styles.label}>
                상품 이미지
              </label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                multiple
                className={styles.fileInput}
              />
              {touched?.image && errors?.image && (
                <span className={styles.errorMsg}>{errors.image}</span>
              )}

              {/* 이미지 미리보기 및 삭제 UI */}
              <div className={styles.previewList}>
                {preview && preview.map((url, index) => (
                  <div key={url} className={styles.previewItem}>
                    <img src={url} alt={`preview-${index}`} />
                    <button 
                      type="button" 
                      className={styles.deleteBtn}
                      onClick={() => handleRemoveFile(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. 상품명 그룹 */}
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>상품명</label>
              <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                className={styles.input}
              />
              {touched?.name && errors?.name && (
                <span className={styles.errorMsg}>{errors.name}</span>
              )}
            </div>

            {/* 3. 상품 소개 그룹 */}
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.label}>상품 소개</label>
              <textarea
                id="description"
                name="description"
                value={values.description}
                onBlur={handleBlur}
                onChange={handleChange}
                className={styles.textarea}
              ></textarea>
              {touched?.description && errors?.description && (
                <span className={styles.errorMsg}>{errors.description}</span>
              )}
            </div>

            {/* 4. 판매 가격 그룹 */}
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.label}>판매가격</label>
              <input
                type="text"
                id="price"
                name="price"
                value={values.price}
                onBlur={handleBlur}
                onChange={handleChange}
                className={styles.input}
              />
              {touched?.price && errors?.price && (
                <span className={styles.errorMsg}>{errors.price}</span>
              )}
            </div>

            {/* 5. 태그 그룹 */}
            <div className={styles.formGroup}>
              <label htmlFor="tags" className={styles.label}>태그</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={values.tags}
                onBlur={handleBlur}
                onChange={handleChange}
                className={styles.input}
              />
              {touched?.tags && errors?.tags && (
                <span className={styles.errorMsg}>{errors.tags}</span>
              )}
            </div>

          </form>
        </section>
      </div>
    </main>
  );
}