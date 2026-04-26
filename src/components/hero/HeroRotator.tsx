'use client';







import { useEffect, useState } from 'react';
import styles from './hero.module.css';

export default function HeroRotator({
  banners,
  interval = 15
  
  000,
}: {
  banners: React.ReactNode[];
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % banners.length);
    }, interval);

    return () => clearInterval(t);
  }, [banners.length, interval]);

  return (
    <section className={styles.hero}>
      <div key={index} className={`${styles.bg} ${styles.fade}`}>
        {banners[index]}
      </div>
    </section>
  );
}