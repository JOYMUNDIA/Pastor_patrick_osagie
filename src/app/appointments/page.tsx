'use client';
import { useState, FormEvent } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import styles from './appointments.module.css';

const PURPOSES = [
  'Pastoral Counselling',
  'Prayer Session',
  'Ministry Consultation',
  'Youth Ministry Discussion',
  'Marriage Counselling',
  'General Meeting',
  'Other',
];

const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
  '4:00 PM', '4:30 PM',
];

type FormState = {
  name: string; email: string; phone: string;
  purpose: string; preferred_date: string;
  preferred_time: string; message: string;
};

export default function AppointmentsPage() {
  const [form, setForm] = useState<FormState>({
    name: '', email: '', phone: '', purpose: '',
    preferred_date: '', preferred_time: '', message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setErrorMsg(data.error || 'Failed to submit'); setStatus('error'); return; }
      setStatus('success');
      setForm({ name:'', email:'', phone:'', purpose:'', preferred_date:'', preferred_time:'', message:'' });
    } catch {
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  // Minimum date = tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Hero */}
        <div className={styles.hero}>
          <div className="container">
            <span className={styles.overline}>Book a Meeting</span>
            <h1>Schedule an Appointment</h1>
            <p>Request a personal meeting with Pastor Patrick D. Osagie. All appointments are subject to confirmation.</p>
          </div>
        </div>

        <div className={styles.body}>
          <div className="container">
            <div className={styles.layout}>
              {/* Info Panel */}
              <aside className={styles.info}>
                <div className={styles.infoCard}>
                  <h3>What to Expect</h3>
                  <ul className={styles.infoList}>
                    <li>
                      <span className={styles.infoIcon}>📋</span>
                      <div><strong>Submit your request</strong><p>Fill in the form with your preferred date and purpose.</p></div>
                    </li>
                    <li>
                      <span className={styles.infoIcon}>✅</span>
                      <div><strong>Await confirmation</strong><p>You&apos;ll receive a confirmation email once reviewed.</p></div>
                    </li>
                    <li>
                      <span className={styles.infoIcon}>🤝</span>
                      <div><strong>Meet with Pastor</strong><p>Attend your scheduled appointment in person or online.</p></div>
                    </li>
                  </ul>
                  <div className={styles.infoNote}>
                    <strong>Office Hours</strong>
                    <p>Monday – Friday: 9:00 AM – 5:00 PM</p>
                    <p>Saturdays by special arrangement</p>
                  </div>
                </div>
              </aside>

              {/* Form */}
              <div className={styles.formWrap}>
                {status === 'success' ? (
                  <div className={styles.successBox}>
                    <div className={styles.successIcon}>🎉</div>
                    <h2>Request Submitted!</h2>
                    <p>Thank you, your appointment request has been received. Pastor Patrick&apos;s office will review it and send a confirmation to your email.</p>
                    <button className="btn btn-primary" onClick={() => setStatus('idle')}>
                      Book Another Appointment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <h2>Your Details</h2>
                    {status === 'error' && <div className="alert alert-error" style={{ marginBottom:'1.25rem' }}>{errorMsg}</div>}
                    <div className={styles.row}>
                      <div className="form-group">
                        <label>Full Name *</label>
                        <input value={form.name} onChange={set('name')} placeholder="Your full name" required />
                      </div>
                      <div className="form-group">
                        <label>Email Address *</label>
                        <input type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" required />
                      </div>
                    </div>
                    <div className={styles.row}>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input type="tel" value={form.phone} onChange={set('phone')} placeholder="+234 800 000 0000" />
                      </div>
                      <div className="form-group">
                        <label>Purpose of Meeting *</label>
                        <select value={form.purpose} onChange={set('purpose')} required>
                          <option value="">Select a purpose</option>
                          {PURPOSES.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                      </div>
                    </div>
                    <h2 style={{ marginTop: '0.5rem' }}>Preferred Schedule</h2>
                    <div className={styles.row}>
                      <div className="form-group">
                        <label>Preferred Date *</label>
                        <input type="date" value={form.preferred_date} min={minDateStr} onChange={set('preferred_date')} required />
                      </div>
                      <div className="form-group">
                        <label>Preferred Time *</label>
                        <select value={form.preferred_time} onChange={set('preferred_time')} required>
                          <option value="">Select a time slot</option>
                          {TIME_SLOTS.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Additional Message</label>
                      <textarea value={form.message} onChange={set('message')} placeholder="Briefly describe the nature of your visit or any additional context..." rows={4} />
                    </div>
                    <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={status === 'loading'}>
                      {status === 'loading' ? 'Submitting…' : 'Request Appointment'}
                    </button>
                    <p className={styles.disclaimer}>Your information is kept private and used solely for scheduling purposes.</p>
                  </form>
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