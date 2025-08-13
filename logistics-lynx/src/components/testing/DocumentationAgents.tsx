import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Shield, 
  Scale, 
  Eye, 
  Copyright, 
  Award,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  Clock,
  Brain,
  Activity,
  Download,
  ExternalLink,
  TrendingUp
} from 'lucide-react';

interface DocumentationAgent {
  id: string;
  name: string;
  type: 'compliance' | 'terms' | 'privacy' | 'trademark' | 'copyright' | 'patent';
  status: 'idle' | 'analyzing' | 'generating' | 'reviewing' | 'completed' | 'error';
  progress: number;
  documents_generated: number;
  last_updated: string;
  compliance_score: number;
  icon: React.ComponentType<unknown>;
  color: string;
  bgColor: string;
  description: string;
  tasks: string[];
}

export const DocumentationAgents: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [overallProgress, setOverallProgress] = useState(0);
  const { toast } = useToast();

  const [agents, setAgents] = useState<DocumentationAgent[]>([
    {
      id: 'compliance-agent',
      name: 'Compliance Agent',
      type: 'compliance',
      status: 'idle',
      progress: 0,
      documents_generated: 0,
      last_updated: new Date().toISOString(),
      compliance_score: 98.5,
      icon: Shield,
      color: 'text-green-600',
      bgColor: 'bg-green-50 border-green-200',
      description: 'Ensures TMS compliance with transportation regulations and industry standards',
      tasks: [
        'DOT compliance documentation',
        'FMCSA regulation adherence',
        'Safety protocol documentation',
        'Audit trail generation'
      ]
    },
    {
      id: 'terms-agent',
      name: 'Terms of Service Agent',
      type: 'terms',
      status: 'idle',
      progress: 0,
      documents_generated: 0,
      last_updated: new Date().toISOString(),
      compliance_score: 96.2,
      icon: Scale,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 border-blue-200',
      description: 'Generates and maintains comprehensive terms of service for TMS platform',
      tasks: [
        'User agreement templates',
        'Service level agreements',
        'Liability limitation clauses',
        'Dispute resolution procedures'
      ]
    },
    {
      id: 'privacy-agent',
      name: 'Privacy Policy Agent',
      type: 'privacy',
      status: 'idle',
      progress: 0,
      documents_generated: 0,
      last_updated: new Date().toISOString(),
      compliance_score: 99.1,
      icon: Eye,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 border-purple-200',
      description: 'Creates GDPR and CCPA compliant privacy policies and data handling procedures',
      tasks: [
        'GDPR compliance documentation',
        'CCPA privacy notices',
        'Data retention policies',
        'Cookie and tracking disclosures'
      ]
    },
    {
      id: 'trademark-agent',
      name: 'Trademark Agent',
      type: 'trademark',
      status: 'idle',
      progress: 0,
      documents_generated: 0,
      last_updated: new Date().toISOString(),
      compliance_score: 94.7,
      icon: Award,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 border-orange-200',
      description: 'Manages trademark registrations and intellectual property documentation',
      tasks: [
        'Trademark application forms',
        'Brand protection guidelines',
        'Usage rights documentation',
        'Infringement monitoring reports'
      ]
    },
    {
      id: 'copyright-agent',
      name: 'Copyright Agent',
      type: 'copyright',
      status: 'idle',
      progress: 0,
      documents_generated: 0,
      last_updated: new Date().toISOString(),
      compliance_score: 97.3,
      icon: Copyright,
      color: 'text-red-600',
      bgColor: 'bg-red-50 border-red-200',
      description: 'Handles copyright documentation and software licensing agreements',
      tasks: [
        'Software license agreements',
        'Open source compliance',
        'Copyright attribution notices',
        'DMCA takedown procedures'
      ]
    },
    {
      id: 'patent-agent',
      name: 'Patent Agent',
      type: 'patent',
      status: 'idle',
      progress: 0,
      documents_generated: 0,
      last_updated: new Date().toISOString(),
      compliance_score: 91.8,
      icon: Brain,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50 border-indigo-200',
      description: 'Manages patent applications and prior art research for TMS innovations',
      tasks: [
        'Patent application drafts',
        'Prior art search reports',
        'Innovation documentation',
        'Technical specification reviews'
      ]
    }
  ]);

  // Simulate agent work
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setAgents(prev => prev.map(agent => {
        if (agent.status === 'idle') {
          return {
            ...agent,
            status: 'analyzing' as const,
            progress: 5
          };
        } else if (agent.status === 'analyzing' && agent.progress < 30) {
          return {
            ...agent,
            progress: agent.progress + Math.random() * 10
          };
        } else if (agent.status === 'analyzing' && agent.progress >= 30) {
          return {
            ...agent,
            status: 'generating' as const
          };
        } else if (agent.status === 'generating' && agent.progress < 80) {
          return {
            ...agent,
            progress: agent.progress + Math.random() * 8
          };
        } else if (agent.status === 'generating' && agent.progress >= 80) {
          return {
            ...agent,
            status: 'reviewing' as const
          };
        } else if (agent.status === 'reviewing' && agent.progress < 100) {
          return {
            ...agent,
            progress: Math.min(agent.progress + Math.random() * 5, 100)
          };
        } else if (agent.status === 'reviewing' && agent.progress >= 100) {
          return {
            ...agent,
            status: 'completed' as const,
            documents_generated: agent.documents_generated + 1,
            last_updated: new Date().toISOString()
          };
        }
        return agent;
      }));

      // Update overall progress
      setOverallProgress(prev => Math.min(prev + 0.5, 100));
    }, 2000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const startDocumentationGeneration = () => {
    setIsRunning(true);
    setOverallProgress(0);
    setAgents(prev => prev.map(agent => ({ ...agent, status: 'idle' as const, progress: 0 })));
    
    toast({
      title: "Documentation Generation Started",
      description: "All documentation agents are now generating legal and compliance documents",
    });
  };

  const pauseGeneration = () => {
    setIsRunning(false);
    toast({
      title: "Documentation Generation Paused",
      description: "All agents have been paused",
      variant: "destructive"
    });
  };

  const resetAgents = () => {
    setIsRunning(false);
    setOverallProgress(0);
    setAgents(prev => prev.map(agent => ({
      ...agent,
      status: 'idle' as const,
      progress: 0,
      documents_generated: 0
    })));
    toast({
      title: "Documentation Agents Reset",
      description: "All agents have been reset to initial state"
    });
  };

  const getStatusIcon = (status: DocumentationAgent['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'analyzing':
      case 'generating':
      case 'reviewing': return <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: DocumentationAgent['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'error': return 'text-red-600 bg-red-50';
      case 'analyzing':
      case 'generating':
      case 'reviewing': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const totalDocuments = agents.reduce((sum, agent) => sum + agent.documents_generated, 0);
  const averageCompliance = agents.reduce((sum, agent) => sum + agent.compliance_score, 0) / agents.length;
  const completedAgents = agents.filter(agent => agent.status === 'completed').length;

  return (
    <div className="space-y-6">
      {/* Documentation Control Panel */}
      <Card className="border-2 border-slate-200 bg-slate-50/30">
        <CardHeader>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-slate-900">
                <FileText className="h-5 w-5" />
                Legal & Compliance Documentation Center
              </CardTitle>
              <CardDescription className="text-slate-700">
                Automated generation of legal documents, compliance reports, and intellectual property documentation
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant={isRunning ? "default" : "secondary"}>
                {isRunning ? 'Generating' : 'Idle'}
              </Badge>
              <Badge variant="outline">{totalDocuments} Documents</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Documentation Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalDocuments}</div>
              <div className="text-sm text-muted-foreground">Documents Generated</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedAgents}/6</div>
              <div className="text-sm text-muted-foreground">Agents Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{averageCompliance.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Compliance Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">100%</div>
              <div className="text-sm text-muted-foreground">Legal Coverage</div>
            </div>
          </div>

          {/* Overall Progress */}
          {isRunning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Overall Documentation Progress</span>
                <span>{overallProgress.toFixed(1)}%</span>
              </div>
              <Progress value={overallProgress} className="h-3" />
            </div>
          )}

          {/* Control Buttons */}
          <div className="flex gap-2 justify-center flex-wrap">
            <Button
              onClick={startDocumentationGeneration}
              disabled={isRunning}
              className="flex items-center gap-2"
            >
              <Play className="h-4 w-4" />
              Generate Documentation
            </Button>
            <Button
              onClick={pauseGeneration}
              disabled={!isRunning}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Pause className="h-4 w-4" />
              Pause Generation
            </Button>
            <Button
              onClick={resetAgents}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Reset Agents
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documentation Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {agents.map((agent) => {
          const IconComponent = agent.icon;
          
          return (
            <Card key={agent.id} className={`border-2 ${agent.bgColor} hover:shadow-lg transition-all duration-200`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent className={`h-5 w-5 ${agent.color}`} />
                    <CardTitle className="text-lg">{agent.name}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(agent.status)}
                    <Badge className={getStatusColor(agent.status)}>
                      {agent.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-sm">
                  {agent.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Progress Bar */}
                {agent.status !== 'idle' && (
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span>{Math.round(agent.progress)}%</span>
                    </div>
                    <Progress value={agent.progress} className="h-2" />
                  </div>
                )}

                {/* Agent Stats */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Documents:</span>
                    <div className="flex items-center gap-1">
                      <span className={`font-bold ${agent.color}`}>{agent.documents_generated}</span>
                      {agent.documents_generated > 0 && <TrendingUp className="h-3 w-3 text-green-600" />}
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Compliance:</span>
                    <p className={`font-bold ${agent.color}`}>{agent.compliance_score}%</p>
                  </div>
                </div>

                {/* Task List */}
                <div>
                  <h4 className="text-sm font-medium mb-2">Key Tasks:</h4>
                  <ul className="space-y-1 text-xs">
                    {agent.tasks.slice(0, 3).map((task, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-current rounded-full opacity-60" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                {agent.documents_generated > 0 && (
                  <div className="flex gap-2 pt-2 border-t">
                    <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
                      <Download className="h-3 w-3" />
                      Download
                    </Button>
                    <Button size="sm" variant="outline" className="flex items-center gap-1 text-xs">
                      <ExternalLink className="h-3 w-3" />
                      Review
                    </Button>
                  </div>
                )}

                {/* Last Updated */}
                {agent.documents_generated > 0 && (
                  <div className="text-xs text-muted-foreground pt-2 border-t">
                    Last updated: {new Date(agent.last_updated).toLocaleString()}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Legal Compliance Alert */}
      <Alert className="border-green-200 bg-green-50">
        <Shield className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <strong>Legal Compliance Status:</strong> All documentation agents are maintaining {averageCompliance.toFixed(1)}% compliance with current regulations. 
          Documents are automatically updated when regulations change.
        </AlertDescription>
      </Alert>
    </div>
  );
};