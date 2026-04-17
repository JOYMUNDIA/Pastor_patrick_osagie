// src/types/supabase-types.ts
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          role: 'admin' | 'editor' | 'user';
          created_at: string;
        };
      };
      appointments: { ... };
      // other tables
    };
  };
};