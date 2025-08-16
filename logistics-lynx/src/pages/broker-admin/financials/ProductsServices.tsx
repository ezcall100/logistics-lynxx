/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Package,
  DollarSign,
  TrendingUp,
  Star,
  Truck,
  Settings,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ProductsServices = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    type: 'service',
    category: '',
    description: '',
    basePrice: '',
    unit: '',
    taxable: true,
    active: true,
    markup: '',
    costCenter: ''
  });

  // Sample products and services data
  const items = [
    {
      id: '1',
      name: 'Full Truckload (FTL)',
      type: 'service',
      category: 'Transportation',
      description: 'Full truckload freight transportation services',
      basePrice: 2.50,
      unit: 'per mile',
      taxable: false,
      active: true,
      markup: 15,
      costCenter: 'Operations',
      usage: 45,
      revenue: 125000
    },
    {
      id: '2',
      name: 'Less Than Truckload (LTL)',
      type: 'service',
      category: 'Transportation',
      description: 'LTL freight transportation for smaller shipments',
      basePrice: 1.85,
      unit: 'per mile',
      taxable: false,
      active: true,
      markup: 20,
      costCenter: 'Operations',
      usage: 32,
      revenue: 85000
    },
    {
      id: '3',
      name: 'Expedited Shipping',
      type: 'service',
      category: 'Transportation',
      description: 'Priority expedited freight services',
      basePrice: 4.25,
      unit: 'per mile',
      taxable: false,
      active: true,
      markup: 25,
      costCenter: 'Operations',
      usage: 18,
      revenue: 95000
    },
    {
      id: '4',
      name: 'Freight Brokerage',
      type: 'service',
      category: 'Brokerage',
      description: 'Freight brokerage and logistics coordination',
      basePrice: 150.00,
      unit: 'per load',
      taxable: true,
      active: true,
      markup: 0,
      costCenter: 'Brokerage',
      usage: 128,
      revenue: 192000
    },
    {
      id: '5',
      name: 'Load Planning & Optimization',
      type: 'service',
      category: 'Consulting',
      description: 'Route optimization and load planning services',
      basePrice: 85.00,
      unit: 'per hour',
      taxable: true,
      active: true,
      markup: 35,
      costCenter: 'Consulting',
      usage: 24,
      revenue: 12500
    },
    {
      id: '6',
      name: 'Warehousing Services',
      type: 'service',
      category: 'Storage',
      description: 'Temporary storage and cross-docking services',
      basePrice: 0.75,
      unit: 'per sq ft/day',
      taxable: true,
      active: true,
      markup: 40,
      costCenter: 'Warehouse',
      usage: 12,
      revenue: 28000
    },
    {
      id: '7',
      name: 'Insurance Coverage',
      type: 'product',
      category: 'Insurance',
      description: 'Cargo insurance for shipments',
      basePrice: 25.00,
      unit: 'per $1000 value',
      taxable: false,
      active: true,
      markup: 20,
      costCenter: 'Insurance',
      usage: 67,
      revenue: 15800
    },
    {
      id: '8',
      name: 'Fuel Surcharge',
      type: 'service',
      category: 'Surcharge',
      description: 'Fuel cost adjustment surcharge',
      basePrice: 0.15,
      unit: 'per mile',
      taxable: false,
      active: true,
      markup: 0,
      costCenter: 'Operations',
      usage: 89,
      revenue: 45600
    },
    {
      id: '9',
      name: 'Tracking & Visibility',
      type: 'service',
      category: 'Technology',
      description: 'Real-time shipment tracking and visibility',
      basePrice: 15.00,
      unit: 'per shipment',
      taxable: true,
      active: true,
      markup: 50,
      costCenter: 'Technology',
      usage: 156,
      revenue: 23400
    },
    {
      id: '10',
      name: 'Detention Charges',
      type: 'service',
      category: 'Accessorial',
      description: 'Driver detention time charges',
      basePrice: 45.00,
      unit: 'per hour',
      taxable: true,
      active: true,
      markup: 10,
      costCenter: 'Operations',
      usage: 34,
      revenue: 7650
    },
  ];

  const categories = ['all', 'Transportation', 'Brokerage', 'Consulting', 'Storage', 'Insurance', 'Surcharge', 'Technology', 'Accessorial'];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const getTypeIcon = (type: string) => {
    return type === 'product' ? <Package className="h-4 w-4" /> : <Settings className="h-4 w-4" />;
  };

  const getTypeColor = (type: string) => {
    return type === 'product' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800';
  };

  const handleAddItem = () => {
    toast({
      title: "Item Added",
      description: `${newItem.name} has been added successfully.`,
    });
    setIsAddDialogOpen(false);
    setNewItem({
      name: '',
      type: 'service',
      category: '',
      description: '',
      basePrice: '',
      unit: '',
      taxable: true,
      active: true,
      markup: '',
      costCenter: ''
    });
  };

  // Calculate totals
  const totalRevenue = items.reduce((sum, item) => sum + item.revenue, 0);
  const totalItems = items.length;
  const averagePrice = items.reduce((sum, item) => sum + item.basePrice, 0) / items.length;
  const activeItems = items.filter(item => item.active).length;

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Products & Services</h1>
            <p className="text-muted-foreground">
              Manage your freight services, products, and pricing structure
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Product/Service</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      placeholder="Enter item name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={newItem.type} onValueChange={(value) => setNewItem({...newItem, type: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="service">Service</SelectItem>
                        <SelectItem value="product">Product</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select value={newItem.category} onValueChange={(value) => setNewItem({...newItem, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.slice(1).map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="costCenter">Cost Center</Label>
                    <Input
                      id="costCenter"
                      value={newItem.costCenter}
                      onChange={(e) => setNewItem({...newItem, costCenter: e.target.value})}
                      placeholder="e.g., Operations"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                    placeholder="Enter detailed description"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="basePrice">Base Price</Label>
                    <Input
                      id="basePrice"
                      type="number"
                      step="0.01"
                      value={newItem.basePrice}
                      onChange={(e) => setNewItem({...newItem, basePrice: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={newItem.unit}
                      onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                      placeholder="e.g., per mile"
                    />
                  </div>
                  <div>
                    <Label htmlFor="markup">Markup %</Label>
                    <Input
                      id="markup"
                      type="number"
                      value={newItem.markup}
                      onChange={(e) => setNewItem({...newItem, markup: e.target.value})}
                      placeholder="0"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="taxable"
                      checked={newItem.taxable}
                      onCheckedChange={(checked) => setNewItem({...newItem, taxable: checked})}
                    />
                    <Label htmlFor="taxable">Taxable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={newItem.active}
                      onCheckedChange={(checked) => setNewItem({...newItem, active: checked})}
                    />
                    <Label htmlFor="active">Active</Label>
                  </div>
                </div>
                <Button onClick={handleAddItem} className="w-full">
                  Add Item
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(totalRevenue)}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-green-100">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Items</p>
                  <p className="text-lg font-bold">
                    {totalItems}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-blue-100">
                  <Package className="h-4 w-4 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Price</p>
                  <p className="text-lg font-bold">
                    {formatCurrency(averagePrice)}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-purple-100">
                  <BarChart3 className="h-4 w-4 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Items</p>
                  <p className="text-lg font-bold">
                    {activeItems}
                  </p>
                </div>
                <div className="p-2 rounded-full bg-orange-100">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <CardTitle>Items Catalog</CardTitle>
              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 w-full sm:w-64"
                  />
                </div>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Base Price</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Markup</TableHead>
                  <TableHead className="text-right">Revenue</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-muted-foreground">{item.description}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getTypeColor(item.type)}>
                        {getTypeIcon(item.type)}
                        <span className="ml-1 capitalize">{item.type}</span>
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.category}</TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(item.basePrice)}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{item.unit}</TableCell>
                    <TableCell className="text-center">
                      {item.markup > 0 ? `${item.markup}%` : '-'}
                    </TableCell>
                    <TableCell className="text-right font-medium text-green-600">
                      {formatCurrency(item.revenue)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant={item.active ? 'default' : 'secondary'}>
                          {item.active ? 'Active' : 'Inactive'}
                        </Badge>
                        {item.taxable && (
                          <Badge variant="outline" className="text-xs">Tax</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProductsServices;