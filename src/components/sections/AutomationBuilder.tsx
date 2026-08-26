import React, { useState } from 'react';
import { Zap, ArrowRight, Check, Plus, Play, Sparkles } from 'lucide-react';

export const AutomationBuilder: React.FC = () => {
  const [activePreset, setActivePreset] = useState(0);

  const presets = [
    {
      trigger: "When I start studying",
      actions: [
        "Open Google Chrome to course portal",
        "Open Class Notes in Notion",
        "Enable Focus Mode & Mute notifications",
        "Start 45-minute Study Timer",
      ]
    },
    {
      trigger: "When I launch coding mode",
      actions: [
        "Launch Visual Studio Code",
        "Start Docker Desktop background engine",
        "Open Terminal to /projects/nirdesh",
        "Open Spotify to Focus Beats",
      ]
    },
    {
      trigger: "End of workday cleanup",
      actions: [
        "Commit git changes in active repos",
        "Backup Downloads folder to cloud",
        "Close browser tabs except email",
        "Put PC to Sleep in 10 minutes",
      ]
    }
  ];

  return (
    <section className="py-24 bg-[#02040A] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            WORKFLOW AUTOMATION
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Turn routines into one command.
          </h2>
          <p className="text-slate-400 text-lg">
            Create automated macro chains across all your desktop apps without writing code.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-center">
          
          {/* Preset Buttons */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Select Routine Demo:</h4>
            {presets.map((p, idx) => (
              <button
                key={p.trigger}
                onClick={() => setActivePreset(idx)}
                className={`w-full text-left p-4 rounded-2xl glass-panel border transition-all cursor-pointer flex items-center justify-between ${
                  activePreset === idx
                    ? 'border-cyan-400 bg-cyan-500/15 text-white shadow-lg'
                    : 'border-white/10 text-slate-300 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Zap className={`w-4 h-4 ${activePreset === idx ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span className="font-semibold text-sm">"{p.trigger}"</span>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </button>
            ))}
          </div>

          {/* Routine Visualization */}
          <div className="lg:col-span-8">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-6">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-bold text-slate-200">Trigger: "{presets[activePreset].trigger}"</span>
                </div>
                <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                  <Play className="w-3 h-3 fill-emerald-400" /> Ready to Run
                </span>
              </div>

              {/* Action Sequence */}
              <div className="space-y-3">
                {presets[activePreset].actions.map((act, i) => (
                  <div key={i} className="flex items-center gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/10 text-sm font-medium text-slate-200">
                    <div className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-xs font-mono font-bold">
                      {i + 1}
                    </div>
                    <ArrowRight className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
