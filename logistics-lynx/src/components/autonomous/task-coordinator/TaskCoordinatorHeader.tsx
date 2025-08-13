
import React from 'react';
import { Brain } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface TaskCoordinatorHeaderProps {
  progress: {
    total_tasks: number;
    completed_tasks: number;
    in_progress_tasks: number;
    failed_tasks: number;
    completion_percentage: number;
  };
  isGenerating: boolean;
  tasksLength: number;
  onInitializeTasks: () => void;
  onStartGeneration: () => void;
  onStartAdvancedGeneration?: () => void;
}

export const TaskCoordinatorHeader: React.FC<TaskCoordinatorHeaderProps> = ({
  progress,
  isGenerating,
  tasksLength,
  onInitializeTasks,
  onStartGeneration,
  onStartAdvancedGeneration
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6" />
          250 Autonomous Agents - Enhanced TMS Generation Coordinator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Batch processing • Error recovery • Resource management • Rate limiting
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{progress.total_tasks}</div>
            <div className="text-sm text-muted-foreground">Total Tasks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">{progress.completed_tasks}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">{progress.in_progress_tasks}</div>
            <div className="text-sm text-muted-foreground">In Progress</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600">{progress.failed_tasks}</div>
            <div className="text-sm text-muted-foreground">Failed</div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm font-medium">{progress.completion_percentage}%</span>
          </div>
          <Progress value={progress.completion_percentage} className="h-3" />
        </div>

        <div className="flex gap-3">
          <Button 
            onClick={onInitializeTasks}
            disabled={isGenerating || tasksLength > 0}
            className="flex-1"
          >
            {isGenerating ? 'Generating Tasks...' : 'Initialize 250 Agent Tasks'}
          </Button>
          <Button 
            onClick={onStartGeneration}
            disabled={tasksLength === 0 || progress.in_progress_tasks > 0}
            variant="secondary"
            className="flex-1"
          >
            Start Standard Generation
          </Button>
          {onStartAdvancedGeneration && (
            <Button 
              onClick={onStartAdvancedGeneration}
              disabled={tasksLength === 0 || progress.in_progress_tasks > 0}
              variant="outline"
              className="flex-1"
            >
              Start Enhanced Generation
            </Button>
          )}
        </div>

        {progress.failed_tasks > 0 && (
          <div className="mt-4 text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
            ⚠️ {progress.failed_tasks} agents failed. Enhanced generation includes automatic retry mechanisms.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
