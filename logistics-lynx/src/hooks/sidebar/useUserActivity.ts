/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback } from 'react';

interface UserActivity {
  path: string;
  timestamp: Date;
  duration: number;
  action: string;
}

export const useUserActivity = () => {
  const [userActivity, setUserActivity] = useState<UserActivity[]>([]);

  const trackUserActivity = useCallback((path: string, action: string = 'navigate') => {
    const activity: UserActivity = {
      path,
      timestamp: new Date(),
      duration: 0,
      action
    };

    setUserActivity(prev => {
      const updated = [...prev, activity].slice(-50); // Keep last 50 activities
      localStorage.setItem('userActivity', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Load activity from localStorage on initialization
  const loadUserActivity = useCallback(() => {
    const savedActivity = localStorage.getItem('userActivity');
    if (savedActivity) {
      try {
        const parsedActivity = JSON.parse(savedActivity);
        setUserActivity(parsedActivity);
      } catch (error) {
        console.error('Error loading user activity:', error);
      }
    }
  }, []);

  return {
    userActivity,
    trackUserActivity,
    loadUserActivity
  };
};

export default useUserActivity;