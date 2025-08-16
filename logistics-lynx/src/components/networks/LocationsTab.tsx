/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Search, Edit, Trash2, MapPin, Navigation, Clock, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Location {
  id: string;
  name: string;
  type: 'pickup' | 'delivery' | 'warehouse' | 'customer' | 'vendor' | 'depot';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  status: 'active' | 'inactive' | 'temporary' | 'restricted';
  contactPerson: string;
  phone: string;
  email: string;
  accessHours: string;
  specialInstructions: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  lastVisit: string;
  totalVisits: number;
  averageStayTime: number; // in minutes
}

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Downtown Distribution Center',
    type: 'warehouse',
    address: '123 Main Street',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
    status: 'active',
    contactPerson: 'John Smith',
    phone: '+1 (555) 111-2222',
    email: 'john@downtown.com',
    accessHours: '06:00 - 22:00',
    specialInstructions: 'Use loading dock B for deliveries. Security check required.',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    lastVisit: '2024-06-16',
    totalVisits: 145,
    averageStayTime: 45
  },
  {
    id: '2',
    name: 'TechCorp Headquarters',
    type: 'customer',
    address: '456 Innovation Drive',
    city: 'San Francisco',
    state: 'CA',
    zipCode: '94105',
    country: 'USA',
    status: 'active',
    contactPerson: 'Sarah Johnson',
    phone: '+1 (555) 333-4444',
    email: 'sarah@techcorp.com',
    accessHours: '08:00 - 17:00',
    specialInstructions: 'Visitor badge required. Call 30 minutes before arrival.',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    lastVisit: '2024-06-15',
    totalVisits: 78,
    averageStayTime: 30
  },
  {
    id: '3',
    name: 'Rapid Parts Supplier',
    type: 'vendor',
    address: '789 Industrial Blvd',
    city: 'Detroit',
    state: 'MI',
    zipCode: '48201',
    country: 'USA',
    status: 'active',
    contactPerson: 'Mike Rodriguez',
    phone: '+1 (555) 555-6666',
    email: 'mike@rapidparts.com',
    accessHours: '24/7',
    specialInstructions: 'Enter through Gate 3. Ask for receiving department.',
    coordinates: { lat: 42.3314, lng: -83.0458 },
    lastVisit: '2024-06-17',
    totalVisits: 234,
    averageStayTime: 60
  },
  {
    id: '4',
    name: 'Suburban Pickup Point',
    type: 'pickup',
    address: '321 Residential Ave',
    city: 'Austin',
    state: 'TX',
    zipCode: '73301',
    country: 'USA',
    status: 'temporary',
    contactPerson: 'Lisa Chen',
    phone: '+1 (555) 777-8888',
    email: 'lisa@residential.com',
    accessHours: '09:00 - 18:00',
    specialInstructions: 'Ring doorbell. Package can be left with neighbor if no answer.',
    coordinates: { lat: 30.2672, lng: -97.7431 },
    lastVisit: '2024-06-14',
    totalVisits: 12,
    averageStayTime: 15
  }
];

