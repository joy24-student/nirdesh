import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Sparkles } from 'lucide-react';

export const Gallery3D: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const galleryItems = [
    { title: "Nirdesh Main Assistant Hub", category: "Core Interface", image: "/asset/herobackground.png", desc: "Central dark command dashboard with real-time status and module indicators." },
    { title: "Task Execution & Reasoning", category: "AI Core", image: "/asset/herobackground.png", desc: "Step-by-step task decomposition and app trigger visualization." },
    { title: "Automation Macro Editor", category: "Automation", image: "/asset/herobackground.png", desc: "Visual multi-step workflow builder with condition triggers." },
    { title: "Memory Context Graph", category: "Memory", image: "/asset/herobackground.png", desc: "3D relational node graph of workspace files and past sessions." },
    { title: "Vision Screen Analysis", category: "Vision", image: "/asset/herobackground.png", desc: "Real-time element detection, OCR extraction, and browser bounding boxes." },
    { title: "Security & Permission Guard", category: "Trust & Safety", image: "/asset/herobackground.png", desc: "Granular prompt controls before executing sensitive scripts." },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
  };

  return (
    <section className="py-24 bg-[#050813] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            3D EXPERIENCE GALLERY
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Experience Nirdesh in action.
          </h2>
          <p className="text-slate-400 text-lg">
            One intelligent interface across your entire desktop operating system.
          </p>
        </div>

        {/* 3D Perspective Gallery Carousel */}
        <div className="relative max-w-5xl mx-auto min-h-[440px] flex items-center justify-center">
          
          {/* Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-2 z-30 p-3 rounded-full glass-panel border border-white/20 text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer shadow-xl"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 z-30 p-3 rounded-full glass-panel border border-white/20 text-white hover:bg-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer shadow-xl"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Cards Display */}
          <div className="relative w-full max-w-3xl aspect-[16/10] rounded-3xl overflow-hidden glass-panel border border-cyan-500/30 shadow-2xl shadow-cyan-950/60 group cursor-pointer" onClick={() => setLightboxOpen(true)}>
            <img
              src={galleryItems[activeIndex].image}
              alt={galleryItems[activeIndex].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-[#02040A] via-black/20 to-transparent p-6 sm:p-8 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/30 text-cyan-300">
                  {galleryItems[activeIndex].category}
                </span>
                <div className="w-9 h-9 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white">{galleryItems[activeIndex].title}</h3>
                <p className="text-slate-300 text-xs sm:text-sm max-w-xl">{galleryItems[activeIndex].desc}</p>
                <div className="text-xs font-mono text-cyan-400 pt-2">
                  0{activeIndex + 1} / 0{galleryItems.length}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-2xl animate-fadeIn">
          <div className="relative w-full max-w-5xl rounded-3xl overflow-hidden glass-panel border border-cyan-500/40 p-4 space-y-4">
            
            <div className="flex items-center justify-between px-4 pt-2">
              <div>
                <h4 className="text-lg font-bold text-white">{galleryItems[activeIndex].title}</h4>
                <p className="text-xs text-slate-400">{galleryItems[activeIndex].category}</p>
              </div>
              <button
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="aspect-[16/9] w-full rounded-2xl overflow-hidden">
              <img src={galleryItems[activeIndex].image} alt="Full view" className="w-full h-full object-cover" />
            </div>

            <div className="flex items-center justify-between px-4 pb-2 text-xs text-slate-400">
              <span>{galleryItems[activeIndex].desc}</span>
              <span className="font-mono text-cyan-400">Item {activeIndex + 1} of {galleryItems.length}</span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
