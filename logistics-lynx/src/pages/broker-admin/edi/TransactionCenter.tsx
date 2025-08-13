import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FileText, 
  Search, 
  Filter, 
  Download, 
  Upload, 
  Eye, 
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  DollarSign,
  MapPin
} from 'lucide-react';

const TransactionCenter: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');

  const transactions = [
    {
      id: "TXN-2024-001847",
      type: "EDI 204",
      typeName: "Load Tender",
      partner: "ABC Logistics",
      status: "processed",
      timestamp: "2024-01-15 14:30:22",
      amount: "$2,850.00",
      reference: "PO-789456",
      route: "Chicago, IL → Dallas, TX",
      icon: Truck
    },
    {
      id: "TXN-2024-001846", 
      type: "EDI 210",
      typeName: "Freight Invoice",
      partner: "MegaHaul Corp",
      status: "pending",
      timestamp: "2024-01-15 14:28:15",
      amount: "$4,125.75",
      reference: "INV-445789",
      route: "Miami, FL → Atlanta, GA",
      icon: DollarSign
    },
    {
      id: "TXN-2024-001845",
      type: "EDI 214", 
      typeName: "Status Update",
      partner: "QuickShip LLC",
      status: "processed",
      timestamp: "2024-01-15 14:25:08",
      amount: "-",
      reference: "SHP-336742",
      route: "Los Angeles, CA → Phoenix, AZ",
      icon: MapPin
    },
    {
      id: "TXN-2024-001844",
      type: "EDI 990",
      typeName: "Load Response", 
      partner: "TruckMaster",
      status: "failed",
      timestamp: "2024-01-15 14:22:33",
      amount: "$3,200.00",
      reference: "RES-887321",
      route: "Denver, CO → Salt Lake City, UT",
      icon: Truck
    },
    {
      id: "TXN-2024-001843",
      type: "EDI 997",
      typeName: "Acknowledgment",
      partner: "FastTruck Inc", 
      status: "processed",
      timestamp: "2024-01-15 14:19:45",
      amount: "-",
      reference: "ACK-994578",
      route: "-",
      icon: CheckCircle
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processed': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'processed': return <Badge variant="default">Processed</Badge>;
      case 'pending': return <Badge variant="secondary">Pending</Badge>;
      case 'failed': return <Badge variant="destructive">Failed</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = searchTerm === '' || 
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.reference.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesType = typeFilter === 'all' || transaction.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="container-responsive space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">EDI Transaction Center</h1>
          <p className="text-muted-foreground">
            Monitor and manage all EDI transactions in real-time
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Upload className="h-4 w-4" />
            Bulk Upload
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Transaction Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, partner, or reference..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="processed">Processed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="EDI 204">EDI 204</SelectItem>
                <SelectItem value="EDI 210">EDI 210</SelectItem>
                <SelectItem value="EDI 214">EDI 214</SelectItem>
                <SelectItem value="EDI 990">EDI 990</SelectItem>
                <SelectItem value="EDI 997">EDI 997</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transaction Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="all">All Transactions</TabsTrigger>
          <TabsTrigger value="204">EDI 204</TabsTrigger>
          <TabsTrigger value="210">EDI 210</TabsTrigger>
          <TabsTrigger value="214">EDI 214</TabsTrigger>
          <TabsTrigger value="990">EDI 990</TabsTrigger>
          <TabsTrigger value="997">EDI 997</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Transaction List */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                {filteredTransactions.length} transactions found
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <transaction.icon className="h-8 w-8 p-2 bg-primary/10 text-primary rounded" />
                    
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-6 gap-4">
                      <div>
                        <div className="font-medium">{transaction.id}</div>
                        <div className="text-sm text-muted-foreground">{transaction.timestamp}</div>
                      </div>
                      
                      <div>
                        <Badge variant="outline">{transaction.type}</Badge>
                        <div className="text-sm text-muted-foreground mt-1">{transaction.typeName}</div>
                      </div>
                      
                      <div>
                        <div className="font-medium">{transaction.partner}</div>
                        <div className="text-sm text-muted-foreground">{transaction.reference}</div>
                      </div>
                      
                      <div>
                        <div className="font-medium">{transaction.amount}</div>
                        <div className="text-sm text-muted-foreground">{transaction.route}</div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {getStatusIcon(transaction.status)}
                        {getStatusBadge(transaction.status)}
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Individual EDI Type Tabs */}
        {['204', '210', '214', '990', '997'].map(type => (
          <TabsContent key={type} value={type}>
            <Card>
              <CardHeader>
                <CardTitle>EDI {type} Transactions</CardTitle>
                <CardDescription>
                  Filtered view for EDI {type} transaction type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <p>EDI {type} specific view will be displayed here</p>
                  <p className="text-sm">Advanced filtering and processing options for this transaction type</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TransactionCenter;