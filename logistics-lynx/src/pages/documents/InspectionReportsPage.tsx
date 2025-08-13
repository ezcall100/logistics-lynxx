import { useState } from 'react';
import { ClipboardCheck, Search, Plus, Download, Eye, Edit, Trash2, Filter, AlertTriangle, CheckCircle, Calendar, FileText, User, Car, Settings } from 'lucide-react';
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

const inspectionData = [
  {
    id: 'INS-001',
    inspectionNumber: 'DOT-2024-001',
    vehicle: 'TRK-001',
    inspectionType: 'DOT Annual',
    inspector: 'Mike Johnson',
    inspectionDate: '2024-02-15',
    nextDueDate: '2025-02-15',
    status: 'passed',
    score: 95,
    violations: 0,
    defects: 1,
    location: 'Main Terminal',
    daysToNext: 330,
    certificationNumber: 'CERT-DOT-001'
  },
  {
    id: 'INS-002',
    inspectionNumber: 'DVIR-2024-002',
    vehicle: 'TRK-002',
    inspectionType: 'Pre-Trip DVIR',
    inspector: 'Driver - John Smith',
    inspectionDate: '2024-02-20',
    nextDueDate: '2024-02-21',
    status: 'failed',
    score: 65,
    violations: 2,
    defects: 3,
    location: 'Chicago Terminal',
    daysToNext: 1,
    certificationNumber: null
  },
  {
    id: 'INS-003',
    inspectionNumber: 'SAFETY-2024-003',
    vehicle: 'TRL-001',
    inspectionType: 'Safety Inspection',
    inspector: 'Sarah Wilson',
    inspectionDate: '2024-02-18',
    nextDueDate: '2024-08-18',
    status: 'passed',
    score: 88,
    violations: 0,
    defects: 2,
    location: 'Service Center',
    daysToNext: 150,
    certificationNumber: 'CERT-SF-003'
  },
  {
    id: 'INS-004',
    inspectionNumber: 'ROADSIDE-2024-004',
    vehicle: 'TRK-003',
    inspectionType: 'Roadside Inspection',
    inspector: 'DOT Officer - R. Davis',
    inspectionDate: '2024-02-10',
    nextDueDate: null,
    status: 'warning',
    score: 78,
    violations: 1,
    defects: 2,
    location: 'I-35 Mile Marker 125',
    daysToNext: null,
    certificationNumber: null
  }
];

const defectsData = [
  {
    id: 'DEF-001',
    inspectionId: 'INS-001',
    vehicle: 'TRK-001',
    defectType: 'Brake System',
    severity: 'minor',
    description: 'Brake pad wear at 80%',
    status: 'repaired',
    reportedDate: '2024-02-15',
    repairedDate: '2024-02-16',
    repairCost: '$150.00',
    technician: 'Tom Anderson'
  },
  {
    id: 'DEF-002',
    inspectionId: 'INS-002',
    vehicle: 'TRK-002',
    defectType: 'Lighting',
    severity: 'major',
    description: 'Tail light not functioning',
    status: 'pending',
    reportedDate: '2024-02-20',
    repairedDate: null,
    repairCost: null,
    technician: null
  },
  {
    id: 'DEF-003',
    inspectionId: 'INS-002',
    vehicle: 'TRK-002',
    defectType: 'Tire Condition',
    severity: 'critical',
    description: 'Excessive tread wear on front right tire',
    status: 'pending',
    reportedDate: '2024-02-20',
    repairedDate: null,
    repairCost: null,
    technician: null
  },
  {
    id: 'DEF-004',
    inspectionId: 'INS-003',
    vehicle: 'TRL-001',
    defectType: 'Coupling System',
    severity: 'minor',
    description: 'Fifth wheel pin needs lubrication',
    status: 'repaired',
    reportedDate: '2024-02-18',
    repairedDate: '2024-02-19',
    repairCost: '$25.00',
    technician: 'Kevin White'
  }
];

