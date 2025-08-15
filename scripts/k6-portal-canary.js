import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const portalP95 = new Trend('portal_p95_ms');
const portalSuccessRate = new Rate('portal_success_rate');
const portalErrorRate = new Rate('portal_error_rate');

// Portal configuration
const portals = [
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

// Test configuration
export const options = {
  stages: [
    { duration: '1m', target: 1 }, // Warm up
    { duration: '5m', target: 1 }, // Steady state
    { duration: '1m', target: 0 }  // Cool down
  ],
  thresholds: {
    'portal_p95_ms': ['p(95)<2500'], // p95 must be under 2.5s
    'portal_success_rate': ['rate>0.98'], // Success rate must be >98%
    'portal_error_rate': ['rate<0.02'], // Error rate must be <2%
    'http_req_duration': ['p(95)<3000'], // HTTP requests p95 <3s
    'http_req_failed': ['rate<0.02'] // HTTP failure rate <2%
  },
  ext: {
    loadimpact: {
      distribution: {
        'Portal Canary Test': { loadZone: 'amazon:us:ashburn', percent: 100 }
      }
    }
  }
};

// Test setup
export function setup() {
  const baseUrl = __ENV.PROD_HOST || 'http://localhost:3000';
  console.log(`🚀 Starting portal canary test against: ${baseUrl}`);
  
  // Test health endpoint first
  const healthResponse = http.get(`${baseUrl}/healthz`);
  check(healthResponse, {
    'health endpoint is accessible': (r) => r.status === 200,
    'health response time < 1s': (r) => r.timings.duration < 1000
  });

  return { baseUrl };
}

// Main test function
export default function(data) {
  const { baseUrl } = data;
  
  // Test each portal in parallel (1 VU per portal)
  const portalKey = __ENV.PORTAL_KEY || 'dashboard';
  const portal = portals.find(p => p.key === portalKey) || portals[0];
  
  // Generate trace ID for observability
  const traceId = `k6-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  
  // Set headers for tracing and monitoring
  const headers = {
    'User-Agent': 'K6-Portal-Canary/1.0',
    'X-Trace-ID': traceId,
    'X-Test-Type': 'portal-canary',
    'X-Portal-Key': portal.key
  };

  // Make request to portal
  const startTime = Date.now();
  const response = http.get(`${baseUrl}${portal.url}`, { headers });
  const totalTime = Date.now() - startTime;

  // Record custom metrics
  portalP95.add(totalTime);
  portalSuccessRate.add(response.status === 200);
  portalErrorRate.add(response.status !== 200);

  // Comprehensive checks
  const checks = check(response, {
    'portal is accessible': (r) => r.status === 200,
    'response time < expected p95': (r) => r.timings.duration < portal.expected_p95,
    'response time < 2.5s': (r) => r.timings.duration < 2500,
    'response has content': (r) => r.body.length > 0,
    'response is HTML': (r) => r.headers['Content-Type'] && r.headers['Content-Type'].includes('text/html'),
    'no server errors': (r) => r.status < 500,
    'no client errors': (r) => r.status < 400 || r.status >= 500
  });

  // Log detailed metrics for analysis
  if (response.status !== 200 || response.timings.duration > portal.expected_p95) {
    console.log(`⚠️ Portal ${portal.key} performance issue:`, {
      status: response.status,
      duration: response.timings.duration,
      expected_p95: portal.expected_p95,
      trace_id: traceId,
      timestamp: new Date().toISOString()
    });
  }

  // Add tags for better analysis
  response.tags = {
    portal: portal.key,
    test_type: 'canary',
    trace_id: traceId,
    expected_p95: portal.expected_p95
  };

  // Small delay between requests to avoid overwhelming the system
  sleep(1);
}

// Teardown function
export function teardown(data) {
  console.log('🏁 Portal canary test completed');
  
  // Log final metrics
  console.log('📊 Final Metrics:');
  console.log(`- Portal P95: ${portalP95.value}`);
  console.log(`- Success Rate: ${portalSuccessRate.value}`);
  console.log(`- Error Rate: ${portalErrorRate.value}`);
}

// Handle test failures
export function handleSummary(data) {
  const { metrics, root_group } = data;
  
  // Check if any thresholds were breached
  const p95Breached = metrics.portal_p95_ms?.values?.p95 > 2500;
  const successRateBreached = metrics.portal_success_rate?.value < 0.98;
  const errorRateBreached = metrics.portal_error_rate?.value > 0.02;
  
  if (p95Breached || successRateBreached || errorRateBreached) {
    console.error('❌ Portal canary test FAILED - thresholds breached');
    console.error(`- P95 breached: ${p95Breached}`);
    console.error(`- Success rate breached: ${successRateBreached}`);
    console.error(`- Error rate breached: ${errorRateBreached}`);
    
    // Exit with error code for CI/CD integration
    process.exit(1);
  }
  
  console.log('✅ Portal canary test PASSED - all thresholds met');
  
  return {
    'stdout': JSON.stringify(data, null, 2),
    [`artifacts/k6-portal-canary-${new Date().toISOString().replace(/[:.]/g, '-')}.json`]: JSON.stringify(data, null, 2)
  };
}
