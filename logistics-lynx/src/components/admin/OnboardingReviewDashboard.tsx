import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Users, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  FileText, 
  UserCheck,
  UserX,
  UserPlus,
  TrendingUp,
  Activity
} from 'lucide-react';

interface OnboardingItem {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'pending' | 'in_progress' | 'completed' | 'rejected';
  progress: number;
  submittedDate: string;
  assignedTo: string;
}

const OnboardingReviewDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for demonstration
  const onboardingData: OnboardingItem[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@company.com',
      company: 'ABC Logistics',
      status: 'pending',
      progress: 25,
      submittedDate: '2024-01-15',
      assignedTo: 'Admin Team'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@freightco.com',
      company: 'FreightCo Inc',
      status: 'in_progress',
      progress: 60,
      submittedDate: '2024-01-14',
      assignedTo: 'Review Team'
    },
    {
      id: '3',
      name: 'Mike Wilson',
      email: 'mike.w@transport.com',
      company: 'Transport Solutions',
      status: 'completed',
      progress: 100,
      submittedDate: '2024-01-13',
      assignedTo: 'Admin Team'
    },
    {
      id: '4',
      name: 'Lisa Brown',
      email: 'lisa.b@logistics.com',
      company: 'Logistics Pro',
      status: 'rejected',
      progress: 0,
      submittedDate: '2024-01-12',
      assignedTo: 'Review Team'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in_progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'in_progress': return <Clock className="w-4 h-4" />;
      case 'pending': return <AlertTriangle className="w-4 h-4" />;
      case 'rejected': return <UserX className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const stats = {
    total: onboardingData.length,
    pending: onboardingData.filter(item => item.status === 'pending').length,
    inProgress: onboardingData.filter(item => item.status === 'in_progress').length,
    completed: onboardingData.filter(item => item.status === 'completed').length,
    rejected: onboardingData.filter(item => item.status === 'rejected').length
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Onboarding Review Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage and review user onboarding applications</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="w-4 h-4 mr-2" />
          New Review
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-2xl font-bold">{stats.inProgress}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold">{stats.completed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <UserX className="w-5 h-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Rejected</p>
                <p className="text-2xl font-bold">{stats.rejected}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Progress</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {onboardingData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>{item.company}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(item.status)}>
                          <div className="flex items-center space-x-1">
                            {getStatusIcon(item.status)}
                            <span className="capitalize">{item.status.replace('_', ' ')}</span>
                          </div>
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="w-full">
                          <Progress value={item.progress} className="h-2" />
                          <p className="text-xs text-gray-500 mt-1">{item.progress}%</p>
                        </div>
                      </TableCell>
                      <TableCell>{item.submittedDate}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">Detailed view of all onboarding applications will be displayed here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Processing Time</h4>
                  <p className="text-2xl font-bold text-blue-600">2.3 days</p>
                  <p className="text-sm text-gray-500">Average time to complete onboarding</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-medium">Success Rate</h4>
                  <p className="text-2xl font-bold text-green-600">87%</p>
                  <p className="text-sm text-gray-500">Applications approved</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default OnboardingReviewDashboard;
