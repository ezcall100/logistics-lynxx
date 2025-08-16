/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CRMOverview } from './CRMOverview';
import { CRMEmails } from './CRMEmails';
import { CRMLeads } from './CRMLeads';
import CRMContacts from './CRMContacts';
import { CRMProjects } from './CRMProjects';
import { CRMCalendar } from './CRMCalendar';
import { CRMOpportunities } from './CRMOpportunities';
import { useCRM } from '@/hooks/useCRM';
import { useAuth } from '@/context/AuthContext';
import { 
  Users, 
  Mail, 
  Target, 
  Contact, 
  FolderKanban, 
  Calendar, 
  Trophy,
  Search,
  Filter,
  Plus,
  BarChart3,
  Settings,
  Download,
  Bell,
  Star
} from 'lucide-react';

const CRMDashboard = () => {
  const { 
    contacts, 
    companies, 
    leads, 
    opportunities, 
    projects, 
    events, 
    emails, 
    activities,
    loading 
  } = useCRM();
  
  const { selectedRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded-lg w-48 mx-auto" />
          <div className="h-4 bg-muted rounded w-32 mx-auto" />
        </div>
      </div>
    );
  }

  // Calculate stats for overview - matching the expected interface
  const stats = {
    totalContacts: contacts.length,
    activeLeads: leads.filter(l => !['closed_won', 'closed_lost'].includes(l.lead_status || '')).length,
    openOpportunities: opportunities.filter(o => !['closed_won', 'closed_lost'].includes(o.stage || '')).length,
    activeProjects: projects.filter(p => ['planning', 'in_progress'].includes(p.status || '')).length,
    upcomingEvents: events.filter(e => new Date(e.start_time) > new Date()).length,
    recentEmails: emails.filter(e => {
      const emailDate = new Date(e.created_at);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return emailDate > weekAgo;
    }).length,
    totalPipelineValue: opportunities
      .filter(o => !['closed_lost'].includes(o.stage || ''))
      .reduce((sum, o) => sum + (o.value || 0), 0)
  };

  // Role-based tab configuration
  const getTabsForRole = () => {
    const allTabs = [
      { id: 'overview', label: 'Overview', icon: BarChart3, count: null },
      { id: 'contacts', label: 'Contacts', icon: Users, count: stats.totalContacts },
      { id: 'leads', label: 'Leads', icon: Target, count: stats.activeLeads },
      { id: 'opportunities', label: 'Opportunities', icon: Trophy, count: stats.openOpportunities },
      { id: 'projects', label: 'Projects', icon: FolderKanban, count: stats.activeProjects },
      { id: 'emails', label: 'Emails', icon: Mail, count: stats.recentEmails },
      { id: 'calendar', label: 'Calendar', icon: Calendar, count: stats.upcomingEvents }
    ];

    // Role-specific filtering
    if (selectedRole === 'shipper_admin') {
      return allTabs.filter(tab => !['projects'].includes(tab.id));
    }
    if (selectedRole === 'carrier_driver') {
      return allTabs.filter(tab => ['overview', 'contacts', 'calendar'].includes(tab.id));
    }
    
    return allTabs;
  };

  const availableTabs = getTabsForRole();

  return (
    <div className="space-y-6">
      {/* Enhanced Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-200/30">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Customer Relations</h1>
              <p className="text-muted-foreground text-sm">
                Intelligent customer relationship management for{' '}
                <Badge variant="outline" className="ml-1">
                  {selectedRole.replace('_', ' ').replace('admin', 'Admin')}
                </Badge>
              </p>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search CRM..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-64 h-10 bg-background/50 border-border/50 focus:bg-background transition-colors"
            />
          </div>
          
          <Button variant="outline" size="sm" className="h-10">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          
          <Button size="sm" className="h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New
          </Button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 border-blue-200/30 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">Pipeline Value</p>
              <p className="text-2xl font-bold text-blue-900">${stats.totalPipelineValue.toLocaleString()}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <Trophy className="h-5 w-5 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50/50 to-emerald-50/50 border-green-200/30 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Active Leads</p>
              <p className="text-2xl font-bold text-green-900">{stats.activeLeads}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center">
              <Target className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50/50 to-violet-50/50 border-purple-200/30 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Total Contacts</p>
              <p className="text-2xl font-bold text-purple-900">{stats.totalContacts}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-50/50 to-amber-50/50 border-orange-200/30 hover:shadow-md transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">This Week</p>
              <p className="text-2xl font-bold text-orange-900">{stats.upcomingEvents}</p>
            </div>
            <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Enhanced Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList className="grid grid-cols-3 sm:grid-cols-7 w-full sm:w-auto bg-muted/30 p-1 rounded-xl">
            {availableTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <TabsTrigger 
                  key={tab.id}
                  value={tab.id} 
                  className="flex items-center gap-2 px-3 py-2 rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all duration-200"
                >
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  {tab.count !== null && tab.count > 0 && (
                    <Badge variant="secondary" className="h-5 text-xs ml-1">
                      {tab.count}
                    </Badge>
                  )}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Additional Actions */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <TabsContent value="overview" className="space-y-4 animate-fade-in">
          <CRMOverview 
            stats={stats}
            companies={companies}
            contacts={contacts}
            leads={leads}
            opportunities={opportunities}
            projects={projects}
            events={events}
            activities={activities}
          />
        </TabsContent>

        <TabsContent value="emails" className="space-y-4 animate-fade-in">
          <CRMEmails 
            emails={emails}
            contacts={contacts}
            companies={companies}
          />
        </TabsContent>

        <TabsContent value="leads" className="space-y-4 animate-fade-in">
          <CRMLeads leads={leads} contacts={contacts} companies={companies} />
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4 animate-fade-in">
          <CRMContacts />
        </TabsContent>

        <TabsContent value="projects" className="space-y-4 animate-fade-in">
          <CRMProjects 
            projects={projects}
            companies={companies}
            opportunities={opportunities}
          />
        </TabsContent>

        <TabsContent value="calendar" className="space-y-4 animate-fade-in">
          <CRMCalendar 
            events={events}
            contacts={contacts}
            companies={companies}
          />
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4 animate-fade-in">
          <CRMOpportunities opportunities={opportunities} contacts={contacts} companies={companies} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CRMDashboard;
