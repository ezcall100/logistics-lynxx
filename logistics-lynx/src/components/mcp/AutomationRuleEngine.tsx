import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Plus, 
  Trash2, 
  Save, 
  Play, 
  Pause, 
  Settings, 
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Copy,
  Download,
  GitBranch,
  Activity,
  Shield,
  Bell,
  Database,
  Code,
  TestTube
} from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'draft' | 'archived';
  priority: 'low' | 'medium' | 'high' | 'critical';
  triggers: Array<{
    type: string;
    config: Record<string, any>;
    conditions: Array<{
      field: string;
      operator: string;
      value: any;
    }>;
  }>;
  actions: Array<{
    type: string;
    agentType?: string;
    config: Record<string, any>;
    fallback?: {
      type: string;
      config: Record<string, any>;
    };
  }>;
  conditions: Array<{
    field: string;
    operator: string;
    value: any;
    logicalOperator?: 'AND' | 'OR';
  }>;
  schedule?: {
    type: 'cron' | 'interval' | 'once';
    config: Record<string, any>;
  };
  createdAt: string;
  updatedAt: string;
  lastExecuted?: string;
  executionCount: number;
  successCount: number;
  failureCount: number;
}

interface AutomationRuleEngineProps {
  className?: string;
}

const TRIGGER_TYPES = [
  { value: 'webhook', label: 'Webhook', icon: '🔗' },
  { value: 'schedule', label: 'Schedule', icon: '⏰' },
  { value: 'database', label: 'Database Change', icon: '🗄️' },
  { value: 'api', label: 'API Call', icon: '🌐' },
  { value: 'file', label: 'File Change', icon: '📁' },
  { value: 'email', label: 'Email', icon: '📧' },
  { value: 'slack', label: 'Slack Message', icon: '💬' },
  { value: 'manual', label: 'Manual Trigger', icon: '👆' }
];

const ACTION_TYPES = [
  { value: 'agent', label: 'Agent Action', icon: '🤖' },
  { value: 'webhook', label: 'Webhook Call', icon: '🔗' },
  { value: 'email', label: 'Send Email', icon: '📧' },
  { value: 'notification', label: 'Notification', icon: '🔔' },
  { value: 'database', label: 'Database Update', icon: '🗄️' },
  { value: 'file', label: 'File Operation', icon: '📁' },
  { value: 'api', label: 'API Call', icon: '🌐' },
  { value: 'script', label: 'Script Execution', icon: '📜' }
];

const OPERATORS = [
  { value: 'equals', label: 'Equals' },
  { value: 'not_equals', label: 'Not Equals' },
  { value: 'contains', label: 'Contains' },
  { value: 'not_contains', label: 'Not Contains' },
  { value: 'greater_than', label: 'Greater Than' },
  { value: 'less_than', label: 'Less Than' },
  { value: 'greater_than_or_equal', label: 'Greater Than or Equal' },
  { value: 'less_than_or_equal', label: 'Less Than or Equal' },
  { value: 'starts_with', label: 'Starts With' },
  { value: 'ends_with', label: 'Ends With' },
  { value: 'regex', label: 'Regex Match' }
];

