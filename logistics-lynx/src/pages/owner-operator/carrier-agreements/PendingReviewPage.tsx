/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  MessageSquare,
  Calendar,
  User,
  Building,
  DollarSign,
  Search,
  Filter,
  AlertTriangle,
  Download,
  Edit,
  Send
} from 'lucide-react';
import { toast } from 'sonner';

interface PendingContract {
  id: string;
  carrierName: string;
  contractNumber: string;
  submittedDate: string;
  submittedBy: string;
  reviewDeadline: string;
  contractType: 'new' | 'renewal' | 'amendment' | 'termination';
  proposedStartDate: string;
  proposedEndDate: string;
  proposedValue: number;
  proposedRatePerMile: number;
  priority: 'high' | 'medium' | 'low';
  status: 'pending-review' | 'under-negotiation' | 'approved' | 'rejected' | 'requires-changes';
  reviewNotes: string;
  attachments: string[];
  reviewedBy?: string;
  reviewedDate?: string;
}

interface ReviewSummary {
  totalPending: number;
  newContracts: number;
  renewals: number;
  amendments: number;
  overdue: number;
  avgReviewTime: number;
}

const PendingReviewPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState<PendingContract | null>(null);
  const [reviewDecision, setReviewDecision] = useState<'approve' | 'reject' | 'request-changes'>('approve');
  const [reviewComments, setReviewComments] = useState('');

  // Mock data for pending contracts
  const pendingContracts: PendingContract[] = [
    {
      id: '1',
      carrierName: 'Lightning Logistics',
      contractNumber: 'CT-2024-006',
      submittedDate: '2024-01-20',
      submittedBy: 'Amanda Rodriguez',
      reviewDeadline: '2024-01-27',
      contractType: 'new',
      proposedStartDate: '2024-02-01',
      proposedEndDate: '2024-12-31',
      proposedValue: 1800000.00,
      proposedRatePerMile: 2.20,
      priority: 'high',
      status: 'pending-review',
      reviewNotes: 'New carrier with excellent safety rating. Requesting competitive rates.',
      attachments: ['insurance_certificate.pdf', 'safety_rating.pdf', 'financial_statement.pdf']
    },
    {
      id: '2',
      carrierName: 'Swift Transportation',
      contractNumber: 'CT-2024-001-R',
      submittedDate: '2024-01-18',
      submittedBy: 'John Smith',
      reviewDeadline: '2024-01-25',
      contractType: 'renewal',
      proposedStartDate: '2025-01-01',
      proposedEndDate: '2025-12-31',
      proposedValue: 2750000.00,
      proposedRatePerMile: 2.30,
      priority: 'medium',
      status: 'under-negotiation',
      reviewNotes: 'Renewal with 7% rate increase. Negotiating terms.',
      attachments: ['renewal_proposal.pdf', 'performance_report.pdf'],
      reviewedBy: 'Mike Johnson',
      reviewedDate: '2024-01-22'
    },
    {
      id: '3',
      carrierName: 'Green Valley Transport',
      contractNumber: 'CT-2024-007',
      submittedDate: '2024-01-15',
      submittedBy: 'Robert Lee',
      reviewDeadline: '2024-01-22',
      contractType: 'new',
      proposedStartDate: '2024-02-15',
      proposedEndDate: '2024-08-15',
      proposedValue: 950000.00,
      proposedRatePerMile: 2.10,
      priority: 'low',
      status: 'requires-changes',
      reviewNotes: 'Insurance coverage needs to be increased. Safety rating under review.',
      attachments: ['contract_draft.pdf', 'insurance_info.pdf'],
      reviewedBy: 'Sarah Davis',
      reviewedDate: '2024-01-21'
    },
    {
      id: '4',
      carrierName: 'Prime Inc.',
      contractNumber: 'CT-2024-005-A',
      submittedDate: '2024-01-22',
      submittedBy: 'Tom Wilson',
      reviewDeadline: '2024-01-29',
      contractType: 'amendment',
      proposedStartDate: '2024-02-01',
      proposedEndDate: '2024-12-31',
      proposedValue: 2150000.00,
      proposedRatePerMile: 2.05,
      priority: 'medium',
      status: 'pending-review',
      reviewNotes: 'Amendment to add specialized freight routes. Performance improvement required.',
      attachments: ['amendment_proposal.pdf', 'route_analysis.pdf']
    },
    {
      id: '5',
      carrierName: 'Atlas Transport',
      contractNumber: 'CT-2024-008',
      submittedDate: '2024-01-10',
      submittedBy: 'Jennifer Walsh',
      reviewDeadline: '2024-01-17',
      contractType: 'new',
      proposedStartDate: '2024-03-01',
      proposedEndDate: '2024-12-31',
      proposedValue: 1450000.00,
      proposedRatePerMile: 2.15,
      priority: 'high',
      status: 'approved',
      reviewNotes: 'Approved with minor rate adjustments. Excellent carrier credentials.',
      attachments: ['final_contract.pdf', 'approval_letter.pdf'],
      reviewedBy: 'David Chen',
      reviewedDate: '2024-01-16'
    }
  ];

  // Mock data for review summary
  const reviewSummary: ReviewSummary = {
    totalPending: 5,
    newContracts: 3,
    renewals: 1,
    amendments: 1,
    overdue: 1,
    avgReviewTime: 4.2
  };

  const filteredContracts = pendingContracts.filter(contract => {
    const matchesSearch = contract.carrierName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contract.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || contract.status === statusFilter;
    const matchesType = typeFilter === 'all' || contract.contractType === typeFilter;
    const matchesPriority = priorityFilter === 'all' || contract.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesType && matchesPriority;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      'pending-review': 'secondary',
      'under-negotiation': 'outline',
      'approved': 'default',
      'rejected': 'destructive',
      'requires-changes': 'secondary'
    } as const;
    
    const icons = {
      'pending-review': <Clock className="w-3 h-3" />,
      'under-negotiation': <MessageSquare className="w-3 h-3" />,
      'approved': <CheckCircle className="w-3 h-3" />,
      'rejected': <XCircle className="w-3 h-3" />,
      'requires-changes': <Edit className="w-3 h-3" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className="flex items-center gap-1">
        {icons[status as keyof typeof icons]}
        {status.replace('-', ' ').charAt(0).toUpperCase() + status.replace('-', ' ').slice(1)}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: string) => {
    const variants = {
      high: 'destructive',
      medium: 'secondary',
      low: 'outline'
    } as const;

    return (
      <Badge variant={variants[priority as keyof typeof variants]}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      new: 'bg-green-100 text-green-800',
      renewal: 'bg-blue-100 text-blue-800',
      amendment: 'bg-yellow-100 text-yellow-800',
      termination: 'bg-red-100 text-red-800'
    };

    return (
      <Badge variant="outline" className={colors[type as keyof typeof colors]}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  const isOverdue = (deadline: string) => {
    return new Date(deadline) < new Date();
  };

  const handleViewContract = (contractId: string) => {
    toast.success(`Opening contract details for ${contractId}`);
  };

  const handleReviewContract = (contract: PendingContract) => {
    setSelectedContract(contract);
    setIsReviewDialogOpen(true);
  };

  const handleSubmitReview = () => {
    if (!reviewComments.trim()) {
      toast.error('Please provide review comments');
      return;
    }
    
    const action = reviewDecision === 'approve' ? 'approved' : 
                  reviewDecision === 'reject' ? 'rejected' : 'returned for changes';
    
    toast.success(`Contract ${selectedContract?.contractNumber} has been ${action}`);
    setIsReviewDialogOpen(false);
    setReviewComments('');
    setReviewDecision('approve');
  };

  const handleDownloadAttachment = (filename: string) => {
    toast.success(`Downloading ${filename}`);
  };

  const handleBulkApproval = () => {
    toast.success('Bulk approval initiated for selected contracts');
  };

  const handleEscalateReview = (contractId: string) => {
    toast.success(`Contract ${contractId} escalated to senior management`);
  };

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pending Review</h1>
          <p className="text-muted-foreground">Review and approve carrier agreement submissions</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleBulkApproval}>
            <CheckCircle className="w-4 h-4 mr-2" />
            Bulk Approve
          </Button>
          <Button>
            <Eye className="w-4 h-4 mr-2" />
            Review Queue
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewSummary.totalPending}</div>
            <p className="text-xs text-muted-foreground">
              {reviewSummary.overdue} overdue
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Contracts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewSummary.newContracts}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Renewals</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewSummary.renewals}</div>
            <p className="text-xs text-muted-foreground">
              Existing carriers
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Review Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reviewSummary.avgReviewTime}</div>
            <p className="text-xs text-muted-foreground">
              Days to complete
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Review Queue</CardTitle>
          <CardDescription>Manage pending contract submissions and reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by carrier, contract number, or submitter..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="sm:w-40">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending-review">Pending Review</SelectItem>
                  <SelectItem value="under-negotiation">Under Negotiation</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                  <SelectItem value="requires-changes">Requires Changes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:w-40">
              <Label htmlFor="type-filter">Type</Label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="renewal">Renewal</SelectItem>
                  <SelectItem value="amendment">Amendment</SelectItem>
                  <SelectItem value="termination">Termination</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="sm:w-40">
              <Label htmlFor="priority-filter">Priority</Label>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Contracts Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contract Details</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Deadline</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContracts.map((contract) => (
                  <TableRow key={contract.id} className={isOverdue(contract.reviewDeadline) ? 'bg-red-50' : ''}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{contract.carrierName}</div>
                        <div className="text-sm text-muted-foreground">{contract.contractNumber}</div>
                        <div className="text-sm text-muted-foreground">By: {contract.submittedBy}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(contract.contractType)}</TableCell>
                    <TableCell>{contract.submittedDate}</TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-1 ${isOverdue(contract.reviewDeadline) ? 'text-red-600' : ''}`}>
                        {isOverdue(contract.reviewDeadline) && <AlertTriangle className="w-4 h-4" />}
                        {contract.reviewDeadline}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">${(contract.proposedValue / 1000000).toFixed(1)}M</div>
                        <div className="text-sm text-muted-foreground">${contract.proposedRatePerMile}/mile</div>
                      </div>
                    </TableCell>
                    <TableCell>{getPriorityBadge(contract.priority)}</TableCell>
                    <TableCell>{getStatusBadge(contract.status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewContract(contract.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReviewContract(contract)}
                          disabled={contract.status === 'approved' || contract.status === 'rejected'}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadAttachment(contract.attachments[0] || 'contract.pdf')}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredContracts.length === 0 && (
            <div className="text-center py-8">
              <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No contracts found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Review Dialog */}
      <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Contract</DialogTitle>
            <DialogDescription>
              Review and provide decision for {selectedContract?.contractNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm font-medium">Carrier</Label>
                <div className="text-lg">{selectedContract?.carrierName}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Proposed Value</Label>
                <div className="text-lg">${selectedContract?.proposedValue.toLocaleString()}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Rate per Mile</Label>
                <div className="text-lg">${selectedContract?.proposedRatePerMile.toFixed(2)}</div>
              </div>
              <div>
                <Label className="text-sm font-medium">Duration</Label>
                <div className="text-lg">{selectedContract?.proposedStartDate} - {selectedContract?.proposedEndDate}</div>
              </div>
            </div>
            
            <div>
              <Label className="text-sm font-medium">Submitted Notes</Label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                {selectedContract?.reviewNotes}
              </div>
            </div>

            <div>
              <Label className="text-sm font-medium">Attachments</Label>
              <div className="mt-1 space-y-2">
                {selectedContract?.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{attachment}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownloadAttachment(attachment)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="decision">Review Decision</Label>
              <Select value={reviewDecision} onValueChange={(value: unknown) => setReviewDecision(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approve">Approve Contract</SelectItem>
                  <SelectItem value="reject">Reject Contract</SelectItem>
                  <SelectItem value="request-changes">Request Changes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="comments">Review Comments</Label>
              <Textarea
                id="comments"
                placeholder="Provide detailed feedback and reasoning for your decision..."
                value={reviewComments}
                onChange={(e) => setReviewComments(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitReview}>
              <Send className="w-4 h-4 mr-2" />
              Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PendingReviewPage;