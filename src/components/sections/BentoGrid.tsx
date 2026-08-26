import React from 'react';
import { BENTO_CARDS } from '../../config/siteData';
import { Brain, Eye, Database, Zap, Mic, ShieldCheck, Sparkles, Folder, Globe, AppWindow } from 'lucide-react';

const ICON_LIST = [Brain, Eye, Database, Zap, Mic, ShieldCheck];

export const BentoGrid: React.FC = () => {
  return (
    <section className="py-24 bg-[#02040A] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            CAPABILITIES MATRIX
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Engineered for complete desktop mastery.
          </h2>
          <p className="text-slate-400 text-lg">
            Explore the core architectural modules powering Nirdesh.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BENTO_CARDS.map((card, idx) => {
            const IconComp = ICON_LIST[idx % ICON_LIST.length];
            return (
              <div
                key={card.title}
                className={`glass-panel p-8 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1 relative overflow-hidden flex flex-col justify-between ${card.colSpan}`}
              >
                {/* Background Subtle Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-50 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                <div className="relative z-10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComp className="w-6 h-6 text-cyan-400" />
                    </div>
                    <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-300">
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {card.title}
                  </h3>

                  <p className="text-slate-300 leading-relaxed text-sm">
                    {card.desc}
                  </p>
                </div>

                <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1 text-cyan-400 font-medium">
                    <Sparkles className="w-3.5 h-3.5" /> Module Ready
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">Explore Spec &rarr;</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
