import React from 'react';
import { ArrowUpRight, Github, Twitter, Youtube, MessageCircle, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveView }) => {
  const handleLink = (view: string) => {
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#02040A] border-t border-white/10 relative overflow-hidden pt-20 pb-12">
      {/* Background radial ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-nirdesh-glow opacity-30 pointer-events-none blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                <img src="/asset/logo.png" alt="Nirdesh" className="w-6 h-6 object-contain" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">NIRDESH</span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Your PC. Your Command. The intelligent AI PC Agent that understands natural language, reasons about tasks, controls applications, and automates desktop workflows.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://x.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => handleLink('features')} className="hover:text-cyan-400 transition-colors">Features</button></li>
              <li><button onClick={() => handleLink('capabilities')} className="hover:text-cyan-400 transition-colors">Capabilities Catalog</button></li>
              <li><button onClick={() => handleLink('pricing')} className="hover:text-cyan-400 transition-colors">Pricing & Plans</button></li>
              <li><button onClick={() => handleLink('download')} className="hover:text-cyan-400 transition-colors">Download Windows</button></li>
              <li><button onClick={() => handleLink('status')} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"/> System Status</button></li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => handleLink('docs')} className="hover:text-cyan-400 transition-colors">Documentation</button></li>
              <li><button onClick={() => handleLink('support')} className="hover:text-cyan-400 transition-colors">Help & Support</button></li>
              <li><button onClick={() => handleLink('docs')} className="hover:text-cyan-400 transition-colors">API & Integrations</button></li>
              <li><button onClick={() => handleLink('support')} className="hover:text-cyan-400 transition-colors">Community Forum</button></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Company & Safety</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><button onClick={() => handleLink('about')} className="hover:text-cyan-400 transition-colors">About Nirdesh</button></li>
              <li><button onClick={() => handleLink('privacy')} className="hover:text-cyan-400 transition-colors">Privacy Policy</button></li>
              <li><button onClick={() => handleLink('terms')} className="hover:text-cyan-400 transition-colors">Terms of Service</button></li>
              <li><button onClick={() => handleLink('security')} className="hover:text-cyan-400 transition-colors flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-cyan-400"/> Security Specs</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 NIRDESH AI AGENT INC. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Windows 11 / 10 (64-bit)</span>
            <span>Cloudflare R2 & Firebase Sync</span>
            <span className="text-cyan-400 font-medium">Build v6.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
