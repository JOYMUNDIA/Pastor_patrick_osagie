import React from 'react';
import styles from './Musicsection.module.css';

const Musicsection: React.FC = () => {
  return (
    <section id="music" className={`${styles.section} fade-in`}>
      <div className="container">
        <h2>Music</h2>
        <div className={styles.bento}>
          {/* Grid Item 1 - Image */}
          <div className={`${styles.item} ${styles.tall} animate-grid`}>
            <img src="/images/on_knees.jpg" alt="Pastor Patrick Saxophone Performance 1" />
          </div>

          {/* Grid Item 2 - Image */}
          <div className={`${styles.item} animate-grid`}>
            <img src="/images/playing_Saxophone.jpg" alt="Pastor Patrick Saxophone Performance 2" />
          </div>

          {/* Grid Item 3 - Video */}
          <div className={`${styles.item} ${styles.video} animate-grid`}>
            <iframe
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="Saxophone Performance Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Grid Item 4 - Image */}
          <div className={`${styles.item} animate-grid`}>
            <img src="/images/playing_saxophone2.jpg" alt="Pastor Patrick Saxophone Performance 3" />
          </div>

          {/* Grid Item 5 - Image */}
          <div className={`${styles.item} animate-grid`}>
            <img src="/images/singing.jpg" alt="Pastor Patrick Saxophone Performance 4" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Musicsection;