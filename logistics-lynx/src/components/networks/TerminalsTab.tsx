
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
import { Plus, Search, Edit, Trash2, MapPin, Building, Clock, Truck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Terminal {
  id: string;
  name: string;
  code: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'warehouse' | 'distribution' | 'cross_dock' | 'port' | 'rail' | 'intermodal';
  status: 'active' | 'inactive' | 'maintenance' | 'under_construction';
  capacity: number;
  currentOccupancy: number;
  operatingHours: string;
  manager: string;
  phone: string;
  email: string;
  services: string[];
  lastUpdate: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

const mockTerminals: Terminal[] = [
  {
    id: '1',
    name: 'Central Distribution Hub',
    code: 'CDH-001',
    address: '1500 Commerce Parkway',
    city: 'Chicago',
    state: 'IL',
    zipCode: '60616',
    type: 'distribution',
    status: 'active',
    capacity: 50000,
    currentOccupancy: 42500,
    operatingHours: '24/7',
    manager: 'John Smith',
    phone: '+1 (555) 201-3000',
    email: 'cdh@logistics.com',
    services: ['Loading', 'Unloading', 'Storage', 'Cross-dock'],
    lastUpdate: '2024-06-17',
    coordinates: { lat: 41.8781, lng: -87.6298 }
  },
  {
    id: '2',
    name: 'Port Authority Terminal',
    code: 'PAT-005',
    address: '2800 Harbor Drive',
    city: 'Long Beach',
    state: 'CA',
    zipCode: '90802',
    type: 'port',
    status: 'active',
    capacity: 100000,
    currentOccupancy: 78000,
    operatingHours: '06:00 - 22:00',
    manager: 'Maria Garcia',
    phone: '+1 (555) 202-4000',
    email: 'port@logistics.com',
    services: ['Container handling', 'Customs', 'Storage', 'Rail transfer'],
    lastUpdate: '2024-06-16',
    coordinates: { lat: 33.7701, lng: -118.1937 }
  },
  {
    id: '3',
    name: 'Northeast Warehouse',
    code: 'NEW-012',
    address: '750 Industrial Boulevard',
    city: 'Newark',
    state: 'NJ',
    zipCode: '07102',
    type: 'warehouse',
    status: 'maintenance',
    capacity: 25000,
    currentOccupancy: 15000,
    operatingHours: '08:00 - 18:00',
    manager: 'David Wilson',
    phone: '+1 (555) 203-5000',
    email: 'northeast@logistics.com',
    services: ['Storage', 'Pick & Pack', 'Quality Control'],
    lastUpdate: '2024-06-14',
    coordinates: { lat: 40.7359, lng: -74.1724 }
  },
  {
    id: '4',
    name: 'Southwest Cross-Dock',
    code: 'SWC-008',
    address: '4200 Freight Way',
    city: 'Phoenix',
    state: 'AZ',
    zipCode: '85043',
    type: 'cross_dock',
    status: 'active',
    capacity: 30000,
    currentOccupancy: 22000,
    operatingHours: '05:00 - 23:00',
    manager: 'Lisa Thompson',
    phone: '+1 (555) 204-6000',
    email: 'southwest@logistics.com',
    services: ['Cross-dock', 'Sorting', 'Last-mile prep'],
    lastUpdate: '2024-06-17',
    coordinates: { lat: 33.4484, lng: -112.0740 }
  }
];

const TerminalsTab = () => {
  const [terminals, setTerminals] = useState<Terminal[]>(mockTerminals);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingTerminal, setEditingTerminal] = useState<Terminal | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState<Omit<Terminal, 'id' | 'currentOccupancy' | 'lastUpdate'>>({
    name: '',
    code: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    type: 'warehouse',
    status: 'active',
    capacity: 0,
    operatingHours: '08:00 - 18:00',
    manager: '',
    phone: '',
    email: '',
    services: [],
    coordinates: { lat: 0, lng: 0 }
  });

  const filteredTerminals = terminals.filter(terminal =>
    terminal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    terminal.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    terminal.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    terminal.manager.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      type: 'warehouse',
      status: 'active',
      capacity: 0,
      operatingHours: '08:00 - 18:00',
      manager: '',
      phone: '',
      email: '',
      services: [],
      coordinates: { lat: 0, lng: 0 }
    });
    setEditingTerminal(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingTerminal) {
      setTerminals(prev => prev.map(terminal =>
        terminal.id === editingTerminal.id
          ? { ...terminal, ...formData, lastUpdate: new Date().toISOString().split('T')[0] }
          : terminal
      ));
      toast({
        title: "Terminal Updated",
        description: "Terminal information has been successfully updated.",
      });
    } else {
      const newTerminal: Terminal = {
        ...formData,
        id: Date.now().toString(),
        currentOccupancy: 0,
        lastUpdate: new Date().toISOString().split('T')[0]
      };
      setTerminals(prev => [...prev, newTerminal]);
      toast({
        title: "Terminal Added",
        description: "New terminal has been successfully added to the system.",
      });
    }
    
    setIsAddDialogOpen(false);
    resetForm();
  };

  const handleEdit = (terminal: Terminal) => {
    setEditingTerminal(terminal);
    setFormData({
      name: terminal.name,
      code: terminal.code,
      address: terminal.address,
      city: terminal.city,
      state: terminal.state,
      zipCode: terminal.zipCode,
      type: terminal.type,
      status: terminal.status,
      capacity: terminal.capacity,
      operatingHours: terminal.operatingHours,
      manager: terminal.manager,
      phone: terminal.phone,
      email: terminal.email,
      services: terminal.services,
      coordinates: terminal.coordinates
    });
    setIsAddDialogOpen(true);
  };

  const handleDelete = (terminalId: string) => {
    setTerminals(prev => prev.filter(terminal => terminal.id !== terminalId));
    toast({
      title: "Terminal Deleted",
      description: "Terminal has been removed from the system.",
      variant: "destructive",
    });
  };

  const getStatusBadge = (status: Terminal['status']) => {
    const variants = {
      active: 'bg-green-100 text-green-800',
      inactive: 'bg-gray-100 text-gray-800',
      maintenance: 'bg-yellow-100 text-yellow-800',
      under_construction: 'bg-blue-100 text-blue-800'
    };
    return <Badge className={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  const getTypeBadge = (type: Terminal['type']) => {
    const variants = {
      warehouse: 'bg-blue-100 text-blue-800',
      distribution: 'bg-purple-100 text-purple-800',
      cross_dock: 'bg-green-100 text-green-800',
      port: 'bg-cyan-100 text-cyan-800',
      rail: 'bg-orange-100 text-orange-800',
      intermodal: 'bg-red-100 text-red-800'
    };
    return <Badge className={variants[type]}>{type.replace('_', ' ')}</Badge>;
  };

  const getOccupancyPercentage = (current: number, capacity: number) => {
    return capacity > 0 ? Math.round((current / capacity) * 100) : 0;
  };

  const getOccupancyColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 75) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search terminals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Terminal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingTerminal ? 'Edit Terminal' : 'Add New Terminal'}
              </DialogTitle>
              <DialogDescription>
                {editingTerminal
                  ? 'Update terminal information below.'
                  : 'Enter terminal details to add it to your network.'
                }
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Terminal Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    placeholder="Enter terminal name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="code">Terminal Code *</Label>
                  <Input
                    id="code"
                    value={formData.code}
                    onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                    required
                    placeholder="e.g., CDH-001"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Type</Label>
                  <Select value={formData.type} onValueChange={(value: Terminal['type']) => setFormData(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                      <SelectItem value="distribution">Distribution</SelectItem>
                      <SelectItem value="cross_dock">Cross Dock</SelectItem>
                      <SelectItem value="port">Port</SelectItem>
                      <SelectItem value="rail">Rail</SelectItem>
                      <SelectItem value="intermodal">Intermodal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select value={formData.status} onValueChange={(value: Terminal['status']) => setFormData(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="under_construction">Under Construction</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="Street address"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="City"
                  />
                </div>
                
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
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
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="manager">Manager</Label>
                  <Input
                    id="manager"
                    value={formData.manager}
                    onChange={(e) => setFormData(prev => ({ ...prev, manager: e.target.value }))}
                    placeholder="Manager name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="capacity">Capacity (sq ft)</Label>
                  <Input
                    id="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData(prev => ({ ...prev, capacity: parseInt(e.target.value) || 0 }))}
                    placeholder="Capacity in square feet"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    placeholder="terminal@example.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="operatingHours">Operating Hours</Label>
                  <Input
                    id="operatingHours"
                    value={formData.operatingHours}
                    onChange={(e) => setFormData(prev => ({ ...prev, operatingHours: e.target.value }))}
                    placeholder="e.g., 08:00 - 18:00"
                  />
                </div>
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
                  {editingTerminal ? 'Update Terminal' : 'Add Terminal'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Terminals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Terminals ({filteredTerminals.length})</CardTitle>
          <CardDescription>
            Manage your network of terminals and facilities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Terminal</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Occupancy</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Operating Hours</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTerminals.map((terminal) => {
                  const occupancyPercentage = getOccupancyPercentage(terminal.currentOccupancy, terminal.capacity);
                  return (
                    <TableRow key={terminal.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Building className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-medium">{terminal.name}</div>
                            <div className="text-sm text-muted-foreground">{terminal.code}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          {terminal.city}, {terminal.state}
                        </div>
                      </TableCell>
                      <TableCell>
                        {getTypeBadge(terminal.type)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(terminal.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Truck className="h-3 w-3 mr-1" />
                          {terminal.capacity.toLocaleString()} sq ft
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`font-medium ${getOccupancyColor(occupancyPercentage)}`}>
                          {occupancyPercentage}%
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {terminal.currentOccupancy.toLocaleString()} / {terminal.capacity.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium text-sm">{terminal.manager}</div>
                          <div className="text-xs text-muted-foreground">{terminal.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-sm">
                          <Clock className="h-3 w-3 mr-1" />
                          {terminal.operatingHours}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(terminal)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(terminal.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TerminalsTab;
