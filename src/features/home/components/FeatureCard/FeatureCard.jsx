import styles from './FeatureCard.module.css';

export function FeatureCard({ src, alt, label, title, description, reverse = false }) {
  return (
    <section className={`${styles.feature} ${reverse ? styles.reverse : ""}`}>
      <div className={`${styles.feature__container} container`}>
        <div className={styles.card}>
          <div className={styles["card__image"]}>
            <img
              className={styles["card__img"]}
              src={src}
              alt={alt}
            />
          </div>
          <div className={styles["card__text"]}>
            <h3 className={styles["card__title"]}>{label}</h3>
            <h4 className={styles["card__main-text"]}>
              {title}
            </h4>
            <p className={styles["card__sub-text"]}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
