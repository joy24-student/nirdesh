import React, { useState } from 'react';
import { XCircle, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';

export const ComparisonSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section className="py-24 bg-[#050813] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            EFFICIENCY PARADIGM SHIFT
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Before vs With Nirdesh
          </h2>
          <p className="text-slate-400 text-lg">
            Compare traditional manual desktop friction with effortless natural language commands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Before Nirdesh */}
          <div className="glass-panel p-8 rounded-3xl border border-red-500/20 bg-red-950/10 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Before Nirdesh</h3>
            </div>

            <div className="space-y-3 text-sm font-mono text-slate-300">
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">1. Open Start menu & search app</div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">2. Navigate folder hierarchy manually</div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">3. Search & copy file paths line by line</div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">4. Manually resize 4 different windows</div>
              <div className="p-3 rounded-xl bg-black/40 border border-white/5">5. Repeat manual friction tomorrow</div>
            </div>

            <div className="text-xs text-red-400 font-mono">Average time: 4 to 8 minutes per routine</div>
          </div>

          {/* With Nirdesh */}
          <div className="glass-panel p-8 rounded-3xl border border-cyan-500/40 bg-cyan-950/20 space-y-6 shadow-2xl shadow-cyan-950/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-cyan-300" />
              </div>
              <h3 className="text-xl font-bold text-white">With Nirdesh</h3>
            </div>

            <div className="space-y-3 text-sm font-mono text-cyan-200">
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30">
                1. Say: "Prepare my workspace."
              </div>
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-emerald-300 font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Done in 1.2 seconds.
              </div>
            </div>

            <div className="text-xs text-cyan-300 font-mono">Average time: 1.2s instant background execution</div>
          </div>

        </div>

      </div>
    </section>
  );
};
