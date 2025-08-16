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
  Target,
  DollarSign,
  TrendingUp,
  Calculator,
  Plus,
  Filter,
  Download,
  Phone,
  Mail,
  Calendar,
  Eye
} from 'lucide-react';

const Opportunities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');

  // Mock data for opportunities
  const opportunities = [
    {
      id: '1',
      title: 'Q1 Freight Partnership',
      company: 'Global Manufacturing Inc',
      contact: 'Sarah Johnson',
      email: 'sarah.j@globalmanuf.com',
      stage: 'proposal',
      value: 125000,
      probability: 75,
      closeDate: '2024-02-15',
      owner: 'Mike Wilson'
    },
    {
      id: '2',
      title: 'Regional Distribution Contract',
      company: 'Retail Solutions Corp',
      contact: 'John Smith',
      email: 'jsmith@retailsolutions.com',
      stage: 'negotiation',
      value: 98000,
      probability: 85,
      closeDate: '2024-02-10',
      owner: 'Lisa Chen'
    },
    {
      id: '3',
      title: 'Cross-Country Logistics',
      company: 'Tech Logistics Pro',
      contact: 'Maria Rodriguez',
      email: 'maria@techlogistics.com',
      stage: 'qualified',
      value: 145000,
      probability: 60,
      closeDate: '2024-02-28',
      owner: 'David Kim'
    }
  ];

  const monthlyForecast = [
    { month: 'February', projected: 245000, deals: 8 },
    { month: 'March', projected: 298000, deals: 12 },
    { month: 'April', projected: 325000, deals: 15 },
    { month: 'May', projected: 278000, deals: 10 }
  ];

  const stageDistribution = [
    { stage: 'Prospecting', count: 24, value: 580000 },
    { stage: 'Qualified', count: 18, value: 720000 },
    { stage: 'Proposal', count: 12, value: 890000 },
    { stage: 'Negotiation', count: 8, value: 650000 },
    { stage: 'Closed Won', count: 6, value: 420000 }
  ];

  const filteredOpportunities = opportunities.filter(opportunity => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         opportunity.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage = stageFilter === 'all' || opportunity.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting': return 'secondary';
      case 'qualified': return 'outline';
      case 'proposal': return 'default';
      case 'negotiation': return 'destructive';
      case 'closed-won': return 'default';
      case 'closed-lost': return 'secondary';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Opportunities</h1>
          <p className="text-muted-foreground">
            Deal tracking and sales forecasting management
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
            Add Opportunity
          </Button>
        </div>
      </div>

      {/* Opportunity Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Opportunities</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">
              +18 new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pipeline Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4.2M</div>
            <p className="text-xs text-muted-foreground">
              Total potential revenue
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Close Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-muted-foreground">
              +8% from last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <Calculator className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$34K</div>
            <p className="text-xs text-muted-foreground">
              Average opportunity value
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Opportunities Table */}
      <Card>
        <CardHeader>
          <CardTitle>Opportunity Pipeline</CardTitle>
          <CardDescription>
            Track deals from initial contact to closure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search opportunities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={stageFilter} onValueChange={setStageFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by stage" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stages</SelectItem>
                  <SelectItem value="prospecting">Prospecting</SelectItem>
                  <SelectItem value="qualified">Qualified</SelectItem>
                  <SelectItem value="proposal">Proposal</SelectItem>
                  <SelectItem value="negotiation">Negotiation</SelectItem>
                  <SelectItem value="closed-won">Closed Won</SelectItem>
                  <SelectItem value="closed-lost">Closed Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Opportunity</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Close Date</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOpportunities.map((opportunity) => (
                    <TableRow key={opportunity.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{opportunity.title}</p>
                          <p className="text-sm text-muted-foreground">{opportunity.company}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{opportunity.contact}</p>
                          <p className="text-sm text-muted-foreground">{opportunity.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStageColor(opportunity.stage) as unknown}>
                          {opportunity.stage}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-primary">
                          ${opportunity.value.toLocaleString()}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={opportunity.probability} className="flex-1 h-2" />
                          <span className="text-sm font-medium w-12">
                            {opportunity.probability}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{opportunity.closeDate}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{opportunity.owner}</span>
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
                            <Calendar className="h-3 w-3" />
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

      {/* Forecast Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Forecast</CardTitle>
            <CardDescription>
              Projected revenue based on opportunity probability
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyForecast.map((month) => (
                <div key={month.month} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="font-medium">{month.month}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">${(month.projected / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-muted-foreground">{month.deals} deals</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Stage Distribution</CardTitle>
            <CardDescription>
              Opportunities breakdown by sales stage
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stageDistribution.map((stage) => (
                <div key={stage.stage} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="font-medium">{stage.stage}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{stage.count}</div>
                    <div className="text-xs text-muted-foreground">${(stage.value / 1000).toFixed(0)}K</div>
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

export default Opportunities;