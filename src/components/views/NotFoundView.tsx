import React from 'react';
import { AlertTriangle, Home, BookOpen } from 'lucide-react';

interface NotFoundViewProps {
  setActiveView: (view: string) => void;
}

export const NotFoundView: React.FC<NotFoundViewProps> = ({ setActiveView }) => {
  return (
    <div className="pt-36 pb-28 max-w-xl mx-auto px-4 text-center space-y-6">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <h1 className="text-6xl font-extrabold text-white">404</h1>
      <h2 className="text-xl font-bold text-cyan-400 font-mono">Command Not Found</h2>
      <p className="text-slate-400 text-sm">
        The requested route or module does not exist in the Nirdesh desktop system map.
      </p>

      <div className="flex items-center justify-center gap-4 pt-4">
        <button
          onClick={() => setActiveView('home')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-nirdesh-gradient text-white font-bold text-sm shadow-lg cursor-pointer"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </button>
        <button
          onClick={() => setActiveView('docs')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl glass-panel text-slate-300 font-bold text-sm hover:text-white cursor-pointer"
        >
          <BookOpen className="w-4 h-4" />
          <span>Open Docs</span>
        </button>
      </div>
    </div>
  );
};
