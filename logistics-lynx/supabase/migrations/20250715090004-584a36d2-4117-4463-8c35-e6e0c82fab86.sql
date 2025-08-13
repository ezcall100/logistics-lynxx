-- Add autonomous agent tasks for comprehensive Email functionality

INSERT INTO public.autonomous_tasks (task_id, agent_type, portal, task_name, description, priority, estimated_duration_minutes, dependencies, status) VALUES

-- EMAIL CORE INFRASTRUCTURE TASKS (8 tasks)
('EMAIL_001', 'Data Processor', 'All', 'Email Service Core Engine', 'Build comprehensive email service engine with SMTP/API integration (Resend, SendGrid, etc.)', 1, 200, ARRAY[]::text[], 'pending'),
('EMAIL_002', 'Security', 'All', 'Email Authentication & Security', 'Implement email authentication (SPF, DKIM, DMARC) and security protocols', 1, 160, ARRAY['EMAIL_001'], 'pending'),
('EMAIL_003', 'Data Processor', 'All', 'Email Queue Management', 'Create email queue system with retry logic, rate limiting, and delivery optimization', 1, 180, ARRAY['EMAIL_001'], 'pending'),
('EMAIL_004', 'UI Builder', 'All', 'Email Configuration Dashboard', 'Build dashboard for email service configuration and provider management', 2, 140, ARRAY['EMAIL_001'], 'pending'),
('EMAIL_005', 'Data Processor', 'All', 'Email Delivery Tracking', 'Implement email delivery tracking with bounce, open, and click analytics', 1, 160, ARRAY['EMAIL_003'], 'pending'),
('EMAIL_006', 'Security', 'All', 'Email Privacy & Compliance', 'Build GDPR, CAN-SPAM compliance and email privacy controls', 1, 140, ARRAY['EMAIL_002'], 'pending'),
('EMAIL_007', 'Data Processor', 'All', 'Email Reputation Management', 'Create sender reputation monitoring and domain management system', 2, 120, ARRAY['EMAIL_002'], 'pending'),
('EMAIL_008', 'Data Processor', 'All', 'Email Webhook Processing', 'Build webhook handling for email events (delivery, bounces, complaints)', 2, 140, ARRAY['EMAIL_005'], 'pending'),

-- EMAIL TEMPLATES & DESIGN TASKS (10 tasks)
('EMAIL_TPL_001', 'UI Builder', 'All', 'Email Template Builder', 'Create drag-and-drop email template builder with responsive design', 1, 220, ARRAY['EMAIL_001'], 'pending'),
('EMAIL_TPL_002', 'UI Builder', 'All', 'Pre-built Template Library', 'Build library of pre-designed email templates for common TMS communications', 1, 180, ARRAY['EMAIL_TPL_001'], 'pending'),
('EMAIL_TPL_003', 'Data Processor', 'All', 'Dynamic Content Engine', 'Implement dynamic content insertion for personalized emails', 1, 160, ARRAY['EMAIL_TPL_001'], 'pending'),
('EMAIL_TPL_004', 'UI Builder', 'All', 'Email Preview & Testing', 'Create email preview system with device/client testing capabilities', 2, 140, ARRAY['EMAIL_TPL_001'], 'pending'),
('EMAIL_TPL_005', 'Data Processor', 'All', 'Template Versioning System', 'Build template version control and A/B testing framework', 2, 160, ARRAY['EMAIL_TPL_002'], 'pending'),
('EMAIL_TPL_006', 'UI Builder', 'All', 'Brand Customization Tools', 'Create brand customization tools for logos, colors, and styling', 2, 120, ARRAY['EMAIL_TPL_001'], 'pending'),
('EMAIL_TPL_007', 'Data Processor', 'All', 'Multi-language Support', 'Implement multi-language email templates and content management', 3, 140, ARRAY['EMAIL_TPL_003'], 'pending'),
('EMAIL_TPL_008', 'UI Builder', 'All', 'Email Signature Management', 'Build centralized email signature management system', 3, 100, ARRAY['EMAIL_TPL_006'], 'pending'),
('EMAIL_TPL_009', 'Data Processor', 'All', 'Template Performance Analytics', 'Create analytics for template performance and engagement metrics', 3, 130, ARRAY['EMAIL_TPL_005'], 'pending'),
('EMAIL_TPL_010', 'Testing', 'All', 'Email Template Testing', 'Comprehensive testing of email templates across devices and clients', 1, 160, ARRAY['EMAIL_TPL_004'], 'pending'),

