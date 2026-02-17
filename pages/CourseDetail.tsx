
import React, { useState, useEffect } from 'react';
import { ChevronRight, Star, Clock, User, BarChart, CheckCircle2, ChevronDown, ChevronUp, ArrowLeft, ShieldCheck, Mail, Zap, Play, CloudDownload, Library, Shield } from 'lucide-react';
import { Course } from '../types';
import CheckoutModals from '../components/CheckoutModals';
import { supabase } from '../lib/supabase';

const MercadoPagoLogo: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 548 425"
    preserveAspectRatio="xMidYMid meet"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Mercado Pago"
  >
    <path fill="#00bcff" d="m274.38,116.94c-77.83,0-140.91,40.36-140.91,90.15s63.09,94.05,140.91,94.05,140.91-44.27,140.91-94.05-63.09-90.15-140.91-90.15Z" />
    <path fill="none" stroke="#0a0080" strokeWidth="12" d="m274.38,116.94c-77.83,0-140.91,40.36-140.91,90.15s63.09,94.05,140.91,94.05,140.91-44.27,140.91-94.05-63.09-90.15-140.91-90.15Z" />
    <path fill="#fff" d="m228.53,179.22c-.07.14-1.45,1.56-.55,2.71,2.18,2.78,8.91,4.38,15.72,2.85,4.05-.91,9.25-5.04,14.28-9.03,5.45-4.33,10.86-8.67,16.3-10.39,5.76-1.83,9.45-1.05,11.89-.31,2.67.8,5.82,2.56,10.84,6.32,9.45,7.1,47.43,40.26,54,45.99,5.28-2.39,30.47-12.56,62.39-19.6-2.78-17.02-13.01-33.25-28.72-45.99-21.89,9.19-50.42,14.7-76.58,1.93-.13-.05-14.29-6.75-28.25-6.42-20.75.48-29.74,9.46-39.25,18.97l-12.05,12.99Z" />
    <path fill="#fff" d="m349.44,220.97c-.45-.4-44.67-39.09-54.69-46.62-5.8-4.35-9.02-5.46-12.41-5.89-1.76-.23-4.2.1-5.9.57-4.66,1.27-10.75,5.34-16.16,9.63-5.6,4.46-10.88,8.66-15.79,9.76-6.26,1.4-13.91-.25-17.4-2.61-1.41-.95-2.41-2.05-2.89-3.16-1.29-2.99,1.09-5.38,1.48-5.78l12.2-13.2c1.42-1.41,2.85-2.83,4.31-4.23-3.94.51-7.58,1.52-11.12,2.5-4.42,1.24-8.68,2.42-12.98,2.42-1.8,0-11.42-1.58-13.25-2.07-11.05-3.02-23.56-5.97-38.04-12.73-17.35,12.91-28.65,28.77-32,46.56,2.49.66,9.02,2.15,10.71,2.52,39.26,8.73,51.49,17.72,53.71,19.6,2.4-2.67,5.87-4.36,9.73-4.36,4.35,0,8.26,2.19,10.64,5.56,2.25-1.78,5.35-3.3,9.36-3.29,1.82,0,3.71.34,5.62.98,4.43,1.52,6.72,4.47,7.9,7.14,1.48-.67,3.31-1.17,5.46-1.16,2.12,0,4.32.48,6.53,1.44,7.24,3.11,8.36,10.22,7.71,15.58.52-.06,1.04-.08,1.56-.08,8.58,0,15.56,6.98,15.56,15.57,0,2.66-.68,5.16-1.86,7.35,2.34,1.31,8.29,4.28,13.52,3.62,4.17-.53,5.76-1.95,6.32-2.76.39-.55.8-1.2.42-1.66l-11.08-12.3s-1.82-1.73-1.22-2.39c.62-.68,1.75.3,2.55.96,5.64,4.71,12.52,11.81,12.52,11.81.12.08.57.98,3.12,1.43,2.19.39,6.07.17,8.76-2.04.67-.56,1.35-1.25,1.93-1.97-.05.04-.09.08-.13.1,2.84-3.63-.32-7.29-.32-7.29l-12.93-14.52s-1.85-1.71-1.22-2.4c.56-.6,1.75.3,2.56.98,4.09,3.42,9.88,9.23,15.42,14.66,1.09.79,5.96,3.8,12.41-.43,3.92-2.57,4.7-5.73,4.59-8.1-.27-3.15-2.73-5.4-2.73-5.4l-17.66-17.76s-1.87-1.59-1.21-2.4c.54-.68,1.75.3,2.55.96,5.62,4.71,20.86,18.68,20.86,18.68.22.15,5.48,3.9,11.99-.24,2.33-1.49,3.81-3.73,3.94-6.34.22-4.52-2.96-7.2-2.96-7.2Z" />
    <path fill="#fff" d="m263.76,243.48c-2.74-.03-5.74,1.6-6.13,1.36-.22-.14.17-1.24.42-1.88.27-.63,3.87-11.48-4.92-15.25-6.73-2.89-10.85.36-12.26,1.83-.37.38-.54.35-.58-.13-.14-1.96-1.01-7.24-6.82-9.02-8.3-2.54-13.64,3.25-14.99,5.35-.61-4.73-4.61-8.4-9.5-8.41-5.32,0-9.64,4.3-9.65,9.63,0,5.32,4.31,9.64,9.64,9.64,2.59,0,4.93-1.03,6.66-2.69.06.05.08.14.05.32-.41,2.39-1.15,11.04,7.92,14.57,3.64,1.41,6.73.36,9.29-1.43.76-.54.89-.31.78.41-.33,2.23.09,6.99,6.77,9.7,5.08,2.07,8.09-.04,10.07-1.87.86-.78,1.09-.65,1.14.56.24,6.44,5.59,11.56,12.09,11.57,6.7,0,12.13-5.41,12.13-12.1,0-6.7-5.42-12.06-12.12-12.13Z" />
  </svg>
);

