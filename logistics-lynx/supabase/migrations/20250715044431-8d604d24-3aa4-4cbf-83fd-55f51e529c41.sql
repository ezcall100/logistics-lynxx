-- Performance Optimization for Supabase Performance Advisor Warnings (Fixed)

-- 1. Add composite indexes for autonomous agent operations
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_status_priority ON public.autonomous_tasks(status, priority DESC);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_agent_type_status ON public.autonomous_tasks(agent_type, status);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_portal_status ON public.autonomous_tasks(portal, status);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_assigned_agent_created ON public.autonomous_tasks(assigned_agent_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_dependencies_gin ON public.autonomous_tasks USING GIN(dependencies);

-- 2. Add performance indexes for agent monitoring
CREATE INDEX IF NOT EXISTS idx_agent_health_checks_status_timestamp ON public.agent_health_checks(status, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_agent_health_checks_agent_type_status ON public.agent_health_checks(agent_type, status);
CREATE INDEX IF NOT EXISTS idx_agent_status_logs_agent_type_timestamp ON public.agent_status_logs(agent_type, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_agent_status_logs_status_timestamp ON public.agent_status_logs(status, timestamp DESC);

-- 3. Add indexes for AI decision and confidence tracking
CREATE INDEX IF NOT EXISTS idx_ai_confidence_logs_score_created ON public.ai_confidence_logs(confidence_score DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_confidence_logs_flagged_created ON public.ai_confidence_logs(flagged_for_review, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_confidence_logs_decision_type_score ON public.ai_confidence_logs(decision_type, confidence_score DESC);
CREATE INDEX IF NOT EXISTS idx_ai_decisions_type_confidence ON public.ai_decisions(decision_type, confidence_score DESC);
CREATE INDEX IF NOT EXISTS idx_ai_decisions_implemented_created ON public.ai_decisions(implemented, created_at DESC);

-- 4. Add performance indexes for analytics
CREATE INDEX IF NOT EXISTS idx_ai_performance_metrics_type_timestamp ON public.ai_performance_metrics(metric_type, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_ai_performance_metrics_feature_role ON public.ai_performance_metrics(feature_area, user_role);
CREATE INDEX IF NOT EXISTS idx_system_health_metrics_name_timestamp ON public.system_health_metrics(metric_name, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_user_analytics_event_timestamp ON public.user_analytics(event_type, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_user_analytics_user_session ON public.user_analytics(user_id, session_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_start ON public.user_sessions(user_id, start_time DESC);

-- 5. Add task completion performance indexes
CREATE INDEX IF NOT EXISTS idx_task_completions_agent_status ON public.task_completions(agent_id, status);
CREATE INDEX IF NOT EXISTS idx_task_completions_task_completed ON public.task_completions(task_id, completed_at DESC);
CREATE INDEX IF NOT EXISTS idx_task_completions_status_duration ON public.task_completions(status, duration);

-- 6. Add alert and tracking performance indexes
CREATE INDEX IF NOT EXISTS idx_alerts_status_severity ON public.alerts(status, severity);
CREATE INDEX IF NOT EXISTS idx_alerts_category_timestamp ON public.alerts(category, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_alerts_acknowledged_resolved ON public.alerts(acknowledged_at, resolved_at);
CREATE INDEX IF NOT EXISTS idx_tracking_events_shipment_timestamp ON public.tracking_events(shipment_id, timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_tracking_events_type_timestamp ON public.tracking_events(event_type, timestamp DESC);

-- 7. Add business data performance indexes
CREATE INDEX IF NOT EXISTS idx_shipments_status_created ON public.shipments(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_shipments_carrier_status ON public.shipments(carrier_id, status);
CREATE INDEX IF NOT EXISTS idx_shipments_driver_status ON public.shipments(driver_id, status);
CREATE INDEX IF NOT EXISTS idx_shipments_pickup_delivery ON public.shipments(pickup_date, delivery_date);
CREATE INDEX IF NOT EXISTS idx_drivers_company_status ON public.drivers(company_id, status);
CREATE INDEX IF NOT EXISTS idx_vehicles_company_status ON public.vehicles(company_id, status);
CREATE INDEX IF NOT EXISTS idx_routes_driver_created ON public.routes(driver_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_routes_shipment_created ON public.routes(shipment_id, created_at DESC);

-- 8. Add CRM performance indexes
CREATE INDEX IF NOT EXISTS idx_crm_contacts_company_status ON public.crm_contacts(company_id, contact_status);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_created_by_created ON public.crm_contacts(created_by, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_leads_status_score ON public.crm_leads(lead_status, lead_score DESC);
CREATE INDEX IF NOT EXISTS idx_crm_leads_assigned_created ON public.crm_leads(assigned_to, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_opportunities_stage_value ON public.crm_opportunities(stage, value DESC);
CREATE INDEX IF NOT EXISTS idx_crm_opportunities_assigned_created ON public.crm_opportunities(assigned_to, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_projects_status_created ON public.crm_projects(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_projects_manager_status ON public.crm_projects(project_manager, status);
CREATE INDEX IF NOT EXISTS idx_crm_activities_type_created ON public.crm_activities(activity_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_crm_calendar_start_end ON public.crm_calendar(start_time, end_time);
CREATE INDEX IF NOT EXISTS idx_crm_emails_status_created ON public.crm_emails(status, created_at DESC);

-- 9. Add foreign key indexes
CREATE INDEX IF NOT EXISTS idx_drivers_company_fk ON public.drivers(company_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_company_fk ON public.vehicles(company_id);
CREATE INDEX IF NOT EXISTS idx_shipments_carrier_fk ON public.shipments(carrier_id);
CREATE INDEX IF NOT EXISTS idx_shipments_shipper_fk ON public.shipments(shipper_id);
CREATE INDEX IF NOT EXISTS idx_shipments_driver_fk ON public.shipments(driver_id);
CREATE INDEX IF NOT EXISTS idx_shipments_vehicle_fk ON public.shipments(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_routes_driver_fk ON public.routes(driver_id);
CREATE INDEX IF NOT EXISTS idx_routes_vehicle_fk ON public.routes(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_routes_shipment_fk ON public.routes(shipment_id);
CREATE INDEX IF NOT EXISTS idx_tracking_events_shipment_fk ON public.tracking_events(shipment_id);

-- 10. Add autonomous agent memory optimization
CREATE INDEX IF NOT EXISTS idx_agent_memory_confidence_created ON public.agent_memory(confidence DESC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_memory_agent_goal ON public.agent_memory(agent_id, goal);

-- 11. Add partial indexes for active records
CREATE INDEX IF NOT EXISTS idx_autonomous_tasks_active ON public.autonomous_tasks(created_at DESC) WHERE status IN ('pending', 'in_progress');
CREATE INDEX IF NOT EXISTS idx_alerts_active ON public.alerts(timestamp DESC) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_agent_health_checks_active ON public.agent_health_checks(timestamp DESC) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_shipments_active ON public.shipments(created_at DESC) WHERE status IN ('pending', 'in_transit');

-- 12. Optimize autonomous agent config queries
CREATE INDEX IF NOT EXISTS idx_autonomous_agent_configs_active ON public.autonomous_agent_configs(agent_id) WHERE is_active = true;
CREATE INDEX IF NOT EXISTS idx_autonomous_agent_configs_threshold ON public.autonomous_agent_configs(confidence_threshold, auto_execute_threshold);

-- 13. Add user role optimization
CREATE INDEX IF NOT EXISTS idx_user_roles_unique_user_role ON public.user_roles(user_id, role);
CREATE INDEX IF NOT EXISTS idx_profiles_user_role ON public.profiles(user_id, role);

-- 14. Enable extensions for text search and performance
CREATE EXTENSION IF NOT EXISTS pg_trgm;
CREATE EXTENSION IF NOT EXISTS btree_gin;