
import React from 'react';
import { RotateCcw, CheckCircle2, ShieldAlert, HeartHandshake, Zap, Lock, Download, Mail } from 'lucide-react';

const Refunds: React.FC = () => {
  return (
    <div className="bg-white min-h-screen py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-indigo-600">
          <Lock className="h-12 w-12" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Política de Acceso y Propiedad</h1>
        <p className="text-xl text-slate-500 mb-12 max-w-xl mx-auto leading-relaxed">
          En AulaExpress, al adquirir una biblioteca, recibes <span className="text-slate-900 font-bold">propiedad total e inmediata</span> del material. Por esta razón, nuestras políticas son claras y transparentes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mb-16">
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <div className="flex items-center mb-4 text-indigo-600">
              <Download className="h-6 w-6 mr-3" />
              <h3 className="text-xl font-bold">Propiedad Vitalicia</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Al ser un producto digital con acceso directo a archivos descargables, el contenido pasa a ser de tu propiedad exclusiva en el momento de la entrega. Puedes guardarlo, consultarlo y usarlo para siempre.
            </p>
          </div>
          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <div className="flex items-center mb-4 text-red-500">
              <ShieldAlert className="h-6 w-6 mr-3" />
              <h3 className="text-xl font-bold">Venta Final</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">
              Debido a la naturaleza de los bienes digitales y la imposibilidad de "devolver" un acceso ya otorgado, <span className="font-bold text-slate-900">no se realizan reembolsos</span> una vez que el acceso ha sido enviado a tu correo.
            </p>
          </div>
        </div>

        <div className="bg-indigo-600 text-white p-10 rounded-[2.5rem] text-left relative overflow-hidden shadow-2xl shadow-indigo-100">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Zap className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-6 flex items-center italic">
              Nuestro Compromiso de Entrega
            </h3>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
              Aunque no realizamos devoluciones por "arrepentimiento de compra" debido a que el material queda en tu poder, nuestro <span className="font-bold text-white">Compromiso de Calidad</span> te protege al 100%:
            </p>
            <ul className="space-y-4 text-sm text-indigo-50">
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-3 text-green-300 shrink-0" />
                <span><strong>Acceso Asegurado:</strong> Si por algún error técnico no recibes tu acceso en 24 horas, nuestro equipo lo resolverá manualmente de inmediato.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-3 text-green-300 shrink-0" />
                <span><strong>Calidad del Enlace:</strong> Si un enlace de Drive llegara a caerse, lo repondremos por uno nuevo sin costo alguno para ti.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="h-5 w-5 mr-3 text-green-300 shrink-0" />
                <span><strong>Soporte 24/7:</strong> Tienes asistencia humana vía Telegram para cualquier duda sobre el material.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-slate-400 text-sm font-medium">
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-2" />
            ayuda@aulaexpress.com
          </div>
          <div className="hidden md:block w-1.5 h-1.5 bg-slate-200 rounded-full"></div>
          <p>Transacciones protegidas por Mercado Pago</p>
        </div>
      </div>
    </div>
  );
};

export default Refunds;
