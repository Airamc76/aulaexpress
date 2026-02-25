
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Wallet, Loader2, Mail, ExternalLink, Library, Zap, Lock, Key } from 'lucide-react';
import { Course } from '../types';
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
    <path fill="#fff" d="m349.44,220.97c-.45-.4-44.67-39.09-54.69-46.62-5.8-4.35-9.02-5.46-12.41-5.89-1.76-.23-4.2.1-5.9.57-4.66,1.27-10.75,5.34-16.16,9.63-5.6,4.46-10.88,8.66-15.79,9.76-6.26,1.4-13.91-.25-17.4-2.61-1.41-.95-2.41-2.05-2.89-3.16-1.29-2.99,1.09-5.38,1.48-5.78l12.2-13.2c1.42-1.41,2.85-2.83,4.31-4.23-3.94.51-7.58,1.52-11.12,2.5-4.42,1.24-8.68,2.42-12.98,2.42-1.8,0-11.42-1.58-13.25-2.07-11.05-3.02-23.56-5.97-38.04-12.73-17.35,12.91-28.65,28.77-32,46.56,2.49.66,9.02,2.15,10.71,2.52,39.26,8.73,51.49,17.72,53.71,19.6,2.4-2.67,5.87-4.36,9.73-4.36,4.35,0,8.26,2.19,10.64,5.56,2.25-1.78,5.35-3.3,9.36-3.29,1.82,0,3.71.34,5.62.98,4.43,1.52,6.72,4.47,7.9,7.14,1.48-.67,3.31-1.17,5.46-1.16,2.12,0,4.32.48,6.53,1.44,7.24,3.11,8.36,10.22,7.71,15.58.52-.06,1.04-.08,1.56-.08,8.58,0,15.56,6.98,15.56,15.57,0,2.66-.68,5.16-1.86,7.35,2.34,1.31,8.29,4.28,13.52,3.62,4.17-.53,5.76-1.95,6.32-2.76.39-.55.8-1.2.42-1.66l-11.08-12.3s-1.82-1.73-1.22-2.39c.62-.68, 1.75.3,2.55.96,5.64,4.71,12.52,11.81,12.52,11.81.12.08.57.98,3.12,1.43,2.19.39,6.07.17,8.76-2.04.67-.56,1.35-1.25,1.93-1.97-.05.04-.09.08-.13.1,2.84-3.63-.32-7.29-.32-7.29l-12.93-14.52s-1.85-1.71-1.22-2.4c.56-.6,1.75.3,2.56.98,4.09,3.42,9.88,9.23,15.42,14.66,1.09.79,5.96,3.8,12.41-.43,3.92-2.57,4.7-5.73,4.59-8.1-.27-3.15-2.73-5.4-2.73-5.4l-17.66-17.76s-1.87-1.59-1.21-2.4c.54-.68,1.75.3,2.55.96,5.62,4.71,20.86,18.68,20.86,18.68.22.15,5.48,3.9,11.99-.24,2.33-1.49,3.81-3.73,3.94-6.34.22-4.52-2.96-7.2-2.96-7.2Z" />
    <path fill="#fff" d="m263.76,243.48c-2.74-.03-5.74,1.6-6.13,1.36-.22-.14.17-1.24.42-1.88.27-.63,3.87-11.48-4.92-15.25-6.73-2.89-10.85.36-12.26,1.83-.37.38-.54.35-.58-.13-.14-1.96-1.01-7.24-6.82-9.02-8.3-2.54-13.64,3.25-14.99,5.35-.61-4.73-4.61-8.4-9.5-8.41-5.32,0-9.64,4.3-9.65,9.63,0,5.32,4.31,9.64,9.64,9.64,2.59,0,4.93-1.03,6.66-2.69.06.05.08.14.05.32-.41,2.39-1.15,11.04,7.92,14.57,3.64,1.41,6.73.36,9.29-1.43.76-.54.89-.31.78.41-.33,2.23.09,6.99,6.77,9.7,5.08,2.07,8.09-.04,10.07-1.87.86-.78,1.09-.65,1.14.56.24,6.44,5.59,11.56,12.09,11.57,6.7,0,12.13-5.41,12.13-12.1,0-6.7-5.42-12.06-12.12-12.13Z" />
  </svg>
);

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
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [processingError, setProcessingError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleNext = () => setStep(prev => prev + 1);

  const processPurchase = async () => {
    setStep(3); // Loading
    setProcessingError(null);

    try {
      console.log("Iniciando create-checkout para:", { courseId: course.id, email });
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          courseId: course.id,
          email: email,
        },
      });
      console.log("Respuesta create-checkout:", { data, error });

      if (error) throw error;

      if (data?.ok === false) {
        const details = data?.details ? ` (${data.details})` : '';
        const orderId = data?.orderId ? ` [orderId=${data.orderId}]` : '';
        throw new Error(`${data?.error || 'Error en create-checkout'}${details}${orderId}`);
      }

      const checkoutUrl = data?.init_point || data?.checkout_url;
      if (!checkoutUrl) throw new Error('No se pudo obtener el link de pago.');

      window.location.href = checkoutUrl;

    } catch (err: any) {
      console.error("Error purchase:", err);
      setProcessingError(err.message || "Error al procesar la compra");
      setStep(2); // Volver atrás
    }
  };

  const handleFinish = () => {
    onSuccess();
    onClose();
    setStep(1);
    setEmail('');
    setAccepted(false);
    setGeneratedPassword('');
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
                <p className="text-[10px] text-indigo-500 mt-2 font-bold uppercase tracking-tight">* ENVIAREMOS TUS CREDENCIALES AQUÍ</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <ul className="space-y-2">
                  <li className="flex items-center text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <Zap className="h-3 w-3 mr-2 text-yellow-500 fill-current" /> Incluye: Acceso Vitalicio
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
                  Acepto que este es un <span className="font-bold text-slate-900">Acceso Privado</span> de entrega inmediata.
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
              <div className="flex justify-center mb-6">
                <MercadoPagoLogo className="h-20 w-auto shrink-0 block" />
              </div>
              <p className="text-sm text-slate-600 mb-8 leading-relaxed">
                Estás a un paso de desbloquear la biblioteca. Tu pago de <span className="font-black text-slate-900">${course.price}</span> se procesará de forma 100% segura.
              </p>

              <button
                onClick={processPurchase}
                className="w-full bg-[#009EE3] hover:bg-[#0089c7] text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-blue-100 transition-all flex items-center justify-center uppercase tracking-tight"
              >
                👉 PAGAR Y DESBLOQUEAR
              </button>
            </div>

            {processingError && (
              <div className="mb-4 p-3 bg-red-50 text-red-500 text-xs font-bold rounded-xl">
                {processingError}
              </div>
            )}

            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-center space-x-2 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
                <ShieldCheck className="h-4 w-4 text-green-500" />
                <span>Pago Blindado por Mercado Pago</span>
              </div>
              <p className="text-[9px] text-slate-400 italic">"Tras el pago, el acceso se activa automáticamente."</p>
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
            <h3 className="text-2xl font-black text-slate-900 mb-2 uppercase tracking-tight">Procesando</h3>
            <p className="text-slate-400 text-sm font-medium animate-pulse">Creando cuenta y asignando permisos...</p>
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
            <p className="text-slate-500 text-sm mb-6 leading-relaxed font-medium">
              Hemos enviado un correo a <span className="text-indigo-600 font-bold">{email}</span>.
            </p>

            {generatedPassword && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-xl mb-6 text-left">
                <p className="text-xs text-yellow-800 font-bold mb-2 uppercase flex items-center"><Key className="h-3 w-3 mr-1" /> Tu Contraseña Temporal:</p>
                <div className="flex justify-between items-center bg-white p-2 rounded-lg border border-yellow-100">
                  <code className="text-lg font-mono font-bold text-slate-800">{generatedPassword}</code>
                  <span className="text-[10px] text-slate-400 uppercase">Copiar</span>
                </div>
                <p className="text-[10px] text-yellow-700 mt-2 leading-tight">Usa esta contraseña para entrar a tu biblioteca. Puedes cambiarla después.</p>
              </div>
            )}

            <div className="space-y-4">
              <button
                onClick={handleFinish}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-100 transition-all uppercase tracking-tight flex items-center justify-center"
              >
                ENTRAR A MI BIBLIOTECA
                <ExternalLink className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CheckoutModals;
