import { supabaseAdmin } from '@/lib/supabase';
import styles from './dashboard.module.css';
import Link from 'next/link';

async function getStats() {
  const db = supabaseAdmin;
  const [appts, prayers, links] = await Promise.all([
    db.from('appointments').select('status', { count: 'exact' }),
    db.from('prayer_requests').select('id', { count: 'exact' }),
    db.from('ministry_links').select('category'),
  ]);
  const pending = appts.data?.filter(a => a.status === 'pending').length ?? 0;
  const confirmed = appts.data?.filter(a => a.status === 'confirmed').length ?? 0;
  return {
    totalAppts: appts.count ?? 0,
    pending,
    confirmed,
    prayers: prayers.count ?? 0,
    links: links.data?.length ?? 0,
  };
}

async function getRecentAppointments() {
  const db = supabaseAdmin;
  const { data } = await db
    .from('appointments')
    .select('id, name, purpose, preferred_date, preferred_time, status')
    .order('created_at', { ascending: false })
    .limit(5);
  return data ?? [];
}

export default async function AdminDashboard() {
  const [stats, recentAppts] = await Promise.all([getStats(), getRecentAppointments()]);

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1>Dashboard</h1>
        <p>Overview of ministry activity and pending actions.</p>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {[
          { label: 'Total Appointments', value: stats.totalAppts, icon: '📅', href: '/admin/appointments' },
          { label: 'Pending Appointments', value: stats.pending, icon: '⏳', href: '/admin/appointments', alert: stats.pending > 0 },
          { label: 'Prayer Requests', value: stats.prayers, icon: '🙏', href: '/admin/prayers' },
          { label: 'Ministry Links', value: stats.links, icon: '🔗', href: '/admin/links' },
        ].map(stat => (
          <Link key={stat.label} href={stat.href} className={`${styles.statCard} ${stat.alert ? styles.alert : ''}`}>
            <span className={styles.statIcon}>{stat.icon}</span>
            <div>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
            {stat.alert && <span className={styles.alertDot} />}
          </Link>
        ))}
      </div>

      {/* Recent Appointments */}
      <div className={styles.section}>
        <div className={styles.sectionHead}>
          <h2>Recent Appointments</h2>
          <Link href="/admin/appointments" className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.8rem' }}>View All</Link>
        </div>
        <div className={styles.table}>
          <div className={styles.tableHead}>
            <span>Name</span><span>Purpose</span><span>Date</span><span>Time</span><span>Status</span>
          </div>
          {recentAppts.length === 0 && <div className={styles.empty}>No appointments yet.</div>}
          {recentAppts.map(a => (
            <div key={a.id} className={styles.tableRow}>
              <span className={styles.name}>{a.name}</span>
              <span className={styles.purpose}>{a.purpose}</span>
              <span>{new Date(a.preferred_date).toLocaleDateString('en-GB', { day:'numeric', month:'short' })}</span>
              <span>{a.preferred_time}</span>
              <span>
                <span className={`badge ${a.status === 'confirmed' ? 'badge-green' : a.status === 'cancelled' ? 'badge-red' : 'badge-gold'}`}>
                  {a.status}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.section}>
        <h2>Quick Actions</h2>
        <div className={styles.actions}>
          <Link href="/admin/links" className={styles.action}>
            <span>🔗</span><span>Add Ministry Link</span>
          </Link>
          <Link href="/admin/appointments" className={styles.action}>
            <span>✅</span><span>Review Appointments</span>
          </Link>
          <Link href="/admin/prayers" className={styles.action}>
            <span>🙏</span><span>View Prayer Requests</span>
          </Link>
        </div>
      </div>
    </div>
  );
}