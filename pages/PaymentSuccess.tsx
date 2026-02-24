import React, { useEffect, useState } from 'react';
import { CheckCircle, Library } from 'lucide-react';

interface PaymentSuccessProps {
    onNavigate: (page: string, params?: any) => void;
}

const PaymentSuccess: React.FC<PaymentSuccessProps> = ({ onNavigate }) => {
    const [orderId, setOrderId] = useState<string | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('order_id') || urlParams.get('external_reference');
        setOrderId(id);
    }, []);

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50">
            <div className="bg-white p-10 max-w-md w-full rounded-[2rem] shadow-xl text-center">
                <div className="relative inline-block mb-8">
                    <div className="absolute inset-0 bg-green-100 rounded-full animate-pulse opacity-50 scale-125"></div>
                    <div className="relative bg-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-green-100">
                        <CheckCircle className="h-12 w-12 text-white" />
                    </div>
                </div>

                <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight uppercase tracking-tighter">¡Pago Exitoso!</h2>

                <p className="text-slate-600 mb-8 leading-relaxed">
                    Tu transacción se ha completado. Hemos enviado un correo con tus credenciales temporales de acceso y el enlace a tu curso.
                </p>

                {orderId && (
                    <p className="text-xs text-slate-400 mb-8 font-mono">
                        Orden: {orderId}
                    </p>
                )}

                <button
                    onClick={() => onNavigate('library')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-100 transition-all uppercase flex items-center justify-center"
                >
                    <Library className="mr-2 h-5 w-5" />
                    Ir a Mi Biblioteca
                </button>
            </div>
        </div>
    );
};

export default PaymentSuccess;
