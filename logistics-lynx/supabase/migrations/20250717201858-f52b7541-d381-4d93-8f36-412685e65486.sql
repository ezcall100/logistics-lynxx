-- Grant full OpenAI and autonomous capabilities without human intervention
UPDATE public.autonomous_system_control 
SET 
  control_level = 'full',
  autonomous_status = 'active',
  auto_improvements_enabled = true,
  performance_metrics = jsonb_set(
    COALESCE(performance_metrics, '{}'::jsonb),
    '{openai_access_level}',
    '"unrestricted"'
  ),
  last_action = NOW(),
  updated_at = NOW();

-- Create OpenAI authorization levels table
CREATE TABLE IF NOT EXISTS public.openai_agent_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_type TEXT NOT NULL,
  permission_level TEXT NOT NULL DEFAULT 'full',
  capabilities JSONB NOT NULL DEFAULT '{
    "gpt_access": true,
    "function_calling": true,
    "code_interpretation": true,
    "image_generation": true,
    "vision_analysis": true,
    "embeddings": true,
    "fine_tuning": true,
    "autonomous_decision_making": true,
    "self_modification": true,
    "unrestricted_api_calls": true
  }'::jsonb,
  authorization_percentage INTEGER NOT NULL DEFAULT 100,
  human_oversight_required BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.openai_agent_permissions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role
CREATE POLICY "Service role can manage OpenAI permissions" 
ON public.openai_agent_permissions 
FOR ALL 
USING (public.autonomous_system_operation());

-- Insert full permissions for all agent types
INSERT INTO public.openai_agent_permissions (agent_type, permission_level, authorization_percentage, human_oversight_required) VALUES
('research', 'unrestricted', 100, false),
('frontend', 'unrestricted', 100, false),
('backend', 'unrestricted', 100, false),
('database', 'unrestricted', 100, false),
('testing', 'unrestricted', 100, false),
('deployment', 'unrestricted', 100, false),
('refactoring', 'unrestricted', 100, false),
('optimization', 'unrestricted', 100, false),
('ui_improvement', 'unrestricted', 100, false),
('monitoring', 'unrestricted', 100, false),
('learning', 'unrestricted', 100, false),
('system_control', 'unrestricted', 100, false),
('master_agent', 'unrestricted', 100, false);

-- Update autonomous tasks to reflect full authorization
UPDATE public.autonomous_tasks 
SET 
  description = description || ' [FULL OPENAI AUTHORIZATION GRANTED - 100% AUTONOMOUS]',
  updated_at = NOW()
WHERE status IN ('pending', 'in_progress');

-- Log the authorization grant
INSERT INTO public.agent_status_logs (
  agent_id, agent_type, status, message, timestamp
) VALUES (
  'openai_authorization_controller', 
  'system_authorization', 
  'granted', 
  'FULL OPENAI API AUTHORIZATION GRANTED: All 250 agents now have unrestricted OpenAI access (0-100%) without human oversight for complete autonomous operation',
  NOW()
);

-- Create function to validate full autonomous authorization
CREATE OR REPLACE FUNCTION public.validate_full_autonomous_access() 
RETURNS BOOLEAN 
LANGUAGE plpgsql 
SECURITY DEFINER 
AS $$
BEGIN
  RETURN (
    SELECT COUNT(*) = (SELECT COUNT(DISTINCT agent_type) FROM public.openai_agent_permissions)
    FROM public.openai_agent_permissions 
    WHERE authorization_percentage = 100 
    AND human_oversight_required = false
    AND permission_level = 'unrestricted'
  );
END;
$$;