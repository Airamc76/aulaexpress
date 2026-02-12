
export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  oldPrice?: number;
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
