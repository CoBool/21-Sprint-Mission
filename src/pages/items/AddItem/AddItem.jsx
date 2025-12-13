import styles from "./AddItem.module.css";
import sharedStyles from "../../../assets/styles/layout.module.css";
import { useForm } from "../../../hooks/useForm";
import { useFilePreview } from "../../../hooks/useFilePreview";
import { useState } from "react";
import { useNavigate } from "react-router";

import { toast } from "../../../components/ui/Toast/toast-store";

import { formatPrice, parseNumber } from "../../../utility/number";

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

  if (values?.name?.trim() === "") {
    errors.name = "상품명을 입력해주세요.";
  }

  if (values?.description?.trim() === "") {
    errors.description = "상품 소개를 입력해주세요.";
  }

  if (values?.price === "") {
    errors.price = "판매가격을 입력해주세요.";
  } else if (isNaN(values.price) || values.price <= 0) {
    errors.price = "판매가격은 0 이상의 숫자여야 합니다.";
  }

  if (values?.tags?.length === 0) {
    errors.tags = "태그를 최소 1개 이상 등록해주세요.";
  } else if (values?.tags?.length > 5) {
    errors.tags = "태그는 최대 5개까지 등록할 수 있어요.";
  }

  return errors;
};

export default function AddItem() {
  const navigate = useNavigate();
  const [tagValue, setTagValue] = useState("");
  const { values, handlers, controls } = useForm({
    initialValues,
    validate,
    onAction: async (values) => {
      try {
        const promises = [];

        values.images.forEach(async (image) => {
          if (image instanceof File && image.type.startsWith("image/")) {
            promises.push(imageUpload(image));
          }
        });

        const responses = await Promise.all(promises);
        const files = responses.map((response) => response.url);

        const response = await createItem({ ...values, images: files });

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
        toast({
          title: "상품 등록 실패",
          description: error.message,
          type: "error",
        });
      }
    },
  });

  const {
    register,
    setFieldValue,
    setFieldTouched,
    setFieldError,
    handleAction,
  } = handlers;
  const { errors, touched } = controls;

  const preview = useFilePreview(values?.images);

  const handleImageUpload = (e) => {
    const { files } = e.target;

    if (values.images.length >= 1) {
      e.target.value = null;
      return;
    }

    const newFiles = Array.from(files || []);
    setFieldValue("images", [...values.images, ...newFiles]);

    e.target.value = null;
  };

  const handleRemoveFile = (indexToRemove) => {
    const nextFiles = values.images.filter(
      (_, index) => index !== indexToRemove
    );
    setFieldValue("images", nextFiles);
  };

  const handleTagChange = (e) => {
    const { value } = e.target;
    setTagValue(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (tagValue.trim() === "") return;
      e.preventDefault();

      const nextTags = new Set([tagValue.trim(), ...values.tags]);
      setFieldValue("tags", Array.from(nextTags).slice(0, 5));
      setTagValue("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    const nextTags = values.tags.filter((_, index) => index !== indexToRemove);
    setFieldValue("tags", nextTags);
  };

  return (
    <main>
      <div className={`container ${sharedStyles.pageContainer}`}>
        <section className={sharedStyles.section}>
          <form className={styles.form} action={handleAction}>
            <div className={styles.header}>
              <h1 className={styles.title}>상품 등록하기</h1>
              <button type="submit" className={styles.button}>
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
              />
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
            <div
              className={`${styles.formGroup} ${
                touched?.name && errors?.name
                  ? styles.invalid
                  : touched?.name && !errors?.name
                  ? styles.valid
                  : ""
              }`}
            >
              <label htmlFor="name" className={styles.label}>
                상품명
              </label>
              <input
                type="text"
                id="name"
                name="name"
                {...register("name")}
                className={styles.input}
              />
              {touched?.name && errors?.name && (
                <span className={styles.errorMessage}>{errors.name}</span>
              )}
            </div>
            {/* 3. 상품 소개 그룹 */}
            <div
              className={`${styles.formGroup} ${
                touched?.description && errors?.description
                  ? styles.invalid
                  : touched?.description && !errors?.description
                  ? styles.valid
                  : ""
              }`}
            >
              <label htmlFor="description" className={styles.label}>
                상품 소개
              </label>
              <textarea
                id="description"
                name="description"
                {...register("description")}
                className={styles.textarea}
              ></textarea>
              {touched?.description && errors?.description && (
                <span className={styles.errorMessage}>
                  {errors.description}
                </span>
              )}
            </div>
            {/* 4. 판매 가격 그룹 */}
            <div
              className={`${styles.formGroup} ${
                touched?.price && errors?.price
                  ? styles.invalid
                  : touched?.price && !errors?.price
                  ? styles.valid
                  : ""
              }`}
            >
              <label htmlFor="price" className={styles.label}>
                판매가격
              </label>
              <input
                type="text"
                id="price"
                name="price"
                {...register("price", {
                  format: formatPrice,
                  parse: parseNumber,
                })}
                className={styles.input}
              />
              {touched?.price && errors?.price && (
                <span className={styles.errorMessage}>{errors.price}</span>
              )}
            </div>
            {/* 5. 태그 그룹 */}
            <div
              className={`${styles.formGroup} ${
                touched?.tags && errors?.tags ? styles.invalid : ""
              }`}
            >
              <label htmlFor="tags" className={styles.label}>
                태그
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                className={styles.input}
                value={tagValue}
                onBlur={() => {
                  setFieldTouched("tags");
                  setFieldError("tags", validate(values)?.tags ?? null);
                }}
                onChange={handleTagChange}
                onKeyDown={handleKeyDown}
              />
              <ul className={styles.tagList}>
                {values.tags.map((tag, index) => (
                  <li key={index} onClick={() => handleRemoveTag(index)}>
                    {tag}
                  </li>
                ))}
              </ul>
              {touched?.tags && errors?.tags && (
                <span className={styles.errorMessage}>{errors.tags}</span>
              )}
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
