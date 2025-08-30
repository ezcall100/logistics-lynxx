// Onboarding & Compliance Module Types - Unified onboarding with three flows: Carrier, Shipper, Broker

// Application Types
export interface OnboardingApplication {
  id: string;
  applicationNumber: string;
  type: 'carrier' | 'shipper' | 'broker';
  status: 'draft' | 'submitted' | 'under-review' | 'approved' | 'rejected' | 'suspended';
  
  // Company Information
  companyName: string;
  legalName?: string;
  dbaName?: string;
  taxId: string;
  entityType: 'corporation' | 'llc' | 'partnership' | 'sole-proprietorship' | 'other';
  
  // Contact Information
  primaryContact: OnboardingContact;
  additionalContacts: OnboardingContact[];
  
  // Address Information
  businessAddress: OnboardingAddress;
  mailingAddress?: OnboardingAddress;
  
  // Business Information
  industry: string;
  businessType: string;
  yearsInBusiness: number;
  annualRevenue?: number;
  employeeCount?: number;
  
  // Application Details
  submittedAt?: Date;
  reviewedAt?: Date;
  approvedAt?: Date;
  rejectedAt?: Date;
  suspendedAt?: Date;
  
  // Review Information
  reviewedBy?: string;
  reviewNotes?: string;
  rejectionReason?: string;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  expiresAt?: Date;
  
  // Progress
  currentStep: number;
  totalSteps: number;
  progress: number; // percentage
  isComplete: boolean;
}

export interface OnboardingContact {
  id: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  isPrimary: boolean;
  isAuthorizedSigner: boolean;
  isEmergencyContact: boolean;
}

export interface OnboardingAddress {
  id: string;
  applicationId: string;
  type: 'business' | 'mailing' | 'terminal' | 'warehouse';
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrimary: boolean;
}

// Onboarding Steps
export interface OnboardingStep {
  id: string;
  applicationId: string;
  stepNumber: number;
  stepType: OnboardingStepType;
  title: string;
  description?: string;
  
  // Status
  status: 'pending' | 'in-progress' | 'completed' | 'blocked' | 'skipped';
  isRequired: boolean;
  isBlocking: boolean;
  
  // Completion
  completedAt?: Date;
  completedBy?: string;
  completionNotes?: string;
  
  // Validation
  validationErrors: OnboardingValidationError[];
  isValid: boolean;
  
  // Metadata
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;
  reminderSentAt?: Date;
}

export type OnboardingStepType = 
  | 'company-profile'
  | 'contacts'
  | 'documents'
  | 'agreements'
  | 'banking'
  | 'compliance-checks'
  | 'insurance'
  | 'authority'
  | 'safety'
  | 'custom';

// Documents
export interface OnboardingDocument {
  id: string;
  applicationId: string;
  stepId?: string;
  documentType: OnboardingDocumentType;
  name: string;
  description?: string;
  
  // File Information
  fileName: string;
  originalFileName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  
  // Status
  status: 'pending' | 'uploaded' | 'verified' | 'rejected' | 'expired';
  isRequired: boolean;
  isExpired: boolean;
  
  // Verification
  verifiedAt?: Date;
  verifiedBy?: string;
  verificationNotes?: string;
  rejectionReason?: string;
  
  // Expiration
  expirationDate?: Date;
  daysUntilExpiration?: number;
  
  // OCR Data
  ocrData?: OnboardingOCRData;
  
  // Metadata
  uploadedBy: string;
  uploadedAt: Date;
  updatedAt: Date;
}

export type OnboardingDocumentType = 
  | 'w9-form'
  | 'certificate-of-insurance'
  | 'motor-carrier-authority'
  | 'broker-authority'
  | 'business-license'
  | 'articles-of-incorporation'
  | 'operating-agreement'
  | 'bank-statement'
  | 'voided-check'
  | 'driver-license'
  | 'medical-card'
  | 'drug-test'
  | 'background-check'
  | 'safety-certificate'
  | 'custom';

export interface OnboardingOCRData {
  id: string;
  documentId: string;
  extractedData: Record<string, any>;
  confidence: number; // 0-100
  processingStatus: 'pending' | 'processing' | 'completed' | 'failed';
  processedAt?: Date;
  errorMessage?: string;
}

// Compliance Checks
export interface OnboardingComplianceCheck {
  id: string;
  applicationId: string;
  checkType: OnboardingComplianceCheckType;
  name: string;
  description?: string;
  
  // Status
  status: 'pending' | 'in-progress' | 'passed' | 'failed' | 'warning' | 'manual-review';
  
  // Results
  result?: OnboardingComplianceResult;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  
  // Timing
  startedAt?: Date;
  completedAt?: Date;
  expiresAt?: Date;
  
