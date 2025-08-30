// Financials (Accounting System) Module Types - Full AR/AP, settlements, and ledgers for logistics

// Accounts Receivable (AR)
export interface Invoice {
  id: string;
  invoiceNumber: string;
  loadId?: string;
  customerId: string;
  carrierId?: string;
  brokerId?: string;
  
  // Invoice Details
  invoiceDate: Date;
  dueDate: Date;
  terms: string;
  currency: string;
  
  // Amounts
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  
  // Status
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled' | 'disputed';
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'overdue';
  
  // Line Items
  lineItems: InvoiceLineItem[];
  
  // Documents
  documents: FinancialDocument[];
  
  // Metadata
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  sentAt?: Date;
  paidAt?: Date;
  cancelledAt?: Date;
  
  // Aging
  daysOutstanding: number;
  agingBucket: 'current' | '30-days' | '60-days' | '90-days' | 'over-90';
}

export interface InvoiceLineItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxRate?: number;
  taxAmount?: number;
  lineType: 'freight' | 'accessorial' | 'fuel-surcharge' | 'detention' | 'other';
  loadId?: string;
  accessorialId?: string;
}

export interface CreditMemo {
  id: string;
  creditMemoNumber: string;
  invoiceId: string;
  customerId: string;
  
  // Credit Memo Details
  creditMemoDate: Date;
  currency: string;
  totalAmount: number;
  appliedAmount: number;
  remainingAmount: number;
  
  // Status
  status: 'draft' | 'issued' | 'applied' | 'cancelled';
  
  // Line Items
  lineItems: CreditMemoLineItem[];
  
  // Reason
  reason: 'damage' | 'service-issue' | 'billing-error' | 'customer-request' | 'other';
  description?: string;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  issuedAt?: Date;
  appliedAt?: Date;
}

export interface CreditMemoLineItem {
  id: string;
  creditMemoId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  lineType: 'freight' | 'accessorial' | 'fuel-surcharge' | 'detention' | 'other';
}

export interface Payment {
  id: string;
  paymentNumber: string;
  customerId: string;
  
  // Payment Details
  paymentDate: Date;
  paymentMethod: 'check' | 'ach' | 'wire' | 'credit-card' | 'cash';
  currency: string;
  totalAmount: number;
  
  // Status
  status: 'pending' | 'processed' | 'cleared' | 'failed' | 'cancelled';
  
  // Applied Invoices
  appliedInvoices: PaymentApplication[];
  
  // Bank Information
  bankAccount?: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
  
  // Reference Information
  referenceNumber?: string;
  checkNumber?: string;
  
  // Metadata
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;
  clearedAt?: Date;
}

export interface PaymentApplication {
  id: string;
  paymentId: string;
  invoiceId: string;
  amount: number;
  appliedAt: Date;
}

// Accounts Payable (AP)
export interface Bill {
  id: string;
  billNumber: string;
  vendorId: string;
  loadId?: string;
  carrierId?: string;
  
  // Bill Details
  billDate: Date;
  dueDate: Date;
  terms: string;
  currency: string;
  
  // Amounts
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  
  // Status
  status: 'draft' | 'received' | 'approved' | 'paid' | 'overdue' | 'cancelled';
  paymentStatus: 'unpaid' | 'partial' | 'paid' | 'overdue';
  
  // Line Items
  lineItems: BillLineItem[];
  
  // Documents
  documents: FinancialDocument[];
  
  // Approval
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
  
  // Metadata
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  receivedAt?: Date;
  paidAt?: Date;
  
  // Aging
  daysOutstanding: number;
  agingBucket: 'current' | '30-days' | '60-days' | '90-days' | 'over-90';
}

export interface BillLineItem {
  id: string;
  billId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  taxRate?: number;
  taxAmount?: number;
  lineType: 'freight' | 'accessorial' | 'fuel-surcharge' | 'detention' | 'other';
  loadId?: string;
  accessorialId?: string;
}

export interface VendorPayment {
  id: string;
  paymentNumber: string;
  vendorId: string;
  
  // Payment Details
  paymentDate: Date;
  paymentMethod: 'check' | 'ach' | 'wire' | 'credit-card';
  currency: string;
  totalAmount: number;
  
  // Status
  status: 'pending' | 'processed' | 'cleared' | 'failed' | 'cancelled';
  
