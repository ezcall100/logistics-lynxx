
import React, { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardGrid, StatsGrid } from '@/components/layout/CardGrid';
import { Card, StatsCard, ActionCard, InfoCard } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SkeletonCard, SkeletonText, EmptyCreate, ErrorState } from '@/components/states';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Truck, 
  Package, 
  DollarSign, 
  FileText, 
  BarChart3, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Calendar,
  Plus,
  Download,
  RefreshCw,
  Eye,
  Settings,
  Shield,
  Zap,
  Database,
  Network,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  WifiOff,
  Bell,
  BellOff,
  UserCheck,
  UserX,
  TruckIcon,
  PackageIcon,
  DollarSignIcon,
  FileTextIcon,
  BarChart3Icon,
  ActivityIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  MapPinIcon,
  CalendarIcon,
  PlusIcon,
  DownloadIcon,
  RefreshCwIcon,
  EyeIcon,
  SettingsIcon,
  ShieldIcon,
  ZapIcon,
  DatabaseIcon,
  NetworkIcon,
  ServerIcon,
  CpuIcon,
  HardDriveIcon,
  WifiIcon,
  WifiOffIcon,
  BellIcon,
  BellOffIcon,
  UserCheckIcon,
  UserXIcon
} from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  activeCarriers: number;
  totalShipments: number;
  monthlyRevenue: number;
  systemHealth: number;
  aiAgents: number;
  userGrowth: number;
  shipmentGrowth: number;
}

interface RecentActivity {
  id: string;
  type: 'user' | 'shipment' | 'system' | 'ai';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error' | 'info';
}

export function SuperAdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);

  useEffect(() => {
    // Simulate data loading
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setStats({
          totalUsers: 2847,
          activeCarriers: 342,
          totalShipments: 1284,
          monthlyRevenue: 2400000,
          systemHealth: 98.5,
          aiAgents: 250,
          userGrowth: 12.5,
          shipmentGrowth: 5.2
        });

        setRecentActivity([
          {
            id: '1',
            type: 'user',
            title: 'New user registered',
            description: 'John Doe joined the platform',
            timestamp: '2 minutes ago',
            status: 'success'
          },
          {
            id: '2',
            type: 'shipment',
            title: 'Shipment completed',
            description: 'Load #12345 delivered successfully',
            timestamp: '5 minutes ago',
            status: 'success'
          },
          {
            id: '3',
            type: 'system',
            title: 'System update',
            description: 'Database backup completed',
            timestamp: '10 minutes ago',
            status: 'info'
          },
          {
            id: '4',
            type: 'ai',
            title: 'AI agent deployed',
            description: 'Route optimization agent activated',
            timestamp: '15 minutes ago',
            status: 'success'
          }
        ]);

        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Retry logic would go here
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-destructive';
      case 'info': return 'text-primary';
      default: return 'text-muted';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user': return UserCheck;
      case 'shipment': return Package;
      case 'system': return Server;
      case 'ai': return Cpu;
      default: return Activity;
    }
  };

  if (error) {
    return (
      <AppShell portal="super-admin" title="Dashboard">
        <ErrorState title="Failed to load dashboard" message={error} onRetry={handleRetry} />
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
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New User
          </Button>
        </div>
      }
    >
      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <StatsGrid>
          {loading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : stats ? (
            <>
              <StatsCard
                title="Total Users"
                value={stats.totalUsers.toLocaleString()}
                description={`+${stats.userGrowth}% from last month`}
                icon={Users}
                trend="up"
                trendValue={`+${stats.userGrowth}%`}
              />
              <StatsCard
                title="Active Carriers"
                value={stats.activeCarriers.toLocaleString()}
                description="Registered carriers"
                icon={Truck}
                trend="up"
                trendValue="+8 this week"
              />
              <StatsCard
                title="Total Shipments"
                value={stats.totalShipments.toLocaleString()}
                description={`+${stats.shipmentGrowth}% from last month`}
                icon={Package}
                trend="up"
                trendValue={`+${stats.shipmentGrowth}%`}
              />
              <StatsCard
                title="Monthly Revenue"
                value={`$${(stats.monthlyRevenue / 1000000).toFixed(1)}M`}
                description="This month's revenue"
                icon={DollarSign}
                trend="up"
                trendValue="+18.3%"
              />
            </>
          ) : (
            <EmptyCreate 
              title="No data available"
              description="Start by creating your first user or shipment"
              action={{ label: "Create User", onClick: () => {} }}
            />
          )}
        </StatsGrid>

        {/* Main Content Grid */}
        <DashboardGrid>
          {/* Recent Activity */}
          <Card size="lg">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system events and user actions</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <SkeletonText lines={3} />
                  <SkeletonText lines={3} />
                  <SkeletonText lines={3} />
                </div>
              ) : recentActivity.length > 0 ? (
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-surface-2 hover:bg-surface-3 transition-colors">
                        <div className={`p-2 rounded-full bg-primary/10 ${getStatusColor(activity.status)}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{activity.title}</p>
                          <p className="text-sm text-muted">{activity.description}</p>
                          <p className="text-xs text-muted mt-1">{activity.timestamp}</p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.type}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <EmptyCreate 
                  title="No recent activity"
                  description="Activity will appear here as users interact with the system"
                />
              )}
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Activity
              </Button>
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <Card size="lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <ActionCard
                  title="Add User"
                  description="Create new user account"
                  icon={UserCheck}
                  action={{ label: "Add", onClick: () => {} }}
                  size="sm"
                />
                <ActionCard
                  title="View Reports"
                  description="Access system reports"
                  icon={BarChart3}
                  action={{ label: "View", onClick: () => {} }}
                  size="sm"
                />
                <ActionCard
                  title="System Settings"
                  description="Configure system options"
                  icon={Settings}
                  action={{ label: "Configure", onClick: () => {} }}
                  size="sm"
                />
                <ActionCard
                  title="AI Agents"
                  description="Manage AI agents"
                  icon={Cpu}
                  action={{ label: "Manage", onClick: () => {} }}
                  size="sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card size="lg">
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>Current system health and performance</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  <SkeletonText lines={2} />
                  <SkeletonText lines={2} />
                  <SkeletonText lines={2} />
                </div>
              ) : (
                <div className="space-y-4">
                  <InfoCard
                    title="System Health"
                    description={`${stats?.systemHealth}% operational`}
                    icon={CheckCircle}
                    variant="success"
                  />
                  <InfoCard
                    title="AI Agents"
                    description={`${stats?.aiAgents} agents active`}
                    icon={Cpu}
                    variant="info"
                  />
                  <InfoCard
                    title="Database"
                    description="All systems operational"
                    icon={Database}
                    variant="success"
                  />
                  <InfoCard
                    title="Network"
                    description="Connected to all services"
                    icon={Network}
                    variant="success"
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </DashboardGrid>
      </div>
    </AppShell>
  );
}
