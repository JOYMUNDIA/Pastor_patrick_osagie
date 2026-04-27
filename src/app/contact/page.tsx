'use client';

import { useState, FormEvent } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import styles from './Contact.module.css';

import HeroRotator from '@/components/hero/HeroRotator';
import BannerOne from '@/components/banners/BannerOne';
import BannerTwo from '@/components/banners/BannerTwo';

type Tab = 'message' | 'prayer';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<Tab>('message');

  return (
    <>
      <Navbar />
      <main className={styles.main}>

        {/* HERO (NOW USING HERO ROTATOR LIKE DEVOTIONAL PAGE) */}
        <HeroRotator
          banners={[
            activeTab === 'message' ? (
              <BannerOne
                key="contact-message-1"
                imageSrc="/images/telephone.jpg"
                label="Get in Touch"
                title="Contact Pastor Patrick"
                subtitle="Reach out for enquiries, counselling, or to share your heart."
              />
            ) : (
              <BannerOne
                key="contact-prayer-1"
                imageSrc="/images/telephone.jpg"
                label="Prayer Request"
                title="Bring Your Requests Before God"
                subtitle="We stand with you in prayer — nothing is too small or too big."
              />
            ),

            activeTab === 'message' ? (
              <BannerTwo
                key="contact-message-2"
                imageSrc="/images/telephone.jpg"
                label={"We are listening\nwith love and care"}
                title="Speak to us anytime"
                subtitle="Your message matters to God and to us."
              />
            ) : (
              <BannerTwo
                key="contact-prayer-2"
                imageSrc="/images/telephone.jpg"
                label={"We will stand in agreement\nwith you in prayer"}
                title="Matthew 18:19"
                subtitle="If two of you agree on earth… it shall be done."
              />
            ),
          ]}
          interval={12000}
        />

        {/* BODY */}
        <div className={styles.body}>
          <div className="container">
            <div className={styles.layout}>

              {/* Sidebar Info */}
              <aside className={styles.sidebar}>
                <div className={styles.contactInfo}>
                  <h3>Connect With Us</h3>

                  <div className={styles.contactItem}>
                    <span>⛪</span>
                    <div>
                      <strong>Church</strong>
                      <p>RCCG Power Assembly Mega Church</p>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <span>📘</span>
                    <div>
                      <strong>Facebook</strong>
                      <a href="https://facebook.com/pdosagie" target="_blank" rel="noreferrer">
                        facebook.com/pdosagie
                      </a>
                    </div>
                  </div>

                  <div className={styles.contactItem}>
                    <span>📻</span>
                    <div>
                      <strong>Podcast</strong>
                      <a href="https://hotfm.com" target="_blank" rel="noreferrer">
                        HOTFM Radio
                      </a>
                    </div>
                  </div>

                  <div className={styles.divider} />

                  <div className={styles.appointmentCta}>
                    <h4>Need a Personal Meeting?</h4>
                    <p>
                      Book a one-on-one appointment with Pastor Patrick for counselling or consultation.
                    </p>

                    <Link
                      href="/appointments"
                      className="btn btn-primary"
                      style={{
                        marginTop: '0.75rem',
                        justifyContent: 'center',
                        display: 'flex'
                      }}
                    >
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Main Form Area */}
              <div className={styles.formArea}>

                <div className={styles.tabs}>
                  <button
                    className={`${styles.tab} ${activeTab === 'message' ? styles.active : ''}`}
                    onClick={() => setActiveTab('message')}
                  >
                    ✉️ Send a Message
                  </button>

                  <button
                    className={`${styles.tab} ${activeTab === 'prayer' ? styles.active : ''}`}
                    onClick={() => setActiveTab('prayer')}
                  >
                    🙏 Prayer Request
                  </button>
                </div>

                {activeTab === 'message' ? <ContactForm /> : <PrayerForm />}

              </div>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

/* =========================
   CONTACT FORM
========================= */
function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [err, setErr] = useState('');

  const set = (f: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm(p => ({ ...p, [f]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErr('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setErr(data.error);
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErr('Something went wrong.');
      setStatus('error');
    }
  };

  if (status === 'success') return (
    <div className={styles.success}>
      <div className={styles.successIcon}>✉️</div>
      <h3>Message Sent!</h3>
      <p>Thank you for reaching out. We&apos;ll respond shortly.</p>
      <button className="btn btn-outline" onClick={() => setStatus('idle')}>
        Send Another
      </button>
    </div>
  );

  return (
    <form onSubmit={submit} className={styles.form}>
      {status === 'error' && (
        <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
          {err}
        </div>
      )}

      <div className={styles.row}>
        <div className="form-group">
          <label>Full Name *</label>
          <input value={form.name} onChange={set('name')} required />
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input type="email" value={form.email} onChange={set('email')} required />
        </div>
      </div>

      <div className="form-group">
        <label>Subject *</label>
        <input value={form.subject} onChange={set('subject')} required />
      </div>

      <div className="form-group">
        <label>Message *</label>
        <textarea value={form.message} onChange={set('message')} rows={6} required />
      </div>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', justifyContent: 'center', padding: '0.9rem' }}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

/* =========================
   PRAYER FORM
========================= */
function PrayerForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    request: '',
    is_anonymous: false,
    is_private: false
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [err, setErr] = useState('');

  const set = (f: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const value =
      e.target.type === 'checkbox'
        ? (e.target as HTMLInputElement).checked
        : e.target.value;

    setForm(p => ({ ...p, [f]: value }));
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErr('');

    try {
      const res = await fetch('/api/prayer-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        setErr(data.error);
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setErr('Something went wrong.');
      setStatus('error');
    }
  };

  if (status === 'success') return (
    <div className={styles.success}>
      <div className={styles.successIcon}>🙏</div>
      <h3>Prayer Request Received</h3>
      <p>Your request has been submitted and will be prayed over.</p>
      <button className="btn btn-outline" onClick={() => setStatus('idle')}>
        Submit Another
      </button>
    </div>
  );

  return (
    <form onSubmit={submit} className={styles.form}>

      <div className={styles.prayerNote}>
        <span>🙏</span>
        <p>
          Your request will be handled confidentially and prayed over by the ministry team.
        </p>
      </div>

      {status === 'error' && (
        <div className="alert alert-error" style={{ marginBottom: '1rem' }}>
          {err}
        </div>
      )}

      <label className={styles.checkLabel}>
        <input
          type="checkbox"
          checked={form.is_anonymous}
          onChange={set('is_anonymous')}
        />
        Submit anonymously
      </label>

      {!form.is_anonymous && (
        <div className={styles.row}>
          <div className="form-group">
            <label>Name</label>
            <input value={form.name} onChange={set('name')} />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input value={form.email} onChange={set('email')} />
          </div>
        </div>
      )}

      <div className="form-group">
        <label>Prayer Request *</label>
        <textarea
          value={form.request}
          onChange={set('request')}
          rows={6}
          required
        />
      </div>

      <label className={styles.checkLabel}>
        <input
          type="checkbox"
          checked={form.is_private}
          onChange={set('is_private')}
        />
        Keep private (Pastor only)
      </label>

      <button
        type="submit"
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '0.5rem' }}
        disabled={status === 'loading'}
      >
        {status === 'loading' ? 'Submitting…' : 'Submit Prayer Request'}
      </button>
    </form>
  );
}