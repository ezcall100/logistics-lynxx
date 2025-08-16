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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Phone, 
  Mail, 
  MessageSquare,
  User,
  Building2,
  MapPin,
  Clock,
  Star,
  Plus,
  Search,
  Filter,
  Calendar,
  FileText,
  ExternalLink,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
  type: "shipper" | "consignee";
  priority: "low" | "medium" | "high";
  preferredContact: "phone" | "email" | "text";
  notes: string;
  lastContact: string;
  status: "active" | "pending" | "completed";
}

interface ContactLog {
  id: string;
  customerId: string;
  type: "call" | "email" | "text" | "in-person";
  direction: "inbound" | "outbound";
  subject: string;
  notes: string;
  timestamp: string;
  duration?: string;
  status: "completed" | "pending" | "failed";
}

const CustomerContactPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isLogContactOpen, setIsLogContactOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  // Mock customer data
  const customers: Customer[] = [
    {
      id: "1",
      name: "John Smith",
      company: "ABC Manufacturing",
      email: "john.smith@abcmfg.com",
      phone: "(555) 123-4567",
      address: "123 Industrial Blvd, Dallas, TX 75201",
      type: "shipper",
      priority: "high",
      preferredContact: "phone",
      notes: "Prefers morning pickups, has loading dock access",
      lastContact: "2024-01-19 09:30",
      status: "active"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      company: "XYZ Logistics",
      email: "sarah@xyzlogistics.com",
      phone: "(555) 987-6543",
      address: "456 Commerce St, Houston, TX 77001",
      type: "consignee",
      priority: "medium",
      preferredContact: "email",
      notes: "Requires 30-min advance notice, security checkpoint required",
      lastContact: "2024-01-18 14:15",
      status: "pending"
    },
    {
      id: "3",
      name: "Mike Davis",
      company: "Global Supply Chain",
      email: "mike.davis@globalsupply.com",
      phone: "(555) 555-0123",
      address: "789 Warehouse Way, Austin, TX 78701",
      type: "shipper",
      priority: "medium",
      preferredContact: "text",
      notes: "24/7 operations, contact supervisor for after-hours",
      lastContact: "2024-01-17 16:45",
      status: "completed"
    },
    {
      id: "4",
      name: "Lisa Williams",
      company: "Tech Distribution",
      email: "lisa@techdist.com",
      phone: "(555) 444-7890",
      address: "321 Tech Park Dr, San Antonio, TX 78201",
      type: "consignee",
      priority: "high",
      preferredContact: "phone",
      notes: "Fragile electronics, white glove service required",
      lastContact: "2024-01-16 11:20",
      status: "active"
    }
  ];

  // Mock contact logs
  const contactLogs: ContactLog[] = [
    {
      id: "1",
      customerId: "1",
      type: "call",
      direction: "outbound",
      subject: "Pickup confirmation",
      notes: "Confirmed pickup time for 10 AM. Load will be ready.",
      timestamp: "2024-01-19 09:30",
      duration: "3:45",
      status: "completed"
    },
    {
      id: "2",
      customerId: "2",
      type: "email",
      direction: "inbound",
      subject: "Delivery delay notification",
      notes: "Customer notified about 30-minute delivery delay due to traffic.",
      timestamp: "2024-01-18 14:15",
      status: "completed"
    },
    {
      id: "3",
      customerId: "3",
      type: "text",
      direction: "outbound",
      subject: "Arrival notification",
      notes: "Sent arrival notification and dock assignment.",
      timestamp: "2024-01-17 16:45",
      status: "completed"
    },
    {
      id: "4",
      customerId: "4",
      type: "call",
      direction: "inbound",
      subject: "Special handling instructions",
      notes: "Customer provided additional handling requirements for sensitive equipment.",
      timestamp: "2024-01-16 11:20",
      duration: "7:22",
      status: "completed"
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || customer.type === filterType;
    return matchesSearch && matchesType;
  });

  const getCustomerById = (id: string) => customers.find(c => c.id === id);

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800"
    };
    return variants[status as keyof typeof variants] || "bg-gray-100 text-gray-800";
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      low: "bg-gray-100 text-gray-800",
      medium: "bg-orange-100 text-orange-800",
      high: "bg-red-100 text-red-800"
    };
    return variants[priority as keyof typeof variants];
  };

  const getContactIcon = (type: string) => {
    switch (type) {
      case "call": return <Phone className="h-4 w-4" />;
      case "email": return <Mail className="h-4 w-4" />;
      case "text": return <MessageSquare className="h-4 w-4" />;
      case "in-person": return <User className="h-4 w-4" />;
      default: return <MessageSquare className="h-4 w-4" />;
    }
  };

  const handleContactCustomer = (customer: Customer, method: string) => {
    setSelectedCustomer(customer);
    toast({
      title: `${method} Contact Initiated`,
      description: `Contacting ${customer.name} at ${customer.company}`,
    });
  };

  const handleLogContact = () => {
    toast({
      title: "Contact Logged",
      description: "Customer interaction has been recorded.",
    });
    setIsLogContactOpen(false);
  };

  return (
    <div className="w-full max-w-none p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Customer Contact</h1>
          <p className="text-muted-foreground">Manage customer communications and contact history</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={isLogContactOpen} onOpenChange={setIsLogContactOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Log Contact
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Log Customer Contact</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-customer">Customer</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select customer" />
                      </SelectTrigger>
                      <SelectContent>
                        {customers.map((customer) => (
                          <SelectItem key={customer.id} value={customer.id}>
                            {customer.name} - {customer.company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="contact-type">Contact Type</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="call">Phone Call</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="text">Text Message</SelectItem>
                        <SelectItem value="in-person">In Person</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label htmlFor="contact-subject">Subject</Label>
                  <Input id="contact-subject" placeholder="Brief description of contact..." />
                </div>
                <div>
                  <Label htmlFor="contact-notes">Notes</Label>
                  <Textarea 
                    id="contact-notes" 
                    placeholder="Detailed notes about the interaction..."
                    className="min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact-duration">Duration (if call)</Label>
                    <Input id="contact-duration" placeholder="e.g., 5:30" />
                  </div>
                  <div>
                    <Label htmlFor="contact-status">Status</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending Follow-up</SelectItem>
                        <SelectItem value="failed">Failed to Contact</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleLogContact} className="flex-1">
                    Log Contact
                  </Button>
                  <Button variant="outline" onClick={() => setIsLogContactOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <FileText className="h-4 w-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building2 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Customers</p>
                <p className="text-xl font-semibold">{customers.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Active Loads</p>
                <p className="text-xl font-semibold">{customers.filter(c => c.status === "active").length}</p>
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
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-xl font-semibold">{customers.filter(c => c.status === "pending").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">High Priority</p>
                <p className="text-xl font-semibold">{customers.filter(c => c.priority === "high").length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="customers" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="customers">Customer Directory</TabsTrigger>
          <TabsTrigger value="contact-log">Contact Log</TabsTrigger>
          <TabsTrigger value="quick-contact">Quick Contact</TabsTrigger>
        </TabsList>

        <TabsContent value="customers" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search customers..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="shipper">Shippers</SelectItem>
                      <SelectItem value="consignee">Consignees</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Customer Directory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Contact Info</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Prefers: {customer.preferredContact}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{customer.company}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {customer.address.split(",")[1]?.trim()}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{customer.phone}</p>
                          <p className="text-sm text-muted-foreground">{customer.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {customer.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPriorityBadge(customer.priority)}>
                          {customer.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadge(customer.status)}>
                          {customer.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{customer.lastContact}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleContactCustomer(customer, "Phone")}
                          >
                            <Phone className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleContactCustomer(customer, "Email")}
                          >
                            <Mail className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleContactCustomer(customer, "Text")}
                          >
                            <MessageSquare className="h-3 w-3" />
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

        <TabsContent value="contact-log" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Contact History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contactLogs.map((log) => {
                  const customer = getCustomerById(log.customerId);
                  return (
                    <div key={log.id} className="flex items-start gap-4 p-4 border rounded-lg">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {getContactIcon(log.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{log.subject}</h4>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-xs">
                              {log.direction}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{log.timestamp}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {customer?.name} - {customer?.company}
                        </p>
                        <p className="text-sm">{log.notes}</p>
                        {log.duration && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Duration: {log.duration}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quick-contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {customers.filter(c => c.status === "active").map((customer) => (
              <Card key={customer.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{customer.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{customer.company}</p>
                      </div>
                    </div>
                    <Badge className={getPriorityBadge(customer.priority)}>
                      {customer.priority}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{customer.email}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">{customer.address}</span>
                    </div>
                    {customer.notes && (
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm">{customer.notes}</p>
                      </div>
                    )}
                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        className="flex-1"
                        onClick={() => handleContactCustomer(customer, "Phone")}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        Call
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handleContactCustomer(customer, "Email")}
                      >
                        <Mail className="h-4 w-4 mr-2" />
                        Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerContactPage;