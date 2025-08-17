/**
 * Admin Dashboard for Carrier & Broker Onboarding Reviews
 * Manages manual review queue and compliance scoring
 */

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Eye, 
  Edit, 
  Save, 
  XCircle,
  Filter,
  Search,
  Download,
  RefreshCw,
  BarChart3,
  Shield,
  FileText,
  Star,
  TrendingUp,
  TrendingDown,
  Calendar,
  Mail,
  Phone,
  Settings,
  Bell,
  UserCheck,
  FileCheck,
  Truck,
  Building2,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Home,
  Database,
  Activity,
  AlertCircle,
  CheckSquare,
  FileX,
  Zap,
  Target,
  PieChart,
  LineChart,
  BarChart,
  Grid3X3,
  List,
  MoreHorizontal,
  SortAsc,
  SortDesc,
  Filter as FilterIcon,
  Archive,
  Trash2,
  Copy,
  ExternalLink
} from 'lucide-react';

interface ReviewStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  urgent: number;
  completionRate: number;
}

interface AdminReview {
  id: string;
  companyName: string;
  reviewType: string;
  reviewReason: string;
  reviewPriority: string;
  reviewStatus: string;
  assignedTo?: string;
  totalScore: number;
  riskLevel: string;
  createdAt: string;
}

const OnboardingReviewDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState<AdminReview | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewDecision, setReviewDecision] = useState<'approved' | 'rejected' | 'requires_changes'>('approved');
  
  // Sidebar state
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sortField, setSortField] = useState<string>('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'list'>('table');

  // Navigation items
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, color: 'text-blue-600' },
    { id: 'reviews', label: 'Reviews', icon: Shield, color: 'text-green-600' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, color: 'text-purple-600' },
    { id: 'reports', label: 'Reports', icon: FileText, color: 'text-orange-600' },
    { id: 'settings', label: 'Settings', icon: Settings, color: 'text-gray-600' },
    { id: 'users', label: 'Users', icon: Users, color: 'text-indigo-600' },
    { id: 'database', label: 'Database', icon: Database, color: 'text-red-600' },
    { id: 'activity', label: 'Activity', icon: Activity, color: 'text-teal-600' },
  ];

  // Mock data for demonstration
  const mockReviews: AdminReview[] = [
    {
      id: '1',
      companyName: 'ABC Trucking Co.',
      reviewType: 'manual_approval',
      reviewReason: 'Score between 70-99 requires manual review',
      reviewPriority: 'high',
      reviewStatus: 'pending',
      totalScore: 85,
      riskLevel: 'medium',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      companyName: 'XYZ Logistics LLC',
      reviewType: 'insurance_review',
      reviewReason: 'Insurance certificate expiring soon',
      reviewPriority: 'urgent',
      reviewStatus: 'in_progress',
      assignedTo: 'Admin User',
      totalScore: 92,
      riskLevel: 'low',
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      companyName: 'Fast Freight Inc.',
      reviewType: 'compliance_check',
      reviewReason: 'FMCSA verification pending',
      reviewPriority: 'normal',
      reviewStatus: 'completed',
      assignedTo: 'Admin User',
      totalScore: 78,
      riskLevel: 'medium',
      createdAt: '2024-01-13'
    },
    {
      id: '4',
      companyName: 'Premium Transport Solutions',
      reviewType: 'legal_audit',
      reviewReason: 'Legal documentation review required',
      reviewPriority: 'high',
      reviewStatus: 'pending',
      totalScore: 88,
      riskLevel: 'low',
      createdAt: '2024-01-12'
    },
    {
      id: '5',
      companyName: 'Elite Carrier Group',
      reviewType: 'manual_approval',
      reviewReason: 'Score between 70-99 requires manual review',
      reviewPriority: 'normal',
      reviewStatus: 'in_progress',
      assignedTo: 'Admin User',
      totalScore: 76,
      riskLevel: 'high',
      createdAt: '2024-01-11'
    }
  ];

  const stats: ReviewStats = {
    total: mockReviews.length,
    pending: mockReviews.filter(r => r.reviewStatus === 'pending').length,
    inProgress: mockReviews.filter(r => r.reviewStatus === 'in_progress').length,
    completed: mockReviews.filter(r => r.reviewStatus === 'completed').length,
    urgent: mockReviews.filter(r => r.reviewPriority === 'urgent').length,
    completionRate: Math.round((mockReviews.filter(r => r.reviewStatus === 'completed').length / mockReviews.length) * 100)
  };

  // Filter reviews based on search and filters
  const filteredReviews = mockReviews.filter(review => {
    const matchesSearch = 
      review.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewReason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || review.reviewStatus === statusFilter;
    const matchesPriority = priorityFilter === 'all' || review.reviewPriority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAssignReview = async (reviewId: string) => {
    // Mock assignment
    console.log('Assigning review:', reviewId);
  };

  const handleUpdateReview = async (reviewId: string, status: string, notes: string, decision: string) => {
    // Mock update
    console.log('Updating review:', reviewId, status, notes, decision);
    setIsReviewModalOpen(false);
  };

  // Sorting function
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Row selection
  const handleRowSelect = (reviewId: string) => {
    setSelectedRows(prev => 
      prev.includes(reviewId) 
        ? prev.filter(id => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  // Bulk actions
  const handleBulkAction = (action: string) => {
    console.log(`Bulk ${action} for:`, selectedRows);
    setSelectedRows([]);
  };

  // Toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case 'in_progress':
        return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100"><Edit className="h-3 w-3 mr-1" />In Progress</Badge>;
      case 'completed':
        return <Badge variant="default" className="bg-green-100 text-green-800 hover:bg-green-100"><CheckCircle className="h-3 w-3 mr-1" />Completed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive" className="bg-red-100 text-red-800 hover:bg-red-100"><AlertTriangle className="h-3 w-3 mr-1" />Urgent</Badge>;
      case 'high':
        return <Badge variant="default" className="bg-orange-100 text-orange-800 hover:bg-orange-100"><AlertTriangle className="h-3 w-3 mr-1" />High</Badge>;
      case 'normal':
        return <Badge variant="secondary" className="bg-gray-100 text-gray-800 hover:bg-gray-100"><Clock className="h-3 w-3 mr-1" />Normal</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-50"><Clock className="h-3 w-3 mr-1" />Low</Badge>;
      default:
        return <Badge variant="secondary">{priority}</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 ease-in-out flex-shrink-0`}>
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <h2 className="text-lg font-bold text-gray-900 flex items-center">
                <Shield className="h-6 w-6 text-blue-600 mr-2" />
                Admin Panel
              </h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSidebar}
              className="hover:bg-gray-100"
            >
              {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        
        <nav className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className={`h-5 w-5 mr-3 ${item.color}`} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleSidebar}
                  className="lg:hidden hover:bg-gray-100"
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                    <Shield className="h-8 w-8 text-blue-600 mr-3" />
                    Onboarding Review Dashboard
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Manage carrier and broker onboarding reviews and compliance verification
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-6">
          {/* Quick Stats Bar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Total: {stats.total}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Pending: {stats.pending}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">In Progress: {stats.inProgress}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Completed: {stats.completed}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Urgent: {stats.urgent}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Completion Rate:</span>
                <span className="text-sm font-semibold text-green-600">{stats.completionRate}%</span>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">Total Reviews</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm font-medium">Pending</p>
                  <p className="text-3xl font-bold">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm font-medium">In Progress</p>
                  <p className="text-3xl font-bold">{stats.inProgress}</p>
                </div>
                <Edit className="h-8 w-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm font-medium">Completed</p>
                  <p className="text-3xl font-bold">{stats.completed}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm font-medium">Urgent</p>
                  <p className="text-3xl font-bold">{stats.urgent}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm font-medium">Completion Rate</p>
                  <p className="text-3xl font-bold">{stats.completionRate}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters and Search */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <CardTitle className="flex items-center space-x-2 text-gray-800">
                  <Filter className="h-5 w-5 text-blue-600" />
                  <span>Filters & Search</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Search Companies</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search companies..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Status Filter</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Priority Filter</label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Button variant="outline" className="w-full" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Reviews Table */}
          <div className="lg:col-span-3">
            <Card className="shadow-lg border-0">
              <CardHeader className="bg-gray-50 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-gray-800">Review Queue</CardTitle>
                    <CardDescription className="text-gray-600">
                      {filteredReviews.length} reviews found • Last updated: {new Date().toLocaleTimeString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-3">
                    {/* View Mode Toggle */}
                    <div className="flex items-center space-x-1 bg-white rounded-lg border border-gray-200 p-1">
                      <Button
                        variant={viewMode === 'table' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('table')}
                        className="h-8 px-2"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'grid' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('grid')}
                        className="h-8 px-2"
                      >
                        <Grid3X3 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant={viewMode === 'list' ? 'default' : 'ghost'}
                        size="sm"
                        onClick={() => setViewMode('list')}
                        className="h-8 px-2"
                      >
                        <BarChart className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Bulk Actions */}
                    {selectedRows.length > 0 && (
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{selectedRows.length} selected</span>
                        <Button variant="outline" size="sm" onClick={() => handleBulkAction('approve')}>
                          <CheckSquare className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleBulkAction('reject')}>
                          <FileX className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleBulkAction('archive')}>
                          <Archive className="h-4 w-4 mr-1" />
                          Archive
                        </Button>
                      </div>
                    )}
                    
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-gray-700 w-12">
                          <input
                            type="checkbox"
                            checked={selectedRows.length === filteredReviews.length && filteredReviews.length > 0}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedRows(filteredReviews.map(r => r.id));
                              } else {
                                setSelectedRows([]);
                              }
                            }}
                            className="rounded border-gray-300"
                          />
                        </TableHead>
                        <TableHead 
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('companyName')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Company</span>
                            {sortField === 'companyName' && (
                              sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('reviewType')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Type</span>
                            {sortField === 'reviewType' && (
                              sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('reviewPriority')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Priority</span>
                            {sortField === 'reviewPriority' && (
                              sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('reviewStatus')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Status</span>
                            {sortField === 'reviewStatus' && (
                              sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead 
                          className="font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
                          onClick={() => handleSort('totalScore')}
                        >
                          <div className="flex items-center space-x-1">
                            <span>Score</span>
                            {sortField === 'totalScore' && (
                              sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                            )}
                          </div>
                        </TableHead>
                        <TableHead className="font-semibold text-gray-700">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredReviews.map((review) => (
                        <TableRow 
                          key={review.id} 
                          className={`hover:bg-gray-50 transition-colors ${
                            selectedRows.includes(review.id) ? 'bg-blue-50 border-blue-200' : ''
                          }`}
                        >
                          <TableCell>
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(review.id)}
                              onChange={() => handleRowSelect(review.id)}
                              className="rounded border-gray-300"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <Building2 className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{review.companyName}</div>
                                <div className="text-sm text-gray-500 max-w-xs truncate">{review.reviewReason}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-300">
                              {review.reviewType.replace('_', ' ')}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {getPriorityBadge(review.reviewPriority)}
                          </TableCell>
                          <TableCell>
                            {getStatusBadge(review.reviewStatus)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="text-center">
                                <div className="font-semibold text-gray-900">{review.totalScore}/120</div>
                                <Progress value={(review.totalScore / 120) * 100} className="w-16 h-2" />
                              </div>
                              <Badge 
                                variant={review.riskLevel === 'high' ? 'destructive' : review.riskLevel === 'medium' ? 'default' : 'secondary'}
                                className={review.riskLevel === 'high' ? 'bg-red-100 text-red-800' : review.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
                              >
                                {review.riskLevel}
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setSelectedReview(review);
                                  setIsReviewModalOpen(true);
                                }}
                                className="hover:bg-blue-50 hover:border-blue-300"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {review.reviewStatus === 'pending' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleAssignReview(review.id)}
                                  className="hover:bg-green-50 hover:border-green-300"
                                  title="Assign Review"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigator.clipboard.writeText(review.id)}
                                className="hover:bg-gray-50 hover:border-gray-300"
                                title="Copy ID"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="hover:bg-gray-50 hover:border-gray-300"
                                title="More Actions"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {filteredReviews.length === 0 && (
                  <div className="text-center py-12">
                    <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">No reviews found</p>
                    <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Review Modal */}
        {isReviewModalOpen && selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <Shield className="h-6 w-6 text-blue-600 mr-2" />
                      Review: {selectedReview.companyName}
                    </h2>
                    <p className="text-gray-600 mt-1">Review and approve onboarding application</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="hover:bg-gray-50"
                  >
                    <XCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Review Type</label>
                      <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded">{selectedReview.reviewType.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Priority</label>
                      <div className="mt-1">{getPriorityBadge(selectedReview.reviewPriority)}</div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Compliance Score</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-lg font-bold text-gray-900">{selectedReview.totalScore}/120</span>
                        <Progress value={(selectedReview.totalScore / 120) * 100} className="w-20 h-2" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Risk Level</label>
                      <div className="mt-1">
                        <Badge 
                          variant={selectedReview.riskLevel === 'high' ? 'destructive' : selectedReview.riskLevel === 'medium' ? 'default' : 'secondary'}
                          className={selectedReview.riskLevel === 'high' ? 'bg-red-100 text-red-800' : selectedReview.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}
                        >
                          {selectedReview.riskLevel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Review Reason</label>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded mt-1">{selectedReview.reviewReason}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Review Notes</label>
                  <Textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add your review notes, observations, and recommendations..."
                    rows={4}
                    className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Decision</label>
                  <Select value={reviewDecision} onValueChange={(value: any) => setReviewDecision(value)}>
                    <SelectTrigger className="mt-1 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">✅ Approved</SelectItem>
                      <SelectItem value="rejected">❌ Rejected</SelectItem>
                      <SelectItem value="requires_changes">⚠️ Requires Changes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => setIsReviewModalOpen(false)}
                    className="hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleUpdateReview(selectedReview.id, 'completed', reviewNotes, reviewDecision)}
                    className={`${
                      reviewDecision === 'approved' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : reviewDecision === 'rejected'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-yellow-600 hover:bg-yellow-700'
                    } text-white`}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Floating Action Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <div className="flex flex-col space-y-2">
            <Button
              variant="default"
              size="lg"
              className="w-14 h-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
              title="Quick Actions"
            >
              <Zap className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-10 h-10 rounded-full shadow-lg bg-white hover:bg-gray-50"
              title="Refresh"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-10 h-10 rounded-full shadow-lg bg-white hover:bg-gray-50"
              title="Settings"
            >
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingReviewDashboard;
