-- Comprehensive Line of Business (LOB) Specific TMS Features for Autonomous Agents
-- LTL, LTL Air, Truckload, Intermodal, Drayage, and Parcel operations

INSERT INTO autonomous_tasks (task_id, agent_type, portal, task_name, description, status, priority, estimated_duration_minutes, dependencies) VALUES 

-- LTL (Less Than Truckload) OPERATIONS
('LTL-001', 'ltl_specialist', 'super_admin', 'LTL Freight Classification System', 'Build comprehensive LTL freight classification with NMFC codes, density calculator, class determination, and packaging requirements validation', 'pending', 1, 180, '{}'),
('LTL-002', 'ltl_specialist', 'broker_admin', 'LTL Consolidation Engine', 'Create LTL consolidation system with shipment grouping, route optimization, pickup/delivery scheduling, and multi-stop planning', 'pending', 1, 200, '{}'),
('LTL-003', 'ltl_specialist', 'carrier_admin', 'LTL Terminal Management', 'Implement LTL terminal operations with dock management, sorting systems, cross-dock optimization, and linehaul planning', 'pending', 1, 220, '{}'),
('LTL-004', 'ltl_specialist', 'shipper_admin', 'LTL Rating & Pricing Engine', 'Build LTL pricing system with tariff management, accessorial charges, fuel surcharges, and discount structures', 'pending', 1, 160, '{}'),
('LTL-005', 'ltl_specialist', 'driver', 'LTL Pickup & Delivery App', 'Create driver app for LTL operations with multi-stop routing, BOL management, weight verification, and delivery confirmations', 'pending', 1, 140, '{}'),
('LTL-006', 'ltl_specialist', 'all_portals', 'LTL Damage Claims Management', 'Implement LTL damage claims system with photo documentation, carrier liability, claim processing, and resolution tracking', 'pending', 1, 120, '{}'),

-- LTL AIR OPERATIONS
('AIR-001', 'air_specialist', 'super_admin', 'Air Freight Management System', 'Build air freight operations with airline integration, flight scheduling, cargo capacity management, and air waybill generation', 'pending', 1, 200, '{}'),
('AIR-002', 'air_specialist', 'broker_admin', 'Air Cargo Booking Platform', 'Create air cargo booking system with airline APIs, flight selection, cargo space allocation, and priority handling', 'pending', 1, 180, '{}'),
('AIR-003', 'air_specialist', 'shipper_admin', 'Air Freight Rate Engine', 'Implement air freight pricing with dimensional weight calculation, fuel surcharges, handling fees, and expedited service options', 'pending', 1, 160, '{}'),
('AIR-004', 'air_specialist', 'carrier_admin', 'Airport Operations Management', 'Build airport operations system with cargo handling, security clearance, customs documentation, and flight manifest management', 'pending', 1, 190, '{}'),
('AIR-005', 'air_specialist', 'all_portals', 'Air Cargo Tracking & Visibility', 'Create real-time air cargo tracking with flight status updates, airport checkpoints, and delivery notifications', 'pending', 1, 130, '{}'),
('AIR-006', 'air_specialist', 'all_portals', 'Dangerous Goods Management', 'Implement dangerous goods handling with IATA compliance, documentation, labeling, and carrier certification verification', 'pending', 1, 150, '{}'),

-- TRUCKLOAD OPERATIONS
('TL-001', 'truckload_specialist', 'super_admin', 'Truckload Capacity Management', 'Build truckload capacity planning with asset utilization, driver scheduling, equipment matching, and deadhead optimization', 'pending', 1, 180, '{}'),
('TL-002', 'truckload_specialist', 'broker_admin', 'Truckload Load Board Integration', 'Create comprehensive load board integration with automated posting, carrier matching, and tender management', 'pending', 1, 160, '{}'),
('TL-003', 'truckload_specialist', 'carrier_admin', 'Truckload Dispatch System', 'Implement dispatch operations with driver assignment, route planning, fuel optimization, and HOS compliance', 'pending', 1, 200, '{}'),
('TL-004', 'truckload_specialist', 'shipper_admin', 'Truckload Contract Management', 'Build contract management with rate agreements, volume commitments, performance metrics, and bid optimization', 'pending', 1, 150, '{}'),
('TL-005', 'truckload_specialist', 'driver', 'Truckload Driver Portal', 'Create driver portal with load assignments, navigation, fuel network, and settlement tracking', 'pending', 1, 120, '{}'),
('TL-006', 'truckload_specialist', 'owner_operator', 'Owner-Operator Business Tools', 'Implement owner-operator tools with P&L tracking, IFTA reporting, maintenance scheduling, and business analytics', 'pending', 1, 140, '{}'),

