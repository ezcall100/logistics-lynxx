// Load Board Module Types - Centralized marketplace for posting, bidding, matching, and assigning loads

export interface Load {
  id: string;
  loadNumber: string;
  title: string;
  description?: string;
  status: 'draft' | 'posted' | 'tendered' | 'accepted' | 'dispatched' | 'in-transit' | 'delivered' | 'cancelled';
  
  // Origin and Destination
  origin: LoadLocation;
  destination: LoadLocation;
  
  // Load Details
  equipmentType: EquipmentType;
  weight: number; // in pounds
  weightUnit: 'lbs' | 'kg';
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'ft' | 'm';
  };
  
  // Dates and Times
  pickupDate: Date;
  deliveryDate: Date;
  pickupWindow?: {
    start: Date;
    end: Date;
  };
  deliveryWindow?: {
    start: Date;
    end: Date;
  };
  
  // Pricing
  rate: number;
  rateType: 'per-mile' | 'per-load' | 'per-pound' | 'flat-rate';
  currency: string;
  fuelSurcharge?: number;
  accessorials?: LoadAccessorial[];
  
  // Requirements
  requirements: LoadRequirement[];
  specialInstructions?: string;
  hazmat?: boolean;
  temperature?: {
    min: number;
    max: number;
    unit: 'fahrenheit' | 'celsius';
  };
  
  // Parties
  shipperId: string;
  brokerId?: string;
  carrierId?: string;
  driverId?: string;
  
  // Documents
  documents: LoadDocument[];
  
  // Tracking
  tracking?: LoadTracking;
  
  // Metadata
  tags: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent';
  isUrgent: boolean;
  isExpedited: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  postedAt?: Date;
  acceptedAt?: Date;
  dispatchedAt?: Date;
  pickedUpAt?: Date;
  deliveredAt?: Date;
  cancelledAt?: Date;
  
  // Analytics
  views: number;
  bids: number;
  averageBidRate?: number;
}

export interface LoadLocation {
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  facilityName?: string;
  contactName?: string;
  contactPhone?: string;
  contactEmail?: string;
  appointmentRequired?: boolean;
  appointmentTime?: Date;
  specialInstructions?: string;
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

export interface LoadRequirement {
  id: string;
  type: 'equipment' | 'license' | 'insurance' | 'bond' | 'certification' | 'experience' | 'other';
  name: string;
  description?: string;
  isRequired: boolean;
  value?: string;
  verified?: boolean;
  verifiedAt?: Date;
  verifiedBy?: string;
}

export interface LoadAccessorial {
  id: string;
  type: 'detention' | 'layover' | 'tarp' | 'lumper' | 'inside-delivery' | 'liftgate' | 'residential' | 'appointment' | 'other';
  name: string;
  description?: string;
  rate: number;
  rateType: 'per-hour' | 'per-day' | 'per-load' | 'flat-rate';
  isIncluded: boolean;
  isOptional: boolean;
}

export interface LoadDocument {
  id: string;
  type: 'bol' | 'pod' | 'invoice' | 'rate-conf' | 'insurance' | 'permit' | 'other';
  name: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
  isRequired: boolean;
  isCompleted: boolean;
  completedAt?: Date;
  completedBy?: string;
}

export interface LoadTracking {
  currentLocation?: {
    latitude: number;
    longitude: number;
    timestamp: Date;
    address?: string;
  };
  estimatedArrival?: Date;
  actualArrival?: Date;
  status: 'en-route' | 'at-pickup' | 'at-delivery' | 'completed';
  lastUpdate: Date;
  updates: LoadTrackingUpdate[];
}

export interface LoadTrackingUpdate {
  id: string;
  location: {
    latitude: number;
    longitude: number;
    address?: string;
  };
  status: string;
  message?: string;
  timestamp: Date;
  driverId?: string;
}

// Load Posting
export interface LoadPost {
  id: string;
  loadId: string;
  postedBy: string;
  postedAt: Date;
  expiresAt?: Date;
  isActive: boolean;
  visibility: 'public' | 'private' | 'invited-only';
  invitedCarriers?: string[];
  autoAward?: boolean;
  autoAwardCriteria?: {
    maxRate?: number;
    minRating?: number;
    preferredCarriers?: string[];
  };
}

// Bidding System
export interface LoadBid {
  id: string;
  loadId: string;
  carrierId: string;
  rate: number;
  rateType: 'per-mile' | 'per-load' | 'per-pound' | 'flat-rate';
  currency: string;
  fuelSurcharge?: number;
  accessorials?: LoadBidAccessorial[];
  totalRate: number;
  
  // Bid Details
  notes?: string;
  proposedPickupDate?: Date;
  proposedDeliveryDate?: Date;
  equipment?: {
    type: EquipmentType;
    description?: string;
  };
  
  // Status
  status: 'pending' | 'accepted' | 'rejected' | 'countered' | 'withdrawn';
  isWinning: boolean;
  
