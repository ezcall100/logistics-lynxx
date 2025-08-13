import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

interface AgentTask {
  id: string;
  company_id: string;
  fn_name: string;
  payload: any;
  attempts: number;
}

interface AgentResult {
  success: boolean;
  result?: any;
  error?: string;
}

// Agent function registry
const agentFunctions: Record<string, (payload: any, companyId: string) => Promise<AgentResult>> = {
  // Rate pricing agent
  "rates.price_one": async (payload, companyId) => {
    try {
      // Simulate rate pricing logic
      const { origin, destination, equipment, weight } = payload;
      
      // Calculate rate (simplified)
      const baseRate = 2.50; // per mile
      const distance = 800; // miles (placeholder)
      const totalRate = baseRate * distance;
      
      return {
        success: true,
        result: {
          rate: totalRate,
          confidence: 0.85,
          breakdown: {
            base_rate: totalRate * 0.8,
            fuel_surcharge: totalRate * 0.15,
            accessorials: totalRate * 0.05,
          }
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Invoice generation agent
  "invoices.generate_on_pod": async (payload, companyId) => {
    try {
      const { shipment_id, pod_document } = payload;
      
      // Simulate invoice generation
      const invoiceNumber = `INV-${Date.now()}`;
      const amount = 2500.00; // placeholder
      
      return {
        success: true,
        result: {
          invoice_id: `inv_${Date.now()}`,
          invoice_number: invoiceNumber,
          amount: amount,
          status: 'generated'
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Document verification agent
  "directory.verify_docs": async (payload, companyId) => {
    try {
      const { document_type, document_url } = payload;
      
      // Simulate document verification
      const isValid = Math.random() > 0.1; // 90% success rate
      
      return {
        success: true,
        result: {
          verified: isValid,
          verification_date: new Date().toISOString(),
          document_type: document_type
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Analytics refresh agent
  "analytics.refresh_mv": async (payload, companyId) => {
    try {
      const { materialized_view } = payload;
      
      // Simulate materialized view refresh
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate work
      
      return {
        success: true,
        result: {
          refreshed_at: new Date().toISOString(),
          view_name: materialized_view,
          rows_updated: Math.floor(Math.random() * 1000)
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Usage rollup agent
  "usage.rollup_hourly": async (payload, companyId) => {
    try {
      const { date } = payload;
      
      // Simulate usage rollup
      const api_calls = Math.floor(Math.random() * 10000);
      const storage_gb = Math.random() * 100;
      
      return {
        success: true,
        result: {
          date: date,
          api_calls: api_calls,
          storage_gb: storage_gb,
          cost: api_calls * 0.001 + storage_gb * 0.02
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }
};

serve(async (req) => {
  try {
    // CORS headers
    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    };

    // Handle preflight
    if (req.method === "OPTIONS") {
      return new Response(null, { status: 200, headers });
    }

    // Only allow POST
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ ok: false, error: "method_not_allowed" }),
        { status: 405, headers }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Claim a task
    const { data: claimedTask, error: claimError } = await supabase
      .rpc('claim_agent_task');

    if (claimError) {
      console.error("Error claiming task:", claimError);
      return new Response(
        JSON.stringify({ ok: false, error: "claim_failed", message: claimError.message }),
        { status: 500, headers }
      );
    }

    if (!claimedTask || claimedTask.length === 0) {
      // No tasks available
      return new Response(
        JSON.stringify({ ok: true, message: "no_tasks_available" }),
        { status: 200, headers }
      );
    }

    const task = claimedTask[0] as AgentTask;
    console.log(`Processing task ${task.id}: ${task.fn_name}`);

    // Execute the agent function
    const agentFn = agentFunctions[task.fn_name];
    if (!agentFn) {
      console.error(`Unknown agent function: ${task.fn_name}`);
      
      // Mark task as failed
      await supabase.rpc('complete_agent_task', {
        _task_id: task.id,
        _status: 'failed',
        _error: `Unknown agent function: ${task.fn_name}`
      });

      return new Response(
        JSON.stringify({ ok: false, error: "unknown_function", message: `Unknown function: ${task.fn_name}` }),
        { status: 400, headers }
      );
    }

    // Execute with timeout
    const timeout = 30000; // 30 seconds
    const executionPromise = agentFn(task.payload, task.company_id);
    
    const timeoutPromise = new Promise<AgentResult>((_, reject) => {
      setTimeout(() => reject(new Error('Execution timeout')), timeout);
    });

    const result = await Promise.race([executionPromise, timeoutPromise]);

    // Complete the task
    if (result.success) {
      await supabase.rpc('complete_agent_task', {
        _task_id: task.id,
        _status: 'completed',
        _result: result.result
      });
    } else {
      await supabase.rpc('complete_agent_task', {
        _task_id: task.id,
        _status: 'failed',
        _error: result.error
      });
    }

    return new Response(
      JSON.stringify({
        ok: true,
        task_id: task.id,
        function: task.fn_name,
        success: result.success,
        result: result.result,
        error: result.error
      }),
      { status: 200, headers }
    );

  } catch (error) {
    console.error("Agent runner error:", error);
    
    return new Response(
      JSON.stringify({ 
        ok: false, 
        error: "execution_error",
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
});
