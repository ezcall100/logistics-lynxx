
export interface KnowledgeRule {
  id: string;
  rule_type: 'routing' | 'assignment' | 'pricing' | 'maintenance' | 'scheduling';
  name: string;
  description: string;
  conditions: Record<string, unknown>;
  actions: Record<string, unknown>;
  confidence_score: number;
  performance_impact: number;
  created_at: string;
  updated_at: string;
  version: number;
  is_active: boolean;
  auto_generated: boolean;
  success_rate: number;
  usage_count: number;
}

export interface KnowledgePattern {
  id: string;
  pattern_type: string;
  data_points: unknown[];
  confidence: number;
  frequency: number;
  impact_score: number;
  discovered_at: string;
  rule_generated: boolean;
}

export interface KnowledgeVersion {
  id: string;
  version_number: number;
  changes_summary: string;
  performance_before: number;
  performance_after: number;
  rollback_reason?: string;
  created_at: string;
  is_active: boolean;
  rules_count: number;
}

export interface PerformanceMetrics {
  efficiency_score: number;
  cost_savings: number;
  accuracy_improvement: number;
  decision_speed: number;
  error_reduction: number;
}
