'use client';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Devotional } from '@/types';
import styles from './devotional.module.css';

function DevotionalContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const todayStr = new Date().toISOString().split('T')[0];
  const selectedDate = searchParams.get('date') || todayStr;

  const [devotional, setDevotional] = useState<Devotional | null>(null);
  const [todayDevotional, setTodayDevotional] = useState<Devotional | null>(null);
  const [calendarDates, setCalendarDates] = useState<{ date: string; topic: string; id: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [calMonth, setCalMonth] = useState(selectedDate.substring(0, 7)); // YYYY-MM

  // Fetch today's devotional once
  useEffect(() => {
    fetch('/api/devotionals')
      .then(r => r.json())
      .then(d => setTodayDevotional(d.data));
  }, []);

  // Fetch calendar dates for current month
  useEffect(() => {
    fetch(`/api/devotionals?month=${calMonth}`)
      .then(r => r.json())
      .then(d => setCalendarDates(d.data || []));
  }, [calMonth]);

  // Fetch selected devotional
  const fetchDevotional = useCallback(async (date: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/devotionals?date=${date}`);
      const data = await res.json();
      setDevotional(data.data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDevotional(selectedDate);
  }, [selectedDate, fetchDevotional]);

  const selectDate = (date: string) => {
    router.push(`/devotional?date=${date}`, { scroll: false });
  };

  const isToday = selectedDate === todayStr;
  const displayDevotional = devotional;

  // Calendar helpers
  const [year, month] = calMonth.split('-').map(Number);
  const firstDay = new Date(year, month - 1, 1).getDay();
  const daysInMonth = new Date(year, month, 0).getDate();
  const dateSet = new Set(calendarDates.map(d => d.date));

  const prevMonth = () => {
    const d = new Date(year, month - 2, 1);
    setCalMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  };
  const nextMonth = () => {
    const d = new Date(year, month, 1);
    setCalMonth(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  };

  const monthName = new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Hero */}
        <div className={styles.hero}>
          <div className="container">
            <span className={styles.overline}>Daily Word</span>
            <h1>Open Heavens Devotional</h1>
            <p>A daily portion of God&apos;s Word to nourish your spirit and guide your steps.</p>
          </div>
        </div>

        <div className={styles.body}>
          <div className="container">
            <div className={styles.layout}>
              {/* Sidebar: Calendar */}
              <aside className={styles.sidebar}>
                {/* Today's quick card */}
                {todayDevotional && !isToday && (
                  <div className={styles.todayCard} onClick={() => selectDate(todayStr)}>
                    <span className={styles.todayBadge}>Today</span>
                    <h4>{todayDevotional.topic}</h4>
                    <p>{new Date(todayStr + 'T00:00:00').toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long' })}</p>
                    <span className={styles.readToday}>Read today&apos;s devotional →</span>
                  </div>
                )}

                {/* Calendar */}
                <div className={styles.calendar}>
                  <div className={styles.calHeader}>
                    <button onClick={prevMonth} className={styles.calNav}>‹</button>
                    <span>{monthName}</span>
                    <button onClick={nextMonth} className={styles.calNav}>›</button>
                  </div>
                  <div className={styles.calGrid}>
                    {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                      <div key={d} className={styles.calDayLabel}>{d}</div>
                    ))}
                    {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                      const dayNum = i + 1;
                      const dateStr = `${calMonth}-${String(dayNum).padStart(2, '0')}`;
                      const hasDevotional = dateSet.has(dateStr);
                      const isSelected = dateStr === selectedDate;
                      const isTodayDate = dateStr === todayStr;
                      return (
                        <button
                          key={dateStr}
                          className={`${styles.calDay}
                            ${hasDevotional ? styles.hasContent : ''}
                            ${isSelected ? styles.selected : ''}
                            ${isTodayDate ? styles.today : ''}
                            ${!hasDevotional ? styles.noContent : ''}`}
                          onClick={() => hasDevotional && selectDate(dateStr)}
                          disabled={!hasDevotional}
                          title={hasDevotional ? calendarDates.find(d => d.date === dateStr)?.topic : 'No devotional'}
                        >
                          {dayNum}
                          {hasDevotional && <span className={styles.dot} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <p className={styles.calHint}>Gold dates have devotionals available</p>
              </aside>

              {/* Main devotional content */}
              <div className={styles.devotionalArea}>
                {loading && (
                  <div className={styles.loadingBox}>
                    <div className="spinner" style={{ margin: '0 auto 1rem' }} />
                    <p>Loading devotional…</p>
                  </div>
                )}

                {!loading && !displayDevotional && (
                  <div className={styles.noDevotional}>
                    <span>📖</span>
                    <h3>No Devotional for this Date</h3>
                    <p>The devotional for {new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' })} has not been published yet.</p>
                    <p>Check back later or select another date from the calendar.</p>
                  </div>
                )}

                {!loading && displayDevotional && (
                  <DevotionalView devotional={displayDevotional} />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function DevotionalView({ devotional }: { devotional: Devotional }) {
  const dateObj = new Date(devotional.date + 'T00:00:00');
  const formattedDate = dateObj.toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).toUpperCase();

  return (
    <article className={styles.article}>
      {/* Header */}
      <div className={styles.articleHeader}>
        <div className={styles.dateTag}>{formattedDate}</div>
        <h2 className={styles.topic}>{devotional.topic}</h2>
        <div className={styles.authorLine}>By {devotional.author}</div>
      </div>

      {/* Memorise */}
      <div className={styles.memorise}>
        <div className={styles.memoriseLabel}>📌 Memorise</div>
        <blockquote className={styles.memoriseVerse}>
          {devotional.memorise_verse}
        </blockquote>
        <cite className={styles.memoriseRef}>— {devotional.memorise_reference}</cite>
      </div>

      {/* Bible Reading */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>📖 Bible Reading: {devotional.bible_reading}</h3>
        {devotional.bible_reading_text && (
          <div className={styles.bibleText}>
            {devotional.bible_reading_text.split('\n').map((line, i) => (
              <p key={i} className={styles.verseLine}>{line}</p>
            ))}
          </div>
        )}
      </div>

      {/* Message */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>✍️ Message</h3>
        <div className={styles.messageText}>
          {devotional.message.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </div>

      {/* Prayer Point */}
      <div className={styles.prayerPoint}>
        <div className={styles.prayerLabel}>🙏 Prayer Point</div>
        <p>{devotional.prayer_point}</p>
      </div>

      {/* Footer info */}
      <div className={styles.articleFooter}>
        {devotional.bible_in_one_year && (
          <div className={styles.footerItem}>
            <strong>Bible in One Year:</strong> {devotional.bible_in_one_year}
          </div>
        )}
        {devotional.hymn_title && (
          <details className={styles.hymnDetails}>
            <summary>🎵 {devotional.hymn_title}</summary>
            {devotional.hymn_lyrics && (
              <div className={styles.hymnLyrics}>
                {devotional.hymn_lyrics.split('\n\n').map((verse, i) => (
                  <p key={i}>{verse}</p>
                ))}
              </div>
            )}
          </details>
        )}
      </div>
    </article>
  );
}

export default function DevotionalPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" /></div>}>
      <DevotionalContent />
    </Suspense>
  );
}
