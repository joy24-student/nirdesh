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
  }
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
  const [demoAdminMode, setDemoAdminMode] = useState<boolean>(true); // Default enabled so admin panel is easily accessible
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
