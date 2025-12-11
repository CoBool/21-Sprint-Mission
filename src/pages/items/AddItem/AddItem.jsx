import styles from "./AddItem.module.css";
import sharedStyles from "../../../assets/styles/layout.module.css";
import { useForm } from "../../../hooks/useForm";
import { useFilePreview } from "../../../hooks/useFilePreview";
import { useState } from "react";
import { useNavigate } from "react-router";

import { useToast } from "../../../context/ToastContext";

const initialValues = {
  images: [],
  name: "",
  description: "",
  price: "",
  tags: [],
};

import { imageUpload, createItem } from "../../../features/items/api/itemsApi";

const validate = (values) => {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "상품명을 입력해주세요.";
  }

  if (!values.description.trim()) {
    errors.description = "상품 소개를 입력해주세요.";
  }

  if (!values.price) {
    errors.price = "판매가격을 입력해주세요.";
  } else if (isNaN(values.price) || values.price <= 0) {
    errors.price = "판매가격은 0 이상의 숫자여야 합니다.";
  }
    
  if (!values.tags.length) {
    errors.tags = "태그를 최소 1개 이상 등록해주세요.";
  }

  return errors;
};

export default function AddItem() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { values, handlers, controls } = useForm({
    initialValues,
    validate,
    onAction: async (values) => {
      try {
        const newValues = {
          ...values,
          images: uploadedImages,
        };
        const response = await createItem(newValues);

        const confirmation = window.confirm(
          "상품 등록이 완료되었습니다. 등록한 상품을 확인하시겠습니까?"
        );

        if (confirmation) {
          const { id } = response;
          navigate(`/items/${id}`);
        } else {
          navigate("/items");
        }
      } catch (error) {
        addToast(`상품 등록 실패: ${error.message}`, "error");
      }
    },
  });

  // 일단.. 임시로 업로드된 이미지 보관소!!!
  const [uploadedImages, setUploadedImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(false);

  const { handleBlur, handleChange, handleAction, setFieldValue } = handlers;
  const { touched, errors } = controls;

  // 제출 가능 여부 실시간 계산
  const currentErrors = validate(values);
  const isSubmitable = Object.keys(currentErrors).length === 0;

  const preview = useFilePreview(values?.images);

  const handleRemoveFile = (indexToRemove) => {
    const nextFiles = values.images.filter(
      (_, index) => index !== indexToRemove
    );
    setFieldValue("images", nextFiles);
    // 의미는 없지만 일단 삭제해줍니다...
    setUploadedImages((prev) =>
      prev.filter((_, index) => index !== indexToRemove)
    );
    setUploadError(false);
  };

  const handleImageUpload = async (e) => {
    if ( values.images.length < 1 ) {
      const { files } = e.target;
      const newFiles = Array.from(files || []);

      newFiles.forEach(async (file) => {
        try {
          if (file.type.startsWith("image/")) {
            setIsUploading(true);
            const response = await imageUpload(file);
            setUploadedImages((prev) => [...prev, response.url]);

            addToast(`${file.name} 이미지 업로드 성공`, "success");
            setIsUploading(false);
          }
        } catch (e) {
          addToast(`${file.name} 이미지 업로드 실패: ${e.message}`, "error");
          setIsUploading(false);
        }
      });

      setFieldValue("images", [...values.images, ...newFiles]);
    } else {
      setUploadError(true)
    }

    e.target.value = null;
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
                disabled={!isSubmitable || isUploading}
              >
                등록
              </button>
            </div>

            {/* 1. 이미지 업로드 그룹 */}
            <div className={styles.formGroup}>
              <label htmlFor="images" className={styles.label}>
                상품 이미지
              </label>
              <input
                type="file"
                id="images"
                name="images"
                onChange={handleImageUpload}
                className={styles.fileInput}
                onClick={(e) => {
                  if ( values.images.length >= 1 ) {
                    e.preventDefault();
                    setUploadError(true);
                  }
                }}
              />
              { uploadError && (
                <span className={styles.errorMsg}>이미지는 하나만 등록할 수 있어요.</span>
              )}

              {/* 이미지 미리보기 및 삭제 UI */}
              <div className={styles.previewList}>
                {preview &&
                  preview.map((url, index) => (
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
              <label htmlFor="name" className={styles.label}>
                상품명
              </label>
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
              <label htmlFor="description" className={styles.label}>
                상품 소개
              </label>
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
              <label htmlFor="price" className={styles.label}>
                판매가격
              </label>
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
              <label htmlFor="tags" className={styles.label}>
                태그
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
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
