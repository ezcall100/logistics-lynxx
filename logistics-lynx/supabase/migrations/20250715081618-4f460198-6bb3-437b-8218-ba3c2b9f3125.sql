-- Create autonomous tasks for building all portal pages
-- Super Admin Portal Pages
INSERT INTO public.autonomous_tasks (task_id, task_name, description, agent_type, portal, priority, estimated_duration_minutes) VALUES
('SA_DASHBOARD', 'Build Super Admin Dashboard', 'Create comprehensive dashboard with system overview, metrics, and admin controls', 'frontend', 'super_admin', 5, 180),
('SA_CRM_OVERVIEW', 'Build CRM Overview Page', 'Create CRM overview dashboard with leads, contacts, and opportunities summary', 'frontend', 'super_admin', 4, 120),
('SA_CRM_EMAILS', 'Build CRM Email Management', 'Create email management interface with templates and tracking', 'frontend', 'super_admin', 3, 90),
('SA_CRM_LEADS', 'Build CRM Leads Management', 'Create leads management with pipeline visualization and AI insights', 'frontend', 'super_admin', 4, 150),
('SA_CRM_CONTACTS', 'Build CRM Contacts Management', 'Create contacts database with detailed profiles and interaction history', 'frontend', 'super_admin', 3, 120),
('SA_CRM_PROJECTS', 'Build CRM Projects Management', 'Create project management interface with timelines and resource allocation', 'frontend', 'super_admin', 4, 180),
('SA_CRM_CALENDAR', 'Build CRM Calendar Interface', 'Create calendar system with meeting scheduling and integration', 'frontend', 'super_admin', 3, 120),
('SA_CRM_OPPORTUNITIES', 'Build CRM Opportunities Management', 'Create sales opportunities tracking with conversion analytics', 'frontend', 'super_admin', 4, 150),
('SA_TICKETS_ALL', 'Build All Tickets Management', 'Create comprehensive ticket management system with filters and sorting', 'frontend', 'super_admin', 5, 180),
('SA_TICKETS_ASSIGNED', 'Build Assigned Tickets View', 'Create assigned tickets interface with agent workload distribution', 'frontend', 'super_admin', 3, 90),
('SA_TICKETS_UNASSIGNED', 'Build Unassigned Tickets Queue', 'Create unassigned tickets queue with auto-assignment capabilities', 'frontend', 'super_admin', 3, 90),
('SA_TICKETS_INCIDENTS', 'Build Incident Management', 'Create incident tracking with severity levels and escalation workflows', 'frontend', 'super_admin', 4, 150),
('SA_TICKETS_SERVICE', 'Build Service Requests Management', 'Create service request handling with SLA tracking', 'frontend', 'super_admin', 3, 120),
('SA_TICKETS_CHANGES', 'Build Change Management', 'Create change request approval workflow and tracking', 'frontend', 'super_admin', 4, 150),
('SA_TICKETS_PROBLEMS', 'Build Problem Management', 'Create problem identification and resolution tracking', 'frontend', 'super_admin', 4, 150),
('SA_NETWORKS_CUSTOMERS', 'Build Super Admin Customers Management', 'Create customer database with detailed profiles and relationship tracking', 'frontend', 'super_admin', 4, 150),
('SA_NETWORKS_VENDORS', 'Build Super Admin Vendors Management', 'Create vendor management with performance metrics and contracts', 'frontend', 'super_admin', 4, 150),
('SA_WORKERS_EXECUTIVE', 'Build Executive Management', 'Create executive team management with roles and permissions', 'frontend', 'super_admin', 4, 120),
('SA_WORKERS_EMPLOYEE', 'Build Employee Management', 'Create employee directory with profiles and performance tracking', 'frontend', 'super_admin', 3, 120),
('SA_WORKERS_DRIVERS', 'Build Drivers Management', 'Create driver database with certifications and performance metrics', 'frontend', 'super_admin', 4, 150),
('SA_WORKERS_AGENTS', 'Build Agents Management', 'Create autonomous agents monitoring and configuration interface', 'frontend', 'super_admin', 5, 180);

