/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AgentTask {
  id: string;
  task_name: string;
  portal: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  started_at?: string;
}

interface RecentTaskActivityProps {
  tasks: AgentTask[];
}

export const RecentTaskActivity: React.FC<RecentTaskActivityProps> = ({ tasks }) => {
  const recentTasks = tasks
    .filter(t => t.status !== 'pending')
    .sort((a, b) => new Date(b.started_at || '').getTime() - new Date(a.started_at || '').getTime())
    .slice(0, 10);

  if (tasks.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Task Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {recentTasks.map(task => (
            <div key={task.id} className="flex items-center justify-between p-2 border rounded">
              <div>
                <p className="font-medium text-sm">{task.task_name}</p>
                <p className="text-xs text-muted-foreground">{task.portal}</p>
              </div>
              <Badge variant={
                task.status === 'completed' ? 'default' :
                task.status === 'in_progress' ? 'secondary' :
                'destructive'
              }>
                {task.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
