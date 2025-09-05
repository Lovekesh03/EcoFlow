'use client';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string | undefined;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined;

if (!supabaseUrl || !supabaseAnonKey) {
  // eslint-disable-next-line no-console
  console.warn('[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Auth requests will fail until you add env vars to .env.local');
}

export const supabase = createClient(supabaseUrl ?? 'http://localhost:54321', supabaseAnonKey ?? 'anon-key-placeholder');

// Define user roles
export type UserRole = 'admin' | 'ngo' | 'community' | 'panchayat';

// Helper function to get dashboard URL based on user role
export const getDashboardUrl = (role: UserRole): string => {
  return `/dashboards/${role}`;
};

// Authentication helper functions
export const signUp = async (email: string, password: string, role: UserRole) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
      },
    },
  });
  
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data, error } = await supabase.auth.getUser();
  return { user: data.user, error };
};

export const getUserRole = async (): Promise<UserRole | null> => {
  const { user, error } = await getCurrentUser();
  if (error || !user) return null;
  
  return (user.user_metadata?.role as UserRole) || null;
};