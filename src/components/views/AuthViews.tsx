import React, { useState, useEffect } from 'react';
import { loginWithGoogle, signInWithEmail, signUpWithEmail, resetPassword } from '../../config/firebase';
import { X, Mail, Lock, User, Eye, EyeOff, ShieldCheck, ArrowRight, AlertCircle, Brain, Sparkles, Zap, RotateCcw, Shield, CheckCircle2 } from 'lucide-react';

interface AuthViewsProps {
  mode: 'signin' | 'signup';
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export const AuthViews: React.FC<AuthViewsProps> = ({ mode: initialMode, onClose, onSuccess }) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  // Load remembered email if saved
  useEffect(() => {
    const savedEmail = localStorage.getItem('nirdesh_remembered_email');
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  // Calculate dynamic password strength (0 to 4)
  const calculateStrength = (pass: string) => {
    let score = 0;
    if (!pass) return score;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 10) score += 1;
    if (/[A-Z]/.test(pass) && /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;
    return score;
  };

  const passScore = calculateStrength(password);
  const getStrengthLabel = (score: number) => {
    if (score <= 1) return { label: 'Weak', color: 'text-rose-400', barBg: 'bg-rose-500' };
    if (score === 2) return { label: 'Medium', color: 'text-amber-400', barBg: 'bg-amber-400' };
    if (score === 3) return { label: 'Good', color: 'text-cyan-400', barBg: 'bg-cyan-400' };
    return { label: 'Strong', color: 'text-emerald-400', barBg: 'bg-emerald-400' };
  };
  const strengthInfo = getStrengthLabel(passScore);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);
    try {
      const user = await loginWithGoogle();
      if (user) {
        if (rememberMe && user.email) {
          localStorage.setItem('nirdesh_remembered_email', user.email);
        }
        onSuccess(user);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Google Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setErrorMsg('Please enter your email address above to receive reset instructions.');
      return;
    }
    setLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);
    const res = await resetPassword(email);
    setLoading(false);
    if (res.success) {
      setInfoMsg(`Password reset email sent to ${email}. Check your inbox!`);
    } else {
      setErrorMsg(res.error || 'Could not send password reset email');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setInfoMsg(null);

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setErrorMsg('Please enter your full name');
        return;
      }
      if (password.length < 6) {
        setErrorMsg('Password must be at least 6 characters');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Passwords do not match');
        return;
      }
      if (!agreeTerms) {
        setErrorMsg('Please agree to the Terms of Service & Privacy Policy');
        return;
      }
    }

    setLoading(true);

    try {
      let user;
      if (mode === 'signup') {
        user = await signUpWithEmail(email, password, fullName);
      } else {
        user = await signInWithEmail(email, password);
      }

      if (user) {
        if (rememberMe && email) {
          localStorage.setItem('nirdesh_remembered_email', email);
        } else {
          localStorage.removeItem('nirdesh_remembered_email');
        }
        onSuccess(user);
        onClose();
      }
    } catch (err: any) {
      setErrorMsg(err?.message || 'Authentication error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-2xl animate-fadeIn overflow-y-auto">
      
      {/* Outer Auth Modal Container */}
      <div className="relative w-full max-w-5xl bg-[#050B18] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-slate-100 overflow-hidden my-auto">
        
        {/* Background ambient radial glow */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Navbar Row inside Auth Modal */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
          <div className="flex items-center">
            <img 
              src="/asset/mainlogo.png" 
              alt="Nirdesh Logo" 
              className="h-10 sm:h-12 w-auto max-w-[200px] object-contain filter drop-shadow-[0_0_12px_rgba(0,200,255,0.4)]" 
            />
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-300">
            <span>
              {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}
            </span>
            <button
              onClick={() => {
                setMode(mode === 'signup' ? 'signin' : 'signup');
                setErrorMsg(null);
                setInfoMsg(null);
              }}
              className="text-cyan-400 font-bold hover:underline cursor-pointer"
            >
              {mode === 'signup' ? 'Sign In' : 'Sign Up'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer ml-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Two-Column Grid: Left Brand Graphic & Right Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
          
          {/* Left Column: Brand Story & Hologram 3D Emblem */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left py-2">
            
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {mode === 'signup' ? (
                  <>
                    Your PC.<br />
                    <span className="text-gradient">Your Command.</span>
                  </>
                ) : (
                  <>
                    Welcome back<br />
                    <span className="text-gradient">to Nirdesh</span>
                  </>
                )}
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                {mode === 'signup'
                  ? 'Create your Nirdesh account and unlock the power of AI.'
                  : 'Sign in to continue your productive journey.'}
              </p>
            </div>

            {/* 3D Futuristic Neon Emblem Graphic Container */}
            <div className="relative py-6 flex flex-col items-center justify-center group">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-b from-cyan-500/20 via-indigo-600/10 to-transparent p-1 flex items-center justify-center shadow-[0_0_50px_rgba(0,200,255,0.25)] border border-cyan-500/30">
                <div className="w-full h-full rounded-full bg-[#030712] border border-cyan-500/40 flex flex-col items-center justify-center p-6 space-y-3 relative overflow-hidden">
                  
                  {/* Glowing N Emblem Logo Image */}
                  <img
                    src="/asset/mainlogo.png"
                    alt="Nirdesh Emblem"
                    className="w-28 h-28 object-contain filter drop-shadow-[0_0_20px_rgba(0,200,255,0.8)] group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Pedestal Metallic Label Ring */}
                  <div className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/50 text-[10px] font-mono font-extrabold text-cyan-300 uppercase tracking-widest shadow-lg">
                    NIRDESH AI AGENT
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom 3 Feature Value Props */}
            <div className="space-y-3 pt-2">
              {mode === 'signup' ? (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Brain className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Intelligent AI Agent</h4>
                      <p className="text-[11px] text-slate-400">Understands and executes your commands</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Secure & Private</h4>
                      <p className="text-[11px] text-slate-400">Your data, your control. Always protected.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Smart Automation</h4>
                      <p className="text-[11px] text-slate-400">Automate tasks and boost productivity</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">AI-Powered Assistance</h4>
                      <p className="text-[11px] text-slate-400">Smarter commands, better results</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <Shield className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Enterprise Security</h4>
                      <p className="text-[11px] text-slate-400">Bank-grade security for your data</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                      <RotateCcw className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Seamless Experience</h4>
                      <p className="text-[11px] text-slate-400">Sync across devices and platforms</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="text-[10px] text-slate-500 font-mono">
              © 2026 Nirdesh. All rights reserved.
            </div>

          </div>

          {/* Right Column: Form Card Component */}
          <div className="lg:col-span-7 bg-[#091122]/90 border border-white/10 rounded-3xl p-6 sm:p-8 space-y-5 backdrop-blur-xl shadow-2xl flex flex-col justify-between">
            
            <div className="space-y-4">
              
              {/* Form Title & Subtitle */}
              <div className="text-center space-y-1">
                <h3 className="text-2xl font-bold text-gradient">
                  {mode === 'signup' ? 'Create your account' : 'Sign in to your account'}
                </h3>
                <p className="text-xs text-slate-400">
                  {mode === 'signup' ? 'Start your journey with Nirdesh AI Agent' : 'Access your Nirdesh AI Agent'}
                </p>
              </div>

              {/* Error Alert if any */}
              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Success Info Alert if any */}
              {infoMsg && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{infoMsg}</span>
                </div>
              )}

              {/* Main Form Inputs */}
              <form onSubmit={handleSubmit} className="space-y-3 text-left">
                
                {/* Full Name field (Sign Up Mode) */}
                {mode === 'signup' && (
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        required
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#020612] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                    </div>
                  </div>
                )}

                {/* Email Address Field */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#020612] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={mode === 'signup' ? 'Create a strong password' : 'Enter your password'}
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#020612] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field (Sign Up Mode) */}
                {mode === 'signup' && (
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">Confirm Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        required
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#020612] border border-white/10 text-white text-xs focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Password Strength Bar */}
                    <div className="space-y-1 pt-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-slate-400">Password strength</span>
                        <span className={`font-bold ${strengthInfo.color}`}>{strengthInfo.label}</span>
                      </div>
                      <div className="grid grid-cols-4 gap-1 h-1">
                        <div className={`rounded h-full transition-colors ${passScore >= 1 ? strengthInfo.barBg : 'bg-slate-800'}`} />
                        <div className={`rounded h-full transition-colors ${passScore >= 2 ? strengthInfo.barBg : 'bg-slate-800'}`} />
                        <div className={`rounded h-full transition-colors ${passScore >= 3 ? strengthInfo.barBg : 'bg-slate-800'}`} />
                        <div className={`rounded h-full transition-colors ${passScore >= 4 ? strengthInfo.barBg : 'bg-slate-800'}`} />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sign In Options Row: Remember Me & Forgot Password */}
                {mode === 'signin' && (
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="w-4 h-4 rounded bg-[#020612] border-white/10 text-cyan-500 focus:ring-0"
                      />
                      <span>Remember me</span>
                    </label>
                    <button 
                      type="button" 
                      onClick={handleForgotPassword}
                      className="text-cyan-400 hover:underline font-medium cursor-pointer"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                {/* Sign Up Terms Checkbox */}
                {mode === 'signup' && (
                  <div className="pt-1">
                    <label className="flex items-center gap-2 text-[11px] text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                        className="w-4 h-4 rounded bg-[#020612] border-white/10 text-cyan-500 focus:ring-0"
                      />
                      <span>I agree to the <span className="text-cyan-400">Terms of Service</span> and <span className="text-cyan-400">Privacy Policy</span>.</span>
                    </label>
                  </div>
                )}

                {/* Primary Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-blue-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                >
                  <span>{loading ? 'Processing...' : mode === 'signup' ? 'Create Account' : 'Sign In'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* OR Divider */}
              <div className="relative flex items-center justify-center my-3">
                <div className="border-t border-white/10 w-full" />
                <span className="bg-[#091122] px-3 text-[10px] uppercase font-mono text-slate-400 absolute">OR</span>
              </div>

              {/* Social OAuth Button (Google Only) */}
              <div>
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-[#020612] border border-white/10 hover:bg-white/5 text-slate-200 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-3 shadow-md"
                >
                  {/* Google SVG Logo */}
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                  <span>Continue with Google</span>
                </button>
              </div>

              {/* Secure Sign In Banner Card (Sign In Mode) */}
              {mode === 'signin' && (
                <div className="p-3 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-[11px] text-slate-300 flex items-center gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white block">Secure Sign In</span>
                    <span className="text-[10px] text-slate-400">Your connection is protected with end-to-end encryption.</span>
                  </div>
                </div>
              )}

            </div>

            {/* Legal Footnote */}
            <div className="text-[10px] text-slate-400 text-center pt-2">
              By {mode === 'signup' ? 'creating an account' : 'signing in'}, you agree to our{' '}
              <span className="text-cyan-400">Terms of Service</span> and acknowledge our{' '}
              <span className="text-cyan-400">Privacy Policy</span>.
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
