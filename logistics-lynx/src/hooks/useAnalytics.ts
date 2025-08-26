/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState, useCallback } from 'react';
import { useRealAnalytics } from './useRealAnalytics';

// Keep the original interface for backward compatibility
interface AnalyticsData {
  aiLearning: Record<string, unknown> | null;
  userBehavior: Record<string, unknown> | null;
  roleMetrics: Record<string, unknown> | null;
  systemHealth: Record<string, unknown> | null;
}

export const useAnalytics = (timeRange: string = '24h', selectedRole: string = 'all') => {
  // Use real analytics by default, with fallback to mock data if needed
  const realAnalytics = useRealAnalytics(timeRange, selectedRole);
  
  // Check if we have real data, otherwise use the existing mock data logic
  const hasRealData = realAnalytics.analyticsData.aiLearning !== null;
  
  if (hasRealData) {
    return realAnalytics;
  }

  // Fallback to mock data if real data is not available
  return realAnalytics; // The real analytics hook handles fallbacks internally
};
