import React, { useState } from 'react';
import { ShieldCheck, Lock, AlertTriangle, Check, X, FolderCheck } from 'lucide-react';

export const PermissionDemo: React.FC = () => {
  const [modalState, setModalState] = useState<'idle' | 'allowed' | 'cancelled'>('idle');

  return (
    <section className="py-24 bg-[#02040A] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            ZERO-TRUST OS SECURITY
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Your computer. Your control.
          </h2>
          <p className="text-slate-400 text-lg">
            Nirdesh requires explicit permission before opening software, altering files, or executing shell scripts.
          </p>
        </div>

        {/* Permission Demo Box */}
        <div className="relative max-w-lg mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 space-y-6">
          
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">Nirdesh Permission Prompt</h3>
              <p className="text-xs text-slate-400">Action Safety Verification Required</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2 text-xs font-mono text-slate-200">
            <div className="text-cyan-300 font-semibold">Nirdesh wants permission to:</div>
            <ul className="list-disc list-inside text-slate-300 space-y-1 pl-1">
              <li>Launch Visual Studio Code</li>
              <li>Access workspace <span className="text-cyan-400">d:\Projects\Nirdesh</span></li>
              <li>Read recent git branch status</li>
            </ul>
          </div>

          {/* Action Result Feedback */}
          {modalState === 'allowed' && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>Permission granted. Executing task safely...</span>
            </div>
          )}

          {modalState === 'cancelled' && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
              <X className="w-4 h-4" />
              <span>Action cancelled by user. Zero changes made.</span>
            </div>
          )}

          {/* Dialog Action Buttons */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            <button
              onClick={() => setModalState('cancelled')}
              className="py-2.5 rounded-xl glass-panel text-slate-300 text-xs font-semibold hover:bg-white/10 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => setModalState('allowed')}
              className="py-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-semibold hover:bg-cyan-500/30 transition-all cursor-pointer"
            >
              Allow Once
            </button>
            <button
              onClick={() => setModalState('allowed')}
              className="py-2.5 rounded-xl bg-nirdesh-gradient text-white text-xs font-bold shadow-md shadow-cyan-500/25 hover:opacity-95 transition-all cursor-pointer"
            >
              Always Allow
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
