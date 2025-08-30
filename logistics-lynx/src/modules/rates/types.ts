// Rates & Pricing Module Types - Central engine for spot/contract pricing and lane strategy

export interface RateLane {
  id: string;
  origin: RateLocation;
  destination: RateLocation;
  equipmentType: EquipmentType;
  weightClass: WeightClass;
  serviceLevel: ServiceLevel;
  isActive: boolean;
  
  // Rate Information
  baseRate: number;
  currency: string;
  rateType: 'per-mile' | 'per-load' | 'per-pound' | 'flat-rate';
  fuelSurcharge?: number;
  fuelSurchargeType: 'percentage' | 'fixed';
  
  // Contract Information
  contractType: 'spot' | 'contract' | 'dedicated' | 'broker';
  contractId?: string;
  contractStartDate?: Date;
  contractEndDate?: Date;
  contractTerms?: string;
  
  // Accessorials
  accessorials: RateAccessorial[];
  
  // Margin and Pricing
  marginTarget: number; // percentage
  minimumRate: number;
  maximumRate: number;
  suggestedRate: number;
  
  // Historical Data
  rateHistory: RateHistoryEntry[];
  averageRate: number;
  rateVolatility: number;
  
  // Metadata
  tags: string[];
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  lastQuotedAt?: Date;
  quoteCount: number;
  winCount: number;
  lossCount: number;
}

export interface RateLocation {
  city: string;
  state: string;
  zipCode?: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  marketType: 'urban' | 'suburban' | 'rural' | 'port' | 'industrial';
  congestionFactor?: number; // 0-1 scale
}

export type EquipmentType = 
  | 'dry-van' 
  | 'reefer' 
  | 'flatbed' 
  | 'power-only' 
  | 'step-deck' 
  | 'lowboy' 
  | 'tanker' 
  | 'box-truck' 
  | 'straight-truck' 
  | 'container' 
  | 'specialized';

export type WeightClass = 
  | 'ltl' // Less than truckload
  | 'ftl-light' // Full truckload light
  | 'ftl-medium' // Full truckload medium
  | 'ftl-heavy' // Full truckload heavy
  | 'oversize' // Oversize/overweight
  | 'specialized'; // Specialized equipment

export type ServiceLevel = 
  | 'standard' // 3-5 days
  | 'expedited' // 1-2 days
  | 'same-day' // Same day
  | 'next-day' // Next day
  | 'white-glove' // White glove service
  | 'dedicated'; // Dedicated equipment

export interface RateAccessorial {
  id: string;
  type: 'detention' | 'layover' | 'tarp' | 'lumper' | 'inside-delivery' | 'liftgate' | 'residential' | 'appointment' | 'hazmat' | 'reefer-fuel' | 'other';
  name: string;
  description?: string;
  rate: number;
  rateType: 'per-hour' | 'per-day' | 'per-load' | 'flat-rate' | 'percentage';
  isIncluded: boolean;
  isOptional: boolean;
  isRequired: boolean;
  conditions?: string[];
}

export interface RateHistoryEntry {
  id: string;
  laneId: string;
  rate: number;
  rateType: string;
  date: Date;
  volume: number; // loads
  marketConditions: MarketCondition;
  fuelPrice?: number;
  notes?: string;
  source: 'quote' | 'award' | 'historical' | 'market-data';
}

export type MarketCondition = 
  | 'tight' // High demand, low capacity
  | 'balanced' // Normal market conditions
  | 'soft' // Low demand, high capacity
  | 'volatile' // Unpredictable market
  | 'seasonal'; // Seasonal fluctuations

// Rate Tariffs
export interface RateTariff {
  id: string;
  name: string;
  description?: string;
  type: 'customer' | 'carrier' | 'broker' | 'market';
  customerId?: string;
  carrierId?: string;
  brokerId?: string;
  
  // Tariff Structure
  lanes: RateTariffLane[];
  accessorials: RateTariffAccessorial[];
  
  // Pricing Rules
  pricingRules: RatePricingRule[];
  
  // Validity
  effectiveDate: Date;
  expiryDate?: Date;
  isActive: boolean;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
}

