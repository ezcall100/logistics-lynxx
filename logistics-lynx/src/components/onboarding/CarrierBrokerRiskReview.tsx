/**
 * Phase 7.3: Carrier & Broker Compliant Risk Management Onboarding
 * 11-step enterprise-grade onboarding wizard with compliance scoring
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { 
  Truck, 
  Building2, 
  FileText, 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Upload, 
  Download,
  Eye,
  Edit,
  Save,
  ArrowLeft,
  ArrowRight,
  CreditCard,
  Users,
  MapPin,
  Phone,
  Mail,
  Globe,
  Calendar,
  DollarSign,
  FileCheck,
  Signature,
  Settings,
  BarChart3,
  Clock,
  Star,
  Zap,
  Lock,
  Unlock,
  RefreshCw,
  ExternalLink,
  Plus
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useOnboardingProgress } from '@/hooks/useOnboardingProgress';
import { useComplianceScoring } from '@/hooks/useComplianceScoring';
import { useDocumentWatcher } from '@/hooks/useDocumentWatcher';
import { useAdminFlagging } from '@/hooks/useAdminFlagging';

interface OnboardingStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  isCompleted: boolean;
  isActive: boolean;
  isDisabled: boolean;
}

interface FormData {
  // Step 1: Company Profile & DOT/MC Info
  legal_business_name: string;
  dba_name: string;
  ein_tin: string;
  dot_number: string;
  mc_number: string;
  business_type: string;
  industry: string;
  years_in_business: number;
  annual_revenue: string;
  number_of_employees: number;
  
  // Step 2: TIN Match
  tin_verified: boolean;
  tin_verification_date: string;
  
  // Step 3: FMCSA Lookup
  fmcsa_verified: boolean;
  fmcsa_safety_rating: string;
  fmcsa_snapshot_url: string;
  
  // Step 4: Business Docs
  w9_url: string;
  business_license_url: string;
  operating_authority_url: string;
  
  // Step 5: Insurance Verification
  insurance_certificates: Array<{
    insurance_type: string;
    insurance_provider: string;
    policy_number: string;
    coverage_amount: number;
    effective_date: string;
    expiration_date: string;
    certificate_url: string;
    broker_listed_as_certificate_holder: boolean;
  }>;
  
  // Step 6: Agreements & Legal Consent
  legal_agreements: Array<{
    agreement_type: string;
    signed: boolean;
    signed_at: string;
    digital_signature: string;
  }>;
  
  // Step 7: Driver & Equipment Info
  equipment_types: string[];
  equipment_count: number;
  driver_count: number;
  primary_contact: {
    name: string;
    title: string;
    email: string;
    phone: string;
  };
  
  // Step 8: Payments & Factoring Setup
  bank_name: string;
  account_number: string;
  routing_number: string;
  voided_check_url: string;
  factoring_company: string;
  factoring_letter_url: string;
  
  // Step 9: Technology Checklist
  has_eld: boolean;
  has_gps_tracking: boolean;
  has_24_7_dispatch: boolean;
  has_digital_document_capability: boolean;
  
  // Step 10: Safety & Compliance Review
  safety_rating: string;
  recent_violations: string;
  driver_qualification_file_url: string;
  
  // Step 11: Final Scoring & Status
  total_score: number;
  approval_status: string;
  risk_level: string;
}

const CarrierBrokerRiskReview: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    legal_business_name: '',
    dba_name: '',
    ein_tin: '',
    dot_number: '',
    mc_number: '',
    business_type: '',
    industry: '',
    years_in_business: 0,
    annual_revenue: '',
    number_of_employees: 0,
    tin_verified: false,
    tin_verification_date: '',
    fmcsa_verified: false,
    fmcsa_safety_rating: '',
    fmcsa_snapshot_url: '',
    w9_url: '',
    business_license_url: '',
    operating_authority_url: '',
    insurance_certificates: [],
    legal_agreements: [],
    equipment_types: [],
    equipment_count: 0,
    driver_count: 0,
    primary_contact: {
      name: '',
      title: '',
      email: '',
      phone: ''
    },
    bank_name: '',
    account_number: '',
    routing_number: '',
    voided_check_url: '',
    factoring_company: '',
    factoring_letter_url: '',
    has_eld: false,
    has_gps_tracking: false,
    has_24_7_dispatch: false,
    has_digital_document_capability: false,
    safety_rating: '',
    recent_violations: '',
    driver_qualification_file_url: '',
    total_score: 0,
    approval_status: 'pending',
    risk_level: 'medium'
  });

  const [isLoading, setIsLoading] = useState(false);
  const [uploadingFile, setUploadingFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Custom hooks
  const { progress, updateProgress } = useOnboardingProgress();
  const { score, calculateScore } = useComplianceScoring();
  const { checkDocumentExpiration } = useDocumentWatcher();
  const { flagForReview } = useAdminFlagging();

  const steps: OnboardingStep[] = [
    {
      id: 1,
      title: 'Company Profile & DOT/MC Info',
      description: 'Validate legal credentials, EIN, FMCSA Snapshot',
      icon: Building2,
      isCompleted: false,
      isActive: currentStep === 1,
      isDisabled: false
    },
    {
      id: 2,
      title: 'TIN Match',
      description: 'Real-time IRS verification',
      icon: FileCheck,
      isCompleted: false,
      isActive: currentStep === 2,
      isDisabled: false
    },
    {
      id: 3,
      title: 'FMCSA Lookup',
      description: 'API lookup for operating authority and safety rating',
      icon: Truck,
      isCompleted: false,
      isActive: currentStep === 3,
      isDisabled: false
    },
    {
      id: 4,
      title: 'Business Docs',
      description: 'Upload W-9, licenses, Operating Authority',
      icon: FileText,
      isCompleted: false,
      isActive: currentStep === 4,
      isDisabled: false
    },
    {
      id: 5,
      title: 'Insurance Verification',
      description: 'Upload COI with validations, carrier agent info',
      icon: Shield,
      isCompleted: false,
      isActive: currentStep === 5,
      isDisabled: false
    },
    {
      id: 6,
      title: 'Agreements & Legal Consent',
      description: 'Sign Broker-Carrier Agreement, Terms, Privacy, etc.',
      icon: Signature,
      isCompleted: false,
      isActive: currentStep === 6,
      isDisabled: false
    },
    {
      id: 7,
      title: 'Driver & Equipment Info',
      description: 'Add equipment list, # of units, primary contact',
      icon: Users,
      isCompleted: false,
      isActive: currentStep === 7,
      isDisabled: false
    },
    {
      id: 8,
      title: 'Payments & Factoring Setup',
      description: 'Submit voided check, factoring letter, billing info',
      icon: CreditCard,
      isCompleted: false,
      isActive: currentStep === 8,
      isDisabled: false
    },
    {
      id: 9,
      title: 'Technology Checklist',
      description: 'Confirm ELD, GPS, digital document capability',
      icon: Settings,
      isCompleted: false,
      isActive: currentStep === 9,
      isDisabled: false
    },
    {
      id: 10,
      title: 'Safety & Compliance Review',
      description: 'Analyze FMCSA rating, recent violations, driver file',
      icon: BarChart3,
      isCompleted: false,
      isActive: currentStep === 10,
      isDisabled: false
    },
    {
      id: 11,
      title: 'Final Scoring + Status',
      description: 'Auto-approve, manual review, or reject based on score',
      icon: Star,
      isCompleted: false,
      isActive: currentStep === 11,
      isDisabled: false
    }
  ];

  // Handle file upload
  const handleFileUpload = async (file: File, fieldName: string) => {
    try {
      setUploadingFile(fieldName);
      const fileExt = file.name.split('.').pop();
      const fileName = `${fieldName}_${Date.now()}.${fileExt}`;
      const filePath = `onboarding/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      setFormData(prev => ({
        ...prev,
        [fieldName]: publicUrl
      }));

      toast({
        title: 'File uploaded successfully',
        description: `${file.name} has been uploaded.`,
      });
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload file. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setUploadingFile(null);
    }
  };

  // Handle step navigation
  const nextStep = () => {
    if (currentStep < 11) {
      setCurrentStep(currentStep + 1);
      updateProgress(currentStep + 1, 11);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      // Calculate final score
      const finalScore = await calculateScore(formData);
      
      // Determine approval status
      let approvalStatus = 'pending';
      if (finalScore >= 100) {
        approvalStatus = 'auto_approved';
      } else if (finalScore >= 70) {
        approvalStatus = 'manual_review';
        await flagForReview(formData, 'Score between 70-99 requires manual review');
      } else {
        approvalStatus = 'rejected';
      }

      // Save to database
      const { error } = await supabase
        .from('company_profile')
        .insert({
          legal_business_name: formData.legal_business_name,
          dba_name: formData.dba_name,
          ein_tin: formData.ein_tin,
          dot_number: formData.dot_number,
          mc_number: formData.mc_number,
          business_type: formData.business_type,
          industry: formData.industry,
          years_in_business: formData.years_in_business,
          annual_revenue: formData.annual_revenue,
          number_of_employees: formData.number_of_employees,
          tin_verified: formData.tin_verified,
          fmcsa_verified: formData.fmcsa_verified,
          fmcsa_safety_rating: formData.fmcsa_safety_rating,
          onboarding_status: approvalStatus,
          onboarding_score: finalScore
        });

      if (error) throw error;

      toast({
        title: 'Onboarding completed',
        description: `Your application has been submitted with a score of ${finalScore}/120.`,
      });

      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Submission failed',
        description: 'Failed to submit application. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label htmlFor="legal_business_name">Legal Business Name *</Label>
                <Input
                  id="legal_business_name"
                  value={formData.legal_business_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, legal_business_name: e.target.value }))}
                  placeholder="Enter legal business name"
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="dba_name">DBA Name</Label>
                <Input
                  id="dba_name"
                  value={formData.dba_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, dba_name: e.target.value }))}
                  placeholder="Doing business as (if applicable)"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <Label htmlFor="ein_tin">EIN/TIN *</Label>
                <Input
                  id="ein_tin"
                  value={formData.ein_tin}
                  onChange={(e) => setFormData(prev => ({ ...prev, ein_tin: e.target.value }))}
                  placeholder="XX-XXXXXXX"
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="dot_number">DOT Number</Label>
                <Input
                  id="dot_number"
                  value={formData.dot_number}
                  onChange={(e) => setFormData(prev => ({ ...prev, dot_number: e.target.value }))}
                  placeholder="DOT number"
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="mc_number">MC Number</Label>
                <Input
                  id="mc_number"
                  value={formData.mc_number}
                  onChange={(e) => setFormData(prev => ({ ...prev, mc_number: e.target.value }))}
                  placeholder="MC number"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                TIN verification will be performed automatically using IRS records.
              </AlertDescription>
            </Alert>
            
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <Label>EIN/TIN Verification Status</Label>
                <div className="mt-2">
                  {formData.tin_verified ? (
                    <Badge variant="default" className="bg-green-500">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <Clock className="h-4 w-4 mr-2" />
                      Pending Verification
                    </Badge>
                  )}
                </div>
              </div>
              <Button variant="outline" onClick={() => {}}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Verify Now
              </Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Alert>
              <Truck className="h-4 w-4" />
              <AlertDescription>
                FMCSA lookup will verify your operating authority and safety rating.
              </AlertDescription>
            </Alert>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label>FMCSA Verification Status</Label>
                <div className="mt-2">
                  {formData.fmcsa_verified ? (
                    <Badge variant="default" className="bg-green-500">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="secondary">
                      <Clock className="h-4 w-4 mr-2" />
                      Pending Verification
                    </Badge>
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <Label>Safety Rating</Label>
                <Select
                  value={formData.fmcsa_safety_rating}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, fmcsa_safety_rating: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select safety rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satisfactory">Satisfactory</SelectItem>
                    <SelectItem value="conditional">Conditional</SelectItem>
                    <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label>W-9 Form</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!!uploadingFile}
                  >
                    {uploadingFile === 'w9_url' ? 'Uploading...' : 'Upload W-9'}
                  </Button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file, 'w9_url');
                    }}
                    className="hidden"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <Label>Business License</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!!uploadingFile}
                  >
                    {uploadingFile === 'business_license_url' ? 'Uploading...' : 'Upload License'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Insurance Certificates</Label>
              <div className="space-y-4">
                {formData.insurance_certificates.map((cert, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select
                          value={cert.insurance_type}
                          onValueChange={(value) => {
                            const updated = [...formData.insurance_certificates];
                            updated[index].insurance_type = value;
                            setFormData(prev => ({ ...prev, insurance_certificates: updated }));
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Insurance type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="auto_liability">Auto Liability</SelectItem>
                            <SelectItem value="cargo">Cargo</SelectItem>
                            <SelectItem value="workers_comp">Workers Comp</SelectItem>
                            <SelectItem value="general_liability">General Liability</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Input
                          placeholder="Coverage amount"
                          type="number"
                          value={cert.coverage_amount}
                          onChange={(e) => {
                            const updated = [...formData.insurance_certificates];
                            updated[index].coverage_amount = Number(e.target.value);
                            setFormData(prev => ({ ...prev, insurance_certificates: updated }));
                          }}
                        />
                        
                        <Input
                          placeholder="Policy number"
                          value={cert.policy_number}
                          onChange={(e) => {
                            const updated = [...formData.insurance_certificates];
                            updated[index].policy_number = e.target.value;
                            setFormData(prev => ({ ...prev, insurance_certificates: updated }));
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button
                  variant="outline"
                  onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      insurance_certificates: [...prev.insurance_certificates, {
                        insurance_type: '',
                        insurance_provider: '',
                        policy_number: '',
                        coverage_amount: 0,
                        effective_date: '',
                        expiration_date: '',
                        certificate_url: '',
                        broker_listed_as_certificate_holder: false
                      }]
                    }));
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Insurance Certificate
                </Button>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Legal Agreements</Label>
              <div className="space-y-4">
                {[
                  'broker_carrier_agreement',
                  'terms_of_use',
                  'privacy_policy',
                  'communications_consent',
                  'wireless_policy'
                ].map((agreementType) => (
                  <Card key={agreementType}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">
                            {agreementType.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                          </h4>
                          <p className="text-sm text-gray-500">
                            Please review and sign this agreement
                          </p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                          <Button variant="outline" size="sm">
                            <Signature className="h-4 w-4 mr-2" />
                            Sign
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label>Equipment Types</Label>
                <Select
                  value={formData.equipment_types[0]}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, equipment_types: [value] }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select equipment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dry_van">Dry Van</SelectItem>
                    <SelectItem value="reefer">Reefer</SelectItem>
                    <SelectItem value="flatbed">Flatbed</SelectItem>
                    <SelectItem value="step_deck">Step Deck</SelectItem>
                    <SelectItem value="lowboy">Lowboy</SelectItem>
                    <SelectItem value="tanker">Tanker</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <Label>Number of Units</Label>
                <Input
                  type="number"
                  value={formData.equipment_count}
                  onChange={(e) => setFormData(prev => ({ ...prev, equipment_count: Number(e.target.value) }))}
                  placeholder="Number of units"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>Primary Contact</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Contact name"
                  value={formData.primary_contact.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    primary_contact: { ...prev.primary_contact, name: e.target.value }
                  }))}
                />
                <Input
                  placeholder="Title"
                  value={formData.primary_contact.title}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    primary_contact: { ...prev.primary_contact, title: e.target.value }
                  }))}
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={formData.primary_contact.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    primary_contact: { ...prev.primary_contact, email: e.target.value }
                  }))}
                />
                <Input
                  placeholder="Phone"
                  value={formData.primary_contact.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    primary_contact: { ...prev.primary_contact, phone: e.target.value }
                  }))}
                />
              </div>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label>Banking Information</Label>
                <Input
                  placeholder="Bank name"
                  value={formData.bank_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, bank_name: e.target.value }))}
                />
                <Input
                  placeholder="Account number"
                  value={formData.account_number}
                  onChange={(e) => setFormData(prev => ({ ...prev, account_number: e.target.value }))}
                />
                <Input
                  placeholder="Routing number"
                  value={formData.routing_number}
                  onChange={(e) => setFormData(prev => ({ ...prev, routing_number: e.target.value }))}
                />
              </div>
              
              <div className="space-y-4">
                <Label>Voided Check</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={!!uploadingFile}
                  >
                    {uploadingFile === 'voided_check_url' ? 'Uploading...' : 'Upload Voided Check'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Label>Technology Requirements</Label>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Switch
                    checked={formData.has_eld}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_eld: checked }))}
                  />
                  <Label>ELD (Electronic Logging Device) Compliance</Label>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Switch
                    checked={formData.has_gps_tracking}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_gps_tracking: checked }))}
                  />
                  <Label>GPS Tracking System</Label>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Switch
                    checked={formData.has_24_7_dispatch}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_24_7_dispatch: checked }))}
                  />
                  <Label>24/7 Dispatch Capability</Label>
                </div>
                
                <div className="flex items-center space-x-4">
                  <Switch
                    checked={formData.has_digital_document_capability}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, has_digital_document_capability: checked }))}
                  />
                  <Label>Digital Document Upload Capability</Label>
                </div>
              </div>
            </div>
          </div>
        );

      case 10:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label>Safety Rating</Label>
                <Select
                  value={formData.safety_rating}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, safety_rating: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select safety rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="satisfactory">Satisfactory</SelectItem>
                    <SelectItem value="conditional">Conditional</SelectItem>
                    <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <Label>Recent Violations</Label>
                <Textarea
                  placeholder="Describe any recent violations or safety issues"
                  value={formData.recent_violations}
                  onChange={(e) => setFormData(prev => ({ ...prev, recent_violations: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>Driver Qualification File (Optional)</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <Button
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={!!uploadingFile}
                >
                  {uploadingFile === 'driver_qualification_file_url' ? 'Uploading...' : 'Upload Driver File'}
                </Button>
              </div>
            </div>
          </div>
        );

      case 11:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Final Compliance Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="text-4xl font-bold text-blue-600">
                    {score}/120
                  </div>
                  <Progress value={(score / 120) * 100} className="w-full" />
                  
                  <div className="mt-4">
                    {score >= 100 ? (
                      <Badge variant="default" className="bg-green-500 text-white">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Auto-Approved
                      </Badge>
                    ) : score >= 70 ? (
                      <Badge variant="default" className="bg-yellow-500 text-white">
                        <Clock className="h-4 w-4 mr-2" />
                        Manual Review Required
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Rejected
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">20</div>
                    <div className="text-sm text-gray-500">FMCSA Match</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">20</div>
                    <div className="text-sm text-gray-500">Insurance Verification</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">15</div>
                    <div className="text-sm text-gray-500">TIN Verified</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Carrier & Broker Risk Management Onboarding
          </h1>
          <p className="text-gray-600">
            Complete the 11-step compliance verification process to onboard your business
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep} of 11
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((currentStep / 11) * 100)}% Complete
            </span>
          </div>
          <Progress value={(currentStep / 11) * 100} className="w-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Step Navigation */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        step.isActive
                          ? 'bg-blue-50 border border-blue-200'
                          : step.isCompleted
                          ? 'bg-green-50 border border-green-200'
                          : 'bg-gray-50 border border-gray-200'
                      }`}
                      onClick={() => setCurrentStep(step.id)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${
                          step.isActive
                            ? 'bg-blue-500 text-white'
                            : step.isCompleted
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-300 text-gray-600'
                        }`}>
                          <step.icon className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">
                            {step.title}
                          </div>
                          <div className="text-xs text-gray-500">
                            {step.description}
                          </div>
                        </div>
                        {step.isCompleted && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <steps[currentStep - 1].icon className="h-5 w-5" />
                  <span>{steps[currentStep - 1].title}</span>
                </CardTitle>
                <CardDescription>
                  {steps[currentStep - 1].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous
              </Button>

              {currentStep === 11 ? (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Complete Onboarding
                    </>
                  )}
                </Button>
              ) : (
                <Button onClick={nextStep}>
                  Next
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrierBrokerRiskReview;
