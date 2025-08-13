# PR-104: Agent Logs Partitioning + Hot Indexes

## 🚀 **Deployment Steps**

### **1. Pre-deployment Check**
```bash
# Verify source table exists
psql "$SUPABASE_DB_URL" -c "SELECT COUNT(*) FROM public.agent_logs LIMIT 1;"

# Check current table size (for backfill planning)
psql "$SUPABASE_DB_URL" -c "
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE tablename = 'agent_logs';
"
```

### **2. Deploy Migration**
```bash
# Deploy the partitioning migration
supabase db push

# Monitor the migration (may take time for large backfills)
# Check logs: supabase db logs
```

### **3. Verify Partitioning**
```sql
-- 1) Check table structure
SELECT 
  schemaname,
  tablename,
  tabletype,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size
FROM pg_tables 
WHERE tablename LIKE 'agent_logs%'
ORDER BY tablename;

-- 2) Verify partitions exist
SELECT 
  parent.relname as parent_table,
  child.relname as partition_name,
  pg_get_expr(child.relpartbound, child.oid) as partition_expression
FROM pg_inherits
JOIN pg_class parent ON pg_inherits.inhparent = parent.oid
JOIN pg_class child ON pg_inherits.inhrelid = child.oid
WHERE parent.relname = 'agent_logs'
ORDER BY child.relname;
```

### **4. Test Functionality**
```bash
# Test Realtime subscriptions still work
# (Your Live Feed should continue streaming without changes)

# Test RLS policies
psql "$SUPABASE_DB_URL" -c "
-- Should work for company members
SELECT COUNT(*) FROM public.agent_logs 
WHERE company_id = 'your-company-id' 
  AND ts > NOW() - INTERVAL '1 hour';
"
```

## 🧪 **Verification Tests**

### **1. Partition Structure**
```sql
-- Verify monthly partitions exist
SELECT 
  c.relname as partition_name,
  pg_size_pretty(pg_total_relation_size(c.oid)) as size,
  pg_stat_get_live_tuples(c.oid) as live_tuples
FROM pg_class c
JOIN pg_inherits i ON i.inhrelid = c.oid
JOIN pg_class p ON p.oid = i.inhparent
WHERE p.relname = 'agent_logs'
  AND c.relname LIKE 'agent_logs_%'
ORDER BY c.relname;
```

### **2. Index Verification**
```sql
-- Check hot indexes on partitions
SELECT 
  schemaname,
  tablename,
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename LIKE 'agent_logs_%'
  AND indexname LIKE 'idx_%'
ORDER BY tablename, indexname;
```

### **3. Performance Tests**
```sql
-- Hot path: single tenant, last hour
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM public.agent_logs
WHERE company_id = '00000000-0000-4000-8000-000000000001'
  AND ts > NOW() - INTERVAL '1 hour'
ORDER BY ts DESC 
LIMIT 200;

-- Task drill down
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM public.agent_logs 
WHERE task_id = 'some-task-uuid'
ORDER BY ts DESC;
```

### **4. Rotation Job**
```sql
-- Check cron job exists
SELECT 
  jobid,
  jobname,
  schedule,
  active
FROM cron.job 
WHERE jobname = 'agent_logs_rotate_daily';

-- Test rotation function manually
SELECT public._agent_logs_rotate();
```

## 📊 **Monitoring Queries**

### **Partition Health**
```sql
-- Partition sizes and row counts
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) as size,
  pg_stat_get_live_tuples((schemaname||'.'||tablename)::regclass) as live_tuples,
  pg_stat_get_dead_tuples((schemaname||'.'||tablename)::regclass) as dead_tuples
FROM pg_tables 
WHERE tablename LIKE 'agent_logs_%'
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

### **Write Volume by Partition**
```sql
-- Recent write activity by partition
SELECT 
  to_char(date_trunc('month', ts), 'YYYY-MM') as month,
  COUNT(*) as log_count,
  COUNT(DISTINCT company_id) as active_companies
FROM public.agent_logs
WHERE ts >= NOW() - INTERVAL '6 months'
GROUP BY date_trunc('month', ts)
ORDER BY month DESC;
```

### **Query Performance**
```sql
-- Slow queries (if you have pg_stat_statements)
SELECT 
  query,
  calls,
  total_time,
  mean_time,
  rows
FROM pg_stat_statements
WHERE query LIKE '%agent_logs%'
ORDER BY mean_time DESC
LIMIT 10;
```

## 🔧 **Operational Commands**

### **Manual Partition Creation**
```sql
-- Create partition for specific month
SELECT public._ensure_agent_logs_month_part('2024-02-01'::date);

-- Check partition exists
SELECT tablename FROM pg_tables WHERE tablename = 'agent_logs_202402';
```

### **Partition Cleanup**
```sql
-- Manual cleanup of old partitions
SELECT public._agent_logs_rotate();

-- Check what would be dropped
SELECT 
  c.relname,
  to_date(substring(c.relname from 'agent_logs_(\d{6})'), 'YYYYMM') as partition_date