  // Applied Bills
  appliedBills: VendorPaymentApplication[];
  
  // Bank Information
  bankAccount?: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
  
  // Reference Information
  referenceNumber?: string;
  checkNumber?: string;
  
  // Metadata
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;
  clearedAt?: Date;
}

export interface VendorPaymentApplication {
  id: string;
  paymentId: string;
  billId: string;
  amount: number;
  appliedAt: Date;
}

// Settlements
export interface Settlement {
  id: string;
  settlementNumber: string;
  driverId?: string;
  ownerOperatorId?: string;
  carrierId?: string;
  
  // Settlement Details
  settlementDate: Date;
  periodStart: Date;
  periodEnd: Date;
  currency: string;
  
  // Amounts
  grossAmount: number;
  deductions: SettlementDeduction[];
  netAmount: number;
  
  // Status
  status: 'draft' | 'approved' | 'paid' | 'cancelled';
  
  // Loads Included
  loads: SettlementLoad[];
  
  // Metadata
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
  paidAt?: Date;
}

export interface SettlementDeduction {
  id: string;
  settlementId: string;
  type: 'fuel' | 'tolls' | 'repairs' | 'insurance' | 'factoring' | 'advance' | 'other';
  description: string;
  amount: number;
  loadId?: string;
  receiptId?: string;
}

export interface SettlementLoad {
  id: string;
  settlementId: string;
  loadId: string;
  grossAmount: number;
  deductions: number;
  netAmount: number;
}

export interface Advance {
  id: string;
  advanceNumber: string;
  driverId?: string;
  ownerOperatorId?: string;
  carrierId?: string;
  
  // Advance Details
  advanceDate: Date;
  amount: number;
  currency: string;
  
  // Status
  status: 'requested' | 'approved' | 'paid' | 'deducted' | 'cancelled';
  
  // Repayment
  repaymentMethod: 'settlement-deduction' | 'direct-payment' | 'load-deduction';
  repaidAmount: number;
  remainingAmount: number;
  
  // Metadata
  reason?: string;
  notes?: string;
  requestedBy: string;
  approvedBy?: string;
  createdAt: Date;
  updatedAt: Date;
  approvedAt?: Date;
  paidAt?: Date;
  repaidAt?: Date;
}

// Factoring
export interface FactoringCase {
  id: string;
  caseNumber: string;
  invoiceId: string;
  customerId: string;
  carrierId?: string;
  
  // Factoring Details
  invoiceAmount: number;
  advanceAmount: number;
  reserveAmount: number;
  feeAmount: number;
  currency: string;
  
  // Terms
  advanceRate: number; // percentage
  reserveRate: number; // percentage
  feeRate: number; // percentage
  
  // Status
  status: 'submitted' | 'approved' | 'funded' | 'collected' | 'closed' | 'rejected';
  
  // Dates
  submittedDate: Date;
  approvedDate?: Date;
  fundedDate?: Date;
  collectedDate?: Date;
  closedDate?: Date;
  
  // Collection
  collectedAmount: number;
  remainingReserve: number;
  
  // Metadata
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Chart of Accounts
export interface Account {
  id: string;
  accountNumber: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  category: string;
  subcategory?: string;
  
  // Account Details
  description?: string;
  isActive: boolean;
  isSystem: boolean;
  
  // Balance
  currentBalance: number;
  beginningBalance: number;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// General Ledger
export interface JournalEntry {
  id: string;
  entryNumber: string;
  entryDate: Date;
  reference: string;
  description: string;
  
  // Status
  status: 'draft' | 'posted' | 'cancelled';
  
  // Lines
  lines: JournalEntryLine[];
  
  // Total
  totalDebit: number;
  totalCredit: number;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  postedAt?: Date;
  postedBy?: string;
}

export interface JournalEntryLine {
  id: string;
  journalEntryId: string;
  accountId: string;
  description: string;
  debitAmount: number;
  creditAmount: number;
  reference?: string;
}

// Vendors and Customers
export interface Vendor {
  id: string;
  vendorNumber: string;
  name: string;
  type: 'carrier' | 'supplier' | 'service-provider' | 'other';
  
  // Contact Information
  contactPerson?: string;
  email?: string;
  phone?: string;
  website?: string;
  
  // Address
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Tax Information
  taxId?: string;
  w9OnFile: boolean;
  
  // Payment Information
  paymentTerms: string;
  creditLimit?: number;
  currentBalance: number;
  
