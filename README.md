# Pastor Patrick D. Osagie — Ministry Website

A full-stack **Next.js 14** web application for Pastor Patrick D. Osagie featuring a dynamic landing page, ministry hub, appointment booking, contact/prayer system, and role-based admin dashboard.

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Vanilla CSS Modules |
| Database | Supabase (PostgreSQL) |
| Auth | Custom JWT via `jose` + HTTP-only cookies |
| Password Hashing | `bcryptjs` |

---

## 🚀 Getting Started

### 1. Clone & Install

```bash
cd pastor-osagie
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. This creates all tables, RLS policies, and sample data

### 3. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_super_secret_32_char_minimum_string
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> Generate a strong JWT secret: `openssl rand -base64 32`

### 4. Create Your First Admin User

Run this SQL in the Supabase SQL Editor (replace the password hash):

```sql
-- First generate a bcrypt hash of your desired password at: https://bcrypt-generator.com (rounds=12)
INSERT INTO users (email, name, password_hash, role)
VALUES ('admin@example.com', 'Admin', '$2a$12YOUR_HASH_HERE', 'admin');
```

Or use the Supabase API/dashboard to insert directly.

### 5. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page (home)
│   ├── ministry/page.tsx           # Ministry Hub (prayers, services, podcasts, articles)
│   ├── appointments/page.tsx       # Public appointment booking
│   ├── contact/page.tsx            # Contact + Prayer Request forms
│   ├── auth/login/page.tsx         # Login page
│   ├── admin/
│   │   ├── layout.tsx              # Protected admin layout (JWT guard)
│   │   ├── page.tsx                # Dashboard overview
│   │   ├── appointments/page.tsx   # Manage & confirm appointments
│   │   ├── links/page.tsx          # Add/remove ministry links
│   │   └── prayers/page.tsx        # View prayer requests
│   └── api/
│       ├── auth/login/route.ts     # POST - login, set JWT cookie
│       ├── auth/logout/route.ts    # POST - clear cookie
│       ├── auth/me/route.ts        # GET - current user from cookie
│       ├── links/route.ts          # GET (public) / POST (editor+)
│       ├── links/[id]/route.ts     # PATCH/DELETE (editor+/admin)
│       ├── appointments/route.ts   # GET (editor+) / POST (public)
│       ├── appointments/[id]/route.ts # PATCH/DELETE (editor+/admin)
│       ├── prayer-requests/route.ts   # GET (admin) / POST (public)
│       └── contact/route.ts        # POST (public)
├── components/
│   ├── layout/Navbar.tsx           # Glassmorphic sticky navbar
│   ├── layout/Footer.tsx           # Full footer
│   ├── home/HeroSection.tsx        # Animated hero with portrait
│   ├── home/AboutSection.tsx       # About with stats
│   ├── home/MinistryCards.tsx      # 6-card ministry grid
│   ├── home/MusicSection.tsx       # Bento music gallery
│   ├── home/YouthSection.tsx       # Youth ministry cards
│   └── admin/AdminShell.tsx        # Collapsible admin sidebar layout
├── lib/
│   ├── auth.ts                     # JWT sign/verify, cookie helpers
│   └── supabase.ts                 # Supabase client + admin client
├── types/index.ts                  # TypeScript interfaces
└── styles/globals.css              # Design system CSS variables
```

---

## 🔐 Authentication & RBAC

### Roles

| Role | Permissions |
|---|---|
| `user` | Can book appointments, submit prayer requests, contact |
| `editor` | All above + add/edit ministry links, view & confirm appointments |
| `admin` | All above + delete links/appointments, view private prayer requests |

### How It Works

1. User POSTs credentials to `/api/auth/login`
2. Server verifies password with `bcryptjs`
3. Server signs a **JWT** with `jose` containing `{ sub, email, name, role }`
4. JWT stored in **HTTP-only cookie** (`pastor_auth_token`) — not accessible from JavaScript
5. Server-side route handlers read the cookie via `cookies()` from `next/headers`
6. Admin layout (`src/app/admin/layout.tsx`) is a **Server Component** that calls `getAuthUser()` and redirects if unauthorized

---

## 📋 Features

### Public Site
- ✅ **Landing Page** — Hero with animated portrait, About, Ministry Cards, Music Bento Grid, Youth Ministry
- ✅ **Ministry Hub** — Tabbed interface: Lunch Hour Prayers / Sunday Services / Podcasts / Articles
- ✅ **Appointment Booking** — Full scheduling form with purpose, date/time selection
- ✅ **Contact Page** — Send a message OR submit a prayer request (anonymous option, private option)

### Admin Dashboard (`/admin`)
- ✅ **Overview** — Stats cards + recent appointments table
- ✅ **Appointments** — View all, filter by status, confirm or cancel with one click
- ✅ **Ministry Links** — Add Facebook/YouTube/article links by category, toggle publish/hide, delete
- ✅ **Prayer Requests** — View all submissions with private/anonymous tags

---

## 🗄️ Database Schema

See `supabase-schema.sql` for the full schema including:

- `users` — Auth users with roles
- `ministry_links` — All ministry content (prayers, services, podcasts, articles)
- `appointments` — Booking requests with status tracking
- `prayer_requests` — Prayer submissions
- `contact_messages` — Contact form submissions

---

## 🎨 Design System

CSS variables defined in `src/styles/globals.css`:

```css
--navy:       #0D234B   /* Primary brand color */
--gold:       #F4B400   /* Accent color */
--stone:      #F9F7F4   /* Background */
--font-display: 'Playfair Display'  /* Headings */
--font-script:  'Corinthia'         /* Signature/logo */
--font-body:    'DM Sans'           /* Body text */
```

---

## 🖼️ Images

Place your images in `/public/images/`:

```
public/images/
├── Pastor_Osagie_.png       # Hero portrait (transparent background works best)
├── Pastor_Osagie_2.jpg      # About section photo
├── playing_Saxophone.jpg    # Music section
├── on_knees.jpg
├── singing.jpg
├── playing_saxophone2.jpg
├── youth-event1.jpg         # Youth section
├── youth-mentorship.jpg
└── youth-service.jpg
```

---

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

Set all environment variables in the Vercel dashboard under **Project > Settings > Environment Variables**.

### Build Locally

```bash
npm run build
npm start
```

---

## 📧 Contact & Support

For questions about the codebase, contact the development team.