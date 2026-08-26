import React, { useState } from 'react';
import { Search, Sparkles, Command, CheckCircle2 } from 'lucide-react';

export const CapabilitiesView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const capabilities = [
    { category: 'Productivity', title: 'Open Applications', example: 'Open VS Code, Spotify and Chrome' },
    { category: 'Files', title: 'Search & Rename Files', example: 'Find yesterday\'s presentation PDF and rename to Final_Draft' },
    { category: 'Automation', title: 'Launch Workflows', example: 'Start my morning development routine' },
    { category: 'Vision', title: 'Screen OCR & Summarization', example: 'Summarize the visible report on my right monitor' },
    { category: 'Browser', title: 'Web Research Compilation', example: 'Gather research on Next.js 15 features into Notion' },
    { category: 'System', title: 'Focus & Mute Controls', example: 'Enable focus mode and silence notifications for 1 hour' },
    { category: 'Files', title: 'Downloads Cleanup', example: 'Organize my Downloads folder into Images, PDFs and Code' },
    { category: 'Voice', title: 'Hands-Free Execution', example: 'Nirdesh, commit git changes and start dev server' }
  ];

  const filtered = capabilities.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.example.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
          COMMAND CATALOG
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Nirdesh Capabilities Library
        </h1>
        <p className="text-slate-400 text-lg">
          Filter and explore supported desktop commands and natural language triggers.
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mt-6">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Nirdesh capabilities or examples..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl glass-panel border border-cyan-500/30 text-white text-sm focus:outline-none focus:border-cyan-400 transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cap) => (
          <div key={cap.title} className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                {cap.category}
              </span>
              <Command className="w-4 h-4 text-slate-500" />
            </div>
            <h3 className="text-lg font-bold text-white">{cap.title}</h3>
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 font-mono text-xs text-slate-300">
              "{cap.example}"
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
