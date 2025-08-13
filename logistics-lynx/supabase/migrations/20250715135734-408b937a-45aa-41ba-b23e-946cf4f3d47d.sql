-- Fix Security and Performance Advisor Warnings - Part 2: Performance Indexes
-- This migration adds performance indexes

-- Add missing indexes on foreign key columns
CREATE INDEX IF NOT EXISTS idx_agent_memory_agent_id ON public.agent_memory(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_status_logs_agent_id ON public.agent_status_logs(agent_id);
CREATE INDEX IF NOT EXISTS idx_agent_status_logs_agent_type ON public.agent_status_logs(agent_type);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_agent_type ON public.autonomous_tasks(agent_type);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_status ON public.autonomous_tasks(status);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_priority ON public.autonomous_tasks(priority);
CREATE INDEX IF NOT EXISTS idx_task_completions_agent_id ON public.task_completions(agent_id);
CREATE INDEX IF NOT EXISTS idx_task_completions_task_id ON public.task_completions(task_id);

-- Add indexes on commonly queried timestamp columns
CREATE INDEX IF NOT EXISTS idx_agent_memory_created_at ON public.agent_memory(created_at);
CREATE INDEX IF NOT EXISTS idx_agent_status_logs_timestamp ON public.agent_status_logs(timestamp);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_created_at ON public.autonomous_tasks(created_at);
CREATE INDEX IF NOT EXISTS idx_alerts_timestamp ON public.alerts(timestamp);
CREATE INDEX IF NOT EXISTS idx_user_analytics_timestamp ON public.user_analytics(timestamp);

-- Add compound indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_status_priority ON public.autonomous_tasks(status, priority);
CREATE INDEX IF NOT EXISTS idx_agent_status_logs_type_status ON public.agent_status_logs(agent_type, status);
CREATE INDEX IF NOT EXISTS idx_alerts_category_severity ON public.alerts(category, severity);

-- Add indexes on user_id columns for RLS performance
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_id ON public.user_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON public.user_sessions(user_id);

-- Add indexes for TMS-specific queries
CREATE INDEX IF NOT EXISTS idx_shipments_status ON public.shipments(status);
CREATE INDEX IF NOT EXISTS idx_shipments_shipper_id ON public.shipments(shipper_id);
CREATE INDEX IF NOT EXISTS idx_shipments_carrier_id ON public.shipments(carrier_id);
CREATE INDEX IF NOT EXISTS idx_shipments_driver_id ON public.shipments(driver_id);
CREATE INDEX IF NOT EXISTS idx_shipments_pickup_date ON public.shipments(pickup_date);
CREATE INDEX IF NOT EXISTS idx_shipments_delivery_date ON public.shipments(delivery_date);

CREATE INDEX IF NOT EXISTS idx_drivers_company_id ON public.drivers(company_id);
CREATE INDEX IF NOT EXISTS idx_drivers_status ON public.drivers(status);

CREATE INDEX IF NOT EXISTS idx_companies_type ON public.companies(type);
CREATE INDEX IF NOT EXISTS idx_companies_status ON public.companies(status);