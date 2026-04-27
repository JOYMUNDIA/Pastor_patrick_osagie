'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { MinistryLink } from '@/types';
import styles from './ministry.module.css';
import HeroRotator from '@/components/hero/HeroRotator';
import BannerOne from '@/components/banners/BannerOne';
import BannerTwo from '@/components/banners/BannerTwo';

type Tab = 'prayer' | 'service' | 'podcast' | 'article';

const TABS: { id: Tab; label: string; icon: string; desc: string }[] = [
  { id: 'prayer', label: 'Lunch Hour Prayers', icon: '🙏', desc: 'Daily midday intercession sessions — Monday through Friday on Facebook Live.' },
  { id: 'service', label: 'Sunday Services', icon: '⛪', desc: 'Full Sunday services at RCCG Power Assembly Mega Church.' },
  { id: 'podcast', label: 'HOTFM Podcast', icon: '🎙', desc: 'Weekly faith discussions and teachings on HOTFM radio.' },
  { id: 'article', label: 'Faith Articles', icon: '📖', desc: 'In-depth articles on faith, family, leadership and spiritual growth.' },
];

function MinistryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tabParam = (searchParams.get('tab') as Tab) || 'prayer';
  const [activeTab, setActiveTab] = useState<Tab>(tabParam);
  const [links, setLinks] = useState<MinistryLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setActiveTab(tabParam);
  }, [tabParam]);

  useEffect(() => {
    const fetchLinks = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/links?category=${activeTab}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        setLinks(data.data || []);
      } catch {
        setError('Failed to load content. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, [activeTab]);

  const handleTab = (tab: Tab) => {
    setActiveTab(tab);
    router.push(`/ministry?tab=${tab}`, { scroll: false });
  };

  const currentTab = TABS.find(t => t.id === activeTab)!;

  const heroBanners = {
  prayer: [
    <BannerOne
      key="prayer1"
      imageSrc="/images/lunch_hour_prayer.jpeg"
      label="Lunch Hour Prayers"
      title="Midday Intercession"
      subtitle="Join daily prayer sessions for spiritual renewal and breakthrough."
    />,
    <BannerTwo
      key="prayer2"
      imageSrc="/images/lunch_hour_prayer.jpeg"
      label="Prayer Watch"
      title="Powerful Midday Prayers"
      subtitle="Monday to Friday on Facebook Live"
    />
  ],

  service: [
    <BannerOne
      key="service1"
      imageSrc="/images/church_service.jpg"
      label="Sunday Service"
      title="Worship Experience"
      subtitle="Encounter God every Sunday at RCCG Power Assembly Mega Church."
    />,
    <BannerTwo
      key="service2"
      imageSrc="/images/church_service.jpg"
      label="Church Service"
      title="Spirit Filled Worship"
      subtitle="Join us in person or online"
    />
  ],

  podcast: [
    <BannerOne
      key="podcast1"
      imageSrc="/images/podcast.jpg"
      label="HOTFM Podcast"
      title="Faith Conversations"
      subtitle="Weekly teachings and discussions"
    />,
    <BannerTwo
      key="podcast2"
      imageSrc="/images/podcast.jpg"
      label="Radio Ministry"
      title="HOTFM Broadcast"
      subtitle="Faith-based media outreach"
    />
  ],

  article: [
    <BannerOne
      key="article1"
      imageSrc="/images/articles.jpg"
      label="Faith Articles"
      title="Spiritual Growth"
      subtitle="Insights on faith, leadership, and life"
    />,
    <BannerTwo
      key="article2"
      imageSrc="/images/articles.jpg"
      label="Bible Insights"
      title="Deep Teaching"
      subtitle="In-depth biblical understanding"
    />
  ],
};

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Hero Banner */}
        <HeroRotator banners={heroBanners[activeTab]} />

        {/* Tab Navigation */}
        <div className={styles.tabBar}>
          <div className="container">
            <div className={styles.tabs}>
              {TABS.map(t => (
                <button
                  key={t.id}
                  className={`${styles.tab} ${activeTab === t.id ? styles.tabActive : ''}`}
                  onClick={() => handleTab(t.id)}
                >
                  <span className={styles.tabIcon}>{t.icon}</span>
                  <span className={styles.tabLabel}>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className={styles.content}>
          <div className="container">
            <div className={styles.sectionHeader}>
              <h2>{currentTab.icon} {currentTab.label}</h2>
              <p>{currentTab.desc}</p>
            </div>

            {loading && (
              <div className={styles.loadingGrid}>
                {[1,2,3,4,5,6].map(n => <div key={n} className={styles.skeleton} />)}
              </div>
            )}

            {error && <div className="alert alert-error">{error}</div>}

            {!loading && !error && links.length === 0 && (
              <div className={styles.empty}>
                <span className={styles.emptyIcon}>{currentTab.icon}</span>
                <h3>No content yet</h3>
                <p>Check back soon — new {currentTab.label.toLowerCase()} will be added here.</p>
              </div>
            )}

            {!loading && !error && links.length > 0 && (
              <div className={activeTab === 'article' ? styles.articleGrid : styles.linkGrid}>
                {links.map((link, i) => (
                  activeTab === 'article'
                    ? <ArticleCard key={link.id} link={link} index={i} />
                    : <LinkCard key={link.id} link={link} index={i} category={activeTab} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Facebook CTA */}
        <div className={styles.fbCta}>
          <div className="container">
            <div className={styles.fbCtaInner}>
              <div>
                <h3>Join Live on Facebook</h3>
                <p>Follow Pastor Patrick on Facebook for live prayer sessions and real-time updates.</p>
              </div>
              <a href="https://facebook.com/pdosagie" target="_blank" rel="noreferrer" className="btn btn-gold">
                Follow on Facebook →
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function LinkCard({ link, index, category }: { link: MinistryLink; index: number; category: Tab }) {
  const dayLabels: Record<string, string> = { Monday: '🟡', Tuesday: '🟠', Wednesday: '🟢', Thursday: '🔵', Friday: '🟣' };
  const dayMatch = link.title.match(/Monday|Tuesday|Wednesday|Thursday|Friday/);
  const dayColor = dayMatch ? dayLabels[dayMatch[0]] : '⚪';

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className={styles.linkCard}
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className={styles.linkCardTop}>
        <span className={styles.linkEmoji}>
          {category === 'prayer' ? dayColor : category === 'service' ? '⛪' : '🎙'}
        </span>
        {link.date && (
          <span className={styles.linkDate}>
            {new Date(link.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        )}
      </div>
      <h3 className={styles.linkTitle}>{link.title}</h3>
      {link.description && <p className={styles.linkDesc}>{link.description}</p>}
      <span className={styles.linkCta}>Watch on Facebook →</span>
    </a>
  );
}

function ArticleCard({ link, index }: { link: MinistryLink; index: number }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noreferrer"
      className={styles.articleCard}
      style={{ animationDelay: `${index * 0.08}s` }}
    >
      {link.thumbnail && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={link.thumbnail} alt={link.title} className={styles.articleImg} />
      )}
      {!link.thumbnail && <div className={styles.articlePlaceholder}>📖</div>}
      <div className={styles.articleBody}>
        {link.date && (
          <span className={styles.articleDate}>
            {new Date(link.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </span>
        )}
        <h3>{link.title}</h3>
        {link.description && <p>{link.description}</p>}
        <span className={styles.articleCta}>Read Article →</span>
      </div>
    </a>
  );
}

export default function MinistryPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="spinner" /></div>}>
      <MinistryContent />
    </Suspense>
  );
}