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
  HardDrive,
  Cpu,
  Wifi,
  Cloud,
  Globe,
  Building,
  CreditCard,
  UserCheck,
  Route,
  Navigation,
  Brain,
  Target,
  Award,
  Lock,
  Unlock,
  Key,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  WifiOff,
  CloudOff,
  AlertCircle,
  Heart,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Share2,
  Bookmark,
  Timer,
  Hourglass,
  CalendarDays,
  CalendarCheck,
  CalendarX,
  CalendarPlus,
  CalendarMinus,
  CalendarRange,
  CalendarSearch,
  CalendarClock,
  CalendarHeart,
  Wrench,
  Satellite,
  Radar,
  SatelliteDish,
  Antenna,
  Signal,
  Bluetooth,
  Radio,
  Tv,
  Watch,
  Headphones,
  Speaker,
  Camera,
  Video,
  Image,
  File,
  Folder,
  Archive,
  Compass,
  Map,
  Crosshair,
  Binoculars,
  Telescope,
  Microscope,
  Beaker,
  TestTube,
  Atom,
  Dna,
  HeartIcon,
  ActivityIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  BarChart,
  PieChart,
  LineChart,
  ScatterChart,
  AreaChart,
  CandlestickChart,
  Gauge,
  Thermometer,
  CompassIcon,
  ClockIcon,
  CalendarIcon,
  TimerIcon,
  HourglassIcon,
  CalendarDaysIcon,
  CalendarCheckIcon,
  CalendarXIcon,
  CalendarPlusIcon,
  CalendarMinusIcon,
  CalendarRangeIcon,
  CalendarSearchIcon,
  CalendarClockIcon,
  CalendarHeartIcon,
  WrenchIcon
} from 'lucide-react';

// Types for our dashboard data
interface DashboardStats {
  totalLoads: number;
  activeLoads: number;
  availableDrivers: number;
  totalRevenue: number;
  onTimeDelivery: number;
  systemHealth: number;
}

interface RecentActivity {
  id: number;
  type: 'load' | 'driver' | 'invoice' | 'system' | 'alert';
  title: string;
  description: string;
  timestamp: string;
  status: 'success' | 'pending' | 'warning' | 'error';
  user: string;
}

interface SystemMetric {
  name: string;
  value: number;
  unit: string;
  status: 'healthy' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'stable';
  change: number;
}

