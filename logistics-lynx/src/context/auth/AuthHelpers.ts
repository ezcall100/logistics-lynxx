/* eslint-disable @typescript-eslint/no-explicit-any */

import { User as SupabaseUser } from '@supabase/supabase-js';
import { User, UserRole } from '@/types/user';

export const mapSupabaseUserToUser = (supabaseUser: SupabaseUser, role: UserRole): User => {
  return {
    id: supabaseUser.id,
    name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split('@')[0] || 'User',
    email: supabaseUser.email || '',
    phone: supabaseUser.user_metadata?.phone || undefined,
    role,
    status: 'active',
    avatar: supabaseUser.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(supabaseUser.email || 'User')}&background=0D8ABC&color=fff`,
    company: 'LogiPortal Inc.',
    location: {
      city: 'San Francisco',
      state: 'CA',
      country: 'USA',
    },
    loginId: supabaseUser.email || '',
    lastLogin: new Date(),
    createdAt: new Date(supabaseUser.created_at),
    updatedAt: new Date(),
  };
};

export const getDefaultRole = (email: string): UserRole => {
  return email === 'ezcallnet.mo@gmail.com' ? 'super_admin' : 'carrier_driver';
};
