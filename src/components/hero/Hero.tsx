import React from 'react';
import { Rocket, Play, ChevronDown, MonitorCheck, Sparkles } from 'lucide-react';
import { SystemStatusPanel } from './SystemStatusPanel';
import { CapabilityCards } from './CapabilityCards';

interface HeroProps {
  onLaunch: () => void;
  onWatchVideo: () => void;
  onViewStatus: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunch, onWatchVideo, onViewStatus }) => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 overflow-hidden">
      
      {/* Hero Cinematic Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(2, 4, 10, 0.45) 0%, rgba(2, 4, 10, 0.85) 75%, #02040A 100%), url('/asset/herobackground.png')`,
        }}
      />

      {/* Subtle glowing ambient spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-violet-600/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          
          {/* Left Column: Heading & CTAs */}
          <div className="lg:col-span-8 space-y-6 text-left">
            
            {/* System Status Pill Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-cyan-500/30 shadow-lg shadow-cyan-950/50">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold text-slate-200 tracking-wide">System Ready</span>
              <span className="text-slate-500">|</span>
              <span className="text-xs text-cyan-300">All core modules online</span>
            </div>

            {/* Main Hero Headings */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none">
                Nirdesh
              </h1>
              <p className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-gradient">
                Your PC. Your Command.
              </p>
            </div>

            {/* Description */}
            <p className="text-slate-300 text-lg sm:text-xl max-w-2xl font-normal leading-relaxed">
              Nirdesh is your intelligent AI agent that understands, thinks and <span className="text-cyan-300 font-semibold">gets things done</span> on your PC.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onLaunch}
                className="flex items-center gap-3 px-8 py-4 text-base font-bold text-white rounded-2xl bg-nirdesh-gradient hover:opacity-95 transition-all shadow-xl shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <Rocket className="w-5 h-5 animate-bounce" />
                <span>Launch Nirdesh</span>
              </button>

              <button
                onClick={onWatchVideo}
                className="flex items-center gap-2.5 px-7 py-4 text-base font-medium text-slate-200 rounded-2xl glass-panel hover:bg-white/10 hover:border-cyan-500/40 transition-all cursor-pointer group"
              >
                <div className="w-7 h-7 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
                </div>
                <span>Watch Introduction</span>
              </button>
            </div>

            {/* Microcopy */}
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-2">
              <MonitorCheck className="w-4 h-4 text-emerald-400" />
              <span>Optimized for Windows 11 / 10 (64-bit)</span>
            </div>

          </div>

          {/* Right Column: Nirdesh Live System Panel Overlay */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <SystemStatusPanel onViewStatus={onViewStatus} />
          </div>

        </div>

        {/* 5 Capability Cards Grid */}
        <CapabilityCards />

      </div>

      {/* Scroll indicator */}
      <div className="relative z-20 flex justify-center pt-8">
        <button
          onClick={() => {
            window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' });
          }}
          className="flex flex-col items-center gap-1 text-xs text-slate-400 hover:text-cyan-300 transition-colors group cursor-pointer"
        >
          <span className="tracking-widest uppercase text-[10px]">Scroll to explore</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
        </button>
      </div>

    </section>
  );
};
