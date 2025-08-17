import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Textarea } from '../../components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { 
  Users, 
  Shield, 
  Key, 
  Clock, 
  FileText, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Eye,
  UserPlus,
  Settings,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  full_name: string;
  role: string;
  status: string;
  created_at: string;
}

interface Role {
  key: string;
  description: string;
  is_system_role: boolean;
  user_count: number;
}

interface CustomRole {
  id: string;
  key: string;
  label: string;
  description: string;
  permissions: string[];
}

interface AccessRequest {
  id: string;
  user_id: string;
  user_email: string;
  requested_permissions: string[];
  reason: string;
  status: string;
  created_at: string;
  expires_at: string;
}

interface ApiKey {
  id: string;
  name: string;
  scopes: string[];
  is_active: boolean;
  created_at: string;
  last_used_at: string;
  expires_at: string;
}

interface AuditLog {
  id: string;
  user_email: string;
  permission: string;
  resource: string;
  action: string;
  result: string;
  reason: string;
  created_at: string;
}

export const AccessControlCenter: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [customRoles, setCustomRoles] = useState<CustomRole[]>([]);
  const [accessRequests, setAccessRequests] = useState<AccessRequest[]>([]);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [orgId, setOrgId] = useState<string | null>(null);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const initializeData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data: membership } = await supabase
          .from('org_memberships')
          .select('org_id')
          .eq('user_id', user.id)
          .eq('status', 'active')
          .single();

        if (membership?.org_id) {
          setOrgId(membership.org_id);
          await loadAllData(membership.org_id);
        }
      } catch (error) {
        console.error('Error initializing access control center:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [supabase]);

  const loadAllData = async (orgId: string) => {
    await Promise.all([
      loadUsers(orgId),
      loadRoles(),
      loadCustomRoles(orgId),
      loadAccessRequests(orgId),
      loadApiKeys(orgId),
      loadAuditLogs(orgId)
    ]);
  };

  const loadUsers = async (orgId: string) => {
    const { data, error } = await supabase
      .from('org_memberships')
      .select(`
        user_id,
        role,
        status,
        created_at,
        profiles!inner(email, full_name)
      `)
      .eq('org_id', orgId);

    if (!error && data) {
      setUsers(data.map(item => ({
        id: item.user_id,
        email: item.profiles.email,
        full_name: item.profiles.full_name,
        role: item.role,
        status: item.status,
        created_at: item.created_at
      })));
    }
  };

  const loadRoles = async () => {
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .order('key');

    if (!error && data) {
      // Get user count for each role
      const rolesWithCount = await Promise.all(
        data.map(async (role) => {
          const { count } = await supabase
            .from('org_memberships')
            .select('*', { count: 'exact', head: true })
            .eq('role', role.key)
            .eq('status', 'active');

          return {
            ...role,
            user_count: count || 0
          };
        })
      );
      setRoles(rolesWithCount);
    }
  };

  const loadCustomRoles = async (orgId: string) => {
    const { data, error } = await supabase
      .from('custom_roles')
      .select(`
        *,
        custom_role_permissions(permission_key)
      `)
      .eq('org_id', orgId);

    if (!error && data) {
      setCustomRoles(data.map(role => ({
        id: role.id,
        key: role.key,
        label: role.label,
        description: role.description,
        permissions: role.custom_role_permissions?.map((p: any) => p.permission_key) || []
      })));
    }
  };

  const loadAccessRequests = async (orgId: string) => {
    const { data, error } = await supabase
      .from('access_requests')
      .select(`
        *,
        profiles!inner(email)
      `)
      .eq('org_id', orgId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setAccessRequests(data.map(request => ({
        id: request.id,
        user_id: request.user_id,
        user_email: request.profiles.email,
        requested_permissions: request.requested_permissions,
        reason: request.reason,
        status: request.status,
        created_at: request.created_at,
        expires_at: request.expires_at
      })));
    }
  };

  const loadApiKeys = async (orgId: string) => {
    const { data, error } = await supabase
      .from('api_keys')
      .select('*')
      .eq('org_id', orgId)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setApiKeys(data);
    }
  };

  const loadAuditLogs = async (orgId: string) => {
    const { data, error } = await supabase
      .from('access_audit_logs')
      .select(`
        *,
        profiles!inner(email)
      `)
      .eq('org_id', orgId)
      .order('created_at', { ascending: false })
      .limit(100);

    if (!error && data) {
      setAuditLogs(data.map(log => ({
        id: log.id,
        user_email: log.profiles?.email || 'API Key',
        permission: log.permission,
        resource: log.resource,
        action: log.action,
        result: log.result,
        reason: log.reason,
        created_at: log.created_at
      })));
    }
  };

  const handleApproveAccessRequest = async (requestId: string) => {
    if (!orgId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const request = accessRequests.find(r => r.id === requestId);
      if (!request) return;

      // Approve the request
      const { error } = await supabase
        .from('access_requests')
        .update({
          status: 'approved',
          approved_by: user.id,
          approved_at: new Date().toISOString()
        })
        .eq('id', requestId);

      if (error) throw error;

      // Grant temporary permissions
      const tempPermissions = request.requested_permissions.map(permission => ({
        access_request_id: requestId,
        user_id: request.user_id,
        permission_key: permission,
        expires_at: request.expires_at
      }));

      const { error: insertError } = await supabase
        .from('temporary_permissions')
        .insert(tempPermissions);

      if (insertError) throw insertError;

      toast.success('Access request approved successfully');
      await loadAccessRequests(orgId);
    } catch (error) {
      console.error('Error approving access request:', error);
      toast.error('Failed to approve access request');
    }
  };

  const handleDenyAccessRequest = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('access_requests')
        .update({ status: 'denied' })
        .eq('id', requestId);

      if (error) throw error;

      toast.success('Access request denied');
      if (orgId) await loadAccessRequests(orgId);
    } catch (error) {
      console.error('Error denying access request:', error);
      toast.error('Failed to deny access request');
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'default',
      'inactive': 'secondary',
      'pending': 'outline',
      'approved': 'default',
      'denied': 'destructive',
      'expired': 'secondary'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status}
      </Badge>
    );
  };

  const getResultBadge = (result: string) => {
    return (
      <Badge variant={result === 'allow' ? 'default' : 'destructive'}>
        {result}
      </Badge>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Access Control Center</h1>
        <p className="text-gray-600">Manage users, roles, permissions, and access requests</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="requests" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Access Requests
          </TabsTrigger>
          <TabsTrigger value="api-keys" className="flex items-center gap-2">
            <Key className="h-4 w-4" />
            API Keys
          </TabsTrigger>
          <TabsTrigger value="audit" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Audit Logs
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Organization Users</CardTitle>
              <CardDescription>Manage user access and roles</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{user.full_name}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>{new Date(user.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Roles</CardTitle>
                <CardDescription>Built-in roles and their permissions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {roles.map((role) => (
                    <div key={role.key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{role.key}</div>
                        <div className="text-sm text-gray-500">{role.description}</div>
                        <div className="text-xs text-gray-400">{role.user_count} users</div>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Roles</CardTitle>
                <CardDescription>Organization-specific roles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {customRoles.map((role) => (
                    <div key={role.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{role.label}</div>
                        <div className="text-sm text-gray-500">{role.description}</div>
                        <div className="text-xs text-gray-400">{role.permissions.length} permissions</div>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" variant="outline">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Custom Role
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Requests</CardTitle>
              <CardDescription>Review and approve temporary access requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Permissions</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {accessRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell>{request.user_email}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {request.requested_permissions.map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{request.reason}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>{new Date(request.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {request.status === 'pending' && (
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleApproveAccessRequest(request.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDenyAccessRequest(request.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api-keys" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage API access and permissions</CardDescription>
                </div>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create API Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Scopes</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Used</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apiKeys.map((key) => (
                    <TableRow key={key.id}>
                      <TableCell className="font-medium">{key.name}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {key.scopes.map((scope) => (
                            <Badge key={scope} variant="outline" className="text-xs">
                              {scope}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(key.is_active ? 'active' : 'inactive')}</TableCell>
                      <TableCell>
                        {key.last_used_at ? new Date(key.last_used_at).toLocaleDateString() : 'Never'}
                      </TableCell>
                      <TableCell>{new Date(key.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Access Audit Logs</CardTitle>
              <CardDescription>Track all access decisions and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Permission</TableHead>
                    <TableHead>Resource</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Result</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.user_email}</TableCell>
                      <TableCell>{log.permission}</TableCell>
                      <TableCell>{log.resource}</TableCell>
                      <TableCell>{log.action}</TableCell>
                      <TableCell>{getResultBadge(log.result)}</TableCell>
                      <TableCell className="max-w-xs truncate">{log.reason}</TableCell>
                      <TableCell>{new Date(log.created_at).toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Access Control Settings</CardTitle>
                <CardDescription>Configure access control behavior</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Default Session Timeout</Label>
                  <Select defaultValue="8">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4 hours</SelectItem>
                      <SelectItem value="8">8 hours</SelectItem>
                      <SelectItem value="12">12 hours</SelectItem>
                      <SelectItem value="24">24 hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Maximum Failed Login Attempts</Label>
                  <Input type="number" defaultValue="5" min="1" max="10" />
                </div>
                <div>
                  <Label>Audit Log Retention (days)</Label>
                  <Input type="number" defaultValue="90" min="30" max="365" />
                </div>
                <Button className="w-full">Save Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Policies</CardTitle>
                <CardDescription>Define security requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="mfa" defaultChecked />
                  <Label htmlFor="mfa">Require Multi-Factor Authentication</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="password-policy" defaultChecked />
                  <Label htmlFor="password-policy">Enforce Strong Password Policy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="ip-restrictions" />
                  <Label htmlFor="ip-restrictions">Enable IP Address Restrictions</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="session-tracking" defaultChecked />
                  <Label htmlFor="session-tracking">Track User Sessions</Label>
                </div>
                <Button className="w-full">Update Policies</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
