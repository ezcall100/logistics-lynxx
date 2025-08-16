/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Search, Code, Database, TestTube, Rocket } from 'lucide-react';

interface AgentTask {
  id: string;
  agent_type: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
}

interface AgentTypeBreakdownProps {
  tasks: AgentTask[];
}

const AGENT_TYPES = {
  researcher: { icon: Search, color: 'bg-blue-500', name: 'Research Agents' },
  frontend: { icon: Code, color: 'bg-green-500', name: 'Frontend Agents' },
  backend: { icon: Database, color: 'bg-purple-500', name: 'Backend Agents' },
  database: { icon: Database, color: 'bg-yellow-500', name: 'Database Agents' },
  testing: { icon: TestTube, color: 'bg-red-500', name: 'Testing Agents' },
  deployment: { icon: Rocket, color: 'bg-orange-500', name: 'Deployment Agents' }
};

export const AgentTypeBreakdown: React.FC<AgentTypeBreakdownProps> = ({ tasks }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(AGENT_TYPES).map(([type, config]) => {
        const Icon = config.icon;
        const typeTasks = tasks.filter(t => t.agent_type === type);
        const completed = typeTasks.filter(t => t.status === 'completed').length;
        
        return (
          <Card key={type}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className={`p-2 rounded-lg ${config.color} text-white`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">{config.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {completed}/{typeTasks.length} completed
                  </p>
                </div>
              </div>
              <Progress 
                value={typeTasks.length > 0 ? (completed / typeTasks.length) * 100 : 0} 
                className="h-2" 
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
