import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  NAV_ITEMS, 
  HERO_CAPABILITY_CARDS, 
  BENTO_CARDS, 
  PRICING_TIERS, 
  FAQ_ITEMS, 
  INTEGRATIONS 
} from '../config/siteData';
import { 
  listenToAuthState, 
  subscribeToSiteConfig, 
  saveSiteConfigToFirestore, 
  isUsingDummyConfig 
} from '../config/firebase';

export interface SiteConfig {
  hero: {
    badgeText: string;
    badgeStatus: string;
    title: string;
    subtitle: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  capabilityCards: Array<{
    title: string;
    desc: string;
    icon: string;
    color: string;
  }>;
  bentoCards: Array<{
    title: string;
    desc: string;
    badge: string;
    colSpan: string;
    gradient: string;
  }>;
  pricingTiers: Array<{
    name: string;
    priceMonthly: string;
    priceYearly: string;
    desc: string;
    features: string[];
    highlight: boolean;
    badge?: string;
    cta: string;
  }>;
  billingSettings: {
    enableBilling: boolean;
    billingAmount: number;
    monthlyPrice: number;
    quarterlyPrice: number;
    yearlyPrice: number;
    quarterlyDiscountPct: number;
    yearlyDiscountPct: number;
    currencySymbol: string;
    billingPeriod: string;
    freeNoticeText: string;
    gatewayStatus: 'Disabled' | 'Stripe Ready' | 'Razorpay Ready' | 'PayPal Ready';
  };
  faqItems: Array<{
    q: string;
    a: string;
  }>;
  announcementBanner: {
    enabled: boolean;
    badge: string;
    text: string;
    linkText: string;
    linkTarget: string;
    theme: 'cyan' | 'purple' | 'emerald' | 'amber';
  };
  featureFlags: {
    enableVoiceMode: boolean;
    enableVisionOCR: boolean;
    enableCloudSync: boolean;
    enableCommunitySupport: boolean;
    maintenanceMode: boolean;
  };
  systemStatus: {
    overallStatus: 'Operational' | 'Degraded' | 'Maintenance';
    aiCoreStatus: string;
    visionStatus: string;
    latencyMs: number;
    activeNodes: number;
    lastChecked: string;
  };
  downloadsInfo: {
    version: string;
    releaseDate: string;
    exeDownloadUrl: string;
    fileSize: string;
    releaseNotes: string;
  };
  themeSettings: {
    primaryAccent: string;
    gradientPreset: 'cyan-violet' | 'emerald-cyan' | 'purple-pink' | 'amber-orange';
    glowIntensity: number;
  };
  integrations: Array<{
    id: string;
    name: string;
    status: 'Online' | 'Offline' | 'Standby';
    icon: string;
    latency: string;
  }>;
  macroPresets: Array<{
    id: string;
    name: string;
    category: string;
    desc: string;
    hotkey: string;
  }>;
  auditLogs: Array<{
    id: string;
    time: string;
    action: string;
    type: 'info' | 'warning' | 'success' | 'alert';
  }>;
}

const DEFAULT_SITE_CONFIG: SiteConfig = {
  hero: {
    badgeText: 'System Ready',
    badgeStatus: 'All core modules online',
    title: 'Nirdesh',
    subtitle: 'Your PC. Your Command.',
    description: 'Nirdesh is your intelligent AI agent that understands, thinks and gets things done on your PC.',
    ctaPrimary: 'Launch Nirdesh',
    ctaSecondary: 'Watch Introduction'
  },
  capabilityCards: HERO_CAPABILITY_CARDS,
  bentoCards: BENTO_CARDS,
  pricingTiers: PRICING_TIERS,
  billingSettings: {
    enableBilling: false,
    billingAmount: 0,
    monthlyPrice: 19,
    quarterlyPrice: 45,
    yearlyPrice: 144,
    quarterlyDiscountPct: 15,
    yearlyDiscountPct: 30,
    currencySymbol: '$',
    billingPeriod: '/month',
    freeNoticeText: '100% Free & Open Access — No Credit Card Required',
    gatewayStatus: 'Disabled'
  },
  faqItems: FAQ_ITEMS,
  announcementBanner: {
    enabled: true,
    badge: 'v6.0 RELEASED',
    text: 'Nirdesh Desktop Agent v6.0 is now live with real-time Vision OCR & Voice Mode!',
    linkText: 'Download Now',
    linkTarget: 'download',
    theme: 'cyan'
  },
  featureFlags: {
    enableVoiceMode: true,
    enableVisionOCR: true,
    enableCloudSync: true,
    enableCommunitySupport: true,
    maintenanceMode: false
  },
  systemStatus: {
    overallStatus: 'Operational',
    aiCoreStatus: 'Active & Responding',
    visionStatus: 'Sub-300ms Processing',
    latencyMs: 38,
    activeNodes: 12450,
    lastChecked: 'Just now'
  },
  downloadsInfo: {
    version: '6.0.0',
    releaseDate: 'August 2026',
    exeDownloadUrl: '/downloads/NIRDESH-Setup.exe',
    fileSize: '42.8 MB',
    releaseNotes: 'Includes AI Core v3.2, Vision OCR Engine, Voice Waveform, and local encrypted memory database.'
  },
  themeSettings: {
    primaryAccent: '#00C8FF',
    gradientPreset: 'cyan-violet',
    glowIntensity: 85
  },
  integrations: [
    { id: '1', name: 'OpenAI GPT-4o Bridge', status: 'Online', icon: 'Sparkles', latency: '120ms' },
    { id: '2', name: 'Anthropic Claude 3.5 Sonnet', status: 'Online', icon: 'Zap', latency: '145ms' },
    { id: '3', name: 'Google Gemini Vision 1.5', status: 'Online', icon: 'Eye', latency: '95ms' },
    { id: '4', name: 'Local Ollama Llama-3', status: 'Online', icon: 'Terminal', latency: '12ms' },
    { id: '5', name: 'Firebase Cloud DB', status: 'Online', icon: 'Database', latency: '28ms' }
  ],
  macroPresets: [
    { id: 'm1', name: 'Dev Environment Setup', category: 'Developer', desc: 'Launch VS Code, Chrome localhost:3000, and Terminal.', hotkey: 'Ctrl+Shift+D' },
    { id: 'm2', name: 'Clean Temp & Boost RAM', category: 'System Optimization', desc: 'Purge temporary cache files and close heavy idle processes.', hotkey: 'Ctrl+Shift+C' },
    { id: 'm3', name: 'Smart Screen OCR Summarizer', category: 'Productivity', desc: 'Capture active screen text, extract key points into Notes.', hotkey: 'Ctrl+Alt+S' }
  ],
  auditLogs: [
    { id: 'l1', time: '10 mins ago', action: 'Admin logged in via Firebase OAuth', type: 'info' },
    { id: 'l2', time: '25 mins ago', action: 'Saved site configuration to Firestore', type: 'success' },
    { id: 'l3', time: '1 hour ago', action: 'Software Release v6.0.0 updated', type: 'info' }
  ]
};

interface SiteContextType {
  siteConfig: SiteConfig;
  currentUser: any;
  userRole: 'admin' | 'user';
  demoAdminMode: boolean;
  isFirebaseConnected: boolean;
  saveConfig: (newConfig: Partial<SiteConfig>) => Promise<boolean>;
  resetToDefaults: () => Promise<boolean>;
  setDemoAdminMode: (enabled: boolean) => void;
  setCurrentUser: (user: any) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [demoAdminMode, setDemoAdminMode] = useState<boolean>(true);
  const [userRole, setUserRole] = useState<'admin' | 'user'>('admin');
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(!isUsingDummyConfig);

