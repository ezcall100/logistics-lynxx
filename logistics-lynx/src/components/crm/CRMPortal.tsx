import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useToast } from '../ui/use-toast';
import { Search, Filter, UserPlus, Phone, Mail, MapPin, Calendar, DollarSign, TrendingUp, Users, Target, MessageSquare, Star, Building, Truck, Package } from 'lucide-react';
import { useRole } from '../../context/role-context';

// Mock data for CRM
interface Contact {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  phone: string;
  location: string;
  status: 'active' | 'inactive' | 'prospect';
  type: 'shipper' | 'carrier' | 'broker' | 'vendor';
  lastContact: string;
  totalRevenue: string;
  rating: number;
  notes: string;
  tags: string[];
}

interface Opportunity {
  id: string;
  title: string;
  contact: string;
  company: string;
  value: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed_won' | 'closed_lost';
  probability: number;
  expectedClose: string;
  assignedTo: string;
  description: string;
  lastActivity: string;
}

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  assignedTo: string;
  createdDate: string;
  lastActivity: string;
  notes: string;
}

const mockContacts: Contact[] = [
  {
    id: 'C001',
    name: 'John Smith',
    company: 'TechCorp Logistics',
    role: 'Logistics Manager',
    email: 'john.smith@techcorp.com',
    phone: '(555) 123-4567',
    location: 'Los Angeles, CA',
    status: 'active',
    type: 'shipper',
    lastContact: '2024-01-10',
    totalRevenue: '$45,230',
    rating: 4.8,
    notes: 'High-value customer, prefers refrigerated transport',
    tags: ['VIP', 'Refrigerated', 'West Coast']
  },
  {
    id: 'C002',
    name: 'Sarah Johnson',
    company: 'Fast Freight Inc',
    role: 'Operations Director',
    email: 'sarah.j@fastfreight.com',
    phone: '(555) 987-6543',
    location: 'Chicago, IL',
    status: 'active',
    type: 'carrier',
    lastContact: '2024-01-12',
    totalRevenue: '$32,150',
    rating: 4.5,
    notes: 'Reliable carrier, good for flatbed loads',
    tags: ['Reliable', 'Flatbed', 'Midwest']
  },
  {
    id: 'C003',
    name: 'Mike Wilson',
    company: 'Global Shipping Co',
    role: 'CEO',
    email: 'mike.wilson@globalshipping.com',
    phone: '(555) 456-7890',
    location: 'Miami, FL',
    status: 'prospect',
    type: 'shipper',
    lastContact: '2024-01-08',
    totalRevenue: '$0',
    rating: 0,
    notes: 'New prospect, interested in international shipping',
    tags: ['Prospect', 'International', 'High Potential']
  }
];

const mockOpportunities: Opportunity[] = [
  {
    id: 'O001',
    title: 'TechCorp Annual Contract',
    contact: 'John Smith',
    company: 'TechCorp Logistics',
    value: '$125,000',
    stage: 'negotiation',
    probability: 75,
    expectedClose: '2024-02-15',
    assignedTo: 'Sales Team A',
    description: 'Annual logistics contract for electronics distribution',
    lastActivity: '2024-01-12'
  },
  {
    id: 'O002',
    title: 'Global Shipping Partnership',
    contact: 'Mike Wilson',
    company: 'Global Shipping Co',
    value: '$85,000',
    stage: 'proposal',
    probability: 60,
    expectedClose: '2024-03-01',
    assignedTo: 'Sales Team B',
    description: 'Partnership for international shipping services',
    lastActivity: '2024-01-10'
  }
];

