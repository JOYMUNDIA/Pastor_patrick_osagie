'use client';
import { useState, useEffect, useCallback, FormEvent } from 'react';
import { MinistryLink } from '@/types';
import styles from './links.module.css';

type Category = 'prayer' | 'service' | 'podcast' | 'article';
const CATEGORIES: { value: Category; label: string; icon: string }[] = [
  { value: 'prayer', label: 'Lunch Hour Prayer', icon: '🙏' },
  { value: 'service', label: 'Sunday Service', icon: '⛪' },
  { value: 'podcast', label: 'HOTFM Podcast', icon: '🎙' },
  { value: 'article', label: 'Faith Article', icon: '📖' },
];

const emptyForm = { category: '' as Category | '', title: '', description: '', url: '', date: '', thumbnail: '' };

export default function AdminLinksPage() {
  const [links, setLinks] = useState<MinistryLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [filterCat, setFilterCat] = useState<Category | 'all'>('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchLinks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/links');
      const data = await res.json();
      setLinks(data.data || []);
    } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchLinks(); }, [fetchLinks]);

  const set = (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [f]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true); setErrMsg(''); setSuccessMsg('');
    try {
      const res = await fetch('/api/links', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setErrMsg(data.error); return; }
      setSuccessMsg('Link added successfully!');
      setForm(emptyForm);
      fetchLinks();
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch { setErrMsg('Something went wrong.'); }
    finally { setSubmitting(false); }
  };

  const deleteLink = async (id: string) => {
    if (!confirm('Are you sure you want to delete this link?')) return;
    setDeleting(id);
    try {
      await fetch(`/api/links/${id}`, { method: 'DELETE' });
      setLinks(prev => prev.filter(l => l.id !== id));
    } finally { setDeleting(null); }
  };

  const togglePublish = async (link: MinistryLink) => {
    try {
      const res = await fetch(`/api/links/${link.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: !link.is_published }),
      });
      if (res.ok) {
        setLinks(prev => prev.map(l => l.id === link.id ? { ...l, is_published: !l.is_published } : l));
      }
    } catch { /* silent */ }
  };

  const filtered = filterCat === 'all' ? links : links.filter(l => l.category === filterCat);

  return (
    <div className={styles.page}>
      <h1>Ministry Links</h1>
      <p className={styles.sub}>Add and manage prayer sessions, services, podcasts and articles.</p>

      {/* Add Form */}
      <div className={styles.formCard}>
        <h2>Add New Link</h2>
        {successMsg && <div className="alert alert-success" style={{ marginBottom: '1rem' }}>{successMsg}</div>}
        {errMsg && <div className="alert alert-error" style={{ marginBottom: '1rem' }}>{errMsg}</div>}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className="form-group">
              <label>Category *</label>
              <select value={form.category} onChange={set('category')} required>
                <option value="">Select category</option>
                {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.icon} {c.label}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Date</label>
              <input type="date" value={form.date} onChange={set('date')} />
            </div>
          </div>
          <div className="form-group">
            <label>Title *</label>
            <input value={form.title} onChange={set('title')} placeholder="e.g. Monday Lunch Hour Prayer – 14 April 2025" required />
          </div>
          <div className="form-group">
            <label>URL (Facebook / YouTube / Article link) *</label>
            <input type="url" value={form.url} onChange={set('url')} placeholder="https://..." required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={form.description} onChange={set('description')} placeholder="Optional short description..." rows={2} />
          </div>
          <div className="form-group">
            <label>Thumbnail URL (for articles)</label>
            <input type="url" value={form.thumbnail} onChange={set('thumbnail')} placeholder="https://..." />
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Adding…' : '+ Add Link'}
          </button>
        </form>
      </div>

      {/* Links Table */}
      <div className={styles.tableSection}>
        <div className={styles.tableHeader}>
          <h2>All Links <span className={styles.count}>{links.length}</span></h2>
          <div className={styles.catFilters}>
            <button className={`${styles.catFilter} ${filterCat === 'all' ? styles.catActive : ''}`} onClick={() => setFilterCat('all')}>All</button>
            {CATEGORIES.map(c => (
              <button key={c.value} className={`${styles.catFilter} ${filterCat === c.value ? styles.catActive : ''}`} onClick={() => setFilterCat(c.value)}>
                {c.icon} {c.label}
              </button>
            ))}
          </div>
        </div>

        {loading && <div style={{ padding: '2rem', textAlign: 'center' }}><div className="spinner" style={{ margin: 'auto' }} /></div>}

        {!loading && filtered.length === 0 && (
          <div className={styles.empty}><p>No links found.</p></div>
        )}

        {!loading && filtered.map(link => (
          <div key={link.id} className={styles.linkRow}>
            <div className={styles.linkInfo}>
              <span className={styles.linkCat}>
                {CATEGORIES.find(c => c.value === link.category)?.icon || '🔗'}
              </span>
              <div>
                <a href={link.url} target="_blank" rel="noreferrer" className={styles.linkTitle}>{link.title}</a>
                {link.date && <span className={styles.linkDate}>{new Date(link.date).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</span>}
                {link.description && <p className={styles.linkDesc}>{link.description}</p>}
              </div>
            </div>
            <div className={styles.linkActions}>
              <button
                className={`${styles.publishBtn} ${link.is_published ? styles.published : styles.unpublished}`}
                onClick={() => togglePublish(link)}
              >
                {link.is_published ? '● Live' : '○ Hidden'}
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => deleteLink(link.id)}
                disabled={deleting === link.id}
              >
                {deleting === link.id ? '…' : '🗑'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}