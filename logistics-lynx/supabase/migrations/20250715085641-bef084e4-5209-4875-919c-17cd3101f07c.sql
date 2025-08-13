-- Add autonomous agent tasks for CRM Relationships and Comprehensive Reporting functionality

INSERT INTO public.autonomous_tasks (task_id, agent_type, portal, task_name, description, priority, estimated_duration_minutes, dependencies, status) VALUES

-- CRM RELATIONSHIPS FUNCTIONALITY TASKS (18 tasks)
('CRM_REL_001', 'UI Builder', 'All', 'Customer Relationship Core System', 'Build comprehensive CRM system for managing customer relationships and interactions', 1, 260, ARRAY[]::text[], 'pending'),
('CRM_REL_002', 'Data Processor', 'All', 'Contact Management System', 'Create advanced contact management with hierarchies, roles, and relationship mapping', 1, 200, ARRAY['CRM_REL_001'], 'pending'),
('CRM_REL_003', 'UI Builder', 'All', 'Customer 360 Dashboard', 'Build comprehensive customer view with history, preferences, and analytics', 1, 220, ARRAY['CRM_REL_002'], 'pending'),
('CRM_REL_004', 'Data Processor', 'All', 'Interaction Tracking System', 'Create system to track all customer interactions across channels (email, phone, meetings)', 1, 180, ARRAY['CRM_REL_001'], 'pending'),
('CRM_REL_005', 'UI Builder', 'All', 'Lead Management Pipeline', 'Build lead qualification, scoring, and conversion tracking system', 1, 200, ARRAY['CRM_REL_001'], 'pending'),
('CRM_REL_006', 'Data Processor', 'All', 'Customer Segmentation Engine', 'Develop AI-powered customer segmentation based on behavior and characteristics', 2, 180, ARRAY['CRM_REL_003'], 'pending'),
('CRM_REL_007', 'UI Builder', 'All', 'Sales Opportunity Management', 'Create opportunity tracking with pipeline stages and revenue forecasting', 1, 190, ARRAY['CRM_REL_005'], 'pending'),
('CRM_REL_008', 'Data Processor', 'All', 'Customer Health Scoring', 'Implement customer health scoring based on engagement and satisfaction metrics', 2, 160, ARRAY['CRM_REL_006'], 'pending'),
('CRM_REL_009', 'UI Builder', 'All', 'Account Management Portal', 'Build account management interface for key account managers', 2, 170, ARRAY['CRM_REL_003'], 'pending'),
('CRM_REL_010', 'Data Processor', 'All', 'Customer Communication Hub', 'Create unified communication system with email, SMS, and call integration', 2, 200, ARRAY['CRM_REL_004'], 'pending'),
('CRM_REL_011', 'Data Processor', 'All', 'CRM Analytics Engine', 'Build analytics for customer lifetime value, churn prediction, and growth opportunities', 2, 190, ARRAY['CRM_REL_008'], 'pending'),
('CRM_REL_012', 'UI Builder', 'All', 'Customer Service Portal', 'Create customer service interface with ticketing and issue resolution', 2, 180, ARRAY['CRM_REL_004'], 'pending'),
('CRM_REL_013', 'Data Processor', 'All', 'Marketing Automation Integration', 'Integrate with marketing automation platforms for campaign management', 3, 160, ARRAY['CRM_REL_010'], 'pending'),
('CRM_REL_014', 'UI Builder', 'All', 'Partner Relationship Management', 'Build system for managing carrier and vendor relationships', 2, 170, ARRAY['CRM_REL_002'], 'pending'),
('CRM_REL_015', 'Data Processor', 'All', 'Customer Contract Management', 'Create contract lifecycle management with renewal tracking', 2, 180, ARRAY['CRM_REL_007'], 'pending'),
('CRM_REL_016', 'Data Processor', 'All', 'CRM Mobile Sync', 'Implement mobile CRM functionality with offline capabilities', 3, 200, ARRAY['CRM_REL_001'], 'pending'),
('CRM_REL_017', 'Security', 'All', 'CRM Data Privacy & Compliance', 'Implement GDPR, CCPA compliance and data privacy controls', 1, 160, ARRAY['CRM_REL_001'], 'pending'),
('CRM_REL_018', 'Testing', 'All', 'CRM System Integration Testing', 'Comprehensive testing of CRM workflows and data integrity', 1, 200, ARRAY['CRM_REL_003', 'CRM_REL_007', 'CRM_REL_012'], 'pending'),

