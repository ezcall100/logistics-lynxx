import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, User, Truck, Eye, UserCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface Driver {
  user_id: string;
  name: string;
  email: string;
  driver_license_number?: string;
  vehicle_assigned?: string;
  driver_status: string;
  last_login?: string;
  created_at: string;
}

interface DriverInvitation {
  id: string;
  email: string;
  driver_name: string;
  status: string;
  created_at: string;
  expires_at: string;
}

const DriverManagement = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [invitations, setInvitations] = useState<DriverInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    driver_name: '',
    license_number: '',
    vehicle_assigned: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchDrivers();
    fetchInvitations();
  }, []);

  const fetchDrivers = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('company')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (profile?.company) {
        const { data, error } = await supabase.rpc('get_carrier_drivers', {
          p_carrier_id: profile.company
        });

        if (error) throw error;
        setDrivers(data || []);
      }
    } catch (error: unknown) {
      toast.error('Failed to fetch drivers: ' + error.message);
    }
  };

  const fetchInvitations = async () => {
    try {
      const { data, error } = await supabase
        .from('driver_invitations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvitations(data || []);
    } catch (error: unknown) {
      toast.error('Failed to fetch invitations: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInviteDriver = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('company')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (!profile?.company) {
        toast.error('Carrier company not found');
        return;
      }

      const invitationToken = crypto.randomUUID();
      
      const { error } = await supabase
        .from('driver_invitations')
        .insert({
          carrier_id: profile.company,
          invited_by: (await supabase.auth.getUser()).data.user?.id,
          email: inviteForm.email,
          driver_name: inviteForm.driver_name,
          invitation_token: invitationToken
        });

      if (error) throw error;

      toast.success('Driver invitation sent successfully!');
      setIsInviteOpen(false);
      setInviteForm({ email: '', driver_name: '', license_number: '', vehicle_assigned: '' });
      fetchInvitations();
    } catch (error: unknown) {
      toast.error('Failed to send invitation: ' + error.message);
    }
  };

  const handleViewDriverPortal = (driverId: string) => {
    // Navigate to driver portal with driver context
    navigate(`/driver-portal/${driverId}`);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      pending: 'bg-yellow-100 text-yellow-800'
    };
    return variants[status as keyof typeof variants] || variants.inactive;
  };

  if (loading) {
    return <div className="flex justify-center p-8">Loading drivers...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Driver Management</h2>
          <p className="text-muted-foreground">Manage your carrier's drivers and their portal access</p>
        </div>
        
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Invite Driver
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Driver</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="driver_name">Driver Name</Label>
                <Input
                  id="driver_name"
                  value={inviteForm.driver_name}
                  onChange={(e) => setInviteForm({...inviteForm, driver_name: e.target.value})}
                  placeholder="Enter driver's full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                  placeholder="driver@example.com"
                />
              </div>
              <div>
                <Label htmlFor="license_number">Driver License Number</Label>
                <Input
                  id="license_number"
                  value={inviteForm.license_number}
                  onChange={(e) => setInviteForm({...inviteForm, license_number: e.target.value})}
                  placeholder="Optional"
                />
              </div>
              <div>
                <Label htmlFor="vehicle_assigned">Vehicle Assignment</Label>
                <Input
                  id="vehicle_assigned"
                  value={inviteForm.vehicle_assigned}
                  onChange={(e) => setInviteForm({...inviteForm, vehicle_assigned: e.target.value})}
                  placeholder="Optional - Vehicle ID or description"
                />
              </div>
              <Button onClick={handleInviteDriver} className="w-full">
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Drivers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Active Drivers ({drivers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {drivers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No drivers assigned yet. Invite your first driver to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>License #</TableHead>
                  <TableHead>Vehicle</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {drivers.map((driver) => (
                  <TableRow key={driver.user_id}>
                    <TableCell className="font-medium">{driver.name}</TableCell>
                    <TableCell>{driver.email}</TableCell>
                    <TableCell>{driver.driver_license_number || 'N/A'}</TableCell>
                    <TableCell>{driver.vehicle_assigned || 'Unassigned'}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(driver.driver_status)}>
                        {driver.driver_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {driver.last_login 
                        ? new Date(driver.last_login).toLocaleDateString()
                        : 'Never'
                      }
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDriverPortal(driver.user_id)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Portal
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pending Invitations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserCheck className="w-5 h-5" />
            Pending Invitations ({invitations.filter(inv => inv.status === 'pending').length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {invitations.filter(inv => inv.status === 'pending').length === 0 ? (
            <div className="text-center py-4 text-muted-foreground">
              No pending invitations
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Driver Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Sent Date</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitations.filter(inv => inv.status === 'pending').map((invitation) => (
                  <TableRow key={invitation.id}>
                    <TableCell className="font-medium">{invitation.driver_name}</TableCell>
                    <TableCell>{invitation.email}</TableCell>
                    <TableCell>{new Date(invitation.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(invitation.expires_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(invitation.status)}>
                        {invitation.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DriverManagement;