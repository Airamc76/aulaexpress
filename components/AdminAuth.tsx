import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Mail, Loader2, AlertCircle, Smartphone, Shield, ArrowRight } from 'lucide-react';
import QRCode from 'qrcode';

const AdminAuth: React.FC<{ onLoginSuccess: () => void }> = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Auth Flow States
  const [step, setStep] = useState<'LOGIN' | 'SETUP_2FA' | 'VERIFY_2FA'>('LOGIN');
  const [mfaSecret, setMfaSecret] = useState<string>('');
  const [mfaQr, setMfaQr] = useState<string>('');
  const [mfaFactorId, setMfaFactorId] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      // Check MFA Status
      const { data: factors, error: factorsError } = await supabase.auth.mfa.listFactors();
      if (factorsError) throw factorsError;

      if (!factors || !factors.all || factors.all.length === 0) {
        // Start Enrollment
        await startMfaEnrollment();
      } else {
        // Start Verification - Use the first verified TOTP factor
        const totpFactor = factors.all.find(f => f.factor_type === 'totp' && f.status === 'verified');
        if (totpFactor) {
          setMfaFactorId(totpFactor.id);
          setStep('VERIFY_2FA');
        } else {
           await startMfaEnrollment();
        }
      }
    } catch (err: any) {
      setError(err.message || 'Error de autenticación');
      setLoading(false);
    }
  };

  const startMfaEnrollment = async () => {
    try {
      setLoading(true);
      setError(null);

      // 1. Clean up stale/unverified factors first
      const { data: factors } = await supabase.auth.mfa.listFactors();
      if (factors && factors.all) {
        // If we are starting enrollment, it means we don't have a working verified factor.
        // So it's safe/recommended to clear stale unverified ones to prevent conflicts.
        const unverified = factors.all.filter(f => f.status === 'unverified' && f.factor_type === 'totp');
        for (const factor of unverified) {
           await supabase.auth.mfa.unenroll({ factorId: factor.id }).catch(e => console.warn('Cleanup error', e));
        }
      }

      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: `AdminAuth${Date.now()}`,
      });
      if (error) throw error;

      setMfaFactorId(data.id);
      setMfaSecret(data.totp.secret);
      
      // Generate QR Code
      const qrUrl = await QRCode.toDataURL(data.totp.uri);
      setMfaQr(qrUrl);
      
      setStep('SETUP_2FA');
    } catch (err: any) {
      setError('Error iniciando 2FA: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Create Challenge
      const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
        factorId: mfaFactorId,
      });
      if (challengeError) throw challengeError;

      // 2. Verify Code
      const { data, error: verifyError } = await supabase.auth.mfa.verify({
        factorId: mfaFactorId,
        challengeId: challengeData.id,
        code: verificationCode,
      });

      if (verifyError) throw verifyError;

      // Success!
      onLoginSuccess();
    } catch (err: any) {
      setError('Código inválido o expirado. Intenta de nuevo.');
      setLoading(false);
    }
  };

  if (step === 'SETUP_2FA') {
    return (
      <div className="min-h-[600px] flex items-center justify-center bg-gray-50 p-6 rounded-3xl">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 text-center">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
            <Smartphone className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Configurar 2FA</h2>
          <p className="text-slate-500 text-sm mb-6">Escanea el código QR con tu app de autenticación (Google Authenticator, Authy).</p>

          {mfaQr && (
            <div className="mb-6 flex justify-center p-4 bg-white border border-gray-200 rounded-xl shadow-inner">
              <img src={mfaQr} alt="2FA QR Code" className="w-48 h-48" />
            </div>
          )}

          <div className="mb-6 p-3 bg-gray-50 rounded-lg text-xs font-mono text-slate-500 break-all border border-gray-200">
            {mfaSecret}
          </div>

          <form onSubmit={verifyMfa} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Ingresa el código de 6 dígitos</label>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full text-center text-2xl tracking-widest py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-mono"
                placeholder="000 000"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            <button
              type="submit"
              disabled={loading || verificationCode.length !== 6}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Verificar y Activar'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (step === 'VERIFY_2FA') {
    return (
      <div className="min-h-[500px] flex items-center justify-center bg-gray-50 p-6 rounded-3xl">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Verificación de Seguridad</h2>
          <p className="text-slate-500 text-sm mb-8">Ingresa el código de tu aplicación de autenticación.</p>

          <form onSubmit={verifyMfa} className="space-y-6">
            <div>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full text-center text-3xl tracking-[0.5em] py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-mono"
                placeholder="000000"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            <button
              type="submit"
              disabled={loading || verificationCode.length !== 6}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center disabled:opacity-70"
            >
              {loading ? <Loader2 className="animate-spin" /> : 'Verificar Acceso'}
            </button>
          </form>
          <button 
             onClick={() => { setStep('LOGIN'); setEmail(''); setPassword(''); }}
             className="mt-6 text-slate-400 hover:text-slate-600 text-sm font-medium"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[500px] flex items-center justify-center bg-gray-50 p-6 rounded-3xl">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100">
        <div className="text-center mb-8">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
            <Lock className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Acceso Admin</h2>
          <p className="text-slate-500 text-sm mt-2">Gestiona tus cursos y usuarios</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-start text-sm">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="admin@aulaexpress.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Acceso restringido a administradores. 2FA requerido.
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
