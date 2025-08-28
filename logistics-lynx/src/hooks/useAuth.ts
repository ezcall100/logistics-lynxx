import { useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate authentication check
    const timer = setTimeout(() => {
      setLoading(false);
      // For now, we'll set a mock user
      setUser({
        id: '1',
        email: 'admin@transbot.ai',
        name: 'Admin User'
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return { user, loading };
};

export default useAuth;