  // Subscribe to Firebase Auth
  useEffect(() => {
    const unsubscribe = listenToAuthState((user) => {
      if (user) {
        setCurrentUser(user);
        const isAdmin = user.email?.includes('admin') || user.email === 'joy24.student@gmail.com';
        setUserRole(isAdmin ? 'admin' : 'user');
      }
    });
    return () => unsubscribe();
  }, []);

  // Sync userRole with demoAdminMode
  useEffect(() => {
    if (demoAdminMode) {
      setUserRole('admin');
    } else if (currentUser) {
      const isAdmin = currentUser.email?.includes('admin') || currentUser.email === 'joy24.student@gmail.com';
      setUserRole(isAdmin ? 'admin' : 'user');
    } else {
      setUserRole('user');
    }
  }, [demoAdminMode, currentUser]);

  // Subscribe to Firestore Config Live Sync
  useEffect(() => {
    const unsub = subscribeToSiteConfig((incomingData) => {
      if (incomingData) {
        setSiteConfig((prev) => ({
          ...prev,
          ...incomingData
        }));
      }
    }, DEFAULT_SITE_CONFIG);

    return () => {
      if (typeof unsub === 'function') unsub();
    };
  }, []);

  const saveConfig = async (newConfig: Partial<SiteConfig>): Promise<boolean> => {
    const merged = { ...siteConfig, ...newConfig };
    setSiteConfig(merged);
    const res = await saveSiteConfigToFirestore(merged);
    return res.success;
  };

  const resetToDefaults = async (): Promise<boolean> => {
    setSiteConfig(DEFAULT_SITE_CONFIG);
    const res = await saveSiteConfigToFirestore(DEFAULT_SITE_CONFIG);
    return res.success;
  };

  return (
    <SiteContext.Provider
      value={{
        siteConfig,
        currentUser,
        userRole,
        demoAdminMode,
        isFirebaseConnected,
        saveConfig,
        resetToDefaults,
        setDemoAdminMode,
        setCurrentUser
      }}
    >
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteContext = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSiteContext must be used within a SiteProvider');
  }
  return context;
};
