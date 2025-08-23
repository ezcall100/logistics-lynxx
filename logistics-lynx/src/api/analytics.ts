import { supabase } from '../lib/supabaseClient';

// Analytics & Dashboard API Service
export interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  systemUptime: number;
  apiCalls: number;
  revenue: number;
  securityScore: number;
}

export interface UserAnalytics {
  totalUsers: number;
  newUsersThisMonth: number;
  activeUsersToday: number;
  userGrowthRate: number;
  topRoles: { role: string; count: number }[];
  recentSignups: any[];
}

export interface PerformanceMetrics {
  responseTime: number;
  throughput: number;
  errorRate: number;
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
}

export interface RevenueMetrics {
  mrr: number;
  arr: number;
  growthRate: number;
  churnRate: number;
  ltv: number;
  cac: number;
}

// Get system overview metrics
export const getSystemMetrics = async (): Promise<{ data: SystemMetrics | null; error: any }> => {
  try {
    // Get user stats
    const { data: userStats } = await supabase
      .from('profiles')
      .select('role, created_at');

    // Get recent activity (last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const { data: recentActivity } = await supabase
      .from('profiles')
      .select('created_at')
      .gte('created_at', yesterday.toISOString());

    // Calculate metrics
    const totalUsers = userStats?.length || 0;
    const activeUsers = recentActivity?.length || 0;
    const systemUptime = 99.97; // Mock for now, would come from monitoring service
    const apiCalls = 2400000; // Mock for now
    const revenue = 2847392; // Mock for now
    const securityScore = 98.5; // Mock for now

    return {
      data: {
        totalUsers,
        activeUsers,
        systemUptime,
        apiCalls,
        revenue,
        securityScore,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};

// Get user analytics
export const getUserAnalytics = async (): Promise<{ data: UserAnalytics | null; error: any }> => {
  try {
    const { data: users } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (!users) {
      return { data: null, error: 'No users found' };
    }

    // Calculate metrics
    const totalUsers = users.length;
    const now = new Date();
    const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const newUsersThisMonth = users.filter(u => 
      new Date(u.created_at) >= thisMonth
    ).length;

    const activeUsersToday = users.filter(u => 
      new Date(u.created_at) >= today
    ).length;

    // Calculate role distribution
    const roleCounts = users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topRoles = Object.entries(roleCounts)
      .map(([role, count]) => ({ role, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const recentSignups = users.slice(0, 10);

    // Calculate growth rate (mock for now)
    const userGrowthRate = 8.2;

    return {
      data: {
        totalUsers,
        newUsersThisMonth,
        activeUsersToday,
        userGrowthRate,
        topRoles,
        recentSignups,
      },
      error: null,
    };
  } catch (error) {
    return { data: null, error };
  }
};

// Get performance metrics
export const getPerformanceMetrics = async (): Promise<{ data: PerformanceMetrics | null; error: any }> => {
  try {
    // Mock performance data - in real app, this would come from monitoring service
    const data: PerformanceMetrics = {
      responseTime: 245, // ms
      throughput: 1250, // requests/sec
      errorRate: 0.12, // percentage
      cpuUsage: 67, // percentage
      memoryUsage: 78, // percentage
      diskUsage: 45, // percentage
    };

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Get revenue metrics
export const getRevenueMetrics = async (): Promise<{ data: RevenueMetrics | null; error: any }> => {
  try {
    // Mock revenue data - in real app, this would come from billing service
    const data: RevenueMetrics = {
      mrr: 2847392, // Monthly Recurring Revenue
      arr: 34168704, // Annual Recurring Revenue
      growthRate: 12.5, // percentage
      churnRate: 2.1, // percentage
      ltv: 45000, // Lifetime Value
      cac: 1200, // Customer Acquisition Cost
    };

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Get MCP agent statistics
export const getMCPAgentStats = async () => {
  try {
    // Mock MCP data - in real app, this would come from MCP service
    const data = {
      totalAgents: 47,
      activeAgents: 42,
      agentHealth: 89.4, // percentage
      tasksCompleted: 1247,
      tasksInProgress: 23,
      averageResponseTime: 1.2, // seconds
      topAgents: [
        { name: 'Data Processor', tasks: 156, success: 98.7 },
        { name: 'Security Monitor', tasks: 134, success: 99.2 },
        { name: 'Analytics Engine', tasks: 98, success: 97.8 },
      ],
    };

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Get security metrics
export const getSecurityMetrics = async () => {
  try {
    // Mock security data - in real app, this would come from security service
    const data = {
      securityScore: 98.5,
      vulnerabilities: 3,
      criticalIssues: 0,
      lastScan: new Date().toISOString(),
      complianceStatus: 'Compliant',
      auditLogs: 1247,
      failedLogins: 12,
      suspiciousActivity: 2,
    };

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

// Get portal statistics
export const getPortalStats = async () => {
  try {
    // Mock portal data - in real app, this would come from portal service
    const data = {
      totalPortals: 12,
      activePortals: 11,
      totalPortalUsers: 847,
      portalUsage: 89.2, // percentage
      topPortals: [
        { name: 'Shipper Portal', users: 234, usage: 94.1 },
        { name: 'Carrier Portal', users: 189, usage: 87.3 },
        { name: 'Broker Portal', users: 156, usage: 82.7 },
      ],
    };

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};
