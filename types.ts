
export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  price: number;
  old_price?: number; // Changed from oldPrice to match DB or we alias it
  oldPrice?: number; // Keep for compatibility if we map it
  category: string;
  thumbnail: string;
  rating: number;
  students: number;
  duration: string;
  level: 'Básico' | 'Intermedio' | 'Avanzado';
  modules: Module[];
  requirements: string[];
  targetAudience: string[];
  benefits: string[];
  drive_link?: string;
  language?: 'Español' | 'Inglés';
  created_at?: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  purchasedCourses: string[]; // Course IDs
}

export type Category = 'Marketing' | 'Diseño' | 'Programación' | 'Negocios' | 'Desarrollo Personal';

export interface Profile {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'staff';
  created_at: string;
}

export interface AdminUser extends Omit<Profile, 'id' | 'role'> {
  user_id: string; // Changed from id to avoid SQL ambiguity
  user_role: 'admin' | 'user' | 'staff'; // Changed from role to avoid SQL ambiguity
  last_sign_in_at?: string;
  is_2fa_enabled: boolean;
}
