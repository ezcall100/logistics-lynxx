import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { useToast } from '../ui/use-toast';
import { Search, Filter, Upload, Download, Send, Inbox, FileText, Clock, CheckCircle, AlertCircle, XCircle, RefreshCw, Settings, Users, Activity, BarChart3, Globe, Shield, Database, Zap, Eye, Edit, Trash2, Plus, ArrowUpDown, FileCheck, FileX } from 'lucide-react';
import { useRole } from '../../context/role-context';

// Mock data for EDI
interface EDIDocument {
  id: string;
  type: '850' | '855' | '856' | '810' | '820' | '997' | '214' | '990';
  direction: 'inbound' | 'outbound';
  partner: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'acknowledged';
  timestamp: string;
  size: string;
  description: string;
  reference: string;
  content?: string;
  errors?: string[];
}

interface EDIPartner {
  id: string;
  name: string;
  type: 'shipper' | 'carrier' | 'broker' | 'vendor';
  status: 'active' | 'inactive' | 'testing';
  connectionType: 'AS2' | 'SFTP' | 'API' | 'Email';
  lastActivity: string;
  documentsSent: number;
  documentsReceived: number;
  successRate: number;
  certificates: string[];
}

interface EDITransaction {
  id: string;
  documentType: string;
  partner: string;
  direction: string;
  timestamp: string;
  status: string;
  processingTime: number;
  size: string;
  reference: string;
}

interface EDIMapping {
  id: string;
  name: string;
  sourceFormat: string;
  targetFormat: string;
  status: 'active' | 'inactive' | 'testing';
  lastUsed: string;
  successCount: number;
  errorCount: number;
}

const mockDocuments: EDIDocument[] = [
  {
    id: 'EDI-001',
    type: '850',
    direction: 'inbound',
    partner: 'TechCorp Logistics',
    status: 'completed',
    timestamp: '2024-01-15 10:30:00',
    size: '2.4 KB',
    description: 'Purchase Order - Electronics Shipment',
    reference: 'PO-2024-001',
    content: 'ST*850*0001~BEG*00*SA*PO-2024-001**20240115~REF*DP*001~DTM*002*20240120~N1*ST*TechCorp Logistics~N3*123 Main St~N4*Los Angeles*CA*90210~PO1*1*100*EA*25.00**VP*SKU-001~CTT*1~SE*8*0001~'
  },
  {
    id: 'EDI-002',
    type: '855',
    direction: 'outbound',
    partner: 'Fast Freight Inc',
    status: 'acknowledged',
    timestamp: '2024-01-15 11:15:00',
    size: '1.8 KB',
    description: 'Purchase Order Acknowledgment',
    reference: 'POA-2024-001',
    content: 'ST*855*0001~BAK*00*AC*PO-2024-001**20240115~DTM*002*20240120~N1*ST*Fast Freight Inc~PO1*1*100*EA*25.00**VP*SKU-001~CTT*1~SE*7*0001~'
  },
  {
    id: 'EDI-003',
    type: '856',
    direction: 'outbound',
    partner: 'TechCorp Logistics',
    status: 'processing',
    timestamp: '2024-01-15 14:20:00',
    size: '3.2 KB',
    description: 'Advanced Shipping Notice',
    reference: 'ASN-2024-001',
    content: 'ST*856*0001~BSN*00*ASN-2024-001*20240115*143000~DTM*011*20240120~N1*ST*TechCorp Logistics~N1*SF*Fast Freight Inc~S5*1*100*EA~CTT*1~SE*9*0001~'
  }
];

const mockPartners: EDIPartner[] = [
  {
    id: 'PART-001',
    name: 'TechCorp Logistics',
    type: 'shipper',
    status: 'active',
    connectionType: 'AS2',
    lastActivity: '2024-01-15 14:30:00',
    documentsSent: 45,
    documentsReceived: 67,
    successRate: 98.5,
    certificates: ['cert_techcorp_2024.pem', 'cert_techcorp_backup.pem']
  },
  {
    id: 'PART-002',
    name: 'Fast Freight Inc',
    type: 'carrier',
    status: 'active',
    connectionType: 'SFTP',
    lastActivity: '2024-01-15 13:45:00',
    documentsSent: 23,
    documentsReceived: 34,
    successRate: 96.2,
    certificates: ['cert_fastfreight_2024.pem']
  },
  {
    id: 'PART-003',
    name: 'Global Shipping Co',
    type: 'carrier',
    status: 'testing',
    connectionType: 'API',
    lastActivity: '2024-01-15 12:00:00',
    documentsSent: 5,
    documentsReceived: 8,
    successRate: 85.0,
    certificates: ['cert_globalshipping_test.pem']
  }
];

