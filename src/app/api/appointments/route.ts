import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { getAuthUser, hasRole } from '@/lib/auth';

// GET /api/appointments — admin/editor only
export async function GET() {
  const user = await getAuthUser();
  if (!user || !hasRole(user.role, 'editor')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const db = supabaseAdmin;
  const { data, error } = await db
    .from('appointments')
    .select('*')
    .order('preferred_date', { ascending: true });

  if (error) {
    console.error('❌ FULL SUPABASE ERROR (GET):', JSON.stringify(error, null, 2));
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ data });
}

// POST /api/appointments — public
export async function POST(req: NextRequest) {
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log('SERVICE KEY EXISTS:', !!process.env.SUPABASE_SERVICE_ROLE_KEY);
  console.log("KEY TYPE:", process.env.SUPABASE_SERVICE_ROLE_KEY?.startsWith("sb_"))

  const body = await req.json();
  const { name, email, phone, purpose, preferred_date, preferred_time, message } = body;

  if (!name || !email || !purpose || !preferred_date || !preferred_time) {
    return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
  }

  const db = supabaseAdmin;
  const { data, error } = await db
    .from('appointments')
    .insert({
      name,
      email,
      phone,
      purpose,
      preferred_date,
      preferred_time,
      message,
      status: 'pending'
    })
    .select()
    .single();

  if (error) {
    console.error('❌ FULL SUPABASE ERROR (POST):', JSON.stringify(error, null, 2));

    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ data }, { status: 201 });
}