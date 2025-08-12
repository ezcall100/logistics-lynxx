/**
 * Super Admin Dashboard
 * Demonstrates the unified design system with cards, stats, and layout
 */

import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  DollarSign, 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Settings,
  Bell,
  Plus,
} from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardGrid, StatsGrid } from '@/components/layout/CardGrid';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter,
  StatsCard,
  ActionCard,
  InfoCard,
} from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  SkeletonCard, 
  SkeletonText, 
  EmptyCreate,
  ErrorState,
} from '@/components/states';

interface DashboardStats {
  totalUsers: number;
  activeSubscriptions: number;
  totalRevenue: number;
  systemHealth: number;
  userGrowth: number;
  revenueGrowth: number;
}

interface RecentActivity {
  id: string;
  type: 'user' | 'subscription' | 'payment' | 'system';
  message: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export function SuperAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  // Simulate data loading
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data
        setStats({
          totalUsers: 1247,
          activeSubscriptions: 892,
          totalRevenue: 156789,
          systemHealth: 98.5,
          userGrowth: 12.5,
          revenueGrowth: 8.3,
        });

        setRecentActivity([
          {
            id: '1',
            type: 'user',
            message: 'New user registered: john.doe@example.com',
            timestamp: '2 minutes ago',
            status: 'success',
          },
          {
            id: '2',
            type: 'subscription',
            message: 'Premium subscription renewed for Company ABC',
            timestamp: '5 minutes ago',
            status: 'success',
          },
          {
            id: '3',
            type: 'payment',
            message: 'Payment failed for user: jane.smith@example.com',
            timestamp: '10 minutes ago',
            status: 'error',
          },
          {
            id: '4',
            type: 'system',
            message: 'System backup completed successfully',
            timestamp: '15 minutes ago',
            status: 'info',
          },
        ]);

        setError(null);
      } catch (err) {
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Retry loading data
    setTimeout(() => {
      setLoading(false);
      setStats({
        totalUsers: 1247,
        activeSubscriptions: 892,
        totalRevenue: 156789,
        systemHealth: 98.5,
        userGrowth: 12.5,
        revenueGrowth: 8.3,
      });
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-success-subtle text-success';
      case 'warning': return 'bg-warning-subtle text-warning';
      case 'error': return 'bg-destructive-subtle text-destructive';
      case 'info': return 'bg-secondary-subtle text-secondary';
      default: return 'bg-muted-subtle text-muted';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users className="h-4 w-4" />;
      case 'subscription': return <Shield className="h-4 w-4" />;
      case 'payment': return <DollarSign className="h-4 w-4" />;
      case 'system': return <Settings className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  if (error) {
    return (
      <AppShell portal="super-admin" title="Dashboard">
        <ErrorState
          title="Failed to load dashboard"
          message={error}
          onRetry={handleRetry}
        />
      </AppShell>
    );
  }

  return (
    <AppShell 
      portal="super-admin" 
      title="Dashboard"
      subtitle="Overview of system performance and user activity"
      actions={
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      }
    >
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div>
          <h2 className="text-xl font-semibold text-text mb-4">Key Metrics</h2>
          {loading ? (
            <StatsGrid>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </StatsGrid>
          ) : (
            <StatsGrid>
              <StatsCard
                title="Total Users"
                value={stats?.totalUsers.toLocaleString() || '0'}
                description="Active user accounts"
                icon={<Users className="h-6 w-6 text-primary" />}
                trend="up"
                trendValue={`+${stats?.userGrowth}%`}
              />
              <StatsCard
                title="Active Subscriptions"
                value={stats?.activeSubscriptions.toLocaleString() || '0'}
                description="Premium subscriptions"
                icon={<Shield className="h-6 w-6 text-success" />}
                trend="up"
                trendValue="+5.2%"
              />
              <StatsCard
                title="Total Revenue"
                value={`$${stats?.totalRevenue.toLocaleString() || '0'}`}
                description="Monthly recurring revenue"
                icon={<DollarSign className="h-6 w-6 text-warning" />}
                trend="up"
                trendValue={`+${stats?.revenueGrowth}%`}
              />
              <StatsCard
                title="System Health"
                value={`${stats?.systemHealth}%`}
                description="Uptime and performance"
                icon={<BarChart3 className="h-6 w-6 text-info" />}
                trend="neutral"
              />
            </StatsGrid>
          )}
        </div>

        {/* Main Content Grid */}
        <DashboardGrid>
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <SkeletonText lines={3} />
                </div>
              ) : recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-3 p-3 rounded-md hover:bg-surface-2 transition-colors"
                    >
                      <div className="flex-shrink-0 mt-1">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text">{activity.message}</p>
                        <p className="text-xs text-text-muted mt-1">
                          {activity.timestamp}
                        </p>
                      </div>
                      <Badge 
                        variant="secondary" 
                        className={getStatusColor(activity.status)}
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <EmptyCreate
                  title="No recent activity"
                  description="Activity will appear here as users interact with the system."
                />
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                View all activity
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <ActionCard
                  title="User Management"
                  description="Add, edit, or remove user accounts"
                  icon={<Users className="h-5 w-5 text-primary" />}
                  action="Manage users"
                  onClick={() => console.log('Navigate to user management')}
                />
                <ActionCard
                  title="System Settings"
                  description="Configure system preferences and features"
                  icon={<Settings className="h-5 w-5 text-secondary" />}
                  action="Configure"
                  onClick={() => console.log('Navigate to settings')}
                />
                <ActionCard
                  title="Analytics"
                  description="View detailed system analytics and reports"
                  icon={<BarChart3 className="h-5 w-5 text-success" />}
                  action="View reports"
                  onClick={() => console.log('Navigate to analytics')}
                />
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system health and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">API Status</span>
                  <Badge variant="secondary" className="bg-success-subtle text-success">
                    Operational
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Database</span>
                  <Badge variant="secondary" className="bg-success-subtle text-success">
                    Healthy
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Storage</span>
                  <Badge variant="secondary" className="bg-warning-subtle text-warning">
                    75% Used
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-muted">Last Backup</span>
                  <span className="text-sm text-text">2 hours ago</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm">
                View details
              </Button>
            </CardFooter>
          </Card>
        </DashboardGrid>

        {/* Info Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InfoCard
            title="System Maintenance"
            description="Scheduled maintenance window: Sunday 2:00 AM - 4:00 AM EST"
            variant="info"
            icon={<Settings className="h-5 w-5 text-secondary" />}
          />
          <InfoCard
            title="New Feature Available"
            description="Advanced analytics dashboard is now available for all users"
            variant="success"
            icon={<BarChart3 className="h-5 w-5 text-success" />}
          />
        </div>
      </div>
    </AppShell>
  );
}
