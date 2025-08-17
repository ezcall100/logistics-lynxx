import React, { ReactNode, useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Lock, Shield, AlertTriangle, RequestAccess } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner';

interface PermissionGateProps {
  permission: string;
  fallback?: ReactNode;
  children: ReactNode;
  showRequestAccess?: boolean;
  resource?: string;
  action?: string;
}

interface RequestAccessDialogProps {
  permission: string;
  resource?: string;
  action?: string;
  onRequest: (reason: string) => void;
}

const RequestAccessDialog: React.FC<RequestAccessDialogProps> = ({ permission, resource, action, onRequest }) => {
  const [reason, setReason] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (!reason.trim()) {
      toast.error('Please provide a reason for access request');
      return;
    }
    onRequest(reason);
    setIsOpen(false);
    setReason('');
  };

  const getPermissionDisplayName = (permissionKey: string) => {
    const permissionNames: Record<string, string> = {
      'load.create': 'Create Loads',
      'load.update': 'Update Loads',
      'load.delete': 'Delete Loads',
      'load.export': 'Export Load Data',
      'rate.create': 'Create Rates',
      'rate.update': 'Update Rates',
      'rate.bulk': 'Bulk Rate Operations',
      'invoice.create': 'Create Invoices',
      'invoice.export': 'Export Invoice Data',
      'payment.approve': 'Approve Payments',
      'user.manage_roles': 'Manage User Roles',
      'api_key.create': 'Create API Keys',
      'analytics.export': 'Export Analytics',
      'system.config': 'System Configuration'
    };
    return permissionNames[permissionKey] || permissionKey.replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <RequestAccess className="mr-2 h-4 w-4" />
          Request Access
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Access</DialogTitle>
          <DialogDescription>
            Request temporary access to {getPermissionDisplayName(permission)}
            {resource && action && ` for ${action} ${resource}`}.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="reason">Reason for Access</Label>
            <Textarea
              id="reason"
              placeholder="Please explain why you need access to this feature..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Submit Request
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const PermissionDeniedCard: React.FC<{ permission: string; resource?: string; action?: string; showRequestAccess?: boolean; onRequestAccess?: (reason: string) => void }> = ({ 
  permission, 
  resource, 
  action, 
  showRequestAccess = false,
  onRequestAccess 
}) => {
  const getPermissionDisplayName = (permissionKey: string) => {
    const permissionNames: Record<string, string> = {
      'load.create': 'Create Loads',
      'load.update': 'Update Loads',
      'load.delete': 'Delete Loads',
      'load.export': 'Export Load Data',
      'rate.create': 'Create Rates',
      'rate.update': 'Update Rates',
      'rate.bulk': 'Bulk Rate Operations',
      'invoice.create': 'Create Invoices',
      'invoice.export': 'Export Invoice Data',
      'payment.approve': 'Approve Payments',
      'user.manage_roles': 'Manage User Roles',
      'api_key.create': 'Create API Keys',
      'analytics.export': 'Export Analytics',
      'system.config': 'System Configuration'
    };
    return permissionNames[permissionKey] || permissionKey.replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <Card className="border-dashed border-2 border-orange-300 bg-orange-50">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
          <Shield className="h-6 w-6 text-orange-600" />
        </div>
        <CardTitle className="text-lg font-semibold text-orange-900">
          Permission Required
        </CardTitle>
        <CardDescription className="text-orange-700">
          You need permission to {getPermissionDisplayName(permission)}
          {resource && action && ` for ${action} ${resource}`}.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="mb-4">
          <Badge variant="outline" className="mb-2 border-orange-300 text-orange-700">
            <Lock className="mr-1 h-3 w-3" />
            Restricted Access
          </Badge>
        </div>
        {showRequestAccess && onRequestAccess && (
          <RequestAccessDialog 
            permission={permission} 
            resource={resource} 
            action={action}
            onRequest={onRequestAccess}
          />
        )}
        <p className="mt-2 text-xs text-orange-600">
          Contact your administrator to request access
        </p>
      </CardContent>
    </Card>
  );
};

export const PermissionGate: React.FC<PermissionGateProps> = ({
  permission,
  fallback,
  children,
  showRequestAccess = false,
  resource,
  action
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const [orgId, setOrgId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const checkPermission = async () => {
      try {
        // Get current user and org
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setHasPermission(false);
          setLoading(false);
          return;
        }

        setUserId(user.id);

        // Get user's org membership
        const { data: membership } = await supabase
          .from('org_memberships')
          .select('org_id')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();

        if (!membership?.org_id) {
          setHasPermission(false);
          setLoading(false);
          return;
        }

        setOrgId(membership.org_id);

        // Check permission
        const { data: hasPermission } = await supabase.rpc('has_permission', {
          p_org_id: membership.org_id,
          p_user_id: user.id,
          p_permission: permission
        });

        setHasPermission(hasPermission || false);
      } catch (error) {
        console.error('Error checking permission:', error);
        setHasPermission(false);
      } finally {
        setLoading(false);
      }
    };

    checkPermission();
  }, [permission, supabase]);

  const handleRequestAccess = async (reason: string) => {
    if (!orgId || !userId) {
      toast.error('Unable to request access - missing user or organization information');
      return;
    }

    try {
      // Create access request
      const { data, error } = await supabase
        .from('access_requests')
        .insert({
          org_id: orgId,
          user_id: userId,
          requested_permissions: [permission],
          reason,
          expires_at: new Date(Date.now() + 2 * 60 * 60 * 1000) // 2 hours
        })
        .select('id')
        .single();

      if (error) {
        console.error('Failed to create access request:', error);
        toast.error('Failed to submit access request');
        return;
      }

      toast.success('Access request submitted successfully. An administrator will review your request.');
    } catch (error) {
      console.error('Error requesting access:', error);
      toast.error('Failed to submit access request');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!hasPermission) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <PermissionDeniedCard 
        permission={permission}
        resource={resource}
        action={action}
        showRequestAccess={showRequestAccess}
        onRequestAccess={handleRequestAccess}
      />
    );
  }

  return <>{children}</>;
};

