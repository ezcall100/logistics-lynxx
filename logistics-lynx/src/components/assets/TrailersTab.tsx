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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2, Container, MapPin, Link2, Calendar, Package, AlertTriangle, Truck, Activity, Filter, Search, Download } from 'lucide-react';
import { useAssetManagement } from '@/hooks/useAssetManagement';

interface TrailersTabProps {
  searchTerm: string;
}

export function TrailersTab({ searchTerm }: TrailersTabProps) {
  const { trailers, loading, handleCreateTrailer, handleUpdateTrailer, handleDeleteTrailer } = useAssetManagement();
  const [selectedTrailer, setSelectedTrailer] = useState<unknown>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const filteredTrailers = trailers.filter(trailer =>
    trailer.trailerNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trailer.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trailer.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trailer.attachedTruck.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'available': return 'default';
      case 'attached': return 'secondary';
      case 'maintenance': return 'destructive';
      case 'out_of_service': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'dry_van': return <Container className="h-4 w-4" />;
      case 'refrigerated': return <Package className="h-4 w-4 text-blue-500" />;
      case 'flatbed': return <Container className="h-4 w-4 text-orange-500" />;
      case 'tanker': return <Package className="h-4 w-4 text-purple-500" />;
      case 'container': return <Container className="h-4 w-4 text-green-500" />;
      default: return <Container className="h-4 w-4" />;
    }
  };

  const handleSubmitCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      trailerNumber: formData.get('trailerNumber'),
      type: formData.get('type'),
      capacity: parseInt(formData.get('capacity') as string),
      status: formData.get('status'),
      attachedTruck: formData.get('attachedTruck') || '',
      location: formData.get('location'),
    };
    handleCreateTrailer(data);
    setIsCreateOpen(false);
  };

  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      trailerNumber: formData.get('trailerNumber'),
      type: formData.get('type'),
      capacity: parseInt(formData.get('capacity') as string),
      status: formData.get('status'),
      attachedTruck: formData.get('attachedTruck') || '',
      location: formData.get('location'),
    };
    handleUpdateTrailer(selectedTrailer.id, data);
    setIsEditOpen(false);
    setSelectedTrailer(null);
  };

  const totalTrailers = trailers.length;
  const availableTrailers = trailers.filter(t => t.status === 'available').length;
  const attachedTrailers = trailers.filter(t => t.status === 'attached').length;
  const utilizationRate = totalTrailers > 0 ? Math.round((attachedTrailers / totalTrailers) * 100) : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted animate-pulse rounded mb-2" />
                <div className="h-3 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="gradient-border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Trailers</CardTitle>
            <Container className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{totalTrailers}</div>
            <p className="text-xs text-muted-foreground">Fleet assets</p>
          </CardContent>
        </Card>
        <Card className="gradient-border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available</CardTitle>
            <div className="h-2 w-2 bg-gradient-to-r from-success to-success-light rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{availableTrailers}</div>
            <p className="text-xs text-muted-foreground">Ready to use</p>
          </CardContent>
        </Card>
        <Card className="gradient-border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Use</CardTitle>
            <div className="h-2 w-2 bg-gradient-to-r from-warning to-warning-light rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{attachedTrailers}</div>
            <p className="text-xs text-muted-foreground">Currently attached</p>
          </CardContent>
        </Card>
        <Card className="gradient-border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Utilization</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{utilizationRate}%</div>
            <p className="text-xs text-muted-foreground">Fleet efficiency</p>
          </CardContent>
        </Card>
      </div>

      {/* Maintenance Alert */}
      {trailers.filter(t => t.status === 'maintenance').length > 0 && (
        <Card className="border-warning bg-warning/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-warning">
              <AlertTriangle className="h-5 w-5" />
              Maintenance Required
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-warning-foreground mb-3">
              {trailers.filter(t => t.status === 'maintenance').length} trailer(s) require maintenance attention.
            </p>
            <Button variant="outline" size="sm" className="border-warning text-warning hover:bg-warning hover:text-warning-foreground">
              View Maintenance Schedule
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Fleet Overview</TabsTrigger>
          <TabsTrigger value="management">Trailer Management</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          {/* Trailer Fleet Summary */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Trailer Types Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'Dry Van', count: 45, color: 'bg-primary' },
                    { type: 'Refrigerated', count: 22, color: 'bg-blue-500' },
                    { type: 'Flatbed', count: 18, color: 'bg-orange-500' },
                    { type: 'Tanker', count: 8, color: 'bg-purple-500' },
                    { type: 'Container', count: 12, color: 'bg-green-500' }
                  ].map((item) => (
                    <div key={item.type} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded ${item.color}`} />
                        <span className="text-sm font-medium">{item.type}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{item.count} units</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Geographic Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { location: 'Memphis Hub, TN', count: 32 },
                    { location: 'Atlanta Terminal, GA', count: 28 },
                    { location: 'Dallas Yard, TX', count: 25 },
                    { location: 'Phoenix Hub, AZ', count: 20 }
                  ].map((location) => (
                    <div key={location.location} className="flex justify-between">
                      <span className="text-sm">{location.location}</span>
                      <span className="text-sm font-medium">{location.count} trailers</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="management" className="space-y-4">
          {/* Trailers Table */}
          <Card className="modern-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Fleet Trailers Management</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Manage your trailer fleet operations</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Add New Trailer
                      </Button>
                    </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Trailer</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitCreate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="trailerNumber">Trailer Number</Label>
                      <Input id="trailerNumber" name="trailerNumber" placeholder="TRL-008" defaultValue="TRL-025" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="type">Type</Label>
                      <Select name="type" defaultValue="dry_van" required>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dry_van">Dry Van</SelectItem>
                          <SelectItem value="refrigerated">Refrigerated</SelectItem>
                          <SelectItem value="flatbed">Flatbed</SelectItem>
                          <SelectItem value="tanker">Tanker</SelectItem>
                          <SelectItem value="container">Container</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="capacity">Capacity (cu ft)</Label>
                      <Input id="capacity" name="capacity" type="number" placeholder="3000" defaultValue="3200" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select name="status" defaultValue="available" required>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="available">Available</SelectItem>
                          <SelectItem value="attached">Attached</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="out_of_service">Out of Service</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attachedTruck">Attached Truck (optional)</Label>
                    <Select name="attachedTruck">
                      <SelectTrigger>
                        <SelectValue placeholder="Select truck..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No truck assigned</SelectItem>
                        <SelectItem value="TRK-001">TRK-001 - Freightliner</SelectItem>
                        <SelectItem value="TRK-002">TRK-002 - Kenworth</SelectItem>
                        <SelectItem value="TRK-003">TRK-003 - Peterbilt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Current Location</Label>
                    <Input id="location" name="location" placeholder="City, State" defaultValue="Dallas Yard, TX" required />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-gradient-primary hover:bg-gradient-primary/90">Add Trailer</Button>
                  </div>
                </form>
                  </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trailer</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Attached To</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Last Inspection</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrailers.map((trailer) => (
                <TableRow key={trailer.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(trailer.type)}
                      <span>{trailer.trailerNumber}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="capitalize font-medium">{trailer.type.replace('_', ' ')}</div>
                  </TableCell>
                  <TableCell>{trailer.capacity.toLocaleString()} cu ft</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(trailer.status)}>
                      {trailer.status.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {trailer.attachedTruck ? (
                      <div className="flex items-center space-x-1">
                        <Link2 className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm font-medium">{trailer.attachedTruck}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-sm">Unattached</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{trailer.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{trailer.lastInspection}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedTrailer(trailer);
                          setIsEditOpen(true);
                        }}
                      >
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteTrailer(trailer.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* Performance Analytics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-base">Utilization Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Current Month</span>
                    <span className="font-medium">{utilizationRate}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Previous Month</span>
                    <span className="font-medium">82%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Year Average</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Target Goal</span>
                    <span className="font-medium text-primary">90%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-base">Maintenance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Scheduled Maintenance</span>
                    <span className="font-medium text-success">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Emergency Repairs</span>
                    <span className="font-medium text-warning">12</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Avg Downtime</span>
                    <span className="font-medium">2.3 days</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Cost per Mile</span>
                    <span className="font-medium">$0.15</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-base">Fleet Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Miles per Trailer</span>
                    <span className="font-medium">125,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Revenue per Mile</span>
                    <span className="font-medium text-success">$2.85</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Fuel Efficiency</span>
                    <span className="font-medium">6.8 MPG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Load Factor</span>
                    <span className="font-medium">92%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Trailer</DialogTitle>
          </DialogHeader>
          {selectedTrailer && (
            <form onSubmit={handleSubmitEdit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-trailerNumber">Trailer Number</Label>
                  <Input id="edit-trailerNumber" name="trailerNumber" defaultValue={selectedTrailer.trailerNumber} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <Select name="type" defaultValue={selectedTrailer.type} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dry_van">Dry Van</SelectItem>
                      <SelectItem value="refrigerated">Refrigerated</SelectItem>
                      <SelectItem value="flatbed">Flatbed</SelectItem>
                      <SelectItem value="tanker">Tanker</SelectItem>
                      <SelectItem value="container">Container</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-capacity">Capacity (cu ft)</Label>
                  <Input id="edit-capacity" name="capacity" type="number" defaultValue={selectedTrailer.capacity} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select name="status" defaultValue={selectedTrailer.status} required>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="attached">Attached</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="out_of_service">Out of Service</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-attachedTruck">Attached Truck (optional)</Label>
                  <Select name="attachedTruck" defaultValue={selectedTrailer.attachedTruck || "none"}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No truck assigned</SelectItem>
                      <SelectItem value="TRK-001">TRK-001 - Freightliner</SelectItem>
                      <SelectItem value="TRK-002">TRK-002 - Kenworth</SelectItem>
                      <SelectItem value="TRK-003">TRK-003 - Peterbilt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              <div className="space-y-2">
                <Label htmlFor="edit-location">Current Location</Label>
                <Input id="edit-location" name="location" defaultValue={selectedTrailer.location} required />
              </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-gradient-primary hover:bg-gradient-primary/90">Update Trailer</Button>
                </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}