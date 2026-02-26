
import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, X, BookOpen, Library, Instagram } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: string, params?: any) => void;
  currentUser: any;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentUser }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="bg-indigo-600 p-2 rounded-lg group-hover:bg-indigo-700 transition-colors">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="ml-2 text-xl font-bold text-slate-900">Aula<span className="text-indigo-600">Express</span></span>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '') onNavigate('catalog', { q: '' });
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onNavigate('catalog', { q: (e.target as HTMLInputElement).value });
                  }
                }}
                className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-full bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="¿Qué biblioteca quieres desbloquear?"
              />
            </div>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => onNavigate('catalog')} className="text-sm font-medium text-gray-600 hover:text-indigo-600">Explorar</button>
            <button onClick={() => onNavigate('library')} className="text-sm font-medium text-gray-600 hover:text-indigo-600 flex items-center">
              <Library className="h-4 w-4 mr-1.5 opacity-70" />
              Mi Biblioteca
            </button>
            <button onClick={() => onNavigate('support')} className="text-sm font-medium text-gray-600 hover:text-indigo-600">Soporte</button>
            <a href="https://www.instagram.com/aulaexpress_cursos/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>

            <div className="h-6 w-px bg-gray-200"></div>

            {currentUser ? (
              <button
                onClick={() => onNavigate('library')}
                className="flex items-center space-x-2 text-sm font-medium text-gray-700 bg-gray-100 px-4 py-2 rounded-full hover:bg-gray-200"
              >
                <User className="h-4 w-4" />
                <span>Mi Biblioteca</span>
              </button>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="bg-indigo-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-shadow hover:shadow-lg shadow-indigo-200/50"
              >
                Acceder
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 pb-4 pt-2 px-4 space-y-2">
          <button onClick={() => { onNavigate('catalog'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Catálogo</button>
          <button onClick={() => { onNavigate('library'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Mi Biblioteca</button>
          <button onClick={() => { onNavigate('support'); setIsOpen(false); }} className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md">Soporte</button>
          <div className="pt-2">
            <button
              onClick={() => { onNavigate('catalog'); setIsOpen(false); }}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold"
            >
              Ver Catálogo Completo
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
