/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface InvitePersonnelDialogProps {
  onInviteSent?: () => void;
}

const InvitePersonnelDialog: React.FC<InvitePersonnelDialogProps> = ({ onInviteSent }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Driver form state
  const [driverForm, setDriverForm] = useState({
    email: '',
    driver_name: '',
    phone: '',
    license_number: '',
    vehicle_type: '',
    notes: ''
  });

  // Owner-Operator form state
  const [ownerOperatorForm, setOwnerOperatorForm] = useState({
    email: '',
    company_name: '',
    contact_name: '',
    phone: '',
    mc_number: '',
    dot_number: '',
    equipment_type: '',
    notes: ''
  });

  const sendDriverInvitation = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('carrier_id')
        .eq('user_id', user.id)
        .single();

      if (!profile?.carrier_id) throw new Error('Carrier profile not found');

      const { error } = await supabase
        .from('driver_invitations')
        .insert({
          carrier_id: profile.carrier_id,
          email: driverForm.email,
          driver_name: driverForm.driver_name,
          invitation_token: crypto.randomUUID(),
          invited_by: user.id
        });

      if (error) throw error;

      toast({
        title: "Invitation Sent",
        description: `Driver invitation sent to ${driverForm.email}`,
      });

      setDriverForm({
        email: '',
        driver_name: '',
        phone: '',
        license_number: '',
        vehicle_type: '',
        notes: ''
      });
      
      setOpen(false);
      onInviteSent?.();
    } catch (error) {
      console.error('Error sending driver invitation:', error);
      toast({
        title: "Error",
        description: "Failed to send driver invitation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const sendOwnerOperatorInvitation = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: profile } = await supabase
        .from('profiles')
        .select('carrier_id')
        .eq('user_id', user.id)
        .single();

      if (!profile?.carrier_id) throw new Error('Carrier profile not found');

      const { error } = await supabase
        .from('owner_operator_invitations')
        .insert({
          carrier_id: profile.carrier_id,
          email: ownerOperatorForm.email,
          company_name: ownerOperatorForm.company_name,
          mc_number: ownerOperatorForm.mc_number,
          dot_number: ownerOperatorForm.dot_number,
          invitation_token: crypto.randomUUID(),
          invited_by: user.id
        });

      if (error) throw error;

      toast({
        title: "Invitation Sent",
        description: `Owner-operator invitation sent to ${ownerOperatorForm.email}`,
      });

      setOwnerOperatorForm({
        email: '',
        company_name: '',
        contact_name: '',
        phone: '',
        mc_number: '',
        dot_number: '',
        equipment_type: '',
        notes: ''
      });
      
      setOpen(false);
      onInviteSent?.();
    } catch (error) {
      console.error('Error sending owner-operator invitation:', error);
      toast({
        title: "Error",
        description: "Failed to send owner-operator invitation",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus className="h-4 w-4 mr-2" />
          Invite Personnel
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Invite Driver or Owner-Operator</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="driver" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="driver">Invite Driver</TabsTrigger>
            <TabsTrigger value="owner-operator">Invite Owner-Operator</TabsTrigger>
          </TabsList>

          <TabsContent value="driver" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="driver-email">Email Address *</Label>
                <Input
                  id="driver-email"
                  type="email"
                  placeholder="driver@example.com"
                  value={driverForm.email}
                  onChange={(e) => setDriverForm(prev => ({...prev, email: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="driver-name">Full Name</Label>
                <Input
                  id="driver-name"
                  placeholder="John Doe"
                  value={driverForm.driver_name}
                  onChange={(e) => setDriverForm(prev => ({...prev, driver_name: e.target.value}))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="driver-phone">Phone Number</Label>
                <Input
                  id="driver-phone"
                  placeholder="+1 (555) 123-4567"
                  value={driverForm.phone}
                  onChange={(e) => setDriverForm(prev => ({...prev, phone: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="license-number">License Number</Label>
                <Input
                  id="license-number"
                  placeholder="CDL License Number"
                  value={driverForm.license_number}
                  onChange={(e) => setDriverForm(prev => ({...prev, license_number: e.target.value}))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="vehicle-type">Preferred Vehicle Type</Label>
              <Select 
                value={driverForm.vehicle_type} 
                onValueChange={(value) => setDriverForm(prev => ({...prev, vehicle_type: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select vehicle type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dry-van">Dry Van</SelectItem>
                  <SelectItem value="reefer">Refrigerated</SelectItem>
                  <SelectItem value="flatbed">Flatbed</SelectItem>
                  <SelectItem value="tanker">Tanker</SelectItem>
                  <SelectItem value="box-truck">Box Truck</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="driver-notes">Additional Notes</Label>
              <Textarea
                id="driver-notes"
                placeholder="Any additional information or requirements..."
                value={driverForm.notes}
                onChange={(e) => setDriverForm(prev => ({...prev, notes: e.target.value}))}
              />
            </div>

            <Button 
              onClick={sendDriverInvitation} 
              disabled={!driverForm.email || loading}
              className="w-full"
            >
              <Send className="h-4 w-4 mr-2" />
              {loading ? 'Sending...' : 'Send Driver Invitation'}
            </Button>
          </TabsContent>

          <TabsContent value="owner-operator" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="owner-email">Email Address *</Label>
                <Input
                  id="owner-email"
                  type="email"
                  placeholder="owner@company.com"
                  value={ownerOperatorForm.email}
                  onChange={(e) => setOwnerOperatorForm(prev => ({...prev, email: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input
                  id="company-name"
                  placeholder="ABC Trucking LLC"
                  value={ownerOperatorForm.company_name}
                  onChange={(e) => setOwnerOperatorForm(prev => ({...prev, company_name: e.target.value}))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contact-name">Contact Name</Label>
                <Input
                  id="contact-name"
                  placeholder="Primary contact person"
                  value={ownerOperatorForm.contact_name}
                  onChange={(e) => setOwnerOperatorForm(prev => ({...prev, contact_name: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-phone">Phone Number</Label>
                <Input
                  id="owner-phone"
                  placeholder="+1 (555) 123-4567"
                  value={ownerOperatorForm.phone}
                  onChange={(e) => setOwnerOperatorForm(prev => ({...prev, phone: e.target.value}))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="mc-number">MC Number</Label>
                <Input
                  id="mc-number"
                  placeholder="MC-123456"
                  value={ownerOperatorForm.mc_number}
                  onChange={(e) => setOwnerOperatorForm(prev => ({...prev, mc_number: e.target.value}))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dot-number">DOT Number</Label>
                <Input
                  id="dot-number"
                  placeholder="DOT-1234567"
                  value={ownerOperatorForm.dot_number}
                  onChange={(e) => setOwnerOperatorForm(prev => ({...prev, dot_number: e.target.value}))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="equipment-type">Equipment Type</Label>
              <Select 
                value={ownerOperatorForm.equipment_type} 
                onValueChange={(value) => setOwnerOperatorForm(prev => ({...prev, equipment_type: value}))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select equipment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dry-van">Dry Van</SelectItem>
                  <SelectItem value="reefer">Refrigerated</SelectItem>
                  <SelectItem value="flatbed">Flatbed</SelectItem>
                  <SelectItem value="tanker">Tanker</SelectItem>
                  <SelectItem value="specialized">Specialized</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="owner-notes">Additional Notes</Label>
              <Textarea
                id="owner-notes"
                placeholder="Contract terms, special requirements, etc..."
                value={ownerOperatorForm.notes}
                onChange={(e) => setOwnerOperatorForm(prev => ({...prev, notes: e.target.value}))}
              />
            </div>

            <Button 
              onClick={sendOwnerOperatorInvitation} 
              disabled={!ownerOperatorForm.email || loading}
              className="w-full"
            >
              <Send className="h-4 w-4 mr-2" />
              {loading ? 'Sending...' : 'Send Owner-Operator Invitation'}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default InvitePersonnelDialog;