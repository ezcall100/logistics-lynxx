/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { 
  Building2, 
  MapPin, 
  Users, 
  Shield, 
  Star, 
  Phone,
  Mail,
  Globe,
  Truck,
  Package,
  CheckCircle,
  AlertTriangle,
  Clock
} from 'lucide-react';

interface ExploreDirectoryProps {
  companyId: string;
  searchQuery: string;
}

export const ExploreDirectory: React.FC<ExploreDirectoryProps> = ({ companyId, searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [sortBy, setSortBy] = React.useState('name');

  const categories = [
    { id: 'all', label: 'All', count: 1247 },
    { id: 'carriers', label: 'Carriers', count: 456 },
    { id: 'shippers', label: 'Shippers', count: 234 },
    { id: 'brokers', label: 'Brokers', count: 123 },
    { id: 'warehouses', label: 'Warehouses', count: 89 },
    { id: 'factoring', label: 'Factoring', count: 45 }
  ];

  const companies = [
    {
      id: '1',
      name: 'ABC Logistics',
      type: 'carrier',
      location: 'Los Angeles, CA',
      rating: 4.8,
      verified: true,
      services: ['Dry Van', 'Reefer', 'Flatbed'],
      contact: {
        phone: '(555) 123-4567',
        email: 'info@abclogistics.com',
        website: 'www.abclogistics.com'
      },
      status: 'active',
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'XYZ Manufacturing',
      type: 'shipper',
      location: 'Chicago, IL',
      rating: 4.6,
      verified: true,
      services: ['General Freight', 'Hazmat'],
      contact: {
        phone: '(555) 987-6543',
        email: 'shipping@xyzmanufacturing.com',
        website: 'www.xyzmanufacturing.com'
      },
      status: 'active',
      lastActivity: '1 day ago'
    },
    {
      id: '3',
      name: 'DEF Transport',
      type: 'carrier',
      location: 'Dallas, TX',
      rating: 4.2,
      verified: false,
      services: ['Dry Van', 'Power Only'],
      contact: {
        phone: '(555) 456-7890',
        email: 'dispatch@deftransport.com',
        website: 'www.deftransport.com'
      },
      status: 'pending',
      lastActivity: '3 days ago'
    },
    {
      id: '4',
      name: 'GHI Warehouse',
      type: 'warehouse',
      location: 'Miami, FL',
      rating: 4.9,
      verified: true,
      services: ['Storage', 'Cross-docking', 'Fulfillment'],
      contact: {
        phone: '(555) 321-0987',
        email: 'operations@ghiwarehouse.com',
        website: 'www.ghiwarehouse.com'
      },
      status: 'active',
      lastActivity: '5 hours ago'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'carrier':
        return <Truck className="h-4 w-4" />;
      case 'shipper':
        return <Package className="h-4 w-4" />;
      case 'warehouse':
        return <Building2 className="h-4 w-4" />;
      default:
        return <Building2 className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      carrier: 'bg-blue-100 text-blue-800',
      shipper: 'bg-green-100 text-green-800',
      broker: 'bg-purple-100 text-purple-800',
      warehouse: 'bg-orange-100 text-orange-800',
      factoring: 'bg-red-100 text-red-800'
    };
    return <Badge className={colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'}>
      {type.charAt(0).toUpperCase() + type.slice(1)}
    </Badge>;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-100 text-green-800">Active</Badge>;
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'inactive':
        return <Badge variant="destructive">Inactive</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getVerificationIcon = (verified: boolean) => {
    return verified ? 
      <CheckCircle className="h-4 w-4 text-green-500" /> : 
      <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  };

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Explore Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="flex space-x-4">
              <div className="flex-1">
                <Input
                  placeholder="Search companies, facilities, contacts..."
                  value={searchQuery}
                  className="w-full"
                />
              </div>
              <Button>Search</Button>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.label}
                  <Badge variant="secondary" className="ml-2">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded-md text-sm"
              >
                <option value="name">Name</option>
                <option value="rating">Rating</option>
                <option value="location">Location</option>
                <option value="recent">Recently Active</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {companies.map((company) => (
          <Card key={company.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getTypeIcon(company.type)}
                  <div>
                    <h3 className="font-semibold text-lg">{company.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      {getTypeBadge(company.type)}
                      {getStatusBadge(company.status)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  {getVerificationIcon(company.verified)}
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{company.rating}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {/* Location */}
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {company.location}
                </div>

                {/* Services */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {company.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="h-4 w-4 mr-2" />
                    {company.contact.phone}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="h-4 w-4 mr-2" />
                    {company.contact.email}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Globe className="h-4 w-4 mr-2" />
                    {company.contact.website}
                  </div>
                </div>

                {/* Last Activity */}
                <div className="flex items-center text-xs text-gray-500">
                  <Clock className="h-3 w-3 mr-1" />
                  Last activity: {company.lastActivity}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button size="sm" variant="outline" className="flex-1">
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline">
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <Button variant="outline" size="lg">
          Load More Results
        </Button>
      </div>
    </div>
  );
};