-- OPERATIONAL REPORTS TASKS (12 tasks)
('RPT_OPS_001', 'Data Processor', 'All', 'Shipment Operations Reports', 'Create comprehensive shipment reporting with status, performance, and exception tracking', 1, 180, ARRAY[]::text[], 'pending'),
('RPT_OPS_002', 'UI Builder', 'All', 'Real-time Operations Dashboard', 'Build real-time operational dashboard with KPIs and alerts', 1, 200, ARRAY['RPT_OPS_001'], 'pending'),
('RPT_OPS_003', 'Data Processor', 'All', 'Carrier Performance Reports', 'Generate carrier performance reports with metrics and scorecards', 1, 160, ARRAY[]::text[], 'pending'),
('RPT_OPS_004', 'Data Processor', 'All', 'Route Optimization Reports', 'Create reports on route efficiency, fuel costs, and optimization opportunities', 2, 150, ARRAY['RPT_OPS_001'], 'pending'),
('RPT_OPS_005', 'UI Builder', 'All', 'Equipment Utilization Reports', 'Build reports on equipment usage, availability, and maintenance schedules', 2, 140, ARRAY['RPT_OPS_003'], 'pending'),
('RPT_OPS_006', 'Data Processor', 'All', 'Service Level Reports', 'Generate SLA compliance and service level performance reports', 1, 160, ARRAY['RPT_OPS_001'], 'pending'),
('RPT_OPS_007', 'Data Processor', 'All', 'Exception Management Reports', 'Create exception tracking and resolution reports for operational issues', 2, 140, ARRAY['RPT_OPS_002'], 'pending'),
('RPT_OPS_008', 'UI Builder', 'All', 'Driver Performance Dashboard', 'Build driver performance tracking with safety and efficiency metrics', 2, 160, ARRAY['RPT_OPS_003'], 'pending'),
('RPT_OPS_009', 'Data Processor', 'All', 'Capacity Planning Reports', 'Generate capacity analysis and demand forecasting reports', 3, 170, ARRAY['RPT_OPS_004'], 'pending'),
('RPT_OPS_010', 'Data Processor', 'All', 'Quality Metrics Reports', 'Create quality tracking reports for damage, claims, and customer satisfaction', 2, 150, ARRAY['RPT_OPS_006'], 'pending'),
('RPT_OPS_011', 'UI Builder', 'All', 'Operational Analytics Portal', 'Build comprehensive analytics portal for operational insights', 3, 200, ARRAY['RPT_OPS_002'], 'pending'),
('RPT_OPS_012', 'Data Processor', 'All', 'Benchmark Comparison Reports', 'Generate industry benchmark and competitive analysis reports', 3, 160, ARRAY['RPT_OPS_011'], 'pending'),

-- FINANCIAL REPORTS TASKS (10 tasks)
('RPT_FIN_001', 'Data Processor', 'All', 'Revenue & Profitability Reports', 'Create comprehensive revenue, margin, and profitability reporting', 1, 200, ARRAY[]::text[], 'pending'),
('RPT_FIN_002', 'UI Builder', 'All', 'Financial Dashboard Suite', 'Build executive financial dashboard with key financial metrics', 1, 180, ARRAY['RPT_FIN_001'], 'pending'),
('RPT_FIN_003', 'Data Processor', 'All', 'Cost Analysis Reports', 'Generate detailed cost analysis by lane, customer, and service type', 1, 170, ARRAY['RPT_FIN_001'], 'pending'),
('RPT_FIN_004', 'Data Processor', 'All', 'Cash Flow & AR Reports', 'Create cash flow forecasting and accounts receivable aging reports', 1, 160, ARRAY['RPT_FIN_001'], 'pending'),
('RPT_FIN_005', 'Data Processor', 'All', 'Budget vs Actual Reports', 'Generate budget variance analysis and performance tracking reports', 2, 150, ARRAY['RPT_FIN_002'], 'pending'),
('RPT_FIN_006', 'UI Builder', 'All', 'Financial Trend Analysis', 'Build trend analysis tools for financial performance over time', 2, 160, ARRAY['RPT_FIN_003'], 'pending'),
('RPT_FIN_007', 'Data Processor', 'All', 'Tax & Compliance Reports', 'Create tax reporting and regulatory compliance reports', 2, 170, ARRAY['RPT_FIN_001'], 'pending'),
('RPT_FIN_008', 'Data Processor', 'All', 'Customer Profitability Analysis', 'Generate customer profitability and lifetime value reports', 2, 180, ARRAY['RPT_FIN_003'], 'pending'),
('RPT_FIN_009', 'UI Builder', 'All', 'Financial Planning Tools', 'Build financial planning and forecasting tools', 3, 200, ARRAY['RPT_FIN_005'], 'pending'),
('RPT_FIN_010', 'Data Processor', 'All', 'Invoice & Payment Reports', 'Create comprehensive invoicing and payment tracking reports', 2, 140, ARRAY['RPT_FIN_004'], 'pending'),

