
import React, { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown, X, Loader2 } from 'lucide-react';
import { CATEGORIES } from '../constants';
import CourseCard from '../components/CourseCard';
import { supabase } from '../lib/supabase';
import { Course } from '../types';

interface CatalogProps {
  onNavigate: (page: string, params?: any) => void;
}

const Catalog: React.FC<CatalogProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Suggestion Modal State
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [suggestionText, setSuggestionText] = useState('');
  const [suggestionEmail, setSuggestionEmail] = useState('');
  const [isSendingSuggestion, setIsSendingSuggestion] = useState(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching courses:', error);
    } else {
      setCourses(data || []);
    }
    setLoading(false);
  };

  const handleSuggestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingSuggestion(true);
    
    // Simular envío de correo
    setTimeout(() => {
      setIsSendingSuggestion(false);
      setIsSuggestOpen(false);
      setSuggestionText('');
      setSuggestionEmail('');
      alert('¡Gracias! Hemos recibido tu sugerencia y la tendremos en cuenta para futuros cursos.');
    }, 1500);
  };

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'Todos' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pb-24">
      {/* Header section */}
      <div className="bg-indigo-600 pt-16 pb-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h1 className="text-4xl font-extrabold text-white mb-4">Nuestro Catálogo</h1>
          <p className="text-indigo-100 text-lg mb-8 max-w-2xl">
            Aprende habilidades digitales demandadas sin romper el banco. <br className="hidden md:block" /> 
            Cursos prácticos, directos y económicos.
          </p>

          <div className="bg-white p-2 rounded-2xl shadow-xl flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 max-w-4xl">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca un curso (ej: Marketing, Excel, Python...)"
                className="w-full pl-12 pr-4 py-4 rounded-xl focus:outline-none text-slate-700 font-medium"
              />
            </div>
            <div className="h-px md:h-auto md:w-px bg-gray-100 my-2 md:my-0"></div>
            <div className="md:w-64 relative">
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-full pl-4 pr-10 py-4 bg-transparent focus:outline-none appearance-none font-bold text-slate-900 cursor-pointer"
              >
                <option value="Todos">Todas las Categorías</option>
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100">
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Grid section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters (Desktop) */}
          <div className="hidden lg:block w-64 space-y-8">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-slate-900 flex items-center">
                  <SlidersHorizontal className="h-4 w-4 mr-2 text-indigo-600" />
                  Filtros
                </h3>
                <button 
                  onClick={() => setSelectedCategory('Todos')}
                  className="text-xs text-indigo-600 font-bold"
                >
                  Limpiar
                </button>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Categorías</h4>
                <div className="space-y-2">
                  <button 
                    onClick={() => setSelectedCategory('Todos')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === 'Todos' ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-gray-50'}`}
                  >
                    Todos
                  </button>
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-indigo-50 text-indigo-600' : 'text-slate-600 hover:bg-gray-50'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-6 rounded-3xl text-white shadow-xl">
              <h4 className="font-bold mb-2">¿No encuentras lo que buscas?</h4>
              <p className="text-xs text-indigo-100 mb-4 opacity-80">Cuéntanos qué te gustaría aprender y te avisaremos cuando lo tengamos.</p>
              <button 
                onClick={() => setIsSuggestOpen(true)}
                className="w-full bg-white text-indigo-600 py-2 rounded-xl text-xs font-bold hover:bg-indigo-50"
              >
                Sugerir Curso
              </button>
            </div>
          </div>

          {/* Course list */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-slate-500 font-medium">
                Mostrando <span className="text-slate-900 font-bold">{filteredCourses.length}</span> resultados {selectedCategory !== 'Todos' && <span>en <span className="text-indigo-600 font-bold">{selectedCategory}</span></span>}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400 font-bold uppercase">Ordenar por:</span>
                <select className="bg-transparent text-sm font-bold text-slate-700 focus:outline-none cursor-pointer">
                  <option>Más Populares</option>
                  <option>Más Recientes</option>
                  <option>Menor Precio</option>
                </select>
              </div>
            </div>

            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} onClick={(slug) => onNavigate('courseDetail', { slug })} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-dashed border-gray-200 rounded-3xl p-12 text-center">
                <Search className="h-12 w-12 text-slate-200 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-900 mb-2">No encontramos resultados</h3>
                <p className="text-slate-500 mb-6">Prueba con otras palabras clave o categorías.</p>
                <button 
                  onClick={() => {setSelectedCategory('Todos'); setSearchQuery('');}}
                  className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold"
                >
                  Ver todo el catálogo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Suggestion Modal */}
      {isSuggestOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsSuggestOpen(false)}></div>
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-6">
            <button 
              onClick={() => setIsSuggestOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">Sugerir un Curso</h3>
            <p className="text-sm text-slate-500 mb-6">
              Dinos qué tema te interesa y te notificaremos cuando esté disponible en el catálogo.
            </p>

            <form onSubmit={handleSuggestSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Temas o Títulos de curso</label>
                <textarea
                  value={suggestionText}
                  onChange={(e) => setSuggestionText(e.target.value)}
                  required
                  rows={3}
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-200 outline-none resize-none"
                  placeholder="Ej: Excel Avanzado, Marketing Digital..."
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Tu Email</label>
                <input
                  type="email"
                  value={suggestionEmail}
                  onChange={(e) => setSuggestionEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-200 outline-none"
                  placeholder="tucorreo@ejemplo.com"
                />
              </div>
              <button
                type="submit"
                disabled={isSendingSuggestion}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center disabled:opacity-70"
              >
                {isSendingSuggestion ? <Loader2 className="animate-spin" /> : 'Enviar Sugerencia'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Catalog;
