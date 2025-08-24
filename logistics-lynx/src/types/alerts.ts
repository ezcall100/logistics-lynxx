export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'resolved' | 'acknowledged';
  category: string;
  created_at: string;
  updated_at: string;
  source: string;
  metadata?: Record<string, any>;
}

export interface AlertFilters {
  severity?: string[];
  status?: string[];
  category?: string[];
  dateRange?: {
    start: string;
    end: string;
  };
  source?: string[];
}

export interface AlertStats {
  total: number;
  active: number;
  resolved: number;
  acknowledged: number;
  bySeverity: Record<string, number>;
  byCategory: Record<string, number>;
}