-- Carrier Admin Portal Pages
INSERT INTO public.autonomous_tasks (task_id, task_name, description, agent_type, portal, priority, estimated_duration_minutes) VALUES
('CA_DASHBOARD', 'Build Carrier Admin Dashboard', 'Create carrier-specific dashboard with fleet metrics and operational overview', 'frontend', 'carrier_admin', 5, 180),
('CA_CRM_OVERVIEW', 'Build Carrier CRM Overview', 'Create CRM dashboard tailored for carrier operations and customer relationships', 'frontend', 'carrier_admin', 4, 120),
('CA_QUOTES_ALL', 'Build All Quotes Management', 'Create quotes management with pricing algorithms and approval workflows', 'frontend', 'carrier_admin', 4, 150),
('CA_QUOTES_NEW', 'Build New Quote Creation', 'Create quote generation interface with cost calculation and templates', 'frontend', 'carrier_admin', 4, 150),
('CA_LOADBOARD_FIND', 'Build Load Finding Interface', 'Create load board integration with search and filtering capabilities', 'frontend', 'carrier_admin', 4, 150),
('CA_LOADBOARD_SEARCH', 'Build Advanced Load Search', 'Create advanced search with route optimization and matching algorithms', 'frontend', 'carrier_admin', 4, 150),
('CA_LOADBOARD_POST_TRUCK', 'Build Post Truck Interface', 'Create truck posting interface with availability and capacity management', 'frontend', 'carrier_admin', 3, 120),
('CA_LOADBOARD_MY_LOADS', 'Build My Loads Management', 'Create personal load management with tracking and status updates', 'frontend', 'carrier_admin', 3, 120),
('CA_ASSETS_UNITS', 'Build Units Management', 'Create equipment units tracking with maintenance and utilization', 'frontend', 'carrier_admin', 4, 150),
('CA_ASSETS_TRUCKS', 'Build Trucks Management', 'Create truck fleet management with specifications and maintenance schedules', 'frontend', 'carrier_admin', 4, 150),
('CA_ASSETS_TRAILERS', 'Build Trailers Management', 'Create trailer inventory with tracking and maintenance records', 'frontend', 'carrier_admin', 4, 150),
('CA_ASSETS_FLEET_TRACKER', 'Build Fleet Tracking System', 'Create real-time fleet tracking with GPS integration and route monitoring', 'frontend', 'carrier_admin', 5, 200),
('CA_ASSETS_COMPLIANCE', 'Build Compliance Management', 'Create compliance tracking with regulatory requirements and certifications', 'frontend', 'carrier_admin', 4, 150),
('CA_ASSETS_FUEL_AUDIT', 'Build Fuel Audit System', 'Create fuel consumption tracking and audit capabilities', 'frontend', 'carrier_admin', 4, 150),
('CA_RATES_BUY', 'Build Buy Rates Management', 'Create buy rates configuration with carrier rate negotiations', 'frontend', 'carrier_admin', 4, 150),
('CA_RATES_SELL', 'Build Sell Rates Management', 'Create sell rates management with customer pricing strategies', 'frontend', 'carrier_admin', 4, 150);

-- Broker Admin Portal Pages  
INSERT INTO public.autonomous_tasks (task_id, task_name, description, agent_type, portal, priority, estimated_duration_minutes) VALUES
('BA_DASHBOARD', 'Build Broker Admin Dashboard', 'Create broker-specific dashboard with market analytics and load matching', 'frontend', 'broker_admin', 5, 180),
('BA_LOADBOARD_POST', 'Build Post Loads Interface', 'Create load posting interface with customer requirements and carrier matching', 'frontend', 'broker_admin', 4, 150),
('BA_LOADBOARD_SEARCH', 'Build Broker Load Search', 'Create load search with carrier matching and capacity optimization', 'frontend', 'broker_admin', 4, 150),
('BA_LOADBOARD_BOOK', 'Build Load Booking System', 'Create load booking interface with confirmation and tracking workflows', 'frontend', 'broker_admin', 4, 150),
('BA_MARKETPLACE_ALL', 'Build Marketplace Overview', 'Create marketplace dashboard with service providers and integrations', 'frontend', 'broker_admin', 3, 120),
('BA_MARKETPLACE_ACCOUNTING', 'Build Accounting Services', 'Create accounting services integration and management interface', 'frontend', 'broker_admin', 3, 120),
('BA_MARKETPLACE_COMPLIANCE', 'Build Carrier Compliance Services', 'Create carrier compliance verification and monitoring tools', 'frontend', 'broker_admin', 4, 150),
('BA_MARKETPLACE_API', 'Build API Services Management', 'Create API services configuration and monitoring dashboard', 'frontend', 'broker_admin', 4, 150),
('BA_MARKETPLACE_EDI', 'Build EDI Services', 'Create EDI integration services and transaction monitoring', 'frontend', 'broker_admin', 4, 150),
('BA_MARKETPLACE_ELDS', 'Build ELD Services', 'Create ELD integration and compliance monitoring services', 'frontend', 'broker_admin', 3, 120),
('BA_MARKETPLACE_FACTORING', 'Build Factoring Services', 'Create factoring services integration and payment processing', 'frontend', 'broker_admin', 3, 120),
('BA_MARKETPLACE_FUEL_CARDS', 'Build Fuel Card Services', 'Create fuel card integration and transaction monitoring', 'frontend', 'broker_admin', 3, 120),
('BA_MARKETPLACE_LOAD_BOARD', 'Build Load Board Services', 'Create load board integrations and market data analytics', 'frontend', 'broker_admin', 4, 150),
('BA_MARKETPLACE_MILEAGE', 'Build Mileage Services', 'Create mileage calculation and route optimization services', 'frontend', 'broker_admin', 3, 120),
('BA_MARKETPLACE_PAYMENTS', 'Build Payment Services', 'Create payment processing and financial transaction management', 'frontend', 'broker_admin', 4, 150),
('BA_MARKETPLACE_TOLLS', 'Build Toll Services', 'Create toll calculation and reimbursement management', 'frontend', 'broker_admin', 3, 120),
('BA_MARKETPLACE_VISIBILITY', 'Build Visibility Services', 'Create shipment tracking and visibility service integrations', 'frontend', 'broker_admin', 4, 150);

