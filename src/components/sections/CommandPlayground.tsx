import React, { useState } from 'react';
import { Terminal, Send, CheckCircle2, Play, Sparkles, RefreshCw } from 'lucide-react';

export const CommandPlayground: React.FC = () => {
  const [inputCommand, setInputCommand] = useState('Organize my Downloads folder');
  const [executing, setExecuting] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const sampleCommands = [
    'Organize my Downloads folder',
    'Prepare my study workspace',
    'Find yesterday\'s presentation',
    'Launch my coding environment'
  ];

  const handleRun = (cmdToRun?: string) => {
    const cmd = cmdToRun || inputCommand;
    setExecuting(true);
    setLogs(['[Nirdesh] Interpreting command intent...']);

    setTimeout(() => {
      setLogs((prev) => [...prev, '[Memory] Retreived workspace context & file maps']);
    }, 600);

    setTimeout(() => {
      setLogs((prev) => [...prev, '[Vision] Verified desktop window boundaries']);
    }, 1200);

    setTimeout(() => {
      setLogs((prev) => [...prev, '[Action] Executed task sequence successfully!']);
      setExecuting(false);
    }, 1800);
  };

  return (
    <section className="py-24 bg-[#02040A] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            INTERACTIVE DEMO SANDBOX
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Try a command right now.
          </h2>
          <p className="text-slate-400 text-lg">
            Test Nirdesh's simulated task reasoning pipeline directly inside your browser.
          </p>
        </div>

        <div className="max-w-3xl mx-auto glass-panel p-6 sm:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-6">
          
          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-mono">Suggested:</span>
            {sampleCommands.map((sc) => (
              <button
                key={sc}
                onClick={() => {
                  setInputCommand(sc);
                  handleRun(sc);
                }}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all cursor-pointer"
              >
                {sc}
              </button>
            ))}
          </div>

          {/* Command Input Box */}
          <div className="flex items-center gap-2 p-2 rounded-2xl bg-black/60 border border-white/10 focus-within:border-cyan-400 transition-all">
            <Terminal className="w-5 h-5 text-cyan-400 ml-2" />
            <input
              type="text"
              value={inputCommand}
              onChange={(e) => setInputCommand(e.target.value)}
              placeholder="Tell Nirdesh what to do..."
              className="w-full bg-transparent text-white text-sm focus:outline-none px-2"
            />
            <button
              onClick={() => handleRun()}
              disabled={executing}
              className="px-6 py-2.5 rounded-xl bg-nirdesh-gradient text-white font-bold text-xs shadow-md hover:opacity-95 transition-all cursor-pointer flex items-center gap-2"
            >
              {executing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              <span>Execute</span>
            </button>
          </div>

          {/* Execution Log Terminal Window */}
          <div className="p-4 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-slate-300 min-h-[120px] space-y-2">
            <div className="flex items-center justify-between text-slate-500 text-[10px] pb-1 border-b border-white/5">
              <span>SANDBOX LOG CONSOLE</span>
              <span>SIMULATION MODE</span>
            </div>
            {logs.length === 0 ? (
              <span className="text-slate-600">Select or type a command and click Execute to view execution output.</span>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-cyan-300 flex items-center gap-2">
                  <span>&gt;</span>
                  <span>{log}</span>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
