import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/devotionals/:id
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = supabaseAdmin;

  const { data, error } = await db
    .from('devotionals')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('❌ GET BY ID ERROR:', JSON.stringify(error, null, 2));
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  return NextResponse.json({ data });
}

// PATCH /api/devotionals/:id — now PUBLIC
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const db = supabaseAdmin;

  const { data, error } = await db
    .from('devotionals')
    .update(body)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('❌ PATCH ERROR:', JSON.stringify(error, null, 2));
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

// DELETE /api/devotionals/:id — now PUBLIC
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const db = supabaseAdmin;

  const { error } = await db
    .from('devotionals')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('❌ DELETE ERROR:', JSON.stringify(error, null, 2));
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

  return NextResponse.json({ success: true });
}