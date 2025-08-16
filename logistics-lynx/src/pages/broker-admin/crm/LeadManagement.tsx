/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { 
  Users,
  Target,
  TrendingUp,
  Star,
  Plus,
  Filter,
  Download,
  Phone,
  Mail,
  Eye
} from 'lucide-react';

const LeadManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock data for leads
  const leads = [
    {
      id: '1',
      company: 'TechCorp Solutions',
      contact: 'John Smith',
      email: 'jsmith@techcorp.com',
      phone: '(555) 123-4567',
      status: 'qualified',
      source: 'website',
      value: '85000',
      score: 85,
      lastContact: '2024-01-15',
      nextAction: 'Send proposal',
      assignedTo: 'Sarah Johnson',
      industry: 'Technology',
      region: 'West Coast',
      lastActivity: 'Email sent',
      activityDate: '2024-01-15',
      estimatedValue: 85000
    },
    {
      id: '2',
      company: 'Global Manufacturing',
      contact: 'Lisa Chen',
      email: 'lchen@globalmanuf.com',
      phone: '(555) 234-5678',
      status: 'new',
      source: 'referral',
      value: '120000',
      score: 72,
      lastContact: '2024-01-12',
      nextAction: 'Schedule call',
      assignedTo: 'Mike Wilson',
      industry: 'Manufacturing',
      region: 'Midwest',
      lastActivity: 'Initial contact',
      activityDate: '2024-01-12',
      estimatedValue: 120000
    },
    {
      id: '3',
      company: 'Retail Partners Inc',
      contact: 'David Rodriguez',
      email: 'drodriguez@retailpartners.com',
      phone: '(555) 345-6789',
      status: 'contacted',
      source: 'linkedin',
      value: '65000',
      score: 68,
      lastContact: '2024-01-10',
      nextAction: 'Follow up call',
      assignedTo: 'Sarah Johnson',
      industry: 'Retail',
      region: 'East Coast',
      lastActivity: 'Phone call',
      activityDate: '2024-01-10',
      estimatedValue: 65000
    }
  ];

  const scoreDistribution = [
    { range: '90-100', count: 12 },
    { range: '80-89', count: 23 },
    { range: '70-79', count: 34 },
    { range: '60-69', count: 28 },
    { range: '50-59', count: 15 }
  ];

  const leadSources = [
    { source: 'Website', count: 45, percentage: 35 },
    { source: 'Referral', count: 38, percentage: 30 },
    { source: 'LinkedIn', count: 25, percentage: 20 },
    { source: 'Cold Email', count: 19, percentage: 15 }
  ];

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'default';
      case 'contacted': return 'secondary';
      case 'qualified': return 'outline';
      case 'proposal': return 'destructive';
      case 'converted': return 'default';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Lead Management</h1>
          <p className="text-muted-foreground">
            Comprehensive lead tracking with scoring and conversion analytics
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
            Add Lead
          </Button>
        </div>
      </div>

      {/* Lead Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hot Leads</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">
              Requiring immediate attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18.5%</div>
            <p className="text-xs text-muted-foreground">
              +2.3% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Lead Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72</div>
            <p className="text-xs text-muted-foreground">
              Out of 100 points
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lead Pipeline</CardTitle>
          <CardDescription>
            All leads with scoring, status, and activity tracking
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="contacted">Contacted</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="converted">Converted</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Last Activity</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id}>
                      <TableCell className="font-medium">{lead.company}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{lead.contact}</p>
                          <p className="text-sm text-muted-foreground">{lead.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(lead.score / 20)
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium">{lead.score}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(lead.status) as unknown}>
                          {lead.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lead.source}</Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{lead.lastActivity}</p>
                          <p className="text-xs text-muted-foreground">{lead.activityDate}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">
                          ${lead.estimatedValue ? (lead.estimatedValue / 1000).toFixed(0) + 'K' : 'TBD'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lead Score Distribution */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Lead Score Distribution</CardTitle>
            <CardDescription>
              Distribution of leads across score ranges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {scoreDistribution.map((range) => (
                <div key={range.range} className="flex items-center gap-4">
                  <div className="w-20 text-sm font-medium">{range.range}</div>
                  <div className="flex-1">
                    <Progress value={(range.count / Math.max(...scoreDistribution.map(r => r.count))) * 100} className="h-2" />
                  </div>
                  <div className="text-sm font-medium w-12 text-right">{range.count}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Lead Sources</CardTitle>
            <CardDescription>
              Most effective channels for lead generation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {leadSources.map((source) => (
                <div key={source.source} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="font-medium">{source.source}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{source.count}</div>
                    <div className="text-xs text-muted-foreground">{source.percentage}%</div>
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

export default LeadManagement;