/**
 * Admin Dashboard for Carrier & Broker Onboarding Reviews
 * Manages manual review queue and compliance scoring
 */

import React, { useState, useEffect } from 'react';
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
  Phone
} from 'lucide-react';
import { useAdminFlagging } from '@/hooks/useAdminFlagging';
import { useDocumentWatcher } from '@/hooks/useDocumentWatcher';
import { useToast } from '@/hooks/use-toast';

interface ReviewStats {
  total: number;
  pending: number;
  inProgress: number;
  completed: number;
  urgent: number;
  completionRate: number;
}

const OnboardingReviewDashboard: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');
  const [reviewDecision, setReviewDecision] = useState<'approved' | 'rejected' | 'requires_changes'>('approved');

  const {
    adminReviews,
    isLoading,
    assignReview,
    updateReviewStatus,
    loadAdminReviews,
    getPendingReviews,
    getUrgentReviews,
    getReviewStats
  } = useAdminFlagging();

  const { expiringDocuments, documentAlerts } = useDocumentWatcher();

  const stats = getReviewStats();

  // Filter reviews based on search and filters
  const filteredReviews = adminReviews.filter(review => {
    const matchesSearch = 
      review.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.reviewReason.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || review.reviewStatus === statusFilter;
    const matchesPriority = priorityFilter === 'all' || review.reviewPriority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleAssignReview = async (reviewId: string) => {
    try {
      // For demo purposes, assign to current user
      const currentUserId = 'current-user-id';
      await assignReview(reviewId, currentUserId);
      
      toast({
        title: 'Review assigned',
        description: 'Review has been assigned to you.',
      });
      
      loadAdminReviews();
    } catch (error) {
      toast({
        title: 'Assignment failed',
        description: 'Failed to assign review. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateReview = async (reviewId: string) => {
    try {
      await updateReviewStatus(reviewId, 'completed', reviewNotes, reviewDecision);
      
      toast({
        title: 'Review updated',
        description: `Review has been ${reviewDecision}.`,
      });
      
      setIsReviewModalOpen(false);
      setSelectedReview(null);
      setReviewNotes('');
      setReviewDecision('approved');
      loadAdminReviews();
    } catch (error) {
      toast({
        title: 'Update failed',
        description: 'Failed to update review. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const openReviewModal = (review: any) => {
    setSelectedReview(review);
    setIsReviewModalOpen(true);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500 text-white';
      case 'high':
        return 'bg-orange-500 text-white';
      case 'normal':
        return 'bg-blue-500 text-white';
      case 'low':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'in_progress':
        return 'bg-blue-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'escalated':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    loadAdminReviews();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Onboarding Review Dashboard
          </h1>
          <p className="text-gray-600">
            Manage carrier and broker onboarding reviews and compliance scoring
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-yellow-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Edit className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-red-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Urgent</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {documentAlerts.length > 0 && (
          <div className="mb-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                {documentAlerts.length} document(s) require attention. 
                <Button variant="link" className="p-0 h-auto">
                  View details
                </Button>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Search</label>
                  <Input
                    placeholder="Search companies..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Status</label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="escalated">Escalated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium">Priority</label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="mt-1">
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

                <Button
                  variant="outline"
                  onClick={loadAdminReviews}
                  disabled={isLoading}
                  className="w-full"
                >
                  <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Reviews Table */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Reviews</CardTitle>
                <CardDescription>
                  Manage manual review queue for carrier and broker onboarding
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Risk</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReviews.map((review) => (
                      <TableRow key={review.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{review.companyName}</div>
                            <div className="text-sm text-gray-500">{review.reviewReason}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {review.reviewType.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(review.reviewPriority)}>
                            {review.reviewPriority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(review.reviewStatus)}>
                            {review.reviewStatus.replace('_', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{review.totalScore}/120</span>
                            <Progress value={(review.totalScore / 120) * 100} className="w-16" />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRiskLevelColor(review.riskLevel)}>
                            {review.riskLevel}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openReviewModal(review)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {review.reviewStatus === 'pending' && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleAssignReview(review.id)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredReviews.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No reviews found matching your criteria.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Review Modal */}
        {isReviewModalOpen && selectedReview && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Review: {selectedReview.companyName}</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsReviewModalOpen(false)}
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Review Type</label>
                    <p className="text-sm text-gray-600">{selectedReview.reviewType}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <Badge className={getPriorityColor(selectedReview.reviewPriority)}>
                      {selectedReview.reviewPriority}
                    </Badge>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Compliance Score</label>
                    <p className="text-sm text-gray-600">{selectedReview.totalScore}/120</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Risk Level</label>
                    <Badge className={getRiskLevelColor(selectedReview.riskLevel)}>
                      {selectedReview.riskLevel}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium">Review Reason</label>
                  <p className="text-sm text-gray-600">{selectedReview.reviewReason}</p>
                </div>

                <div>
                  <label className="text-sm font-medium">Review Notes</label>
                  <Textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    placeholder="Add your review notes..."
                    className="mt-1"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Decision</label>
                  <Select value={reviewDecision} onValueChange={(value: any) => setReviewDecision(value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="requires_changes">Requires Changes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsReviewModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => handleUpdateReview(selectedReview.id)}
                    className={
                      reviewDecision === 'approved' 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : reviewDecision === 'rejected'
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-yellow-600 hover:bg-yellow-700'
                    }
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Update Review
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingReviewDashboard;
