import React, { useState } from 'react';
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, Download, Upload, MapPin, Anchor, Train, Truck, Warehouse, Building } from 'lucide-react';
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
import { mockTerminals } from '@/data/mockData';
import { Terminal } from '@/types/networks';

export default function TerminalsPage() {
  const [terminals] = useState<Terminal[]>(mockTerminals);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTerminalType, setFilterTerminalType] = useState<string>('all');
  const [selectedTerminal, setSelectedTerminal] = useState<Terminal | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredTerminals = terminals.filter(terminal => {
    const matchesSearch = terminal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         terminal.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         terminal.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         terminal.contactPerson.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || terminal.status === filterStatus;
    const matchesTerminalType = filterTerminalType === 'all' || terminal.terminalType === filterTerminalType;
    
    return matchesSearch && matchesStatus && matchesTerminalType;
  });

  const getStatusBadge = (status: Terminal['status']) => {
    const variants = {
      active: { variant: 'default' as const, color: 'bg-green-500' },
      inactive: { variant: 'secondary' as const, color: 'bg-gray-500' },
      maintenance: { variant: 'outline' as const, color: 'bg-yellow-500' }
    };
    
    return (
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${variants[status].color}`} />
        <Badge variant={variants[status].variant}>{status.charAt(0).toUpperCase() + status.slice(1)}</Badge>
      </div>
    );
  };

  const getTerminalTypeBadge = (type: Terminal['terminalType']) => {
    const variants = {
      port: { variant: 'default' as const, icon: Anchor, color: 'text-blue-600' },
      rail: { variant: 'secondary' as const, icon: Train, color: 'text-purple-600' },
      truck: { variant: 'outline' as const, icon: Truck, color: 'text-orange-600' },
      warehouse: { variant: 'default' as const, icon: Warehouse, color: 'text-green-600' },
      distribution: { variant: 'secondary' as const, icon: Building, color: 'text-red-600' }
    };
    
    const { variant, icon: Icon, color } = variants[type];
    return (
      <Badge variant={variant} className="flex items-center gap-1">
        <Icon className={`w-3 h-3 ${color}`} />
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const TerminalForm = ({ terminal, onClose }: { terminal?: Terminal; onClose: () => void }) => {
    const [formData, setFormData] = useState({
      name: terminal?.name || 'New Terminal Hub',
      code: terminal?.code || 'NTH-001',
      address: terminal?.address || '123 Terminal Rd',
      city: terminal?.city || 'Miami',
      state: terminal?.state || 'FL',
      zipCode: terminal?.zipCode || '33101',
      country: terminal?.country || 'USA',
      latitude: terminal?.latitude || 25.7617,
      longitude: terminal?.longitude || -80.1918,
      terminalType: terminal?.terminalType || 'warehouse',
      status: terminal?.status || 'active',
      capacity: terminal?.capacity || 1000,
      contactPerson: terminal?.contactPerson || 'Terminal Manager',
      operatingHours: terminal?.operatingHours || 'Mon-Fri 8AM-6PM',
      phone: terminal?.phone || '(555) 123-4567',
      email: terminal?.email || 'manager@newterminal.com',
      facilities: terminal?.facilities?.join(', ') || 'Loading Dock, Security, Storage',
      notes: terminal?.notes || 'New terminal facility'
    });

    const handleSave = () => {
      console.log('Saving terminal:', formData);
      onClose();
    };

    return (
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="location">Location & Contact</TabsTrigger>
          <TabsTrigger value="operations">Operations</TabsTrigger>
        </TabsList>
        
        <div className="max-h-[500px] overflow-y-auto mt-4">
          <TabsContent value="basic" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Terminal Name *</Label>
                <Input 
                  id="name" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="code">Terminal Code *</Label>
                <Input 
                  id="code" 
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value as Terminal['status']})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="terminalType">Terminal Type</Label>
                <Select value={formData.terminalType} onValueChange={(value) => setFormData({...formData, terminalType: value as Terminal['terminalType']})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="port">Port</SelectItem>
                    <SelectItem value="rail">Rail</SelectItem>
                    <SelectItem value="truck">Truck</SelectItem>
                    <SelectItem value="warehouse">Warehouse</SelectItem>
                    <SelectItem value="distribution">Distribution</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input 
                id="capacity" 
                type="number" 
                value={formData.capacity}
                onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
              />
            </div>
          </TabsContent>

          <TabsContent value="location" className="space-y-4">
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
                <Label htmlFor="contactPerson">Contact Person *</Label>
                <Input 
                  id="contactPerson" 
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone *</Label>
                <Input 
                  id="phone" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input 
                id="email" 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </TabsContent>

          <TabsContent value="operations" className="space-y-4">
            <div>
              <Label htmlFor="operatingHours">Operating Hours</Label>
              <Input 
                id="operatingHours" 
                value={formData.operatingHours}
                onChange={(e) => setFormData({...formData, operatingHours: e.target.value})}
              />
            </div>

            <div>
              <Label htmlFor="facilities">Facilities (comma-separated)</Label>
              <Input 
                id="facilities" 
                value={formData.facilities}
                onChange={(e) => setFormData({...formData, facilities: e.target.value})}
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
            {terminal ? 'Update Terminal' : 'Create Terminal'}
          </Button>
        </div>
      </Tabs>
    );
  };

  const totalCapacity = terminals.reduce((sum, t) => sum + t.capacity, 0);
  const activeTerminals = terminals.filter(t => t.status === 'active').length;
  const portTerminals = terminals.filter(t => t.terminalType === 'port').length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <MapPin className="w-8 h-8 text-primary" />
            Terminal Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage shipping terminals, distribution centers, and logistics hubs</p>
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
                Add Terminal
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>Add New Terminal</DialogTitle>
              </DialogHeader>
              <TerminalForm onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Terminals</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{terminals.length}</div>
            <p className="text-xs text-muted-foreground">Network facilities</p>
            <Progress value={85} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-cyan-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Port Terminals</CardTitle>
            <Anchor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{portTerminals}</div>
            <p className="text-xs text-muted-foreground">Ocean access</p>
            <Progress value={(portTerminals / terminals.length) * 100} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
            <Warehouse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalCapacity.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Combined capacity</p>
          </CardContent>
        </Card>
        
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Terminals</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeTerminals}</div>
            <p className="text-xs text-muted-foreground">Currently operational</p>
            <Progress value={(activeTerminals / terminals.length) * 100} className="mt-2" />
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
                  placeholder="Search terminals by name, code, city, or contact person..."
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
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterTerminalType} onValueChange={setFilterTerminalType}>
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Terminal Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="port">Port</SelectItem>
                  <SelectItem value="rail">Rail</SelectItem>
                  <SelectItem value="truck">Truck</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="distribution">Distribution</SelectItem>
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

      {/* Terminal Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Terminal Directory
            <Badge variant="secondary" className="ml-2">
              {filteredTerminals.length} terminals
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Terminal</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Operating Hours</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTerminals.map((terminal) => (
                  <TableRow key={terminal.id} className="hover:bg-muted/50">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {terminal.code}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{terminal.name}</div>
                          <div className="text-sm text-muted-foreground">{terminal.code}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <div>
                          <div className="text-sm">{terminal.city}, {terminal.state}</div>
                          <div className="text-xs text-muted-foreground">{terminal.country}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getTerminalTypeBadge(terminal.terminalType)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium text-sm">{terminal.contactPerson}</div>
                        <div className="text-sm text-muted-foreground">{terminal.email}</div>
                        <div className="text-sm text-muted-foreground">{terminal.phone}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="font-mono text-sm">
                        {terminal.capacity.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{terminal.operatingHours}</TableCell>
                    <TableCell>{getStatusBadge(terminal.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => {
                            setSelectedTerminal(terminal);
                            setIsViewDialogOpen(true);
                          }}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => {
                            setSelectedTerminal(terminal);
                            setIsEditDialogOpen(true);
                          }}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Terminal
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Terminal
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
            <DialogTitle>Edit Terminal</DialogTitle>
          </DialogHeader>
          {selectedTerminal && (
            <TerminalForm terminal={selectedTerminal} onClose={() => setIsEditDialogOpen(false)} />
          )}
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Terminal Details</DialogTitle>
          </DialogHeader>
          {selectedTerminal && (
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold text-lg">
                    {selectedTerminal.code}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{selectedTerminal.name}</h3>
                  <p className="text-muted-foreground">{selectedTerminal.terminalType} terminal</p>
                  <div className="flex gap-2 mt-2">
                    {getStatusBadge(selectedTerminal.status)}
                    {getTerminalTypeBadge(selectedTerminal.terminalType)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Terminal Information</h4>
                  <div className="space-y-2">
                    <div><strong>Code:</strong> {selectedTerminal.code}</div>
                    <div><strong>Capacity:</strong> {selectedTerminal.capacity.toLocaleString()}</div>
                    <div><strong>Operating Hours:</strong> {selectedTerminal.operatingHours}</div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Location & Contact</h4>
                  <div className="space-y-2">
                    <div><strong>Address:</strong> {selectedTerminal.address}</div>
                    <div><strong>Location:</strong> {selectedTerminal.city}, {selectedTerminal.state} {selectedTerminal.zipCode}</div>
                    <div><strong>Country:</strong> {selectedTerminal.country}</div>
                    <div><strong>Coordinates:</strong> {selectedTerminal.latitude}, {selectedTerminal.longitude}</div>
                    <div><strong>Contact:</strong> {selectedTerminal.contactPerson}</div>
                    <div><strong>Email:</strong> {selectedTerminal.email}</div>
                    <div><strong>Phone:</strong> {selectedTerminal.phone}</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Facilities</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTerminal.facilities.map((facility, index) => (
                    <Badge key={index} variant="outline">{facility}</Badge>
                  ))}
                </div>
              </div>

              {selectedTerminal.notes && (
                <div>
                  <h4 className="font-semibold mb-2">Notes</h4>
                  <p className="text-sm bg-muted p-3 rounded-md">{selectedTerminal.notes}</p>
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