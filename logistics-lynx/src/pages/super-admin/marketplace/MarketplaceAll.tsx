import React from 'react';
import SuperAdminLayout from '@/components/super-admin/SuperAdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Store,
  Package,
  Download,
  Star,
  Users,
  TrendingUp,
  Filter,
  Search,
  Grid,
  List
} from 'lucide-react';
import { Input } from '@/components/ui/input';

const MarketplaceAll = () => {
  const marketplaceStats = [
    { title: 'Total Integrations', value: '45', change: '+3', icon: Package, color: 'text-blue-600' },
    { title: 'Active Installs', value: '234', change: '+12', icon: Download, color: 'text-green-600' },
    { title: 'Categories', value: '12', change: '+1', icon: Grid, color: 'text-purple-600' },
    { title: 'User Rating', value: '4.8', change: '+0.2', icon: Star, color: 'text-orange-600' },
  ];

  const categories = [
    { name: 'Accounting', count: 8, popular: true },
    { name: 'Carrier Compliance', count: 6, popular: false },
    { name: 'API', count: 12, popular: true },
    { name: 'EDI', count: 15, popular: true },
    { name: 'ELDs', count: 9, popular: false },
    { name: 'Factoring', count: 7, popular: false },
    { name: 'Fuel Cards', count: 5, popular: false },
    { name: 'Load Board', count: 11, popular: true },
    { name: 'Mileage', count: 4, popular: false },
    { name: 'Payments', count: 10, popular: true },
    { name: 'Tolls', count: 3, popular: false },
    { name: 'Visibility', count: 8, popular: false },
  ];

  const featuredIntegrations = [
    {
      id: 1,
      name: 'QuickBooks Integration',
      category: 'Accounting',
      description: 'Seamlessly sync financial data with QuickBooks for automated accounting',
      rating: 4.9,
      installs: 1234,
      price: '$29/month',
      features: ['Real-time sync', 'Automated invoicing', 'Tax reporting'],
      status: 'Featured'
    },
    {
      id: 2,
      name: 'DAT Load Board',
      category: 'Load Board',
      description: 'Access to premium loads and freight matching services',
      rating: 4.7,
      installs: 2345,
      price: '$199/month',
      features: ['Premium loads', 'Real-time matching', 'Credit checks'],
      status: 'Popular'
    },
    {
      id: 3,
      name: 'Motive ELD',
      category: 'ELDs',
      description: 'FMCSA compliant electronic logging device integration',
      rating: 4.8,
      installs: 3456,
      price: '$35/month',
      features: ['FMCSA compliant', 'Real-time tracking', 'Driver safety'],
      status: 'Recommended'
    },
    {
      id: 4,
      name: 'Triumph Pay',
      category: 'Payments',
      description: 'Automated freight payment processing and factoring',
      rating: 4.6,
      installs: 1567,
      price: '$45/month',
      features: ['Automated payments', 'Factoring services', 'Cash flow management'],
      status: 'New'
    },
  ];

  return (
    <SuperAdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Marketplace</h1>
            <p className="text-muted-foreground">Discover and manage integrations for your TMS platform</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button>
              <Package className="h-4 w-4 mr-2" />
              Submit Integration
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search integrations..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Grid className="h-4 w-4 mr-2" />
            Grid View
          </Button>
          <Button variant="outline">
            <List className="h-4 w-4 mr-2" />
            List View
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {marketplaceStats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> this month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Integration Categories</CardTitle>
            <CardDescription>Browse integrations by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer text-center"
                >
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-sm">{category.name}</h4>
                    {category.popular && (
                      <Badge variant="secondary" className="text-xs">Popular</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{category.count} integrations</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Integrations */}
        <Card>
          <CardHeader>
            <CardTitle>Featured Integrations</CardTitle>
            <CardDescription>Top-rated and most popular integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredIntegrations.map((integration) => (
                <div key={integration.id} className="p-4 border rounded-lg hover:bg-muted/50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{integration.name}</h4>
                        <Badge variant={
                          integration.status === 'Featured' ? 'default' : 
                          integration.status === 'Popular' ? 'destructive' :
                          integration.status === 'New' ? 'secondary' : 'outline'
                        }>
                          {integration.status}
                        </Badge>
                      </div>
                      <Badge variant="outline" className="text-xs mb-2">
                        {integration.category}
                      </Badge>
                      <p className="text-sm text-muted-foreground mb-3">
                        {integration.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{integration.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Download className="h-4 w-4" />
                      <span>{integration.installs} installs</span>
                    </div>
                    <div className="font-semibold text-primary">
                      {integration.price}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-1">Key Features:</p>
                    <div className="flex flex-wrap gap-1">
                      {integration.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">Install</Button>
                    <Button variant="outline">Learn More</Button>
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

export default MarketplaceAll;