export function UnifiedDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);

  useEffect(() => {
    // Simulate data loading
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Mock data
        setStats({
          totalLoads: 156,
          activeLoads: 24,
          availableDrivers: 18,
          totalRevenue: 12450,
          onTimeDelivery: 96.5,
          systemHealth: 98.2
        });

        setRecentActivity([
          {
            id: 1,
            type: 'load',
            title: 'New load created',
            description: 'Load #L-2024-001 assigned to Driver John Smith',
            timestamp: '2 minutes ago',
            status: 'success',
            user: 'AI System'
          },
          {
            id: 2,
            type: 'driver',
            title: 'Driver assigned',
            description: 'Driver Sarah Johnson assigned to route optimization',
            timestamp: '5 minutes ago',
            status: 'success',
            user: 'Dispatch Manager'
          },
          {
            id: 3,
            type: 'invoice',
            title: 'Invoice generated',
            description: 'Invoice #INV-2024-089 generated for completed load',
            timestamp: '10 minutes ago',
            status: 'pending',
            user: 'Billing System'
          },
          {
            id: 4,
            type: 'system',
            title: 'System update',
            description: 'Route optimization algorithm updated to v2.1',
            timestamp: '15 minutes ago',
            status: 'success',
            user: 'System Admin'
          }
        ]);

        setSystemMetrics([
          {
            name: 'CPU Usage',
            value: 45,
            unit: '%',
            status: 'healthy',
            trend: 'stable',
            change: 0
          },
          {
            name: 'Memory Usage',
            value: 78,
            unit: '%',
            status: 'warning',
            trend: 'up',
            change: 5
          },
          {
            name: 'Network Latency',
            value: 12,
            unit: 'ms',
            status: 'healthy',
            trend: 'down',
            change: -2
          },
          {
            name: 'Database Connections',
            value: 156,
            unit: '',
            status: 'healthy',
            trend: 'stable',
            change: 0
          }
        ]);

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Reload data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    console.log('Quick action:', action);
    // Handle quick actions
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
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" size="sm" onClick={handleRetry}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      }
    >
      <div className="p-6 space-y-6">
        {/* Loading State */}
        {loading && (
          <div className="space-y-6">
            <StatsGrid>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </StatsGrid>
            <DashboardGrid>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </DashboardGrid>
          </div>
        )}

        {/* Dashboard Content */}
        {!loading && stats && (
          <>
            {/* Stats Cards */}
            <StatsGrid>
              <StatsCard
                title="Active Loads"
                value={stats.activeLoads.toString()}
                description="Currently active shipments"
                icon={<Package className="h-5 w-5" />}
                trend="up"
                trendValue="+12%"
                className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50"
              />
              <StatsCard
                title="Available Drivers"
                value={stats.availableDrivers.toString()}
                description="Drivers ready for assignment"
                icon={<Users className="h-5 w-5" />}
                trend="up"
                trendValue="+5%"
                className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50"
              />
              <StatsCard
                title="Revenue Today"
                value={`$${stats.totalRevenue.toLocaleString()}`}
                description="Total revenue generated today"
                icon={<DollarSign className="h-5 w-5" />}
                trend="up"
                trendValue="+8%"
                className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50"
              />
              <StatsCard
                title="On-Time Delivery"
                value={`${stats.onTimeDelivery}%`}
                description="Percentage of on-time deliveries"
                icon={<CheckCircle className="h-5 w-5" />}
                trend="up"
                trendValue="+2.1%"
                className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50"
              />
            </StatsGrid>

            {/* Main Content Grid */}
            <DashboardGrid>
              {/* Recent Activity */}
              <Card 
                size="lg" 
                title="Recent Activity" 
                description="Latest system activities and updates"
                actions={[
                  {
                    label: 'View All',
                    icon: Eye,
                    onClick: () => handleQuickAction('view-all-activity'),
                    variant: 'ghost'
                  }
                ]}
              >
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div 
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activity.status === 'success' ? 'bg-green-100 text-green-600 dark:bg-green-900/50 dark:text-green-400' :
                          activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/50 dark:text-yellow-400' :
                          activity.status === 'error' ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400' :
                          'bg-blue-100 text-blue-600 dark:bg-blue-900/50 dark:text-blue-400'
                        }`}>
                          {activity.type === 'load' && <Package className="h-5 w-5" />}
                          {activity.type === 'driver' && <Users className="h-5 w-5" />}
                          {activity.type === 'invoice' && <FileText className="h-5 w-5" />}
                          {activity.type === 'system' && <Activity className="h-5 w-5" />}
                          {activity.type === 'alert' && <AlertTriangle className="h-5 w-5" />}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">
                          {activity.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {activity.description}
                        </p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-muted-foreground">
                            {activity.timestamp}
                          </span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">
                            {activity.user}
                          </span>
                        </div>
                      </div>
                      <Badge 
                        variant={
                          activity.status === 'success' ? 'default' :
                          activity.status === 'warning' ? 'secondary' :
                          activity.status === 'error' ? 'destructive' :
                          'outline'
                        }
                        className="text-xs"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card 
                size="lg" 
                title="Quick Actions" 
                description="Common tasks and shortcuts"
              >
                <div className="grid grid-cols-2 gap-4">
                  <ActionCard
                    title="Create Load"
                    description="Create a new shipment"
                    icon={<Plus className="h-5 w-5" />}
                    onClick={() => handleQuickAction('create-load')}
                    className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50"
                  />
                  <ActionCard
                    title="Assign Driver"
                    description="Assign driver to load"
                    icon={<UserCheck className="h-5 w-5" />}
                    onClick={() => handleQuickAction('assign-driver')}
                    className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/50 dark:to-green-900/50"
                  />
                  <ActionCard
                    title="Generate Invoice"
                    description="Create invoice for completed load"
                    icon={<FileText className="h-5 w-5" />}
                    onClick={() => handleQuickAction('generate-invoice')}
                    className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950/50 dark:to-purple-900/50"
                  />
                  <ActionCard
                    title="Route Optimization"
                    description="Optimize delivery routes"
                    icon={<Route className="h-5 w-5" />}
                    onClick={() => handleQuickAction('optimize-routes')}
                    className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950/50 dark:to-orange-900/50"
                  />
                </div>
              </Card>

              {/* System Status */}
              <Card 
                size="lg" 
                title="System Status" 
                description="Real-time system health and performance"
              >
                <div className="space-y-4">
                  {systemMetrics.map((metric) => (
                    <div 
                      key={metric.name}
                      className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          metric.status === 'healthy' ? 'bg-green-500' :
                          metric.status === 'warning' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`} />
                        <div>
                          <p className="text-sm font-medium">{metric.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {metric.value} {metric.unit}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs font-medium ${
                          metric.trend === 'up' ? 'text-green-600 dark:text-green-400' :
                          metric.trend === 'down' ? 'text-red-600 dark:text-red-400' :
                          'text-muted-foreground'
                        }`}>
                          {metric.trend === 'up' && '+'}{metric.change}
                        </span>
                        {metric.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />}
                        {metric.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-400" />}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </DashboardGrid>

            {/* Info Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                title="System Health"
                description={`${stats.systemHealth}% - All systems operational`}
                icon={<Shield className="h-5 w-5" />}
                variant="success"
              />
              <InfoCard
                title="Total Loads"
                description={`${stats.totalLoads} loads managed this month`}
                icon={<Package className="h-5 w-5" />}
                variant="default"
              />
              <InfoCard
                title="Performance"
                description="System running at optimal performance"
                icon={<Zap className="h-5 w-5" />}
                variant="default"
              />
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}

export default UnifiedDashboard;
