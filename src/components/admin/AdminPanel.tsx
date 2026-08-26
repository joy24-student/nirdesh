import React, { useState, useEffect } from 'react';
import { useSiteContext, SiteConfig } from '../../context/SiteContext';
import { fetchUsersListFromFirestore, updateUserRoleInFirestore } from '../../config/firebase';
import { 
  ShieldCheck, 
  Save, 
  RotateCcw, 
  CheckCircle2, 
  Sparkles, 
  LayoutDashboard, 
  Tv2, 
  Grid, 
  DollarSign, 
  HelpCircle, 
  Megaphone, 
  Download, 
  Users, 
  Sliders, 
  Plus, 
  Trash2, 
  AlertCircle,
  Activity,
  Zap,
  Lock,
  Globe,
  Radio
} from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { 
    siteConfig, 
    saveConfig, 
    resetToDefaults, 
    demoAdminMode, 
    setDemoAdminMode,
    isFirebaseConnected 
  } = useSiteContext();

  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'hero' | 'bento' | 'pricing' | 'faq' | 'banner' | 'downloads' | 'users'
  >('dashboard');

  const [formData, setFormData] = useState<SiteConfig>(siteConfig);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Sync formData with siteConfig when siteConfig changes externally via Firestore
  useEffect(() => {
    setFormData(siteConfig);
  }, [siteConfig]);

  // Load users list when Users tab is clicked
  useEffect(() => {
    if (activeTab === 'users') {
      loadUsers();
    }
  }, [activeTab]);

  const loadUsers = async () => {
    setLoadingUsers(true);
    const users = await fetchUsersListFromFirestore();
    setUsersList(users);
    setLoadingUsers(false);
  };

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleSave = async () => {
    setSaving(true);
    const success = await saveConfig(formData);
    setSaving(false);
    if (success) {
      showToast('Successfully published all changes to Firebase & Frontend!');
    } else {
      showToast('Saved locally. (Note: Set real VITE_FIREBASE_API_KEY for cloud Firestore storage)', 'success');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all site configuration to factory defaults?')) {
      setSaving(true);
      await resetToDefaults();
      setSaving(false);
      showToast('Reset all site configuration to defaults!');
    }
  };

  const handleRoleToggle = async (uid: string, currentRole: string) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    await updateUserRoleInFirestore(uid, newRole);
    setUsersList((prev) =>
      prev.map((u) => (u.uid === uid ? { ...u, role: newRole } : u))
    );
    showToast(`Updated user role to ${newRole}`);
  };

  // Handlers for dynamic list edits
  const updateHeroField = (field: keyof SiteConfig['hero'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [field]: value }
    }));
  };

  const updateCapabilityCard = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const cards = [...prev.capabilityCards];
      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, capabilityCards: cards };
    });
  };

  const updateBentoCard = (index: number, field: string, value: string) => {
    setFormData((prev) => {
      const cards = [...prev.bentoCards];
      cards[index] = { ...cards[index], [field]: value };
      return { ...prev, bentoCards: cards };
    });
  };

  const updatePricingTier = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      const tiers = [...prev.pricingTiers];
      tiers[index] = { ...tiers[index], [field]: value };
      return { ...prev, pricingTiers: tiers };
    });
  };

  const updatePricingFeature = (tierIndex: number, featureIndex: number, value: string) => {
    setFormData((prev) => {
      const tiers = [...prev.pricingTiers];
      const features = [...tiers[tierIndex].features];
      features[featureIndex] = value;
      tiers[tierIndex] = { ...tiers[tierIndex], features };
      return { ...prev, pricingTiers: tiers };
    });
  };

  const addPricingFeature = (tierIndex: number) => {
    setFormData((prev) => {
      const tiers = [...prev.pricingTiers];
      const features = [...tiers[tierIndex].features, 'New feature item'];
      tiers[tierIndex] = { ...tiers[tierIndex], features };
      return { ...prev, pricingTiers: tiers };
    });
  };

  const deletePricingFeature = (tierIndex: number, featureIndex: number) => {
    setFormData((prev) => {
      const tiers = [...prev.pricingTiers];
      const features = tiers[tierIndex].features.filter((_, i) => i !== featureIndex);
      tiers[tierIndex] = { ...tiers[tierIndex], features };
      return { ...prev, pricingTiers: tiers };
    });
  };

  const updateFaq = (index: number, field: 'q' | 'a', value: string) => {
    setFormData((prev) => {
      const faqs = [...prev.faqItems];
      faqs[index] = { ...faqs[index], [field]: value };
      return { ...prev, faqItems: faqs };
    });
  };

  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqItems: [...prev.faqItems, { q: 'New Frequently Asked Question', a: 'Answer text goes here.' }]
    }));
  };

  const deleteFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqItems: prev.faqItems.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-[#02040A] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Toast Banner */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-xl flex items-center gap-3 animate-fadeIn ${
          toastMessage.type === 'success' 
            ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200' 
            : 'bg-rose-950/90 border-rose-500/50 text-rose-200'
        }`}>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold text-sm">{toastMessage.text}</span>
        </div>
      )}

      {/* Admin Panel Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400">
            <ShieldCheck className="w-4 h-4" />
            <span>NIRDESH ADMIN CONTROL CENTER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frontend Control Hub
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Real-time control over content, features, pricing, FAQs, releases, and system status across your application.
          </p>
        </div>

        {/* Global Save & Reset Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 w-full md:w-auto">
          <button
            onClick={handleReset}
            disabled={saving}
            className="flex-1 md:flex-none px-4 py-3 rounded-xl glass-panel hover:bg-rose-500/10 hover:border-rose-500/40 text-rose-300 font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Defaults</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 md:flex-none px-6 py-3 rounded-xl bg-nirdesh-gradient hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Admin Panel Main Layout (Tabs + Content) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar Tabs */}
        <div className="lg:col-span-3 space-y-2">
          <div className="glass-panel p-3 rounded-2xl border border-white/10 space-y-1">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-cyan-400" />
              <span>Overview & Stats</span>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'hero'
                  ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Tv2 className="w-4 h-4 text-violet-400" />
              <span>Hero & Capabilities</span>
            </button>

            <button
              onClick={() => setActiveTab('bento')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'bento'
                  ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Grid className="w-4 h-4 text-emerald-400" />
              <span>Bento Features</span>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'pricing'
                  ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <DollarSign className="w-4 h-4 text-amber-400" />
              <span>Pricing Tiers</span>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'faq'
                  ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-blue-400" />
              <span>FAQ Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('banner')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'banner'
                  ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Megaphone className="w-4 h-4 text-rose-400" />
              <span>Banner & Flags</span>
            </button>

            <button
              onClick={() => setActiveTab('downloads')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'downloads'
                  ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Release & Download</span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === 'users'
                  ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Users className="w-4 h-4 text-indigo-400" />
              <span>Users & Security</span>
            </button>

          </div>

          {/* Quick Demo Mode Toggle Status */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Admin Mode</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">
                {demoAdminMode ? 'ACTIVE' : 'STANDARD'}
              </span>
            </div>
            <button
              onClick={() => setDemoAdminMode(!demoAdminMode)}
              className="w-full py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-medium text-slate-300 border border-white/10 transition-all cursor-pointer"
            >
              Toggle Demo Admin Override
            </button>
          </div>
        </div>

        {/* Tab Content Display Area */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Sync Connection</span>
                    <Globe className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-xl font-bold text-white">
                    {isFirebaseConnected ? 'Firebase Online' : 'Local + Firestore'}
                  </div>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real-time listener active</span>
                  </p>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Software Version</span>
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xl font-bold text-white">v{formData.downloadsInfo.version}</div>
                  <p className="text-xs text-slate-400">Release: {formData.downloadsInfo.releaseDate}</p>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Active Nodes</span>
                    <Activity className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-xl font-bold text-white">{formData.systemStatus.activeNodes.toLocaleString()}</div>
                  <p className="text-xs text-slate-400">Latency: {formData.systemStatus.latencyMs}ms</p>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Overall Status</span>
                    <Radio className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-xl font-bold text-emerald-400">{formData.systemStatus.overallStatus}</div>
                  <p className="text-xs text-slate-400">Checked: {formData.systemStatus.lastChecked}</p>
                </div>
              </div>

              {/* Quick Feature Toggles in Dashboard */}
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Live Feature Toggles</h3>
                    <p className="text-xs text-slate-400">Enable or disable core agent features across all user sessions instantly.</p>
                  </div>
                  <Sliders className="w-5 h-5 text-cyan-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(formData.featureFlags).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between p-4 rounded-xl glass-panel border border-white/5">
                      <div>
                        <div className="text-sm font-semibold text-white capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-xs text-slate-400">
                          {val ? 'Enabled & broadcasted to clients' : 'Disabled / Offline'}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            featureFlags: {
                              ...prev.featureFlags,
                              [key]: !val
                            }
                          }));
                        }}
                        className={`w-12 h-6 rounded-full transition-colors relative p-0.5 cursor-pointer ${
                          val ? 'bg-cyan-500' : 'bg-slate-700'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          val ? 'translate-x-6' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: HERO & CAPABILITIES */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Hero Main Copy */}
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Tv2 className="w-5 h-5 text-cyan-400" />
                  <span>Hero Section Headings & Copy</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Badge Title</label>
                    <input
                      type="text"
                      value={formData.hero.badgeText}
                      onChange={(e) => updateHeroField('badgeText', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Badge Status Text</label>
                    <input
                      type="text"
                      value={formData.hero.badgeStatus}
                      onChange={(e) => updateHeroField('badgeStatus', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Main Brand Title</label>
                    <input
                      type="text"
                      value={formData.hero.title}
                      onChange={(e) => updateHeroField('title', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Gradient Subtitle</label>
                    <input
                      type="text"
                      value={formData.hero.subtitle}
                      onChange={(e) => updateHeroField('subtitle', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Hero Description</label>
                  <textarea
                    rows={2}
                    value={formData.hero.description}
                    onChange={(e) => updateHeroField('description', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* 5 Capability Cards */}
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  <span>5 Capability Showcase Cards</span>
                </h3>

                <div className="space-y-4">
                  {formData.capabilityCards.map((card, i) => (
                    <div key={i} className="p-4 rounded-2xl glass-panel border border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-3">
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Title</label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => updateCapabilityCard(i, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-white text-sm font-semibold focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-6">
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Description</label>
                        <input
                          type="text"
                          value={card.desc}
                          onChange={(e) => updateCapabilityCard(i, 'desc', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-slate-200 text-xs focus:border-cyan-400 focus:outline-none"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Accent Color</label>
                        <div className="flex items-center gap-2">
                          <input
                            type="color"
                            value={card.color}
                            onChange={(e) => updateCapabilityCard(i, 'color', e.target.value)}
                            className="w-8 h-8 rounded border-none bg-transparent cursor-pointer"
                          />
                          <span className="text-xs font-mono text-slate-400">{card.color}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: BENTO FEATURES */}
          {activeTab === 'bento' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Grid className="w-5 h-5 text-emerald-400" />
                  <span>Bento Grid Showcase Cards</span>
                </h3>

                <div className="space-y-4">
                  {formData.bentoCards.map((bento, i) => (
                    <div key={i} className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-400 block uppercase font-mono">Card Title</label>
                          <input
                            type="text"
                            value={bento.title}
                            onChange={(e) => updateBentoCard(i, 'title', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-white text-sm font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block uppercase font-mono">Badge Label</label>
                          <input
                            type="text"
                            value={bento.badge}
                            onChange={(e) => updateBentoCard(i, 'badge', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-cyan-300 text-xs font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Description</label>
                        <textarea
                          rows={2}
                          value={bento.desc}
                          onChange={(e) => updateBentoCard(i, 'desc', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-slate-300 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRICING TIERS */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                  <span>Pricing Plans & Tiers</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {formData.pricingTiers.map((tier, i) => (
                    <div key={i} className="p-5 rounded-2xl glass-panel border border-white/10 space-y-4">
                      <div>
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Plan Name</label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => updatePricingTier(i, 'name', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-white font-bold text-base"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 block uppercase font-mono">Monthly Rate</label>
                          <input
                            type="text"
                            value={tier.priceMonthly}
                            onChange={(e) => updatePricingTier(i, 'priceMonthly', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-cyan-300 font-bold text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block uppercase font-mono">Yearly Rate</label>
                          <input
                            type="text"
                            value={tier.priceYearly}
                            onChange={(e) => updatePricingTier(i, 'priceYearly', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-cyan-300 font-bold text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Button CTA Text</label>
                        <input
                          type="text"
                          value={tier.cta}
                          onChange={(e) => updatePricingTier(i, 'cta', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-slate-200 text-xs font-semibold"
                        />
                      </div>

                      {/* Feature Bullet Points */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] text-slate-400 uppercase font-mono">Included Features</label>
                          <button
                            onClick={() => addPricingFeature(i)}
                            className="text-xs text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add
                          </button>
                        </div>
                        <div className="space-y-1.5">
                          {tier.features.map((feat, fIndex) => (
                            <div key={fIndex} className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={feat}
                                onChange={(e) => updatePricingFeature(i, fIndex, e.target.value)}
                                className="flex-1 px-2.5 py-1 rounded-md glass-panel border border-white/10 text-xs text-slate-300"
                              />
                              <button
                                onClick={() => deletePricingFeature(i, fIndex)}
                                className="p-1 text-slate-500 hover:text-rose-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: FAQ MANAGER */}
          {activeTab === 'faq' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-400" />
                    <span>Frequently Asked Questions Manager</span>
                  </h3>
                  <button
                    onClick={addFaq}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold text-xs hover:bg-cyan-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Question</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.faqItems.map((faq, i) => (
                    <div key={i} className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3 relative group">
                      <button
                        onClick={() => deleteFaq(i)}
                        className="absolute top-4 right-4 p-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="pr-10">
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Question #{i + 1}</label>
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => updateFaq(i, 'q', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl glass-panel border border-white/10 text-white font-semibold text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Answer</label>
                        <textarea
                          rows={2}
                          value={faq.a}
                          onChange={(e) => updateFaq(i, 'a', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl glass-panel border border-white/10 text-slate-300 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: BANNER & FEATURE FLAGS */}
          {activeTab === 'banner' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Announcement Banner Config */}
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-rose-400" />
                    <span>Top Announcement Banner Alert</span>
                  </h3>
                  <button
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        announcementBanner: {
                          ...prev.announcementBanner,
                          enabled: !prev.announcementBanner.enabled
                        }
                      }));
                    }}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      formData.announcementBanner.enabled
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                        : 'bg-slate-800 text-slate-400 border border-white/10'
                    }`}
                  >
                    {formData.announcementBanner.enabled ? 'BANNER ACTIVE' : 'HIDDEN'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Badge Tag</label>
                    <input
                      type="text"
                      value={formData.announcementBanner.badge}
                      onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        announcementBanner: { ...prev.announcementBanner, badge: e.target.value }
                      }))}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Theme Color</label>
                    <select
                      value={formData.announcementBanner.theme}
                      onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        announcementBanner: { ...prev.announcementBanner, theme: e.target.value as any }
                      }))}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm bg-slate-900"
                    >
                      <option value="cyan">Cyan Glow</option>
                      <option value="purple">Purple Cyber</option>
                      <option value="emerald">Emerald Live</option>
                      <option value="amber">Amber Alert</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Banner Message</label>
                  <input
                    type="text"
                    value={formData.announcementBanner.text}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      announcementBanner: { ...prev.announcementBanner, text: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm"
                  />
                </div>
              </div>

            </div>
          )}

          {/* TAB 7: RELEASE & DOWNLOAD */}
          {activeTab === 'downloads' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span>Windows Installer & Software Release Config</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Version Number</label>
                    <input
                      type="text"
                      value={formData.downloadsInfo.version}
                      onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        downloadsInfo: { ...prev.downloadsInfo, version: e.target.value }
                      }))}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Installer Size</label>
                    <input
                      type="text"
                      value={formData.downloadsInfo.fileSize}
                      onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        downloadsInfo: { ...prev.downloadsInfo, fileSize: e.target.value }
                      }))}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Direct Download Link (.exe)</label>
                  <input
                    type="text"
                    value={formData.downloadsInfo.exeDownloadUrl}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      downloadsInfo: { ...prev.downloadsInfo, exeDownloadUrl: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-cyan-300 font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Release Notes</label>
                  <textarea
                    rows={3}
                    value={formData.downloadsInfo.releaseNotes}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      downloadsInfo: { ...prev.downloadsInfo, releaseNotes: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-slate-300 text-xs"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: USERS & SECURITY */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-400" />
                    <span>Registered Firebase Users & Roles</span>
                  </h3>
                  <button
                    onClick={loadUsers}
                    className="text-xs text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Refresh List
                  </button>
                </div>

                {loadingUsers ? (
                  <div className="text-center py-8 text-slate-400 text-sm">Loading users from Firestore...</div>
                ) : (
                  <div className="space-y-3">
                    {usersList.map((u, i) => (
                      <div key={i} className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-4">
                        <div className="space-y-0.5">
                          <div className="font-semibold text-sm text-white flex items-center gap-2">
                            <span>{u.displayName || u.email}</span>
                            {u.role === 'admin' && (
                              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase tracking-wider">
                                ADMIN
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-slate-400 font-mono">{u.email}</div>
                        </div>

                        <button
                          onClick={() => handleRoleToggle(u.uid, u.role)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            u.role === 'admin'
                              ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20'
                              : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
                          }`}
                        >
                          {u.role === 'admin' ? 'Demote to User' : 'Make Admin'}
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
