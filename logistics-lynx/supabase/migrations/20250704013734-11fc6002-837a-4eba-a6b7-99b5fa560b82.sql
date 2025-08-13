-- Create missing tables for agent status logging and real-time updates

-- Agent status logs table
CREATE TABLE IF NOT EXISTS public.agent_status_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id TEXT NOT NULL,
  agent_type TEXT NOT NULL,
  status TEXT NOT NULL,
  message TEXT,
  response_time INTEGER,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Task completions table
CREATE TABLE IF NOT EXISTS public.task_completions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id TEXT NOT NULL,
  agent_id TEXT NOT NULL,
  status TEXT NOT NULL,
  result TEXT,
  duration INTEGER,
  completed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Agent health checks table
CREATE TABLE IF NOT EXISTS public.agent_health_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_type TEXT NOT NULL,
  status TEXT NOT NULL,
  response_time INTEGER,
  message TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.agent_status_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.task_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_health_checks ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (needed for real-time updates)
CREATE POLICY "Allow all operations on agent_status_logs" 
ON public.agent_status_logs 
FOR ALL 
USING (true);

CREATE POLICY "Allow all operations on task_completions" 
ON public.task_completions 
FOR ALL 
USING (true);

CREATE POLICY "Allow all operations on agent_health_checks" 
ON public.agent_health_checks 
FOR ALL 
USING (true);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_agent_status_logs_agent_id ON public.agent_status_logs(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_status_logs_timestamp ON public.agent_status_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_task_completions_agent_id ON public.task_completions(agent_id);
CREATE INDEX IF NOT EXISTS idx_task_completions_completed_at ON public.task_completions(completed_at);

-- Enable realtime for these tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_status_logs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.task_completions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_health_checks;