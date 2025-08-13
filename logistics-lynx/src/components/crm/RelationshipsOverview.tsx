import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Mail, 
  Phone, 
  TrendingUp, 
  Calendar,
  DollarSign,
  Target,
  Activity,
  Building,
  UserCheck,
  Clock,
  ArrowUpRight,
  Plus,
  Filter,
  Search,
  Download
} from 'lucide-react';
import { mockContacts, mockLeads, mockOpportunities, mockProjects } from '@/lib/data/mockData';

const RelationshipsOverview = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  // Calculate metrics
  const totalContacts = mockContacts.length;
  const activeContacts = mockContacts.filter(c => c.status === 'active').length;
  const totalLeads = mockLeads.length;
  const qualifiedLeads = mockLeads.filter(l => l.status === 'qualified').length;
  const totalOpportunities = mockOpportunities.length;
  const totalOpportunityValue = mockOpportunities.reduce((sum, opp) => 
    sum + parseInt(opp.amount.replace(/[$,]/g, '')), 0
  );
  const avgDealSize = totalOpportunityValue / totalOpportunities;

  const stats = [
    {
      title: 'Total Contacts',
      value: totalContacts.toString(),
      change: '+12%',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: `${activeContacts} active contacts`
    },
    {
      title: 'Qualified Leads',
      value: qualifiedLeads.toString(),
      change: '+8%',
      icon: Target,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: `${totalLeads} total leads`
    },
    {
      title: 'Open Opportunities',
      value: totalOpportunities.toString(),
      change: '+15%',
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: `$${(totalOpportunityValue / 1000).toFixed(0)}K pipeline`
    },
    {
      title: 'Avg Deal Size',
      value: `$${(avgDealSize / 1000).toFixed(0)}K`,
      change: '+5%',
      icon: DollarSign,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      description: 'This quarter'
    }
  ];

  const recentActivities = [
    {
      id: '1',
      type: 'contact',
      title: 'New contact added',
      description: 'John Smith from ACME Corporation',
      time: '2 hours ago',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      id: '2',
      type: 'lead',
      title: 'Lead qualified',
      description: 'ACME Corp - Fleet Expansion moved to qualified',
      time: '4 hours ago',
      icon: Target,
      color: 'text-green-600'
    },
    {
      id: '3',
      type: 'email',
      title: 'Email sent',
      description: 'Proposal sent to Global Freight Solutions',
      time: '6 hours ago',
      icon: Mail,
      color: 'text-purple-600'
    },
    {
      id: '4',
      type: 'meeting',
      title: 'Meeting scheduled',
      description: 'Demo call with TransportTech Industries',
      time: '1 day ago',
      icon: Calendar,
      color: 'text-amber-600'
    }
  ];

  const pipelineStages = [
    { name: 'Discovery', count: 5, value: '$125K', color: 'bg-blue-500' },
    { name: 'Proposal', count: 3, value: '$85K', color: 'bg-green-500' },
    { name: 'Negotiation', count: 2, value: '$65K', color: 'bg-amber-500' },
    { name: 'Closed Won', count: 1, value: '$45K', color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-neutral-50/50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900 mb-2">
            Relationships Overview
          </h1>
          <p className="text-neutral-600">
            Comprehensive view of your customer relationships and sales pipeline
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border border-neutral-200/60">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2 flex-1">
                    <p className="text-sm font-medium text-neutral-500">{stat.title}</p>
                    <p className="text-2xl font-semibold text-neutral-900">{stat.value}</p>
                    <p className="text-xs text-neutral-500">{stat.description}</p>
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-semibold text-green-600">{stat.change}</span>
                      <span className="text-xs text-neutral-400">vs last month</span>
                    </div>
                  </div>
                  <div className={`h-12 w-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                    <IconComponent className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Pipeline */}
        <Card className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-neutral-200/60">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Sales Pipeline</span>
              <Button variant="outline" size="sm">
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pipelineStages.map((stage, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-neutral-700">{stage.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-500">{stage.count} deals</span>
                    <span className="text-sm font-semibold text-neutral-900">{stage.value}</span>
                  </div>
                </div>
                <div className="w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${stage.color}`}
                    style={{ width: `${(stage.count / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/60">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const IconComponent = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-lg bg-neutral-50 flex items-center justify-center`}>
                      <IconComponent className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-900">{activity.title}</p>
                      <p className="text-xs text-neutral-500 truncate">{activity.description}</p>
                      <p className="text-xs text-neutral-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Contacts */}
        <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/60">
          <CardHeader>
            <CardTitle>Top Contacts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockContacts.slice(0, 3).map((contact) => (
                <div key={contact.id} className="flex items-center gap-3 p-3 bg-neutral-50 rounded-lg">
                  <img 
                    src={contact.avatar} 
                    alt={`${contact.firstName} ${contact.lastName}`}
                    className="h-10 w-10 rounded-full"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-neutral-900">
                      {contact.firstName} {contact.lastName}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">{contact.company}</p>
                    <p className="text-xs text-neutral-400">{contact.position}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {contact.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Hot Leads */}
        <Card className="bg-white/80 backdrop-blur-sm border border-neutral-200/60">
          <CardHeader>
            <CardTitle>Hot Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLeads.filter(lead => lead.priority === 'high' || lead.status === 'qualified').map((lead) => (
                <div key={lead.id} className="p-3 bg-neutral-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm font-medium text-neutral-900">{lead.title}</h4>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        lead.priority === 'high' ? 'text-red-600 border-red-200' : 'text-amber-600 border-amber-200'
                      }`}
                    >
                      {lead.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-neutral-500 mb-2">{lead.company}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-green-600">{lead.value}</span>
                    <span className="text-xs text-neutral-400">{lead.probability}% probability</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RelationshipsOverview;