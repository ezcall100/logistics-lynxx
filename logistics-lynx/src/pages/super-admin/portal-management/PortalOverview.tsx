import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { EnhancedProgress } from '../../../components/ui/EnhancedUIComponents';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs';
import { 
  Globe, 
  Users, 
  Activity, 
  Settings, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Play,
  Pause,
  Edit,
  Eye,
  Plus,
  Search,
  } from 'lucide-react';

interface Portal {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'inactive' | 'maintenance' | 'error';
  type: 'broker' | 'shipper' | 'carrier' | 'driver' | 'admin' | 'analytics' | 'financial';
  users: number;
  activeUsers: number;
  uptime: number;
  performance: number;
  lastActivity: string;
  version: string;
  environment: 'production' | 'staging' | 'development';
  features: string[];
  alerts: number;
  errors: number;
}

interface PortalMetrics {
  totalPortals: number;
  activePortals: number;
  totalUsers: number;
  activeUsers: number;
  averageUptime: number;
  averagePerformance: number;
  totalAlerts: number;
  totalErrors: number;
}

const PortalOverview: React.FC = () => {
  const [portals, setPortals] = useState<Portal[]>([]);
  const [metrics, setMetrics] = useState<PortalMetrics>({
    totalPortals: 0,
    activePortals: 0,
    totalUsers: 0,
    activeUsers: 0,
    averageUptime: 0,
    averagePerformance: 0,
    totalAlerts: 0,
    totalErrors: 0
  });
  const [selectedPortal, setSelectedPortal] = useState<Portal | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPortalData();
    const interval = setInterval(loadPortalData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadPortalData = async () => {
    setIsLoading(true);
    try {
      // Simulate API calls
      const mockPortals: Portal[] = [
        {
          id: '1',
          name: 'Broker Portal',
          key: 'broker',
          status: 'active',
          type: 'broker',
          users: 1250,
          activeUsers: 847,
          uptime: 99.95,
          performance: 98.5,
          lastActivity: new Date().toISOString(),
          version: '2.1.4',
          environment: 'production',
          features: ['Load Management', 'Carrier Assignment', 'Generation'],
          alerts: 2,
          errors: 0
        },
        {
          id: '2',
          name: 'Shipper Portal',
          key: 'shipper',
          status: 'active',
          type: 'shipper',
          users: 890,
          activeUsers: 623,
          uptime: 99.92,
          performance: 97.8,
          lastActivity: new Date(Date.now() - 300000).toISOString(),
          version: '2.1.3',
          environment: 'production',
          features: ['Shipment Booking', 'Tracking', 'Documentation'],
          alerts: 1,
          errors: 0
        },
        {
          id: '3',
          name: 'Carrier Portal',
          key: 'carrier',
          status: 'maintenance',
          type: 'carrier',
          users: 2100,
          activeUsers: 1456,
          uptime: 99.88,
          performance: 96.2,
          lastActivity: new Date(Date.now() - 600000).toISOString(),
          version: '2.1.2',
          environment: 'production',
          features: ['Fleet Management', 'Driver Assignment', 'Route Optimization'],
          alerts: 5,
          errors: 2
        },
        {
          id: '4',
          name: 'Driver Portal',
          key: 'driver',
          status: 'active',
          type: 'driver',
          users: 3400,
          activeUsers: 2890,
          uptime: 99.97,
          performance: 99.1,
          lastActivity: new Date(Date.now() - 120000).toISOString(),
          version: '2.1.4',
          environment: 'production',
          features: ['Mobile App', 'Status Updates', 'Document '],
          alerts: 0,
          errors: 0
        },
        {
          id: '5',
          name: 'Admin Portal',
          key: 'admin',
          status: 'active',
          type: 'admin',
          users: 45,
          activeUsers: 23,
          uptime: 99.99,
          performance: 99.8,
          lastActivity: new Date(Date.now() - 180000).toISOString(),
          version: '2.1.4',
          environment: 'production',
          features: ['User Management', 'System Configuration', 'Analytics'],
          alerts: 1,
          errors: 0
        },
        {
          id: '6',
          name: 'Analytics Portal',
          key: 'analytics',
          status: 'error',
          type: 'analytics',
          users: 120,
          activeUsers: 89,
          uptime: 98.5,
          performance: 85.2,
          lastActivity: new Date(Date.now() - 900000).toISOString(),
          version: '2.1.1',
          environment: 'production',
          features: ['Business Intelligence', 'Reporting', 'Data Visualization'],
          alerts: 8,
          errors: 3
        }
      ];

      setPortals(mockPortals);

      // Calculate metrics
      const totalPortals = mockPortals.length;
      const activePortals = mockPortals.filter(p => p.status === 'active').length;
      const totalUsers = mockPortals.reduce((sum, p) => sum + p.users, 0);
      const activeUsers = mockPortals.reduce((sum, p) => sum + p.activeUsers, 0);
      const averageUptime = mockPortals.reduce((sum, p) => sum + p.uptime, 0) / totalPortals;
      const averagePerformance = mockPortals.reduce((sum, p) => sum + p.performance, 0) / totalPortals;
      const totalAlerts = mockPortals.reduce((sum, p) => sum + p.alerts, 0);
      const totalErrors = mockPortals.reduce((sum, p) => sum + p.errors, 0);

      setMetrics({
        totalPortals,
        activePortals,
        totalUsers,
        activeUsers,
        averageUptime,
        averagePerformance,
        totalAlerts,
        totalErrors
      });
    } catch (error) {
      console.error('Error loading portal data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'maintenance': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'inactive': return <Pause className="w-4 h-4 text-gray-500" />;
      case 'maintenance': return <Settings className="w-4 h-4 text-yellow-500" />;
      case 'error': return <XCircle className="w-4 h-4 text-red-500" />;
      default: return <Eye className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'broker': return '📦';
      case 'shipper': return '🚚';
      case 'carrier': return '🚛';
      case 'driver': return '👨‍💼';
      case 'admin': return '⚙️';
      case 'analytics': return '📊';
      case 'financial': return '💰';
      default: return '🌐';
    }
  };

  const filteredPortals = portals.filter(portal => {
    const matchesSearch = portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         portal.key.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || portal.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Portal Management</h1>
          <p className="text-gray-600">Multi-portal system overview and management</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button variant="outline" onClick={loadPortalData} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Portal
          </Button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Portals</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalPortals}</p>
              </div>
              <Globe className="w-8 h-8 text-blue-500" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-green-600">{metrics.activePortals} active</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalUsers.toLocaleString()}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-blue-600">{metrics.activeUsers.toLocaleString()} active</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Uptime</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.averageUptime.toFixed(2)}%</p>
              </div>
              <Activity className="w-8 h-8 text-emerald-500" />
            </div>
            <div className="mt-4">
              <EnhancedProgress value={metrics.averageUptime} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Health</p>
                <p className="text-2xl font-bold text-gray-900">{metrics.totalAlerts}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-500" />
            </div>
            <div className="mt-4">
              <p className="text-sm text-red-600">{metrics.totalErrors} errors</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search portals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
              <option value="error">Error</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Portals */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPortals.map((portal) => (
              <Card key={portal.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getTypeIcon(portal.type)}</span>
                      <div>
                        <CardTitle className="text-lg">{portal.name}</CardTitle>
                        <p className="text-sm text-gray-500">{portal.key}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(portal.status)}
                      <Badge className={getStatusColor(portal.status)}>
                        {portal.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Users</p>
                        <p className="font-semibold">{portal.users.toLocaleString()}</p>
                        <p className="text-xs text-green-600">{portal.activeUsers.toLocaleString()} active</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Uptime</p>
                        <p className="font-semibold">{portal.uptime}%</p>
                        <EnhancedProgress value={portal.uptime} className="h-1 mt-1" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Performance</span>
                      <span className="font-semibold">{portal.performance}%</span>
                    </div>
                    <EnhancedProgress value={portal.performance} className="h-2" />
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Version</span>
                      <span className="font-mono">{portal.version}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Environment</span>
                      <Badge variant="outline">{portal.environment}</Badge>
                    </div>
                    
                    {portal.alerts > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Alerts</span>
                        <span className="text-orange-600 font-semibold">{portal.alerts}</span>
                      </div>
                    )}
                    
                    {portal.errors > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Errors</span>
                        <span className="text-red-600 font-semibold">{portal.errors}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between pt-2 border-t">
                      <p className="text-xs text-gray-500">
                        Last activity: {new Date(portal.lastActivity).toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portal Configuration Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Detailed portal configuration and settings will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portal Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Portal performance analytics and metrics will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortalOverview;
