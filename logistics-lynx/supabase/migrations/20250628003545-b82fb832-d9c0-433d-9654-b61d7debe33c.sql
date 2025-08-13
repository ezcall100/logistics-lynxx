
-- Create the autonomous_tasks table to store agent tasks
CREATE TABLE public.autonomous_tasks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  task_id text NOT NULL UNIQUE,
  agent_type text NOT NULL,
  portal text NOT NULL,
  task_name text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')),
  priority integer NOT NULL DEFAULT 1,
  dependencies text[] DEFAULT '{}',
  estimated_duration_minutes integer NOT NULL DEFAULT 30,
  assigned_agent_id text,
  started_at timestamp with time zone,
  completed_at timestamp with time zone,
  result jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Add RLS policies for the autonomous_tasks table
ALTER TABLE public.autonomous_tasks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read autonomous tasks" ON public.autonomous_tasks
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert autonomous tasks" ON public.autonomous_tasks
  FOR INSERT TO authenticated WITH CHECK (true);

CREATE POLICY "Authenticated users can update autonomous tasks" ON public.autonomous_tasks
  FOR UPDATE TO authenticated USING (true);

CREATE POLICY "Authenticated users can delete autonomous tasks" ON public.autonomous_tasks
  FOR DELETE TO authenticated USING (true);

-- Add trigger to update the updated_at column
CREATE TRIGGER autonomous_tasks_updated_at
  BEFORE UPDATE ON public.autonomous_tasks
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create an index for better performance
CREATE INDEX idx_autonomous_tasks_status ON public.autonomous_tasks(status);
CREATE INDEX idx_autonomous_tasks_agent_type ON public.autonomous_tasks(agent_type);
CREATE INDEX idx_autonomous_tasks_priority ON public.autonomous_tasks(priority);
