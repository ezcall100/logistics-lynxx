import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { createInvitation } from '@/api/invites';
import { Loader2, Mail, Shield, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface InviteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInviteSent?: (invitation: any) => void;
}

interface RoleOption {
  value: string;
  label: string;
  description: string;
  permissions: string[];
  canInvite: boolean;
}

const roleOptions: RoleOption[] = [
  {
    value: 'super_admin',
    label: 'Super Admin',
    description: 'Full system access and control',
    permissions: ['All permissions', 'System administration', 'User management'],
    canInvite: true
  },
  {
    value: 'admin',
    label: 'Admin',
    description: 'Company-wide administration',
    permissions: ['User management', 'Settings', 'Analytics'],
    canInvite: true
  },
  {
    value: 'owner',
    label: 'Owner',
    description: 'Company owner with full access',
    permissions: ['Financial access', 'User management', 'Settings'],
    canInvite: true
  },
  {
    value: 'manager',
    label: 'Manager',
    description: 'Team and project management',
    permissions: ['Team management', 'Project access', 'Reports'],
    canInvite: true
  },
  {
    value: 'user',
    label: 'User',
    description: 'Standard user access',
    permissions: ['Basic access', 'Project participation'],
    canInvite: false
  },
  {
    value: 'viewer',
    label: 'Viewer',
    description: 'Read-only access',
    permissions: ['View access only'],
    canInvite: false
  }
];

export const InviteUserDialog: React.FC<InviteUserDialogProps> = ({
  open,
  onOpenChange,
  onInviteSent
}) => {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<RoleOption[]>([]);
  const [selectedRoleDetails, setSelectedRoleDetails] = useState<RoleOption | null>(null);
  
  const { toast } = useToast();
  const { user, session } = useAuth();

  // Filter available roles based on user's permissions
  useEffect(() => {
    if (!user || !session) return;

    const userRole = user.role || 'user';
    const filteredRoles = roleOptions.filter(option => {
      // Super admins can invite anyone
      if (userRole === 'super_admin') return true;
      
      // Admins can invite up to manager level
      if (userRole === 'admin' && option.value !== 'super_admin') return true;
      
      // Owners can invite up to admin level
      if (userRole === 'owner' && !['super_admin'].includes(option.value)) return true;
      
      // Managers can invite users and viewers
      if (userRole === 'manager' && ['user', 'viewer'].includes(option.value)) return true;
      
      return false;
    });

    setAvailableRoles(filteredRoles);
  }, [user, session]);

  // Update selected role details when role changes
  useEffect(() => {
    const roleDetail = roleOptions.find(r => r.value === role);
    setSelectedRoleDetails(roleDetail || null);
  }, [role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !role) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (!user?.company_id) {
      toast({
        title: "Company Error",
        description: "Unable to determine your company. Please contact support.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);

    try {
      const invitation = await createInvitation({
        email: email.toLowerCase().trim(),
        role,
        company_id: user.company_id,
        message: message.trim() || undefined
      });

      toast({
        title: "Invitation Sent",
        description: `Invitation sent to ${email} with ${role} role.`,
      });

      // Reset form
      setEmail('');
      setRole('');
      setMessage('');
      
      // Call callback
      onInviteSent?.(invitation);
      
      // Close dialog
      onOpenChange(false);

    } catch (error: any) {
      console.error('Invitation error:', error);
      
      toast({
        title: "Invitation Failed",
        description: error.message || "Failed to send invitation. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEmail('');
    setRole('');
    setMessage('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5" />
            Invite User
          </DialogTitle>
          <DialogDescription>
            Send an invitation to join your team. The user will receive an email with setup instructions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="user@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role *</Label>
            <Select value={role} onValueChange={setRole} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                {availableRoles.map((roleOption, index) => (
                  <SelectItem key={roleOption.value} value={roleOption.value}>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      <div>
                        <div className="font-medium">{roleOption.label}</div>
                        <div className="text-xs text-muted-foreground">
                          {roleOption.description}
                        </div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedRoleDetails && (
            <div className="rounded-lg border p-3 bg-muted/50">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4" />
                <span className="font-medium">{selectedRoleDetails.label} Permissions</span>
              </div>
              <div className="space-y-1">
                {selectedRoleDetails.permissions.map((permission, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {permission}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Personal Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Add a personal message to the invitation email..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              disabled={isLoading}
            />
          </div>

          <div className="rounded-lg border p-3 bg-blue-50 dark:bg-blue-950/20">
            <div className="flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 dark:text-blue-100">
                  What happens next?
                </p>
                <ul className="mt-1 text-blue-700 dark:text-blue-200 space-y-1">
                  <li>• User receives an email invitation</li>
                  <li>• They can accept and set up their account</li>
                  <li>• Invitation expires in 7 days</li>
                  <li>• You can track invitation status</li>
                </ul>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button>
                type="button"
              </Button><Button>
                variant="outline"
              </Button>onClick={handleCancel}
              disabled={isLoading}
            >Cancel<Button>
                 
              </Button><>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Invitation
                </>
              )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default handleCancel;