export function AutomationRuleEngine({ className }: AutomationRuleEngineProps) {
  const [rules, setRules] = useState<AutomationRule[]>([]);
  const [selectedRule, setSelectedRule] = useState<AutomationRule | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Mock data for demonstration
  const mockRules: AutomationRule[] = [
    {
      id: 'rule-1',
      name: 'High CPU Alert Handler',
      description: 'Automatically scale down agents when CPU usage exceeds 90%',
      status: 'active',
      priority: 'high',
      triggers: [
        {
          type: 'webhook',
          config: {
            endpoint: '/api/monitoring/alerts',
            method: 'POST'
          },
          conditions: [
            {
              field: 'cpu_usage',
              operator: 'greater_than',
              value: 90
            }
          ]
        }
      ],
      actions: [
        {
          type: 'agent',
          agentType: 'automation-agent',
          config: {
            action: 'scale_down',
            target: 'overloaded_agents',
            concurrency: 1
          },
          fallback: {
            type: 'notification',
            config: {
              channel: 'slack',
              message: 'Failed to scale down agents automatically'
            }
          }
        }
      ],
      conditions: [
        {
          field: 'environment',
          operator: 'equals',
          value: 'production'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastExecuted: new Date().toISOString(),
      executionCount: 15,
      successCount: 14,
      failureCount: 1
    },
    {
      id: 'rule-2',
      name: 'Database Backup Scheduler',
      description: 'Automated daily database backup at 2 AM',
      status: 'active',
      priority: 'medium',
      triggers: [
        {
          type: 'schedule',
          config: {
            cron: '0 2 * * *'
          },
          conditions: []
        }
      ],
      actions: [
        {
          type: 'agent',
          agentType: 'data-pipeline-agent',
          config: {
            action: 'backup_database',
            retention: '7_days',
            compression: true
          },
          fallback: {
            type: 'email',
            config: {
              to: 'admin@company.com',
              subject: 'Database backup failed',
              body: 'Manual intervention required'
            }
          }
        }
      ],
      conditions: [],
      schedule: {
        type: 'cron',
        config: {
          expression: '0 2 * * *'
        }
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastExecuted: new Date(Date.now() - 86400000).toISOString(),
      executionCount: 30,
      successCount: 30,
      failureCount: 0
    },
    {
      id: 'rule-3',
      name: 'Failed Deployment Rollback',
      description: 'Automatically rollback deployment if health checks fail',
      status: 'active',
      priority: 'critical',
      triggers: [
        {
          type: 'webhook',
          config: {
            endpoint: '/api/deployment/health-check',
            method: 'POST'
          },
          conditions: [
            {
              field: 'health_status',
              operator: 'equals',
              value: 'failed'
            }
          ]
        }
      ],
      actions: [
        {
          type: 'agent',
          agentType: 'automation-agent',
          config: {
            action: 'rollback_deployment',
            target: 'latest_deployment',
            timeout: 300
          },
          fallback: {
            type: 'webhook',
            config: {
              url: 'https://pagerduty.com/api/incidents',
              method: 'POST',
              body: { severity: 'critical' }
            }
          }
        }
      ],
      conditions: [
        {
          field: 'deployment_type',
          operator: 'equals',
          value: 'production'
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      lastExecuted: new Date().toISOString(),
      executionCount: 3,
      successCount: 3,
      failureCount: 0
    }
  ];

  useEffect(() => {
    setRules(mockRules);
  }, []);

  const handleCreateRule = () => {
    const newRule: AutomationRule = {
      id: `rule-${Date.now()}`,
      name: 'New Automation Rule',
      description: 'Description of the new automation rule',
      status: 'draft',
      priority: 'medium',
      triggers: [],
      actions: [],
      conditions: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      executionCount: 0,
      successCount: 0,
      failureCount: 0
    };
    setRules(prev => [...prev, newRule]);
    setSelectedRule(newRule);
    setIsCreating(true);
    setIsEditing(true);
  };

  const handleSaveRule = (rule: AutomationRule) => {
    setRules(prev => prev.map(r => 
      r.id === rule.id 
        ? { ...rule, updatedAt: new Date().toISOString() }
        : r
    ));
    setIsEditing(false);
    setIsCreating(false);
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules(prev => prev.filter(r => r.id !== ruleId));
    if (selectedRule?.id === ruleId) {
      setSelectedRule(null);
    }
  };

  const handleToggleRule = (ruleId: string) => {
    setRules(prev => prev.map(r => 
      r.id === ruleId 
        ? { ...r, status: r.status === 'active' ? 'inactive' : 'active' }
        : r
    ));
  };

  const handleExecuteRule = (ruleId: string) => {
    // Simulate rule execution
    setRules(prev => prev.map(r => 
      r.id === ruleId 
        ? { 
            ...r, 
            lastExecuted: new Date().toISOString(),
            executionCount: r.executionCount + 1,
            successCount: r.successCount + 1
          }
        : r
    ));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'outline';
      case 'draft': return 'secondary';
      case 'archived': return 'outline';
      default: return 'outline';
    }
  };

  const getSuccessRate = (rule: AutomationRule) => {
    if (rule.executionCount === 0) return 0;
    return (rule.successCount / rule.executionCount) * 100;
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Automation Rule Engine</h2>
          <p className="text-muted-foreground">
            Event triggers, conditional flows, and fallback handling
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditing(!isEditing)}
          >
            <Settings className="w-4 h-4 mr-2" />
            {isEditing ? 'View' : 'Edit'}
          </Button>
          <Button
            size="sm"
            onClick={handleCreateRule}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Rule
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rules List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Automation Rules</span>
                <Badge variant="outline">{rules.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {rules.map(rule => (
                  <div
                    key={rule.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedRule?.id === rule.id 
                        ? 'border-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => setSelectedRule(rule)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{rule.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Badge variant={getPriorityColor(rule.priority)} size="sm">
                          {rule.priority}
                        </Badge>
                        <Badge variant={getStatusColor(rule.status)} size="sm">
                          {rule.status}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {rule.description}
                    </p>
                    <div className="flex items-center justify-between text-xs">
                      <span>Success Rate: {getSuccessRate(rule).toFixed(1)}%</span>
                      <span>{rule.executionCount} executions</span>
                    </div>
                    {isEditing && (
                      <div className="flex items-center space-x-1 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleRule(rule.id);
                          }}
                        >
                          {rule.status === 'active' ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleExecuteRule(rule.id);
                          }}
                        >
                          <Zap className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-6 px-2"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRule(rule.id);
                          }}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Rule Details */}
        <div className="lg:col-span-2">
          {selectedRule ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{selectedRule.name}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={getPriorityColor(selectedRule.priority)}>
                      {selectedRule.priority}
                    </Badge>
                    <Badge variant={getStatusColor(selectedRule.status)}>
                      {selectedRule.status}
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={selectedRule.name}
                      onChange={(e) => setSelectedRule(prev => prev ? { ...prev, name: e.target.value } : null)}
                      disabled={!isEditing}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Description</label>
                    <Textarea
                      value={selectedRule.description}
                      onChange={(e) => setSelectedRule(prev => prev ? { ...prev, description: e.target.value } : null)}
                      disabled={!isEditing}
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Priority</label>
                      <Select
                        value={selectedRule.priority}
                        onValueChange={(value) => setSelectedRule(prev => prev ? { ...prev, priority: value as any } : null)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Status</label>
                      <Select
                        value={selectedRule.status}
                        onValueChange={(value) => setSelectedRule(prev => prev ? { ...prev, status: value as any } : null)}
                        disabled={!isEditing}
                      >
                        <SelectTrigger className="mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Triggers */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Triggers</h4>
                  <div className="space-y-3">
                    {selectedRule.triggers.map((trigger, index) => (
                      <div key={index} className="p-3 border rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{trigger.type}</span>
                          {isEditing && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => {
                                const newTriggers = selectedRule.triggers.filter((_, i) => i !== index);
                                setSelectedRule(prev => prev ? { ...prev, triggers: newTriggers } : null);
                              }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {Object.entries(trigger.config).map(([key, value]) => (
                            <div key={key}>{key}: {JSON.stringify(value)}</div>
                          ))}
                        </div>
                      </div>
                    ))}
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newTrigger = {
                            type: 'webhook',
                            config: {},
                            conditions: []
                          };
                          setSelectedRule(prev => prev ? {
                            ...prev,
                            triggers: [...prev.triggers, newTrigger]
                          } : null);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Trigger
                      </Button>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Actions</h4>
                  <div className="space-y-3">
                    {selectedRule.actions.map((action, index) => (
                      <div key={index} className="p-3 border rounded">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{action.type}</span>
                          {isEditing && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => {
                                const newActions = selectedRule.actions.filter((_, i) => i !== index);
                                setSelectedRule(prev => prev ? { ...prev, actions: newActions } : null);
                              }}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          )}
                        </div>
                        {action.agentType && (
                          <div className="text-xs text-muted-foreground mb-2">
                            Agent: {action.agentType}
                          </div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {Object.entries(action.config).map(([key, value]) => (
                            <div key={key}>{key}: {JSON.stringify(value)}</div>
                          ))}
                        </div>
                        {action.fallback && (
                          <div className="mt-2 pt-2 border-t">
                            <div className="text-xs font-medium text-muted-foreground">Fallback:</div>
                            <div className="text-xs text-muted-foreground">
                              {action.fallback.type}: {JSON.stringify(action.fallback.config)}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const newAction = {
                            type: 'agent',
                            config: {}
                          };
                          setSelectedRule(prev => prev ? {
                            ...prev,
                            actions: [...prev.actions, newAction]
                          } : null);
                        }}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Action
                      </Button>
                    )}
                  </div>
                </div>

                {/* Statistics */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Statistics</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted rounded">
                      <div className="text-lg font-bold">{selectedRule.executionCount}</div>
                      <div className="text-xs text-muted-foreground">Total Executions</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded">
                      <div className="text-lg font-bold">{selectedRule.successCount}</div>
                      <div className="text-xs text-muted-foreground">Successful</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded">
                      <div className="text-lg font-bold">{selectedRule.failureCount}</div>
                      <div className="text-xs text-muted-foreground">Failed</div>
                    </div>
                  </div>
                  {selectedRule.lastExecuted && (
                    <div className="mt-3 text-xs text-muted-foreground">
                      Last executed: {new Date(selectedRule.lastExecuted).toLocaleString()}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                {isEditing && (
                  <div className="flex items-center space-x-2">
                    <Button
                      onClick={() => handleSaveRule(selectedRule)}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Rule
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setIsCreating(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Select a rule to view details</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
