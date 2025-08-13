import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  MessageSquare,
  Mail,
  Phone,
  Calendar,
  Plus,
  Filter,
  Download,
  Reply,
  Forward,
  Archive
} from 'lucide-react';

const Communications = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data
  const communications = [
    {
      id: 1,
      type: 'email',
      contact: 'Sarah Johnson',
      company: 'Global Shipping Corp',
      subject: 'Re: Freight proposal for Q1',
      preview: 'Thank you for the detailed proposal. We are reviewing the terms and will get back to you by Friday...',
      timestamp: '2 hours ago',
      direction: 'inbound'
    },
    {
      id: 2,
      type: 'call',
      contact: 'Mike Chen',
      company: 'West Coast Logistics',
      subject: 'Contract negotiation call',
      preview: 'Discussed pricing terms and delivery schedules. Follow-up meeting scheduled for next week.',
      timestamp: '4 hours ago',
      direction: 'outbound'
    },
    {
      id: 3,
      type: 'meeting',
      contact: 'Lisa Rodriguez',
      company: 'Metro Distribution',
      subject: 'Discovery meeting - New partnership',
      preview: 'Initial meeting to discuss potential partnership opportunities and service requirements.',
      timestamp: 'Yesterday',
      direction: 'scheduled'
    }
  ];

  const communicationTypes = [
    { type: 'Email', count: 156, percentage: 45 },
    { type: 'Call', count: 89, percentage: 25 },
    { type: 'Meeting', count: 67, percentage: 20 },
    { type: 'SMS', count: 34, percentage: 10 }
  ];

  const upcomingTasks = [
    {
      id: 1,
      contact: 'Global Shipping Corp',
      task: 'Follow up on proposal',
      type: 'email',
      time: '3:00 PM'
    },
    {
      id: 2,
      contact: 'Atlantic Freight',
      task: 'Contract review call',
      type: 'call',
      time: 'Tomorrow'
    },
    {
      id: 3,
      contact: 'Pacific Logistics',
      task: 'Quarterly review meeting',
      type: 'meeting',
      time: 'Friday'
    }
  ];

  const filteredCommunications = communications.filter(comm => {
    const matchesSearch = comm.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         comm.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || comm.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return Mail;
      case 'call': return Phone;
      case 'meeting': return Calendar;
      case 'sms': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const getDirectionColor = (direction: string) => {
    switch (direction) {
      case 'inbound': return 'default';
      case 'outbound': return 'secondary';
      case 'scheduled': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Communications Hub</h1>
          <p className="text-muted-foreground">
            Unified platform for emails, calls, meetings, and customer interactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Communication
          </Button>
        </div>
      </div>

      {/* Communication Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Communications</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,847</div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Email Response Rate</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Call Connect Rate</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <p className="text-xs text-muted-foreground">
              +8% improvement
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              This week
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Communication Feed */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Communications</CardTitle>
              <CardDescription>
                Latest interactions with customers and prospects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Input
                    placeholder="Search communications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="call">Call</SelectItem>
                      <SelectItem value="meeting">Meeting</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-4">
                    {filteredCommunications.map((comm) => {
                      const IconComponent = getTypeIcon(comm.type);
                      return (
                        <div key={comm.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <IconComponent className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{comm.contact}</p>
                                <p className="text-sm text-muted-foreground">{comm.company}</p>
                              </div>
                              <div className="text-right">
                                <Badge variant={getDirectionColor(comm.direction) as unknown}>
                                  {comm.direction}
                                </Badge>
                                <p className="text-xs text-muted-foreground mt-1">{comm.timestamp}</p>
                              </div>
                            </div>
                            <p className="text-sm">{comm.subject}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{comm.preview}</p>
                            <div className="flex items-center gap-2 pt-2">
                              <Button variant="ghost" size="sm">
                                <Reply className="h-3 w-3 mr-1" />
                                Reply
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Forward className="h-3 w-3 mr-1" />
                                Forward
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Archive className="h-3 w-3 mr-1" />
                                Archive
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Start new communications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Mail className="h-4 w-4 mr-2" />
                Compose Email
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Phone className="h-4 w-4 mr-2" />
                Make Call
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Meeting
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Send SMS
              </Button>
            </CardContent>
          </Card>

          {/* Communication Types */}
          <Card>
            <CardHeader>
              <CardTitle>Communication Breakdown</CardTitle>
              <CardDescription>
                This month's activity by type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {communicationTypes.map((type) => {
                  const IconComponent = getTypeIcon(type.type.toLowerCase());
                  return (
                    <div key={type.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <IconComponent className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{type.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">{type.count}</div>
                        <div className="text-xs text-muted-foreground">{type.percentage}%</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Follow-ups</CardTitle>
              <CardDescription>
                Scheduled communications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingTasks.map((task) => {
                  const IconComponent = getTypeIcon(task.type);
                  return (
                    <div key={task.id} className="flex items-center gap-3 p-2 border rounded">
                      <IconComponent className="h-4 w-4 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{task.contact}</p>
                        <p className="text-xs text-muted-foreground">{task.task}</p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {task.time}
                      </Badge>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Communications;