import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { 
  FileText, 
  Download, 
  Edit, 
  Save, 
  Search,
  Eye,
  MessageSquare,
  Scale,
  Shield,
  Clock,
  AlertTriangle,
  CheckCircle,
  Building,
  Truck,
  DollarSign,
  Calendar,
  Users
} from 'lucide-react';
import { toast } from 'sonner';

interface ContractTerm {
  id: string;
  category: 'payment' | 'liability' | 'performance' | 'termination' | 'compliance' | 'dispute';
  title: string;
  description: string;
  standardClause: string;
  isNegotiable: boolean;
  riskLevel: 'low' | 'medium' | 'high';
  lastUpdated: string;
  applicableContracts: string[];
}

interface Template {
  id: string;
  name: string;
  type: 'standard' | 'expedite' | 'specialized' | 'regional';
  description: string;
  termsCount: number;
  lastModified: string;
  status: 'active' | 'draft' | 'archived';
  usageCount: number;
}

interface ComplianceRequirement {
  id: string;
  requirement: string;
  description: string;
  regulatorySource: string;
  effectiveDate: string;
  severity: 'critical' | 'important' | 'standard';
  complianceStatus: 'compliant' | 'non-compliant' | 'under-review';
}

const TermsConditionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [riskFilter, setRiskFilter] = useState('all');
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState<ContractTerm | null>(null);
  const [editedClause, setEditedClause] = useState('');

  // Mock data for contract terms
  const contractTerms: ContractTerm[] = [
    {
      id: '1',
      category: 'payment',
      title: 'Payment Terms',
      description: 'Standard payment terms for freight services',
      standardClause: 'Payment shall be made within thirty (30) days of invoice receipt. Late payments will incur a 1.5% monthly service charge.',
      isNegotiable: true,
      riskLevel: 'medium',
      lastUpdated: '2024-01-15',
      applicableContracts: ['Standard', 'Expedite', 'Regional']
    },
    {
      id: '2',
      category: 'liability',
      title: 'Cargo Liability',
      description: 'Carrier liability for cargo damage or loss',
      standardClause: 'Carrier shall be liable for loss or damage to cargo up to $100,000 per occurrence, subject to applicable federal regulations.',
      isNegotiable: false,
      riskLevel: 'high',
      lastUpdated: '2024-01-10',
      applicableContracts: ['Standard', 'Expedite', 'Specialized']
    },
    {
      id: '3',
      category: 'performance',
      title: 'On-Time Delivery',
      description: 'Performance standards for delivery timelines',
      standardClause: 'Carrier must maintain a 95% on-time delivery rate. Failure to meet this standard may result in contract review.',
      isNegotiable: true,
      riskLevel: 'medium',
      lastUpdated: '2024-01-12',
      applicableContracts: ['Standard', 'Expedite']
    },
    {
      id: '4',
      category: 'termination',
      title: 'Contract Termination',
      description: 'Terms for contract termination by either party',
      standardClause: 'Either party may terminate this agreement with sixty (60) days written notice. Immediate termination allowed for material breach.',
      isNegotiable: true,
      riskLevel: 'low',
      lastUpdated: '2024-01-08',
      applicableContracts: ['Standard', 'Regional']
    },
    {
      id: '5',
      category: 'compliance',
      title: 'Safety Compliance',
      description: 'Requirements for safety and regulatory compliance',
      standardClause: 'Carrier must maintain satisfactory safety rating and comply with all DOT regulations. Insurance coverage minimum $1,000,000.',
      isNegotiable: false,
      riskLevel: 'high',
      lastUpdated: '2024-01-20',
      applicableContracts: ['Standard', 'Expedite', 'Specialized', 'Regional']
    },
    {
      id: '6',
      category: 'dispute',
      title: 'Dispute Resolution',
      description: 'Process for handling contractual disputes',
      standardClause: 'Disputes shall be resolved through binding arbitration under American Arbitration Association rules.',
      isNegotiable: true,
      riskLevel: 'medium',
      lastUpdated: '2024-01-05',
      applicableContracts: ['Standard', 'Specialized']
    }
  ];

  // Mock data for templates
  const templates: Template[] = [
    {
      id: '1',
      name: 'Standard Freight Agreement',
      type: 'standard',
      description: 'Standard terms for general freight transportation',
      termsCount: 24,
      lastModified: '2024-01-15',
      status: 'active',
      usageCount: 89
    },
    {
      id: '2',
      name: 'Expedite Service Contract',
      type: 'expedite',
      description: 'Terms for time-sensitive expedited deliveries',
      termsCount: 28,
      lastModified: '2024-01-12',
      status: 'active',
      usageCount: 45
    },
    {
      id: '3',
      name: 'Specialized Cargo Agreement',
      type: 'specialized',
      description: 'Terms for hazmat and specialized freight',
      termsCount: 32,
      lastModified: '2024-01-18',
      status: 'active',
      usageCount: 23
    },
    {
      id: '4',
      name: 'Regional Distribution Contract',
      type: 'regional',
      description: 'Terms for regional and local delivery services',
      termsCount: 20,
      lastModified: '2024-01-10',
      status: 'draft',
      usageCount: 12
    }
  ];

  // Mock data for compliance requirements
  const complianceRequirements: ComplianceRequirement[] = [
    {
      id: '1',
      requirement: 'Hours of Service Compliance',
      description: 'Compliance with federal hours of service regulations',
      regulatorySource: 'FMCSA 49 CFR Part 395',
      effectiveDate: '2024-01-01',
      severity: 'critical',
      complianceStatus: 'compliant'
    },
    {
      id: '2',
      requirement: 'Drug and Alcohol Testing',
      description: 'Required drug and alcohol testing programs',
      regulatorySource: 'DOT 49 CFR Part 382',
      effectiveDate: '2024-01-01',
      severity: 'critical',
      complianceStatus: 'compliant'
    },
    {
      id: '3',
      requirement: 'Electronic Logging Device',
      description: 'ELD mandate compliance for commercial vehicles',
      regulatorySource: 'FMCSA 49 CFR Part 395',
      effectiveDate: '2024-01-01',
      severity: 'critical',
      complianceStatus: 'under-review'
    },
    {
      id: '4',
      requirement: 'Cargo Securement',
      description: 'Proper cargo securement standards',
      regulatorySource: 'FMCSA 49 CFR Part 393',
      effectiveDate: '2024-01-01',
      severity: 'important',
      complianceStatus: 'compliant'
    }
  ];

  const filteredTerms = contractTerms.filter(term => {
    const matchesSearch = term.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || term.category === categoryFilter;
    const matchesRisk = riskFilter === 'all' || term.riskLevel === riskFilter;
    return matchesSearch && matchesCategory && matchesRisk;
  });

  const getRiskBadge = (risk: string) => {
    const variants = {
      low: 'outline',
      medium: 'secondary',
      high: 'destructive'
    } as const;

    return (
      <Badge variant={variants[risk as keyof typeof variants]}>
        {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
      </Badge>
    );
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      payment: <DollarSign className="w-4 h-4" />,
      liability: <Shield className="w-4 h-4" />,
      performance: <Truck className="w-4 h-4" />,
      termination: <AlertTriangle className="w-4 h-4" />,
      compliance: <Scale className="w-4 h-4" />,
      dispute: <MessageSquare className="w-4 h-4" />
    };

    return icons[category as keyof typeof icons] || <FileText className="w-4 h-4" />;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default',
      draft: 'secondary',
      archived: 'outline'
    } as const;

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getComplianceBadge = (status: string, severity: string) => {
    const variants = {
      compliant: 'default',
      'non-compliant': 'destructive',
      'under-review': 'secondary'
    } as const;

    const icons = {
      compliant: <CheckCircle className="w-3 h-3" />,
      'non-compliant': <AlertTriangle className="w-3 h-3" />,
      'under-review': <Clock className="w-3 h-3" />
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]} className="flex items-center gap-1">
        {icons[status as keyof typeof icons]}
        {status.replace('-', ' ').charAt(0).toUpperCase() + status.replace('-', ' ').slice(1)}
      </Badge>
    );
  };

  const handleEditTerm = (term: ContractTerm) => {
    setSelectedTerm(term);
    setEditedClause(term.standardClause);
    setIsEditDialogOpen(true);
  };

  const handleSaveTerm = () => {
    if (!editedClause.trim()) {
      toast.error('Please provide the contract clause text');
      return;
    }
    toast.success(`Updated term: ${selectedTerm?.title}`);
    setIsEditDialogOpen(false);
    setEditedClause('');
  };

  const handleDownloadTemplate = (templateId: string) => {
    toast.success(`Downloading template ${templateId}`);
  };

  const handleViewTemplate = (templateId: string) => {
    toast.success(`Opening template ${templateId} for review`);
  };

  const handleCreateTemplate = () => {
    toast.success('Creating new contract template');
  };

  const handleExportTerms = () => {
    toast.success('Exporting terms and conditions');
  };

  return (
    <div className="container-responsive py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Terms & Conditions</h1>
          <p className="text-muted-foreground">Manage contract terms, templates, and compliance requirements</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={handleExportTerms}>
            <Download className="w-4 h-4 mr-2" />
            Export Terms
          </Button>
          <Button onClick={handleCreateTemplate}>
            <FileText className="w-4 h-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      <Tabs defaultValue="terms" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="terms">Contract Terms</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="library">Legal Library</TabsTrigger>
        </TabsList>

        <TabsContent value="terms" className="space-y-6">
          {/* Terms Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Terms</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contractTerms.length}</div>
                <p className="text-xs text-muted-foreground">
                  Active contract clauses
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">High Risk Terms</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contractTerms.filter(t => t.riskLevel === 'high').length}</div>
                <p className="text-xs text-muted-foreground">
                  Requiring legal review
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Negotiable Terms</CardTitle>
                <Scale className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{contractTerms.filter(t => t.isNegotiable).length}</div>
                <p className="text-xs text-muted-foreground">
                  Available for negotiation
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Contract Terms */}
          <Card>
            <CardHeader>
              <CardTitle>Contract Terms & Clauses</CardTitle>
              <CardDescription>Manage standard terms and conditions for carrier agreements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search terms and clauses..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Label htmlFor="category-filter">Category</Label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="liability">Liability</SelectItem>
                      <SelectItem value="performance">Performance</SelectItem>
                      <SelectItem value="termination">Termination</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="dispute">Dispute</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:w-48">
                  <Label htmlFor="risk-filter">Risk Level</Label>
                  <Select value={riskFilter} onValueChange={setRiskFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Risk Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Risk Levels</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                      <SelectItem value="medium">Medium Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {filteredTerms.map((term) => (
                  <AccordionItem key={term.id} value={term.id} className="border rounded-lg px-4">
                    <AccordionTrigger className="hover:no-underline">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div className="flex items-center gap-3">
                          {getCategoryIcon(term.category)}
                          <div className="text-left">
                            <div className="font-medium">{term.title}</div>
                            <div className="text-sm text-muted-foreground">{term.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getRiskBadge(term.riskLevel)}
                          {term.isNegotiable && <Badge variant="outline">Negotiable</Badge>}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pt-4">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium">Standard Clause</Label>
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                            {term.standardClause}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            Last updated: {term.lastUpdated} | Applicable to: {term.applicableContracts.join(', ')}
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEditTerm(term)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              Preview
                            </Button>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contract Templates</CardTitle>
              <CardDescription>Pre-built contract templates for different service types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription>{template.description}</CardDescription>
                        </div>
                        {getStatusBadge(template.status)}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-muted-foreground">Terms Count</div>
                            <div className="font-medium">{template.termsCount}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Usage Count</div>
                            <div className="font-medium">{template.usageCount}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Last Modified</div>
                            <div className="font-medium">{template.lastModified}</div>
                          </div>
                          <div>
                            <div className="text-muted-foreground">Type</div>
                            <div className="font-medium capitalize">{template.type}</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewTemplate(template.id)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDownloadTemplate(template.id)}>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Regulatory Compliance</CardTitle>
              <CardDescription>Monitor compliance with federal and state regulations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceRequirements.map((requirement) => (
                  <div key={requirement.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{requirement.requirement}</h3>
                        <p className="text-sm text-muted-foreground">{requirement.description}</p>
                      </div>
                      {getComplianceBadge(requirement.complianceStatus, requirement.severity)}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Regulatory Source</div>
                        <div className="font-medium">{requirement.regulatorySource}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Effective Date</div>
                        <div className="font-medium">{requirement.effectiveDate}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Severity</div>
                        <Badge variant={requirement.severity === 'critical' ? 'destructive' : 'secondary'}>
                          {requirement.severity.charAt(0).toUpperCase() + requirement.severity.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="library" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Legal Document Library</CardTitle>
              <CardDescription>Access to legal resources and reference materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Scale className="w-5 h-5" />
                      Federal Regulations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Complete collection of federal transportation regulations
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Browse
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      State Requirements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      State-specific transportation laws and requirements
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Browse
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Industry Standards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Industry best practices and standard agreements
                    </p>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Browse
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Term Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Contract Term</DialogTitle>
            <DialogDescription>
              Modify the standard clause for: {selectedTerm?.title}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="term-title">Term Title</Label>
              <Input
                id="term-title"
                value={selectedTerm?.title || ''}
                disabled
              />
            </div>
            <div>
              <Label htmlFor="term-category">Category</Label>
              <Select value={selectedTerm?.category} disabled>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
              </Select>
            </div>
            <div>
              <Label htmlFor="edited-clause">Contract Clause</Label>
              <Textarea
                id="edited-clause"
                value={editedClause}
                onChange={(e) => setEditedClause(e.target.value)}
                rows={6}
                placeholder="Enter the contract clause text..."
              />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Label>Risk Level:</Label>
                {selectedTerm && getRiskBadge(selectedTerm.riskLevel)}
              </div>
              <div className="flex items-center gap-2">
                <Label>Negotiable:</Label>
                <Badge variant={selectedTerm?.isNegotiable ? 'default' : 'outline'}>
                  {selectedTerm?.isNegotiable ? 'Yes' : 'No'}
                </Badge>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTerm}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TermsConditionsPage;