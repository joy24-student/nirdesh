import React, { useState } from 'react';
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

  const renderCurrentView = () => {
    switch (activeView) {
      case 'home':
        return <HomeView setActiveView={setActiveView} />;
      case 'features':
        return <FeaturesView />;
      case 'capabilities':
        return <CapabilitiesView />;
      case 'pricing':
        return <PricingView onSelectPlan={() => setActiveView('download')} />;
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
        return <NotFoundView setActiveView={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#02040A] text-slate-100 font-sans selection:bg-cyan-500 selection:text-black flex flex-col justify-between">
      {/* Top Navbar */}
      <Navbar
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenAuth={(mode) => setAuthModal(mode)}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {renderCurrentView()}
      </main>

      {/* Footer */}
      <Footer setActiveView={setActiveView} />

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
