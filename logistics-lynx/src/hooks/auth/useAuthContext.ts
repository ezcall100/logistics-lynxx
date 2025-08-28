/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { UserRole, ExtendedUser } from '@/types/auth';
import { useToast } from '@/hooks/use-toast';

export const useAuthContext = () => {
  const [user, setUser] = useState<ExtendedUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('super_admin');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const availableRoles: UserRole[] = [
    'super_admin',
    'carrier_admin',
    'freight_broker_admin',
    'shipper_admin',
    'carrier_driver',
    'owner_operator'
  ];

  // Initialize authentication
  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        console.log('AuthProvider: Initializing authentication...');
        
        // Get current session
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          if (mounted) {
            setLoading(false);
          }
          return;
        }

        if (mounted) {
          setSession(currentSession);
          
          if (currentSession?.user) {
            console.log('AuthProvider: User found, creating extended user');
            const extendedUser: ExtendedUser = {
              id: currentSession.user.id,
              name: currentSession.user.email?.split('@')[0] || 'User',
              email: currentSession.user.email || '',
              role: 'super_admin',
              created_at: currentSession.user.created_at || new Date().toISOString(),
              updated_at: currentSession.user.updated_at || new Date().toISOString(),
              first_name: currentSession.user.user_metadata?.first_name || 'User',
              last_name: currentSession.user.user_metadata?.last_name || 'User',
              avatar_url: currentSession.user.user_metadata?.avatar_url,
              phone: currentSession.user.user_metadata?.phone,
              company: currentSession.user.user_metadata?.company,
              location: currentSession.user.user_metadata?.location,
              status: 'active'
            };
            setUser(extendedUser);
          }
          
          setLoading(false);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        if (mounted) {
          setLoading(false);
        }
      }
    };

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, newSession) => {
        console.log('AuthProvider: Auth state changed:', event);
        
        if (mounted) {
          setSession(newSession);
          
          if (newSession?.user) {
            const extendedUser: ExtendedUser = {
              id: newSession.user.id,
              name: newSession.user.email?.split('@')[0] || 'User',
              email: newSession.user.email || '',
              role: 'super_admin',
              created_at: newSession.user.created_at || new Date().toISOString(),
              updated_at: newSession.user.updated_at || new Date().toISOString(),
              first_name: newSession.user.user_metadata?.first_name || 'User',
              last_name: newSession.user.user_metadata?.last_name || 'User',
              avatar_url: newSession.user.user_metadata?.avatar_url,
              phone: newSession.user.user_metadata?.phone,
              company: newSession.user.user_metadata?.company,
              location: newSession.user.user_metadata?.location,
              status: 'active'
            };
            setUser(extendedUser);
          } else {
            setUser(null);
          }
          
          setLoading(false);
        }
      }
    );

    initializeAuth();

    return () => {
      console.log('AuthProvider: Cleaning up');
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      console.log('AuthProvider: Signing in user');
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        console.error('Sign in error:', error);
        return { error: error.message };
      }
      
      return {};
    } catch (error) {
      console.error('Sign in exception:', error);
      return { error: 'An unexpected error occurred' };
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string): Promise<{ error?: string }> => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) {
        return { error: error.message };
      }
      
      return {};
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: 'An unexpected error occurred' };
    }
  }, []);

  const signOut = useCallback(async (): Promise<void> => {
    try {
      console.log('AuthProvider: Signing out user');
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Sign out error:', error);
      }
    } catch (error) {
      console.error('Sign out error:', error);
    }
  }, []);

  const updateSelectedRole = useCallback((role: UserRole) => {
    console.log('AuthProvider: Updating selected role to:', role);
    setSelectedRole(role);
    localStorage.setItem('selectedRole', role);
    
    toast({
      title: "Role switched",
      description: `Switched to ${role.replace('_', ' ')} role`,
    });
  }, [toast]);

  return {
    user,
    session,
    selectedRole,
    loading,
    availableRoles,
    signIn,
    signUp,
    signOut,
    updateSelectedRole
  };
};

export default useAuthContext;