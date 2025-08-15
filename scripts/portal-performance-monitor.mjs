#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';

const PROD_HOST = process.env.PROD_HOST;
const SUPABASE_DB_URL = process.env.SUPABASE_DB_URL;

if (!PROD_HOST || !SUPABASE_DB_URL) {
  console.error('Missing PROD_HOST or SUPABASE_DB_URL environment variables');
  process.exit(1);
}

// Portal Performance Monitoring System
class PortalPerformanceMonitor {
  constructor() {
    this.portals = [
      { key: 'dashboard', url: '/', expected_p95: 1000 },
      { key: 'broker', url: '/broker', expected_p95: 1500 },
      { key: 'carrier', url: '/carrier', expected_p95: 1500 },
      { key: 'driver', url: '/driver', expected_p95: 1200 },
      { key: 'shipper', url: '/shipper', expected_p95: 1500 },
      { key: 'admin', url: '/admin', expected_p95: 2000 },
      { key: 'super-admin', url: '/super-admin', expected_p95: 2500 },
      { key: 'analytics', url: '/analytics', expected_p95: 1800 },
      { key: 'autonomous', url: '/autonomous', expected_p95: 2200 }
    ];
    
    this.sliEvents = [];
    this.alertThresholds = {
      p95_ms: 2500,
      success_pct: 98,
      error_rate: 2
    };
  }

  // Generate SLI event for portal access
  generateSLIEvent(portalKey, mode, coldStart, cacheHit, authMs, apiMs, renderMs, totalMs, success, errorCode, traceId) {
    return {
      ts: new Date().toISOString(),
      agent_id: `monitor-${Date.now()}`,
      portal_key: portalKey,
      mode: mode,
      cold_start: coldStart,
      cache_hit: cacheHit,
      auth_ms: authMs,
      api_ms: apiMs,
      render_ms: renderMs,
      total_ms: totalMs,
      success: success,
      error_code: errorCode,
      trace_id: traceId
    };
  }

