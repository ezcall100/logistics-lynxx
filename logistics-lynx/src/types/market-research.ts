export interface MarketResearchAgent {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'inactive' | 'error';
  last_run: string;
  data_sources: string[];
  created_at: string;
}

export interface MarketIntelligenceData {
  id: string;
  agent_id: string;
  data_type: string;
  content: any;
  confidence_score: number;
  timestamp: string;
  source: string;
}

export interface CompetitiveAnalysis {
  id: string;
  competitor_name: string;
  analysis_date: string;
  strengths: string[];
  weaknesses: string[];
  opportunities: string[];
  threats: string[];
  market_share: number;
  created_at: string;
}

export interface MarketForecast {
  id: string;
  market_segment: string;
  forecast_period: string;
  predicted_growth: number;
  confidence_interval: [number, number];
  factors: string[];
  created_at: string;
}
