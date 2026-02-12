
import React, { useState } from 'react';
import { Mail, MessageCircle, FileQuestion, HelpCircle, ChevronDown, ChevronUp, Send } from 'lucide-react';

const Support: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { 
      q: "¿Cómo recibo el acceso a mi biblioteca?", 
      a: "Tras confirmar tu pago mediante Mercado Pago, el sistema procesa tu acceso de forma inmediata. Recibirás una invitación privada a tu correo electrónico (preferiblemente Gmail) para acceder a la carpeta exclusiva en Google Drive. También podrás ver el enlace directo en tu sección 'Mi Biblioteca'." 
    },
    { 
      q: "¿Cuánto tarda en llegar el acceso?", 
      a: "El proceso es automático y suele tardar entre 30 segundos y 5 minutos. Si pasados 15 minutos no has recibido el correo, revisa tu carpeta de Promociones o Spam. Si aún no está ahí, contáctanos por Telegram para activación manual instantánea." 
    },
    { 
      q: "¿Necesito conocimientos previos para usar el contenido?", 
      a: "Nuestras bibliotecas están diseñadas para ser prácticas. Incluimos guías de 'Inicio Rápido' en cada carpeta para que puedas aplicar los conocimientos desde el minuto uno, sin importar tu nivel actual." 
    },
    { 
      q: "¿Puedo descargar el contenido a mi computadora?", 
      a: "¡Sí! A diferencia de otras plataformas que te obligan a estar conectado, nosotros permitimos la descarga libre de todo el material. Puedes guardarlo en tus propios dispositivos para consultarlo offline." 
    },
    { 
      q: "¿Cuánto tiempo tengo acceso a la biblioteca?", 
      a: "El acceso es permanente (Vitalicio). No pagas membresías mensuales ni suscripciones raras. Un solo pago te garantiza el acceso y todas las actualizaciones futuras que añadamos a esa carpeta." 
    },
    { 
      q: "¿Qué pasa si el enlace de Drive deja de funcionar?", 
      a: "Contamos con sistemas de respaldo. Si un enlace llegara a tener problemas técnicos, nuestro soporte lo reemplaza en menos de 12 horas. Tu inversión está protegida." 
    },
    { 
      q: "¿Puedo compartir mi acceso con un amigo?", 
      a: "No. El acceso es personal e intransferible, vinculado al correo electrónico proporcionado en la compra. El sistema detecta accesos múltiples desde distintas ubicaciones y puede revocar el permiso si detecta uso fraudulento según nuestros términos." 
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="h-10 w-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">¿Cómo podemos ayudarte?</h1>
          <p className="text-slate-500 text-lg">Estamos aquí para que tu aprendizaje sea fluido y sin fricciones.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="bg-sky-100 p-4 rounded-2xl text-sky-600 mb-6">
              <Send className="h-8 w-8 -rotate-45" />
            </div>
            <h3 className="text-xl font-bold mb-2">Telegram Directo</h3>
            <p className="text-slate-500 text-sm mb-6">Ideal para activación manual de acceso o dudas rápidas de pago.</p>
            <button className="bg-sky-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-sky-600 transition-colors shadow-lg shadow-sky-100">
              Chatear en Telegram
            </button>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-2xl text-blue-600 mb-6">
              <Mail className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold mb-2">Soporte vía Email</h3>
            <p className="text-slate-500 text-sm mb-6">Para consultas de facturación, colaboraciones o soporte técnico profundo.</p>
            <button className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-100">
              ayuda@aulaexpress.com
            </button>
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border border-gray-100">
          <div className="flex items-center mb-10">
            <FileQuestion className="h-6 w-6 text-indigo-600 mr-4" />
            <h2 className="text-2xl font-bold text-slate-900">Preguntas Frecuentes</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className={`rounded-2xl border transition-all ${openFaq === idx ? 'border-indigo-200 bg-indigo-50/20' : 'border-gray-100 bg-white'}`}>
                <button 
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-bold transition-colors ${openFaq === idx ? 'text-indigo-600' : 'text-slate-900'}`}>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="h-5 w-5 text-indigo-400" /> : <ChevronDown className="h-5 w-5 text-slate-400" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-slate-600 text-sm leading-relaxed border-t border-gray-50 pt-4 mt-2">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Simple Contact Form */}
        <div className="mt-16 bg-slate-900 rounded-[2.5rem] p-10 lg:p-16 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-3xl font-extrabold mb-4 relative z-10">¿Aún tienes dudas?</h2>
          <p className="text-slate-400 mb-10 relative z-10">Nuestro equipo de soporte humano te responderá en tiempo récord.</p>
          <div className="max-w-md mx-auto relative z-10">
            <input 
              type="text" 
              placeholder="¿En qué podemos ayudarte?"
              className="w-full bg-slate-800 border border-slate-700 rounded-2xl py-5 px-6 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm"
            />
            <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-600 p-3 rounded-xl hover:bg-indigo-700 transition-colors">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;
