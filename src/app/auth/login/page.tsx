'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Login failed'); return; }
      const role = data.user?.role;
      if (role === 'admin' || role === 'editor') router.push('/admin');
      else router.push('/');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.left}>
        <div className={styles.brandBox}>
          <Link href="/" className={styles.logo}>Patrick D. Osagie</Link>
          <p className={styles.tagline}>Faith • Music • Leadership</p>
          <blockquote className={styles.quote}>
            &ldquo;For I know the plans I have for you, plans to prosper you and not to harm you.&rdquo;
            <cite>— Jeremiah 29:11</cite>
          </blockquote>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.formBox}>
          <Link href="/" className={styles.back}>← Back to site</Link>
          <h1>Welcome back</h1>
          <p className={styles.sub}>Sign in to your account</p>

          {error && <div className="alert alert-error" style={{ marginBottom: '1.25rem' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email" type="email" value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="pastor@church.org" required autoComplete="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password" type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" required autoComplete="current-password"
              />
            </div>
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <p className={styles.hint}>
            Contact the administrator to get access credentials.
          </p>
        </div>
      </div>
    </div>
  );
}