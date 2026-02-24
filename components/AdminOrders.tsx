import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, RefreshCw, Mail, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Order {
    id: string;
    email: string;
    course_id: string;
    status: string;
    created_at: string;
    courses: {
        title: string;
    };
}

const AdminOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [resendingId, setResendingId] = useState<string | null>(null);

    const fetchOrders = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('orders')
            .select('id, email, course_id, status, created_at, courses(title)')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching orders:', error);
        } else {
            setOrders(data as unknown as Order[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const handleResendCredentials = async (orderId: string) => {
        if (!confirm('¿Reenviar email con credenciales temporales al usuario?')) return;

        setResendingId(orderId);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error("No session");

            const res = await fetch('https://tudominio.supabase.co/functions/v1/resend-credentials', { // TODO: FIX URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({ orderId })
            });

            const data = await res.json();
            if (!data.ok) throw new Error(data.error || 'Error al reenviar');

            alert('Credenciales reenviadas con éxito.');
        } catch (err: any) {
            alert('Error: ' + err.message);
        } finally {
            setResendingId(null);
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'approved': return <CheckCircle className="text-green-500 h-5 w-5" />;
            case 'rejected': return <XCircle className="text-red-500 h-5 w-5" />;
            default: return <Clock className="text-yellow-500 h-5 w-5" />;
        }
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-bold text-slate-800">Ventas (Órdenes)</h2>
                <button
                    onClick={fetchOrders}
                    className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                    title="Actualizar Órdenes"
                >
                    <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-500">
                    <thead className="bg-slate-50 text-xs uppercase font-bold text-slate-600">
                        <tr>
                            <th className="px-6 py-4">Fecha</th>
                            <th className="px-6 py-4">Usuario (Email)</th>
                            <th className="px-6 py-4">Curso</th>
                            <th className="px-6 py-4 text-center">Estado MP</th>
                            <th className="px-6 py-4 text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {loading && orders.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">Cargando órdenes...</td></tr>
                        ) : orders.length === 0 ? (
                            <tr><td colSpan={5} className="px-6 py-8 text-center text-slate-400">No hay ventas registradas</td></tr>
                        ) : (
                            orders.map((order) => (
                                <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {new Date(order.created_at).toLocaleDateString()} <br />
                                        <span className="text-xs text-slate-400">{new Date(order.created_at).toLocaleTimeString()}</span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-slate-900">{order.email}</td>
                                    <td className="px-6 py-4">{order.courses?.title || 'Curso eliminado'}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex justify-center items-center gap-2">
                                            {getStatusIcon(order.status)}
                                            <span className="capitalize text-xs font-bold">{order.status === 'approved' ? 'Aprobado' : order.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {order.status === 'approved' && (
                                            <button
                                                onClick={() => handleResendCredentials(order.id)}
                                                disabled={resendingId === order.id}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 font-bold text-xs rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                {resendingId === order.id ? <Loader2 className="animate-spin h-3.5 w-3.5" /> : <Mail className="h-3.5 w-3.5" />}
                                                Reenviar Credenciales
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminOrders;
