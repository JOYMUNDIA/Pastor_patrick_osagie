import { redirect } from 'next/navigation';
import { getAuthUser, hasRole } from '@/lib/auth';
import AdminShell from '@/components/admin/AdminShell';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthUser();
  if (!user || !hasRole(user.role, 'editor')) {
    redirect('/auth/login');
  }
  return (
    <AdminShell user={{ name: user.name, email: user.email, role: user.role }}>
      {children}
    </AdminShell>
  );
}