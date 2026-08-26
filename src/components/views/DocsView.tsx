import React, { useState } from 'react';
import { BookOpen, Search, Code, Terminal, ChevronRight, Copy, Check } from 'lucide-react';

export const DocsView: React.FC = () => {
  const [activeTopic, setActiveTopic] = useState('Getting Started');
  const [copied, setCopied] = useState(false);

  const topics = [
    { title: 'Getting Started', content: 'Welcome to Nirdesh Documentation. Nirdesh runs as a lightweight background service on Windows 10/11.' },
    { title: 'Installation & Setup', content: 'Run the downloaded NIRDESH_Setup_v6.0.0.exe installer. Choose automatic startup options and enable micro-permissions.' },
    { title: 'AI Core Architecture', content: 'Nirdesh uses a hybrid router model. Offline requests run on local fast engines, while complex multi-step reasoning uses connected LLM APIs.' },
    { title: 'Automation Macros', content: 'Define custom workflow triggers using natural language or JSON definitions inside the Nirdesh config directory.' },
    { title: 'Vision & Screen OCR', content: 'Screen capture operates at 60 FPS in memory. OCR bounding boxes detect active UI elements for mouse click automation.' },
    { title: 'Security & Permissions', content: 'All file writes and terminal executions require explicit prompt confirmation unless configured in your trusted rules.' },
  ];

  const currentTopic = topics.find((t) => t.title === activeTopic) || topics[0];

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Sidebar Topics Navigation */}
        <div className="lg:col-span-3 space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-4 px-2">Documentation Topics</h3>
          {topics.map((t) => (
            <button
              key={t.title}
              onClick={() => setActiveTopic(t.title)}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer flex items-center justify-between ${
                activeTopic === t.title
                  ? 'bg-cyan-500/15 border border-cyan-400/40 text-cyan-300'
                  : 'glass-panel text-slate-400 hover:text-white'
              }`}
            >
              <span>{t.title}</span>
              <ChevronRight className="w-4 h-4 opacity-50" />
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:col-span-9 glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <h1 className="text-3xl font-extrabold text-white">{currentTopic.title}</h1>
            <span className="text-xs font-mono text-cyan-400">v6.0 Documentation</span>
          </div>

          <p className="text-slate-300 text-base leading-relaxed">{currentTopic.content}</p>

          {/* Sample Code Block */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Example Configuration (nirdesh.config.json)</span>
              <button onClick={handleCopy} className="flex items-center gap-1 hover:text-cyan-300 cursor-pointer">
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-black/70 border border-white/10 font-mono text-xs text-cyan-300 overflow-x-auto">
              {`{
  "agentName": "Nirdesh",
  "visionFps": 60,
  "permissionMode": "prompt-always",
  "voiceActivationKey": "Hey Nirdesh",
  "cloudflareSync": true
}`}
            </pre>
          </div>
        </div>

      </div>
    </div>
  );
};
