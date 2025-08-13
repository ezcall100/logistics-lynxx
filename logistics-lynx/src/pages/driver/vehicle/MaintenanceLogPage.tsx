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
import { 
  Wrench, 
  Calendar, 
  DollarSign, 
  Clock, 
  FileText, 
  Plus,
  Search,
  Filter,
  Download,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Settings
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MaintenanceRecord {
  id: string;
  date: string;
  type: string;
  category: string;
  description: string;
  mileage: number;
  cost: number;
  vendor: string;
  status: "completed" | "scheduled" | "overdue";
  nextDue?: string;
  partsCost: number;
  laborCost: number;
  technician: string;
}

interface MaintenanceSchedule {
  id: string;
  item: string;
  frequency: string;
  lastPerformed: string;
  nextDue: string;
  status: "upcoming" | "due" | "overdue";
  priority: "low" | "medium" | "high";
}

const MaintenanceLogPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);
  const [isScheduleItemOpen, setIsScheduleItemOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Mock maintenance records
  const maintenanceRecords: MaintenanceRecord[] = [
    {
      id: "1",
      date: "2024-01-15",
      type: "Oil Change",
      category: "Engine",
      description: "Full synthetic oil change and filter replacement",
      mileage: 145500,
      cost: 285.50,
      vendor: "Mike's Truck Service",
      status: "completed",
      nextDue: "2024-04-15",
      partsCost: 125.50,
      laborCost: 160.00,
      technician: "Mike Johnson"
    },
    {
      id: "2",
      date: "2024-01-10",
      type: "Brake Inspection",
      category: "Brakes",
      description: "Comprehensive brake system inspection and pad replacement",
      mileage: 145200,
      cost: 1250.75,
      vendor: "Interstate Truck Parts",
      status: "completed",
      nextDue: "2024-07-10",
      partsCost: 850.75,
      laborCost: 400.00,
      technician: "Sarah Davis"
    },
    {
      id: "3",
      date: "2024-01-25",
      type: "Tire Rotation",
      category: "Tires",
      description: "Scheduled tire rotation and pressure check",
      mileage: 146000,
      cost: 150.00,
      vendor: "Truck Stop Services",
      status: "scheduled",
      partsCost: 0,
      laborCost: 150.00,
      technician: "TBD"
    },
    {
      id: "4",
      date: "2024-01-20",
      type: "DOT Inspection",
      category: "Safety",
      description: "Annual DOT safety inspection",
      mileage: 145800,
      cost: 200.00,
      vendor: "Certified Inspection Center",
      status: "overdue",
      partsCost: 0,
      laborCost: 200.00,
      technician: "John Smith"
    }
  ];

  const maintenanceSchedule: MaintenanceSchedule[] = [
    {
      id: "1",
      item: "Oil Change",
      frequency: "Every 15,000 miles",
      lastPerformed: "2024-01-15",
      nextDue: "2024-04-15",
      status: "upcoming",
      priority: "medium"
    },
    {
      id: "2",
      item: "Tire Rotation",
      frequency: "Every 25,000 miles",
      lastPerformed: "2023-12-01",
      nextDue: "2024-01-25",
      status: "due",
      priority: "medium"
    },
    {
      id: "3",
      item: "Air Filter Replacement",
      frequency: "Every 30,000 miles",
      lastPerformed: "2023-11-15",
      nextDue: "2024-02-15",
      status: "upcoming",
      priority: "low"
    },
    {
      id: "4",
      item: "Transmission Service",
      frequency: "Every 100,000 miles",
      lastPerformed: "2023-08-20",
      nextDue: "2024-01-20",
      status: "overdue",
      priority: "high"
    }
  ];

  // Filter records based on search and category
  const filteredRecords = maintenanceRecords.filter(record => {
    const matchesSearch = record.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || record.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "default",
      scheduled: "secondary",
      overdue: "destructive"
    };
    const colors = {
      completed: "bg-green-100 text-green-800",
      scheduled: "bg-blue-100 text-blue-800",
      overdue: "bg-red-100 text-red-800"
    };
    return { variant: variants[status as keyof typeof variants], color: colors[status as keyof typeof colors] };
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800"
    };
    return colors[priority as keyof typeof colors];
  };

  const getScheduleStatusIcon = (status: string) => {
    switch (status) {
      case "overdue": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "due": return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  const handleAddRecord = () => {
    toast({
      title: "Maintenance Record Added",
      description: "New maintenance record has been logged successfully.",
    });
    setIsAddRecordOpen(false);
  };

  const handleScheduleItem = () => {
    toast({
      title: "Maintenance Scheduled",
      description: "Maintenance item has been scheduled successfully.",
    });
    setIsScheduleItemOpen(false);
  };

  // Calculate totals
  const totalCost = maintenanceRecords.reduce((sum, record) => sum + record.cost, 0);
  const recentCost = maintenanceRecords
    .filter(record => new Date(record.date) >= new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))
    .reduce((sum, record) => sum + record.cost, 0);

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Maintenance Log</h1>
          <p className="text-muted-foreground">Track vehicle maintenance history and schedule</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={isAddRecordOpen} onOpenChange={setIsAddRecordOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Record
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Add Maintenance Record</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maintenance-type">Maintenance Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="oil-change">Oil Change</SelectItem>
                        <SelectItem value="brake-service">Brake Service</SelectItem>
                        <SelectItem value="tire-service">Tire Service</SelectItem>
                        <SelectItem value="engine-service">Engine Service</SelectItem>
                        <SelectItem value="transmission">Transmission</SelectItem>
                        <SelectItem value="inspection">Inspection</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="maintenance-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="engine">Engine</SelectItem>
                        <SelectItem value="brakes">Brakes</SelectItem>
                        <SelectItem value="tires">Tires</SelectItem>
                        <SelectItem value="transmission">Transmission</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="safety">Safety</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="maintenance-description">Description</Label>
                  <Textarea 
                    id="maintenance-description" 
                    placeholder="Describe the maintenance performed..."
                    className="min-h-[80px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="maintenance-cost">Total Cost</Label>
                    <Input id="maintenance-cost" type="number" placeholder="0.00" />
                  </div>
                  <div>
                    <Label htmlFor="maintenance-mileage">Mileage</Label>
                    <Input id="maintenance-mileage" type="number" placeholder="145782" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="maintenance-vendor">Vendor/Shop</Label>
                  <Input id="maintenance-vendor" placeholder="Service provider name" />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddRecord} className="flex-1">
                    Add Record
                  </Button>
                  <Button variant="outline" onClick={() => setIsAddRecordOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isScheduleItemOpen} onOpenChange={setIsScheduleItemOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Schedule Maintenance</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="schedule-item">Maintenance Item</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select maintenance item" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oil-change">Oil Change</SelectItem>
                      <SelectItem value="tire-rotation">Tire Rotation</SelectItem>
                      <SelectItem value="brake-inspection">Brake Inspection</SelectItem>
                      <SelectItem value="transmission-service">Transmission Service</SelectItem>
                      <SelectItem value="air-filter">Air Filter Replacement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Scheduled Date</Label>
                  <DatePicker 
                    date={selectedDate} 
                    onDateChange={setSelectedDate}
                    placeholder="Select date"
                  />
                </div>
                <div>
                  <Label htmlFor="schedule-priority">Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleScheduleItem} className="flex-1">
                    Schedule
                  </Button>
                  <Button variant="outline" onClick={() => setIsScheduleItemOpen(false)}>
                    Cancel
                  </Button>
                </div>
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
                <p className="text-sm text-muted-foreground">Total Cost (YTD)</p>
                <p className="text-xl font-semibold">${totalCost.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">This Month</p>
                <p className="text-xl font-semibold">${recentCost.toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Items</p>
                <p className="text-xl font-semibold">{maintenanceSchedule.filter(item => item.status !== "upcoming").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Overdue</p>
                <p className="text-xl font-semibold">{maintenanceSchedule.filter(item => item.status === "overdue").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="records" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="records">Maintenance Records</TabsTrigger>
          <TabsTrigger value="schedule">Maintenance Schedule</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="records" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search maintenance records..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="engine">Engine</SelectItem>
                      <SelectItem value="brakes">Brakes</SelectItem>
                      <SelectItem value="tires">Tires</SelectItem>
                      <SelectItem value="transmission">Transmission</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="safety">Safety</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Records Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Maintenance Records
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Mileage</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRecords.map((record) => {
                    const statusStyle = getStatusBadge(record.status);
                    return (
                      <TableRow key={record.id}>
                        <TableCell>{record.date}</TableCell>
                        <TableCell className="font-medium">{record.type}</TableCell>
                        <TableCell>{record.category}</TableCell>
                        <TableCell className="max-w-xs truncate">{record.description}</TableCell>
                        <TableCell>{record.mileage.toLocaleString()}</TableCell>
                        <TableCell>${record.cost.toFixed(2)}</TableCell>
                        <TableCell>{record.vendor}</TableCell>
                        <TableCell>
                          <Badge className={statusStyle.color}>
                            {record.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View</Button>
                            <Button size="sm" variant="outline">Edit</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Maintenance Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceSchedule.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getScheduleStatusIcon(item.status)}
                      <div>
                        <h4 className="font-medium">{item.item}</h4>
                        <p className="text-sm text-muted-foreground">{item.frequency}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm">Next Due: {item.nextDue}</p>
                        <p className="text-xs text-muted-foreground">Last: {item.lastPerformed}</p>
                      </div>
                      <Badge className={getPriorityBadge(item.priority)}>
                        {item.priority}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Reschedule</Button>
                        <Button size="sm">Complete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Cost Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Parts & Materials</span>
                      <span className="font-medium">$2,156.25</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Labor Costs</span>
                      <span className="font-medium">$1,230.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service Fees</span>
                      <span className="font-medium">$200.00</span>
                    </div>
                    <hr />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Maintenance by Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Engine</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{width: "45%"}}></div>
                      </div>
                      <span className="text-sm">45%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Brakes</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{width: "30%"}}></div>
                      </div>
                      <span className="text-sm">30%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Tires</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{width: "15%"}}></div>
                      </div>
                      <span className="text-sm">15%</span>
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
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenanceLogPage;