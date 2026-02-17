import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Course } from '../types';
import { CATEGORIES } from '../constants';
import { Plus, Trash2, Edit, Save, X, BookOpen, LogOut, Users, Shield, Smartphone, Loader2, RefreshCw, AlertTriangle, Upload } from 'lucide-react';
import AdminAuth from '../components/AdminAuth';
import AdminUsers from '../components/AdminUsers';
import * as QRCode from 'qrcode'; // Safer import

const Admin: React.FC = () => {
  const [session, setSession] = useState<any>(null);
  const [loadingSession, setLoadingSession] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Controls general panel access
  const [userRole, setUserRole] = useState<'admin' | 'staff' | null>(null); // Controls specific features
  const [checkingRole, setCheckingRole] = useState(false);
  const [activeTab, setActiveTab] = useState<'courses' | 'users'>('courses');
  
  // Security States
  const [isSetupRequired, setIsSetupRequired] = useState(false);
  const [isVerifyRequired, setIsVerifyRequired] = useState(false);
  
  // 2FA Setup/Verify Data
  const [mfaSecret, setMfaSecret] = useState<string>('');
  const [mfaQr, setMfaQr] = useState<string>('');
  const [mfaFactorId, setMfaFactorId] = useState<string>('');
  const [verificationCode, setVerificationCode] = useState('');
  const [securityError, setSecurityError] = useState<string | null>(null);
  const [securityLoading, setSecurityLoading] = useState(false);

  // --- COURSE STATE ---
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState<string | null>(null);
  const [availableCategories, setAvailableCategories] = useState<string[]>(CATEGORIES);
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [courseForm, setCourseForm] = useState<Partial<Course>>({
    title: '',
    slug: '',
    description: '',
    price: 0,
    category: CATEGORIES[0],
    level: 'Básico',
    language: 'Español',
    thumbnail: '',
    drive_link: ''
  });

  // --- AUTH & INIT ---
  useEffect(() => {
    initializeAdmin();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === 'SIGNED_OUT') {
        setSession(null);
        setIsAdmin(false);
        setIsSetupRequired(false);
        setIsVerifyRequired(false);
        setLoadingSession(false);
      } else if (_event === 'SIGNED_IN' && session) {
        initializeAdmin();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const initializeAdmin = async () => {
    setLoadingSession(true);
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      setSession(null);
      setLoadingSession(false);
      return;
    }

    setSession(session);

    // 1. Check Security (2FA)
    const securityStatus = await checkSecurity();
    if (securityStatus === 'SETUP_NEEDED') {
      setIsSetupRequired(true);
      initiateMfaEnrollment(); // Auto-start enrollment
      setLoadingSession(false);
      return;
    } else if (securityStatus === 'VERIFY_NEEDED') {
      setIsVerifyRequired(true);
      // We need to list factors to get the ID for verification
      const { data: factors } = await supabase.auth.mfa.listFactors();
      if (factors && factors.all.length > 0) {
        const totp = factors.all.find(f => f.factor_type === 'totp' && f.status === 'verified');
        if (totp) setMfaFactorId(totp.id);
      }
      setLoadingSession(false);
      return;
    }

    // 2. Check Admin Role (Only if security is OK)
    const hasRole = await checkAdminRole(session.user.id);
    if (hasRole) {
      setIsAdmin(true);
      if (activeTab === 'courses') fetchCourses();
    } else {
      setIsAdmin(false);
    }
    
    setLoadingSession(false);
  };

  const checkSecurity = async (): Promise<'OK' | 'SETUP_NEEDED' | 'VERIFY_NEEDED'> => {
    try {
      // Check enrollment
      const { data: factors, error } = await supabase.auth.mfa.listFactors();
      if (error) throw error;

      // Filter for VERIFIED factors only. 
      // If user has unverified factors, they need to complete setup or setup a new one.
      const verifiedFactors = factors?.all?.filter(f => f.status === 'verified') || [];

      if (verifiedFactors.length === 0) {
        return 'SETUP_NEEDED';
      }

      // Check Verification Level (AAL)
      const { data: aal, error: aalError } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
      if (aalError) throw aalError;

      if (aal && aal.currentLevel === 'aal1') {
         return 'VERIFY_NEEDED';
      }

      return 'OK';
    } catch (e) {
      console.error('Security check failed:', e);
      return 'VERIFY_NEEDED'; 
    }
  };

  const handleHardReset2FA = async () => {
    try {
      setSecurityLoading(true);
      if (!session?.user?.id) return;

      console.log('Ejecutando Hard Reset 2FA para:', session.user.id);
      // Llamada RPC al backend para borrar factores a la fuerza
      const { error } = await supabase.rpc('reset_user_2fa_by_admin', { 
        target_user_id: session.user.id 
      });

      if (error) throw error;

      alert('Configuración 2FA reseteada completamente. Se recargará la página.');
      window.location.reload();
    } catch (err: any) {
      console.error('Error Hard Reset:', err);
      setSecurityError('Error al resetear: ' + err.message);
    } finally {
      setSecurityLoading(false);
    }
  };

  const initiateMfaEnrollment = async () => {
    try {
      setSecurityLoading(true);
      setSecurityError(null);

      // 1. Intentar limpieza suave primero
      const { data: factors } = await supabase.auth.mfa.listFactors();
      if (factors && factors.all) {
        for (const factor of factors.all) {
          await supabase.auth.mfa.unenroll({ factorId: factor.id }).catch(e => console.warn('Soft cleanup error:', e));
        }
      }

      // 2. Enrolar nuevo factor
      const { data, error } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        friendlyName: `AdminPanel-${Date.now()}`,
      });
      
      if (error) throw error;

      setMfaFactorId(data.id);
      setMfaSecret(data.totp.secret);
      
      const qrUrl = await QRCode.toDataURL(data.totp.uri);
      setMfaQr(qrUrl);
    } catch (err: any) {
      console.error('Enroll error:', err);
      // Si el error es sobre "friendly name", sugerimos el hard reset
      setSecurityError('Error al iniciar 2FA: ' + (err.message || 'Error desconocido'));
    } finally {
      setSecurityLoading(false);
    }
  };

  const handleVerifyMfa = async (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityLoading(true);
    setSecurityError(null);

    try {
      if (isSetupRequired) {
        // Enrollment Verification
        const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
          factorId: mfaFactorId,
        });
        if (challengeError) throw challengeError;

        const { error: verifyError } = await supabase.auth.mfa.verify({
          factorId: mfaFactorId,
          challengeId: challengeData.id,
          code: verificationCode,
        });
        if (verifyError) throw verifyError;

        alert('2FA Activado Correctamente');
        setIsSetupRequired(false);
        // Re-run init to proceed to dashboard
        initializeAdmin();

      } else {
        // Session Verification
        const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({
          factorId: mfaFactorId,
        });
        if (challengeError) throw challengeError;

        const { error: verifyError } = await supabase.auth.mfa.verify({
          factorId: mfaFactorId,
          challengeId: challengeData.id,
          code: verificationCode,
        });
        if (verifyError) throw verifyError;

        setIsVerifyRequired(false);
        initializeAdmin();
      }
    } catch (err: any) {
      setSecurityError('Código incorrecto o expirado.');
    } finally {
      setSecurityLoading(false);
    }
  };

  const checkAdminRole = async (userId: string): Promise<boolean> => {
    setCheckingRole(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', userId)
      .single();
    
    setCheckingRole(false);
    
    // Permitir acceso a admin y staff
    if (data && (data.role === 'admin' || data.role === 'staff')) {
      setUserRole(data.role); // Guardamos el rol específico
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (session && isAdmin && activeTab === 'courses') {
      fetchCourses();
    }
  }, [activeTab]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setIsAdmin(false);
  };

  // --- COURSE FUNCTIONS ---
  const fetchCourses = async () => {
    setLoadingCourses(true);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error('Error fetching courses:', error);
    else {
      const fetchedCourses = data || [];
      setCourses(fetchedCourses);
      const existingCategories = Array.from(new Set(fetchedCourses.map((c: Course) => c.category)));
      setAvailableCategories(Array.from(new Set([...CATEGORIES, ...existingCategories])));
    }
    setLoadingCourses(false);
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const slug = courseForm.slug || courseForm.title?.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const courseData = {
      ...courseForm,
      slug,
      updated_at: new Date(),
      modules: courseForm.modules || [{ id: 'm1', title: 'Módulo 1: Recursos', lessons: ['Intro'] }]
    };

    if (editingCourseId) {
      const { error } = await supabase.from('courses').update(courseData).eq('id', editingCourseId);
      if (error) alert('Error updating: ' + error.message);
      else { setEditingCourseId(null); resetCourseForm(); fetchCourses(); }
    } else {
      const { error } = await supabase.from('courses').insert([courseData]);
      if (error) alert('Error creating: ' + error.message);
      else { resetCourseForm(); fetchCourses(); }
    }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm('¿Borrar curso?')) return;
    const { error } = await supabase.from('courses').delete().eq('id', id);
    if (error) alert('Error deleting'); else fetchCourses();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingImage(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      const { error: uploadError } = await supabase.storage
        .from('course-thumbnails')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('course-thumbnails')
        .getPublicUrl(filePath);

      setCourseForm(prev => ({ ...prev, thumbnail: publicUrl }));
    } catch (error: any) {
      alert('Error uploading image: ' + error.message);
    } finally {
      setUploadingImage(false);
    }
  };

  const resetCourseForm = () => {
    setCourseForm({
      title: '',
      slug: '',
      description: '',
      price: 0,
      category: availableCategories[0] || 'Programación',
      level: 'Básico',
      language: 'Español',
      thumbnail: '',
      drive_link: ''
    });
    setEditingCourseId(null);
    setIsCustomCategory(false);
  };

  // --- RENDER ---
  if (loadingSession || checkingRole) return <div className="flex justify-center items-center min-h-screen text-indigo-600 font-bold">Cargando panel...</div>;
  
  if (!session) return <AdminAuth onLoginSuccess={() => {}} />;

  // 2FA INTERCEPT SCREENS
  if (isSetupRequired) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600">
            <Smartphone className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Configura tu 2FA</h2>
          <p className="text-slate-500 text-sm mb-6">Para acceder al panel admin, debes proteger tu cuenta.</p>

          {mfaQr ? (
            <div className="mb-6 flex justify-center p-4 bg-white border border-gray-200 rounded-xl shadow-inner">
              <img src={mfaQr} alt="2FA QR Code" className="w-48 h-48" />
            </div>
          ) : (
            <div className="mb-6 h-48 flex items-center justify-center">
              {securityLoading ? <Loader2 className="animate-spin text-indigo-600" /> : <div className="text-slate-400 text-xs">Esperando QR...</div>}
            </div>
          )}

          <div className="mb-6 p-3 bg-gray-50 rounded-lg text-xs font-mono text-slate-500 break-all border border-gray-200">
            {mfaSecret || 'Generando secreto...'}
          </div>

          <form onSubmit={handleVerifyMfa} className="space-y-4">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full text-center text-2xl tracking-widest py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-mono"
              placeholder="000 000"
              autoFocus
            />
            {securityError && (
              <div className="flex flex-col items-center gap-3 my-4 w-full">
                <div className="bg-red-50 p-3 rounded-xl flex items-start gap-2 w-full">
                  <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={16} />
                  <p className="text-red-600 text-xs font-bold text-left flex-1">{securityError}</p>
                </div>
                
                <div className="flex flex-col gap-2 w-full">
                  <button
                    type="button"
                    onClick={initiateMfaEnrollment}
                    className="w-full text-indigo-600 text-xs font-bold hover:bg-indigo-50 py-3 rounded-xl border border-indigo-100 flex items-center justify-center transition-colors"
                  >
                    <RefreshCw size={14} className="mr-2" /> Reintentar Generación
                  </button>
                  
                  <button
                    type="button"
                    onClick={handleHardReset2FA}
                    className="w-full text-red-600 text-xs font-bold hover:bg-red-50 py-3 rounded-xl border border-red-100 flex items-center justify-center transition-colors"
                  >
                    <Trash2 size={14} className="mr-2" /> Restablecer Todo (Hard Reset)
                  </button>
                </div>
              </div>
            )}
            <button
              type="submit"
              disabled={securityLoading || verificationCode.length !== 6}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center disabled:opacity-70"
            >
              {securityLoading ? <Loader2 className="animate-spin" /> : 'Verificar y Continuar'}
            </button>
          </form>
          <button onClick={handleLogout} className="mt-4 text-sm text-slate-400 font-medium hover:text-slate-600">Cancelar</button>
        </div>
      </div>
    );
  }

  if (isVerifyRequired) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
            <Shield className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Verificación Requerida</h2>
          <p className="text-slate-500 text-sm mb-6">Tu sesión necesita validación de segundo factor.</p>

          <form onSubmit={handleVerifyMfa} className="space-y-4">
            <input
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="w-full text-center text-3xl tracking-[0.5em] py-4 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all font-mono"
              placeholder="000000"
              autoFocus
            />
            {securityError && <p className="text-red-500 text-sm font-bold">{securityError}</p>}
            <button
              type="submit"
              disabled={securityLoading || verificationCode.length !== 6}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center disabled:opacity-70"
            >
              {securityLoading ? <Loader2 className="animate-spin" /> : 'Validar Acceso'}
            </button>
          </form>
          <button onClick={handleLogout} className="mt-4 text-sm text-slate-400 font-medium hover:text-slate-600">Cerrar Sesión</button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md">
          <div className="text-red-500 mb-4 flex justify-center"><LogOut size={48} /></div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Acceso Denegado</h2>
          <p className="text-slate-500 mb-6">Esta cuenta no tiene permisos de administrador.</p>
          <button onClick={handleLogout} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-black text-slate-900">Panel Admin</h1>
            <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-bold">{session.user.email}</span>
          </div>
          <button onClick={handleLogout} className="text-slate-500 hover:text-red-600 flex items-center gap-2 text-sm font-bold transition-colors">
            <LogOut size={16} /> Salir
          </button>
        </div>
      </div>

      <div className="container mx-auto p-6">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab('courses')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              activeTab === 'courses' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'bg-white text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
            }`}
          >
            <BookOpen size={20} /> Gestionar Cursos
          </button>
          
          {userRole === 'admin' && (
            <button 
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
                activeTab === 'users' 
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                  : 'bg-white text-slate-500 hover:bg-indigo-50 hover:text-indigo-600'
              }`}
            >
              <Users size={20} /> Usuarios y Accesos
            </button>
          )}
        </div>

        {activeTab === 'users' && userRole === 'admin' ? (
          <AdminUsers />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* COURSE FORM */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                {editingCourseId ? <Edit size={20} className="text-indigo-600" /> : <Plus size={20} className="text-indigo-600" />}
                {editingCourseId ? 'Editar Curso' : 'Crear Nuevo Curso'}
              </h2>
              
              <form onSubmit={handleCourseSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Título</label>
                  <input
                    type="text"
                    value={courseForm.title || ''}
                    onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                    className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    required
                  />
                </div>
                {/* Price, Level & Language */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Precio</label>
                    <input
                      type="number"
                      value={courseForm.price || 0}
                      onChange={(e) => setCourseForm({...courseForm, price: parseFloat(e.target.value)})}
                      className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nivel</label>
                    <select
                      value={courseForm.level || 'Básico'}
                      onChange={(e) => setCourseForm({...courseForm, level: e.target.value as any})}
                      className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="Básico">Básico</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Avanzado">Avanzado</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Idioma</label>
                    <select
                      value={courseForm.language || 'Español'}
                      onChange={(e) => setCourseForm({...courseForm, language: e.target.value as any})}
                      className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    >
                      <option value="Español">Español</option>
                      <option value="Inglés">Inglés</option>
                    </select>
                  </div>
                </div>
                {/* Category */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Categoría</label>
                  <select
                    value={isCustomCategory ? 'NEW' : courseForm.category}
                    onChange={(e) => {
                      if (e.target.value === 'NEW') {
                        setIsCustomCategory(true);
                        setCourseForm({...courseForm, category: ''});
                      } else {
                        setIsCustomCategory(false);
                        setCourseForm({...courseForm, category: e.target.value});
                      }
                    }}
                    className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 mb-2"
                  >
                    {availableCategories.map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="NEW">+ Nueva Categoría</option>
                  </select>
                  {isCustomCategory && (
                    <input
                      type="text"
                      placeholder="Nombre de nueva categoría"
                      value={courseForm.category}
                      onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
                      className="w-full rounded-lg border-indigo-200 bg-indigo-50 focus:border-indigo-500 focus:ring-indigo-500"
                      autoFocus
                    />
                  )}
                </div>
                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Descripción</label>
                  <textarea
                    value={courseForm.description || ''}
                    onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                    rows={3}
                    className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                {/* Image & Drive */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Imagen (Subir o URL)</label>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <label className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg cursor-pointer hover:bg-indigo-100 transition-colors w-full border border-indigo-200 border-dashed">
                        <Upload size={18} />
                        <span className="text-sm font-bold">{uploadingImage ? 'Subiendo...' : 'Subir Imagen'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          className="hidden" 
                          disabled={uploadingImage}
                        />
                      </label>
                    </div>

                    <input
                      type="text"
                      placeholder="O pega una URL externa..."
                      value={courseForm.thumbnail || ''}
                      onChange={(e) => setCourseForm({...courseForm, thumbnail: e.target.value})}
                      className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    {courseForm.thumbnail && (
                      <div className="mt-2 relative w-full h-32 rounded-lg overflow-hidden border border-gray-200">
                        <img src={courseForm.thumbnail} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Link Drive</label>
                    <input
                      type="text"
                      value={courseForm.drive_link || ''}
                      onChange={(e) => setCourseForm({...courseForm, drive_link: e.target.value})}
                      className="w-full rounded-lg border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                      placeholder="https://drive.google.com/..."
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button type="submit" className="flex-1 bg-slate-900 text-white py-2 rounded-lg font-bold hover:bg-slate-800 flex justify-center items-center gap-2">
                    <Save size={18} /> {editingCourseId ? 'Actualizar' : 'Guardar Curso'}
                  </button>
                  {editingCourseId && (
                    <button type="button" onClick={resetCourseForm} className="px-4 bg-gray-100 text-slate-500 rounded-lg hover:bg-gray-200">
                      <X size={18} />
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* COURSE LIST */}
            <div className="space-y-4">
              {loadingCourses ? <p className="text-center text-slate-400">Cargando cursos...</p> : courses.map(course => (
                <div key={course.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center group hover:border-indigo-200 transition-all">
                  <div className="flex items-center gap-4">
                    <img src={course.thumbnail} className="w-12 h-12 rounded-lg object-cover bg-gray-100" alt="" />
                    <div>
                      <h3 className="font-bold text-slate-900 leading-tight">{course.title}</h3>
                      <p className="text-xs text-slate-500">{course.category} • ${course.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => { setEditingCourseId(course.id); setCourseForm(course); setIsCustomCategory(!availableCategories.includes(course.category)); }} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => deleteCourse(course.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {!loadingCourses && courses.length === 0 && <div className="text-center text-slate-400 py-10">No hay cursos creados</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
