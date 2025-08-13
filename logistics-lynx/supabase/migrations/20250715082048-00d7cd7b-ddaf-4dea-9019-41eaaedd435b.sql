-- Insert autonomous tasks for Header-Related Pages across all portals

-- ==========================================
-- SETTINGS PAGES TASKS
-- ==========================================

-- User Management Settings Tasks
INSERT INTO public.autonomous_tasks (task_id, agent_type, portal, task_name, description, status, priority, estimated_duration_minutes, dependencies) VALUES
('HEADER_SETTINGS_001', 'frontend', 'super_admin', 'User Management Settings Page', 'Create comprehensive user management settings page with role assignment, permissions management, user creation/editing, bulk operations, and advanced filtering capabilities', 'pending', 5, 240, ARRAY[]::text[]),
('HEADER_SETTINGS_002', 'backend', 'super_admin', 'User Management API Endpoints', 'Create REST API endpoints for user management operations including CRUD operations, role management, bulk operations, and user analytics', 'pending', 5, 180, ARRAY['HEADER_SETTINGS_001']),
('HEADER_SETTINGS_003', 'database', 'super_admin', 'User Management Schema Optimization', 'Optimize database schema for user management with proper indexing, constraints, and performance tuning for large-scale operations', 'pending', 4, 120, ARRAY['HEADER_SETTINGS_002']),

-- General Settings Tasks
('HEADER_SETTINGS_004', 'frontend', 'shared', 'General Settings Page', 'Create general application settings page with system preferences, notification settings, theme customization, language selection, and timezone configuration', 'pending', 4, 180, ARRAY[]::text[]),
('HEADER_SETTINGS_005', 'backend', 'shared', 'General Settings API', 'Create API endpoints for managing general application settings with validation, caching, and real-time updates', 'pending', 4, 120, ARRAY['HEADER_SETTINGS_004']),
('HEADER_SETTINGS_006', 'database', 'shared', 'Settings Configuration Schema', 'Create database schema for storing application settings with proper data types, constraints, and default values', 'pending', 4, 90, ARRAY['HEADER_SETTINGS_005']),

-- Company Settings Tasks (Multi-Portal)
('HEADER_SETTINGS_007', 'frontend', 'carrier_admin', 'Carrier Company Settings', 'Create carrier-specific company settings page with fleet management, insurance details, certifications, compliance tracking, and operational preferences', 'pending', 5, 200, ARRAY[]::text[]),
('HEADER_SETTINGS_008', 'frontend', 'broker_admin', 'Broker Company Settings', 'Create broker-specific company settings page with brokerage license info, customer agreements, rate management, and business preferences', 'pending', 5, 200, ARRAY[]::text[]),
('HEADER_SETTINGS_009', 'frontend', 'shipper_admin', 'Shipper Company Settings', 'Create shipper-specific company settings page with shipping preferences, default locations, packaging requirements, and billing configurations', 'pending', 5, 200, ARRAY[]::text[]),
('HEADER_SETTINGS_010', 'backend', 'shared', 'Company Settings API', 'Create unified API endpoints for managing company settings across different portal types with role-based access control', 'pending', 5, 180, ARRAY['HEADER_SETTINGS_007', 'HEADER_SETTINGS_008', 'HEADER_SETTINGS_009']),

-- Payroll Settings Tasks
('HEADER_SETTINGS_011', 'frontend', 'carrier_admin', 'Payroll Settings Page', 'Create comprehensive payroll settings page with pay rates, bonus structures, deduction management, tax settings, and payment schedules', 'pending', 5, 220, ARRAY[]::text[]),
('HEADER_SETTINGS_012', 'backend', 'carrier_admin', 'Payroll Management API', 'Create secure API endpoints for payroll management with encryption, audit trails, and compliance features', 'pending', 5, 200, ARRAY['HEADER_SETTINGS_011']),
('HEADER_SETTINGS_013', 'database', 'carrier_admin', 'Payroll Database Schema', 'Create secure database schema for payroll data with proper encryption, access controls, and audit logging', 'pending', 5, 150, ARRAY['HEADER_SETTINGS_012']),

-- Templates & Documents Tasks
('HEADER_SETTINGS_014', 'frontend', 'shared', 'Templates & Documents Management', 'Create comprehensive document and template management system with upload, versioning, categorization, and sharing capabilities', 'pending', 4, 240, ARRAY[]::text[]),
('HEADER_SETTINGS_015', 'backend', 'shared', 'Document Management API', 'Create API endpoints for document operations including upload, download, versioning, search, and access control', 'pending', 4, 180, ARRAY['HEADER_SETTINGS_014']),
('HEADER_SETTINGS_016', 'database', 'shared', 'Document Storage Schema', 'Create database schema for document metadata, versioning, and access control with proper indexing and storage optimization', 'pending', 4, 120, ARRAY['HEADER_SETTINGS_015']),

-- ==========================================
-- PROFILE & ACCOUNT PAGES TASKS
-- ==========================================

-- Profile Settings Tasks (Multi-Portal)
('HEADER_PROFILE_001', 'frontend', 'super_admin', 'Super Admin Profile Page', 'Create super admin profile page with personal info, security settings, activity logs, system access history, and administrative preferences', 'pending', 4, 180, ARRAY[]::text[]),
('HEADER_PROFILE_002', 'frontend', 'carrier_admin', 'Carrier Admin Profile Page', 'Create carrier admin profile page with personal info, company association, fleet access permissions, and operational preferences', 'pending', 4, 160, ARRAY[]::text[]),
('HEADER_PROFILE_003', 'frontend', 'broker_admin', 'Broker Admin Profile Page', 'Create broker admin profile page with personal info, brokerage details, customer access permissions, and business preferences', 'pending', 4, 160, ARRAY[]::text[]),
('HEADER_PROFILE_004', 'frontend', 'shipper_admin', 'Shipper Admin Profile Page', 'Create shipper admin profile page with personal info, shipping preferences, default settings, and notification preferences', 'pending', 4, 160, ARRAY[]::text[]),
('HEADER_PROFILE_005', 'frontend', 'driver', 'Driver Profile Page', 'Create driver profile page with personal info, license details, vehicle assignments, performance metrics, and driving preferences', 'pending', 4, 180, ARRAY[]::text[]),
('HEADER_PROFILE_006', 'frontend', 'owner_operator', 'Owner-Operator Profile Page', 'Create owner-operator profile page with personal/business info, vehicle ownership, insurance details, and business preferences', 'pending', 4, 200, ARRAY[]::text[]),

-- Account Settings Tasks
('HEADER_PROFILE_007', 'frontend', 'shared', 'Account Settings Page', 'Create comprehensive account settings page with password management, 2FA setup, session management, privacy settings, and data export options', 'pending', 5, 200, ARRAY[]::text[]),
('HEADER_PROFILE_008', 'backend', 'shared', 'Account Security API', 'Create secure API endpoints for account management including password changes, 2FA, session management, and security auditing', 'pending', 5, 180, ARRAY['HEADER_PROFILE_007']),
('HEADER_PROFILE_009', 'database', 'shared', 'User Security Schema', 'Create database schema for user security features including 2FA secrets, session tokens, security logs, and privacy settings', 'pending', 5, 120, ARRAY['HEADER_PROFILE_008']),

-- Profile Management Backend
('HEADER_PROFILE_010', 'backend', 'shared', 'Profile Management API', 'Create unified API endpoints for profile management across all portal types with proper validation and access control', 'pending', 4, 150, ARRAY['HEADER_PROFILE_001', 'HEADER_PROFILE_002', 'HEADER_PROFILE_003', 'HEADER_PROFILE_004', 'HEADER_PROFILE_005', 'HEADER_PROFILE_006']),

-- ==========================================
-- NOTIFICATION & COMMUNICATION TASKS
-- ==========================================

-- Notification System Tasks
('HEADER_NOTIF_001', 'frontend', 'shared', 'Notification Center Page', 'Create comprehensive notification center with real-time notifications, filtering, marking as read/unread, notification history, and preference management', 'pending', 4, 200, ARRAY[]::text[]),
('HEADER_NOTIF_002', 'backend', 'shared', 'Notification System API', 'Create real-time notification system with WebSocket support, push notifications, email notifications, and SMS integration', 'pending', 4, 240, ARRAY['HEADER_NOTIF_001']),
('HEADER_NOTIF_003', 'database', 'shared', 'Notification Database Schema', 'Create database schema for notifications with proper indexing, delivery tracking, and retention policies', 'pending', 4, 120, ARRAY['HEADER_NOTIF_002']),

-- ==========================================
-- HELP & SUPPORT TASKS
-- ==========================================

-- Help & Support System
('HEADER_HELP_001', 'frontend', 'shared', 'Help & Support Center', 'Create comprehensive help center with FAQ, documentation, video tutorials, search functionality, and contact forms', 'pending', 3, 180, ARRAY[]::text[]),
('HEADER_HELP_002', 'backend', 'shared', 'Support Ticket System API', 'Create support ticket system with automated routing, priority management, and integration with external support tools', 'pending', 3, 160, ARRAY['HEADER_HELP_001']),
('HEADER_HELP_003', 'frontend', 'shared', 'Live Chat Integration', 'Integrate live chat system for real-time support with agent routing, chat history, and file sharing capabilities', 'pending', 3, 120, ARRAY['HEADER_HELP_002']),

