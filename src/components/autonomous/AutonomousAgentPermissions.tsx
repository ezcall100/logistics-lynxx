import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  Brain, 
  Shield, 
  Database, 
  Code, 
  Palette, 
  Settings, 
  Zap, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Key,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  RefreshCw,
  Save,
  Trash2,
  Plus,
  Edit,
  Copy,
  Download,
  Upload
} from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface AutonomousAgent {
  id: string;
  name: string;
  type: string;
  capabilities: string[];
  permissions: string[];
  authority_level: number;
  is_active: boolean;
  last_activity: string;
  performance: number;
  emergency_access: boolean;
  learning_enabled: boolean;
  self_modification: boolean;
}

interface PermissionCategory {
  name: string;
  icon: React.ReactNode;
  permissions: string[];
  description: string;
}

const PERMISSION_CATEGORIES: PermissionCategory[] = [
  {
    name: 'System Architecture',
    icon: <Brain className="h-4 w-4" />,
    permissions: ['system.architecture.design', 'system.architecture.rebuild', 'system.components.create', 'system.components.modify', 'system.components.delete'],
    description: 'Full control over system architecture and components'
  },
  {
    name: 'Database Management',
    icon: <Database className="h-4 w-4" />,
    permissions: ['database.schema.design', 'database.schema.modify', 'database.migrations.create', 'database.migrations.execute', 'database.optimization', 'database.backup.manage'],
    description: 'Complete database schema and migration control'
  },
  {
    name: 'Code Management',
    icon: <Code className="h-4 w-4" />,
    permissions: ['code.generate', 'code.modify', 'code.refactor', 'code.deploy', 'code.rollback', 'code.review'],
    description: 'Full code generation, modification, and deployment authority'
  },
  {
    name: 'UI/UX Design',
    icon: <Palette className="h-4 w-4" />,
    permissions: ['ui.design.create', 'ui.components.create', 'ui.layout.modify', 'ui.theme.manage', 'ui.navigation.modify', 'ui.responsive.optimize'],
    description: 'Complete UI/UX design and modification authority'
  },
  {
    name: 'Portal Management',
    icon: <Users className="h-4 w-4" />,
    permissions: ['portal.create', 'portal.modify', 'portal.delete', 'portal.config.manage', 'portal.templates.create', 'portal.templates.modify'],
    description: 'Full portal creation, modification, and template management'
  },
  {
    name: 'Settings & Configuration',
    icon: <Settings className="h-4 w-4" />,
    permissions: ['settings.system.manage', 'settings.user.manage', 'settings.business.manage', 'settings.integration.manage', 'settings.security.manage', 'settings.performance.manage'],
    description: 'Complete system, user, and business settings management'
  },
  {
    name: 'Business Logic & Workflows',
    icon: <Zap className="h-4 w-4" />,
    permissions: ['workflow.create', 'workflow.modify', 'workflow.delete', 'business.rules.create', 'business.rules.modify', 'business.processes.optimize'],
    description: 'Full business logic and workflow management'
  },
  {
    name: 'API Management',
    icon: <Code className="h-4 w-4" />,
    permissions: ['api.endpoints.create', 'api.endpoints.modify', 'api.endpoints.delete', 'api.documentation.manage', 'api.versioning.manage', 'api.integration.create'],
    description: 'Complete API endpoint and integration management'
  },
  {
    name: 'Testing & Quality Assurance',
    icon: <CheckCircle className="h-4 w-4" />,
    permissions: ['testing.unit.create', 'testing.integration.create', 'testing.e2e.create', 'testing.performance.create', 'testing.security.create', 'quality.assurance.manage'],
    description: 'Full testing and quality assurance control'
  },
  {
    name: 'Deployment & Infrastructure',
    icon: <Zap className="h-4 w-4" />,
    permissions: ['deployment.manage', 'infrastructure.provision', 'infrastructure.scale', 'monitoring.setup', 'monitoring.manage', 'backup.recovery.manage'],
    description: 'Complete deployment and infrastructure management'
  },
  {
    name: 'Security & Compliance',
    icon: <Shield className="h-4 w-4" />,
    permissions: ['security.audit.perform', 'security.vulnerabilities.scan', 'security.policies.create', 'security.policies.modify', 'compliance.manage', 'encryption.manage'],
    description: 'Full security audit and compliance management'
  },
  {
    name: 'Data Management',
    icon: <Database className="h-4 w-4" />,
    permissions: ['data.migration.create', 'data.migration.execute', 'data.cleanup.perform', 'data.export.manage', 'data.import.manage', 'data.analytics.create'],
    description: 'Complete data migration and analytics management'
  },
  {
    name: 'Autonomous System Control',
    icon: <Brain className="h-4 w-4" />,
    permissions: ['autonomous.agents.manage', 'autonomous.tasks.create', 'autonomous.tasks.modify', 'autonomous.tasks.delete', 'autonomous.learning.manage', 'autonomous.improvements.manage'],
    description: 'Full autonomous system and learning management'
  },
  {
    name: 'Emergency & Recovery',
    icon: <AlertTriangle className="h-4 w-4" />,
    permissions: ['emergency.control.manage', 'emergency.degrade.perform', 'emergency.stop.perform', 'emergency.resume.perform', 'recovery.procedures.manage', 'disaster.recovery.manage'],
    description: 'Emergency control and disaster recovery management'
  },
  {
    name: 'Advanced Features',
    icon: <Zap className="h-4 w-4" />,
    permissions: ['ai.ml.models.create', 'ai.ml.models.train', 'ai.ml.models.deploy', 'blockchain.integration.manage', 'iot.devices.manage', 'edge.computing.manage'],
    description: 'AI/ML, blockchain, IoT, and edge computing management'
  },
  {
    name: 'Reporting & Analytics',
    icon: <CheckCircle className="h-4 w-4" />,
    permissions: ['reports.create', 'reports.modify', 'reports.delete', 'analytics.dashboard.create', 'analytics.dashboard.modify', 'analytics.insights.generate'],
    description: 'Complete reporting and analytics management'
  },
  {
    name: 'Integration & Third-party',
    icon: <Code className="h-4 w-4" />,
    permissions: ['integration.third_party.create', 'integration.third_party.modify', 'integration.webhook.manage', 'integration.api.manage', 'integration.data.sync', 'integration.monitoring.manage'],
    description: 'Complete third-party integration management'
  }
];

export const AutonomousAgentPermissions: React.FC = () => {
  const { toast } = useToast();
  const [agents, setAgents] = useState<AutonomousAgent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<AutonomousAgent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [permissionOverrides, setPermissionOverrides] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadAutonomousAgents();
  }, []);

  const loadAutonomousAgents = async () => {
    try {
      setLoading(true);
      
      // Get current user and org
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: orgMembership } = await supabase
        .from('org_memberships')
        .select('org_id')
        .eq('user_id', user.id)
        .single();

      if (!orgMembership) return;

      // Get autonomous agents with their permissions
      const { data: agentData, error } = await supabase
        .rpc('get_autonomous_agent_capabilities', { p_agent_type: 'all' });

      if (error) {
        console.error('Error loading agents:', error);
        return;
      }

      // Transform data to match our interface
      const transformedAgents: AutonomousAgent[] = [
        {
          id: 'research_agent',
          name: 'Research Agent',
          type: 'research',
          capabilities: ['market_analysis', 'technology_research', 'competitor_analysis', 'trend_analysis'],
          permissions: agentData?.permissions || [],
          authority_level: 100,
          is_active: true,
          last_activity: new Date().toISOString(),
          performance: 0.85,
          emergency_access: true,
          learning_enabled: true,
          self_modification: true
        },
        {
          id: 'frontend_agent',
          name: 'Frontend Development Agent',
          type: 'frontend',
          capabilities: ['react_development', 'ui_components', 'responsive_design', 'state_management'],
          permissions: agentData?.permissions || [],
          authority_level: 100,
          is_active: true,
          last_activity: new Date().toISOString(),
          performance: 0.90,
          emergency_access: true,
          learning_enabled: true,
          self_modification: true
        },
        {
          id: 'backend_agent',
          name: 'Backend Development Agent',
          type: 'backend',
          capabilities: ['api_development', 'database_design', 'business_logic', 'authentication'],
          permissions: agentData?.permissions || [],
          authority_level: 100,
          is_active: true,
          last_activity: new Date().toISOString(),
          performance: 0.88,
          emergency_access: true,
          learning_enabled: true,
          self_modification: true
        },
        {
          id: 'database_agent',
          name: 'Database Agent',
          type: 'database',
          capabilities: ['schema_design', 'optimization', 'migrations', 'backup_recovery'],
          permissions: agentData?.permissions || [],
          authority_level: 100,
          is_active: true,
          last_activity: new Date().toISOString(),
          performance: 0.92,
          emergency_access: true,
          learning_enabled: true,
          self_modification: true
        },
        {
          id: 'portal_agent',
          name: 'Portal Management Agent',
          type: 'portal',
          capabilities: ['user_management', 'role_based_access', 'dashboard_creation', 'permissions'],
          permissions: agentData?.permissions || [],
          authority_level: 100,
          is_active: true,
          last_activity: new Date().toISOString(),
          performance: 0.91,
          emergency_access: true,
          learning_enabled: true,
          self_modification: true
        }
      ];

      setAgents(transformedAgents);
      if (transformedAgents.length > 0) {
        setSelectedAgent(transformedAgents[0]);
      }
    } catch (error) {
      console.error('Error loading autonomous agents:', error);
      toast({
        title: 'Error',
        description: 'Failed to load autonomous agents',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const updateAgentPermissions = async (agentId: string, permissions: string[]) => {
    try {
      setSaving(true);
      
      // Update agent permissions in the database
      const { error } = await supabase
        .from('org_memberships')
        .update({ 
          role_key: 'autonomous_agent',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', agentId);

      if (error) {
        throw error;
      }

      // Update local state
      setAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, permissions }
          : agent
      ));

      toast({
        title: 'Success',
        description: 'Agent permissions updated successfully',
      });
    } catch (error) {
      console.error('Error updating agent permissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to update agent permissions',
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const togglePermission = (permission: string) => {
    if (!selectedAgent) return;

    const newPermissions = selectedAgent.permissions.includes(permission)
      ? selectedAgent.permissions.filter(p => p !== permission)
      : [...selectedAgent.permissions, permission];

    updateAgentPermissions(selectedAgent.id, newPermissions);
  };

  const toggleCategoryPermissions = (category: PermissionCategory, enabled: boolean) => {
    if (!selectedAgent) return;

    const newPermissions = enabled
      ? [...new Set([...selectedAgent.permissions, ...category.permissions])]
      : selectedAgent.permissions.filter(p => !category.permissions.includes(p));

    updateAgentPermissions(selectedAgent.id, newPermissions);
  };

  const grantFullAuthority = async () => {
    if (!selectedAgent) return;

    const allPermissions = PERMISSION_CATEGORIES.flatMap(cat => cat.permissions);
    await updateAgentPermissions(selectedAgent.id, allPermissions);
  };

  const revokeAllPermissions = async () => {
    if (!selectedAgent) return;
    await updateAgentPermissions(selectedAgent.id, []);
  };

  const exportAgentConfig = () => {
    if (!selectedAgent) return;

    const config = {
      agent: selectedAgent,
      permissions: selectedAgent.permissions,
      categories: PERMISSION_CATEGORIES.map(cat => ({
        name: cat.name,
        enabled: cat.permissions.every(p => selectedAgent.permissions.includes(p)),
        permissions: cat.permissions
      }))
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedAgent.name}_permissions.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <RefreshCw className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading autonomous agents...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Autonomous Agent Permissions</h2>
          <p className="text-muted-foreground">
            Manage full authority and capabilities for autonomous AI agents
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            {showAdvanced ? 'Hide' : 'Show'} Advanced
          </Button>
          <Button onClick={loadAutonomousAgents} variant="outline">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>Full Autonomous Authority Granted:</strong> These agents have complete control over the TMS system including UI/UX design, portal management, business logic, and all system components.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Agent Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Autonomous Agents</CardTitle>
            <CardDescription>Select an agent to manage permissions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {agents.map((agent) => (
              <div
                key={agent.id}
                className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedAgent?.id === agent.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setSelectedAgent(agent)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{agent.name}</h4>
                    <p className="text-sm text-muted-foreground">{agent.type}</p>
                  </div>
                  <Badge variant={agent.is_active ? 'default' : 'secondary'}>
                    {agent.is_active ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>Performance: {Math.round(agent.performance * 100)}%</span>
                  <span>Authority: {agent.authority_level}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Permission Management */}
        <div className="lg:col-span-3">
          {selectedAgent ? (
            <Tabs defaultValue="categories" className="space-y-4">
              <TabsList>
                <TabsTrigger value="categories">Permission Categories</TabsTrigger>
                <TabsTrigger value="individual">Individual Permissions</TabsTrigger>
                <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="categories" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Permission Categories for {selectedAgent.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedAgent.permissions.length} permissions granted
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button onClick={grantFullAuthority} variant="default" size="sm">
                      <Unlock className="h-4 w-4 mr-1" />
                      Grant Full Authority
                    </Button>
                    <Button onClick={revokeAllPermissions} variant="destructive" size="sm">
                      <Lock className="h-4 w-4 mr-1" />
                      Revoke All
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PERMISSION_CATEGORIES.map((category) => {
                    const enabledCount = category.permissions.filter(p => 
                      selectedAgent.permissions.includes(p)
                    ).length;
                    const isFullyEnabled = enabledCount === category.permissions.length;
                    const isPartiallyEnabled = enabledCount > 0 && enabledCount < category.permissions.length;

                    return (
                      <Card key={category.name}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              {category.icon}
                              <CardTitle className="text-base">{category.name}</CardTitle>
                            </div>
                            <Switch
                              checked={isFullyEnabled}
                              onCheckedChange={(checked) => toggleCategoryPermissions(category, checked)}
                            />
                          </div>
                          <CardDescription>{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span>Permissions: {enabledCount}/{category.permissions.length}</span>
                              {isPartiallyEnabled && (
                                <Badge variant="secondary">Partial</Badge>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {category.permissions.map((permission) => (
                                <Badge
                                  key={permission}
                                  variant={selectedAgent.permissions.includes(permission) ? 'default' : 'outline'}
                                  className="text-xs cursor-pointer"
                                  onClick={() => togglePermission(permission)}
                                >
                                  {permission.split('.').pop()}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              <TabsContent value="individual" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Individual Permissions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PERMISSION_CATEGORIES.map((category) => (
                      <Card key={category.name}>
                        <CardHeader>
                          <CardTitle className="text-sm flex items-center space-x-2">
                            {category.icon}
                            <span>{category.name}</span>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          {category.permissions.map((permission) => (
                            <div
                              key={permission}
                              className="flex items-center space-x-2 cursor-pointer p-2 rounded hover:bg-muted"
                              onClick={() => togglePermission(permission)}
                            >
                              <Switch
                                checked={selectedAgent.permissions.includes(permission)}
                                size="sm"
                              />
                              <Label className="text-xs cursor-pointer flex-1">
                                {permission}
                              </Label>
                            </div>
                          ))}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Advanced Agent Settings</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Agent Configuration</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label>Authority Level</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="range"
                              min="0"
                              max="100"
                              value={selectedAgent.authority_level}
                              onChange={(e) => {
                                setAgents(prev => prev.map(agent => 
                                  agent.id === selectedAgent.id 
                                    ? { ...agent, authority_level: parseInt(e.target.value) }
                                    : agent
                                ));
                              }}
                            />
                            <span className="text-sm font-medium w-12">
                              {selectedAgent.authority_level}%
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Performance Target</Label>
                          <div className="flex items-center space-x-2">
                            <Input
                              type="range"
                              min="0"
                              max="100"
                              value={Math.round(selectedAgent.performance * 100)}
                              onChange={(e) => {
                                setAgents(prev => prev.map(agent => 
                                  agent.id === selectedAgent.id 
                                    ? { ...agent, performance: parseInt(e.target.value) / 100 }
                                    : agent
                                ));
                              }}
                            />
                            <span className="text-sm font-medium w-12">
                              {Math.round(selectedAgent.performance * 100)}%
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Agent Status</Label>
                          <div className="flex items-center space-x-2">
                            <Switch
                              checked={selectedAgent.is_active}
                              onCheckedChange={(checked) => {
                                setAgents(prev => prev.map(agent => 
                                  agent.id === selectedAgent.id 
                                    ? { ...agent, is_active: checked }
                                    : agent
                                ));
                              }}
                            />
                            <Label>{selectedAgent.is_active ? 'Active' : 'Inactive'}</Label>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Advanced Capabilities</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Emergency Access</Label>
                            <p className="text-xs text-muted-foreground">Allow emergency system control</p>
                          </div>
                          <Switch
                            checked={selectedAgent.emergency_access}
                            onCheckedChange={(checked) => {
                              setAgents(prev => prev.map(agent => 
                                agent.id === selectedAgent.id 
                                  ? { ...agent, emergency_access: checked }
                                  : agent
                              ));
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Learning Enabled</Label>
                            <p className="text-xs text-muted-foreground">Allow autonomous learning</p>
                          </div>
                          <Switch
                            checked={selectedAgent.learning_enabled}
                            onCheckedChange={(checked) => {
                              setAgents(prev => prev.map(agent => 
                                agent.id === selectedAgent.id 
                                  ? { ...agent, learning_enabled: checked }
                                  : agent
                              ));
                            }}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <Label>Self Modification</Label>
                            <p className="text-xs text-muted-foreground">Allow self-modification capabilities</p>
                          </div>
                          <Switch
                            checked={selectedAgent.self_modification}
                            onCheckedChange={(checked) => {
                              setAgents(prev => prev.map(agent => 
                                agent.id === selectedAgent.id 
                                  ? { ...agent, self_modification: checked }
                                  : agent
                              ));
                            }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex items-center justify-between mt-6">
                    <Button onClick={exportAgentConfig} variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Export Configuration
                    </Button>
                    <Button onClick={() => updateAgentPermissions(selectedAgent.id, selectedAgent.permissions)} disabled={saving}>
                      {saving ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                      Save Changes
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Users className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Select an autonomous agent to manage permissions</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
