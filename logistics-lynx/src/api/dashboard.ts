/* eslint-disable @typescript-eslint/no-explicit-any */
// Dashboard API functions

// Additional utility functions for SystemOverview
export const getSystemMetrics = async () => {
  try {
    const data = {
      totalUsers: 1247,
      activeUsers: 892,
      totalRevenue: 125000,
      monthlyGrowth: 12.5,
      systemLoad: 45,
      memoryUsage: 68,
      diskUsage: 34,
      networkTraffic: 2.4
    };
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const getUserAnalytics = async () => {
  try {
    const data = {
      totalUsers: 1247,
      newUsersToday: 23,
      activeUsersToday: 456,
      userGrowthRate: 8.2,
      topCountries: [
        { country: 'United States', users: 456 },
        { country: 'Canada', users: 234 },
        { country: 'United Kingdom', users: 189 },
        { country: 'Germany', users: 145 },
        { country: 'France', users: 123 }
      ]
    };
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Utility formatting functions
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

export const formatPercentage = (num: number): string => {
  return `${num.toFixed(1)}%`;
};

export const formatUptime = (uptime: string | number): string => {
  return typeof uptime === 'string' ? uptime : `${uptime.toFixed(2)}%`;
};
