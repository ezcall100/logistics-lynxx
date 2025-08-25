// ========================
// 🧪 QA Intelligence - Performance Metrics API
// ========================

import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/integrations/supabase/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { agent_id, task_type, hours = 24 } = req.query;

    // Build query for performance metrics
    let query = supabase
      .from('agent_performance_metrics')
      .select('*')
      .order('updated_at', { ascending: false });

    // Apply filters
    if (agent_id && agent_id !== 'all') {
      query = query.eq('agent_id', agent_id);
    }

    if (task_type && task_type !== 'all') {
      query = query.eq('task_type', task_type);
    }

    // Filter by time range
    const timeThreshold = new Date();
    timeThreshold.setHours(timeThreshold.getHours() - parseInt(hours as string));
    query = query.gte('updated_at', timeThreshold.toISOString());

    const { data: performanceMetrics, error } = await query;

    if (error) {
      console.error('❌ Failed to fetch performance metrics:', error);
      return res.status(500).json({ error: 'Failed to fetch performance metrics' });
    }

    // Calculate additional metrics
    const enhancedMetrics = performanceMetrics?.map(metric => ({
      ...metric,
      failure_rate: 100 - metric.success_rate,
      avg_response_time_seconds: metric.avg_response_time_ms / 1000,
      efficiency_score: calculateEfficiencyScore(metric),
    })) || [];

    return res.status(200).json({
      success: true,
      data: enhancedMetrics,
      count: enhancedMetrics.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Performance metrics API error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

// ========================
// Utility Functions
// ========================
function calculateEfficiencyScore(metric: any): number {
  // Calculate efficiency score based on success rate and response time
  const successWeight = 0.7;
  const responseTimeWeight = 0.3;
  
  const successScore = metric.success_rate / 100;
  const responseTimeScore = Math.max(0, 1 - (metric.avg_response_time_ms / 5000)); // Normalize to 5 seconds
  
  return (successScore * successWeight) + (responseTimeScore * responseTimeWeight);
}

// ========================
// Type Definitions
// ========================
interface PerformanceMetric {
  id: string;
  agent_id: string;
  task_type: string;
  success_rate: number;
  avg_response_time_ms: number;
  total_requests: number;
  successful_requests: number;
  failed_requests: number;
  retry_count: number;
  measurement_period_hours: number;
  created_at: string;
  updated_at: string;
}
