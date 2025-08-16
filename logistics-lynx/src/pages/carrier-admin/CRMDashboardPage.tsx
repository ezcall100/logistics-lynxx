/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
// CarrierLayout import removed - layout is provided by App.tsx routing
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, Plus, Edit, Trash2, Phone, Mail, Building, Calendar as CalendarIcon, Users, Target, TrendingUp, DollarSign, Activity, FileText, Clock, CheckCircle, AlertCircle, ArrowUpDown, Filter, Download, Eye, Star, MapPin, Globe, Linkedin, Twitter, Briefcase, User, MessageSquare, Video } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useCRM } from '@/hooks/useCRM';
interface FormData {
  [key: string]: string | number | boolean | Date;
}
const CRMDashboardPage = () => {
  const {
    companies,
    contacts,
    leads,
    opportunities,
    projects,
    events,
    emails,
    activities,
    loading,
    createCompany,
    createContact,
    createLead,
    createOpportunity,
    createProject,
    createEvent,
    createEmail,
    createActivity
  } = useCRM();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<'company' | 'contact' | 'lead' | 'opportunity' | 'project' | 'event' | 'email' | 'activity'>('company');
  const [formData, setFormData] = useState<FormData>({});
  const [selectedItem, setSelectedItem] = useState<unknown>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');

  // Calculate CRM metrics
  const metrics = {
    totalLeads: leads.length,
    qualifiedLeads: leads.filter(l => l.lead_status === 'qualified').length,
    totalOpportunities: opportunities.length,
    totalValue: opportunities.reduce((sum, opp) => sum + (opp.value || 0), 0),
    avgDealSize: opportunities.length > 0 ? opportunities.reduce((sum, opp) => sum + (opp.value || 0), 0) / opportunities.length : 0,
    winRate: opportunities.length > 0 ? opportunities.filter(opp => opp.stage === 'closed_won').length / opportunities.length * 100 : 0,
    activeProjects: projects.filter(p => p.status === 'in_progress').length,
    upcomingEvents: events.filter(e => new Date(e.start_time) > new Date()).length
  };
  const handleCreateItem = async (data: FormData) => {
    try {
      switch (dialogType) {
        case 'company':
          await createCompany({
            name: data.name as string,
            industry: data.industry as string,
            website: data.website as string,
            phone: data.phone as string,
            email: data.email as string,
            description: data.description as string
          });
          break;
        case 'contact':
          await createContact({
            first_name: data.first_name as string,
            last_name: data.last_name as string,
            email: data.email as string,
            phone: data.phone as string,
            job_title: data.job_title as string,
            company_id: data.company_id as string
          });
          break;
        case 'lead':
          await createLead({
            title: data.title as string,
            description: data.description as string,
            contact_id: data.contact_id as string,
            company_id: data.company_id as string,
            estimated_value: Number(data.estimated_value),
            priority: data.priority as string,
            lead_source: data.lead_source as string
          });
          break;
        case 'opportunity':
          await createOpportunity({
            name: data.name as string,
            description: data.description as string,
            contact_id: data.contact_id as string,
            company_id: data.company_id as string,
            value: Number(data.value),
            stage: data.stage as string,
            probability: Number(data.probability)
          });
          break;
        case 'project':
          await createProject({
            name: data.name as string,
            description: data.description as string,
            project_type: data.project_type as string,
            status: data.status as string,
            priority: data.priority as string,
            start_date: (data.start_date as Date).toISOString().split('T')[0],
            end_date: (data.end_date as Date).toISOString().split('T')[0],
            budget: Number(data.budget)
          });
          break;
        case 'event':
          await createEvent({
            title: data.title as string,
            description: data.description as string,
            event_type: data.event_type as string,
            start_time: (data.start_time as Date).toISOString(),
            end_time: (data.end_time as Date).toISOString(),
            location: data.location as string
          });
          break;
        case 'email':
          await createEmail({
            subject: data.subject as string,
            body: data.body as string,
            contact_id: data.contact_id as string,
            email_type: 'outbound'
          });
          break;
        case 'activity':
          await createActivity({
            subject: data.subject as string,
            description: data.description as string,
            activity_type: data.activity_type as string,
            contact_id: data.contact_id as string,
            status: 'completed'
          });
          break;
      }
      setIsDialogOpen(false);
      setFormData({});
    } catch (error) {
      console.error('Error creating item:', error);
    }
  };
  const openDialog = (type: typeof dialogType, item?: unknown) => {
    setDialogType(type);
    setSelectedItem(item);
    setFormData(item || {});
    setIsDialogOpen(true);
  };
  const renderOverviewTab = () => <div className="space-y-6">
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-900 dark:text-blue-100">Total Leads</CardTitle>
            <Target className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900 dark:text-blue-100">{metrics.totalLeads}</div>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              {metrics.qualifiedLeads} qualified
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-900 dark:text-green-100">Opportunities</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-900 dark:text-green-100">{metrics.totalOpportunities}</div>
            <p className="text-xs text-green-600 dark:text-green-400">
              ${(metrics.totalValue / 1000).toFixed(0)}K total value
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-900 dark:text-purple-100">Active Projects</CardTitle>
            <Briefcase className="h-4 w-4 text-purple-600 dark:text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-900 dark:text-purple-100">{metrics.activeProjects}</div>
            <p className="text-xs text-purple-600 dark:text-purple-400">
              {projects.length} total projects
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-900 dark:text-orange-100">Upcoming Events</CardTitle>
            <CalendarIcon className="h-4 w-4 text-orange-600 dark:text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-900 dark:text-orange-100">{metrics.upcomingEvents}</div>
            <p className="text-xs text-orange-600 dark:text-orange-400">
              next 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity & Top Opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.slice(0, 5).map(activity => <div key={activity.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="h-2 w-2 bg-primary rounded-full mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.subject}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={activity.outcome === 'positive' ? 'default' : 'secondary'} className="text-xs">
                        {activity.activity_type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(activity.created_at), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Top Opportunities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {opportunities.sort((a, b) => (b.value || 0) - (a.value || 0)).slice(0, 5).map(opportunity => <div key={opportunity.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{opportunity.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {opportunity.stage}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {opportunity.probability}% probability
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold">${(opportunity.value || 0).toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(opportunity.expected_close_date || ''), 'MMM dd')}
                      </p>
                    </div>
                  </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
  const renderCompaniesTab = () => <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Companies
            </CardTitle>
            <CardDescription>Manage your business relationships and company profiles</CardDescription>
          </div>
          <Button onClick={() => openDialog('company')} className="bg-gradient-to-r from-primary to-primary/80">
            <Plus className="h-4 w-4 mr-2" />
            Add Company
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search companies..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Companies</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {viewMode === 'table' ? <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Contacts</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.filter(company => company.name.toLowerCase().includes(searchTerm.toLowerCase()) || company.industry?.toLowerCase().includes(searchTerm.toLowerCase())).map(company => <TableRow key={company.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-primary/10 to-primary/30 rounded-lg flex items-center justify-center">
                          <Building className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            {company.website && <a href={company.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                                <Globe className="h-3 w-3" />
                                Website
                              </a>}
                            {company.social_media?.linkedin && <a href={company.social_media.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                                <Linkedin className="h-3 w-3" />
                                LinkedIn
                              </a>}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{company.industry}</Badge>
                    </TableCell>
                    <TableCell>{company.company_size}</TableCell>
                    <TableCell>
                      {company.annual_revenue ? `$${(company.annual_revenue / 1000000).toFixed(1)}M` : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3 text-muted-foreground" />
                        {contacts.filter(c => c.company_id === company.id).length}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => openDialog('company', company)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
            </TableBody>
          </Table> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companies.filter(company => company.name.toLowerCase().includes(searchTerm.toLowerCase()) || company.industry?.toLowerCase().includes(searchTerm.toLowerCase())).map(company => <Card key={company.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="h-12 w-12 bg-gradient-to-br from-primary/10 to-primary/30 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                      <Button variant="ghost" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                    <div>
                      <CardTitle className="text-lg">{company.name}</CardTitle>
                      <CardDescription>{company.industry}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{company.employee_count} employees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span>${(company.annual_revenue / 1000000).toFixed(1)}M revenue</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{company.address?.city}, {company.address?.state}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>)}
          </div>}
      </CardContent>
    </Card>;
  const renderContactsTab = () => <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Contacts
            </CardTitle>
            <CardDescription>Manage individual contacts and their information</CardDescription>
          </div>
          <Button onClick={() => openDialog('contact')} className="bg-gradient-to-r from-primary to-primary/80">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search contacts..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Contacts</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="prospect">Prospect</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Position</TableHead>
              <TableHead>Contact Info</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contacts.filter(contact => `${contact.first_name} ${contact.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) || contact.email?.toLowerCase().includes(searchTerm.toLowerCase())).map(contact => {
            const company = companies.find(c => c.id === contact.company_id);
            return <TableRow key={contact.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-full flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">{contact.first_name} {contact.last_name}</p>
                          <p className="text-xs text-muted-foreground">{contact.job_title}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building className="h-3 w-3 text-muted-foreground" />
                        {company?.name || 'No company'}
                      </div>
                    </TableCell>
                    <TableCell>{contact.job_title}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {contact.email && <div className="flex items-center gap-1 text-xs">
                            <Mail className="h-3 w-3 text-muted-foreground" />
                            {contact.email}
                          </div>}
                        {contact.phone && <div className="flex items-center gap-1 text-xs">
                            <Phone className="h-3 w-3 text-muted-foreground" />
                            {contact.phone}
                          </div>}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={contact.contact_status === 'active' ? 'default' : 'secondary'}>
                        {contact.contact_status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => openDialog('contact', contact)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>;
          })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>;
  const renderForm = () => {
    const fields = {
      company: [{
        name: 'name',
        label: 'Company Name',
        type: 'text',
        required: true
      }, {
        name: 'industry',
        label: 'Industry',
        type: 'text',
        required: true
      }, {
        name: 'website',
        label: 'Website',
        type: 'url'
      }, {
        name: 'phone',
        label: 'Phone',
        type: 'tel'
      }, {
        name: 'email',
        label: 'Email',
        type: 'email'
      }, {
        name: 'description',
        label: 'Description',
        type: 'textarea'
      }],
      contact: [{
        name: 'first_name',
        label: 'First Name',
        type: 'text',
        required: true
      }, {
        name: 'last_name',
        label: 'Last Name',
        type: 'text',
        required: true
      }, {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true
      }, {
        name: 'phone',
        label: 'Phone',
        type: 'tel'
      }, {
        name: 'job_title',
        label: 'Job Title',
        type: 'text'
      }, {
        name: 'company_id',
        label: 'Company',
        type: 'select',
        options: companies.map(c => ({
          value: c.id,
          label: c.name
        }))
      }],
      lead: [{
        name: 'title',
        label: 'Lead Title',
        type: 'text',
        required: true
      }, {
        name: 'description',
        label: 'Description',
        type: 'textarea'
      }, {
        name: 'contact_id',
        label: 'Contact',
        type: 'select',
        options: contacts.map(c => ({
          value: c.id,
          label: `${c.first_name} ${c.last_name}`
        }))
      }, {
        name: 'company_id',
        label: 'Company',
        type: 'select',
        options: companies.map(c => ({
          value: c.id,
          label: c.name
        }))
      }, {
        name: 'estimated_value',
        label: 'Estimated Value',
        type: 'number'
      }, {
        name: 'priority',
        label: 'Priority',
        type: 'select',
        options: [{
          value: 'low',
          label: 'Low'
        }, {
          value: 'medium',
          label: 'Medium'
        }, {
          value: 'high',
          label: 'High'
        }, {
          value: 'urgent',
          label: 'Urgent'
        }]
      }, {
        name: 'lead_source',
        label: 'Lead Source',
        type: 'select',
        options: [{
          value: 'website',
          label: 'Website'
        }, {
          value: 'referral',
          label: 'Referral'
        }, {
          value: 'cold_outreach',
          label: 'Cold Outreach'
        }, {
          value: 'event',
          label: 'Event'
        }]
      }]
    };
    const currentFields = fields[dialogType] || [];
    return <div className="space-y-4">
        {currentFields.map(field => <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label} {field.required && <span className="text-red-500">*</span>}</Label>
            {field.type === 'textarea' ? <Textarea id={field.name} value={formData[field.name] as string || ''} onChange={e => setFormData(prev => ({
          ...prev,
          [field.name]: e.target.value
        }))} required={field.required} /> : field.type === 'select' ? <Select value={formData[field.name] as string || ''} onValueChange={value => setFormData(prev => ({
          ...prev,
          [field.name]: value
        }))}>
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map(option => <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>)}
                </SelectContent>
              </Select> : <Input id={field.name} type={field.type} value={formData[field.name] as string || ''} onChange={e => setFormData(prev => ({
          ...prev,
          [field.name]: field.type === 'number' ? Number(e.target.value) : e.target.value
        }))} required={field.required} />}
          </div>)}
      </div>;
  };
  if (loading) {
    return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">Loading CRM data...</p>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              CRM Dashboard
            </h1>
            <p className="text-muted-foreground">Manage your customer relationships and sales pipeline</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button onClick={() => openDialog('company')} className="bg-gradient-to-r from-primary to-primary/80">
              <Plus className="h-4 w-4 mr-2" />
              Quick Add
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          

          <TabsContent value="overview" className="space-y-6">
            {renderOverviewTab()}
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            {renderCompaniesTab()}
          </TabsContent>

          <TabsContent value="contacts" className="space-y-6">
            {renderContactsTab()}
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Leads Pipeline
                  </CardTitle>
                  <Button onClick={() => openDialog('lead')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Lead
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {['new', 'contacted', 'qualified', 'negotiation'].map(status => <Card key={status} className="bg-muted/30">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm capitalize">{status}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {leads.filter(l => l.lead_status === status).length}
                        </div>
                      </CardContent>
                    </Card>)}
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Lead</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Next Action</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map(lead => {
                    const contact = contacts.find(c => c.id === lead.contact_id);
                    const company = companies.find(c => c.id === lead.company_id);
                    return <TableRow key={lead.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{lead.title}</p>
                              <p className="text-xs text-muted-foreground">{company?.name}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {contact ? `${contact.first_name} ${contact.last_name}` : 'No contact'}
                          </TableCell>
                          <TableCell>
                            ${(lead.estimated_value || 0).toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant={lead.lead_status === 'qualified' ? 'default' : 'secondary'}>
                              {lead.lead_status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant={lead.priority === 'urgent' ? 'destructive' : lead.priority === 'high' ? 'default' : 'secondary'}>
                              {lead.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="text-xs">
                              <p>{lead.next_action}</p>
                              {lead.next_action_date && <p className="text-muted-foreground">
                                  {format(new Date(lead.next_action_date), 'MMM dd, yyyy')}
                                </p>}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <MessageSquare className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>;
                  })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog for forms */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedItem ? `Edit ${dialogType}` : `Add New ${dialogType}`}
              </DialogTitle>
              <DialogDescription>
                {selectedItem ? `Update the ${dialogType} information below.` : `Fill in the details to create a new ${dialogType}.`}
              </DialogDescription>
            </DialogHeader>
            {renderForm()}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => handleCreateItem(formData)}>
                {selectedItem ? 'Update' : 'Create'} {dialogType}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>;
};
export default CRMDashboardPage;