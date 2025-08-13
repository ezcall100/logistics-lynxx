import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Types for bulk rating requests
interface BulkRatingJob {
  origin: string;
  destination: string;
  equipment_type: string;
  pickup_date: string;
  weight?: number;
  hazmat?: boolean;
  temperature_controlled?: boolean;
  special_requirements?: string[];
}

interface BulkRatingRequest {
  company_id: string;
  jobs: BulkRatingJob[];
  priority?: 'low' | 'normal' | 'high';
  callback_url?: string;
}

interface BulkRatingResponse {
  request_id: string;
  accepted: number;
  estimated_completion: string;
  status: 'accepted' | 'rate_limited' | 'unauthorized';
}

// Rate limiting configuration
const RATE_LIMITS = {
  'free': { requests_per_hour: 100, max_jobs_per_request: 10 },
  'pro': { requests_per_hour: 1000, max_jobs_per_request: 100 },
  'enterprise': { requests_per_hour: 10000, max_jobs_per_request: 1000 }
};

serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Authentication check
    const authHeader = req.headers.get('authorization') || '';
    if (!authHeader.startsWith('Bearer ')) {
      return new Response(
        JSON.stringify({ 
          error: 'unauthorized', 
          message: 'Valid Bearer token required' 
        }), 
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Verify token and get company info
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) {
      return new Response(
        JSON.stringify({ 
          error: 'unauthorized', 
          message: 'Invalid or expired token' 
        }), 
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Get company details and subscription tier
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id, name, subscription_tier, status')
      .eq('id', user.user_metadata?.company_id)
      .single();

    if (companyError || !company) {
      return new Response(
        JSON.stringify({ 
          error: 'not_found', 
          message: 'Company not found' 
        }), 
        { 
          status: 404, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    if (company.status !== 'active') {
      return new Response(
        JSON.stringify({ 
          error: 'account_suspended', 
          message: 'Account is not active' 
        }), 
        { 
          status: 403, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Parse request body
    const body: BulkRatingRequest = await req.json();
    
    if (!body.jobs || !Array.isArray(body.jobs) || body.jobs.length === 0) {
      return new Response(
        JSON.stringify({ 
          error: 'invalid_request', 
          message: 'Jobs array is required and must not be empty' 
        }), 
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Rate limiting check
    const tier = company.subscription_tier || 'free';
    const limits = RATE_LIMITS[tier as keyof typeof RATE_LIMITS];
    
    if (body.jobs.length > limits.max_jobs_per_request) {
      return new Response(
        JSON.stringify({ 
          error: 'rate_limited', 
          message: `Maximum ${limits.max_jobs_per_request} jobs per request for ${tier} tier` 
        }), 
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check hourly rate limit
    const now = new Date();
    const hourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
    const { count: recentRequests } = await supabase
      .from('bulk_rating_requests')
      .select('*', { count: 'exact', head: true })
      .eq('company_id', company.id)
      .gte('created_at', hourAgo.toISOString());

    if (recentRequests && recentRequests >= limits.requests_per_hour) {
      return new Response(
        JSON.stringify({ 
          error: 'rate_limited', 
          message: `Hourly limit of ${limits.requests_per_hour} requests exceeded` 
        }), 
        { 
          status: 429, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate request ID
    const requestId = `bulk_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Calculate estimated completion time (rough estimate: 2 seconds per job)
    const estimatedSeconds = body.jobs.length * 2;
    const estimatedCompletion = new Date(now.getTime() + estimatedSeconds * 1000);

    // Create bulk rating request record
    const { error: insertError } = await supabase
      .from('bulk_rating_requests')
      .insert({
        id: requestId,
        company_id: company.id,
        total_jobs: body.jobs.length,
        priority: body.priority || 'normal',
        callback_url: body.callback_url,
        status: 'processing',
        estimated_completion: estimatedCompletion.toISOString()
      });

    if (insertError) {
      console.error('Error creating bulk rating request:', insertError);
      return new Response(
        JSON.stringify({ 
          error: 'internal_error', 
          message: 'Failed to create request' 
        }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Enqueue individual rating jobs
    const jobRows = body.jobs.map((job: BulkRatingJob, index: number) => ({
      company_id: company.id,
      bulk_request_id: requestId,
      job_index: index,
      fn_name: 'ai-load-matcher',
      payload: { 
        lane: job, 
        mode: 'rate',
        priority: body.priority || 'normal'
      },
      status: 'pending'
    }));

    const { error: jobInsertError } = await supabase
      .from('agent_tasks')
      .insert(jobRows);

    if (jobInsertError) {
      console.error('Error enqueueing jobs:', jobInsertError);
      // Clean up the bulk request record
      await supabase
        .from('bulk_rating_requests')
        .delete()
        .eq('id', requestId);
        
      return new Response(
        JSON.stringify({ 
          error: 'internal_error', 
          message: 'Failed to enqueue jobs' 
        }), 
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Log the request for audit purposes
    await supabase
      .from('audit_logs')
      .insert({
        company_id: company.id,
        user_id: user.id,
        action: 'bulk_rating_request',
        resource_type: 'bulk_rating',
        resource_id: requestId,
        details: {
          job_count: body.jobs.length,
          priority: body.priority || 'normal',
          tier: tier
        }
      });

    // Return success response
    const response: BulkRatingResponse = {
      request_id: requestId,
      accepted: body.jobs.length,
      estimated_completion: estimatedCompletion.toISOString(),
      status: 'accepted'
    };

    return new Response(
      JSON.stringify(response),
      { 
        status: 202, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Bulk rating API error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'internal_error', 
        message: 'An unexpected error occurred' 
      }), 
      { 
        status: 500, 
        headers: { 
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
