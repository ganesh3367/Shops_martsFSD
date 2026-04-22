import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import {
  registerWithEmail,
  loginWithEmail,
  loginWithGoogle,
  resetPassword,
  getFirebaseError,
} from '../services/authService';
import { setUser, setLoading, setError } from '../store/userSlice';

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const inputClass =
  'w-full px-4 py-3 bg-stone-50 border border-transparent text-sm text-primary placeholder-stone-400 focus:bg-white focus:border-accent focus:outline-none transition-all';

const Auth = () => {
  const [mode, setMode] = useState('login'); // 'login' | 'register' | 'forgot'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [showPass, setShowPass] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [fieldError, setFieldError] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated } = useSelector((s) => s.user);

  const redirectTo = location.state?.from?.pathname || '/';

  useEffect(() => {
    if (isAuthenticated) navigate(redirectTo, { replace: true });
  }, [isAuthenticated, navigate, redirectTo]);

  const set = (key) => (e) => {
    setFieldError('');
    setForm((f) => ({ ...f, [key]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFieldError('');

    if (mode === 'forgot') {
      setSubmitting(true);
      try {
        await resetPassword(form.email);
        toast.success('Password reset email sent! Check your inbox.');
        setMode('login');
      } catch (err) {
        setFieldError(getFirebaseError(err.code));
      } finally {
        setSubmitting(false);
      }
      return;
    }

    if (mode === 'register') {
      if (!form.name.trim()) return setFieldError('Please enter your full name.');
      if (form.password.length < 6) return setFieldError('Password must be at least 6 characters.');
      if (form.password !== form.confirm) return setFieldError('Passwords do not match.');
    }

    setSubmitting(true);
    dispatch(setLoading(true));

    try {
      let user;
      if (mode === 'login') {
        user = await loginWithEmail(form.email, form.password);
        toast.success(`Welcome back, ${user.displayName || user.email.split('@')[0]}!`);
      } else {
        user = await registerWithEmail(form.email, form.password, form.name.trim());
        toast.success(`Account created! Welcome, ${user.displayName}!`);
      }
      dispatch(setUser(user));
    } catch (err) {
      const msg = getFirebaseError(err.code);
      setFieldError(msg);
      dispatch(setError(msg));
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setFieldError('');
    try {
      const user = await loginWithGoogle();
      dispatch(setUser(user));
      toast.success(`Welcome, ${user.displayName || 'there'}!`);
    } catch (err) {
      setFieldError(getFirebaseError(err.code));
    } finally {
      setGoogleLoading(false);
    }
  };

  const switchMode = (next) => {
    setMode(next);
    setFieldError('');
    setForm({ name: '', email: '', password: '', confirm: '' });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* ── Left panel: branding (desktop only) ── */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=1200"
          alt="Interior"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary/75" />
        <div className="relative z-10 flex flex-col justify-between p-12 text-white w-full">
          <Link to="/" className="text-2xl font-serif font-bold">
            FURNIT<span className="text-accent">.</span>
          </Link>
          <div>
            <blockquote className="font-serif text-3xl font-medium leading-snug text-white/90">
              "A room should feel like a collection of things you love."
            </blockquote>
            <p className="mt-4 text-white/50 text-sm">— Billy Baldwin, Interior Designer</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-accent/20 flex items-center justify-center">
              <span className="text-xs text-accent font-bold">10K</span>
            </div>
            <p className="text-white/60 text-sm">Trusted by 10,000+ happy customers</p>
          </div>
        </div>
      </div>

      {/* ── Right panel: form ── */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-4 sm:px-8 py-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden block text-center text-xl font-serif font-bold text-primary mb-8">
            FURNIT<span className="text-accent">.</span>
          </Link>

          {/* Mode tabs */}
          {mode !== 'forgot' && (
            <div className="flex bg-stone-100 p-1 mb-8">
              {['login', 'register'].map((m) => (
                <button
                  key={m}
                  onClick={() => switchMode(m)}
                  className={`flex-1 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    mode === m ? 'bg-white text-primary shadow-sm' : 'text-stone-400 hover:text-primary'
                  }`}
                >
                  {m === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
            >
              {/* Heading */}
              <div className="mb-7">
                <h1 className="font-serif text-3xl font-bold text-primary">
                  {mode === 'login' && 'Welcome back'}
                  {mode === 'register' && 'Create account'}
                  {mode === 'forgot' && 'Reset password'}
                </h1>
                <p className="text-stone-400 text-sm mt-1.5">
                  {mode === 'login' && 'Sign in to access your orders and profile.'}
                  {mode === 'register' && 'Join our premium furniture community.'}
                  {mode === 'forgot' && "Enter your email and we'll send a reset link."}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {mode === 'register' && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Smith"
                      className={inputClass}
                      value={form.name}
                      onChange={set('name')}
                    />
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                    value={form.email}
                    onChange={set('email')}
                  />
                </div>

                {mode !== 'forgot' && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPass ? 'text' : 'password'}
                        required
                        placeholder="••••••••"
                        className={`${inputClass} pr-12`}
                        value={form.password}
                        onChange={set('password')}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPass((v) => !v)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-primary transition-colors"
                      >
                        {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                )}

                {mode === 'register' && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-widest text-stone-400 mb-1.5">
                      Confirm Password
                    </label>
                    <input
                      type={showPass ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      className={inputClass}
                      value={form.confirm}
                      onChange={set('confirm')}
                    />
                  </div>
                )}

                {/* Forgot password link */}
                {mode === 'login' && (
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => switchMode('forgot')}
                      className="text-xs text-accent hover:underline font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Error */}
                {fieldError && (
                  <motion.p
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-xs font-medium bg-red-50 px-3 py-2.5"
                  >
                    {fieldError}
                  </motion.p>
                )}

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-primary text-white py-4 text-sm font-bold tracking-wide hover:bg-accent disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2 mt-2"
                >
                  {submitting ? (
                    <Loader2 size={17} className="animate-spin" />
                  ) : (
                    <>
                      {mode === 'login' && 'Sign In'}
                      {mode === 'register' && 'Create Account'}
                      {mode === 'forgot' && 'Send Reset Link'}
                      {mode !== 'forgot' && <ArrowRight size={16} />}
                    </>
                  )}
                </motion.button>
              </form>

              {/* Divider + Google (not on forgot) */}
              {mode !== 'forgot' && (
                <>
                  <div className="my-6 flex items-center gap-3">
                    <div className="flex-1 h-px bg-stone-100" />
                    <span className="text-xs text-stone-400 uppercase tracking-widest">or</span>
                    <div className="flex-1 h-px bg-stone-100" />
                  </div>

                  <button
                    onClick={handleGoogle}
                    disabled={googleLoading}
                    className="w-full flex items-center justify-center gap-3 border border-stone-200 py-3.5 text-sm font-medium text-primary hover:bg-stone-50 hover:border-stone-300 transition-all disabled:opacity-60"
                  >
                    {googleLoading ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <GoogleIcon />
                    )}
                    Continue with Google
                  </button>
                </>
              )}

              {/* Switch links */}
              <p className="mt-6 text-center text-sm text-stone-400">
                {mode === 'login' && (
                  <>
                    Don't have an account?{' '}
                    <button onClick={() => switchMode('register')} className="text-accent font-semibold hover:underline">
                      Sign up
                    </button>
                  </>
                )}
                {mode === 'register' && (
                  <>
                    Already have an account?{' '}
                    <button onClick={() => switchMode('login')} className="text-accent font-semibold hover:underline">
                      Sign in
                    </button>
                  </>
                )}
                {mode === 'forgot' && (
                  <button onClick={() => switchMode('login')} className="text-accent font-semibold hover:underline">
                    ← Back to sign in
                  </button>
                )}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Auth;