  // Test portal access and record metrics
  async testPortalAccess(portal, mode = 'parallel') {
    const startTime = Date.now();
    const traceId = `trace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    try {
      // Simulate auth time
      const authStart = Date.now();
      await new Promise(resolve => setTimeout(resolve, Math.random() * 200 + 50));
      const authMs = Date.now() - authStart;

      // Simulate API call time
      const apiStart = Date.now();
      const response = execSync(`curl -fsS -o /dev/null -w "%{http_code}" "http://${PROD_HOST}${portal.url}"`, { 
        encoding: 'utf8',
        timeout: 10000 
      });
      const apiMs = Date.now() - apiStart;

      // Simulate render time
      const renderStart = Date.now();
      await new Promise(resolve => setTimeout(resolve, Math.random() * 300 + 100));
      const renderMs = Date.now() - renderStart;

      const totalMs = Date.now() - startTime;
      const success = response === '200';
      const errorCode = success ? null : response;

      // Generate SLI event
      const sliEvent = this.generateSLIEvent(
        portal.key,
        mode,
        false, // cold_start
        true,  // cache_hit
        authMs,
        apiMs,
        renderMs,
        totalMs,
        success,
        errorCode,
        traceId
      );

      this.sliEvents.push(sliEvent);

      return {
        portal: portal.key,
        total_ms: totalMs,
        success,
        error_code: errorCode,
        trace_id: traceId
      };

    } catch (error) {
      const totalMs = Date.now() - startTime;
      const sliEvent = this.generateSLIEvent(
        portal.key,
        mode,
        false,
        false,
        0,
        0,
        0,
        totalMs,
        false,
        'TIMEOUT',
        traceId
      );

      this.sliEvents.push(sliEvent);

      return {
        portal: portal.key,
        total_ms: totalMs,
        success: false,
        error_code: 'TIMEOUT',
        trace_id: traceId
      };
    }
  }

  // Run parallel portal access test
  async runParallelTest() {
    console.log('🚀 Running parallel portal access test...');
    
    const startTime = Date.now();
    const results = await Promise.all(
      this.portals.map(portal => this.testPortalAccess(portal, 'parallel'))
    );
    const totalTime = Date.now() - startTime;

    console.log(`✅ Parallel test completed in ${totalTime}ms`);
    return results;
  }

  // Run sequential portal access test
  async runSequentialTest() {
    console.log('🚶 Running sequential portal access test...');
    
    const results = [];
    for (const portal of this.portals) {
      const result = await this.testPortalAccess(portal, 'sequential');
      results.push(result);
      await new Promise(resolve => setTimeout(resolve, 100)); // Small delay between requests
    }

    console.log(`✅ Sequential test completed`);
    return results;
  }

  // Calculate p95 and other metrics
  calculateMetrics(results) {
    const portalMetrics = {};
    
    // Group by portal
    this.portals.forEach(portal => {
      const portalResults = results.filter(r => r.portal === portal.key);
      if (portalResults.length === 0) return;

      const responseTimes = portalResults.map(r => r.total_ms).sort((a, b) => a - b);
      const successCount = portalResults.filter(r => r.success).length;
      
      const p50 = responseTimes[Math.floor(responseTimes.length * 0.5)];
      const p95 = responseTimes[Math.floor(responseTimes.length * 0.95)];
      const avg = responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length;
      const successPct = (successCount / portalResults.length) * 100;

      portalMetrics[portal.key] = {
        n: portalResults.length,
        p50_ms: Math.round(p50),
        p95_ms: Math.round(p95),
        avg_ms: Math.round(avg),
        success_pct: Math.round(successPct * 100) / 100,
        expected_p95: portal.expected_p95,
        status: p95 <= portal.expected_p95 && successPct >= this.alertThresholds.success_pct ? 'healthy' : 'degraded'
      };
    });

    return portalMetrics;
  }

  // Check for alerts
  checkAlerts(metrics) {
    const alerts = [];
    
    Object.entries(metrics).forEach(([portalKey, metric]) => {
      if (metric.p95_ms > this.alertThresholds.p95_ms) {
        alerts.push({
          type: 'p95_breach',
          portal: portalKey,
          value: metric.p95_ms,
          threshold: this.alertThresholds.p95_ms,
          severity: 'high'
        });
      }
      
      if (metric.success_pct < this.alertThresholds.success_pct) {
        alerts.push({
          type: 'success_rate_breach',
          portal: portalKey,
          value: metric.success_pct,
          threshold: this.alertThresholds.success_pct,
          severity: 'critical'
        });
      }
    });

    return alerts;
  }

  // Generate SQL for p95 analysis
  generateSQL() {
    return `
-- p95 + avg by portal (last 15m)
SELECT
  portal_key,
  COUNT(*) as n,
  ROUND(PERCENTILE_DISC(0.95) WITHIN GROUP (ORDER BY total_ms)) as p95_ms,
  ROUND(PERCENTILE_DISC(0.50) WITHIN GROUP (ORDER BY total_ms)) as p50_ms,
  ROUND(AVG(total_ms)) as avg_ms,
  ROUND(100.0 * SUM((success)::int)/COUNT(*),2) as success_pct,
  COUNT(CASE WHEN NOT success THEN 1 END) as error_count
FROM analytics.portal_access_events
WHERE ts > NOW() - INTERVAL '15 minutes'
GROUP BY 1
ORDER BY p95_ms DESC;

-- Alert rule check
SELECT
  portal_key,
  p95_ms,
  success_pct,
  CASE 
    WHEN p95_ms > 2500 OR success_pct < 98 THEN 'ALERT'
    ELSE 'HEALTHY'
  END as status
FROM (
  SELECT
    portal_key,
    ROUND(PERCENTILE_DISC(0.95) WITHIN GROUP (ORDER BY total_ms)) as p95_ms,
    ROUND(100.0 * SUM((success)::int)/COUNT(*),2) as success_pct
  FROM analytics.portal_access_events
  WHERE ts > NOW() - INTERVAL '15 minutes'
  GROUP BY 1
) metrics
WHERE p95_ms > 2500 OR success_pct < 98;
`;
  }

  // Save SLI events to file for analysis
  saveSLIEvents() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `artifacts/portal-sli-events-${timestamp}.json`;
    
    if (!fs.existsSync('artifacts')) {
      fs.mkdirSync('artifacts', { recursive: true });
    }
    
    fs.writeFileSync(filename, JSON.stringify(this.sliEvents, null, 2));
    console.log(`📊 SLI events saved to ${filename}`);
    return filename;
  }

  // Generate performance report
  generateReport(parallelResults, sequentialResults) {
    const parallelMetrics = this.calculateMetrics(parallelResults);
    const sequentialMetrics = this.calculateMetrics(sequentialResults);
    const alerts = this.checkAlerts(parallelMetrics);

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        total_portals: this.portals.length,
        parallel_test: {
          total_time_ms: parallelResults.reduce((sum, r) => sum + r.total_ms, 0),
          avg_response_time: Math.round(parallelResults.reduce((sum, r) => sum + r.total_ms, 0) / parallelResults.length),
          success_rate: Math.round((parallelResults.filter(r => r.success).length / parallelResults.length) * 100)
        },
        sequential_test: {
          total_time_ms: sequentialResults.reduce((sum, r) => sum + r.total_ms, 0),
          avg_response_time: Math.round(sequentialResults.reduce((sum, r) => sum + r.total_ms, 0) / sequentialResults.length),
          success_rate: Math.round((sequentialResults.filter(r => r.success).length / sequentialResults.length) * 100)
        }
      },
      portal_metrics: {
        parallel: parallelMetrics,
        sequential: sequentialMetrics
      },
      alerts,
      sli_events_count: this.sliEvents.length,
      sql_query: this.generateSQL()
    };

    return report;
  }

  // Run complete performance test
  async runPerformanceTest() {
    console.log('🔍 Starting comprehensive portal performance test...\n');

    try {
      // Run both test modes
      const parallelResults = await this.runParallelTest();
      const sequentialResults = await this.runSequentialTest();

      // Calculate metrics
      const report = this.generateReport(parallelResults, sequentialResults);

      // Display results
      console.log('\n📊 PORTAL PERFORMANCE RESULTS\n');
      console.log('='.repeat(60));
      
      console.log('\n🔄 PARALLEL ACCESS METRICS:');
      Object.entries(report.portal_metrics.parallel).forEach(([portal, metrics]) => {
        const status = metrics.status === 'healthy' ? '✅' : '❌';
        console.log(`${status} ${portal}: p95=${metrics.p95_ms}ms, success=${metrics.success_pct}%`);
      });

      console.log('\n🚶 SEQUENTIAL ACCESS METRICS:');
      Object.entries(report.portal_metrics.sequential).forEach(([portal, metrics]) => {
        const status = metrics.status === 'healthy' ? '✅' : '❌';
        console.log(`${status} ${portal}: p95=${metrics.p95_ms}ms, success=${metrics.success_pct}%`);
      });

      // Display alerts
      if (report.alerts.length > 0) {
        console.log('\n🚨 ALERTS:');
        report.alerts.forEach(alert => {
          console.log(`❌ ${alert.type.toUpperCase()}: ${alert.portal} - ${alert.value} (threshold: ${alert.threshold})`);
        });
      } else {
        console.log('\n✅ No alerts - all portals performing within SLOs');
      }

      // Save data
      const sliFile = this.saveSLIEvents();
      const reportFile = sliFile.replace('sli-events', 'performance-report');
      fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
      console.log(`📋 Performance report saved to ${reportFile}`);

      // Return status
      const hasAlerts = report.alerts.length > 0;
      console.log(`\n🎯 Overall Status: ${hasAlerts ? '❌ DEGRADED' : '✅ HEALTHY'}`);
      
      return {
        success: !hasAlerts,
        report,
        alerts: report.alerts
      };

    } catch (error) {
      console.error('❌ Performance test failed:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }
}

// Main execution
async function main() {
  const monitor = new PortalPerformanceMonitor();
  const result = await monitor.runPerformanceTest();
  
  if (!result.success) {
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(console.error);
}

export { PortalPerformanceMonitor };
