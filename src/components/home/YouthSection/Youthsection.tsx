import React from 'react';
import styles from './Youthsection.module.css';

const Youthsection: React.FC = () => {
  return (
    <section id="youth" className={`${styles.section} fade-in`}>
      <div className="container">
        <h2>Youth Ministry & Leadership</h2>
        <p className="section-desc">
          As the Continental Youth Pastor, Pastor Patrick D. Osagie inspires, mentors, and empowers youth across Africa. He organizes impactful programs, conferences, and mentorship sessions to build a generation of faith-driven leaders.
        </p>
        <div className={styles.cards}>
          {/* Card 1 */}
          <div className={`${styles.card} animate-card`}>
            <div className={styles.imgWrap}>
              <img src="/images/youth-event1.jpg" alt="Youth Conference" />
            </div>
            <div className={styles.body}>
              <h3>Youth Conferences</h3>
              <p>Engaging conferences to equip youth with spiritual and leadership skills.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className={`${styles.card} animate-card`}>
            <div className={styles.imgWrap}>
              <img src="/images/youth-mentorship.jpg" alt="Mentorship Program" />
            </div>
            <div className={styles.body}>
              <h3>Mentorship Programs</h3>
              <p>One-on-one mentorship for guidance, career, and spiritual growth.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className={`${styles.card} animate-card`}>
            <div className={styles.imgWrap}>
              <img src="/images/youth-service.jpg" alt="Youth Service" />
            </div>
            <div className={styles.body}>
              <h3>Youth Services</h3>
              <p>Weekly youth gatherings to foster community and spiritual development.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Youthsection;