
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  Search, 
  Filter, 
  Plus, 
  Edit, 
  Trash2, 
  Users,
  Building,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

export const PartnersList: React.FC = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPartner, setNewPartner] = useState({
    name: '',
    type: 'carrier',
    email: '',
    phone: '',
    address: '',
    ediId: '',
    status: 'active'
  });

  const partners = [
    {
      id: 1,
      name: 'ABC Logistics Inc.',
      type: 'carrier',
      email: 'edi@abclogistics.com',
      phone: '+1 (555) 123-4567',
      address: '123 Transport Ave, Dallas, TX 75201',
      ediId: 'ABC001',
      status: 'active',
      lastActivity: '2024-06-17 09:30',
      totalTransactions: 1247,
      successRate: 98.5
    },
    {
      id: 2,
      name: 'XYZ Transport LLC',
      type: 'carrier',
      email: 'operations@xyztransport.com',
      phone: '+1 (555) 234-5678',
      address: '456 Freight Blvd, Houston, TX 77001',
      ediId: 'XYZ002',
      status: 'active',
      lastActivity: '2024-06-17 08:45',
      totalTransactions: 892,
      successRate: 96.2
    },
    {
      id: 3,
      name: 'Global Freight Solutions',
      type: 'broker',
      email: 'edi@globalfreight.com',
      phone: '+1 (555) 345-6789',
      address: '789 Commerce St, Atlanta, GA 30301',
      ediId: 'GFS003',
      status: 'inactive',
      lastActivity: '2024-06-15 14:20',
      totalTransactions: 567,
      successRate: 94.8
    },
    {
      id: 4,
      name: 'Swift Delivery Corp',
      type: 'carrier',
      email: 'systems@swiftdelivery.com',
      phone: '+1 (555) 456-7890',
      address: '321 Express Way, Phoenix, AZ 85001',
      ediId: 'SDC004',
      status: 'pending',
      lastActivity: '2024-06-16 16:15',
      totalTransactions: 234,
      successRate: 99.1
    },
    {
      id: 5,
      name: 'Metro Shipping Ltd',
      type: 'shipper',
      email: 'edi@metroshipping.com',
      phone: '+1 (555) 567-8901',
      address: '654 Industrial Dr, Chicago, IL 60601',
      ediId: 'MSL005',
      status: 'active',
      lastActivity: '2024-06-17 07:20',
      totalTransactions: 1456,
      successRate: 97.3
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-red-100 text-red-800">Inactive</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'carrier':
        return <Building className="h-4 w-4" />;
      case 'broker':
        return <Users className="h-4 w-4" />;
      case 'shipper':
        return <MapPin className="h-4 w-4" />;
      default:
        return <Building className="h-4 w-4" />;
    }
  };

  const handleAddPartner = () => {
    if (!newPartner.name || !newPartner.email || !newPartner.ediId) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Partner Added",
      description: `${newPartner.name} has been added successfully.`,
    });

    setNewPartner({
      name: '',
      type: 'carrier',
      email: '',
      phone: '',
      address: '',
      ediId: '',
      status: 'active'
    });
    setShowAddForm(false);
  };

  const handleEditPartner = (id: number) => {
    toast({
      title: "Edit Partner",
      description: "Partner edit form would open here.",
    });
  };

  const handleDeletePartner = (id: number) => {
    toast({
      title: "Partner Deleted",
      description: "EDI partner has been removed from the system.",
    });
  };

  const filteredPartners = partners.filter(partner =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.ediId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">EDI Partners</h1>
          <p className="text-muted-foreground">Manage your EDI trading partners and connections</p>
        </div>
        <Button onClick={() => setShowAddForm(!showAddForm)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Partner
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partners.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partners.filter(p => p.status === 'active').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Setup</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partners.filter(p => p.status === 'pending').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
            <XCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96.8%</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Partner Form */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>Add New EDI Partner</CardTitle>
            <CardDescription>
              Enter the details for your new EDI trading partner
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="partnerName">Partner Name *</Label>
                <Input
                  id="partnerName"
                  placeholder="Company Name"
                  value={newPartner.name}
                  onChange={(e) => setNewPartner({...newPartner, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerType">Type</Label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={newPartner.type}
                  onChange={(e) => setNewPartner({...newPartner, type: e.target.value})}
                >
                  <option value="carrier">Carrier</option>
                  <option value="broker">Broker</option>
                  <option value="shipper">Shipper</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerEmail">Email *</Label>
                <Input
                  id="partnerEmail"
                  type="email"
                  placeholder="edi@partner.com"
                  value={newPartner.email}
                  onChange={(e) => setNewPartner({...newPartner, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerPhone">Phone</Label>
                <Input
                  id="partnerPhone"
                  placeholder="+1 (555) 123-4567"
                  value={newPartner.phone}
                  onChange={(e) => setNewPartner({...newPartner, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerEdiId">EDI ID *</Label>
                <Input
                  id="partnerEdiId"
                  placeholder="EDI123"
                  value={newPartner.ediId}
                  onChange={(e) => setNewPartner({...newPartner, ediId: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnerStatus">Status</Label>
                <select 
                  className="w-full p-2 border rounded-md"
                  value={newPartner.status}
                  onChange={(e) => setNewPartner({...newPartner, status: e.target.value})}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="partnerAddress">Address</Label>
              <Input
                id="partnerAddress"
                placeholder="123 Street, City, State, ZIP"
                value={newPartner.address}
                onChange={(e) => setNewPartner({...newPartner, address: e.target.value})}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleAddPartner}>Add Partner</Button>
              <Button variant="outline" onClick={() => setShowAddForm(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search partners by name, email, or EDI ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Partners Table */}
      <Card>
        <CardHeader>
          <CardTitle>EDI Partners Directory</CardTitle>
          <CardDescription>
            Manage your trading partners and monitor their EDI activity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Partner</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>EDI ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transactions</TableHead>
                <TableHead>Success Rate</TableHead>
                <TableHead>Last Activity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((partner) => (
                <TableRow key={partner.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{partner.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {partner.address.split(',').slice(-2).join(',')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(partner.type)}
                      <span className="capitalize">{partner.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="h-3 w-3" />
                        {partner.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {partner.phone}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono">{partner.ediId}</TableCell>
                  <TableCell>{getStatusBadge(partner.status)}</TableCell>
                  <TableCell>{partner.totalTransactions.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-12 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{width: `${partner.successRate}%`}}
                        ></div>
                      </div>
                      <span className="text-sm">{partner.successRate}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{partner.lastActivity}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEditPartner(partner.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleDeletePartner(partner.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
