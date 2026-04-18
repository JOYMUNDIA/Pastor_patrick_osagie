import React from 'react';
import styles from './Aboutsection.module.css';

const Aboutsection: React.FC = () => {
  return (
    <section id="about" className={`${styles.about} fade-in`}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.textCol}>
            <h2 className={styles.heading}>Meet Pastor Patrick D. Osagie</h2><br/>
            <p>
              Pastor Patrick D. Osagie serves under the <strong>RCCG Power Assembly Mega Church</strong> and is deeply passionate about youth ministry as the <strong>Continental Youth Pastor</strong>. Beyond his pastoral duties, he is a talented saxophonist and musician, sharing his gift of worship with congregations and audiences alike.
            </p>
            <p>
              He is also a devoted family man, committed to faith, family, and community. Pastor Patrick regularly hosts prayer sessions on his Facebook page and leads inspirational discussions through his radio podcast on <strong>HOTFM</strong>.
            </p>
          </div>
          <div className={styles.imageCol}>
            <div className={styles.imageFrame}>
              <img
                className={styles.photo}
                src="/images/Pastor_Osagie_2.jpg"
                alt="Pastor Patrick D. Osagie"
              />
              <div className={styles.frameBorder}></div>
              <div className={styles.goldAccent}>
                {/* Add any accent text if needed */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Aboutsection;