-- INTERMODAL OPERATIONS
('IM-001', 'intermodal_specialist', 'super_admin', 'Intermodal Container Management', 'Build container management system with rail yard integration, chassis tracking, drayage coordination, and equipment pooling', 'pending', 1, 220, '{}'),
('IM-002', 'intermodal_specialist', 'broker_admin', 'Rail & Ocean Integration', 'Create rail and ocean carrier integration with schedule management, container booking, and multi-modal routing', 'pending', 1, 200, '{}'),
('IM-003', 'intermodal_specialist', 'carrier_admin', 'Intermodal Drayage Operations', 'Implement drayage operations with port/rail yard management, appointment scheduling, and container positioning', 'pending', 1, 180, '{}'),
('IM-004', 'intermodal_specialist', 'shipper_admin', 'Intermodal Service Design', 'Build intermodal service planning with transit time optimization, cost modeling, and service reliability analytics', 'pending', 1, 160, '{}'),
('IM-005', 'intermodal_specialist', 'all_portals', 'Intermodal Tracking & Visibility', 'Create end-to-end intermodal tracking with rail updates, ocean vessel tracking, and drayage coordination', 'pending', 1, 150, '{}'),
('IM-006', 'intermodal_specialist', 'all_portals', 'Port & Rail Yard Integration', 'Implement port and rail yard APIs with gate appointments, container status, and facility operations', 'pending', 1, 170, '{}'),

-- DRAYAGE OPERATIONS
('DR-001', 'drayage_specialist', 'super_admin', 'Drayage Operations Management', 'Build drayage-specific operations with port/rail yard optimization, container moves, and chassis management', 'pending', 1, 180, '{}'),
('DR-002', 'drayage_specialist', 'carrier_admin', 'Port Integration Platform', 'Create comprehensive port integration with appointment systems, gate operations, and container tracking', 'pending', 1, 200, '{}'),
('DR-003', 'drayage_specialist', 'broker_admin', 'Drayage Rate Management', 'Implement drayage pricing with per-mile rates, wait time charges, detention fees, and port-specific surcharges', 'pending', 1, 140, '{}'),
('DR-004', 'drayage_specialist', 'driver', 'Drayage Driver Mobile App', 'Create drayage driver app with port navigation, appointment management, inspection tracking, and wait time logging', 'pending', 1, 130, '{}'),
('DR-005', 'drayage_specialist', 'all_portals', 'Chassis Pool Management', 'Build chassis pool management with availability tracking, maintenance scheduling, and allocation optimization', 'pending', 1, 150, '{}'),
('DR-006', 'drayage_specialist', 'all_portals', 'Container Status Tracking', 'Implement real-time container status with customs clearance, inspection requirements, and delivery scheduling', 'pending', 1, 120, '{}'),

-- PARCEL OPERATIONS
('PAR-001', 'parcel_specialist', 'super_admin', 'Parcel Management System', 'Build comprehensive parcel operations with package tracking, sorting automation, delivery routing, and last-mile optimization', 'pending', 1, 200, '{}'),
('PAR-002', 'parcel_specialist', 'shipper_admin', 'E-commerce Integration', 'Create e-commerce platform integration with order management, label generation, and return processing', 'pending', 1, 160, '{}'),
('PAR-003', 'parcel_specialist', 'carrier_admin', 'Parcel Sorting & Distribution', 'Implement parcel sorting center operations with scan tracking, route optimization, and delivery scheduling', 'pending', 1, 180, '{}'),
('PAR-004', 'parcel_specialist', 'driver', 'Last-Mile Delivery App', 'Create delivery driver app with route optimization, signature capture, delivery photos, and customer communication', 'pending', 1, 140, '{}'),
('PAR-005', 'parcel_specialist', 'all_portals', 'Parcel Rating Engine', 'Build parcel pricing system with zone-based rates, dimensional weight, service levels, and delivery options', 'pending', 1, 120, '{}'),
('PAR-006', 'parcel_specialist', 'all_portals', 'Returns Management', 'Implement returns processing with return labels, pickup scheduling, refund processing, and inventory management', 'pending', 1, 130, '{}'),

