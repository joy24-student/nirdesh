import React, { useState } from 'react';
import { Cpu, Eye, Database, AppWindow, Folder, Globe, Zap, Mic } from 'lucide-react';

export const OrbitalSystem: React.FC = () => {
  const [activeNode, setActiveNode] = useState('Voice');

  const nodes = [
    { name: 'Voice', icon: Mic, color: 'text-cyan-400', desc: 'Sub-300ms speech input & voice command execution' },
    { name: 'Vision', icon: Eye, color: 'text-purple-400', desc: 'Real-time UI element detection & OCR screen analysis' },
    { name: 'Memory', icon: Database, color: 'text-blue-400', desc: 'Long-term context extraction & project graph memory' },
    { name: 'Apps', icon: AppWindow, color: 'text-emerald-400', desc: 'Seamless window management & native desktop execution' },
    { name: 'Files', icon: Folder, color: 'text-amber-400', desc: 'Natural language file search, organization & parsing' },
    { name: 'Browser', icon: Globe, color: 'text-sky-400', desc: 'Automated web navigation & page interaction' },
    { name: 'Automation', icon: Zap, color: 'text-indigo-400', desc: 'Multi-step routine execution with custom triggers' },
  ];

  return (
    <section className="py-24 bg-[#050813] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            Unified Ecosystem
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            One agent. Your entire computer.
          </h2>
          <p className="text-slate-400 text-lg">
            Nirdesh connects language, reasoning, vision, memory and automation into one intelligent desktop experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Orbital Visualizer */}
          <div className="lg:col-span-7 flex justify-center relative min-h-[420px]">
            {/* Center N Node */}
            <div className="relative w-28 h-28 rounded-full bg-nirdesh-gradient p-[2px] shadow-2xl shadow-cyan-500/50 flex items-center justify-center animate-float z-10">
              <div className="w-full h-full rounded-full bg-[#050813] flex flex-col items-center justify-center">
                <img src="/asset/logo.png" alt="Nirdesh Core" className="w-12 h-12 object-contain" />
                <span className="text-[10px] font-bold text-cyan-400 tracking-wider mt-1">CORE</span>
              </div>
            </div>

            {/* Orbit Ring */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] rounded-full border border-cyan-500/20 animate-glow-spin" />
            </div>

            {/* Orbiting Nodes */}
            {nodes.map((node, i) => {
              const angle = (i * 360) / nodes.length;
              const radius = 170; // px
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              const IconComp = node.icon;

              return (
                <button
                  key={node.name}
                  onClick={() => setActiveNode(node.name)}
                  style={{
                    transform: `translate(${x}px, ${y}px)`,
                  }}
                  className={`absolute w-12 h-12 rounded-xl glass-panel border flex items-center justify-center transition-all duration-300 group cursor-pointer ${
                    activeNode === node.name
                      ? 'border-cyan-400 bg-cyan-500/20 scale-125 shadow-lg shadow-cyan-500/30'
                      : 'border-white/10 hover:border-cyan-500/40 hover:scale-110'
                  }`}
                >
                  <IconComp className={`w-5 h-5 ${node.color}`} />
                </button>
              );
            })}
          </div>

          {/* Right Description Card */}
          <div className="lg:col-span-5 space-y-4">
            {nodes
              .filter((n) => n.name === activeNode)
              .map((n) => {
                const IconComp = n.icon;
                return (
                  <div
                    key={n.name}
                    className="glass-panel p-8 rounded-3xl border border-cyan-500/30 shadow-2xl animate-fadeIn space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                        <IconComp className={`w-6 h-6 ${n.color}`} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{n.name} Module</h3>
                        <span className="text-xs text-cyan-400 font-mono">System Node Active</span>
                      </div>
                    </div>

                    <p className="text-slate-300 leading-relaxed text-base">
                      {n.desc}
                    </p>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                      <span>Latency: &lt;50ms</span>
                      <span>Security: Encrypted</span>
                    </div>
                  </div>
                );
              })}
          </div>

        </div>

      </div>
    </section>
  );
};
