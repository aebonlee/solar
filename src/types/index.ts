/* ───────────────────────────────────────────
 *  Domain types for Solar AI Learning Studio
 * ─────────────────────────────────────────── */

// ─── Language ───
export type Language = 'ko' | 'en';

// ─── Theme ───
export type ThemeMode = 'auto' | 'light' | 'dark';
export type ColorTheme = 'solar' | 'ocean' | 'sunrise' | 'aurora' | 'cosmos';

// ─── Curriculum ───
export interface Module {
  id: number;
  day: number;
  title: string;
  titleEn: string;
  description: string;
  hours: number;
  icon: string;
  color: string;
  topics: string[];
}

// ─── Lesson ───
export interface Lesson {
  day: number;
  title: string;
  titleEn: string;
  description: string;
  objectives: string[];
  content: LessonContent[];
  labTitle: string;
  labDescription: string;
}

export interface LessonContent {
  id: string;
  title: string;
  type: 'lecture' | 'practice' | 'discussion';
  duration: string;
  body: string;
}

// ─── Project ───
export interface ProjectTrack {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  icon: string;
  color: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  skills: string[];
  deliverables: string[];
}

// ─── Resource ───
export interface Resource {
  id: number;
  title: string;
  description: string;
  category: string;
  type: 'pdf' | 'code' | 'video' | 'link';
  url: string;
  icon: string;
  day?: number;
}

// ─── Notice ───
export interface Notice {
  id: number;
  title: string;
  content: string;
  category: 'announcement' | 'update' | 'event';
  date: string;
  pinned: boolean;
}

// ─── Submission ───
export interface Submission {
  id: string;
  userId: string;
  day: number;
  type: 'lab' | 'project' | 'assignment';
  title: string;
  content: string;
  fileUrl?: string;
  submittedAt: string;
  score?: number;
  feedback?: string;
}

// ─── User / Auth ───
export interface UserProfile {
  id: string;
  email: string;
  name: string;
  display_name: string;
  avatar_url: string;
  phone: string;
  provider: string;
  role: string;
  signup_domain: string;
  visited_sites: string[];
  last_sign_in_at: string;
  updated_at: string;
}

export interface AccountBlock {
  status: string;
  reason: string;
  suspended_until: string | null;
}

// ─── Toast ───
export type ToastType = 'info' | 'success' | 'error' | 'warning';

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}
