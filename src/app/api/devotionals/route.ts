import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// GET /api/devotionals?date=YYYY-MM-DD  or  ?month=YYYY-MM
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get('date');
  const month = searchParams.get('month');

  const db = supabaseAdmin;

  // 📅 Get all devotionals for a month (for calendar view)
  if (month) {
    const start = `${month}-01`;
    const end = `${month}-31`;

    const { data, error } = await db
      .from('devotionals')
      .select('date, topic, id')
      .eq('is_published', true)
      .gte('date', start)
      .lte('date', end)
      .order('date');

    if (error) {
      console.error('❌ GET MONTH ERROR:', JSON.stringify(error, null, 2));
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  }

  // 📖 Get devotional by specific date
  if (date) {
    const { data, error } = await db
      .from('devotionals')
      .select('*')
      .eq('date', date)
      .eq('is_published', true)
      .single();

    if (error) {
      console.warn('⚠️ No devotional found for date:', date);
      return NextResponse.json({ data: null });
    }

    return NextResponse.json({ data });
  }

  // 📌 Default: today's devotional
  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await db
    .from('devotionals')
    .select('*')
    .eq('date', today)
    .eq('is_published', true)
    .single();

  if (error) {
    console.warn('⚠️ No devotional found for today:', today);
    return NextResponse.json({ data: null });
  }

  return NextResponse.json({ data });
}

// POST /api/devotionals — now PUBLIC (no permissions)
export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    date,
    topic,
    memorise_verse,
    memorise_reference,
    bible_reading,
    bible_reading_text,
    message,
    prayer_point,
    author,
    bible_in_one_year,
    hymn_title,
    hymn_lyrics,
    is_published
  } = body;

  // ✅ Basic validation
  if (!date || !topic || !message || !prayer_point) {
    return NextResponse.json(
      { error: 'date, topic, message and prayer_point are required' },
      { status: 400 }
    );
  }

  const db = supabaseAdmin;

  const { data, error } = await db
    .from('devotionals')
    .upsert(
      {
        date,
        topic,
        memorise_verse,
        memorise_reference,
        bible_reading,
        bible_reading_text,
        message,
        prayer_point,
        author: author || 'Pastor E. A. Adeboye',
        bible_in_one_year,
        hymn_title,
        hymn_lyrics,
        is_published: is_published ?? true,
        // 🚫 removed created_by since no auth
      },
      { onConflict: 'date' }
    )
    .select()
    .single();

  if (error) {
    console.error('❌ POST ERROR:', JSON.stringify(error, null, 2));

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