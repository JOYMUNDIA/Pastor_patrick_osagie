'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './AdminShell.module.css';

interface Props {
  children: React.ReactNode;
  user: { name: string; email: string; role: string };
}

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: '📊', exact: true },
  { href: '/admin/appointments', label: 'Appointments', icon: '📅' },
  { href: '/admin/links', label: 'Ministry Links', icon: '🔗' },
  { href: '/admin/prayers', label: 'Prayer Requests', icon: '🙏' },
];

export default function AdminShell({ children, user }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/auth/login');
  };

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className={styles.shell}>
      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
        <div className={styles.sidebarTop}>
          <Link href="/" className={styles.logo}>{collapsed ? 'PO' : 'Patrick D. Osagie'}</Link>
          <button className={styles.collapseBtn} onClick={() => setCollapsed(c => !c)} aria-label="Toggle sidebar">
            {collapsed ? '→' : '←'}
          </button>
        </div>
        <div className={styles.badge}>{collapsed ? user.role[0].toUpperCase() : user.role.charAt(0).toUpperCase() + user.role.slice(1)}</div>
        <nav className={styles.nav}>
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.navItem} ${isActive(item.href, item.exact) ? styles.navActive : ''}`}
              title={collapsed ? item.label : undefined}
            >
              <span className={styles.navIcon}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.userInfo}>
            <div className={styles.avatar}>{user.name.charAt(0)}</div>
            {!collapsed && (
              <div className={styles.userText}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userEmail}>{user.email}</span>
              </div>
            )}
          </div>
          <button className={styles.logoutBtn} onClick={logout} title="Sign out">
            {collapsed ? '↩' : '↩ Sign out'}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.topBar}>
          <div className={styles.breadcrumb}>
            {navItems.find(n => isActive(n.href, n.exact))?.label || 'Admin'}
          </div>
          <Link href="/" className={styles.viewSite} target="_blank">View Site ↗</Link>
        </div>
        <div className={styles.content}>{children}</div>
      </main>
    </div>
  );
}