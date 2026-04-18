'use client';
import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>

      <div className={styles.container}>

        <div className={styles.grid}>

          {/* BRAND */}
          <div className={styles.brand}>
            <h3 className={styles.logo}>Patrick D. Osagie</h3>
            <p>
              Pastor, musician, and youth leader dedicated to spreading the Gospel,
              empowering young people, and building strong families through faith.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div className={styles.col}>
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#music">Music</a></li>
              <li><a href="#youth">Youth Ministry</a></li>
              <li><a href="#live-prayer">Live Prayer</a></li>
            </ul>
          </div>

          {/* CONNECT */}
          <div className={styles.col}>
            <h4>Connect</h4>
            <ul>
              <li><a href="https://facebook.com/pdosagie" target="_blank">Facebook Page</a></li>
              <li><a href="https://youtube.com" target="_blank">YouTube Channel</a></li>
              <li><a href="https://x.com" target="_blank">Twitter / X</a></li>
              <li><a href="https://instagram.com" target="_blank">Instagram</a></li>
              <li><a href="https://tiktok.com" target="_blank">TikTok</a></li>
            </ul>
          </div>

          {/* SOCIAL ICONS */}
          <div className={styles.col}>
            <h4>Socials</h4>

            <div className={styles.socialIcons}>
              {/* Facebook */}
              <a href="https://facebook.com/pdosagie" target="_blank" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="https://youtube.com" target="_blank" aria-label="YouTube">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a2.99 2.99 0 0 0-2.108-2.117C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.39.569A2.99 2.99 0 0 0 .502 6.186 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .502 5.814 2.99 2.99 0 0 0 2.108 2.117C4.5 20.5 12 20.5 12 20.5s7.5 0 9.39-.569a2.99 2.99 0 0 0 2.108-2.117A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.502-5.814zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
                </svg>
              </a>

              {/* Twitter/X */}
              <a href="https://x.com" target="_blank" aria-label="Twitter/X">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26L22.5 21.75h-6.172l-4.833-6.32-5.53 6.32H2.657l7.73-8.835L1.5 2.25h6.328l4.37 5.777 6.046-5.777z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a href="https://instagram.com" target="_blank" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.75 2C4.57 2 2 4.57 2 7.75v8.5C2 19.43 4.57 22 7.75 22h8.5C19.43 22 22 19.43 22 16.25v-8.5C22 4.57 19.43 2 16.25 2h-8.5zm0 2h8.5C18.22 4 20 5.78 20 7.75v8.5c0 1.97-1.78 3.75-3.75 3.75h-8.5C5.78 20 4 18.22 4 16.25v-8.5C4 5.78 5.78 4 7.75 4zm4.25 2.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zm0 2a3.5 3.5 0 110 7 3.5 3.5 0 010-7zm4.75-.75a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a href="https://tiktok.com" target="_blank" aria-label="TikTok">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 2c.3 2.2 1.9 4 4 4.3v3c-1.3 0-2.6-.4-3.7-1v6.2a5.5 5.5 0 11-5.5-5.5c.2 0 .4 0 .6.1v3.1a2.5 2.5 0 102.4 2.5V2h2.2z"/>
                </svg>
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className={styles.bottom}>
          <p>© 2026 Pastor Patrick D. Osagie. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;