-- EMAIL AUTOMATION & WORKFLOWS TASKS (12 tasks)
('EMAIL_AUTO_001', 'Data Processor', 'All', 'Email Automation Engine', 'Build comprehensive email automation engine with trigger-based workflows', 1, 240, ARRAY['EMAIL_001'], 'pending'),
('EMAIL_AUTO_002', 'UI Builder', 'All', 'Workflow Builder Interface', 'Create visual workflow builder for email automation sequences', 1, 200, ARRAY['EMAIL_AUTO_001'], 'pending'),
('EMAIL_AUTO_003', 'Data Processor', 'All', 'Shipment Status Notifications', 'Automate shipment status update emails to customers and stakeholders', 1, 160, ARRAY['EMAIL_AUTO_001'], 'pending'),
('EMAIL_AUTO_004', 'Data Processor', 'All', 'Invoice & Payment Emails', 'Create automated invoice delivery and payment reminder systems', 1, 180, ARRAY['EMAIL_AUTO_001'], 'pending'),
('EMAIL_AUTO_005', 'Data Processor', 'All', 'Document Delivery Automation', 'Automate delivery of BOLs, PODs, and other shipping documents', 1, 160, ARRAY['EMAIL_AUTO_003'], 'pending'),
('EMAIL_AUTO_006', 'Data Processor', 'All', 'Alert & Exception Notifications', 'Build automated alert system for delays, exceptions, and issues', 1, 140, ARRAY['EMAIL_AUTO_001'], 'pending'),
('EMAIL_AUTO_007', 'Data Processor', 'All', 'Onboarding Email Sequences', 'Create automated onboarding sequences for new customers and carriers', 2, 160, ARRAY['EMAIL_AUTO_002'], 'pending'),
('EMAIL_AUTO_008', 'Data Processor', 'All', 'Marketing Drip Campaigns', 'Build marketing automation with lead nurturing and customer retention', 2, 180, ARRAY['EMAIL_AUTO_002'], 'pending'),
('EMAIL_AUTO_009', 'Data Processor', 'All', 'Compliance & Regulatory Emails', 'Automate compliance notifications and regulatory requirement emails', 2, 140, ARRAY['EMAIL_AUTO_006'], 'pending'),
('EMAIL_AUTO_010', 'UI Builder', 'All', 'Email Automation Dashboard', 'Create dashboard for monitoring and managing automated email campaigns', 2, 160, ARRAY['EMAIL_AUTO_002'], 'pending'),
('EMAIL_AUTO_011', 'Data Processor', 'All', 'Trigger Event Management', 'Build comprehensive trigger system for business events and conditions', 2, 150, ARRAY['EMAIL_AUTO_001'], 'pending'),
('EMAIL_AUTO_012', 'Data Processor', 'All', 'Email Sequence Optimization', 'Implement ML-powered optimization for email timing and content', 3, 180, ARRAY['EMAIL_AUTO_010'], 'pending'),

-- EMAIL COMMUNICATION & MESSAGING TASKS (10 tasks)
('EMAIL_COMM_001', 'UI Builder', 'All', 'Internal Email System', 'Build internal email system for team communication and collaboration', 2, 200, ARRAY['EMAIL_001'], 'pending'),
('EMAIL_COMM_002', 'UI Builder', 'All', 'Customer Communication Portal', 'Create customer communication portal with email history and threading', 1, 180, ARRAY['EMAIL_001'], 'pending'),
('EMAIL_COMM_003', 'Data Processor', 'All', 'Email Thread Management', 'Implement email conversation threading and history tracking', 1, 160, ARRAY['EMAIL_COMM_002'], 'pending'),
('EMAIL_COMM_004', 'UI Builder', 'All', 'Carrier Communication Hub', 'Build carrier communication interface with shipment-specific messaging', 1, 170, ARRAY['EMAIL_COMM_002'], 'pending'),
('EMAIL_COMM_005', 'Data Processor', 'All', 'Email Auto-Response System', 'Create intelligent auto-response system for common inquiries', 2, 140, ARRAY['EMAIL_COMM_003'], 'pending'),
('EMAIL_COMM_006', 'UI Builder', 'All', 'Email Search & Archive', 'Build advanced email search and archiving system', 2, 150, ARRAY['EMAIL_COMM_003'], 'pending'),
('EMAIL_COMM_007', 'Data Processor', 'All', 'Email Classification System', 'Implement AI-powered email classification and routing', 3, 160, ARRAY['EMAIL_COMM_005'], 'pending'),
('EMAIL_COMM_008', 'UI Builder', 'All', 'Email Collaboration Tools', 'Create collaborative email features like shared inboxes and assignments', 3, 140, ARRAY['EMAIL_COMM_001'], 'pending'),
('EMAIL_COMM_009', 'Data Processor', 'All', 'Email Integration APIs', 'Build APIs for email integration with external systems', 2, 160, ARRAY['EMAIL_001'], 'pending'),
('EMAIL_COMM_010', 'Security', 'All', 'Email Encryption & Security', 'Implement end-to-end encryption for sensitive communications', 2, 140, ARRAY['EMAIL_002'], 'pending'),

