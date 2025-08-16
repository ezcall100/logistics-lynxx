/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DatePicker } from "@/components/ui/date-picker";
import { Progress } from "@/components/ui/progress";
import { 
  Fuel, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  MapPin, 
  Calendar, 
  Plus,
  Search,
  Filter,
  Download,
  CreditCard,
  Receipt,
  BarChart3,
  PieChart,
  Navigation
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FuelRecord {
  id: string;
  date: string;
  location: string;
  station: string;
  gallons: number;
  pricePerGallon: number;
  totalCost: number;
  mileage: number;
  fuelType: string;
  paymentMethod: string;
  receiptNumber: string;
  route?: string;
}

interface FuelCard {
  id: string;
  cardNumber: string;
  provider: string;
  balance: number;
  monthlyLimit: number;
  status: "active" | "suspended" | "expired";
  expiryDate: string;
}

const FuelCostsPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPeriod, setFilterPeriod] = useState("all");
  const [isAddFuelOpen, setIsAddFuelOpen] = useState(false);
  const [isCardManagementOpen, setIsCardManagementOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Mock fuel records
  const fuelRecords: FuelRecord[] = [
    {
      id: "1",
      date: "2024-01-19",
      location: "Dallas, TX",
      station: "Pilot Flying J",
      gallons: 125.5,
      pricePerGallon: 3.45,
      totalCost: 432.98,
      mileage: 145782,
      fuelType: "Diesel",
      paymentMethod: "Company Card",
      receiptNumber: "RC123456789",
      route: "I-35 North"
    },
    {
      id: "2",
      date: "2024-01-17",
      location: "Oklahoma City, OK",
      station: "Love's Travel Stop",
      gallons: 118.2,
      pricePerGallon: 3.52,
      totalCost: 416.06,
      mileage: 145123,
      fuelType: "Diesel",
      paymentMethod: "Company Card",
      receiptNumber: "RC123456790",
      route: "I-40 West"
    },
    {
      id: "3",
      date: "2024-01-15",
      location: "Little Rock, AR",
      station: "TA Travel Center",
      gallons: 130.8,
      pricePerGallon: 3.38,
      totalCost: 442.10,
      mileage: 144456,
      fuelType: "Diesel",
      paymentMethod: "Company Card",
      receiptNumber: "RC123456791",
      route: "I-40 East"
    },
    {
      id: "4",
      date: "2024-01-12",
      location: "Memphis, TN",
      station: "Petro Stopping Center",
      gallons: 122.4,
      pricePerGallon: 3.41,
      totalCost: 417.38,
      mileage: 143789,
      fuelType: "Diesel",
      paymentMethod: "Company Card",
      receiptNumber: "RC123456792",
      route: "I-40 East"
    }
  ];

  const fuelCards: FuelCard[] = [
    {
      id: "1",
      cardNumber: "**** **** **** 1234",
      provider: "Fleet One",
      balance: 2500.00,
      monthlyLimit: 3000.00,
      status: "active",
      expiryDate: "12/2025"
    },
    {
      id: "2",
      cardNumber: "**** **** **** 5678",
      provider: "Comdata",
      balance: 1800.00,
      monthlyLimit: 2500.00,
      status: "active",
      expiryDate: "08/2026"
    }
  ];

  // Filter records based on search and period
  const filteredRecords = fuelRecords.filter(record => {
    const matchesSearch = record.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.station.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.route?.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterPeriod === "all") return matchesSearch;
    
    const recordDate = new Date(record.date);
    const now = new Date();
    const daysDiff = Math.floor((now.getTime() - recordDate.getTime()) / (1000 * 60 * 60 * 24));
    
    switch (filterPeriod) {
      case "week": return matchesSearch && daysDiff <= 7;
      case "month": return matchesSearch && daysDiff <= 30;
      case "quarter": return matchesSearch && daysDiff <= 90;
      default: return matchesSearch;
    }
  });

  const getCardStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      suspended: "bg-yellow-100 text-yellow-800",
      expired: "bg-red-100 text-red-800"
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const handleAddFuel = () => {
    toast({
      title: "Fuel Record Added",
      description: "New fuel transaction has been recorded successfully.",
    });
    setIsAddFuelOpen(false);
  };

  const handleCardAction = (action: string) => {
    toast({
      title: `Card ${action}`,
      description: `Fuel card has been ${action.toLowerCase()} successfully.`,
    });
  };

  // Calculate statistics
  const totalCost = fuelRecords.reduce((sum, record) => sum + record.totalCost, 0);
  const totalGallons = fuelRecords.reduce((sum, record) => sum + record.gallons, 0);
  const averagePrice = totalCost / totalGallons;
  const averageMPG = 6.8; // Mock calculation
  const monthlyBudget = 4500;
  const monthlySpent = fuelRecords
    .filter(record => new Date(record.date).getMonth() === new Date().getMonth())
    .reduce((sum, record) => sum + record.totalCost, 0);

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Fuel & Costs</h1>
          <p className="text-muted-foreground">Track fuel consumption, costs, and efficiency</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={isAddFuelOpen} onOpenChange={setIsAddFuelOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Fuel Record
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Fuel Transaction</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fuel-date">Date</Label>
                    <DatePicker 
                      date={selectedDate} 
                      onDateChange={setSelectedDate}
                      placeholder="Select date"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fuel-location">Location</Label>
                    <Input id="fuel-location" placeholder="Dallas, TX" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="fuel-station">Station</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select station" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pilot">Pilot Flying J</SelectItem>
                      <SelectItem value="loves">Love's Travel Stop</SelectItem>
                      <SelectItem value="ta">TA Travel Center</SelectItem>
                      <SelectItem value="petro">Petro Stopping Center</SelectItem>
                      <SelectItem value="speedway">Speedway</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="fuel-gallons">Gallons</Label>
                    <Input id="fuel-gallons" type="number" placeholder="125.5" />
                  </div>
                  <div>
                    <Label htmlFor="fuel-price">Price/Gal</Label>
                    <Input id="fuel-price" type="number" placeholder="3.45" />
                  </div>
                  <div>
                    <Label htmlFor="fuel-total">Total Cost</Label>
                    <Input id="fuel-total" type="number" placeholder="432.98" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="fuel-mileage">Current Mileage</Label>
                    <Input id="fuel-mileage" type="number" placeholder="145782" />
                  </div>
                  <div>
                    <Label htmlFor="fuel-payment">Payment Method</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company-card">Company Card</SelectItem>
                        <SelectItem value="fleet-card">Fleet Card</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="personal">Personal (Reimburse)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="fuel-receipt">Receipt Number</Label>
                  <Input id="fuel-receipt" placeholder="RC123456789" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddFuel} className="flex-1">
                    Add Record
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddFuelOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isCardManagementOpen} onOpenChange={setIsCardManagementOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <CreditCard className="h-4 w-4 mr-2" />
                Manage Cards
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Fuel Card Management</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {fuelCards.map((card) => (
                  <div key={card.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{card.provider}</h4>
                        <p className="text-sm text-muted-foreground">{card.cardNumber}</p>
                      </div>
                      <Badge className={getCardStatusBadge(card.status)}>
                        {card.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Balance</span>
                        <span className="font-medium">${card.balance.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Monthly Limit</span>
                        <span className="font-medium">${card.monthlyLimit.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Expires</span>
                        <span className="font-medium">{card.expiryDate}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="outline" onClick={() => handleCardAction("Suspended")}>
                        Suspend
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleCardAction("Activated")}>
                        Activate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Spent (YTD)</p>
                <p className="text-xl font-semibold">${totalCost.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Fuel className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Gallons</p>
                <p className="text-xl font-semibold">{totalGallons.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg Price/Gal</p>
                <p className="text-xl font-semibold">${averagePrice.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart3 className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Avg MPG</p>
                <p className="text-xl font-semibold">{averageMPG}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Budget Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Monthly Budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span>Spent this month</span>
              <span className="font-semibold">${monthlySpent.toFixed(2)} / ${monthlyBudget.toFixed(2)}</span>
            </div>
            <Progress value={(monthlySpent / monthlyBudget) * 100} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{((monthlySpent / monthlyBudget) * 100).toFixed(1)}% used</span>
              <span>${(monthlyBudget - monthlySpent).toFixed(2)} remaining</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="transactions" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="fuel-cards">Fuel Cards</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by location, station, or route..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Select value={filterPeriod} onValueChange={setFilterPeriod}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="week">This Week</SelectItem>
                      <SelectItem value="month">This Month</SelectItem>
                      <SelectItem value="quarter">This Quarter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Receipt className="h-5 w-5" />
                Fuel Transactions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Station</TableHead>
                    <TableHead>Gallons</TableHead>
                    <TableHead>Price/Gal</TableHead>
                    <TableHead>Total Cost</TableHead>
                    <TableHead>Mileage</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>{record.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {record.location}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{record.station}</TableCell>
                      <TableCell>{record.gallons.toFixed(1)}</TableCell>
                      <TableCell>${record.pricePerGallon.toFixed(2)}</TableCell>
                      <TableCell className="font-semibold">${record.totalCost.toFixed(2)}</TableCell>
                      <TableCell>{record.mileage.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{record.paymentMethod}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">View</Button>
                          <Button size="sm" variant="outline">Edit</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Fuel Efficiency Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-3xl font-bold">6.8 MPG</p>
                    <p className="text-sm text-muted-foreground">Current Average</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">This Week</span>
                      <span className="text-sm font-medium">7.1 MPG</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Last Week</span>
                      <span className="text-sm font-medium">6.8 MPG</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Monthly Average</span>
                      <span className="text-sm font-medium">6.9 MPG</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Best Week</span>
                      <span className="text-sm font-medium text-green-600">7.4 MPG</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Cost Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Cost per Mile</span>
                      <span className="font-medium">$0.52</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Weekly Average</span>
                      <span className="font-medium">$1,247.35</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Projection</span>
                      <span className="font-medium">$5,389.48</span>
                    </div>
                    <div className="flex justify-between">
                      <span>vs. Last Month</span>
                      <span className="font-medium text-red-600 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        +5.2%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Top Fuel Stations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Pilot Flying J</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{width: "45%"}}></div>
                      </div>
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Love's Travel Stop</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{width: "25%"}}></div>
                      </div>
                      <span className="text-sm">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>TA Travel Center</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{width: "20%"}}></div>
                      </div>
                      <span className="text-sm">20%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Other</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{width: "10%"}}></div>
                      </div>
                      <span className="text-sm">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Navigation className="h-5 w-5" />
                  Route Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">I-35 Corridor</span>
                    <span className="text-sm font-medium">7.2 MPG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">I-40 East</span>
                    <span className="text-sm font-medium">6.8 MPG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">I-40 West</span>
                    <span className="text-sm font-medium">6.9 MPG</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Urban Routes</span>
                    <span className="text-sm font-medium">5.8 MPG</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="fuel-cards" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fuelCards.map((card) => (
              <Card key={card.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      {card.provider}
                    </div>
                    <Badge className={getCardStatusBadge(card.status)}>
                      {card.status}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-lg font-mono">{card.cardNumber}</p>
                    <p className="text-sm text-muted-foreground">Expires: {card.expiryDate}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Available Balance</span>
                      <span className="font-semibold">${card.balance.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Limit</span>
                      <span className="font-semibold">${card.monthlyLimit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Usage This Month</span>
                      <span className="font-semibold">${(card.monthlyLimit - card.balance).toFixed(2)}</span>
                    </div>
                  </div>
                  <Progress 
                    value={((card.monthlyLimit - card.balance) / card.monthlyLimit) * 100} 
                    className="h-2" 
                  />
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      View Transactions
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Request PIN
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <Calendar className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Monthly Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Detailed monthly fuel consumption and cost analysis
                </p>
                <Button size="sm" className="w-full">Generate Report</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Efficiency Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  MPG trends and efficiency recommendations
                </p>
                <Button size="sm" className="w-full">Generate Report</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Tax Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fuel expense summary for tax purposes
                </p>
                <Button size="sm" className="w-full">Generate Report</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <MapPin className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Route Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fuel costs and efficiency by route
                </p>
                <Button size="sm" className="w-full">Generate Report</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <CreditCard className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Card Usage Report</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Fuel card transaction history and usage
                </p>
                <Button size="sm" className="w-full">Generate Report</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h3 className="font-semibold mb-2">Trend Analysis</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Historical trends and future projections
                </p>
                <Button size="sm" className="w-full">Generate Report</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FuelCostsPage;