-- ==========================================
-- SECURITY & COMPLIANCE TASKS
-- ==========================================

-- Security Center Tasks
('HEADER_SECURITY_001', 'frontend', 'super_admin', 'Security Center Dashboard', 'Create security center with system health monitoring, threat detection, audit logs, compliance reports, and security configuration', 'pending', 5, 220, ARRAY[]::text[]),
('HEADER_SECURITY_002', 'backend', 'super_admin', 'Security Monitoring API', 'Create API endpoints for security monitoring, threat detection, audit logging, and compliance reporting', 'pending', 5, 200, ARRAY['HEADER_SECURITY_001']),
('HEADER_SECURITY_003', 'database', 'super_admin', 'Security Audit Schema', 'Create database schema for security auditing, threat logs, compliance tracking, and incident management', 'pending', 5, 150, ARRAY['HEADER_SECURITY_002']),

-- ==========================================
-- SYSTEM ADMINISTRATION TASKS
-- ==========================================

-- System Administration (Super Admin Only)
('HEADER_ADMIN_001', 'frontend', 'super_admin', 'System Administration Panel', 'Create system administration panel with server monitoring, database management, backup controls, and system configuration', 'pending', 5, 240, ARRAY[]::text[]),
('HEADER_ADMIN_002', 'backend', 'super_admin', 'System Admin API', 'Create secure API endpoints for system administration including server controls, database operations, and system monitoring', 'pending', 5, 200, ARRAY['HEADER_ADMIN_001']),
('HEADER_ADMIN_003', 'database', 'super_admin', 'System Configuration Schema', 'Create database schema for system configuration, monitoring data, and administrative controls', 'pending', 5, 120, ARRAY['HEADER_ADMIN_002']),

-- ==========================================
-- MOBILE RESPONSIVE & PWA TASKS
-- ==========================================

-- Mobile Optimization Tasks
('HEADER_MOBILE_001', 'frontend', 'shared', 'Mobile Header Optimization', 'Optimize all header components for mobile devices with touch-friendly interactions, responsive design, and performance optimization', 'pending', 4, 160, ARRAY[]::text[]),
('HEADER_MOBILE_002', 'frontend', 'shared', 'PWA Header Features', 'Implement Progressive Web App features for header including offline support, push notifications, and app-like navigation', 'pending', 3, 120, ARRAY['HEADER_MOBILE_001']),

-- ==========================================
-- TESTING & QUALITY ASSURANCE
-- ==========================================

-- Testing Tasks
('HEADER_TEST_001', 'testing', 'shared', 'Header Components E2E Testing', 'Create comprehensive end-to-end tests for all header components including navigation, dropdowns, and responsive behavior', 'pending', 4, 180, ARRAY['HEADER_SETTINGS_004', 'HEADER_PROFILE_007', 'HEADER_NOTIF_001']),
('HEADER_TEST_002', 'testing', 'shared', 'Settings Pages Integration Testing', 'Create integration tests for all settings pages including form validation, API integration, and data persistence', 'pending', 4, 200, ARRAY['HEADER_SETTINGS_010', 'HEADER_PROFILE_010']),
('HEADER_TEST_003', 'testing', 'shared', 'Profile Security Testing', 'Create security tests for profile and account management including authentication, authorization, and data protection', 'pending', 5, 150, ARRAY['HEADER_PROFILE_008', 'HEADER_SECURITY_002']),

-- ==========================================
-- PERFORMANCE & OPTIMIZATION
-- ==========================================

-- Performance Optimization
('HEADER_PERF_001', 'frontend', 'shared', 'Header Performance Optimization', 'Optimize header performance with lazy loading, code splitting, caching strategies, and bundle size optimization', 'pending', 3, 120, ARRAY['HEADER_MOBILE_002']),
('HEADER_PERF_002', 'backend', 'shared', 'Settings API Performance', 'Optimize settings and profile APIs with caching, query optimization, and rate limiting for better performance', 'pending', 3, 100, ARRAY['HEADER_PERF_001']);

-- Update autonomous task counts for proper agent distribution
UPDATE public.autonomous_tasks 
SET estimated_duration_minutes = CASE 
  WHEN agent_type = 'frontend' THEN estimated_duration_minutes * 1.1 
  WHEN agent_type = 'backend' THEN estimated_duration_minutes * 1.2 
  WHEN agent_type = 'database' THEN estimated_duration_minutes * 0.9 
  WHEN agent_type = 'testing' THEN estimated_duration_minutes * 1.0 
  ELSE estimated_duration_minutes 
END
WHERE task_id LIKE 'HEADER_%';