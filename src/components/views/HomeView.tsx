import React, { useState } from 'react';
import { Hero } from '../hero/Hero';
import { OrbitalSystem } from '../sections/OrbitalSystem';
import { VideoShowcase } from '../sections/VideoShowcase';
import { CommandDemo } from '../sections/CommandDemo';
import { BentoGrid } from '../sections/BentoGrid';
import { Gallery3D } from '../sections/Gallery3D';
import { CoreOrbShowcase } from '../sections/CoreOrbShowcase';
import { HowItWorks } from '../sections/HowItWorks';
import { AutomationBuilder } from '../sections/AutomationBuilder';
import { VisionScanner } from '../sections/VisionScanner';
import { MemoryGraph } from '../sections/MemoryGraph';
import { VoiceWaveform } from '../sections/VoiceWaveform';
import { PermissionDemo } from '../sections/PermissionDemo';
import { IntegrationCloud } from '../sections/IntegrationCloud';
import { UseCaseTabs } from '../sections/UseCaseTabs';
import { ComparisonSlider } from '../sections/ComparisonSlider';
import { CommandPlayground } from '../sections/CommandPlayground';
import { FAQAccordion } from '../sections/FAQAccordion';
import { Rocket, Play } from 'lucide-react';

interface HomeViewProps {
  setActiveView: (view: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveView }) => {
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  return (
    <div className="space-y-0">
      {/* Hero */}
      <Hero
        onLaunch={() => setActiveView('download')}
        onWatchVideo={() => setVideoModalOpen(true)}
        onViewStatus={() => setActiveView('status')}
      />

      {/* Orbital System */}
      <OrbitalSystem />

      {/* Video Introduction Showcase */}
      <VideoShowcase
        isOpen={videoModalOpen}
        onOpen={() => setVideoModalOpen(true)}
        onClose={() => setVideoModalOpen(false)}
      />

      {/* AI Core Reasoning Command Demo */}
      <CommandDemo />

      {/* Capabilities Bento Grid */}
      <BentoGrid />

      {/* 3D Gallery */}
      <Gallery3D />

      {/* 3D Core Orb Showcase */}
      <CoreOrbShowcase />

      {/* Timeline How It Works */}
      <HowItWorks />

      {/* Automation Workflow Routine Builder */}
      <AutomationBuilder />

      {/* Vision Scanner */}
      <VisionScanner />

      {/* Memory Graph */}
      <MemoryGraph />

      {/* Voice Waveform */}
      <VoiceWaveform />

      {/* Security & Permission OS Demo */}
      <PermissionDemo />

      {/* Integration Cloud */}
      <IntegrationCloud />

      {/* Use Cases */}
      <UseCaseTabs />

      {/* Comparison Slider */}
      <ComparisonSlider />

      {/* Interactive Command Playground */}
      <CommandPlayground />

      {/* FAQ */}
      <FAQAccordion />

      {/* Final Cinematic Call To Action Section */}
      <section className="py-28 bg-[#02040A] relative overflow-hidden border-t border-white/5 text-center">
        <div className="absolute inset-0 bg-nirdesh-glow opacity-30 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <h2 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
            Your PC is ready for a new kind of intelligence.
          </h2>
          <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto">
            Experience Nirdesh today on Windows 11 and Windows 10.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setActiveView('download')}
              className="flex items-center gap-3 px-8 py-4 text-base font-bold text-white rounded-2xl bg-nirdesh-gradient hover:opacity-95 transition-all shadow-xl shadow-cyan-500/40 hover:scale-[1.02] cursor-pointer"
            >
              <Rocket className="w-5 h-5" />
              <span>Get Nirdesh Free &rarr;</span>
            </button>
            <button
              onClick={() => setVideoModalOpen(true)}
              className="flex items-center gap-2 px-7 py-4 text-base font-medium text-slate-200 rounded-2xl glass-panel hover:bg-white/10 transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 text-cyan-400 fill-cyan-400" />
              <span>Watch Demo</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
