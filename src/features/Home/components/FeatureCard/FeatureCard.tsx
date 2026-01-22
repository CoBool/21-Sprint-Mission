import styles from './FeatureCard.module.css';

interface FeatureCardProps {
  src: string;
  alt?: string;
  label: string;
  title: string;
  description: string;
  reverse?: boolean;
}

function FeatureCard({ src, alt = '', label, title, description, reverse = false }: FeatureCardProps) {
  return (
    <article className={`${styles.feature} ${reverse ? styles.reverse : ''}`}>
      <div className={`layout-container`}>
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
    </article>
  );
}

export { FeatureCard }