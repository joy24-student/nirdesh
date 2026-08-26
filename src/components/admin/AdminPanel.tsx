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
  Server,
  Monitor,
  Laptop,
  Smartphone,
  CreditCard,
  Calendar,
  Award,
  Clock
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
    'dashboard' | 'billing' | 'hero' | 'bento' | 'pricing' | 'faq' | 'banner' | 'downloads' | 'users' | 'integrations' | 'macros' | 'theme' | 'logs'
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
      action: `Admin updated site configuration (Billing: ${formData.billingSettings?.enableBilling ? `$${formData.billingSettings?.billingAmount}` : 'FREE MODE'})`,
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
            <span>NIRDESH ULTIMATE ADMIN CONTROL CENTER</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Frontend & Billing Control Center
          </h1>
          <p className="text-sm text-slate-400 max-w-2xl">
            Control site copy, feature flags, monthly/quarterly/yearly billing amount, releases, theme customizer, and live sandbox simulator.
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

              {/* Billing Mode Status Banner Preview */}
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 flex items-center justify-between">
                <span className="font-semibold">
                  Billing Mode: {formData.billingSettings?.enableBilling && formData.billingSettings?.billingAmount > 0 
                    ? `PAID (${formData.billingSettings?.currencySymbol}${formData.billingSettings?.billingAmount}/mo | Quarterly -${formData.billingSettings?.quarterlyDiscountPct || 15}% | Yearly -${formData.billingSettings?.yearlyDiscountPct || 30}%)` 
                    : 'FREE ACCESS ($0)'}
                </span>
                <span className="text-[10px] text-slate-400">Controlled by Admin</span>
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

            {/* TAB: BILLING & MONETIZATION CONTROL */}
            <button
              onClick={() => setActiveTab('billing')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'billing'
                  ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                  : 'text-amber-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CreditCard className="w-4 h-4 text-amber-400" />
                <span>Billing Cycles (Mo/Qtr/Yr)</span>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                formData.billingSettings?.enableBilling && formData.billingSettings?.billingAmount > 0
                  ? 'bg-emerald-500/20 text-emerald-300'
                  : 'bg-slate-800 text-slate-400'
              }`}>
                {formData.billingSettings?.enableBilling && formData.billingSettings?.billingAmount > 0 ? `$${formData.billingSettings?.billingAmount}` : 'FREE $0'}
              </span>
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
                <span>Pricing Tiers</span>
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
        </div>

        {/* Tab Content Display Area */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: DASHBOARD & TELEMETRY */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Sync Connection</span>
                    <Globe className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-xl font-bold text-white">
                    {isFirebaseConnected ? 'Firebase Online' : 'Local + Firestore'}
                  </div>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Billing Mode</span>
                    <CreditCard className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formData.billingSettings?.enableBilling && formData.billingSettings?.billingAmount > 0 
                      ? `${formData.billingSettings.currencySymbol}${formData.billingSettings.billingAmount}/mo` 
                      : 'FREE ACCESS ($0)'}
                  </div>
                  <p className="text-xs text-slate-400">
                    Mo / Qtr (-{formData.billingSettings?.quarterlyDiscountPct || 15}%) / Yr (-{formData.billingSettings?.yearlyDiscountPct || 30}%)
                  </p>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Software Version</span>
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xl font-bold text-white">v{formData.downloadsInfo.version}</div>
                </div>

                <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-semibold uppercase tracking-wider">Overall Status</span>
                    <Radio className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-xl font-bold text-emerald-400">{formData.systemStatus.overallStatus}</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: BILLING CONTROL HUB (MONTHLY, QUARTERLY, YEARLY) */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-amber-500/30 space-y-6">
                
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-bold text-amber-400">
                      <CreditCard className="w-4 h-4" />
                      <span>MONTHLY, QUARTERLY & YEARLY PAYMENT LOGIC</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mt-2">Billing Frequencies & Discount Rates</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Configure base monthly rates, 3-month quarterly discounts, and 12-month annual discounts. Set amount to 0 for Free Mode.
                    </p>
                  </div>

                  <div className={`px-4 py-2 rounded-2xl border text-xs font-extrabold flex items-center gap-2 ${
                    formData.billingSettings?.enableBilling && formData.billingSettings?.billingAmount > 0
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                  }`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                    <span>
                      {formData.billingSettings?.enableBilling && formData.billingSettings?.billingAmount > 0 
                        ? `PAID MODE ($${formData.billingSettings.billingAmount}/mo)`
                        : 'FREE MODE ($0)'}
                    </span>
                  </div>
                </div>

                {/* Amount & Currency Settings */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
                    <label className="text-xs font-bold text-slate-300 block uppercase font-mono">
                      Base Monthly Rate (0 = Free Mode)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-cyan-400">{formData.billingSettings?.currencySymbol || '$'}</span>
                      <input
                        type="number"
                        min={0}
                        value={formData.billingSettings?.billingAmount ?? 0}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setFormData((prev) => ({
                            ...prev,
                            billingSettings: {
                              ...prev.billingSettings,
                              billingAmount: val,
                              enableBilling: val > 0 ? true : prev.billingSettings?.enableBilling
                            }
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl glass-panel border border-white/10 text-white font-extrabold text-lg focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
                    <label className="text-xs font-bold text-amber-300 block uppercase font-mono">
                      Quarterly Discount (%)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={90}
                      value={formData.billingSettings?.quarterlyDiscountPct ?? 15}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormData((prev) => ({
                          ...prev,
                          billingSettings: { ...prev.billingSettings, quarterlyDiscountPct: val }
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl glass-panel border border-white/10 text-amber-300 font-extrabold text-lg focus:border-amber-400 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 block">3-month billing cycle</span>
                  </div>

                  <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
                    <label className="text-xs font-bold text-emerald-300 block uppercase font-mono">
                      Yearly Discount (%)
                    </label>
                    <input
                      type="number"
                      min={0}
                      max={90}
                      value={formData.billingSettings?.yearlyDiscountPct ?? 30}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setFormData((prev) => ({
                          ...prev,
                          billingSettings: { ...prev.billingSettings, yearlyDiscountPct: val }
                        }));
                      }}
                      className="w-full px-3 py-2 rounded-xl glass-panel border border-white/10 text-emerald-300 font-extrabold text-lg focus:border-amber-400 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 block">12-month billing cycle</span>
                  </div>

                </div>

                {/* Calculated Rate Breakdown Summary Card */}
                <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase font-mono">Calculated Price Summary for Users</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl glass-panel border border-cyan-500/20 space-y-1">
                      <span className="text-slate-400">Monthly Plan</span>
                      <div className="font-extrabold text-white text-base">
                        {formData.billingSettings?.currencySymbol || '$'}{formData.billingSettings?.billingAmount || 0} / mo
                      </div>
                      <span className="text-[10px] text-slate-500">Standard rate</span>
                    </div>

                    <div className="p-3 rounded-xl glass-panel border border-amber-500/30 space-y-1">
                      <span className="text-amber-400 font-semibold">Quarterly Plan (Save {formData.billingSettings?.quarterlyDiscountPct || 15}%)</span>
                      <div className="font-extrabold text-white text-base">
                        {formData.billingSettings?.currencySymbol || '$'}{Math.round((formData.billingSettings?.billingAmount || 0) * (1 - (formData.billingSettings?.quarterlyDiscountPct || 15) / 100))} / mo
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Billed {formData.billingSettings?.currencySymbol || '$'}{Math.round((formData.billingSettings?.billingAmount || 0) * (1 - (formData.billingSettings?.quarterlyDiscountPct || 15) / 100)) * 3} every 3 months
                      </span>
                    </div>

                    <div className="p-3 rounded-xl glass-panel border border-emerald-500/30 space-y-1">
                      <span className="text-emerald-400 font-semibold">Yearly Plan (Save {formData.billingSettings?.yearlyDiscountPct || 30}%)</span>
                      <div className="font-extrabold text-white text-base">
                        {formData.billingSettings?.currencySymbol || '$'}{Math.round((formData.billingSettings?.billingAmount || 0) * (1 - (formData.billingSettings?.yearlyDiscountPct || 30) / 100))} / mo
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Billed {formData.billingSettings?.currencySymbol || '$'}{Math.round((formData.billingSettings?.billingAmount || 0) * (1 - (formData.billingSettings?.yearlyDiscountPct || 30) / 100)) * 12} annually
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Payment Gateway Readiness</label>
                  <select
                    value={formData.billingSettings?.gatewayStatus || 'Disabled'}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      billingSettings: { ...prev.billingSettings, gatewayStatus: e.target.value as any }
                    }))}
                    className="w-full px-4 py-2.5 rounded-xl glass-panel border border-white/10 text-white text-sm bg-slate-900"
                  >
                    <option value="Disabled">Disabled (Free Access / Later Gateway Binding)</option>
                    <option value="Stripe Ready">Stripe Gateway Ready (Placeholder Hook)</option>
                    <option value="Razorpay Ready">Razorpay Gateway Ready</option>
                    <option value="PayPal Ready">PayPal Gateway Ready</option>
                  </select>
                </div>

              </div>
            </div>
          )}

          {/* TAB: HERO & CAPABILITIES */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Tv2 className="w-5 h-5 text-cyan-400" />
                  <span>Hero Copy</span>
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
                </div>
              </div>
            </div>
          )}

          {/* TAB: BENTO SHOWCASE */}
          {activeTab === 'bento' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Grid className="w-5 h-5 text-emerald-400" />
                  <span>Bento Showcase</span>
                </h3>
              </div>
            </div>
          )}

          {/* TAB: PRICING TIERS */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                  <span>Pricing Tiers</span>
                </h3>
              </div>
            </div>
          )}

          {/* TAB: FAQ MANAGER */}
          {activeTab === 'faq' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-400" />
                  <span>FAQ Manager</span>
                </h3>
              </div>
            </div>
          )}

          {/* TAB: BANNER & FLAGS */}
          {activeTab === 'banner' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-rose-400" />
                  <span>Banner Alerts</span>
                </h3>
              </div>
            </div>
          )}

          {/* TAB: RELEASES & DOWNLOADS */}
          {activeTab === 'downloads' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span>Installer Releases</span>
                </h3>
              </div>
            </div>
          )}

          {/* TAB: INTEGRATIONS */}
          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Server className="w-5 h-5 text-teal-400" />
                  <span>AI Endpoints</span>
                </h3>
              </div>
            </div>
          )}

          {/* TAB: MACROS */}
          {activeTab === 'macros' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-purple-400" />
                  <span>Workflow Macro Presets</span>
                </h3>
              </div>
            </div>
          )}

          {/* TAB: THEME */}
          {activeTab === 'theme' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-pink-400" />
                  <span>Theme & Styling</span>
                </h3>
              </div>
            </div>
          )}

          {/* TAB: USERS & PERMISSIONS */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-indigo-400" />
                  <span>Users & Roles</span>
                </h3>
              </div>
            </div>
          )}

          {/* TAB: AUDIT LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <span>Audit Logs</span>
                </h3>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
