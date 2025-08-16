/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Download,
  SortAsc,
  Clock,
  AlertTriangle,
  User,
  Building2,
  Calendar,
  Timer,
  MessageCircle,
  Paperclip
} from 'lucide-react';
import { CRMStatsCard } from '@/components/crm/shared/CRMStatsCard';

const AllTickets: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState('all');
  const [priorityFilter, setPriorityFilter] = React.useState('all');

  const tickets = [
    {
      id: 'TKT-1001',
      title: 'API Integration Issue with Carrier Portal',
      description: 'Unable to connect to carrier API endpoint, receiving timeout errors consistently.',
      priority: 'High',
      status: 'Open',
      category: 'Technical',
      subcategory: 'API',
      assignee: 'John Doe',
      requester: 'Sarah Johnson',
      company: 'ABC Logistics',
      portal: 'Carrier Portal',
      created: '2024-03-20T10:30:00Z',
      updated: '2024-03-20T14:15:00Z',
      dueDate: '2024-03-21T10:30:00Z',
      timeElapsed: '6h 45m',
      comments: 8,
      attachments: 3,
      tags: ['API', 'Integration', 'Carrier'],
      slaStatus: 'At Risk'
    },
    {
      id: 'TKT-1002',
      title: 'User Access Problem - Cannot Login to Driver App',
      description: 'Driver reports unable to login to mobile application after password reset.',
      priority: 'Medium',
      status: 'In Progress',
      category: 'Access',
      subcategory: 'Authentication',
      assignee: 'Sarah Smith',
      requester: 'Mike Wilson',
      company: 'XYZ Transport',
      portal: 'Driver Portal',
      created: '2024-03-19T14:15:00Z',
      updated: '2024-03-20T09:30:00Z',
      dueDate: '2024-03-22T14:15:00Z',
      timeElapsed: '1d 2h',
      comments: 12,
      attachments: 1,
      tags: ['Authentication', 'Mobile', 'Driver'],
      slaStatus: 'On Track'
    },
    {
      id: 'TKT-1003',
      title: 'Data Sync Error Between TMS and Billing System',
      description: 'Invoice data not syncing properly between TMS and billing system causing discrepancies.',
      priority: 'High',
      status: 'Open',
      category: 'Data',
      subcategory: 'Synchronization',
      assignee: 'Mike Johnson',
      requester: 'Lisa Chen',
      company: 'Global Freight Solutions',
      portal: 'Admin Portal',
      created: '2024-03-18T09:45:00Z',
      updated: '2024-03-19T16:20:00Z',
      dueDate: '2024-03-20T09:45:00Z',
      timeElapsed: '2d 6h',
      comments: 15,
      attachments: 5,
      tags: ['Data Sync', 'Billing', 'TMS'],
      slaStatus: 'Breached'
    },
    {
      id: 'TKT-1004',
      title: 'Performance Issue - Slow Load Times on Dashboard',
      description: 'Dashboard taking 30+ seconds to load, affecting user productivity.',
      priority: 'Medium',
      status: 'Resolved',
      category: 'Performance',
      subcategory: 'UI/UX',
      assignee: 'Lisa Chen',
      requester: 'Tom Anderson',
      company: 'Fast Track Logistics',
      portal: 'Broker Portal',
      created: '2024-03-17T11:20:00Z',
      updated: '2024-03-19T13:45:00Z',
      dueDate: '2024-03-21T11:20:00Z',
      timeElapsed: '2d 2h',
      comments: 6,
      attachments: 2,
      tags: ['Performance', 'Dashboard', 'UI'],
      slaStatus: 'Resolved'
    },
    {
      id: 'TKT-1005',
      title: 'Feature Request - Bulk Load Assignment',
      description: 'Customer requesting ability to assign multiple loads to drivers simultaneously.',
      priority: 'Low',
      status: 'Open',
      category: 'Feature Request',
      subcategory: 'Enhancement',
      assignee: 'David Brown',
      requester: 'Jennifer Lee',
      company: 'Premier Shipping',
      portal: 'Shipper Portal',
      created: '2024-03-16T08:30:00Z',
      updated: '2024-03-18T10:15:00Z',
      dueDate: '2024-03-30T08:30:00Z',
      timeElapsed: '4d 8h',
      comments: 4,
      attachments: 0,
      tags: ['Feature', 'Enhancement', 'Bulk Operation'],
      slaStatus: 'On Track'
    }
  ];

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.company.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || ticket.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesPriority = priorityFilter === 'all' || ticket.priority.toLowerCase() === priorityFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getTicketStats = () => {
    return {
      total: tickets.length,
      open: tickets.filter(t => t.status === 'Open').length,
      inProgress: tickets.filter(t => t.status === 'In Progress').length,
      resolved: tickets.filter(t => t.status === 'Resolved').length,
      highPriority: tickets.filter(t => t.priority === 'High').length,
      breached: tickets.filter(t => t.slaStatus === 'Breached').length
    };
  };

  const stats = getTicketStats();

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

  const getSLAColor = (slaStatus: string) => {
    switch (slaStatus) {
      case 'Breached': return 'bg-red-100 text-red-800';
      case 'At Risk': return 'bg-orange-100 text-orange-800';
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'Resolved': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Tickets</h1>
          <p className="text-muted-foreground">Comprehensive ticket management across all portals</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <SortAsc className="h-4 w-4 mr-2" />
            Sort
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <CRMStatsCard
          title="Total Tickets"
          value={stats.total}
          icon={MessageCircle}
          iconColor="text-blue-600"
        />
        <CRMStatsCard
          title="Open"
          value={stats.open}
          icon={Clock}
          iconColor="text-red-600"
        />
        <CRMStatsCard
          title="In Progress"
          value={stats.inProgress}
          icon={Timer}
          iconColor="text-blue-600"
        />
        <CRMStatsCard
          title="Resolved"
          value={stats.resolved}
          icon={AlertTriangle}
          iconColor="text-green-600"
        />
        <CRMStatsCard
          title="High Priority"
          value={stats.highPriority}
          icon={AlertTriangle}
          iconColor="text-red-600"
        />
        <CRMStatsCard
          title="SLA Breached"
          value={stats.breached}
          icon={Clock}
          iconColor="text-red-600"
        />
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search tickets by ID, title, description, or company..."
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
                All Status
              </Button>
              <Button
                variant={statusFilter === 'open' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('open')}
              >
                Open
              </Button>
              <Button
                variant={statusFilter === 'in progress' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('in progress')}
              >
                In Progress
              </Button>
              <Button
                variant={statusFilter === 'resolved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('resolved')}
              >
                Resolved
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={priorityFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriorityFilter('all')}
              >
                All Priority
              </Button>
              <Button
                variant={priorityFilter === 'high' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriorityFilter('high')}
              >
                High
              </Button>
              <Button
                variant={priorityFilter === 'medium' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriorityFilter('medium')}
              >
                Medium
              </Button>
              <Button
                variant={priorityFilter === 'low' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setPriorityFilter('low')}
              >
                Low
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTickets.map((ticket) => (
              <div key={ticket.id} className="border rounded-lg p-6 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-foreground text-lg">{ticket.title}</h3>
                      <Badge className={getPriorityColor(ticket.priority)}>
                        {ticket.priority}
                      </Badge>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                      <Badge className={getSLAColor(ticket.slaStatus)}>
                        SLA: {ticket.slaStatus}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {ticket.description}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MessageCircle className="h-3 w-3" />
                        <span className="font-medium">ID:</span> {ticket.id}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Building2 className="h-3 w-3" />
                        <span className="font-medium">Company:</span> {ticket.company}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <User className="h-3 w-3" />
                        <span className="font-medium">Assignee:</span> {ticket.assignee}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span className="font-medium">Created:</span> {new Date(ticket.created).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Timer className="h-3 w-3" />
                        <span className="font-medium">Elapsed:</span> {ticket.timeElapsed}
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span className="font-medium">Due:</span> {new Date(ticket.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {ticket.comments} comments
                      </div>
                      <div className="flex items-center gap-1">
                        <Paperclip className="h-3 w-3" />
                        {ticket.attachments} attachments
                      </div>
                      <div className="flex gap-1">
                        {ticket.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {ticket.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{ticket.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-6">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {filteredTickets.length === 0 && (
              <div className="text-center py-12">
                <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No tickets found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search terms or filters.' : 'Get started by creating your first ticket.'}
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Ticket
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

export default AllTickets;