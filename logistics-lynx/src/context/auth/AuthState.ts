/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from 'react';
import { UserRole, AuthState } from '@/types/user';

const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
};

export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>(initialAuthState);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  return {
    authState,
    setAuthState,
    selectedRole,
    setSelectedRole,
    initialAuthState,
  };
};

export default useAuthState;