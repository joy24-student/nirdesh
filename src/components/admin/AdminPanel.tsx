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
  Activity,
  Zap,
  Globe,
  Radio,
  Eye,
  FileJson,
  Upload,
  Search,
  Palette,
  Terminal,
  Cpu,
  Server,
  Maximize2,
  Minimize2,
  Smartphone,
  Laptop,
  Monitor,
  Bell,
  Clock,
  Check
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
    'dashboard' | 'hero' | 'bento' | 'pricing' | 'faq' | 'banner' | 'downloads' | 'users' | 'integrations' | 'macros' | 'theme' | 'logs'
  >('dashboard');

  const [formData, setFormData] = useState<SiteConfig>(siteConfig);
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  
  // Live Preview Sandbox state
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync formData when siteConfig updates externally
  useEffect(() => {
    setFormData(siteConfig);
  }, [siteConfig]);

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
    const logEntry = {
      id: `l_${Date.now()}`,
      time: 'Just now',
      action: 'Admin published updated site configuration to Firebase',
      type: 'success' as const
    };
    const updated = {
      ...formData,
      auditLogs: [logEntry, ...(formData.auditLogs || []).slice(0, 15)]
    };
    setFormData(updated);

    const success = await saveConfig(updated);
    setSaving(false);
    if (success) {
      showToast('Successfully published all changes to Firebase & Frontend live!');
    } else {
      showToast('Saved to local site state (Set VITE_FIREBASE_API_KEY for cloud database)', 'success');
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

  // Export JSON Config File
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nirdesh_config_backup_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported site config backup JSON!');
  };

  // Import JSON Config File
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          setFormData((prev) => ({ ...prev, ...parsed }));
          showToast('Successfully imported configuration file!');
        } catch (err) {
          showToast('Invalid JSON file format', 'error');
        }
      };
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

  // Field Edit Handlers
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
      faqItems: [...prev.faqItems, { q: 'New Question Title', a: 'Answer description goes here.' }]
    }));
  };

  const deleteFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqItems: prev.faqItems.filter((_, i) => i !== index)
    }));
  };

  const addMacro = () => {
    setFormData((prev) => ({
      ...prev,
      macroPresets: [
        ...prev.macroPresets,
        { id: `m_${Date.now()}`, name: 'New Macro Workflow', category: 'General', desc: 'Custom actions step', hotkey: 'Ctrl+Shift+M' }
      ]
    }));
  };

  const deleteMacro = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      macroPresets: prev.macroPresets.filter((m) => m.id !== id)
    }));
  };

  return (
    <div className="min-h-screen bg-[#02040A] text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Toast Notification */}
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

      {/* Admin Panel Header & Utility Toolbar */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400">
            <ShieldCheck className="w-4 h-4" />
            <span>NIRDESH ULTIMATE ADMIN OPERATIONS HUB v6.0</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frontend Control Center
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Real-time management for site copy, feature flags, pricing, releases, theme customizer, and live sandbox simulator.
          </p>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex flex-wrap items-center gap-3 relative z-10 w-full md:w-auto">
          
          <button
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`px-4 py-3 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              showLivePreview
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                : 'glass-panel text-slate-300 hover:bg-white/10 border-white/10'
            }`}
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>{showLivePreview ? 'Close Live Sandbox' : 'Live Sandbox Preview'}</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-3 rounded-xl glass-panel hover:bg-white/10 border border-white/10 text-slate-300 font-medium text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            title="Export JSON Backup"
          >
            <FileJson className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Export Backup</span>
          </button>

          <label className="px-3.5 py-3 rounded-xl glass-panel hover:bg-white/10 border border-white/10 text-slate-300 font-medium text-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <Upload className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Import JSON</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={handleReset}
            disabled={saving}
            className="px-4 py-3 rounded-xl glass-panel hover:bg-rose-500/10 hover:border-rose-500/40 text-rose-300 font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset Defaults</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 rounded-xl bg-nirdesh-gradient hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing...' : 'Save & Publish Live'}</span>
          </button>
        </div>
      </div>

      {/* Live Interactive Sandbox Preview Drawer */}
      {showLivePreview && (
        <div className="glass-panel p-6 rounded-3xl border border-cyan-400/50 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-bold text-white text-base">Live Interactive Frontend Simulator</h3>
              <span className="text-xs text-cyan-300 font-mono">Updates in real-time as you type</span>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  previewDevice === 'desktop' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4" />
                <span className="hidden sm:inline">Desktop</span>
              </button>

              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  previewDevice === 'tablet' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Laptop className="w-4 h-4" />
                <span className="hidden sm:inline">Tablet</span>
              </button>

              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer ${
                  previewDevice === 'mobile' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="hidden sm:inline">Mobile</span>
              </button>
            </div>
          </div>

          {/* Sandbox Render Container */}
          <div className="flex justify-center bg-[#010206] p-4 rounded-2xl border border-white/10 overflow-x-auto">
            <div className={`transition-all duration-300 bg-[#02040A] rounded-2xl p-6 border border-white/10 space-y-6 overflow-hidden ${
              previewDevice === 'desktop' ? 'w-full max-w-5xl' : previewDevice === 'tablet' ? 'w-[768px]' : 'w-[375px]'
            }`}>
              
              {/* Announcement Bar Preview */}
              {formData.announcementBanner.enabled && (
                <div className="bg-gradient-to-r from-cyan-950 to-indigo-950 border border-cyan-500/30 p-2 rounded-xl text-center text-xs flex items-center justify-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-bold text-[10px] uppercase">
                    {formData.announcementBanner.badge}
                  </span>
                  <span className="text-slate-200 truncate">{formData.announcementBanner.text}</span>
                </div>
              )}

              {/* Hero Preview */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-cyan-500/30 text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white font-semibold">{formData.hero.badgeText}</span>
                  <span className="text-slate-500">|</span>
                  <span className="text-cyan-300">{formData.hero.badgeStatus}</span>
                </div>

                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-5xl font-extrabold text-white">{formData.hero.title}</h1>
                  <p className="text-xl sm:text-3xl font-bold text-gradient">{formData.hero.subtitle}</p>
                </div>

                <p className="text-slate-300 text-sm">{formData.hero.description}</p>
              </div>

              {/* Capability Cards Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {formData.capabilityCards.slice(0, 3).map((c, idx) => (
                  <div key={idx} className="p-3 rounded-xl glass-panel border border-white/10 space-y-1">
                    <div className="text-xs font-bold text-cyan-300">{c.title}</div>
                    <div className="text-[11px] text-slate-400 line-clamp-2">{c.desc}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Main Admin Tabbed Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-2">
          
          {/* Quick Search */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search settings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl glass-panel border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          <div className="glass-panel p-2.5 rounded-2xl border border-white/10 space-y-1">
            
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-cyan-400" />
                <span>Overview & Telemetry</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('hero')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'hero'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Tv2 className="w-4 h-4 text-violet-400" />
                <span>Hero & Capabilities</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('bento')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'bento'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Grid className="w-4 h-4 text-emerald-400" />
                <span>Bento Showcase</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('pricing')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'pricing'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <DollarSign className="w-4 h-4 text-amber-400" />
                <span>Pricing & Plans</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('faq')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'faq'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle className="w-4 h-4 text-blue-400" />
                <span>FAQ Manager</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('banner')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'banner'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Megaphone className="w-4 h-4 text-rose-400" />
                <span>Banners & Flags</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('downloads')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'downloads'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Releases & EXE</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('integrations')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'integrations'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Server className="w-4 h-4 text-teal-400" />
                <span>AI Endpoints & APIs</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('macros')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'macros'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Terminal className="w-4 h-4 text-purple-400" />
                <span>Workflow Preset Macros</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('theme')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'theme'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Palette className="w-4 h-4 text-pink-400" />
                <span>Theme & Styling</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Users & Permissions</span>
              </div>
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'logs'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>Audit Logs</span>
              </div>
            </button>

          </div>

          {/* Admin Demo Access Panel */}
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
          
          {/* TAB 1: DASHBOARD & TELEMETRY */}
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

              {/* Visual Telemetry Chart Simulation */}
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Activity className="w-5 h-5 text-cyan-400" />
                      <span>Live Telemetry & Execution Traffic</span>
                    </h3>
                    <p className="text-xs text-slate-400">AI command execution velocity across active Windows client nodes.</p>
                  </div>
                  <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
                    AVG LATENCY 38ms
                  </span>
                </div>

                {/* SVG Bar Chart Visualization */}
                <div className="h-40 flex items-end justify-between gap-2 pt-4 px-2 border-b border-white/10">
                  {[65, 45, 78, 92, 60, 85, 110, 95, 130, 145, 120, 160, 185, 170, 195].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                      <div 
                        className="w-full rounded-t-lg bg-gradient-to-t from-cyan-600/40 to-cyan-400 transition-all group-hover:to-cyan-300 group-hover:shadow-lg group-hover:shadow-cyan-500/30"
                        style={{ height: `${(val / 200) * 100}%` }}
                      />
                      <span className="text-[9px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Feature Flags Grid */}
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Live Feature Flags</h3>
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
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Tv2 className="w-5 h-5 text-cyan-400" />
                  <span>Hero Section Copy</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Badge Title</label>
                    <input
                      type="text"
                      value={formData.hero.badgeText}
                      onChange={(e) => updateHeroField('badgeText', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Badge Status Text</label>
                    <input
                      type="text"
                      value={formData.hero.badgeStatus}
                      onChange={(e) => updateHeroField('badgeStatus', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Main Title</label>
                    <input
                      type="text"
                      value={formData.hero.title}
                      onChange={(e) => updateHeroField('title', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Gradient Subtitle</label>
                    <input
                      type="text"
                      value={formData.hero.subtitle}
                      onChange={(e) => updateHeroField('subtitle', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Hero Description</label>
                  <textarea
                    rows={2}
                    value={formData.hero.description}
                    onChange={(e) => updateHeroField('description', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm"
                  />
                </div>
              </div>

              {/* 5 Capability Cards */}
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  <span>5 Capability Cards</span>
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
                          className="w-full px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-white text-sm font-semibold"
                        />
                      </div>
                      <div className="sm:col-span-6">
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Description</label>
                        <input
                          type="text"
                          value={card.desc}
                          onChange={(e) => updateCapabilityCard(i, 'desc', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-slate-200 text-xs"
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

          {/* TAB 3: BENTO SHOWCASE */}
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

          {/* TAB 4: PRICING & PLANS */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                  <span>Pricing Tiers</span>
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
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">CTA Text</label>
                        <input
                          type="text"
                          value={tier.cta}
                          onChange={(e) => updatePricingTier(i, 'cta', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg glass-panel border border-white/10 text-slate-200 text-xs font-semibold"
                        />
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
                    <span>FAQ Manager</span>
                  </h3>
                  <button
                    onClick={addFaq}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold text-xs hover:bg-cyan-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Question</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.faqItems.map((faq, i) => (
                    <div key={i} className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3 relative">
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

          {/* TAB 6: BANNER & FLAGS */}
          {activeTab === 'banner' && (
            <div className="space-y-6 animate-fadeIn">
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

          {/* TAB 7: RELEASES & DOWNLOADS */}
          {activeTab === 'downloads' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span>Installer & Release Config</span>
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
              </div>
            </div>
          )}

          {/* TAB 8: INTEGRATIONS & AI ENDPOINTS */}
          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Server className="w-5 h-5 text-teal-400" />
                  <span>AI Endpoints & Model Bridges</span>
                </h3>

                <div className="space-y-3">
                  {formData.integrations.map((integ, i) => (
                    <div key={integ.id} className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="font-semibold text-white text-sm flex items-center gap-2">
                          <span>{integ.name}</span>
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                            {integ.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 font-mono">Ping latency: {integ.latency}</div>
                      </div>

                      <button
                        onClick={() => showToast(`Tested ping for ${integ.name}: ${integ.latency}`)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-cyan-300 font-semibold border border-white/10 cursor-pointer"
                      >
                        Test Health Ping
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: WORKFLOW PRESET MACROS */}
          {activeTab === 'macros' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-purple-400" />
                    <span>Workflow Macro Presets</span>
                  </h3>
                  <button
                    onClick={addMacro}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" /> Add Preset
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.macroPresets.map((m) => (
                    <div key={m.id} className="p-4 rounded-2xl glass-panel border border-white/10 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          <span>{m.name}</span>
                          <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                            {m.hotkey}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">{m.desc}</p>
                      </div>

                      <button
                        onClick={() => deleteMacro(m.id)}
                        className="p-2 text-slate-500 hover:text-rose-400 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: THEME & STYLING */}
          {activeTab === 'theme' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-pink-400" />
                  <span>Theme & Aesthetic Styling Presets</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Primary Accent Color</label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={formData.themeSettings?.primaryAccent || '#00C8FF'}
                        onChange={(e) => setFormData((prev) => ({
                          ...prev,
                          themeSettings: { ...prev.themeSettings, primaryAccent: e.target.value }
                        }))}
                        className="w-10 h-10 rounded border-none bg-transparent cursor-pointer"
                      />
                      <span className="text-sm font-mono text-cyan-300">{formData.themeSettings?.primaryAccent}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Gradient Theme Preset</label>
                    <select
                      value={formData.themeSettings?.gradientPreset || 'cyan-violet'}
                      onChange={(e) => setFormData((prev) => ({
                        ...prev,
                        themeSettings: { ...prev.themeSettings, gradientPreset: e.target.value as any }
                      }))}
                      className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm bg-slate-900"
                    >
                      <option value="cyan-violet">Cyan to Violet Glow</option>
                      <option value="emerald-cyan">Emerald Matrix</option>
                      <option value="purple-pink">Deep Cyber Pink</option>
                      <option value="amber-orange">Solar Flare</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 11: USERS & PERMISSIONS */}
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
                    className="text-xs text-cyan-400 hover:underline cursor-pointer"
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
                              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold uppercase">
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

          {/* TAB 12: AUDIT LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <span>Audit Logs & Admin Trail</span>
                </h3>

                <div className="space-y-2">
                  {(formData.auditLogs || []).map((log) => (
                    <div key={log.id} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-slate-200 font-medium">{log.action}</span>
                      </div>
                      <span className="font-mono text-slate-500">{log.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