-- COMPLIANCE & REGULATORY REPORTS TASKS (8 tasks)
('RPT_COMP_001', 'Data Processor', 'All', 'DOT Compliance Reports', 'Generate DOT compliance reports for safety and regulatory requirements', 1, 160, ARRAY[]::text[], 'pending'),
('RPT_COMP_002', 'Data Processor', 'All', 'HOS & ELD Reports', 'Create hours of service and electronic logging device compliance reports', 1, 150, ARRAY['RPT_COMP_001'], 'pending'),
('RPT_COMP_003', 'UI Builder', 'All', 'Safety Management Dashboard', 'Build safety management dashboard with incident tracking and metrics', 1, 180, ARRAY['RPT_COMP_001'], 'pending'),
('RPT_COMP_004', 'Data Processor', 'All', 'Environmental Compliance Reports', 'Generate environmental impact and emissions compliance reports', 2, 140, ARRAY['RPT_COMP_001'], 'pending'),
('RPT_COMP_005', 'Data Processor', 'All', 'Insurance & Claims Reports', 'Create insurance coverage and claims management reports', 2, 150, ARRAY['RPT_COMP_003'], 'pending'),
('RPT_COMP_006', 'Data Processor', 'All', 'Audit Trail Reports', 'Generate comprehensive audit trail and compliance tracking reports', 2, 160, ARRAY['RPT_COMP_001'], 'pending'),
('RPT_COMP_007', 'UI Builder', 'All', 'Regulatory Alerts System', 'Build system for regulatory change alerts and compliance updates', 3, 140, ARRAY['RPT_COMP_003'], 'pending'),
('RPT_COMP_008', 'Data Processor', 'All', 'Certification Tracking Reports', 'Create certification and license expiration tracking reports', 2, 130, ARRAY['RPT_COMP_006'], 'pending'),

-- ANALYTICS & BUSINESS INTELLIGENCE TASKS (12 tasks)
('RPT_BI_001', 'Data Processor', 'All', 'Business Intelligence Platform', 'Build comprehensive BI platform with data warehousing and ETL processes', 1, 300, ARRAY[]::text[], 'pending'),
('RPT_BI_002', 'UI Builder', 'All', 'Executive BI Dashboard', 'Create executive dashboard with key business metrics and insights', 1, 220, ARRAY['RPT_BI_001'], 'pending'),
('RPT_BI_003', 'Data Processor', 'All', 'Predictive Analytics Engine', 'Develop predictive analytics for demand, pricing, and capacity planning', 2, 240, ARRAY['RPT_BI_001'], 'pending'),
('RPT_BI_004', 'UI Builder', 'All', 'Self-Service Analytics Portal', 'Build self-service analytics portal for business users', 2, 200, ARRAY['RPT_BI_002'], 'pending'),
('RPT_BI_005', 'Data Processor', 'All', 'Market Intelligence Reports', 'Generate market analysis and competitive intelligence reports', 2, 180, ARRAY['RPT_BI_003'], 'pending'),
('RPT_BI_006', 'Data Processor', 'All', 'Customer Behavior Analytics', 'Create customer behavior analysis and segmentation reports', 2, 170, ARRAY['RPT_BI_001'], 'pending'),
('RPT_BI_007', 'UI Builder', 'All', 'Data Visualization Suite', 'Build advanced data visualization tools and interactive charts', 2, 190, ARRAY['RPT_BI_004'], 'pending'),
('RPT_BI_008', 'Data Processor', 'All', 'Performance Benchmarking', 'Create industry benchmarking and performance comparison analytics', 3, 160, ARRAY['RPT_BI_005'], 'pending'),
('RPT_BI_009', 'Data Processor', 'All', 'Machine Learning Insights', 'Implement ML-powered insights for optimization and predictions', 3, 220, ARRAY['RPT_BI_003'], 'pending'),
('RPT_BI_010', 'UI Builder', 'All', 'Mobile BI Application', 'Create mobile business intelligence application for on-the-go insights', 3, 180, ARRAY['RPT_BI_007'], 'pending'),
('RPT_BI_011', 'Data Processor', 'All', 'Real-time Analytics Engine', 'Build real-time analytics processing for live business insights', 2, 200, ARRAY['RPT_BI_001'], 'pending'),
('RPT_BI_012', 'Security', 'All', 'BI Security & Governance', 'Implement data governance, security, and access controls for BI platform', 1, 160, ARRAY['RPT_BI_001'], 'pending'),

-- CUSTOM REPORTS & EXPORT FUNCTIONALITY (6 tasks)
('RPT_CUST_001', 'UI Builder', 'All', 'Custom Report Builder', 'Create drag-and-drop custom report builder for business users', 2, 240, ARRAY[]::text[], 'pending'),
('RPT_CUST_002', 'Data Processor', 'All', 'Report Scheduling Engine', 'Build automated report scheduling and distribution system', 2, 160, ARRAY['RPT_CUST_001'], 'pending'),
('RPT_CUST_003', 'Data Processor', 'All', 'Multi-format Export System', 'Create export functionality for PDF, Excel, CSV, and other formats', 1, 140, ARRAY['RPT_CUST_001'], 'pending'),
('RPT_CUST_004', 'UI Builder', 'All', 'Report Template Library', 'Build library of pre-built report templates for common use cases', 2, 160, ARRAY['RPT_CUST_001'], 'pending'),
('RPT_CUST_005', 'Data Processor', 'All', 'Report Performance Optimization', 'Optimize report generation performance and caching mechanisms', 3, 140, ARRAY['RPT_CUST_002'], 'pending'),
('RPT_CUST_006', 'Testing', 'All', 'Comprehensive Reporting Testing', 'End-to-end testing of all reporting functionality and performance', 1, 200, ARRAY['RPT_CUST_003', 'RPT_CUST_004'], 'pending');