/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Activity, Cpu, Zap } from 'lucide-react';

const AutonomousStatusCard = () => {
  const agents = [
    { name: 'PageCreator', status: 'active', icon: Activity, color: 'text-green-600' },
    { name: 'HeaderBuilder', status: 'building', icon: Cpu, color: 'text-blue-600' },
    { name: 'ComponentArchitect', status: 'idle', icon: Zap, color: 'text-purple-600' }
  ];

  return (
    <Card className="border-purple-200 bg-purple-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-700">
          🤖 Autonomous Agent Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {agents.map((agent, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg">
              <div className="flex items-center gap-2">
                <agent.icon className={`w-4 h-4 ${agent.color}`} />
                <span className="font-medium">{agent.name}</span>
              </div>
              <Badge variant={agent.status === 'active' ? 'default' : 'secondary'}>
                {agent.status}
              </Badge>
            </div>
          ))}
        </div>
        <div className="mt-4 p-2 bg-purple-100 rounded text-xs text-purple-700">
          🔥 Created by autonomous agent at 11:33:48 PM
        </div>
      </CardContent>
    </Card>
  );
};

export default AutonomousStatusCard;