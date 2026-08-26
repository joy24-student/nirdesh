import React, { useState } from 'react';
import { GraduationCap, Code2, Palette, Briefcase, Zap, CheckCircle2 } from 'lucide-react';

export const UseCaseTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Students');

  const useCases = [
    {
      role: 'Students',
      icon: GraduationCap,
      headline: 'Organize coursework & focus on learning.',
      points: [
        'Organize downloads and study materials by course topic automatically',
        'Summarize 50+ page PDFs into key bullet points',
        'Prepare exam revision workspace with focus timer & notes',
        'Find lost research papers using natural language query'
      ]
    },
    {
      role: 'Developers',
      icon: Code2,
      headline: 'Automate dev environment setup & file routines.',
      points: [
        'Launch VS Code, Terminal, and Docker containers with one phrase',
        'Scan screen error tracebacks and suggest fix context',
        'Organize project repositories and cleanup node_modules',
        'Automate multi-repo git commit & branch switching routines'
      ]
    },
    {
      role: 'Creators',
      icon: Palette,
      headline: 'Manage media assets & export pipelines.',
      points: [
        'Sort raw video footage & audio assets by date/project',
        'Launch Photoshop, Premiere, or Figma with preset templates',
        'Automate file renaming and cloud upload to Cloudflare R2',
        'Extract audio waveforms and transcribe voice notes'
      ]
    },
    {
      role: 'Professionals',
      icon: Briefcase,
      headline: 'Streamline meetings, docs, and daily workflows.',
      points: [
        'Prepare meeting notes and email follow-ups automatically',
        'Organize financial receipts & invoices into Excel sheets',
        'Switch between client workspaces with zero manual window dragging',
        'Generate executive summaries of long email threads'
      ]
    }
  ];

  const currentCase = useCases.find((u) => u.role === activeTab) || useCases[0];

  return (
    <section className="py-24 bg-[#02040A] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            TAILORED WORKFLOWS
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for how you work.
          </h2>
          <p className="text-slate-400 text-lg">
            See how Nirdesh supercharges productivity for every domain.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {useCases.map((uc) => {
            const IconComp = uc.icon;
            const isActive = activeTab === uc.role;

            return (
              <button
                key={uc.role}
                onClick={() => setActiveTab(uc.role)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-nirdesh-gradient text-white shadow-lg shadow-cyan-500/30 scale-105'
                    : 'glass-panel text-slate-300 hover:text-white hover:border-cyan-500/30'
                }`}
              >
                <IconComp className="w-4 h-4" />
                <span>{uc.role}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Use Case Content */}
        <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">{currentCase.headline}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {currentCase.points.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <span className="text-sm text-slate-200 leading-relaxed">{pt}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
