import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Loader2, Mail, Lock, AlertCircle, Sparkles } from 'lucide-react';

interface LoginProps {
    onNavigate: (page: string) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            // Navigate to library on success
            onNavigate('library');
        } catch (err: any) {
            setError(err.message || 'Credenciales incorrectas');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 p-6">
            <div className="bg-white p-8 md:p-12 rounded-[2rem] shadow-xl max-w-md w-full border border-gray-100">

                <div className="text-center mb-10">
                    <div className="bg-indigo-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-indigo-200 transform -rotate-6">
                        <Sparkles className="text-white h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Acceso a Biblioteca</h2>
                    <p className="text-slate-500 font-medium mt-2">Ingresa con las credenciales que enviamos a tu correo.</p>
                </div>

                {error && (
                    <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-2xl flex items-start text-sm font-bold border border-red-100">
                        <AlertCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white"
                                placeholder="tu@correo.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-0 outline-none transition-all font-medium text-slate-900 bg-slate-50 focus:bg-white"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !email || !password}
                        className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-indigo-200 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed group"
                    >
                        {loading ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                            'Ingresar a mis cursos'
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-gray-100 text-center space-y-4">
                    <div className="bg-indigo-50 text-indigo-700 p-4 rounded-xl text-sm font-medium">
                        <p>¿Aún no tienes cuenta?</p>
                        <p className="mt-1">Para entrar al login, compra un curso y en el correo de entrega del curso, ¡también tendrás tus credenciales para tus cursos!</p>
                    </div>

                    <button
                        onClick={() => onNavigate('catalog')}
                        className="mt-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors inline-block"
                    >
                        Explorar Catálogo
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Login;
