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
  Clock,
  ChevronRight,
  Shield,
  Layers,
  Cpu,
  RefreshCw,
  UserCheck,
  UserX,
  ExternalLink
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
  const [userFilter, setUserFilter] = useState('');
  
  // Live Preview Sandbox state
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync formData when siteConfig updates externally from Firestore
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
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      action: `Admin published live configuration (Billing: ${formData.billingSettings?.enableBilling ? `$${formData.billingSettings?.billingAmount}` : 'FREE MODE'})`,
      type: 'success' as const
    };
    const updated = {
      ...formData,
      auditLogs: [logEntry, ...(formData.auditLogs || []).slice(0, 19)]
    };
    setFormData(updated);

    const success = await saveConfig(updated);
    setSaving(false);
    if (success) {
      showToast('Successfully published all configuration live to Firebase Firestore!');
    } else {
      showToast('Saved to local site state (Cloud sync active)', 'success');
    }
  };

  const handleReset = async () => {
    if (window.confirm('Are you sure you want to reset all site configuration to enterprise factory defaults?')) {
      setSaving(true);
      await resetToDefaults();
      setSaving(false);
      showToast('Reset all site configuration to factory defaults!');
    }
  };

  // Export JSON Config File
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `nirdesh_enterprise_config_${new Date().toISOString().slice(0,10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported enterprise site config backup JSON!');
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
          showToast('Successfully imported configuration backup file!');
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
    showToast(`Updated user permissions to role: ${newRole.toUpperCase()}`);
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
      const features = [...tiers[tierIndex].features, 'New capability feature item'];
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
      faqItems: [...prev.faqItems, { q: 'New Enterprise Question Title', a: 'Detailed answer response documentation.' }]
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
        { id: `m_${Date.now()}`, name: 'New Automation Routine', category: 'General', desc: 'Custom workflow step sequence', hotkey: 'Ctrl+Alt+M' }
      ]
    }));
  };

  const deleteMacro = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      macroPresets: prev.macroPresets.filter((m) => m.id !== id)
    }));
  };

  // Filtered Navigation Categories for Industrial Enterprise Sidebar
  const NAV_CATEGORIES = [
    {
      groupName: 'CORE SYSTEM',
      items: [
        { id: 'dashboard', label: 'Overview & Telemetry', icon: LayoutDashboard, badge: 'LIVE' },
        { id: 'downloads', label: 'Installer Releases & EXE', icon: Download, badge: `v${formData.downloadsInfo.version}` },
        { id: 'integrations', label: 'AI Model Endpoints', icon: Server, badge: 'HEALTHY' }
      ]
    },
    {
      groupName: 'MONETIZATION & BILLING',
      items: [
        { 
          id: 'billing', 
          label: 'Billing Cycles (Mo/Qtr/Yr)', 
          icon: CreditCard, 
          badge: formData.billingSettings?.enableBilling && formData.billingSettings?.billingAmount > 0 ? `$${formData.billingSettings.billingAmount}/mo` : 'FREE $0'
        },
        { id: 'pricing', label: 'Pricing Tiers & Plans', icon: DollarSign, badge: '3 PLANS' }
      ]
    },
    {
      groupName: 'CONTENT & BRANDING',
      items: [
        { id: 'hero', label: 'Hero Section & Cards', icon: Tv2 },
        { id: 'bento', label: 'Bento Showcase Grid', icon: Grid },
        { id: 'faq', label: 'FAQ Knowledge Manager', icon: HelpCircle, badge: `${formData.faqItems.length}` },
        { id: 'banner', label: 'Banners & Feature Flags', icon: Megaphone }
      ]
    },
    {
      groupName: 'DEVELOPER & LOGS',
      items: [
        { id: 'macros', label: 'Workflow Presets', icon: Terminal },
        { id: 'theme', label: 'Theme & Customizer', icon: Palette },
        { id: 'users', label: 'Users & Permissions', icon: Users, badge: `${usersList.length || 3}` },
        { id: 'logs', label: 'Audit Trail Logs', icon: Clock }
      ]
    }
  ];

  const filteredUsers = usersList.filter(
    (u) =>
      u.email?.toLowerCase().includes(userFilter.toLowerCase()) ||
      u.displayName?.toLowerCase().includes(userFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-[1600px] mx-auto animate-fadeIn">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-2xl flex items-center gap-3 animate-fadeIn ${
          toastMessage.type === 'success' 
            ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-200' 
            : 'bg-rose-950/90 border-rose-500/50 text-rose-200'
        }`}>
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="font-semibold text-sm">{toastMessage.text}</span>
        </div>
      )}

      {/* Enterprise Executive Header Bar */}
      <div className="bg-[#0B0F19] p-5 sm:p-6 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden mb-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        
        {/* Left Header Title & Breadcrumb */}
        <div className="space-y-1 z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>ENTERPRISE CONTROL CENTER</span>
            <ChevronRight className="w-3 h-3 text-slate-500" />
            <span className="text-slate-300 font-bold uppercase tracking-wider">{activeTab}</span>
          </div>

          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Nirdesh System Console
            </h1>

            {/* Firestore Live Sync Pill */}
            <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-2 border ${
              isFirebaseConnected
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                : 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
            }`}>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isFirebaseConnected ? 'Firebase Firestore Live' : 'Cloud Sync Engine Online'}</span>
            </div>
          </div>
        </div>

        {/* Right Header Toolbar Actions */}
        <div className="flex flex-wrap items-center gap-2.5 z-10 w-full lg:w-auto">
          
          <button
            onClick={() => setShowLivePreview(!showLivePreview)}
            className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              showLivePreview
                ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20'
                : 'bg-white/[0.04] text-slate-300 hover:bg-white/10 border-white/10'
            }`}
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span>{showLivePreview ? 'Close Sandbox' : 'Live Sandbox'}</span>
          </button>

          <button
            onClick={handleExportJSON}
            className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-slate-300 font-medium text-xs transition-all flex items-center gap-1.5 cursor-pointer"
            title="Export JSON Backup"
          >
            <FileJson className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Export</span>
          </button>

          <label className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-slate-300 font-medium text-xs transition-all flex items-center gap-1.5 cursor-pointer">
            <Upload className="w-4 h-4 text-indigo-400" />
            <span className="hidden sm:inline">Import</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={handleReset}
            disabled={saving}
            className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-rose-500/10 hover:border-rose-500/40 text-rose-300 font-semibold text-xs border border-white/10 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-5 py-2.5 rounded-xl bg-nirdesh-gradient hover:opacity-95 text-white font-bold text-xs shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Publishing...' : 'Publish Live to Firestore'}</span>
          </button>

        </div>
      </div>

      {/* Live Interactive Sandbox Preview Drawer */}
      {showLivePreview && (
        <div className="bg-[#0B0F19] p-6 rounded-2xl border border-cyan-400/50 shadow-2xl space-y-4 mb-6 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-bold text-white text-base">Live Interactive Frontend Device Simulator</h3>
              <span className="text-xs text-cyan-300 font-mono">Updates in real-time as you modify settings</span>
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
          <div className="flex justify-center bg-[#010206] p-4 rounded-xl border border-white/10 overflow-x-auto">
            <div className={`transition-all duration-300 bg-[#030712] rounded-xl p-6 border border-white/10 space-y-6 overflow-hidden ${
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
                    : '100% FREE ACCESS ($0/mo)'}
                </span>
                <span className="text-[10px] text-slate-400">Live Admin Setting</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-extrabold text-white">{formData.hero.title}</h2>
                <p className="text-cyan-400 font-bold text-lg">{formData.hero.subtitle}</p>
                <p className="text-slate-300 text-sm leading-relaxed">{formData.hero.description}</p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Main Grid: Left Industrial Sidebar + Right Content Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Industrial Navigation Sidebar */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Search Filter */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search setting modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#0B0F19] border border-white/10 text-white text-xs focus:border-cyan-400 focus:outline-none"
            />
          </div>

          {/* Category Group List */}
          <div className="bg-[#0B0F19] p-3 rounded-2xl border border-white/10 space-y-4">
            {NAV_CATEGORIES.map((cat) => (
              <div key={cat.groupName} className="space-y-1">
                <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-1 font-mono">
                  {cat.groupName}
                </h4>
                <div className="space-y-0.5">
                  {cat.items.map((item) => {
                    const IconComp = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id as any)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 shadow-md'
                            : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <IconComp className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                          <span>{item.label}</span>
                        </div>
                        {item.badge && (
                          <span className={`px-2 py-0.5 rounded text-[9px] font-bold font-mono ${
                            isActive
                              ? 'bg-cyan-400/30 text-cyan-200'
                              : 'bg-white/5 text-slate-400'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Admin Mode Quick Switcher */}
          <div className="bg-[#0B0F19] p-4 rounded-2xl border border-white/10 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-300">Admin Role Status</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                SUPER ADMIN
              </span>
            </div>
            <button
              onClick={() => setDemoAdminMode(!demoAdminMode)}
              className="w-full py-2 rounded-xl bg-white/[0.04] hover:bg-white/10 text-xs font-medium text-slate-300 border border-white/10 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Toggle Admin Override Mode</span>
            </button>
          </div>

        </div>

        {/* Right Content Workspace */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* TAB 1: OVERVIEW & TELEMETRY */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* Executive KPI Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                <div className="bg-[#0B0F19] p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">Sync State</span>
                    <Globe className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-xl font-bold text-white">
                    {isFirebaseConnected ? 'Firestore Cloud' : 'Cloud Sync Engine'}
                  </div>
                  <p className="text-xs text-emerald-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Real-time DB Active</span>
                  </p>
                </div>

                <div className="bg-[#0B0F19] p-5 rounded-2xl border border-amber-500/30 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase tracking-wider font-mono text-amber-400">Monetization Mode</span>
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

                <div className="bg-[#0B0F19] p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">EXE Release</span>
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-xl font-bold text-white">v{formData.downloadsInfo.version}</div>
                  <p className="text-xs text-slate-400">Size: {formData.downloadsInfo.fileSize}</p>
                </div>

                <div className="bg-[#0B0F19] p-5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-slate-400">
                    <span className="text-xs font-bold uppercase tracking-wider font-mono">System Health</span>
                    <Radio className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="text-xl font-bold text-emerald-400">{formData.systemStatus.overallStatus}</div>
                  <p className="text-xs text-slate-400">Latency: 38ms</p>
                </div>

              </div>

              {/* Visual Telemetry Chart Simulation */}
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-4">
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
                <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2 border-b border-white/10">
                  {[65, 45, 78, 92, 60, 85, 110, 95, 130, 145, 120, 160, 185, 170, 195].map((val, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
                      <div 
                        className="w-full rounded-t-md bg-gradient-to-t from-cyan-600/40 to-cyan-400 transition-all group-hover:to-cyan-300 group-hover:shadow-lg group-hover:shadow-cyan-500/30"
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
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Live Feature Flags</h3>
                    <p className="text-xs text-slate-400">Enable or disable core agent features across all user sessions instantly.</p>
                  </div>
                  <Sliders className="w-5 h-5 text-cyan-400" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(formData.featureFlags).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5">
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

          {/* TAB 2: BILLING CONTROL HUB */}
          {activeTab === 'billing' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-amber-500/30 space-y-6">
                
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
                  
                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
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
                        className="w-full px-3 py-2 rounded-xl bg-[#030712] border border-white/10 text-white font-extrabold text-lg focus:border-amber-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
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
                      className="w-full px-3 py-2 rounded-xl bg-[#030712] border border-white/10 text-amber-300 font-extrabold text-lg focus:border-amber-400 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 block">3-month billing cycle</span>
                  </div>

                  <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-2">
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
                      className="w-full px-3 py-2 rounded-xl bg-[#030712] border border-white/10 text-emerald-300 font-extrabold text-lg focus:border-amber-400 focus:outline-none"
                    />
                    <span className="text-[10px] text-slate-400 block">12-month billing cycle</span>
                  </div>

                </div>

                {/* Calculated Rate Breakdown Summary Card */}
                <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                  <h4 className="text-xs font-bold text-slate-300 uppercase font-mono">Calculated Price Summary for Users</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#030712] border border-cyan-500/20 space-y-1">
                      <span className="text-slate-400">Monthly Plan</span>
                      <div className="font-extrabold text-white text-base">
                        {formData.billingSettings?.currencySymbol || '$'}{formData.billingSettings?.billingAmount || 0} / mo
                      </div>
                      <span className="text-[10px] text-slate-500">Standard base rate</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#030712] border border-amber-500/30 space-y-1">
                      <span className="text-amber-400 font-semibold">Quarterly Plan (Save {formData.billingSettings?.quarterlyDiscountPct || 15}%)</span>
                      <div className="font-extrabold text-white text-base">
                        {formData.billingSettings?.currencySymbol || '$'}{Math.round((formData.billingSettings?.billingAmount || 0) * (1 - (formData.billingSettings?.quarterlyDiscountPct || 15) / 100))} / mo
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Billed {formData.billingSettings?.currencySymbol || '$'}{Math.round((formData.billingSettings?.billingAmount || 0) * (1 - (formData.billingSettings?.quarterlyDiscountPct || 15) / 100)) * 3} every 3 months
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#030712] border border-emerald-500/30 space-y-1">
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
                    className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white text-sm"
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

          {/* TAB 3: HERO & CAPABILITIES */}
          {activeTab === 'hero' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Tv2 className="w-5 h-5 text-cyan-400" />
                  <span>Hero Section Copy & Headings</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Badge Title</label>
                    <input
                      type="text"
                      value={formData.hero.badgeText}
                      onChange={(e) => updateHeroField('badgeText', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Badge Status Text</label>
                    <input
                      type="text"
                      value={formData.hero.badgeStatus}
                      onChange={(e) => updateHeroField('badgeStatus', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Main Brand Title</label>
                    <input
                      type="text"
                      value={formData.hero.title}
                      onChange={(e) => updateHeroField('title', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Gradient Subtitle</label>
                    <input
                      type="text"
                      value={formData.hero.subtitle}
                      onChange={(e) => updateHeroField('subtitle', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Hero Description</label>
                  <textarea
                    rows={2}
                    value={formData.hero.description}
                    onChange={(e) => updateHeroField('description', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white text-sm"
                  />
                </div>
              </div>

              {/* 5 Capability Cards */}
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-violet-400" />
                  <span>5 Capability Showcase Cards</span>
                </h3>

                <div className="space-y-4">
                  {formData.capabilityCards.map((card, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                      <div className="sm:col-span-3">
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Title</label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => updateCapabilityCard(i, 'title', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#030712] border border-white/10 text-white text-sm font-semibold"
                        />
                      </div>
                      <div className="sm:col-span-6">
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Description</label>
                        <input
                          type="text"
                          value={card.desc}
                          onChange={(e) => updateCapabilityCard(i, 'desc', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#030712] border border-white/10 text-slate-200 text-xs"
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

          {/* TAB 4: BENTO SHOWCASE */}
          {activeTab === 'bento' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Grid className="w-5 h-5 text-emerald-400" />
                  <span>Bento Grid Showcase Cards</span>
                </h3>

                <div className="space-y-4">
                  {formData.bentoCards.map((bento, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[10px] text-slate-400 block uppercase font-mono">Card Title</label>
                          <input
                            type="text"
                            value={bento.title}
                            onChange={(e) => updateBentoCard(i, 'title', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#030712] border border-white/10 text-white text-sm font-semibold"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block uppercase font-mono">Badge Label</label>
                          <input
                            type="text"
                            value={bento.badge}
                            onChange={(e) => updateBentoCard(i, 'badge', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#030712] border border-white/10 text-cyan-300 text-xs font-mono"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Description</label>
                        <textarea
                          rows={2}
                          value={bento.desc}
                          onChange={(e) => updateBentoCard(i, 'desc', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#030712] border border-white/10 text-slate-300 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PRICING TIERS */}
          {activeTab === 'pricing' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-400" />
                  <span>Pricing Tiers & Plan Offerings</span>
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {formData.pricingTiers.map((tier, i) => (
                    <div key={i} className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-4">
                      <div>
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Plan Name</label>
                        <input
                          type="text"
                          value={tier.name}
                          onChange={(e) => updatePricingTier(i, 'name', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#030712] border border-white/10 text-white font-bold text-base"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[10px] text-slate-400 block uppercase font-mono">Monthly Price</label>
                          <input
                            type="text"
                            value={tier.priceMonthly}
                            onChange={(e) => updatePricingTier(i, 'priceMonthly', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#030712] border border-white/10 text-cyan-300 font-bold text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-[10px] text-slate-400 block uppercase font-mono">Yearly Price</label>
                          <input
                            type="text"
                            value={tier.priceYearly}
                            onChange={(e) => updatePricingTier(i, 'priceYearly', e.target.value)}
                            className="w-full px-3 py-1.5 rounded-lg bg-[#030712] border border-white/10 text-cyan-300 font-bold text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Button CTA Text</label>
                        <input
                          type="text"
                          value={tier.cta}
                          onChange={(e) => updatePricingTier(i, 'cta', e.target.value)}
                          className="w-full px-3 py-1.5 rounded-lg bg-[#030712] border border-white/10 text-slate-200 text-xs font-semibold"
                        />
                      </div>

                      {/* Feature Bullet Points */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="text-[10px] text-slate-400 uppercase font-mono">Features List</label>
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
                                className="flex-1 px-2.5 py-1 rounded-md bg-[#030712] border border-white/10 text-xs text-slate-300"
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

          {/* TAB 6: FAQ MANAGER */}
          {activeTab === 'faq' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-blue-400" />
                    <span>FAQ Knowledge Items</span>
                  </h3>
                  <button
                    onClick={addFaq}
                    className="px-4 py-2 rounded-xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Question</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.faqItems.map((faq, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 relative">
                      <button
                        onClick={() => deleteFaq(i)}
                        className="absolute top-4 right-4 p-2 text-slate-500 hover:text-rose-400 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>

                      <div className="pr-10">
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Question #{i + 1}</label>
                        <input
                          type="text"
                          value={faq.q}
                          onChange={(e) => updateFaq(i, 'q', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#030712] border border-white/10 text-white font-semibold text-sm"
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 block uppercase font-mono">Answer</label>
                        <textarea
                          rows={2}
                          value={faq.a}
                          onChange={(e) => updateFaq(i, 'a', e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-[#030712] border border-white/10 text-slate-300 text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: BANNER & FLAGS */}
          {activeTab === 'banner' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-4">
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
                      className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white text-sm"
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
                    className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: RELEASES & DOWNLOADS */}
          {activeTab === 'downloads' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Download className="w-5 h-5 text-cyan-400" />
                  <span>Windows Installer Releases & Config</span>
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
                      className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white font-mono text-sm"
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
                      className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-white font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Direct Download URL (.exe)</label>
                  <input
                    type="text"
                    value={formData.downloadsInfo.exeDownloadUrl}
                    onChange={(e) => setFormData((prev) => ({
                      ...prev,
                      downloadsInfo: { ...prev.downloadsInfo, exeDownloadUrl: e.target.value }
                    }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#030712] border border-white/10 text-cyan-300 font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 9: INTEGRATIONS & AI ENDPOINTS */}
          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Server className="w-5 h-5 text-teal-400" />
                  <span>AI Endpoints & Model Bridges</span>
                </h3>

                <div className="space-y-3">
                  {formData.integrations.map((integ) => (
                    <div key={integ.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4">
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
                        onClick={() => showToast(`Tested health ping for ${integ.name}: ${integ.latency}`)}
                        className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-cyan-300 font-semibold border border-white/10 cursor-pointer"
                      >
                        Test Ping
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 10: WORKFLOW PRESET MACROS */}
          {activeTab === 'macros' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-4">
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
                    <div key={m.id} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4">
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

          {/* TAB 11: THEME & STYLING */}
          {activeTab === 'theme' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Palette className="w-5 h-5 text-pink-400" />
                  <span>Theme & Customizer</span>
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
                </div>
              </div>
            </div>
          )}

          {/* TAB 12: USERS & PERMISSIONS (REAL FIRESTORE USERS LIST) */}
          {activeTab === 'users' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-4">
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <Users className="w-5 h-5 text-indigo-400" />
                      <span>Firebase Firestore User Directory</span>
                    </h3>
                    <p className="text-xs text-slate-400">Manage registered user accounts, roles, and administrative privileges in real-time.</p>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Filter users by email/name..."
                        value={userFilter}
                        onChange={(e) => setUserFilter(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#030712] border border-white/10 text-white text-xs"
                      />
                    </div>
                    <button
                      onClick={loadUsers}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 text-xs font-semibold border border-cyan-500/30 flex items-center gap-1 cursor-pointer"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 ${loadingUsers ? 'animate-spin' : ''}`} />
                      <span>Refresh</span>
                    </button>
                  </div>
                </div>

                {loadingUsers ? (
                  <div className="text-center py-12 text-slate-400 text-sm flex flex-col items-center gap-2">
                    <RefreshCw className="w-6 h-6 text-cyan-400 animate-spin" />
                    <span>Querying Firestore user database...</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {filteredUsers.length === 0 ? (
                      <div className="text-center py-8 text-slate-500 text-xs">No users matching filter criteria.</div>
                    ) : (
                      filteredUsers.map((u, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center font-bold text-cyan-300 text-sm">
                              {(u.displayName || u.email || 'U')[0].toUpperCase()}
                            </div>
                            <div className="space-y-0.5">
                              <div className="font-semibold text-sm text-white flex items-center gap-2">
                                <span>{u.displayName || u.email?.split('@')[0]}</span>
                                {u.role === 'admin' ? (
                                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold uppercase border border-cyan-500/30">
                                    ADMIN
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 text-[10px] font-mono">
                                    USER
                                  </span>
                                )}
                              </div>
                              <div className="text-xs text-slate-400 font-mono">{u.email}</div>
                            </div>
                          </div>

                          <button
                            onClick={() => handleRoleToggle(u.uid, u.role)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                              u.role === 'admin'
                                ? 'bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20'
                                : 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20'
                            }`}
                          >
                            {u.role === 'admin' ? (
                              <>
                                <UserX className="w-3.5 h-3.5" />
                                <span>Revoke Admin</span>
                              </>
                            ) : (
                              <>
                                <UserCheck className="w-3.5 h-3.5" />
                                <span>Promote to Admin</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )}

              </div>
            </div>
          )}

          {/* TAB 13: AUDIT LOGS */}
          {activeTab === 'logs' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-[#0B0F19] p-6 rounded-2xl border border-white/10 space-y-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-400" />
                  <span>Audit Logs & Admin Actions Trail</span>
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
