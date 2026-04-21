'use client';
import { useState, useEffect, useCallback } from 'react';
import { Appointment } from '@/types';
import styles from './appointments.module.css';

type FilterStatus = 'all' | 'pending' | 'confirmed' | 'cancelled';

export default function AdminAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchAppointments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/appointments');
      const data = await res.json();
      setAppointments(data.data || []);
    } catch { /* silent */ }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchAppointments(); }, [fetchAppointments]);

  const updateStatus = async (id: string, status: 'confirmed' | 'cancelled' | 'pending') => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
      }
    } finally { setActionLoading(null); }
  };

  const filtered = filter === 'all' ? appointments : appointments.filter(a => a.status === filter);
  const counts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1>Appointments</h1>
          <p>Manage and confirm appointment requests.</p>
        </div>
        <button className="btn btn-outline" onClick={fetchAppointments} style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>
          ↻ Refresh
        </button>
      </div>

      {/* Filter tabs */}
      <div className={styles.filters}>
        {(['all', 'pending', 'confirmed', 'cancelled'] as FilterStatus[]).map(f => (
          <button
            key={f}
            className={`${styles.filter} ${filter === f ? styles.filterActive : ''}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            <span className={styles.filterCount}>{counts[f]}</span>
          </button>
        ))}
      </div>

      {loading && <div style={{ padding: '3rem', textAlign: 'center' }}><div className="spinner" style={{ margin: 'auto' }} /></div>}

      {!loading && filtered.length === 0 && (
        <div className={styles.empty}>
          <span>📅</span>
          <h3>No appointments found</h3>
          <p>No {filter !== 'all' ? filter : ''} appointments at the moment.</p>
        </div>
      )}

      {!loading && filtered.length > 0 && (
        <div className={styles.cards}>
          {filtered.map(appt => (
            <div key={appt.id} className={`${styles.card} ${styles[appt.status]}`}>
              <div className={styles.cardTop}>
                <div className={styles.personInfo}>
                  <div className={styles.avatar}>{appt.name.charAt(0)}</div>
                  <div>
                    <strong className={styles.name}>{appt.name}</strong>
                    <span className={styles.email}>{appt.email}</span>
                  </div>
                </div>
                <span className={`badge ${appt.status === 'confirmed' ? 'badge-green' : appt.status === 'cancelled' ? 'badge-red' : 'badge-gold'}`}>
                  {appt.status}
                </span>
              </div>
              <div className={styles.details}>
                <div className={styles.detail}>
                  <span>🎯</span><span>{appt.purpose}</span>
                </div>
                <div className={styles.detail}>
                  <span>📅</span>
                  <span>{new Date(appt.preferred_date).toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}</span>
                </div>
                <div className={styles.detail}>
                  <span>🕐</span><span>{appt.preferred_time}</span>
                </div>
                {appt.phone && <div className={styles.detail}><span>📞</span><span>{appt.phone}</span></div>}
              </div>
              {appt.message && (
                <div className={styles.message}>
                  <p>&ldquo;{appt.message}&rdquo;</p>
                </div>
              )}
              <div className={styles.actions}>
                {appt.status !== 'confirmed' && (
                  <button
                    className={`btn btn-primary ${styles.actionBtn}`}
                    onClick={() => updateStatus(appt.id, 'confirmed')}
                    disabled={actionLoading === appt.id}
                  >
                    {actionLoading === appt.id ? '…' : '✓ Confirm'}
                  </button>
                )}
                {appt.status !== 'cancelled' && (
                  <button
                    className={`btn ${styles.cancelBtn}`}
                    onClick={() => updateStatus(appt.id, 'cancelled')}
                    disabled={actionLoading === appt.id}
                  >
                    ✗ Cancel
                  </button>
                )}
                {appt.status !== 'pending' && (
                  <button
                    className={`btn btn-outline ${styles.actionBtn}`}
                    onClick={() => updateStatus(appt.id, 'pending')}
                    disabled={actionLoading === appt.id}
                    style={{ fontSize: '0.8rem', padding: '0.4rem 0.875rem' }}
                  >
                    Reset to Pending
                  </button>
                )}
              </div>
              <span className={styles.submitted}>
                Submitted {new Date(appt.created_at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}