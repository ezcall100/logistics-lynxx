import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate, Trend } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const dashboardLoadTime = new Trend('dashboard_load_time');
const apiResponseTime = new Trend('api_response_time');

// Test configuration
export const options = {
  stages: [
    { duration: '1m', target: 10 },  // Ramp up to 10 users
    { duration: '3m', target: 10 },  // Stay at 10 users
    { duration: '1m', target: 20 },  // Ramp up to 20 users
    { duration: '3m', target: 20 },  // Stay at 20 users
    { duration: '1m', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<400'], // 95% of requests must complete below 400ms
    http_req_failed: ['rate<0.01'],   // Error rate must be less than 1%
    errors: ['rate<0.01'],            // Custom error rate
    dashboard_load_time: ['p(95)<2000'], // Dashboard load time under 2s
  },
};

// Test data
const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';
const TEST_ROLES = ['super_admin', 'carrier_admin', 'driver', 'shipper_admin'];

export default function () {
  const startTime = Date.now();
  
  // Test 1: Dashboard page load
  const dashboardRes = http.get(`${BASE_URL}/`);
  const dashboardLoadDuration = Date.now() - startTime;
  
  check(dashboardRes, {
    'dashboard loads successfully': (r) => r.status === 200,
    'dashboard contains expected content': (r) => r.body.includes('Logistics Lynx Dashboard'),
    'dashboard loads fast': (r) => r.timings.duration < 2000,
  });
  
  dashboardLoadTime.add(dashboardLoadDuration);
  errorRate.add(dashboardRes.status !== 200);
  
  sleep(1);
  
  // Test 2: API endpoints (if using Supabase)
  if (__ENV.TEST_API === 'true') {
    const apiStartTime = Date.now();
    
    // Test KPI data endpoint
    const kpiRes = http.get(`${BASE_URL}/api/kpis?role=super_admin`);
    const apiDuration = Date.now() - apiStartTime;
    
    check(kpiRes, {
      'API returns 200': (r) => r.status === 200,
      'API response is JSON': (r) => r.headers['Content-Type']?.includes('application/json'),
      'API response time acceptable': (r) => r.timings.duration < 500,
    });
    
    apiResponseTime.add(apiDuration);
    errorRate.add(kpiRes.status !== 200);
    
    sleep(0.5);
  }
  
  // Test 3: Role-specific content
  const randomRole = TEST_ROLES[Math.floor(Math.random() * TEST_ROLES.length)];
  
  // Simulate role switching (if implemented)
  const roleRes = http.get(`${BASE_URL}/?role=${randomRole}`);
  
  check(roleRes, {
    'role-specific content loads': (r) => r.status === 200,
    'role content contains expected data': (r) => r.body.includes(randomRole.replace('_', ' ')),
  });
  
  errorRate.add(roleRes.status !== 200);
  
  sleep(1);
  
  // Test 4: Search functionality (if implemented)
  const searchRes = http.get(`${BASE_URL}/?search=broker`);
  
  check(searchRes, {
    'search functionality works': (r) => r.status === 200,
    'search results contain expected content': (r) => r.body.includes('broker') || r.body.includes('Broker'),
  });
  
  errorRate.add(searchRes.status !== 200);
  
  sleep(1);
  
  // Test 5: Portal navigation
  const portalRes = http.get(`${BASE_URL}/broker`);
  
  check(portalRes, {
    'portal navigation works': (r) => r.status === 200 || r.status === 404, // 404 is acceptable for placeholder routes
    'portal page loads': (r) => r.timings.duration < 3000,
  });
  
  errorRate.add(portalRes.status >= 500); // Only count server errors
  
  sleep(2);
}

// Setup function (runs once before the test)
export function setup() {
  console.log(`🚀 Starting load test against: ${BASE_URL}`);
  console.log(`📊 Test configuration: ${JSON.stringify(options, null, 2)}`);
  
  // Verify the application is accessible
  const healthCheck = http.get(`${BASE_URL}/`);
  if (healthCheck.status !== 200) {
    throw new Error(`Application not accessible at ${BASE_URL}. Status: ${healthCheck.status}`);
  }
  
  console.log('✅ Application is accessible, starting load test...');
}

// Teardown function (runs once after the test)
export function teardown(data) {
  console.log('🏁 Load test completed');
  console.log(`📈 Final metrics:`);
  console.log(`   - Error rate: ${errorRate.value}`);
  console.log(`   - Dashboard load time (p95): ${dashboardLoadTime.value}`);
  console.log(`   - API response time (p95): ${apiResponseTime.value}`);
}

// Handle test scenarios
export function handleSummary(data) {
  return {
    'k6-results.json': JSON.stringify(data),
    stdout: textSummary(data, { indent: ' ', enableColors: true }),
  };
}
