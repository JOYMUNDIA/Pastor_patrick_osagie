import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthUser, hasRole } from '@/lib/auth';

// GET /api/links?category=prayer
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');

  const db = supabaseAdmin();
  let query = db
    .from('ministry_links')
    .select('*')
    .eq('is_published', true)
    .order('date', { ascending: false });

  if (category) query = query.eq('category', category);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data });
}

// POST /api/links — editor or admin only
export async function POST(req: NextRequest) {
  const user = await getAuthUser();
  if (!user || !hasRole(user.role, 'editor')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const body = await req.json();
  const { category, title, description, url, date, thumbnail } = body;

  if (!category || !title || !url) {
    return NextResponse.json({ error: 'category, title and url are required' }, { status: 400 });
  }

  const db = supabaseAdmin();
  const { data, error } = await db
    .from('ministry_links')
    .insert({ category, title, description, url, date, thumbnail, created_by: user.sub, is_published: true })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ data }, { status: 201 });
}