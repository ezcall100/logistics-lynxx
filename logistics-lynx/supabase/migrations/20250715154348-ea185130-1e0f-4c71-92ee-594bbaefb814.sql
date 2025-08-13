-- Add comprehensive TMS functional area tasks and guidance for autonomous agents

-- Insert comprehensive TMS functional area tasks
INSERT INTO public.autonomous_tasks (task_id, agent_type, portal, task_name, description, priority, estimated_duration_minutes, dependencies) VALUES 
-- Relationships Management
('tms_relationships_001', 'frontend', 'all', 'Customer Relationship Management Dashboard', 'Develop comprehensive CRM dashboard with contact management, interaction history, and relationship tracking for all portal types', 8, 180, '{}'),
('tms_relationships_002', 'backend', 'all', 'Relationship API Endpoints', 'Create robust API endpoints for managing customer relationships, contact information, and interaction logging across all portals', 8, 120, '{}'),
('tms_relationships_003', 'frontend', 'all', 'Contact Directory and Communication Hub', 'Build advanced contact directory with integrated communication tools, call logging, and email tracking', 7, 150, '{}'),

-- Tickets System
('tms_tickets_001', 'frontend', 'all', 'Ticket Management System', 'Develop comprehensive ticket system for support, issues, and requests with priority handling and assignment workflows', 9, 200, '{}'),
('tms_tickets_002', 'backend', 'all', 'Ticket Lifecycle Management', 'Create backend logic for ticket creation, assignment, escalation, and resolution tracking with SLA management', 9, 150, '{}'),
('tms_tickets_003', 'frontend', 'all', 'Ticket Analytics and Reporting', 'Build ticket analytics dashboard with performance metrics, resolution times, and customer satisfaction tracking', 7, 120, '{}'),

-- Shipments Management
('tms_shipments_001', 'frontend', 'all', 'Advanced Shipment Tracking', 'Develop real-time shipment tracking with GPS integration, status updates, and delivery confirmation systems', 9, 240, '{}'),
('tms_shipments_002', 'backend', 'all', 'Shipment Optimization Engine', 'Create AI-powered shipment optimization for route planning, carrier selection, and cost optimization', 8, 180, '{}'),
('tms_shipments_003', 'frontend', 'all', 'Shipment Documentation Portal', 'Build comprehensive shipment documentation system with BOL, POD, and customs documentation management', 8, 160, '{}'),

-- Networks Management
('tms_networks_001', 'frontend', 'carrier', 'Carrier Network Dashboard', 'Develop carrier network management with capacity tracking, performance metrics, and partnership management', 8, 180, '{}'),
('tms_networks_002', 'backend', 'all', 'Network Performance Analytics', 'Create network performance tracking with carrier scorecards, on-time performance, and quality metrics', 7, 140, '{}'),
('tms_networks_003', 'frontend', 'all', 'Network Optimization Tools', 'Build tools for network optimization, lane management, and capacity planning across carrier networks', 7, 160, '{}'),

-- Workers Management
('tms_workers_001', 'frontend', 'carrier', 'Driver Management System', 'Develop comprehensive driver management with scheduling, performance tracking, and compliance monitoring', 8, 200, '{}'),
('tms_workers_002', 'backend', 'all', 'Worker Performance Analytics', 'Create worker performance tracking with productivity metrics, safety scores, and training management', 7, 140, '{}'),
('tms_workers_003', 'frontend', 'all', 'Worker Scheduling and Dispatch', 'Build advanced scheduling system with automated dispatch, load assignment, and route optimization', 8, 180, '{}'),

-- Documents Management
('tms_documents_001', 'frontend', 'all', 'Document Management System', 'Develop comprehensive document management with version control, digital signatures, and automated workflows', 8, 220, '{}'),
('tms_documents_002', 'backend', 'all', 'Document Processing Engine', 'Create automated document processing with OCR, data extraction, and validation workflows', 7, 160, '{}'),
('tms_documents_003', 'frontend', 'all', 'Document Compliance Portal', 'Build compliance-focused document portal with audit trails, expiration tracking, and regulatory compliance', 8, 180, '{}'),

-- Financials Management
('tms_financials_001', 'frontend', 'all', 'Financial Dashboard', 'Develop comprehensive financial dashboard with P&L, cash flow, and profitability analysis by lane and customer', 9, 240, '{}'),
('tms_financials_002', 'backend', 'all', 'Financial Analytics Engine', 'Create advanced financial analytics with cost analysis, margin tracking, and revenue optimization', 8, 200, '{}'),
('tms_financials_003', 'frontend', 'all', 'Invoicing and Billing System', 'Build automated invoicing system with customizable templates, approval workflows, and payment tracking', 8, 180, '{}'),

