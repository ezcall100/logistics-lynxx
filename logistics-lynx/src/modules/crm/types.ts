// CRM Module Types - Unified relationships system across all portals

export interface CRMAccount {
  id: string;
  name: string;
  type: 'carrier' | 'shipper' | 'broker' | 'vendor' | 'partner';
  status: 'active' | 'inactive' | 'prospect' | 'lead';
  industry: string;
  website?: string;
  phone?: string;
  email?: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  taxId?: string;
  creditLimit?: number;
  paymentTerms?: string;
  notes?: string;
  tags: string[];
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  lastContactDate?: Date;
  revenue?: number;
  opportunities: number;
  contacts: number;
}

export interface CRMContact {
  id: string;
  accountId: string;
  firstName: string;
  lastName: string;
  title?: string;
  email: string;
  phone?: string;
  mobile?: string;
  isPrimary: boolean;
  isDecisionMaker: boolean;
  department?: string;
  notes?: string;
  tags: string[];
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  lastContactDate?: Date;
  preferredContactMethod: 'email' | 'phone' | 'sms';
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface CRMLead {
  id: string;
  accountId?: string;
  firstName: string;
  lastName: string;
  company: string;
  title?: string;
  email: string;
  phone?: string;
  source: 'website' | 'referral' | 'cold-call' | 'trade-show' | 'social-media' | 'other';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  value?: number;
  description?: string;
  notes?: string;
  tags: string[];
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  lastContactDate?: Date;
  nextFollowUpDate?: Date;
  conversionDate?: Date;
}

export interface CRMDeal {
  id: string;
  accountId: string;
  contactId?: string;
  leadId?: string;
  name: string;
  description?: string;
  value: number;
  currency: string;
  stage: 'prospecting' | 'qualification' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  probability: number; // 0-100
  expectedCloseDate: Date;
  actualCloseDate?: Date;
  type: 'new-business' | 'upsell' | 'renewal' | 'referral';
  source: 'website' | 'referral' | 'cold-call' | 'trade-show' | 'social-media' | 'other';
  notes?: string;
  tags: string[];
  assignedTo?: string;
  createdAt: Date;
  updatedAt: Date;
  lastActivityDate?: Date;
  activities: CRMActivity[];
}

export interface CRMActivity {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'task' | 'note' | 'follow-up';
  subject: string;
  description?: string;
  accountId?: string;
  contactId?: string;
  dealId?: string;
  leadId?: string;
  assignedTo?: string;
  status: 'planned' | 'completed' | 'cancelled' | 'deferred';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  completedDate?: Date;
  duration?: number; // in minutes
  notes?: string;
  attachments?: string[];
  createdAt: Date;
  updatedAt: Date;
  reminders?: CRMReminder[];
}

export interface CRMReminder {
  id: string;
  activityId: string;
  type: 'email' | 'notification' | 'sms';
  scheduledFor: Date;
  sentAt?: Date;
  status: 'pending' | 'sent' | 'failed';
  message?: string;
}

export interface CRMNote {
  id: string;
  accountId?: string;
  contactId?: string;
  dealId?: string;
  leadId?: string;
  activityId?: string;
  title: string;
  content: string;
  type: 'general' | 'meeting' | 'call' | 'email' | 'task';
  isPrivate: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface CRMFile {
  id: string;
  name: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  accountId?: string;
  contactId?: string;
  dealId?: string;
  leadId?: string;
  activityId?: string;
  uploadedBy: string;
  uploadedAt: Date;
  tags: string[];
}

export interface CRMTag {
  id: string;
  name: string;
  color: string;
  description?: string;
  category?: string;
  createdAt: Date;
  usageCount: number;
}

export interface CRMAccountLink {
  id: string;
  sourceAccountId: string;
  targetAccountId: string;
  relationshipType: 'parent' | 'subsidiary' | 'partner' | 'competitor' | 'supplier' | 'customer';
  description?: string;
  createdAt: Date;
}

// Pipeline Configuration
export interface CRMPipeline {
  id: string;
  name: string;
  type: 'broker-sales' | 'carrier-recruiting' | 'shipper-acquisition' | 'vendor-management';
  stages: CRMPipelineStage[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CRMPipelineStage {
  id: string;
  name: string;
  order: number;
  probability: number; // 0-100
  color: string;
  isWon: boolean;
  isLost: boolean;
  requirements?: string[];
}

// Dashboard and Analytics
export interface CRMDashboardMetrics {
  totalAccounts: number;
  totalContacts: number;
  totalLeads: number;
  totalDeals: number;
  totalActivities: number;
  activeDeals: number;
  wonDeals: number;
  lostDeals: number;
  totalRevenue: number;
  averageDealSize: number;
  conversionRate: number;
  salesCycle: number; // in days
}

export interface CRMDealForecast {
  period: string; // 'month' | 'quarter' | 'year'
  startDate: Date;
  endDate: Date;
  forecastedRevenue: number;
  committedRevenue: number;
  bestCaseRevenue: number;
  worstCaseRevenue: number;
  deals: CRMDeal[];
}

// Search and Filter Types
export interface CRMSearchFilters {
  accounts?: {
    type?: string[];
    status?: string[];
    industry?: string[];
    assignedTo?: string[];
    tags?: string[];
  };
  contacts?: {
    accountId?: string;
    isPrimary?: boolean;
    isDecisionMaker?: boolean;
    assignedTo?: string[];
    tags?: string[];
  };
  leads?: {
    source?: string[];
    status?: string[];
    priority?: string[];
    assignedTo?: string[];
    tags?: string[];
  };
  deals?: {
    stage?: string[];
    type?: string[];
    source?: string[];
    assignedTo?: string[];
    tags?: string[];
    valueRange?: {
      min?: number;
      max?: number;
    };
  };
  activities?: {
    type?: string[];
    status?: string[];
    priority?: string[];
    assignedTo?: string[];
    dueDateRange?: {
      start?: Date;
      end?: Date;
    };
  };
}

// Integration Types
export interface CRMIntegration {
  id: string;
  type: 'email' | 'calendar' | 'phone' | 'crm' | 'erp' | 'marketing';
  name: string;
  provider: string;
  isActive: boolean;
  config: Record<string, any>;
  lastSyncAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Communication Types
export interface CRMCommunication {
  id: string;
  type: 'email' | 'sms' | 'call' | 'meeting';
  direction: 'inbound' | 'outbound';
  accountId?: string;
  contactId?: string;
  dealId?: string;
  leadId?: string;
  subject?: string;
  content?: string;
  status: 'sent' | 'delivered' | 'read' | 'failed' | 'scheduled';
  scheduledFor?: Date;
  sentAt?: Date;
  deliveredAt?: Date;
  readAt?: Date;
  duration?: number; // for calls
  attachments?: string[];
  metadata?: Record<string, any>;
  createdAt: Date;
}

// Export Types
export interface CRMExportOptions {
  entities: ('accounts' | 'contacts' | 'leads' | 'deals' | 'activities')[];
  format: 'csv' | 'xlsx' | 'json';
  filters?: CRMSearchFilters;
  includeArchived?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// API Response Types
export interface CRMListResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface CRMDetailResponse<T> {
  data: T;
  related?: {
    contacts?: CRMContact[];
    deals?: CRMDeal[];
    activities?: CRMActivity[];
    notes?: CRMNote[];
    files?: CRMFile[];
  };
}
