export interface KnowledgeRule {
  id: string;
  name: string;
  description: string;
  rule_type: string;
  is_active: boolean;
  confidence_score: number;
  created_at: string;
  updated_at: string;
  version: string;
  pattern: string;
  action: string;
  priority: number;
}

export interface KnowledgePattern {
  id: string;
  name: string;
  pattern: string;
  description: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  confidence_threshold: number;
}

export interface KnowledgeVersion {
  id: string;
  version_number: string;
  description: string;
  created_at: string;
  created_by: string;
  is_active: boolean;
  changes: string[];
}

export interface PerformanceMetrics {
  id: string;
  metric_name: string;
  metric_value: number;
  unit: string;
  timestamp: string;
  threshold: number;
  status: 'normal' | 'warning' | 'critical';
}
