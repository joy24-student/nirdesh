import React, { useState, useEffect } from 'react';
import { Activity, Radio, ChevronRight } from 'lucide-react';

interface SystemStatusPanelProps {
  onViewStatus: () => void;
}

export const SystemStatusPanel: React.FC<SystemStatusPanelProps> = ({ onViewStatus }) => {
  const [activeModuleIndex, setActiveModuleIndex] = useState(0);

  const modules = [
    { name: 'AI Core', status: 'Online', color: 'text-emerald-400' },
    { name: 'Memory', status: 'Active', color: 'text-cyan-400' },
    { name: 'Automation', status: 'Ready', color: 'text-emerald-400' },
    { name: 'Vision', status: 'Standby', color: 'text-cyan-300' },
    { name: 'Voice', status: 'Ready', color: 'text-emerald-400' },
    { name: 'Security', status: 'Active', color: 'text-emerald-400' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveModuleIndex((prev) => (prev + 1) % modules.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-5 border border-cyan-500/20 shadow-2xl shadow-cyan-950/40 backdrop-blur-2xl w-full max-w-xs relative overflow-hidden group">
      {/* Decorative top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-purple-500" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <span className="font-semibold text-sm text-white tracking-wide">Nirdesh Live</span>
        </div>
        <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
      </div>

      {/* Module Rows */}
      <div className="space-y-2.5 font-mono text-xs">
        {modules.map((mod, i) => (
          <div
            key={mod.name}
            className={`flex items-center justify-between py-1 px-2 rounded-lg transition-all duration-300 ${
              i === activeModuleIndex ? 'bg-cyan-500/10 border border-cyan-500/20' : ''
            }`}
          >
            <span className="text-slate-300">{mod.name}</span>
            <span className={`font-semibold ${mod.color} flex items-center gap-1.5`}>
              <span className={`w-1.5 h-1.5 rounded-full ${i === activeModuleIndex ? 'bg-cyan-400 animate-ping' : 'bg-emerald-400'}`} />
              {mod.status}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <button
        onClick={onViewStatus}
        className="w-full mt-4 pt-3 border-t border-white/10 text-xs text-slate-300 hover:text-cyan-300 flex items-center justify-center gap-1 group/btn transition-colors cursor-pointer"
      >
        <Activity className="w-3.5 h-3.5 text-cyan-400" />
        <span>View System Status</span>
        <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
