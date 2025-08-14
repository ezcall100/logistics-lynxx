# 🤖 Autonomous Agent Quick Reference

## **⚡ Essential Commands & Patterns**

### **🔐 Security First**
```typescript
// Always check feature flags first
const isEnabled = await checkFeatureFlag('portal.broker.enabled', tenantId);
if (!isEnabled) {
  log.info('FF_BLOCKED', { flag: 'portal.broker.enabled', tenantId });
  return { status: 'blocked', reason: 'feature_flag_disabled' };
}

// Use idempotency keys
const idempotencyKey = `${tenantId}:${action}:${timestamp}`;
const existing = await checkIdempotency(idempotencyKey);
if (existing) return existing;

// Redact PII
const safeLog = redact(sensitiveData);
log.info('operation_complete', { data: safeLog });
```

### **📊 Observability**
```typescript
// Create root span
const span = tracer.startSpan('agent.task.execute', {
  attributes: {
    'tenant.id': tenantId,
    'agent.task_id': taskId,
    'agent.fn_name': 'broker.quote.create'
  }
});

// Function spans
const fnSpan = tracer.startSpan('agent.fn.broker.quote.create');

// Error handling
try {
  // ... operation
} catch (error) {
  span.setStatus({ code: SpanStatusCode.ERROR });
  span.recordException(error);
  throw error;
} finally {
  span.end();
}
```

### **🔄 Durability Pattern**
```typescript
// Write to outbox for external side-effects
await outbox.publish({
  idempotencyKey: `${tenantId}:email:${quoteId}`,
  type: 'email.quote_sent',
  payload: { quoteId, recipient },
  targets: ['n8n', 'slack']
});

// Handle failures
if (error) {
  await dlq.route({
    error,
    retryAfter: '5m',
    maxRetries: 3
  });
}
```

## **🎯 Portal Task Patterns**

### **Broker Portal Example**
```typescript
// Entry point validation
if (!req.path.startsWith('/broker/')) {
  return { status: 404 };
}

// RBAC check
const hasAccess = await checkRBAC(userId, 'broker', 'quote.create');
if (!hasAccess) {
  return { status: 403, error: 'insufficient_permissions' };
}

// Company-scoped operation
const quotes = await db.quotes.findMany({
  where: { company_id: tenantId },
  include: { loads: true }
});

// Success criteria check
const success = await validateQuoteSuccess(quoteId);
if (!success) {
  await alert('aging_unbooked_quotes', { quoteId, age: '24h' });
}
```

### **Carrier Portal Example**
```typescript
// Capacity update
await db.carrier_capacity.update({
  where: { 
    carrier_id: carrierId,
    company_id: tenantId 
  },
  data: { 
    available_trucks: newCapacity,
    updated_at: new Date()
  }
});

// Compliance check
const coiExpiry = await checkCOIExpiry(carrierId);
if (coiExpiry < 30) {
  await alert('expired_coi', { carrierId, daysUntilExpiry: coiExpiry });
}
```

## **🌐 Website Event Handling**

### **Lead Intake Pattern**
```typescript
// Website event → Agent
app.post('/api/roi-intake', async (req, res) => {
  const { email, company, requirements } = req.body;
  
  // Create lead record
  const lead = await db.leads.create({
    data: {
      email: redact(email),
      company_name: company,
      requirements,
      source: 'website_roi',
      utm_data: req.query
    }
  });

  // Route to n8n
  await outbox.publish({
    type: 'lead.roi_submitted',
    payload: { leadId: lead.id },
    targets: ['n8n', 'crm']
  });

  res.json({ success: true, leadId: lead.id });
});
```

## **📅 Scheduled Tasks**

### **Every 30s Health Check**
```typescript
cron.schedule('*/30 * * * * *', async () => {
  // Health probe
  const health = await checkSystemHealth();
  if (health.status !== 'healthy') {
    await alert('system_health_degraded', health);
  }

  // Multi-region gate
  const regionHealth = await checkMultiRegionHealth();
  if (regionHealth.primary.failing) {
    await triggerFailover();
  }

  // Agent queue depth
  const queueDepth = await getAgentQueueDepth();
  if (queueDepth > 1000) {
    await alert('high_queue_depth', { depth: queueDepth });
  }
});
```

### **Hourly Tasks**
```typescript
cron.schedule('0 * * * *', async () => {
  // Guardrail drift scan
  await scanGuardrailDrift();
  
  // Stale indices refill
  await refillStaleIndices();
  
  // Analytics ETL
  await runAnalyticsETL();
});
```

## **🚨 Alerting Patterns**

### **PAGE Alerts**
```typescript
// Outbox lag
if (outboxLag > 5000) { // 5s
  await pageAlert('outbox_lag_p95_5s_15m', {
    lag: outboxLag,
    threshold: 5000
  });
}

// DLQ replay failure
if (dlqFailureRate > 0.4) { // 40%
  await pageAlert('dlq_replay_fail_40_percent', {
    failureRate: dlqFailureRate
  });
}

// Success rate drop
if (successRate < 0.95) { // 95%
  await pageAlert('success_95_percent_15m', {
    successRate,
    threshold: 0.95
  });
}
```

### **WARN Alerts**
```typescript
// 410 hits
if (hits410 > 50) {
  await warnAlert('410_hits_50_per_hr_tenant', {
    hits: hits410,
    tenantId
  });
}

// Contract guardrail violation
if (guardrailViolation) {
  await warnAlert('contract_guardrail_violation', {
    contractId,
    violation: guardrailViolation
  });
}
```

## **🔍 SLO Monitoring**

### **Success Rate Check**
```typescript
const successRate = await calculateSuccessRate('15m');
if (successRate < 0.98) { // 98%
  // Reduce sampling
  await reduceSampling();
  
  // Flip canary off
  await flipCanaryFlag('off');
  
  // Alert
  await pageAlert('success_rate_below_threshold', { successRate });
}
```

### **Latency Check**
```typescript
const p95Latency = await calculateP95Latency();
if (p95Latency > 2500) { // 2.5s
  // Flip canary off
  await flipCanaryFlag('off');
  
  // Alert
  await pageAlert('p95_latency_high', { p95Latency });
}
```

## **💰 Budget Management**

### **Per-Tenant Budget Check**
```typescript
const budget = await getTenantBudget(tenantId);
const usage = await getTenantUsage(tenantId, 'daily');

if (usage > budget.limit) {
  await emit('BUDGET_EXCEEDED', {
    tenantId,
    usage,
    limit: budget.limit
  });
  
  // Schedule for next window
  await scheduleForNextWindow(tenantId, 'daily');
}
```

## **🔄 Circuit Breaker Pattern**

### **Lane Circuit Breaker**
```typescript
const circuitBreaker = new CircuitBreaker({
  failureThreshold: 0.2, // 20%
  timeout: 30000 // 30s
});

const result = await circuitBreaker.execute(async () => {
  return await processLane(laneId);
});

if (circuitBreaker.isOpen()) {
  await alert('lane_circuit_breaker_open', { laneId });
}
```

## **📋 Quick Checklist**

### **Before Every Operation**
- [ ] Check feature flags
- [ ] Validate inputs (Zod)
- [ ] Use idempotency keys
- [ ] Check RBAC permissions
- [ ] Include company_id scope

### **During Operation**
- [ ] Create spans with proper naming
- [ ] Write to outbox for side-effects
- [ ] Redact PII in logs
- [ ] Handle errors gracefully

### **After Operation**
- [ ] Check success criteria
- [ ] Update metrics
- [ ] Send alerts if needed
- [ ] End spans properly

## **🎯 Success Metrics**

### **Operational**
- Uptime: ≥99.95%
- Success Rate: ≥98%
- P95 Latency: ≤2.5s
- Quarantine Rate: <1%

### **Business**
- Quote-to-book: ≥85%
- On-time delivery: ≥95%
- Invoice accuracy: ≥99%
- Customer satisfaction: ≥4.5/5

---

**🎯 This quick reference enables autonomous agents to operate efficiently while maintaining security, compliance, and operational excellence.**
