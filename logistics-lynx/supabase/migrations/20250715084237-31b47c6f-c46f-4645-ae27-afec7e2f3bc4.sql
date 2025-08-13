-- Mobile Applications for Drivers, Owner-Operators, and Small Carriers
-- Comprehensive mobile app development tasks for autonomous agents

INSERT INTO autonomous_tasks (task_id, agent_type, portal, task_name, description, status, priority, estimated_duration_minutes, dependencies) VALUES 

-- DRIVER MOBILE APP CORE FEATURES
('DRIVER-MOB-001', 'mobile_developer', 'driver', 'Driver Mobile App Foundation', 'Build core driver mobile app with authentication, profile management, offline capabilities, and TMS integration using React Native/Flutter', 'pending', 1, 240, '{}'),
('DRIVER-MOB-002', 'mobile_developer', 'driver', 'Load Assignment & Dispatch', 'Create load assignment interface with push notifications, load details, acceptance/rejection, and dispatch communication', 'pending', 1, 180, '{}'),
('DRIVER-MOB-003', 'mobile_developer', 'driver', 'GPS Navigation Integration', 'Integrate with Google Maps/Waze for turn-by-turn navigation, truck-specific routing, and real-time traffic updates', 'pending', 1, 160, '{}'),
('DRIVER-MOB-004', 'mobile_developer', 'driver', 'ELD Integration & HOS Tracking', 'Build ELD connectivity with Hours of Service tracking, duty status changes, DVIR, and DOT compliance features', 'pending', 1, 200, '{}'),
('DRIVER-MOB-005', 'mobile_developer', 'driver', 'Document Scanner & Management', 'Implement document scanning with BOL capture, delivery receipts, inspection reports, and cloud storage', 'pending', 1, 140, '{}'),
('DRIVER-MOB-006', 'mobile_developer', 'driver', 'Real-time Communication Hub', 'Create messaging system with dispatch, customers, support, voice messages, and emergency contacts', 'pending', 1, 120, '{}'),

-- DRIVER MOBILE APP ADVANCED FEATURES
('DRIVER-MOB-007', 'mobile_developer', 'driver', 'Fuel & Expense Tracking', 'Build fuel purchase tracking with receipt scanning, fuel card integration, and expense categorization', 'pending', 1, 130, '{}'),
('DRIVER-MOB-008', 'mobile_developer', 'driver', 'Vehicle Inspection App', 'Create pre-trip and post-trip inspection with checklists, photo documentation, and defect reporting', 'pending', 1, 110, '{}'),
('DRIVER-MOB-009', 'mobile_developer', 'driver', 'Driver Safety Features', 'Implement safety tools with emergency SOS, breakdown assistance, weather alerts, and safe parking locator', 'pending', 1, 100, '{}'),
('DRIVER-MOB-010', 'mobile_developer', 'driver', 'Load Tracking & Updates', 'Build shipment tracking with status updates, photo proof of delivery, customer notifications, and ETA management', 'pending', 1, 120, '{}'),
('DRIVER-MOB-011', 'mobile_developer', 'driver', 'Voice Commands & Hands-free', 'Implement voice control for hands-free operation, voice notes, and speech-to-text functionality', 'pending', 1, 150, '{}'),
('DRIVER-MOB-012', 'mobile_developer', 'driver', 'Offline Mode Capabilities', 'Create offline functionality for critical features with data sync when connectivity returns', 'pending', 1, 140, '{}'),

-- OWNER-OPERATOR MOBILE APP FEATURES
('OO-MOB-001', 'mobile_developer', 'owner_operator', 'Owner-Operator Business App', 'Build comprehensive business management app with dashboard, P&L tracking, and business analytics', 'pending', 1, 220, '{}'),
('OO-MOB-002', 'mobile_developer', 'owner_operator', 'Load Board & Freight Finder', 'Create load board integration with search filters, rate comparison, and automated bidding capabilities', 'pending', 1, 180, '{}'),
('OO-MOB-003', 'mobile_developer', 'owner_operator', 'Financial Management Suite', 'Implement expense tracking, invoice management, tax preparation, and cash flow analysis', 'pending', 1, 200, '{}'),
('OO-MOB-004', 'mobile_developer', 'owner_operator', 'Customer Relationship Management', 'Build CRM with customer contacts, communication history, contract management, and follow-up reminders', 'pending', 1, 160, '{}'),
('OO-MOB-005', 'mobile_developer', 'owner_operator', 'Truck Maintenance Manager', 'Create maintenance tracking with service schedules, cost tracking, warranty management, and vendor contacts', 'pending', 1, 140, '{}'),
('OO-MOB-006', 'mobile_developer', 'owner_operator', 'Business Analytics Dashboard', 'Build performance analytics with revenue trends, profit margins, operational metrics, and benchmarking', 'pending', 1, 150, '{}'),

