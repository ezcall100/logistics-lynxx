import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, TrendingDown, Star, Target, Users, Calendar, Award, BarChart3 } from 'lucide-react';

interface PerformanceMetric {
  id: string;
  employeeName: string;
  department: string;
  role: string;
  kpiScore: number;
  goalsAchieved: number;
  totalGoals: number;
  revenue: number;
  customerSatisfaction: number;
  lastReviewDate: string;
  nextReviewDate: string;
  status: 'excellent' | 'good' | 'needs_improvement' | 'critical';
}

interface Goal {
  id: string;
  employeeId: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  unit: string;
  deadline: string;
  status: 'completed' | 'in_progress' | 'overdue' | 'not_started';
  priority: 'high' | 'medium' | 'low';
}

const performanceData: PerformanceMetric[] = [
  {
    id: '1',
    employeeName: 'Sarah Johnson',
    department: 'Operations',
    role: 'Operations Manager',
    kpiScore: 92,
    goalsAchieved: 8,
    totalGoals: 10,
    revenue: 1250000,
    customerSatisfaction: 4.8,
    lastReviewDate: '2024-01-15',
    nextReviewDate: '2024-04-15',
    status: 'excellent'
  },
  {
    id: '2',
    employeeName: 'Mike Rodriguez',
    department: 'Sales',
    role: 'Sales Director',
    kpiScore: 88,
    goalsAchieved: 7,
    totalGoals: 9,
    revenue: 2100000,
    customerSatisfaction: 4.6,
    lastReviewDate: '2024-01-10',
    nextReviewDate: '2024-04-10',
    status: 'excellent'
  },
  {
    id: '3',
    employeeName: 'Lisa Chen',
    department: 'Customer Service',
    role: 'CS Manager',
    kpiScore: 85,
    goalsAchieved: 6,
    totalGoals: 8,
    revenue: 0,
    customerSatisfaction: 4.9,
    lastReviewDate: '2024-01-20',
    nextReviewDate: '2024-04-20',
    status: 'good'
  },
  {
    id: '4',
    employeeName: 'David Thompson',
    department: 'Dispatch',
    role: 'Dispatch Supervisor',
    kpiScore: 78,
    goalsAchieved: 5,
    totalGoals: 8,
    revenue: 0,
    customerSatisfaction: 4.3,
    lastReviewDate: '2024-01-25',
    nextReviewDate: '2024-04-25',
    status: 'good'
  },
  {
    id: '5',
    employeeName: 'Jennifer Adams',
    department: 'Finance',
    role: 'Finance Manager',
    kpiScore: 72,
    goalsAchieved: 4,
    totalGoals: 7,
    revenue: 0,
    customerSatisfaction: 4.2,
    lastReviewDate: '2024-02-01',
    nextReviewDate: '2024-05-01',
    status: 'needs_improvement'
  }
];

const goalsData: Goal[] = [
  {
    id: '1',
    employeeId: '1',
    title: 'Reduce Load Delivery Time',
    description: 'Improve average delivery time by 15%',
    targetValue: 15,
    currentValue: 12,
    unit: '%',
    deadline: '2024-03-31',
    status: 'in_progress',
    priority: 'high'
  },
  {
    id: '2',
    employeeId: '2',
    title: 'Increase Monthly Revenue',
    description: 'Achieve $2.5M in monthly sales',
    targetValue: 2500000,
    currentValue: 2100000,
    unit: '$',
    deadline: '2024-03-31',
    status: 'in_progress',
    priority: 'high'
  },
  {
    id: '3',
    employeeId: '3',
    title: 'Customer Satisfaction Score',
    description: 'Maintain customer satisfaction above 4.8',
    targetValue: 4.8,
    currentValue: 4.9,
    unit: '/5',
    deadline: '2024-12-31',
    status: 'completed',
    priority: 'medium'
  }
];

const Performance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPerformance = performanceData.filter(employee => {
    const matchesSearch = employee.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = departmentFilter === 'all' || employee.department === departmentFilter;
    const matchesStatus = statusFilter === 'all' || employee.status === statusFilter;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'bg-green-500';
      case 'good': return 'bg-blue-500';
      case 'needs_improvement': return 'bg-yellow-500';
      case 'critical': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent': return <Badge className="bg-green-500">Excellent</Badge>;
      case 'good': return <Badge className="bg-blue-500">Good</Badge>;
      case 'needs_improvement': return <Badge className="bg-yellow-500">Needs Improvement</Badge>;
      case 'critical': return <Badge variant="destructive">Critical</Badge>;
      default: return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const avgKpiScore = performanceData.reduce((sum, emp) => sum + emp.kpiScore, 0) / performanceData.length;
  const totalRevenue = performanceData.reduce((sum, emp) => sum + emp.revenue, 0);
  const avgCustomerSat = performanceData.reduce((sum, emp) => sum + emp.customerSatisfaction, 0) / performanceData.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Performance Management</h1>
          <p className="text-muted-foreground">Track employee performance, goals, and reviews</p>
        </div>
        
        <Button>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule Review
        </Button>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average KPI Score</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgKpiScore.toFixed(1)}%</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.1% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue Impact</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCustomerSat.toFixed(1)}/5</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              +0.3 from last month
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Goals Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {performanceData.reduce((sum, emp) => sum + emp.goalsAchieved, 0)}/
              {performanceData.reduce((sum, emp) => sum + emp.totalGoals, 0)}
            </div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              73% completion rate
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Performance Overview</TabsTrigger>
          <TabsTrigger value="goals">Goals & Objectives</TabsTrigger>
          <TabsTrigger value="reviews">Performance Reviews</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Filters */}
          <div className="flex gap-4">
            <Input
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
                <SelectItem value="Customer Service">Customer Service</SelectItem>
                <SelectItem value="Dispatch">Dispatch</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="excellent">Excellent</SelectItem>
                <SelectItem value="good">Good</SelectItem>
                <SelectItem value="needs_improvement">Needs Improvement</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Performance Cards */}
          <div className="space-y-4">
            {filteredPerformance.map((employee) => (
              <Card key={employee.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4 flex-1">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-semibold">{employee.employeeName}</h3>
                          <p className="text-muted-foreground">{employee.role} • {employee.department}</p>
                        </div>
                        {getStatusBadge(employee.status)}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">KPI Score</span>
                            <span className="text-sm font-medium">{employee.kpiScore}%</span>
                          </div>
                          <Progress value={employee.kpiScore} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Goals Achieved</span>
                            <span className="text-sm font-medium">{employee.goalsAchieved}/{employee.totalGoals}</span>
                          </div>
                          <Progress value={(employee.goalsAchieved / employee.totalGoals) * 100} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Customer Satisfaction</span>
                            <span className="text-sm font-medium">{employee.customerSatisfaction}/5</span>
                          </div>
                          <Progress value={(employee.customerSatisfaction / 5) * 100} className="h-2" />
                        </div>
                        
                        <div className="space-y-2">
                          <span className="text-sm text-muted-foreground">Revenue Impact</span>
                          <span className="text-lg font-semibold">
                            {employee.revenue > 0 ? `$${(employee.revenue / 1000).toFixed(0)}K` : 'N/A'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Last Review: {new Date(employee.lastReviewDate).toLocaleDateString()}</span>
                        <span>Next Review: {new Date(employee.nextReviewDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="goals" className="space-y-6">
          <div className="grid gap-6">
            {goalsData.map((goal) => {
              const employee = performanceData.find(emp => emp.id === goal.employeeId);
              const progress = (goal.currentValue / goal.targetValue) * 100;
              
              return (
                <Card key={goal.id}>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{goal.title}</h3>
                          <p className="text-muted-foreground">{employee?.employeeName} • {employee?.department}</p>
                          <p className="text-sm text-muted-foreground mt-1">{goal.description}</p>
                        </div>
                        <div className="flex gap-2">
                          <Badge variant={goal.priority === 'high' ? 'destructive' : goal.priority === 'medium' ? 'default' : 'secondary'}>
                            {goal.priority}
                          </Badge>
                          <Badge variant={goal.status === 'completed' ? 'default' : goal.status === 'overdue' ? 'destructive' : 'secondary'}>
                            {goal.status.replace('_', ' ')}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Progress</span>
                          <span className="text-sm font-medium">
                            {goal.currentValue.toLocaleString()}{goal.unit} / {goal.targetValue.toLocaleString()}{goal.unit}
                          </span>
                        </div>
                        <Progress value={Math.min(progress, 100)} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                        <span>{Math.round(progress)}% Complete</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <Card>
            <CardHeader>
              <CardTitle>Performance Reviews</CardTitle>
              <CardDescription>Scheduled and completed performance reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((employee) => (
                  <div key={employee.id} className="flex justify-between items-center p-4 border rounded-lg">
                    <div>
                      <h4 className="font-medium">{employee.employeeName}</h4>
                      <p className="text-sm text-muted-foreground">{employee.role}</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Last Review</p>
                        <p className="text-sm font-medium">{new Date(employee.lastReviewDate).toLocaleDateString()}</p>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Next Review</p>
                        <p className="text-sm font-medium">{new Date(employee.nextReviewDate).toLocaleDateString()}</p>
                      </div>
                      
                      <Button variant="outline" size="sm">
                        View Review
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Excellent</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-sm">40%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Good</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                      <span className="text-sm">40%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>Needs Improvement</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <span className="text-sm">20%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Operations</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Sales</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Customer Service</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Dispatch</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Finance</span>
                    <span className="font-medium">72%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Performance;