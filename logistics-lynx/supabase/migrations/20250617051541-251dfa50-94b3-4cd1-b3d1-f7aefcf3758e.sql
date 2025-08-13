
-- Create AI confidence logs table
CREATE TABLE public.ai_confidence_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  decision_type TEXT NOT NULL,
  confidence_score DECIMAL NOT NULL CHECK (confidence_score >= 0 AND confidence_score <= 1),
  reasoning TEXT,
  decision_data JSONB NOT NULL,
  context JSONB,
  flagged_for_review BOOLEAN DEFAULT false,
  reviewed_by TEXT,
  reviewed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add indexes for performance
CREATE INDEX idx_ai_confidence_logs_decision_type ON public.ai_confidence_logs(decision_type);
CREATE INDEX idx_ai_confidence_logs_confidence_score ON public.ai_confidence_logs(confidence_score);
CREATE INDEX idx_ai_confidence_logs_created_at ON public.ai_confidence_logs(created_at DESC);
CREATE INDEX idx_ai_confidence_logs_flagged_review ON public.ai_confidence_logs(flagged_for_review) WHERE flagged_for_review = true;

-- Enable Row Level Security
ALTER TABLE public.ai_confidence_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policy (allowing all operations for now - will be refined based on user roles)
CREATE POLICY "Allow all operations on ai_confidence_logs" ON public.ai_confidence_logs FOR ALL USING (true);

-- Enable realtime for the new table
ALTER TABLE public.ai_confidence_logs REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_confidence_logs;

-- Insert sample data for testing
INSERT INTO public.ai_confidence_logs (decision_type, confidence_score, reasoning, decision_data, context, flagged_for_review) VALUES
('shipment_assignment', 0.95, 'Driver proximity and vehicle capacity match perfectly with shipment requirements', '{"driver_id": "driver_001", "vehicle_id": "vehicle_001", "shipment_id": "shipment_001"}', '{"distance_to_pickup": 5.2, "vehicle_capacity_utilization": 0.85}', false),
('route_optimization', 0.72, 'Traffic data incomplete for optimal route calculation', '{"route_id": "route_001", "estimated_duration": 8.5, "fuel_cost": 145.50}', '{"traffic_data_coverage": 0.65, "weather_conditions": "clear"}', true),
('dynamic_pricing', 0.88, 'Market analysis indicates competitive pricing within acceptable margins', '{"shipment_id": "shipment_002", "suggested_rate": 1250.00, "market_rate": 1200.00}', '{"demand_level": "high", "fuel_prices": "stable"}', false),
('predictive_maintenance', 0.65, 'Maintenance prediction based on limited vehicle history data', '{"vehicle_id": "vehicle_002", "maintenance_type": "engine_service", "urgency": "medium"}', '{"mileage": 95000, "last_service": "2024-05-15"}', true),
('load_matching', 0.91, 'High compatibility between load requirements and available capacity', '{"load_id": "load_001", "carrier_id": "carrier_001", "match_score": 0.91}', '{"weight_match": 0.95, "route_efficiency": 0.87}', false);
