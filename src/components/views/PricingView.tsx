import React, { useState } from 'react';
import { PRICING_TIERS } from '../../config/siteData';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingViewProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onSelectPlan }) => {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
          TRANSPARENT PRICING
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          Simple pricing for your desktop.
        </h1>
        <p className="text-slate-400 text-lg">
          Choose the plan that best fits your workflow requirements.
        </p>

        {/* Toggle Monthly / Yearly */}
        <div className="inline-flex items-center gap-3 p-1.5 rounded-full glass-panel border border-white/10 mt-4">
          <button
            onClick={() => setIsYearly(false)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              !isYearly ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40' : 'text-slate-400 hover:text-white'
            }`}
          >
            Monthly Billing
          </button>
          <button
            onClick={() => setIsYearly(true)}
            className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isYearly ? 'bg-nirdesh-gradient text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Yearly Billing</span>
            <span className="text-[10px] bg-emerald-400 text-black px-1.5 py-0.5 rounded-full font-extrabold">Save 20%</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {PRICING_TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`glass-panel p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between relative ${
              tier.highlight
                ? 'border-cyan-400 bg-cyan-500/10 shadow-2xl shadow-cyan-950/60 scale-105'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            {tier.badge && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-nirdesh-gradient text-white font-extrabold text-[10px] uppercase tracking-wider shadow-md">
                {tier.badge}
              </span>
            )}

            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                <p className="text-xs text-slate-400 mt-1">{tier.desc}</p>
              </div>

              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-white">
                  {isYearly ? tier.priceYearly : tier.priceMonthly}
                </span>
                <span className="text-slate-400 text-xs font-mono">/month</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
                {tier.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectPlan(tier.name)}
              className={`w-full mt-8 py-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                tier.highlight
                  ? 'bg-nirdesh-gradient text-white shadow-lg shadow-cyan-500/30 hover:opacity-95'
                  : 'glass-panel text-slate-200 hover:bg-white/10 border-white/20'
              }`}
            >
              <span>{tier.cta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
