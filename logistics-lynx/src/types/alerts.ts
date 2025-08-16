/* eslint-disable @typescript-eslint/no-explicit-any */

export type AlertSeverity = 'low' | 'medium' | 'high' | 'critical';
export type AlertCategory = 'ai_confidence' | 'system_error' | 'performance' | 'security' | 'maintenance';
export type AlertStatus = 'active' | 'acknowledged' | 'resolved' | 'dismissed';

export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: AlertSeverity;
  category: AlertCategory;
  status: AlertStatus;
  timestamp: string;
  source?: string;
  metadata?: Record<string, unknown>;
  acknowledged_by?: string;
  acknowledged_at?: string;
  resolved_at?: string;
}

export interface AlertFilters {
  severity?: AlertSeverity[];
  category?: AlertCategory[];
  status?: AlertStatus[];
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface AlertStats {
  total: number;
  active: number;
  critical: number;
  resolved_today: number;
  by_category: Record<AlertCategory, number>;
  by_severity: Record<AlertSeverity, number>;
}
