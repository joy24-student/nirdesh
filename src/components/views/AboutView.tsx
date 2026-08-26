import React from 'react';
import { Cpu, ShieldCheck, Heart } from 'lucide-react';

export const AboutView: React.FC = () => {
  return (
    <div className="pt-28 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <div className="text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
          OUR MISSION
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white">
          Building a better way to interact with computers.
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
          Nirdesh was born from the vision that operating your personal computer should be as natural as having a conversation with an expert partner.
        </p>
      </div>

      <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/10 space-y-6 leading-relaxed text-slate-300 text-base">
        <h2 className="text-2xl font-bold text-white">The Nirdesh Philosophy</h2>
        <p>
          We believe desktop operating systems have remained fundamentally unchanged for decades. Users still spend millions of cumulative hours clicking through menus, dragging windows, copying file paths, and performing repetitive manual routines.
        </p>
        <p>
          Nirdesh introduces a unified intelligence layer above your desktop OS—combining natural language processing, visual screen OCR, relational memory, and action execution into one seamless interface.
        </p>
      </div>
    </div>
  );
};
