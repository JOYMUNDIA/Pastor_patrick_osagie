'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Herosection.module.css';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;

    const items = el.querySelectorAll('[data-animate]');
    items.forEach((item, i) => {
      (item as HTMLElement).style.animationDelay = `${i * 0.15 + 0.3}s`;
      item.classList.add('animate-fade-up');
    });
  }, []);

  const handlePlayVideo = () => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const content = document.querySelector(`.${styles.content}`) as HTMLElement;
    const social = document.querySelector(`.${styles.socials}`) as HTMLElement;
    const overlay = document.querySelector(`.${styles.overlay}`) as HTMLElement;

    if (content) content.style.display = 'none';
    if (social) social.style.display = 'none';
    if (overlay) overlay.style.display = 'none';

    const src = iframe.src;
    iframe.src = src.includes('autoplay=1') ? src : `${src}&autoplay=1`;
  };

  return (
    <section id="home" className={styles.hero} ref={heroRef}>
      <div className={styles.banner}>

        {/* LEFT */}
        <div className={styles.left}>
          <div className={styles.rectanglesVertical}>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className={`${styles.rect} ${styles[`rect${n}`]}`} />
            ))}
          </div>

          <div className={styles.portraitWrap}>
            <div className={styles.popContainer}>
              <div className={styles.containerInner}>
                <img
                  className={styles.circle}
                  src="/images/Pastor_Osagie_.png"
                  alt=""
                  aria-hidden
                />
                <img
                  className={`${styles.img} ${styles.img1}`}
                  src="/images/Pastor_Osagie_.png"
                  alt="Pastor Patrick D. Osagie"
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className={styles.right}>

          <div className={styles.videoBg}>
            <iframe
              ref={iframeRef}
              src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2Fpdosagie%2Fvideos%2F1453677586280619%2F&show_text=false&width=560&t=0"
              style={{ border: 0 }}
              allow="encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              title="Ministry Video"
            />
            <div className={styles.overlay} />
          </div>

          {/* CONTENT */}
          <div className={styles.content}>
            <div className={styles.overline} data-animate>Pastor</div>

            <h1 className={styles.heroTitle} data-animate>
              <span className={styles.gold}>Dr</span><br />
              <span className={styles.navy}>Patrick D.<br />Osagie</span>
            </h1>

            <div className={styles.badges} data-animate>
              {['Pastor', 'Musician', 'Youth Advocate', 'Academician'].map((b) => (
                <span key={b} className={styles.badge}>{b}</span>
              ))}
            </div>

            <p className={styles.signature} data-animate>
              Patrick D. Osagie
            </p>

            <div className={styles.ctaRow} data-animate>
              <Link href="/ministry" className="btn btn-primary">
                Ministry Hub
              </Link>
              <Link href="/appointments" className="btn btn-outline">
                Book Appointment
              </Link>
            </div>

            {/* UIVerse Play Button */}
            <div className={styles.playWrapper} onClick={handlePlayVideo}>
              <div className={styles.container}>
                <div className={styles.innerRing}>
                  <div className={styles.buttonIcon}>▶</div>
                </div>
              </div>
            </div>

          </div>

          {/* SOCIAL */}
          <div className={styles.socials} data-animate>
            <a href="https://facebook.com/pdosagie" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Facebook
            </a>

            <a href="https://youtube.com" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M23.498 6.186a2.99 2.99 0 0 0-2.108-2.117C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.39.569A2.99 2.99 0 0 0 .502 6.186 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .502 5.814 2.99 2.99 0 0 0 2.108 2.117C4.5 20.5 12 20.5 12 20.5s7.5 0 9.39-.569a2.99 2.99 0 0 0 2.108-2.117A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
              </svg>
              YouTube
            </a>

            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.172l-4.833-6.32-5.53 6.32H2.657l7.73-8.835L1.5 2.25h6.328l4.37 5.777 6.046-5.777z"/>
              </svg>
              Twitter/X
            </a>

            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8z"/>
              </svg>
              Instagram
            </a>

            <a href="https://tiktok.com" target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
                <path d="M12.75 2h3.1c.2 1.98 1.6 3.6 3.55 4.1v3.2c-1.3.02-2.55-.3-3.7-.9v6.9c0 3.6-2.9 6.5-6.5 6.5S2.7 18.9 2.7 15.3s2.9-6.5 6.5-6.5c.3 0 .6.02.9.07v3.3c-.3-.1-.6-.15-.9-.15-1.8 0-3.3 1.5-3.3 3.3s1.5 3.3 3.3 3.3 3.3-1.5 3.3-3.3V2z"/>
              </svg>
              TikTok
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}