const mockLeads: Lead[] = [
  {
    id: 'L001',
    name: 'Emily Davis',
    company: 'Fresh Foods Express',
    email: 'emily.davis@freshfoods.com',
    phone: '(555) 321-6547',
    source: 'Website',
    status: 'contacted',
    assignedTo: 'Sales Team A',
    createdDate: '2024-01-05',
    lastActivity: '2024-01-12',
    notes: 'Interested in refrigerated transport services'
  },
  {
    id: 'L002',
    name: 'David Brown',
    company: 'Auto Parts Plus',
    email: 'david.brown@autoparts.com',
    phone: '(555) 789-1234',
    source: 'Trade Show',
    status: 'new',
    assignedTo: 'Sales Team B',
    createdDate: '2024-01-15',
    lastActivity: '2024-01-15',
    notes: 'Met at logistics trade show, needs flatbed services'
  }
];

export const CRMPortal: React.FC = () => {
  const { toast } = useToast();
  const { currentRole, roleInfo } = useRole();
  
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [opportunities, setOpportunities] = useState<Opportunity[]>(mockOpportunities);
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>(mockContacts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showAddContactDialog, setShowAddContactDialog] = useState(false);
  const [showAddOpportunityDialog, setShowAddOpportunityDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('contacts');

  // Filter contacts based on search and filters
  useEffect(() => {
    const filtered = contacts.filter(contact => {
      const matchesSearch = 
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || contact.status === statusFilter;
      const matchesType = typeFilter === 'all' || contact.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
    
    setFilteredContacts(filtered);
  }, [contacts, searchQuery, statusFilter, typeFilter]);

  const handleAddContact = () => {
    toast({
      title: 'Contact Added',
      description: 'New contact has been successfully added to CRM.',
      variant: 'default'
    });
    setShowAddContactDialog(false);
  };

  const handleAddOpportunity = () => {
    toast({
      title: 'Opportunity Created',
      description: 'New sales opportunity has been created.',
      variant: 'default'
    });
    setShowAddOpportunityDialog(false);
  };

  const getRoleSpecificActions = () => {
    switch (currentRole) {
      case 'freight_broker_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowAddContactDialog(true)} className="bg-violet-600 hover:bg-violet-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Contact
            </Button>
            <Button onClick={() => setShowAddOpportunityDialog(true)} variant="outline">
              <Target className="h-4 w-4 mr-2" />
              Add Opportunity
            </Button>
          </div>
        );
      case 'carrier_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowAddContactDialog(true)} className="bg-violet-600 hover:bg-violet-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Shipper
            </Button>
            <Button variant="outline">
              <Truck className="h-4 w-4 mr-2" />
              Fleet Partners
            </Button>
          </div>
        );
      case 'shipper_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowAddContactDialog(true)} className="bg-violet-600 hover:bg-violet-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Carrier
            </Button>
            <Button variant="outline">
              <Package className="h-4 w-4 mr-2" />
              Service Providers
            </Button>
          </div>
        );
      default:
        return (
          <Button onClick={() => setShowAddContactDialog(true)} className="bg-violet-600 hover:bg-violet-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Add Contact
          </Button>
        );
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'prospecting': return 'bg-gray-100 text-gray-800';
      case 'qualification': return 'bg-blue-100 text-blue-800';
      case 'proposal': return 'bg-yellow-100 text-yellow-800';
      case 'negotiation': return 'bg-orange-100 text-orange-800';
      case 'closed_won': return 'bg-green-100 text-green-800';
      case 'closed_lost': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'prospect': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-purple-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">👥 CRM Portal</h1>
              <p className="text-gray-600">Customer relationship management and business intelligence</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-sm">
                {roleInfo.name}
              </Badge>
              {getRoleSpecificActions()}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="contacts" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter Contacts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search contacts..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="prospect">Prospect</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="shipper">Shipper</SelectItem>
                      <SelectItem value="carrier">Carrier</SelectItem>
                      <SelectItem value="broker">Broker</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Contacts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredContacts.map((contact) => (
                <Card key={contact.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{contact.name}</CardTitle>
                        <p className="text-sm text-gray-600">{contact.company}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getStatusColor(contact.status)}>
                            {contact.status}
                          </Badge>
                          <Badge variant="outline">{contact.type}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < contact.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{contact.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{contact.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-500" />
                        <span className="text-sm font-medium text-green-600">{contact.totalRevenue}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">Last contact: {contact.lastContact}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 pt-2">
                        {contact.tags.map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedContact(contact)}
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Contact
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                        >
                          <TrendingUp className="h-4 w-4 mr-1" />
                          View History
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {opportunities.map((opportunity) => (
                <Card key={opportunity.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                        <p className="text-sm text-gray-600">{opportunity.company}</p>
                      </div>
                      <Badge className={getStageColor(opportunity.stage)}>
                        {opportunity.stage.replace('_', ' ')}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Value:</span>
                        <span className="text-lg font-bold text-green-600">{opportunity.value}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Probability:</span>
                        <span className="text-sm font-medium">{opportunity.probability}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Expected Close:</span>
                        <span className="text-sm">{opportunity.expectedClose}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Assigned To:</span>
                        <span className="text-sm">{opportunity.assignedTo}</span>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Update Stage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leads" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {leads.map((lead) => (
                <Card key={lead.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{lead.name}</CardTitle>
                        <p className="text-sm text-gray-600">{lead.company}</p>
                      </div>
                      <Badge variant="outline">{lead.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{lead.email}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{lead.phone}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Source:</span>
                        <span className="text-sm">{lead.source}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Assigned To:</span>
                        <span className="text-sm">{lead.assignedTo}</span>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          Convert to Contact
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-violet-600">{contacts.length}</div>
                  <p className="text-sm text-gray-600">Active contacts in CRM</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pipeline Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">$210,000</div>
                  <p className="text-sm text-gray-600">Total opportunity value</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">68%</div>
                  <p className="text-sm text-gray-600">Lead to customer conversion</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Avg Deal Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-orange-600">$105,000</div>
                  <p className="text-sm text-gray-600">Average opportunity value</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Contact Details Dialog */}
      <Dialog open={!!selectedContact} onOpenChange={() => setSelectedContact(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedContact?.name}</DialogTitle>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Company</h4>
                  <p className="text-sm text-gray-600">{selectedContact.company}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Role</h4>
                  <p className="text-sm text-gray-600">{selectedContact.role}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-sm text-gray-600">{selectedContact.email}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Phone</h4>
                  <p className="text-sm text-gray-600">{selectedContact.phone}</p>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Notes</h4>
                <p className="text-sm text-gray-600">{selectedContact.notes}</p>
              </div>
              <div>
                <h4 className="font-semibold">Tags</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedContact.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Contact Dialog */}
      <Dialog open={showAddContactDialog} onOpenChange={setShowAddContactDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Contact</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Name</label>
                <Input placeholder="Full name" />
              </div>
              <div>
                <label className="text-sm font-medium">Company</label>
                <Input placeholder="Company name" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <Input placeholder="Email address" />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input placeholder="Phone number" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="shipper">Shipper</SelectItem>
                    <SelectItem value="carrier">Carrier</SelectItem>
                    <SelectItem value="broker">Broker</SelectItem>
                    <SelectItem value="vendor">Vendor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="prospect">Prospect</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Notes</label>
              <Input placeholder="Additional notes..." />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddContactDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddContact}>
                Add Contact
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Opportunity Dialog */}
      <Dialog open={showAddOpportunityDialog} onOpenChange={setShowAddOpportunityDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Opportunity</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input placeholder="Opportunity title" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Contact</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contact" />
                  </SelectTrigger>
                  <SelectContent>
                    {contacts.map(contact => (
                      <SelectItem key={contact.id} value={contact.id}>
                        {contact.name} - {contact.company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Value</label>
                <Input placeholder="$0.00" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Stage</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="prospecting">Prospecting</SelectItem>
                    <SelectItem value="qualification">Qualification</SelectItem>
                    <SelectItem value="proposal">Proposal</SelectItem>
                    <SelectItem value="negotiation">Negotiation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Expected Close</label>
                <Input type="date" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Input placeholder="Opportunity description..." />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowAddOpportunityDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddOpportunity}>
                Add Opportunity
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CRMPortal;
