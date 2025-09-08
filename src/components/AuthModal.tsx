'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      {/* Backdrop with improved blur effect */}
      <motion.div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={close}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Panel with enhanced entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ 
          type: "spring", 
          stiffness: 300, 
          damping: 25,
          duration: 0.5 
        }}
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

          {/* Fields with animated entrance */}
          <motion.div 
            className="mt-6 space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <label className="text-sm">Email</label>
              <input 
                type="email" 
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </motion.div>
            
            <AnimatePresence>
              {mode === 'register' && (
                <motion.div
                  key="username-field"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label className="text-sm">Username</label>
                  <input 
                    className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                  />
                </motion.div>
              )}
            </AnimatePresence>
            
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              <label className="text-sm">Password</label>
              <input 
                type="password" 
                className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 hover:border-blue-400" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <div className="mt-2 text-xs text-gray-500 grid grid-cols-2 gap-x-6 gap-y-1">
                <div>• Use 8 or more characters</div>
                <div>• One Uppercase character</div>
                <div>• One lowercase character</div>
                <div>• One special character</div>
                <div>• One number</div>
              </div>
            </motion.div>

            {/* Role selection with animation */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <label className="text-sm">Sign in as</label>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {ROLES.map((r, index) => (
                  <motion.button 
                    key={r} 
                    onClick={() => setRole(r)} 
                    className={`rounded-md border px-3 py-2 text-sm transition-all ${role === r ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-300 hover:bg-gray-100'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + (index * 0.1), duration: 0.3 }}
                  >
                    {r}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Actions with animation */}
          <div className="mt-6">
            <AnimatePresence mode="wait">
              {mode === 'register' ? (
                <motion.button 
                  key="register-btn"
                  className="w-full rounded-md bg-blue-600 text-white py-2 font-semibold disabled:bg-gray-400 transition-all duration-300 hover:bg-blue-700"
                  onClick={handleRegister}
                  disabled={disabled}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Create an account
                </motion.button>
              ) : (
                <motion.button 
                  key="signin-btn"
                  className="w-full rounded-md bg-blue-600 text-white py-2 font-semibold disabled:bg-gray-400 transition-all duration-300 hover:bg-blue-700"
                  onClick={handleSignin}
                  disabled={disabled}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  Sign in
                </motion.button>
              )}
            </AnimatePresence>
          </div>
          
          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </div>

        {/* Right animated visual with enhanced animations */}
        <div className="relative hidden md:block bg-gradient-to-br from-[#0E1B2B] to-[#1a2942]">
          {/* Animated gradient overlay */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10"
            animate={{ 
              backgroundImage: [
                'linear-gradient(to top right, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))',
                'linear-gradient(to top right, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))',
                'linear-gradient(to top right, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          {/* floating orbs/cubes with enhanced animations */}
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="absolute left-12 top-16 w-40 h-40 bg-blue-500/20 rounded-xl blur-sm" 
              animate={{ 
                rotate: [6, -2, 6],
                scale: [1, 1.05, 1],
                x: [0, 10, 0],
                y: [0, -5, 0]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute right-10 top-24 w-60 h-60 bg-orange-400/30 rounded-xl blur-sm" 
              animate={{ 
                rotate: [-12, 5, -12],
                scale: [1, 0.95, 1],
                x: [0, -15, 0],
                y: [0, 10, 0]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute left-28 bottom-14 w-24 h-24 bg-yellow-300/40 rounded-full blur-sm" 
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 15, 0],
                y: [0, -10, 0]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>

          {/* floating points with enhanced animations */}
          <motion.div className="absolute inset-0">
            <motion.div 
              className="absolute left-1/3 top-1/3 w-3 h-3 bg-white/70 rounded-full" 
              animate={{ 
                y: [0, -15, 0],
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute left-3/4 top-1/2 w-2.5 h-2.5 bg-white/50 rounded-full" 
              animate={{ 
                y: [0, 10, 0],
                x: [0, -10, 0],
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            />
            <motion.div 
              className="absolute left-1/4 bottom-1/3 w-2 h-2 bg-white/40 rounded-full" 
              animate={{ 
                y: [0, -8, 0],
                x: [0, 8, 0],
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.4, 1]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />
            
            {/* Additional floating points for more visual interest */}
            <motion.div 
              className="absolute left-2/3 bottom-1/4 w-1.5 h-1.5 bg-white/30 rounded-full" 
              animate={{ 
                y: [0, 12, 0],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
            <motion.div 
              className="absolute left-[20%] top-1/4 w-2 h-2 bg-white/20 rounded-full" 
              animate={{ 
                y: [0, -10, 0],
                x: [0, 5, 0],
                opacity: [0.2, 0.5, 0.2],
                scale: [1, 1.3, 1]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
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