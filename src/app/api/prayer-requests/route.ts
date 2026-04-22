import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthUser, hasRole } from '@/lib/auth';

export async function GET() {
  const user = await getAuthUser();
  if (!user || !hasRole(user.role, 'admin')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }
  const db = supabaseAdmin;
  const { data, error } = await db
    .from('prayer_requests')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, is_anonymous, request, is_private } = body;
  if (!request) {
    return NextResponse.json({ error: 'Prayer request text required' }, { status: 400 });
  }
  const db = supabaseAdmin;
  const { data, error } = await db
    .from('prayer_requests')
    .insert({
      name: is_anonymous ? 'Anonymous' : name,
      email: email || '',
      is_anonymous: !!is_anonymous,
      request,
      is_private: !!is_private,
    })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}