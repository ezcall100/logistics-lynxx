
-- Create agent_memory table for storing agent decisions and outcomes
CREATE TABLE public.agent_memory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id TEXT NOT NULL,
  goal TEXT NOT NULL,
  context JSONB,
  prompt TEXT NOT NULL,
  response TEXT NOT NULL,
  action_taken TEXT,
  confidence FLOAT,
  outcome TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add index for faster queries by agent_id and timestamp
CREATE INDEX idx_agent_memory_agent_id ON public.agent_memory(agent_id);
CREATE INDEX idx_agent_memory_timestamp ON public.agent_memory(created_at DESC);
CREATE INDEX idx_agent_memory_goal ON public.agent_memory(goal);

-- Enable Row Level Security
ALTER TABLE public.agent_memory ENABLE ROW LEVEL SECURITY;

-- Create policy for reading agent memory (allow all for demo - you can restrict later)
CREATE POLICY "Allow read access to agent memory" 
  ON public.agent_memory 
  FOR SELECT 
  USING (true);

-- Create policy for inserting agent memory
CREATE POLICY "Allow insert access to agent memory" 
  ON public.agent_memory
  FOR INSERT 
  WITH CHECK (true);

-- Create autonomous_agent_configs table for agent settings
CREATE TABLE public.autonomous_agent_configs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id TEXT NOT NULL UNIQUE,
  agent_name TEXT NOT NULL,
  openai_enabled BOOLEAN NOT NULL DEFAULT true,
  query_frequency_minutes INTEGER NOT NULL DEFAULT 30,
  context_template TEXT,
  max_memory_items INTEGER NOT NULL DEFAULT 100,
  confidence_threshold FLOAT NOT NULL DEFAULT 0.7,
  auto_execute_threshold FLOAT NOT NULL DEFAULT 0.9,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add policies for agent configs
ALTER TABLE public.autonomous_agent_configs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read access to agent configs" 
  ON public.autonomous_agent_configs 
  FOR SELECT 
  USING (true);

CREATE POLICY "Allow insert access to agent configs" 
  ON public.autonomous_agent_configs 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow update access to agent configs" 
  ON public.autonomous_agent_configs 
  FOR UPDATE 
  USING (true);
