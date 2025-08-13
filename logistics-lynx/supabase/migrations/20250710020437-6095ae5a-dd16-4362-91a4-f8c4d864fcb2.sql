-- Fix security vulnerabilities

-- 1. Fix the update_updated_at_column function to have secure search path
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 2. Update RLS policies to require authentication for sensitive tables
-- Remove overly permissive policies and add secure ones

-- Agent tables - require authentication
DROP POLICY IF EXISTS "Allow all operations on agent_health_checks" ON public.agent_health_checks;
CREATE POLICY "Authenticated users can manage agent health checks" ON public.agent_health_checks
FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow all operations on agent_status_logs" ON public.agent_status_logs;
CREATE POLICY "Authenticated users can manage agent status logs" ON public.agent_status_logs
FOR ALL USING (auth.role() = 'authenticated');

-- AI tables - require authentication
DROP POLICY IF EXISTS "Allow all operations on ai_confidence_logs" ON public.ai_confidence_logs;
CREATE POLICY "Authenticated users can manage AI confidence logs" ON public.ai_confidence_logs
FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow all operations on ai_decisions" ON public.ai_decisions;
CREATE POLICY "Authenticated users can manage AI decisions" ON public.ai_decisions
FOR ALL USING (auth.role() = 'authenticated');

-- Companies and drivers - require authentication
DROP POLICY IF EXISTS "Allow all operations on companies" ON public.companies;
CREATE POLICY "Authenticated users can manage companies" ON public.companies
FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow all operations on drivers" ON public.drivers;
CREATE POLICY "Authenticated users can manage drivers" ON public.drivers
FOR ALL USING (auth.role() = 'authenticated');

-- Routes, shipments, vehicles - require authentication
DROP POLICY IF EXISTS "Allow all operations on routes" ON public.routes;
CREATE POLICY "Authenticated users can manage routes" ON public.routes
FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow all operations on shipments" ON public.shipments;
CREATE POLICY "Authenticated users can manage shipments" ON public.shipments
FOR ALL USING (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow all operations on vehicles" ON public.vehicles;
CREATE POLICY "Authenticated users can manage vehicles" ON public.vehicles
FOR ALL USING (auth.role() = 'authenticated');

-- Tracking events - require authentication
DROP POLICY IF EXISTS "Allow all operations on tracking_events" ON public.tracking_events;
CREATE POLICY "Authenticated users can manage tracking events" ON public.tracking_events
FOR ALL USING (auth.role() = 'authenticated');

-- Task completions - require authentication
DROP POLICY IF EXISTS "Allow all operations on task_completions" ON public.task_completions;
CREATE POLICY "Authenticated users can manage task completions" ON public.task_completions
FOR ALL USING (auth.role() = 'authenticated');