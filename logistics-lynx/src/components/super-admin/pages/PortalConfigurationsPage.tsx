import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings, Save, RefreshCw, Plus, Edit, Trash2, Copy, Check,
  Globe, Shield, Database, Server, Network, Zap, Code, Key,
  Download, Upload, Eye, EyeOff, AlertTriangle, CheckCircle,
  Clock, Calendar, Building, Users, Lock, Unlock, ExternalLink,
  GitBranch, Cloud, Monitor, Activity, BarChart3, Search
} from 'lucide-react';

interface PortalConfiguration {
  id: string;
  portalId: string;
  portalName: string;
  category: 'environment' | 'database' | 'api' | 'security' | 'integrations' | 'monitoring';
  key: string;
  value: string;
  type: 'string' | 'number' | 'boolean' | 'json' | 'password';
  description: string;
  isRequired: boolean;
  isSensitive: boolean;
  environment: 'development' | 'staging' | 'production';
  lastModified: string;
  modifiedBy: string;
}

interface PortalEnvironment {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'maintenance';
  configCount: number;
  lastDeployed: string;
  version: string;
}

const PortalConfigurationsPage = () => {
  const [configurations, setConfigurations] = useState<PortalConfiguration[]>([]);
  const [environments, setEnvironments] = useState<PortalEnvironment[]>([]);
  const [selectedPortal, setSelectedPortal] = useState<string>('all');
  const [selectedEnvironment, setSelectedEnvironment] = useState<string>('production');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('configurations');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPortalConfigurations();
  }, []);

  const loadPortalConfigurations = async () => {
    setLoading(true);
    try {
      // Mock portal configurations data
      const mockConfigurations: PortalConfiguration[] = [
        {
          id: 'config-001',
          portalId: 'portal-001',
          portalName: 'Carrier Portal',
          category: 'environment',
          key: 'DATABASE_URL',
          value: 'postgresql://user:pass@localhost:5432/carrier_db',
          type: 'password',
          description: 'Primary database connection string',
          isRequired: true,
          isSensitive: true,
          environment: 'production',
          lastModified: '2024-01-15T10:30:00Z',
          modifiedBy: 'admin@company.com'
        },
        {
          id: 'config-002',
          portalId: 'portal-001',
          portalName: 'Carrier Portal',
          category: 'api',
          key: 'API_RATE_LIMIT',
          value: '1000',
          type: 'number',
          description: 'API rate limit per minute',
          isRequired: true,
          isSensitive: false,
          environment: 'production',
          lastModified: '2024-01-15T10:30:00Z',
          modifiedBy: 'admin@company.com'
        },
        {
          id: 'config-003',
          portalId: 'portal-001',
          portalName: 'Carrier Portal',
          category: 'security',
          key: 'JWT_SECRET',
          value: 'super-secret-jwt-key-2024',
          type: 'password',
          description: 'JWT signing secret',
          isRequired: true,
          isSensitive: true,
          environment: 'production',
          lastModified: '2024-01-15T10:30:00Z',
          modifiedBy: 'admin@company.com'
        },
        {
          id: 'config-004',
          portalId: 'portal-002',
          portalName: 'Shipper Portal',
          category: 'integrations',
          key: 'STRIPE_API_KEY',
          value: 'sk_live_1234567890abcdef',
          type: 'password',
          description: 'Stripe payment processing API key',
          isRequired: true,
          isSensitive: true,
          environment: 'production',
          lastModified: '2024-01-15T11:00:00Z',
          modifiedBy: 'admin@company.com'
        },
        {
          id: 'config-005',
          portalId: 'portal-002',
          portalName: 'Shipper Portal',
          category: 'monitoring',
          key: 'LOG_LEVEL',
          value: 'info',
          type: 'string',
          description: 'Application logging level',
          isRequired: false,
          isSensitive: false,
          environment: 'production',
          lastModified: '2024-01-15T11:00:00Z',
          modifiedBy: 'admin@company.com'
        },
        {
          id: 'config-006',
          portalId: 'portal-003',
          portalName: 'Broker Portal',
          category: 'database',
          key: 'REDIS_URL',
          value: 'redis://localhost:6379',
          type: 'string',
          description: 'Redis cache connection URL',
          isRequired: false,
          isSensitive: false,
          environment: 'production',
          lastModified: '2024-01-15T11:30:00Z',
          modifiedBy: 'admin@company.com'
        }
      ];

      const mockEnvironments: PortalEnvironment[] = [
        {
          id: 'env-001',
          name: 'Production',
          description: 'Live production environment',
          status: 'active',
          configCount: 45,
          lastDeployed: '2024-01-15T10:00:00Z',
          version: 'v2.1.0'
        },
        {
          id: 'env-002',
          name: 'Staging',
          description: 'Pre-production testing environment',
          status: 'active',
          configCount: 42,
          lastDeployed: '2024-01-14T15:30:00Z',
          version: 'v2.1.0-rc1'
        },
        {
          id: 'env-003',
          name: 'Development',
          description: 'Development and testing environment',
          status: 'active',
          configCount: 38,
          lastDeployed: '2024-01-13T09:15:00Z',
          version: 'v2.0.9'
        }
      ];

      setConfigurations(mockConfigurations);
      setEnvironments(mockEnvironments);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load portal configurations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfigurations = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Success",
        description: "Portal configurations saved successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save configurations",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCopyValue = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedKey(key);
      toast({
        title: "Copied",
        description: "Configuration value copied to clipboard"
      });
      setTimeout(() => setCopiedKey(null), 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy value",
        variant: "destructive"
      });
    }
  };

  const handleExportConfig = () => {
    toast({
      title: "Export Configuration",
      description: "Configuration export functionality would be implemented here"
    });
  };

  const handleImportConfig = () => {
    toast({
      title: "Import Configuration",
      description: "Configuration import functionality would be implemented here"
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'environment': return Globe;
      case 'database': return Database;
      case 'api': return Code;
      case 'security': return Shield;
      case 'integrations': return Network;
      case 'monitoring': return Monitor;
      default: return Settings;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environment': return 'bg-blue-500';
      case 'database': return 'bg-green-500';
      case 'api': return 'bg-purple-500';
      case 'security': return 'bg-red-500';
      case 'integrations': return 'bg-orange-500';
      case 'monitoring': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  const getEnvironmentStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredConfigurations = configurations.filter(config => {
    const matchesSearch = config.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         config.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPortal = selectedPortal === 'all' || config.portalId === selectedPortal;
    const matchesEnvironment = config.environment === selectedEnvironment;
    const matchesCategory = categoryFilter === 'all' || config.category === categoryFilter;
    
    return matchesSearch && matchesPortal && matchesEnvironment && matchesCategory;
  });

  const portals = Array.from(new Set(configurations.map(config => ({ id: config.portalId, name: config.portalName }))));

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading Portal Configurations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portal Configurations</h1>
          <p className="text-muted-foreground">
            Manage environment variables, API keys, and system configurations
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExportConfig}>
            <Download className="w-4 h-4 mr-2" />
            Export Config
          </Button>
          <Button variant="outline" onClick={handleImportConfig}>
            <Upload className="w-4 h-4 mr-2" />
            Import Config
          </Button>
          <Button onClick={handleSaveConfigurations} disabled={saving}>
            {saving ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="configurations">Configurations ({configurations.length})</TabsTrigger>
          <TabsTrigger value="environments">Environments ({environments.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="configurations" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="search">Search Configurations</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by key or description..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="portal">Portal</Label>
                  <Select value={selectedPortal} onValueChange={setSelectedPortal}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select portal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Portals</SelectItem>
                      {portals.map((portal) => (
                        <SelectItem key={portal.id} value={portal.id}>
                          {portal.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="environment">Environment</Label>
                  <Select value={selectedEnvironment} onValueChange={setSelectedEnvironment}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select environment" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="staging">Staging</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="environment">Environment</SelectItem>
                      <SelectItem value="database">Database</SelectItem>
                      <SelectItem value="api">API</SelectItem>
                      <SelectItem value="security">Security</SelectItem>
                      <SelectItem value="integrations">Integrations</SelectItem>
                      <SelectItem value="monitoring">Monitoring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Configurations List */}
          <div className="grid gap-4">
            {filteredConfigurations.map((config) => {
              const CategoryIcon = getCategoryIcon(config.category);
              return (
                <Card key={config.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`h-8 w-8 rounded-full ${getCategoryColor(config.category)} flex items-center justify-center`}>
                          <CategoryIcon className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-lg font-mono">{config.key}</CardTitle>
                          <CardDescription>{config.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {config.isRequired && (
                          <Badge variant="destructive">Required</Badge>
                        )}
                        {config.isSensitive && (
                          <Badge variant="secondary">Sensitive</Badge>
                        )}
                        <Badge variant="outline">{config.type}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Portal</Label>
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <span>{config.portalName}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Environment</Label>
                          <Badge variant="outline" className="capitalize">
                            {config.environment}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Value</Label>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1">
                            {config.isSensitive ? (
                              <div className="flex items-center space-x-2">
                                <Input
                                  type="password"
                                  value={config.value}
                                  readOnly
                                  className="font-mono"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopyValue(config.key, config.value)}
                                >
                                  {copiedKey === config.key ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            ) : (
                              <div className="flex items-center space-x-2">
                                <Input
                                  value={config.value}
                                  readOnly
                                  className="font-mono"
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCopyValue(config.key, config.value)}
                                >
                                  {copiedKey === config.key ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>Modified: {new Date(config.lastModified).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>By: {config.modifiedBy}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="environments" className="space-y-6">
          {/* Environment Management */}
          <Card>
            <CardHeader>
              <CardTitle>Environment Management</CardTitle>
              <CardDescription>
                Manage different deployment environments and their configurations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
                {environments.map((env) => (
                  <Card key={env.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{env.name}</CardTitle>
                        <Badge className={getEnvironmentStatusColor(env.status)}>
                          {env.status}
                        </Badge>
                      </div>
                      <CardDescription>{env.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Version:</span>
                          <Badge variant="outline">{env.version}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Configurations:</span>
                          <Badge variant="outline">{env.configCount}</Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Last Deployed:</span>
                          <span className="text-muted-foreground">
                            {new Date(env.lastDeployed).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Activity className="h-3 w-3 mr-1" />
                            Monitor
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings className="h-3 w-3 mr-1" />
                            Configure
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortalConfigurationsPage;
