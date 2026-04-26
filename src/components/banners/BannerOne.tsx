import styles from "./banners.module.css";

type Props = {
  imageSrc: string;
  label?: string;
  title?: string;
  subtitle?: string;
};

export default function BannerOne({
  imageSrc,
  label,
  title,
  subtitle,
}: Props) {
  return (
    <div className={`${styles.banner} ${styles.banner1}`}>
      
      {/* Arc */}
      <div className={styles.arcWrap}>
        <svg viewBox="0 0 380 380" fill="none">
          <circle cx="190" cy="190" r="170" stroke="#0D234B" strokeWidth="18" opacity="0.08"/>
          <circle cx="190" cy="190" r="140" stroke="#F4B400" strokeWidth="14" opacity="0.18"/>
          <circle cx="190" cy="190" r="110" stroke="#0D234B" strokeWidth="10" opacity="0.06"/>
        </svg>
      </div>

      {/* Image */}
      <img
        src={imageSrc}
        className={`${styles.photo} ${styles.banner1Photo}`}
        alt=""
        />
      <div className={styles.photoOverlay} />

      {/* Content */}
      <div className={`${styles.content} ${styles.banner1Content}`}>
        {label && <div className={styles.label}>{label}</div>}
        {title && (
            <div className={`${styles.titleBig} ${styles.banner1Title}`}>
                {title.split('\n').map((line, i) => (
                <span key={i}>
                    {line}
                    {i < title.split('\n').length - 1 && <br />}
                </span>
                ))}
            </div>
            )}
        {subtitle && <div className={styles.subtitleBox}>{subtitle}</div>}
    </div>
    </div>
  );
}