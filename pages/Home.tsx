
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, Lock, ArrowRight, Play, Star, CheckCircle2, CloudDownload, Library, MessageCircle } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { supabase } from '../lib/supabase';
import { Course } from '../types';

interface HomeProps {
  onNavigate: (page: string, params?: any) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from('courses')
        .select('*')
        .limit(4)
        .order('created_at', { ascending: false });
      
      if (data) setFeaturedCourses(data);
    };
    fetchFeatured();
  }, []);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0">
              <div className="inline-flex items-center bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold mb-6 border border-indigo-100">
                <Library className="h-4 w-4 mr-2" />
                No es un curso, es Acceso Privado
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
                Acceso Directo <br />
                <span className="text-indigo-600">a tu Biblioteca.</span>
              </h1>
              <p className="text-xl text-slate-500 mb-10 max-w-xl mx-auto lg:mx-0">
                Accede a carpetas privadas, descarga contenido sin límites y aprende sin plataformas lentas. <span className="font-bold text-slate-900">Pagás una vez, desbloqueás para siempre</span> vía Mercado Pago.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => onNavigate('catalog')}
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-200 transition-all flex items-center justify-center"
                >
                  Explorar Bibliotecas
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
                <button 
                  className="w-full sm:w-auto bg-white border border-gray-200 hover:border-indigo-300 text-slate-700 px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center transition-all"
                >
                  <CloudDownload className="h-5 w-5 mr-2 text-indigo-600" />
                  Descarga Directa
                </button>
              </div>

              <div className="mt-10 flex items-center justify-center lg:justify-start space-x-8">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map(i => (
                    <img key={i} src={`https://picsum.photos/seed/${i+10}/64/64`} className="w-10 h-10 rounded-full border-2 border-white" alt="" />
                  ))}
                </div>
                <div className="text-sm text-slate-500">
                  <span className="font-bold text-slate-900">+12,000</span> personas ya desbloquearon su acceso
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 relative">
              <div className="relative z-10 bg-indigo-50 p-4 rounded-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2070&auto=format&fit=crop" 
                  className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3] brightness-95"
                  alt="Acceso Privado AulaExpress"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-indigo-50 max-w-[200px]">
                  <div className="flex items-center text-yellow-500 mb-2">
                    <Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" /><Star className="h-4 w-4 fill-current" />
                  </div>
                  <p className="text-xs text-slate-600 font-medium">"Acceso inmediato a los archivos. Mucho mejor que plataformas lentas."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Ideology Section */}
      <section className="py-20 bg-slate-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-indigo-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-indigo-600">
                <Zap className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Sin Plataformas</h4>
              <p className="text-xs text-slate-500">Acceso directo a carpetas. Sin contraseñas olvidadas.</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-green-600">
                <CloudDownload className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Descarga Libre</h4>
              <p className="text-xs text-slate-500">Todo el material es tuyo para siempre. Offline o Online.</p>
            </div>
            <div className="text-center">
              <div className="bg-sky-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-sky-600">
                <MessageCircle className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Soporte 24/7</h4>
              <p className="text-xs text-slate-500">Vía Mail y Telegram para resolver tus dudas al instante.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                <Lock className="h-6 w-6" />
              </div>
              <h4 className="font-bold text-slate-900 mb-2">Pago Blindado</h4>
              <p className="text-xs text-slate-500">Mercado Pago asegura tu compra al 100%.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Bibliotecas */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Bibliotecas Digitales Privadas</h2>
            <p className="text-slate-500">Habilidades de alto valor con acceso directo inmediato.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} onClick={(slug) => onNavigate('courseDetail', { slug })} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section: Ideology in Action */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-white overflow-hidden relative">
            <div className="relative z-10 text-center mb-16">
              <h2 className="text-4xl font-extrabold mb-4">¿Por qué nuestro Acceso Privado es mejor?</h2>
              <p className="text-slate-400">Compara y elige la forma más inteligente de aprender.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 opacity-60">
                <h3 className="text-xl font-bold mb-6 text-slate-400">Curso Tradicional</h3>
                <ul className="space-y-4">
                  <li className="flex items-center text-slate-400"><X className="h-5 w-5 mr-3 text-red-500" /> Plataformas lentas y pesadas</li>
                  <li className="flex items-center text-slate-400"><X className="h-5 w-5 mr-3 text-red-500" /> Sin posibilidad de descarga real</li>
                  <li className="flex items-center text-slate-400"><X className="h-5 w-5 mr-3 text-red-500" /> Membresías que caducan</li>
                  <li className="flex items-center text-slate-400"><X className="h-5 w-5 mr-3 text-red-500" /> Distracciones por todas partes</li>
                </ul>
              </div>
              <div className="bg-indigo-600 p-8 rounded-3xl border border-indigo-500 shadow-2xl transform lg:scale-105">
                <div className="inline-block bg-white text-indigo-600 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase">Recomendado</div>
                <h3 className="text-xl font-bold mb-6">Tu Biblioteca en Drive</h3>
                <ul className="space-y-4">
                  <li className="flex items-center font-medium"><CheckCircle2 className="h-5 w-5 mr-3 text-green-300" /> Acceso directo y ultra rápido</li>
                  <li className="flex items-center font-medium"><CheckCircle2 className="h-5 w-5 mr-3 text-green-300" /> Descarga libre para usar offline</li>
                  <li className="flex items-center font-medium"><CheckCircle2 className="h-5 w-5 mr-3 text-green-300" /> Acceso Permanente (Sin suscripción)</li>
                  <li className="flex items-center font-medium"><CheckCircle2 className="h-5 w-5 mr-3 text-green-300" /> Sin distracciones, directo al grano</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const X = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default Home;
