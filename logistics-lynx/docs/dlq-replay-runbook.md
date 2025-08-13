# 🔄 DLQ Replay Runbook
## Safe & Auditable Dead Letter Queue Recovery

### 🚨 **Emergency Response**

#### **When to Use DLQ Replay**
- **High DLQ volume**: >10 items per tenant in 5 minutes
- **Critical failures**: Agent success rate <95% for 10+ minutes  
- **Business impact**: Customer-facing features failing
- **Scheduled maintenance**: After upstream service recovery

#### **Pre-Replay Checklist**
1. ✅ **Confirm upstream health**: n8n, webhooks, external APIs responding
2. ✅ **Check pause status**: Ensure target company isn't paused
3. ✅ **Review error patterns**: Identify root cause before replay
4. ✅ **Notify stakeholders**: Alert ops team of replay operation
5. ✅ **Document incident**: Create incident ticket with replay plan

---

### 🛠️ **Replay Operations**

#### **1. Triage & Scope**
```bash
# Check DLQ health
curl -H "apikey: $SUPABASE_ANON_KEY" \
  "$SUPABASE_URL/rest/v1/dead_letter_queue?select=count&retry_count=gte.5"

# Identify hot tenants
curl -H "apikey: $SUPABASE_ANON_KEY" \
  "$SUPABASE_URL/rest/v1/dead_letter_queue?select=company_id,count&group=company_id&order=count.desc&limit=5"
```

#### **2. Dry Run (Always First)**
```bash
# Test replay without executing
curl -X POST https://your-project.supabase.co/functions/v1/dlq-replay \
  -H "Authorization: Bearer $ADMIN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "company_id": "00000000-0000-4000-8000-000000000001",
    "dry_run": true,
    "max": 25,
    "idempotency_key": "DRY-RUN-$(date +%s)"
  }'
```

**Expected Response:**
```json
{
  "message": "Dry run completed",
  "items_found": 15,
  "replay_run_id": "uuid-here",
  "preview": [
    {
      "id": "dlq-item-id",
      "company_id": "company-id", 
      "error_type": "timeout",
      "retry_count": 3
    }
  ]
}
```

#### **3. Execute Replay**
```bash
# Production replay with safety limits
curl -X POST https://your-project.supabase.co/functions/v1/dlq-replay \
  -H "Authorization: Bearer $ADMIN_JWT" \
  -H "Content-Type: application/json" \
  -d '{
    "company_id": "00000000-0000-4000-8000-000000000001",
    "max": 25,
    "idempotency_key": "INC-2025-01-13-001",
    "force": false
  }'
```

**Safety Parameters:**
- `max`: 25 items per batch (prevents overwhelming)
- `idempotency_key`: Unique incident identifier
- `force`: false (respects retry_after timestamps)

#### **4. Verify Results**
```bash
# Check replay run status
curl -H "apikey: $SUPABASE_ANON_KEY" \
  "$SUPABASE_URL/rest/v1/replay_runs?select=*&id=eq.$REPLAY_RUN_ID"

# Monitor outbox lag
curl -H "apikey: $SUPABASE_ANON_KEY" \
  "$SUPABASE_URL/rest/v1/event_outbox?select=inserted_at&processed_at=is.null&order=inserted_at.asc&limit=1"

# Check DLQ size
curl -H "apikey: $SUPABASE_ANON_KEY" \
  "$SUPABASE_URL/rest/v1/dead_letter_queue?select=count&retry_count=gte.5"
```

---

### 🔐 **Authentication Methods**

#### **Method 1: HMAC Signature (Recommended for Automation)**
```bash
# Generate HMAC signature
PAYLOAD='{"company_id":"company-id","max":25}'
SECRET="your-dlq-replay-secret"
SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "$SECRET" | cut -d' ' -f2)

# Make request with signature
curl -X POST https://your-project.supabase.co/functions/v1/dlq-replay \
  -H "X-Transbot-Signature: $SIGNATURE" \
  -H "Content-Type: application/json" \
  -d "$PAYLOAD"
```

#### **Method 2: JWT Token (For Manual Operations)**
```bash
# Get admin JWT token
ADMIN_JWT=$(curl -X POST https://your-project.supabase.co/auth/v1/token?grant_type=password \
  -H "apikey: $SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@company.com","password":"password"}' | jq -r '.access_token')

# Use JWT for replay
curl -X POST https://your-project.supabase.co/functions/v1/dlq-replay \
  -H "Authorization: Bearer $ADMIN_JWT" \
  -H "Content-Type: application/json" \
  -d '{"company_id":"company-id","max":25}'
```

---

### 📊 **Monitoring & Verification**