-- API Dashboard
('tms_api_001', 'frontend', 'super_admin', 'API Management Dashboard', 'Develop comprehensive API management dashboard with usage analytics, rate limiting, and developer portal', 7, 160, '{}'),
('tms_api_002', 'backend', 'all', 'API Gateway and Security', 'Create robust API gateway with authentication, rate limiting, and comprehensive security measures', 8, 180, '{}'),
('tms_api_003', 'frontend', 'all', 'API Documentation Portal', 'Build interactive API documentation with testing tools, code examples, and integration guides', 6, 120, '{}'),

-- EDI Integration
('tms_edi_001', 'backend', 'all', 'EDI Processing Engine', 'Develop comprehensive EDI processing system with support for 204, 214, 210, and other standard transactions', 8, 200, '{}'),
('tms_edi_002', 'frontend', 'all', 'EDI Management Portal', 'Create EDI management interface with transaction monitoring, error handling, and partner setup', 7, 160, '{}'),
('tms_edi_003', 'backend', 'all', 'EDI Mapping and Translation', 'Build flexible EDI mapping system with custom translations and business rule engine', 7, 140, '{}'),

-- Market Place
('tms_marketplace_001', 'frontend', 'all', 'Transportation Marketplace', 'Develop marketplace platform for freight matching, bid management, and carrier selection', 9, 280, '{}'),
('tms_marketplace_002', 'backend', 'all', 'Marketplace Matching Engine', 'Create AI-powered matching engine for optimal freight-to-carrier pairing based on multiple criteria', 8, 200, '{}'),
('tms_marketplace_003', 'frontend', 'all', 'Marketplace Analytics', 'Build marketplace analytics with pricing trends, capacity insights, and performance metrics', 7, 140, '{}'),

-- Quotes Management
('tms_quotes_001', 'frontend', 'all', 'Quote Management System', 'Develop comprehensive quote management with automated pricing, approval workflows, and quote tracking', 8, 180, '{}'),
('tms_quotes_002', 'backend', 'all', 'Dynamic Pricing Engine', 'Create intelligent pricing engine with market-based pricing, cost analysis, and profit optimization', 8, 200, '{}'),
('tms_quotes_003', 'frontend', 'all', 'Quote Analytics Dashboard', 'Build quote analytics with win/loss analysis, pricing optimization, and conversion tracking', 7, 120, '{}'),

-- Load Board
('tms_loadboard_001', 'frontend', 'all', 'Load Board Platform', 'Develop comprehensive load board with real-time load posting, carrier matching, and booking management', 9, 240, '{}'),
('tms_loadboard_002', 'backend', 'all', 'Load Board Optimization', 'Create load board optimization with intelligent matching, automated posting, and capacity management', 8, 180, '{}'),
('tms_loadboard_003', 'frontend', 'all', 'Load Board Analytics', 'Build load board analytics with market trends, pricing insights, and performance metrics', 7, 140, '{}'),

-- Assets Management
('tms_assets_001', 'frontend', 'carrier', 'Asset Management System', 'Develop comprehensive asset management with vehicle tracking, maintenance scheduling, and utilization analytics', 8, 200, '{}'),
('tms_assets_002', 'backend', 'all', 'Asset Optimization Engine', 'Create asset optimization system with predictive maintenance, utilization tracking, and cost analysis', 7, 160, '{}'),
('tms_assets_003', 'frontend', 'all', 'Asset Performance Dashboard', 'Build asset performance dashboard with KPIs, maintenance alerts, and lifecycle management', 7, 140, '{}'),

-- Rates Management
('tms_rates_001', 'frontend', 'all', 'Rate Management System', 'Develop comprehensive rate management with contract rates, spot rates, and dynamic pricing models', 8, 180, '{}'),
('tms_rates_002', 'backend', 'all', 'Rate Analytics Engine', 'Create rate analytics with market comparisons, cost analysis, and profitability tracking', 8, 160, '{}'),
('tms_rates_003', 'frontend', 'all', 'Rate Optimization Tools', 'Build rate optimization tools with automated benchmarking, margin analysis, and pricing recommendations', 7, 140, '{}'),

