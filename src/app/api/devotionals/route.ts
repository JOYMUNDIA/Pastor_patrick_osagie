import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Helper to get first and last day of a month
function getMonthRange(month: string) {
  const [year, monthNum] = month.split('-').map(Number);

  // Start date = first day of the month
  const start = new Date(year, monthNum - 1, 1);
  // End date = last day of the month
  const end = new Date(year, monthNum, 0);

  return {
    startStr: start.toISOString().split('T')[0],
    endStr: end.toISOString().split('T')[0],
  };
}

// GET /api/devotionals?date=YYYY-MM-DD  or  ?month=YYYY-MM  (&admin=true)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const date = searchParams.get('date');
  const month = searchParams.get('month');
  const isAdmin = searchParams.get('admin') === 'true';

  const db = supabaseAdmin;

  // 📅 Get all devotionals for a month (for calendar view)
  if (month) {
    const { startStr, endStr } = getMonthRange(month);

    let query = db
      .from('devotionals')
      .select('id, date, topic, is_published')
      .gte('date', startStr)
      .lte('date', endStr)
      .order('date', { ascending: true });

    // Only filter by published if NOT admin
    if (!isAdmin) {
      query = query.eq('is_published', true);
    }

    const { data, error } = await query;

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
    let query = db
      .from('devotionals')
      .select('*')
      .eq('date', date);

    if (!isAdmin) {
      query = query.eq('is_published', true);
    }

    const { data, error } = await query.maybeSingle();

    if (error) {
      console.warn('⚠️ No devotional found for date:', date);
      return NextResponse.json({ data: null });
    }

    return NextResponse.json({ data });
  }

  // 📌 Default: today's devotional
  const today = new Date().toISOString().split('T')[0];

  let query = db
    .from('devotionals')
    .select('*')
    .eq('date', today);

  if (!isAdmin) {
    query = query.eq('is_published', true);
  }

  const { data, error } = await query.maybeSingle();

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