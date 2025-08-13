import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Phone,
  Mail,
  MessageCircle,
  User,
  Users,
  Building2,
  MapPin,
  Clock,
  Star,
  Edit,
  Plus,
  Search,
  Filter,
  ExternalLink,
  Calendar,
  Truck,
  Package,
  AlertCircle,
  CheckCircle,
  History,
  FileText,
  Download
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  priority: 'high' | 'medium' | 'low';
  totalShipments: number;
  totalRevenue: number;
  lastContact: Date;
  preferredContact: 'email' | 'phone' | 'sms';
  notes: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

interface ContactHistory {
  id: string;
  customerId: string;
  type: 'call' | 'email' | 'meeting' | 'text';
  subject: string;
  description: string;
  timestamp: Date;
  duration?: number;
  outcome: 'positive' | 'neutral' | 'negative' | 'follow-up-needed';
  nextAction?: string;
  nextActionDate?: Date;
}

interface ActiveShipment {
  id: string;
  customerId: string;
  loadNumber: string;
  origin: string;
  destination: string;
  status: 'in-transit' | 'delivered' | 'delayed' | 'pickup-scheduled';
  estimatedDelivery: Date;
  priority: 'high' | 'medium' | 'low';
  value: number;
}

const CustomerContactPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [contactForm, setContactForm] = useState({
    type: 'email',
    subject: '',
    message: '',
    priority: 'medium',
    scheduledDate: '',
    scheduledTime: ''
  });

  const customers: Customer[] = [
    {
      id: 'cust-001',
      name: 'Robert Johnson',
      company: 'Metro Manufacturing Inc.',
      email: 'robert.johnson@metromanufacturing.com',
      phone: '+1 (555) 123-4567',
      status: 'active',
      priority: 'high',
      totalShipments: 156,
      totalRevenue: 485000,
      lastContact: new Date(2024, 0, 18, 14, 30),
      preferredContact: 'email',
      notes: 'Prefers morning deliveries. Always pays on time. Key account.',
      address: {
        street: '1234 Industrial Blvd',
        city: 'Chicago',
        state: 'IL',
        zip: '60601'
      }
    },
    {
      id: 'cust-002',
      name: 'Sarah Williams',
      company: 'Global Logistics Solutions',
      email: 'sarah.williams@globallogistics.com',
      phone: '+1 (555) 234-5678',
      status: 'active',
      priority: 'medium',
      totalShipments: 89,
      totalRevenue: 234000,
      lastContact: new Date(2024, 0, 17, 10, 15),
      preferredContact: 'phone',
      notes: 'Prefers phone calls for urgent matters. Very responsive.',
      address: {
        street: '5678 Commerce Way',
        city: 'Dallas',
        state: 'TX',
        zip: '75201'
      }
    },
    {
      id: 'cust-003',
      name: 'Michael Chen',
      company: 'Pacific Distribution Center',
      email: 'michael.chen@pacificdist.com',
      phone: '+1 (555) 345-6789',
      status: 'active',
      priority: 'high',
      totalShipments: 203,
      totalRevenue: 678000,
      lastContact: new Date(2024, 0, 16, 16, 45),
      preferredContact: 'email',
      notes: 'Large volume customer. Requires detailed documentation.',
      address: {
        street: '9876 Port Avenue',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90210'
      }
    },
    {
      id: 'cust-004',
      name: 'Amanda Davis',
      company: 'Northeast Supply Chain',
      email: 'amanda.davis@nesupplychain.com',
      phone: '+1 (555) 456-7890',
      status: 'pending',
      priority: 'medium',
      totalShipments: 12,
      totalRevenue: 34000,
      lastContact: new Date(2024, 0, 15, 9, 20),
      preferredContact: 'email',
      notes: 'New customer. Establishing regular shipping schedule.',
      address: {
        street: '2468 Business Park Dr',
        city: 'Boston',
        state: 'MA',
        zip: '02101'
      }
    }
  ];

  const contactHistory: ContactHistory[] = [
    {
      id: 'hist-001',
      customerId: 'cust-001',
      type: 'call',
      subject: 'Delivery Schedule Confirmation',
      description: 'Confirmed next week\'s delivery schedule and discussed holiday logistics',
      timestamp: new Date(2024, 0, 18, 14, 30),
      duration: 15,
      outcome: 'positive',
      nextAction: 'Send holiday schedule',
      nextActionDate: new Date(2024, 0, 22, 9, 0)
    },
    {
      id: 'hist-002',
      customerId: 'cust-001',
      type: 'email',
      subject: 'Invoice #INV-2024-001',
      description: 'Sent invoice for January deliveries',
      timestamp: new Date(2024, 0, 16, 10, 0),
      outcome: 'neutral'
    },
    {
      id: 'hist-003',
      customerId: 'cust-002',
      type: 'call',
      subject: 'Urgent Delivery Request',
      description: 'Customer requested expedited delivery for critical parts',
      timestamp: new Date(2024, 0, 17, 10, 15),
      duration: 8,
      outcome: 'positive',
      nextAction: 'Monitor delivery progress',
      nextActionDate: new Date(2024, 0, 19, 14, 0)
    },
    {
      id: 'hist-004',
      customerId: 'cust-003',
      type: 'meeting',
      subject: 'Quarterly Business Review',
      description: 'Reviewed Q4 performance and discussed Q1 goals',
      timestamp: new Date(2024, 0, 16, 16, 45),
      duration: 60,
      outcome: 'positive',
      nextAction: 'Prepare Q1 proposal',
      nextActionDate: new Date(2024, 0, 25, 10, 0)
    }
  ];

  const activeShipments: ActiveShipment[] = [
    {
      id: 'ship-001',
      customerId: 'cust-001',
      loadNumber: 'TMS-2024-0119-001',
      origin: 'Chicago, IL',
      destination: 'Indianapolis, IN',
      status: 'in-transit',
      estimatedDelivery: new Date(2024, 0, 20, 14, 0),
      priority: 'high',
      value: 15000
    },
    {
      id: 'ship-002',
      customerId: 'cust-002',
      loadNumber: 'TMS-2024-0119-002',
      origin: 'Dallas, TX',
      destination: 'Houston, TX',
      status: 'delivered',
      estimatedDelivery: new Date(2024, 0, 19, 10, 0),
      priority: 'medium',
      value: 8500
    },
    {
      id: 'ship-003',
      customerId: 'cust-003',
      loadNumber: 'TMS-2024-0119-003',
      origin: 'Los Angeles, CA',
      destination: 'San Francisco, CA',
      status: 'pickup-scheduled',
      estimatedDelivery: new Date(2024, 0, 21, 16, 0),
      priority: 'high',
      value: 22000
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         customer.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedCustomerData = customers.find(c => c.id === selectedCustomer);
  const customerHistory = contactHistory.filter(h => h.customerId === selectedCustomer);
  const customerShipments = activeShipments.filter(s => s.customerId === selectedCustomer);

  const handleContactSubmit = () => {
    toast({
      title: "Contact Initiated",
      description: `${contactForm.type} ${contactForm.scheduledDate ? 'scheduled' : 'sent'} successfully.`,
    });
    setContactForm({
      type: 'email',
      subject: '',
      message: '',
      priority: 'medium',
      scheduledDate: '',
      scheduledTime: ''
    });
  };

  const handleQuickAction = (action: string, customer: Customer) => {
    toast({
      title: "Action Completed",
      description: `${action} initiated for ${customer.name}`,
    });
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'default',
      'inactive': 'secondary',
      'pending': 'outline'
    } as const;
    return <Badge variant={variants[status as keyof typeof variants]}>{status}</Badge>;
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      'high': 'destructive',
      'medium': 'default',
      'low': 'secondary'
    } as const;
    return <Badge variant={variants[priority as keyof typeof variants]}>{priority}</Badge>;
  };

  const getShipmentStatusBadge = (status: string) => {
    const config = {
      'in-transit': { variant: 'default' as const, icon: Truck },
      'delivered': { variant: 'default' as const, icon: CheckCircle },
      'delayed': { variant: 'destructive' as const, icon: AlertCircle },
      'pickup-scheduled': { variant: 'outline' as const, icon: Calendar }
    };
    const { variant, icon: Icon } = config[status as keyof typeof config];
    return (
      <Badge variant={variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {status.replace('-', ' ')}
      </Badge>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Customer Contact</h1>
          <p className="text-muted-foreground mt-2">
            Manage customer relationships and communications
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customer-name">Customer Name</Label>
                <Input id="customer-name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" placeholder="Company Name Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" placeholder="+1 (555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferred-contact">Preferred Contact</Label>
                <Select defaultValue="email">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="phone">Phone</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" placeholder="Additional notes about the customer..." />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Cancel</Button>
              <Button onClick={handleContactSubmit}>Add Customer</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customers
            </CardTitle>
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          
          <ScrollArea className="h-[600px]">
            <div className="p-4 space-y-3">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  onClick={() => setSelectedCustomer(customer.id)}
                  className={cn(
                    "p-3 rounded-lg border cursor-pointer transition-colors hover:bg-accent",
                    selectedCustomer === customer.id && "bg-primary/10 border-primary"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={customer.avatar} />
                      <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm truncate">{customer.name}</h3>
                        {getPriorityBadge(customer.priority)}
                      </div>
                      <p className="text-xs text-muted-foreground truncate mb-2">{customer.company}</p>
                      <div className="flex items-center justify-between">
                        {getStatusBadge(customer.status)}
                        <span className="text-xs text-muted-foreground">
                          {customer.totalShipments} shipments
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Customer Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedCustomerData ? (
            <>
              {/* Customer Header */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={selectedCustomerData.avatar} />
                        <AvatarFallback className="text-lg">
                          {selectedCustomerData.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="text-2xl font-bold">{selectedCustomerData.name}</h2>
                        <p className="text-lg text-muted-foreground">{selectedCustomerData.company}</p>
                        <div className="flex items-center gap-3 mt-2">
                          {getStatusBadge(selectedCustomerData.status)}
                          {getPriorityBadge(selectedCustomerData.priority)}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary">{selectedCustomerData.totalShipments}</div>
                      <div className="text-sm text-muted-foreground">Total Shipments</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">
                        ${selectedCustomerData.totalRevenue.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {selectedCustomerData.lastContact.toLocaleDateString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Last Contact</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600 capitalize">
                        {selectedCustomerData.preferredContact}
                      </div>
                      <div className="text-sm text-muted-foreground">Preferred Contact</div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <Separator className="my-6" />
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleQuickAction('Call', selectedCustomerData)}
                      className="gap-2"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleQuickAction('Email', selectedCustomerData)}
                      className="gap-2"
                    >
                      <Mail className="h-4 w-4" />
                      Email
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleQuickAction('Schedule Meeting', selectedCustomerData)}
                      className="gap-2"
                    >
                      <Calendar className="h-4 w-4" />
                      Schedule
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleQuickAction('View Details', selectedCustomerData)}
                      className="gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs Content */}
              <Tabs defaultValue="contact" className="space-y-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                  <TabsTrigger value="shipments">Shipments</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="contact" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Send Communication</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="contact-type">Contact Type</Label>
                          <Select value={contactForm.type} onValueChange={(value) => setContactForm(prev => ({ ...prev, type: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="email">Email</SelectItem>
                              <SelectItem value="call">Phone Call</SelectItem>
                              <SelectItem value="meeting">Schedule Meeting</SelectItem>
                              <SelectItem value="text">Text Message</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="priority">Priority</Label>
                          <Select value={contactForm.priority} onValueChange={(value) => setContactForm(prev => ({ ...prev, priority: value }))}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="Enter subject..."
                          value={contactForm.subject}
                          onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Enter your message..."
                          value={contactForm.message}
                          onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                          rows={6}
                        />
                      </div>

                      {contactForm.type === 'meeting' && (
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="scheduled-date">Date</Label>
                            <Input
                              id="scheduled-date"
                              type="date"
                              value={contactForm.scheduledDate}
                              onChange={(e) => setContactForm(prev => ({ ...prev, scheduledDate: e.target.value }))}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="scheduled-time">Time</Label>
                            <Input
                              id="scheduled-time"
                              type="time"
                              value={contactForm.scheduledTime}
                              onChange={(e) => setContactForm(prev => ({ ...prev, scheduledTime: e.target.value }))}
                            />
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end gap-2">
                        <Button variant="outline">Save as Draft</Button>
                        <Button onClick={handleContactSubmit}>
                          {contactForm.type === 'meeting' ? 'Schedule' : 'Send'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="shipments" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Active Shipments</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Load #</TableHead>
                            <TableHead>Route</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Delivery</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {customerShipments.map((shipment) => (
                            <TableRow key={shipment.id}>
                              <TableCell className="font-medium">{shipment.loadNumber}</TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  <div>{shipment.origin} →</div>
                                  <div className="text-muted-foreground">{shipment.destination}</div>
                                </div>
                              </TableCell>
                              <TableCell>{getShipmentStatusBadge(shipment.status)}</TableCell>
                              <TableCell>
                                <div className="text-sm">
                                  {shipment.estimatedDelivery.toLocaleDateString()}
                                  <div className="text-muted-foreground">
                                    {shipment.estimatedDelivery.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>${shipment.value.toLocaleString()}</TableCell>
                              <TableCell>
                                <Button variant="outline" size="sm">Track</Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="history" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {customerHistory.map((contact) => (
                          <div key={contact.id} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-3">
                                <div className={cn(
                                  "p-2 rounded-full",
                                  contact.type === 'call' && "bg-blue-100 text-blue-600",
                                  contact.type === 'email' && "bg-green-100 text-green-600",
                                  contact.type === 'meeting' && "bg-purple-100 text-purple-600",
                                  contact.type === 'text' && "bg-orange-100 text-orange-600"
                                )}>
                                  {contact.type === 'call' && <Phone className="h-4 w-4" />}
                                  {contact.type === 'email' && <Mail className="h-4 w-4" />}
                                  {contact.type === 'meeting' && <Calendar className="h-4 w-4" />}
                                  {contact.type === 'text' && <MessageCircle className="h-4 w-4" />}
                                </div>
                                <div>
                                  <h4 className="font-medium">{contact.subject}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    {contact.timestamp.toLocaleDateString()} at {contact.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    {contact.duration && ` • ${contact.duration} min`}
                                  </p>
                                </div>
                              </div>
                              <Badge variant={contact.outcome === 'positive' ? 'default' : contact.outcome === 'negative' ? 'destructive' : 'secondary'}>
                                {contact.outcome}
                              </Badge>
                            </div>
                            <p className="text-sm mb-3">{contact.description}</p>
                            {contact.nextAction && (
                              <div className="bg-muted p-3 rounded-md">
                                <p className="text-sm font-medium">Next Action: {contact.nextAction}</p>
                                {contact.nextActionDate && (
                                  <p className="text-xs text-muted-foreground">
                                    Due: {contact.nextActionDate.toLocaleDateString()}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Documents</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                          { name: 'Service Agreement', type: 'PDF', date: '2024-01-15', size: '2.4 MB' },
                          { name: 'Insurance Certificate', type: 'PDF', date: '2024-01-10', size: '1.8 MB' },
                          { name: 'Rate Sheet 2024', type: 'Excel', date: '2024-01-01', size: '156 KB' },
                          { name: 'Delivery Instructions', type: 'Word', date: '2023-12-20', size: '89 KB' },
                          { name: 'Contact Directory', type: 'PDF', date: '2023-12-15', size: '245 KB' },
                          { name: 'Holiday Schedule', type: 'PDF', date: '2023-11-30', size: '67 KB' }
                        ].map((doc, index) => (
                          <div key={index} className="border rounded-lg p-4 hover:bg-accent transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <FileText className="h-8 w-8 text-blue-600" />
                              <Button variant="ghost" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                            <h4 className="font-medium text-sm mb-1">{doc.name}</h4>
                            <div className="text-xs text-muted-foreground space-y-1">
                              <p>{doc.type} • {doc.size}</p>
                              <p>Modified: {doc.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          ) : (
            <Card className="h-96 flex items-center justify-center">
              <CardContent className="text-center">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Select a Customer</h3>
                <p className="text-muted-foreground">Choose a customer from the list to view details and manage communications</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerContactPage;