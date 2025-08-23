import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase, User, AuthState, onAuthStateChange } from '../lib/supabase'

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  hasRole: (role: User['role']) => boolean
  hasAnyRole: (roles: User['role'][]) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (session?.user) {
        // Fetch user profile with role
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        setAuthState({
          user: profile || { 
            id: session.user.id, 
            email: session.user.email!, 
            role: 'viewer' as const,
            created_at: session.user.created_at 
          },
          loading: false,
          error: null,
        })
      } else {
        setAuthState({
          user: null,
          loading: false,
          error: null,
        })
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = onAuthStateChange(async (event, session) => {
      if (session?.user) {
        // Fetch user profile with role
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()
        
        setAuthState({
          user: profile || { 
            id: session.user.id, 
            email: session.user.email!, 
            role: 'viewer' as const,
            created_at: session.user.created_at 
          },
          loading: false,
          error: null,
        })
      } else {
        setAuthState({
          user: null,
          loading: false,
          error: null,
        })
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }))
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setAuthState(prev => ({ ...prev, loading: false, error: error.message }))
    }

    return { error }
  }

  const signOut = async () => {
    setAuthState(prev => ({ ...prev, loading: true }))
    
    const { error } = await supabase.auth.signOut()
    
    setAuthState(prev => ({ ...prev, loading: false, error: error?.message || null }))
    
    return { error }
  }

  const hasRole = (role: User['role']) => {
    return authState.user?.role === role
  }

  const hasAnyRole = (roles: User['role'][]) => {
    return authState.user ? roles.includes(authState.user.role) : false
  }

  const value: AuthContextType = {
    ...authState,
    signIn,
    signOut,
    hasRole,
    hasAnyRole,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
