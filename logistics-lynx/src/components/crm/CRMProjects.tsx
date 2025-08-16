/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { 
  FolderOpen, 
  Plus, 
  Calendar,
  User,
  Building,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreHorizontal
} from 'lucide-react';
import { CRMFilters } from './shared/CRMFilters';
import { CRMEmptyState } from './shared/CRMEmptyState';
import { ProjectStats } from './projects/ProjectStats';
import type { CRMProject, CRMCompany, CRMOpportunity } from '@/types/crm';

interface CRMProjectsProps {
  projects: CRMProject[];
  companies: CRMCompany[];
  opportunities: CRMOpportunity[];
}

export const CRMProjects: React.FC<CRMProjectsProps> = ({ 
  projects, 
  companies, 
  opportunities 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.project_type?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const statuses = ['all', 'planning', 'in_progress', 'on_hold', 'completed', 'cancelled'];

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-green-100 text-green-800';
      case 'on_hold': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      case 'on_hold': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <AlertCircle className="h-4 w-4" />;
      default: return <FolderOpen className="h-4 w-4" />;
    }
  };

  // Calculate stats
  const totalBudget = projects.reduce((sum, project) => sum + (project.budget || 0), 0);
  const statusData = statuses.slice(1).map(status => {
    const statusProjects = projects.filter(p => p.status === status);
    return {
      status,
      count: statusProjects.length,
      budget: statusProjects.reduce((sum, p) => sum + (p.budget || 0), 0),
      avgProgress: statusProjects.length > 0 
        ? statusProjects.reduce((sum, p) => sum + (p.progress_percentage || 0), 0) / statusProjects.length 
        : 0
    };
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">Projects</h3>
          <p className="text-muted-foreground">
            Manage your ongoing projects and deliverables
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      <ProjectStats projects={projects} />

      {/* Project Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Project Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {statusData.map(({ status, count, budget, avgProgress }) => (
              <div key={status} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="capitalize font-medium">{status.replace('_', ' ')}</span>
                    {avgProgress > 0 && (
                      <Badge variant="outline">{avgProgress.toFixed(0)}% avg progress</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <span>{count} projects</span>
                    <span className="font-medium">${budget.toLocaleString()}</span>
                  </div>
                </div>
                <Progress value={totalBudget > 0 ? (budget / totalBudget) * 100 : 0} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <CRMFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filters={statuses}
        selectedFilter={selectedStatus}
        onFilterChange={setSelectedStatus}
        searchPlaceholder="Search projects..."
      />

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Projects ({filteredProjects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Timeline</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {project.project_type?.replace('_', ' ')}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{project.company?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(project.status)}
                      <Badge className={getStatusColor(project.status)}>
                        {project.status?.replace('_', ' ') || 'planning'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">{project.progress_percentage || 0}%</span>
                      <Progress value={project.progress_percentage || 0} className="w-16 h-2" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">
                          ${project.budget?.toLocaleString() || '0'}
                        </span>
                      </div>
                      {project.actual_cost && (
                        <p className="text-sm text-muted-foreground">
                          Spent: ${project.actual_cost.toLocaleString()}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      {project.start_date && (
                        <div className="flex items-center space-x-2 text-sm">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(project.start_date).toLocaleDateString()}</span>
                        </div>
                      )}
                      {project.end_date && (
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>to {new Date(project.end_date).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Project Manager</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredProjects.length === 0 && (
            <CRMEmptyState
              icon={FolderOpen}
              title="No projects found"
              description={searchTerm || selectedStatus !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Get started by adding your first project.'}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
};
