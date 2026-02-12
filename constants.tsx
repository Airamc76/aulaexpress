
import { Course } from './types';

export const CATEGORIES = ['Marketing', 'Diseño', 'Programación', 'Negocios', 'Desarrollo Personal'];

export const MOCK_COURSES: Course[] = [
  {
    id: 'c1',
    slug: 'master-chatgpt-2024',
    title: 'Acceso Privado: Master ChatGPT & IA',
    subtitle: 'Biblioteca completa de prompts, automatizaciones y contenido exclusivo sin plataformas lentas.',
    description: 'No estás comprando un curso común. Estás accediendo a una biblioteca privada, actualizada y directa. Aprende a dominar la IA para ahorrar 10 horas de trabajo a la semana con acceso inmediato a archivos reales y prácticos.',
    price: 9.99,
    oldPrice: 49.99,
    category: 'Marketing',
    thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000',
    rating: 4.8,
    students: 1250,
    duration: 'Acceso Vitalicio',
    level: 'Básico',
    modules: [
      { id: 'm1', title: 'Fundamentos e IA Real', lessons: ['Estrategias de LLM aplicadas', 'Configuración de entorno privado'] },
      { id: 'm2', title: 'Ingeniería de Prompts Pro', lessons: ['Biblioteca de Prompts Zero-shot', 'Cadena de pensamiento para negocios'] }
    ],
    requirements: ['Acceso a Google Drive', 'Cuenta gratuita de OpenAI'],
    targetAudience: ['Emprendedores que buscan velocidad', 'Freelancers productivos'],
    benefits: ['Acceso directo sin plataformas lentas', 'Descarga libre de archivos', 'Actualizaciones constantes de por vida']
  },
  {
    id: 'c2',
    slug: 'excel-para-negocios',
    title: 'Biblioteca Pro: Excel para Negocios',
    subtitle: 'Acceso directo a plantillas, dashboards y macros listas para usar en tu Drive.',
    description: 'Olvídate de las clases interminables. Aquí tienes acceso a la biblioteca de recursos de Excel más completa del mercado. De cero a experto mediante casos de uso reales y archivos que puedes descargar y aplicar hoy mismo.',
    price: 14.99,
    oldPrice: 59.99,
    category: 'Negocios',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    rating: 4.9,
    students: 3400,
    duration: 'Acceso Vitalicio',
    level: 'Intermedio',
    modules: [
      { id: 'm1', title: 'Análisis de Datos Directo', lessons: ['Funciones lógicas avanzadas', 'Limpieza de bases de datos'] },
      { id: 'm2', title: 'Visualización Impactante', lessons: ['Acceso a Plantillas Dashboards', 'Macros simplificadas'] }
    ],
    requirements: ['Microsoft Excel o Google Sheets'],
    targetAudience: ['Analistas', 'Dueños de negocio'],
    benefits: ['Plantillas premium incluidas', 'Soporte vía WhatsApp']
  }
];
