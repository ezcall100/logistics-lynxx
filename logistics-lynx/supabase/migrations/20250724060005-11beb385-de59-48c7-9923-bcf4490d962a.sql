-- Fix the autonomous system control function to work without WHERE clause requirements
-- First, let's create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.autonomous_system_control (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  control_level TEXT DEFAULT 'manual',
  autonomous_status TEXT DEFAULT 'inactive',
  last_action TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  auto_improvements_enabled BOOLEAN DEFAULT false,
  performance_metrics JSONB DEFAULT '{}',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default record if none exists
INSERT INTO public.autonomous_system_control (
  control_level, 
  autonomous_status, 
  auto_improvements_enabled
) 
SELECT 'manual', 'inactive', false
WHERE NOT EXISTS (SELECT 1 FROM public.autonomous_system_control);

-- Create or update the function to properly handle the update
CREATE OR REPLACE FUNCTION public.activate_full_autonomous_control()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  activation_result JSON;
  agent_count INTEGER;
  control_record_id UUID;
BEGIN
  -- Get or create the control record
  SELECT id INTO control_record_id 
  FROM public.autonomous_system_control 
  LIMIT 1;
  
  IF control_record_id IS NULL THEN
    INSERT INTO public.autonomous_system_control (
      control_level, autonomous_status, auto_improvements_enabled
    ) VALUES (
      'full', 'active', true
    ) RETURNING id INTO control_record_id;
  ELSE
    -- Update the existing record with the specific ID
    UPDATE public.autonomous_system_control 
    SET 
      control_level = 'full',
      autonomous_status = 'active',
      last_action = NOW(),
      auto_improvements_enabled = true,
      updated_at = NOW()
    WHERE id = control_record_id;
  END IF;

  -- Get current agent count (default to 250 if no tasks exist)
  SELECT COALESCE(COUNT(*), 250) INTO agent_count 
  FROM public.autonomous_tasks 
  WHERE status IN ('pending', 'in_progress');
  
  -- Log the activation
  INSERT INTO public.agent_status_logs (
    agent_id, agent_type, status, message, timestamp
  ) VALUES (
    'system_controller', 
    'autonomous_control', 
    'activated', 
    'FULL AUTONOMOUS CONTROL ACTIVATED: All 250 agents now have complete control over TMS system including website and all portals',
    NOW()
  );

  -- Create activation result
  activation_result := json_build_object(
    'status', 'AUTONOMOUS_TAKEOVER_ACTIVATED',
    'message', 'All 250 autonomous agents now have full control of the TMS system',
    'controlled_components', (SELECT COUNT(*) FROM public.autonomous_system_control WHERE autonomous_status = 'active'),
    'active_tasks', agent_count,
    'activation_time', NOW(),
    'control_level', 'COMPLETE_AUTONOMOUS_CONTROL'
  );

  RETURN activation_result;
END;
$function$;

-- Enable RLS on the tables
ALTER TABLE public.autonomous_system_control ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_status_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for authenticated users
CREATE POLICY "Allow authenticated users to manage autonomous system" 
ON public.autonomous_system_control 
FOR ALL 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to view agent logs" 
ON public.agent_status_logs 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to insert agent logs" 
ON public.agent_status_logs 
FOR INSERT 
WITH CHECK (auth.uid() IS NOT NULL);