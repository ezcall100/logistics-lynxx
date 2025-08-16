/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { UserCheck, Search, Plus, Download, Eye, Edit, Trash2, Filter, AlertTriangle, CheckCircle, Calendar, FileText, User, Car, Clock } from 'lucide-react';
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

const driverDocumentsData = [
  {
    id: 'DRV-001',
    driverName: 'John Smith',
    driverLicense: 'DL-123456789',
    cdlExpiry: '2024-08-15',
    medicalExpiry: '2024-06-30',
    drugTestDate: '2024-01-15',
    drugTestStatus: 'passed',
    backgroundCheck: '2024-01-01',
    backgroundStatus: 'cleared',
    employmentStart: '2023-01-15',
    status: 'active',
    daysToLicenseExpiry: 165,
    daysToMedicalExpiry: 120,
    completionRate: 95
  },
  {
    id: 'DRV-002',
    driverName: 'Maria Garcia',
    driverLicense: 'DL-987654321',
    cdlExpiry: '2024-04-20',
    medicalExpiry: '2024-03-15',
    drugTestDate: '2024-02-01',
    drugTestStatus: 'passed',
    backgroundCheck: '2023-12-15',
    backgroundStatus: 'cleared',
    employmentStart: '2023-12-20',
    status: 'active',
    daysToLicenseExpiry: 50,
    daysToMedicalExpiry: 15,
    completionRate: 88
  },
  {
    id: 'DRV-003',
    driverName: 'Robert Johnson',
    driverLicense: 'DL-555666777',
    cdlExpiry: '2024-12-31',
    medicalExpiry: '2024-09-30',
    drugTestDate: '2024-01-20',
    drugTestStatus: 'failed',
    backgroundCheck: '2024-01-10',
    backgroundStatus: 'pending',
    employmentStart: '2024-01-25',
    status: 'suspended',
    daysToLicenseExpiry: 315,
    daysToMedicalExpiry: 210,
    completionRate: 45
  },
  {
    id: 'DRV-004',
    driverName: 'Sarah Wilson',
    driverLicense: 'DL-111222333',
    cdlExpiry: '2025-03-15',
    medicalExpiry: '2024-12-01',
    drugTestDate: '2024-02-10',
    drugTestStatus: 'passed',
    backgroundCheck: '2024-01-20',
    backgroundStatus: 'cleared',
    employmentStart: '2024-02-01',
    status: 'active',
    daysToLicenseExpiry: 380,
    daysToMedicalExpiry: 275,
    completionRate: 92
  }
];

const trainingRecordsData = [
  {
    id: 'TRN-001',
    driverName: 'John Smith',
    trainingType: 'Safety Training',
    completionDate: '2024-01-20',
    expiryDate: '2025-01-20',
    instructor: 'Mike Davis',
    score: 95,
    status: 'completed',
    certificate: 'CERT-SF-001'
  },
  {
    id: 'TRN-002',
    driverName: 'Maria Garcia',
    trainingType: 'HAZMAT Certification',
    completionDate: '2024-02-01',
    expiryDate: '2026-02-01',
    instructor: 'Lisa Chen',
    score: 88,
    status: 'completed',
    certificate: 'CERT-HZ-002'
  },
  {
    id: 'TRN-003',
    driverName: 'Robert Johnson',
    trainingType: 'Defensive Driving',
    completionDate: null,
    expiryDate: null,
    instructor: 'Tom Anderson',
    score: null,
    status: 'in-progress',
    certificate: null
  },
  {
    id: 'TRN-004',
    driverName: 'Sarah Wilson',
    trainingType: 'First Aid/CPR',
    completionDate: '2024-02-15',
    expiryDate: '2026-02-15',
    instructor: 'Karen White',
    score: 92,
    status: 'completed',
    certificate: 'CERT-FA-004'
  }
];

