
import React from 'react';
import { BookOpen, Instagram, Twitter, Facebook, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-6">
              <BookOpen className="h-8 w-8 text-indigo-400" />
              <span className="ml-3 text-2xl font-bold text-white">AulaExpress</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Democratizando el aprendizaje con bibliotecas digitales directas y de acceso inmediato. Pagás, recibís y aprendés en tu Drive.
            </p>
            <div className="flex space-x-4">
              <Instagram className="h-5 w-5 cursor-pointer hover:text-white" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-white" />
              <Facebook className="h-5 w-5 cursor-pointer hover:text-white" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Explorar</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">Todas las Bibliotecas</button></li>
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">Más Vendidos</button></li>
              <li><button onClick={() => onNavigate('catalog')} className="hover:text-white transition-colors">Nuevos Lanzamientos</button></li>
              <li><button onClick={() => onNavigate('library')} className="hover:text-white transition-colors">Mi Biblioteca Personal</button></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><button onClick={() => onNavigate('terms')} className="hover:text-white transition-colors">Términos y Condiciones</button></li>
              <li><button onClick={() => onNavigate('privacy')} className="hover:text-white transition-colors">Política de Privacidad</button></li>
              <li><button onClick={() => onNavigate('refunds')} className="hover:text-white transition-colors">Garantía y Reembolsos</button></li>
              <li><button onClick={() => onNavigate('support')} className="hover:text-white transition-colors">Preguntas Frecuentes</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6">Soporte</h4>
            <div className="space-y-4 text-sm">
              <p className="flex items-center"><Mail className="h-4 w-4 mr-2 text-indigo-400" /> ayuda@aulaexpress.com</p>
              <div className="bg-slate-800 p-4 rounded-xl">
                <p className="text-xs text-slate-400 mb-2">¿Necesitas ayuda rápida?</p>
                <button 
                  onClick={() => onNavigate('support')}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-bold transition-colors"
                >
                  Contactar Soporte
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>© 2024 AulaExpress. Todos los derechos reservados.</p>
          <div className="flex items-center mt-4 md:mt-0">
            <ShieldCheck className="h-4 w-4 mr-1 text-green-500" />
            <span>Pagos 100% seguros procesados por Mercado Pago</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
