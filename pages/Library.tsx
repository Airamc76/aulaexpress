import React, { useState, useEffect } from 'react';
import { Play, Clock, BarChart, ChevronRight, BookOpen, Loader2, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Course } from '../types';

interface LibraryProps {
  onNavigate: (page: string, params?: any) => void;
}

const Library: React.FC<LibraryProps> = ({ onNavigate }) => {
  const [myCourses, setMyCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLibrary();
  }, []);

  const fetchLibrary = async () => {
    setLoading(true);

    // 1. Obtener usuario actual
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setMyCourses([]);
      setLoading(false);
      // Redirect to login if user tries to access library directly
      onNavigate('login');
      return;
    }

    // 2. Check if it's the admin/test user
    if (user.id === '9dd41198-07c6-4fa7-a251-1bff84f63053') {
      const { data, error } = await supabase
        .from('courses')
        .select('*');

      if (error) {
        console.error('Error fetching all courses:', error);
      } else {
        setMyCourses(data || []);
      }
    } else {
      // 3. Consultar accesos del usuario normal
      const { data, error } = await supabase
        .from('course_access')
        .select(`
          courses (*)
        `)
        .eq('user_id', user.id)
        .eq('active', true);

      if (error) {
        console.error('Error fetching library:', error);
      } else {
        // Mapear la respuesta para extraer solo el objeto de curso
        const courses = data?.map((item: any) => item.courses).filter(Boolean) || [];
        setMyCourses(courses);
      }
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 pt-16 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Mi Biblioteca</h1>
            <p className="text-slate-500">Tienes {myCourses.length} cursos activos.</p>
          </div>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              onNavigate('login');
            }}
            className="flex items-center text-slate-500 hover:text-red-600 transition-colors font-medium bg-slate-50 hover:bg-red-50 px-4 py-2 rounded-xl"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Cerrar Sesión
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {myCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myCourses.map(course => (
              <div key={course.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                <div className="relative h-48">
                  <img src={course.thumbnail} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="" />
                  <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="bg-white p-4 rounded-full text-indigo-600 shadow-xl transform scale-75 group-hover:scale-100 transition-transform">
                      <Play className="h-8 w-8 fill-current" />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center text-xs font-bold text-indigo-600 uppercase tracking-wider mb-2">
                    {course.category}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 line-clamp-2 leading-tight">
                    {course.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs text-slate-500 mb-6 border-t border-gray-50 pt-4 mt-auto">
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      {course.duration || 'N/A'}
                    </div>
                    <div className="flex items-center">
                      <BarChart className="h-3.5 w-3.5 mr-1" />
                      {course.level || 'Todos los niveles'}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (course.drive_link) {
                        window.open(course.drive_link, '_blank');
                      } else {
                        alert('El enlace al material estará disponible pronto.');
                      }
                    }}
                    className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100"
                  >
                    Acceder al Curso
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add more button */}
            <div
              onClick={() => onNavigate('catalog')}
              className="bg-gray-100 rounded-3xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center p-12 hover:bg-white hover:border-indigo-200 transition-all cursor-pointer group"
            >
              <div className="bg-white p-4 rounded-full text-slate-400 group-hover:text-indigo-600 shadow-sm mb-4 transition-colors">
                <BookOpen className="h-8 w-8" />
              </div>
              <p className="font-bold text-slate-900 mb-1">Expandir mi conocimiento</p>
              <p className="text-sm text-slate-500">Ver catálogo completo</p>
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto py-24 text-center">
            <div className="bg-indigo-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
              <BookOpen className="h-10 w-10 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Tu biblioteca está vacía</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              Explora nuestro catálogo para encontrar el diseño que elevará tu marca.
            </p>
            <button
              onClick={() => onNavigate('catalog')}
              className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 transition-transform hover:scale-105"
            >
              Ver Catálogo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
