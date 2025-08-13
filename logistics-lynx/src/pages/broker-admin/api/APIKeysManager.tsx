import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Copy, Eye, EyeOff, Key, MoreHorizontal, Plus, Settings, Shield, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

interface APIKey {
  id: string;
  name: string;
  key: string;
  status: 'active' | 'inactive' | 'revoked';
  permissions: string[];
  lastUsed: string;
  created: string;
  expiresAt: string;
  requests: number;
  rateLimit: string;
}

const APIKeysManager: React.FC = () => {
  const { toast } = useToast();
  const [showNewKeyDialog, setShowNewKeyDialog] = useState(false);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const [apiKeys] = useState<APIKey[]>([
    {
      id: '1',
      name: 'Production API',
      key: 'sk_prod_1234567890abcdef1234567890abcdef',
      status: 'active',
      permissions: ['read', 'write', 'admin'],
      lastUsed: '2024-01-15T10:30:00Z',
      created: '2024-01-01T00:00:00Z',
      expiresAt: '2024-12-31T23:59:59Z',
      requests: 125432,
      rateLimit: '1000/min'
    },
    {
      id: '2',
      name: 'Development API',
      key: 'sk_dev_abcdef1234567890abcdef1234567890',
      status: 'active',
      permissions: ['read', 'write'],
      lastUsed: '2024-01-14T15:45:00Z',
      created: '2024-01-05T00:00:00Z',
      expiresAt: '2024-06-30T23:59:59Z',
      requests: 45231,
      rateLimit: '500/min'
    },
    {
      id: '3',
      name: 'Legacy Integration',
      key: 'sk_legacy_fedcba0987654321fedcba0987654321',
      status: 'inactive',
      permissions: ['read'],
      lastUsed: '2024-01-10T09:15:00Z',
      created: '2023-12-01T00:00:00Z',
      expiresAt: '2024-03-31T23:59:59Z',
      requests: 12543,
      rateLimit: '100/min'
    }
  ]);

  const toggleKeyVisibility = (keyId: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(keyId)) {
      newVisible.delete(keyId);
    } else {
      newVisible.add(keyId);
    }
    setVisibleKeys(newVisible);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "API key copied to clipboard",
    });
  };

  const maskKey = (key: string) => {
    if (key.length <= 8) return key;
    return key.substring(0, 8) + '...' + key.substring(key.length - 4);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      inactive: "secondary",
      revoked: "destructive"
    };
    return <Badge variant={variants[status] || "outline"}>{status}</Badge>;
  };

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys Management</h1>
          <p className="text-muted-foreground">
            Create and manage API keys for integrations and third-party access
          </p>
        </div>
        <Dialog open={showNewKeyDialog} onOpenChange={setShowNewKeyDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate New Key
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Generate New API Key</DialogTitle>
              <DialogDescription>
                Create a new API key with specific permissions and settings.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="keyName">Key Name</Label>
                <Input id="keyName" placeholder="e.g., Mobile App Integration" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="permissions">Permissions</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select permissions level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="read">Read Only</SelectItem>
                    <SelectItem value="read-write">Read & Write</SelectItem>
                    <SelectItem value="admin">Full Admin Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="rateLimit">Rate Limit</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select rate limit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 requests/min</SelectItem>
                    <SelectItem value="500">500 requests/min</SelectItem>
                    <SelectItem value="1000">1,000 requests/min</SelectItem>
                    <SelectItem value="5000">5,000 requests/min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea id="description" placeholder="Describe the purpose of this API key..." />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setShowNewKeyDialog(false)}>
                Generate Key
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList>
          <TabsTrigger value="active">Active Keys</TabsTrigger>
          <TabsTrigger value="inactive">Inactive Keys</TabsTrigger>
          <TabsTrigger value="settings">Security Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4">
            {apiKeys.filter(key => key.status === 'active').map((key) => (
              <Card key={key.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{key.name}</CardTitle>
                    <CardDescription>
                      Created {new Date(key.created).toLocaleDateString()} • 
                      Last used {new Date(key.lastUsed).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(key.status)}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Edit Settings
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="h-4 w-4 mr-2" />
                          Update Permissions
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Revoke Key
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 font-mono text-sm bg-muted p-2 rounded">
                        {visibleKeys.has(key.id) ? key.key : maskKey(key.key)}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleKeyVisibility(key.id)}
                      >
                        {visibleKeys.has(key.id) ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyToClipboard(key.key)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Requests</p>
                        <p className="font-medium">{key.requests.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rate Limit</p>
                        <p className="font-medium">{key.rateLimit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Permissions</p>
                        <p className="font-medium">{key.permissions.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expires</p>
                        <p className="font-medium">{new Date(key.expiresAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="inactive" className="space-y-4">
          <div className="grid gap-4">
            {apiKeys.filter(key => key.status !== 'active').map((key) => (
              <Card key={key.id} className="opacity-60">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <div className="space-y-1">
                    <CardTitle className="text-base">{key.name}</CardTitle>
                    <CardDescription>
                      Created {new Date(key.created).toLocaleDateString()} • 
                      Last used {new Date(key.lastUsed).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(key.status)}
                    <Button variant="outline" size="sm">
                      Reactivate
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 font-mono text-sm bg-muted p-2 rounded">
                        {maskKey(key.key)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Requests</p>
                        <p className="font-medium">{key.requests.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Rate Limit</p>
                        <p className="font-medium">{key.rateLimit}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Permissions</p>
                        <p className="font-medium">{key.permissions.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Expires</p>
                        <p className="font-medium">{new Date(key.expiresAt).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security policies for API key management
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Require HTTPS</Label>
                  <p className="text-sm text-muted-foreground">
                    Only allow API calls over HTTPS connections
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>IP Whitelisting</Label>
                  <p className="text-sm text-muted-foreground">
                    Restrict API access to specific IP addresses
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Auto-Revoke Unused Keys</Label>
                  <p className="text-sm text-muted-foreground">
                    Automatically revoke keys after 90 days of inactivity
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="space-y-2">
                <Label>Default Rate Limit</Label>
                <Select defaultValue="500">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="100">100 requests/min</SelectItem>
                    <SelectItem value="500">500 requests/min</SelectItem>
                    <SelectItem value="1000">1,000 requests/min</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>API Key Rotation Policy</Label>
                <Select defaultValue="yearly">
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default APIKeysManager;