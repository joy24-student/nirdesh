import React, { useState } from 'react';
import { loginWithGoogle, signInWithEmail, signUpWithEmail } from '../../config/firebase';
import { X, Mail, Lock, Sparkles, ArrowRight, AlertCircle } from 'lucide-react';

interface AuthViewsProps {
  mode: 'signin' | 'signup';
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export const AuthViews: React.FC<AuthViewsProps> = ({ mode, onClose, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      const user = await loginWithGoogle();
      onSuccess(user);
      onClose();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Google Auth failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      let user;
      if (mode === 'signup') {
        user = await signUpWithEmail(email, password);
      } else {
        user = await signInWithEmail(email, password);
      }
      onSuccess(user);
      onClose();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Authentication error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-md glass-panel p-8 rounded-3xl border border-cyan-500/40 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white cursor-pointer transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title & Logo */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <img src="/asset/logo.png" alt="Nirdesh" className="w-7 h-7 object-contain" />
          </div>
          <h2 className="text-2xl font-extrabold text-white">
            {mode === 'signin' ? 'Sign In to Nirdesh' : 'Create Nirdesh Account'}
          </h2>
          <p className="text-xs text-slate-400">
            {mode === 'signin' ? 'Access your cloud sync & custom macro workflows' : 'Get started with Nirdesh Desktop Agent'}
          </p>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 rounded-xl glass-panel border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>{loading ? 'Connecting to Firebase...' : 'Continue with Google Account'}</span>
        </button>

        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-white/10 w-full" />
          <span className="bg-[#050813] px-3 text-[10px] uppercase font-mono text-slate-500 absolute">or email password</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@nirdesh.ai"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-panel border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl glass-panel border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-nirdesh-gradient text-white font-bold text-sm shadow-lg shadow-cyan-500/30 hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Processing...' : mode === 'signin' ? 'Sign In' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
