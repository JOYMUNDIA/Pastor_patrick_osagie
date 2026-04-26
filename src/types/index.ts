// src/types/index.ts

// ------------------------
// User Roles
// ------------------------
export type UserRole = 'admin' | 'editor' | 'user';

// ------------------------
// Appointment Status
// ------------------------
export enum AppointmentStatus {
  Pending = 'pending',
  Confirmed = 'confirmed',
  Cancelled = 'cancelled',
}

// ------------------------
// Ministry Categories
// ------------------------
export enum MinistryCategory {
  Prayer = 'prayer',
  Service = 'service',
  Podcast = 'podcast',
  Article = 'article',
}

// ------------------------
// User Interface
// ------------------------
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  created_at: string;
}

// ------------------------
// JWT Payload
// ------------------------
export interface JWTPayload {
  sub: string;
  email: string;
  name: string;
  role: UserRole;
  iat: number;
  exp: number;
}

// ------------------------
// Ministry Links
// ------------------------
export interface MinistryLink {
  id: string;
  category: MinistryCategory;
  title: string;
  description?: string;
  url: string;
  date?: string;
  thumbnail?: string;
  is_published: boolean;
  created_at: string;
  created_by: string;
}

// ------------------------
// Appointments
// ------------------------
export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone?: string;
  purpose: string;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  status: AppointmentStatus;
  created_at: string;
}

// ------------------------
// Devotional
// ------------------------
export interface Devotional {
  id: string;
  date: string;
  topic: string;
  memorise_verse: string;
  memorise_reference: string;
  bible_reading: string;
  bible_reading_text?: string;
  message: string;
  prayer_point: string;
  author: string;
  bible_in_one_year?: string;
  hymn_title?: string;
  hymn_lyrics?: string;
  is_published: boolean;
  created_by: string;
  created_at: string;
}

// ------------------------
// Prayer Requests
// ------------------------
export interface PrayerRequest {
  id: string;
  name: string;
  email: string;
  is_anonymous: boolean;
  request: string;
  is_private: boolean;
  created_at: string;
}

// ------------------------
// Contact Messages
// ------------------------
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

// ------------------------
// Generic API Response
// ------------------------
export type ApiResponse<T> = {
  data?: T;
  error?: string;
};