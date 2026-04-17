import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={`${styles.footer} fade-in`}>
      <div className="container">
        <div className="footer-content">
          {/* About */}
          <div className="footer-col">
            <h3 className="footer-logo">Patrick D. Osagie</h3>
            <p>
              Pastor, musician, and youth leader dedicated to spreading the Gospel, empowering young people, and building strong families through faith.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#music">Music</a></li>
              <li><a href="#youth">Youth Ministry</a></li>
              <li><a href="#live-prayer">Live Prayer</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="https://facebook.com/pdosagie" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://instagram.com/youraccount" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="#">HotFM Podcast</a></li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="footer-col">
            <h4>Stay Connected</h4>
            <p>Get updates on prayer sessions, events, and messages.</p>
            <form className="footer-form">
              <input type="email" placeholder="Your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p>© 2026 Pastor Patrick D. Osagie. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;