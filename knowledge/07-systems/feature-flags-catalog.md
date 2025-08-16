---
title: Feature Flags Catalog
version: 1.0.0
owner: platform@transbot.ai
visibility: agents,human-ops
scope: system
ttl_days: 30
last_validated: 2025-08-15
---

## Portal Flags

- `portal.broker.enabled`: Enable broker portal
- `portal.carrier.enabled`: Enable carrier portal
- `portal.shipper.enabled`: Enable shipper portal
- `portal.admin.enabled`: Enable admin portal

## Autonomous Flags

- `agents.autonomousEnabled`: Enable autonomous agents
- `autonomy.mode`: FULL | LIMITED | DISABLED
- `autonomy.emergencyStop`: Emergency stop all agents

## Observability Flags

- `obs.otelEnabled`: Enable OpenTelemetry
- `obs.traceSampling`: Trace sampling rate (0.1-1.0)
- `obs.metricsEnabled`: Enable metrics collection

## Feature Flags

- `features.newPricing`: New pricing algorithm
- `features.advancedTracking`: Enhanced tracking features
- `features.mobileApp`: Mobile app features

## Rollout Strategy

- Canary: 5% → 25% → 50% → 100%
- Rollback threshold: error rate > 2%
- Monitoring: p95, success rate, business metrics
