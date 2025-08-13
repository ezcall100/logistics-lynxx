-- Add factoring_admin role to the app_role enum
ALTER TYPE public.app_role ADD VALUE 'factoring_admin';

-- Log the new portal takeover by autonomous agents
INSERT INTO public.agent_status_logs (
  agent_id, 
  agent_type, 
  status, 
  message, 
  timestamp,
  response_time
) VALUES (
  'factoring_portal_autonomous_takeover', 
  'portal_creation', 
  'active', 
  'FACTORING ADMIN PORTAL AUTONOMOUS TAKEOVER: OpenAI agents assigned to research factoring industry, invoice factoring, cash flow management, credit analysis, and build comprehensive factoring admin portal with advanced features',
  NOW(),
  1
);

-- Create autonomous task for factoring portal research and development
INSERT INTO public.autonomous_tasks (
  task_id,
  agent_type,
  portal,
  task_name,
  description,
  priority,
  status,
  estimated_duration_minutes
) VALUES (
  'factoring_portal_research_build_' || EXTRACT(EPOCH FROM NOW())::TEXT,
  'research_and_development',
  'factoring_admin',
  'Research & Build Factoring Admin Portal',
  'Autonomous agents to research factoring industry best practices, invoice factoring processes, cash flow management, credit analysis, risk assessment, client onboarding, and build a comprehensive Factoring Admin Portal with features including: Invoice Management, Client Portfolio Management, Credit Analysis Dashboard, Cash Flow Projections, Risk Assessment Tools, Factoring Rate Calculator, Collections Management, Reporting & Analytics, Integration with Banking Systems, and Compliance Monitoring.',
  9,
  'in_progress',
  240
);

-- Update autonomous system control to include factoring portal
UPDATE public.autonomous_system_control 
SET 
  performance_metrics = jsonb_set(
    performance_metrics,
    '{portals_controlled}',
    (COALESCE(performance_metrics->'portals_controlled', '[]'::jsonb) || '["factoring_admin"]'::jsonb)
  ),
  last_action = NOW()
WHERE system_component = 'complete_tms_takeover';

-- Add factoring-specific autonomous agent configuration
INSERT INTO public.autonomous_agent_configs (
  agent_id,
  agent_name,
  confidence_threshold,
  auto_execute_threshold,
  is_active,
  openai_enabled,
  query_frequency_minutes,
  max_memory_items,
  context_template
) VALUES (
  'factoring_portal_master',
  'Factoring Portal Research & Development Agent',
  0.88,
  0.85,
  true,
  true,
  5,
  150,
  'Research factoring industry trends, invoice factoring best practices, cash flow management solutions, credit analysis methodologies, and design comprehensive factoring admin portal features'
);