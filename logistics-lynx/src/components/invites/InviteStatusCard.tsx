import { useState } from 'react';
import ResponsiveCard from '@/components/ui/ResponsiveCard';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { resendInvitation, cancelInvitation } from '@/api/invites';
import { Mail, Clock, CheckCircle, AlertCircle, RefreshCw, Trash2, User, Calendar, Loader2 } from 'lucide-react';

interface Invitation {
  id: string;
  email: string;
  role: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  created_at: string;
  accepted_at?: string;
  expires_at: string;
  invited_by?: {
    email: string;
    name?: string;
  };
}

interface InviteStatusCardProps {
  invitation: Invitation;
  onStatusChange?: (invitation: Invitation) => void;
}

const getStatusConfig = (status: string) => {
  switch (status) {
    case 'pending':
      return {
        icon: Clock,
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
        label: 'Pending'
      };
    case 'accepted':
      return {
        icon: CheckCircle,
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
        label: 'Accepted'
      };
    case 'expired':
      return {
        icon: AlertCircle,
        color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
        label: 'Expired'
      };
    case 'cancelled':
      return {
        icon: XCircle,
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
        label: 'Cancelled'
      };
    default:
      return {
        icon: Clock,
        color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
        label: 'Unknown'
      };
  }
};

const getRoleConfig = (role: string) => {
  const roleConfigs: Record<string, { label: string; color: string }> = {
    super_admin: { label: 'Super Admin', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
    admin: { label: 'Admin', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
    owner: { label: 'Owner', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
    manager: { label: 'Manager', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
    user: { label: 'User', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    viewer: { label: 'Viewer', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' }
  };
  
  return roleConfigs[role] || { label: role, color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' };
};

export const InviteStatusCard: React.FC<InviteStatusCardProps> = ({
  invitation,
  onStatusChange
}) => {
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  
  const { toast } = useToast();
  
  const statusConfig = getStatusConfig(invitation.status);
  const roleConfig = getRoleConfig(invitation.role);
  const StatusIcon = statusConfig.icon;
  
  const isExpired = new Date(invitation.expires_at) < new Date();
  const isPending = invitation.status === 'pending';
  const canResend = isPending && !isExpired;
  const canCancel = isPending;
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const handleResend = async () => {
    setIsResending(true);
    
    try {
      await resendInvitation(invitation.id);
      
      toast({
        title: "Invitation Resent",
        description: `Invitation sent again to ${invitation.email}`,
      });
      
      // Update the invitation with new expiry
      if (onStatusChange) {
        onStatusChange({
          ...invitation,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        });
      }
      
    } catch (error: any) {
      console.error('Resend error:', error);
      
      toast({
        title: "Resend Failed",
        description: error.message || "Failed to resend invitation.",
        variant: "destructive"
      });
    } finally {
      setIsResending(false);
    }
  };
  
  const handleCancel = async () => {
    setIsCancelling(true);
    
    try {
      await cancelInvitation(invitation.id);
      
      toast({
        title: "Invitation Cancelled",
        description: `Invitation to ${invitation.email} has been cancelled.`,
      });
      
      // Update the invitation status
      if (onStatusChange) {
        onStatusChange({
          ...invitation,
          status: 'cancelled'
        });
      }
      
      setShowCancelDialog(false);
      
    } catch (error: any) {
      console.error('Cancel error:', error);
      
      toast({
        title: "Cancel Failed",
        description: error.message || "Failed to cancel invitation.",
        variant: "destructive"
      });
    } finally {
      setIsCancelling(false);
    }
  };
  
  return (
    <>
      <ResponsiveCard className="hover:shadow-md transition-shadow">
        <div className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-muted">
                <Mail className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-lg">{invitation.email}</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Invited by {invitation.invited_by?.name || invitation.invited_by?.email || 'Unknown'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                <StatusIcon className="h-3 w-3 mr-1" />
                {statusConfig.label}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400">
                <User className="h-3 w-3 mr-1" />
                {roleConfig.label}
              </span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Created</div>
                <div className="text-muted-foreground">
                  {formatDate(invitation.created_at)}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <div>
                <div className="font-medium">Expires</div>
                <div className="text-muted-foreground">
                  {formatDate(invitation.expires_at)}
                </div>
              </div>
            </div>
          </div>
          
          {invitation.accepted_at && (
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <div>
                <div className="font-medium">Accepted</div>
                <div className="text-muted-foreground">
                  {formatDate(invitation.accepted_at)}
                </div>
              </div>
            </div>
          )}
          
          {isExpired && isPending && (
            <div className="rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/20 p-3">
              <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                <AlertCircle className="h-4 w-4" />
                <span className="text-sm font-medium">This invitation has expired</span>
              </div>
            </div>
          )}
          
          <div className="flex items-center gap-2 pt-2">
            {canResend && (
              <EnhancedButton
                variant="outline"
                size="sm"
                onClick={handleResend}
                disabled={isResending}
              >
                {isResending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Resending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Resend
                  </>
                )}
            )}
            
            {canCancel && (
                variant="outline"
                size="sm"
                onClick={() => setShowCancelDialog(true)}
                disabled={isCancelling}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Cancel
            )}
          </div>
        </div>
      </ResponsiveCard>
      
      {/* Cancel Confirmation Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Invitation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel the invitation to {invitation.email}? 
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
              variant="outline"
              onClick={() => setShowCancelDialog(false)}
              disabled={isCancelling}
            >
              Keep Invitation
              variant="destructive"
              onClick={handleCancel}
              disabled={isCancelling}
            >
              {isCancelling ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Cancelling...
                </>
              ) : (
                'Cancel Invitation'
              )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
