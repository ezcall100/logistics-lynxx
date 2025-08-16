/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Plus, 
  Calendar as CalendarIcon, 
  Clock,
  MapPin,
  Video,
  Eye,
  Edit,
  Trash2,
  Download,
  Building2,
  User,
  CheckCircle,
  AlertCircle,
  Users
} from 'lucide-react';
import { useCRMEvents } from '@/hooks/crm/useCRMEvents';
import { useCRM } from '@/hooks/useCRM';
import { CRMStatsCard } from '@/components/crm/shared/CRMStatsCard';

const CRMCalendarPage: React.FC = () => {
  const { events, fetchEvents } = useCRMEvents();
  const { contacts, companies } = useCRM();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [typeFilter, setTypeFilter] = React.useState('all');

  React.useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const filteredEvents = events.filter(event => {
    const matchesSearch = 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === 'all' || event.event_type === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const getEventStats = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcoming = events.filter(event => new Date(event.start_time) > today).length;
    const thisWeek = events.filter(event => {
      const eventDate = new Date(event.start_time);
      const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      return eventDate >= today && eventDate <= weekFromNow;
    }).length;
    
    const completed = events.filter(event => event.status === 'completed').length;
    
    return {
      total: events.length,
      upcoming,
      thisWeek,
      completed,
      meetings: events.filter(e => e.event_type === 'meeting').length
    };
  };

  const stats = getEventStats();

  const getEventTypeColor = (type?: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-100 text-blue-800';
      case 'call': return 'bg-green-100 text-green-800';
      case 'email': return 'bg-purple-100 text-purple-800';
      case 'task': return 'bg-orange-100 text-orange-800';
      case 'demo': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rescheduled': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-3 w-3" />;
      case 'cancelled': return <AlertCircle className="h-3 w-3" />;
      default: return <Clock className="h-3 w-3" />;
    }
  };

  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

  const isToday = (dateTime: string) => {
    const eventDate = new Date(dateTime);
    const today = new Date();
    return eventDate.toDateString() === today.toDateString();
  };

  const isUpcoming = (dateTime: string) => {
    return new Date(dateTime) > new Date();
  };

  // Group events by date
  const groupedEvents = filteredEvents.reduce((groups, event) => {
    const date = new Date(event.start_time).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(event);
    return groups;
  }, {} as Record<string, typeof filteredEvents>);

  return (
    <SuperAdminLayout>
      <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">CRM Calendar</h1>
          <p className="text-muted-foreground">Manage your meetings, calls, and events</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Schedule Event
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <CRMStatsCard
          title="Total Events"
          value={stats.total}
          icon={CalendarIcon}
          iconColor="text-blue-600"
        />
        <CRMStatsCard
          title="Upcoming"
          value={stats.upcoming}
          icon={Clock}
          iconColor="text-orange-600"
        />
        <CRMStatsCard
          title="This Week"
          value={stats.thisWeek}
          icon={CalendarIcon}
          iconColor="text-purple-600"
        />
        <CRMStatsCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle}
          iconColor="text-green-600"
        />
        <CRMStatsCard
          title="Meetings"
          value={stats.meetings}
          icon={Users}
          iconColor="text-indigo-600"
        />
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={typeFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTypeFilter('all')}
              >
                All
              </Button>
              {['meeting', 'call', 'demo', 'task'].map(type => (
                <Button
                  key={type}
                  variant={typeFilter === type ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTypeFilter(type)}
                  className="capitalize"
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {Object.entries(groupedEvents)
              .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
              .map(([date, dayEvents]) => (
                <div key={date}>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-lg font-medium text-foreground">
                      {new Date(date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h3>
                    {isToday(date) && (
                      <Badge className="bg-blue-100 text-blue-800">Today</Badge>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    {dayEvents
                      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
                      .map((event) => {
                        const { time: startTime } = formatDateTime(event.start_time);
                        const { time: endTime } = formatDateTime(event.end_time);
                        
                        return (
                          <div key={event.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-medium text-foreground">{event.title}</h4>
                                  <Badge className={getEventTypeColor(event.event_type)}>
                                    {event.event_type}
                                  </Badge>
                                  <Badge className={getStatusColor(event.status)}>
                                    {getStatusIcon(event.status)}
                                    <span className="ml-1 capitalize">{event.status}</span>
                                  </Badge>
                                </div>
                                
                                {event.description && (
                                  <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                                )}
                                
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {startTime} - {endTime}
                                  </div>
                                  
                                  {event.location && (
                                    <div className="flex items-center gap-1">
                                      <MapPin className="h-3 w-3" />
                                      {event.location}
                                    </div>
                                  )}
                                  
                                  {event.meeting_link && (
                                    <div className="flex items-center gap-1">
                                      <Video className="h-3 w-3" />
                                      Video Meeting
                                    </div>
                                  )}
                                  
                                  {event.attendees && event.attendees.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      <Users className="h-3 w-3" />
                                      {event.attendees.length} attendees
                                    </div>
                                  )}
                                </div>

                                {(event.contact || event.company) && (
                                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                    {event.contact && (
                                      <div className="flex items-center gap-1">
                                        <User className="h-3 w-3" />
                                        {event.contact.first_name} {event.contact.last_name}
                                      </div>
                                    )}
                                    {event.company && (
                                      <div className="flex items-center gap-1">
                                        <Building2 className="h-3 w-3" />
                                        {event.company.name}
                                      </div>
                                    )}
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
                        );
                      })}
                  </div>
                </div>
              ))}

            {Object.keys(groupedEvents).length === 0 && (
              <div className="text-center py-8">
                <CalendarIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No events found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm ? 'Try adjusting your search terms.' : 'Get started by scheduling your first event.'}
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Event
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

export default CRMCalendarPage;