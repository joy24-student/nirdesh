import React from 'react';
import { INTEGRATIONS } from '../../config/siteData';
import { Code, Globe, Terminal, Folder, GitBranch, FileText, Music, MessageSquare, Briefcase, Cloud, Sparkles } from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Code,
  Globe,
  Terminal,
  Folder,
  GitBranch,
  FileText,
  Music,
  MessageSquare,
  Briefcase,
  Cloud,
};

export const IntegrationCloud: React.FC = () => {
  return (
    <section className="py-24 bg-[#050813] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            DESKTOP INTEGRATIONS
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Works where you work.
          </h2>
          <p className="text-slate-400 text-lg">
            Nirdesh interfaces directly with your essential operating system software.
          </p>
        </div>

        {/* Constellation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {INTEGRATIONS.map((app) => {
            const IconComp = ICON_MAP[app.icon] || Code;
            return (
              <div
                key={app.name}
                className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 flex flex-col items-center justify-center gap-3 group hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                  <IconComp className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="font-bold text-sm text-slate-200 group-hover:text-cyan-300 transition-colors">{app.name}</span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  Supported
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
