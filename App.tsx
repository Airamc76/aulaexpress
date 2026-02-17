
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import CourseDetail from './pages/CourseDetail';
import Library from './pages/Library';
import Player from './pages/Player';
import Support from './pages/Support';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Refunds from './pages/Refunds';
import Admin from './pages/Admin';
import { User, Course } from './types';

// Simple Router Hook Implementation
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname.substring(1);
    return path || 'home';
  });
  const [pageParams, setPageParams] = useState<any>({});
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'u1',
    name: 'Usuario Demo',
    email: 'demo@aulaexpress.com',
    purchasedCourses: ['c1', 'c2']
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.substring(1);
      setCurrentPage(path || 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page: string, params: any = {}) => {
    setCurrentPage(page);
    setPageParams(params);
    window.history.pushState({}, '', `/${page === 'home' ? '' : page}`);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'catalog':
        return <Catalog onNavigate={navigate} />;
      case 'courseDetail':
        return <CourseDetail slug={pageParams.slug} onNavigate={navigate} />;
      case 'library':
        return <Library onNavigate={navigate} />;
      case 'player':
        return <Player courseId={pageParams.courseId} onNavigate={navigate} />;
      case 'support':
        return <Support />;
      case 'terms':
        return <Terms />;
      case 'privacy':
        return <Privacy />;
      case 'refunds':
        return <Refunds />;
      case 'admin':
        return <Admin />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Don't show regular navbar/footer in player mode */}
      {currentPage !== 'player' && (
        <Navbar onNavigate={navigate} currentUser={currentUser} />
      )}
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      {currentPage !== 'player' && (
        <Footer onNavigate={navigate} />
      )}
    </div>
  );
};

export default App;
