/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { 
  Target, 
  TrendingUp, 
  DollarSign, 
  Award,
  Users,
  MapPin,
  Phone,
  Mail,
  Plus,
  Search,
  Filter,
  Edit,
  Eye,
  MoreHorizontal,
  Calendar,
  Briefcase,
  Star,
  BarChart3,
  Trophy,
  Building2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';

const SalesAgents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [territoryFilter, setTerritoryFilter] = useState('all');
  const [performanceFilter, setPerformanceFilter] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Mock sales agent data
  const salesAgents = [
    {
      id: 1,
      name: 'Michael Brown',
      email: 'michael.brown@freightbroker.com',
      phone: '(555) 301-3001',
      position: 'Senior Sales Agent',
      territory: 'West Coast',
      manager: 'Michael Anderson',
      status: 'active',
      hireDate: '2021-04-12',
      baseSalary: 75000,
      commission: 45000,
      performance: 98,
      location: 'Los Angeles, CA',
      experience: '7 years',
      dealsWon: 127,
      revenue: 2400000,
      targets: {
        monthly: 200000,
        quarterly: 600000,
        annual: 2400000
      },
      achievements: ['Top Performer Q3 2023', 'Million Dollar Club'],
      clientAccounts: 45,
      avatar: '/avatars/michael-brown.jpg'
    },
    {
      id: 2,
      name: 'Sarah Kim',
      email: 'sarah.kim@freightbroker.com',
      phone: '(555) 301-3002',
      position: 'Sales Agent',
      territory: 'East Coast',
      manager: 'Michael Anderson',
      status: 'active',
      hireDate: '2022-08-15',
      baseSalary: 65000,
      commission: 38000,
      performance: 95,
      location: 'New York, NY',
      experience: '4 years',
      dealsWon: 89,
      revenue: 1900000,
      targets: {
        monthly: 180000,
        quarterly: 540000,
        annual: 2160000
      },
      achievements: ['Rising Star 2023', 'Customer Excellence Award'],
      clientAccounts: 32,
      avatar: '/avatars/sarah-kim.jpg'
    },
    {
      id: 3,
      name: 'Robert Martinez',
      email: 'robert.martinez@freightbroker.com',
      phone: '(555) 301-3003',
      position: 'Junior Sales Agent',
      territory: 'Midwest',
      manager: 'Michael Anderson',
      status: 'active',
      hireDate: '2023-02-01',
      baseSalary: 55000,
      commission: 22000,
      performance: 87,
      location: 'Chicago, IL',
      experience: '2 years',
      dealsWon: 56,
      revenue: 1200000,
      targets: {
        monthly: 120000,
        quarterly: 360000,
        annual: 1440000
      },
      achievements: ['New Hire of the Year 2023'],
      clientAccounts: 18,
      avatar: '/avatars/robert-martinez.jpg'
    },
    {
      id: 4,
      name: 'Jessica Chen',
      email: 'jessica.chen@freightbroker.com',
      phone: '(555) 301-3004',
      position: 'Senior Sales Agent',
      territory: 'South',
      manager: 'Michael Anderson',
      status: 'active',
      hireDate: '2020-11-08',
      baseSalary: 75000,
      commission: 52000,
      performance: 96,
      location: 'Dallas, TX',
      experience: '8 years',
      dealsWon: 134,
      revenue: 2600000,
      targets: {
        monthly: 210000,
        quarterly: 630000,
        annual: 2520000
      },
      achievements: ['Top Performer Q4 2023', 'President\'s Club'],
      clientAccounts: 52,
      avatar: '/avatars/jessica-chen.jpg'
    },
    {
      id: 5,
      name: 'Daniel Wilson',
      email: 'daniel.wilson@freightbroker.com',
      phone: '(555) 301-3005',
      position: 'Sales Agent',
      territory: 'Northeast',
      manager: 'Michael Anderson',
      status: 'active',
      hireDate: '2022-01-20',
      baseSalary: 65000,
      commission: 35000,
      performance: 92,
      location: 'Boston, MA',
      experience: '5 years',
      dealsWon: 78,
      revenue: 1750000,
      targets: {
        monthly: 170000,
        quarterly: 510000,
        annual: 2040000
      },
      achievements: ['Customer Satisfaction Award 2023'],
      clientAccounts: 28,
      avatar: '/avatars/daniel-wilson.jpg'
    }
  ];

  const filteredAgents = salesAgents.filter(agent => {
    const matchesSearch = 
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.territory.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTerritory = territoryFilter === 'all' || agent.territory === territoryFilter;
    
    let matchesPerformance = true;
    if (performanceFilter === 'high') matchesPerformance = agent.performance >= 95;
    else if (performanceFilter === 'medium') matchesPerformance = agent.performance >= 85 && agent.performance < 95;
    else if (performanceFilter === 'low') matchesPerformance = agent.performance < 85;
    
    return matchesSearch && matchesTerritory && matchesPerformance;
  });

  const territories = [...new Set(salesAgents.map(agent => agent.territory))];
  const totalRevenue = salesAgents.reduce((sum, agent) => sum + agent.revenue, 0);
  const totalCommission = salesAgents.reduce((sum, agent) => sum + agent.commission, 0);
  const avgPerformance = salesAgents.reduce((sum, agent) => sum + agent.performance, 0) / salesAgents.length;
  const totalDeals = salesAgents.reduce((sum, agent) => sum + agent.dealsWon, 0);

  const getPerformanceBadge = (performance: number) => {
    if (performance >= 95) return <Badge className="bg-green-100 text-green-800">Excellent</Badge>;
    if (performance >= 85) return <Badge className="bg-blue-100 text-blue-800">Good</Badge>;
    if (performance >= 75) return <Badge className="bg-yellow-100 text-yellow-800">Average</Badge>;
    return <Badge className="bg-red-100 text-red-800">Needs Improvement</Badge>;
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Target className="w-8 h-8 text-primary" />
            Sales Agents
          </h1>
          <p className="text-muted-foreground mt-2">
            Managing {salesAgents.length} sales agents generating ${(totalRevenue / 1000000).toFixed(1)}M annual revenue
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <BarChart3 className="h-4 w-4 mr-2" />
            Sales Dashboard
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Sales Agent
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Sales Agent</DialogTitle>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Enter full name" />
                </div>
                <div>
                  <Label htmlFor="position">Position</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="junior">Junior Sales Agent</SelectItem>
                      <SelectItem value="agent">Sales Agent</SelectItem>
                      <SelectItem value="senior">Senior Sales Agent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="territory">Territory</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select territory" />
                    </SelectTrigger>
                    <SelectContent>
                      {territories.map(territory => (
                        <SelectItem key={territory} value={territory.toLowerCase()}>{territory}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="manager">Manager</Label>
                  <Input id="manager" placeholder="Direct manager" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="agent@company.com" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="(555) 123-4567" />
                </div>
                <div>
                  <Label htmlFor="baseSalary">Base Salary</Label>
                  <Input id="baseSalary" type="number" placeholder="65000" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, State" />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="targets">Annual Target</Label>
                  <Input id="targets" type="number" placeholder="2000000" />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsAddDialogOpen(false)}>
                  Add Agent
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Sales Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalRevenue / 1000000).toFixed(1)}M</div>
            <p className="text-xs text-muted-foreground">Annual sales revenue</p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Commission</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalCommission.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Annual commissions paid</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPerformance.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Team average</p>
            <Progress value={avgPerformance} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Deals</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalDeals}</div>
            <p className="text-xs text-muted-foreground">Deals closed this year</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search agents by name, position, or territory..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={territoryFilter} onValueChange={setTerritoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Territories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Territories</SelectItem>
                {territories.map(territory => (
                  <SelectItem key={territory} value={territory}>{territory}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={performanceFilter} onValueChange={setPerformanceFilter}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Performance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Performance</SelectItem>
                <SelectItem value="high">High (95%+)</SelectItem>
                <SelectItem value="medium">Medium (85-94%)</SelectItem>
                <SelectItem value="low">Low (&lt;85%)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Sales Agent Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAgents.map((agent) => (
          <Card key={agent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={agent.avatar} alt={agent.name} />
                    <AvatarFallback className="text-lg">
                      {agent.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold">{agent.name}</h3>
                    <p className="text-muted-foreground">{agent.position}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{agent.territory}</Badge>
                      {getPerformanceBadge(agent.performance)}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <Eye className="h-4 w-4 mr-2" />
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Target className="h-4 w-4 mr-2" />
                      Set Targets
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="h-4 w-4 mr-2" />
                      Schedule 1:1
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Contact</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" />
                      {agent.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4" />
                      {agent.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4" />
                      {agent.location}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Performance</p>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      ${agent.revenue.toLocaleString()} Revenue
                    </div>
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      {agent.dealsWon} Deals Won
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {agent.clientAccounts} Accounts
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Compensation</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Base: ${agent.baseSalary.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="font-medium">Commission: ${agent.commission.toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-sm font-medium mt-2">
                  Total: ${(agent.baseSalary + agent.commission).toLocaleString()}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-2">Achievements</p>
                <div className="space-y-1">
                  {agent.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-muted-foreground">Annual Target Progress</p>
                  <p className="text-sm font-medium">{Math.round((agent.revenue / agent.targets.annual) * 100)}%</p>
                </div>
                <Progress value={(agent.revenue / agent.targets.annual) * 100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  ${agent.revenue.toLocaleString()} of ${agent.targets.annual.toLocaleString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SalesAgents;