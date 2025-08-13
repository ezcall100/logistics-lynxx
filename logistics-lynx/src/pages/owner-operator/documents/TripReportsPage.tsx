import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Plus, Edit, Download, Search, Filter, MapPin, Clock, Fuel, DollarSign, Truck, AlertTriangle } from 'lucide-react';
import { toast } from "sonner";

interface TripReport {
  id: string;
  tripNumber: string;
  date: string;
  driver: string;
  vehicle: string;
  origin: string;
  destination: string;
  loadNumber: string;
  customer: string;
  departureTime: string;
  arrivalTime: string;
  totalMiles: number;
  fuelUsed: number;
  fuelCost: number;
  tolls: number;
  otherExpenses: number;
  revenue: number;
  status: 'completed' | 'in-progress' | 'delayed' | 'cancelled';
  notes?: string;
  incidents?: string[];
  weatherConditions?: string;
  loadWeight: number;
  equipmentType: string;
}

const mockTripReports: TripReport[] = [
  {
    id: 'trip-001',
    tripNumber: 'TR-2024-001',
    date: '2024-07-19',
    driver: 'John Mitchell',
    vehicle: 'TRK-001',
    origin: 'Chicago, IL',
    destination: 'Atlanta, GA',
    loadNumber: 'LD-456789',
    customer: 'MegaCorp Industries',
    departureTime: '06:00',
    arrivalTime: '22:30',
    totalMiles: 583,
    fuelUsed: 97.2,
    fuelCost: 438.40,
    tolls: 45.75,
    otherExpenses: 25.00,
    revenue: 2150.00,
    status: 'completed',
    notes: 'Smooth delivery, customer satisfied with early arrival',
    loadWeight: 45000,
    equipmentType: 'Dry Van',
    weatherConditions: 'Clear, no issues'
  },
  {
    id: 'trip-002',
    tripNumber: 'TR-2024-002',
    date: '2024-07-18',
    driver: 'John Mitchell',
    vehicle: 'TRK-001',
    origin: 'Atlanta, GA',
    destination: 'Miami, FL',
    loadNumber: 'LD-456788',
    customer: 'Sunshine Logistics',
    departureTime: '07:30',
    arrivalTime: '19:15',
    totalMiles: 462,
    fuelUsed: 71.5,
    fuelCost: 322.75,
    tolls: 28.50,
    otherExpenses: 15.00,
    revenue: 1850.00,
    status: 'completed',
    notes: 'Minor traffic delays in Jacksonville',
    loadWeight: 38500,
    equipmentType: 'Dry Van',
    weatherConditions: 'Partly cloudy, light rain'
  },
  {
    id: 'trip-003',
    tripNumber: 'TR-2024-003',
    date: '2024-07-17',
    driver: 'John Mitchell',
    vehicle: 'TRK-001',
    origin: 'Miami, FL',
    destination: 'Houston, TX',
    loadNumber: 'LD-456787',
    customer: 'Texas Transport Co',
    departureTime: '05:45',
    arrivalTime: '18:00',
    totalMiles: 673,
    fuelUsed: 108.7,
    fuelCost: 490.15,
    tolls: 32.25,
    otherExpenses: 40.00,
    revenue: 2450.00,
    status: 'delayed',
    notes: 'Delayed due to heavy traffic in New Orleans',
    incidents: ['Traffic delay - 2 hours in New Orleans'],
    loadWeight: 47800,
    equipmentType: 'Dry Van',
    weatherConditions: 'Thunderstorms, reduced visibility'
  },
  {
    id: 'trip-004',
    tripNumber: 'TR-2024-004',
    date: '2024-07-16',
    driver: 'John Mitchell',
    vehicle: 'TRK-001',
    origin: 'Houston, TX',
    destination: 'Denver, CO',
    loadNumber: 'LD-456786',
    customer: 'Mountain Peak Freight',
    departureTime: '06:15',
    arrivalTime: '20:30',
    totalMiles: 518,
    fuelUsed: 89.3,
    fuelCost: 402.85,
    tolls: 18.75,
    otherExpenses: 30.00,
    revenue: 2200.00,
    status: 'in-progress',
    notes: 'Currently en route, good weather conditions',
    loadWeight: 41200,
    equipmentType: 'Dry Van',
    weatherConditions: 'Clear skies'
  }
];

