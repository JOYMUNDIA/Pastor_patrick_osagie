import React from 'react';
import styles from './Ministrycards.module.css';

const Ministrycards: React.FC = () => {
  return (
    <section id="ministry" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ministry & Youth Work</h2>

        <div className={styles.grid}>

          {/* Youth Ministry */}
          <div className={styles.card}>
            <i className={`fas fa-users ${styles.icon}`}></i>
            <h3>Youth Ministry</h3>
            <p>
              As the <strong>Continental Youth Pastor</strong>, Pastor Patrick empowers young people across the continent through mentorship, conferences, and spiritual guidance.
            </p>
          </div>

          {/* Prayer Sessions */}
          <div className={styles.card}>
            <i className={`fas fa-praying-hands ${styles.icon}`}></i>
            <h3>Prayer Sessions</h3>
            <p>
              Join regular online prayer sessions on Pastor Patrick's Facebook page for spiritual renewal and community fellowship.
            </p>

            <a
              href="https://facebook.com/pdosagie"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btn}
            >
              Join Prayer
            </a>
          </div>

          {/* Podcast */}
          <div className={styles.card}>
            <i className={`fas fa-podcast ${styles.icon}`}></i>
            <h3>HOTFM Podcast</h3>
            <p>
              Tune in to inspiring talks, teachings, and interviews on Pastor Patrick’s weekly radio podcast on HOTFM.
            </p>

            <a
              href="https://hotfm.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.btn}
            >
              Listen Now
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Ministrycards;