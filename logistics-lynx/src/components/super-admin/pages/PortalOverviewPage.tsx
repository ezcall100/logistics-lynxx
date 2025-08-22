import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { 
  Globe, Users, Activity, TrendingUp, AlertTriangle, 
  CheckCircle, Clock, Database, Server, Zap,
  ArrowUpRight, ArrowDownRight, Minus, Target, RefreshCw
} from 'lucide-react';

interface PortalOverview {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'maintenance';
  users: number;
  maxUsers: number;
  uptime: number;
  responseTime: number;
  errorRate: number;
  lastActive: string;
  healthScore: number;
}

const PortalOverviewPage = () => {
  const [portals, setPortals] = useState<PortalOverview[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadPortalOverview();
  }, []);

  const loadPortalOverview = async () => {
    setLoading(true);
    try {
      // Mock data for portal overview
      const mockPortals: PortalOverview[] = [
        {
          id: 'portal-001',
          name: 'Carrier Portal',
          type: 'carrier',
          status: 'active',
          users: 1250,
          maxUsers: 2000,
          uptime: 99.8,
          responseTime: 245,
          errorRate: 0.2,
          lastActive: '2024-01-15T10:30:00Z',
          healthScore: 95
        },
        {
          id: 'portal-002',
          name: 'Broker Portal',
          type: 'broker',
          status: 'active',
          users: 890,
          maxUsers: 1500,
          uptime: 99.9,
          responseTime: 180,
          errorRate: 0.1,
          lastActive: '2024-01-15T10:25:00Z',
          healthScore: 98
        },
        {
          id: 'portal-003',
          name: 'Shipper Portal',
          type: 'shipper',
          status: 'active',
          users: 2100,
          maxUsers: 3000,
          uptime: 99.7,
          responseTime: 320,
          errorRate: 0.3,
          lastActive: '2024-01-15T10:28:00Z',
          healthScore: 92
        },
        {
          id: 'portal-004',
          name: 'Admin Portal',
          type: 'admin',
          status: 'active',
          users: 45,
          maxUsers: 100,
          uptime: 99.9,
          responseTime: 150,
          errorRate: 0.05,
          lastActive: '2024-01-15T10:20:00Z',
          healthScore: 99
        }
      ];
      setPortals(mockPortals);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load portal overview data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading Portal Overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portal Overview</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of all portal performance and health metrics
          </p>
        </div>
        <Button onClick={loadPortalOverview}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh Data
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portals</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portals.length}</div>
            <p className="text-xs text-muted-foreground">
              All portals operational
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {portals.reduce((sum, portal) => sum + portal.users, 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Across all portals
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Uptime</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(portals.reduce((sum, portal) => sum + portal.uptime, 0) / portals.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              System reliability
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Score</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(portals.reduce((sum, portal) => sum + portal.healthScore, 0) / portals.length).toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Overall system health
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Portal Details */}
      <div className="grid gap-6 md:grid-cols-2">
        {portals.map((portal) => (
          <Card key={portal.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl">{portal.name}</CardTitle>
                  <CardDescription className="capitalize">{portal.type} Portal</CardDescription>
                </div>
                <Badge className={`${getStatusColor(portal.status)} text-white`}>
                  {portal.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Health Score */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Health Score</span>
                <span className={`text-lg font-bold ${getHealthScoreColor(portal.healthScore)}`}>
                  {portal.healthScore}%
                </span>
              </div>
              <Progress value={portal.healthScore} className="h-2" />

              {/* User Capacity */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">User Capacity</span>
                <span className="text-sm text-muted-foreground">
                  {portal.users.toLocaleString()} / {portal.maxUsers.toLocaleString()}
                </span>
              </div>
              <Progress value={(portal.users / portal.maxUsers) * 100} className="h-2" />

              {/* Performance Metrics */}
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{portal.uptime}%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-600">{portal.responseTime}ms</div>
                  <div className="text-xs text-muted-foreground">Response</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-orange-600">{portal.errorRate}%</div>
                  <div className="text-xs text-muted-foreground">Error Rate</div>
                </div>
              </div>

              {/* Last Activity */}
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">Last Active</span>
                <span className="text-sm font-medium">
                  {new Date(portal.lastActive).toLocaleTimeString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PortalOverviewPage;
