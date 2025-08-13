-- Day-0 Go-Live Synthetic Task Test
-- This script tests the end-to-end autonomous processing pipeline

-- 3a) Enqueue a test task (replace with your tenant UUID)
INSERT INTO public.agent_tasks (company_id, fn_name, payload, status, created_at, updated_at)
VALUES (
  '00000000-0000-4000-8000-000000000001', 
  'rates.price_one', 
  '{"origin":"CHI","dest":"DAL","weight":5000,"class":"70","equipment":"dry-van"}', 
  'queued',
  NOW(),
  NOW()
)
RETURNING id, company_id, fn_name, status, created_at;

-- Expected result: Returns task_id to use in the curl command below
-- Example: {"id": "123e4567-e89b-12d3-a456-426614174000", "company_id": "00000000-0000-4000-8000-000000000001", ...}

-- 3b) After getting the task_id, run this curl command:
-- curl -s -X POST "$SUPABASE_URL/functions/v1/agent-runner" \
--   -H "Content-Type: application/json" \
--   -d '{"task_id":"<PASTE_RETURNED_ID>"}'

-- Expected outcomes in 10-30s:
-- 1. Autonomous Portal → Live Feed shows start → finish logs
-- 2. Metrics Bar increments and success% updates  
-- 3. If error occurs, red ERROR line + Slack ping

-- Verification queries:
-- SELECT * FROM public.agent_tasks WHERE company_id = '00000000-0000-4000-8000-000000000001' ORDER BY created_at DESC LIMIT 5;
-- SELECT * FROM public.agent_logs WHERE company_id = '00000000-0000-4000-8000-000000000001' ORDER BY created_at DESC LIMIT 10;
-- SELECT * FROM public.v_agent_metrics_15m WHERE company_id = '00000000-0000-4000-8000-000000000001';
