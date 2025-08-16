/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Calendar, FileText, CheckCircle, Clock, Plus, Shield, AlertCircle, Upload, Download, Filter, Eye, Edit, Trash2 } from 'lucide-react';
import { useAssetManagement } from '@/hooks/useAssetManagement';

interface ComplianceTabProps {
  searchTerm: string;
}

export const ComplianceTab = ({ searchTerm }: ComplianceTabProps) => {
  const { compliance, loading, handleCreateComplianceItem, handleUpdateComplianceItem } = useAssetManagement();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<unknown>(null);

  const filteredItems = compliance.items.filter(item =>
    item.vehicleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (status) {
      case 'compliant': return 'default';
      case 'due_soon': return 'secondary';
      case 'overdue': return 'destructive';
      case 'pending': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: string): "default" | "secondary" | "outline" | "destructive" => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  const handleSubmitCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const complianceData = {
      vehicleId: formData.get('vehicleId') as string,
      type: formData.get('type') as string,
      description: formData.get('description') as string,
      status: formData.get('status') as string,
      dueDate: formData.get('dueDate') as string,
      priority: formData.get('priority') as string,
      assignedTo: formData.get('assignedTo') as string,
    };
    handleCreateComplianceItem(complianceData);
    setIsCreateOpen(false);
  };

  const handleSubmitDocument = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const documentData = {
      title: formData.get('title'),
      type: formData.get('type'),
      expiryDate: formData.get('expiryDate'),
      vehicle: formData.get('vehicle')
    };
    console.log('Uploading document:', documentData);
    setIsDocumentOpen(false);
  };

  const compliantItems = compliance.items.filter(item => item.status === 'compliant').length;
  const dueSoonItems = compliance.items.filter(item => item.status === 'due_soon').length;
  const overdueItems = compliance.items.filter(item => item.status === 'overdue').length;
  const pendingItems = compliance.items.filter(item => item.status === 'pending').length;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="space-y-0 pb-2">
                <div className="h-4 bg-muted animate-pulse rounded" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted animate-pulse rounded mb-2" />
                <div className="h-3 bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-12 bg-muted animate-pulse rounded" />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Compliance Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="gradient-border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{compliance.items.length}</div>
            <p className="text-xs text-muted-foreground">Requirements tracked</p>
          </CardContent>
        </Card>
        <Card className="gradient-border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Compliant</CardTitle>
            <div className="h-2 w-2 bg-gradient-to-r from-success to-success-light rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{compliantItems}</div>
            <p className="text-xs text-muted-foreground">Up to date</p>
          </CardContent>
        </Card>
        <Card className="gradient-border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Due Soon</CardTitle>
            <div className="h-2 w-2 bg-gradient-to-r from-warning to-warning-light rounded-full" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{dueSoonItems}</div>
            <p className="text-xs text-muted-foreground">Needs attention</p>
          </CardContent>
        </Card>
        <Card className="gradient-border-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gradient">{overdueItems}</div>
            <p className="text-xs text-muted-foreground">Critical issues</p>
          </CardContent>
        </Card>
      </div>

      {/* Priority Alerts */}
      {overdueItems > 0 && (
        <Card className="border-destructive bg-destructive/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Critical Compliance Issues ({overdueItems})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive-foreground mb-3">
              You have {overdueItems} overdue compliance item(s) that require immediate attention to avoid penalties.
            </p>
            <div className="flex gap-2">
              <Button variant="destructive" size="sm">
                View Overdue Items
              </Button>
              <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Compliance Overview</TabsTrigger>
          <TabsTrigger value="management">Item Management</TabsTrigger>
          <TabsTrigger value="documents">Document Center</TabsTrigger>
          <TabsTrigger value="reports">Reports & Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { type: 'DOT Inspections', count: 3, dueIn: '5 days', priority: 'high' },
                    { type: 'Insurance Renewals', count: 1, dueIn: '12 days', priority: 'medium' },
                    { type: 'CDL Renewals', count: 2, dueIn: '18 days', priority: 'medium' },
                    { type: 'Drug Testing', count: 1, dueIn: '3 days', priority: 'high' },
                    { type: 'Vehicle Registration', count: 4, dueIn: '25 days', priority: 'low' }
                  ].map((item) => (
                    <div key={item.type} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">{item.type}</div>
                        <div className="text-sm text-muted-foreground">{item.count} item(s) due in {item.dueIn}</div>
                      </div>
                      <Badge variant={getPriorityColor(item.priority)}>
                        {item.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="modern-card">
              <CardHeader>
                <CardTitle>Compliance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gradient">87%</div>
                    <div className="text-sm text-muted-foreground">Overall Compliance Rate</div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div className="bg-gradient-primary h-3 rounded-full" style={{ width: '87%' }} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-medium text-success">{compliantItems}</div>
                      <div className="text-xs text-muted-foreground">Compliant</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-destructive">{overdueItems + dueSoonItems}</div>
                      <div className="text-xs text-muted-foreground">Action Required</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="management" className="space-y-4">
          {/* Compliance Items Table */}
          <Card className="modern-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Compliance Management</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Track and manage all compliance requirements</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                  <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Compliance Item
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>Add New Compliance Item</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleSubmitCreate} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="vehicleId">Vehicle ID</Label>
                            <Input id="vehicleId" name="vehicleId" placeholder="TRK-001" defaultValue="TRK-008" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="type">Compliance Type</Label>
                            <Select name="type" defaultValue="DOT_Inspection" required>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="DOT_Inspection">DOT Inspection</SelectItem>
                                <SelectItem value="Registration">Vehicle Registration</SelectItem>
                                <SelectItem value="Insurance">Commercial Insurance</SelectItem>
                                <SelectItem value="CDL_Renewal">CDL License Renewal</SelectItem>
                                <SelectItem value="Medical_Certificate">DOT Medical Certificate</SelectItem>
                                <SelectItem value="Drug_Test">Random Drug Testing</SelectItem>
                                <SelectItem value="HOS_Compliance">Hours of Service</SelectItem>
                                <SelectItem value="Safety_Inspection">Safety Inspection</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea 
                            id="description" 
                            name="description" 
                            placeholder="Describe the compliance requirement..."
                            defaultValue="Annual DOT safety inspection required for vehicle TRK-008 to maintain operating authority"
                            required 
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="dueDate">Due Date</Label>
                            <Input id="dueDate" name="dueDate" type="date" defaultValue="2024-04-22" required />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="priority">Priority</Label>
                            <Select name="priority" defaultValue="high" required>
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
                            <Label htmlFor="status">Status</Label>
                            <Select name="status" defaultValue="pending" required>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="due_soon">Due Soon</SelectItem>
                                <SelectItem value="compliant">Compliant</SelectItem>
                                <SelectItem value="overdue">Overdue</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="assignedTo">Assigned To</Label>
                          <Input id="assignedTo" name="assignedTo" placeholder="Team/Person" defaultValue="Safety & Compliance Team" required />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" className="bg-gradient-primary hover:bg-gradient-primary/90">Add Item</Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.vehicleId}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span>{item.type.replace('_', ' ')}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs truncate">{item.description}</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(item.status)}>
                          {item.status.replace('_', ' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getPriorityColor(item.priority)}>
                          {item.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm">{item.dueDate}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{item.assignedTo}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-3 w-3" />
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

        <TabsContent value="documents" className="space-y-4">
          <Card className="modern-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Document Management</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Upload and manage compliance documents</p>
                </div>
                <Dialog open={isDocumentOpen} onOpenChange={setIsDocumentOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-primary hover:bg-gradient-primary/90">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Document
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>Upload Compliance Document</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmitDocument} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Document Title</Label>
                        <Input id="title" name="title" placeholder="Document name" defaultValue="DOT Inspection Certificate" required />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="type">Document Type</Label>
                          <Select name="type" defaultValue="inspection" required>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="inspection">Inspection Certificate</SelectItem>
                              <SelectItem value="insurance">Insurance Policy</SelectItem>
                              <SelectItem value="registration">Vehicle Registration</SelectItem>
                              <SelectItem value="license">CDL License</SelectItem>
                              <SelectItem value="medical">Medical Certificate</SelectItem>
                              <SelectItem value="permit">Operating Permit</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="vehicle">Vehicle</Label>
                          <Select name="vehicle" defaultValue="TRK-008" required>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="TRK-001">TRK-001</SelectItem>
                              <SelectItem value="TRK-002">TRK-002</SelectItem>
                              <SelectItem value="TRK-008">TRK-008</SelectItem>
                              <SelectItem value="all">All Vehicles</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" name="expiryDate" type="date" defaultValue="2025-04-22" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="file">Upload File</Label>
                        <Input id="file" name="file" type="file" accept=".pdf,.jpg,.png,.doc,.docx" required />
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={() => setIsDocumentOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-gradient-primary hover:bg-gradient-primary/90">Upload Document</Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[
                  { title: 'DOT Inspection - TRK-001', type: 'Inspection', expiry: '2024-12-15', status: 'valid' },
                  { title: 'Commercial Insurance Policy', type: 'Insurance', expiry: '2024-06-30', status: 'expires_soon' },
                  { title: 'CDL License - John Smith', type: 'License', expiry: '2025-03-20', status: 'valid' },
                  { title: 'Vehicle Registration - TRK-003', type: 'Registration', expiry: '2024-08-10', status: 'valid' },
                  { title: 'Medical Certificate - Jane Doe', type: 'Medical', expiry: '2024-05-15', status: 'expires_soon' },
                  { title: 'Operating Permit - Interstate', type: 'Permit', expiry: '2025-01-01', status: 'valid' }
                ].map((doc, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-sm">{doc.title}</div>
                        <div className="text-xs text-muted-foreground">{doc.type}</div>
                        <div className="text-xs text-muted-foreground mt-1">Expires: {doc.expiry}</div>
                      </div>
                      <Badge variant={doc.status === 'valid' ? 'default' : 'secondary'}>
                        {doc.status === 'valid' ? 'Valid' : 'Expires Soon'}
                      </Badge>
                    </div>
                    <div className="flex gap-1 mt-3">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-3 w-3" />
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-base">Compliance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">This Month</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Last Month</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">3 Month Avg</span>
                    <span className="font-medium">89%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">YTD Average</span>
                    <span className="font-medium text-success">91%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-base">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">High Risk Items</span>
                    <span className="font-medium text-destructive">3</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Medium Risk</span>
                    <span className="font-medium text-warning">8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Low Risk</span>
                    <span className="font-medium text-success">25</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Risk Score</span>
                    <span className="font-medium">Medium</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="modern-card">
              <CardHeader>
                <CardTitle className="text-base">Cost Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Compliance Costs</span>
                    <span className="font-medium">$12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Penalty Risks</span>
                    <span className="font-medium text-warning">$8,500</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Cost Savings</span>
                    <span className="font-medium text-success">$15,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">ROI</span>
                    <span className="font-medium text-success">22%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};