export interface RateTariffLane {
  id: string;
  tariffId: string;
  origin: RateLocation;
  destination: RateLocation;
  equipmentType: EquipmentType;
  weightClass: WeightClass;
  serviceLevel: ServiceLevel;
  
  // Base Rate
  baseRate: number;
  rateType: string;
  currency: string;
  
  // Adjustments
  adjustments: RateAdjustment[];
  
  // Conditions
  conditions: RateCondition[];
  
  // Validity
  effectiveDate: Date;
  expiryDate?: Date;
  isActive: boolean;
}

export interface RateTariffAccessorial {
  id: string;
  tariffId: string;
  accessorialId: string;
  rate: number;
  rateType: string;
  isIncluded: boolean;
  isOptional: boolean;
  conditions?: string[];
}

export interface RatePricingRule {
  id: string;
  tariffId: string;
  name: string;
  description?: string;
  type: 'percentage' | 'fixed' | 'conditional' | 'formula';
  
  // Rule Logic
  condition: RateRuleCondition;
  action: RateRuleAction;
  
  // Priority
  priority: number;
  isActive: boolean;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RateRuleCondition {
  field: string;
  operator: 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'contains' | 'in' | 'not-in';
  value: any;
  logicalOperator?: 'and' | 'or';
}

export interface RateRuleAction {
  type: 'adjust-rate' | 'set-rate' | 'add-accessorial' | 'remove-accessorial' | 'apply-discount' | 'apply-surcharge';
  value: number;
  description?: string;
}

// Rate Quotes
export interface RateQuote {
  id: string;
  quoteNumber: string;
  laneId: string;
  tariffId?: string;
  
  // Quote Details
  origin: RateLocation;
  destination: RateLocation;
  equipmentType: EquipmentType;
  weightClass: WeightClass;
  serviceLevel: ServiceLevel;
  
  // Pricing
  baseRate: number;
  fuelSurcharge: number;
  accessorials: RateQuoteAccessorial[];
  totalRate: number;
  currency: string;
  
  // Quote Information
  customerId?: string;
  carrierId?: string;
  brokerId?: string;
  loadId?: string;
  
  // Validity
  validFrom: Date;
  validUntil: Date;
  isExpired: boolean;
  
  // Status
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired' | 'cancelled';
  
  // Metadata
  notes?: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;
  
  // Analytics
  viewCount: number;
  responseTime?: number; // in hours
}

export interface RateQuoteAccessorial {
  id: string;
  quoteId: string;
  accessorialId: string;
  rate: number;
  rateType: string;
  isIncluded: boolean;
  description?: string;
}

// Rate Adjustments
export interface RateAdjustment {
  id: string;
  type: 'percentage' | 'fixed' | 'market' | 'seasonal' | 'customer' | 'carrier';
  name: string;
  description?: string;
  value: number;
  isPositive: boolean; // true for increase, false for decrease
  
  // Conditions
  conditions: RateAdjustmentCondition[];
  
  // Validity
  effectiveDate: Date;
  expiryDate?: Date;
  isActive: boolean;
  
  // Metadata
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RateAdjustmentCondition {
  field: string;
  operator: 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'contains' | 'in' | 'not-in';
  value: any;
  logicalOperator?: 'and' | 'or';
}

// Market Intelligence
export interface MarketIntelligence {
  id: string;
  laneId: string;
  date: Date;
  
  // Market Data
  marketCondition: MarketCondition;
  capacityIndex: number; // 0-100 scale
  demandIndex: number; // 0-100 scale
  rateIndex: number; // 0-100 scale
  
  // Historical Comparison
  rateChange: number; // percentage change
  volumeChange: number; // percentage change
  
  // Predictions
  predictedRate?: number;
  confidenceLevel?: number; // 0-100 scale
  
  // Factors
  factors: MarketFactor[];
  
  // Metadata
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MarketFactor {
  id: string;
  intelligenceId: string;
  name: string;
  description?: string;
  impact: 'positive' | 'negative' | 'neutral';
  magnitude: number; // 0-100 scale
  confidence: number; // 0-100 scale
}

// Rate Intelligence
export interface RateIntelligence {
  id: string;
  laneId: string;
  