-- Shipper Admin Portal Pages
INSERT INTO public.autonomous_tasks (task_id, task_name, description, agent_type, portal, priority, estimated_duration_minutes) VALUES
('SHA_DASHBOARD', 'Build Shipper Admin Dashboard', 'Create shipper-specific dashboard with shipment analytics and carrier performance', 'frontend', 'shipper_admin', 5, 180),
('SHA_QUOTES_ALL', 'Build Shipper Quotes Management', 'Create quotes management for shipper requests and carrier responses', 'frontend', 'shipper_admin', 4, 150),
('SHA_QUOTES_NEW', 'Build New Shipper Quote Request', 'Create quote request interface with shipment requirements and carrier selection', 'frontend', 'shipper_admin', 4, 150),
('SHA_NETWORKS_CUSTOMERS', 'Build Shipper Customers Management', 'Create internal customer management for multi-division shippers', 'frontend', 'shipper_admin', 3, 120),
('SHA_NETWORKS_CARRIERS', 'Build Preferred Carriers Management', 'Create preferred carrier network with performance tracking and contracts', 'frontend', 'shipper_admin', 4, 150),
('SHA_NETWORKS_VENDORS', 'Build Shipper Vendors Management', 'Create vendor management for logistics service providers', 'frontend', 'shipper_admin', 3, 120),
('SHA_NETWORKS_TERMINALS', 'Build Terminals Management', 'Create terminal and facility management with capacity and scheduling', 'frontend', 'shipper_admin', 4, 150),
('SHA_NETWORKS_LOCATIONS', 'Build Locations Management', 'Create shipping locations database with address validation and mapping', 'frontend', 'shipper_admin', 3, 120),
('SHA_NETWORKS_INVOICES', 'Build Invoice Management', 'Create invoice processing and approval workflows for shipping costs', 'frontend', 'shipper_admin', 4, 150);

-- Driver Portal Pages
INSERT INTO public.autonomous_tasks (task_id, task_name, description, agent_type, portal, priority, estimated_duration_minutes) VALUES
('DR_DASHBOARD', 'Build Driver Dashboard', 'Create driver-specific dashboard with current assignments and performance metrics', 'frontend', 'driver', 5, 180),
('DR_SHIPMENTS_DISPATCH', 'Build Dispatch Interface', 'Create dispatch communication interface with load assignments and updates', 'frontend', 'driver', 4, 150),
('DR_SHIPMENTS_MESSAGING', 'Build Driver Messaging System', 'Create messaging system for driver-dispatcher communication', 'frontend', 'driver', 3, 120),
('DR_SHIPMENTS_MAP', 'Build Driver Map Interface', 'Create GPS navigation and route tracking interface for drivers', 'frontend', 'driver', 4, 150),
('DR_SHIPMENTS_FIND_LOAD', 'Build Load Finding for Drivers', 'Create load board access for owner-operators and independent drivers', 'frontend', 'driver', 4, 150),
('DR_SHIPMENTS_POST_TRUCK', 'Build Post Truck Availability', 'Create truck availability posting for load matching', 'frontend', 'driver', 3, 120),
('DR_CLAIMS', 'Build Claims Management', 'Create claims reporting and tracking interface for drivers', 'frontend', 'driver', 4, 150),
('DR_ASSETS_TRUCK', 'Build Driver Truck Management', 'Create truck inspection and maintenance reporting for drivers', 'frontend', 'driver', 3, 120),
('DR_ASSETS_TRAILER', 'Build Driver Trailer Management', 'Create trailer inspection and status reporting interface', 'frontend', 'driver', 3, 120),
('DR_ANALYTICS', 'Build Driver Analytics', 'Create performance analytics and earnings tracking for drivers', 'frontend', 'driver', 3, 120),
('DR_DOCUMENTS', 'Build Driver Documents', 'Create document management for licenses, certifications, and compliance', 'frontend', 'driver', 3, 120),
('DR_RATES', 'Build Driver Rates View', 'Create rate information and earnings calculator for drivers', 'frontend', 'driver', 3, 120),
('DR_FINANCIALS', 'Build Driver Financials', 'Create earnings tracking and payment history for drivers', 'frontend', 'driver', 4, 150),
('DR_REPORTS', 'Build Driver Reports', 'Create HOS reporting and compliance documentation for drivers', 'frontend', 'driver', 3, 120);

