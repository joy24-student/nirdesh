import React, { useState } from 'react';
import { Cpu, Eye, Database, Zap, Mic, ShieldCheck, Check } from 'lucide-react';

export const CoreOrbShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('AI Core');

  const tabs = [
    { name: 'AI Core', icon: Cpu, glow: 'shadow-cyan-500/50', border: 'border-cyan-400', desc: 'Translates high-level natural language commands into step-by-step system execution strategies.' },
    { name: 'Vision', icon: Eye, glow: 'shadow-purple-500/50', border: 'border-purple-400', desc: 'Analyzes screen layout, extracts text via OCR, and locates actionable UI elements automatically.' },
    { name: 'Memory', icon: Database, glow: 'shadow-blue-500/50', border: 'border-blue-400', desc: 'Remembers project preferences, file locations, past conversations, and desktop shortcuts.' },
    { name: 'Automation', icon: Zap, glow: 'shadow-indigo-500/50', border: 'border-indigo-400', desc: 'Builds & schedules multi-app workflow routines triggered by voice, schedule, or shortcut.' },
    { name: 'Voice', icon: Mic, glow: 'shadow-emerald-500/50', border: 'border-emerald-400', desc: 'Sub-300ms ultra-low latency voice input with noise cancellation & custom wake phrase.' },
    { name: 'Security', icon: ShieldCheck, glow: 'shadow-amber-500/50', border: 'border-amber-400', desc: 'Zero-trust execution sandbox requiring user prompt confirmation before write or script actions.' },
  ];

  const currentModule = tabs.find((t) => t.name === activeTab) || tabs[0];

  return (
    <section className="py-24 bg-[#02040A] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Interactive Module Selector Buttons */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
              MODULAR INTELLIGENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              3D AI Core Showcase
            </h2>
            <p className="text-slate-400 text-sm mb-4">
              Select an architectural module to inspect its core capabilities and live parameters.
            </p>

            <div className="space-y-2">
              {tabs.map((tab) => {
                const IconComp = tab.icon;
                const isActive = activeTab === tab.name;

                return (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.name)}
                    className={`w-full text-left p-4 rounded-2xl glass-panel border transition-all cursor-pointer flex items-center justify-between group ${
                      isActive
                        ? 'border-cyan-400 bg-cyan-500/15 shadow-lg shadow-cyan-950/50'
                        : 'border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isActive ? 'bg-cyan-500/20 text-cyan-300' : 'bg-white/5 text-slate-400'}`}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>{tab.name}</span>
                    </div>

                    {isActive && <Check className="w-4 h-4 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: 3D Floating Orb Visualizer */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-lg glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/30 shadow-2xl flex flex-col items-center justify-center space-y-8">
              
              {/* Outer Glowing Ring */}
              <div className={`w-44 h-44 sm:w-56 sm:h-56 rounded-full bg-nirdesh-gradient p-[3px] shadow-2xl ${currentModule.glow} animate-pulse relative flex items-center justify-center`}>
                <div className="w-full h-full rounded-full bg-[#02040A] flex flex-col items-center justify-center p-6 text-center space-y-2">
                  <img src="/asset/logo.png" alt="Nirdesh Core" className="w-16 h-16 object-contain animate-float" />
                  <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                    {currentModule.name.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Module Details Info Card */}
              <div className="text-center space-y-3 max-w-md">
                <h3 className="text-xl font-bold text-white">{currentModule.name} Engine Specs</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{currentModule.desc}</p>
                <div className="flex items-center justify-center gap-4 text-xs font-mono text-cyan-400 pt-2 border-t border-white/10">
                  <span>State: Active</span>
                  <span>|</span>
                  <span>Model: Nirdesh v6.0</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
