/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Truck, Eye, UserCheck } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface OwnerOperator {
  user_id: string;
  name: string;
  email: string;
  driver_license_number?: string;
  vehicle_assigned?: string;
  driver_status: string;
  last_login?: string;
  created_at: string;
}

interface OwnerOperatorInvitation {
  id: string;
  email: string;
  driver_name: string;
  status: string;
  created_at: string;
  expires_at: string;
}

const OwnerOperatorManagement = () => {
  const [ownerOperators, setOwnerOperators] = useState<OwnerOperator[]>([]);
  const [invitations, setInvitations] = useState<OwnerOperatorInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: '',
    operator_name: '',
    license_number: '',
    vehicle_info: '',
    mc_number: '',
    dot_number: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchOwnerOperators();
    fetchInvitations();
  }, []);

  const fetchOwnerOperators = async () => {
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('company')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      if (profile?.company) {
        // Get owner operators (drivers with their own vehicles/authority)
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('carrier_id', profile.company)
          .eq('role', 'owner_operator')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setOwnerOperators(data || []);
      }
    } catch (error: unknown) {
      toast.error('Failed to fetch owner operators: ' + (error as Error)?.message || 'Unknown error');
    }
  };

  const fetchInvitations = async () => {
    try {
      const { data, error } = await supabase
        .from('driver_invitations')
        .select('*')
        .ilike('driver_name', '%owner operator%')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvitations(data || []);
    } catch (error: unknown) {
      toast.error('Failed to fetch invitations: ' + (error as Error)?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const handleInviteOwnerOperator = async () => {
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
          driver_name: `Owner Operator - ${inviteForm.operator_name}`,
          invitation_token: invitationToken
        });

      if (error) throw error;

      toast.success('Owner operator invitation sent successfully!');
      setIsInviteOpen(false);
      setInviteForm({ 
        email: '', 
        operator_name: '', 
        license_number: '', 
        vehicle_info: '',
        mc_number: '',
        dot_number: ''
      });
      fetchInvitations();
    } catch (error: unknown) {
      toast.error('Failed to send invitation: ' + (error as Error)?.message || 'Unknown error');
    }
  };

  const handleViewOwnerOperatorPortal = (operatorId: string) => {
    // Navigate to owner operator portal with context
    navigate(`/owner-operator-portal/${operatorId}`);
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
    return <div className="flex justify-center p-8">Loading owner operators...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Owner Operator Management</h2>
          <p className="text-muted-foreground">Manage independent owner operators and their portal access</p>
        </div>
        
        <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Invite Owner Operator
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Invite Owner Operator</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="operator_name">Owner Operator Name</Label>
                <Input
                  id="operator_name"
                  value={inviteForm.operator_name}
                  onChange={(e) => setInviteForm({...inviteForm, operator_name: e.target.value})}
                  placeholder="Enter operator's full name"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={inviteForm.email}
                  onChange={(e) => setInviteForm({...inviteForm, email: e.target.value})}
                  placeholder="operator@example.com"
                />
              </div>
              <div>
                <Label htmlFor="license_number">CDL License Number</Label>
                <Input
                  id="license_number"
                  value={inviteForm.license_number}
                  onChange={(e) => setInviteForm({...inviteForm, license_number: e.target.value})}
                  placeholder="Optional"
                />
              </div>
              <div>
                <Label htmlFor="mc_number">MC Number</Label>
                <Input
                  id="mc_number"
                  value={inviteForm.mc_number}
                  onChange={(e) => setInviteForm({...inviteForm, mc_number: e.target.value})}
                  placeholder="Motor Carrier Authority Number"
                />
              </div>
              <div>
                <Label htmlFor="dot_number">DOT Number</Label>
                <Input
                  id="dot_number"
                  value={inviteForm.dot_number}
                  onChange={(e) => setInviteForm({...inviteForm, dot_number: e.target.value})}
                  placeholder="Department of Transportation Number"
                />
              </div>
              <div>
                <Label htmlFor="vehicle_info">Vehicle Information</Label>
                <Input
                  id="vehicle_info"
                  value={inviteForm.vehicle_info}
                  onChange={(e) => setInviteForm({...inviteForm, vehicle_info: e.target.value})}
                  placeholder="Truck make/model/year"
                />
              </div>
              <Button onClick={handleInviteOwnerOperator} className="w-full">
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Active Owner Operators */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Truck className="w-5 h-5" />
            Active Owner Operators ({ownerOperators.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {ownerOperators.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No owner operators contracted yet. Invite your first owner operator to get started.
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
                {ownerOperators.map((operator) => (
                  <TableRow key={operator.user_id}>
                    <TableCell className="font-medium">{operator.name}</TableCell>
                    <TableCell>{operator.email}</TableCell>
                    <TableCell>{operator.driver_license_number || 'N/A'}</TableCell>
                    <TableCell>{operator.vehicle_assigned || 'Own Vehicle'}</TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(operator.driver_status)}>
                        {operator.driver_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {operator.last_login 
                        ? new Date(operator.last_login).toLocaleDateString()
                        : 'Never'
                      }
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewOwnerOperatorPortal(operator.user_id)}
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
                  <TableHead>Operator Name</TableHead>
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

export default OwnerOperatorManagement;