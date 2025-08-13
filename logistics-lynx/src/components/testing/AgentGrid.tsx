import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, Loader2, Clock } from 'lucide-react';

interface Agent {
  id: string;
  name: string;
  type: string;
  status: 'healthy' | 'warning' | 'error' | 'checking' | 'working';
  lastCheck: string;
  responseTime: number;
  message: string;
}

interface AgentGridProps {
  agents: Agent[];
  maxVisible?: number;
}

export const AgentGrid: React.FC<AgentGridProps> = ({ agents, maxVisible = 50 }) => {
  const visibleAgents = agents.slice(0, maxVisible);
  const remainingCount = Math.max(0, agents.length - maxVisible);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="h-3 w-3 text-green-600" />;
      case 'warning': return <AlertTriangle className="h-3 w-3 text-yellow-600" />;
      case 'error': return <AlertTriangle className="h-3 w-3 text-red-600" />;
      case 'checking': return <Loader2 className="h-3 w-3 text-blue-600 animate-spin" />;
      case 'working': return <Loader2 className="h-3 w-3 text-purple-600 animate-spin" />;
      default: return <Clock className="h-3 w-3 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error': return 'bg-red-100 text-red-800 border-red-200';
      case 'checking': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'working': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3">
        {visibleAgents.map((agent) => (
          <Card key={agent.id} className="h-32 hover:shadow-md transition-shadow">
            <CardContent className="p-3 h-full flex flex-col justify-between">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-medium text-muted-foreground truncate">
                    {agent.type.replace('_', ' ').toUpperCase()}
                  </div>
                  {getStatusIcon(agent.status)}
                </div>
                <div className="text-sm font-semibold truncate" title={agent.name}>
                  {agent.name}
                </div>
                <Badge 
                  variant="outline" 
                  className={`text-xs h-5 ${getStatusColor(agent.status)}`}
                >
                  {agent.status}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">
                  {agent.responseTime}ms • {new Date(agent.lastCheck).toLocaleTimeString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {remainingCount > 0 && (
        <Card className="border-dashed">
          <CardContent className="p-4 text-center">
            <div className="text-sm text-muted-foreground">
              +{remainingCount} more agents running...
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Showing {visibleAgents.length} of {agents.length} total agents
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};