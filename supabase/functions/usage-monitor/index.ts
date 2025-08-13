import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface UsageBreach {
  company_id: string;
  feature_key: string;
  current_usage: number;
  limit: number;
  percentage: number;
  tier: string;
}

interface NotificationTask {
  company_id: string;
  fn_name: string;
  payload: {
    type: 'usage_breach' | 'usage_warning';
    feature: string;
    current_usage: number;
    limit: number;
    percentage: number;
    tier: string;
    action_required: boolean;
  };
  priority: 'normal' | 'high';
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    );

    // Get current date for monthly usage calculation
    const now = new Date();
    const currentMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Define usage limits by tier
    const tierLimits = {
      starter: {
        quotes: 10000,
        bulk_jobs: 100,
        directory_invites: 50
      },
      pro: {
        quotes: 50000,
        bulk_jobs: 500,
        directory_invites: 200
      },
      enterprise: {
        quotes: 999999999, // Effectively unlimited
        bulk_jobs: 999999999,
        directory_invites: 999999999
      }
    };

    // Get all companies with their subscription tiers
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('id, subscription_tier')
      .not('subscription_tier', 'is', null);

    if (companiesError) {
      console.error('Error fetching companies:', companiesError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch companies' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const breaches: UsageBreach[] = [];
    const notifications: NotificationTask[] = [];

    // Check usage for each company
    for (const company of companies) {
      const tier = company.subscription_tier || 'starter';
      const limits = tierLimits[tier as keyof typeof tierLimits];

      // Get monthly usage for this company
      const { data: usageData, error: usageError } = await supabase
        .from('usage_events')
        .select('feature_key, sum(qty) as total_usage')
        .eq('company_id', company.id)
        .gte('occurred_at', currentMonth.toISOString())
        .group('feature_key');

      if (usageError) {
        console.error(`Error fetching usage for company ${company.id}:`, usageError);
        continue;
      }

      // Check each feature for breaches
      for (const usage of usageData || []) {
        const feature = usage.feature_key;
        const currentUsage = parseInt(usage.total_usage) || 0;
        const limit = limits[feature as keyof typeof limits] || 0;
        const percentage = limit > 0 ? (currentUsage / limit) * 100 : 0;

        // Check for breaches (over 100%) or warnings (over 80%)
        if (percentage > 100) {
          breaches.push({
            company_id: company.id,
            feature_key: feature,
            current_usage: currentUsage,
            limit: limit,
            percentage: percentage,
            tier: tier
          });

          // Create notification task for breach
          notifications.push({
            company_id: company.id,
            fn_name: 'notify_ops',
            payload: {
              type: 'usage_breach',
              feature: feature,
              current_usage: currentUsage,
              limit: limit,
              percentage: percentage,
              tier: tier,
              action_required: true
            },
            priority: 'high'
          });
        } else if (percentage > 80) {
          // Create warning notification
          notifications.push({
            company_id: company.id,
            fn_name: 'notify_ops',
            payload: {
              type: 'usage_warning',
              feature: feature,
              current_usage: currentUsage,
              limit: limit,
              percentage: percentage,
              tier: tier,
              action_required: false
            },
            priority: 'normal'
          });
        }
      }
    }

    // Insert notification tasks
    if (notifications.length > 0) {
      const { error: notificationError } = await supabase
        .from('agent_tasks')
        .insert(notifications);

      if (notificationError) {
        console.error('Error inserting notification tasks:', notificationError);
      }
    }

    // Log the monitoring results
    const { error: logError } = await supabase
      .from('audit_logs')
      .insert({
        company_id: null, // System-wide log
        user_id: null,
        action: 'usage_monitor_run',
        resource_type: 'usage_monitoring',
        resource_id: 'nightly_check',
        details: {
          total_companies_checked: companies.length,
          breaches_found: breaches.length,
          warnings_generated: notifications.filter(n => n.payload.type === 'usage_warning').length,
          notifications_created: notifications.length,
          timestamp: now.toISOString()
        }
      });

    if (logError) {
      console.error('Error logging monitoring results:', logError);
    }

    const response = {
      success: true,
      summary: {
        companies_checked: companies.length,
        breaches_found: breaches.length,
        warnings_generated: notifications.filter(n => n.payload.type === 'usage_warning').length,
        notifications_created: notifications.length
      },
      breaches: breaches,
      timestamp: now.toISOString()
    };

    return new Response(
      JSON.stringify(response),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Usage monitor error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