#### **Real-time Monitoring**
```sql
-- Monitor replay progress
SELECT 
  id,
  company_id,
  status,
  total_processed,
  successful,
  failed,
  created_at,
  completed_at
FROM replay_runs 
WHERE created_at >= NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;

-- Check DLQ health post-replay
SELECT 
  company_id,
  COUNT(*) AS dlq_items,
  COUNT(*) FILTER (WHERE retry_count >= max_retries) AS exhausted
FROM dead_letter_queue
WHERE created_at >= NOW() - INTERVAL '1 hour'
GROUP BY company_id
ORDER BY dlq_items DESC;
```

#### **Success Criteria**
- ✅ **Outbox lag stable**: <2s average, <5s p95
- ✅ **DLQ not growing**: Size remains stable or decreases
- ✅ **Agent success rate**: ≥98% over 15-minute window
- ✅ **Business metrics**: Customer-facing features working

#### **Failure Indicators**
- ❌ **High failure rate**: >20% immediate failures
- ❌ **Outbox lag spike**: >5s for 5+ minutes
- ❌ **DLQ growth**: Items accumulating faster than processing
- ❌ **Agent failures**: Success rate <95% for 10+ minutes

---

### 🚨 **Emergency Procedures**

#### **Stop Replay Immediately If:**
1. **High failure rate**: >20% immediate failures (automatic stop)
2. **System overload**: Outbox lag >10s for 5+ minutes
3. **Business impact**: Customer complaints or SLA breaches
4. **Security concern**: Unauthorized replay attempts

#### **Emergency Commands**
```bash
# Pause all agents for company
curl -X PATCH "$SUPABASE_URL/rest/v1/agent_controls" \
  -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"agents_paused": true}' \
  -H "Prefer: return=minimal"

# Check for active replays
curl -H "apikey: $SUPABASE_ANON_KEY" \
  "$SUPABASE_URL/rest/v1/replay_runs?select=*&status=eq.pending"
```

---

### 📝 **Documentation & Audit**

#### **Required Documentation**
1. **Incident ticket**: Root cause, impact, resolution
2. **Replay run ID**: For audit trail and verification
3. **Idempotency key**: Links replay to incident
4. **Results summary**: Success/failure counts, duration
5. **Business verification**: Customer impact assessment

#### **Audit Log Query**
```sql
-- Review replay operations
SELECT 
  actor,
  action,
  scope,
  target_count,
  success_count,
  failure_count,
  created_at,
  metadata
FROM audit_logs 
WHERE action = 'dlq_replay'
  AND created_at >= NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;
```

#### **Post-Incident Review**
- **Timeline**: When replay started, completed, verified
- **Effectiveness**: Success rate, business impact
- **Lessons learned**: What worked, what didn't
- **Process improvements**: How to prevent future incidents

---

### 🔧 **Troubleshooting**

#### **Common Issues**

**Rate Limit Exceeded**
```json
{
  "error": "Rate limit exceeded",
  "retry_after": 300
}
```
**Solution**: Wait for retry_after seconds, reduce batch size

**Unauthorized**
```json
{
  "error": "Unauthorized"
}
```
**Solution**: Check JWT token or HMAC signature

**Payload Too Large**
```json
{
  "error": "Payload too large (max 2MB)"
}
```
**Solution**: Reduce max parameter, split into smaller batches

**High Failure Rate**
```json
{
  "summary": {
    "total_processed": 25,
    "successful": 5,
    "failed": 20
  }
}
```
**Solution**: Investigate upstream issues before replaying

#### **Debug Commands**
```bash
# Check replay run details
curl -H "apikey: $SUPABASE_ANON_KEY" \
  "$SUPABASE_URL/rest/v1/replay_runs?select=*&id=eq.$REPLAY_RUN_ID"

# Check rate limit status
curl -H "apikey: $SUPABASE_ANON_KEY" \
  "$SUPABASE_URL/rest/v1/edge_rate_limits?select=*&key=eq.replay:company-id:ip"

# Review audit logs
curl -H "apikey: $SUPABASE_ANON_KEY" \
  "$SUPABASE_URL/rest/v1/audit_logs?select=*&action=eq.dlq_replay&order=created_at.desc&limit=10"
```

---

### 📋 **Checklist Template**

#### **Pre-Replay**
- [ ] Incident ticket created
- [ ] Upstream services healthy
- [ ] Company not paused
- [ ] Stakeholders notified
- [ ] Dry run completed successfully

#### **During Replay**
- [ ] Replay executed with idempotency key
- [ ] Monitoring dashboards active
- [ ] Success/failure rates tracked
- [ ] Business metrics verified

#### **Post-Replay**
- [ ] Replay run ID documented
- [ ] Results verified and recorded
- [ ] Business impact assessed
- [ ] Audit log reviewed
- [ ] Lessons learned documented

---

*This runbook ensures safe, auditable DLQ replay operations with proper controls and documentation.*