// Convenience components for common permissions
export const CreateLoadGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <PermissionGate permission="load.create" resource="load" action="create" fallback={fallback}>
    {children}
  </PermissionGate>
);

export const UpdateLoadGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <PermissionGate permission="load.update" resource="load" action="update" fallback={fallback}>
    {children}
  </PermissionGate>
);

export const DeleteLoadGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <PermissionGate permission="load.delete" resource="load" action="delete" fallback={fallback}>
    {children}
  </PermissionGate>
);

export const ExportLoadGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <PermissionGate permission="load.export" resource="load" action="export" fallback={fallback}>
    {children}
  </PermissionGate>
);

export const CreateRateGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <PermissionGate permission="rate.create" resource="rate" action="create" fallback={fallback}>
    {children}
  </PermissionGate>
);

export const UpdateRateGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <PermissionGate permission="rate.update" resource="rate" action="update" fallback={fallback}>
    {children}
  </PermissionGate>
);

export const CreateInvoiceGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <PermissionGate permission="invoice.create" resource="invoice" action="create" fallback={fallback}>
    {children}
  </PermissionGate>
);

export const ApprovePaymentGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <PermissionGate permission="payment.approve" resource="payment" action="approve" fallback={fallback}>
    {children}
  </PermissionGate>
);

export const ManageUsersGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <PermissionGate permission="user.manage_roles" resource="user" action="manage" fallback={fallback}>
    {children}
  </PermissionGate>
);

export const CreateApiKeyGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <PermissionGate permission="api_key.create" resource="api_key" action="create" fallback={fallback}>
    {children}
  </PermissionGate>
);

export const ExportAnalyticsGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <PermissionGate permission="analytics.export" resource="analytics" action="export" fallback={fallback}>
    {children}
  </PermissionGate>
);

export const SystemConfigGate: React.FC<{ children: ReactNode; fallback?: ReactNode }> = ({ children, fallback }) => (
  <PermissionGate permission="system.config" resource="system" action="configure" fallback={fallback}>
    {children}
  </PermissionGate>
);
