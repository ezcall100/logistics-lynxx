-- ========================
-- 🧪 QA Intelligence Layer - Database Schema
-- ========================
-- Migration: 20250821_qa_intelligence_layer.sql
-- Description: Confidence logging and assertion tracking for MCP agents

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================
-- Agent Confidence Logs Table
-- ========================
CREATE TABLE IF NOT EXISTS agent_confidence_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID NOT NULL,
    task_type TEXT NOT NULL,
    confidence_score DECIMAL(3,2) NOT NULL CHECK (confidence_score >= 0.0 AND confidence_score <= 1.0),
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    decision_summary TEXT,
    context_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- Agent Assertions Table
-- ========================
CREATE TABLE IF NOT EXISTS agent_assertions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID NOT NULL,
    assertion_type TEXT NOT NULL,
    result BOOLEAN NOT NULL,
    error_message TEXT,
    triggered_at TIMESTAMPTZ DEFAULT NOW(),
    context_data JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- Agent Failures Table
-- ========================
CREATE TABLE IF NOT EXISTS agent_failures (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID NOT NULL,
    task_type TEXT NOT NULL,
    failure_type TEXT NOT NULL,
    error_message TEXT,
    stack_trace TEXT,
    retry_count INTEGER DEFAULT 0,
    resolved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- Agent Performance Metrics Table
-- ========================
CREATE TABLE IF NOT EXISTS agent_performance_metrics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id UUID NOT NULL,
    task_type TEXT NOT NULL,
    success_rate DECIMAL(5,2) NOT NULL,
    avg_response_time_ms INTEGER NOT NULL,
    total_requests INTEGER DEFAULT 0,
    successful_requests INTEGER DEFAULT 0,
    failed_requests INTEGER DEFAULT 0,
    retry_count INTEGER DEFAULT 0,
    measurement_period_hours INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================
-- Indexes for Performance
-- ========================
CREATE INDEX IF NOT EXISTS idx_agent_confidence_logs_agent_id ON agent_confidence_logs(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_confidence_logs_timestamp ON agent_confidence_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_agent_confidence_logs_task_type ON agent_confidence_logs(task_type);
CREATE INDEX IF NOT EXISTS idx_agent_confidence_logs_confidence_score ON agent_confidence_logs(confidence_score);

CREATE INDEX IF NOT EXISTS idx_agent_assertions_agent_id ON agent_assertions(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_assertions_result ON agent_assertions(result);
CREATE INDEX IF NOT EXISTS idx_agent_assertions_triggered_at ON agent_assertions(triggered_at);

CREATE INDEX IF NOT EXISTS idx_agent_failures_agent_id ON agent_failures(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_failures_resolved_at ON agent_failures(resolved_at);
CREATE INDEX IF NOT EXISTS idx_agent_failures_created_at ON agent_failures(created_at);

CREATE INDEX IF NOT EXISTS idx_agent_performance_metrics_agent_id ON agent_performance_metrics(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_performance_metrics_task_type ON agent_performance_metrics(task_type);

-- ========================
-- Row Level Security (RLS)
-- ========================
ALTER TABLE agent_confidence_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_assertions ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_failures ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_performance_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for agent_confidence_logs
CREATE POLICY "Enable read access for authenticated users" ON agent_confidence_logs
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for service role" ON agent_confidence_logs
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Enable update access for service role" ON agent_confidence_logs
    FOR UPDATE USING (auth.role() = 'service_role');

-- RLS Policies for agent_assertions
CREATE POLICY "Enable read access for authenticated users" ON agent_assertions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for service role" ON agent_assertions
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

-- RLS Policies for agent_failures
CREATE POLICY "Enable read access for authenticated users" ON agent_failures
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for service role" ON agent_failures
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Enable update access for service role" ON agent_failures
    FOR UPDATE USING (auth.role() = 'service_role');

-- RLS Policies for agent_performance_metrics
CREATE POLICY "Enable read access for authenticated users" ON agent_performance_metrics
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert access for service role" ON agent_performance_metrics
    FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Enable update access for service role" ON agent_performance_metrics
    FOR UPDATE USING (auth.role() = 'service_role');

-- ========================
-- Functions for Auto-Updating Timestamps
-- ========================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at columns
CREATE TRIGGER update_agent_confidence_logs_updated_at 
    BEFORE UPDATE ON agent_confidence_logs 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_failures_updated_at 
    BEFORE UPDATE ON agent_failures 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_performance_metrics_updated_at 
    BEFORE UPDATE ON agent_performance_metrics 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ========================
-- Views for Analytics
-- ========================
CREATE OR REPLACE VIEW agent_confidence_summary AS
SELECT 
    agent_id,
    task_type,
    COUNT(*) as total_decisions,
    AVG(confidence_score) as avg_confidence,
    MIN(confidence_score) as min_confidence,
    MAX(confidence_score) as max_confidence,
    COUNT(CASE WHEN confidence_score < 0.4 THEN 1 END) as low_confidence_count,
    COUNT(CASE WHEN confidence_score >= 0.8 THEN 1 END) as high_confidence_count
FROM agent_confidence_logs
WHERE timestamp >= NOW() - INTERVAL '24 hours'
GROUP BY agent_id, task_type;

CREATE OR REPLACE VIEW agent_failure_summary AS
SELECT 
    agent_id,
    task_type,
    failure_type,
    COUNT(*) as failure_count,
    COUNT(CASE WHEN resolved_at IS NOT NULL THEN 1 END) as resolved_count,
    AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))/3600) as avg_resolution_hours
FROM agent_failures
WHERE created_at >= NOW() - INTERVAL '24 hours'
GROUP BY agent_id, task_type, failure_type;

-- ========================
-- Sample Data for Testing
-- ========================
INSERT INTO agent_confidence_logs (agent_id, task_type, confidence_score, decision_summary, context_data) VALUES
(uuid_generate_v4(), 'CreateInvoice', 0.85, 'Successfully created invoice for load #12345', '{"load_id": "12345", "amount": 2500.00}'),
(uuid_generate_v4(), 'AssignLoad', 0.92, 'Assigned load to optimal carrier based on location and capacity', '{"carrier_id": "carrier_001", "load_id": "load_456"}'),
(uuid_generate_v4(), 'RouteOptimization', 0.78, 'Optimized route with 15% fuel savings', '{"original_distance": 1200, "optimized_distance": 1020}');

INSERT INTO agent_assertions (agent_id, assertion_type, result, error_message) VALUES
(uuid_generate_v4(), 'before_dispatch_check', true, NULL),
(uuid_generate_v4(), 'carrier_availability_check', false, 'Carrier not available for requested pickup time'),
(uuid_generate_v4(), 'route_feasibility_check', true, NULL);

-- ========================
-- Migration Complete
-- ========================
COMMENT ON TABLE agent_confidence_logs IS 'Logs confidence scores for all MCP agent decisions';
COMMENT ON TABLE agent_assertions IS 'Tracks assertion results for agent task validation';
COMMENT ON TABLE agent_failures IS 'Records agent failures and resolution status';
COMMENT ON TABLE agent_performance_metrics IS 'Aggregated performance metrics for agents';
