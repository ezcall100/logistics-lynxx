import React from 'react';
import { 
  MetricCard, 
  ChartCard, 
  ActivityFeed, 
  QuickActions, 
  StatusIndicator,
  ProgressBar,
  DataTable,
  AlertCard
} from '../DashboardComponents';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  TrendingUp, 
  TrendingDown, 
  Truck, 
  Package, 
  DollarSign,
  Users,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Activity,
  BarChart3,
  Calendar,
  Settings,
  Plus,
  FileText,
  Target,
  Zap,
  Globe,
  Shield,
  Database,
  Server,
  Network,
  HardDrive,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Signal,
  SignalHigh,
  SignalMedium,
  SignalLow,
  Star,
  StarHalf,
  StarOff
} from 'lucide-react';

export interface DashboardData {
  metrics: Array<{
    title: string;
    value: string;
    change?: number;
    icon: string;
    color: string;
  }>;
  activities: Array<{
    type: 'success' | 'warning' | 'error' | 'info';
    title: string;
    time: string;
    description?: string;
  }>;
  quickActions: Array<{
    icon: string;
    label: string;
    onClick?: () => void;
    variant?: 'default' | 'secondary' | 'outline';
  }>;
  systemStatus: Array<{
    name: string;
    status: 'online' | 'offline' | 'warning' | 'error';
    description?: string;
  }>;
  recentData?: Array<Record<string, unknown>>;
}

interface ModernDashboardProps {
  title: string;
  description: string;
  data: DashboardData;
  portalType?: string;
}

export const ModernDashboard: React.FC<ModernDashboardProps> = ({
  title,
  description,
  data,
  portalType = 'general'
}) => {
  const getPortalColor = (type: string) => {
    const colors = {
      carrier: '#3b82f6',
      broker: '#10b981',
      shipper: '#f59e0b',
      driver: '#ef4444',
      'owner-operator': '#06b6d4',
      factoring: '#ec4899',
      'super-admin': '#8b5cf6'
    };
    return colors[type as keyof typeof colors] || '#3b82f6';
  };

  const portalColor = getPortalColor(portalType);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">{description}</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            <Calendar size={16} className="mr-2" />
            Today
          </Button>
          <Button>
            <Plus size={16} className="mr-2" />
            New Action
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.metrics.map((metric, index) => (
          <MetricCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
            color={metric.color}
            onClick={() => console.log(`Clicked ${metric.title}`)}
          />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Charts and Data */}
        <div className="lg:col-span-2 space-y-6">
          {/* Performance Chart */}
          <ChartCard title="Performance Overview" height="300px">
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <BarChart3 size={48} className="text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Chart component will be rendered here</p>
                <p className="text-sm text-gray-500">Performance metrics visualization</p>
              </div>
            </div>
          </ChartCard>

          {/* Recent Data Table */}
          {data.recentData && (
            <DataTable
              title="Recent Activity"
              data={data.recentData}
              columns={[
                { key: 'id', label: 'ID' },
                { key: 'name', label: 'Name' },
                { key: 'status', label: 'Status', 
                  render: (value) => (
                    <Badge variant={value === 'active' ? 'default' : 'secondary'}>
                      {value}
                    </Badge>
                  )
                },
                { key: 'date', label: 'Date' },
                { key: 'actions', label: 'Actions',
                  render: () => (
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  )
                }
              ]}
            />
          )}

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity size={20} />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.systemStatus.map((status, index) => (
                  <StatusIndicator
                    key={index}
                    status={status.status}
                    label={status.name}
                    description={status.description}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activity Feed and Quick Actions */}
        <div className="space-y-6">
          {/* Activity Feed */}
          <ActivityFeed 
            activities={data.activities}
            title="Recent Activity"
            maxHeight="400px"
          />

          {/* Quick Actions */}
          <QuickActions 
            actions={data.quickActions}
            title="Quick Actions"
          />

          {/* Alerts */}
          <div className="space-y-4">
            <AlertCard
              type="success"
              title="System Update Complete"
              description="All systems have been successfully updated to the latest version."
              action={{
                label: "View Details",
                onClick: () => console.log("View details clicked")
              }}
            />
            
            <AlertCard
              type="warning"
              title="Maintenance Scheduled"
              description="Scheduled maintenance will begin in 2 hours. Please save your work."
            />
          </div>

          {/* Progress Indicators */}
          <Card>
            <CardHeader>
              <CardTitle>System Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ProgressBar
                value={85}
                max={100}
                label="CPU Usage"
                showPercentage
                color="default"
              />
              <ProgressBar
                value={60}
                max={100}
                label="Memory Usage"
                showPercentage
                color="warning"
              />
              <ProgressBar
                value={95}
                max={100}
                label="Storage Usage"
                showPercentage
                color="error"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Bottom Section - Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Response Time</p>
                <p className="text-2xl font-bold text-gray-900">2.4s</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Zap size={24} className="text-green-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <TrendingDown size={16} className="text-green-600 mr-1" />
                <span className="text-green-600">12%</span>
                <span className="text-gray-600 ml-1">from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Uptime</p>
                <p className="text-2xl font-bold text-gray-900">99.9%</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield size={24} className="text-blue-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <CheckCircle size={16} className="text-green-600 mr-1" />
                <span className="text-green-600">All systems operational</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Users size={24} className="text-purple-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <TrendingUp size={16} className="text-green-600 mr-1" />
                <span className="text-green-600">8%</span>
                <span className="text-gray-600 ml-1">from last week</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Data Processed</p>
                <p className="text-2xl font-bold text-gray-900">2.4TB</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Database size={24} className="text-orange-600" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <TrendingUp size={16} className="text-green-600 mr-1" />
                <span className="text-green-600">15%</span>
                <span className="text-gray-600 ml-1">from yesterday</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export { sampleDashboardData } from './sample-data';