  // Metadata
  provider?: string;
  referenceId?: string;
  cost?: number;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OnboardingComplianceCheckType = 
  | 'credit-check'
  | 'background-check'
  | 'watchlist-check'
  | 'sanctions-check'
  | 'insurance-verification'
  | 'authority-verification'
  | 'safety-rating-check'
  | 'financial-stability'
  | 'custom';

export interface OnboardingComplianceResult {
  id: string;
  checkId: string;
  score?: number; // 0-100
  details: Record<string, any>;
  flags: OnboardingComplianceFlag[];
  recommendations: string[];
  rawData?: any;
}

export interface OnboardingComplianceFlag {
  id: string;
  resultId: string;
  type: 'warning' | 'error' | 'info';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  field?: string;
  value?: any;
  recommendation?: string;
}

// Agreements
export interface OnboardingAgreement {
  id: string;
  applicationId: string;
  agreementType: OnboardingAgreementType;
  title: string;
  description?: string;
  
  // Agreement Content
  content: string;
  version: string;
  effectiveDate: Date;
  
  // Status
  status: 'pending' | 'sent' | 'signed' | 'expired' | 'cancelled';
  isRequired: boolean;
  
  // E-Signature
  signedAt?: Date;
  signedBy?: string;
  signatureMethod?: 'electronic' | 'digital' | 'manual';
  signatureData?: any;
  
  // Metadata
  sentAt?: Date;
  expiresAt?: Date;
  reminderSentAt?: Date;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OnboardingAgreementType = 
  | 'carrier-agreement'
  | 'broker-agreement'
  | 'shipper-agreement'
  | 'service-agreement'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'data-processing-agreement'
  | 'custom';

// Banking Information
export interface OnboardingBankAccount {
  id: string;
  applicationId: string;
  accountType: 'checking' | 'savings';
  accountName: string;
  
  // Bank Information
  bankName: string;
  routingNumber: string;
  accountNumber: string;
  accountNumberMasked: string;
  
  // Verification
  verificationStatus: 'pending' | 'verified' | 'failed' | 'manual-review';
  verificationMethod?: 'micro-deposits' | 'plaid' | 'manual';
  verifiedAt?: Date;
  verifiedBy?: string;
  
  // ACH Authorization
  achAuthorizationStatus: 'pending' | 'authorized' | 'declined' | 'expired';
  achAuthorizationDate?: Date;
  achAuthorizationMethod?: 'electronic' | 'paper';
  
  // Metadata
  isPrimary: boolean;
  isActive: boolean;
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Insurance Information
export interface OnboardingInsurance {
  id: string;
  applicationId: string;
  insuranceType: OnboardingInsuranceType;
  policyNumber: string;
  carrierName: string;
  
  // Coverage
  coverageAmount: number;
  coverageType: string;
  deductible?: number;
  
  // Dates
  effectiveDate: Date;
  expirationDate: Date;
  isActive: boolean;
  isExpired: boolean;
  daysUntilExpiration?: number;
  
  // Verification
  verificationStatus: 'pending' | 'verified' | 'failed' | 'manual-review';
  verifiedAt?: Date;
  verifiedBy?: string;
  verificationNotes?: string;
  
  // Documents
  certificateUrl?: string;
  
  // Metadata
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OnboardingInsuranceType = 
  | 'general-liability'
  | 'auto-liability'
  | 'cargo'
  | 'workers-compensation'
  | 'umbrella'
  | 'professional-liability'
  | 'custom';

// Authority Information (for Carriers)
export interface OnboardingAuthority {
  id: string;
  applicationId: string;
  authorityType: 'motor-carrier' | 'broker' | 'freight-forwarder';
  authorityNumber: string;
  issuingState: string;
  
  // Status
  status: 'active' | 'inactive' | 'suspended' | 'revoked';
  isActive: boolean;
  
  // Dates
  issueDate: Date;
  expirationDate?: Date;
  isExpired: boolean;
  daysUntilExpiration?: number;
  
  // Verification
  verificationStatus: 'pending' | 'verified' | 'failed' | 'manual-review';
  verifiedAt?: Date;
  verifiedBy?: string;
  verificationNotes?: string;
  
  // Metadata
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Safety Information (for Carriers)
export interface OnboardingSafety {
  id: string;
  applicationId: string;
  
  // Safety Rating
  safetyRating?: 'satisfactory' | 'conditional' | 'unsatisfactory' | 'unrated';
  safetyRatingDate?: Date;
  
  // Safety Metrics
  outOfServiceRate?: number;
  crashRate?: number;
  inspectionRate?: number;
  
  // Verification
  verificationStatus: 'pending' | 'verified' | 'failed' | 'manual-review';
  verifiedAt?: Date;
  verifiedBy?: string;
  verificationNotes?: string;
  