export default function InspectionReportsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTab, setSelectedTab] = useState('inspections');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'repaired': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInspectionTypeColor = (type: string) => {
    switch (type) {
      case 'DOT Annual': return 'bg-blue-100 text-blue-800';
      case 'Pre-Trip DVIR': return 'bg-green-100 text-green-800';
      case 'Safety Inspection': return 'bg-purple-100 text-purple-800';
      case 'Roadside Inspection': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'major': return 'bg-orange-100 text-orange-800';
      case 'minor': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDaysToNextWarning = (days: number | null) => {
    if (days === null) return { color: 'text-gray-600', message: 'N/A' };
    if (days <= 7) return { color: 'text-red-600', message: `${days} days` };
    if (days <= 30) return { color: 'text-yellow-600', message: `${days} days` };
    return { color: 'text-green-600', message: `${days} days` };
  };

  const totalInspections = inspectionData.length;
  const passedInspections = inspectionData.filter(i => i.status === 'passed').length;
  const failedInspections = inspectionData.filter(i => i.status === 'failed').length;
  const upcomingInspections = inspectionData.filter(i => i.daysToNext && i.daysToNext <= 30).length;
  const totalDefects = defectsData.length;
  const pendingDefects = defectsData.filter(d => d.status === 'pending').length;
  const averageScore = Math.round(
    inspectionData.reduce((sum, i) => sum + i.score, 0) / totalInspections
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Inspection Reports</h1>
          <p className="text-muted-foreground">Manage vehicle inspections, defects, and compliance records</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Inspection
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Inspection Report</DialogTitle>
                <DialogDescription>Schedule or record a new vehicle inspection</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="inspectionNumber">Inspection Number</Label>
                  <Input id="inspectionNumber" placeholder="DOT-2024-001" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select vehicle" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trk-001">TRK-001</SelectItem>
                      <SelectItem value="trk-002">TRK-002</SelectItem>
                      <SelectItem value="trl-001">TRL-001</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inspectionType">Inspection Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dot-annual">DOT Annual</SelectItem>
                      <SelectItem value="pre-trip">Pre-Trip DVIR</SelectItem>
                      <SelectItem value="safety">Safety Inspection</SelectItem>
                      <SelectItem value="roadside">Roadside Inspection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inspector">Inspector</Label>
                  <Input id="inspector" placeholder="Mike Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inspectionDate">Inspection Date</Label>
                  <Input id="inspectionDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="Main Terminal" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="score">Score (%)</Label>
                  <Input id="score" type="number" min="0" max="100" placeholder="95" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passed">Passed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="notes">Inspection Notes</Label>
                  <Textarea id="notes" placeholder="General inspection findings and observations" />
                </div>
                <div className="col-span-2 flex items-center space-x-2">
                  <Switch id="autoSchedule" />
                  <Label htmlFor="autoSchedule">Automatically schedule next inspection</Label>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>Cancel</Button>
                <Button>Create Inspection</Button>
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
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Inspections</p>
                <p className="text-2xl font-bold">{totalInspections}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Passed</p>
                <p className="text-2xl font-bold">{passedInspections}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Failed</p>
                <p className="text-2xl font-bold">{failedInspections}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-muted-foreground">Due Soon</p>
                <p className="text-2xl font-bold">{upcomingInspections}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-sm text-muted-foreground">Total Defects</p>
                <p className="text-2xl font-bold">{totalDefects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-muted-foreground">Pending Repairs</p>
                <p className="text-2xl font-bold">{pendingDefects}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
                <p className="text-2xl font-bold">{averageScore}%</p>
              </div>
            </div>
            <Progress value={averageScore} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="inspections">Inspection Reports</TabsTrigger>
          <TabsTrigger value="defects">Defects & Repairs</TabsTrigger>
        </TabsList>

        <TabsContent value="inspections" className="space-y-4">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search inspections..."
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
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="warning">Warning</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Inspections Table */}
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Inspections</CardTitle>
              <CardDescription>All vehicle inspection reports and compliance records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Inspection ID</TableHead>
                    <TableHead>Inspection Number</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Inspector</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Next Due</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Violations</TableHead>
                    <TableHead>Defects</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inspectionData.map((inspection) => {
                    const scoreColor = getScoreColor(inspection.score);
                    const nextDueWarning = getDaysToNextWarning(inspection.daysToNext);
                    
                    return (
                      <TableRow key={inspection.id}>
                        <TableCell className="font-medium">{inspection.id}</TableCell>
                        <TableCell>{inspection.inspectionNumber}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Car className="h-4 w-4 text-gray-400" />
                            {inspection.vehicle}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getInspectionTypeColor(inspection.inspectionType)}>
                            {inspection.inspectionType}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            {inspection.inspector}
                          </div>
                        </TableCell>
                        <TableCell>{inspection.inspectionDate}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{inspection.nextDueDate || 'N/A'}</span>
                            <span className={`text-xs ${nextDueWarning.color}`}>
                              {nextDueWarning.message}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className={scoreColor}>{inspection.score}%</span>
                            <Progress value={inspection.score} className="w-16" />
                          </div>
                        </TableCell>
                        <TableCell className={inspection.violations > 0 ? 'text-red-600' : 'text-green-600'}>
                          {inspection.violations}
                        </TableCell>
                        <TableCell className={inspection.defects > 0 ? 'text-orange-600' : 'text-green-600'}>
                          {inspection.defects}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(inspection.status)}>
                            {inspection.status}
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
                              <Settings className="h-4 w-4" />
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

        <TabsContent value="defects" className="space-y-4">
          {/* Defects Table */}
          <Card>
            <CardHeader>
              <CardTitle>Defects & Repairs</CardTitle>
              <CardDescription>All identified defects and their repair status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Defect ID</TableHead>
                    <TableHead>Inspection</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Defect Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Reported Date</TableHead>
                    <TableHead>Repair Cost</TableHead>
                    <TableHead>Technician</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {defectsData.map((defect) => (
                    <TableRow key={defect.id}>
                      <TableCell className="font-medium">{defect.id}</TableCell>
                      <TableCell>{defect.inspectionId}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Car className="h-4 w-4 text-gray-400" />
                          {defect.vehicle}
                        </div>
                      </TableCell>
                      <TableCell>{defect.defectType}</TableCell>
                      <TableCell>
                        <Badge className={getSeverityColor(defect.severity)}>
                          {defect.severity}
                        </Badge>
                      </TableCell>
                      <TableCell className="max-w-48 truncate">{defect.description}</TableCell>
                      <TableCell>{defect.reportedDate}</TableCell>
                      <TableCell className="font-semibold">{defect.repairCost || 'Pending'}</TableCell>
                      <TableCell>{defect.technician || 'Unassigned'}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(defect.status)}>
                          {defect.status}
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
                            <Settings className="h-4 w-4" />
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
      </Tabs>
    </div>
  );
}