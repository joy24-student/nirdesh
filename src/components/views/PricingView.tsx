import React, { useState } from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { Check, ArrowRight, Sparkles, CreditCard, Gift, Calendar, Award } from 'lucide-react';

interface PricingViewProps {
  onSelectPlan: (planName: string) => void;
}

export const PricingView: React.FC<PricingViewProps> = ({ onSelectPlan }) => {
  const { siteConfig } = useSiteContext();
  const pricingTiers = siteConfig.pricingTiers || [];
  const billing = siteConfig.billingSettings || {
    enableBilling: false,
    billingAmount: 0,
    monthlyPrice: 19,
    quarterlyPrice: 45,
    yearlyPrice: 144,
    quarterlyDiscountPct: 15,
    yearlyDiscountPct: 30,
    currencySymbol: '$',
    billingPeriod: '/month',
    freeNoticeText: '100% Free Desktop Agent — No Credit Card Required',
    gatewayStatus: 'Disabled'
  };
  
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('quarterly');

  // Check if billing is disabled or amount is 0
  const isFreeMode = !billing.enableBilling || billing.billingAmount === 0;

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 animate-fadeIn">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
          {isFreeMode ? 'OPEN ACCESS — 100% FREE' : 'FLEXIBLE BILLING CYCLES'}
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          {isFreeMode ? 'Nirdesh Desktop is Free for Everyone.' : 'Choose your billing frequency.'}
        </h1>
        <p className="text-slate-400 text-lg">
          {isFreeMode 
            ? (billing.freeNoticeText || 'Zero subscription fees. Download and run locally with complete privacy.') 
            : 'Select Monthly, Quarterly, or Yearly plans with instant volume savings.'}
        </p>

        {/* If Paid Billing is Enabled (> $0), show 3-Way Billing Cycle Switcher */}
        {!isFreeMode && (
          <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 rounded-full glass-panel border border-cyan-500/30 mt-4 shadow-xl">
            
            {/* Monthly Option */}
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                billingCycle === 'monthly' 
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Monthly</span>
            </button>

            {/* Quarterly Option */}
            <button
              onClick={() => setBillingCycle('quarterly')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                billingCycle === 'quarterly' 
                  ? 'bg-nirdesh-gradient text-white shadow-lg shadow-cyan-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Quarterly</span>
              <span className="text-[10px] bg-amber-400 text-black px-1.5 py-0.5 rounded-full font-extrabold">
                Save {billing.quarterlyDiscountPct || 15}%
              </span>
            </button>

            {/* Yearly Option */}
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                billingCycle === 'yearly' 
                  ? 'bg-nirdesh-gradient text-white shadow-lg shadow-purple-500/30' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
              <span>Yearly</span>
              <span className="text-[10px] bg-emerald-400 text-black px-1.5 py-0.5 rounded-full font-extrabold">
                Save {billing.yearlyDiscountPct || 30}%
              </span>
            </button>

          </div>
        )}
      </div>

      {/* CONDITIONAL RENDERING: FREE MODE (Billing Amount = $0) */}
      {isFreeMode ? (
        <div className="max-w-4xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/40 shadow-2xl space-y-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-lg">
            <Gift className="w-8 h-8 text-cyan-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white">Full Feature Access Included</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
              All AI Core reasoning, screen Vision OCR, sub-300ms Voice Mode, and macro automation routines are enabled at <span className="text-cyan-300 font-bold">$0 / month</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left text-xs text-slate-300 max-w-3xl mx-auto">
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Unlimited Local Execution</span>
              </div>
              <p className="text-[11px] text-slate-400">Run macro routines on your PC with zero API limits.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Privacy & Encrypted Sync</span>
              </div>
              <p className="text-[11px] text-slate-400">All conversation memory stays encrypted on your device.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1">
              <div className="font-bold text-white flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>No Credit Card Required</span>
              </div>
              <p className="text-[11px] text-slate-400">Get started immediately without signing up for paid plans.</p>
            </div>
          </div>

          <button
            onClick={() => onSelectPlan('Free Download')}
            className="px-10 py-4 rounded-2xl bg-nirdesh-gradient text-white font-extrabold text-base shadow-xl shadow-cyan-500/30 hover:opacity-95 hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5" />
            <span>Download Nirdesh Desktop Free</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      ) : (
        /* PAID MODE: Show Pricing Cards with Monthly, Quarterly & Yearly Pricing */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, idx) => {
            const basePrice = billing.billingAmount || 19;
            const symbol = billing.currencySymbol || '$';

            // Calculate price based on selected cycle
            let priceLabel = `${symbol}${basePrice}`;
            let cycleNotice = 'billed monthly';

            if (billingCycle === 'quarterly') {
              const discountedMonthly = Math.round(basePrice * (1 - (billing.quarterlyDiscountPct || 15) / 100));
              const totalQuarterly = discountedMonthly * 3;
              priceLabel = `${symbol}${discountedMonthly}`;
              cycleNotice = `${symbol}${totalQuarterly} billed every 3 months`;
            } else if (billingCycle === 'yearly') {
              const discountedMonthly = Math.round(basePrice * (1 - (billing.yearlyDiscountPct || 30) / 100));
              const totalAnnual = discountedMonthly * 12;
              priceLabel = `${symbol}${discountedMonthly}`;
              cycleNotice = `${symbol}${totalAnnual} billed annually`;
            }

            return (
              <div
                key={tier.name + idx}
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

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-extrabold text-white">
                        {priceLabel}
                      </span>
                      <span className="text-slate-400 text-xs font-mono">/month</span>
                    </div>
                    <div className="text-[11px] text-cyan-400 font-mono">
                      {cycleNotice}
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-white/10 text-xs text-slate-300">
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5">
                        <Check className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => onSelectPlan(`${tier.name} (${billingCycle.toUpperCase()})`)}
                  className={`w-full mt-8 py-3.5 rounded-2xl font-bold text-sm transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    tier.highlight
                      ? 'bg-nirdesh-gradient text-white shadow-lg shadow-cyan-500/30 hover:opacity-95'
                      : 'glass-panel text-slate-200 hover:bg-white/10 border-white/20'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Subscribe {billingCycle.toUpperCase()} ({priceLabel}/mo)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
