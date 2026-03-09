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

                    {/* Forgot password block */}
                    <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-sm">
                        <p className="font-bold text-amber-800 mb-1">¿Olvidaste o perdiste tu contraseña?</p>
                        <p className="text-amber-700 mb-3">Contáctanos por soporte y te ayudamos a restablecer el acceso a tus cursos.</p>
                        <a
                            href="https://t.me/AulaExpressSoporteBot"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-[#229ED9] hover:bg-[#1a8bbf] text-white font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-200"
                        >
                            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                            </svg>
                            Ir a Soporte en Telegram
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
