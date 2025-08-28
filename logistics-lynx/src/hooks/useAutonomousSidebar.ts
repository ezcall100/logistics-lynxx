/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useUserActivity } from '@/hooks/sidebar/useUserActivity';
import { useMenuRecommendations } from '@/hooks/sidebar/useMenuRecommendations';
import { useRealTimeUpdates } from '@/hooks/sidebar/useRealTimeUpdates';
import { useAdaptiveMenu } from '@/hooks/sidebar/useAdaptiveMenu';

interface MenuRecommendation {
  itemPath: string;
  title: string;
  reason: string;
  priority: number;
}

interface UserActivityRecord {
  path: string;
  timestamp: Date;
  duration: number;
  action: string;
}

interface UserActivityMap {
  [key: string]: {
    count: number;
  };
}

interface AdaptiveMenuItem {
  id: string;
  label: string;
  path?: string;
  aiInsights: {
    isRecommended: boolean;
    frequency: number;
    isContextual: boolean;
  };
}

interface QuickAction {
  path: string;
  title: string;
}

interface AdaptiveMenu {
  items: AdaptiveMenuItem[];
  quickActions?: QuickAction[];
}

interface AutonomousSidebarState {
  recommendations: MenuRecommendation[];
  frequentlyUsed: string[];
  contextualItems: unknown[];
  realTimeUpdates: unknown[];
  adaptiveMenu: AdaptiveMenu | null;
}

export const useAutonomousSidebar = () => {
  const { user, selectedRole } = useAuth();
  const [sidebarState, setSidebarState] = useState<AutonomousSidebarState>({
    recommendations: [],
    frequentlyUsed: [],
    contextualItems: [],
    realTimeUpdates: [],
    adaptiveMenu: null
  });
  const [isLearning, setIsLearning] = useState(false);

  const { userActivity, trackUserActivity, loadUserActivity } = useUserActivity();
  const { generateRecommendations } = useMenuRecommendations();
  const { setupRealTimeUpdates } = useRealTimeUpdates();
  const { generateAdaptiveMenu } = useAdaptiveMenu();

  // Convert userActivity array to the expected map format
  const convertUserActivityToMap = useCallback((activities: UserActivityRecord[]): UserActivityMap => {
    const activityMap: UserActivityMap = {};
    activities.forEach(activity => {
      if (activityMap[activity.path]) {
        activityMap[activity.path].count += 1;
      } else {
        activityMap[activity.path] = { count: 1 };
      }
    });
    return activityMap;
  }, []);

  // Generate recommendations with learning state
  const refreshRecommendations = useCallback(async () => {
    setIsLearning(true);
    try {
      const activityMap = convertUserActivityToMap(userActivity);
      const recommendations = await generateRecommendations(activityMap);
      setSidebarState(prev => ({
        ...prev,
        recommendations
      }));
      return recommendations;
    } finally {
      setIsLearning(false);
    }
  }, [generateRecommendations, userActivity, convertUserActivityToMap]);

  // Generate adaptive menu
  const refreshAdaptiveMenu = useCallback(async () => {
    const activityMap = convertUserActivityToMap(userActivity);
    const recommendations = await generateRecommendations(activityMap);
    const adaptiveMenu = await generateAdaptiveMenu(activityMap, recommendations);
    setSidebarState(prev => ({
      ...prev,
      adaptiveMenu,
      recommendations
    }));
    return adaptiveMenu;
  }, [generateRecommendations, generateAdaptiveMenu, userActivity, convertUserActivityToMap]);

  // Handle real-time updates
  const handleRealTimeUpdate = useCallback((update: unknown) => {
    setSidebarState(prev => ({
      ...prev,
      realTimeUpdates: [
        ...prev.realTimeUpdates,
        update
      ].slice(-10)
    }));
  }, []);

  // Initialize and update sidebar state
  useEffect(() => {
    const initializeSidebar = async () => {
      if (!user || !selectedRole) return;

      // Load previous activity
      loadUserActivity();

      // Generate adaptive menu and recommendations
      await refreshAdaptiveMenu();
    };

    initializeSidebar();
    const cleanup = setupRealTimeUpdates(handleRealTimeUpdate);

    return cleanup;
  }, [user, selectedRole, loadUserActivity, refreshAdaptiveMenu, setupRealTimeUpdates, handleRealTimeUpdate]);

  // Auto-refresh recommendations every 5 minutes
  useEffect(() => {
    const interval = setInterval(refreshRecommendations, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshRecommendations]);

  return {
    sidebarState,
    trackUserActivity,
    isLearning,
    refreshRecommendations,
    refreshAdaptiveMenu
  };
};

export default useAutonomousSidebar;