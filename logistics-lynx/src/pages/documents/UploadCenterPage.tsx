import { useState } from 'react';
import { Upload, Search, Plus, Download, Eye, Edit, Trash2, Filter, File, Image, FileText, Video, Archive, FolderOpen, Cloud, HardDrive } from 'lucide-react';
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
import { Progress } from '@/components/ui/progress';

const uploadedFilesData = [
  {
    id: 'FILE-001',
    fileName: 'driver-license-john-smith.pdf',
    fileType: 'PDF',
    category: 'Driver Documents',
    size: '2.4 MB',
    uploadDate: '2024-02-20',
    uploadedBy: 'Admin User',
    status: 'processed',
    tags: ['driver-license', 'john-smith', 'documentation'],
    folder: 'Driver Documents/John Smith'
  },
  {
    id: 'FILE-002',
    fileName: 'truck-001-inspection-report.pdf',
    fileType: 'PDF',
    category: 'Inspection Reports',
    size: '1.8 MB',
    uploadDate: '2024-02-19',
    uploadedBy: 'Mike Johnson',
    status: 'processed',
    tags: ['inspection', 'truck-001', 'safety'],
    folder: 'Inspection Reports/2024'
  },
  {
    id: 'FILE-003',
    fileName: 'insurance-policy-liability.pdf',
    fileType: 'PDF',
    category: 'Insurance Documents',
    size: '856 KB',
    uploadDate: '2024-02-18',
    uploadedBy: 'Sarah Wilson',
    status: 'processed',
    tags: ['insurance', 'liability', 'policy'],
    folder: 'Insurance/Policies'
  },
  {
    id: 'FILE-004',
    fileName: 'maintenance-photos-brake-repair.zip',
    fileType: 'ZIP',
    category: 'Maintenance Records',
    size: '12.3 MB',
    uploadDate: '2024-02-17',
    uploadedBy: 'Tom Anderson',
    status: 'processing',
    tags: ['maintenance', 'photos', 'brake-repair'],
    folder: 'Maintenance/Photos'
  },
  {
    id: 'FILE-005',
    fileName: 'contract-global-logistics.docx',
    fileType: 'DOCX',
    category: 'Contracts & Agreements',
    size: '445 KB',
    uploadDate: '2024-02-16',
    uploadedBy: 'Legal Team',
    status: 'pending-review',
    tags: ['contract', 'global-logistics', 'agreement'],
    folder: 'Contracts/2024'
  }
];

const folderStructureData = [
  {
    name: 'Driver Documents',
    type: 'folder',
    size: '45.2 MB',
    items: 28,
    lastModified: '2024-02-20'
  },
  {
    name: 'Vehicle Registration',
    type: 'folder',
    size: '12.8 MB',
    items: 15,
    lastModified: '2024-02-19'
  },
  {
    name: 'Insurance Documents',
    type: 'folder',
    size: '38.5 MB',
    items: 22,
    lastModified: '2024-02-18'
  },
  {
    name: 'Inspection Reports',
    type: 'folder',
    size: '156.3 MB',
    items: 89,
    lastModified: '2024-02-17'
  },
  {
    name: 'Maintenance Records',
    type: 'folder',
    size: '234.7 MB',
    items: 124,
    lastModified: '2024-02-16'
  },
  {
    name: 'Contracts & Agreements',
    type: 'folder',
    size: '18.9 MB',
    items: 34,
    lastModified: '2024-02-15'
  }
];

