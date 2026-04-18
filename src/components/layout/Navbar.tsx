"use client";

import React, { useState } from 'react';
import styles from './Navbar.module.css';

const Navbar: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <header className={`${styles.header} animate header-anim`}>
        <div className={styles.inner}>
          <div className={styles.logo}>Patrick D. Osagie</div>
          <nav className={styles.nav}>
            <a href="#home" className={`${styles.navLink} active`}>Home</a>
            <a href="#about" className={styles.navLink}>About</a>
            <a href="#ministry" className={styles.navLink}>Ministry</a>
            <a href="#media" className={styles.navLink}>Media</a>
            <a href="#contact" className={styles.navLink}>Contact</a>
          </nav>
          <div className={styles.hamburger} onClick={toggleSidebar}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarActive : ''}`}>
        <button className={styles.closeBtn} onClick={closeSidebar}>
          ✕
        </button>
        <nav className={styles.sidebarNav}>
          <a href="#home" className={`${styles.sidebarLink} active`} onClick={closeSidebar}>Home</a>
          <a href="#about" className={styles.sidebarLink} onClick={closeSidebar}>About</a>
          <a href="#ministry" className={styles.sidebarLink} onClick={closeSidebar}>Ministry</a>
          <a href="#media" className={styles.sidebarLink} onClick={closeSidebar}>Media</a>
          <a href="#contact" className={styles.sidebarLink} onClick={closeSidebar}>Contact</a>
        </nav>
      </div>

      {/* Overlay */}
      <div className={`${styles.overlay} ${isSidebarOpen ? styles.overlayActive : ''}`} onClick={closeSidebar}></div>
    </>
  );
};

export default Navbar;