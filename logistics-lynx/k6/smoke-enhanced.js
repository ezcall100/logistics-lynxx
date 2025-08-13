import http from 'k6/http';
import { sleep, check } from 'k6';
import { Rate, Trend, Counter } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');
const dashboardLoadTime = new Trend('dashboard_load_time');
const apiResponseTime = new Trend('api_response_time');
const outboxLagTime = new Trend('outbox_lag_seconds');
const dlqCount = new Counter('dlq_items_count');
const agentSuccessRate = new Rate('agent_success_rate');

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 5 },   // Ramp up to 5 users
    { duration: '1m', target: 5 },    // Stay at 5 users
    { duration: '30s', target: 10 },  // Ramp up to 10 users
    { duration: '1m', target: 10 },   // Stay at 10 users
    { duration: '30s', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    // HTTP: crisp thresholds to fail fast
    http_req_duration: ['p(95)<2500'],    // 95% of requests must complete below 2.5s
    http_req_failed: ['rate<0.02'],       // Error rate must be less than 2%
    errors: ['rate<0.02'],                // Custom error rate
    
    // Dashboard performance
    dashboard_load_time: ['p(95)<2000'],  // Dashboard load time under 2s
    
    // Outbox lag: custom metric thresholds
    outbox_lag_seconds: ['avg<2', 'p(95)<5'],  // Outbox lag < 2s avg, < 5s p95
    
    // Agent SLO: success ≥ 98% over the test window
    agent_success_rate: ['rate>0.98'],    // Agent success rate above 98%
    
    // DLQ: size delta after run === 0 (or below tolerance)
    dlq_items_count: ['count<10'],        // DLQ items count below threshold
  },
};

// Test data
const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080';
const SUPABASE_URL = __ENV.SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = __ENV.SUPABASE_ANON_KEY || 'your-anon-key';
const TEST_COMPANY_ID = __ENV.TEST_COMPANY_ID || '00000000-0000-4000-8000-000000000001';

export default function () {
  const startTime = Date.now();
  
  // Test 1: Dashboard page load
  const dashboardRes = http.get(`${BASE_URL}/`);
  const dashboardLoadDuration = Date.now() - startTime;
  
  check(dashboardRes, {
    'dashboard loads successfully': (r) => r.status === 200,
    'dashboard contains expected content': (r) => r.body.includes('Logistics Lynx') || r.body.includes('Dashboard'),
    'dashboard loads fast': (r) => r.timings.duration < 2000,
  });
  
  dashboardLoadTime.add(dashboardLoadDuration);
  errorRate.add(dashboardRes.status !== 200);
  
  sleep(1);
  
  // Test 2: API endpoints health check
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
  
  // Test 3: Outbox lag verification (every 10th request)
  if (__ENV.TEST_OUTBOX === 'true' && Math.random() < 0.1) {
    const outboxLag = await checkOutboxLag();
    if (outboxLag !== null) {
      outboxLagTime.add(outboxLag);
    }
  }
  
  // Test 4: DLQ health check (every 20th request)
  if (__ENV.TEST_DLQ === 'true' && Math.random() < 0.05) {
    const dlqHealth = await checkDLQHealth();
    if (dlqHealth !== null) {
      dlqCount.add(dlqHealth.count);
    }
  }
  
  // Test 5: Agent success rate check (every 15th request)
  if (__ENV.TEST_AGENTS === 'true' && Math.random() < 0.07) {
    const agentHealth = await checkAgentSuccessRate();
    if (agentHealth !== null) {
      agentSuccessRate.add(agentHealth.success_rate);
    }
  }
  
  sleep(1);
}

// Helper function to check outbox lag
async function checkOutboxLag() {
  try {
    const response = http.get(`${SUPABASE_URL}/rest/v1/event_outbox?select=inserted_at&processed_at=is.null&order=inserted_at.asc&limit=1`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200 && response.body) {
      const data = JSON.parse(response.body);
      if (data && data.length > 0) {
        const insertedAt = new Date(data[0].inserted_at);
        const now = new Date();
        const lagSeconds = (now - insertedAt) / 1000;
        return lagSeconds;
      }
    }
    return null;
  } catch (error) {
    console.error('Outbox lag check failed:', error);
    return null;
  }
}

// Helper function to check DLQ health
async function checkDLQHealth() {
  try {
    const response = http.get(`${SUPABASE_URL}/rest/v1/dead_letter_queue?select=count&created_at=gte.${new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()}`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200 && response.body) {
      const data = JSON.parse(response.body);
      return { count: data.length };
    }
    return null;
  } catch (error) {
    console.error('DLQ health check failed:', error);
    return null;
  }
}

// Helper function to check agent success rate
async function checkAgentSuccessRate() {
  try {
    const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const response = http.get(`${SUPABASE_URL}/rest/v1/agent_tasks?select=status&updated_at=gte.${fifteenMinutesAgo}`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (response.status === 200 && response.body) {
      const data = JSON.parse(response.body);
      const completed = data.filter(task => task.status === 'completed').length;
      const failed = data.filter(task => task.status === 'failed').length;
      const total = completed + failed;
      
      if (total > 0) {
        const successRate = completed / total;
        return { success_rate: successRate };
      }
    }
    return null;
  } catch (error) {
    console.error('Agent success rate check failed:', error);
    return null;
  }
}

// Post-test verification (runs once at the end)
export function handleSummary(data) {
  // Check if any critical thresholds were breached
  const criticalIssues = [];
  
  if (data.metrics.outbox_lag_seconds?.values?.p95 > 2) {
    criticalIssues.push('Outbox lag exceeded 2 seconds');
  }
  
  if (data.metrics.agent_success_rate?.values?.rate < 0.98) {
    criticalIssues.push('Agent success rate below 98%');
  }
  
  if (data.metrics.dlq_items_count?.values?.count > 10) {
    criticalIssues.push('DLQ items count too high');
  }
  
  if (criticalIssues.length > 0) {
    console.error('🚨 CRITICAL ISSUES DETECTED:', criticalIssues.join(', '));
    
    // In a real deployment, this would trigger an incident
    if (__ENV.SLACK_WEBHOOK_URL) {
      http.post(__ENV.SLACK_WEBHOOK_URL, JSON.stringify({
        text: '🚨 Post-deploy verification failed',
        attachments: [{
          color: 'danger',
          fields: criticalIssues.map(issue => ({
            title: 'Issue',
            value: issue,
            short: false
          }))
        }]
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }
  
  return {
    'stdout': JSON.stringify(data, null, 2),
    [`smoke-test-${new Date().toISOString().split('T')[0]}.json`]: JSON.stringify(data, null, 2)
  };
}
