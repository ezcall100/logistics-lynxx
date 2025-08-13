import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Key, Eye, EyeOff, Copy, Edit, Trash2, RefreshCw, AlertTriangle, CheckCircle, Clock, Users } from 'lucide-react';
import { toast } from 'sonner';

interface APIKey {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'inactive' | 'expired';
  permissions: string[];
  rateLimit: number;
  usage: number;
  lastUsed: string;
  createdAt: string;
  expiresAt: string;
  environment: 'production' | 'staging' | 'development';
}

const mockAPIKeys: APIKey[] = [
  {
    id: '1',
    name: 'Trans Bot Mobile App',
    key: 'tb_prod_7k8m9n0p1q2r3s4t5u6v7w8x9y0z',
    status: 'active',
    permissions: ['shipments:read', 'shipments:write', 'loads:read', 'tracking:read'],
    rateLimit: 1000,
    usage: 756,
    lastUsed: '2 minutes ago',
    createdAt: '2024-01-15',
    expiresAt: '2024-12-31',
    environment: 'production'
  },
  {
    id: '2',
    name: 'Web Portal Integration',
    key: 'tb_prod_a1b2c3d4e5f6g7h8i9j0k1l2m3n4',
    status: 'active',
    permissions: ['shipments:read', 'loads:read', 'carriers:read', 'quotes:read', 'quotes:write'],
    rateLimit: 2000,
    usage: 1342,
    lastUsed: '5 minutes ago',
    createdAt: '2024-01-10',
    expiresAt: '2024-12-31',
    environment: 'production'
  },
  {
    id: '3',
    name: 'Analytics Dashboard',
    key: 'tb_stg_x9y8z7w6v5u4t3s2r1q0p9o8n7m6',
    status: 'active',
    permissions: ['analytics:read', 'reports:read'],
    rateLimit: 500,
    usage: 234,
    lastUsed: '1 hour ago',
    createdAt: '2024-01-20',
    expiresAt: '2024-06-30',
    environment: 'staging'
  },
  {
    id: '4',
    name: 'Legacy System Bridge',
    key: 'tb_prod_m6n7o8p9q0r1s2t3u4v5w6x7y8z9',
    status: 'inactive',
    permissions: ['legacy:read'],
    rateLimit: 100,
    usage: 0,
    lastUsed: '2 weeks ago',
    createdAt: '2023-12-01',
    expiresAt: '2024-03-01',
    environment: 'production'
  },
  {
    id: '5',
    name: 'Testing Environment',
    key: 'tb_dev_f5g6h7i8j9k0l1m2n3o4p5q6r7s8',
    status: 'active',
    permissions: ['*:*'],
    rateLimit: 100,
    usage: 45,
    lastUsed: '30 minutes ago',
    createdAt: '2024-01-25',
    expiresAt: '2024-03-31',
    environment: 'development'
  }
];

const availablePermissions = [
  'shipments:read', 'shipments:write', 'shipments:delete',
  'loads:read', 'loads:write', 'loads:delete',
  'carriers:read', 'carriers:write', 'carriers:delete',
  'tracking:read', 'tracking:write',
  'quotes:read', 'quotes:write', 'quotes:delete',
  'analytics:read', 'reports:read',
  'users:read', 'users:write',
  'admin:*', '*:*'
];

