import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar,
  Clock,
  Plus,
  Filter,
  Search,
  Phone,
  Mail,
  Users,
  Truck,
  MapPin,
  Building2,
  FileText,
  AlertTriangle,
  CheckCircle,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  Bell,
  Star,
  Navigation,
  DollarSign,
  Package,
  ArrowUpRight,
  MoreHorizontal
} from 'lucide-react';

const TaskCalendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentView, setCurrentView] = useState<'month' | 'week' | 'day'>('month');
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState('meeting');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Comprehensive freight broker events and activities
  const events = [
    {
      id: 1,
      title: 'Load Pickup - Walmart Distribution',
      description: 'Pickup scheduled for Load #WM-2024-001',
      type: 'pickup',
      priority: 'High',
      date: '2024-01-25',
      time: '08:00 AM',
      duration: 60,
      status: 'scheduled',
      assignee: 'Sarah Johnson',
      customer: 'Walmart Logistics',
      loadId: 'WM-2024-001',
      location: 'Atlanta, GA',
      value: '$2,400',
      carrier: 'Express Freight Co.'
    },
    {
      id: 2,
      title: 'Customer Call - Amazon Supply Chain',
      description: 'Quarterly contract renewal discussion',
      type: 'call',
      priority: 'High',
      date: '2024-01-25',
      time: '10:30 AM',
      duration: 45,
      status: 'confirmed',
      assignee: 'Mike Chen',
      customer: 'Amazon Supply Chain',
      value: '$150,000',
      notes: 'Prepare rate sheets and performance metrics'
    },
    {
      id: 3,
      title: 'Carrier Onboarding - FastLine Transport',
      description: 'Complete carrier setup and documentation',
      type: 'meeting',
      priority: 'Medium',
      date: '2024-01-25',
      time: '02:00 PM',
      duration: 90,
      status: 'pending',
      assignee: 'Lisa Rodriguez',
      carrier: 'FastLine Transport',
      location: 'Office Conference Room A'
    },
    {
      id: 4,
      title: 'Load Delivery - Target Distribution',
      description: 'Delivery confirmation for Load #TG-2024-003',
      type: 'delivery',
      priority: 'Medium',
      date: '2024-01-26',
      time: '11:00 AM',
      duration: 30,
      status: 'in-transit',
      loadId: 'TG-2024-003',
      location: 'Chicago, IL',
      value: '$1,850',
      carrier: 'Midwest Express'
    },
    {
      id: 5,
      title: 'Rate Negotiation - Home Depot',
      description: 'Q2 rate discussion and contract terms',
      type: 'negotiation',
      priority: 'High',
      date: '2024-01-26',
      time: '03:30 PM',
      duration: 120,
      status: 'scheduled',
      assignee: 'Robert Davis',
      customer: 'Home Depot Logistics',
      value: '$85,000',
      location: 'Virtual Meeting'
    },
    {
      id: 6,
      title: 'Driver Check-in - Cross Country Routes',
      description: 'Weekly driver performance review',
      type: 'driver_checkin',
      priority: 'Low',
      date: '2024-01-27',
      time: '09:00 AM',
      duration: 30,
      status: 'recurring',
      assignee: 'Jennifer Wilson',
      driver: 'John Martinez',
      route: 'CA → NY Corridor'
    },
    {
      id: 7,
      title: 'Load Board Review',
      description: 'Daily load board analysis and posting',
      type: 'operations',
      priority: 'Medium',
      date: '2024-01-27',
      time: '07:00 AM',
      duration: 45,
      status: 'daily',
      assignee: 'Operations Team',
      loadCount: 15,
      avgRate: '$2.85/mile'
    }
  ];

  // Task management for freight operations
  const tasks = [
    {
      id: 1,
      title: 'Update Carrier Insurance Certificates',
      description: 'Review and update expiring insurance for 5 carriers',
      category: 'compliance',
      priority: 'High',
      dueDate: '2024-01-25',
      status: 'pending',
      assignee: 'Sarah Johnson',
      carriersCount: 5
    },
    {
      id: 2,
      title: 'Prepare Monthly Performance Reports',
      description: 'Generate carrier and customer performance analytics',
      category: 'reporting',
      priority: 'Medium',
      dueDate: '2024-01-28',
      status: 'in-progress',
      assignee: 'Mike Chen',
      completion: 65
    },
    {
      id: 3,
      title: 'Follow up on Outstanding Invoices',
      description: 'Contact customers with overdue payments',
      category: 'finance',
      priority: 'High',
      dueDate: '2024-01-26',
      status: 'pending',
      assignee: 'Lisa Rodriguez',
      invoiceCount: 8,
      totalAmount: '$24,500'
    },
    {
      id: 4,
      title: 'Load Matching Optimization',
      description: 'Implement new algorithm for better load-carrier matching',
      category: 'technology',
      priority: 'Low',
      dueDate: '2024-01-30',
      status: 'planned',
      assignee: 'Tech Team',
      expectedImpact: '15% efficiency improvement'
    }
  ];

  // Quick stats for the dashboard
  const todayStats = {
    totalEvents: events.filter(e => e.date === '2024-01-25').length,
    pendingTasks: tasks.filter(t => t.status === 'pending').length,
    activeLoads: 247,
    todayRevenue: '$45,200',
    callsScheduled: events.filter(e => e.type === 'call' && e.date === '2024-01-25').length,
    meetingsToday: events.filter(e => e.type === 'meeting' && e.date === '2024-01-25').length
  };

  const getEventTypeIcon = (type: string) => {
    switch (type) {
      case 'pickup': return Truck;
      case 'delivery': return Package;
      case 'call': return Phone;
      case 'meeting': return Users;
      case 'negotiation': return DollarSign;
      case 'driver_checkin': return Navigation;
      case 'operations': return Building2;
      default: return Calendar;
    }
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'pickup': return 'bg-blue-500 text-white';
      case 'delivery': return 'bg-green-500 text-white';
      case 'call': return 'bg-purple-500 text-white';
      case 'meeting': return 'bg-orange-500 text-white';
      case 'negotiation': return 'bg-emerald-500 text-white';
      case 'driver_checkin': return 'bg-gray-500 text-white';
      case 'operations': return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-50';
      case 'pending': return 'text-orange-600 bg-orange-50';
      case 'in-transit': return 'text-blue-600 bg-blue-50';
      case 'scheduled': return 'text-purple-600 bg-purple-50';
      case 'completed': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'compliance': return AlertTriangle;
      case 'reporting': return FileText;
      case 'finance': return DollarSign;
      case 'technology': return Building2;
      default: return Clock;
    }
  };

  // Calendar grid generation
  const generateCalendarDays = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  const calendarDays = generateCalendarDays();
  const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || event.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Enhanced Header with Quick Stats */}
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Freight Operations Calendar
            </h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive scheduling and task management for freight operations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={currentView} onValueChange={(value) => setCurrentView(value as unknown)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Month</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="day">Day</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-blue-600 to-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Event
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Schedule New Event</DialogTitle>
                  <DialogDescription>
                    Create a new freight operation event or meeting
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title">Event Title</Label>
                      <Input id="title" placeholder="Enter event title" />
                    </div>
                    <div>
                      <Label htmlFor="type">Event Type</Label>
                      <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pickup">Load Pickup</SelectItem>
                          <SelectItem value="delivery">Load Delivery</SelectItem>
                          <SelectItem value="call">Customer Call</SelectItem>
                          <SelectItem value="meeting">Meeting</SelectItem>
                          <SelectItem value="negotiation">Rate Negotiation</SelectItem>
                          <SelectItem value="driver_checkin">Driver Check-in</SelectItem>
                          <SelectItem value="operations">Operations Review</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Event description..." />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" />
                    </div>
                    <div>
                      <Label htmlFor="duration">Duration (min)</Label>
                      <Input id="duration" type="number" placeholder="60" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setShowEventDialog(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setShowEventDialog(false)}>
                      Schedule Event
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Quick Stats Dashboard */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today's Events</p>
                  <p className="text-2xl font-bold">{todayStats.totalEvents}</p>
                </div>
                <CalendarIcon className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Tasks</p>
                  <p className="text-2xl font-bold">{todayStats.pendingTasks}</p>
                </div>
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Loads</p>
                  <p className="text-2xl font-bold">{todayStats.activeLoads}</p>
                </div>
                <Truck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Today Revenue</p>
                  <p className="text-2xl font-bold">{todayStats.todayRevenue}</p>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Calls Today</p>
                  <p className="text-2xl font-bold">{todayStats.callsScheduled}</p>
                </div>
                <Phone className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Meetings</p>
                  <p className="text-2xl font-bold">{todayStats.meetingsToday}</p>
                </div>
                <Users className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Calendar Interface */}
      <Tabs defaultValue="calendar" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="calendar">Calendar View</TabsTrigger>
          <TabsTrigger value="events">Events & Meetings</TabsTrigger>
          <TabsTrigger value="tasks">Task Management</TabsTrigger>
          <TabsTrigger value="loads">Load Schedule</TabsTrigger>
          <TabsTrigger value="analytics">Calendar Analytics</TabsTrigger>
        </TabsList>

        {/* Calendar View Tab */}
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  {currentMonth}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    Today
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="text-center font-semibold py-2 text-sm text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {calendarDays.map((day, index) => {
                  const dayEvents = events.filter(event => 
                    new Date(event.date).toDateString() === day.toDateString()
                  );
                  const isCurrentMonth = day.getMonth() === new Date().getMonth();
                  const isToday = day.toDateString() === new Date().toDateString();
                  
                  return (
                    <div
                      key={index}
                      className={`
                        min-h-[100px] p-2 border rounded-lg transition-colors cursor-pointer
                        ${isCurrentMonth ? 'bg-background' : 'bg-muted/50'}
                        ${isToday ? 'bg-blue-50 border-blue-200' : ''}
                        hover:bg-accent
                      `}
                    >
                      <div className={`text-sm font-medium mb-1 ${isCurrentMonth ? '' : 'text-muted-foreground'}`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 3).map((event) => {
                          const IconComponent = getEventTypeIcon(event.type);
                          return (
                            <div
                              key={event.id}
                              className={`text-xs p-1 rounded flex items-center gap-1 ${getEventTypeColor(event.type)}`}
                            >
                              <IconComponent className="h-3 w-3" />
                              <span className="truncate">{event.title}</span>
                            </div>
                          );
                        })}
                        {dayEvents.length > 3 && (
                          <div className="text-xs text-muted-foreground">
                            +{dayEvents.length - 3} more
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Events & Meetings Tab */}
        <TabsContent value="events" className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search events and meetings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Events</SelectItem>
                <SelectItem value="pickup">Load Pickups</SelectItem>
                <SelectItem value="delivery">Load Deliveries</SelectItem>
                <SelectItem value="call">Customer Calls</SelectItem>
                <SelectItem value="meeting">Meetings</SelectItem>
                <SelectItem value="negotiation">Negotiations</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {filteredEvents.map((event) => {
              const IconComponent = getEventTypeIcon(event.type);
              return (
                <Card key={event.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-lg ${getEventTypeColor(event.type)}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{event.title}</h3>
                            <Badge className={getPriorityColor(event.priority)} variant="outline">
                              {event.priority}
                            </Badge>
                            <Badge className={getStatusColor(event.status)} variant="outline">
                              {event.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{event.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{event.date} at {event.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span>{event.duration} minutes</span>
                            </div>
                            {event.assignee && (
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span>{event.assignee}</span>
                              </div>
                            )}
                            {event.location && (
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground" />
                                <span>{event.location}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Event-specific details */}
                          {(event.loadId || event.customer || event.carrier || event.value) && (
                            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                                {event.loadId && (
                                  <div>
                                    <span className="font-medium">Load ID:</span> {event.loadId}
                                  </div>
                                )}
                                {event.customer && (
                                  <div>
                                    <span className="font-medium">Customer:</span> {event.customer}
                                  </div>
                                )}
                                {event.carrier && (
                                  <div>
                                    <span className="font-medium">Carrier:</span> {event.carrier}
                                  </div>
                                )}
                                {event.value && (
                                  <div>
                                    <span className="font-medium">Value:</span> {event.value}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Task Management Tab */}
        <TabsContent value="tasks" className="space-y-4">
          <div className="grid gap-4">
            {tasks.map((task) => {
              const IconComponent = getCategoryIcon(task.category);
              return (
                <Card key={task.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 rounded-lg bg-blue-50">
                          <IconComponent className="h-5 w-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{task.title}</h3>
                            <Badge className={getPriorityColor(task.priority)} variant="outline">
                              {task.priority}
                            </Badge>
                            <Badge variant="secondary">
                              {task.category}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{task.description}</p>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>Due: {task.dueDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span>{task.assignee}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CheckCircle className={`h-4 w-4 ${
                                task.status === 'completed' ? 'text-green-600' : 'text-muted-foreground'
                              }`} />
                              <span className="capitalize">{task.status}</span>
                            </div>
                          </div>

                          {/* Task-specific details */}
                          {(task.carriersCount || task.completion || task.invoiceCount || task.expectedImpact) && (
                            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                                {task.carriersCount && (
                                  <div>
                                    <span className="font-medium">Carriers:</span> {task.carriersCount}
                                  </div>
                                )}
                                {task.completion && (
                                  <div>
                                    <span className="font-medium">Progress:</span> {task.completion}%
                                  </div>
                                )}
                                {task.invoiceCount && (
                                  <div>
                                    <span className="font-medium">Invoices:</span> {task.invoiceCount}
                                  </div>
                                )}
                                {task.totalAmount && (
                                  <div>
                                    <span className="font-medium">Amount:</span> {task.totalAmount}
                                  </div>
                                )}
                                {task.expectedImpact && (
                                  <div className="col-span-2">
                                    <span className="font-medium">Expected Impact:</span> {task.expectedImpact}
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Load Schedule Tab */}
        <TabsContent value="loads" className="space-y-4">
          <div className="grid gap-4">
            {events.filter(e => e.type === 'pickup' || e.type === 'delivery').map((loadEvent) => {
              const IconComponent = getEventTypeIcon(loadEvent.type);
              return (
                <Card key={loadEvent.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className={`p-3 rounded-lg ${getEventTypeColor(loadEvent.type)}`}>
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-lg">{loadEvent.title}</h3>
                            <Badge className={getPriorityColor(loadEvent.priority)} variant="outline">
                              {loadEvent.priority}
                            </Badge>
                            <Badge className={getStatusColor(loadEvent.status)} variant="outline">
                              {loadEvent.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{loadEvent.description}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span>{loadEvent.date} at {loadEvent.time}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{loadEvent.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-muted-foreground" />
                              <span>{loadEvent.value}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Truck className="h-4 w-4 text-muted-foreground" />
                              <span>{loadEvent.carrier}</span>
                            </div>
                          </div>

                          <div className="p-3 bg-muted/50 rounded-lg">
                            <div className="flex items-center justify-between text-sm">
                              <span><strong>Load ID:</strong> {loadEvent.loadId}</span>
                              <span><strong>Customer:</strong> {loadEvent.customer}</span>
                              <Button variant="outline" size="sm">
                                <ArrowUpRight className="h-4 w-4 mr-1" />
                                Track Load
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Calendar Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Event Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {['pickup', 'delivery', 'call', 'meeting', 'negotiation'].map((type) => {
                    const count = events.filter(e => e.type === type).length;
                    const percentage = (count / events.length) * 100;
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <span className="text-sm capitalize">{type.replace('_', ' ')}</span>
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-muted rounded-full">
                            <div
                              className="h-2 bg-primary rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{count}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>This Week Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Events</span>
                    <span className="font-bold">{events.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">High Priority</span>
                    <span className="font-bold text-red-600">
                      {events.filter(e => e.priority === 'High').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Completed</span>
                    <span className="font-bold text-green-600">
                      {events.filter(e => e.status === 'completed').length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Revenue Events</span>
                    <span className="font-bold text-emerald-600">
                      ${events.reduce((sum, e) => sum + (parseFloat(e.value?.replace(/[^0-9.-]+/g, '') || '0')), 0).toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Productivity Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm">Completion Rate</span>
                    <span className="font-bold text-green-600">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Avg Event Duration</span>
                    <span className="font-bold">68 min</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Events per Day</span>
                    <span className="font-bold">5.2</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Load Efficiency</span>
                    <span className="font-bold text-blue-600">92%</span>
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

export default TaskCalendar;