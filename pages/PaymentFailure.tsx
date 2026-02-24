import React, { useEffect, useState } from 'react';
import { XCircle, RefreshCw } from 'lucide-react';

interface PaymentFailureProps {
    onNavigate: (page: string, params?: any) => void;
}

const PaymentFailure: React.FC<PaymentFailureProps> = ({ onNavigate }) => {
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
                    <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse opacity-50 scale-125"></div>
                    <div className="relative bg-red-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-red-100">
                        <XCircle className="h-12 w-12 text-white" />
                    </div>
                </div>

                <h2 className="text-3xl font-black text-slate-900 mb-4 leading-tight uppercase tracking-tighter">Hubo un problema</h2>

                <p className="text-slate-600 mb-8 leading-relaxed">
                    No pudimos procesar tu pago. Por favor, intenta nuevamente o utiliza otro medio de pago.
                </p>

                {orderId && (
                    <p className="text-xs text-slate-400 mb-8 font-mono">
                        Orden: {orderId}
                    </p>
                )}

                <button
                    onClick={() => onNavigate('catalog')}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-slate-200 transition-all uppercase flex items-center justify-center"
                >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Volver al Catálogo
                </button>
            </div>
        </div>
    );
};

export default PaymentFailure;
