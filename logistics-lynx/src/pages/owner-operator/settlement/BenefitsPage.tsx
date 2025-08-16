/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  Heart, 
  Shield, 
  PiggyBank, 
  Calendar, 
  Phone, 
  FileText, 
  Plus,
  Edit,
  Eye,
  Download,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  Search
} from 'lucide-react';
import { toast } from 'sonner';

interface Benefit {
  id: string;
  name: string;
  type: 'health' | 'dental' | 'vision' | 'retirement' | 'life' | 'disability';
  provider: string;
  premium: number;
  employerContribution: number;
  employeeContribution: number;
  coverage: string;
  status: 'active' | 'pending' | 'declined' | 'expired';
  enrollmentDate?: string;
  expirationDate?: string;
}

interface Claim {
  id: string;
  benefitType: string;
  claimDate: string;
  serviceDate: string;
  provider: string;
  amount: number;
  status: 'submitted' | 'processing' | 'approved' | 'denied' | 'paid';
  description: string;
  claimNumber: string;
}

interface RetirementAccount {
  accountType: '401k' | 'IRA' | 'Roth-IRA';
  balance: number;
  contribution: number;
  employerMatch: number;
  yearToDateContribution: number;
  vestingPercentage: number;
}

const BenefitsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [benefitTypeFilter, setBenefitTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isEnrollDialogOpen, setIsEnrollDialogOpen] = useState(false);
  const [isClaimDialogOpen, setIsClaimDialogOpen] = useState(false);
  const [newClaimData, setNewClaimData] = useState({
    benefitType: '',
    serviceDate: '',
    provider: '',
    amount: '',
    description: ''
  });

  // Mock data for benefits
  const benefits: Benefit[] = [
    {
      id: '1',
      name: 'Health Insurance Premium',
      type: 'health',
      provider: 'Blue Cross Blue Shield',
      premium: 850.00,
      employerContribution: 680.00,
      employeeContribution: 170.00,
      coverage: 'Individual + Family',
      status: 'active',
      enrollmentDate: '2024-01-01',
      expirationDate: '2024-12-31'
    },
    {
      id: '2',
      name: 'Dental Insurance',
      type: 'dental',
      provider: 'Delta Dental',
      premium: 120.00,
      employerContribution: 96.00,
      employeeContribution: 24.00,
      coverage: 'Individual + Family',
      status: 'active',
      enrollmentDate: '2024-01-01',
      expirationDate: '2024-12-31'
    },
    {
      id: '3',
      name: 'Vision Insurance',
      type: 'vision',
      provider: 'VSP',
      premium: 45.00,
      employerContribution: 36.00,
      employeeContribution: 9.00,
      coverage: 'Individual + Family',
      status: 'active',
      enrollmentDate: '2024-01-01',
      expirationDate: '2024-12-31'
    },
    {
      id: '4',
      name: '401(k) Retirement Plan',
      type: 'retirement',
      provider: 'Fidelity',
      premium: 0,
      employerContribution: 150.00,
      employeeContribution: 500.00,
      coverage: '6% employer match',
      status: 'active',
      enrollmentDate: '2024-01-01'
    },
    {
      id: '5',
      name: 'Life Insurance',
      type: 'life',
      provider: 'MetLife',
      premium: 85.00,
      employerContribution: 85.00,
      employeeContribution: 0,
      coverage: '2x Annual Salary',
      status: 'active',
      enrollmentDate: '2024-01-01'
    },
    {
      id: '6',
      name: 'Short-Term Disability',
      type: 'disability',
      provider: 'Guardian',
      premium: 65.00,
      employerContribution: 65.00,
      employeeContribution: 0,
      coverage: '60% of salary',
      status: 'active',
      enrollmentDate: '2024-01-01'
    }
  ];

  // Mock data for claims
  const claims: Claim[] = [
    {
      id: '1',
      benefitType: 'Health',
      claimDate: '2024-01-15',
      serviceDate: '2024-01-12',
      provider: 'City Medical Center',
      amount: 850.00,
      status: 'paid',
      description: 'Annual physical examination',
      claimNumber: 'CL-2024-001'
    },
    {
      id: '2',
      benefitType: 'Dental',
      claimDate: '2024-01-20',
      serviceDate: '2024-01-18',
      provider: 'Smile Dental Care',
      amount: 320.00,
      status: 'approved',
      description: 'Dental cleaning and X-rays',
      claimNumber: 'CL-2024-002'
    },
    {
      id: '3',
      benefitType: 'Vision',
      claimDate: '2024-01-22',
      serviceDate: '2024-01-20',
      provider: 'VisionCare Center',
      amount: 275.00,
      status: 'processing',
      description: 'Eye exam and prescription glasses',
      claimNumber: 'CL-2024-003'
    },
    {
      id: '4',
      benefitType: 'Health',
      claimDate: '2024-01-25',
      serviceDate: '2024-01-24',
      provider: 'Urgent Care Plus',
      amount: 450.00,
      status: 'submitted',
      description: 'Urgent care visit for injury',
      claimNumber: 'CL-2024-004'
    }
  ];

  // Mock data for retirement account
  const retirementAccount: RetirementAccount = {
    accountType: '401k',
    balance: 125000.00,
    contribution: 500.00,
    employerMatch: 150.00,
    yearToDateContribution: 2000.00,
    vestingPercentage: 100
  };

  const filteredBenefits = benefits.filter(benefit => {
    const matchesSearch = benefit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         benefit.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = benefitTypeFilter === 'all' || benefit.type === benefitTypeFilter;
    const matchesStatus = statusFilter === 'all' || benefit.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      pending: 'secondary',
      declined: 'destructive',
      expired: 'outline'
    } as const;
    
    const icons = {
      active: <CheckCircle className="w-3 h-3" />,
      pending: <Clock className="w-3 h-3" />,
      declined: <AlertCircle className="w-3 h-3" />,
      expired: <Clock className="w-3 h-3" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className="flex items-center gap-1">
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getClaimStatusBadge = (status: string) => {
    const variants = {
      submitted: 'secondary',
      processing: 'outline', 
      approved: 'default',
      denied: 'destructive',
      paid: 'default'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getBenefitIcon = (type: string) => {
    const icons = {
      health: <Heart className="w-4 h-4" />,
      dental: <Heart className="w-4 h-4" />,
      vision: <Eye className="w-4 h-4" />,
      retirement: <PiggyBank className="w-4 h-4" />,
      life: <Shield className="w-4 h-4" />,
      disability: <Shield className="w-4 h-4" />
    };

    return icons[type as keyof typeof icons] || <Shield className="w-4 h-4" />;
  };

  const handleViewBenefit = (benefitId: string) => {
    toast.success(`Viewing benefit details for ${benefitId}`);
  };

  const handleEnrollBenefit = () => {
    toast.success('Benefit enrollment submitted for review');
    setIsEnrollDialogOpen(false);
  };

  const handleSubmitClaim = () => {
    if (!newClaimData.benefitType || !newClaimData.provider || !newClaimData.amount) {
      toast.error('Please fill in all required fields');
      return;
    }
    toast.success('Insurance claim submitted successfully');
    setIsClaimDialogOpen(false);
    setNewClaimData({
      benefitType: '',
      serviceDate: '',
      provider: '',
      amount: '',
      description: ''
    });
  };

  const handleContactSupport = (benefitType: string) => {
    toast.success(`Contacting support for ${benefitType} benefits`);
  };

  const totalMonthlyContribution = benefits.reduce((sum, benefit) => sum + benefit.employeeContribution, 0);
  const totalEmployerContribution = benefits.reduce((sum, benefit) => sum + benefit.employerContribution, 0);

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Benefits</h1>
          <p className="text-muted-foreground">Manage your employee benefits and claims</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog open={isClaimDialogOpen} onOpenChange={setIsClaimDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Submit Claim
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Submit Insurance Claim</DialogTitle>
                <DialogDescription>Submit a new claim for reimbursement</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="benefit-type">Benefit Type</Label>
                  <Select 
                    value={newClaimData.benefitType} 
                    onValueChange={(value) => setNewClaimData({...newClaimData, benefitType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select benefit type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Health">Health Insurance</SelectItem>
                      <SelectItem value="Dental">Dental Insurance</SelectItem>
                      <SelectItem value="Vision">Vision Insurance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="service-date">Service Date</Label>
                    <Input
                      id="service-date"
                      type="date"
                      value={newClaimData.serviceDate}
                      onChange={(e) => setNewClaimData({...newClaimData, serviceDate: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={newClaimData.amount}
                      onChange={(e) => setNewClaimData({...newClaimData, amount: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="provider">Healthcare Provider</Label>
                  <Input
                    id="provider"
                    placeholder="e.g., City Medical Center"
                    value={newClaimData.provider}
                    onChange={(e) => setNewClaimData({...newClaimData, provider: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description of Service</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the medical service or treatment..."
                    value={newClaimData.description}
                    onChange={(e) => setNewClaimData({...newClaimData, description: e.target.value})}
                    rows={3}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsClaimDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitClaim}>
                  <FileText className="w-4 h-4 mr-2" />
                  Submit Claim
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Dialog open={isEnrollDialogOpen} onOpenChange={setIsEnrollDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Enroll in Benefit
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enroll in Benefits</DialogTitle>
                <DialogDescription>Select additional benefits to enroll in</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="new-benefit">Available Benefits</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a benefit to enroll" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="supplemental-life">Supplemental Life Insurance</SelectItem>
                      <SelectItem value="long-term-disability">Long-term Disability</SelectItem>
                      <SelectItem value="hsa">Health Savings Account</SelectItem>
                      <SelectItem value="dependent-care">Dependent Care FSA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="coverage-level">Coverage Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select coverage level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="family">Individual + Family</SelectItem>
                      <SelectItem value="spouse">Individual + Spouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEnrollDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleEnrollBenefit}>
                  <Plus className="w-4 h-4 mr-2" />
                  Enroll
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Benefits Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Contribution</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalMonthlyContribution.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Your monthly premium</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Employer Contribution</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalEmployerContribution.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Company contribution</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Benefits</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{benefits.filter(b => b.status === 'active').length}</div>
            <p className="text-xs text-muted-foreground">Currently enrolled</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Benefits Overview</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="retirement">Retirement</TabsTrigger>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Benefits Table */}
          <Card>
            <CardHeader>
              <CardTitle>Your Benefits</CardTitle>
              <CardDescription>Overview of your enrolled benefits and coverage</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search benefits..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Label htmlFor="type-filter">Benefit Type</Label>
                  <Select value={benefitTypeFilter} onValueChange={setBenefitTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="health">Health</SelectItem>
                      <SelectItem value="dental">Dental</SelectItem>
                      <SelectItem value="vision">Vision</SelectItem>
                      <SelectItem value="retirement">Retirement</SelectItem>
                      <SelectItem value="life">Life Insurance</SelectItem>
                      <SelectItem value="disability">Disability</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Benefit</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Coverage</TableHead>
                      <TableHead>Your Cost</TableHead>
                      <TableHead>Company Cost</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBenefits.map((benefit) => (
                      <TableRow key={benefit.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {getBenefitIcon(benefit.type)}
                            <div>
                              <div className="font-medium">{benefit.name}</div>
                              <div className="text-sm text-muted-foreground capitalize">{benefit.type}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{benefit.provider}</TableCell>
                        <TableCell>{benefit.coverage}</TableCell>
                        <TableCell>${benefit.employeeContribution.toFixed(2)}/mo</TableCell>
                        <TableCell>${benefit.employerContribution.toFixed(2)}/mo</TableCell>
                        <TableCell>{getStatusBadge(benefit.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewBenefit(benefit.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleContactSupport(benefit.name)}
                            >
                              <Phone className="w-4 h-4" />
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
        </TabsContent>

        <TabsContent value="claims" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
              <CardDescription>Track your insurance claims and reimbursements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Claim #</TableHead>
                      <TableHead>Benefit Type</TableHead>
                      <TableHead>Service Date</TableHead>
                      <TableHead>Provider</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {claims.map((claim) => (
                      <TableRow key={claim.id}>
                        <TableCell className="font-medium">{claim.claimNumber}</TableCell>
                        <TableCell>{claim.benefitType}</TableCell>
                        <TableCell>{claim.serviceDate}</TableCell>
                        <TableCell>{claim.provider}</TableCell>
                        <TableCell>${claim.amount.toFixed(2)}</TableCell>
                        <TableCell>{getClaimStatusBadge(claim.status)}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
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
        </TabsContent>

        <TabsContent value="retirement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PiggyBank className="w-5 h-5" />
                401(k) Retirement Account
              </CardTitle>
              <CardDescription>Manage your retirement savings and contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Account Balance</div>
                    <div className="text-3xl font-bold">${retirementAccount.balance.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Monthly Contribution</div>
                    <div className="text-xl font-semibold">${retirementAccount.contribution.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Employer Match</div>
                    <div className="text-xl font-semibold">${retirementAccount.employerMatch.toFixed(2)}</div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Year-to-Date Contribution</div>
                    <div className="text-xl font-semibold">${retirementAccount.yearToDateContribution.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Vesting Percentage</div>
                    <div className="text-xl font-semibold">{retirementAccount.vestingPercentage}%</div>
                    <Progress value={retirementAccount.vestingPercentage} className="h-2 mt-2" />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Change Contribution
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Investments
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>HR Benefits Team</CardTitle>
                <CardDescription>Contact our HR team for benefits questions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <span>(555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Mon-Fri, 8:00 AM - 5:00 PM CT</span>
                </div>
                <Button className="w-full" onClick={() => handleContactSupport('HR Benefits')}>
                  <Phone className="w-4 h-4 mr-2" />
                  Call HR Benefits
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Insurance Providers</CardTitle>
                <CardDescription>Direct contact with your insurance providers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span>Blue Cross Blue Shield</span>
                  <Button variant="ghost" size="sm" onClick={() => handleContactSupport('Health Insurance')}>
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Delta Dental</span>
                  <Button variant="ghost" size="sm" onClick={() => handleContactSupport('Dental Insurance')}>
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>VSP Vision</span>
                  <Button variant="ghost" size="sm" onClick={() => handleContactSupport('Vision Insurance')}>
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex justify-between items-center">
                  <span>Fidelity (401k)</span>
                  <Button variant="ghost" size="sm" onClick={() => handleContactSupport('Retirement')}>
                    <Phone className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BenefitsPage;