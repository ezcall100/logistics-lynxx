import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Plus, 
  Trash2, 
  Save, 
  Play, 
  Pause, 
  Settings, 
  GitBranch,
  ArrowRight,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Copy,
  Download
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  name: string;
  type: 'agent' | 'condition' | 'delay' | 'webhook' | 'notification';
  agentType?: string;
  config: Record<string, any>;
  position: { x: number; y: number };
  connections: string[];
  status: 'idle' | 'running' | 'completed' | 'failed';
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  version: string;
  status: 'draft' | 'active' | 'paused' | 'archived';
  steps: WorkflowStep[];
  triggers: Array<{
    type: string;
    config: Record<string, any>;
  }>;
  createdAt: string;
  updatedAt: string;
}

interface WorkflowBuilderProps {
  className?: string;
}

const AGENT_TYPES = [
  'frontend-dev-agent',
  'backend-api-agent',
  'mcp-kernel',
  'uiux-agent',
  'ml-agent',
  'data-pipeline-agent',
  'automation-agent',
  'integration-agent',
  'qa-agent',
  'security-agent',
  'compliance-agent',
  'support-agent',
  'onboarding-agent',
  'feedback-agent'
];

const STEP_TYPES = [
  { value: 'agent', label: 'Agent Action', icon: '🤖' },
  { value: 'condition', label: 'Condition', icon: '🔀' },
  { value: 'delay', label: 'Delay', icon: '⏱️' },
  { value: 'webhook', label: 'Webhook', icon: '🔗' },
  { value: 'notification', label: 'Notification', icon: '📢' }
];

