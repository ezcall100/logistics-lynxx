-- Website Builder Feature Flags
-- Trans Bot AI TMS Software Company

-- Builder master switch and safety rails
insert into public.feature_flags_v2(key, scope, value, reason, owner_name) values
('builder.enabled', 'global', true, 'Website builder master switch', 'autonomous'),
('builder.maxConcurrent', 'global', 5, 'Limit worker concurrency', 'autonomous'),
('builder.maxPagesPerHour', 'global', 60, 'Budget rail - max pages per hour', 'autonomous'),
('builder.minSeoScore', 'global', 75, 'Gate publish by quality - minimum SEO score', 'autonomous'),
('builder.autoPauseOnError', 'global', true, 'Auto-pause on repeated errors', 'autonomous'),
('builder.contentFiltering', 'global', true, 'Enable content safety filtering', 'autonomous'),
('builder.deduplication', 'global', true, 'Enable content deduplication', 'autonomous'),
('builder.rateLimit', 'global', 10, 'Max builds per minute', 'autonomous'),
('builder.emergencyStop', 'global', false, 'Emergency stop for website builder', 'autonomous'),
('builder.debugMode', 'global', false, 'Enable debug logging', 'autonomous'),
('builder.autoRetry', 'global', true, 'Auto-retry failed builds', 'autonomous'),
('builder.maxRetries', 'global', 3, 'Maximum retry attempts', 'autonomous'),
('builder.qualityGates', 'global', true, 'Enable quality gates', 'autonomous'),
('builder.performanceMonitoring', 'global', true, 'Enable performance monitoring', 'autonomous'),
('builder.auditLogging', 'global', true, 'Enable audit logging', 'autonomous')
on conflict (key, scope) do update set value=excluded.value;

-- TMS-specific builder flags
insert into public.feature_flags_v2(key, scope, value, reason, owner_name) values
('builder.tmsContentEnabled', 'global', true, 'Enable TMS-specific content generation', 'autonomous'),
('builder.tmsSeoOptimization', 'global', true, 'Enable TMS SEO optimization', 'autonomous'),
('builder.tmsImageGeneration', 'global', true, 'Enable TMS image generation', 'autonomous'),
('builder.tmsKeywordOptimization', 'global', true, 'Enable TMS keyword optimization', 'autonomous'),
('builder.tmsIndustryFocus', 'global', true, 'Focus on transportation industry content', 'autonomous'),
('builder.tmsComplianceCheck', 'global', true, 'Check TMS compliance requirements', 'autonomous'),
('builder.tmsLocalization', 'global', false, 'Enable TMS content localization', 'autonomous'),
('builder.tmsAITraining', 'global', true, 'Enable AI training on TMS content', 'autonomous'),
('builder.tmsAnalytics', 'global', true, 'Enable TMS content analytics', 'autonomous'),
('builder.tmsIntegration', 'global', true, 'Enable TMS system integration', 'autonomous')
on conflict (key, scope) do update set value=excluded.value;

-- Quality and safety flags
insert into public.feature_flags_v2(key, scope, value, reason, owner_name) values
('builder.contentSafety', 'global', true, 'Enable content safety checks', 'autonomous'),
('builder.piiRedaction', 'global', true, 'Enable PII redaction in logs', 'autonomous'),
('builder.contentModeration', 'global', true, 'Enable content moderation', 'autonomous'),
('builder.spamDetection', 'global', true, 'Enable spam detection', 'autonomous'),
('builder.duplicateDetection', 'global', true, 'Enable duplicate content detection', 'autonomous'),
('builder.qualityScoring', 'global', true, 'Enable quality scoring', 'autonomous'),
('builder.readabilityCheck', 'global', true, 'Enable readability checks', 'autonomous'),
('builder.grammarCheck', 'global', true, 'Enable grammar checking', 'autonomous'),
('builder.seoValidation', 'global', true, 'Enable SEO validation', 'autonomous'),
('builder.accessibilityCheck', 'global', true, 'Enable accessibility checks', 'autonomous')
on conflict (key, scope) do update set value=excluded.value;

-- Performance and monitoring flags
insert into public.feature_flags_v2(key, scope, value, reason, owner_name) values
('builder.performanceTracking', 'global', true, 'Enable performance tracking', 'autonomous'),
('builder.errorTracking', 'global', true, 'Enable error tracking', 'autonomous'),
('builder.metricsCollection', 'global', true, 'Enable metrics collection', 'autonomous'),
('builder.alerting', 'global', true, 'Enable alerting', 'autonomous'),
('builder.slowQueryDetection', 'global', true, 'Enable slow query detection', 'autonomous'),
('builder.resourceMonitoring', 'global', true, 'Enable resource monitoring', 'autonomous'),
('builder.capacityPlanning', 'global', true, 'Enable capacity planning', 'autonomous'),
('builder.autoScaling', 'global', false, 'Enable auto-scaling', 'autonomous'),
('builder.loadBalancing', 'global', true, 'Enable load balancing', 'autonomous'),
('builder.circuitBreaker', 'global', true, 'Enable circuit breaker pattern', 'autonomous')
on conflict (key, scope) do update set value=excluded.value;

-- Integration and API flags
insert into public.feature_flags_v2(key, scope, value, reason, owner_name) values
('builder.apiEnabled', 'global', true, 'Enable builder API', 'autonomous'),
('builder.webhookEnabled', 'global', true, 'Enable webhook notifications', 'autonomous'),
('builder.slackIntegration', 'global', false, 'Enable Slack integration', 'autonomous'),
('builder.emailNotifications', 'global', true, 'Enable email notifications', 'autonomous'),
('builder.smsNotifications', 'global', false, 'Enable SMS notifications', 'autonomous'),
('builder.dashboardEnabled', 'global', true, 'Enable builder dashboard', 'autonomous'),
('builder.realtimeUpdates', 'global', true, 'Enable real-time updates', 'autonomous'),
('builder.websocketEnabled', 'global', true, 'Enable WebSocket connections', 'autonomous'),
('builder.sseEnabled', 'global', true, 'Enable Server-Sent Events', 'autonomous'),
('builder.restApiEnabled', 'global', true, 'Enable REST API', 'autonomous')
on conflict (key, scope) do update set value=excluded.value;

-- Development and testing flags
insert into public.feature_flags_v2(key, scope, value, reason, owner_name) values
('builder.testMode', 'global', false, 'Enable test mode', 'autonomous'),
('builder.mockData', 'global', false, 'Enable mock data generation', 'autonomous'),
('builder.simulationMode', 'global', false, 'Enable simulation mode', 'autonomous'),
('builder.dryRun', 'global', false, 'Enable dry run mode', 'autonomous'),
('builder.verboseLogging', 'global', false, 'Enable verbose logging', 'autonomous'),
('builder.profiling', 'global', false, 'Enable profiling', 'autonomous'),
('builder.tracing', 'global', true, 'Enable distributed tracing', 'autonomous'),
('builder.metrics', 'global', true, 'Enable metrics collection', 'autonomous'),
('builder.healthChecks', 'global', true, 'Enable health checks', 'autonomous'),
('builder.selfHealing', 'global', true, 'Enable self-healing', 'autonomous')
on conflict (key, scope) do update set value=excluded.value;
