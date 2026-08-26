import React, { useState } from 'react';
import { Play, X, Clock, CheckCircle, Sparkles } from 'lucide-react';

interface VideoShowcaseProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const VideoShowcase: React.FC<VideoShowcaseProps> = ({ isOpen, onOpen, onClose }) => {
  const [activeTimestamp, setActiveTimestamp] = useState('00:08');

  // Interactive video timestamps
  const timestamps = [
    { time: '00:08', label: 'Open applications' },
    { time: '00:32', label: 'Search files' },
    { time: '00:51', label: 'Control your browser' },
    { time: '01:17', label: 'Automate repetitive work' },
    { time: '01:42', label: 'Understand your screen' },
    { time: '02:03', label: 'Complete complex workflows' },
  ];

  return (
    <section className="py-24 bg-[#02040A] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            SEE NIRDESH IN ACTION
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Your computer, finally understands you.
          </h2>
          <p className="text-slate-400 text-lg">
            Watch how Nirdesh turns multi-step desktop tasks into simple natural language requests.
          </p>
        </div>

        {/* Cinematic Video Player Frame */}
        <div className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 group cursor-pointer" onClick={onOpen}>
          
          {/* Background Poster Image */}
          <div className="relative aspect-video w-full bg-cover bg-center" style={{ backgroundImage: `url('/asset/herobackground.png')` }}>
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-black/40 to-black/60 group-hover:via-black/20 transition-all" />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-nirdesh-gradient p-1 shadow-2xl shadow-cyan-500/50 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-[#02040A] flex items-center justify-center">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 fill-cyan-400 ml-1" />
                </div>
              </div>
              <div className="text-center space-y-1">
                <span className="text-white font-bold text-lg sm:text-xl">Watch Nirdesh in action</span>
                <div className="flex items-center justify-center gap-1.5 text-xs text-cyan-300">
                  <Clock className="w-3.5 h-3.5" />
                  <span>02:14 HD Demo</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Demo Timeline Cards */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
          {timestamps.map((ts) => (
            <button
              key={ts.time}
              onClick={() => {
                setActiveTimestamp(ts.time);
                onOpen();
              }}
              className={`p-3 rounded-2xl glass-panel text-left border transition-all cursor-pointer ${
                activeTimestamp === ts.time
                  ? 'border-cyan-400 bg-cyan-500/15'
                  : 'border-white/10 hover:border-cyan-500/30'
              }`}
            >
              <div className="text-xs font-mono font-bold text-cyan-400">{ts.time}</div>
              <div className="text-xs font-medium text-slate-200 line-clamp-1 mt-0.5">{ts.label}</div>
            </button>
          ))}
        </div>

      </div>

      {/* Video Modal with YouTube Embed */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden glass-panel border border-cyan-500/40 shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/60 border border-white/20 text-white hover:bg-white/20 transition-all cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>

            {/* YouTube Embed Player */}
            <iframe
              className="w-full h-full"
              src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0"
              title="Nirdesh Official Introduction Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />

          </div>
        </div>
      )}

    </section>
  );
};
