import React, { useState } from 'react';
import { Mic, Volume2, CheckCircle2, Sparkles } from 'lucide-react';

export const VoiceWaveform: React.FC = () => {
  const [listening, setListening] = useState(false);

  const toggleListen = () => {
    setListening(!listening);
  };

  return (
    <section className="py-24 bg-[#050813] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            NATURAL VOICE INTERFACE
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Just say what you need.
          </h2>
          <p className="text-slate-400 text-lg">
            Ultra-responsive sub-300ms latency voice command interpretation.
          </p>
        </div>

        {/* Audio Waveform Interactive Player */}
        <div className="relative max-w-3xl mx-auto glass-panel p-8 rounded-3xl border border-cyan-500/30 shadow-2xl flex flex-col items-center justify-center space-y-6">
          
          {/* Mic Trigger */}
          <button
            onClick={toggleListen}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all cursor-pointer shadow-2xl ${
              listening
                ? 'bg-nirdesh-gradient shadow-cyan-500/50 scale-110'
                : 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:scale-105'
            }`}
          >
            <Mic className={`w-8 h-8 ${listening ? 'text-white animate-pulse' : 'text-cyan-400'}`} />
          </button>

          {/* Animated Waveform Bars */}
          <div className="flex items-center justify-center gap-1.5 h-16 w-full max-w-md">
            {[40, 75, 30, 90, 50, 85, 60, 100, 45, 80, 35, 95, 65, 40, 70].map((h, idx) => (
              <div
                key={idx}
                style={{ height: listening ? `${h}%` : '20%' }}
                className="w-2 rounded-full bg-gradient-to-t from-cyan-500 to-violet-500 transition-all duration-200"
              />
            ))}
          </div>

          {/* Simulated Speech Result */}
          <div className="text-center space-y-2">
            <span className="text-xs font-mono text-cyan-400">
              {listening ? 'Listening...' : 'Click mic to test voice input demo'}
            </span>
            <p className="text-lg font-bold text-white max-w-lg">
              "Nirdesh, prepare my coding environment."
            </p>
          </div>

          {/* Action Checklist */}
          <div className="w-full max-w-md pt-4 border-t border-white/10 grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
            <div className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> VS Code opened</div>
            <div className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Project loaded</div>
            <div className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Terminal ready</div>
            <div className="flex items-center gap-1.5 text-emerald-400"><CheckCircle2 className="w-3.5 h-3.5" /> Dev server started</div>
          </div>

        </div>

      </div>
    </section>
  );
};
