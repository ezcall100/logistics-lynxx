/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Upload, 
  Download, 
  Edit, 
  Trash2, 
  Eye,
  Search,
  Plus,
  File,
  FileUser,
  CircleDollarSign
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TemplatesAndDocuments = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const [systemTemplates, setSystemTemplates] = useState([
    {
      id: '1',
      name: 'Software Engineer Offer Letter',
      category: 'HR',
      type: 'Offer Letter',
      description: 'Standard offer letter template for software engineering positions',
      lastModified: '2024-01-10',
      version: '2.1',
      status: 'active',
      usage: 15
    },
    {
      id: '2',
      name: 'Non-Disclosure Agreement',
      category: 'Legal',
      type: 'NDA',
      description: 'Standard NDA for employees and contractors',
      lastModified: '2024-01-05',
      version: '1.3',
      status: 'active',
      usage: 42
    },
    {
      id: '3',
      name: 'Employment Agreement - Full Time',
      category: 'HR',
      type: 'Employment Contract',
      description: 'Comprehensive employment agreement for full-time employees',
      lastModified: '2023-12-20',
      version: '3.0',
      status: 'active',
      usage: 28
    },
    {
      id: '4',
      name: 'Contractor Service Agreement',
      category: 'Legal',
      type: 'Service Agreement',
      description: 'Service agreement template for independent contractors',
      lastModified: '2024-01-08',
      version: '1.5',
      status: 'active',
      usage: 12
    },
    {
      id: '5',
      name: 'Software License Agreement',
      category: 'Legal',
      type: 'License Agreement',
      description: 'End-user license agreement for software products',
      lastModified: '2023-11-15',
      version: '2.0',
      status: 'archived',
      usage: 156
    }
  ]);

  const [documentCategories, setDocumentCategories] = useState([
    {
      id: '1',
      name: 'HR Documents',
      description: 'Human resources related documents and templates',
      count: 12,
      color: 'blue'
    },
    {
      id: '2',
      name: 'Legal Documents',
      description: 'Legal agreements, contracts, and compliance documents',
      count: 8,
      color: 'red'
    },
    {
      id: '3',
      name: 'Financial Documents',
      description: 'Financial agreements, invoices, and payment terms',
      count: 6,
      color: 'green'
    },
    {
      id: '4',
      name: 'Technical Documents',
      description: 'API documentation, technical specifications',
      count: 15,
      color: 'purple'
    }
  ]);

  const [uploadedDocuments, setUploadedDocuments] = useState([
    {
      id: '1',
      name: 'Company Policy Handbook 2024.pdf',
      type: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'Sarah Chen',
      uploadDate: '2024-01-12',
      category: 'HR',
      status: 'approved'
    },
    {
      id: '2',
      name: 'API Integration Guide.docx',
      type: 'Word Document',
      size: '1.8 MB',
      uploadedBy: 'Marcus Rodriguez',
      uploadDate: '2024-01-10',
      category: 'Technical',
      status: 'pending'
    },
    {
      id: '3',
      name: 'Financial Compliance Checklist.xlsx',
      type: 'Excel Spreadsheet',
      size: '456 KB',
      uploadedBy: 'Jennifer Wu',
      uploadDate: '2024-01-08',
      category: 'Financial',
      status: 'approved'
    }
  ]);

  const getCategoryBadge = (category: string) => {
    const variants = {
      'HR': 'default',
      'Legal': 'destructive',
      'Financial': 'secondary',
      'Technical': 'outline'
    } as const;
    
    return (
      <Badge variant={variants[category as keyof typeof variants] || 'outline'}>
        {category}
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'active': 'default',
      'archived': 'secondary',
      'pending': 'outline',
      'approved': 'default'
    } as const;
    
    return (
      <Badge variant={variants[status as keyof typeof variants] || 'outline'}>
        {status}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'offer letter':
      case 'employment contract':
        return <FileUser className="h-4 w-4" />;
      case 'nda':
      case 'service agreement':
      case 'license agreement':
        return <File className="h-4 w-4" />;
      case 'financial':
        return <CircleDollarSign className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const filteredTemplates = systemTemplates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            System Templates
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            Document Library
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <File className="h-4 w-4" />
            Categories
          </TabsTrigger>
        </TabsList>

        {/* System Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  System Templates
                </CardTitle>
                <CardDescription>
                  Pre-built document templates for HR, legal, and business processes
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Template
              </Button>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search templates by name, category, or type..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Version</TableHead>
                    <TableHead>Usage</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell>
                        <div className="flex items-start gap-3">
                          {getTypeIcon(template.type)}
                          <div>
                            <p className="font-medium">{template.name}</p>
                            <p className="text-sm text-muted-foreground">{template.description}</p>
                            <p className="text-xs text-muted-foreground">Modified: {template.lastModified}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {getCategoryBadge(template.category)}
                      </TableCell>
                      <TableCell>{template.type}</TableCell>
                      <TableCell className="font-mono">v{template.version}</TableCell>
                      <TableCell>
                        <span className="text-sm">{template.usage} times</span>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(template.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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

        {/* Document Library Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Document Library
                </CardTitle>
                <CardDescription>
                  Upload and manage company documents with version control
                </CardDescription>
              </div>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </CardHeader>
            <CardContent>
              {/* Upload Area */}
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center mb-6">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-medium mb-2">Upload Documents</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Drag and drop files here or click to browse
                </p>
                <Button variant="outline">Choose Files</Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Supported formats: PDF, DOC, DOCX, XLS, XLSX (Max: 10MB)
                </p>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Uploaded By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadedDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <FileText className="h-4 w-4" />
                          <div>
                            <p className="font-medium">{doc.name}</p>
                            <p className="text-xs text-muted-foreground">Uploaded: {doc.uploadDate}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        {getCategoryBadge(doc.category)}
                      </TableCell>
                      <TableCell>{doc.uploadedBy}</TableCell>
                      <TableCell>
                        {getStatusBadge(doc.status)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
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

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
              <CardTitle className="flex items-center gap-2">
                <File className="h-5 w-5" />
                Document Categories
              </CardTitle>
                <CardDescription>
                  Organize documents into logical categories with access controls
                </CardDescription>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Category
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documentCategories.map((category) => (
                  <Card key={category.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-medium flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full bg-${category.color}-500`}></div>
                          {category.name}
                        </h4>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </div>
                      <Badge variant="outline">{category.count} docs</Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mt-4">
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Digital Signature Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Digital Signature Settings</CardTitle>
              <CardDescription>
                Configure digital signature requirements and integration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Signature Requirements</h4>
                  <div className="space-y-2">
                    <Label htmlFor="signatureProvider">Signature Provider</Label>
                    <Input
                      id="signatureProvider"
                      value="DocuSign"
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="authMethod">Authentication Method</Label>
                    <Input
                      id="authMethod"
                      value="Email + SMS"
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Document Retention</h4>
                  <div className="space-y-2">
                    <Label htmlFor="retentionPeriod">Retention Period</Label>
                    <Input
                      id="retentionPeriod"
                      value="7 years"
                      disabled
                      className="bg-muted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backupLocation">Backup Location</Label>
                    <Input
                      id="backupLocation"
                      value="AWS S3 + Local"
                      disabled
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TemplatesAndDocuments;