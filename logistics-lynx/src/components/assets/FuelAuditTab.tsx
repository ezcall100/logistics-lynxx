/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Fuel, TrendingUp, TrendingDown, DollarSign, BarChart3, Plus, MapPin, CreditCard } from 'lucide-react';
import { useAssetManagement } from '@/hooks/useAssetManagement';

interface FuelAuditTabProps {
  searchTerm: string;
}

export const FuelAuditTab = ({ searchTerm }: FuelAuditTabProps) => {
  const { fuelAudit, loading, handleCreateFuelTransaction } = useAssetManagement();
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const filteredTransactions = fuelAudit.transactions.filter(transaction =>
    transaction.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.driver.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTransactionTypeColor = (type: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (type) {
      case 'fuel_purchase': return 'outline';
      case 'fuel_card': return 'default';
      case 'cash': return 'secondary';
      case 'company_account': return 'secondary';
      default: return 'outline';
    }
  };

  const handleSubmitCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const transactionData = {
      vehicleId: formData.get('vehicleId') as string,
      driver: formData.get('driver') as string,
      location: formData.get('location') as string,
      gallons: Number(formData.get('gallons')),
      pricePerGallon: Number(formData.get('pricePerGallon')),
      totalAmount: Number(formData.get('gallons')) * Number(formData.get('pricePerGallon')),
      type: formData.get('type') as string,
      odometer: Number(formData.get('odometer')),
    };
    handleCreateFuelTransaction(transactionData);
    setIsCreateOpen(false);
  };

  const totalSpent = fuelAudit.transactions.reduce((sum, t) => sum + t.totalAmount, 0);
  const totalGallons = fuelAudit.transactions.reduce((sum, t) => sum + t.gallons, 0);
  const avgPrice = totalGallons > 0 ? totalSpent / totalGallons : 0;
  const recentTransactions = fuelAudit.transactions.length;

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
              {[...Array(6)].map((_, i) => (
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
      {/* Fuel Efficiency Alerts */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-700">
            <TrendingDown className="h-5 w-5" />
            Fuel Efficiency Alert
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-yellow-600 mb-3">
            Fleet MPG has decreased by 8% this month. Consider driver training or vehicle maintenance.
          </p>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-muted-foreground">Current MPG: </span>
              <span className="font-medium">6.2</span>
            </div>
            <div className="text-sm">
              <span className="text-muted-foreground">Target MPG: </span>
              <span className="font-medium">6.8</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fuel Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Recent Fuel Transactions</CardTitle>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Transaction
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add Fuel Transaction</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitCreate} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="vehicleId">Vehicle ID</Label>
                      <Input id="vehicleId" name="vehicleId" placeholder="TRK-001" defaultValue="TRK-001" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="driver">Driver</Label>
                      <Input id="driver" name="driver" placeholder="Driver Name" defaultValue="Mark Thompson" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" name="location" placeholder="Gas Station" defaultValue="Flying J - I-40 Exit 123" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gallons">Gallons</Label>
                      <Input id="gallons" name="gallons" type="number" step="0.1" placeholder="125.5" defaultValue="118.7" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pricePerGallon">Price per Gallon</Label>
                      <Input id="pricePerGallon" name="pricePerGallon" type="number" step="0.01" placeholder="3.89" defaultValue="3.94" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Payment Type</Label>
                      <Select name="type" defaultValue="fuel_card" required>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fuel_card">Fuel Card</SelectItem>
                          <SelectItem value="fuel_purchase">Fuel Purchase</SelectItem>
                          <SelectItem value="cash">Cash</SelectItem>
                          <SelectItem value="company_account">Company Account</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="odometer">Odometer</Label>
                      <Input id="odometer" name="odometer" type="number" placeholder="145672" defaultValue="156789" required />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Transaction</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Gallons</TableHead>
                <TableHead>Price/Gal</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">{transaction.date}</TableCell>
                  <TableCell>{transaction.vehicleId}</TableCell>
                  <TableCell>{transaction.driver}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      <span className="text-sm">{transaction.location}</span>
                    </div>
                  </TableCell>
                  <TableCell>{transaction.gallons.toFixed(1)}</TableCell>
                  <TableCell>${transaction.pricePerGallon.toFixed(2)}</TableCell>
                  <TableCell className="font-medium">${transaction.totalAmount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={getTransactionTypeColor(transaction.type)}>
                      {transaction.type.replace('_', ' ')}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Fuel Analysis */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Fuel Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Flying J Truck Stops</span>
                <div className="text-right">
                  <div className="font-medium">$2,847</div>
                  <div className="text-xs text-muted-foreground">42% of total</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Pilot Travel Centers</span>
                <div className="text-right">
                  <div className="font-medium">$1,923</div>
                  <div className="text-xs text-muted-foreground">28% of total</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Shell Gas Stations</span>
                <div className="text-right">
                  <div className="font-medium">$1,246</div>
                  <div className="text-xs text-muted-foreground">18% of total</div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">BP Truck Stops</span>
                <div className="text-right">
                  <div className="font-medium">$834</div>
                  <div className="text-xs text-muted-foreground">12% of total</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Monthly Fuel Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Fuel Cost</span>
                <span className="font-medium">${totalSpent.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Fleet MPG</span>
                <span className="font-medium">6.2 MPG</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Cost per Mile</span>
                <span className="font-medium">$0.63</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total Miles</span>
                <span className="font-medium">11,247 mi</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">vs Last Month</span>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3 text-red-500" />
                    <span className="font-medium text-red-600">+8.4%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};