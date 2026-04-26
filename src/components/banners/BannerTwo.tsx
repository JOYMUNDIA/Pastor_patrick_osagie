import styles from "./banners.module.css";

type Props = {
  imageSrc: string;
  label?: string;
  title?: string;
  subtitle?: string;
};


export default function BannerTwo({
  imageSrc,
  label,
  title,
  subtitle,
}: Props) {
  return (
    <div className={`${styles.banner} ${styles.banner2}`}>
      
      {/* Image */}
      <img
        src={imageSrc}
        className={`${styles.photo} ${styles.banner2Photo}`}
        alt=""
        />

      {/* Swoosh */}
      <svg className={styles.swoosh} viewBox="0 0 900 260" preserveAspectRatio="none">
        <defs>
            <linearGradient id="swoosh1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0D234B" stopOpacity="0"/>
            <stop offset="60%" stopColor="#0D234B" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#0D234B" stopOpacity="0.97"/>
            </linearGradient>
        </defs>

        {/* main dark swoosh */}
        <path d="M420 0 Q500 130 420 260 L900 260 L900 0 Z" fill="url(#swoosh1)"/>
        <path d="M0 220 Q300 180 500 240 Q650 280 900 200 L900 260 L0 260 Z" fill="#F4B400" opacity="0.12"/>

        {/* ✨ decorative gold curves (IMPORTANT) */}
        <path
            d="M350 0 Q500 40 560 0"
            stroke="#F4B400"
            strokeWidth="3"
            fill="none"
            opacity="0.35"
        />

        <path
            d="M380 260 Q520 180 600 260"
            stroke="#f9d04d"
            strokeWidth="4"
            fill="none"
            opacity="0.3"
        />
        </svg>

      {/* Content */}
      <div className={`${styles.content} ${styles.banner2Content}`}>
        {label && (
        <div className={styles.label}>
            {label.split('\n').map((line, i) => (
            <span key={i}>
                {line}
                {i < label.split('\n').length - 1 && <br />}
            </span>
            ))}
        </div>
        )}
        {subtitle && <span className={styles.titleSmall}>{subtitle}</span>}
        {title && (
            <span className={`${styles.titleBig} ${styles.banner2Title}`}>
                {title.split('\n').map((line, i) => (
                <span key={i}>
                    {line}
                    {i < title.split('\n').length - 1 && <br />}
                </span>
                ))}
            </span>
            )}
        </div>
    </div>
  );
}