import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users,
  Building2,
  MapPin,
  Phone,
  Mail,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const NetworksCustomers = () => {
  const customerStats = [
    { title: 'Total Customers', value: '2,847', change: '+12%', icon: Users, color: 'text-blue-600' },
    { title: 'Active Customers', value: '2,234', change: '+8%', icon: Building2, color: 'text-green-600' },
    { title: 'New This Month', value: '156', change: '+25%', icon: Plus, color: 'text-purple-600' },
    { title: 'Premium Customers', value: '89', change: '+15%', icon: Building2, color: 'text-orange-600' },
  ];

  const customers = [
    {
      id: 'CUST-001',
      name: 'ABC Manufacturing Corp',
      email: 'contact@abcmanufacturing.com',
      phone: '(555) 123-4567',
      address: '1234 Industrial Blvd, Chicago, IL',
      status: 'Active',
      type: 'Premium',
      revenue: '$145,000',
      shipments: 234
    },
    {
      id: 'CUST-002',
      name: 'XYZ Logistics Inc',
      email: 'info@xyzlogistics.com',
      phone: '(555) 234-5678',
      address: '5678 Commerce St, Dallas, TX',
      status: 'Active',
      type: 'Standard',
      revenue: '$89,500',
      shipments: 156
    },
    {
      id: 'CUST-003',
      name: 'Global Trade Solutions',
      email: 'support@globaltradesolutions.com',
      phone: '(555) 345-6789',
      address: '9012 Trade Center, Miami, FL',
      status: 'Inactive',
      type: 'Premium',
      revenue: '$234,000',
      shipments: 89
    },
    {
      id: 'CUST-004',
      name: 'Regional Freight Co',
      email: 'orders@regionalfreight.com',
      phone: '(555) 456-7890',
      address: '3456 Freight Ave, Atlanta, GA',
      status: 'Active',
      type: 'Standard',
      revenue: '$67,800',
      shipments: 123
    },
  ];

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Customer Network</h1>
            <p className="text-muted-foreground">Manage customer relationships across all portals</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search customers..." className="pl-10" />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Customers List */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>All customers across the network</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customers.map((customer) => (
                <div key={customer.id} className="p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{customer.name}</h4>
                        <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'}>
                          {customer.status}
                        </Badge>
                        <Badge variant={customer.type === 'Premium' ? 'destructive' : 'outline'}>
                          {customer.type}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            <span>{customer.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4" />
                            <span>{customer.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{customer.address}</span>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <div><span className="font-medium">Revenue:</span> {customer.revenue}</div>
                          <div><span className="font-medium">Shipments:</span> {customer.shipments}</div>
                          <div><span className="font-medium">Customer ID:</span> {customer.id}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SuperAdminLayout>
  );
};

export default NetworksCustomers;