export const APIKeysManager: React.FC = () => {
  const [keys, setKeys] = useState<APIKey[]>(mockAPIKeys);
  const [showKey, setShowKey] = useState<Record<string, boolean>>({});
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<APIKey | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    environment: 'production',
    permissions: [] as string[],
    rateLimit: 1000,
    expiresAt: '',
    description: ''
  });

  const toggleKeyVisibility = (keyId: string) => {
    setShowKey(prev => ({ ...prev, [keyId]: !prev[keyId] }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('API key copied to clipboard');
  };

  const generateAPIKey = () => {
    const prefix = formData.environment === 'production' ? 'tb_prod_' : 
                   formData.environment === 'staging' ? 'tb_stg_' : 'tb_dev_';
    return prefix + Math.random().toString(36).substr(2, 24);
  };

  const handleCreateKey = () => {
    const newKey: APIKey = {
      id: Date.now().toString(),
      name: formData.name,
      key: generateAPIKey(),
      status: 'active',
      permissions: formData.permissions,
      rateLimit: formData.rateLimit,
      usage: 0,
      lastUsed: 'Never',
      createdAt: new Date().toISOString().split('T')[0],
      expiresAt: formData.expiresAt,
      environment: formData.environment as APIKey['environment']
    };

    setKeys(prev => [...prev, newKey]);
    setIsCreateDialogOpen(false);
    setFormData({
      name: '',
      environment: 'production',
      permissions: [],
      rateLimit: 1000,
      expiresAt: '',
      description: ''
    });
    toast.success('API key created successfully');
  };

  const handleEditKey = () => {
    if (!editingKey) return;

    setKeys(prev => prev.map(key => 
      key.id === editingKey.id 
        ? { ...key, name: formData.name, permissions: formData.permissions, rateLimit: formData.rateLimit, expiresAt: formData.expiresAt }
        : key
    ));
    setIsEditDialogOpen(false);
    setEditingKey(null);
    toast.success('API key updated successfully');
  };

  const handleDeleteKey = (keyId: string) => {
    setKeys(prev => prev.filter(key => key.id !== keyId));
    toast.success('API key deleted successfully');
  };

  const toggleKeyStatus = (keyId: string) => {
    setKeys(prev => prev.map(key => 
      key.id === keyId 
        ? { ...key, status: key.status === 'active' ? 'inactive' : 'active' }
        : key
    ));
    toast.success('API key status updated');
  };

  const openEditDialog = (key: APIKey) => {
    setEditingKey(key);
    setFormData({
      name: key.name,
      environment: key.environment,
      permissions: key.permissions,
      rateLimit: key.rateLimit,
      expiresAt: key.expiresAt,
      description: ''
    });
    setIsEditDialogOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-300';
      case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'expired': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case 'production': return 'bg-red-100 text-red-700';
      case 'staging': return 'bg-yellow-100 text-yellow-700';
      case 'development': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const activeKeys = keys.filter(key => key.status === 'active').length;
  const totalRequests = keys.reduce((sum, key) => sum + key.usage, 0);
  const avgRateLimit = keys.length > 0 ? Math.round(keys.reduce((sum, key) => sum + key.rateLimit, 0) / keys.length) : 0;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            API Keys Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Create, manage, and monitor your API keys and access permissions
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
              <Plus className="w-4 h-4 mr-2" />
              Create API Key
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New API Key</DialogTitle>
              <DialogDescription>
                Generate a new API key with specific permissions and rate limits.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Key Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Mobile App Integration"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="environment">Environment</Label>
                <Select value={formData.environment} onValueChange={(value) => setFormData(prev => ({ ...prev, environment: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="production">Production</SelectItem>
                    <SelectItem value="staging">Staging</SelectItem>
                    <SelectItem value="development">Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="rateLimit">Rate Limit (requests/hour)</Label>
                <Input
                  id="rateLimit"
                  type="number"
                  value={formData.rateLimit}
                  onChange={(e) => setFormData(prev => ({ ...prev, rateLimit: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="expiresAt">Expiration Date</Label>
                <Input
                  id="expiresAt"
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
                />
              </div>
              <div>
                <Label>Permissions</Label>
                <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto border rounded-md p-3">
                  {availablePermissions.map((permission) => (
                    <div key={permission} className="flex items-center space-x-2">
                      <Checkbox
                        id={permission}
                        checked={formData.permissions.includes(permission)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData(prev => ({ 
                              ...prev, 
                              permissions: [...prev.permissions, permission] 
                            }));
                          } else {
                            setFormData(prev => ({ 
                              ...prev, 
                              permissions: prev.permissions.filter(p => p !== permission) 
                            }));
                          }
                        }}
                      />
                      <Label htmlFor={permission} className="text-sm">{permission}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateKey} disabled={!formData.name || formData.permissions.length === 0}>
                Create Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Keys</CardTitle>
            <Key className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{keys.length}</div>
            <p className="text-xs text-muted-foreground">
              {activeKeys} active keys
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10 border-green-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Users className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Today's usage
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10 border-blue-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rate Limit</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgRateLimit}</div>
            <p className="text-xs text-muted-foreground">
              requests/hour
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500/5 to-orange-500/10 border-orange-500/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">100%</div>
            <p className="text-xs text-muted-foreground">
              All keys operational
            </p>
          </CardContent>
        </Card>
      </div>

      {/* API Keys Table */}
      <Card className="bg-background/50 backdrop-blur-sm border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="w-5 h-5 text-primary" />
            API Keys
          </CardTitle>
          <CardDescription>Manage your API keys and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>API Key</TableHead>
                  <TableHead>Environment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Rate Limit</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell className="font-medium">{key.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="bg-muted px-2 py-1 rounded text-xs">
                          {showKey[key.id] ? key.key : key.key.substring(0, 16) + '...'}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeyVisibility(key.id)}
                        >
                          {showKey[key.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(key.key)}
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getEnvironmentColor(key.environment)}>
                        {key.environment}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className={getStatusColor(key.status)}>
                          {key.status}
                        </Badge>
                        <Switch
                          checked={key.status === 'active'}
                          onCheckedChange={() => toggleKeyStatus(key.id)}
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{key.usage.toLocaleString()}</div>
                        <div className="text-muted-foreground">of {key.rateLimit}</div>
                      </div>
                    </TableCell>
                    <TableCell>{key.rateLimit}/hour</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{key.lastUsed}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(key)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteKey(key.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit API Key</DialogTitle>
            <DialogDescription>
              Update API key permissions and settings.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Key Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-rateLimit">Rate Limit (requests/hour)</Label>
              <Input
                id="edit-rateLimit"
                type="number"
                value={formData.rateLimit}
                onChange={(e) => setFormData(prev => ({ ...prev, rateLimit: parseInt(e.target.value) || 0 }))}
              />
            </div>
            <div>
              <Label htmlFor="edit-expiresAt">Expiration Date</Label>
              <Input
                id="edit-expiresAt"
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData(prev => ({ ...prev, expiresAt: e.target.value }))}
              />
            </div>
            <div>
              <Label>Permissions</Label>
              <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto border rounded-md p-3">
                {availablePermissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-${permission}`}
                      checked={formData.permissions.includes(permission)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData(prev => ({ 
                            ...prev, 
                            permissions: [...prev.permissions, permission] 
                          }));
                        } else {
                          setFormData(prev => ({ 
                            ...prev, 
                            permissions: prev.permissions.filter(p => p !== permission) 
                          }));
                        }
                      }}
                    />
                    <Label htmlFor={`edit-${permission}`} className="text-sm">{permission}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditKey}>
              Update Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};