-- OWNER-OPERATOR ADVANCED FEATURES
('OO-MOB-007', 'mobile_developer', 'owner_operator', 'IFTA & Tax Reporting', 'Implement IFTA reporting with mileage tracking, fuel tax calculations, and quarterly filing assistance', 'pending', 1, 130, '{}'),
('OO-MOB-008', 'mobile_developer', 'owner_operator', 'Insurance & Compliance Hub', 'Create insurance management with policy tracking, claims processing, and compliance monitoring', 'pending', 1, 120, '{}'),
('OO-MOB-009', 'mobile_developer', 'owner_operator', 'Fleet Expansion Tools', 'Build tools for business growth with equipment financing, driver recruitment, and expansion planning', 'pending', 1, 110, '{}'),
('OO-MOB-010', 'mobile_developer', 'owner_operator', 'Digital Factoring Interface', 'Integrate factoring services with invoice submission, funding status, and payment tracking', 'pending', 1, 100, '{}'),
('OO-MOB-011', 'mobile_developer', 'owner_operator', 'Route Planning & Optimization', 'Create route planning with fuel optimization, deadhead minimization, and multi-stop efficiency', 'pending', 1, 140, '{}'),
('OO-MOB-012', 'mobile_developer', 'owner_operator', 'Market Intelligence Center', 'Build market analysis with rate trends, lane profitability, and competitive intelligence', 'pending', 1, 120, '{}'),

-- SMALL CARRIER MOBILE APP FEATURES
('SC-MOB-001', 'mobile_developer', 'carrier_admin', 'Small Carrier Management App', 'Build small carrier management app with fleet oversight, driver management, and operational control', 'pending', 1, 240, '{}'),
('SC-MOB-002', 'mobile_developer', 'carrier_admin', 'Multi-Driver Dispatch System', 'Create dispatch interface for managing multiple drivers with load assignments and communication', 'pending', 1, 180, '{}'),
('SC-MOB-003', 'mobile_developer', 'carrier_admin', 'Fleet Tracking & Monitoring', 'Implement real-time fleet tracking with vehicle locations, status updates, and performance monitoring', 'pending', 1, 160, '{}'),
('SC-MOB-004', 'mobile_developer', 'carrier_admin', 'Customer Portal Integration', 'Build customer-facing features with load tracking, communication, and service updates', 'pending', 1, 140, '{}'),
('SC-MOB-005', 'mobile_developer', 'carrier_admin', 'Driver Performance Management', 'Create driver performance tracking with safety scores, efficiency metrics, and coaching tools', 'pending', 1, 130, '{}'),
('SC-MOB-006', 'mobile_developer', 'carrier_admin', 'Small Fleet Financial Tools', 'Build financial management with multi-truck P&L, cost allocation, and profitability analysis', 'pending', 1, 150, '{}'),

-- SMALL CARRIER ADVANCED FEATURES
('SC-MOB-007', 'mobile_developer', 'carrier_admin', 'Safety & Compliance Manager', 'Implement safety management with DOT compliance, driver monitoring, and violation tracking', 'pending', 1, 140, '{}'),
('SC-MOB-008', 'mobile_developer', 'carrier_admin', 'Equipment Management System', 'Create equipment tracking with maintenance schedules, utilization reports, and replacement planning', 'pending', 1, 120, '{}'),
('SC-MOB-009', 'mobile_developer', 'carrier_admin', 'Customer Acquisition Tools', 'Build tools for business development with lead tracking, proposal management, and customer onboarding', 'pending', 1, 110, '{}'),
('SC-MOB-010', 'mobile_developer', 'carrier_admin', 'Multi-Modal Operations', 'Create support for different service types (LTL, truckload, drayage) with specialized workflows', 'pending', 1, 160, '{}'),

