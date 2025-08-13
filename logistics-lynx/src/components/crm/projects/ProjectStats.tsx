
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { FolderOpen, Clock, CheckCircle } from 'lucide-react';
import { CRMStatsCard } from '../shared/CRMStatsCard';
import type { CRMProject } from '@/types/crm';

interface ProjectStatsProps {
  projects: CRMProject[];
}

export const ProjectStats: React.FC<ProjectStatsProps> = ({ projects }) => {
  const totalBudget = projects.reduce((sum, project) => sum + (project.budget || 0), 0);
  const activeProjects = projects.filter(p => ['planning', 'in_progress'].includes(p.status || ''));
  const completedProjects = projects.filter(p => p.status === 'completed');
  const avgProgress = projects.length > 0 
    ? projects.reduce((sum, p) => sum + (p.progress_percentage || 0), 0) / projects.length 
    : 0;

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <CRMStatsCard
        title="Total Projects"
        value={projects.length}
        description={`$${totalBudget.toLocaleString()} total budget`}
        icon={FolderOpen}
      />
      <CRMStatsCard
        title="Active Projects"
        value={activeProjects.length}
        description="In planning or progress"
        icon={Clock}
        iconColor="text-green-600"
      />
      <CRMStatsCard
        title="Completed"
        value={completedProjects.length}
        description={`${projects.length > 0 ? ((completedProjects.length / projects.length) * 100).toFixed(0) : 0}% completion rate`}
        icon={CheckCircle}
        iconColor="text-green-600"
      />
      <CRMStatsCard
        title="Avg Progress"
        value={`${avgProgress.toFixed(0)}%`}
        icon={FolderOpen}
      >
        <Progress value={avgProgress} className="mt-2" />
      </CRMStatsCard>
    </div>
  );
};