  // Timestamps
  submittedAt: Date;
  acceptedAt?: Date;
  rejectedAt?: Date;
  counteredAt?: Date;
  withdrawnAt?: Date;
  
  // Counter Offer
  counterOffer?: {
    rate: number;
    notes?: string;
    expiresAt: Date;
  };
}

export interface LoadBidAccessorial {
  id: string;
  accessorialId: string;
  rate: number;
  isIncluded: boolean;
}

// Load Award
export interface LoadAward {
  id: string;
  loadId: string;
  bidId: string;
  carrierId: string;
  awardedBy: string;
  awardedAt: Date;
  rate: number;
  rateType: string;
  totalRate: number;
  notes?: string;
  terms?: string;
  documents?: string[];
}

// Load Status Events
export interface LoadStatusEvent {
  id: string;
  loadId: string;
  status: Load['status'];
  previousStatus?: Load['status'];
  triggeredBy: string;
  triggeredAt: Date;
  notes?: string;
  metadata?: Record<string, any>;
}

// Search and Filter Types
export interface LoadSearchFilters {
  origin?: {
    city?: string;
    state?: string;
    zipCode?: string;
    radius?: number; // miles
  };
  destination?: {
    city?: string;
    state?: string;
    zipCode?: string;
    radius?: number; // miles
  };
  equipmentType?: EquipmentType[];
  weightRange?: {
    min?: number;
    max?: number;
  };
  rateRange?: {
    min?: number;
    max?: number;
  };
  pickupDateRange?: {
    start?: Date;
    end?: Date;
  };
  deliveryDateRange?: {
    start?: Date;
    end?: Date;
  };
  status?: Load['status'][];
  priority?: Load['priority'][];
  isUrgent?: boolean;
  isExpedited?: boolean;
  hazmat?: boolean;
  temperature?: {
    min?: number;
    max?: number;
  };
  tags?: string[];
  shipperId?: string;
  brokerId?: string;
  carrierId?: string;
}

// Matching and Suggestions
export interface LoadMatch {
  id: string;
  loadId: string;
  carrierId: string;
  score: number; // 0-100
  reasons: string[];
  isRecommended: boolean;
  createdAt: Date;
}

export interface LoadSuggestion {
  id: string;
  type: 'similar-load' | 'backhaul' | 'headhaul' | 'preferred-lane';
  loadId: string;
  score: number;
  reason: string;
  createdAt: Date;
}

// Saved Searches and Favorites
export interface SavedLoadSearch {
  id: string;
  userId: string;
  name: string;
  filters: LoadSearchFilters;
  isActive: boolean;
  notifications?: {
    email?: boolean;
    push?: boolean;
    sms?: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
  lastUsedAt?: Date;
}

export interface FavoriteLoad {
  id: string;
  userId: string;
  loadId: string;
  notes?: string;
  createdAt: Date;
}

// Lane Management
export interface Lane {
  id: string;
  origin: LoadLocation;
  destination: LoadLocation;
  equipmentType: EquipmentType;
  averageRate: number;
  rateHistory: LaneRateHistory[];
  volume: number; // loads per month
  carriers: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LaneRateHistory {
  id: string;
  laneId: string;
  rate: number;
  date: Date;
  volume: number;
}

// Analytics and Reporting
export interface LoadBoardMetrics {
  totalLoads: number;
  activeLoads: number;
  postedToday: number;
  deliveredToday: number;
  averageRate: number;
  totalBids: number;
  averageBidsPerLoad: number;
  acceptanceRate: number;
  topLanes: Lane[];
  topCarriers: string[];
  topShippers: string[];
}

export interface LoadBoardReport {
  id: string;
  type: 'load-volume' | 'rate-analysis' | 'carrier-performance' | 'lane-analysis' | 'revenue';
  dateRange: {
    start: Date;
    end: Date;
  };
  filters?: LoadSearchFilters;
  data: any;
  generatedAt: Date;
  generatedBy: string;
}

// API Response Types
export interface LoadListResponse {
  data: Load[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
  filters: LoadSearchFilters;
}

export interface LoadDetailResponse {
  data: Load;
  bids: LoadBid[];
  tracking?: LoadTracking;
  documents: LoadDocument[];
  statusEvents: LoadStatusEvent[];
  matches: LoadMatch[];
  suggestions: LoadSuggestion[];
}

// Real-time Updates
export interface LoadUpdate {
  type: 'status-change' | 'new-bid' | 'bid-accepted' | 'tracking-update' | 'document-uploaded';
  loadId: string;
  data: any;
  timestamp: Date;
}

// Integration Types
export interface LoadBoardIntegration {
  id: string;
  type: 'tms' | 'erp' | 'wms' | 'gps' | 'edi' | 'api';
  name: string;
  provider: string;
  isActive: boolean;
  config: Record<string, any>;
  lastSyncAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Notification Types
export interface LoadNotification {
  id: string;
  userId: string;
  type: 'new-load' | 'bid-received' | 'bid-accepted' | 'load-status-change' | 'delivery-reminder';
  loadId: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  readAt?: Date;
  actionUrl?: string;
}