const LocationsTab = () => {
  const [locations, setLocations] = useState<Location[]>(mockLocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Omit<Location, 'id' | 'lastVisit' | 'totalVisits' | 'averageStayTime'>>({
    name: '',
    type: 'customer',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    status: 'active',
    contactPerson: '',
    phone: '',
    email: '',
    accessHours: '09:00 - 17:00',
    specialInstructions: '',
    coordinates: { lat: 0, lng: 0 }
  });

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'customer',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA',
      status: 'active',
      contactPerson: '',
      phone: '',
      email: '',
      accessHours: '09:00 - 17:00',
      specialInstructions: '',
      coordinates: { lat: 0, lng: 0 }
    });
    setEditingLocation(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingLocation) {
      setLocations(prev => prev.map(location =>
        location.id === editingLocation.id
          ? { ...location, ...formData }
          : location
      ));
      toast({
        title: "Location Updated",
        description: "Location information has been successfully updated.",
      });
    } else {
      const newLocation: Location = {
        ...formData,
        id: Date.now().toString(),
        lastVisit: '',
        totalVisits: 0,
        averageStayTime: 0
      };
      setLocations(prev => [...prev, newLocation]);
      toast({
        title: "Location Added",
        description: "New location has been successfully added to the system.",
      });
    }
    
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEdit = (location: Location) => {
    setEditingLocation(location);
    setFormData({
      name: location.name,
      type: location.type,
      address: location.address,
      city: location.city,
      state: location.state,
      zipCode: location.zipCode,
      country: location.country,
      status: location.status,
      contactPerson: location.contactPerson,
      phone: location.phone,
      email: location.email,
      accessHours: location.accessHours,
      specialInstructions: location.specialInstructions,
      coordinates: location.coordinates
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (locationId: string) => {
    setLocations(prev => prev.filter(location => location.id !== locationId));
    toast({
      title: "Location Deleted",
      description: "Location has been removed from the system.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: Location['status']) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      temporary: 'bg-yellow-100 text-yellow-800',
      restricted: 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[status]}>{status}</Badge>;
  };

  const getTypeBadge = (type: Location['type']) => {
    const variants = {
      pickup: 'bg-blue-100 text-blue-800',
      delivery: 'bg-green-100 text-green-800',
      warehouse: 'bg-purple-100 text-purple-800',
      customer: 'bg-orange-100 text-orange-800',
      vendor: 'bg-cyan-100 text-cyan-800',
      depot: 'bg-gray-100 text-gray-800'
    };
    return <Badge className={variants[type]}>{type}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Location
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingLocation ? 'Edit Location' : 'Add New Location'}
              </DialogTitle>
              <DialogDescription>
                {editingLocation
                  ? 'Update location information below.'
                  : 'Enter location details to add it to your network.'
                }
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Location Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    placeholder="Enter location name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value: Location['type']) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pickup">Pickup</SelectItem>
                      <SelectItem value="delivery">Delivery</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="depot">Depot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: Location['status']) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="temporary">Temporary</SelectItem>
                      <SelectItem value="restricted">Restricted</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="accessHours">Access Hours</Label>
                  <Input
                    id="accessHours"
                    value={formData.accessHours}
                    onChange={(e) => setFormData(prev => ({ ...prev, accessHours: e.target.value }))}
                    placeholder="e.g., 09:00 - 17:00"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  required
                  placeholder="Street address"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    required
                    placeholder="City"
                  />
                </div>
                
                <div>
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    required
                    placeholder="State"
                  />
                </div>
                
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                    placeholder="ZIP Code"
                  />
                </div>
                
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="Country"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="contactPerson">Contact Person</Label>
                  <Input
                    id="contactPerson"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData(prev => ({ ...prev, contactPerson: e.target.value }))}
                    placeholder="Contact person name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="contact@example.com"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="specialInstructions">Special Instructions</Label>
                <Textarea
                  id="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={(e) => setFormData(prev => ({ ...prev, specialInstructions: e.target.value }))}
                  placeholder="Any special delivery or access instructions..."
                  rows={3}
                />
              </div>
              
              <div className="flex justify-end space-x-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingLocation ? 'Update Location' : 'Add Location'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Locations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Locations ({filteredLocations.length})</CardTitle>
          <CardDescription>
            Manage your network of pickup, delivery, and storage locations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Access Hours</TableHead>
                  <TableHead>Visits</TableHead>
                  <TableHead>Avg Stay</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLocations.map((location) => (
                  <TableRow key={location.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {location.lastVisit && `Last visit: ${new Date(location.lastVisit).toLocaleDateString()}`}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{location.address}</div>
                        <div className="text-muted-foreground">
                          {location.city}, {location.state} {location.zipCode}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(location.type)}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(location.status)}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{location.contactPerson}</div>
                        <div className="text-muted-foreground">{location.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-sm">
                        <Clock className="h-3 w-3 mr-1" />
                        {location.accessHours}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{location.totalVisits}</div>
                        <div className="text-xs text-muted-foreground">total</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{location.averageStayTime}m</div>
                        <div className="text-xs text-muted-foreground">avg</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(location)}
                        >
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(location.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LocationsTab;
