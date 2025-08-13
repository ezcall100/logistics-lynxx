import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Filter,
  Download,
  Phone,
  Mail,
  FileText,
  Eye
} from 'lucide-react';

const CustomerAccounts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  // Mock data for customers
  const customers = [
    {
      id: '1',
      company: 'Global Manufacturing Inc',
      contact: 'Sarah Johnson',
      email: 'sarah.j@globalmanuf.com',
      phone: '(555) 123-4567',
      type: 'manufacturer',
      status: 'active',
      revenue: 2450000,
      loads: 247,
      avgLoadValue: 9919,
      lastOrder: '2024-01-15',
      creditRating: 'A+',
      paymentTerms: 'Net 30',
      primaryLanes: ['CA-TX', 'NY-FL'],
      industry: 'Manufacturing',
      location: 'Los Angeles, CA',
      totalShipments: 247
    },
    {
      id: '2',
      company: 'Retail Solutions Corp',
      contact: 'Mike Chen',
      email: 'mchen@retailsolutions.com',
      phone: '(555) 234-5678',
      type: 'retailer',
      status: 'active',
      revenue: 1850000,
      loads: 189,
      avgLoadValue: 9788,
      lastOrder: '2024-01-12',
      creditRating: 'A',
      paymentTerms: 'Net 45',
      primaryLanes: ['IL-TX', 'OH-CA'],
      industry: 'Retail',
      location: 'Chicago, IL',
      totalShipments: 189
    },
    {
      id: '3',
      company: 'Distribution Partners LLC',
      contact: 'Lisa Rodriguez',
      email: 'lrodriguez@distpartners.com',
      phone: '(555) 345-6789',
      type: 'distributor',
      status: 'inactive',
      revenue: 950000,
      loads: 97,
      avgLoadValue: 9794,
      lastOrder: '2023-12-20',
      creditRating: 'B+',
      paymentTerms: 'Net 30',
      primaryLanes: ['TX-FL', 'CA-NV'],
      industry: 'Distribution',
      location: 'Dallas, TX',
      totalShipments: 97
    }
  ];

  const customerTypes = [
    { type: 'Manufacturer', count: 45, percentage: 35 },
    { type: 'Retailer', count: 127, percentage: 40 },
    { type: 'Distributor', count: 89, percentage: 20 },
    { type: '3PL', count: 81, percentage: 5 }
  ];

  const topCustomers = [
    { company: 'Global Manufacturing Inc', revenue: 2450000, shipments: 247 },
    { company: 'Retail Solutions Corp', revenue: 1850000, shipments: 189 },
    { company: 'Tech Logistics Pro', revenue: 1650000, shipments: 156 },
    { company: 'Distribution Partners LLC', revenue: 950000, shipments: 97 }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contact.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    const matchesType = typeFilter === 'all' || customer.type === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'inactive': return 'secondary';
      case 'pending': return 'outline';
      default: return 'default';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Accounts</h1>
          <p className="text-muted-foreground">
            Manage existing shipper relationships and account details
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
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customer Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground">
              +8% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">278</div>
            <p className="text-xs text-muted-foreground">
              81% of total customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8.4M</div>
            <p className="text-xs text-muted-foreground">
              YTD from customers
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24.5K</div>
            <p className="text-xs text-muted-foreground">
              +15% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Directory</CardTitle>
          <CardDescription>
            Search and manage your customer accounts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search customers..."
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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="manufacturer">Manufacturer</SelectItem>
                  <SelectItem value="retailer">Retailer</SelectItem>
                  <SelectItem value="distributor">Distributor</SelectItem>
                  <SelectItem value="3pl">3PL</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Shipments</TableHead>
                    <TableHead>Revenue (YTD)</TableHead>
                    <TableHead>Last Order</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{customer.company}</p>
                          <p className="text-sm text-muted-foreground">{customer.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{customer.contact}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                          <p className="text-sm text-muted-foreground">{customer.phone}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{customer.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(customer.status) as unknown}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="font-medium">{customer.totalShipments}</span>
                      </TableCell>
                      <TableCell>
                        <span className="font-bold text-primary">
                          ${(customer.revenue / 1000).toFixed(0)}K
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{customer.lastOrder}</span>
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
                            <FileText className="h-3 w-3" />
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

      {/* Customer Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Type Distribution</CardTitle>
            <CardDescription>
              Breakdown by customer category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerTypes.map((type) => (
                <div key={type.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary"></div>
                    <span className="font-medium">{type.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">{type.count}</div>
                    <div className="text-xs text-muted-foreground">{type.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Customers by Revenue</CardTitle>
            <CardDescription>
              Highest value customer accounts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={customer.company} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{customer.company}</p>
                      <p className="text-xs text-muted-foreground">{customer.shipments} shipments</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-primary">${(customer.revenue / 1000).toFixed(0)}K</div>
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

export default CustomerAccounts;