const mockTransactions: EDITransaction[] = [
  {
    id: 'TXN-001',
    documentType: '850',
    partner: 'TechCorp Logistics',
    direction: 'Inbound',
    timestamp: '2024-01-15 10:30:00',
    status: 'Completed',
    processingTime: 2.3,
    size: '2.4 KB',
    reference: 'PO-2024-001'
  },
  {
    id: 'TXN-002',
    documentType: '855',
    partner: 'Fast Freight Inc',
    direction: 'Outbound',
    timestamp: '2024-01-15 11:15:00',
    status: 'Acknowledged',
    processingTime: 1.8,
    size: '1.8 KB',
    reference: 'POA-2024-001'
  },
  {
    id: 'TXN-003',
    documentType: '856',
    partner: 'TechCorp Logistics',
    direction: 'Outbound',
    timestamp: '2024-01-15 14:20:00',
    status: 'Processing',
    processingTime: 0.0,
    size: '3.2 KB',
    reference: 'ASN-2024-001'
  }
];

const mockMappings: EDIMapping[] = [
  {
    id: 'MAP-001',
    name: 'PO to Internal Format',
    sourceFormat: 'X12 850',
    targetFormat: 'Internal JSON',
    status: 'active',
    lastUsed: '2024-01-15 10:30:00',
    successCount: 156,
    errorCount: 2
  },
  {
    id: 'MAP-002',
    name: 'Internal to ASN',
    sourceFormat: 'Internal JSON',
    targetFormat: 'X12 856',
    status: 'active',
    lastUsed: '2024-01-15 14:20:00',
    successCount: 89,
    errorCount: 1
  }
];