-- EMAIL ANALYTICS & REPORTING TASKS (8 tasks)
('EMAIL_ANLYT_001', 'Data Processor', 'All', 'Email Analytics Engine', 'Build comprehensive email analytics with engagement metrics', 1, 180, ARRAY['EMAIL_005'], 'pending'),
('EMAIL_ANLYT_002', 'UI Builder', 'All', 'Email Performance Dashboard', 'Create dashboard for email campaign performance and metrics', 1, 160, ARRAY['EMAIL_ANLYT_001'], 'pending'),
('EMAIL_ANLYT_003', 'Data Processor', 'All', 'Engagement Tracking System', 'Implement detailed engagement tracking (opens, clicks, conversions)', 1, 140, ARRAY['EMAIL_ANLYT_001'], 'pending'),
('EMAIL_ANLYT_004', 'Data Processor', 'All', 'Email Deliverability Reports', 'Create deliverability reports with bounce and spam analysis', 1, 150, ARRAY['EMAIL_ANLYT_001'], 'pending'),
('EMAIL_ANLYT_005', 'UI Builder', 'All', 'A/B Testing Platform', 'Build A/B testing platform for email optimization', 2, 170, ARRAY['EMAIL_ANLYT_002'], 'pending'),
('EMAIL_ANLYT_006', 'Data Processor', 'All', 'Customer Engagement Insights', 'Generate customer engagement insights and segmentation analytics', 2, 160, ARRAY['EMAIL_ANLYT_003'], 'pending'),
('EMAIL_ANLYT_007', 'Data Processor', 'All', 'Email ROI Analytics', 'Create ROI analytics for email campaigns and communications', 3, 150, ARRAY['EMAIL_ANLYT_006'], 'pending'),
('EMAIL_ANLYT_008', 'UI Builder', 'All', 'Real-time Email Monitoring', 'Build real-time monitoring dashboard for email system health', 2, 140, ARRAY['EMAIL_ANLYT_004'], 'pending'),

-- EMAIL INTEGRATIONS & THIRD-PARTY TASKS (7 tasks)
('EMAIL_INTG_001', 'Data Processor', 'All', 'CRM Email Integration', 'Integrate email system with CRM for contact and lead management', 1, 160, ARRAY['EMAIL_001'], 'pending'),
('EMAIL_INTG_002', 'Data Processor', 'All', 'Calendar & Meeting Integration', 'Integrate with calendar systems for meeting invitations and scheduling', 2, 140, ARRAY['EMAIL_INTG_001'], 'pending'),
('EMAIL_INTG_003', 'Data Processor', 'All', 'Document Management Integration', 'Connect email system with document management for attachments', 2, 150, ARRAY['EMAIL_001'], 'pending'),
('EMAIL_INTG_004', 'Data Processor', 'All', 'Social Media Integration', 'Integrate email campaigns with social media platforms', 3, 130, ARRAY['EMAIL_AUTO_008'], 'pending'),
('EMAIL_INTG_005', 'Data Processor', 'All', 'Marketing Platform Integration', 'Connect with marketing platforms (HubSpot, Marketo, etc.)', 2, 160, ARRAY['EMAIL_AUTO_008'], 'pending'),
('EMAIL_INTG_006', 'Data Processor', 'All', 'E-commerce Platform Integration', 'Integrate with e-commerce platforms for transactional emails', 3, 140, ARRAY['EMAIL_AUTO_004'], 'pending'),
('EMAIL_INTG_007', 'Data Processor', 'All', 'Third-party Email Providers', 'Build multi-provider support (SendGrid, Mailgun, SES, etc.)', 2, 180, ARRAY['EMAIL_001'], 'pending'),

-- EMAIL MOBILE & ACCESSIBILITY TASKS (5 tasks)
('EMAIL_MOB_001', 'UI Builder', 'All', 'Mobile Email Interface', 'Create mobile-optimized email management interface', 2, 160, ARRAY['EMAIL_COMM_002'], 'pending'),
('EMAIL_MOB_002', 'UI Builder', 'All', 'Responsive Email Design', 'Ensure all email templates are fully responsive across devices', 1, 140, ARRAY['EMAIL_TPL_001'], 'pending'),
('EMAIL_MOB_003', 'Data Processor', 'All', 'Mobile Push Integration', 'Integrate email notifications with mobile push notifications', 3, 120, ARRAY['EMAIL_MOB_001'], 'pending'),
('EMAIL_MOB_004', 'UI Builder', 'All', 'Accessibility Compliance', 'Implement accessibility features for email interfaces and templates', 2, 130, ARRAY['EMAIL_TPL_001'], 'pending'),
('EMAIL_MOB_005', 'Data Processor', 'All', 'Offline Email Sync', 'Build offline email synchronization for mobile applications', 3, 150, ARRAY['EMAIL_MOB_001'], 'pending');