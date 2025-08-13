import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar,
  Target,
  TrendingUp,
  Plus,
  Search,
  Filter
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const CRMOverview = () => {
  const stats = [
    { title: 'Total Leads', value: '1,247', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Active Opportunities', value: '89', change: '+8%', icon: Target, color: 'text-green-600' },
    { title: 'Emails Sent', value: '5,432', change: '+15%', icon: Mail, color: 'text-purple-600' },
    { title: 'Calls Made', value: '234', change: '+5%', icon: Phone, color: 'text-orange-600' },
  ];

  const recentActivities = [
    { type: 'Lead', action: 'New lead from ABC Corp', time: '2 minutes ago', status: 'new' },
    { type: 'Opportunity', action: 'Deal closed with XYZ Inc', time: '1 hour ago', status: 'closed' },
    { type: 'Email', action: 'Follow-up sent to prospect', time: '3 hours ago', status: 'sent' },
    { type: 'Call', action: 'Demo scheduled with client', time: '5 hours ago', status: 'scheduled' },
  ];

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">CRM Overview</h1>
            <p className="text-muted-foreground">Customer relationship management dashboard</p>
          </div>
          <div className="flex gap-2">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Lead
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
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

        {/* Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Latest CRM activities across all portals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant={activity.status === 'new' ? 'default' : 'secondary'}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Top Performing Agents</CardTitle>
              <CardDescription>Best performing sales agents this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Sarah Johnson', deals: 23, revenue: '$145K' },
                  { name: 'Mike Chen', deals: 19, revenue: '$128K' },
                  { name: 'Lisa Davis', deals: 17, revenue: '$112K' },
                  { name: 'Tom Wilson', deals: 15, revenue: '$98K' },
                ].map((agent, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{agent.name}</p>
                      <p className="text-sm text-muted-foreground">{agent.deals} deals closed</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{agent.revenue}</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SuperAdminLayout>
  );
};

export default CRMOverview;