export const EDIPortal: React.FC = () => {
  const { toast } = useToast();
  const { currentRole, roleInfo } = useRole();
  
  const [documents, setDocuments] = useState<EDIDocument[]>(mockDocuments);
  const [partners, setPartners] = useState<EDIPartner[]>(mockPartners);
  const [transactions, setTransactions] = useState<EDITransaction[]>(mockTransactions);
  const [mappings, setMappings] = useState<EDIMapping[]>(mockMappings);
  const [filteredDocuments, setFilteredDocuments] = useState<EDIDocument[]>(mockDocuments);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedDocument, setSelectedDocument] = useState<EDIDocument | null>(null);
  const [showSendDocumentDialog, setShowSendDocumentDialog] = useState(false);
  const [showPartnerDialog, setShowPartnerDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Filter documents based on search and filters
  useEffect(() => {
    const filtered = documents.filter(doc => {
      const matchesSearch = 
        doc.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.partner.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
      const matchesType = typeFilter === 'all' || doc.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
    
    setFilteredDocuments(filtered);
  }, [documents, searchQuery, statusFilter, typeFilter]);

  const handleSendDocument = () => {
    toast({
      title: 'Document Sent',
      description: 'EDI document has been successfully sent to partner.',
      variant: 'default'
    });
    setShowSendDocumentDialog(false);
  };

  const handleAddPartner = () => {
    toast({
      title: 'Partner Added',
      description: 'New EDI trading partner has been successfully added.',
      variant: 'default'
    });
    setShowPartnerDialog(false);
  };

  const getRoleSpecificActions = () => {
    switch (currentRole) {
      case 'shipper_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowSendDocumentDialog(true)} className="bg-slate-600 hover:bg-slate-700">
              <Send className="h-4 w-4 mr-2" />
              Send PO
            </Button>
            <Button variant="outline">
              <Inbox className="h-4 w-4 mr-2" />
              Receive ASN
            </Button>
          </div>
        );
      case 'carrier_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowSendDocumentDialog(true)} className="bg-slate-600 hover:bg-slate-700">
              <Send className="h-4 w-4 mr-2" />
              Send ASN
            </Button>
            <Button variant="outline">
              <Inbox className="h-4 w-4 mr-2" />
              Receive PO
            </Button>
          </div>
        );
      case 'freight_broker_admin':
        return (
          <div className="flex space-x-2">
            <Button onClick={() => setShowSendDocumentDialog(true)} className="bg-slate-600 hover:bg-slate-700">
              <Send className="h-4 w-4 mr-2" />
              Send Document
            </Button>
            <Button onClick={() => setShowPartnerDialog(true)} variant="outline">
              <Users className="h-4 w-4 mr-2" />
              Add Partner
            </Button>
          </div>
        );
      default:
        return (
          <Button onClick={() => setShowSendDocumentDialog(true)} className="bg-slate-600 hover:bg-slate-700">
            <Send className="h-4 w-4 mr-2" />
            Send Document
          </Button>
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'acknowledged': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentTypeName = (type: string) => {
    const typeNames: Record<string, string> = {
      '850': 'Purchase Order',
      '855': 'Purchase Order Acknowledgment',
      '856': 'Advanced Shipping Notice',
      '810': 'Invoice',
      '820': 'Payment Order',
      '997': 'Functional Acknowledgment',
      '214': 'Transportation Carrier Shipment Status',
      '990': 'Response to a Load Tender'
    };
    return typeNames[type] || type;
  };

  const getDirectionIcon = (direction: string) => {
    return direction === 'inbound' ? <Download className="h-4 w-4 text-blue-500" /> : <Upload className="h-4 w-4 text-green-500" />;
  };

  const calculateSuccessRate = () => {
    const completed = documents.filter(doc => doc.status === 'completed' || doc.status === 'acknowledged').length;
    const total = documents.length;
    return total > 0 ? ((completed / total) * 100).toFixed(1) : '0.0';
  };

  const calculateAverageProcessingTime = () => {
    const completedTransactions = transactions.filter(txn => txn.status === 'Completed');
    if (completedTransactions.length === 0) return 0;
    const totalTime = completedTransactions.reduce((sum, txn) => sum + txn.processingTime, 0);
    return (totalTime / completedTransactions.length).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📡 EDI Portal</h1>
              <p className="text-gray-600">Electronic Data Interchange and document management</p>
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
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="mappings">Mappings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* EDI Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-slate-600">{documents.length}</div>
                  <p className="text-xs text-muted-foreground">
                    <CheckCircle className="inline h-3 w-3 text-green-500" /> {calculateSuccessRate()}% success rate
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Partners</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">{partners.filter(p => p.status === 'active').length}</div>
                  <p className="text-xs text-muted-foreground">
                    <Globe className="inline h-3 w-3 text-blue-500" /> {partners.length} total partners
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Avg Processing Time</CardTitle>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{calculateAverageProcessingTime()}s</div>
                  <p className="text-xs text-muted-foreground">
                    <Zap className="inline h-3 w-3 text-orange-500" /> Fast processing
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Health</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">99.7%</div>
                  <p className="text-xs text-muted-foreground">
                    <CheckCircle className="inline h-3 w-3 text-green-500" /> All systems operational
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documents.slice(0, 3).map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          {getDirectionIcon(doc.direction)}
                          <div>
                            <p className="font-medium">{doc.reference}</p>
                            <p className="text-sm text-gray-600">{doc.partner}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{getDocumentTypeName(doc.type)}</p>
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Partner Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {partners.slice(0, 3).map((partner) => (
                      <div key={partner.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{partner.name}</p>
                          <p className="text-sm text-gray-600">{partner.connectionType}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{partner.successRate}%</p>
                          <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
                            {partner.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Search & Filter Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search documents..."
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
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="acknowledged">Acknowledged</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Document Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="850">Purchase Order (850)</SelectItem>
                      <SelectItem value="855">PO Acknowledgment (855)</SelectItem>
                      <SelectItem value="856">Shipping Notice (856)</SelectItem>
                      <SelectItem value="810">Invoice (810)</SelectItem>
                      <SelectItem value="997">Acknowledgment (997)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Documents Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          {getDirectionIcon(doc.direction)}
                          <CardTitle className="text-lg">{doc.reference}</CardTitle>
                        </div>
                        <p className="text-sm text-gray-600">{doc.partner}</p>
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge className={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                          <Badge variant="outline">{getDocumentTypeName(doc.type)}</Badge>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{doc.description}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{doc.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Database className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{doc.size}</span>
                      </div>
                      <div className="flex space-x-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <FileCheck className="h-4 w-4 mr-1" />
                          Validate
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Retry
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="partners" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {partners.map((partner) => (
                <Card key={partner.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{partner.name}</CardTitle>
                        <p className="text-sm text-gray-600">{partner.connectionType} Connection</p>
                      </div>
                      <Badge variant={partner.status === 'active' ? 'default' : 'secondary'}>
                        {partner.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Type:</span>
                        <Badge variant="outline">{partner.type}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Success Rate:</span>
                        <span className="text-sm font-medium">{partner.successRate}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Documents Sent:</span>
                        <span className="text-sm">{partner.documentsSent}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Documents Received:</span>
                        <span className="text-sm">{partner.documentsReceived}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Activity:</span>
                        <span className="text-sm">{partner.lastActivity}</span>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Settings className="h-4 w-4 mr-1" />
                          Configure
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-2">ID</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Partner</th>
                    <th className="text-left p-2">Direction</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Processing Time</th>
                    <th className="text-left p-2">Timestamp</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="border-b hover:bg-gray-50">
                      <td className="p-2 text-sm">{txn.id}</td>
                      <td className="p-2 text-sm">{txn.documentType}</td>
                      <td className="p-2 text-sm">{txn.partner}</td>
                      <td className="p-2 text-sm">{txn.direction}</td>
                      <td className="p-2">
                        <Badge className={getStatusColor(txn.status.toLowerCase())}>
                          {txn.status}
                        </Badge>
                      </td>
                      <td className="p-2 text-sm">{txn.processingTime}s</td>
                      <td className="p-2 text-sm">{txn.timestamp}</td>
                      <td className="p-2">
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="mappings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mappings.map((mapping) => (
                <Card key={mapping.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{mapping.name}</CardTitle>
                        <p className="text-sm text-gray-600">{mapping.sourceFormat} → {mapping.targetFormat}</p>
                      </div>
                      <Badge variant={mapping.status === 'active' ? 'default' : 'secondary'}>
                        {mapping.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Success Count:</span>
                        <span className="text-sm font-medium text-green-600">{mapping.successCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Error Count:</span>
                        <span className="text-sm font-medium text-red-600">{mapping.errorCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Last Used:</span>
                        <span className="text-sm">{mapping.lastUsed}</span>
                      </div>
                      <div className="pt-2">
                        <Button variant="outline" size="sm" className="w-full">
                          <Edit className="h-4 w-4 mr-1" />
                          Edit Mapping
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

      {/* Document Details Dialog */}
      <Dialog open={!!selectedDocument} onOpenChange={() => setSelectedDocument(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedDocument?.reference}</DialogTitle>
          </DialogHeader>
          {selectedDocument && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold">Partner</h4>
                  <p className="text-sm text-gray-600">{selectedDocument.partner}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Document Type</h4>
                  <p className="text-sm text-gray-600">{getDocumentTypeName(selectedDocument.type)}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Direction</h4>
                  <p className="text-sm text-gray-600">{selectedDocument.direction}</p>
                </div>
                <div>
                  <h4 className="font-semibold">Status</h4>
                  <Badge className={getStatusColor(selectedDocument.status)}>
                    {selectedDocument.status}
                  </Badge>
                </div>
              </div>
              <div>
                <h4 className="font-semibold">Description</h4>
                <p className="text-sm text-gray-600">{selectedDocument.description}</p>
              </div>
              <div>
                <h4 className="font-semibold">EDI Content</h4>
                <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
                  {selectedDocument.content}
                </pre>
              </div>
              {selectedDocument.errors && selectedDocument.errors.length > 0 && (
                <div>
                  <h4 className="font-semibold text-red-600">Errors</h4>
                  <ul className="mt-2 space-y-1">
                    {selectedDocument.errors.map((error, index) => (
                      <li key={index} className="text-sm text-red-600">• {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Send Document Dialog */}
      <Dialog open={showSendDocumentDialog} onOpenChange={setShowSendDocumentDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Send EDI Document</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Partner</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select partner" />
                  </SelectTrigger>
                  <SelectContent>
                    {partners.filter(p => p.status === 'active').map(partner => (
                      <SelectItem key={partner.id} value={partner.id}>
                        {partner.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Document Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="850">Purchase Order (850)</SelectItem>
                    <SelectItem value="855">PO Acknowledgment (855)</SelectItem>
                    <SelectItem value="856">Shipping Notice (856)</SelectItem>
                    <SelectItem value="810">Invoice (810)</SelectItem>
                    <SelectItem value="997">Acknowledgment (997)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Reference</label>
              <Input placeholder="Document reference..." />
            </div>
            <div>
              <label className="text-sm font-medium">EDI Content</label>
              <textarea 
                className="w-full p-3 border rounded-md text-sm font-mono" 
                rows={6}
                placeholder="Paste EDI content here..."
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowSendDocumentDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendDocument}>
                Send Document
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Partner Dialog */}
      <Dialog open={showPartnerDialog} onOpenChange={setShowPartnerDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add EDI Trading Partner</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Partner Name</label>
                <Input placeholder="Partner name" />
              </div>
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
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Connection Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select connection" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AS2">AS2</SelectItem>
                    <SelectItem value="SFTP">SFTP</SelectItem>
                    <SelectItem value="API">API</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
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
                    <SelectItem value="testing">Testing</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Connection Details</label>
              <Input placeholder="Connection URL or endpoint" />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowPartnerDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddPartner}>
                Add Partner
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EDIPortal;
