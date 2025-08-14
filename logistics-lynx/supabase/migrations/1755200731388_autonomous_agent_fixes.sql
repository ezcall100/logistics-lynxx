-- Autonomous Agent Database Tables
-- Created by autonomous agent fixer

-- Website pages table
CREATE TABLE IF NOT EXISTS website_pages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  path VARCHAR(500) UNIQUE NOT NULL,
  component VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Autonomous tasks table
CREATE TABLE IF NOT EXISTS autonomous_tasks (
  id SERIAL PRIMARY KEY,
  task_id VARCHAR(255) UNIQUE NOT NULL,
  agent_type VARCHAR(100) NOT NULL,
  portal VARCHAR(100) DEFAULT 'all',
  task_name VARCHAR(500) NOT NULL,
  description TEXT,
  priority INTEGER DEFAULT 5,
  status VARCHAR(50) DEFAULT 'pending',
  estimated_duration_minutes INTEGER DEFAULT 60,
  assigned_agent_id VARCHAR(255),
  result JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agent memory table
CREATE TABLE IF NOT EXISTS agent_memory (
  id SERIAL PRIMARY KEY,
  agent_id VARCHAR(255) NOT NULL,
  goal TEXT NOT NULL,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  context JSONB,
  confidence DECIMAL(3,2) DEFAULT 0.0,
  action_taken VARCHAR(255),
  outcome VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- AI decisions table
CREATE TABLE IF NOT EXISTS ai_decisions (
  id SERIAL PRIMARY KEY,
  decision_type VARCHAR(255) NOT NULL,
  context JSONB,
  decision JSONB NOT NULL,
  confidence_score DECIMAL(3,2) DEFAULT 0.0,
  implemented BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Agent status logs table
CREATE TABLE IF NOT EXISTS agent_status_logs (
  id SERIAL PRIMARY KEY,
  agent_id VARCHAR(255) NOT NULL,
  agent_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL,
  message TEXT,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  response_time INTEGER
);