-- Reports System
('tms_reports_001', 'frontend', 'all', 'Advanced Reporting System', 'Develop comprehensive reporting system with customizable dashboards, scheduled reports, and data visualization', 8, 220, '{}'),
('tms_reports_002', 'backend', 'all', 'Report Generation Engine', 'Create powerful report generation engine with data aggregation, export capabilities, and real-time updates', 8, 180, '{}'),
('tms_reports_003', 'frontend', 'all', 'Executive Dashboard', 'Build executive-level dashboard with KPIs, trend analysis, and strategic insights across all TMS functions', 9, 200, '{}');

-- Add strategic guidance to agent memory for TMS functional areas
INSERT INTO public.agent_memory (agent_id, goal, prompt, response, context, confidence) VALUES 
('tms_functional_areas_guidance', 'TMS Functional Areas Development Strategy', 
'Provide comprehensive guidance for developing all TMS functional areas including relationships, tickets, shipments, networks, workers, documents, financials, API dashboard, EDI, marketplace, quotes, load board, assets, rates, and reports',
'COMPREHENSIVE TMS FUNCTIONAL AREAS DEVELOPMENT STRATEGY:

🔧 RELATIONSHIPS MANAGEMENT:
- Implement comprehensive CRM with 360-degree customer view
- Build contact management with interaction history and communication tracking
- Create relationship scoring and health monitoring
- Develop customer segmentation and targeted engagement tools
- Include account management workflows and opportunity tracking

🎫 TICKETS SYSTEM:
- Design multi-level ticket system with priority escalation
- Implement SLA management with automated alerts and notifications
- Create ticket routing and assignment based on expertise and workload
- Build customer portal for ticket submission and tracking
- Include knowledge base integration and automated responses

🚚 SHIPMENTS MANAGEMENT:
- Develop end-to-end shipment visibility with real-time tracking
- Create shipment optimization engine for route and carrier selection
- Build exception management with proactive alerts and resolution
- Implement delivery confirmation and proof of delivery systems
- Include customs and regulatory compliance features

🌐 NETWORKS MANAGEMENT:
- Build carrier network management with performance scorecards
- Create capacity planning and lane management tools
- Implement partner onboarding and compliance monitoring
- Develop network optimization algorithms for cost and service
- Include competitive analysis and market intelligence

👥 WORKERS MANAGEMENT:
- Design comprehensive workforce management system
- Create scheduling optimization with compliance constraints
- Build performance management with safety and productivity metrics
- Implement training management and certification tracking
- Include driver communication and mobile applications

📄 DOCUMENTS MANAGEMENT:
- Develop enterprise document management with version control
- Create automated document workflows and approval processes
- Build compliance tracking with expiration alerts and renewals
- Implement digital signatures and secure document sharing
- Include OCR and automated data extraction capabilities

💰 FINANCIALS MANAGEMENT:
- Build comprehensive financial analytics and reporting
- Create cost center management with detailed P&L analysis
- Implement automated billing and invoicing with customizable templates
- Develop cash flow management and payment tracking
- Include profitability analysis by customer, lane, and service type

🔌 API DASHBOARD:
- Create developer-friendly API management portal
- Build comprehensive API documentation with interactive testing
- Implement rate limiting and usage analytics
- Develop API security with OAuth and key management
- Include integration marketplace and partner ecosystem

📡 EDI INTEGRATION:
- Build robust EDI processing for standard transactions (204, 214, 210)
- Create flexible mapping engine for custom EDI formats
- Implement error handling and transaction monitoring
- Develop partner setup and certification workflows
- Include compliance validation and audit trails

🛒 MARKETPLACE:
- Design freight marketplace with intelligent matching
- Create bid management system with automated award processes
- Build marketplace analytics with pricing and capacity insights
- Implement rating and review system for quality assurance
- Include marketplace fees and commission management

💵 QUOTES MANAGEMENT:
- Develop dynamic pricing engine with market-based algorithms
- Create quote approval workflows with authorization levels
- Build quote tracking with conversion analysis
- Implement automated quote generation based on historical data
- Include competitive analysis and win/loss reporting

📋 LOAD BOARD:
- Build comprehensive load board with real-time updates
- Create intelligent matching algorithms for optimal pairing
- Implement automated posting and booking management
- Develop capacity management and utilization tracking
- Include market analytics and pricing intelligence

🚛 ASSETS MANAGEMENT:
- Design asset tracking with IoT integration
- Create predictive maintenance with AI-powered alerts
- Build utilization analytics and optimization recommendations
- Implement asset lifecycle management and depreciation tracking
- Include fuel management and efficiency monitoring

💲 RATES MANAGEMENT:
- Develop comprehensive rate management system
- Create dynamic pricing with market and cost factors
- Build rate analytics with profitability and margin analysis
- Implement contract management with automated renewals
- Include benchmarking and competitive rate analysis

📊 REPORTS SYSTEM:
- Design flexible reporting framework with drag-and-drop builders
- Create executive dashboards with real-time KPIs
- Build automated report distribution and scheduling
- Implement data visualization with charts and graphs
- Include drill-down capabilities and detailed analytics

TECHNICAL EXCELLENCE STANDARDS:
- Use microservices architecture for scalability
- Implement real-time data processing and analytics
- Build mobile-first responsive designs
- Use AI/ML for optimization and predictive capabilities
- Ensure enterprise-grade security and compliance
- Create modular, maintainable, and testable code
- Implement comprehensive logging and monitoring
- Use modern frameworks and best practices

INTEGRATION REQUIREMENTS:
- Seamless integration between all functional areas
- Consistent data models and API standards
- Unified user experience across all portals
- Real-time synchronization and event-driven architecture
- Comprehensive audit trails and data governance',
'{"functional_areas": ["relationships", "tickets", "shipments", "networks", "workers", "documents", "financials", "api_dashboard", "edi", "marketplace", "quotes", "load_board", "assets", "rates", "reports"], "priority": "high", "scope": "comprehensive"}',
0.95),