const TripReportsPage: React.FC = () => {
  const [reports, setReports] = useState<TripReport[]>(mockTripReports);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isAddingReport, setIsAddingReport] = useState(false);
  const [editingReport, setEditingReport] = useState<TripReport | null>(null);
  const [selectedReport, setSelectedReport] = useState<TripReport | null>(null);

  const [newReport, setNewReport] = useState({
    tripNumber: '',
    date: new Date().toISOString().split('T')[0],
    driver: 'John Mitchell',
    vehicle: 'TRK-001',
    origin: '',
    destination: '',
    loadNumber: '',
    customer: '',
    departureTime: '',
    arrivalTime: '',
    totalMiles: 0,
    fuelUsed: 0,
    fuelCost: 0,
    tolls: 0,
    otherExpenses: 0,
    revenue: 0,
    status: 'in-progress' as const,
    notes: '',
    loadWeight: 0,
    equipmentType: 'Dry Van',
    weatherConditions: ''
  });

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.tripNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-200">Completed</Badge>;
      case 'in-progress':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-200">In Progress</Badge>;
      case 'delayed':
        return <Badge variant="destructive">Delayed</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAddReport = () => {
    if (!newReport.tripNumber || !newReport.origin || !newReport.destination) {
      toast.error('Please fill in required fields');
      return;
    }

    const report: TripReport = {
      id: `trip-${Date.now()}`,
      ...newReport
    };

    setReports([report, ...reports]);
    setIsAddingReport(false);
    resetNewReport();
    toast.success('Trip report added successfully');
  };

  const resetNewReport = () => {
    setNewReport({
      tripNumber: '',
      date: new Date().toISOString().split('T')[0],
      driver: 'John Mitchell',
      vehicle: 'TRK-001',
      origin: '',
      destination: '',
      loadNumber: '',
      customer: '',
      departureTime: '',
      arrivalTime: '',
      totalMiles: 0,
      fuelUsed: 0,
      fuelCost: 0,
      tolls: 0,
      otherExpenses: 0,
      revenue: 0,
      status: 'in-progress',
      notes: '',
      loadWeight: 0,
      equipmentType: 'Dry Van',
      weatherConditions: ''
    });
  };

  const handleEditReport = (report: TripReport) => {
    setEditingReport(report);
  };

  const handleDownloadReport = (id: string) => {
    toast.success('Trip report downloaded successfully');
  };

  const handleUpdateStatus = (id: string, status: TripReport['status']) => {
    setReports(reports =>
      reports.map(report =>
        report.id === id ? { ...report, status } : report
      )
    );
    toast.success('Trip status updated successfully');
  };

  // Calculate summary statistics
  const totalRevenue = reports.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.revenue, 0);
  const totalMiles = reports.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.totalMiles, 0);
  const totalFuelCost = reports.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.fuelCost, 0);
  const avgMpg = totalMiles > 0 ? (totalMiles / reports.filter(r => r.status === 'completed').reduce((sum, r) => sum + r.fuelUsed, 0)).toFixed(1) : '0';

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Trip Reports</h1>
        <p className="text-muted-foreground">Comprehensive trip documentation and performance tracking</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Miles</p>
                <p className="text-2xl font-bold text-foreground">{totalMiles.toLocaleString()}</p>
              </div>
              <MapPin className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Fuel Costs</p>
                <p className="text-2xl font-bold text-foreground">${totalFuelCost.toLocaleString()}</p>
              </div>
              <Fuel className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg MPG</p>
                <p className="text-2xl font-bold text-foreground">{avgMpg}</p>
              </div>
              <Truck className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by trip number, customer, or route..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="delayed">Delayed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsAddingReport(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Trip Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trip Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>Trip Reports</CardTitle>
          <CardDescription>Detailed trip records and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Trip #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Miles</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Fuel Cost</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.tripNumber}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm">
                        <span>{report.origin}</span>
                        <span>→</span>
                        <span>{report.destination}</span>
                      </div>
                    </TableCell>
                    <TableCell>{report.customer}</TableCell>
                    <TableCell>{report.totalMiles}</TableCell>
                    <TableCell className="text-green-600 font-semibold">${report.revenue}</TableCell>
                    <TableCell>${report.fuelCost}</TableCell>
                    <TableCell>{getStatusBadge(report.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedReport(report)}
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditReport(report)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadReport(report.id)}
                        >
                          <Download className="h-4 w-4" />
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

      {/* Add Trip Report Dialog */}
      <Dialog open={isAddingReport} onOpenChange={setIsAddingReport}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Trip Report</DialogTitle>
            <DialogDescription>
              Create a comprehensive trip report with all relevant details
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="tripNumber">Trip Number *</Label>
              <Input
                id="tripNumber"
                value={newReport.tripNumber}
                onChange={(e) => setNewReport({ ...newReport, tripNumber: e.target.value })}
                placeholder="TR-2024-XXX"
              />
            </div>
            <div>
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={newReport.date}
                onChange={(e) => setNewReport({ ...newReport, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="origin">Origin *</Label>
              <Input
                id="origin"
                value={newReport.origin}
                onChange={(e) => setNewReport({ ...newReport, origin: e.target.value })}
                placeholder="Chicago, IL"
              />
            </div>
            <div>
              <Label htmlFor="destination">Destination *</Label>
              <Input
                id="destination"
                value={newReport.destination}
                onChange={(e) => setNewReport({ ...newReport, destination: e.target.value })}
                placeholder="Atlanta, GA"
              />
            </div>
            <div>
              <Label htmlFor="customer">Customer</Label>
              <Input
                id="customer"
                value={newReport.customer}
                onChange={(e) => setNewReport({ ...newReport, customer: e.target.value })}
                placeholder="Customer name"
              />
            </div>
            <div>
              <Label htmlFor="loadNumber">Load Number</Label>
              <Input
                id="loadNumber"
                value={newReport.loadNumber}
                onChange={(e) => setNewReport({ ...newReport, loadNumber: e.target.value })}
                placeholder="LD-123456"
              />
            </div>
            <div>
              <Label htmlFor="totalMiles">Total Miles</Label>
              <Input
                id="totalMiles"
                type="number"
                value={newReport.totalMiles}
                onChange={(e) => setNewReport({ ...newReport, totalMiles: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="revenue">Revenue</Label>
              <Input
                id="revenue"
                type="number"
                step="0.01"
                value={newReport.revenue}
                onChange={(e) => setNewReport({ ...newReport, revenue: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="fuelUsed">Fuel Used (gallons)</Label>
              <Input
                id="fuelUsed"
                type="number"
                step="0.1"
                value={newReport.fuelUsed}
                onChange={(e) => setNewReport({ ...newReport, fuelUsed: Number(e.target.value) })}
              />
            </div>
            <div>
              <Label htmlFor="fuelCost">Fuel Cost</Label>
              <Input
                id="fuelCost"
                type="number"
                step="0.01"
                value={newReport.fuelCost}
                onChange={(e) => setNewReport({ ...newReport, fuelCost: Number(e.target.value) })}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newReport.notes}
                onChange={(e) => setNewReport({ ...newReport, notes: e.target.value })}
                placeholder="Additional trip notes..."
                rows={3}
              />
            </div>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="outline" onClick={() => setIsAddingReport(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddReport}>
              Add Trip Report
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Trip Report Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedReport && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Trip Report: {selectedReport.tripNumber}
                </DialogTitle>
                <DialogDescription>
                  Complete trip details and performance metrics
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Date</div>
                      <div className="font-semibold">{selectedReport.date}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Driver</div>
                      <div className="font-semibold">{selectedReport.driver}</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-4">
                      <div className="text-sm text-muted-foreground">Vehicle</div>
                      <div className="font-semibold">{selectedReport.vehicle}</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Route Info */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Route Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Origin</div>
                        <div className="font-semibold">{selectedReport.origin}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Destination</div>
                        <div className="font-semibold">{selectedReport.destination}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Departure Time</div>
                        <div className="font-semibold">{selectedReport.departureTime}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Arrival Time</div>
                        <div className="font-semibold">{selectedReport.arrivalTime}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Financial Details */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Financial Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Revenue</div>
                        <div className="font-semibold text-green-600">${selectedReport.revenue}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Fuel Cost</div>
                        <div className="font-semibold">${selectedReport.fuelCost}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Tolls</div>
                        <div className="font-semibold">${selectedReport.tolls}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Other Expenses</div>
                        <div className="font-semibold">${selectedReport.otherExpenses}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Performance Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <div className="text-sm text-muted-foreground">Total Miles</div>
                        <div className="font-semibold">{selectedReport.totalMiles}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Fuel Used</div>
                        <div className="font-semibold">{selectedReport.fuelUsed} gal</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">MPG</div>
                        <div className="font-semibold">{(selectedReport.totalMiles / selectedReport.fuelUsed).toFixed(1)}</div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Load Weight</div>
                        <div className="font-semibold">{selectedReport.loadWeight.toLocaleString()} lbs</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Notes and Incidents */}
                {(selectedReport.notes || selectedReport.incidents) && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Additional Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {selectedReport.notes && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-2">Notes</div>
                          <div className="p-3 bg-muted rounded-lg">{selectedReport.notes}</div>
                        </div>
                      )}
                      {selectedReport.incidents && selectedReport.incidents.length > 0 && (
                        <div>
                          <div className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-600" />
                            Incidents
                          </div>
                          <div className="space-y-2">
                            {selectedReport.incidents.map((incident, index) => (
                              <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                {incident}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TripReportsPage;