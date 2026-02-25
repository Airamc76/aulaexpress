
import React, { useState, useEffect } from 'react';
/* Added ChevronDown to the lucide-react imports */
import { ArrowLeft, Play, Lock, CheckCircle, FileText, Download, ShieldCheck, ChevronRight, Library, Share2, Info, ChevronDown } from 'lucide-react';
import { Course } from '../types';
import { supabase } from '../lib/supabase';

interface PlayerProps {
  course?: Course;
  courseId?: string;
  onNavigate: (page: string, params?: any) => void;
}

const Player: React.FC<PlayerProps> = ({ course: initialCourse, courseId, onNavigate }) => {
  const [course, setCourse] = useState<Course | undefined>(initialCourse);
  const [activeLesson, setActiveLesson] = useState<string>('');
  const [loading, setLoading] = useState(!initialCourse);

  useEffect(() => {
    if (!course && courseId) {
      fetchCourse();
    } else if (course && course.modules?.[0]?.lessons?.[0]) {
      setActiveLesson(course.modules[0].lessons[0]);
      setLoading(false);
    }
  }, [courseId, course]);

  const fetchCourse = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('courses')
      .select('*')
      .eq('id', courseId)
      .single();

    if (error) {
      console.error('Error fetching course:', error);
    } else if (data) {
      setCourse(data);
      if (data.modules?.[0]?.lessons?.[0]) {
        setActiveLesson(data.modules[0].lessons[0]);
      }
    }
    setLoading(false);
  };

  if (loading) return <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center">Cargando...</div>;
  if (!course) return <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center">Curso no encontrado</div>;

  return (
    <div className="bg-[#0F172A] min-h-screen text-white flex flex-col">
      {/* Navigation Header */}
      <div className="bg-[#1E293B]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onNavigate('library')}
            className="p-2.5 hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex flex-col">
            <h1 className="text-sm font-bold text-white truncate max-w-[200px] md:max-w-md leading-none mb-1">
              {course.title}
            </h1>
            <p className="text-[10px] text-indigo-400 font-black uppercase tracking-widest">Biblioteca Privada Desbloqueada</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center bg-green-500/10 text-green-400 px-3 py-1.5 rounded-lg border border-green-500/20 text-[10px] font-black uppercase tracking-wider">
            <ShieldCheck className="h-3 w-3 mr-2" />
            Acceso Verificado
          </div>
          <button className="p-2.5 hover:bg-white/10 rounded-xl transition-all border border-transparent hover:border-white/10">
            <Share2 className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-black/40">
          <div className="max-w-[1200px] mx-auto p-4 md:p-8">

            {/* Virtual Player Area */}
            <div className="aspect-video w-full rounded-3xl overflow-hidden bg-slate-900 shadow-2xl relative mb-8 group ring-1 ring-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 to-slate-900/40"></div>
              <img
                src={course.thumbnail}
                className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000"
                alt=""
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="relative mb-8">
                  <div className="absolute inset-0 bg-indigo-600 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                  <button className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 group/play">
                    <Play className="h-10 w-10 text-indigo-600 fill-current ml-1 transition-transform group-hover/play:scale-110" />
                  </button>
                </div>

                <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight">
                  {activeLesson}
                </h3>
                <p className="text-slate-400 text-sm md:text-base font-medium italic max-w-md opacity-80 mb-8">
                  "Contenido exclusivo para tu biblioteca personal. Acceso directo configurado."
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4">
                  <a
                    href={course.drive_link || "#"}
                    target="_blank"
                    rel="noreferrer"
                    className={`bg-indigo-600 hover:bg-indigo-700 px-8 py-3.5 rounded-2xl font-black text-sm transition-all shadow-xl shadow-indigo-600/20 flex items-center ${!course.drive_link ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Cargar Recursos Drive
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* Overlay info */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest">
                <span>Sesión Protegida: v3.4</span>
                <span className="flex items-center"><Info className="h-3 w-3 mr-1" /> Solo para uso personal</span>
              </div>
            </div>

            {/* Content Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="text-2xl font-black mb-4 flex items-center">
                    <Library className="h-6 w-6 mr-3 text-indigo-500" />
                    Sobre esta lección
                  </h2>
                  <p className="text-slate-400 leading-relaxed font-medium">
                    Estás visualizando el material de la biblioteca privada. Todo el contenido está optimizado para aplicación rápida. Si necesitas los archivos editables, puedes encontrarlos en la sección de recursos.
                  </p>
                </div>

                <div className="bg-[#1E293B] p-8 rounded-[2.5rem] border border-white/5 shadow-xl">
                  <h4 className="font-black text-sm uppercase tracking-widest text-indigo-400 mb-6 flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Archivos de Trabajo (Drive)
                  </h4>
                  <div className="space-y-4">
                    {[
                      { name: 'Guía Maestra de Implementación.pdf', type: 'PDF' },
                      { name: 'Planilla de Seguimiento Pro.xlsx', type: 'Excel' },
                      { name: 'Templates de Acción Rápida.zip', type: 'ZIP' }
                    ].map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-[#0F172A] rounded-2xl border border-white/5 hover:border-indigo-500/50 transition-all cursor-pointer group">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center mr-4 group-hover:bg-indigo-600/20 transition-colors">
                            <FileText className="h-5 w-5 text-slate-400 group-hover:text-indigo-400" />
                          </div>
                          <div>
                            <p className="text-sm font-bold group-hover:text-indigo-400 transition-colors">{file.name}</p>
                            <p className="text-[10px] font-bold text-slate-500 uppercase">{file.type} • DESCARGA DISPONIBLE</p>
                          </div>
                        </div>
                        <Download className="h-5 w-5 text-slate-600 group-hover:text-indigo-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-8 rounded-[2.5rem] shadow-2xl shadow-indigo-600/10">
                  <h4 className="font-black text-sm uppercase mb-4 tracking-tighter">Soporte Prioritario</h4>
                  <p className="text-sm text-indigo-100/70 mb-8 leading-relaxed font-medium">¿Tienes alguna duda técnica con este módulo? Nuestro equipo responde en tiempo récord vía Telegram.</p>
                  <button className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-black text-sm transition-all hover:scale-[1.02] shadow-xl">
                    Chatear con un Tutor
                  </button>
                </div>

                <div className="bg-[#1E293B] p-6 rounded-[2rem] border border-white/5">
                  <h4 className="font-black text-xs uppercase text-slate-500 tracking-widest mb-4">Acceso Permanente</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed italic">"Tu acceso a esta biblioteca es permanente. Si tienes problemas para visualizar un archivo, escríbenos a ayuda@aulaexpress.com"</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="w-full lg:w-[420px] bg-[#1E293B] border-l border-white/5 flex flex-col h-[50vh] lg:h-full">
          <div className="p-8 border-b border-white/5">
            <h3 className="font-black text-xl mb-6 tracking-tight">Estructura del Contenido</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-500">
                <span>Tu Progreso</span>
                <span className="text-indigo-400">15% Completado</span>
              </div>
              <div className="h-2 w-full bg-[#0F172A] rounded-full overflow-hidden p-0.5">
                <div className="h-full bg-indigo-500 w-[15%] rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {course.modules.map((module, mIdx) => (
              <div key={module.id} className="border-b border-white/5 last:border-0">
                <div className="bg-[#1E293B] px-8 py-5 flex items-center justify-between group">
                  <div>
                    <p className="text-[10px] font-black text-indigo-400/60 uppercase tracking-widest mb-1">Módulo 0{mIdx + 1}</p>
                    <h4 className="font-black text-sm text-slate-200 group-hover:text-white transition-colors">{module.title}</h4>
                  </div>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </div>
                <div className="bg-[#0F172A]/30">
                  {module.lessons.map((lesson, lIdx) => (
                    <button
                      key={lIdx}
                      onClick={() => setActiveLesson(lesson)}
                      className={`w-full text-left px-8 py-5 flex items-start transition-all border-l-4 ${activeLesson === lesson ? 'bg-indigo-600/10 border-indigo-500' : 'border-transparent hover:bg-white/5'}`}
                    >
                      <div className={`shrink-0 mt-0.5 mr-5 h-6 w-6 rounded-lg flex items-center justify-center transition-all ${activeLesson === lesson ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'bg-[#1E293B] text-slate-500'}`}>
                        {activeLesson === lesson ? <Play className="h-2.5 w-2.5 fill-current" /> : <div className="h-1.5 w-1.5 rounded-full bg-slate-600"></div>}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-bold leading-tight ${activeLesson === lesson ? 'text-white' : 'text-slate-400'}`}>{lesson}</p>
                        <div className="flex items-center mt-2 space-x-3">
                          <span className="text-[10px] font-black text-slate-600 uppercase">12:45 min</span>
                          {lIdx === 0 && mIdx === 0 && <span className="text-[9px] bg-green-500/10 text-green-400 px-1.5 py-0.5 rounded-md border border-green-500/20 font-black uppercase">Visto</span>}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.1); }
      `}</style>
    </div>
  );
};

const ExternalLink = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

export default Player;
