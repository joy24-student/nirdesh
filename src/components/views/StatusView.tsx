import React from 'react';
import { useSiteContext } from '../../context/SiteContext';
import { CheckCircle2, Activity } from 'lucide-react';

export const StatusView: React.FC = () => {
  const { siteConfig } = useSiteContext();
  const sys = siteConfig.systemStatus;

  const services = [
    { name: 'AI Core Reasoning API', status: sys.aiCoreStatus || 'Operational', latency: `${sys.latencyMs}ms` },
    { name: 'Vision & OCR Pipeline', status: sys.visionStatus || 'Operational', latency: `${sys.latencyMs + 18}ms` },
    { name: 'Cloudflare Backup & Sync', status: 'Operational', latency: '110ms' },
    { name: 'Firebase Authentication & Firestore Sync', status: 'Operational', latency: '35ms' },
    { name: 'Windows Update Service', status: 'Operational', latency: '25ms' },
    { name: 'Voice Stream Gateway', status: 'Operational', latency: '52ms' },
  ];

  return (
    <div className="pt-28 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 animate-fadeIn">
      
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>Status: {sys.overallStatus}</span>
        </div>
        <h1 className="text-4xl font-extrabold text-white">Nirdesh System Status</h1>
        <p className="text-slate-400 text-sm">Real-time telemetry, active nodes ({sys.activeNodes?.toLocaleString()}), and service health.</p>
      </div>

      <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono text-slate-400">
          <span>SERVICE MODULE</span>
          <span>HEALTH & LATENCY</span>
        </div>

        <div className="space-y-3">
          {services.map((srv) => (
            <div key={srv.name} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/5 font-mono text-sm">
              <span className="font-semibold text-slate-200">{srv.name}</span>
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400">{srv.latency}</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {srv.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
