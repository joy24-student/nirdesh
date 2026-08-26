import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, MEGA_MENU_CATEGORIES } from '../../config/siteData';
import { useSiteContext } from '../../context/SiteContext';
import { logoutUser } from '../../config/firebase';
import { 
  ArrowRight, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  User, 
  Download, 
  ShieldCheck, 
  LogOut
} from 'lucide-react';

interface NavbarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  onOpenAuth: (mode: 'signin' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeView, setActiveView, onOpenAuth }) => {
  const { siteConfig, currentUser, userRole, demoAdminMode, setCurrentUser } = useSiteContext();
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const banner = siteConfig.announcementBanner;
  const isAdmin = userRole === 'admin' || demoAdminMode;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: string) => {
    setActiveView(view);
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = async () => {
    await logoutUser();
    setCurrentUser(null);
    setUserDropdownOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      
      {/* Top Announcement Banner Alert if enabled */}
      {banner && banner.enabled && (
        <div className="bg-gradient-to-r from-cyan-950 via-indigo-950 to-purple-950 border-b border-cyan-500/30 text-white py-2 px-4 text-xs flex items-center justify-center gap-2 text-center shadow-lg relative z-50">
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold uppercase text-[10px] tracking-wider">
            {banner.badge}
          </span>
          <span className="text-slate-200 hidden sm:inline">{banner.text}</span>
          <button
            onClick={() => handleNavClick(banner.linkTarget || 'download')}
            className="font-bold text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>{banner.linkText || 'Learn More'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Main Navbar Bar */}
      <header
        className={`transition-all duration-300 ${
          scrolled
            ? 'bg-[#050813]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-cyan-950/20'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo Only (Larger Image, Extra Text Removed) */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center group text-left cursor-pointer focus:outline-none"
            >
              <img
                src="/asset/logo.png"
                alt="Nirdesh Logo"
                className="h-16 sm:h-20 w-auto max-w-[320px] object-contain group-hover:scale-105 transition-transform filter drop-shadow-[0_0_16px_rgba(0,200,255,0.5)]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </button>

            {/* Desktop Nav Items */}
            <nav className="hidden lg:flex items-center gap-1 bg-white/[0.03] border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
              {NAV_ITEMS.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasMegaMenu && setMegaMenuOpen(true)}
                  onMouseLeave={() => item.hasMegaMenu && setMegaMenuOpen(false)}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full transition-all cursor-pointer ${
                      activeView === item.href
                        ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                    {item.hasMegaMenu && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180 text-cyan-400' : ''}`} />
                    )}
                  </button>

                  {/* Mega Menu */}
                  {item.hasMegaMenu && megaMenuOpen && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[650px] p-6 glass-panel rounded-2xl border border-cyan-500/20 shadow-2xl animate-fadeIn grid grid-cols-2 gap-6 z-50">
                      {MEGA_MENU_CATEGORIES.map((cat) => (
                        <div key={cat.title} className="space-y-3">
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-cyan-400/90 border-b border-white/5 pb-1">
                            {cat.title}
                          </h4>
                          <div className="space-y-2">
                            {cat.items.map((sub) => (
                              <button
                                key={sub.name}
                                onClick={() => handleNavClick('features')}
                                className="w-full text-left p-2 rounded-xl hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 transition-all group cursor-pointer"
                              >
                                <div className="font-medium text-sm text-slate-200 group-hover:text-cyan-300">
                                  {sub.name}
                                </div>
                                <div className="text-xs text-slate-400 group-hover:text-slate-300 line-clamp-1">
                                  {sub.desc}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

            </nav>

            {/* Desktop Actions & User Controls */}
            <div className="hidden lg:flex items-center gap-3">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 px-3.5 py-2 rounded-full glass-panel border border-cyan-500/30 text-sm text-cyan-300 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <User className="w-4 h-4 text-cyan-400" />
                    <span className="max-w-[120px] truncate">{currentUser.displayName || currentUser.email}</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 p-2 glass-panel rounded-2xl border border-white/10 shadow-2xl z-50 space-y-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => onOpenAuth('signin')}
                  className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 rounded-full hover:bg-white/5 transition-all cursor-pointer"
                >
                  Sign In
                </button>
              )}

              <button
                onClick={() => handleNavClick('download')}
                className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white rounded-full bg-nirdesh-gradient hover:opacity-95 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Hamburger Toggle */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => handleNavClick('download')}
                className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
              >
                <Download className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-slate-200 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 top-[65px] bg-[#02040A]/95 backdrop-blur-2xl border-t border-white/10 p-6 flex flex-col justify-between overflow-y-auto animate-fadeIn z-40">
            <div className="space-y-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                    activeView === item.href
                      ? 'text-cyan-400 bg-cyan-500/10 border border-cyan-500/30'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </button>
              ))}

            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
              {!currentUser ? (
                <button
                  onClick={() => {
                    onOpenAuth('signin');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-xl glass-panel text-slate-200 font-medium text-center hover:bg-white/10"
                >
                  Sign In
                </button>
              ) : (
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-xl glass-panel text-rose-300 font-medium text-center hover:bg-rose-500/10 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out ({currentUser.displayName || currentUser.email})</span>
                </button>
              )}
              <button
                onClick={() => handleNavClick('download')}
                className="w-full py-3.5 rounded-xl bg-nirdesh-gradient text-white font-bold text-center flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30"
              >
                <span>Launch Nirdesh Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </header>
    </div>
  );
};
