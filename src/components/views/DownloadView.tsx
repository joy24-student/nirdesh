import React, { useState } from 'react';
import { Download, Monitor, CheckCircle, ShieldCheck, Cpu, HardDrive } from 'lucide-react';

export const DownloadView: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);

  const handleStartDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloaded(true);
    }, 2000);
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
          WINDOWS INSTALLER PORTAL
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Bring intelligence to your desktop.
        </h1>
        <p className="text-slate-400 text-lg">
          Download Nirdesh for Windows 11 & Windows 10 (64-bit).
        </p>
      </div>

      {/* Main Download Card */}
      <div className="max-w-3xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-8 text-center relative overflow-hidden">
        
        <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-xl">
          <img src="/asset/logo.png" alt="Nirdesh" className="w-12 h-12 object-contain" />
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-extrabold text-white">Nirdesh Desktop v6.0.0</h2>
          <div className="flex items-center justify-center gap-4 text-xs font-mono text-cyan-400">
            <span>Size: 142 MB</span>
            <span>|</span>
            <span>Architecture: x64 / ARM64</span>
            <span>|</span>
            <span>SHA-256 Verified</span>
          </div>
        </div>

        <button
          onClick={handleStartDownload}
          disabled={downloading}
          className="px-10 py-4 rounded-2xl bg-nirdesh-gradient text-white font-extrabold text-base shadow-xl shadow-cyan-500/30 hover:opacity-95 hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-3"
        >
          <Download className={`w-5 h-5 ${downloading ? 'animate-bounce' : ''}`} />
          <span>
            {downloading
              ? 'Preparing download...'
              : downloaded
              ? 'Download Started ✓'
              : 'Download Nirdesh for Windows'}
          </span>
        </button>

        <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Monitor className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Windows 11 / 10 (64-bit)</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Intel i5 / Ryzen 5 or higher</span>
          </div>
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>8 GB RAM, 2 GB Storage</span>
          </div>
        </div>

      </div>

    </div>
  );
};
