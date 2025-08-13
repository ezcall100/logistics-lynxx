import React, { useState } from 'react';
import { 
  Users2, Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, 
  Star, Mail, Phone, Building2, Calendar, TrendingUp, Package,
  CheckCircle, AlertTriangle, Clock, Globe, Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PartnerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');

  const partners = [
    {
      id: '1',
      name: 'Strategic Logistics Alliance',
      type: 'Strategic Partner',
      status: 'active',
      contactPerson: 'Michael Johnson',
      email: 'michael@strategiclogistics.com',
      phone: '(555) 123-4567',
      partnership_start: '2023-01-15',
      revenue_contribution: 850000,
      performance_score: 94,
      specialties: ['Cross-border', 'Hazmat', 'Oversized'],
      regions: ['North America', 'Mexico']
    },
    {
      id: '2',
      name: 'Global Freight Solutions',
      type: 'Technology Partner',
      status: 'active',
      contactPerson: 'Sarah Wilson',
      email: 'sarah@globalfreight.com',
      phone: '(555) 234-5678',
      partnership_start: '2023-03-20',
      revenue_contribution: 650000,
      performance_score: 89,
      specialties: ['API Integration', 'Real-time Tracking'],
      regions: ['Global']
    },
    {
      id: '3',
      name: 'Regional Transport Co.',
      type: 'Carrier Partner',
      status: 'pending',
      contactPerson: 'David Brown',
      email: 'david@regionaltransport.com',
      phone: '(555) 345-6789',
      partnership_start: '2024-01-10',
      revenue_contribution: 0,
      performance_score: 0,
      specialties: ['Regional Delivery', 'LTL'],
      regions: ['Southeast US']
    }
  ];

  const partnerStats = {
    totalPartners: partners.length,
    activePartners: partners.filter(p => p.status === 'active').length,
    totalRevenue: partners.reduce((sum, p) => sum + p.revenue_contribution, 0),
    avgPerformance: partners.reduce((sum, p) => sum + p.performance_score, 0) / partners.length
  };

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || partner.status === filterStatus;
    const matchesType = filterType === 'all' || partner.type === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: { variant: 'default' as const, color: 'bg-green-500', icon: CheckCircle },
      pending: { variant: 'outline' as const, color: 'bg-yellow-500', icon: Clock },
      inactive: { variant: 'secondary' as const, color: 'bg-gray-500', icon: AlertTriangle }
    };
    
    const config = variants[status as keyof typeof variants];
    const IconComponent = config.icon;
    
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${config.color}`} />
        <Badge variant={config.variant}>
          <IconComponent className="w-3 h-3 mr-1" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </div>
    );
  };

  const getTypeColor = (type: string) => {
    const colors = {
      'Strategic Partner': 'bg-blue-100 text-blue-800',
      'Technology Partner': 'bg-purple-100 text-purple-800',
      'Carrier Partner': 'bg-green-100 text-green-800',
      'Service Partner': 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Users2 className="w-8 h-8 text-primary" />
            Partner Management
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage strategic partnerships and collaboration agreements
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <TrendingUp className="h-4 w-4 mr-2" />
            Analytics
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Partner
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Partner</DialogTitle>
              </DialogHeader>
              {/* Partner form would go here */}
              <div className="p-4">
                <p className="text-muted-foreground">Partner addition form will be implemented here</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
            <Users2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partnerStats.totalPartners}</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partnerStats.activePartners}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((partnerStats.activePartners / partnerStats.totalPartners) * 100)}% active rate
            </p>
            <Progress value={(partnerStats.activePartners / partnerStats.totalPartners) * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Contribution</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${partnerStats.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +15% from last quarter
            </p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Performance</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partnerStats.avgPerformance.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Performance score
            </p>
            <Progress value={partnerStats.avgPerformance} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search partners by name, contact, or type..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Partner Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Strategic Partner">Strategic</SelectItem>
                  <SelectItem value="Technology Partner">Technology</SelectItem>
                  <SelectItem value="Carrier Partner">Carrier</SelectItem>
                  <SelectItem value="Service Partner">Service</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Partners Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users2 className="w-5 h-5" />
            Partner Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner Information</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-muted-foreground" />
                        {partner.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Partner since {new Date(partner.partnership_start).toLocaleDateString()}
                      </div>
                      <div className="flex gap-1 mt-1">
                        {partner.specialties.slice(0, 2).map((specialty, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {partner.specialties.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{partner.specialties.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getTypeColor(partner.type)}>
                      {partner.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{partner.contactPerson}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {partner.email}
                      </div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {partner.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {partner.performance_score > 0 ? (
                      <div>
                        <div className="flex items-center gap-2">
                          <Progress value={partner.performance_score} className="w-16" />
                          <span className="text-sm font-medium">{partner.performance_score}%</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {partner.performance_score >= 90 ? 'Excellent' : 
                           partner.performance_score >= 80 ? 'Good' : 
                           partner.performance_score >= 70 ? 'Average' : 'Poor'}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">Not available</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        ${partner.revenue_contribution.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Annual contribution
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(partner.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Partner
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Partner
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerManagement;