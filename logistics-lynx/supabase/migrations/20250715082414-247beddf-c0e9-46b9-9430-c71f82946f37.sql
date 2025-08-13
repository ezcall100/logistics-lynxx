-- Insert autonomous tasks for Floating Action Button (FAB) functionality across all portals

-- ==========================================
-- CORE FAB INFRASTRUCTURE TASKS
-- ==========================================

-- Core FAB System Tasks
('FAB_CORE_001', 'frontend', 'shared', 'Enhanced FAB Component System', 'Create advanced floating action button system with role-based actions, contextual menus, animations, gesture support, and responsive behavior across all devices', 'pending', 5, 200, ARRAY[]::text[]),
('FAB_CORE_002', 'backend', 'shared', 'FAB Actions API Endpoints', 'Create API endpoints for FAB actions including quick create operations, communication tools, shortcuts, and user preference management', 'pending', 4, 160, ARRAY['FAB_CORE_001']),
('FAB_CORE_003', 'database', 'shared', 'FAB Preferences Schema', 'Create database schema for storing user FAB preferences, custom actions, quick access settings, and usage analytics', 'pending', 3, 90, ARRAY['FAB_CORE_002']),

-- ==========================================
-- PORTAL-SPECIFIC FAB FUNCTIONALITY
-- ==========================================

-- Super Admin Portal FAB
('FAB_SUPER_001', 'frontend', 'super_admin', 'Super Admin FAB Actions', 'Create super admin specific FAB with system monitoring shortcuts, user management quick actions, emergency controls, security alerts, and admin dashboard shortcuts', 'pending', 5, 180, ARRAY['FAB_CORE_001']),
('FAB_SUPER_002', 'backend', 'super_admin', 'Admin Quick Actions API', 'Create API endpoints for super admin quick actions including system health checks, user operations, security commands, and emergency procedures', 'pending', 5, 150, ARRAY['FAB_SUPER_001']),

-- Carrier Admin Portal FAB
('FAB_CARRIER_001', 'frontend', 'carrier_admin', 'Carrier Admin FAB Actions', 'Create carrier admin FAB with fleet management shortcuts, driver communication, dispatch tools, maintenance alerts, and route optimization access', 'pending', 5, 180, ARRAY['FAB_CORE_001']),
('FAB_CARRIER_002', 'backend', 'carrier_admin', 'Carrier Quick Actions API', 'Create API endpoints for carrier quick actions including vehicle dispatch, driver assignments, route creation, and emergency fleet management', 'pending', 4, 140, ARRAY['FAB_CARRIER_001']),

-- Broker Admin Portal FAB
('FAB_BROKER_001', 'frontend', 'broker_admin', 'Broker Admin FAB Actions', 'Create broker admin FAB with load matching shortcuts, customer communication, rate management, carrier coordination, and market analysis tools', 'pending', 5, 180, ARRAY['FAB_CORE_001']),
('FAB_BROKER_002', 'backend', 'broker_admin', 'Broker Quick Actions API', 'Create API endpoints for broker quick actions including load posting, rate quotes, carrier matching, and customer communications', 'pending', 4, 140, ARRAY['FAB_BROKER_001']),

-- Shipper Admin Portal FAB
('FAB_SHIPPER_001', 'frontend', 'shipper_admin', 'Shipper Admin FAB Actions', 'Create shipper admin FAB with shipment tracking shortcuts, carrier communication, rate requests, delivery scheduling, and inventory management tools', 'pending', 5, 180, ARRAY['FAB_CORE_001']),
('FAB_SHIPPER_002', 'backend', 'shipper_admin', 'Shipper Quick Actions API', 'Create API endpoints for shipper quick actions including shipment booking, tracking updates, rate requests, and carrier communications', 'pending', 4, 140, ARRAY['FAB_SHIPPER_001']),

-- Driver Portal FAB
('FAB_DRIVER_001', 'frontend', 'driver', 'Driver FAB Actions', 'Create driver-specific FAB with dispatch communication, route updates, vehicle inspection reports, emergency contacts, and navigation shortcuts', 'pending', 5, 200, ARRAY['FAB_CORE_001']),
('FAB_DRIVER_002', 'backend', 'driver', 'Driver Quick Actions API', 'Create API endpoints for driver quick actions including status updates, emergency notifications, inspection submissions, and location tracking', 'pending', 4, 160, ARRAY['FAB_DRIVER_001']),

-- Owner-Operator Portal FAB
('FAB_OWNER_001', 'frontend', 'owner_operator', 'Owner-Operator FAB Actions', 'Create owner-operator FAB with business management shortcuts, load board access, maintenance tracking, financial tools, and customer communication', 'pending', 5, 190, ARRAY['FAB_CORE_001']),
('FAB_OWNER_002', 'backend', 'owner_operator', 'Owner-Operator Quick Actions API', 'Create API endpoints for owner-operator quick actions including load bidding, expense tracking, invoice generation, and maintenance scheduling', 'pending', 4, 150, ARRAY['FAB_OWNER_001']),

-- ==========================================
-- COMMUNICATION & COLLABORATION FEATURES
-- ==========================================

-- Communication Tools
('FAB_COMM_001', 'frontend', 'shared', 'FAB Communication Center', 'Create comprehensive communication tools accessible via FAB including voice calls, video chat, messaging, email, and social media integration', 'pending', 4, 220, ARRAY['FAB_CORE_001']),
('FAB_COMM_002', 'backend', 'shared', 'Communication Services API', 'Create API integration for communication services including VoIP, chat systems, email services, and notification delivery', 'pending', 4, 200, ARRAY['FAB_COMM_001']),
('FAB_COMM_003', 'database', 'shared', 'Communication Logs Schema', 'Create database schema for communication history, contact management, message threading, and call logs', 'pending', 3, 120, ARRAY['FAB_COMM_002']),

-- Real-time Collaboration
('FAB_COLLAB_001', 'frontend', 'shared', 'FAB Collaboration Tools', 'Create real-time collaboration features accessible via FAB including shared notes, document editing, screen sharing, and team coordination', 'pending', 4, 180, ARRAY['FAB_COMM_001']),
('FAB_COLLAB_002', 'backend', 'shared', 'Collaboration Backend', 'Create backend infrastructure for real-time collaboration including WebSocket connections, document synchronization, and session management', 'pending', 4, 170, ARRAY['FAB_COLLAB_001']),

-- ==========================================
-- QUICK CREATE & ACTIONS
-- ==========================================

-- Quick Create Functions
('FAB_CREATE_001', 'frontend', 'shared', 'FAB Quick Create System', 'Create quick create functionality via FAB for shipments, drivers, vehicles, documents, reports, and portal-specific entities with form pre-filling', 'pending', 4, 200, ARRAY['FAB_CORE_001']),
('FAB_CREATE_002', 'backend', 'shared', 'Quick Create API', 'Create API endpoints for rapid entity creation with validation, duplicate detection, and automatic data population', 'pending', 4, 160, ARRAY['FAB_CREATE_001']),

-- Workflow Shortcuts
('FAB_WORKFLOW_001', 'frontend', 'shared', 'FAB Workflow Shortcuts', 'Create workflow shortcuts accessible via FAB including approval processes, bulk operations, report generation, and automated tasks', 'pending', 4, 170, ARRAY['FAB_CREATE_001']),
('FAB_WORKFLOW_002', 'backend', 'shared', 'Workflow Automation API', 'Create API endpoints for workflow automation including task queuing, approval chains, and batch processing', 'pending', 4, 150, ARRAY['FAB_WORKFLOW_001']),

-- ==========================================
-- EMERGENCY & CRITICAL FUNCTIONS
-- ==========================================

-- Emergency Response System
('FAB_EMERGENCY_001', 'frontend', 'shared', 'FAB Emergency System', 'Create emergency response system via FAB including panic buttons, emergency contacts, incident reporting, and critical alerts with role-based access', 'pending', 5, 180, ARRAY['FAB_CORE_001']),
('FAB_EMERGENCY_002', 'backend', 'shared', 'Emergency Response API', 'Create API endpoints for emergency handling including alert systems, escalation procedures, notification chains, and incident tracking', 'pending', 5, 160, ARRAY['FAB_EMERGENCY_001']),
('FAB_EMERGENCY_003', 'database', 'shared', 'Emergency Response Schema', 'Create database schema for emergency procedures, contact information, incident logs, and response protocols', 'pending', 4, 120, ARRAY['FAB_EMERGENCY_002']),

-- ==========================================
-- MOBILE & ACCESSIBILITY FEATURES
-- ==========================================

-- Mobile Optimization
('FAB_MOBILE_001', 'frontend', 'shared', 'Mobile FAB Optimization', 'Optimize FAB for mobile devices with touch gestures, haptic feedback, voice commands, and adaptive positioning based on device orientation', 'pending', 4, 160, ARRAY['FAB_CORE_001']),
('FAB_MOBILE_002', 'frontend', 'shared', 'FAB Gesture Controls', 'Implement advanced gesture controls for FAB including swipe actions, long press menus, multi-touch gestures, and voice activation', 'pending', 3, 140, ARRAY['FAB_MOBILE_001']),

-- Accessibility Features
('FAB_ACCESS_001', 'frontend', 'shared', 'FAB Accessibility Features', 'Implement comprehensive accessibility features for FAB including screen reader support, keyboard navigation, high contrast modes, and voice commands', 'pending', 4, 150, ARRAY['FAB_MOBILE_001']),

-- ==========================================
-- ANALYTICS & PERSONALIZATION
-- ==========================================

