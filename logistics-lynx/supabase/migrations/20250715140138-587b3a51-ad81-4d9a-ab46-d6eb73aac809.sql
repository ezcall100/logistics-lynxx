-- Additional Performance Optimizations - Part 2
-- Addressing remaining performance advisor warnings

-- ==========================================
-- ADDITIONAL PERFORMANCE FIXES
-- ==========================================

-- 1. Add missing indexes for CRM tables
CREATE INDEX IF NOT EXISTS idx_crm_activities_created_by ON public.crm_activities(created_by);
CREATE INDEX IF NOT EXISTS idx_crm_activities_company_id ON public.crm_activities(company_id);
CREATE INDEX IF NOT EXISTS idx_crm_activities_contact_id ON public.crm_activities(contact_id);
CREATE INDEX IF NOT EXISTS idx_crm_activities_created_at ON public.crm_activities(created_at);

CREATE INDEX IF NOT EXISTS idx_crm_contacts_created_by ON public.crm_contacts(created_by);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_company_id ON public.crm_contacts(company_id);
CREATE INDEX IF NOT EXISTS idx_crm_contacts_created_at ON public.crm_contacts(created_at);

CREATE INDEX IF NOT EXISTS idx_crm_companies_created_by ON public.crm_companies(created_by);
CREATE INDEX IF NOT EXISTS idx_crm_companies_created_at ON public.crm_companies(created_at);

CREATE INDEX IF NOT EXISTS idx_crm_leads_created_by ON public.crm_leads(created_by);
CREATE INDEX IF NOT EXISTS idx_crm_leads_assigned_to ON public.crm_leads(assigned_to);
CREATE INDEX IF NOT EXISTS idx_crm_leads_company_id ON public.crm_leads(company_id);
CREATE INDEX IF NOT EXISTS idx_crm_leads_lead_status ON public.crm_leads(lead_status);

CREATE INDEX IF NOT EXISTS idx_crm_opportunities_created_by ON public.crm_opportunities(created_by);
CREATE INDEX IF NOT EXISTS idx_crm_opportunities_assigned_to ON public.crm_opportunities(assigned_to);
CREATE INDEX IF NOT EXISTS idx_crm_opportunities_stage ON public.crm_opportunities(stage);
CREATE INDEX IF NOT EXISTS idx_crm_opportunities_expected_close_date ON public.crm_opportunities(expected_close_date);

-- 2. Add indexes for carrier and vehicle management
CREATE INDEX IF NOT EXISTS idx_carrier_certifications_company_id ON public.carrier_certifications(company_id);
CREATE INDEX IF NOT EXISTS idx_carrier_certifications_expiry_date ON public.carrier_certifications(expiry_date);
CREATE INDEX IF NOT EXISTS idx_carrier_certifications_status ON public.carrier_certifications(status);

CREATE INDEX IF NOT EXISTS idx_carrier_rates_company_id ON public.carrier_rates(company_id);
CREATE INDEX IF NOT EXISTS idx_carrier_rates_effective_date ON public.carrier_rates(effective_date);
CREATE INDEX IF NOT EXISTS idx_carrier_rates_rate_type ON public.carrier_rates(rate_type);

CREATE INDEX IF NOT EXISTS idx_carrier_vehicles_company_id ON public.carrier_vehicles(company_id);
CREATE INDEX IF NOT EXISTS idx_carrier_vehicles_status ON public.carrier_vehicles(status);
CREATE INDEX IF NOT EXISTS idx_carrier_vehicles_vehicle_type ON public.carrier_vehicles(vehicle_type);

-- 3. Add indexes for shipment management
CREATE INDEX IF NOT EXISTS idx_shipment_documents_shipment_id ON public.shipment_documents(shipment_id);
CREATE INDEX IF NOT EXISTS idx_shipment_documents_document_type ON public.shipment_documents(document_type);

CREATE INDEX IF NOT EXISTS idx_shipment_status_history_shipment_id ON public.shipment_status_history(shipment_id);
CREATE INDEX IF NOT EXISTS idx_shipment_status_history_status ON public.shipment_status_history(status);
CREATE INDEX IF NOT EXISTS idx_shipment_status_history_status_date ON public.shipment_status_history(status_date);

CREATE INDEX IF NOT EXISTS idx_tracking_events_shipment_id ON public.tracking_events(shipment_id);
CREATE INDEX IF NOT EXISTS idx_tracking_events_event_type ON public.tracking_events(event_type);
CREATE INDEX IF NOT EXISTS idx_tracking_events_timestamp ON public.tracking_events(timestamp);

-- 4. Add indexes for routes and vehicle tracking
CREATE INDEX IF NOT EXISTS idx_routes_shipment_id ON public.routes(shipment_id);
CREATE INDEX IF NOT EXISTS idx_routes_driver_id ON public.routes(driver_id);
CREATE INDEX IF NOT EXISTS idx_routes_vehicle_id ON public.routes(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_routes_created_at ON public.routes(created_at);

CREATE INDEX IF NOT EXISTS idx_vehicles_company_id ON public.vehicles(company_id);
CREATE INDEX IF NOT EXISTS idx_vehicles_status ON public.vehicles(status);
CREATE INDEX IF NOT EXISTS idx_vehicles_type ON public.vehicles(type);

-- 5. Add composite indexes for complex queries
CREATE INDEX IF NOT EXISTS idx_shipments_status_pickup_date ON public.shipments(status, pickup_date);
CREATE INDEX IF NOT EXISTS idx_shipments_carrier_status ON public.shipments(carrier_id, status);
CREATE INDEX IF NOT EXISTS idx_drivers_company_status ON public.drivers(company_id, status);
CREATE INDEX IF NOT EXISTS idx_crm_leads_status_assigned ON public.crm_leads(lead_status, assigned_to);

-- 6. Add indexes for analytics and monitoring
CREATE INDEX IF NOT EXISTS idx_user_analytics_event_type ON public.user_analytics(event_type);
CREATE INDEX IF NOT EXISTS idx_user_analytics_page_path ON public.user_analytics(page_path);
CREATE INDEX IF NOT EXISTS idx_user_sessions_session_id ON public.user_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_start_time ON public.user_sessions(start_time);