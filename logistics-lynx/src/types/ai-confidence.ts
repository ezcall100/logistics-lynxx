/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Json } from '@/integrations/supabase/types';

export interface AIConfidenceLog {
  id: string;
  decision_type: string;
  confidence_score: number;
  reasoning?: string;
  decision_data: Json;
  context?: Json;
  flagged_for_review: boolean;
  reviewed_by?: string;
  reviewed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface AIConfidenceFilters {
  decision_type?: string[];
  confidence_threshold?: number;
  flagged_for_review?: boolean;
  date_range?: {
    start: string;
    end: string;
  };
}

export interface AIConfidenceStats {
  total_decisions: number;
  avg_confidence: number;
  flagged_count: number;
  low_confidence_count: number;
  by_decision_type: Record<string, number>;
  confidence_distribution: {
    high: number; // >= 0.8
    medium: number; // 0.6 - 0.79
    low: number; // < 0.6
  };
}