  // Bank Information
  bankAccount?: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
  
  // Status
  status: 'active' | 'inactive' | 'suspended';
  
  // Metadata
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Customer {
  id: string;
  customerNumber: string;
  name: string;
  type: 'shipper' | 'broker' | 'consignee' | 'other';
  
  // Contact Information
  contactPerson?: string;
  email?: string;
  phone?: string;
  website?: string;
  
  // Address
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  
  // Tax Information
  taxId?: string;
  
  // Payment Information
  paymentTerms: string;
  creditLimit?: number;
  currentBalance: number;
  
  // Bank Information
  bankAccount?: {
    accountNumber: string;
    routingNumber: string;
    bankName: string;
  };
  
  // Status
  status: 'active' | 'inactive' | 'suspended';
  
  // Metadata
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

// Documents
export interface FinancialDocument {
  id: string;
  documentNumber: string;
  type: 'invoice' | 'bill' | 'payment' | 'receipt' | 'settlement' | 'advance' | 'other';
  entityId: string; // ID of the related entity (invoice, bill, etc.)
  
  // Document Details
  name: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  
  // Status
  status: 'draft' | 'sent' | 'received' | 'processed' | 'archived';
  
  // Metadata
  uploadedBy: string;
  uploadedAt: Date;
  processedAt?: Date;
  archivedAt?: Date;
}

// Aging Reports
export interface AgingReport {
  id: string;
  reportDate: Date;
  type: 'ar' | 'ap';
  
  // Aging Buckets
  current: number;
  days30: number;
  days60: number;
  days90: number;
  over90: number;
  total: number;
  
  // Details
  details: AgingDetail[];
  
  // Metadata
  generatedBy: string;
  generatedAt: Date;
}

export interface AgingDetail {
  id: string;
  agingReportId: string;
  entityId: string; // invoice or bill ID
  entityNumber: string;
  entityDate: Date;
  dueDate: Date;
  amount: number;
  paidAmount: number;
  balanceAmount: number;
  daysOutstanding: number;
  agingBucket: 'current' | '30-days' | '60-days' | '90-days' | 'over-90';
  customerId?: string;
  vendorId?: string;
}

// Search and Filter Types
export interface FinancialSearchFilters {
  dateRange?: {
    start: Date;
    end: Date;
  };
  amountRange?: {
    min?: number;
    max?: number;
  };
  status?: string[];
  customerId?: string;
  vendorId?: string;
  carrierId?: string;
  loadId?: string;
  documentType?: string[];
  agingBucket?: string[];
}

// Analytics and Reporting
export interface FinancialAnalytics {
  // AR Analytics
  totalAR: number;
  totalAP: number;
  netWorkingCapital: number;
  daysSalesOutstanding: number;
  daysPayableOutstanding: number;
  
  // Aging Analysis
  arAging: {
    current: number;
    days30: number;
    days60: number;
    days90: number;
    over90: number;
  };
  apAging: {
    current: number;
    days30: number;
    days60: number;
    days90: number;
    over90: number;
  };
  
  // Cash Flow
  cashFlow: {
    operating: number;
    investing: number;
    financing: number;
    netChange: number;
  };
  
  // Revenue and Expenses
  revenue: {
    total: number;
    byCustomer: { customerId: string; amount: number }[];
    byMonth: { month: string; amount: number }[];
  };
  expenses: {
    total: number;
    byVendor: { vendorId: string; amount: number }[];
    byCategory: { category: string; amount: number }[];
  };
  
  // Settlements
  settlements: {
    total: number;
    pending: number;
    paid: number;
    byDriver: { driverId: string; amount: number }[];
  };
  
  // Factoring
  factoring: {
    totalCases: number;
    totalFunded: number;
    totalCollected: number;
    averageAdvanceRate: number;
  };
}

// Export Types
export interface FinancialExportOptions {
  entities: ('invoices' | 'bills' | 'payments' | 'settlements' | 'advances' | 'factoring')[];
  format: 'csv' | 'xlsx' | 'json' | 'pdf';
  filters?: FinancialSearchFilters;
  includeArchived?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// API Response Types
export interface FinancialListResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface FinancialDetailResponse<T> {
  data: T;
  related?: {
    documents?: FinancialDocument[];
    payments?: Payment[];
    settlements?: Settlement[];
  };
}
