'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from '../utils/motion';
import { supabase } from '../utils/supabaseClient';

// Roles supported in the app
const ROLES = ['Admin', 'NGO', 'Community', 'Panchayat'] as const;
export type Role = typeof ROLES[number];

type Props = {
  open: boolean;
  initialMode?: 'signin' | 'register';
  onClose: () => void;
};

const AuthModal = ({ open, onClose, initialMode = 'signin' }: Props) => {
  const [mode, setMode] = useState<'signin' | 'register'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState<Role>('Community');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMode(initialMode), [initialMode]);

  const disabled = useMemo(() => loading || !email || !password || (mode === 'register' && !username), [loading, email, password, username, mode]);

  const close = () => {
    if (!loading) onClose();
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError(null);
      // Sign up with Supabase
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { username, role },
        },
      });
      if (error) throw error;
      // Redirect to dashboard path based on role
      window.location.href = getDashboardPath(role);
    } catch (e: any) {
      setError(e.message ?? 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSignin = async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // After sign-in, route by chosen role
      window.location.href = getDashboardPath(role);
    } catch (e: any) {
      setError(e.message ?? 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={close} />

      {/* Panel */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.35 }}
        className="relative w-[95%] md:w-[900px] h-[560px] bg-white text-gray-900 rounded-2xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2"
      >
        {/* Left form side */}
        <div className="p-8 md:p-10 flex flex-col">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">{mode === 'register' ? 'Welcome to Design Community' : 'Welcome back'}</h2>
            <button className="text-gray-500 hover:text-gray-700" onClick={close} aria-label="Close">✕</button>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            {mode === 'register' ? (
              <>Already have an account? <button className="underline" onClick={() => setMode('signin')}>Log in</button></>
            ) : (
              <>New here? <button className="underline" onClick={() => setMode('register')}>Create account</button></>
            )}
          </p>

          {/* Fields */}
          <div className="mt-6 space-y-5">
            <div>
              <label className="text-sm">Email</label>
              <input type="email" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            {mode === 'register' && (
              <div>
                <label className="text-sm">Username</label>
                <input className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
            )}
            <div>
              <label className="text-sm">Password</label>
              <input type="password" className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
              <div className="mt-2 text-xs text-gray-500 grid grid-cols-2 gap-x-6 gap-y-1">
                <div>• Use 8 or more characters</div>
                <div>• One Uppercase character</div>
                <div>• One lowercase character</div>
                <div>• One special character</div>
                <div>• One number</div>
              </div>
            </div>

            {/* Role selection */}
            <div>
              <label className="text-sm">Sign in as</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {ROLES.map((r) => (
                  <button key={r} onClick={() => setRole(r)} className={`rounded-md border px-3 py-2 text-sm transition-colors ${role === r ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-100'}`}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex items-center gap-3">
            {mode === 'register' ? (
              <button disabled={disabled} onClick={handleRegister} className={`rounded-full px-5 py-2.5 text-white transition-all ${disabled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                Create an account
              </button>
            ) : (
              <button disabled={disabled} onClick={handleSignin} className={`rounded-full px-5 py-2.5 text-white transition-all ${disabled ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}>
                Sign in
              </button>
            )}
          </div>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>

        {/* Right animated visual */}
        <div className="relative hidden md:block bg-[#0E1B2B]">
          {/* floating orbs/cubes */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute left-12 top-16 w-40 h-40 bg-blue-500/20 rounded-xl rotate-6 blur-0" />
            <div className="absolute right-10 top-24 w-60 h-60 bg-orange-400/30 rounded-xl -rotate-12" />
            <div className="absolute left-28 bottom-14 w-24 h-24 bg-yellow-300/40 rounded-full" />
          </motion.div>

          {/* floating points */}
          <motion.div
            className="absolute inset-0"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <div className="absolute left-1/3 top-1/3 w-3 h-3 bg-white/70 rounded-full" />
            <div className="absolute left-3/4 top-1/2 w-2.5 h-2.5 bg-white/50 rounded-full" />
            <div className="absolute left-1/4 bottom-1/3 w-2 h-2 bg-white/40 rounded-full" />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

function getDashboardPath(role: Role) {
  switch (role) {
    case 'Admin':
      return '/dashboards/admin';
    case 'NGO':
      return '/dashboards/ngo';
    case 'Panchayat':
      return '/dashboards/panchayat';
    default:
      return '/dashboards/community';
  }
}

export default AuthModal;