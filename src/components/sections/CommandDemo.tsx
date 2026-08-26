import React, { useState, useEffect } from 'react';
import { Terminal, CheckCircle2, ArrowRight, Loader2, Sparkles, Command } from 'lucide-react';

export const CommandDemo: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const samplePrompts = [
    "Organize today's project files, open VS Code and continue my last task.",
    "Find yesterday's PDF report in Downloads and email summary to team.",
    "Summarize current screen, create notes in Notion, and silence notifications.",
    "Start dev environment: launch Docker, open terminal, and run npm dev."
  ];

  const [selectedPromptIndex, setSelectedPromptIndex] = useState(0);

  const stages = [
    { title: "Understanding request", status: "natural language parsed" },
    { title: "Finding project context", status: "scanned workspace & recent state" },
    { title: "Preparing workspace", status: "arranging display & focus mode" },
    { title: "Opening applications", status: "launching VS Code & Terminal" },
    { title: "Task ready", status: "environment prepared in 1.2s" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % stages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-[#050813] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            AI CORE ENGINE
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built to understand what you actually mean.
          </h2>
          <p className="text-slate-400 text-lg">
            Say what you need in plain English. Nirdesh handles execution reasoning, dependency mapping, and app triggers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-6xl mx-auto">
          
          {/* Natural Language Prompt Selection (Left Column) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Select Sample Command:
            </h3>
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedPromptIndex(idx);
                  setActiveStep(0);
                }}
                className={`w-full text-left p-4 rounded-2xl glass-panel border transition-all text-sm leading-relaxed cursor-pointer flex items-start gap-3 ${
                  selectedPromptIndex === idx
                    ? 'border-cyan-400 bg-cyan-500/15 text-white shadow-lg shadow-cyan-950/50'
                    : 'border-white/10 text-slate-300 hover:border-cyan-500/30'
                }`}
              >
                <Command className={`w-4 h-4 mt-0.5 shrink-0 ${selectedPromptIndex === idx ? 'text-cyan-400' : 'text-slate-500'}`} />
                <span>"{prompt}"</span>
              </button>
            ))}
          </div>

          {/* AI Core Reasoning Pipeline Visualizer (Right Column) */}
          <div className="lg:col-span-7">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-950/40 relative space-y-6">
              
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-cyan-400" />
                  <span className="font-mono text-xs font-bold text-slate-200">Nirdesh Core Reasoning Pipeline</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
              </div>

              {/* Active Prompt Box */}
              <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-cyan-300 flex items-center gap-2">
                <span className="text-slate-500">&gt;</span>
                <span>{samplePrompts[selectedPromptIndex]}</span>
              </div>

              {/* Step Execution Sequence */}
              <div className="space-y-3">
                {stages.map((stg, i) => {
                  const isDone = i < activeStep || activeStep === stages.length - 1;
                  const isCurrent = i === activeStep && activeStep !== stages.length - 1;

                  return (
                    <div
                      key={stg.title}
                      className={`flex items-center justify-between p-3.5 rounded-xl transition-all duration-300 ${
                        isCurrent
                          ? 'bg-cyan-500/15 border border-cyan-500/40 shadow-md'
                          : isDone
                          ? 'bg-white/[0.02] border border-white/5 opacity-80'
                          : 'opacity-40'
                      }`}
                    >
                      <div className="flex items-center gap-3 font-mono text-xs">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        ) : isCurrent ? (
                          <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border border-slate-600 flex items-center justify-center text-[10px] text-slate-500">{i + 1}</div>
                        )}
                        <span className={`font-semibold ${isCurrent ? 'text-cyan-300' : 'text-slate-200'}`}>
                          {stg.title}
                        </span>
                      </div>

                      <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                        {stg.status}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