-- MULTI-MODAL COORDINATION
('MM-001', 'multimodal_specialist', 'super_admin', 'Multi-Modal Service Integration', 'Create unified platform for managing multiple transportation modes with service selection and optimization', 'pending', 1, 220, '{}'),
('MM-002', 'multimodal_specialist', 'broker_admin', 'Cross-Modal Rate Comparison', 'Build rate comparison engine across LTL, Truckload, Intermodal, Air, and Parcel services', 'pending', 1, 180, '{}'),
('MM-003', 'multimodal_specialist', 'shipper_admin', 'Mode Selection Optimization', 'Implement AI-driven mode selection based on cost, transit time, service requirements, and sustainability goals', 'pending', 1, 160, '{}'),
('MM-004', 'multimodal_specialist', 'all_portals', 'Unified Tracking Dashboard', 'Create consolidated tracking dashboard for shipments across all transportation modes', 'pending', 1, 150, '{}'),

-- SPECIALIZED EQUIPMENT & SERVICES
('SPEC-001', 'specialized_equipment', 'carrier_admin', 'Specialized Equipment Management', 'Build management system for specialized equipment: flatbed, reefer, tanker, oversized, hazmat, and white glove services', 'pending', 1, 200, '{}'),
('SPEC-002', 'specialized_equipment', 'shipper_admin', 'Temperature-Controlled Logistics', 'Create reefer management with temperature monitoring, cold chain compliance, and pharmaceutical logistics', 'pending', 1, 170, '{}'),
('SPEC-003', 'specialized_equipment', 'all_portals', 'Oversized & Heavy Haul', 'Implement oversized load management with permit routing, escort requirements, and specialized equipment coordination', 'pending', 1, 180, '{}'),
('SPEC-004', 'specialized_equipment', 'all_portals', 'Hazmat Compliance System', 'Build hazmat transportation with DOT compliance, carrier certification, and emergency response planning', 'pending', 1, 160, '{}'),

-- CROSS-LOB ANALYTICS & REPORTING
('ANAL-LOB-001', 'analytics', 'super_admin', 'Multi-Modal Analytics Dashboard', 'Create comprehensive analytics comparing performance across all lines of business with profitability analysis', 'pending', 1, 180, '{}'),
('ANAL-LOB-002', 'analytics', 'broker_admin', 'Cross-Modal Pricing Intelligence', 'Build pricing intelligence system analyzing rates across LTL, Truckload, Intermodal, Air, and Parcel markets', 'pending', 1, 160, '{}'),
('ANAL-LOB-003', 'analytics', 'carrier_admin', 'Service Performance Benchmarking', 'Implement service performance comparison across different transportation modes and service levels', 'pending', 1, 140, '{}'),

-- REGULATORY & COMPLIANCE BY LOB
('REG-LOB-001', 'compliance', 'all_portals', 'LOB-Specific Compliance Management', 'Create compliance management tailored to each line of business with specific regulations and requirements', 'pending', 1, 200, '{}'),
('REG-LOB-002', 'compliance', 'carrier_admin', 'Multi-Modal Insurance Management', 'Build insurance management system covering different liability requirements for each transportation mode', 'pending', 1, 160, '{}'),
('REG-LOB-003', 'compliance', 'all_portals', 'International Trade Compliance', 'Implement international shipping compliance with customs documentation, trade regulations, and duty management', 'pending', 1, 180, '{}'),

-- CUSTOMER EXPERIENCE BY LOB
('CX-LOB-001', 'customer_experience', 'shipper_admin', 'LOB-Specific Customer Portals', 'Create customer-facing portals customized for each line of business with relevant features and information', 'pending', 1, 170, '{}'),
('CX-LOB-002', 'customer_experience', 'all_portals', 'Service Level Agreements', 'Build SLA management system with performance tracking and penalty/incentive structures for each LOB', 'pending', 1, 150, '{}'),
('CX-LOB-003', 'customer_experience', 'all_portals', 'Multi-Modal Quote Engine', 'Create unified quote engine providing pricing options across all transportation modes', 'pending', 1, 160, '{}');

-- Update timestamps
UPDATE autonomous_tasks SET created_at = now(), updated_at = now();