"use client";

import React, { useState } from 'react';
import Link from 'next/link';
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
          <div className={styles.logo}>
            <Link href="/">Patrick D. Osagie</Link>
          </div>

          <nav className={styles.nav}>
            <Link href="/" className={styles.navLink}>Home</Link>
            <Link href="/about" className={styles.navLink}>About</Link>
            <Link href="/devotional" className={styles.navLink}>Devotional</Link>
            <Link href="/ministry" className={styles.navLink}>Ministry</Link>
            <Link href="/appointments" className={styles.navLink}>Appointments</Link>
            <Link href="/contact" className={styles.navLink}>Contact</Link>
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
          <Link href="/" className={styles.sidebarLink} onClick={closeSidebar}>Home</Link>
          <Link href="/about" className={styles.sidebarLink} onClick={closeSidebar}>About</Link>
          <Link href="/ministry" className={styles.sidebarLink} onClick={closeSidebar}>Ministry</Link>
          <Link href="/appointments" className={styles.sidebarLink} onClick={closeSidebar}>Appointments</Link>
          <Link href="/contact" className={styles.sidebarLink} onClick={closeSidebar}>Contact</Link>
        </nav>
      </div>

      {/* Overlay */}
      <div
        className={`${styles.overlay} ${isSidebarOpen ? styles.overlayActive : ''}`}
        onClick={closeSidebar}
      ></div>
    </>
  );
};

export default Navbar;