FROM pg_class c
JOIN pg_inherits i ON i.inhrelid = c.oid
JOIN pg_class p ON p.oid = i.inhparent
WHERE p.relname = 'agent_logs'
  AND c.relname LIKE 'agent_logs_%'
  AND to_date(substring(c.relname from 'agent_logs_(\d{6})'), 'YYYYMM') < NOW() - INTERVAL '13 months';
```

### **Backfill Status**
```sql
-- Check if backfill completed
SELECT 
  (SELECT COUNT(*) FROM public.agent_logs) as current_count,
  (SELECT COUNT(*) FROM public.agent_logs_legacy) as legacy_count;

-- Compare random samples
SELECT 
  'current' as source,
  COUNT(*) as count
FROM public.agent_logs 
WHERE ts >= NOW() - INTERVAL '1 day'
UNION ALL
SELECT 
  'legacy' as source,
  COUNT(*) as count
FROM public.agent_logs_legacy 
WHERE ts >= NOW() - INTERVAL '1 day';
```

## 🚨 **Troubleshooting**

### **Common Issues**

1. **Migration Fails on Large Tables**
   ```sql
   -- For very large tables, run backfill in chunks
   INSERT INTO public.agent_logs_p (id, task_id, company_id, ts, level, msg, meta)
   SELECT id, task_id, company_id, ts, level, msg, meta
   FROM public.agent_logs
   WHERE ts >= '2024-01-01' AND ts < '2024-02-01'
   ON CONFLICT DO NOTHING;
   ```

2. **Partition Not Created**
   ```sql
   -- Manual partition creation
   SELECT public._ensure_agent_logs_month_part(date_trunc('month', NOW())::date);
   
   -- Check partition exists
   SELECT tablename FROM pg_tables WHERE tablename LIKE 'agent_logs_%';
   ```

3. **RLS Policy Issues**
   ```sql
   -- Verify policies exist
   SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
   FROM pg_policies 
   WHERE tablename = 'agent_logs';
   
   -- Test RLS
   SET ROLE none;
   SELECT COUNT(*) FROM public.agent_logs LIMIT 1;
   ```

4. **Realtime Not Working**
   ```sql
   -- Check publication
   SELECT * FROM pg_publication_tables WHERE tablename = 'agent_logs';
   
   -- Re-add if missing
   ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_logs;
   ```

### **Performance Issues**

1. **Slow Queries**
   ```sql
   -- Check if queries use partitions
   EXPLAIN (ANALYZE, BUFFERS)
   SELECT * FROM public.agent_logs 
   WHERE company_id = 'test-company'
     AND ts > NOW() - INTERVAL '1 hour';
   
   -- Look for "Partition pruning" in explain output
   ```

2. **Index Issues**
   ```sql
   -- Check index usage
   SELECT 
     schemaname,
     tablename,
     indexname,
     idx_scan,
     idx_tup_read,
     idx_tup_fetch
   FROM pg_stat_user_indexes
   WHERE tablename LIKE 'agent_logs_%'
   ORDER BY idx_scan DESC;
   ```

## ✅ **Success Criteria**

- [ ] Migration completes without errors
- [ ] Partitions created for current and adjacent months
- [ ] Hot indexes exist on all partitions
- [ ] RLS policies work correctly
- [ ] Realtime subscriptions continue working
- [ ] Query performance improves or stays stable
- [ ] Rotation cron job is scheduled
- [ ] Legacy table preserved as backup

## 🔄 **Rollback Plan**

### **Quick Rollback**
```sql
-- Swap back to legacy table (brief lock)
ALTER TABLE public.agent_logs RENAME TO agent_logs_partitioned;
ALTER TABLE public.agent_logs_legacy RENAME TO agent_logs;

-- Re-add to publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_logs;
```

### **Clean Rollback**
```sql
-- After confirming rollback works
DROP TABLE IF EXISTS public.agent_logs_partitioned CASCADE;
DROP FUNCTION IF EXISTS public._ensure_agent_logs_month_part(date);
DROP FUNCTION IF EXISTS public._agent_logs_rotate();

-- Remove cron job
SELECT cron.unschedule('agent_logs_rotate_daily');
```

## 📈 **Performance Expectations**

### **Before Partitioning**
- Large table scans for time-range queries
- Index bloat on single table
- VACUUM/ANALYZE on entire table

### **After Partitioning**
- Partition pruning for time-range queries
- Isolated index maintenance per partition
- Faster VACUUM/ANALYZE per partition
- Automatic partition rotation

### **Expected Improvements**
- **Query Performance**: 2-10x faster for time-range queries
- **Maintenance**: Isolated bloat per partition
- **Storage**: Automatic cleanup of old partitions
- **Scalability**: Linear scaling with partition count

## 🎯 **Next Steps**

### **Immediate Enhancements**
1. **Storage Dashboard**: Add partition size monitoring to Super-Admin UI
2. **Write Volume Tracking**: Monitor per-tenant log volume
3. **Performance Alerts**: Set up slow query monitoring

### **Future PRs**
- **PR-105**: OpenTelemetry traces (observability)
- **PR-106**: CI secure-by-default (security automation)
- **PR-107**: DR drills (reliability validation)

---

**Ready for PR-105?** Just say "ship PR-105" and I'll drop the OpenTelemetry traces bundle! 🚀
