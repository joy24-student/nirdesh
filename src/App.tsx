import React, { useState, useEffect } from 'react';
import { SiteProvider } from './context/SiteContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomeView } from './components/views/HomeView';
import { FeaturesView } from './components/views/FeaturesView';
import { CapabilitiesView } from './components/views/CapabilitiesView';
import { PricingView } from './components/views/PricingView';
import { DownloadView } from './components/views/DownloadView';
import { DocsView } from './components/views/DocsView';
import { SupportView } from './components/views/SupportView';
import { StatusView } from './components/views/StatusView';
import { AuthViews } from './components/views/AuthViews';
import { AboutView } from './components/views/AboutView';
import { AdminPanel } from './components/admin/AdminPanel';
import { NotFoundView } from './components/views/NotFoundView';

export const MainAppContent: React.FC = () => {
  const [activeView, setActiveView] = useState('home');
  const [authModal, setAuthModal] = useState<'signin' | 'signup' | null>(null);

  // Secret Unique Routing Listener for Admin Panel Access
  useEffect(() => {
    const handleUrlRoute = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      const path = window.location.pathname;

      if (
        hash.includes('admin-control-portal') ||
        hash.includes('admin') ||
        search.includes('route=admin-portal') ||
        search.includes('admin=true') ||
        path.includes('admin-control-portal')
      ) {
        setActiveView('admin');
      }
    };

    handleUrlRoute();
    window.addEventListener('hashchange', handleUrlRoute);
    window.addEventListener('popstate', handleUrlRoute);
    return () => {
      window.removeEventListener('hashchange', handleUrlRoute);
      window.removeEventListener('popstate', handleUrlRoute);
    };
  }, []);

  const handleSetView = (view: string) => {
    setActiveView(view);
    if (view === 'admin') {
      window.location.hash = '#/admin-control-portal';
    } else if (window.location.hash.includes('admin')) {
      window.location.hash = '';
    }
  };

  const renderCurrentView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView setActiveView={handleSetView} />;
      case 'features':
        return <FeaturesView />;
      case 'capabilities':
        return <CapabilitiesView />;
      case 'pricing':
        return <PricingView onSelectPlan={() => handleSetView('download')} />;
      case 'download':
        return <DownloadView />;
      case 'docs':
        return <DocsView />;
      case 'support':
        return <SupportView />;
      case 'status':
        return <StatusView />;
      case 'about':
        return <AboutView />;
      case 'admin':
        return <AdminPanel />;
      case 'privacy':
      case 'terms':
      case 'security':
        return <DocsView />;
      default:
        return <NotFoundView setActiveView={handleSetView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#02040A] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between">
      {/* Top Navbar (Public - Admin Button Hidden) */}
      <Navbar
        activeView={activeView}
        setActiveView={handleSetView}
        onOpenAuth={(mode) => setAuthModal(mode)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer setActiveView={handleSetView} />

      {/* Auth Modal Overlay */}
      {authModal && (
        <AuthViews
          mode={authModal}
          onClose={() => setAuthModal(null)}
          onSuccess={() => {}}
        />
      )}
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <SiteProvider>
      <MainAppContent />
    </SiteProvider>
  );
};

export default App;
