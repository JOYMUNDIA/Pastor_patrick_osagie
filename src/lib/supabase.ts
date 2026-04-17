import { createClient, SupabaseClient } from '@supabase/supabase-js';
//import type { Database } from '@/types/supabase-types'; // Optional, if you define DB types
import type { Database } from '../types/supabase-types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client (for browser usage)
export const supabase: SupabaseClient<Database> = createClient<Database>(
  supabaseUrl,
  supabaseAnonKey
);

// Server-side Supabase client with service role (for admin operations)
let _supabaseAdmin: SupabaseClient<Database> | null = null;

export const supabaseAdmin = (): SupabaseClient<Database> => {
  if (!_supabaseAdmin) {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
    _supabaseAdmin = createClient<Database>(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
  }
  return _supabaseAdmin;
};