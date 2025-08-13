import { useState } from 'react';
import { Archive, Search, Download, Eye, Edit, RotateCcw, Trash2, Filter, Calendar, FileText, User, HardDrive, Clock, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const archivedDocumentsData = [
  {
    id: 'ARC-001',
    documentName: 'Contract-GlobalLogistics-2023.pdf',
    originalCategory: 'Contracts & Agreements',
    archivedDate: '2024-01-15',
    archivedBy: 'System Auto-Archive',
    originalFolder: 'Contracts/2023',
    archiveReason: 'Contract Expired',
    retentionPeriod: '7 years',
    size: '2.4 MB',
    lastModified: '2023-12-31',
    canRestore: true,
    priority: 'medium'
  },
  {
    id: 'ARC-002',
    documentName: 'Driver-License-Michael-Brown-Expired.pdf',
    originalCategory: 'Driver Documents',
    archivedDate: '2024-02-01',
    archivedBy: 'Sarah Wilson',
    originalFolder: 'Driver Documents/Michael Brown',
    archiveReason: 'Document Expired',
    retentionPeriod: '5 years',
    size: '1.2 MB',
    lastModified: '2023-08-15',
    canRestore: true,
    priority: 'low'
  },
  {
    id: 'ARC-003',
    documentName: 'Insurance-Policy-Old-Provider.pdf',
    originalCategory: 'Insurance Documents',
    archivedDate: '2024-01-30',
    archivedBy: 'Insurance Team',
    originalFolder: 'Insurance/Policies/2023',
    archiveReason: 'Policy Replaced',
    retentionPeriod: '10 years',
    size: '3.8 MB',
    lastModified: '2023-12-01',
    canRestore: false,
    priority: 'high'
  },
  {
    id: 'ARC-004',
    documentName: 'Maintenance-Records-TRK-005-Sold.zip',
    originalCategory: 'Maintenance Records',
    archivedDate: '2024-02-10',
    archivedBy: 'Fleet Manager',
    originalFolder: 'Maintenance/TRK-005',
    archiveReason: 'Vehicle Sold',
    retentionPeriod: '3 years',
    size: '45.6 MB',
    lastModified: '2024-01-15',
    canRestore: true,
    priority: 'medium'
  }
];

const archivePoliciesData = [
  {
    id: 'POL-001',
    policyName: 'Contract Document Retention',
    category: 'Contracts & Agreements',
    retentionPeriod: '7 years',
    autoArchive: true,
    archiveCondition: 'Contract expiry + 30 days',
    status: 'active',
    lastUpdated: '2024-01-15',
    documents: 45
  },
  {
    id: 'POL-002',
    policyName: 'Driver Document Archive',
    category: 'Driver Documents',
    retentionPeriod: '5 years',
    autoArchive: true,
    archiveCondition: 'Document expiry + 60 days',
    status: 'active',
    lastUpdated: '2024-01-20',
    documents: 89
  },
  {
    id: 'POL-003',
    policyName: 'Vehicle Maintenance Records',
    category: 'Maintenance Records',
    retentionPeriod: '3 years',
    autoArchive: false,
    archiveCondition: 'Manual archive only',
    status: 'active',
    lastUpdated: '2024-02-01',
    documents: 156
  },
  {
    id: 'POL-004',
    policyName: 'Insurance Policy Archive',
    category: 'Insurance Documents',
    retentionPeriod: '10 years',
    autoArchive: true,
    archiveCondition: 'Policy replacement',
    status: 'active',
    lastUpdated: '2024-01-25',
    documents: 23
  }
];

export default function ArchivePage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('archived');
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Contracts & Agreements': return 'bg-blue-100 text-blue-800';
      case 'Driver Documents': return 'bg-green-100 text-green-800';
      case 'Insurance Documents': return 'bg-purple-100 text-purple-800';
      case 'Maintenance Records': return 'bg-orange-100 text-orange-800';
      case 'Vehicle Registration': return 'bg-red-100 text-red-800';
      case 'Inspection Reports': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getReasonColor = (reason: string) => {
    switch (reason) {
      case 'Contract Expired': return 'bg-yellow-100 text-yellow-800';
      case 'Document Expired': return 'bg-red-100 text-red-800';
      case 'Policy Replaced': return 'bg-blue-100 text-blue-800';
      case 'Vehicle Sold': return 'bg-purple-100 text-purple-800';
      case 'Employee Terminated': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalArchived = archivedDocumentsData.length;
  const totalPolicies = archivePoliciesData.length;
  const activePolicies = archivePoliciesData.filter(p => p.status === 'active').length;
  const restorableDocuments = archivedDocumentsData.filter(d => d.canRestore).length;
  const totalArchivedSize = archivedDocumentsData.reduce((sum, doc) => {
    const sizeInMB = parseFloat(doc.size.replace(' MB', '').replace(' KB', '').replace(' GB', ''));
    const multiplier = doc.size.includes('GB') ? 1024 : doc.size.includes('KB') ? 0.001 : 1;
    return sum + (sizeInMB * multiplier);
  }, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Document Archive</h1>
          <p className="text-muted-foreground">Manage archived documents and retention policies</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Bulk Restore
          </Button>
          <Button variant="outline">
            <Archive className="h-4 w-4 mr-2" />
            Export Archive
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Archive className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Archived Documents</p>
                <p className="text-2xl font-bold">{totalArchived}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <RotateCcw className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Restorable</p>
                <p className="text-2xl font-bold">{restorableDocuments}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Archive Policies</p>
                <p className="text-2xl font-bold">{totalPolicies}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active Policies</p>
                <p className="text-2xl font-bold">{activePolicies}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-sm text-muted-foreground">Archive Size</p>
                <p className="text-2xl font-bold">{totalArchivedSize.toFixed(1)} MB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="archived">Archived Documents</TabsTrigger>
          <TabsTrigger value="policies">Archive Policies</TabsTrigger>
        </TabsList>

        <TabsContent value="archived" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search archived documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-60">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="contracts">Contracts & Agreements</SelectItem>
                <SelectItem value="driver-docs">Driver Documents</SelectItem>
                <SelectItem value="insurance">Insurance Documents</SelectItem>
                <SelectItem value="maintenance">Maintenance Records</SelectItem>
                <SelectItem value="vehicle-reg">Vehicle Registration</SelectItem>
                <SelectItem value="inspection">Inspection Reports</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Archived Documents Table */}
          <Card>
            <CardHeader>
              <CardTitle>Archived Documents</CardTitle>
              <CardDescription>Documents that have been archived according to retention policies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Archive ID</TableHead>
                    <TableHead>Document Name</TableHead>
                    <TableHead>Original Category</TableHead>
                    <TableHead>Archive Reason</TableHead>
                    <TableHead>Archived Date</TableHead>
                    <TableHead>Archived By</TableHead>
                    <TableHead>Retention Period</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {archivedDocumentsData.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">{doc.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Archive className="h-4 w-4 text-gray-400" />
                          <span className="truncate max-w-48">{doc.documentName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(doc.originalCategory)}>
                          {doc.originalCategory}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getReasonColor(doc.archiveReason)}>
                          {doc.archiveReason}
                        </Badge>
                      </TableCell>
                      <TableCell>{doc.archivedDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          {doc.archivedBy}
                        </div>
                      </TableCell>
                      <TableCell>{doc.retentionPeriod}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <Badge className={getPriorityColor(doc.priority)}>
                          {doc.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={doc.canRestore ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {doc.canRestore ? 'Restorable' : 'Permanent'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          {doc.canRestore && (
                            <Dialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <RotateCcw className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Restore Document</DialogTitle>
                                  <DialogDescription>
                                    Restore this document back to the active document system
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="restoreFolder">Restore to Folder</Label>
                                    <Input id="restoreFolder" placeholder="e.g., Contracts/2024" />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="restoreReason">Restore Reason</Label>
                                    <Textarea id="restoreReason" placeholder="Reason for restoring this document" />
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <Switch id="notifyTeam" />
                                    <Label htmlFor="notifyTeam">Notify relevant team members</Label>
                                  </div>
                                </div>
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" onClick={() => setIsRestoreDialogOpen(false)}>Cancel</Button>
                                  <Button>Restore Document</Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Permanently Delete Document</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will permanently delete the archived document.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                                  Delete Permanently
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          {/* Archive Policies Table */}
          <Card>
            <CardHeader>
              <CardTitle>Archive Policies</CardTitle>
              <CardDescription>Document retention and automatic archiving policies</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Policy ID</TableHead>
                    <TableHead>Policy Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Retention Period</TableHead>
                    <TableHead>Auto Archive</TableHead>
                    <TableHead>Archive Condition</TableHead>
                    <TableHead>Documents Affected</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {archivePoliciesData.map((policy) => (
                    <TableRow key={policy.id}>
                      <TableCell className="font-medium">{policy.id}</TableCell>
                      <TableCell>{policy.policyName}</TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(policy.category)}>
                          {policy.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{policy.retentionPeriod}</TableCell>
                      <TableCell>
                        <Badge className={policy.autoArchive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                          {policy.autoArchive ? 'Enabled' : 'Disabled'}
                        </Badge>
                      </TableCell>
                      <TableCell>{policy.archiveCondition}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Database className="h-4 w-4 text-gray-400" />
                          {policy.documents} docs
                        </div>
                      </TableCell>
                      <TableCell>{policy.lastUpdated}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(policy.status)}>
                          {policy.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Calendar className="h-4 w-4" />
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
      </Tabs>
    </div>
  );
}