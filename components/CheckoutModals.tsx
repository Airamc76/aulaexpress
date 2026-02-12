
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Wallet, Loader2, Mail, ExternalLink, Library, Zap } from 'lucide-react';
import { Course } from '../types';

interface CheckoutModalsProps {
  isOpen: boolean;
  course: Course;
  onClose: () => void;
  onSuccess: () => void;
}

const CheckoutModals: React.FC<CheckoutModalsProps> = ({ isOpen, course, onClose, onSuccess }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [accepted, setAccepted] = useState(false);

  if (!isOpen) return null;

  const handleNext = () => setStep(prev => prev + 1);

  const simulatePayment = () => {
    setStep(3); // Start loading
    setTimeout(() => {
      setStep(4); // Success
    }, 2500);
  };

  const handleFinish = () => {
    onSuccess();
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={step < 3 ? onClose : undefined}></div>
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* Step 1: Resumen de Compra */}
        {step === 1 && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-slate-900">Configurar Acceso</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors"><X className="h-6 w-6" /></button>
            </div>

            <div className="flex items-center p-4 bg-indigo-50 rounded-2xl mb-6 border border-indigo-100">
              <div className="bg-indigo-600 p-3 rounded-xl">
                <Library className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4 overflow-hidden">
                <p className="text-[10px] font-black text-indigo-900 uppercase tracking-widest opacity-60">TU BIBLIOTECA DIGITAL</p>
                <p className="text-sm font-bold text-indigo-700 truncate">{course.title}</p>
              </div>
            </div>

            <div className="space-y-5 mb-8">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email para Invitación Drive</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-300" />
                  <input 
                    type="email" 
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-600 focus:outline-none transition-all font-medium text-slate-900 placeholder:text-slate-300 shadow-sm"
                    placeholder="ejemplo@gmail.com"
                  />
                </div>
                <p className="text-[10px] text-indigo-500 mt-2 font-bold uppercase tracking-tight">* SE RECOMIENDA GMAIL PARA ACCESO INSTANTÁNEO</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <ul className="space-y-2">
                  <li className="flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <Zap className="h-3 w-3 mr-2 text-yellow-500 fill-current" /> Incluye: Acceso Vitalicio
                  </li>
                  <li className="flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <Zap className="h-3 w-3 mr-2 text-yellow-500 fill-current" /> Incluye: Descarga Directa
                  </li>
                </ul>
              </div>

              <label className="flex items-start space-x-3 cursor-pointer group">
                <div className="mt-1 relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="h-5 w-5 rounded-lg border-2 border-slate-200 text-indigo-600 focus:ring-indigo-500 cursor-pointer" 
                  />
                </div>
                <span className="text-xs text-slate-500 leading-snug group-hover:text-slate-700 transition-colors">
                  Acepto que este es un <span className="font-bold text-slate-900">Acceso Privado</span> y que cuento con 7 días de garantía de satisfacción total.
                </span>
              </label>
            </div>

            <button 
              disabled={!email || !accepted}
              onClick={handleNext}
              className="w-full bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed hover:bg-indigo-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 transition-all flex flex-col items-center justify-center leading-tight px-4 group"
            >
              <span>CONTINUAR AL DESBLOQUEO</span>
              <span className="text-[10px] opacity-70 group-disabled:opacity-0">VALOR REAL: $1,135 | HOY: ${course.price}</span>
            </button>
          </div>
        )}

        {/* Step 2: Método de Pago */}
        {step === 2 && (
          <div className="p-8 text-center">
            <div className="flex justify-between items-center mb-6 text-left">
              <h3 className="text-xl font-bold text-slate-900">Pasarela Segura</h3>
              <button onClick={() => setStep(1)} className="text-slate-400 hover:text-indigo-600 text-xs font-bold uppercase tracking-widest">Atrás</button>
            </div>

            <div className="bg-blue-50/50 p-8 rounded-[2rem] mb-8 border border-blue-100">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a2/Logo_Mercado_Pago.png" className="h-8 mx-auto mb-6" alt="Mercado Pago" />
              <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                Estás a un paso de desbloquear la biblioteca. Tu pago de <span className="font-black text-slate-900">${course.price}</span> se procesará de forma 100% segura.
              </p>
              
              <button 
                onClick={simulatePayment}
                className="w-full bg-[#009EE3] hover:bg-[#0089c7] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 transition-all flex items-center justify-center uppercase tracking-tight"
              >
                👉 DESBLOQUEAR TODO AHORA
              </button>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center space-x-2 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>Pago Blindado por Mercado Pago</span>
              </div>
              <p className="text-[9px] text-slate-400 italic">"Tras el pago, el acceso se activa automáticamente en tu Drive."</p>
            </div>
          </div>
        )}

        {/* Step 3: Procesando */}
        {step === 3 && (
          <div className="p-16 text-center">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-25"></div>
              <div className="relative bg-white p-6 rounded-full border border-indigo-100 shadow-lg">
                <Loader2 className="h-12 w-12 text-indigo-600 animate-spin" />
              </div>
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Verificando Pago</h3>
            <p className="text-slate-400 text-sm font-medium animate-pulse">Sincronizando con Mercado Pago...</p>
          </div>
        )}

        {/* Step 4: Confirmado */}
        {step === 4 && (
          <div className="p-10 text-center">
            <div className="relative inline-block mb-8">
               <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse opacity-50 scale-125"></div>
               <div className="relative bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-100">
                 <CheckCircle className="h-12 w-12 text-white" />
               </div>
            </div>
            <h3 className="text-3xl font-black text-slate-900 mb-3 leading-tight uppercase tracking-tighter italic">¡ACCESO ACTIVADO!</h3>
            <p className="text-slate-500 text-sm mb-10 leading-relaxed font-medium">
              Felicidades. Hemos habilitado los permisos de tu Biblioteca Privada para <span className="text-indigo-600 font-bold">{email}</span>. Ya puedes entrar a explorar todo el material.
            </p>
            
            <div className="space-y-4">
              <button 
                onClick={handleFinish}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 transition-all uppercase tracking-tight flex items-center justify-center"
              >
                ENTRAR A MI BIBLIOTECA
                <ExternalLink className="ml-2 h-5 w-5" />
              </button>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">También recibirás un email con los enlaces directos.</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CheckoutModals;
