import React, { useState } from 'react';
import { Database, Network, ShieldAlert, Sparkles, Folder, FileText, Code } from 'lucide-react';

export const MemoryGraph: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState('Project Alpha');

  const nodes = [
    { name: 'Project Alpha', icon: Code, type: 'Workspace', details: 'Contains react frontend, backend API, & config env.' },
    { name: 'Presentation.pdf', icon: FileText, type: 'Document', details: 'Last edited yesterday at 4:30 PM in Downloads.' },
    { name: 'User Preferences', icon: Database, type: 'Memory', details: 'Prefers VS Code dark mode & Chrome default browser.' },
    { name: 'Research Notes', icon: Folder, type: 'Context', details: '12 research summaries linked to Nirdesh AI docs.' },
  ];

  return (
    <section className="py-24 bg-[#02040A] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            PERSISTENT CONTEXT MEMORY
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Useful context, when you need it.
          </h2>
          <p className="text-slate-400 text-lg">
            Nirdesh builds a private relational knowledge graph of your project files, habits, and past instructions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto items-center">
          
          {/* Nodes Selection */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            {nodes.map((node) => {
              const IconComp = node.icon;
              const isSelected = selectedNode === node.name;

              return (
                <button
                  key={node.name}
                  onClick={() => setSelectedNode(node.name)}
                  className={`p-5 rounded-2xl glass-panel border text-left transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'border-cyan-400 bg-cyan-500/15 shadow-xl shadow-cyan-950/40'
                      : 'border-white/10 hover:border-cyan-500/30'
                  }`}
                >
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <IconComp className="w-5 h-5 text-cyan-300" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">{node.name}</h4>
                    <span className="text-xs text-cyan-400 font-mono">{node.type}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Node Inspector */}
          <div className="lg:col-span-6">
            <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-4">
              <div className="flex items-center gap-3">
                <Network className="w-6 h-6 text-cyan-400" />
                <h3 className="text-xl font-bold text-white">Memory Node Details</h3>
              </div>

              {nodes
                .filter((n) => n.name === selectedNode)
                .map((n) => (
                  <div key={n.name} className="space-y-4 pt-2">
                    <div className="p-4 rounded-xl bg-black/40 border border-white/10 font-mono text-xs text-slate-300 leading-relaxed">
                      {n.details}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400 pt-2 border-t border-white/10">
                      <ShieldAlert className="w-4 h-4 text-emerald-400" />
                      <span>Encrypted locally. Fully configurable in privacy settings.</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