export function WorkflowBuilder({ className }: WorkflowBuilderProps) {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dragItem, setDragItem] = useState<WorkflowStep | null>(null);

  // Mock workflow data
  const mockWorkflow: Workflow = {
    id: 'workflow-1',
    name: 'Shipper Portal Deployment',
    description: 'Automated workflow for deploying shipper portal features',
    version: '1.0.0',
    status: 'active',
    steps: [
      {
        id: 'step-1',
        name: 'Code Review',
        type: 'agent',
        agentType: 'qa-agent',
        config: {
          reviewType: 'automated',
          coverage: 80,
          lintRules: 'strict'
        },
        position: { x: 100, y: 100 },
        connections: ['step-2'],
        status: 'completed'
      },
      {
        id: 'step-2',
        name: 'Security Scan',
        type: 'agent',
        agentType: 'security-agent',
        config: {
          scanType: 'vulnerability',
          severity: 'high'
        },
        position: { x: 300, y: 100 },
        connections: ['step-3'],
        status: 'running'
      },
      {
        id: 'step-3',
        name: 'Deploy to Staging',
        type: 'agent',
        agentType: 'automation-agent',
        config: {
          environment: 'staging',
          rollback: true
        },
        position: { x: 500, y: 100 },
        connections: ['step-4'],
        status: 'idle'
      },
      {
        id: 'step-4',
        name: 'Integration Tests',
        type: 'agent',
        agentType: 'qa-agent',
        config: {
          testType: 'integration',
          timeout: 300
        },
        position: { x: 700, y: 100 },
        connections: ['step-5'],
        status: 'idle'
      },
      {
        id: 'step-5',
        name: 'Deploy to Production',
        type: 'agent',
        agentType: 'automation-agent',
        config: {
          environment: 'production',
          canary: true
        },
        position: { x: 900, y: 100 },
        connections: [],
        status: 'idle'
      }
    ],
    triggers: [
      {
        type: 'git_push',
        config: {
          branch: 'main',
          paths: ['src/pages/shipper/**']
        }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  const [currentWorkflow, setCurrentWorkflow] = useState<Workflow>(mockWorkflow);

  const handleAddStep = useCallback((type: string, position: { x: number; y: number }) => {
    const newStep: WorkflowStep = {
      id: `step-${Date.now()}`,
      name: `New ${type} Step`,
      type: type as WorkflowStep['type'],
      config: {},
      position,
      connections: [],
      status: 'idle'
    };

    if (type === 'agent') {
      newStep.agentType = AGENT_TYPES[0];
    }

    setCurrentWorkflow(prev => ({
      ...prev,
      steps: [...prev.steps, newStep]
    }));
  }, []);

  const handleUpdateStep = useCallback((stepId: string, updates: Partial<WorkflowStep>) => {
    setCurrentWorkflow(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === stepId ? { ...step, ...updates } : step
      )
    }));
  }, []);

  const handleDeleteStep = useCallback((stepId: string) => {
    setCurrentWorkflow(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== stepId)
    }));
  }, []);

  const handleConnectSteps = useCallback((fromStepId: string, toStepId: string) => {
    setCurrentWorkflow(prev => ({
      ...prev,
      steps: prev.steps.map(step => 
        step.id === fromStepId 
          ? { ...step, connections: [...step.connections, toStepId] }
          : step
      )
    }));
  }, []);

  const handleSaveWorkflow = useCallback(() => {
    setCurrentWorkflow(prev => ({
      ...prev,
      updatedAt: new Date().toISOString()
    }));
    setIsEditing(false);
  }, []);

  const handleRunWorkflow = useCallback(() => {
    // Simulate workflow execution
    setCurrentWorkflow(prev => ({
      ...prev,
      steps: prev.steps.map(step => ({
        ...step,
        status: step.status === 'idle' ? 'running' : step.status
      }))
    }));
  }, []);

  const getStepIcon = (type: string) => {
    const stepType = STEP_TYPES.find(st => st.value === type);
    return stepType?.icon || '📋';
  };

  const getStepStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'running': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workflow Builder</h2>
          <p className="text-muted-foreground">
            Drag-and-drop interface for chaining agent actions
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
            variant="outline"
            size="sm"
            onClick={handleSaveWorkflow}
            disabled={!isEditing}
          >
            <Save className="w-4 h-4 mr-2" />
            Save
          </Button>
          <Button
            size="sm"
            onClick={handleRunWorkflow}
            disabled={isEditing}
          >
            <Play className="w-4 h-4 mr-2" />
            Run Workflow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Workflow Canvas */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <GitBranch className="w-5 h-5 mr-2" />
                  {currentWorkflow.name}
                </span>
                <Badge variant={currentWorkflow.status === 'active' ? 'default' : 'outline'}>
                  {currentWorkflow.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative min-h-[600px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
                {/* Workflow Steps */}
                {currentWorkflow.steps.map((step, index) => (
                  <div
                    key={step.id}
                    className="absolute"
                    style={{
                      left: step.position.x,
                      top: step.position.y
                    }}
                  >
                    <Card className="w-64 cursor-move">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <span className="text-lg mr-2">{getStepIcon(step.type)}</span>
                            <h4 className="font-medium text-sm">{step.name}</h4>
                          </div>
                          <Badge variant={getStepStatusColor(step.status)} size="sm">
                            {step.status}
                          </Badge>
                        </div>
                        
                        {step.type === 'agent' && step.agentType && (
                          <div className="text-xs text-muted-foreground mb-2">
                            Agent: {step.agentType}
                          </div>
                        )}
                        
                        {isEditing && (
                          <div className="flex items-center space-x-1 mt-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-6 px-2"
                              onClick={() => handleDeleteStep(step.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    
                    {/* Connection Lines */}
                    {step.connections.map((connectionId, connIndex) => {
                      const targetStep = currentWorkflow.steps.find(s => s.id === connectionId);
                      if (!targetStep) return null;
                      
                      return (
                        <svg
                          key={`${step.id}-${connectionId}`}
                          className="absolute pointer-events-none"
                          style={{
                            left: step.position.x + 256,
                            top: step.position.y + 40,
                            width: targetStep.position.x - step.position.x - 256,
                            height: 2
                          }}
                        >
                          <line
                            x1="0"
                            y1="0"
                            x2={targetStep.position.x - step.position.x - 256}
                            y2="0"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                          />
                          <polygon
                            points="0,0 10,5 0,10"
                            fill="currentColor"
                            transform={`translate(${targetStep.position.x - step.position.x - 266}, -5)`}
                          />
                        </svg>
                      );
                    })}
                  </div>
                ))}
                
                {/* Add Step Button */}
                {isEditing && (
                  <div className="absolute bottom-4 right-4">
                    <Button
                      size="sm"
                      onClick={() => handleAddStep('agent', { x: 100, y: 400 })}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Step
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Workflow Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Workflow Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="text-xs font-medium">Name</label>
                <Input
                  value={currentWorkflow.name}
                  onChange={(e) => setCurrentWorkflow(prev => ({ ...prev, name: e.target.value }))}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
              <div>
                <label className="text-xs font-medium">Description</label>
                <Textarea
                  value={currentWorkflow.description}
                  onChange={(e) => setCurrentWorkflow(prev => ({ ...prev, description: e.target.value }))}
                  disabled={!isEditing}
                  className="text-sm"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-xs font-medium">Version</label>
                <Input
                  value={currentWorkflow.version}
                  onChange={(e) => setCurrentWorkflow(prev => ({ ...prev, version: e.target.value }))}
                  disabled={!isEditing}
                  className="text-sm"
                />
              </div>
            </CardContent>
          </Card>

          {/* Step Types */}
          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Step Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {STEP_TYPES.map((stepType) => (
                  <div
                    key={stepType.value}
                    className="flex items-center p-2 border rounded cursor-pointer hover:bg-muted/50"
                    onClick={() => handleAddStep(stepType.value, { x: 100, y: 200 })}
                  >
                    <span className="mr-2">{stepType.icon}</span>
                    <span className="text-sm">{stepType.label}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Agent Types */}
          {isEditing && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Available Agents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {AGENT_TYPES.map((agentType) => (
                  <div
                    key={agentType}
                    className="flex items-center p-2 border rounded cursor-pointer hover:bg-muted/50"
                    onClick={() => handleAddStep('agent', { x: 100, y: 200 })}
                  >
                    <span className="mr-2">🤖</span>
                    <span className="text-xs">{agentType}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Workflow Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Total Steps:</span>
                <span>{currentWorkflow.steps.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Completed:</span>
                <span>{currentWorkflow.steps.filter(s => s.status === 'completed').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Running:</span>
                <span>{currentWorkflow.steps.filter(s => s.status === 'running').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Failed:</span>
                <span>{currentWorkflow.steps.filter(s => s.status === 'failed').length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