interface CourseDetailProps {
  course?: Course;
  slug?: string;
  onNavigate: (page: string, params?: any) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course: initialCourse, slug, onNavigate }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [course, setCourse] = useState<Course | undefined>(initialCourse);
  const [loading, setLoading] = useState(!initialCourse);

  useEffect(() => {
    if (!course && slug) {
      fetchCourse();
    } else {
      setLoading(false);
    }
  }, [slug, course]);

  const fetchCourse = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('slug', slug)
      .single();
    
    if (error) {
      console.error('Error fetching course:', error);
    } else if (data) {
      setCourse(data);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Curso no encontrado</h2>
        <button onClick={() => onNavigate('catalog')} className="text-indigo-600 hover:underline">
          Volver al catálogo
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <CheckoutModals 
        isOpen={isCheckoutOpen} 
        course={course} 
        onClose={() => setIsCheckoutOpen(false)} 
        onSuccess={() => onNavigate('library')}
      />

      {/* Header / Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center text-sm text-slate-500 space-x-2">
          <button onClick={() => onNavigate('catalog')} className="hover:text-indigo-600 flex items-center">
            <ArrowLeft className="h-4 w-4 mr-1" /> Volver a las Bibliotecas
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Content side */}
          <div className="lg:w-2/3">
            <div className="inline-flex items-center bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold mb-4 border border-indigo-100 uppercase tracking-widest">
              🔓 Acceso Privado Inmediato
            </div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 leading-tight">Desbloquea la Biblioteca: {course.title}</h1>
            <p className="text-xl text-slate-500 mb-8 font-medium leading-relaxed">
              No estás comprando un curso común. Estás accediendo a una biblioteca privada, actualizada y directa, <span className="text-slate-900 font-bold">sin plataformas complicadas ni distracciones.</span>
            </p>
            
            <div className="aspect-video w-full rounded-3xl overflow-hidden bg-slate-900 mb-12 shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=2070&q=80" 
                alt="Cómo funciona el acceso a Google Drive"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent flex items-end">
                <div className="p-8">
                  <h3 className="text-white text-2xl font-bold mb-2">Acceso Directo a tu Biblioteca</h3>
                  <p className="text-white/90">Todos tus cursos organizados en carpetas, disponibles 24/7</p>
                </div>
              </div>
            </div>

            {/* Bullets concretos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
              {[
                "Todos los módulos organizados por carpetas",
                "Acceso inmediato tras el pago",
                "Actualizaciones gratuitas de por vida",
                "Plantillas descargables listas para usar",
                "Acceso desde celular o computadora",
                "Sin caducidad (Vitalicio)"
              ].map((item, i) => (
                <div key={i} className="flex items-center bg-slate-50 p-4 rounded-2xl border border-gray-100">
                  <CheckCircle2 className="h-5 w-5 text-indigo-600 mr-3 shrink-0" />
                  <span className="text-sm font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>

            {/* Tabla de Valor Percibido */}
            <div className="bg-white border-2 border-indigo-600 rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl">
              <div className="bg-indigo-600 p-6 text-center text-white">
                <h3 className="text-xl font-bold">Desglose de Valor de la Biblioteca</h3>
              </div>
              <div className="p-6">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-100"><td className="py-4 text-slate-600">Módulo de Fundamentos y Estrategia</td><td className="py-4 text-right font-bold text-slate-900">$2,997</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-4 text-slate-600">Material de Trabajo Avanzado</td><td className="py-4 text-right font-bold text-slate-900">$3,997</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-4 text-slate-600">Plantillas Premium Editables</td><td className="py-4 text-right font-bold text-slate-900">$2,497</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-4 text-slate-600">Actualizaciones de por Vida</td><td className="py-4 text-right font-bold text-slate-900">$2,997</td></tr>
                    <tr className="border-b border-indigo-50"><td className="py-4 text-slate-600">Acceso Privado Permanente</td><td className="py-4 text-right font-bold text-slate-900">$1,997</td></tr>
                    <tr className="bg-slate-50"><td className="py-6 px-4 text-xl font-bold text-slate-900">VALOR TOTAL REAL</td><td className="py-6 px-4 text-right text-xl font-bold text-slate-400 line-through">$14,485</td></tr>
                  </tbody>
                </table>
                <div className="mt-8 p-6 bg-indigo-50 rounded-2xl text-center border border-indigo-100">
                  <p className="text-indigo-600 font-bold mb-1">OFERTA DE ACCESO HOY:</p>
                  <p className="text-5xl font-black text-slate-900">${course.price}</p>
                </div>
              </div>
            </div>

            {/* Eliminador de Objeciones */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 mb-8">Preguntas y Objeciones</h2>
              <div className="space-y-4">
                {[
                  { q: "¿Por qué es por Drive?", a: "Es el acceso más rápido, sin límites de plataforma pesadas y permite la descarga directa para uso offline." },
                  { q: "¿Es seguro mi pago?", a: "Absolutamente. Usamos Mercado Pago para cifrar tu transacción. Tu acceso es privado solo para tu correo." }
                ].map((faq, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <p className="font-bold text-slate-900 mb-2">"{faq.q}"</p>
                    <p className="text-sm text-slate-500 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Purchase Side */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-black px-10 py-1 rotate-45 translate-x-10 translate-y-3 uppercase tracking-tighter">
                  -90% OFF
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">¡Bono de Acción Rápida!</h3>
                <p className="text-xs text-slate-500 mb-6">Incluye Checklist descargable + Guía extra de implementación si compras ahora.</p>

                <div className="flex items-center justify-between mb-8">
                  <div className="flex flex-col">
                    <span className="text-4xl font-extrabold text-slate-900">${course.price}</span>
                    {(course.old_price || course.oldPrice) && (
                      <span className="text-sm text-slate-400 line-through">Valor real: ${course.old_price || course.oldPrice}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 transition-all transform hover:scale-[1.02] flex items-center justify-center leading-tight px-4"
                  >
                    👉 SÍ, QUIERO ACCESO INMEDIATO A LA BIBLIOTECA
                  </button>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-50">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest">Bloque de Confianza:</h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start justify-between gap-3">
                      <div className="flex items-start">
                        <CheckCircle2 className="h-4 w-4 mr-3 text-indigo-500 shrink-0 mt-0.5" />
                        <span>Pago 100% Seguro por Mercado Pago</span>
                      </div>
                      <MercadoPagoLogo className="h-6 w-auto shrink-0 block mt-0.5" />
                    </li>
                    <li className="flex items-start"><CheckCircle2 className="h-4 w-4 mr-3 text-indigo-500 shrink-0 mt-0.5" /> Acceso Permanente (Sin caducidad)</li>
                    <li className="flex items-start"><CheckCircle2 className="h-4 w-4 mr-3 text-indigo-500 shrink-0 mt-0.5" /> Actualizaciones Futuras Incluidas</li>
                    <li className="flex items-start"><CheckCircle2 className="h-4 w-4 mr-3 text-indigo-500 shrink-0 mt-0.5" /> Soporte Directo vía Email</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
