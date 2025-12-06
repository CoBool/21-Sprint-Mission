import styles from './FeatureCard.module.css';

export default function FeatureCard({ src, alt, label, title, description, reverse = false }) {
  return (
    <section className={`${styles.feature} ${reverse ? styles.reverse : ""}`}>
      <div className={`${styles.container} container`}>
        <div className={styles.card}>
          <div className={styles.image}>
            <img
              className={styles.img}
              src={src}
              alt={alt}
            />
          </div>
          <div className={styles.text}>
            <h3 className={styles.title}>{label}</h3>
            <h4 className={styles.mainText}>
              {title}
            </h4>
            <p className={styles.subText}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