export default function UploadCenterPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('files');
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processed': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending-review': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'quarantined': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Driver Documents': return 'bg-blue-100 text-blue-800';
      case 'Vehicle Registration': return 'bg-green-100 text-green-800';
      case 'Insurance Documents': return 'bg-purple-100 text-purple-800';
      case 'Inspection Reports': return 'bg-orange-100 text-orange-800';
      case 'Maintenance Records': return 'bg-red-100 text-red-800';
      case 'Contracts & Agreements': return 'bg-indigo-100 text-indigo-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType.toLowerCase()) {
      case 'pdf': return <FileText className="h-4 w-4 text-red-600" />;
      case 'docx':
      case 'doc': return <FileText className="h-4 w-4 text-blue-600" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif': return <Image className="h-4 w-4 text-green-600" />;
      case 'mp4':
      case 'avi':
      case 'mov': return <Video className="h-4 w-4 text-purple-600" />;
      case 'zip':
      case 'rar':
      case '7z': return <Archive className="h-4 w-4 text-orange-600" />;
      default: return <File className="h-4 w-4 text-gray-600" />;
    }
  };

  const totalFiles = uploadedFilesData.length;
  const processedFiles = uploadedFilesData.filter(f => f.status === 'processed').length;
  const processingFiles = uploadedFilesData.filter(f => f.status === 'processing').length;
  const pendingReview = uploadedFilesData.filter(f => f.status === 'pending-review').length;
  const totalSize = uploadedFilesData.reduce((sum, file) => {
    const sizeInMB = parseFloat(file.size.replace(' MB', '').replace(' KB', '').replace(' GB', ''));
    const multiplier = file.size.includes('GB') ? 1024 : file.size.includes('KB') ? 0.001 : 1;
    return sum + (sizeInMB * multiplier);
  }, 0);
  const totalFolders = folderStructureData.length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Upload Center</h1>
          <p className="text-muted-foreground">Centralized document upload and file management system</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Upload Documents</DialogTitle>
                <DialogDescription>Upload new documents to the system</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Document Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="driver-docs">Driver Documents</SelectItem>
                      <SelectItem value="vehicle-reg">Vehicle Registration</SelectItem>
                      <SelectItem value="insurance">Insurance Documents</SelectItem>
                      <SelectItem value="inspection">Inspection Reports</SelectItem>
                      <SelectItem value="maintenance">Maintenance Records</SelectItem>
                      <SelectItem value="contracts">Contracts & Agreements</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="folder">Destination Folder</Label>
                  <Input id="folder" placeholder="e.g., Driver Documents/John Smith" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input id="tags" placeholder="e.g., driver-license, john-smith, documentation" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="Brief description of the uploaded files" />
                </div>
                
                {/* File Upload Area */}
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900">Drop files here or click to browse</p>
                  <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX, JPG, PNG, ZIP files up to 50MB each</p>
                  <Button variant="outline" className="mt-4">
                    Choose Files
                  </Button>
                </div>

                {/* Upload Progress (shown when uploading) */}
                {uploadProgress > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading files...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="w-full" />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <Switch id="autoProcess" />
                  <Label htmlFor="autoProcess">Auto-process files after upload</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" />
                  <Label htmlFor="notifications">Send notification when processing is complete</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsUploadDialogOpen(false)}>Cancel</Button>
                <Button>Upload Files</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Bulk Download
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <File className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Files</p>
                <p className="text-2xl font-bold">{totalFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Folders</p>
                <p className="text-2xl font-bold">{totalFolders}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Processed</p>
                <p className="text-2xl font-bold">{processedFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Processing</p>
                <p className="text-2xl font-bold">{processingFiles}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">{pendingReview}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Size</p>
                <p className="text-2xl font-bold">{totalSize.toFixed(1)} MB</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="files">All Files</TabsTrigger>
          <TabsTrigger value="folders">Folder Structure</TabsTrigger>
        </TabsList>

        <TabsContent value="files" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search files..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="processed">Processed</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="pending-review">Pending Review</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Files Table */}
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Files</CardTitle>
              <CardDescription>All files uploaded to the document management system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>File ID</TableHead>
                    <TableHead>File Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Upload Date</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Folder</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadedFilesData.map((file) => (
                    <TableRow key={file.id}>
                      <TableCell className="font-medium">{file.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getFileIcon(file.fileType)}
                          <span className="truncate max-w-48">{file.fileName}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{file.fileType}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(file.category)}>
                          {file.category}
                        </Badge>
                      </TableCell>
                      <TableCell>{file.size}</TableCell>
                      <TableCell>{file.uploadDate}</TableCell>
                      <TableCell>{file.uploadedBy}</TableCell>
                      <TableCell className="truncate max-w-32">{file.folder}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(file.status)}>
                          {file.status}
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
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
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
        </TabsContent>

        <TabsContent value="folders" className="space-y-4">
          {/* Folder Structure Table */}
          <Card>
            <CardHeader>
              <CardTitle>Folder Structure</CardTitle>
              <CardDescription>Organized folder structure for document management</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Folder Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Last Modified</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {folderStructureData.map((folder, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <FolderOpen className="h-4 w-4 text-blue-600" />
                          <span className="font-medium">{folder.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{folder.type}</Badge>
                      </TableCell>
                      <TableCell>{folder.size}</TableCell>
                      <TableCell>{folder.items} files</TableCell>
                      <TableCell>{folder.lastModified}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Plus className="h-4 w-4" />
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