-- CROSS-PLATFORM MOBILE FEATURES
('CROSS-MOB-001', 'mobile_developer', 'all_portals', 'Push Notification System', 'Build comprehensive push notification system with customizable alerts, priority levels, and delivery confirmation', 'pending', 1, 120, '{}'),
('CROSS-MOB-002', 'mobile_developer', 'all_portals', 'Biometric Authentication', 'Implement biometric login with fingerprint, face recognition, and secure credential storage', 'pending', 1, 100, '{}'),
('CROSS-MOB-003', 'mobile_developer', 'all_portals', 'Dark Mode & Accessibility', 'Create dark mode themes and accessibility features for vision/hearing impaired users', 'pending', 1, 80, '{}'),
('CROSS-MOB-004', 'mobile_developer', 'all_portals', 'Multi-language Support', 'Implement internationalization with Spanish, French, and other language support', 'pending', 1, 90, '{}'),
('CROSS-MOB-005', 'mobile_developer', 'all_portals', 'App Store Optimization', 'Optimize apps for App Store and Google Play with screenshots, descriptions, and ASO best practices', 'pending', 1, 60, '{}'),

-- MOBILE APP INTEGRATIONS
('INT-MOB-001', 'integration_specialist', 'all_portals', 'Wearable Device Integration', 'Integrate with Apple Watch and Android Wear for quick actions, notifications, and health monitoring', 'pending', 2, 140, '{}'),
('INT-MOB-002', 'integration_specialist', 'driver', 'Truck IoT Integration', 'Connect with truck telematics for engine data, fuel consumption, and diagnostic information', 'pending', 2, 160, '{}'),
('INT-MOB-003', 'integration_specialist', 'all_portals', 'Payment Gateway Integration', 'Integrate mobile payments with credit cards, ACH, and digital wallets for expenses and settlements', 'pending', 2, 120, '{}'),
('INT-MOB-004', 'integration_specialist', 'all_portals', 'Cloud Storage Sync', 'Implement cloud storage with automatic backup, multi-device sync, and data recovery', 'pending', 2, 100, '{}'),

-- MOBILE ANALYTICS & PERFORMANCE
('ANAL-MOB-001', 'analytics', 'all_portals', 'Mobile App Analytics', 'Build comprehensive mobile analytics with user behavior, performance metrics, and crash reporting', 'pending', 2, 110, '{}'),
('ANAL-MOB-002', 'analytics', 'driver', 'Driver Performance Analytics', 'Create driver performance dashboards with safety scores, efficiency metrics, and improvement recommendations', 'pending', 2, 120, '{}'),
('ANAL-MOB-003', 'analytics', 'owner_operator', 'Business Intelligence Mobile', 'Build mobile BI with revenue analysis, cost optimization, and market intelligence', 'pending', 2, 130, '{}'),

-- MOBILE SECURITY & COMPLIANCE
('SEC-MOB-001', 'security', 'all_portals', 'Mobile Security Framework', 'Implement mobile security with encryption, secure storage, certificate pinning, and threat detection', 'pending', 1, 150, '{}'),
('SEC-MOB-002', 'security', 'all_portals', 'DOT Compliance Mobile', 'Build DOT-specific compliance features with electronic logs, inspection reporting, and violation tracking', 'pending', 1, 140, '{}'),
('SEC-MOB-003', 'security', 'all_portals', 'Mobile Device Management', 'Create MDM capabilities for fleet-owned devices with remote wipe, policy enforcement, and app management', 'pending', 1, 120, '{}'),

-- MOBILE TESTING & DEPLOYMENT
('TEST-MOB-001', 'testing', 'all_portals', 'Mobile App Testing Suite', 'Build comprehensive testing framework with unit tests, integration tests, and automated UI testing', 'pending', 2, 160, '{}'),
('TEST-MOB-002', 'testing', 'all_portals', 'Performance & Load Testing', 'Implement mobile performance testing with battery usage, memory optimization, and network efficiency', 'pending', 2, 120, '{}'),
('DEPLOY-MOB-001', 'deployment', 'all_portals', 'Mobile CI/CD Pipeline', 'Create automated deployment pipeline with code signing, beta testing, and app store deployment', 'pending', 2, 140, '{}');

-- Update timestamps
UPDATE autonomous_tasks SET created_at = now(), updated_at = now();