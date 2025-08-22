/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';
import { 
  Plus, Pencil, Trash2, Truck, MapPin, User, Wrench, Calendar,
  MoreHorizontal, Filter, Download, Gauge, Fuel, Settings, AlertTriangle,
  CheckCircle, Clock, Activity, TrendingUp, Route, Shield, Eye
} from 'lucide-react';
import { useAssetManagement } from '@/hooks/useAssetManagement';

interface TrucksTabProps {
  searchTerm: string;
}

export function TrucksTab({ searchTerm }: TrucksTabProps) {
  const { trucks, loading, handleCreateTruck, handleUpdateTruck, handleDeleteTruck } = useAssetManagement();
  const [selectedTruck, setSelectedTruck] = useState<unknown>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterModel, setFilterModel] = useState<string>('all');

  const filteredTrucks = trucks.filter(truck => {
    const matchesSearch = truck.truckNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.assignedDriver.toLowerCase().includes(searchTerm.toLowerCase()) ||
      truck.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || truck.status === filterStatus;
    const matchesModel = filterModel === 'all' || truck.model === filterModel;
    
    return matchesSearch && matchesStatus && matchesModel;
  });

  const getStatusColor = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'active': return 'default';
      case 'maintenance': return 'secondary';
      case 'out_of_service': return 'destructive';
      default: return 'outline';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'maintenance': return <Wrench className="h-4 w-4 text-yellow-500" />;
      case 'out_of_service': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-400" />;
    }
  };

  const getBrandIcon = (model: string) => {
    if (model.includes('Freightliner')) return <div className="h-6 w-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">F</div>;
    if (model.includes('Peterbilt')) return <div className="h-6 w-6 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">P</div>;
    if (model.includes('Kenworth')) return <div className="h-6 w-6 bg-green-500 rounded text-white text-xs flex items-center justify-center font-bold">K</div>;
    if (model.includes('Volvo')) return <div className="h-6 w-6 bg-purple-500 rounded text-white text-xs flex items-center justify-center font-bold">V</div>;
    if (model.includes('Mack')) return <div className="h-6 w-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-bold">M</div>;
    return <Truck className="h-6 w-6 text-gray-500" />;
  };

  const handleSubmitCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      truckNumber: formData.get('truckNumber'),
      model: formData.get('model'),
      year: parseInt(formData.get('year') as string),
      capacity: parseInt(formData.get('capacity') as string),
      status: formData.get('status'),
      assignedDriver: formData.get('assignedDriver'),
      location: formData.get('location'),
    };
    handleCreateTruck(data);
    setIsCreateOpen(false);
  };

  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      truckNumber: formData.get('truckNumber'),
      model: formData.get('model'),
      year: parseInt(formData.get('year') as string),
      capacity: parseInt(formData.get('capacity') as string),
      status: formData.get('status'),
      assignedDriver: formData.get('assignedDriver'),
      location: formData.get('location'),
    };
    handleUpdateTruck(selectedTruck.id, data);
    setIsEditOpen(false);
    setSelectedTruck(null);
  };

  const activeTrucks = trucks.filter(t => t.status === 'active').length;
  const maintenanceTrucks = trucks.filter(t => t.status === 'maintenance').length;
  const fleetUtilization = Math.round((activeTrucks / trucks.length) * 100) || 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-0 shadow-md">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-gradient-to-r from-muted to-muted/50 animate-pulse rounded" />
                  <div className="h-8 bg-gradient-to-r from-muted to-muted/50 animate-pulse rounded" />
                  <div className="h-3 bg-gradient-to-r from-muted to-muted/50 animate-pulse rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Card className="border-0 shadow-md">
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-16 bg-gradient-to-r from-muted to-muted/50 animate-pulse rounded-lg" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Advanced Filters & Controls */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32 bg-white/80 border-0 shadow-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="out_of_service">Out of Service</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={filterModel} onValueChange={setFilterModel}>
                <SelectTrigger className="w-40 bg-white/80 border-0 shadow-sm">
                  <SelectValue placeholder="Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Brands</SelectItem>
                  <SelectItem value="Freightliner Cascadia">Freightliner</SelectItem>
                  <SelectItem value="Peterbilt 579">Peterbilt</SelectItem>
                  <SelectItem value="Kenworth T680">Kenworth</SelectItem>
                  <SelectItem value="Volvo VNL 860">Volvo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="bg-white/80 border-0 shadow-sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="shadow-md bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Truck
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Add New Truck</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitCreate} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="truckNumber" className="text-sm font-medium">Truck Number</Label>
                        <Input id="truckNumber" name="truckNumber" placeholder="TRK-007" defaultValue="TRK-007" required className="border-0 shadow-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model" className="text-sm font-medium">Model</Label>
                        <Select name="model" defaultValue="Freightliner Cascadia" required>
                          <SelectTrigger className="border-0 shadow-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Freightliner Cascadia">Freightliner Cascadia</SelectItem>
                            <SelectItem value="Peterbilt 579">Peterbilt 579</SelectItem>
                            <SelectItem value="Kenworth T680">Kenworth T680</SelectItem>
                            <SelectItem value="Volvo VNL 860">Volvo VNL 860</SelectItem>
                            <SelectItem value="Mack Anthem">Mack Anthem</SelectItem>
                            <SelectItem value="International LT">International LT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="year" className="text-sm font-medium">Year</Label>
                        <Input id="year" name="year" type="number" placeholder="2023" defaultValue="2023" min="2000" max="2025" required className="border-0 shadow-sm" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacity" className="text-sm font-medium">Capacity (lbs)</Label>
                        <Input id="capacity" name="capacity" type="number" placeholder="80000" defaultValue="80000" required className="border-0 shadow-sm" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="assignedDriver" className="text-sm font-medium">Assigned Driver</Label>
                      <Input id="assignedDriver" name="assignedDriver" placeholder="Driver Name" defaultValue="Jennifer Lee" required className="border-0 shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-sm font-medium">Current Location</Label>
                      <Input id="location" name="location" placeholder="City, State" defaultValue="Salt Lake City, UT" required className="border-0 shadow-sm" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status" className="text-sm font-medium">Status</Label>
                      <Select name="status" defaultValue="active" required>
                        <SelectTrigger className="border-0 shadow-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="out_of_service">Out of Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                      <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)} className="px-6">
                        Cancel
                      </Button>
                      <Button type="submit" className="px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                        Create Truck
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Trucks Table */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold text-gray-900">Fleet Trucks</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Monitor and manage your truck fleet operations
              </p>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-700 px-3 py-1">
              {filteredTrucks.length} trucks
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow className="border-b">
                  <TableHead className="font-semibold text-gray-700 py-4">Truck Details</TableHead>
                  <TableHead className="font-semibold text-gray-700">Specifications</TableHead>
                  <TableHead className="font-semibold text-gray-700">Status</TableHead>
                  <TableHead className="font-semibold text-gray-700">Driver</TableHead>
                  <TableHead className="font-semibold text-gray-700">Location</TableHead>
                  <TableHead className="font-semibold text-gray-700">Performance</TableHead>
                  <TableHead className="font-semibold text-gray-700">Maintenance</TableHead>
                  <TableHead className="text-right font-semibold text-gray-700">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTrucks.map((truck, index) => (
                  <TableRow key={truck.id} className={`border-b hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-25'}`}>
                    <TableCell className="py-4">
                      <div className="flex items-center space-x-3">
                        {getBrandIcon(truck.model)}
                        <div>
                          <div className="font-semibold text-gray-900">{truck.truckNumber}</div>
                          <div className="text-sm text-muted-foreground">{truck.model}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{truck.year}</div>
                        <div className="text-sm text-muted-foreground">{truck.capacity.toLocaleString()} lbs</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(truck.status)}
                        <Badge variant={getStatusColor(truck.status)} className="capitalize">
                          {truck.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">{truck.assignedDriver}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{truck.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <Fuel className="h-3 w-3 text-blue-500" />
                          <span>6.4 MPG</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <Route className="h-3 w-3 text-green-500" />
                          <span>92% On-time</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs">{truck.lastMaintenance}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="h-1 w-12 bg-gray-200 rounded-full overflow-hidden">
                            <div className="h-full w-3/4 bg-green-500 rounded-full" />
                          </div>
                          <span className="text-xs text-muted-foreground">75%</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedTruck(truck);
                            setIsEditOpen(true);
                          }}
                          className="h-8 w-8 p-0 hover:bg-green-50 hover:text-green-600"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteTruck(truck.id)}
                          className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => {
                              setSelectedTruck(truck);
                              setIsEditOpen(true);
                            }}>
                              <Pencil className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteTruck(truck.id)}>
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Edit Truck</DialogTitle>
          </DialogHeader>
          {selectedTruck && (
            <form onSubmit={handleSubmitEdit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-truckNumber" className="text-sm font-medium">Truck Number</Label>
                  <Input id="edit-truckNumber" name="truckNumber" defaultValue={selectedTruck.truckNumber} required className="border-0 shadow-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-model" className="text-sm font-medium">Model</Label>
                  <Select name="model" defaultValue={selectedTruck.model} required>
                    <SelectTrigger className="border-0 shadow-sm">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Freightliner Cascadia">Freightliner Cascadia</SelectItem>
                      <SelectItem value="Peterbilt 579">Peterbilt 579</SelectItem>
                      <SelectItem value="Kenworth T680">Kenworth T680</SelectItem>
                      <SelectItem value="Volvo VNL 860">Volvo VNL 860</SelectItem>
                      <SelectItem value="Mack Anthem">Mack Anthem</SelectItem>
                      <SelectItem value="International LT">International LT</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-year" className="text-sm font-medium">Year</Label>
                  <Input id="edit-year" name="year" type="number" defaultValue={selectedTruck.year} required className="border-0 shadow-sm" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-capacity" className="text-sm font-medium">Capacity (lbs)</Label>
                  <Input id="edit-capacity" name="capacity" type="number" defaultValue={selectedTruck.capacity} required className="border-0 shadow-sm" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-assignedDriver" className="text-sm font-medium">Assigned Driver</Label>
                <Input id="edit-assignedDriver" name="assignedDriver" defaultValue={selectedTruck.assignedDriver} required className="border-0 shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location" className="text-sm font-medium">Current Location</Label>
                <Input id="edit-location" name="location" defaultValue={selectedTruck.location} required className="border-0 shadow-sm" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status" className="text-sm font-medium">Status</Label>
                <Select name="status" defaultValue={selectedTruck.status} required>
                  <SelectTrigger className="border-0 shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="out_of_service">Out of Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)} className="px-6">
                  Cancel
                </Button>
                <Button type="submit" className="px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
                  Update Truck
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}