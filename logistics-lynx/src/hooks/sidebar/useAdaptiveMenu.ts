/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import {  } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface MenuRecommendation {
  itemPath: string;
  title: string;
  reason: string;
  priority: number;
}

interface UserActivity {
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

export const useAdaptiveMenu = () => {
  const { getMenuForRole, selectedRole } = useAuth();
  const [adaptiveMenu, setAdaptiveMenu] = useState<AdaptiveMenu | null>(null);

  const generateAdaptiveMenu = useCallback(async (
    userActivity: UserActivity, 
    recommendations: MenuRecommendation[]
  ): Promise<AdaptiveMenu | null> => {
    try {
      // Get base menu for current role
      const baseMenu = getMenuForRole(selectedRole);
      
      // Apply AI insights to menu items
      const enhancedMenu: AdaptiveMenu = {
        items: baseMenu.map((item, index) => ({
          id: item.id,
          label: item.label,
          path: item.path,
          aiInsights: {
            isRecommended: recommendations.some(rec => rec.itemPath === item.path),
            frequency: userActivity[item.path || '']?.count || 0,
            isContextual: false
          }
        }))
      };

      setAdaptiveMenu(enhancedMenu);
      return enhancedMenu;
    } catch (error) {
      console.error('Error generating adaptive menu:', error);
      return null;
    }
  }, [getMenuForRole, selectedRole]);

  return {
    adaptiveMenu,
    generateAdaptiveMenu
  };
};

export default useAdaptiveMenu;