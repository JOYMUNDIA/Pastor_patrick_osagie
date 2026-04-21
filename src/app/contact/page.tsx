'use client';
import { useState, FormEvent } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import styles from './Contact.module.css';

type Tab = 'message' | 'prayer';

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<Tab>('message');

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className={styles.hero}>
          <div className="container">
            <span className={styles.overline}>Get in Touch</span>
            <h1>Contact Pastor Patrick</h1>
            <p>Reach out for prayer, enquiries, or to share your heart. We&apos;d love to hear from you.</p>
          </div>
        </div>

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
                      <a href="https://facebook.com/pdosagie" target="_blank" rel="noreferrer">facebook.com/pdosagie</a>
                    </div>
                  </div>
                  <div className={styles.contactItem}>
                    <span>📻</span>
                    <div>
                      <strong>Podcast</strong>
                      <a href="https://hotfm.com" target="_blank" rel="noreferrer">HOTFM Radio</a>
                    </div>
                  </div>
                  <div className={styles.divider} />
                  <div className={styles.appointmentCta}>
                    <h4>Need a Personal Meeting?</h4>
                    <p>Book a one-on-one appointment with Pastor Patrick for counselling or consultation.</p>
                    <Link href="/appointments" className="btn btn-primary" style={{ marginTop: '0.75rem', justifyContent: 'center', display: 'flex' }}>
                      Book Appointment
                    </Link>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className={styles.formArea}>
                <div className={styles.tabs}>
                  <button className={`${styles.tab} ${activeTab === 'message' ? styles.active : ''}`} onClick={() => setActiveTab('message')}>
                    ✉️ Send a Message
                  </button>
                  <button className={`${styles.tab} ${activeTab === 'prayer' ? styles.active : ''}`} onClick={() => setActiveTab('prayer')}>
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

function ContactForm() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [err, setErr] = useState('');
  const set = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault(); setStatus('loading'); setErr('');
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setErr(data.error); setStatus('error'); return; }
      setStatus('success');
    } catch { setErr('Something went wrong.'); setStatus('error'); }
  };

  if (status === 'success') return (
    <div className={styles.success}>
      <div className={styles.successIcon}>✉️</div>
      <h3>Message Sent!</h3>
      <p>Thank you for reaching out. We&apos;ll get back to you as soon as possible.</p>
      <button className="btn btn-outline" onClick={() => setStatus('idle')}>Send Another</button>
    </div>
  );

  return (
    <form onSubmit={submit} className={styles.form}>
      {status === 'error' && <div className="alert alert-error" style={{marginBottom:'1rem'}}>{err}</div>}
      <div className={styles.row}>
        <div className="form-group">
          <label>Full Name *</label>
          <input value={form.name} onChange={set('name')} placeholder="Your name" required />
        </div>
        <div className="form-group">
          <label>Email Address *</label>
          <input type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" required />
        </div>
      </div>
      <div className="form-group">
        <label>Subject *</label>
        <input value={form.subject} onChange={set('subject')} placeholder="What is your message about?" required />
      </div>
      <div className="form-group">
        <label>Message *</label>
        <textarea value={form.message} onChange={set('message')} rows={6} placeholder="Write your message here..." required />
      </div>
      <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'0.9rem'}} disabled={status==='loading'}>
        {status === 'loading' ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}

function PrayerForm() {
  const [form, setForm] = useState({ name:'', email:'', request:'', is_anonymous:false, is_private:false });
  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [err, setErr] = useState('');
  const set = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [f]: e.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value }));

  const submit = async (e: FormEvent) => {
    e.preventDefault(); setStatus('loading'); setErr('');
    try {
      const res = await fetch('/api/prayer-requests', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setErr(data.error); setStatus('error'); return; }
      setStatus('success');
    } catch { setErr('Something went wrong.'); setStatus('error'); }
  };

  if (status === 'success') return (
    <div className={styles.success}>
      <div className={styles.successIcon}>🙏</div>
      <h3>Prayer Request Received</h3>
      <p>Your request has been submitted. Pastor Patrick and the team will pray over it faithfully.</p>
      <p className={styles.verse}>&ldquo;The prayer of a righteous person is powerful and effective.&rdquo; — James 5:16</p>
      <button className="btn btn-outline" onClick={() => setStatus('idle')}>Submit Another</button>
    </div>
  );

  return (
    <form onSubmit={submit} className={styles.form}>
      <div className={styles.prayerNote}>
        <span>🙏</span>
        <p>Your prayer request will be received by Pastor Patrick and his team. You can choose to remain anonymous and/or mark it as private.</p>
      </div>
      {status === 'error' && <div className="alert alert-error" style={{marginBottom:'1rem'}}>{err}</div>}

      <div className={styles.checkboxRow}>
        <label className={styles.checkLabel}>
          <input type="checkbox" checked={form.is_anonymous} onChange={set('is_anonymous')} />
          Submit anonymously
        </label>
      </div>

      {!form.is_anonymous && (
        <div className={styles.row}>
          <div className="form-group">
            <label>Your Name</label>
            <input value={form.name} onChange={set('name')} placeholder="Your full name" />
          </div>
          <div className="form-group">
            <label>Email (optional)</label>
            <input type="email" value={form.email} onChange={set('email')} placeholder="For follow-up" />
          </div>
        </div>
      )}

      <div className="form-group">
        <label>Your Prayer Request *</label>
        <textarea value={form.request} onChange={set('request')} rows={6} placeholder="Share your prayer need here. Be as specific or as general as you&apos;re comfortable with..." required />
      </div>

      <div className={styles.checkboxRow}>
        <label className={styles.checkLabel}>
          <input type="checkbox" checked={form.is_private} onChange={set('is_private')} />
          Keep this request private (only Pastor Patrick will see it)
        </label>
      </div>

      <button type="submit" className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'0.9rem',marginTop:'0.5rem'}} disabled={status==='loading'}>
        {status === 'loading' ? 'Submitting…' : 'Submit Prayer Request'}
      </button>
    </form>
  );
}