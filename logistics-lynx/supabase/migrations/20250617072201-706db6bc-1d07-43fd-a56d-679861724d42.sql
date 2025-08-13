
-- Create analytics tables for real data integration

-- User interaction analytics table
CREATE TABLE public.user_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'click', 'navigation', 'feature_usage', 'page_view'
  event_data JSONB NOT NULL DEFAULT '{}',
  page_path TEXT,
  feature_name TEXT,
  duration_ms INTEGER,
  user_role TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- AI performance metrics table
CREATE TABLE public.ai_performance_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_type TEXT NOT NULL, -- 'prediction_accuracy', 'learning_progress', 'adaptation_speed'
  metric_value DECIMAL NOT NULL,
  confidence_score DECIMAL,
  decision_context JSONB NOT NULL DEFAULT '{}',
  user_role TEXT,
  feature_area TEXT, -- 'route_optimization', 'load_matching', 'predictive_maintenance'
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- System health metrics table
CREATE TABLE public.system_health_metrics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  metric_name TEXT NOT NULL, -- 'cpu_usage', 'memory_usage', 'response_time', 'error_rate'
  metric_value DECIMAL NOT NULL,
  unit TEXT NOT NULL, -- 'percentage', 'milliseconds', 'count'
  server_instance TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- User session analytics table
CREATE TABLE public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  user_role TEXT,
  start_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_time TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  page_views INTEGER DEFAULT 0,
  interactions_count INTEGER DEFAULT 0,
  features_used JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX idx_user_analytics_user_id ON public.user_analytics(user_id);
CREATE INDEX idx_user_analytics_timestamp ON public.user_analytics(timestamp DESC);
CREATE INDEX idx_user_analytics_event_type ON public.user_analytics(event_type);
CREATE INDEX idx_user_analytics_user_role ON public.user_analytics(user_role);

CREATE INDEX idx_ai_performance_timestamp ON public.ai_performance_metrics(timestamp DESC);
CREATE INDEX idx_ai_performance_metric_type ON public.ai_performance_metrics(metric_type);
CREATE INDEX idx_ai_performance_user_role ON public.ai_performance_metrics(user_role);

CREATE INDEX idx_system_health_timestamp ON public.system_health_metrics(timestamp DESC);
CREATE INDEX idx_system_health_metric_name ON public.system_health_metrics(metric_name);

CREATE INDEX idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_user_sessions_start_time ON public.user_sessions(start_time DESC);

-- Enable Row Level Security
ALTER TABLE public.user_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_health_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for user analytics (users can see their own data, admins see all)
CREATE POLICY "Users can view their own analytics" ON public.user_analytics
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all analytics" ON public.user_analytics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND raw_user_meta_data->>'role' = 'super_admin'
    )
  );

CREATE POLICY "System can insert analytics" ON public.user_analytics
  FOR INSERT WITH CHECK (true);

-- AI performance metrics policies (admin only for viewing, system for inserting)
CREATE POLICY "Admins can view AI metrics" ON public.ai_performance_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND raw_user_meta_data->>'role' IN ('super_admin', 'carrier_admin', 'freight_broker_admin', 'shipper_admin')
    )
  );

CREATE POLICY "System can insert AI metrics" ON public.ai_performance_metrics
  FOR INSERT WITH CHECK (true);

-- System health metrics policies (admin only)
CREATE POLICY "Admins can view system health" ON public.system_health_metrics
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND raw_user_meta_data->>'role' = 'super_admin'
    )
  );

CREATE POLICY "System can insert health metrics" ON public.system_health_metrics
  FOR INSERT WITH CHECK (true);

-- User sessions policies
CREATE POLICY "Users can view their own sessions" ON public.user_sessions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sessions" ON public.user_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE id = auth.uid() 
      AND raw_user_meta_data->>'role' = 'super_admin'
    )
  );

CREATE POLICY "System can manage sessions" ON public.user_sessions
  FOR ALL WITH CHECK (true);

-- Enable realtime for live updates
ALTER TABLE public.user_analytics REPLICA IDENTITY FULL;
ALTER TABLE public.ai_performance_metrics REPLICA IDENTITY FULL;
ALTER TABLE public.system_health_metrics REPLICA IDENTITY FULL;
ALTER TABLE public.user_sessions REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.user_analytics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_performance_metrics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.system_health_metrics;
ALTER PUBLICATION supabase_realtime ADD TABLE public.user_sessions;

-- Insert some initial sample data for testing
INSERT INTO public.ai_performance_metrics (metric_type, metric_value, confidence_score, decision_context, user_role, feature_area) VALUES
('prediction_accuracy', 0.94, 0.92, '{"route_id": "route_001", "factors": ["traffic", "weather"]}', 'carrier_admin', 'route_optimization'),
('learning_progress', 0.87, 0.89, '{"improvement_rate": 0.15, "training_cycles": 50}', 'super_admin', 'load_matching'),
('adaptation_speed', 0.91, 0.85, '{"response_time": 120, "complexity": "medium"}', 'freight_broker_admin', 'predictive_maintenance');

INSERT INTO public.system_health_metrics (metric_name, metric_value, unit, server_instance) VALUES
('cpu_usage', 68.5, 'percentage', 'app-server-01'),
('memory_usage', 72.3, 'percentage', 'app-server-01'),
('response_time', 245, 'milliseconds', 'api-server-01'),
('error_rate', 0.3, 'percentage', 'api-server-01');
