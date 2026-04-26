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

-- Devotionals table
CREATE TABLE IF NOT EXISTS devotionals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  topic TEXT NOT NULL,
  memorise_verse TEXT,
  memorise_reference TEXT,
  bible_reading TEXT,
  bible_reading_text TEXT,
  message TEXT NOT NULL,
  prayer_point TEXT NOT NULL,
  author TEXT DEFAULT 'Pastor E. A. Adeboye',
  bible_in_one_year TEXT,
  hymn_title TEXT,
  hymn_lyrics TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE devotionals ENABLE ROW LEVEL SECURITY;

-- Public can read published devotionals
CREATE POLICY "Public read published devotionals" ON devotionals
  FOR SELECT USING (is_published = TRUE);

-- Insert today's sample devotional
INSERT INTO devotionals (
  date, topic, memorise_verse, memorise_reference,
  bible_reading, bible_reading_text,
  message, prayer_point, author, bible_in_one_year,
  hymn_title, hymn_lyrics, is_published
) VALUES (
  CURRENT_DATE,
  'Reversing Shame',
  'Behold, at that time I will undo all that afflict thee: and I will save her that halteth, and gather her that was driven out; and I will get them praise and fame in every land where they have been put to shame.',
  'Zephaniah 3:19',
  'John 2:1-11 (KJV)',
  '1 And the third day there was a marriage in Cana of Galilee; and the mother of Jesus was there:
2 And both Jesus was called, and his disciples, to the marriage.
3 And when they wanted wine, the mother of Jesus saith unto him, They have no wine.
4 Jesus saith unto her, Woman, what have I to do with thee? mine hour is not yet come.
5 His mother saith unto the servants, Whatsoever he saith unto you, do it.
6 And there were set there six waterpots of stone, after the manner of the purifying of the Jews, containing two or three firkins apiece.
7 Jesus saith unto them, Fill the waterpots with water. And they filled them up to the brim.
8 And he saith unto them, Draw out now, and bear unto the governor of the feast. And they bare it.
9 When the ruler of the feast had tasted the water that was made wine, and knew not whence it was: (but the servants which drew the water knew;) the governor of the feast called the bridegroom,
10 And saith unto him, Every man at the beginning doth set forth good wine; and when men have well drunk, then that which is worse: but thou hast kept the good wine until now.
11 This beginning of miracles did Jesus in Cana of Galilee, and manifested forth his glory; and his disciples believed on him.',
  'Sometime ago, a woman came to the church, saying, "Please, help me, I don''t know what to do. My husband keeps wandering aimlessly at night without being in full control of his senses." We led her to Christ and prayed with her. Shortly after, she was promoted at her workplace and got a new car. As she couldn''t drive, she begged her husband to drive her to church so that her pastor could bless the car. He agreed and told her that he would only drive to the church premises, but he wouldn''t enter the building. He did so and sat in the car while his wife entered the church building. As he sat in the car, he could hear the sermon being preached. After some time, an altar call was made, and he went inside the church to give his life to Christ. Some weeks later, the devil attacked him while he was driving to work. He lost his senses immediately and began to drive around aimlessly until the Holy Spirit took control and instructed him to drive to the church. When he got to the church and stepped out of the car, people could tell immediately that something was wrong with him. They sprang into action and helped him into the church. We prayed for him, and God took control of the situation. God knew beforehand that trouble was coming for the man, and if he hadn''t become born again, he would have gone mad. Therefore, He arranged for a place where he could turn to in the day of trouble. I pray that every plan of shame the enemy has arranged for you will be cancelled today, in Jesus'' name.

In today''s Bible reading, a couple was getting married, and Jesus was invited to the feast. Everything was going well until they ran out of wine. They had not even started their lives together, but they were already experiencing a crisis and were on the verge of being put to shame. Thankfully, Jesus turned what would have resulted in shame into honour, as they later had more than enough good wine to serve their guests.

Beloved, Romans 10:11 says that whosoever believes in God will not be ashamed. If you are currently in a shameful situation, put your trust in God and cry out to Him. He will heed your cry and turn your shame into a testimony, in Jesus'' name.',
  'Father, please never let me experience shame in any area of my life, in Jesus'' name.',
  'Pastor E. A. Adeboye',
  '2 Kings 11-13',
  'HYMN 27 - WHAT A FRIEND WE HAVE IN JESUS',
  '1. What a friend we have in Jesus,
All our sins and griefs to bear;
what a privilege to carry
Ev''rything to God in prayer.
Oh, what peace we often forfeit,
Oh, what needless pain we bear—
All because we do not carry
Ev''rything to God in prayer.

2. Have we trials and temptations?
Is there trouble anywhere?
We should never be discouraged,
Take it to the Lord in prayer.
Can we find a Friend so faithful
Who will all our sorrows share?
Jesus knows our ev''ry weakness,
Take it to the Lord in prayer.

3. Are we weak and heavy laden,
Cumbered with a load of care?
Precious Saviour, still our refuge,
Take it to the Lord in prayer.
Do thy friends despise, forsake thee?
Take it to the Lord in prayer.
In His arms He''ll take and shield thee,
Thou wilt find a solace there.',
  TRUE
) ON CONFLICT (date) DO NOTHING;