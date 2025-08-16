/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Key,
  Activity,
  AlertCircle,
  CheckCircle,
  Copy,
  Plus,
  Eye,
  EyeOff,
  Trash2,
  Clock
} from 'lucide-react';

const APIKeys = () => {
  const apiStats = [
    { title: 'Total API Keys', value: '24', change: '+3', icon: Key, color: 'text-blue-600' },
    { title: 'Active Keys', value: '22', change: '+2', icon: CheckCircle, color: 'text-green-600' },
    { title: 'Requests Today', value: '156,432', change: '+12%', icon: Activity, color: 'text-purple-600' },
    { title: 'Rate Limited', value: '3', change: '-1', icon: AlertCircle, color: 'text-orange-600' },
  ];

  const apiKeys = [
    {
      id: 'ak_1234567890abcdef',
      name: 'Production API Key',
      description: 'Main production environment key',
      created: '2024-01-15',
      lastUsed: '2024-03-20',
      requests: '45,234',
      status: 'Active',
      permissions: ['read', 'write', 'delete'],
      rateLimit: '1000/min'
    },
    {
      id: 'ak_abcdef1234567890',
      name: 'Development API Key',
      description: 'Development and testing environment',
      created: '2024-02-01',
      lastUsed: '2024-03-19',
      requests: '12,456',
      status: 'Active',
      permissions: ['read', 'write'],
      rateLimit: '500/min'
    },
    {
      id: 'ak_fedcba0987654321',
      name: 'Analytics API Key',
      description: 'Read-only analytics access',
      created: '2024-02-15',
      lastUsed: '2024-03-18',
      requests: '8,765',
      status: 'Active',
      permissions: ['read'],
      rateLimit: '200/min'
    },
    {
      id: 'ak_567890abcdef1234',
      name: 'Legacy API Key',
      description: 'Legacy system integration',
      created: '2023-12-01',
      lastUsed: '2024-03-10',
      requests: '2,345',
      status: 'Deprecated',
      permissions: ['read'],
      rateLimit: '100/min'
    },
  ];

  const [showKeys, setShowKeys] = React.useState<Record<string, boolean>>({});

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const maskKey = (key: string) => {
    return showKeys[key] ? key : key.substring(0, 12) + '••••••••••••••••';
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">API Keys Management</h1>
            <p className="text-muted-foreground">Manage API keys and access permissions</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Generate New Key
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {apiStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className={stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}>
                    {stat.change}
                  </span> from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* API Keys List */}
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Manage your API keys and their permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {apiKeys.map((key) => (
                <div key={key.id} className="p-4 border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{key.name}</h4>
                        <Badge variant={key.status === 'Active' ? 'default' : 'secondary'}>
                          {key.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{key.description}</p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <code className="bg-muted px-2 py-1 rounded text-sm font-mono">
                          {maskKey(key.id)}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleKeyVisibility(key.id)}
                        >
                          {showKeys[key.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Edit</Button>
                      <Button variant="outline" size="sm" className="text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm border-t pt-3">
                    <div>
                      <p className="text-muted-foreground">Created</p>
                      <p className="font-medium">{key.created}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Last Used</p>
                      <p className="font-medium">{key.lastUsed}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Requests</p>
                      <p className="font-medium">{key.requests}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Rate Limit</p>
                      <p className="font-medium">{key.rateLimit}</p>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <p className="text-sm text-muted-foreground mb-1">Permissions:</p>
                    <div className="flex gap-1">
                      {key.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs">
                          {permission}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Usage Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent API Activity
              </CardTitle>
              <CardDescription>Latest API requests and responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { endpoint: '/api/v1/shipments', method: 'GET', status: 200, time: '12ms', ago: '2 min ago' },
                  { endpoint: '/api/v1/carriers', method: 'POST', status: 201, time: '45ms', ago: '5 min ago' },
                  { endpoint: '/api/v1/users', method: 'GET', status: 200, time: '23ms', ago: '8 min ago' },
                  { endpoint: '/api/v1/analytics', method: 'GET', status: 200, time: '156ms', ago: '12 min ago' },
                ].map((request, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div className="flex items-center gap-3">
                      <Badge variant={request.method === 'GET' ? 'default' : 'secondary'}>
                        {request.method}
                      </Badge>
                      <code className="text-sm">{request.endpoint}</code>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Badge variant={request.status === 200 || request.status === 201 ? 'default' : 'destructive'}>
                        {request.status}
                      </Badge>
                      <span className="text-muted-foreground">{request.time}</span>
                      <span className="text-muted-foreground">{request.ago}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Rate Limit Status
              </CardTitle>
              <CardDescription>Current rate limiting status for active keys</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.filter(key => key.status === 'Active').map((key) => (
                  <div key={key.id} className="p-3 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{key.name}</h5>
                      <Badge variant="outline">{key.rateLimit}</Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Current Usage</span>
                        <span>245/1000</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '24.5%' }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default APIKeys;