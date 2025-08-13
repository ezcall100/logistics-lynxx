import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

serve(async () => {
  const checks: any = { 
    db: 'green', 
    n8n: 'green', 
    openai: 'green',
    agent_runner: 'green',
    overall: 'green'
  };

  const startTime = Date.now();
  const errors: string[] = [];

  try {
    // Check database connectivity
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
    const { data, error } = await supabase.from('agent_functions').select('count').limit(1);
    
    if (error) {
      checks.db = 'red';
      errors.push(`Database error: ${error.message}`);
    } else {
      checks.db = 'green';
    }

  } catch (e) {
    checks.db = 'red';
    errors.push(`Database connection failed: ${e}`);
  }

  // Check n8n availability
  try {
    const n8nUrl = Deno.env.get("N8N_PING_URL");
    if (n8nUrl) {
      const n8n = await fetch(n8nUrl, { 
        method: 'GET',
        signal: AbortSignal.timeout(5000) // 5 second timeout
      });
      if (!n8n.ok) {
        checks.n8n = 'yellow';
        errors.push(`N8n returned status: ${n8n.status}`);
      }
    } else {
      checks.n8n = 'yellow';
      errors.push('N8N_PING_URL not configured');
    }
  } catch (e) {
    checks.n8n = 'red';
    errors.push(`N8n connection failed: ${e}`);
  }

  // Check OpenAI API
  try {
    const openaiKey = Deno.env.get("OPENAI_API_KEY");
    if (openaiKey) {
      const o = await fetch('https://api.openai.com/v1/models', { 
        headers: { Authorization: `Bearer ${openaiKey}` },
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });
      if (!o.ok) {
        checks.openai = 'yellow';
        errors.push(`OpenAI API returned status: ${o.status}`);
      }
    } else {
      checks.openai = 'yellow';
      errors.push('OPENAI_API_KEY not configured');
    }
  } catch (e) {
    checks.openai = 'red';
    errors.push(`OpenAI API failed: ${e}`);
  }

  // Check agent runner functionality
  try {
    const agentRunnerUrl = `${Deno.env.get("SUPABASE_URL")!}/functions/v1/agent-runner`;
    const runner = await fetch(agentRunnerUrl, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!}`
      },
      body: JSON.stringify({ test: true }),
      signal: AbortSignal.timeout(15000) // 15 second timeout
    });
    
    if (!runner.ok) {
      checks.agent_runner = 'yellow';
      errors.push(`Agent runner returned status: ${runner.status}`);
    }
  } catch (e) {
    checks.agent_runner = 'red';
    errors.push(`Agent runner failed: ${e}`);
  }

  // Determine overall status
  if (checks.db === 'red' || checks.agent_runner === 'red') {
    checks.overall = 'red';
  } else if (checks.n8n === 'red' || checks.openai === 'red') {
    checks.overall = 'yellow';
  } else if (Object.values(checks).some(c => c === 'yellow')) {
    checks.overall = 'yellow';
  }

  const responseTime = Date.now() - startTime;

  const healthData = {
    status: checks.overall,
    checks,
    errors: errors.length > 0 ? errors : undefined,
    response_time_ms: responseTime,
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    uptime: 'operational'
  };

  // Set appropriate status code
  const statusCode = checks.overall === 'red' ? 503 : checks.overall === 'yellow' ? 200 : 200;

  return new Response(JSON.stringify(healthData), { 
    status: statusCode, 
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'X-Health-Check': 'true'
    }
  });
});
