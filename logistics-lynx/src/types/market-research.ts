/* eslint-disable @typescript-eslint/no-explicit-any */

export interface MarketIntelligenceData {
  id: string;
  research_type: 'pricing_trends' | 'technology_analysis' | 'competitor_features' | 'market_demand';
  data_source: string;
  insights: {
    summary: string;
    key_findings: string[];
    recommendations: string[];
    confidence_score: number;
  };
  market_segment: 'LTL' | 'FTL' | 'intermodal' | 'air_freight' | 'last_mile';
  created_at: string;
  relevance_score: number;
  actionable_items: string[];
}

export interface CompetitiveAnalysis {
  id: string;
  competitor_name: string;
  platform_features: string[];
  pricing_model: string;
  market_position: 'leader' | 'challenger' | 'niche' | 'follower';
  strengths: string[];
  weaknesses: string[];
  feature_gaps: string[];
  customer_feedback: {
    rating: number;
    common_complaints: string[];
    praised_features: string[];
  };
  analyzed_at: string;
}

export interface MarketForecast {
  id: string;
  forecast_type: 'demand' | 'capacity' | 'pricing' | 'route_optimization';
  time_horizon: '1_week' | '1_month' | '3_months' | '6_months';
  prediction_data: {
    current_trend: 'increasing' | 'decreasing' | 'stable';
    predicted_change: number;
    confidence_level: number;
    key_factors: string[];
  };
  recommendations: {
    immediate_actions: string[];
    strategic_adjustments: string[];
    risk_mitigation: string[];
  };
  created_at: string;
}

export interface MarketResearchAgent {
  id: string;
  name: string;
  type: 'market_intelligence' | 'competitive_analysis' | 'demand_forecasting';
  status: 'active' | 'researching' | 'analyzing' | 'reporting';
  last_research: string;
  research_completed: number;
  success_rate: number;
  next_research_cycle: string;
  focus_areas: string[];
}
