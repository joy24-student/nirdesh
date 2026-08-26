import React from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { Brain, CheckCircle2, ShieldCheck, Zap, PieChart, Sparkles } from 'lucide-react';

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Brain,
  CheckCircle2,
  ShieldCheck,
  Zap,
  PieChart,
  Sparkles
};

export const CapabilityCards: React.FC = () => {
  const { siteConfig } = useSiteContext();
  const cards = siteConfig.capabilityCards || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 relative z-20">
      {cards.map((card, idx) => {
        const IconComponent = ICON_MAP[card.icon] || Brain;
        return (
          <div
            key={card.title + idx}
            className="glass-panel p-5 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all duration-300 group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-cyan-950/40 relative overflow-hidden"
          >
            {/* Top icon */}
            <div 
              className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all shadow-md"
              style={{ borderColor: card.color ? `${card.color}50` : undefined }}
            >
              <IconComponent 
                className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300 transition-colors" 
                style={{ color: card.color || undefined }}
              />
            </div>

            <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-cyan-300 transition-colors">
              {card.title}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
              {card.desc}
            </p>

            {/* Bottom glow line */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" 
              style={{ background: card.color ? `linear-gradient(90deg, transparent, ${card.color}, transparent)` : undefined }}
            />
          </div>
        );
      })}
    </div>
  );
};
