'use client';
import { useState, useEffect } from 'react';
import { PrayerRequest } from '@/types';
import styles from './prayers.module.css';

export default function AdminPrayersPage() {
  const [requests, setRequests] = useState<PrayerRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/prayer-requests')
      .then(r => r.json())
      .then(d => setRequests(d.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Prayer Requests</h1>
        <p>Review prayer requests submitted by the congregation.</p>
      </div>

      {loading && <div style={{ padding: '3rem', textAlign: 'center' }}><div className="spinner" style={{ margin: 'auto' }} /></div>}

      {!loading && requests.length === 0 && (
        <div className={styles.empty}><span>🙏</span><h3>No prayer requests yet</h3></div>
      )}

      {!loading && requests.length > 0 && (
        <div className={styles.list}>
          {requests.map(req => (
            <div key={req.id} className={`${styles.card} ${req.is_private ? styles.private : ''}`}>
              <div className={styles.cardTop}>
                <div className={styles.personInfo}>
                  <div className={styles.avatar}>{req.is_anonymous ? '🙏' : req.name.charAt(0)}</div>
                  <div>
                    <strong>{req.is_anonymous ? 'Anonymous' : req.name}</strong>
                    {!req.is_anonymous && req.email && <span className={styles.email}>{req.email}</span>}
                  </div>
                </div>
                <div className={styles.tags}>
                  {req.is_anonymous && <span className="badge badge-navy">Anonymous</span>}
                  {req.is_private && <span className="badge badge-gold">Private</span>}
                </div>
              </div>
              <p className={styles.requestText}>&ldquo;{req.request}&rdquo;</p>
              <span className={styles.date}>
                {new Date(req.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric', hour:'2-digit', minute:'2-digit' })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}