  // Metadata
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Validation Errors
export interface OnboardingValidationError {
  id: string;
  stepId: string;
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
  code?: string;
  suggestedValue?: any;
}

// Task Management
export interface OnboardingTask {
  id: string;
  applicationId: string;
  stepId?: string;
  title: string;
  description?: string;
  
  // Task Details
  taskType: 'upload' | 'sign' | 'verify' | 'review' | 'approve' | 'custom';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Status
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled' | 'overdue';
  isRequired: boolean;
  
  // Assignment
  assignedTo?: string;
  assignedAt?: Date;
  
  // Completion
  completedAt?: Date;
  completedBy?: string;
  completionNotes?: string;
  
  // Due Date
  dueDate?: Date;
  isOverdue: boolean;
  daysOverdue?: number;
  
  // Reminders
  reminderSentAt?: Date;
  reminderCount: number;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Workflow Configuration
export interface OnboardingWorkflow {
  id: string;
  name: string;
  type: 'carrier' | 'shipper' | 'broker';
  version: string;
  isActive: boolean;
  
  // Steps Configuration
  steps: OnboardingWorkflowStep[];
  
  // Rules
  rules: OnboardingWorkflowRule[];
  
  // Metadata
  description?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OnboardingWorkflowStep {
  id: string;
  workflowId: string;
  stepNumber: number;
  stepType: OnboardingStepType;
  title: string;
  description?: string;
  
  // Configuration
  isRequired: boolean;
  isBlocking: boolean;
  estimatedDuration?: number; // in minutes
  autoApprove?: boolean;
  
  // Dependencies
  dependsOn?: string[]; // step IDs
  conditions?: OnboardingWorkflowCondition[];
  
  // Assignments
  defaultAssignee?: string;
  assignmentRules?: OnboardingAssignmentRule[];
}

export interface OnboardingWorkflowRule {
  id: string;
  workflowId: string;
  name: string;
  description?: string;
  
  // Rule Logic
  condition: OnboardingWorkflowCondition;
  action: OnboardingWorkflowAction;
  
  // Priority
  priority: number;
  isActive: boolean;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OnboardingWorkflowCondition {
  field: string;
  operator: 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'contains' | 'in' | 'not-in' | 'exists' | 'not-exists';
  value?: any;
  logicalOperator?: 'and' | 'or';
}

export interface OnboardingWorkflowAction {
  type: 'assign' | 'approve' | 'reject' | 'skip' | 'require' | 'notify' | 'custom';
  value?: any;
  parameters?: Record<string, any>;
}

export interface OnboardingAssignmentRule {
  id: string;
  stepId: string;
  name: string;
  description?: string;
  
  // Assignment Logic
  condition: OnboardingWorkflowCondition;
  assignee: string;
  priority: number;
  
  // Metadata
  isActive: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Search and Filter Types
export interface OnboardingSearchFilters {
  type?: ('carrier' | 'shipper' | 'broker')[];
  status?: string[];
  stepStatus?: string[];
  dateRange?: {
    start: Date;
    end: Date;
  };
  assignedTo?: string;
  priority?: string[];
  isOverdue?: boolean;
  isExpired?: boolean;
}

// Analytics and Reporting
export interface OnboardingAnalytics {
  // Application Metrics
  totalApplications: number;
  activeApplications: number;
  completedApplications: number;
  averageCompletionTime: number; // in days
  
  // Status Distribution
  statusDistribution: {
    status: string;
    count: number;
    percentage: number;
  }[];
  
  // Step Completion
  stepCompletion: {
    stepType: string;
    completed: number;
    pending: number;
    blocked: number;
    averageTime: number;
  }[];
  
  // Compliance Metrics
  complianceMetrics: {
    totalChecks: number;
    passedChecks: number;
    failedChecks: number;
    averageScore: number;
  };
  
  // Document Metrics
  documentMetrics: {
    totalDocuments: number;
    verifiedDocuments: number;
    expiredDocuments: number;
    averageVerificationTime: number;
  };
  
  // Performance Metrics
  performanceMetrics: {
    averageResponseTime: number;
    slaCompliance: number;
    customerSatisfaction: number;
  };
}

// Export Types
export interface OnboardingExportOptions {
  entities: ('applications' | 'steps' | 'documents' | 'checks' | 'tasks')[];
  format: 'csv' | 'xlsx' | 'json' | 'pdf';
  filters?: OnboardingSearchFilters;
  includeArchived?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// API Response Types
export interface OnboardingListResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface OnboardingDetailResponse<T> {
  data: T;
  related?: {
    steps?: OnboardingStep[];
    documents?: OnboardingDocument[];
    checks?: OnboardingComplianceCheck[];
    tasks?: OnboardingTask[];
  };
}
