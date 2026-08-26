import React, { useState } from 'react';
import { Brain, Eye, Database, Zap, Mic, ShieldCheck, Folder, Globe, ArrowRight, Terminal, CheckCircle2, Play, Cpu } from 'lucide-react';

export const FeaturesView: React.FC = () => {
  const [selectedFeature, setSelectedFeature] = useState(0);

  const featureList = [
    { 
      title: 'AI Core Reasoning', 
      icon: Brain, 
      desc: 'High-level reasoning that converts ambiguous instructions into robust sequential desktop execution plans with step-by-step verification.',
      demoOutput: [
        '[Plan] Step 1: Analyze active workspace & detect target files',
        '[Plan] Step 2: Extract code symbols & verify schema types',
        '[Plan] Step 3: Run tsc --noEmit check & compile bundle',
        '[Status] Access Granted: Execution completed in 1.2 seconds'
      ]
    },
    { 
      title: 'Vision & Screen OCR', 
      icon: Eye, 
      desc: 'Real-time multi-monitor visual understanding. Recognizes buttons, active forms, document text, and browser DOM elements.',
      demoOutput: [
        '[OCR] Capturing active window (1920x1080 resolution)',
        '[OCR] Detected 14 interactive buttons & 3 input text fields',
        '[OCR] Target element identified: "Publish Live to Firestore"',
        '[Status] Element clicked successfully at coordinates (X:450, Y:120)'
      ]
    },
    { 
      title: 'Workflow Macro Automation', 
      icon: Zap, 
      desc: 'Chain multiple application launches, browser searches, file operations, and terminal scripts into a single trigger phrase.',
      demoOutput: [
        '[Macro] Running preset: "Morning Dev Startup"',
        '[Action] Launching VS Code, Spotify & Chrome Dev Workspace',
        '[Action] Running `git pull origin main` in 3 repositories',
        '[Status] All 3 background tasks initialized cleanly'
      ]
    },
    { 
      title: 'Sub-300ms Voice Mode', 
      icon: Mic, 
      desc: 'Whisper AI powered voice recognition engine tuned for noisy environments and complex technical nomenclature.',
      demoOutput: [
        '[Audio] Processing speech stream (16kHz 1-channel mono)',
        '[Transcribe] "Nirdesh, organize my downloads folder by file type"',
        '[Intent] Matched action: `file_processor.organize_directory()`',
        '[Status] 24 files categorized into Documents, Images & Archives'
      ]
    },
    { 
      title: 'Zero-Trust OS Guard', 
      icon: ShieldCheck, 
      desc: 'Granular prompt controls requiring user explicit confirmation before modifying files, deleting items, or running terminal scripts.',
      demoOutput: [
        '[Guard] Intercepted destructive operation request',
        '[Guard] Permission prompt displayed to user: "Delete temp logs?"',
        '[User Action] Approved by user',
        '[Status] Cleaned 1.4 GB temporary cached files safely'
      ]
    },
    { 
      title: 'Relational Memory DB', 
      icon: Database, 
      desc: 'Local SQLite memory database mapping project directories, user habits, recent documents, and team preferences.',
      demoOutput: [
        '[Memory] Querying SQLite knowledge database',
        '[Memory] Found 14 historical context entries for "billing settings"',
        '[Memory] Applied preferred user layout preferences',
        '[Status] Context loaded into current prompt frame'
      ]
    }
  ];

  const activeFeat = featureList[selectedFeature];

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-fadeIn">
      
      {/* View Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
          DEEP ARCHITECTURAL BREAKDOWN
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          One AI Agent. Complete Desktop Mastery.
        </h1>
        <p className="text-slate-400 text-lg">
          Explore the architectural capabilities powering the Nirdesh desktop intelligence system.
        </p>
      </div>

      {/* Interactive Feature Demo Sandbox */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-bold text-white">Live Feature Execution Simulator</h3>
          </div>
          <span className="text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            Click modules below to preview real execution trace
          </span>
        </div>

        {/* Tab Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {featureList.map((f, i) => {
            const IconComp = f.icon;
            const isSel = selectedFeature === i;
            return (
              <button
                key={f.title}
                onClick={() => setSelectedFeature(i)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between space-y-2 ${
                  isSel
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <IconComp className={`w-5 h-5 ${isSel ? 'text-cyan-300' : 'text-slate-400'}`} />
                <span className="text-xs font-bold truncate">{f.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Feature Execution Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pt-2">
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-bold text-cyan-300">
              {React.createElement(activeFeat.icon, { className: 'w-4 h-4 text-cyan-400' })}
              <span>{activeFeat.title}</span>
            </div>
            <h4 className="text-2xl font-bold text-white">{activeFeat.title}</h4>
            <p className="text-slate-300 text-sm leading-relaxed">{activeFeat.desc}</p>
          </div>

          <div className="lg:col-span-6 bg-[#010206] p-5 rounded-2xl border border-white/10 space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between text-slate-400 border-b border-white/10 pb-2">
              <span className="flex items-center gap-2 text-cyan-400">
                <Terminal className="w-4 h-4" />
                <span>Nirdesh Execution Trace</span>
              </span>
              <span className="text-[10px] text-emerald-400 font-bold">ONLINE</span>
            </div>

            <div className="space-y-2 pt-1">
              {activeFeat.demoOutput.map((line, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-cyan-500 font-bold">&gt;</span>
                  <span className={idx === activeFeat.demoOutput.length - 1 ? 'text-emerald-300 font-bold' : 'text-slate-300'}>
                    {line}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Full Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {featureList.map((feat, idx) => {
          const IconComp = feat.icon;
          return (
            <div 
              key={feat.title} 
              className="glass-panel p-8 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 space-y-4 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                <IconComp className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">{feat.title}</h3>
              <p className="text-slate-300 text-sm leading-relaxed">{feat.desc}</p>
            </div>
          );
        })}
      </div>

    </div>
  );
};
