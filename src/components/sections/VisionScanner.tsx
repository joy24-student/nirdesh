import React, { useState } from 'react';
import { Eye, Scan, CheckCircle, FileText, Globe, Box } from 'lucide-react';

export const VisionScanner: React.FC = () => {
  const [scanning, setScanning] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 2000);
  };

  return (
    <section className="py-24 bg-[#050813] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            VISION & OCR ENGINE
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Nirdesh understands what is on your screen.
          </h2>
          <p className="text-slate-400 text-lg">
            Real-time screen vision detects active windows, document layouts, web buttons, and text content.
          </p>
        </div>

        {/* Screen Scanner Mockup */}
        <div className="relative max-w-4xl mx-auto glass-panel rounded-3xl overflow-hidden border border-cyan-500/30 p-4 sm:p-6 space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Eye className="w-5 h-5 text-cyan-400" />
              <span className="font-mono text-xs font-bold text-white">Live Screen Optical Scanner</span>
            </div>
            <button
              onClick={handleScan}
              className="px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold hover:bg-cyan-500/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Scan className="w-3.5 h-3.5" />
              <span>{scanning ? 'Scanning Screen...' : 'Trigger Scan'}</span>
            </button>
          </div>

          {/* Scanner Viewport */}
          <div className="relative aspect-[16/9] w-full rounded-2xl bg-black/60 overflow-hidden border border-white/10 flex items-center justify-center">
            <img src="/asset/herobackground.png" alt="Screen View" className="w-full h-full object-cover opacity-60" />

            {/* Scan Beam Effect */}
            {scanning && (
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/30 via-cyan-400/10 to-transparent border-b-2 border-cyan-400 animate-scan pointer-events-none" />
            )}

            {/* Simulated Detected Bounding Boxes */}
            <div className="absolute top-12 left-12 p-3 rounded-xl border border-cyan-400/80 bg-cyan-500/20 text-[11px] font-mono text-cyan-200 backdrop-blur-md flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-300" />
              <span>Browser Window Detected (1920x1080)</span>
            </div>

            <div className="absolute bottom-16 right-16 p-3 rounded-xl border border-violet-400/80 bg-violet-500/20 text-[11px] font-mono text-violet-200 backdrop-blur-md flex items-center gap-2">
              <FileText className="w-4 h-4 text-violet-300" />
              <span>PDF Document OCR Read (3 actionable items)</span>
            </div>
          </div>

          {/* Prompt */}
          <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/30 font-mono text-xs text-cyan-300 flex items-center justify-between">
            <span>Command: "Summarize this PDF and save key takeaways."</span>
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" /> OCR Ready
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};
