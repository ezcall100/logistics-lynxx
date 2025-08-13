import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Truck, 
  Activity, 
  Clock, 
  ExternalLink,
  Eye,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface OverviewStats {
  totalDrivers: number;
  activeDrivers: number;
  totalOwnerOperators: number;
  pendingInvitations: number;
  recentLogins: number;
  performanceIssues: number;
}

interface RecentActivity {
  id: string;
  type: 'login' | 'invitation' | 'status_change';
  user_name: string;
  description: string;
  timestamp: string;
  portal_type: string;
}

const PersonnelOverview = () => {
  const [stats, setStats] = useState<OverviewStats>({
    totalDrivers: 0,
    activeDrivers: 0,
    totalOwnerOperators: 0,
    pendingInvitations: 0,
    recentLogins: 0,
    performanceIssues: 0
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOverviewData();
  }, []);

  const fetchOverviewData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('carrier_id')
        .eq('user_id', user.id)
        .single();

      if (!profile?.carrier_id) return;

      // Fetch driver stats
      const { data: drivers } = await supabase.rpc('get_carrier_drivers', {
        p_carrier_id: profile.carrier_id
      });

      // Fetch owner-operators
      const { data: ownerOperators } = await supabase
        .from('profiles')
        .select('*')
        .eq('carrier_id', profile.carrier_id)
        .eq('role', 'owner_operator');

      // Fetch pending invitations
      const { data: driverInvitations } = await supabase
        .from('driver_invitations')
        .select('*')
        .eq('carrier_id', profile.carrier_id)
        .eq('status', 'pending');

      const { data: ownerOpInvitations } = await supabase
        .from('owner_operator_invitations')
        .select('*')
        .eq('carrier_id', profile.carrier_id)
        .eq('status', 'pending');

      // Fetch recent portal access logs
      const { data: accessLogs } = await supabase
        .from('portal_access_logs')
        .select('*')
        .eq('carrier_id', profile.carrier_id)
        .gte('accessed_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order('accessed_at', { ascending: false })
        .limit(10);

      setStats({
        totalDrivers: drivers?.length || 0,
        activeDrivers: drivers?.filter(d => d.driver_status === 'active').length || 0,
        totalOwnerOperators: ownerOperators?.length || 0,
        pendingInvitations: (driverInvitations?.length || 0) + (ownerOpInvitations?.length || 0),
        recentLogins: accessLogs?.filter(log => 
          new Date(log.accessed_at) > new Date(Date.now() - 24 * 60 * 60 * 1000)
        ).length || 0,
        performanceIssues: drivers?.filter(d => d.driver_status === 'suspended').length || 0
      });

      // Format recent activity from access logs if available
      const formattedActivity: RecentActivity[] = [];
      if (accessLogs) {
        const activities = accessLogs.map(log => ({
          id: log.id,
          type: 'login' as const,
          user_name: 'Portal User', // We'll enhance this later with proper joins
          description: `Accessed ${log.portal_type} portal`,
          timestamp: log.accessed_at,
          portal_type: log.portal_type
        }));
        formattedActivity.push(...activities);
      }

      setRecentActivity(formattedActivity);
    } catch (error) {
      console.error('Error fetching overview data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openPortal = (portalType: string) => {
    const baseUrl = window.location.origin;
    let portalUrl = '';
    
    switch (portalType) {
      case 'driver':
        portalUrl = `${baseUrl}/driver`;
        break;
      case 'owner_operator':
        portalUrl = `${baseUrl}/owner-operator`;
        break;
      default:
        return;
    }
    
    window.open(portalUrl, '_blank');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading overview...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Personnel</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalDrivers + stats.totalOwnerOperators}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.totalDrivers} drivers, {stats.totalOwnerOperators} owner-operators
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Status</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {stats.activeDrivers}
            </div>
            <p className="text-xs text-muted-foreground">
              Active drivers ready for dispatch
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {stats.pendingInvitations}
            </div>
            <p className="text-xs text-muted-foreground">
              Invitations awaiting response
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Portal Access Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Truck className="h-5 w-5" />
              <span>Driver Portal Access</span>
            </CardTitle>
            <CardDescription>Quick access to driver portal and statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Total Drivers</p>
                <p className="text-2xl font-bold">{stats.totalDrivers}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Recent Logins (24h)</p>
                <p className="text-lg font-semibold">{stats.recentLogins}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => openPortal('driver')}
                className="flex-1"
                variant="outline"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Driver Portal
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>Owner-Operator Portal Access</span>
            </CardTitle>
            <CardDescription>Quick access to owner-operator portal and statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Total Owner-Operators</p>
                <p className="text-2xl font-bold">{stats.totalOwnerOperators}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Performance Issues</p>
                <p className="text-lg font-semibold text-red-600">{stats.performanceIssues}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => openPortal('owner_operator')}
                className="flex-1"
                variant="outline"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Owner-Operator Portal
              </Button>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Portal Activity</CardTitle>
          <CardDescription>Latest portal access and user activity from your personnel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    {activity.portal_type === 'driver' ? (
                      <Truck className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Users className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.user_name}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className="text-xs">
                    {activity.portal_type}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
            
            {recentActivity.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No recent portal activity
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PersonnelOverview;