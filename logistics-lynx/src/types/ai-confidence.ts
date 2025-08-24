export interface AIConfidenceLog {
  id: string;
  decision_type: string;
  decision_data: any;
  confidence_score: number;
  reasoning?: string;
  context?: any;
  flagged_for_review?: boolean;
  reviewed_at?: string;
  reviewed_by?: string;
  created_at: string;
  updated_at: string;
}

export interface AIConfidenceFilters {
  decision_type?: string;
  confidence_min?: number;
  confidence_max?: number;
  flagged_for_review?: boolean;
  date_from?: string;
  date_to?: string;
}

export interface AIConfidenceStats {
  total_decisions: number;
  average_confidence: number;
  flagged_count: number;
  reviewed_count: number;
  by_decision_type: Record<string, number>;
  confidence_distribution: Record<string, number>;
}
