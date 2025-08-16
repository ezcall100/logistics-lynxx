/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Upload, 
  Shield, 
  Truck, 
  UserCheck, 
  Receipt,
  FileCheck,
  AlertTriangle,
  Calendar,
  Clock,
  CheckCircle,
  TrendingUp,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  Edit,
  FolderOpen
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Layout from '@/components/layout/Layout';
import { Link } from 'react-router-dom';

// Sample document data
const recentDocuments = [
  {
    id: '1',
    name: 'BOL-2024-001234',
    type: 'Bill of Lading',
    status: 'completed',
    uploadDate: '2024-02-15',
    expiryDate: null,
    size: '2.4 MB',
    category: 'bol',
    urgency: 'normal'
  },
  {
    id: '2',
    name: 'Driver License - John Smith',
    type: 'Driver License',
    status: 'expires_soon',
    uploadDate: '2024-01-20',
    expiryDate: '2024-03-15',
    size: '1.2 MB',
    category: 'driver',
    urgency: 'high'
  },
  {
    id: '3',
    name: 'Insurance Policy - Fleet Coverage',
    type: 'Insurance',
    status: 'active',
    uploadDate: '2024-02-01',
    expiryDate: '2024-12-31',
    size: '5.7 MB',
    category: 'insurance',
    urgency: 'normal'
  },
  {
    id: '4',
    name: 'Truck Registration - Unit 1001',
    type: 'Vehicle Registration',
    status: 'pending_renewal',
    uploadDate: '2024-01-15',
    expiryDate: '2024-02-28',
    size: '800 KB',
    category: 'vehicle',
    urgency: 'high'
  },
  {
    id: '5',
    name: 'DOT Inspection Report',
    type: 'Inspection',
    status: 'completed',
    uploadDate: '2024-02-10',
    expiryDate: null,
    size: '3.1 MB',
    category: 'inspection',
    urgency: 'normal'
  }
];

const documentStats = {
  total: 1247,
  pending: 23,
  expiring: 8,
  compliance: 98.5,
  processed: 89
};

const documentCategories = [
  { name: 'Bills of Lading', count: 342, icon: FileText, color: 'blue' },
  { name: 'Driver Documents', count: 189, icon: UserCheck, color: 'green' },
  { name: 'Vehicle Records', count: 156, icon: Truck, color: 'orange' },
  { name: 'Insurance', count: 78, icon: Shield, color: 'purple' },
  { name: 'Invoices', count: 234, icon: Receipt, color: 'red' },
  { name: 'Compliance', count: 98, icon: FileCheck, color: 'yellow' },
  { name: 'Contracts', count: 67, icon: FileText, color: 'indigo' },
  { name: 'Inspections', count: 83, icon: CheckCircle, color: 'teal' }
];

const DocumentsDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredDocuments = recentDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || doc.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'expires_soon': return 'bg-yellow-100 text-yellow-800';
      case 'pending_renewal': return 'bg-orange-100 text-orange-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgency: string) => {
    switch (urgency) {
      case 'high': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'medium': return <Clock className="h-4 w-4 text-yellow-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Documents Hub</h1>
            <p className="text-muted-foreground">Centralized document management for your transportation operations</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link to="/carrier-admin/documents/upload">
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </Link>
            </Button>
            <Button asChild>
              <Link to="/carrier-admin/documents/compliance">
                <Shield className="h-4 w-4 mr-2" />
                Compliance Check
              </Link>
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documentStats.total}</div>
              <p className="text-xs text-muted-foreground">+127 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documentStats.pending}</div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{documentStats.expiring}</div>
              <p className="text-xs text-muted-foreground">Next 30 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{documentStats.compliance}%</div>
              <Progress value={documentStats.compliance} className="mt-2" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processed Today</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{documentStats.processed}</div>
              <p className="text-xs text-muted-foreground">+15% vs yesterday</p>
            </CardContent>
          </Card>
        </div>

        {/* Document Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Document Categories</CardTitle>
            <CardDescription>Quick access to different document types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {documentCategories.map((category) => (
                <div
                  key={category.name}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`rounded-full p-2 bg-${category.color}-100`}>
                      <category.icon className={`h-4 w-4 text-${category.color}-600`} />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{category.name}</div>
                      <div className="text-xs text-muted-foreground">{category.count} files</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Documents */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Recent Documents</CardTitle>
                <CardDescription>Latest uploaded and modified documents</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/carrier-admin/documents/archive">
                    <FolderOpen className="h-4 w-4 mr-2" />
                    View All
                  </Link>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                {['all', 'expires_soon', 'pending_renewal', 'completed'].map((filter) => (
                  <Button
                    key={filter}
                    variant={selectedFilter === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedFilter(filter)}
                  >
                    {filter.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </Button>
                ))}
              </div>
            </div>

            {/* Documents Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="rounded-full bg-primary/10 p-2">
                            <FileText className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="flex items-center gap-2 mt-1">
                              {getUrgencyIcon(doc.urgency)}
                              <span className="text-sm text-muted-foreground capitalize">
                                {doc.urgency} priority
                              </span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{doc.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        {doc.expiryDate ? (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            {new Date(doc.expiryDate).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">No expiry</span>
                        )}
                      </TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
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

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common document management tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="h-20 flex-col gap-2">
                <Link to="/carrier-admin/documents/bol">
                  <FileText className="h-6 w-6" />
                  New BOL
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col gap-2">
                <Link to="/carrier-admin/documents/upload">
                  <Upload className="h-6 w-6" />
                  Bulk Upload
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col gap-2">
                <Link to="/carrier-admin/documents/compliance">
                  <Shield className="h-6 w-6" />
                  Compliance Check
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col gap-2">
                <Link to="/carrier-admin/documents/archive">
                  <FolderOpen className="h-6 w-6" />
                  Browse Archive
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default DocumentsDashboard;