-- Owner Operator Portal Pages (Similar to Driver but with business management features)
INSERT INTO public.autonomous_tasks (task_id, task_name, description, agent_type, portal, priority, estimated_duration_minutes) VALUES
('OO_DASHBOARD', 'Build Owner Operator Dashboard', 'Create owner-operator dashboard with business metrics and fleet management', 'frontend', 'owner_operator', 5, 180),
('OO_BUSINESS_MANAGEMENT', 'Build Business Management Interface', 'Create business operations management for owner-operators', 'frontend', 'owner_operator', 4, 150),
('OO_FLEET_MANAGEMENT', 'Build Small Fleet Management', 'Create fleet management for owner-operators with multiple trucks', 'frontend', 'owner_operator', 4, 150),
('OO_FINANCIAL_PLANNING', 'Build Financial Planning Tools', 'Create financial planning and tax preparation tools for owner-operators', 'frontend', 'owner_operator', 4, 150),
('OO_COMPLIANCE_TRACKING', 'Build Compliance Tracking', 'Create compliance tracking for business licenses and regulations', 'frontend', 'owner_operator', 4, 150);

-- Common Shared Components and APIs
INSERT INTO public.autonomous_tasks (task_id, task_name, description, agent_type, portal, priority, estimated_duration_minutes) VALUES
('SHARED_DOCUMENTS_ALL', 'Build Document Management System', 'Create universal document management with upload, categorization, and sharing', 'frontend', 'shared', 4, 150),
('SHARED_DOCUMENTS_UPLOAD', 'Build Document Upload Interface', 'Create drag-and-drop document upload with validation and processing', 'frontend', 'shared', 3, 120),
('SHARED_DOCUMENTS_SETUP', 'Build Document Setup Configuration', 'Create document workflow configuration and approval processes', 'frontend', 'shared', 3, 120),
('SHARED_FINANCIALS_INVOICES', 'Build Universal Invoice System', 'Create comprehensive invoice management across all portals', 'backend', 'shared', 5, 200),
('SHARED_FINANCIALS_PAYROLL', 'Build Payroll Management', 'Create payroll processing for drivers and employees', 'backend', 'shared', 4, 180),
('SHARED_FINANCIALS_TAXES', 'Build Tax Management', 'Create tax calculation and reporting system', 'backend', 'shared', 4, 180),
('SHARED_API_KEYS', 'Build API Key Management', 'Create API key generation and management system', 'backend', 'shared', 3, 120),
('SHARED_API_LOGS', 'Build API Logging System', 'Create comprehensive API request/response logging and analytics', 'backend', 'shared', 3, 120),
('SHARED_API_ERRORS', 'Build API Error Handling', 'Create error tracking and notification system for API issues', 'backend', 'shared', 3, 120),
('SHARED_EDI_210', 'Build EDI 210 Processing', 'Create freight invoice EDI 210 processing and validation', 'backend', 'shared', 4, 180),
('SHARED_EDI_214', 'Build EDI 214 Processing', 'Create shipment status EDI 214 processing and updates', 'backend', 'shared', 4, 180),
('SHARED_EDI_SETUP', 'Build EDI Configuration', 'Create EDI partner setup and transaction configuration', 'backend', 'shared', 4, 180),
('SHARED_REPORTS_FINANCIAL', 'Build Financial Reports', 'Create comprehensive financial reporting across all portals', 'backend', 'shared', 4, 180),
('SHARED_REPORTS_OPERATIONAL', 'Build Operational Reports', 'Create operational performance and efficiency reports', 'backend', 'shared', 4, 180),
('SHARED_ANALYTICS_ENGINE', 'Build Analytics Engine', 'Create AI-powered analytics engine for predictive insights', 'backend', 'shared', 5, 240);