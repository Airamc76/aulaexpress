import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, RefreshCw, Mail, CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';

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
    const [webhookLogs, setWebhookLogs] = useState<any[]>([]);
    const [emailLogs, setEmailLogs] = useState<any[]>([]);
    const [showLogs, setShowLogs] = useState(false);
    const [loadingLogs, setLoadingLogs] = useState(false);

    const fetchOrders = async () => {
        setLoading(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error("No session");

            const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL.replace(/\/$/, '');
            const functionUrl = `${supabaseUrl}/functions/v1/debug-db`;

            const res = await fetch(functionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                }
            });

            const data = await res.json();
            if (data.ok && data.orders) {
                setOrders((data.orders).map((o: any) => ({ ...o, email: o.buyer_email || o.email })) as unknown as Order[]);
            } else {
                setOrders([]);
            }
        } catch (e) {
            console.error('Error fetching orders from debug-db:', e);
            setOrders([]);
        }
        setLoading(false);
    };

    const fetchLogs = async () => {
        setLoadingLogs(true);
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error("No session");

            const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL.replace(/\/$/, '');
            const functionUrl = `${supabaseUrl}/functions/v1/debug-db`;

            const res = await fetch(functionUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                }
            });

            const data = await res.json();
            if (data.ok) {
                setWebhookLogs(data.logs || []);
                setEmailLogs(data.emailLogs || []);
            }
        } catch (e) {
            console.error('Error fetching debug logs:', e);
        }
        setLoadingLogs(false);
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

            // Dynamically get the function URL from environment
            const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL.replace(/\/$/, '');
            const functionUrl = `${supabaseUrl}/functions/v1/resend-credentials`;

            const res = await fetch(functionUrl, {
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
            fetchLogs(); // Refresh logs to see the new email entry
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
        <div className="space-y-6">
            {/* LOGS DIAGNOSTIC SECTION */}
            <div className="bg-white rounded-2xl shadow-sm border border-orange-100 overflow-hidden">
                <button
                    onClick={() => { if (!showLogs) fetchLogs(); setShowLogs(!showLogs); }}
                    className="w-full p-4 flex justify-between items-center bg-orange-50/50 hover:bg-orange-50 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <AlertTriangle className="text-orange-500" size={20} />
                        <h2 className="text-lg font-bold text-orange-900">Diagnóstico de Webhooks y Correos</h2>
                    </div>
                    <span className="text-orange-600 text-xs font-bold uppercase tracking-wider">
                        {showLogs ? 'Ocultar Diagnóstico' : 'Ver Logs de hoy'}
                    </span>
                </button>

                {showLogs && (
                    <div className="p-6 border-t border-orange-100 bg-white">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Webhook Logs */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center justify-between">
                                    Últimos Webhooks (MP)
                                    <button onClick={fetchLogs} className="text-indigo-600 font-bold text-[10px] uppercase hover:underline">Refrescar</button>
                                </h3>
                                <div className="space-y-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin">
                                    {webhookLogs.length === 0 ? (
                                        <p className="text-xs text-slate-400 italic">No hay logs recientes</p>
                                    ) : webhookLogs.map(log => (
                                        <div key={log.id} className="p-2 rounded bg-slate-50 border border-slate-100 text-[10px] font-mono">
                                            <div className="flex justify-between mb-1">
                                                <span className={`font-bold ${log.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                                                    [{log.step.toUpperCase()}] {log.status}
                                                </span>
                                                <span className="text-slate-400">{new Date(log.created_at).toLocaleTimeString()}</span>
                                            </div>
                                            <div className="text-slate-500 truncate">Payment: {log.payment_id}</div>
                                            {log.error && <div className="text-red-500 mt-1 whitespace-pre-wrap">Err: {log.error}</div>}
                                            {log.data && <div className="text-slate-400 mt-1 overflow-hidden h-12 hover:h-auto cursor-pointer transition-all">Data: {JSON.stringify(log.data)}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Email Logs */}
                            <div>
                                <h3 className="text-sm font-bold text-slate-700 mb-3 flex items-center justify-between">
                                    Últimos Envios de Email
                                    <button onClick={fetchLogs} className="text-indigo-600 font-bold text-[10px] uppercase hover:underline">Refrescar</button>
                                </h3>
                                <div className="space-y-2 max-h-96 overflow-y-auto pr-2 scrollbar-thin">
                                    {emailLogs.length === 0 ? (
                                        <p className="text-xs text-slate-400 italic">No hay envíos registrados</p>
                                    ) : emailLogs.map(log => (
                                        <div key={log.id} className="p-2 rounded bg-slate-50 border border-slate-100 text-[10px] font-mono">
                                            <div className="flex justify-between mb-1">
                                                <span className={`font-bold ${log.status === 'sent' ? 'text-green-600' : 'text-red-600'}`}>
                                                    {log.type.toUpperCase()}: {log.status}
                                                </span>
                                                <span className="text-slate-400">{new Date(log.created_at).toLocaleTimeString()}</span>
                                            </div>
                                            <div className="text-slate-500">To: {log.to_email}</div>
                                            {log.error && <div className="text-red-500 mt-1">Err: {log.error}</div>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ORDERS TABLE */}
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
                                            <button
                                                onClick={() => handleResendCredentials(order.id)}
                                                disabled={resendingId === order.id}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 font-bold text-xs rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                {resendingId === order.id ? <Loader2 className="animate-spin h-3.5 w-3.5" /> : <Mail className="h-3.5 w-3.5" />}
                                                Reenviar Credenciales
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;
