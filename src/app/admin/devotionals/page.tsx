'use client';
import { useState, useEffect, useCallback, FormEvent } from 'react';
import { Devotional } from '@/types';
import styles from './devotionals.module.css';

const EMPTY_FORM = {
  date: '', topic: '', memorise_verse: '', memorise_reference: '',
  bible_reading: '', bible_reading_text: '', message: '',
  prayer_point: '', author: 'Pastor E. A. Adeboye',
  bible_in_one_year: '', hymn_title: '', hymn_lyrics: '',
  is_published: true,
};

type FormType = typeof EMPTY_FORM & { is_published: boolean };

export default function AdminDevotionalsPage() {
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormType>(EMPTY_FORM);
  const [editing, setEditing] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [viewMonth, setViewMonth] = useState(() => new Date().toISOString().substring(0, 7));

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      // ✅ Add admin=true to include unpublished devotionals
      const res = await fetch(`/api/devotionals?month=${viewMonth}&admin=true`);
      const data = await res.json();

      // Fetch full records for the month
      if (data.data && data.data.length > 0) {
        const full = await Promise.all(
          data.data.map((d: { id: string }) =>
            fetch(`/api/devotionals/${d.id}`).then(r => r.json()).then(r => r.data)
          )
        );
        setDevotionals(full.filter(Boolean));
      } else {
        setDevotionals([]);
      }
    } finally {
      setLoading(false);
    }
  }, [viewMonth]);

  useEffect(() => { fetchList(); }, [fetchList]);

  const set = (f: keyof FormType) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const val = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setForm(p => ({ ...p, [f]: val }));
  };

  const startEdit = (dev: Devotional) => {
    setForm({
      date: dev.date, topic: dev.topic,
      memorise_verse: dev.memorise_verse || '',
      memorise_reference: dev.memorise_reference || '',
      bible_reading: dev.bible_reading || '',
      bible_reading_text: dev.bible_reading_text || '',
      message: dev.message, prayer_point: dev.prayer_point,
      author: dev.author || 'Pastor E. A. Adeboye',
      bible_in_one_year: dev.bible_in_one_year || '',
      hymn_title: dev.hymn_title || '',
      hymn_lyrics: dev.hymn_lyrics || '',
      is_published: dev.is_published,
    });
    setEditing(dev.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setMsg(null);
    try {
      const url = editing ? `/api/devotionals/${editing}` : '/api/devotionals';
      const method = editing ? 'PATCH' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setMsg({ type: 'error', text: data.error }); return; }
      setMsg({ type: 'success', text: editing ? 'Devotional updated!' : 'Devotional added!' });
      setForm(EMPTY_FORM); setEditing(null); setShowForm(false);
      fetchList();
    } catch { setMsg({ type: 'error', text: 'Something went wrong.' }); }
    finally { setSubmitting(false); }
  };

  const deleteDevotional = async (id: string) => {
    if (!confirm('Delete this devotional?')) return;
    await fetch(`/api/devotionals/${id}`, { method: 'DELETE' });
    setDevotionals(prev => prev.filter(d => d.id !== id));
  };

  const togglePublish = async (dev: Devotional) => {
    const res = await fetch(`/api/devotionals/${dev.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_published: !dev.is_published }),
    });
    if (res.ok) {
      setDevotionals(prev => prev.map(d => d.id === dev.id ? { ...d, is_published: !d.is_published } : d));
    }
  };

  const [calY, calM] = viewMonth.split('-').map(Number);
  const prevMonth = () => { const d = new Date(calY, calM - 2, 1); setViewMonth(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`); };
  const nextMonth = () => { const d = new Date(calY, calM, 1); setViewMonth(`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`); };
  const monthLabel = new Date(calY, calM - 1).toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1>Daily Devotionals</h1>
          <p>Manage Open Heavens daily devotional content.</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setShowForm(s => !s); setEditing(null); setForm(EMPTY_FORM); }}>
          {showForm ? '✕ Close Form' : '+ Add Devotional'}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className={styles.formCard}>
          <h2>{editing ? '✏️ Edit Devotional' : '+ New Devotional'}</h2>
          {msg && <div className={`alert alert-${msg.type}`} style={{ marginBottom: '1.25rem' }}>{msg.text}</div>}
          <form onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className={styles.row3}>
              <div className="form-group">
                <label>Date *</label>
                <input type="date" value={form.date} onChange={set('date')} required />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label>Topic / Title *</label>
                <input value={form.topic} onChange={set('topic')} placeholder="e.g. Reversing Shame" required />
              </div>
            </div>

            {/* Memorise */}
            <div className={styles.row2}>
              <div className="form-group">
                <label>Memorise Verse *</label>
                <textarea value={form.memorise_verse} onChange={set('memorise_verse')} rows={3} placeholder="The verse text..." required />
              </div>
              <div className="form-group">
                <label>Reference</label>
                <input value={form.memorise_reference} onChange={set('memorise_reference')} placeholder="e.g. Zephaniah 3:19" />
              </div>
            </div>

            {/* Bible Reading */}
            <div className={styles.row2}>
              <div className="form-group">
                <label>Bible Reading Reference</label>
                <input value={form.bible_reading} onChange={set('bible_reading')} placeholder="e.g. John 2:1-11 (KJV)" />
              </div>
              <div className="form-group">
                <label>Author</label>
                <input value={form.author} onChange={set('author')} />
              </div>
            </div>

            <div className="form-group">
              <label>Bible Reading Text (optional – paste full verses)</label>
              <textarea value={form.bible_reading_text} onChange={set('bible_reading_text')} rows={6} placeholder="1 And the third day there was a marriage...&#10;2 And both Jesus was called..." />
            </div>

            <div className="form-group">
              <label>Message *</label>
              <textarea value={form.message} onChange={set('message')} rows={10} placeholder="The full devotional message text...&#10;&#10;Use double line breaks between paragraphs." required />
            </div>

            <div className="form-group">
              <label>Prayer Point *</label>
              <textarea value={form.prayer_point} onChange={set('prayer_point')} rows={2} placeholder="Father, please..." required />
            </div>

            <div className={styles.row2}>
              <div className="form-group">
                <label>Bible in One Year</label>
                <input value={form.bible_in_one_year} onChange={set('bible_in_one_year')} placeholder="e.g. 2 Kings 11-13" />
              </div>
              <div className="form-group">
                <label>Hymn Title</label>
                <input value={form.hymn_title} onChange={set('hymn_title')} placeholder="e.g. What a Friend We Have in Jesus" />
              </div>
            </div>

            <div className="form-group">
              <label>Hymn Lyrics</label>
              <textarea value={form.hymn_lyrics} onChange={set('hymn_lyrics')} rows={6} placeholder="1. What a friend we have in Jesus...&#10;&#10;2. Have we trials and temptations..." />
            </div>

            <div className={styles.formFooter}>
              <label className={styles.publishToggle}>
                <input type="checkbox" checked={form.is_published} onChange={set('is_published')} />
                Publish immediately
              </label>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => { setShowForm(false); setEditing(null); setForm(EMPTY_FORM); }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Saving…' : editing ? 'Update Devotional' : 'Add Devotional'}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Month Navigator + List */}
      <div className={styles.listSection}>
        <div className={styles.listHeader}>
          <div className={styles.monthNav}>
            <button onClick={prevMonth} className={styles.navBtn}>‹</button>
            <span className={styles.monthLabel}>{monthLabel}</span>
            <button onClick={nextMonth} className={styles.navBtn}>›</button>
          </div>
          <span className={styles.countBadge}>{devotionals.length} devotionals</span>
        </div>

        {loading && <div style={{ padding: '2rem', textAlign: 'center' }}><div className="spinner" style={{ margin: 'auto' }} /></div>}

        {!loading && devotionals.length === 0 && (
          <div className={styles.empty}>
            <span>📖</span>
            <h3>No devotionals for {monthLabel}</h3>
            <p>Click &quot;Add Devotional&quot; to create one.</p>
          </div>
        )}

        {!loading && devotionals.map(dev => (
          <div key={dev.id} className={styles.devRow}>
            <div className={styles.devDate}>
              <span className={styles.devDay}>{new Date(dev.date + 'T00:00:00').getDate()}</span>
              <span className={styles.devMon}>{new Date(dev.date + 'T00:00:00').toLocaleString('default', { month: 'short' })}</span>
            </div>
            <div className={styles.devInfo}>
              <strong className={styles.devTopic}>{dev.topic}</strong>
              <span className={styles.devRef}>{dev.memorise_reference || dev.bible_reading}</span>
            </div>
            <div className={styles.devActions}>
              <button
                className={`${styles.pubBtn} ${dev.is_published ? styles.live : styles.hidden}`}
                onClick={() => togglePublish(dev)}
              >
                {dev.is_published ? '● Live' : 'Publish'}
              </button>
              <button className={styles.editBtn} onClick={() => startEdit(dev)}>✏️ Edit</button>
              <button className={styles.delBtn} onClick={() => deleteDevotional(dev.id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
