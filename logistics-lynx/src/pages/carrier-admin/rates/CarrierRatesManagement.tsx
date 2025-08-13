import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { TrendingUp, Building, Search, Plus, Filter, DollarSign, MapPin, Calendar, Users, BarChart3, Truck, RefreshCw as Sync, CheckCircle, Clock } from 'lucide-react';

const CarrierRatesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('all');
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(true);

  const sellRates = [
    { 
      id: 1, 
      origin: 'Los Angeles, CA', 
      destination: 'New York, NY', 
      rate: 2800, 
      equipment: 'Dry Van', 
      validUntil: '2024-03-15', 
      status: 'active',
      brokerIntegrated: true,
      brokerRate: 3220,
      margin: 15
    },
    { 
      id: 2, 
      origin: 'Chicago, IL', 
      destination: 'Miami, FL', 
      rate: 1850, 
      equipment: 'Reefer', 
      validUntil: '2024-03-20', 
      status: 'active',
      brokerIntegrated: true,
      brokerRate: 2127,
      margin: 15
    },
    { 
      id: 3, 
      origin: 'Dallas, TX', 
      destination: 'Seattle, WA', 
      rate: 2200, 
      equipment: 'Flatbed', 
      validUntil: '2024-03-25', 
      status: 'pending',
      brokerIntegrated: false,
      brokerRate: null,
      margin: null
    },
    { 
      id: 4, 
      origin: 'Atlanta, GA', 
      destination: 'Denver, CO', 
      rate: 1950, 
      equipment: 'Dry Van', 
      validUntil: '2024-04-01', 
      status: 'active',
      brokerIntegrated: true,
      brokerRate: 2242,
      margin: 15
    },
  ];

  const integrationSettings = {
    brokerPartners: 3,
    autoSyncEnabled: true,
    defaultMargin: 15,
    lastSync: '2 minutes ago',
    totalRatesSynced: 142,
    successRate: 98.5
  };

  const equipment = ['Dry Van', 'Reefer', 'Flatbed', 'Step Deck'];

  const filteredRates = sellRates.filter(rate => {
    const matchesSearch = rate.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rate.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesEquipment = selectedEquipment === 'all' || rate.equipment === selectedEquipment;
    return matchesSearch && matchesEquipment;
  });

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Truck className="h-8 w-8 text-blue-600" />
              Carrier Rates Management
            </h1>
            <p className="text-muted-foreground">Manage your carrier sell rates and broker integrations</p>
          </div>
          <div className="flex gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Sync className="h-4 w-4 mr-2" />
                  Integration Settings
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Broker Integration Settings</DialogTitle>
                  <DialogDescription>Configure automatic rate syncing with broker partners</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Auto-sync rates</label>
                    <Switch checked={autoSyncEnabled} onCheckedChange={setAutoSyncEnabled} />
                  </div>
                  <Input placeholder="Default Margin (%)" defaultValue="15" type="number" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Sync Frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="real-time">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly</SelectItem>
                      <SelectItem value="daily">Daily</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="w-full">Save Settings</Button>
                </div>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sell Rate
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Add New Sell Rate</DialogTitle>
                  <DialogDescription>Create a new rate to offer to broker partners</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input placeholder="Origin City, State" />
                  <Input placeholder="Destination City, State" />
                  <Input placeholder="Rate ($)" type="number" />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Equipment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {equipment.map(eq => (
                        <SelectItem key={eq} value={eq.toLowerCase().replace(' ', '-')}>{eq}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input placeholder="Valid Until" type="date" />
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Auto-sync to brokers</label>
                    <Switch defaultChecked />
                  </div>
                  <Button className="w-full">Create Sell Rate</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Integration Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Sell Rates</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <p className="text-xs text-muted-foreground">+8 from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Broker Partners</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{integrationSettings.brokerPartners}</div>
              <p className="text-xs text-muted-foreground">Integrated brokers</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sync Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{integrationSettings.successRate}%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue Generated</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$284,500</div>
              <p className="text-xs text-muted-foreground">This month</p>
            </CardContent>
          </Card>
        </div>

        {/* Integration Status Alert */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Sync className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">Broker Integration Active</p>
                <p className="text-sm text-green-700">
                  {integrationSettings.totalRatesSynced} rates synced with {integrationSettings.brokerPartners} broker partners. 
                  Last sync: {integrationSettings.lastSync}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filter Sell Rates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by origin or destination..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Equipment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Equipment</SelectItem>
                  {equipment.map(eq => (
                    <SelectItem key={eq} value={eq}>{eq}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sell Rates Table */}
        <Card>
          <CardHeader>
            <CardTitle>Carrier Sell Rates</CardTitle>
            <CardDescription>Your rates offered to broker partners with integration status</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Route</TableHead>
                  <TableHead>Carrier Rate</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Broker Integration</TableHead>
                  <TableHead>Broker Buy Rate</TableHead>
                  <TableHead>Margin</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRates.map((rate) => (
                  <TableRow key={rate.id}>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{rate.origin} → {rate.destination}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3" />
                        {rate.rate.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>{rate.equipment}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {rate.brokerIntegrated ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-green-600">Synced</span>
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm text-yellow-600">Pending</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {rate.brokerRate ? (
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-3 w-3 text-green-600" />
                          <span className="text-green-600 font-medium">{rate.brokerRate.toLocaleString()}</span>
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {rate.margin ? (
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {rate.margin}%
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        {rate.validUntil}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={rate.status === 'active' ? 'default' : 'secondary'}>
                        {rate.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        {!rate.brokerIntegrated && (
                          <Button size="sm" variant="outline">
                            <Sync className="h-3 w-3 mr-1" />
                            Sync
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Integration Analytics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Rate Integration Performance</CardTitle>
              <CardDescription>How your rates perform with broker partners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Rates Offered</span>
                  <span className="font-semibold">127</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Rates Accepted by Brokers</span>
                  <span className="font-semibold text-green-600">89</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Average Broker Margin</span>
                  <span className="font-semibold">15.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Revenue from Integrations</span>
                  <span className="font-semibold text-green-600">$284,500</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Broker Partner Status</CardTitle>
              <CardDescription>Integration status with broker partners</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <div>
                    <p className="font-medium text-sm">FreightPro Logistics</p>
                    <p className="text-xs text-muted-foreground">45 rates synced</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded">
                  <div>
                    <p className="font-medium text-sm">Global Freight Solutions</p>
                    <p className="text-xs text-muted-foreground">38 rates synced</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded">
                  <div>
                    <p className="font-medium text-sm">Metro Brokerage Inc.</p>
                    <p className="text-xs text-muted-foreground">Pending integration</p>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CarrierRatesManagement;