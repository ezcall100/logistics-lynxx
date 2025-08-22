import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { 
  Folder, Plus, Edit, Trash2, Users, Settings, 
  Globe, Truck, Package, Shield, Activity,
  Search, Filter, Download, Upload, MoreHorizontal,
  Tag, Layers, Grid, List
} from 'lucide-react';

interface PortalCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  portalCount: number;
  totalUsers: number;
  createdDate: string;
  lastModified: string;
  permissions: string[];
  features: string[];
}

interface Portal {
  id: string;
  name: string;
  categoryId: string;
  type: string;
  status: string;
  users: number;
}

const PortalCategoriesPage = () => {
  const [categories, setCategories] = useState<PortalCategory[]>([]);
  const [portals, setPortals] = useState<Portal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [newCategoryDialog, setNewCategoryDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPortalCategories();
  }, []);

  const loadPortalCategories = async () => {
    setLoading(true);
    try {
      // Mock data for portal categories
      const mockCategories: PortalCategory[] = [
        {
          id: 'cat-001',
          name: 'Transportation Management',
          description: 'Portals focused on transportation and logistics operations',
          color: 'bg-blue-500',
          icon: 'Truck',
          portalCount: 3,
          totalUsers: 4240,
          createdDate: '2023-01-15T00:00:00Z',
          lastModified: '2024-01-10T00:00:00Z',
          permissions: ['read', 'write', 'admin'],
          features: ['shipment_tracking', 'route_optimization', 'fleet_management']
        },
        {
          id: 'cat-002',
          name: 'Business Operations',
          description: 'Portals for business management and administrative functions',
          color: 'bg-green-500',
          icon: 'Settings',
          portalCount: 2,
          totalUsers: 165,
          createdDate: '2023-02-20T00:00:00Z',
          lastModified: '2024-01-12T00:00:00Z',
          permissions: ['read', 'write', 'admin'],
          features: ['user_management', 'billing', 'reporting']
        },
        {
          id: 'cat-003',
          name: 'Mobile & Field Operations',
          description: 'Mobile-first portals for field workers and drivers',
          color: 'bg-purple-500',
          icon: 'Activity',
          portalCount: 1,
          totalUsers: 3500,
          createdDate: '2023-08-15T00:00:00Z',
          lastModified: '2024-01-08T00:00:00Z',
          permissions: ['read', 'write'],
          features: ['mobile_interface', 'gps_tracking', 'time_management']
        },
        {
          id: 'cat-004',
          name: 'Administrative & Control',
          description: 'System administration and control portals',
          color: 'bg-red-500',
          icon: 'Shield',
          portalCount: 1,
          totalUsers: 45,
          createdDate: '2023-04-01T00:00:00Z',
          lastModified: '2024-01-15T00:00:00Z',
          permissions: ['admin'],
          features: ['system_config', 'security', 'audit_logs']
        }
      ];

      const mockPortals: Portal[] = [
        { id: 'portal-001', name: 'Carrier Portal', categoryId: 'cat-001', type: 'carrier', status: 'active', users: 1250 },
        { id: 'portal-002', name: 'Broker Portal', categoryId: 'cat-001', type: 'broker', status: 'active', users: 890 },
        { id: 'portal-003', name: 'Shipper Portal', categoryId: 'cat-001', type: 'shipper', status: 'active', users: 2100 },
        { id: 'portal-004', name: 'Admin Portal', categoryId: 'cat-004', type: 'admin', status: 'active', users: 45 },
        { id: 'portal-005', name: 'Driver Portal', categoryId: 'cat-003', type: 'driver', status: 'active', users: 3500 },
        { id: 'portal-006', name: 'Owner Operator Portal', categoryId: 'cat-002', type: 'owner_operator', status: 'maintenance', users: 120 }
      ];

      setCategories(mockCategories);
      setPortals(mockPortals);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load portal categories",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getCategoryPortals = (categoryId: string) => {
    return portals.filter(portal => portal.categoryId === categoryId);
  };

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      Truck, Settings, Activity, Shield, Globe, Package, Users, Folder
    };
    return iconMap[iconName] || Folder;
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto"></div>
          <p className="text-muted-foreground">Loading Portal Categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Portal Categories</h1>
          <p className="text-muted-foreground">
            Organize and manage portals by categories and groups
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Categories
          </Button>
          <Button onClick={() => setNewCategoryDialog(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Category
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => {
          const IconComponent = getIconComponent(category.icon);
          const categoryPortals = getCategoryPortals(category.id);
          
          return (
            <Card 
              key={category.id} 
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color} text-white`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{category.portalCount}</div>
                    <div className="text-xs text-muted-foreground">Portals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{category.totalUsers.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Users</div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <Label className="text-sm font-medium">Key Features</Label>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {category.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature.replace('_', ' ')}
                      </Badge>
                    ))}
                    {category.features.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{category.features.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Portal List (Expandable) */}
                {selectedCategory === category.id && (
                  <div className="border-t pt-4 space-y-2">
                    <Label className="text-sm font-medium">Portals in Category</Label>
                    {categoryPortals.map((portal) => (
                      <div key={portal.id} className="flex items-center justify-between p-2 bg-muted rounded">
                        <div>
                          <div className="font-medium text-sm">{portal.name}</div>
                          <div className="text-xs text-muted-foreground capitalize">
                            {portal.type.replace('_', ' ')} • {portal.users.toLocaleString()} users
                          </div>
                        </div>
                        <Badge variant={portal.status === 'active' ? 'default' : 'secondary'}>
                          {portal.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Users className="w-3 h-3 mr-1" />
                    Manage
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Summary Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Category Summary</CardTitle>
          <CardDescription>Overview of portal categorization</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{categories.length}</div>
              <div className="text-sm text-muted-foreground">Total Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{portals.length}</div>
              <div className="text-sm text-muted-foreground">Total Portals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {portals.reduce((sum, portal) => sum + portal.users, 0).toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {(portals.reduce((sum, portal) => sum + portal.users, 0) / portals.length).toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">Avg Users/Portal</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PortalCategoriesPage;
