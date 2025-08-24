export interface Alert {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  status: 'active' | 'acknowledged' | 'resolved';
  created_at: string;
  updated_at: string;
  acknowledged_at?: string;
  resolved_at?: string;
  acknowledged_by?: string;
  resolved_by?: string;
  source: string;
  metadata?: Record<string, any>;
}

export interface AlertFilters {
  type?: string;
  severity?: string;
  status?: string;
  source?: string;
  date_from?: string;
  date_to?: string;
}

export interface AlertStats {
  total: number;
  active: number;
  acknowledged: number;
  resolved: number;
  by_type: Record<string, number>;
  by_severity: Record<string, number>;
}
