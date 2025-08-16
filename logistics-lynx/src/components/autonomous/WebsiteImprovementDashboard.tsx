import React, { useState, useEffect } from 'react';
import { useWebsiteImprovementAgent, WebsiteImprovement, WebsiteMetrics } from '@/hooks/autonomous/useWebsiteImprovementAgent';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Zap, 
  Shield, 
  Eye, 
  Globe, 
  Settings,
  Play,
  CheckCircle,
  Clock,
  AlertTriangle,
  BarChart3,
  Target,
  Rocket,
  RefreshCw,
  Download,
  Upload,
  Monitor,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const WebsiteImprovementDashboard: React.FC = () => {
  const {
    improvements,
    metrics,
    isAnalyzing,
    isImplementing,
    analyzeWebsite,
    implementImprovement,
    autoImproveWebsite,
    getWebsiteMetrics,
  } = useWebsiteImprovementAgent();

  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Filter improvements based on search and filters
  const filteredImprovements = improvements.filter(improvement => {
    const matchesSearch = improvement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         improvement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || improvement.type === filterType;
    const matchesPriority = filterPriority === 'all' || improvement.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || improvement.status === filterStatus;

    return matchesSearch && matchesType && matchesPriority && matchesStatus;
  });

  // Calculate statistics
  const stats = {
    total: improvements.length,
    pending: improvements.filter(imp => imp.status === 'pending').length,
    inProgress: improvements.filter(imp => imp.status === 'in_progress').length,
    completed: improvements.filter(imp => imp.status === 'completed').length,
    failed: improvements.filter(imp => imp.status === 'failed').length,
    highPriority: improvements.filter(imp => imp.priority === 'high' || imp.priority === 'critical').length,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'in_progress': return 'bg-blue-500';
      case 'failed': return 'bg-red-500';
      case 'pending': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'performance': return <Zap className="w-4 h-4" />;
      case 'seo': return <Globe className="w-4 h-4" />;
      case 'accessibility': return <Eye className="w-4 h-4" />;
      case 'security': return <Shield className="w-4 h-4" />;
      case 'ui': return <Settings className="w-4 h-4" />;
      case 'content': return <BarChart3 className="w-4 h-4" />;
      case 'functionality': return <Target className="w-4 h-4" />;
      default: return <Settings className="w-4 h-4" />;
    }
  };

  const handleImplementImprovement = async (improvementId: string) => {
    try {
      await implementImprovement(improvementId);
    } catch (error) {
      console.error('Failed to implement improvement:', error);
    }
  };

  const handleAutoImprove = async () => {
    try {
      await autoImproveWebsite();
    } catch (error) {
      console.error('Failed to auto-improve website:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Website Improvement Dashboard</h1>
          <p className="text-muted-foreground">
            Autonomous agents continuously analyze and improve your website
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={() => getWebsiteMetrics()}
            variant="outline"
            disabled={isAnalyzing}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Refresh Metrics
          </Button>
          <Button 
            onClick={() => analyzeWebsite()}
            disabled={isAnalyzing}
          >
            <Search className="w-4 h-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Website'}
          </Button>
          <Button 
            onClick={handleAutoImprove}
            disabled={isImplementing}
            variant="secondary"
          >
            <Rocket className="w-4 h-4 mr-2" />
            {isImplementing ? 'Improving...' : 'Auto-Improve'}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Improvements</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inProgress}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High Priority</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.highPriority}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Website Metrics */}
      {metrics && (
        <Card>
          <CardHeader>
            <CardTitle>Website Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h4 className="font-medium mb-2">Performance</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Load Time</span>
                    <span className="text-sm font-medium">{metrics.performance.loadTime}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">FCP</span>
                    <span className="text-sm font-medium">{metrics.performance.firstContentfulPaint}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">LCP</span>
                    <span className="text-sm font-medium">{metrics.performance.largestContentfulPaint}s</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">SEO Score</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Overall Score</span>
                    <span className="text-sm font-medium">{metrics.seo.score}/100</span>
                  </div>
                  <Progress value={metrics.seo.score} className="w-full" />
                  <div className="text-xs text-muted-foreground">
                    {metrics.seo.issues.length} issues found
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">Accessibility</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Score</span>
                    <span className="text-sm font-medium">{metrics.accessibility.score}/100</span>
                  </div>
                  <Progress value={metrics.accessibility.score} className="w-full" />
                  <div className="text-xs text-muted-foreground">
                    {metrics.accessibility.violations.length} violations
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-2">User Experience</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Bounce Rate</span>
                    <span className="text-sm font-medium">{metrics.userExperience.bounceRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Session Duration</span>
                    <span className="text-sm font-medium">{metrics.userExperience.sessionDuration}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Conversion Rate</span>
                    <span className="text-sm font-medium">{metrics.userExperience.conversionRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Improvement Opportunities</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <Input
                placeholder="Search improvements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="performance">Performance</SelectItem>
                <SelectItem value="seo">SEO</SelectItem>
                <SelectItem value="accessibility">Accessibility</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="ui">UI/UX</SelectItem>
                <SelectItem value="content">Content</SelectItem>
                <SelectItem value="functionality">Functionality</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterPriority} onValueChange={setFilterPriority}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Improvements Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Impact</TableHead>
                  <TableHead>Effort (hrs)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredImprovements.map((improvement) => (
                  <TableRow key={improvement.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(improvement.type)}
                        <span className="capitalize">{improvement.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{improvement.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {improvement.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(improvement.priority)}>
                        {improvement.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(improvement.status)}>
                        {improvement.status.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {improvement.impact}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {improvement.estimatedEffort}
                    </TableCell>
                    <TableCell>
                      {improvement.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => handleImplementImprovement(improvement.id)}
                          disabled={isImplementing}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Implement
                        </Button>
                      )}
                      {improvement.status === 'completed' && (
                        <div className="text-green-600 text-sm">
                          <CheckCircle className="w-4 h-4 inline mr-1" />
                          Done
                        </div>
                      )}
                      {improvement.status === 'in_progress' && (
                        <div className="text-blue-600 text-sm">
                          <Activity className="w-4 h-4 inline mr-1" />
                          Working...
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredImprovements.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No improvements found matching your criteria.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WebsiteImprovementDashboard;
