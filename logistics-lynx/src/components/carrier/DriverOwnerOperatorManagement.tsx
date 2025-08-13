import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  UserPlus, 
  Truck, 
  Activity, 
  ExternalLink, 
  Mail, 
  Phone,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Eye
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Driver {
  user_id: string;
  name: string;
  email: string;
  driver_license_number?: string;
  vehicle_assigned?: string;
  driver_status: string;
  last_login?: string;
  created_at: string;
  phone?: string;
  hire_date?: string;
}

interface OwnerOperator {
  user_id: string;
  name: string;
  email: string;
  company_name?: string;
  mc_number?: string;
  dot_number?: string;
  last_login?: string;
  created_at: string;
}

interface Invitation {
  id: string;
  email: string;
  driver_name?: string;
  company_name?: string;
  status: string;
  created_at: string;
  expires_at: string;
}

const DriverOwnerOperatorManagement = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [ownerOperators, setOwnerOperators] = useState<OwnerOperator[]>([]);
  const [driverInvitations, setDriverInvitations] = useState<Invitation[]>([]);
  const [ownerOperatorInvitations, setOwnerOperatorInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [carrierProfile, setCarrierProfile] = useState<unknown>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchCarrierProfile();
    fetchDrivers();
    fetchOwnerOperators();
    fetchInvitations();
  }, []);

  const fetchCarrierProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('*, companies(*)')
        .eq('user_id', user.id)
        .single();
      setCarrierProfile(profile);
    }
  };

  const fetchDrivers = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('carrier_id')
        .eq('user_id', user.id)
        .single();

      if (profile?.carrier_id) {
        const { data } = await supabase.rpc('get_carrier_drivers', {
          p_carrier_id: profile.carrier_id
        });
        setDrivers(data || []);
      }
    }
  };

  const fetchOwnerOperators = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('carrier_id')
        .eq('user_id', user.id)
        .single();

      if (profile?.carrier_id) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('carrier_id', profile.carrier_id)
          .eq('role', 'owner_operator');
        setOwnerOperators(data || []);
      }
    }
  };

  const fetchInvitations = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('carrier_id')
        .eq('user_id', user.id)
        .single();

      if (profile?.carrier_id) {
        // Fetch driver invitations
        const { data: driverInvs } = await supabase
          .from('driver_invitations')
          .select('*')
          .eq('carrier_id', profile.carrier_id)
          .order('created_at', { ascending: false });

        // Fetch owner-operator invitations
        const { data: ownerOpInvs } = await supabase
          .from('owner_operator_invitations')
          .select('*')
          .eq('carrier_id', profile.carrier_id)
          .order('created_at', { ascending: false });

        setDriverInvitations(driverInvs || []);
        setOwnerOperatorInvitations(ownerOpInvs || []);
      }
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      inactive: "secondary",
      suspended: "destructive",
      pending: "outline"
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  const openPortal = (userType: 'driver' | 'owner-operator', userId?: string) => {
    const baseUrl = window.location.origin;
    const portalUrl = userType === 'driver' ? `${baseUrl}/driver` : `${baseUrl}/owner-operator`;
    window.open(portalUrl, '_blank');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Driver & Owner-Operator Management</h1>
          <p className="text-muted-foreground">
            Manage your drivers and owner-operators, track their performance, and access their portals
          </p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drivers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {drivers.filter(d => d.driver_status === 'active').length}
            </div>
            <p className="text-xs text-muted-foreground">
              {drivers.length} total drivers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Owner-Operators</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ownerOperators.length}</div>
            <p className="text-xs text-muted-foreground">Independent contractors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Invitations</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {driverInvitations.filter(i => i.status === 'pending').length + 
               ownerOperatorInvitations.filter(i => i.status === 'pending').length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Personnel</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{drivers.length + ownerOperators.length}</div>
            <p className="text-xs text-muted-foreground">Drivers + Owner-Operators</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="drivers" className="space-y-6">
        <TabsList>
          <TabsTrigger value="drivers">Drivers</TabsTrigger>
          <TabsTrigger value="owner-operators">Owner-Operators</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
        </TabsList>

        <TabsContent value="drivers">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Drivers</CardTitle>
                <CardDescription>Manage your company drivers and their portal access</CardDescription>
              </div>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Driver
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drivers.map((driver) => (
                  <div key={driver.user_id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {driver.name}
                          </p>
                          {getStatusBadge(driver.driver_status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {driver.email}
                          </span>
                          {driver.vehicle_assigned && (
                            <span className="flex items-center">
                              <Truck className="h-3 w-3 mr-1" />
                              {driver.vehicle_assigned}
                            </span>
                          )}
                          {driver.last_login && (
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Last login: {new Date(driver.last_login).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPortal('driver', driver.user_id)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Open Portal
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}

                {drivers.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No drivers found. Start by inviting your first driver.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="owner-operators">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Owner-Operators</CardTitle>
                <CardDescription>Manage independent contractors and their portal access</CardDescription>
              </div>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                Invite Owner-Operator
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ownerOperators.map((ownerOperator) => (
                  <div key={ownerOperator.user_id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-gray-900 truncate">
                            {ownerOperator.name}
                          </p>
                          <Badge variant="default">Owner-Operator</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="flex items-center">
                            <Mail className="h-3 w-3 mr-1" />
                            {ownerOperator.email}
                          </span>
                          {ownerOperator.company_name && (
                            <span className="flex items-center">
                              <Truck className="h-3 w-3 mr-1" />
                              {ownerOperator.company_name}
                            </span>
                          )}
                          {ownerOperator.last_login && (
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              Last login: {new Date(ownerOperator.last_login).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPortal('owner-operator', ownerOperator.user_id)}
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Open Portal
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}

                {ownerOperators.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    No owner-operators found. Start by inviting your first owner-operator.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitations">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Driver Invitations</CardTitle>
                <CardDescription>Pending and completed driver invitation status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {driverInvitations.map((invitation) => (
                    <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium">
                            {invitation.driver_name || invitation.email}
                          </p>
                          {getStatusBadge(invitation.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Sent: {new Date(invitation.created_at).toLocaleDateString()}</span>
                          <span>Expires: {new Date(invitation.expires_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {invitation.status === 'pending' && (
                          <Button variant="outline" size="sm">
                            Resend
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {driverInvitations.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      No driver invitations sent yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Owner-Operator Invitations</CardTitle>
                <CardDescription>Pending and completed owner-operator invitation status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {ownerOperatorInvitations.map((invitation) => (
                    <div key={invitation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium">
                            {invitation.company_name || invitation.email}
                          </p>
                          {getStatusBadge(invitation.status)}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Sent: {new Date(invitation.created_at).toLocaleDateString()}</span>
                          <span>Expires: {new Date(invitation.expires_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {invitation.status === 'pending' && (
                          <Button variant="outline" size="sm">
                            Resend
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {ownerOperatorInvitations.length === 0 && (
                    <div className="text-center py-4 text-muted-foreground">
                      No owner-operator invitations sent yet.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DriverOwnerOperatorManagement;