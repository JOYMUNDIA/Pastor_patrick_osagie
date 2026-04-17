-- ============================================
-- SUPABASE DATABASE SCHEMA
-- Run this in your Supabase SQL Editor
-- ============================================

-- Users table (for custom auth with JWT)
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'editor', 'user')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ministry Links table
CREATE TABLE ministry_links (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category TEXT NOT NULL CHECK (category IN ('prayer', 'service', 'podcast', 'article')),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT NOT NULL,
  date DATE,
  thumbnail TEXT,
  is_published BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Appointments table
CREATE TABLE appointments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  purpose TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Prayer Requests table
CREATE TABLE prayer_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  is_anonymous BOOLEAN DEFAULT false,
  request TEXT NOT NULL,
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages table
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE ministry_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Policies: Service role can do everything (used by backend APIs)
-- Public can read published ministry links
CREATE POLICY "Public read published links" ON ministry_links
  FOR SELECT USING (is_published = true);

-- Insert sample admin user (password: Admin1234!)
-- In production, use the /api/auth/register endpoint or Supabase dashboard
-- Password hash for 'Admin1234!' using bcrypt rounds=12
-- INSERT INTO users (email, name, password_hash, role)
-- VALUES ('admin@pastorosagie.com', 'Admin', '$2a$12$HASH_HERE', 'admin');

-- Sample ministry links
INSERT INTO ministry_links (category, title, description, url, date, is_published) VALUES
('prayer', 'Monday Lunch Hour Prayer - April 7 2025', 'Join us for our Monday midday intercession session', 'https://www.facebook.com/pdosagie/videos/example1', '2025-04-07', true),
('prayer', 'Tuesday Lunch Hour Prayer - April 8 2025', 'Power-packed Tuesday prayer session', 'https://www.facebook.com/pdosagie/videos/example2', '2025-04-08', true),
('prayer', 'Wednesday Lunch Hour Prayer - April 9 2025', 'Midweek prayer and intercession', 'https://www.facebook.com/pdosagie/videos/example3', '2025-04-09', true),
('prayer', 'Thursday Lunch Hour Prayer - April 10 2025', 'Thursday breakthrough prayers', 'https://www.facebook.com/pdosagie/videos/example4', '2025-04-10', true),
('prayer', 'Friday Lunch Hour Prayer - April 11 2025', 'Week-closing prayer session', 'https://www.facebook.com/pdosagie/videos/example5', '2025-04-11', true),
('service', 'Sunday Service - April 13 2025', 'RCCG Power Assembly Sunday morning service', 'https://www.facebook.com/pdosagie/videos/example6', '2025-04-13', true),
('service', 'Sunday Service - April 6 2025', 'RCCG Power Assembly Sunday morning service', 'https://www.facebook.com/pdosagie/videos/example7', '2025-04-06', true),
('podcast', 'HOTFM Episode 45 - Walking in Faith', 'Weekly faith discussion on HOTFM radio', 'https://hotfm.com/episodes/45', '2025-04-10', true),
('podcast', 'HOTFM Episode 44 - Family and Ministry', 'Balancing family life with ministry calling', 'https://hotfm.com/episodes/44', '2025-04-03', true),
('article', 'The Power of Consistent Prayer', 'Discover how daily prayer transforms your spiritual life', 'https://rccg.org/articles/power-of-prayer', '2025-04-01', true),
('article', 'Youth Leadership in the Modern Church', 'Building the next generation of faith leaders', 'https://rccg.org/articles/youth-leadership', '2025-03-25', true);