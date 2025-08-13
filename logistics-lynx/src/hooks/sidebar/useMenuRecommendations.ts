
import { useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

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

export const useMenuRecommendations = () => {
  const { getMenuForRole, selectedRole } = useAuth();

  const generateRecommendations = useCallback(async (userActivity: UserActivity): Promise<MenuRecommendation[]> => {
    try {
      // Get current role menu
      const roleMenu = getMenuForRole(selectedRole);
      
      // Generate recommendations based on user activity and role
      const recommendations: MenuRecommendation[] = [];
      
      // Add logic to generate recommendations based on:
      // - Frequently used items
      // - Time-based patterns
      // - Role-specific suggestions
      
      roleMenu.forEach((item) => {
        const activity = userActivity[item.path || ''];
        if (activity && activity.count > 5) {
          recommendations.push({
            itemPath: item.path || '',
            title: item.label,
            reason: 'Frequently used',
            priority: activity.count
          });
        }
      });

      return recommendations.sort((a, b) => b.priority - a.priority);
    } catch (error) {
      console.error('Error generating recommendations:', error);
      return [];
    }
  }, [getMenuForRole, selectedRole]);

  return {
    generateRecommendations
  };
};
