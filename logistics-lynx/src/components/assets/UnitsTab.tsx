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
import { Textarea } from '@/components/ui/textarea';
import { 
  Plus, Edit, Trash2, MapPin, Truck, Users, Activity,
  TrendingUp, AlertTriangle, CheckCircle, Clock, Search, Download, Upload, Filter
} from 'lucide-react';

interface UnitsTabProps {
  searchTerm: string;
}

export function UnitsTab({ searchTerm }: UnitsTabProps) {
  const [searchTerm2, setSearchTerm2] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Enhanced sample data matching the reference image structure
  const units = [
    {
      id: 1,
      unitNo: "1036",
      driver: "John Smith",
      coDriver: "Mike Johnson",
      truck: "1026",
      trailer: "TR-1544",
      team: "Alpha Team",
      office: "1",
      status: "Available",
      location: "SSA Terminal, 1717 McKee Harbor Road, Oakland CA 94607",
      tripType: "Long Haul",
      loadNo: "",
      revenue: "$0",
      miles: "0",
      fuelEfficiency: "6.8 MPG",
      dateActive: "2024-01-15",
      notes: "Unit ready for assignment"
    },
    {
      id: 2,
      unitNo: "1037",
      driver: "Sarah Davis",
      coDriver: "",
      truck: "1027",
      trailer: "TR-1545",
      team: "Beta Team",
      office: "2",
      status: "In Transit",
      location: "En Route to Denver Terminal",
      tripType: "Regional",
      loadNo: "L12345",
      revenue: "$4,250",
      miles: "1,245",
      fuelEfficiency: "7.2 MPG",
      dateActive: "2024-01-10",
      notes: "Long haul assignment, ETA 3 days"
    },
    {
      id: 3,
      unitNo: "1038",
      driver: "Robert Wilson",
      coDriver: "Lisa Brown",
      truck: "1028",
      trailer: "TR-1546",
      team: "Gamma Team",
      office: "1",
      status: "Active",
      location: "Chicago Distribution Hub",
      tripType: "Dedicated",
      loadNo: "L12346",
      revenue: "$3,800",
      miles: "892",
      fuelEfficiency: "6.5 MPG",
      dateActive: "2024-01-12",
      notes: "Dedicated customer route"
    }
  ];

  const filteredUnits = units.filter(unit => {
    const matchesSearch = unit.unitNo.toLowerCase().includes(searchTerm2.toLowerCase()) ||
                         unit.driver.toLowerCase().includes(searchTerm2.toLowerCase()) ||
                         unit.truck.toLowerCase().includes(searchTerm2.toLowerCase());
    const matchesStatus = statusFilter === "all" || unit.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "default";
      case "available": return "secondary";
      case "in transit": return "outline";
      case "maintenance": return "destructive";
      default: return "outline";
    }
  };

  const stats = [
    { label: "Total Units", value: "24", icon: Truck, color: "text-primary" },
    { label: "Active Units", value: "18", icon: Activity, color: "text-success" },
    { label: "Available", value: "4", icon: Users, color: "text-blue-500" },
    { label: "In Transit", value: "2", icon: MapPin, color: "text-warning" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Unit Management</h1>
          <p className="text-muted-foreground mt-2">
            Units are defined as some combination of driver, truck and trailer, some or all. 
            Modifying unit information will also modify related information on unknown drivers, trucks or trailers assigned to that unit.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <Plus className="h-4 w-4 mr-2" />
                Setup New Unit
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Setup Unit - Paint</DialogTitle>
              </DialogHeader>
              <UnitForm onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full bg-background/50 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-background/50 to-transparent pointer-events-none" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
          <TabsTrigger value="overview">Unit Overview</TabsTrigger>
          <TabsTrigger value="assignments">Assignments</TabsTrigger>
          <TabsTrigger value="tracking">Fleet Tracker</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Search and Filter Section */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by unit number, driver, or truck..."
                    value={searchTerm2}
                    onChange={(e) => setSearchTerm2(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="in transit">In Transit</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Units Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Units Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Unit No.</TableHead>
                      <TableHead className="font-semibold">Driver</TableHead>
                      <TableHead className="font-semibold">Co-Driver</TableHead>
                      <TableHead className="font-semibold">Truck</TableHead>
                      <TableHead className="font-semibold">Trailer</TableHead>
                      <TableHead className="font-semibold">Team</TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                      <TableHead className="font-semibold">Location</TableHead>
                      <TableHead className="font-semibold">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUnits.map((unit) => (
                      <TableRow key={unit.id} className="hover:bg-muted/50">
                        <TableCell className="font-medium text-primary">{unit.unitNo}</TableCell>
                        <TableCell className="font-medium">{unit.driver}</TableCell>
                        <TableCell className="text-muted-foreground">{unit.coDriver || "—"}</TableCell>
                        <TableCell>{unit.truck}</TableCell>
                        <TableCell>{unit.trailer}</TableCell>
                        <TableCell>{unit.team}</TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(unit.status)}>
                            {unit.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="max-w-xs truncate" title={unit.location}>
                          {unit.location}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
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
        </TabsContent>

        <TabsContent value="assignments" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Unit Assignments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage driver, truck, and trailer assignments for units.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tracking" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Fleet Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Real-time tracking and location management for units.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Unit Reports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Generate reports for unit performance and utilization.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Enhanced Unit Form Component matching the reference image
const UnitForm = ({ onClose }: { onClose: () => void }) => {
  const [formData, setFormData] = useState({
    unitNo: "1036",
    driver: "John Smith",
    coDriver: "",
    truck: "1026",
    trailer: "",
    team: "",
    office: "1",
    status: "Available",
    location: "SSA Terminal",
    notes: ""
  });

  return (
    <div className="space-y-6">
      {/* Main Form Layout - matching reference image */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Panel - Unit Info */}
        <Card>
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-lg">Unit Info</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unitNo" className="text-sm font-medium">Unit No.</Label>
                <Input 
                  id="unitNo" 
                  value={formData.unitNo}
                  onChange={(e) => setFormData({...formData, unitNo: e.target.value})}
                  className="font-medium"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="truck" className="text-sm font-medium">Truck Board</Label>
                <Input 
                  id="truck" 
                  value={formData.truck}
                  onChange={(e) => setFormData({...formData, truck: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground border-b pb-2">Assignments</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driver" className="text-sm font-medium">Driver</Label>
                  <Select value={formData.driver} onValueChange={(value) => setFormData({...formData, driver: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="John Smith">John Smith</SelectItem>
                      <SelectItem value="Sarah Davis">Sarah Davis</SelectItem>
                      <SelectItem value="Robert Wilson">Robert Wilson</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="coDriver" className="text-sm font-medium">Co Driver</Label>
                  <Select value={formData.coDriver} onValueChange={(value) => setFormData({...formData, coDriver: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select co-driver" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                      <SelectItem value="Lisa Brown">Lisa Brown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="truck" className="text-sm font-medium">Truck</Label>
                  <Select value={formData.truck} onValueChange={(value) => setFormData({...formData, truck: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1026">1026</SelectItem>
                      <SelectItem value="1027">1027</SelectItem>
                      <SelectItem value="1028">1028</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trailer" className="text-sm font-medium">Trailer</Label>
                  <Select value={formData.trailer} onValueChange={(value) => setFormData({...formData, trailer: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select trailer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="TR-1544">TR-1544</SelectItem>
                      <SelectItem value="TR-1545">TR-1545</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="team" className="text-sm font-medium">Team</Label>
                  <Select value={formData.team} onValueChange={(value) => setFormData({...formData, team: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="Alpha">Alpha Team</SelectItem>
                      <SelectItem value="Beta">Beta Team</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="office" className="text-sm font-medium">Office</Label>
                  <Select value={formData.office} onValueChange={(value) => setFormData({...formData, office: value})}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="text-sm text-muted-foreground space-y-1">
                <div><strong>Status:</strong> Available</div>
                <div><strong>Date:</strong> 01/15/16</div>
                <div><strong>Trip Type:</strong> Long Haul</div>
                <div><strong>Load No:</strong> 100066</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Panel - Unit Information Detail */}
        <Card>
          <CardHeader className="bg-muted/30">
            <CardTitle className="text-lg">Unit Information</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <Tabs defaultValue="assignments" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="assignments">Assignments</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="assignments" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Unit No.</Label>
                    <Input value="1036" readOnly className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Active</Label>
                    <Input value="✓" readOnly className="bg-muted/30" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Driver</Label>
                    <Input value="John Smith" readOnly className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">424-230-3515</Label>
                    <Input value="" readOnly className="bg-muted/30" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Co Driver</Label>
                  <Input value="" className="bg-muted/30" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Truck</Label>
                    <Input value="1026" readOnly className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Trailer</Label>
                    <Input value="" className="bg-muted/30" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Team</Label>
                    <Input value="" className="bg-muted/30" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Office</Label>
                    <Input value="1" readOnly className="bg-muted/30" />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="font-medium">Status:</div>
                      <div className="text-muted-foreground">Available</div>
                      <div className="font-medium mt-2">Trip Type:</div>
                      <div className="text-muted-foreground">Long Haul</div>
                    </div>
                    <div>
                      <div className="font-medium">Location:</div>
                      <div className="text-muted-foreground">SSA Terminal</div>
                      <div className="text-muted-foreground">1717 McKee Harbor Road</div>
                      <div className="text-muted-foreground">Oakland CA 94607</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notes" className="space-y-4 mt-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Notes</Label>
                  <Textarea 
                    rows={8}
                    placeholder="Enter unknown notes or special instructions for this unit..."
                    className="resize-none"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* Instructions Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Inputting a New Unit Record</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm max-w-none">
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>In the <strong>Fleet Tracker</strong>, click the <strong>New</strong> button then select <strong>Unit</strong>. This screen is divided into three tabs.</li>
            <li>Under the <strong>Unit Info</strong> tab, input the following information, as applicable:
              <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                <li><strong>Unit No.</strong> - Enter a unique identification for the unit. The numbering convention should usually follow your dispatching habits.</li>
                <li><strong>Office</strong> - Office location to which the unit is assigned.</li>
                <li><strong>Driver</strong> - Select the driver assigned to the unit.</li>
                <li><strong>Co Driver</strong> - Select the co driver, if unknown, assigned to the unit.</li>
                <li><strong>Truck</strong> - Truck number assigned to the unit.</li>
                <li><strong>Trailer</strong> - Trailer assigned to the unit.</li>
                <li><strong>Trailer 2</strong> - Second trailer, if unknown, assigned to the unit.</li>
                <li><strong>Date</strong> - Date the unit became active.</li>
                <li><strong>Notes</strong> - Any notes entered into the Unit record.</li>
              </ul>
            </li>
            <li>After all of the available information has been input, click the <strong>Save</strong> button to save the unit record or <strong>Cancel</strong> to close the screen without saving unknown of the data.</li>
          </ol>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button variant="outline" onClick={onClose} className="px-8">
          Cancel
        </Button>
        <Button onClick={onClose} className="px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
          Save
        </Button>
      </div>
    </div>
  );
};