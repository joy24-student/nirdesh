import React from 'react';
import { Brain, Eye, Database, Zap, Mic, ShieldCheck, Folder, Globe, ArrowRight } from 'lucide-react';

export const FeaturesView: React.FC = () => {
  const featureList = [
    { title: 'AI Core Engine', icon: Brain, desc: 'High-level reasoning that converts ambiguous instructions into robust sequential desktop execution plans with step-by-step verification.' },
    { title: 'Vision & Screen OCR', icon: Eye, desc: 'Real-time multi-monitor visual understanding. Recognizes buttons, active forms, document text, and browser DOM elements.' },
    { title: 'Relational Context Memory', icon: Database, desc: 'Local memory database mapping project directories, user habits, recent documents, and team preferences.' },
    { title: 'Workflow Macro Automation', icon: Zap, desc: 'Chain multiple application launches, browser searches, file operations, and terminal scripts into a single trigger phrase.' },
    { title: 'Sub-300ms Voice Mode', icon: Mic, desc: 'Whisper AI powered voice recognition engine tuned for noisy environments and complex technical nomenclature.' },
    { title: 'Zero-Trust OS Guard', icon: ShieldCheck, desc: 'Granular prompt controls requiring user explicit confirmation before modifying files, deleting items, or running terminal scripts.' },
    { title: 'File System Intelligence', icon: Folder, desc: 'Search files by semantic content rather than exact filename. Automatically organize Downloads, desktop clutter, and project assets.' },
    { title: 'Browser Integration', icon: Globe, desc: 'Direct automation of supported browser workflows, form autofills, article summarization, and web research compilation.' },
  ];

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
          DEEP FEATURE BREAKDOWN
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          One AI agent. A new way to use your PC.
        </h1>
        <p className="text-slate-400 text-lg">
          Explore the architectural capabilities powering the Nirdesh desktop intelligence system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featureList.map((feat) => {
          const IconComp = feat.icon;
          return (
            <div key={feat.title} className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <IconComp className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">{feat.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
};