  // Win/Loss Analysis
  totalQuotes: number;
  wonQuotes: number;
  lostQuotes: number;
  winRate: number; // percentage
  
  // Rate Analysis
  averageWinningRate: number;
  averageLosingRate: number;
  rateSpread: number;
  
  // Competitor Analysis
  competitorRates: CompetitorRate[];
  
  // Recommendations
  recommendations: RateRecommendation[];
  
  // Metadata
  period: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  startDate: Date;
  endDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface CompetitorRate {
  id: string;
  intelligenceId: string;
  competitorName: string;
  rate: number;
  rateType: string;
  date: Date;
  source: string;
  confidence: number; // 0-100 scale
}

export interface RateRecommendation {
  id: string;
  intelligenceId: string;
  type: 'increase' | 'decrease' | 'maintain' | 'optimize';
  description: string;
  suggestedRate?: number;
  confidence: number; // 0-100 scale
  reasoning: string[];
  impact: 'high' | 'medium' | 'low';
}

// API Types
export interface RateQuoteRequest {
  origin: RateLocation;
  destination: RateLocation;
  equipmentType: EquipmentType;
  weightClass: WeightClass;
  serviceLevel: ServiceLevel;
  weight?: number;
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: string;
  };
  hazmat?: boolean;
  temperature?: {
    min: number;
    max: number;
    unit: string;
  };
  pickupDate: Date;
  deliveryDate: Date;
  accessorials?: string[];
  customerId?: string;
  carrierId?: string;
  brokerId?: string;
  loadId?: string;
}

export interface RateQuoteResponse {
  quoteId: string;
  quoteNumber: string;
  baseRate: number;
  fuelSurcharge: number;
  accessorials: RateQuoteAccessorial[];
  totalRate: number;
  currency: string;
  validFrom: Date;
  validUntil: Date;
  marketIntelligence?: MarketIntelligence;
  recommendations?: RateRecommendation[];
}

// Search and Filter Types
export interface RateSearchFilters {
  origin?: {
    city?: string;
    state?: string;
    zipCode?: string;
  };
  destination?: {
    city?: string;
    state?: string;
    zipCode?: string;
  };
  equipmentType?: EquipmentType[];
  weightClass?: WeightClass[];
  serviceLevel?: ServiceLevel[];
  rateRange?: {
    min?: number;
    max?: number;
  };
  contractType?: string[];
  marketCondition?: MarketCondition[];
  tags?: string[];
  isActive?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// Analytics and Reporting
export interface RateAnalytics {
  totalLanes: number;
  activeLanes: number;
  averageRate: number;
  rateChange: number; // percentage
  winRate: number; // percentage
  topPerformingLanes: RateLane[];
  marketTrends: MarketTrend[];
  revenueImpact: number;
  marginAnalysis: MarginAnalysis;
}

export interface MarketTrend {
  id: string;
  laneId: string;
  period: string;
  rateTrend: 'increasing' | 'decreasing' | 'stable';
  volumeTrend: 'increasing' | 'decreasing' | 'stable';
  marketCondition: MarketCondition;
  confidence: number;
  startDate: Date;
  endDate: Date;
}

export interface MarginAnalysis {
  averageMargin: number;
  marginByLane: {
    laneId: string;
    margin: number;
    volume: number;
  }[];
  marginByCustomer: {
    customerId: string;
    margin: number;
    volume: number;
  }[];
  marginByCarrier: {
    carrierId: string;
    margin: number;
    volume: number;
  }[];
}

// Export Types
export interface RateExportOptions {
  entities: ('lanes' | 'tariffs' | 'quotes' | 'intelligence')[];
  format: 'csv' | 'xlsx' | 'json';
  filters?: RateSearchFilters;
  includeArchived?: boolean;
  dateRange?: {
    start: Date;
    end: Date;
  };
}

// API Response Types
export interface RateListResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface RateDetailResponse<T> {
  data: T;
  related?: {
    history?: RateHistoryEntry[];
    intelligence?: RateIntelligence;
    recommendations?: RateRecommendation[];
  };
}
