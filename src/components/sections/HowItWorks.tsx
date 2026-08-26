import React from 'react';
import { MessageSquare, Cpu, Play, CheckCircle } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    { number: '01', title: 'Ask', desc: 'Tell Nirdesh what you need using natural language or voice.', icon: MessageSquare },
    { number: '02', title: 'Understand', desc: 'Nirdesh interprets your request and gathers available context.', icon: Cpu },
    { number: '03', title: 'Act', desc: 'It coordinates supported actions across your PC applications.', icon: Play },
    { number: '04', title: 'Complete', desc: 'Results appear directly in your active desktop workflow.', icon: CheckCircle },
  ];

  return (
    <section className="py-24 bg-[#050813] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            WORKFLOW ARCHITECTURE
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            How Nirdesh Works
          </h2>
          <p className="text-slate-400 text-lg">
            From natural intent to instant desktop execution in four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Animated Connecting Line */}
          <div className="hidden md:block absolute top-1/2 left-12 right-12 h-0.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-purple-500 opacity-30 z-0 -translate-y-6" />

          {steps.map((step) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.number}
                className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 relative z-10 space-y-4 group hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-cyan-400">{step.number}</span>
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <IconComp className="w-5 h-5 text-cyan-300" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
