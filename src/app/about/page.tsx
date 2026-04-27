import Image from "next/image";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <>
    <Navbar />
      {/* HERO */}
      <div className={styles.heroWrapper}>

        <div className={styles.banner}>

          <div className={styles.layerBg}></div>

          {/* background faded office photo */}
          <img className={styles.bgPhoto} src="images/Dr_Osagie.png" alt="" />

          {/* SVG: all geometric shapes */}
          <svg className={styles.shapesSvg} viewBox="0 0 960 430" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">

            <polygon points="540,0 960,0 960,430 290,430" fill="#0c3278" opacity="0.65" />

            <polygon points="680,0 960,0 960,430 540,430" fill="#08225a" opacity="0.55" />

            <polygon points="0,0 240,0 0,430" fill="#f5a800" />

            <polygon points="28,0 178,0 28,348" fill="#0c3278" />

            <line x1="195" y1="0" x2="690" y2="430" stroke="white" strokeWidth="1.3" opacity="0.28" />
            <line x1="228" y1="0" x2="722" y2="430" stroke="white" strokeWidth="0.7" opacity="0.16" />
            <line x1="545" y1="0" x2="960" y2="280" stroke="white" strokeWidth="1" opacity="0.18" />
            <line x1="290" y1="430" x2="755" y2="0" stroke="white" strokeWidth="0.8" opacity="0.14" />

            <polygon points="0,158 46,198 0,238" fill="#0c3278" />

            <polygon points="4,164 36,198 4,232" fill="none" stroke="white" strokeWidth="1.2" opacity="0.55" />

            <rect x="5" y="193" width="13" height="3" rx="1.5" fill="white" opacity="0.75" />
            <rect x="5" y="200" width="9" height="3" rx="1.5" fill="white" opacity="0.5" />

            <rect x="484" y="192" width="7" height="38" rx="3.5" fill="#f5a800" />
            <rect x="497" y="202" width="7" height="54" rx="3.5" fill="#f5a800" />
            <rect x="510" y="214" width="7" height="38" rx="3.5" fill="#f5a800" />

          </svg>

          <img className={styles.personImg} src="images/Dr_Osagie.png" alt="" />

          <svg className={styles.dotGrid} width="100" height="82" viewBox="0 0 100 82">

            <g fill="#f5a800" opacity="0.8" fontSize="9.5" fontFamily="'Montserrat',Arial" fontWeight="900">

              <text x="0" y="11">×</text><text x="14" y="11">×</text><text x="28" y="11">×</text>
              <text x="42" y="11">×</text><text x="56" y="11">×</text><text x="70" y="11">×</text>

              <text x="7" y="25">×</text><text x="21" y="25">×</text><text x="35" y="25">×</text>
              <text x="49" y="25">×</text><text x="63" y="25">×</text>

              <text x="14" y="39">×</text><text x="28" y="39">×</text><text x="42" y="39">×</text>
              <text x="56" y="39">×</text>

              <text x="21" y="53">×</text><text x="35" y="53">×</text><text x="49" y="53">×</text>

              <text x="35" y="67">×</text>

            </g>
          </svg>

          <div className={styles.rightContent}>

            <p className={styles.lineProfessionals}>
              Global <span className={styles.pro}>Leadership Authority</span>
            </p>
            <br />

            <span className={styles.lineGrowYour}>Dr. Patrick Davidson</span>
            <br />

            <span className={styles.lineBusiness}>Osagie</span>
            <br />

            <div style={{ marginBottom: "14px" }}>
              <span className={styles.ideaTag}>Cross-Cultural Leadership & Transformation</span>
            </div>

            <p className={styles.bodyText}>
              Continental Youth Pastor, Academic Leader, and Visionary shaping leadership,
              youth empowerment, and institutional excellence across Africa.
            </p>

            <a className={styles.ctaBtn} href="#">ENGAGE NOW</a>

          </div>

        </div>
      </div>

      {/* ABOUT */}
      <section className={styles.section} id="about">

        <h2>About</h2>

        <p>
          Dr. Patrick Davidson Osagie (DBA, DLM, PhD) is a cross-cultural leadership intelligence expert,
          educator, and transformational systems architect whose work spans leadership development, youth empowerment,
          and institutional transformation across Africa and global networks.
        </p>

        <p className={styles.humanLayer}>
          Beyond titles and institutional roles, his identity is shaped by family, faith, and a deep commitment to generational continuity. He is a husband and father, and much of his leadership philosophy is rooted in the lived responsibility of building stability, legacy, and values within the home as much as within institutions.
        </p>

        <img className={styles.maskedImg} src="images/pastor_and_wife.jpg" alt="" />

        <p>
          His leadership journey sits at the intersection of academia, ministry, and organizational strategy.
          As Vice Chancellor of Crystal International University and Continental Youth Pastor for RCCG Africa Continent 4,
          he provides strategic oversight to educational systems and youth development frameworks across multiple nations.
        </p>

        <div className={styles.pullQuote}>
          Leadership is not position — it is the ability to design systems that outlive the leader.
        </div>

        <p>
          Across his academic and ministerial engagements, Dr. Osagie has focused on building scalable leadership pipelines,
          strengthening institutional culture, and developing frameworks that translate human potential into societal impact.
        </p>

        <img className={styles.maskedImg} src="images/pastor_preaching.jpg" alt="" />

        <p>
          Beyond his institutional responsibilities, his influence extends into media, coaching, and leadership consulting,
          where he continues to shape conversations around governance, youth empowerment, and economic transformation.
        </p>

        <p>
          At the core of his philosophy is a simple conviction: that sustainable leadership begins with people,
          is refined through systems, and is validated by generational impact.
        </p>

      </section>

      {/* ROLES */}
      <section className={styles.section} id="visual-authority">
        <h2>Leadership in Motion</h2>

        <div className={styles.bentoGrid}>

          <div className={`${styles.bentoItem} ${styles.large}`}>
            <img src="images/placeholder.png" alt="" />
            <span>Global Leadership Engagements</span>
          </div>

          <div className={styles.bentoItem}>
            <img src="images/placeholder.png" alt="" />
            <span>Academic Leadership</span>
          </div>

          <div className={styles.bentoItem}>
            <img src="images/placeholder.png" alt="" />
            <span>Youth Transformation</span>
          </div>

          <div className={`${styles.bentoItem} ${styles.tall}`}>
            <img src="images/placeholder.png" alt="" />
            <span>Ministry Leadership</span>
          </div>

          <div className={`${styles.bentoItem} ${styles.wide}`}>
            <img src="images/placeholder.png" alt="" />
            <span>Mentorship & Coaching</span>
          </div>

        </div>
      </section>

      {/* EXPERIENCE */}
      <section className={styles.section} id="experience">
        <h2>Professional Experience</h2>

        <ul className={styles.timeline}>

          {/* VICE CHANCELLOR */}
          <li className={styles.timelineEvent}>
            <label className={styles.timelineEventIcon}></label>
            <div className={styles.timelineEventCopy}>
              <p className={styles.timelineEventThumbnail}>2025 – Present</p>
              <h3>Crystal International University</h3>
              <h4>Vice Chancellor | Institutional Architect & Academic Visionary</h4>

              <p><strong>University Transformation & Strategy</strong><br />
                Leads institutional design, academic governance, and long-term strategic direction of a fast-growing international university system.</p>

              <p><strong>Global Academic Positioning</strong><br />
                Builds accredited programs aligned with international standards, while shaping a leadership culture rooted in innovation, ethics, and global relevance.</p>
            </div>
          </li>

          {/* CONTINENTAL YOUTH PASTOR */}
          <li className={styles.timelineEvent}>
            <label className={styles.timelineEventIcon}></label>
            <div className={styles.timelineEventCopy}>
              <p className={styles.timelineEventThumbnail}>2025 – Present</p>
              <h3>RCCG Africa Continent 4</h3>
              <h4>Continental Youth Pastor | Africa-Wide Youth Systems Leader</h4>

              <p><strong>Pan-African Youth Oversight</strong><br />
                Provides strategic leadership for youth development across 12 African nations including Southern and Indian Ocean regions.</p>

              <p><strong>Leadership Pipeline Development</strong><br />
                Designs and drives continental frameworks for youth empowerment, leadership formation, and generational transition systems.</p>
            </div>
          </li>

          {/* SATCO */}
          <li className={styles.timelineEvent}>
            <label className={styles.timelineEventIcon}></label>
            <div className={styles.timelineEventCopy}>
              <p className={styles.timelineEventThumbnail}>2021 – 2025</p>
              <h3>RCCG Africa Continent 4</h3>
              <h4>Special Assistant to the Continental Overseer | Strategic Advisor</h4>

              <p><strong>Regional Coordination & Governance</strong><br />
                Supported continental leadership across Southern Africa in governance, youth systems development, and cross-border leadership execution.</p>

              <p><strong>Multi-Nation Leadership Scope</strong><br />
                Operated across Zambia, South Africa, Zimbabwe, Angola, Mozambique, Namibia, Botswana, Malawi, Eswatini, Lesotho, Madagascar, and Mauritius.</p>
            </div>
          </li>

          {/* LECTURER */}
          <li className={styles.timelineEvent}>
            <label className={styles.timelineEventIcon}></label>
            <div className={styles.timelineEventCopy}>
              <p className={styles.timelineEventThumbnail}>2016 – 2025</p>
              <h3>Redeemed International Leadership Academy</h3>
              <h4>Senior Lecturer | Cross-Cultural Leadership Intelligence</h4>

              <p><strong>Leadership Systems Education</strong><br />
                Trains leaders in cross-cultural intelligence, governance systems, organizational transformation, and leadership psychology.</p>

              <p><strong>Elite Leadership Formation</strong><br />
                Develops high-level leadership capacity for ministry, education, and institutional governance across Africa.</p>
            </div>
          </li>

          {/* PASTORAL LEADERSHIP */}
          <li className={styles.timelineEvent}>
            <label className={styles.timelineEventIcon}></label>
            <div className={styles.timelineEventCopy}>
              <p className={styles.timelineEventThumbnail}>2012 – Present</p>
              <h3>RCCG Power Assembly / Lighthouse</h3>
              <h4>Pastor in Charge of Province | Church Systems Leader</h4>

              <p><strong>Spiritual & Organizational Leadership</strong><br />
                Oversees provincial church structures, leadership development, and institutional church growth strategy.</p>

              <p><strong>Community Transformation</strong><br />
                Drives discipleship systems, leadership training, and large-scale community impact initiatives.</p>
            </div>
          </li>

          {/* EARLY CAREER */}
          <li className={styles.timelineEvent}>
            <label className={styles.timelineEventIcon}></label>
            <div className={styles.timelineEventCopy}>
              <p className={styles.timelineEventThumbnail}>1996 – 1998</p>
              <h3>A.G. Leventis (Nigeria) Plc</h3>
              <h4>Stock Control & Operations Analyst</h4>

              <p>Built foundational expertise in logistics, inventory systems, and operational control within a structured corporate environment.</p>
            </div>
          </li>

        </ul>
      </section>

    <Footer />
    </>
  );
}