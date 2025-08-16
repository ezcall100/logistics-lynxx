/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import CarrierLayout from '@/components/carrier/CarrierLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Fuel, Wrench, Users, Truck, TrendingDown, DollarSign, BarChart3, Download, Edit, Eye, Calculator } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const CogsPage = () => {
  const [activeTab, setActiveTab] = useState('fuel');
  const [isNewExpenseDialogOpen, setIsNewExpenseDialogOpen] = useState(false);

  // Mock data for fuel costs
  const fuelCosts = [
    {
      id: 'FUEL-001',
      date: '2024-01-25',
      location: 'Shell Station - I-95 Exit 42',
      vehicle: 'Truck #1001',
      gallons: 150.5,
      pricePerGallon: 3.45,
      totalCost: 519.23,
      driver: 'John Smith'
    },
    {
      id: 'FUEL-002',
      date: '2024-01-24',
      location: 'Flying J - I-10 Mile 125',
      vehicle: 'Truck #1002',
      gallons: 180.2,
      pricePerGallon: 3.52,
      totalCost: 634.30,
      driver: 'Mike Johnson'
    },
    {
      id: 'FUEL-003',
      date: '2024-01-23',
      location: 'Pilot - Route 40 West',
      vehicle: 'Truck #1003',
      gallons: 165.8,
      pricePerGallon: 3.48,
      totalCost: 577.18,
      driver: 'Sarah Davis'
    }
  ];

  // Mock data for maintenance costs
  const maintenanceCosts = [
    {
      id: 'MAINT-001',
      date: '2024-01-20',
      vehicle: 'Truck #1001',
      type: 'Preventive Maintenance',
      description: 'Oil change, filter replacement, inspection',
      cost: 450.00,
      vendor: 'Pro Truck Services',
      nextDue: '2024-04-20'
    },
    {
      id: 'MAINT-002',
      date: '2024-01-18',
      vehicle: 'Truck #1002',
      type: 'Repair',
      description: 'Brake pad replacement',
      cost: 850.25,
      vendor: 'Highway Maintenance Co',
      nextDue: null
    },
    {
      id: 'MAINT-003',
      date: '2024-01-15',
      vehicle: 'Trailer #2001',
      type: 'Inspection',
      description: 'Annual DOT inspection',
      cost: 125.00,
      vendor: 'Certified Inspection LLC',
      nextDue: '2025-01-15'
    }
  ];

  // Mock data for driver compensation
  const driverCompensation = [
    {
      id: 'COMP-001',
      driver: 'John Smith',
      period: 'Week of Jan 15-21, 2024',
      miles: 2850,
      ratePerMile: 0.65,
      mileageEarnings: 1852.50,
      bonuses: 150.00,
      deductions: 85.50,
      totalPay: 1917.00
    },
    {
      id: 'COMP-002',
      driver: 'Mike Johnson',
      period: 'Week of Jan 15-21, 2024',
      miles: 3120,
      ratePerMile: 0.68,
      mileageEarnings: 2121.60,
      bonuses: 200.00,
      deductions: 95.25,
      totalPay: 2226.35
    },
    {
      id: 'COMP-003',
      driver: 'Sarah Davis',
      period: 'Week of Jan 15-21, 2024',
      miles: 2650,
      ratePerMile: 0.66,
      mileageEarnings: 1749.00,
      bonuses: 100.00,
      deductions: 78.00,
      totalPay: 1771.00
    }
  ];

  // Mock data for equipment costs
  const equipmentCosts = [
    {
      id: 'EQUIP-001',
      item: 'Truck #1004',
      type: 'Vehicle Purchase',
      purchaseDate: '2024-01-10',
      cost: 185000.00,
      depreciation: 3083.33,
      currentValue: 181916.67,
      vendor: 'Freightliner Dealership'
    },
    {
      id: 'EQUIP-002',
      item: 'Trailer #2005',
      type: 'Trailer Purchase',
      purchaseDate: '2023-12-15',
      cost: 45000.00,
      depreciation: 1125.00,
      currentValue: 43875.00,
      vendor: 'Great Dane Trailers'
    },
    {
      id: 'EQUIP-003',
      item: 'GPS Fleet System',
      type: 'Technology',
      purchaseDate: '2024-01-05',
      cost: 8500.00,
      depreciation: 354.17,
      currentValue: 8145.83,
      vendor: 'FleetTech Solutions'
    }
  ];

  const handleNewExpense = () => {
    toast({
      title: "Expense Added",
      description: "New COGS expense has been successfully recorded.",
    });
    setIsNewExpenseDialogOpen(false);
  };

  const handleCalculateDepreciation = () => {
    toast({
      title: "Depreciation Calculated",
      description: "Asset depreciation has been recalculated for the current period.",
    });
  };

  return (
    <CarrierLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Cost of Goods Sold (COGS)</h1>
            <p className="text-muted-foreground">Track and manage all direct costs associated with transportation services</p>
          </div>
          <Dialog open={isNewExpenseDialogOpen} onOpenChange={setIsNewExpenseDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="h-4 w-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add COGS Expense</DialogTitle>
                <DialogDescription>
                  Record a new cost of goods sold expense.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Expense Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fuel">Fuel Costs</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="driver">Driver Compensation</SelectItem>
                        <SelectItem value="equipment">Equipment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="amount">Amount</Label>
                    <Input id="amount" placeholder="0.00" type="number" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="vehicle">Vehicle/Asset</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select vehicle" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="truck1001">Truck #1001</SelectItem>
                        <SelectItem value="truck1002">Truck #1002</SelectItem>
                        <SelectItem value="truck1003">Truck #1003</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Expense description" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsNewExpenseDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleNewExpense}>Add Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Fuel Costs</CardTitle>
              <Fuel className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">$45,200</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Maintenance</CardTitle>
              <Wrench className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">$18,500</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Driver Pay</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">$89,200</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Equipment</CardTitle>
              <Truck className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">$12,800</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-card border border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">Total COGS</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">$165,700</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="bg-card border border-border">
          <CardHeader>
            <CardTitle className="text-card-foreground">Cost of Goods Sold Management</CardTitle>
            <CardDescription>Track and manage all direct costs related to transportation services</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="fuel">Fuel Costs</TabsTrigger>
                <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
                <TabsTrigger value="driver">Driver Compensation</TabsTrigger>
                <TabsTrigger value="equipment">Equipment Costs</TabsTrigger>
                <TabsTrigger value="depreciation">Depreciation</TabsTrigger>
              </TabsList>

              <TabsContent value="fuel" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Fuel Cost Tracking</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Fuel Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fuel ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Gallons</TableHead>
                        <TableHead>Price/Gallon</TableHead>
                        <TableHead>Total Cost</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {fuelCosts.map((fuel) => (
                        <TableRow key={fuel.id}>
                          <TableCell className="font-medium">{fuel.id}</TableCell>
                          <TableCell>{fuel.date}</TableCell>
                          <TableCell>{fuel.location}</TableCell>
                          <TableCell>{fuel.vehicle}</TableCell>
                          <TableCell>{fuel.driver}</TableCell>
                          <TableCell className="font-mono">{fuel.gallons}</TableCell>
                          <TableCell className="font-mono">${fuel.pricePerGallon}</TableCell>
                          <TableCell className="font-mono text-red-600">
                            ${fuel.totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Maintenance Cost Tracking</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Maintenance Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Maintenance ID</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Vehicle</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead>Cost</TableHead>
                        <TableHead>Next Due</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {maintenanceCosts.map((maintenance) => (
                        <TableRow key={maintenance.id}>
                          <TableCell className="font-medium">{maintenance.id}</TableCell>
                          <TableCell>{maintenance.date}</TableCell>
                          <TableCell>{maintenance.vehicle}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{maintenance.type}</Badge>
                          </TableCell>
                          <TableCell>{maintenance.description}</TableCell>
                          <TableCell>{maintenance.vendor}</TableCell>
                          <TableCell className="font-mono text-red-600">
                            ${maintenance.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>{maintenance.nextDue || 'N/A'}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="driver" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Driver Compensation Tracking</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Payroll Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Comp ID</TableHead>
                        <TableHead>Driver</TableHead>
                        <TableHead>Period</TableHead>
                        <TableHead>Miles</TableHead>
                        <TableHead>Rate/Mile</TableHead>
                        <TableHead>Mileage Pay</TableHead>
                        <TableHead>Bonuses</TableHead>
                        <TableHead>Deductions</TableHead>
                        <TableHead>Total Pay</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {driverCompensation.map((comp) => (
                        <TableRow key={comp.id}>
                          <TableCell className="font-medium">{comp.id}</TableCell>
                          <TableCell>{comp.driver}</TableCell>
                          <TableCell>{comp.period}</TableCell>
                          <TableCell className="font-mono">{comp.miles.toLocaleString()}</TableCell>
                          <TableCell className="font-mono">${comp.ratePerMile}</TableCell>
                          <TableCell className="font-mono">
                            ${comp.mileageEarnings.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="font-mono text-green-600">
                            +${comp.bonuses.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="font-mono text-red-600">
                            -${comp.deductions.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="font-mono font-bold text-red-600">
                            ${comp.totalPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="equipment" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Equipment Cost Tracking</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Equipment Report
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="border border-border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Equipment ID</TableHead>
                        <TableHead>Item</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Purchase Date</TableHead>
                        <TableHead>Original Cost</TableHead>
                        <TableHead>Monthly Depreciation</TableHead>
                        <TableHead>Current Value</TableHead>
                        <TableHead>Vendor</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {equipmentCosts.map((equipment) => (
                        <TableRow key={equipment.id}>
                          <TableCell className="font-medium">{equipment.id}</TableCell>
                          <TableCell>{equipment.item}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{equipment.type}</Badge>
                          </TableCell>
                          <TableCell>{equipment.purchaseDate}</TableCell>
                          <TableCell className="font-mono">
                            ${equipment.cost.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="font-mono text-red-600">
                            ${equipment.depreciation.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell className="font-mono">
                            ${equipment.currentValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </TableCell>
                          <TableCell>{equipment.vendor}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              <TabsContent value="depreciation" className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Asset Depreciation</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCalculateDepreciation}>
                      <Calculator className="h-4 w-4 mr-2" />
                      Recalculate
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-card border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-card-foreground">Vehicle Depreciation</CardTitle>
                      <CardDescription>Monthly depreciation for all vehicles</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Trucks:</span>
                        <span className="font-mono text-red-600">$12,333</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Trailers:</span>
                        <span className="font-mono text-red-600">$2,250</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="text-sm font-medium">Total Vehicle:</span>
                        <span className="font-mono font-bold text-red-600">$14,583</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-card-foreground">Equipment Depreciation</CardTitle>
                      <CardDescription>Monthly depreciation for equipment</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Technology:</span>
                        <span className="font-mono text-red-600">$708</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Tools & Equipment:</span>
                        <span className="font-mono text-red-600">$425</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="text-sm font-medium">Total Equipment:</span>
                        <span className="font-mono font-bold text-red-600">$1,133</span>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border border-border">
                    <CardHeader>
                      <CardTitle className="text-lg text-card-foreground">Total Depreciation</CardTitle>
                      <CardDescription>Combined monthly depreciation</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">This Month:</span>
                        <span className="font-mono text-red-600">$15,716</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Year to Date:</span>
                        <span className="font-mono text-red-600">$47,148</span>
                      </div>
                      <div className="flex justify-between items-center border-t pt-2">
                        <span className="text-sm font-medium">Annual Projected:</span>
                        <span className="font-mono font-bold text-red-600">$188,592</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </CarrierLayout>
  );
};

export default CogsPage;