-- Usage Analytics
('FAB_ANALYTICS_001', 'frontend', 'shared', 'FAB Usage Analytics', 'Create analytics system for FAB usage patterns, popular actions, user preferences, and performance metrics with privacy controls', 'pending', 3, 120, ARRAY['FAB_CORE_001']),
('FAB_ANALYTICS_002', 'backend', 'shared', 'FAB Analytics API', 'Create API endpoints for FAB analytics including usage tracking, performance monitoring, and user behavior analysis', 'pending', 3, 100, ARRAY['FAB_ANALYTICS_001']),
('FAB_ANALYTICS_003', 'database', 'shared', 'FAB Analytics Schema', 'Create database schema for FAB analytics with proper indexing, data retention policies, and privacy compliance', 'pending', 3, 80, ARRAY['FAB_ANALYTICS_002']),

-- Personalization System
('FAB_PERSONAL_001', 'frontend', 'shared', 'FAB Personalization Engine', 'Create personalization system for FAB including custom action arrangements, adaptive menus, learning algorithms, and user preference management', 'pending', 4, 170, ARRAY['FAB_ANALYTICS_001']),
('FAB_PERSONAL_002', 'backend', 'shared', 'Personalization API', 'Create API endpoints for FAB personalization including preference storage, recommendation engine, and adaptive behavior algorithms', 'pending', 4, 150, ARRAY['FAB_PERSONAL_001']),

-- ==========================================
-- INTEGRATION & THIRD-PARTY SERVICES
-- ==========================================

-- Third-party Integrations
('FAB_INTEGRATION_001', 'frontend', 'shared', 'FAB Third-party Integrations', 'Integrate FAB with external services including Google Workspace, Microsoft 365, Slack, Teams, WhatsApp, and industry-specific tools', 'pending', 3, 200, ARRAY['FAB_COMM_001']),
('FAB_INTEGRATION_002', 'backend', 'shared', 'Integration Services API', 'Create secure API integrations with third-party services including authentication, data synchronization, and webhook management', 'pending', 3, 180, ARRAY['FAB_INTEGRATION_001']),

-- API Ecosystem
('FAB_API_001', 'backend', 'shared', 'FAB Plugin System API', 'Create plugin system for FAB allowing custom actions, third-party integrations, and extensible functionality with proper security controls', 'pending', 4, 160, ARRAY['FAB_INTEGRATION_002']),

-- ==========================================
-- SECURITY & COMPLIANCE
-- ==========================================

-- Security Features
('FAB_SECURITY_001', 'backend', 'shared', 'FAB Security Framework', 'Implement comprehensive security for FAB including action authorization, audit logging, rate limiting, and suspicious activity detection', 'pending', 5, 140, ARRAY['FAB_CORE_002']),
('FAB_SECURITY_002', 'database', 'shared', 'FAB Security Schema', 'Create database schema for FAB security including access logs, permission matrices, and security event tracking', 'pending', 4, 100, ARRAY['FAB_SECURITY_001']),

-- ==========================================
-- TESTING & QUALITY ASSURANCE
-- ==========================================

-- Testing Framework
('FAB_TEST_001', 'testing', 'shared', 'FAB Comprehensive Testing', 'Create comprehensive test suite for FAB functionality including unit tests, integration tests, mobile testing, accessibility testing, and performance testing', 'pending', 4, 200, ARRAY['FAB_MOBILE_002', 'FAB_ACCESS_001']),
('FAB_TEST_002', 'testing', 'shared', 'FAB Cross-Portal Testing', 'Create cross-portal testing for FAB ensuring consistent behavior, role-based functionality, and integration testing across all portals', 'pending', 4, 180, ARRAY['FAB_SUPER_001', 'FAB_CARRIER_001', 'FAB_BROKER_001', 'FAB_SHIPPER_001', 'FAB_DRIVER_001', 'FAB_OWNER_001']),
('FAB_TEST_003', 'testing', 'shared', 'FAB Security Testing', 'Create security testing suite for FAB including penetration testing, authorization testing, and vulnerability assessment', 'pending', 5, 150, ARRAY['FAB_SECURITY_001', 'FAB_EMERGENCY_001']),

-- ==========================================
-- PERFORMANCE & OPTIMIZATION
-- ==========================================

-- Performance Optimization
('FAB_PERF_001', 'frontend', 'shared', 'FAB Performance Optimization', 'Optimize FAB performance with lazy loading, code splitting, caching strategies, animation optimization, and memory management', 'pending', 3, 120, ARRAY['FAB_PERSONAL_001']),
('FAB_PERF_002', 'backend', 'shared', 'FAB Backend Optimization', 'Optimize FAB backend performance with API caching, database optimization, rate limiting, and response time improvements', 'pending', 3, 100, ARRAY['FAB_PERF_001']);

-- Update autonomous task counts for balanced distribution
UPDATE public.autonomous_tasks 
SET estimated_duration_minutes = CASE 
  WHEN agent_type = 'frontend' AND priority = 5 THEN estimated_duration_minutes * 1.2 
  WHEN agent_type = 'backend' AND priority = 5 THEN estimated_duration_minutes * 1.1 
  WHEN agent_type = 'testing' THEN estimated_duration_minutes * 1.1 
  ELSE estimated_duration_minutes 
END
WHERE task_id LIKE 'FAB_%';