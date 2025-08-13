import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, Eye, MapPin, DollarSign, Calendar, Truck } from 'lucide-react';

interface PostedLoad {
  id: string;
  title: string;
  origin: string;
  destination: string;
  pickupDate: string;
  deliveryDate: string;
  rate: number;
  miles: number;
  equipment: string;
  weight: string;
  description: string;
  status: 'active' | 'expired' | 'booked';
  views: number;
  applications: number;
  datePosted: string;
}

const PostedLoadsPage: React.FC = () => {
  const [isNewLoadDialogOpen, setIsNewLoadDialogOpen] = useState(false);

  const postedLoads: PostedLoad[] = [
    {
      id: 'PL001',
      title: 'Austin to Houston Dry Van Load',
      origin: 'Austin, TX',
      destination: 'Houston, TX',
      pickupDate: '2024-01-18',
      deliveryDate: '2024-01-19',
      rate: 1200,
      miles: 165,
      equipment: 'Dry Van',
      weight: '40,000 lbs',
      description: 'Electronics cargo, requires careful handling',
      status: 'active',
      views: 23,
      applications: 5,
      datePosted: '2024-01-15'
    },
    {
      id: 'PL002',
      title: 'Dallas to San Antonio Refrigerated',
      origin: 'Dallas, TX',
      destination: 'San Antonio, TX',
      pickupDate: '2024-01-20',
      deliveryDate: '2024-01-21',
      rate: 1800,
      miles: 275,
      equipment: 'Refrigerated',
      weight: '45,000 lbs',
      description: 'Temperature controlled food products',
      status: 'active',
      views: 18,
      applications: 3,
      datePosted: '2024-01-14'
    },
    {
      id: 'PL003',
      title: 'El Paso to Denver Flatbed',
      origin: 'El Paso, TX',
      destination: 'Denver, CO',
      pickupDate: '2024-01-16',
      deliveryDate: '2024-01-18',
      rate: 2400,
      miles: 420,
      equipment: 'Flatbed',
      weight: '48,000 lbs',
      description: 'Construction materials, tarps required',
      status: 'booked',
      views: 31,
      applications: 8,
      datePosted: '2024-01-12'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'booked':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditLoad = (loadId: string) => {
    console.log('Editing load:', loadId);
  };

  const handleDeleteLoad = (loadId: string) => {
    console.log('Deleting load:', loadId);
  };

  const handleViewApplications = (loadId: string) => {
    console.log('Viewing applications for load:', loadId);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posted Loads</h1>
          <p className="text-muted-foreground">Manage your load postings and applications</p>
        </div>
        <Dialog open={isNewLoadDialogOpen} onOpenChange={setIsNewLoadDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Post New Load
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Post New Load</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Load Title</Label>
                <Input id="title" placeholder="Enter load title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipment">Equipment Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dry-van">Dry Van</SelectItem>
                    <SelectItem value="refrigerated">Refrigerated</SelectItem>
                    <SelectItem value="flatbed">Flatbed</SelectItem>
                    <SelectItem value="step-deck">Step Deck</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input id="origin" placeholder="Pickup location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <Input id="destination" placeholder="Delivery location" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickup-date">Pickup Date</Label>
                <Input id="pickup-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="delivery-date">Delivery Date</Label>
                <Input id="delivery-date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Rate ($)</Label>
                <Input id="rate" type="number" placeholder="Enter rate" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <Input id="weight" placeholder="e.g., 45,000 lbs" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Load details, special requirements..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsNewLoadDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsNewLoadDialogOpen(false)}>
                Post Load
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Loads</CardTitle>
            <Badge variant="default">2</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Currently posted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72</div>
            <p className="text-xs text-muted-foreground">Across all loads</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Applications</CardTitle>
            <Badge variant="secondary">16</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16</div>
            <p className="text-xs text-muted-foreground">Pending review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground">Loads successfully booked</p>
          </CardContent>
        </Card>
      </div>

      {/* Posted Loads Table */}
      <Card>
        <CardHeader>
          <CardTitle>Your Posted Loads</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Load Details</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Dates</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Engagement</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {postedLoads.map((load) => (
                <TableRow key={load.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{load.title}</div>
                      <div className="flex items-center gap-2">
                        <Truck className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{load.equipment}</span>
                        <span className="text-xs text-muted-foreground">• {load.weight}</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Posted: {load.datePosted}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <div>{load.origin}</div>
                        <div className="text-muted-foreground">→ {load.destination}</div>
                        <div className="text-xs text-muted-foreground">{load.miles} miles</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <div className="text-sm">
                        <div>Pickup: {load.pickupDate}</div>
                        <div className="text-muted-foreground">Delivery: {load.deliveryDate}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-green-500" />
                      <span className="font-bold">${load.rate.toLocaleString()}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ${(load.rate / load.miles).toFixed(2)}/mile
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(load.status)}>
                      {load.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{load.views} views</span>
                      </div>
                      <div className="text-sm">
                        <Badge variant="outline" className="text-xs">
                          {load.applications} applications
                        </Badge>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewApplications(load.id)}
                      >
                        View Apps
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleEditLoad(load.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleDeleteLoad(load.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
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
  );
};

export default PostedLoadsPage;