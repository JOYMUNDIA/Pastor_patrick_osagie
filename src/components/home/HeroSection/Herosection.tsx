'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Herosection.module.css';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const items = el.querySelectorAll('[data-animate]');
    items.forEach((item, i) => {
      (item as HTMLElement).style.animationDelay = `${i * 0.15 + 0.3}s`;
      item.classList.add('animate-fade-up');
    });
  }, []);

  return (
    <section id="home" className={styles.hero} ref={heroRef}>
      <div className={styles.banner}>
        {/* Left - Portrait */}
        <div className={styles.left}>
          <div className={styles.rectanglesVertical}>
            {[1,2,3,4].map(n => (
              <div key={n} className={`${styles.rect} ${styles[`rect${n}`]}`} />
            ))}
          </div>
          <div className={styles.portraitWrap}>
            <div className={styles.popContainer}>
              <div className={styles.containerInner}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={styles.circle} src="/images/Pastor_Osagie_.png" alt="" aria-hidden />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className={`${styles.img} ${styles.img1}`} src="/images/Pastor_Osagie_.png" alt="Pastor Patrick D. Osagie" />
              </div>
            </div>
          </div>
        </div>

        {/* Right - Content */}
        <div className={styles.right}>
          <div className={styles.videoBg}>
            <iframe
              src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fpdosagie%2Fvideos%2F1453677586280619%2F&show_text=false&width=560&t=0"
              frameBorder="0"
              allow="encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              title="Ministry Video"
            />
            <div className={styles.overlay} />
          </div>

          <div className={styles.content}>
            <div className={styles.overline} data-animate>Pastor</div>
            <h1 className={styles.heroTitle} data-animate>
              <span className={styles.gold}>Dr</span><br />
              <span className={styles.navy}>Patrick D.<br />Osagie</span>
            </h1>
            <div className={styles.badges} data-animate>
              {['Pastor', 'Musician', 'Youth Advocate', 'Academician'].map(b => (
                <span key={b} className={`badge badge-gold`}>{b}</span>
              ))}
            </div>
            <p className={styles.signature} data-animate>Patrick D. Osagie</p>
            <div className={styles.ctaRow} data-animate>
              <Link href="/ministry" className="btn btn-primary">Ministry Hub</Link>
              <Link href="/appointments" className="btn btn-outline">Book Appointment</Link>
            </div>
          </div>

          <div className={styles.socials} data-animate>
            <a href="https://facebook.com/pdosagie" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Facebook
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
