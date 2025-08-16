/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Heart, 
  Shield, 
  DollarSign, 
  Calendar,
  Plus,
  Minus,
  Edit,
  Eye,
  Download,
  Clock,
  Users,
  FileText,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail,
  MapPin,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';

interface BenefitPlan {
  id: string;
  type: 'health' | 'dental' | 'vision' | 'life' | 'disability' | '401k' | 'pto';
  name: string;
  provider: string;
  status: 'active' | 'pending' | 'inactive';
  monthlyCost: number;
  employeeContribution: number;
  companyContribution: number;
  coverage: string;
  planDetails: {
    deductible?: number;
    copay?: number;
    coinsurance?: number;
    maxOutOfPocket?: number;
  };
  enrollmentDate: string;
  nextRenewal: string;
}

interface PTOBalance {
  type: 'vacation' | 'sick' | 'personal' | 'holiday';
  available: number;
  used: number;
  accrued: number;
  total: number;
  carryOver: number;
}

interface RetirementAccount {
  accountType: '401k' | 'roth401k';
  balance: number;
  employeeContribution: number;
  companyMatch: number;
  vested: number;
  contributionLimit: number;
  ytdContributions: number;
}

const BenefitsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('overview');
  const [showEnrollmentDialog, setShowEnrollmentDialog] = useState(false);
  const [selectedBenefit, setSelectedBenefit] = useState<BenefitPlan | null>(null);

  // Sample benefit plans
  const benefitPlans: BenefitPlan[] = [
    {
      id: '1',
      type: 'health',
      name: 'Premium Health Plan',
      provider: 'Blue Cross Blue Shield',
      status: 'active',
      monthlyCost: 650.00,
      employeeContribution: 195.00,
      companyContribution: 455.00,
      coverage: 'Employee + Family',
      planDetails: {
        deductible: 1500,
        copay: 25,
        coinsurance: 20,
        maxOutOfPocket: 6000
      },
      enrollmentDate: '2024-01-01',
      nextRenewal: '2025-01-01'
    },
    {
      id: '2',
      type: 'dental',
      name: 'Comprehensive Dental',
      provider: 'Delta Dental',
      status: 'active',
      monthlyCost: 85.00,
      employeeContribution: 25.50,
      companyContribution: 59.50,
      coverage: 'Employee + Spouse',
      planDetails: {
        deductible: 50,
        maxOutOfPocket: 1500
      },
      enrollmentDate: '2024-01-01',
      nextRenewal: '2025-01-01'
    },
    {
      id: '3',
      type: 'vision',
      name: 'Vision Care Plan',
      provider: 'VSP',
      status: 'active',
      monthlyCost: 24.00,
      employeeContribution: 12.00,
      companyContribution: 12.00,
      coverage: 'Employee Only',
      planDetails: {
        copay: 10
      },
      enrollmentDate: '2024-01-01',
      nextRenewal: '2025-01-01'
    },
    {
      id: '4',
      type: 'life',
      name: 'Term Life Insurance',
      provider: 'MetLife',
      status: 'active',
      monthlyCost: 15.00,
      employeeContribution: 0,
      companyContribution: 15.00,
      coverage: '$50,000',
      planDetails: {},
      enrollmentDate: '2024-01-01',
      nextRenewal: '2025-01-01'
    }
  ];

  // Sample PTO balances
  const ptoBalances: PTOBalance[] = [
    {
      type: 'vacation',
      available: 76.5,
      used: 43.5,
      accrued: 120,
      total: 120,
      carryOver: 40
    },
    {
      type: 'sick',
      available: 32.0,
      used: 8.0,
      accrued: 40,
      total: 40,
      carryOver: 0
    },
    {
      type: 'personal',
      available: 16.0,
      used: 8.0,
      accrued: 24,
      total: 24,
      carryOver: 0
    },
    {
      type: 'holiday',
      available: 8.0,
      used: 0,
      accrued: 8,
      total: 8,
      carryOver: 0
    }
  ];

  // Sample retirement account
  const retirementAccount: RetirementAccount = {
    accountType: '401k',
    balance: 24580.45,
    employeeContribution: 6.0, // percentage
    companyMatch: 3.0, // percentage
    vested: 85.0, // percentage
    contributionLimit: 23000,
    ytdContributions: 4890.50
  };

  const handleViewBenefitDetails = (benefit: BenefitPlan) => {
    setSelectedBenefit(benefit);
    toast.success('Loading benefit details...');
  };

  const handleRequestTimeOff = () => {
    setShowEnrollmentDialog(true);
    toast.info('Opening time-off request form...');
  };

  const handleDownloadBenefitSummary = () => {
    toast.success('Benefits summary downloaded successfully');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-100 text-emerald-800">Active</Badge>;
      case 'pending':
        return <Badge className="bg-amber-100 text-amber-800">Pending</Badge>;
      case 'inactive':
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getBenefitIcon = (type: string) => {
    switch (type) {
      case 'health':
        return <Heart className="h-5 w-5 text-red-500" />;
      case 'dental':
        return <Heart className="h-5 w-5 text-blue-500" />;
      case 'vision':
        return <Eye className="h-5 w-5 text-green-500" />;
      case 'life':
        return <Shield className="h-5 w-5 text-purple-500" />;
      case 'disability':
        return <Shield className="h-5 w-5 text-orange-500" />;
      case '401k':
        return <DollarSign className="h-5 w-5 text-emerald-500" />;
      case 'pto':
        return <Calendar className="h-5 w-5 text-blue-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  const totalMonthlyContributions = benefitPlans.reduce((sum, plan) => sum + plan.employeeContribution, 0);
  const totalAnnualValue = benefitPlans.reduce((sum, plan) => sum + plan.monthlyCost, 0) * 12;

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Benefits</h1>
          <p className="text-muted-foreground">Manage your health, retirement, and time-off benefits</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={handleDownloadBenefitSummary}>
            <Download className="h-4 w-4 mr-2" />
            Download Summary
          </Button>
          <Button onClick={() => toast.info('Contacting HR...')}>
            <Phone className="h-4 w-4 mr-2" />
            Contact HR
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="gradient-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Benefit Value</p>
                <p className="text-2xl font-bold text-primary">${totalAnnualValue.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Contribution</p>
                <p className="text-2xl font-bold">${totalMonthlyContributions.toFixed(2)}</p>
              </div>
              <Heart className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">PTO Available</p>
                <p className="text-2xl font-bold">{ptoBalances.find(p => p.type === 'vacation')?.available}h</p>
              </div>
              <Calendar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">401(k) Balance</p>
                <p className="text-2xl font-bold">${retirementAccount.balance.toLocaleString()}</p>
              </div>
              <DollarSign className="h-8 w-8 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="health">Health & Insurance</TabsTrigger>
          <TabsTrigger value="retirement">Retirement</TabsTrigger>
          <TabsTrigger value="time-off">Time Off</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Active Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Active Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {benefitPlans.filter(plan => plan.status === 'active').map((plan) => (
                  <div key={plan.id} className="border rounded-lg p-4 hover:bg-muted/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getBenefitIcon(plan.type)}
                        <div>
                          <div className="font-medium">{plan.name}</div>
                          <div className="text-sm text-muted-foreground">{plan.provider}</div>
                        </div>
                      </div>
                      {getStatusBadge(plan.status)}
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Coverage:</span>
                        <span className="font-medium">{plan.coverage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Cost:</span>
                        <span className="font-medium">${plan.employeeContribution.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Company Contribution:</span>
                        <span className="font-medium text-emerald-600">${plan.companyContribution.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewBenefitDetails(plan)}
                        className="w-full"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button onClick={handleRequestTimeOff} className="h-20 flex-col">
                  <Calendar className="h-6 w-6 mb-2" />
                  Request Time Off
                </Button>
                <Button onClick={() => toast.info('Opening enrollment...')} variant="outline" className="h-20 flex-col">
                  <Plus className="h-6 w-6 mb-2" />
                  Enroll in Benefits
                </Button>
                <Button onClick={() => toast.info('Updating beneficiaries...')} variant="outline" className="h-20 flex-col">
                  <Users className="h-6 w-6 mb-2" />
                  Update Beneficiaries
                </Button>
                <Button onClick={() => toast.info('Accessing wellness...')} variant="outline" className="h-20 flex-col">
                  <Heart className="h-6 w-6 mb-2" />
                  Wellness Programs
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          {/* Health Insurance Details */}
          <Card>
            <CardHeader>
              <CardTitle>Health & Insurance Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {benefitPlans.filter(plan => ['health', 'dental', 'vision', 'life'].includes(plan.type)).map((plan) => (
                  <div key={plan.id} className="border rounded-lg p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getBenefitIcon(plan.type)}
                        <div>
                          <h3 className="font-semibold text-lg">{plan.name}</h3>
                          <p className="text-muted-foreground">{plan.provider}</p>
                        </div>
                      </div>
                      {getStatusBadge(plan.status)}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-semibold">Coverage Details</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Coverage Level:</span>
                            <span className="font-medium">{plan.coverage}</span>
                          </div>
                          {plan.planDetails.deductible && (
                            <div className="flex justify-between">
                              <span>Deductible:</span>
                              <span className="font-medium">${plan.planDetails.deductible.toLocaleString()}</span>
                            </div>
                          )}
                          {plan.planDetails.copay && (
                            <div className="flex justify-between">
                              <span>Copay:</span>
                              <span className="font-medium">${plan.planDetails.copay}</span>
                            </div>
                          )}
                          {plan.planDetails.coinsurance && (
                            <div className="flex justify-between">
                              <span>Coinsurance:</span>
                              <span className="font-medium">{plan.planDetails.coinsurance}%</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">Cost Breakdown</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Total Monthly Cost:</span>
                            <span className="font-medium">${plan.monthlyCost.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Your Contribution:</span>
                            <span className="font-medium">${plan.employeeContribution.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Company Pays:</span>
                            <span className="font-medium text-emerald-600">${plan.companyContribution.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Company Savings:</span>
                            <span className="font-medium text-emerald-600">
                              {((plan.companyContribution / plan.monthlyCost) * 100).toFixed(0)}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h4 className="font-semibold">Plan Information</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Enrollment Date:</span>
                            <span className="font-medium">{new Date(plan.enrollmentDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Next Renewal:</span>
                            <span className="font-medium">{new Date(plan.nextRenewal).toLocaleDateString()}</span>
                          </div>
                          {plan.planDetails.maxOutOfPocket && (
                            <div className="flex justify-between">
                              <span>Max Out-of-Pocket:</span>
                              <span className="font-medium">${plan.planDetails.maxOutOfPocket.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t flex gap-2">
                      <Button size="sm" onClick={() => toast.info('Viewing plan documents...')}>
                        <FileText className="h-4 w-4 mr-2" />
                        Plan Documents
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toast.info('Finding providers...')}>
                        <MapPin className="h-4 w-4 mr-2" />
                        Find Providers
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => toast.info('Viewing claims...')}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Claims
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retirement" className="space-y-6">
          {/* 401(k) Account */}
          <Card>
            <CardHeader>
              <CardTitle>401(k) Retirement Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold">Account Balance</h4>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">
                      ${retirementAccount.balance.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {retirementAccount.vested}% vested
                    </div>
                    <Progress value={retirementAccount.vested} className="w-full" />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Contributions</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Your Contribution:</span>
                      <span className="font-medium">{retirementAccount.employeeContribution}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Company Match:</span>
                      <span className="font-medium text-emerald-600">{retirementAccount.companyMatch}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>YTD Contributions:</span>
                      <span className="font-medium">${retirementAccount.ytdContributions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Limit:</span>
                      <span className="font-medium">${retirementAccount.contributionLimit.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Progress to Limit</h4>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold">
                      ${(retirementAccount.contributionLimit - retirementAccount.ytdContributions).toLocaleString()} remaining
                    </div>
                    <Progress 
                      value={(retirementAccount.ytdContributions / retirementAccount.contributionLimit) * 100} 
                      className="w-full" 
                    />
                    <div className="text-sm text-muted-foreground">
                      {((retirementAccount.ytdContributions / retirementAccount.contributionLimit) * 100).toFixed(1)}% of annual limit
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <DollarSign className="h-5 w-5 text-emerald-600" />
                  <h4 className="font-semibold">Free Money Alert!</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  You're currently contributing {retirementAccount.employeeContribution}% and receiving the full company match of {retirementAccount.companyMatch}%. 
                  Consider increasing your contribution to maximize your retirement savings.
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={() => toast.info('Opening contribution manager...')}>
                  <Edit className="h-4 w-4 mr-2" />
                  Change Contribution
                </Button>
                <Button variant="outline" onClick={() => toast.info('Viewing investment options...')}>
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Investment Options
                </Button>
                <Button variant="outline" onClick={() => toast.info('Downloading statement...')}>
                  <Download className="h-4 w-4 mr-2" />
                  Download Statement
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time-off" className="space-y-6">
          {/* PTO Balances */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ptoBalances.map((pto) => (
              <Card key={pto.type}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-medium capitalize">{pto.type}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{pto.available}h</div>
                    <div className="text-sm text-muted-foreground">Available</div>
                    <Progress value={(pto.available / pto.total) * 100} className="w-full" />
                    <div className="text-xs text-muted-foreground">
                      {pto.used}h used of {pto.total}h total
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Time Off Requests */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Time Off Management</span>
                <Button onClick={handleRequestTimeOff}>
                  <Plus className="h-4 w-4 mr-2" />
                  Request Time Off
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold">Recent Requests</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <div className="font-medium">Dec 25-29, 2023</div>
                          <div className="text-sm text-muted-foreground">Vacation - 32h</div>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-800">Approved</Badge>
                      </div>
                      <div className="flex justify-between items-center p-2 border rounded">
                        <div>
                          <div className="font-medium">Nov 23-24, 2023</div>
                          <div className="text-sm text-muted-foreground">Holiday - 16h</div>
                        </div>
                        <Badge className="bg-emerald-100 text-emerald-800">Approved</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Accrual Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Vacation Accrual Rate:</span>
                        <span className="font-medium">10h/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sick Accrual Rate:</span>
                        <span className="font-medium">3.33h/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Max Carryover:</span>
                        <span className="font-medium">40h vacation</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Accrual:</span>
                        <span className="font-medium">Jan 31, 2024</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold">Policy Information</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span>24h advance notice required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span>Manager approval needed</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-amber-600" />
                        <span>Peak season restrictions apply</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                        <span>Unused vacation expires Dec 31</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex gap-2">
                    <Button onClick={() => toast.info('Viewing PTO calendar...')}>
                      <Calendar className="h-4 w-4 mr-2" />
                      View PTO Calendar
                    </Button>
                    <Button variant="outline" onClick={() => toast.info('Downloading PTO report...')}>
                      <Download className="h-4 w-4 mr-2" />
                      Download Report
                    </Button>
                    <Button variant="outline" onClick={() => toast.info('Viewing policy...')}>
                      <FileText className="h-4 w-4 mr-2" />
                      View Policy
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Time Off Request Dialog */}
      <Dialog open={showEnrollmentDialog} onOpenChange={setShowEnrollmentDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Request Time Off</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Request Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vacation">Vacation</SelectItem>
                    <SelectItem value="sick">Sick Leave</SelectItem>
                    <SelectItem value="personal">Personal Day</SelectItem>
                    <SelectItem value="holiday">Holiday</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Duration</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full-day">Full Day</SelectItem>
                    <SelectItem value="half-day">Half Day</SelectItem>
                    <SelectItem value="multiple-days">Multiple Days</SelectItem>
                    <SelectItem value="custom">Custom Hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start Date</Label>
                <Input type="date" />
              </div>
              <div>
                <Label>End Date</Label>
                <Input type="date" />
              </div>
            </div>

            <div>
              <Label>Reason (Optional)</Label>
              <Input placeholder="Reason for time off request" />
            </div>

            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="h-4 w-4" />
                <span className="font-medium">Available Balances</span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Vacation: {ptoBalances.find(p => p.type === 'vacation')?.available}h</div>
                <div>Sick: {ptoBalances.find(p => p.type === 'sick')?.available}h</div>
                <div>Personal: {ptoBalances.find(p => p.type === 'personal')?.available}h</div>
                <div>Holiday: {ptoBalances.find(p => p.type === 'holiday')?.available}h</div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={() => {
                toast.success('Time off request submitted successfully');
                setShowEnrollmentDialog(false);
              }}>
                Submit Request
              </Button>
              <Button variant="outline" onClick={() => setShowEnrollmentDialog(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BenefitsPage;