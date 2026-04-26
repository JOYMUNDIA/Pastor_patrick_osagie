import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import styles from './DevotionalTeaser.module.css';

async function getTodayDevotional() {
  const today = new Date().toISOString().split('T')[0];
  const db = supabaseAdmin;
  const { data } = await db
    .from('devotionals')
    .select('date, topic, memorise_verse, memorise_reference, prayer_point, author')
    .eq('date', today)
    .eq('is_published', true)
    .single();
  return data;
}

export default async function DevotionalTeaser() {
  const dev = await getTodayDevotional();
  const today = new Date();
  const dateLabel = today.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.leftCol}>
            <span className={styles.overline}>Daily Devotional</span>
            <h2 className={styles.heading}>Open Heavens</h2>
            <p className={styles.sub}>A daily portion of God&apos;s Word to nourish your spirit. Read each morning and walk in faith.</p>
            <Link href="/devotional" className="btn btn-primary" style={{ marginTop: '1.5rem', display: 'inline-flex' }}>
              Read All Devotionals
            </Link>
          </div>

          <div className={styles.rightCol}>
            {dev ? (
              <Link href="/devotional" className={styles.devCard}>
                <div className={styles.devDate}>{dateLabel}</div>
                <h3 className={styles.devTopic}>{dev.topic}</h3>
                {dev.memorise_verse && (
                  <blockquote className={styles.devVerse}>
                    &ldquo;{dev.memorise_verse.length > 180 ? dev.memorise_verse.substring(0, 180) + '…' : dev.memorise_verse}&rdquo;
                    <cite>— {dev.memorise_reference}</cite>
                  </blockquote>
                )}
                {dev.prayer_point && (
                  <div className={styles.devPrayer}>
                    <span>🙏</span>
                    <p>{dev.prayer_point.length > 120 ? dev.prayer_point.substring(0, 120) + '…' : dev.prayer_point}</p>
                  </div>
                )}
                <span className={styles.readMore}>Read full devotional →</span>
              </Link>
            ) : (
              <div className={styles.noDevCard}>
                <span>📖</span>
                <h3>Today&apos;s Devotional</h3>
                <p>Coming soon — check back later for today&apos;s Open Heavens devotional.</p>
                <Link href="/devotional" className="btn btn-outline" style={{ marginTop: '1rem' }}>
                  Browse Archive
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
