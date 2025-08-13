-- Add autonomous agent tasks for TMS rates functionality across all transportation modes

INSERT INTO public.autonomous_tasks (task_id, agent_type, portal, task_name, description, priority, estimated_duration_minutes, dependencies, status) VALUES

-- LTL RATES FUNCTIONALITY (8 tasks)
('LTL_RATE_001', 'Data Processor', 'All', 'LTL Sell Rate Engine', 'Build comprehensive LTL pricing engine with class-based pricing, density factors, and accessorial charges', 1, 240, ARRAY[]::text[], 'pending'),
('LTL_RATE_002', 'Data Processor', 'All', 'LTL Buy Rate Management', 'Create LTL carrier rate management system with contracted rates, fuel surcharges, and zone pricing', 1, 220, ARRAY[]::text[], 'pending'),
('LTL_RATE_003', 'UI Builder', 'All', 'LTL Rate Quote Interface', 'Build customer-facing LTL rate quote interface with real-time pricing and transit times', 1, 180, ARRAY['LTL_RATE_001'], 'pending'),
('LTL_RATE_004', 'Data Processor', 'All', 'LTL Rate Optimization', 'Develop margin optimization algorithms for LTL pricing based on market conditions and capacity', 2, 200, ARRAY['LTL_RATE_001', 'LTL_RATE_002'], 'pending'),
('LTL_RATE_005', 'UI Builder', 'All', 'LTL Rate Management Dashboard', 'Create dashboard for managing LTL rate tables, carrier agreements, and pricing rules', 1, 160, ARRAY['LTL_RATE_002'], 'pending'),
('LTL_RATE_006', 'Data Processor', 'All', 'LTL Accessorial Pricing', 'Build comprehensive accessorial charge system for LTL services (liftgate, residential, etc.)', 2, 140, ARRAY['LTL_RATE_001'], 'pending'),
('LTL_RATE_007', 'Data Processor', 'All', 'LTL Freight Class Calculator', 'Implement automated freight class determination based on commodity and density', 2, 120, ARRAY['LTL_RATE_001'], 'pending'),
('LTL_RATE_008', 'Data Processor', 'All', 'LTL Rate Analytics', 'Create analytics for LTL rate performance, margin analysis, and competitive benchmarking', 3, 150, ARRAY['LTL_RATE_004'], 'pending'),

-- LTL AIR RATES FUNCTIONALITY (6 tasks)
('LTLAIR_RATE_001', 'Data Processor', 'All', 'LTL Air Sell Rate Engine', 'Build air freight pricing engine with dimensional weight, priority levels, and airport surcharges', 1, 200, ARRAY[]::text[], 'pending'),
('LTLAIR_RATE_002', 'Data Processor', 'All', 'LTL Air Buy Rate Management', 'Create airline and air freight carrier rate management with capacity-based pricing', 1, 180, ARRAY[]::text[], 'pending'),
('LTLAIR_RATE_003', 'UI Builder', 'All', 'LTL Air Rate Quote System', 'Build real-time air freight quoting with flight schedules and capacity availability', 1, 160, ARRAY['LTLAIR_RATE_001'], 'pending'),
('LTLAIR_RATE_004', 'Data Processor', 'All', 'LTL Air Dynamic Pricing', 'Implement dynamic pricing based on flight capacity, fuel costs, and demand', 2, 180, ARRAY['LTLAIR_RATE_001', 'LTLAIR_RATE_002'], 'pending'),
('LTLAIR_RATE_005', 'Data Processor', 'All', 'LTL Air Dimensional Weight Calculator', 'Build accurate dimensional weight calculation system for air freight pricing', 2, 100, ARRAY['LTLAIR_RATE_001'], 'pending'),
('LTLAIR_RATE_006', 'Data Processor', 'All', 'LTL Air Rate Optimization', 'Optimize air freight rates based on route popularity, seasonal trends, and carrier performance', 3, 160, ARRAY['LTLAIR_RATE_004'], 'pending'),

