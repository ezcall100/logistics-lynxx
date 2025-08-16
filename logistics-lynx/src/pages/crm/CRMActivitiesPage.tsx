import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Activity,
  Phone,
  Mail,
  Calendar,
  MessageSquare,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  Building2
} from 'lucide-react';
import { useCRMActivities } from '@/hooks/crm/useCRMActivities';
import { useCRMContacts } from '@/hooks/crm/useCRMContacts';
import { useCRMCompanies } from '@/hooks/crm/useCRMCompanies';
import { useToast } from '@/hooks/use-toast';
import Layout from '@/components/layout/Layout';
import type { CRMActivity } from '@/types/crm';

// Sample data for demonstration
const sampleActivities: Partial<CRMActivity>[] = [
  {
    id: '1',
    activity_type: 'call',
    subject: 'Discussed logistics requirements',
    description: 'Had a detailed conversation about their Q2 shipping needs. They require 50+ truckloads monthly for the Chicago-Dallas route.',
    status: 'completed',
    duration_minutes: 45,
    outcome: 'positive',
    next_action: 'Send detailed proposal',
    next_action_date: '2024-02-15T10:00:00Z',
    contact_id: '1',
    company_id: '1',
    created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    activity_type: 'email',
    subject: 'Rate quote follow-up',
    description: 'Sent updated rate quotes for their LTL shipments. Included competitive pricing and value-added services.',
    status: 'completed',
    outcome: 'neutral',
    next_action: 'Schedule rate negotiation meeting',
    next_action_date: '2024-02-18T14:00:00Z',
    contact_id: '2',
    company_id: '2',
    created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updated_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    activity_type: 'meeting',
    subject: 'Contract negotiation session',
    description: 'Met with procurement team to discuss contract terms, service levels, and performance metrics.',
    status: 'completed',
    duration_minutes: 90,
    outcome: 'positive',
    next_action: 'Prepare contract draft',
    next_action_date: '2024-02-20T09:00:00Z',
    contact_id: '3',
    company_id: '3',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

const CRMActivitiesPage = () => {
  const { activities, createActivity, fetchActivities } = useCRMActivities();
  const { contacts, fetchContacts } = useCRMContacts();
  const { companies, fetchCompanies } = useCRMCompanies();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    activity_type: 'note',
    subject: '',
    description: '',
    status: 'planned',
    duration_minutes: '',
    outcome: '',
    next_action: '',
    next_action_date: '',
    contact_id: '',
    company_id: ''
  });

  useEffect(() => {
    fetchActivities();
    fetchContacts();
    fetchCompanies();
  }, [fetchActivities, fetchCompanies, fetchContacts]);

  // Use sample data if no activities exist
  const displayActivities = activities.length > 0 ? activities : sampleActivities as CRMActivity[];

  const filteredActivities = displayActivities.filter(activity => {
    const matchesSearch = 
      activity.subject?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      activity.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || activity.activity_type === selectedType;
    const matchesStatus = selectedStatus === 'all' || activity.status === selectedStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalActivities = displayActivities.length;
  const completedActivities = displayActivities.filter(a => a.status === 'completed').length;
  const plannedActivities = displayActivities.filter(a => a.status === 'planned').length;
  const completionRate = totalActivities > 0 ? (completedActivities / totalActivities) * 100 : 0;

  const activityTypeStats = {
    call: displayActivities.filter(a => a.activity_type === 'call').length,
    email: displayActivities.filter(a => a.activity_type === 'email').length,
    meeting: displayActivities.filter(a => a.activity_type === 'meeting').length,
    note: displayActivities.filter(a => a.activity_type === 'note').length
  };

  const handleCreateActivity = async () => {
    try {
      const activityData = {
        ...formData,
        duration_minutes: formData.duration_minutes ? parseInt(formData.duration_minutes) : undefined
      };
      await createActivity(activityData);
      setIsCreateModalOpen(false);
      resetForm();
      toast({
        title: 'Success',
        description: 'Activity created successfully'
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create activity',
        variant: 'destructive'
      });
    }
  };

  const resetForm = () => {
    setFormData({
      activity_type: 'note',
      subject: '',
      description: '',
      status: 'planned',
      duration_minutes: '',
      outcome: '',
      next_action: '',
      next_action_date: '',
      contact_id: '',
      company_id: ''
    });
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'call': return Phone;
      case 'email': return Mail;
      case 'meeting': return Calendar;
      case 'note': return MessageSquare;
      default: return Activity;
    }
  };

  const getActivityTypeColor = (type: string) => {
    switch (type) {
      case 'call': return 'bg-blue-100 text-blue-800';
      case 'email': return 'bg-green-100 text-green-800';
      case 'meeting': return 'bg-purple-100 text-purple-800';
      case 'note': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getOutcomeIcon = (outcome: string) => {
    switch (outcome) {
      case 'positive': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'negative': return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'neutral': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Activities</h1>
            <p className="text-muted-foreground">Track all your CRM interactions and communications</p>
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Log Activity
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalActivities}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedActivities}</div>
              <p className="text-xs text-muted-foreground">{completionRate.toFixed(1)}% completion rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Planned</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{plannedActivities}</div>
              <p className="text-xs text-muted-foreground">Upcoming activities</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Week</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">Activities logged</p>
            </CardContent>
          </Card>
        </div>

        {/* Activity Type Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
            <CardDescription>Breakdown by activity type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{activityTypeStats.call}</div>
                <div className="text-sm text-muted-foreground">Calls</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{activityTypeStats.email}</div>
                <div className="text-sm text-muted-foreground">Emails</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">{activityTypeStats.meeting}</div>
                <div className="text-sm text-muted-foreground">Meetings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">{activityTypeStats.note}</div>
                <div className="text-sm text-muted-foreground">Notes</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Activities Table */}
        <Card>
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
            <CardDescription>Comprehensive record of all CRM activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="call">Calls</SelectItem>
                  <SelectItem value="email">Emails</SelectItem>
                  <SelectItem value="meeting">Meetings</SelectItem>
                  <SelectItem value="note">Notes</SelectItem>
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="planned">Planned</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Activity</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Contact/Company</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Outcome</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivities.map((activity) => {
                    const ActivityIcon = getActivityIcon(activity.activity_type || '');
                    return (
                      <TableRow key={activity.id}>
                        <TableCell>
                          <div className="flex items-start gap-3">
                            <div className="rounded-full bg-primary/10 p-2 mt-1">
                              <ActivityIcon className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-medium">{activity.subject}</div>
                              <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                {activity.description}
                              </div>
                              {activity.duration_minutes && (
                                <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {activity.duration_minutes} minutes
                                </div>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getActivityTypeColor(activity.activity_type || '')}>
                            {activity.activity_type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            {activity.contact && (
                              <div className="flex items-center gap-2 text-sm">
                                <User className="h-3 w-3" />
                                {activity.contact.first_name} {activity.contact.last_name}
                              </div>
                            )}
                            {activity.company && (
                              <div className="flex items-center gap-2 text-sm">
                                <Building2 className="h-3 w-3" />
                                {activity.company.name}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(activity.status || '')}>
                            {activity.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getOutcomeIcon(activity.outcome || '')}
                            <span className="capitalize">{activity.outcome || 'N/A'}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(activity.created_at).toLocaleDateString()}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(activity.created_at).toLocaleTimeString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Create Activity Dialog */}
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Log New Activity</DialogTitle>
              <DialogDescription>
                Record a new CRM activity or interaction
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="activity_type">Activity Type</Label>
                <Select value={formData.activity_type} onValueChange={(value) => setFormData({...formData, activity_type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="call">Call</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="note">Note</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="planned">Planned</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Brief description of the activity"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact_id">Contact</Label>
                <Select value={formData.contact_id} onValueChange={(value) => setFormData({...formData, contact_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map((contact) => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.first_name} {contact.last_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_id">Company</Label>
                <Select value={formData.company_id} onValueChange={(value) => setFormData({...formData, company_id: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration_minutes">Duration (minutes)</Label>
                <Input
                  id="duration_minutes"
                  type="number"
                  value={formData.duration_minutes}
                  onChange={(e) => setFormData({...formData, duration_minutes: e.target.value})}
                  placeholder="30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="outcome">Outcome</Label>
                <Select value={formData.outcome} onValueChange={(value) => setFormData({...formData, outcome: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="positive">Positive</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="negative">Negative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Detailed description of the activity..."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="next_action">Next Action</Label>
                <Input
                  id="next_action"
                  value={formData.next_action}
                  onChange={(e) => setFormData({...formData, next_action: e.target.value})}
                  placeholder="Follow up with proposal"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="next_action_date">Next Action Date</Label>
                <Input
                  id="next_action_date"
                  type="datetime-local"
                  value={formData.next_action_date}
                  onChange={(e) => setFormData({...formData, next_action_date: e.target.value})}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setIsCreateModalOpen(false);
                resetForm();
              }}>
                Cancel
              </Button>
              <Button onClick={handleCreateActivity}>
                Log Activity
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default CRMActivitiesPage;