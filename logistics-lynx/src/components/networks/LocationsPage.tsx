import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Download, Upload, MapPin, Navigation, Package, Home, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { mockLocations } from '@/data/mockData';
import { Location } from '@/types/networks';

export default function LocationsPage() {
  const [locations] = useState<Location[]>(mockLocations);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterLocationType, setFilterLocationType] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (location.contactPerson && location.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || location.status === filterStatus;
    const matchesLocationType = filterLocationType === 'all' || location.locationType === filterLocationType;
    
    return matchesSearch && matchesStatus && matchesLocationType;
  });

  const getStatusBadge = (status: Location['status']) => {
    const variants = {
      active: { variant: 'default' as const, color: 'bg-green-500' },
      inactive: { variant: 'secondary' as const, color: 'bg-gray-500' }
    };
    
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${variants[status].color}`} />
        <Badge variant={variants[status].variant}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
      </div>
    );
  };

  const getLocationTypeBadge = (type: Location['locationType']) => {
    const variants = {
      pickup: { variant: 'default' as const, icon: Package, color: 'text-blue-600' },
      delivery: { variant: 'secondary' as const, icon: Home, color: 'text-green-600' },
      stop: { variant: 'outline' as const, icon: MapPin, color: 'text-orange-600' },
      hub: { variant: 'default' as const, icon: Building, color: 'text-purple-600' },
      depot: { variant: 'secondary' as const, icon: Navigation, color: 'text-red-600' }
    };
    
    const { variant, icon: Icon, color } = variants[type];
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className={`w-3 h-3 ${color}`} />
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const LocationForm = ({ location, onClose }: { location?: Location; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: location?.name || 'New Distribution Point',
      code: location?.code || 'NDP-001',
      address: location?.address || '123 Logistics Ave',
      city: location?.city || 'Phoenix',
      state: location?.state || 'AZ',
      zipCode: location?.zipCode || '85001',
      country: location?.country || 'USA',
      latitude: location?.latitude || 33.4484,
      longitude: location?.longitude || -112.0740,
      locationType: location?.locationType || 'delivery',
      status: location?.status || 'active',
      timeZone: location?.timeZone || 'America/Phoenix',
      contactPerson: location?.contactPerson || 'Site Manager',
      phone: location?.phone || '(555) 123-4567',
      email: location?.email || 'manager@newlocation.com',
      accessInstructions: location?.accessInstructions || 'Use main entrance, check in at reception',
      notes: location?.notes || 'New delivery location'
    });

    const handleSave = () => {
      console.log('Saving location:', formData);
      onClose();
    };

    return (
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="address">Address & Contact</TabsTrigger>
          <TabsTrigger value="details">Details & Instructions</TabsTrigger>
        </TabsList>
        
        <div className="max-h-[500px] overflow-y-auto mt-4">
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Location Name *</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="code">Location Code *</Label>
                <Input 
                  id="code" 
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="locationType">Location Type</Label>
                <Select value={formData.locationType} onValueChange={(value) => setFormData({...formData, locationType: value as Location['locationType']})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pickup">Pickup</SelectItem>
                    <SelectItem value="delivery">Delivery</SelectItem>
                    <SelectItem value="stop">Stop</SelectItem>
                    <SelectItem value="hub">Hub</SelectItem>
                    <SelectItem value="depot">Depot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as Location['status']})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="timeZone">Time Zone</Label>
                <Select value={formData.timeZone} onValueChange={(value) => setFormData({...formData, timeZone: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="America/New_York">Eastern</SelectItem>
                    <SelectItem value="America/Chicago">Central</SelectItem>
                    <SelectItem value="America/Denver">Mountain</SelectItem>
                    <SelectItem value="America/Phoenix">Mountain (No DST)</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="address" className="space-y-4">
            <div>
              <Label htmlFor="address">Address *</Label>
              <Input 
                id="address" 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input 
                  id="city" 
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input 
                  id="state" 
                  value={formData.state}
                  onChange={(e) => setFormData({...formData, state: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input 
                  id="zipCode" 
                  value={formData.zipCode}
                  onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="country">Country *</Label>
                <Input 
                  id="country" 
                  value={formData.country}
                  onChange={(e) => setFormData({...formData, country: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input 
                  id="latitude" 
                  type="number" 
                  step="unknown" 
                  value={formData.latitude}
                  onChange={(e) => setFormData({...formData, latitude: Number(e.target.value)})}
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input 
                  id="longitude" 
                  type="number" 
                  step="unknown" 
                  value={formData.longitude}
                  onChange={(e) => setFormData({...formData, longitude: Number(e.target.value)})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactPerson">Contact Person</Label>
                <Input 
                  id="contactPerson" 
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </TabsContent>

          <TabsContent value="details" className="space-y-4">
            <div>
              <Label htmlFor="accessInstructions">Access Instructions</Label>
              <Textarea 
                id="accessInstructions" 
                value={formData.accessInstructions}
                onChange={(e) => setFormData({...formData, accessInstructions: e.target.value})}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="notes">Notes</Label>
              <Textarea 
                id="notes" 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                rows={3}
              />
            </div>
          </TabsContent>
        </div>

        <Separator className="my-4" />
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>
            {location ? 'Update Location' : 'Create Location'}
          </Button>
        </div>
      </Tabs>
    );
  };

  const activeLocations = locations.filter(l => l.status === 'active').length;
  const pickupLocations = locations.filter(l => l.locationType === 'pickup').length;
  const deliveryLocations = locations.filter(l => l.locationType === 'delivery').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Navigation className="w-8 h-8 text-primary" />
            Location Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage pickup, delivery, and stop locations across your network</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Add New Location</DialogTitle>
              </DialogHeader>
              <LocationForm onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
            <Navigation className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{locations.length}</div>
            <p className="text-xs text-muted-foreground">Network points</p>
            <Progress value={90} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pickup Points</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pickupLocations}</div>
            <p className="text-xs text-muted-foreground">Origin locations</p>
            <Progress value={(pickupLocations / locations.length) * 100} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Points</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{deliveryLocations}</div>
            <p className="text-xs text-muted-foreground">Destination locations</p>
            <Progress value={(deliveryLocations / locations.length) * 100} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Locations</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeLocations}</div>
            <p className="text-xs text-muted-foreground">Currently operational</p>
            <Progress value={(activeLocations / locations.length) * 100} className="mt-2" />
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
                  placeholder="Search locations by name, code, city, or contact person..."
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
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterLocationType} onValueChange={setFilterLocationType}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Location Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="pickup">Pickup</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="stop">Stop</SelectItem>
                  <SelectItem value="hub">Hub</SelectItem>
                  <SelectItem value="depot">Depot</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Navigation className="w-5 h-5" />
            Location Directory
            <Badge variant="secondary" className="ml-2">
              {filteredLocations.length} locations
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Location</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Time Zone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLocations.map((location) => (
                  <TableRow key={location.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {location.code}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{location.name}</div>
                          <div className="text-sm text-muted-foreground">{location.code}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <div>
                          <div className="text-sm">{location.address}</div>
                          <div className="text-xs text-muted-foreground">
                            {location.city}, {location.state} {location.zipCode}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getLocationTypeBadge(location.locationType)}</TableCell>
                    <TableCell>
                      {location.contactPerson && (
                        <div className="space-y-1">
                          <div className="font-medium text-sm">{location.contactPerson}</div>
                          {location.email && <div className="text-sm text-muted-foreground">{location.email}</div>}
                          {location.phone && <div className="text-sm text-muted-foreground">{location.phone}</div>}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">
                      <Badge variant="outline">
                        {location.timeZone.split('/')[1]?.replace('_', ' ')}
                      </Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(location.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => {
                            setSelectedLocation(location);
                            setIsViewDialogOpen(true);
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedLocation(location);
                            setIsEditDialogOpen(true);
                          }}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Location
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Location
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
          </DialogHeader>
          {selectedLocation && (
            <LocationForm location={selectedLocation} onClose={() => setIsEditDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Location Details</DialogTitle>
          </DialogHeader>
          {selectedLocation && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                    {selectedLocation.code}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedLocation.name}</h3>
                  <p className="text-muted-foreground">{selectedLocation.locationType} location</p>
                  <div className="flex gap-2 mt-2">
                    {getStatusBadge(selectedLocation.status)}
                    {getLocationTypeBadge(selectedLocation.locationType)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Location Information</h4>
                  <div className="space-y-2">
                    <div><strong>Code:</strong> {selectedLocation.code}</div>
                    <div><strong>Time Zone:</strong> {selectedLocation.timeZone}</div>
                    <div><strong>Coordinates:</strong> {selectedLocation.latitude}, {selectedLocation.longitude}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Address & Contact</h4>
                  <div className="space-y-2">
                    <div><strong>Address:</strong> {selectedLocation.address}</div>
                    <div><strong>Location:</strong> {selectedLocation.city}, {selectedLocation.state} {selectedLocation.zipCode}</div>
                    <div><strong>Country:</strong> {selectedLocation.country}</div>
                    {selectedLocation.contactPerson && <div><strong>Contact:</strong> {selectedLocation.contactPerson}</div>}
                    {selectedLocation.email && <div><strong>Email:</strong> {selectedLocation.email}</div>}
                    {selectedLocation.phone && <div><strong>Phone:</strong> {selectedLocation.phone}</div>}
                  </div>
                </div>
              </div>

              {selectedLocation.accessInstructions && (
                <div>
                  <h4 className="font-semibold mb-2">Access Instructions</h4>
                  <p className="text-sm bg-muted p-3 rounded-md">{selectedLocation.accessInstructions}</p>
                </div>
              )}

              {selectedLocation.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm bg-muted p-3 rounded-md">{selectedLocation.notes}</p>
                </div>
              )}

              <div className="flex justify-end">
                <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}