-- TRUCKLOAD RATES FUNCTIONALITY (8 tasks)
('TL_RATE_001', 'Data Processor', 'All', 'Truckload Sell Rate Engine', 'Build spot and contract rate engine for truckload with lane-based pricing and equipment types', 1, 220, ARRAY[]::text[], 'pending'),
('TL_RATE_002', 'Data Processor', 'All', 'Truckload Buy Rate Management', 'Create carrier rate management with contracted rates, fuel programs, and performance bonuses', 1, 200, ARRAY[]::text[], 'pending'),
('TL_RATE_003', 'UI Builder', 'All', 'Truckload Rate Quote Interface', 'Build instant truckload quoting system with market-based pricing', 1, 140, ARRAY['TL_RATE_001'], 'pending'),
('TL_RATE_004', 'Data Processor', 'All', 'Truckload Spot Market Integration', 'Integrate with spot market data for real-time truckload pricing', 1, 180, ARRAY['TL_RATE_001'], 'pending'),
('TL_RATE_005', 'Data Processor', 'All', 'Truckload Rate Optimization', 'Develop AI-powered rate optimization based on market trends and capacity', 2, 240, ARRAY['TL_RATE_001', 'TL_RATE_004'], 'pending'),
('TL_RATE_006', 'Data Processor', 'All', 'Truckload Fuel Surcharge Engine', 'Build automated fuel surcharge calculation based on DOE pricing and routes', 2, 120, ARRAY['TL_RATE_002'], 'pending'),
('TL_RATE_007', 'UI Builder', 'All', 'Truckload Rate Analytics Dashboard', 'Create comprehensive analytics for truckload rate performance and profitability', 2, 160, ARRAY['TL_RATE_005'], 'pending'),
('TL_RATE_008', 'Data Processor', 'All', 'Truckload Equipment Rate Differentials', 'Manage rate differentials for specialized equipment (reefer, flatbed, etc.)', 3, 140, ARRAY['TL_RATE_001'], 'pending'),

-- INTERMODAL RATES FUNCTIONALITY (7 tasks)
('IM_RATE_001', 'Data Processor', 'All', 'Intermodal Sell Rate Engine', 'Build multi-leg intermodal pricing with rail, drayage, and accessorial components', 1, 260, ARRAY[]::text[], 'pending'),
('IM_RATE_002', 'Data Processor', 'All', 'Intermodal Buy Rate Management', 'Create rate management for rail carriers, drayage providers, and equipment costs', 1, 240, ARRAY[]::text[], 'pending'),
('IM_RATE_003', 'UI Builder', 'All', 'Intermodal Rate Quote System', 'Build complex intermodal quoting with transit time optimization', 1, 200, ARRAY['IM_RATE_001'], 'pending'),
('IM_RATE_004', 'Data Processor', 'All', 'Intermodal Rail Rate Integration', 'Integrate with major rail carriers for real-time intermodal pricing', 1, 180, ARRAY['IM_RATE_001'], 'pending'),
('IM_RATE_005', 'Data Processor', 'All', 'Intermodal Drayage Rate Optimization', 'Optimize drayage rates based on port/ramp proximity and traffic patterns', 2, 160, ARRAY['IM_RATE_002'], 'pending'),
('IM_RATE_006', 'Data Processor', 'All', 'Intermodal Equipment Rate Management', 'Manage container and chassis rates with depot charges and availability', 2, 140, ARRAY['IM_RATE_002'], 'pending'),
('IM_RATE_007', 'Data Processor', 'All', 'Intermodal Rate Analytics', 'Create analytics for intermodal rate competitiveness and modal optimization', 3, 180, ARRAY['IM_RATE_005'], 'pending'),

-- DRAYAGE RATES FUNCTIONALITY (6 tasks)
('DRAY_RATE_001', 'Data Processor', 'All', 'Drayage Sell Rate Engine', 'Build port/rail drayage pricing with congestion factors and appointment fees', 1, 180, ARRAY[]::text[], 'pending'),
('DRAY_RATE_002', 'Data Processor', 'All', 'Drayage Buy Rate Management', 'Create drayage carrier rate management with port-specific pricing', 1, 160, ARRAY[]::text[], 'pending'),
('DRAY_RATE_003', 'UI Builder', 'All', 'Drayage Rate Quote Interface', 'Build drayage quoting system with real-time port congestion data', 1, 140, ARRAY['DRAY_RATE_001'], 'pending'),
('DRAY_RATE_004', 'Data Processor', 'All', 'Drayage Congestion Pricing', 'Implement dynamic pricing based on port congestion and appointment availability', 2, 160, ARRAY['DRAY_RATE_001'], 'pending'),
('DRAY_RATE_005', 'Data Processor', 'All', 'Drayage Equipment Rate Management', 'Manage chassis and container rates with depot and demurrage charges', 2, 120, ARRAY['DRAY_RATE_002'], 'pending'),
('DRAY_RATE_006', 'Data Processor', 'All', 'Drayage Rate Optimization', 'Optimize drayage rates based on traffic patterns and driver availability', 3, 140, ARRAY['DRAY_RATE_004'], 'pending'),

