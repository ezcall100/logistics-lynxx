/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, 
  Settings, 
  Users, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  TrendingUp,
  Activity,
  Clock
} from 'lucide-react';

export const EDIDashboard: React.FC = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'EDI 210 Processed',
      value: '1,247',
      change: '+12%',
      icon: FileText,
      color: 'text-blue-600'
    },
    {
      title: 'EDI 214 Matched',
      value: '1,189',
      change: '+8%',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      title: 'Failed Transactions',
      value: '23',
      change: '-15%',
      icon: XCircle,
      color: 'text-red-600'
    },
    {
      title: 'Active Partners',
      value: '47',
      change: '+3%',
      icon: Users,
      color: 'text-purple-600'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'EDI 210',
      partner: 'ABC Logistics',
      status: 'processed',
      time: '2 minutes ago',
      amount: '$2,450'
    },
    {
      id: 2,
      type: 'EDI 214',
      partner: 'XYZ Transport',
      status: 'matched',
      time: '5 minutes ago',
      amount: '$1,890'
    },
    {
      id: 3,
      type: 'EDI 210',
      partner: 'Global Freight',
      status: 'failed',
      time: '12 minutes ago',
      amount: '$3,200'
    },
    {
      id: 4,
      type: 'EDI 214',
      partner: 'Swift Delivery',
      status: 'processing',
      time: '18 minutes ago',
      amount: '$1,650'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed':
      case 'matched':
        return <Badge className="bg-green-100 text-green-800">Success</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">EDI Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your EDI transactions</p>
        </div>
        <Button onClick={() => navigate('/edi/setup')} className="bg-primary hover:bg-primary/90">
          <Settings className="mr-2 h-4 w-4" />
          EDI Setup
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Access frequently used EDI functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/edi/matching')}
            >
              <FileText className="h-6 w-6" />
              <span>EDI Matching</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/edi/setup')}
            >
              <Settings className="h-6 w-6" />
              <span>EDI Setup</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/edi/partners')}
            >
              <Users className="h-6 w-6" />
              <span>Partners List</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col gap-2"
              onClick={() => navigate('/edi/failed/tender')}
            >
              <AlertTriangle className="h-6 w-6" />
              <span>Failed Items</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Recent Activity
          </CardTitle>
          <CardDescription>
            Latest EDI transactions and status updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p className="font-medium">{activity.type} - {activity.partner}</p>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-medium">{activity.amount}</span>
                  {getStatusBadge(activity.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
