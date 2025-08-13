import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { 
  Search, 
  Plus, 
  FolderOpen, 
  DollarSign, 
  Clock,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Download,
  Building2,
  User,
  CheckCircle,
  AlertCircle,
  Pause,
  Play
} from 'lucide-react';
import { useCRMProjects } from '@/hooks/crm/useCRMProjects';
import { useCRM } from '@/hooks/useCRM';
import { CRMStatsCard } from '@/components/crm/shared/CRMStatsCard';

const CRMProjectsPage: React.FC = () => {
  const { projects, fetchProjects } = useCRMProjects();
  const { companies, opportunities } = useCRM();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');

  React.useEffect(() => {
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.company?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getProjectStats = () => {
    const totalBudget = projects.reduce((sum, project) => sum + (project.budget || 0), 0);
    const activeProjects = projects.filter(p => p.status === 'in_progress').length;
    const completedProjects = projects.filter(p => p.status === 'completed').length;
    const avgProgress = projects.length > 0 
      ? projects.reduce((sum, p) => sum + (p.progress_percentage || 0), 0) / projects.length 
      : 0;
    
    return {
      total: projects.length,
      totalBudget,
      active: activeProjects,
      completed: completedProjects,
      avgProgress: Math.round(avgProgress)
    };
  };

  const stats = getProjectStats();

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'on_hold': return 'bg-orange-100 text-orange-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'planning': return <Clock className="h-3 w-3" />;
      case 'in_progress': return <Play className="h-3 w-3" />;
      case 'on_hold': return <Pause className="h-3 w-3" />;
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      case 'cancelled': return <AlertCircle className="h-3 w-3" />;
      default: return <FolderOpen className="h-3 w-3" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">CRM Projects</h1>
          <p className="text-muted-foreground">Manage your client projects and deliverables</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <CRMStatsCard
          title="Total Projects"
          value={stats.total}
          icon={FolderOpen}
          iconColor="text-blue-600"
        />
        <CRMStatsCard
          title="Total Budget"
          value={formatCurrency(stats.totalBudget)}
          icon={DollarSign}
          iconColor="text-green-600"
        />
        <CRMStatsCard
          title="Active Projects"
          value={stats.active}
          icon={Play}
          iconColor="text-yellow-600"
        />
        <CRMStatsCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          iconColor="text-green-600"
        />
        <CRMStatsCard
          title="Avg Progress"
          value={`${stats.avgProgress}%`}
          icon={Clock}
          iconColor="text-purple-600"
        />
      </div>

      {/* Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Project Status Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['planning', 'in_progress', 'on_hold', 'completed', 'cancelled'].map(status => {
              const statusProjects = projects.filter(p => p.status === status);
              const statusBudget = statusProjects.reduce((sum, p) => sum + (p.budget || 0), 0);
              
              return (
                <div key={status} className="text-center">
                  <div className="text-2xl font-bold text-foreground">{statusProjects.length}</div>
                  <div className="text-sm text-muted-foreground capitalize">{status.replace('_', ' ')}</div>
                  <div className="text-xs text-muted-foreground">{formatCurrency(statusBudget)}</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              {['planning', 'in_progress', 'on_hold', 'completed'].map(status => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setStatusFilter(status)}
                  className="capitalize"
                >
                  {status.replace('_', ' ')}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredProjects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-foreground">{project.name}</h3>
                      <Badge className={getStatusColor(project.status)}>
                        {getStatusIcon(project.status)}
                        <span className="ml-1 capitalize">{project.status?.replace('_', ' ')}</span>
                      </Badge>
                      {project.priority && (
                        <Badge variant="outline" className={getPriorityColor(project.priority)}>
                          {project.priority} priority
                        </Badge>
                      )}
                    </div>
                    
                    {project.description && (
                      <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                      {project.budget && (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3" />
                          <span className="font-medium text-foreground">
                            {formatCurrency(project.budget)}
                          </span>
                        </div>
                      )}
                      
                      {project.company && (
                        <div className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {project.company.name}
                        </div>
                      )}
                      
                      {project.project_manager && (
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          Project Manager
                        </div>
                      )}
                      
                      {project.end_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Due: {new Date(project.end_date).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {typeof project.progress_percentage === 'number' && (
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-foreground">{project.progress_percentage}%</span>
                        </div>
                        <Progress value={project.progress_percentage} className="h-2" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-1 ml-4">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredProjects.length === 0 && (
              <div className="text-center py-8">
                <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No projects found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Get started by adding your first project.'}
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Project
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default CRMProjectsPage;