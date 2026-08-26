import React, { useState } from 'react';
import { HelpCircle, Search, Mail, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const SupportView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full glass-panel border border-cyan-500/30">
          NIRDSH SUPPORT CENTER
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          How can we help you?
        </h1>
        <p className="text-slate-400 text-lg">
          Search support topics or contact our engineering team directly.
        </p>
      </div>

      {/* Support Contact Form */}
      <div className="max-w-2xl mx-auto glass-panel p-8 sm:p-10 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-6">
        <h3 className="text-2xl font-bold text-white text-center">Contact Nirdesh Technical Support</h3>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-center space-y-2">
            <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400" />
            <h4 className="font-bold text-lg">Ticket Submitted Successfully!</h4>
            <p className="text-xs text-slate-300">Our engineering team will respond to your email within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Your Name</label>
              <input
                required
                type="text"
                placeholder="Enter your name"
                className="w-full p-3.5 rounded-xl glass-panel border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
              <input
                required
                type="email"
                placeholder="name@example.com"
                className="w-full p-3.5 rounded-xl glass-panel border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Issue Description</label>
              <textarea
                required
                rows={4}
                placeholder="Describe your issue or question in detail..."
                className="w-full p-3.5 rounded-xl glass-panel border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-nirdesh-gradient text-white font-bold text-sm shadow-lg shadow-cyan-500/30 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Submit Ticket</span>
            </button>
          </form>
        )}
      </div>

    </div>
  );
};
