/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { 
  UserPlus, 
  Users, 
  TrendingUp, 
  Phone,
  Mail,
  Calendar,
  Filter,
  Search,
  Plus,
  MoreHorizontal,
  RefreshCw,
  Star,
  Building2,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const CRMLeads = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const leadMetrics = [
    { title: 'Total Leads', value: '2,847', change: '+234', icon: Users },
    { title: 'New This Week', value: '156', change: '+23', icon: UserPlus },
    { title: 'Conversion Rate', value: '24.3%', change: '+2.1%', icon: TrendingUp },
    { title: 'Hot Leads', value: '67', change: '+12', icon: Star },
  ];

  const leads = [
    {
      id: 1,
      name: 'TechFlow Solutions',
      contact: 'John Smith',
      email: 'john@techflow.com',
      phone: '+1 (555) 123-4567',
      status: 'Hot',
      source: 'Website',
      value: '$125,000',
      score: 95,
      lastActivity: '2 hours ago'
    },
    {
      id: 2,
      name: 'Global Logistics Inc',
      contact: 'Sarah Johnson',
      email: 'sarah@globallogistics.com',
      phone: '+1 (555) 987-6543',
      status: 'Warm',
      source: 'Referral',
      value: '$78,500',
      score: 82,
      lastActivity: '1 day ago'
    },
    {
      id: 3,
      name: 'StartupXYZ',
      contact: 'Mike Davis',
      email: 'mike@startupxyz.com',
      phone: '+1 (555) 456-7890',
      status: 'Cold',
      source: 'Trade Show',
      value: '$45,200',
      score: 65,
      lastActivity: '3 days ago'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Hot': return 'bg-red-100 text-red-800 border-red-200';
      case 'Warm': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Cold': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleViewLead = (lead: any) => {
    setSelectedLead(lead);
    setIsViewDialogOpen(true);
  };

  const handleEditLead = (lead: any) => {
    setSelectedLead(lead);
    setIsEditDialogOpen(true);
  };

  const handleDeleteLead = (lead: any) => {
    setSelectedLead(lead);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteLead = () => {
    if (selectedLead) {
      console.log('Deleting lead:', selectedLead);
      // Implement actual delete logic here
      setIsDeleteDialogOpen(false);
      setSelectedLead(null);
    }
  };

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Leads Management</h1>
            <p className="text-muted-foreground">
              Track and manage your sales leads and prospects
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={handleRefresh} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Lead
            </Button>
          </div>
        </div>

        {/* Lead Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {leadMetrics.map((metric) => (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                <metric.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{metric.change}</span> from last week
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>All Leads</CardTitle>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leads.map((lead) => (
                <div key={lead.id} className="p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Building2 className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{lead.name}</h4>
                          <Badge className={getStatusColor(lead.status)}>
                            {lead.status}
                          </Badge>
                          <Badge variant="outline">Score: {lead.score}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Contact: {lead.contact}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            {lead.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {lead.phone}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600 mb-1">
                        {lead.value}
                      </div>
                      <div className="text-xs text-muted-foreground mb-2">
                        Source: {lead.source}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Last activity: {lead.lastActivity}
                      </div>
                      <div className="flex gap-1 mt-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-3 w-3" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Calendar className="h-3 w-3" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm">
                              <MoreHorizontal className="h-3 w-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewLead(lead)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditLead(lead)}>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Lead
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDeleteLead(lead)}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete Lead
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Lead Sources & Pipeline */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Lead Sources</CardTitle>
              <CardDescription>Where your leads are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { source: 'Website', count: 847, percentage: 35 },
                  { source: 'Referrals', count: 623, percentage: 26 },
                  { source: 'Trade Shows', count: 445, percentage: 18 },
                  { source: 'Social Media', count: 312, percentage: 13 },
                  { source: 'Cold Calls', count: 198, percentage: 8 }
                ].map((item) => (
                  <div key={item.source} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.source}</div>
                      <div className="text-sm text-muted-foreground">{item.count} leads</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.percentage}%</div>
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lead Pipeline</CardTitle>
              <CardDescription>Leads by stage in your pipeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { stage: 'New Leads', count: 234, color: 'bg-blue-500' },
                  { stage: 'Contacted', count: 156, color: 'bg-yellow-500' },
                  { stage: 'Qualified', count: 89, color: 'bg-orange-500' },
                  { stage: 'Proposal Sent', count: 45, color: 'bg-purple-500' },
                  { stage: 'Negotiation', count: 23, color: 'bg-green-500' }
                ].map((item) => (
                  <div key={item.stage} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${item.color}`} />
                      <span className="font-medium">{item.stage}</span>
                    </div>
                    <Badge variant="secondary">{item.count}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Lead</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedLead?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteLead} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </SuperAdminLayout>
  );
};

export default CRMLeads;