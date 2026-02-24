import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, KeyRound, AlertCircle, ArrowRight } from 'lucide-react';

interface ForcePasswordChangeProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const ForcePasswordChange: React.FC<ForcePasswordChangeProps> = ({ onSuccess, onCancel }) => {
    const [newPassword, setNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const { error: updateError } = await supabase.auth.updateUser({
                password: newPassword,
                data: { must_change_password: false } // Eliminar el flag
            });

            if (updateError) throw updateError;
            onSuccess();
        } catch (err: any) {
            setError(err.message || 'Error al actualizar contraseña');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" />

            <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8">
                <div className="text-center mb-8">
                    <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-yellow-600 shadow-inner">
                        <KeyRound className="h-8 w-8" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 mb-2 leading-tight">Cambio Requerido</h2>
                    <p className="text-sm text-slate-500 font-medium">
                        Por tu seguridad, debes cambiar la contraseña temporal que te enviamos por correo.
                    </p>
                </div>

                {error && (
                    <div className="mb-6 bg-red-50 p-4 rounded-xl flex items-start text-red-600 text-sm font-bold border border-red-100">
                        <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                            Nueva Contraseña
                        </label>
                        <input
                            type="password"
                            autoFocus
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-100 text-slate-900 rounded-xl focus:outline-none focus:border-indigo-500 font-mono text-lg transition-colors placeholder:text-slate-300"
                            placeholder="••••••••"
                        />
                        <p className="text-[10px] text-slate-400 font-bold mt-2 float-right mr-1">
                            Mínimo 6 caracteres
                        </p>
                    </div>

                    <div className="pt-2 gap-3 flex flex-col">
                        <button
                            type="submit"
                            disabled={loading || !newPassword}
                            className="w-full bg-indigo-600 disabled:bg-slate-200 disabled:text-slate-400 hover:bg-indigo-700 text-white py-4 rounded-xl font-black text-sm shadow-xl shadow-indigo-100 transition-all flex items-center justify-center uppercase tracking-wider"
                        >
                            {loading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            ) : (
                                <>Guardar y Entrar <ArrowRight className="ml-2 h-4 w-4" /></>
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={loading}
                            className="w-full text-slate-400 hover:text-slate-600 text-xs font-bold uppercase tracking-wider transition-colors"
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForcePasswordChange;
