
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
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentFailure from './pages/PaymentFailure';
import Login from './pages/Login';
import ForcePasswordChange from './components/ForcePasswordChange';
import { User, Course } from './types';
import { supabase } from './lib/supabase';

// Simple Router Hook Implementation
const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(() => {
    const path = window.location.pathname.substring(1);
    return path || 'home';
  });
  const [pageParams, setPageParams] = useState<any>({});
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<any>(null);
  const [mustChangePassword, setMustChangePassword] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setCurrentUser({ id: session.user.id, name: session.user.email?.split('@')[0] || 'User', email: session.user.email || '', purchasedCourses: [] });
        // Check if user must change password
        if (session.user.user_metadata?.must_change_password) {
          setMustChangePassword(true);
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session?.user) {
        setCurrentUser({ id: session.user.id, name: session.user.email?.split('@')[0] || 'User', email: session.user.email || '', purchasedCourses: [] });
        if (session.user.user_metadata?.must_change_password) {
          setMustChangePassword(true);
        } else {
          setMustChangePassword(false);
        }
      } else {
        setCurrentUser(null);
        setMustChangePassword(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.substring(1).split('?')[0]; // Remove query params from path for routing
      setCurrentPage(path || 'home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page: string, params: any = {}) => {
    setCurrentPage(page);
    setPageParams(params);

    // Construct URL with query parameters
    let url = `/${page === 'home' ? '' : page}`;
    if (Object.keys(params).length > 0) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        searchParams.set(key, String(value));
      });
      url += `?${searchParams.toString()}`;
    }

    window.history.pushState({}, '', url);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={navigate} />;
      case 'login':
        return <Login onNavigate={navigate} />;
      case 'catalog':
        return <Catalog onNavigate={navigate} searchQuery={pageParams.q} />;
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
      case 'payment/success':
      case 'checkout/success':
        return <PaymentSuccess onNavigate={navigate} />;
      case 'payment/failure':
      case 'checkout/failure':
      case 'payment/pending':
      case 'checkout/pending':
        return <PaymentFailure onNavigate={navigate} />;
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

      {mustChangePassword && (
        <ForcePasswordChange
          onSuccess={() => setMustChangePassword(false)}
          onCancel={() => supabase.auth.signOut()}
        />
      )}

      {currentPage !== 'player' && (
        <Footer onNavigate={navigate} />
      )}
    </div>
  );
};

export default App;
