// src/types/supabase-types.ts

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          password_hash: string;
          role: 'admin' | 'editor' | 'user';
          created_at: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          password_hash: string;
          role?: 'admin' | 'editor' | 'user';
          created_at?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          password_hash?: string;
          role?: 'admin' | 'editor' | 'user';
          created_at?: string | null;
        };
      };

      ministry_links: {
        Row: {
          id: string;
          category: 'prayer' | 'service' | 'podcast' | 'article';
          title: string;
          description: string | null;
          url: string;
          date: string | null;
          thumbnail: string | null;
          is_published: boolean | null;
          created_by: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          category: 'prayer' | 'service' | 'podcast' | 'article';
          title: string;
          description?: string | null;
          url: string;
          date?: string | null;
          thumbnail?: string | null;
          is_published?: boolean | null;
          created_by?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          category?: 'prayer' | 'service' | 'podcast' | 'article';
          title?: string;
          description?: string | null;
          url?: string;
          date?: string | null;
          thumbnail?: string | null;
          is_published?: boolean | null;
          created_by?: string | null;
          created_at?: string | null;
        };
      };

      appointments: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          purpose: string;
          preferred_date: string;
          preferred_time: string;
          message: string | null;
          status: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          purpose: string;
          preferred_date: string;
          preferred_time: string;
          message?: string | null;
          status?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          purpose?: string;
          preferred_date?: string;
          preferred_time?: string;
          message?: string | null;
          status?: string | null;
          created_at?: string | null;
        };
      };

      prayer_requests: {
        Row: {
          id: string;
          name: string;
          email: string;
          is_anonymous: boolean | null;
          request: string;
          is_private: boolean | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          is_anonymous?: boolean | null;
          request: string;
          is_private?: boolean | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          is_anonymous?: boolean | null;
          request?: string;
          is_private?: boolean | null;
          created_at?: string | null;
        };
      };

      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          subject: string;
          message: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          subject?: string;
          message?: string;
          created_at?: string | null;
        };
      };
    };
  };
};