-- PARCEL RATES FUNCTIONALITY (6 tasks)
('PARCEL_RATE_001', 'Data Processor', 'All', 'Parcel Sell Rate Engine', 'Build parcel pricing engine with zone skips, dimensional weight, and service levels', 1, 200, ARRAY[]::text[], 'pending'),
('PARCEL_RATE_002', 'Data Processor', 'All', 'Parcel Buy Rate Management', 'Create parcel carrier rate management with volume discounts and incentives', 1, 180, ARRAY[]::text[], 'pending'),
('PARCEL_RATE_003', 'UI Builder', 'All', 'Parcel Rate Quote System', 'Build instant parcel quoting with service level comparison', 1, 120, ARRAY['PARCEL_RATE_001'], 'pending'),
('PARCEL_RATE_004', 'Data Processor', 'All', 'Parcel Volume Discount Engine', 'Implement volume-based discount tiers and annual commitment pricing', 2, 140, ARRAY['PARCEL_RATE_002'], 'pending'),
('PARCEL_RATE_005', 'Data Processor', 'All', 'Parcel Zone Skip Optimization', 'Optimize zone skip opportunities for cost-effective parcel delivery', 2, 120, ARRAY['PARCEL_RATE_001'], 'pending'),
('PARCEL_RATE_006', 'Data Processor', 'All', 'Parcel Rate Analytics', 'Create analytics for parcel rate performance and carrier comparison', 3, 130, ARRAY['PARCEL_RATE_004'], 'pending'),

-- CROSS-MODE RATE FUNCTIONALITY (10 tasks)
('CROSS_RATE_001', 'Data Processor', 'All', 'Universal Rate Management Platform', 'Build unified rate management system supporting all transportation modes', 1, 300, ARRAY[]::text[], 'pending'),
('CROSS_RATE_002', 'UI Builder', 'All', 'Multi-Modal Rate Comparison', 'Create interface to compare rates across different transportation modes', 1, 180, ARRAY['CROSS_RATE_001'], 'pending'),
('CROSS_RATE_003', 'Data Processor', 'All', 'Modal Rate Optimization Engine', 'Build AI system to recommend optimal transportation mode based on cost and service', 2, 240, ARRAY['CROSS_RATE_001'], 'pending'),
('CROSS_RATE_004', 'Security', 'All', 'Rate Security & Access Controls', 'Implement role-based access controls for rate viewing and modification', 1, 140, ARRAY['CROSS_RATE_001'], 'pending'),
('CROSS_RATE_005', 'Data Processor', 'All', 'Rate API Integration Hub', 'Create unified API for external rate integrations and carrier connections', 2, 200, ARRAY['CROSS_RATE_001'], 'pending'),
('CROSS_RATE_006', 'UI Builder', 'All', 'Executive Rate Dashboard', 'Build executive dashboard for rate performance across all modes', 2, 160, ARRAY['CROSS_RATE_003'], 'pending'),
('CROSS_RATE_007', 'Data Processor', 'All', 'Rate Audit & Compliance System', 'Create audit trails and compliance reporting for rate management', 2, 180, ARRAY['CROSS_RATE_004'], 'pending'),
('CROSS_RATE_008', 'Data Processor', 'All', 'Rate Benchmarking System', 'Build competitive rate benchmarking across all transportation modes', 3, 160, ARRAY['CROSS_RATE_003'], 'pending'),
('CROSS_RATE_009', 'UI Builder', 'All', 'Customer Rate Portal', 'Create customer self-service portal for rate quotes and contract management', 2, 200, ARRAY['CROSS_RATE_002'], 'pending'),
('CROSS_RATE_010', 'Testing', 'All', 'Comprehensive Rate System Testing', 'End-to-end testing of all rate functionality across transportation modes', 1, 300, ARRAY['CROSS_RATE_001', 'CROSS_RATE_002', 'CROSS_RATE_003'], 'pending');