import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 5 },   // Ramp up to 5 users
    { duration: '1m', target: 5 },    // Stay at 5 users
    { duration: '30s', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_failed: ['rate<0.02'],      // Less than 2% of requests should fail
    http_req_duration: ['p(95)<2500'],   // 95% of requests should be below 2.5s
    http_req_rate: ['rate>1'],           // Should handle at least 1 request per second
  },
};

const BASE_URL = 'http://localhost:8080';

export default function () {
  // Test 1: Status endpoint
  const statusResponse = http.get(`${BASE_URL}/api/website-builder/status`);
  check(statusResponse, {
    'status endpoint returns 200': (r) => r.status === 200,
    'status response has operational field': (r) => r.json('operational') !== undefined,
    'status response has pagesBuilt field': (r) => r.json('pagesBuilt') !== undefined,
    'status response has avgSeoScore field': (r) => r.json('avgSeoScore') !== undefined,
  });

  // Test 2: Metrics endpoint
  const metricsResponse = http.get(`${BASE_URL}/api/website-builder/metrics`);
  check(metricsResponse, {
    'metrics endpoint returns 200': (r) => r.status === 200,
    'metrics response has pagesBuilt field': (r) => r.json('pagesBuilt') >= 0,
    'metrics response has avgBuildMs field': (r) => r.json('avgBuildMs') >= 0,
    'metrics response has avgSeoScore field': (r) => r.json('avgSeoScore') >= 0,
    'metrics response has eventsLast60s field': (r) => r.json('eventsLast60s') >= 0,
  });

  // Test 3: Pause endpoint (POST)
  const pauseResponse = http.post(`${BASE_URL}/api/website-builder/pause`);
  check(pauseResponse, {
    'pause endpoint returns 200': (r) => r.status === 200,
    'pause response has success field': (r) => r.json('success') !== undefined,
    'pause response has message field': (r) => r.json('message') !== undefined,
  });

  // Test 4: Resume endpoint (POST)
  const resumeResponse = http.post(`${BASE_URL}/api/website-builder/resume`);
  check(resumeResponse, {
    'resume endpoint returns 200': (r) => r.status === 200,
    'resume response has success field': (r) => r.json('success') !== undefined,
    'resume response has message field': (r) => r.json('message') !== undefined,
  });

  // Test 5: Build page endpoint (POST)
  const buildPayload = JSON.stringify({
    type: 'home',
    priority: 5,
    seed: 'k6-test-' + Date.now()
  });
  
  const buildResponse = http.post(`${BASE_URL}/api/website-builder/build`, buildPayload, {
    headers: { 'Content-Type': 'application/json' },
  });
  
  check(buildResponse, {
    'build endpoint returns 200': (r) => r.status === 200,
    'build response has success field': (r) => r.json('success') !== undefined,
    'build response has message field': (r) => r.json('message') !== undefined,
  });

  // Test 6: Health check - verify system is operational
  const healthResponse = http.get(`${BASE_URL}/api/website-builder/status`);
  check(healthResponse, {
    'system is operational': (r) => r.json('operational') === true,
    'pages built count is reasonable': (r) => r.json('pagesBuilt') >= 0 && r.json('pagesBuilt') < 1000,
    'SEO score is reasonable': (r) => r.json('avgSeoScore') >= 0 && r.json('avgSeoScore') <= 100,
    'build time is reasonable': (r) => r.json('avgBuildMs') >= 0 && r.json('avgBuildMs') < 30000,
  });

  // Test 7: Performance check - verify response times
  const perfResponse = http.get(`${BASE_URL}/api/website-builder/metrics`);
  check(perfResponse, {
    'metrics response time is fast': (r) => r.timings.duration < 1000,
    'metrics response has all required fields': (r) => {
      const data = r.json();
      return data.pagesBuilt !== undefined && 
             data.pagesInProgress !== undefined && 
             data.avgBuildMs !== undefined && 
             data.avgSeoScore !== undefined;
    },
  });

  // Test 8: Error handling - test with invalid payload
  const invalidPayload = JSON.stringify({
    type: 'invalid-type',
    priority: 999,
    seed: ''
  });
  
  const errorResponse = http.post(`${BASE_URL}/api/website-builder/build`, invalidPayload, {
    headers: { 'Content-Type': 'application/json' },
  });
  
  check(errorResponse, {
    'error handling works': (r) => r.status === 400 || r.status === 422 || r.json('success') === false,
  });

  // Test 9: Concurrent operations - test multiple simultaneous requests
  const concurrentRequests = [
    { url: `${BASE_URL}/api/website-builder/status`, method: 'GET' },
    { url: `${BASE_URL}/api/website-builder/metrics`, method: 'GET' },
    { url: `${BASE_URL}/api/website-builder/status`, method: 'GET' },
  ];
  
  const responses = http.batch(concurrentRequests);
  
  check(responses, {
    'concurrent requests all succeed': (r) => r.every(resp => resp.status === 200),
    'concurrent response times are reasonable': (r) => r.every(resp => resp.timings.duration < 2000),
  });

  // Test 10: Load test - verify system can handle sustained load
  const loadResponse = http.get(`${BASE_URL}/api/website-builder/status`);
  check(loadResponse, {
    'load test passes': (r) => r.status === 200 && r.timings.duration < 1500,
    'system remains stable under load': (r) => r.json('operational') === true,
  });

  sleep(1); // Wait 1 second between iterations
}

// Custom metrics for monitoring
export function handleSummary(data) {
  return {
    'k6-website-builder-results.json': JSON.stringify({
      timestamp: new Date().toISOString(),
      metrics: {
        http_req_duration: {
          avg: data.metrics.http_req_duration.values.avg,
          p95: data.metrics.http_req_duration.values['p(95)'],
          p99: data.metrics.http_req_duration.values['p(99)'],
        },
        http_req_failed: data.metrics.http_req_failed.values.rate,
        http_req_rate: data.metrics.http_req_rate.values.rate,
        iterations: data.metrics.iterations.values.count,
        vus: data.metrics.vus.values.value,
      },
      thresholds: {
        http_req_failed_passed: data.metrics.http_req_failed.thresholds['rate<0.02'].ok,
        http_req_duration_passed: data.metrics.http_req_duration.thresholds['p(95)<2500'].ok,
        http_req_rate_passed: data.metrics.http_req_rate.thresholds['rate>1'].ok,
      },
      summary: {
        total_requests: data.metrics.http_req_count.values.count,
        failed_requests: data.metrics.http_req_failed.values.count,
        success_rate: (1 - data.metrics.http_req_failed.values.rate) * 100,
        avg_response_time: data.metrics.http_req_duration.values.avg,
        p95_response_time: data.metrics.http_req_duration.values['p(95)'],
      }
    }),
  };
}
