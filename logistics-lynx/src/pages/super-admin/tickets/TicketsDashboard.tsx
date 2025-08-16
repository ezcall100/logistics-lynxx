/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Ticket,
  Clock,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  Target,
  Timer,
  Activity,
  Star
} from 'lucide-react';
import { CRMStatsCard } from '@/components/crm/shared/CRMStatsCard';

const TicketsDashboard: React.FC = () => {
  const ticketStats = {
    total: 2847,
    open: 234,
    inProgress: 156,
    resolved: 2387,
    closed: 70,
    highPriority: 23,
    avgResolutionTime: '4.2h',
    satisfactionRate: 94.5
  };

  const recentTickets = [
    {
      id: 'TKT-001',
      title: 'API Integration Issue with Carrier Portal',
      priority: 'High',
      status: 'Open',
      assignee: 'John Doe',
      created: '2024-03-20T10:30:00Z',
      category: 'Technical',
      customer: 'ABC Logistics',
      timeElapsed: '2h 30m'
    },
    {
      id: 'TKT-002',
      title: 'User Access Problem - Cannot Login',
      priority: 'Medium',
      status: 'In Progress',
      assignee: 'Sarah Smith',
      created: '2024-03-19T14:15:00Z',
      category: 'Access',
      customer: 'XYZ Transport',
      timeElapsed: '1d 6h'
    },
    {
      id: 'TKT-003',
      title: 'Data Sync Error Between Systems',
      priority: 'High',
      status: 'Open',
      assignee: 'Mike Johnson',
      created: '2024-03-18T09:45:00Z',
      category: 'Data',
      customer: 'Global Freight',
      timeElapsed: '2d 8h'
    }
  ];

  const teamPerformance = [
    { name: 'John Doe', resolved: 45, pending: 8, rating: 4.8 },
    { name: 'Sarah Smith', resolved: 38, pending: 6, rating: 4.9 },
    { name: 'Mike Johnson', resolved: 42, pending: 12, rating: 4.7 },
    { name: 'Lisa Chen', resolved: 35, pending: 4, rating: 4.9 }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeElapsed = (timeElapsed: string) => {
    return timeElapsed;
  };

  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tickets Dashboard</h1>
          <p className="text-muted-foreground">Comprehensive support ticket management and analytics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <BarChart3 className="h-4 w-4 mr-2" />
            Reports
          </Button>
          <Button size="sm">
            <Ticket className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-4">
        <CRMStatsCard
          title="Total Tickets"
          value={ticketStats.total.toLocaleString()}
          icon={Ticket}
          iconColor="text-blue-600"
        />
        <CRMStatsCard
          title="Open Tickets"
          value={ticketStats.open}
          icon={Clock}
          iconColor="text-red-600"
        />
        <CRMStatsCard
          title="In Progress"
          value={ticketStats.inProgress}
          icon={Activity}
          iconColor="text-blue-600"
        />
        <CRMStatsCard
          title="Resolved"
          value={ticketStats.resolved.toLocaleString()}
          icon={CheckCircle}
          iconColor="text-green-600"
        />
        <CRMStatsCard
          title="High Priority"
          value={ticketStats.highPriority}
          icon={AlertTriangle}
          iconColor="text-red-600"
        />
        <CRMStatsCard
          title="Avg Resolution"
          value={ticketStats.avgResolutionTime}
          icon={Timer}
          iconColor="text-purple-600"
        />
        <CRMStatsCard
          title="Satisfaction"
          value={`${ticketStats.satisfactionRate}%`}
          icon={Star}
          iconColor="text-yellow-600"
        />
        <CRMStatsCard
          title="Closed"
          value={ticketStats.closed}
          icon={Target}
          iconColor="text-gray-600"
        />
      </div>

      {/* Quick Actions & Status Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Status Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Ticket Status Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm font-medium">Open</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: '8.2%' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">{ticketStats.open}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '5.5%' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">{ticketStats.inProgress}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Resolved</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '83.8%' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">{ticketStats.resolved}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                  <span className="text-sm font-medium">Closed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-500 h-2 rounded-full" style={{ width: '2.5%' }}></div>
                  </div>
                  <span className="text-sm text-muted-foreground">{ticketStats.closed}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {teamPerformance.map((member) => (
                <div key={member.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{member.name}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-xs text-muted-foreground">{member.rating}</span>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Resolved: {member.resolved} | Pending: {member.pending}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tickets */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Tickets
            </CardTitle>
            <Button variant="outline" size="sm">View All</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentTickets.map((ticket) => (
              <div key={ticket.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-medium text-foreground">{ticket.title}</h4>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                      <div>
                        <span className="font-medium">ID:</span> {ticket.id}
                      </div>
                      <div>
                        <span className="font-medium">Customer:</span> {ticket.customer}
                      </div>
                      <div>
                        <span className="font-medium">Assignee:</span> {ticket.assignee}
                      </div>
                      <div>
                        <span className="font-medium">Category:</span> {ticket.category}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(ticket.created).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <Timer className="h-3 w-3" />
                        {formatTimeElapsed(ticket.timeElapsed)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">View</Button>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default TicketsDashboard;