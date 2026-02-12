
import React, { useState } from 'react';
import { ChevronRight, Star, Clock, User, BarChart, CheckCircle2, ChevronDown, ChevronUp, ArrowLeft, ShieldCheck, Mail, Zap, Play, CloudDownload, Library, Shield } from 'lucide-react';
import { Course } from '../types';
import CheckoutModals from '../components/CheckoutModals';

interface CourseDetailProps {
  course: Course;
  onNavigate: (page: string, params?: any) => void;
}

const CourseDetail: React.FC<CourseDetailProps> = ({ course, onNavigate }) => {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

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
              <img src={course.thumbnail} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-all mb-4">
                  <Play className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-indigo-600 border-b-[10px] border-b-transparent ml-2" />
                </div>
                <p className="text-white font-bold bg-slate-900/50 px-4 py-2 rounded-xl backdrop-blur-sm">Mira cómo es el acceso directo por Drive</p>
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
                    <tr className="border-b border-gray-100"><td className="py-4 text-slate-600">Módulo de Fundamentos y Estrategia</td><td className="py-4 text-right font-bold text-slate-900">$197</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-4 text-slate-600">Material de Trabajo Avanzado</td><td className="py-4 text-right font-bold text-slate-900">$297</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-4 text-slate-600">Plantillas Premium Editables</td><td className="py-4 text-right font-bold text-slate-900">$147</td></tr>
                    <tr className="border-b border-gray-100"><td className="py-4 text-slate-600">Actualizaciones de por Vida</td><td className="py-4 text-right font-bold text-slate-900">$297</td></tr>
                    <tr className="border-b border-indigo-50"><td className="py-4 text-slate-600">Acceso Privado Permanente</td><td className="py-4 text-right font-bold text-slate-900">$197</td></tr>
                    <tr className="bg-slate-50"><td className="py-6 px-4 text-xl font-bold text-slate-900">VALOR TOTAL REAL</td><td className="py-6 px-4 text-right text-xl font-bold text-slate-400 line-through">$1,135</td></tr>
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
                  { q: "¿Es seguro mi pago?", a: "Absolutamente. Usamos Mercado Pago para cifrar tu transacción. Tu acceso es privado solo para tu correo." },
                  { q: "¿Y si no me sirve?", a: "Tienes 7 días de garantía. Si sientes que no es para ti, nos escribes y te devolvemos tu dinero sin preguntas." }
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
                    <span className="text-sm text-slate-400 line-through">Valor real: $1,135</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 transition-all transform hover:scale-[1.02] flex items-center justify-center leading-tight px-4"
                  >
                    👉 SÍ, QUIERO ACCESO INMEDIATO A LA BIBLIOTECA
                  </button>
                  <div className="flex items-center justify-center space-x-2 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>Garantía de 7 días sin preguntas</span>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-gray-50">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-widest">Bloque de Confianza:</h4>
                  <ul className="space-y-3 text-sm text-slate-600">
                    <li className="flex items-start"><CheckCircle2 className="h-4 w-4 mr-3 text-indigo-500 shrink-0 mt-0.5" /> Pago 100% Seguro por Mercado Pago</li>
                    <li className="flex items-start"><CheckCircle2 className="h-4 w-4 mr-3 text-indigo-500 shrink-0 mt-0.5" /> Acceso Permanente (Sin caducidad)</li>
                    <li className="flex items-start"><CheckCircle2 className="h-4 w-4 mr-3 text-indigo-500 shrink-0 mt-0.5" /> Actualizaciones Futuras Incluidas</li>
                    <li className="flex items-start"><CheckCircle2 className="h-4 w-4 mr-3 text-indigo-500 shrink-0 mt-0.5" /> Soporte Directo vía Email</li>
                  </ul>
                </div>

                <div className="mt-8">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Mercado_Pago.png" className="h-6 mx-auto opacity-60" alt="Mercado Pago" />
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
