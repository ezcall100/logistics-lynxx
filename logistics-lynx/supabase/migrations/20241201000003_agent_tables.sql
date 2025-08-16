-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create agent registry table
CREATE TABLE IF NOT EXISTS agent_registry (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'inactive',
    capabilities JSONB,
    configuration JSONB,
    last_heartbeat TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create agent tasks table
CREATE TABLE IF NOT EXISTS agent_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id VARCHAR(255) REFERENCES agent_registry(agent_id),
    task_type VARCHAR(100) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    priority INTEGER DEFAULT 0,
    payload JSONB,
    result JSONB,
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create agent events table
CREATE TABLE IF NOT EXISTS agent_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id VARCHAR(255) REFERENCES agent_registry(agent_id),
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    severity VARCHAR(20) DEFAULT 'info',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create agent decisions table
CREATE TABLE IF NOT EXISTS agent_decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id VARCHAR(255) REFERENCES agent_registry(agent_id),
    decision_type VARCHAR(100) NOT NULL,
    context JSONB,
    decision JSONB,
    confidence DECIMAL(3,2),
    reasoning TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_agent_registry_status ON agent_registry(status);
CREATE INDEX IF NOT EXISTS idx_agent_registry_type ON agent_registry(type);
CREATE INDEX IF NOT EXISTS idx_agent_registry_heartbeat ON agent_registry(last_heartbeat);
CREATE INDEX IF NOT EXISTS idx_agent_registry_created_at ON agent_registry(created_at);

CREATE INDEX IF NOT EXISTS idx_agent_tasks_agent_id ON agent_tasks(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_status ON agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_priority ON agent_tasks(priority);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_created_at ON agent_tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_agent_tasks_type ON agent_tasks(task_type);

CREATE INDEX IF NOT EXISTS idx_agent_events_agent_id ON agent_events(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_events_type ON agent_events(event_type);
CREATE INDEX IF NOT EXISTS idx_agent_events_created_at ON agent_events(created_at);
CREATE INDEX IF NOT EXISTS idx_agent_events_severity ON agent_events(severity);

CREATE INDEX IF NOT EXISTS idx_agent_decisions_agent_id ON agent_decisions(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_decisions_type ON agent_decisions(decision_type);
CREATE INDEX IF NOT EXISTS idx_agent_decisions_confidence ON agent_decisions(confidence);
CREATE INDEX IF NOT EXISTS idx_agent_decisions_created_at ON agent_decisions(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE agent_registry ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_decisions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for agent_registry
CREATE POLICY "Allow authenticated users to view agent registry" ON agent_registry
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow service role to manage agent registry" ON agent_registry
    FOR ALL USING (auth.role() = 'service_role');

-- Create RLS policies for agent_tasks
CREATE POLICY "Allow authenticated users to view agent tasks" ON agent_tasks
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow service role to manage agent tasks" ON agent_tasks
    FOR ALL USING (auth.role() = 'service_role');

-- Create RLS policies for agent_events
CREATE POLICY "Allow authenticated users to view agent events" ON agent_events
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow service role to manage agent events" ON agent_events
    FOR ALL USING (auth.role() = 'service_role');

-- Create RLS policies for agent_decisions
CREATE POLICY "Allow authenticated users to view agent decisions" ON agent_decisions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow service role to manage agent decisions" ON agent_decisions
    FOR ALL USING (auth.role() = 'service_role');

-- Create functions for automatic timestamp updates
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_agent_registry_updated_at 
    BEFORE UPDATE ON agent_registry 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_agent_tasks_updated_at 
    BEFORE UPDATE ON agent_tasks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to clean up old data
CREATE OR REPLACE FUNCTION cleanup_old_agent_data(days_to_keep INTEGER DEFAULT 30)
RETURNS INTEGER AS $$
DECLARE
    deleted_count INTEGER := 0;
    cutoff_date TIMESTAMP WITH TIME ZONE;
BEGIN
    cutoff_date := NOW() - (days_to_keep || ' days')::INTERVAL;
    
    -- Clean up old events
    DELETE FROM agent_events WHERE created_at < cutoff_date;
    GET DIAGNOSTICS deleted_count = ROW_COUNT;
    
    -- Clean up old tasks (keep completed/failed for longer)
    DELETE FROM agent_tasks 
    WHERE created_at < cutoff_date 
    AND status IN ('pending', 'running');
    
    -- Clean up old decisions
    DELETE FROM agent_decisions WHERE created_at < cutoff_date;
    
    RETURN deleted_count;
END;
$$ LANGUAGE plpgsql;

-- Create function to get agent metrics
CREATE OR REPLACE FUNCTION get_agent_metrics(agent_id_param VARCHAR(255) DEFAULT NULL)
RETURNS TABLE (
    agent_id VARCHAR(255),
    total_tasks BIGINT,
    completed_tasks BIGINT,
    failed_tasks BIGINT,
    pending_tasks BIGINT,
    success_rate DECIMAL(5,2),
    avg_processing_time DECIMAL(10,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        ar.agent_id,
        COUNT(t.id)::BIGINT as total_tasks,
        COUNT(CASE WHEN t.status = 'completed' THEN 1 END)::BIGINT as completed_tasks,
        COUNT(CASE WHEN t.status = 'failed' THEN 1 END)::BIGINT as failed_tasks,
        COUNT(CASE WHEN t.status = 'pending' THEN 1 END)::BIGINT as pending_tasks,
        CASE 
            WHEN COUNT(t.id) > 0 THEN 
                (COUNT(CASE WHEN t.status = 'completed' THEN 1 END)::DECIMAL / COUNT(t.id)::DECIMAL * 100)
            ELSE 0 
        END as success_rate,
        AVG(
            CASE 
                WHEN t.completed_at IS NOT NULL AND t.started_at IS NOT NULL 
                THEN EXTRACT(EPOCH FROM (t.completed_at - t.started_at))
                ELSE NULL 
            END
        ) as avg_processing_time
    FROM agent_registry ar
    LEFT JOIN agent_tasks t ON ar.agent_id = t.agent_id
    WHERE (agent_id_param IS NULL OR ar.agent_id = agent_id_param)
    GROUP BY ar.agent_id;
END;
$$ LANGUAGE plpgsql;

-- Create function to get system health
CREATE OR REPLACE FUNCTION get_system_health()
RETURNS JSON AS $$
DECLARE
    result JSON;
BEGIN
    SELECT json_build_object(
        'status', 
        CASE 
            WHEN COUNT(CASE WHEN ar.status = 'active' THEN 1 END) = 0 THEN 'down'
            WHEN COUNT(CASE WHEN ar.status = 'active' THEN 1 END) < COUNT(*) THEN 'degraded'
            ELSE 'healthy'
        END,
        'total_agents', COUNT(*),
        'active_agents', COUNT(CASE WHEN ar.status = 'active' THEN 1 END),
        'inactive_agents', COUNT(CASE WHEN ar.status = 'inactive' THEN 1 END),
        'total_tasks', COALESCE(task_stats.total_tasks, 0),
        'completed_tasks', COALESCE(task_stats.completed_tasks, 0),
        'failed_tasks', COALESCE(task_stats.failed_tasks, 0),
        'success_rate', COALESCE(task_stats.success_rate, 0),
        'timestamp', NOW()
    ) INTO result
    FROM agent_registry ar
    CROSS JOIN (
        SELECT 
            COUNT(*) as total_tasks,
            COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
            COUNT(CASE WHEN status = 'failed' THEN 1 END) as failed_tasks,
            CASE 
                WHEN COUNT(*) > 0 THEN 
                    (COUNT(CASE WHEN status = 'completed' THEN 1 END)::DECIMAL / COUNT(*)::DECIMAL * 100)
                ELSE 0 
            END as success_rate
        FROM agent_tasks
    ) task_stats;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Insert sample agent data for testing
INSERT INTO agent_registry (agent_id, name, type, status, capabilities, configuration, last_heartbeat) 
VALUES 
    ('tms-decision-agent-001', 'TMS Decision Agent', 'decision', 'active', 
     '["route_optimization", "load_matching", "pricing", "risk_assessment", "capacity_planning"]',
     '{"decision_threshold": 0.8, "max_concurrent_tasks": 5, "version": "1.0.0"}',
     NOW())
ON CONFLICT (agent_id) DO NOTHING;

-- Create a view for recent agent activity
CREATE OR REPLACE VIEW recent_agent_activity AS
SELECT 
    ar.agent_id,
    ar.name,
    ar.type,
    ar.status,
    COUNT(t.id) as total_tasks,
    COUNT(CASE WHEN t.status = 'completed' THEN 1 END) as completed_tasks,
    COUNT(CASE WHEN t.status = 'failed' THEN 1 END) as failed_tasks,
    ar.last_heartbeat,
    ar.updated_at
FROM agent_registry ar
LEFT JOIN agent_tasks t ON ar.agent_id = t.agent_id 
    AND t.created_at >= NOW() - INTERVAL '24 hours'
GROUP BY ar.agent_id, ar.name, ar.type, ar.status, ar.last_heartbeat, ar.updated_at
ORDER BY ar.updated_at DESC;

-- Grant permissions
GRANT SELECT ON recent_agent_activity TO authenticated;
GRANT SELECT ON recent_agent_activity TO service_role;

-- Create comments for documentation
COMMENT ON TABLE agent_registry IS 'Registry of all autonomous agents in the system';
COMMENT ON TABLE agent_tasks IS 'Tasks assigned to and executed by autonomous agents';
COMMENT ON TABLE agent_events IS 'Events and logs generated by autonomous agents';
COMMENT ON TABLE agent_decisions IS 'Decisions made by autonomous agents with confidence scores';
COMMENT ON VIEW recent_agent_activity IS 'View showing recent activity and metrics for all agents';
