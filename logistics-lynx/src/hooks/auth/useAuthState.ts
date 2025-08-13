
import { useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import type { UserRole, ExtendedUser } from '@/types/auth';

interface AuthState {
  user: ExtendedUser | null;
  session: Session | null;
  loading: boolean;
}

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    session: null,
    loading: true,
  });

  const fetchUserProfile = useCallback(async (user: User): Promise<ExtendedUser> => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      return {
        id: user.id,
        name: profile?.name || user.email?.split('@')[0] || 'User',
        email: user.email || '',
        avatar: profile?.avatar,
        role: (profile?.role as UserRole) || 'super_admin',
      };
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return {
        id: user.id,
        name: user.email?.split('@')[0] || 'User',
        email: user.email || '',
        role: 'super_admin',
      };
    }
  }, []);

  const initializeAuth = useCallback(async () => {
    console.log('useAuthState: Initializing authentication...');
    
    try {
      // Get current session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error getting session:', error);
        setAuthState({
          user: null,
          session: null,
          loading: false,
        });
        return;
      }
      
      // Process user if session exists
      let extendedUser: ExtendedUser | null = null;
      if (session?.user) {
        console.log('useAuthState: User found, fetching profile...');
        extendedUser = await fetchUserProfile(session.user);
      }

      console.log('useAuthState: Setting final auth state', { 
        hasUser: !!extendedUser, 
        hasSession: !!session,
        userEmail: extendedUser?.email 
      });
      
      setAuthState({
        user: extendedUser,
        session,
        loading: false,
      });
    } catch (error) {
      console.error('Error initializing auth:', error);
      setAuthState({
        user: null,
        session: null,
        loading: false,
      });
    }
  }, [fetchUserProfile]);

  const updateAuthState = useCallback(async (session: Session | null) => {
    console.log('useAuthState: Updating auth state from auth change', { hasSession: !!session });
    
    setAuthState(prev => ({ ...prev, loading: true }));
    
    let extendedUser: ExtendedUser | null = null;
    if (session?.user) {
      try {
        extendedUser = await fetchUserProfile(session.user);
      } catch (error) {
        console.error('Error fetching user profile during update:', error);
      }
    }

    setAuthState({
      user: extendedUser,
      session,
      loading: false,
    });
  }, [fetchUserProfile]);

  const resetAuthState = useCallback(() => {
    console.log('useAuthState: Resetting auth state');
    setAuthState({
      user: null,
      session: null,
      loading: false,
    });
  }, []);

  return {
    authState,
    initializeAuth,
    updateAuthState,
    resetAuthState,
  };
};