('tms_ui_ux_standards', 'TMS UI/UX Standards for Functional Areas', 
'Define UI/UX standards and best practices for all TMS functional areas to ensure consistent, intuitive, and efficient user experiences',
'TMS UI/UX STANDARDS FOR FUNCTIONAL AREAS:

🎨 DESIGN SYSTEM CONSISTENCY:
- Use unified color palette and typography across all functional areas
- Implement consistent component library with reusable elements
- Maintain standard spacing, sizing, and layout patterns
- Create cohesive iconography and visual language
- Ensure accessibility compliance (WCAG 2.1 AA standards)

📱 RESPONSIVE DESIGN PRINCIPLES:
- Mobile-first approach for all functional areas
- Tablet optimization for field workers and managers
- Desktop experience for power users and administrators
- Consistent navigation and interaction patterns
- Adaptive layouts that work across all screen sizes

🚀 PERFORMANCE OPTIMIZATION:
- Fast loading times (<3 seconds for all pages)
- Efficient data loading with pagination and virtual scrolling
- Optimized images and assets for quick rendering
- Progressive web app capabilities for offline functionality
- Lazy loading for improved initial page performance

👤 USER EXPERIENCE BEST PRACTICES:
- Intuitive navigation with clear information hierarchy
- Contextual help and tooltips for complex features
- Consistent form design with validation and error handling
- Bulk operations and batch processing capabilities
- Keyboard shortcuts and power user features

🔍 SEARCH AND FILTERING:
- Global search functionality across all functional areas
- Advanced filtering with saved filter presets
- Real-time search suggestions and autocomplete
- Faceted search for complex data structures
- Search analytics and optimization

📊 DATA VISUALIZATION:
- Interactive charts and graphs for analytics
- Customizable dashboards with drag-and-drop widgets
- Real-time data updates and live monitoring
- Export capabilities for reports and analytics
- Color-coded status indicators and alerts

🔔 NOTIFICATIONS AND ALERTS:
- Real-time notification system with priority levels
- Customizable alert preferences and channels
- In-app notifications with action buttons
- Email and SMS integration for critical alerts
- Notification history and acknowledgment tracking

PORTAL-SPECIFIC STANDARDS:
- Super Admin: Comprehensive system oversight and configuration
- Carrier Admin: Fleet and operations management focus
- Shipper: Shipment tracking and logistics coordination
- Broker: Multi-carrier management and optimization
- Driver: Mobile-first with essential operational tools
- Owner-Operator: Business management and performance tracking',
'{"ui_standards": "comprehensive", "ux_focus": "user_centric", "accessibility": "wcag_compliant", "performance": "optimized"}',
0.92);

-- Log this comprehensive guidance update
INSERT INTO public.agent_status_logs (agent_id, agent_type, status, message, timestamp) VALUES 
('tms_functional_coordinator', 'system', 'guidance_updated', 'Comprehensive TMS functional areas guidance and tasks created covering all major system components', NOW());