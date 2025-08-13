import React, { useState } from 'react';
import { 
  Users2, 
  UserCheck, 
  Target, 
  Building2, 
  TrendingUp, 
  DollarSign,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Eye,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Award,
  Briefcase,
  Clock,
  Star
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const WorkersOverview = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - in real app, this would come from your backend
  const workerStats = {
    total: 156,
    executives: 8,
    employees: 95,
    agents: 53,
    activeToday: 142,
    onLeave: 6,
    newHires: 4
  };

  const departmentStats = [
    { name: 'Sales & Agents', count: 53, performance: 92, budget: 850000 },
    { name: 'Operations', count: 35, performance: 88, budget: 420000 },
    { name: 'Dispatch', count: 28, performance: 95, budget: 380000 },
    { name: 'Customer Service', count: 18, performance: 91, budget: 280000 },
    { name: 'Administration', count: 14, performance: 87, budget: 320000 },
    { name: 'Executive', count: 8, performance: 94, budget: 1200000 }
  ];

  const recentActivities = [
    { type: 'hire', message: 'New sales agent John Smith hired', time: '2 hours ago' },
    { type: 'promotion', message: 'Sarah Johnson promoted to Senior Dispatcher', time: '1 day ago' },
    { type: 'training', message: 'Compliance training completed by 15 employees', time: '2 days ago' },
    { type: 'review', message: 'Q4 performance reviews initiated', time: '3 days ago' }
  ];

  const topPerformers = [
    { name: 'Michael Brown', role: 'Senior Sales Agent', commission: 45000, deals: 127 },
    { name: 'Lisa Davis', role: 'Dispatcher', efficiency: 98, loads: 890 },
    { name: 'Robert Wilson', role: 'Operations Manager', savings: 125000, uptime: 99.2 },
    { name: 'Jennifer Lee', role: 'Customer Success', satisfaction: 4.9, accounts: 78 }
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Users2 className="w-8 h-8 text-primary" />
            Workforce Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive management of your freight brokerage team
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Review
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Worker
          </Button>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workforce</CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workerStats.total}</div>
            <p className="text-xs text-muted-foreground">
              +{workerStats.newHires} new hires this month
            </p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workerStats.activeToday}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((workerStats.activeToday / workerStats.total) * 100)}% attendance rate
            </p>
            <Progress value={(workerStats.activeToday / workerStats.total) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales Agents</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workerStats.agents}</div>
            <p className="text-xs text-muted-foreground">
              Generating $2.4M revenue
            </p>
            <Progress value={88} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Executives</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{workerStats.executives}</div>
            <p className="text-xs text-muted-foreground">
              Leadership team
            </p>
            <Progress value={100} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{performer.name}</h4>
                        <p className="text-sm text-muted-foreground">{performer.role}</p>
                      </div>
                      <div className="text-right">
                        {performer.commission && (
                          <p className="text-sm font-medium">${performer.commission.toLocaleString()}</p>
                        )}
                        {performer.efficiency && (
                          <p className="text-sm font-medium">{performer.efficiency}% Efficiency</p>
                        )}
                        {performer.savings && (
                          <p className="text-sm font-medium">${performer.savings.toLocaleString()} Saved</p>
                        )}
                        {performer.satisfaction && (
                          <p className="text-sm font-medium">{performer.satisfaction}/5.0 Rating</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="mt-1">
                        {activity.type === 'hire' && <Plus className="w-4 h-4 text-green-500" />}
                        {activity.type === 'promotion' && <TrendingUp className="w-4 h-4 text-blue-500" />}
                        {activity.type === 'training' && <Award className="w-4 h-4 text-purple-500" />}
                        {activity.type === 'review' && <Eye className="w-4 h-4 text-orange-500" />}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="departments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Department Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Department</TableHead>
                    <TableHead>Headcount</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Annual Budget</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {departmentStats.map((dept, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{dept.name}</TableCell>
                      <TableCell>{dept.count}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={dept.performance} className="w-16" />
                          <span className="text-sm">{dept.performance}%</span>
                        </div>
                      </TableCell>
                      <TableCell>${dept.budget.toLocaleString()}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Department
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overall Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">92%</div>
                <p className="text-sm text-muted-foreground">Company Average</p>
                <Progress value={92} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Employee Satisfaction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">4.6/5</div>
                <p className="text-sm text-muted-foreground">Latest Survey</p>
                <Progress value={92} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Retention Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">94%</div>
                <p className="text-sm text-muted-foreground">12-Month Average</p>
                <Progress value={94} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.concat([
                  { type: 'hire', message: 'Dispatcher Maria Garcia started orientation', time: '4 days ago' },
                  { type: 'training', message: 'Safety training completed by operations team', time: '1 week ago' },
                  { type: 'promotion', message: 'Tom Anderson promoted to Team Lead', time: '1 week ago' }
                ]).map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="mt-1">
                      {activity.type === 'hire' && <Plus className="w-5 h-5 text-green-500" />}
                      {activity.type === 'promotion' && <TrendingUp className="w-5 h-5 text-blue-500" />}
                      {activity.type === 'training' && <Award className="w-5 h-5 text-purple-500" />}
                      {activity.type === 'review' && <Eye className="w-5 h-5 text-orange-500" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.message}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkersOverview;