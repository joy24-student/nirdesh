import React, { useState } from 'react';
import { FAQ_ITEMS } from '../../config/siteData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[#050813] relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Got questions? We have answers.
          </h2>
          <p className="text-slate-400 text-lg">
            Learn more about Nirdesh privacy, system integration, and licensing.
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={item.q}
                className="glass-panel rounded-2xl border border-white/10 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="font-bold text-lg text-white">{item.q}</span>
                  <ChevronDown className={`w-5 h-5 text-cyan-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-slate-300 leading-relaxed text-sm border-t border-white/5 pt-4 animate-fadeIn">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