export default function DriverDocumentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('documents');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'cleared': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExpiryWarning = (daysToExpiry: number) => {
    if (daysToExpiry < 0) return { color: 'text-red-600', message: 'Expired' };
    if (daysToExpiry <= 30) return { color: 'text-red-600', message: `${daysToExpiry} days` };
    if (daysToExpiry <= 90) return { color: 'text-yellow-600', message: `${daysToExpiry} days` };
    return { color: 'text-green-600', message: `${daysToExpiry} days` };
  };

  const getCompletionColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const totalDrivers = driverDocumentsData.length;
  const activeDrivers = driverDocumentsData.filter(d => d.status === 'active').length;
  const expiringSoon = driverDocumentsData.filter(d => 
    d.daysToLicenseExpiry <= 30 || d.daysToMedicalExpiry <= 30
  ).length;
  const suspendedDrivers = driverDocumentsData.filter(d => d.status === 'suspended').length;
  const averageCompletion = Math.round(
    driverDocumentsData.reduce((sum, d) => sum + d.completionRate, 0) / totalDrivers
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Driver Documents</h1>
          <p className="text-muted-foreground">Manage driver licenses, certifications, and training records</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Driver
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Driver</DialogTitle>
                <DialogDescription>Add a new driver and their documentation</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="driverName">Driver Name</Label>
                  <Input id="driverName" placeholder="Enter driver name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="driverLicense">Driver License Number</Label>
                  <Input id="driverLicense" placeholder="DL-123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cdlExpiry">CDL Expiry Date</Label>
                  <Input id="cdlExpiry" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medicalExpiry">Medical Certificate Expiry</Label>
                  <Input id="medicalExpiry" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drugTestDate">Last Drug Test Date</Label>
                  <Input id="drugTestDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="drugTestStatus">Drug Test Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passed">Passed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backgroundCheck">Background Check Date</Label>
                  <Input id="backgroundCheck" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employmentStart">Employment Start Date</Label>
                  <Input id="employmentStart" type="date" />
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional notes about the driver" />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Switch id="autoReminder" />
                  <Label htmlFor="autoReminder">Enable expiry reminders</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button>Add Driver</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Drivers</p>
                <p className="text-2xl font-bold">{totalDrivers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Active Drivers</p>
                <p className="text-2xl font-bold">{activeDrivers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Expiring Soon</p>
                <p className="text-2xl font-bold">{expiringSoon}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Suspended</p>
                <p className="text-2xl font-bold">{suspendedDrivers}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Completion</p>
                <p className="text-2xl font-bold">{averageCompletion}%</p>
              </div>
            </div>
            <Progress value={averageCompletion} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="documents">Driver Documents</TabsTrigger>
          <TabsTrigger value="training">Training Records</TabsTrigger>
        </TabsList>

        <TabsContent value="documents" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search drivers..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Driver Documents Table */}
          <Card>
            <CardHeader>
              <CardTitle>Driver Documentation</CardTitle>
              <CardDescription>All driver licenses, certifications, and compliance documents</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver ID</TableHead>
                    <TableHead>Driver Name</TableHead>
                    <TableHead>License Number</TableHead>
                    <TableHead>CDL Expiry</TableHead>
                    <TableHead>Medical Expiry</TableHead>
                    <TableHead>Drug Test</TableHead>
                    <TableHead>Background Check</TableHead>
                    <TableHead>Completion Rate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {driverDocumentsData.map((driver) => {
                    const licenseWarning = getExpiryWarning(driver.daysToLicenseExpiry);
                    const medicalWarning = getExpiryWarning(driver.daysToMedicalExpiry);
                    const completionColor = getCompletionColor(driver.completionRate);
                    
                    return (
                      <TableRow key={driver.id}>
                        <TableCell className="font-medium">{driver.id}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            {driver.driverName}
                          </div>
                        </TableCell>
                        <TableCell>{driver.driverLicense}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{driver.cdlExpiry}</span>
                            <span className={`text-xs ${licenseWarning.color}`}>
                              {licenseWarning.message}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{driver.medicalExpiry}</span>
                            <span className={`text-xs ${medicalWarning.color}`}>
                              {medicalWarning.message}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-xs">{driver.drugTestDate}</span>
                            <Badge className={getStatusColor(driver.drugTestStatus)}>
                              {driver.drugTestStatus}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="text-xs">{driver.backgroundCheck}</span>
                            <Badge className={getStatusColor(driver.backgroundStatus)}>
                              {driver.backgroundStatus}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={completionColor}>{driver.completionRate}%</span>
                            <Progress value={driver.completionRate} className="w-16" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(driver.status)}>
                            {driver.status}
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
                              <FileText className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          {/* Training Records Table */}
          <Card>
            <CardHeader>
              <CardTitle>Training Records</CardTitle>
              <CardDescription>Driver training certifications and course completions</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Training ID</TableHead>
                    <TableHead>Driver Name</TableHead>
                    <TableHead>Training Type</TableHead>
                    <TableHead>Instructor</TableHead>
                    <TableHead>Completion Date</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Certificate</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trainingRecordsData.map((training) => (
                    <TableRow key={training.id}>
                      <TableCell className="font-medium">{training.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          {training.driverName}
                        </div>
                      </TableCell>
                      <TableCell>{training.trainingType}</TableCell>
                      <TableCell>{training.instructor}</TableCell>
                      <TableCell>{training.completionDate || 'In Progress'}</TableCell>
                      <TableCell>{training.expiryDate || 'N/A'}</TableCell>
                      <TableCell>
                        {training.score ? (
                          <div className="flex items-center gap-2">
                            <span className={training.score >= 80 ? 'text-green-600' : training.score >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                              {training.score}%
                            </span>
                          </div>
                        ) : (
                          'Pending'
                        )}
                      </TableCell>
                      <TableCell>{training.certificate || 'Pending'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(training.status)}>
                          {training.status}
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
                            <Clock className="h-4 w-4" />
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