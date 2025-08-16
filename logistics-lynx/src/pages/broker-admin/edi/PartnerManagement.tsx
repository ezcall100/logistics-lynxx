/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Plus, 
  Search, 
  Settings, 
  Activity, 
  Shield, 
  Globe, 
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  Edit,
  Trash2,
  Eye,
  Download
} from 'lucide-react';

const PartnerManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);

  const partners = [
    {
      id: "PTR-001",
      name: "ABC Logistics",
      type: "Carrier",
      status: "active",
      lastSync: "2024-01-15 14:30:22",
      ediTypes: ["204", "210", "214", "990"],
      connection: "connected",
      successRate: 99.2,
      totalTransactions: 2847,
      monthlyVolume: "$125,000",
      contactPerson: "John Smith",
      email: "john@abclogistics.com",
      phone: "(555) 123-4567"
    },
    {
      id: "PTR-002", 
      name: "MegaHaul Corporation",
      type: "Carrier",
      status: "active",
      lastSync: "2024-01-15 14:28:15",
      ediTypes: ["204", "210", "214"],
      connection: "connected",
      successRate: 98.9,
      totalTransactions: 1592,
      monthlyVolume: "$89,500",
      contactPerson: "Sarah Johnson",
      email: "sarah@megahaul.com",
      phone: "(555) 987-6543"
    },
    {
      id: "PTR-003",
      name: "QuickShip LLC",
      type: "Shipper",
      status: "active", 
      lastSync: "2024-01-15 14:25:08",
      ediTypes: ["204", "214", "997"],
      connection: "warning",
      successRate: 97.5,
      totalTransactions: 987,
      monthlyVolume: "$67,200",
      contactPerson: "Mike Davis",
      email: "mike@quickship.com",
      phone: "(555) 456-7890"
    },
    {
      id: "PTR-004",
      name: "TruckMaster Inc",
      type: "Owner-Operator",
      status: "pending",
      lastSync: "2024-01-15 12:15:33",
      ediTypes: ["204", "990"],
      connection: "disconnected",
      successRate: 94.8,
      totalTransactions: 234,
      monthlyVolume: "$23,400",
      contactPerson: "Robert Wilson",
      email: "rob@truckmaster.com", 
      phone: "(555) 321-0987"
    },
    {
      id: "PTR-005",
      name: "FastTruck Express",
      type: "Carrier",
      status: "active",
      lastSync: "2024-01-15 14:19:45",
      ediTypes: ["204", "210", "214", "990", "997"],
      connection: "connected",
      successRate: 99.7,
      totalTransactions: 3421,
      monthlyVolume: "$198,750",
      contactPerson: "Lisa Chen",
      email: "lisa@fasttruck.com",
      phone: "(555) 789-0123"
    }
  ];

  const getConnectionStatus = (connection: string) => {
    switch (connection) {
      case 'connected': return { icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-100' };
      case 'warning': return { icon: AlertTriangle, color: 'text-yellow-600', bg: 'bg-yellow-100' };
      case 'disconnected': return { icon: Clock, color: 'text-red-600', bg: 'bg-red-100' };
      default: return { icon: Clock, color: 'text-gray-600', bg: 'bg-gray-100' };
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge variant="default">Active</Badge>;
      case 'pending': return <Badge variant="secondary">Pending</Badge>;
      case 'inactive': return <Badge variant="destructive">Inactive</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredPartners = partners.filter(partner =>
    searchTerm === '' || 
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">EDI Partner Management</h1>
          <p className="text-muted-foreground">
            Manage trading partners and EDI connections
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Dialog open={isAddPartnerOpen} onOpenChange={setIsAddPartnerOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Partner
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Trading Partner</DialogTitle>
                <DialogDescription>
                  Configure a new EDI trading partner connection
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Input placeholder="Partner Name" />
                <Input placeholder="Contact Person" />
                <Input placeholder="Email Address" />
                <Input placeholder="Phone Number" />
                <div className="flex gap-2">
                  <Button onClick={() => setIsAddPartnerOpen(false)}>Add Partner</Button>
                  <Button variant="outline" onClick={() => setIsAddPartnerOpen(false)}>Cancel</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Partners</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partners.length}</div>
            <p className="text-xs text-muted-foreground">Active connections</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Connected</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{partners.filter(p => p.connection === 'connected').length}</div>
            <p className="text-xs text-muted-foreground">Online partners</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Success Rate</CardTitle>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(partners.reduce((acc, p) => acc + p.successRate, 0) / partners.length).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Transaction success</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Volume</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$503K</div>
            <p className="text-xs text-muted-foreground">Combined volume</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Partners
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, type, or contact person..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
        </CardContent>
      </Card>

      {/* Partners List */}
      <Card>
        <CardHeader>
          <CardTitle>Trading Partners</CardTitle>
          <CardDescription>
            {filteredPartners.length} partners found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPartners.map((partner) => {
              const connectionStatus = getConnectionStatus(partner.connection);
              const ConnectionIcon = connectionStatus.icon;
              
              return (
                <div key={partner.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className={`p-2 rounded-full ${connectionStatus.bg}`}>
                    <ConnectionIcon className={`h-6 w-6 ${connectionStatus.color}`} />
                  </div>
                  
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                    <div>
                      <div className="font-medium">{partner.name}</div>
                      <div className="text-sm text-muted-foreground">{partner.id}</div>
                    </div>
                    
                    <div>
                      <Badge variant="outline">{partner.type}</Badge>
                      <div className="text-sm text-muted-foreground mt-1">
                        {partner.ediTypes.map(type => `EDI ${type}`).join(', ')}
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-medium">{partner.contactPerson}</div>
                      <div className="text-sm text-muted-foreground">{partner.email}</div>
                    </div>
                    
                    <div>
                      <div className="font-medium">{partner.successRate}%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                    
                    <div>
                      <div className="font-medium">{partner.monthlyVolume}</div>
                      <div className="text-sm text-muted-foreground">Monthly Volume</div>
                    </div>
                    
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnerManagement;