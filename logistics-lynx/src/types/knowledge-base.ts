export interface KnowledgeRule {
  id: string;
  name: string;
  description?: string;
  pattern: string;
  action: string;
  priority: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface KnowledgePattern {
  id: string;
  name: string;
  pattern_type: string;
  content: string;
  confidence_score: number;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

export interface KnowledgeVersion {
  id: string;
  version: string;
  description: string;
  changes: string[];
  created_at: string;
  created_by: string;
}

export interface PerformanceMetrics {
  id: string;
  metric_name: string;
  value: number;
  unit: string;
  timestamp: string;
  context?: Record<string, any>;
}
