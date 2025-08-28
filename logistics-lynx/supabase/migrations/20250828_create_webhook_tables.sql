-- Create autonomous_tasks table for storing webhook tasks
CREATE TABLE IF NOT EXISTS autonomous_tasks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    task_type VARCHAR(100) NOT NULL DEFAULT 'autonomous_task',
    agent_type VARCHAR(100) NOT NULL DEFAULT 'n8n_webhook_agent',
    task_name VARCHAR(255) NOT NULL,
    description TEXT,
    priority INTEGER DEFAULT 5,
    workflow_id VARCHAR(255),
    execution_id VARCHAR(255),
    trigger_type VARCHAR(100) DEFAULT 'webhook',
    goal TEXT,
    prompt TEXT,
    action TEXT,
    confidence DECIMAL(3,2) DEFAULT 0.8,
    success BOOLEAN DEFAULT true,
    metadata JSONB DEFAULT '{}',
    timestamp TIMESTAMPTZ DEFAULT NOW(),
    test BOOLEAN DEFAULT false,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create webhook_logs table for logging webhook requests
CREATE TABLE IF NOT EXISTS webhook_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    webhook_type VARCHAR(50) NOT NULL,
    payload JSONB NOT NULL,
    task_id UUID REFERENCES autonomous_tasks(id),
    status VARCHAR(50) DEFAULT 'success',
    response_time BIGINT,
    error_message TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_task_type ON autonomous_tasks(task_type);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_status ON autonomous_tasks(status);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_created_at ON autonomous_tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_webhook_type ON webhook_logs(webhook_type);
CREATE INDEX IF NOT EXISTS idx_webhook_logs_created_at ON webhook_logs(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE autonomous_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE webhook_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for autonomous_tasks
CREATE POLICY "Allow service role full access to autonomous_tasks" ON autonomous_tasks
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow authenticated users to read autonomous_tasks" ON autonomous_tasks
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create policies for webhook_logs
CREATE POLICY "Allow service role full access to webhook_logs" ON webhook_logs
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow authenticated users to read webhook_logs" ON webhook_logs
    FOR SELECT USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for autonomous_tasks
CREATE TRIGGER update_autonomous_tasks_updated_at 
    BEFORE UPDATE ON autonomous_tasks 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
