
import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface LearningData {
  decision_type: string;
  confidence_score: number;
  outcome_success: boolean;
  execution_time: number;
  context: Record<string, unknown>;
}

interface ThresholdConfig {
  decision_type: string;
  current_threshold: number;
  success_rate: number;
  total_decisions: number;
  last_updated: string;
}

export const useSelfLearning = () => {
  const [thresholds, setThresholds] = useState<Record<string, ThresholdConfig>>({});
  const [learningActive, setLearningActive] = useState(true);
  const { toast } = useToast();

  const analyzePerfomanceData = useCallback(async () => {
    try {
      // Get recent AI decision logs
      const { data: logs, error } = await supabase
        .from('ai_confidence_logs')
        .select('*')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Group by decision type and analyze performance
      const performanceByType: Record<string, {
        total: number;
        successful: number;
        avgConfidence: number;
        decisions: unknown[];
      }> = {};

      logs?.forEach(log => {
        if (!performanceByType[log.decision_type]) {
          performanceByType[log.decision_type] = {
            total: 0,
            successful: 0,
            avgConfidence: 0,
            decisions: []
          };
        }

        performanceByType[log.decision_type].total++;
        performanceByType[log.decision_type].decisions.push(log);
        performanceByType[log.decision_type].avgConfidence += log.confidence_score;
        
        // Assume decisions with confidence > 0.8 that weren't flagged for review are successful
        if (log.confidence_score > 0.8 && !log.flagged_for_review) {
          performanceByType[log.decision_type].successful++;
        }
      });

      return performanceByType;
    } catch (error) {
      console.error('Error analyzing performance data:', error);
      return {};
    }
  }, []);

  const adjustThresholds = useCallback(async (performanceData: Record<string, {
    total: number;
    successful: number;
    avgConfidence: number;
    decisions: unknown[];
  }>) => {
    const adjustments: unknown[] = [];

    for (const [decisionType, data] of Object.entries(performanceData)) {
      const successRate = data.successful / data.total;
      const avgConfidence = data.avgConfidence / data.total;
      
      let newThreshold = thresholds[decisionType]?.current_threshold || 0.8;
      let adjustmentReason = '';

      // Adjust threshold based on success rate and confidence patterns
      if (successRate > 0.95 && avgConfidence > 0.9) {
        // Very high success rate - can lower threshold for efficiency
        newThreshold = Math.max(0.6, newThreshold - 0.05);
        adjustmentReason = 'High success rate allows for lower threshold';
      } else if (successRate < 0.85) {
        // Lower success rate - increase threshold for safety
        newThreshold = Math.min(0.95, newThreshold + 0.05);
        adjustmentReason = 'Lower success rate requires higher threshold';
      } else if (successRate > 0.9 && avgConfidence < 0.75) {
        // Good success rate but low confidence - slight increase
        newThreshold = Math.min(0.9, newThreshold + 0.02);
        adjustmentReason = 'Optimizing for confidence consistency';
      }

      // Only adjust if change is significant
      if (Math.abs(newThreshold - (thresholds[decisionType]?.current_threshold || 0.8)) > 0.01) {
        const config: ThresholdConfig = {
          decision_type: decisionType,
          current_threshold: newThreshold,
          success_rate: successRate,
          total_decisions: data.total,
          last_updated: new Date().toISOString()
        };

        adjustments.push({
          ...config,
          adjustment_reason: adjustmentReason,
          old_threshold: thresholds[decisionType]?.current_threshold || 0.8
        });

        setThresholds(prev => ({
          ...prev,
          [decisionType]: config
        }));
      }
    }

    return adjustments;
  }, [thresholds]);

  const logLearningData = async (data: LearningData) => {
    try {
      // Convert context to JSON-compatible format for Supabase
      const decisionData = {
        outcome_success: data.outcome_success,
        execution_time: data.execution_time,
        context: data.context
      };

      await supabase.from('ai_confidence_logs').insert({
        decision_type: data.decision_type,
        confidence_score: data.confidence_score,
        decision_data: decisionData as never, // Cast to never to bypass type checking
        reasoning: `Self-learning outcome: ${data.outcome_success ? 'successful' : 'failed'}`,
        flagged_for_review: !data.outcome_success && data.confidence_score > 0.8
      });
    } catch (error) {
      console.error('Error logging learning data:', error);
    }
  };

  const runLearningCycle = useCallback(async () => {
    if (!learningActive) return;

    try {
      console.log('Running self-learning cycle...');
      
      const performanceData = await analyzePerfomanceData();
      const adjustments = await adjustThresholds(performanceData);

      if (adjustments.length > 0) {
        toast({
          title: "Self-Learning Update",
          description: `AI autonomously adjusted ${adjustments.length} decision threshold(s)`,
        });

        console.log('Threshold adjustments made:', adjustments);
      }

      return adjustments;
    } catch (error) {
      console.error('Self-learning cycle error:', error);
      toast({
        title: "Learning Error",
        description: "Self-learning cycle encountered an error",
        variant: "destructive",
      });
    }
  }, [learningActive, toast, analyzePerfomanceData, adjustThresholds]);

  const getThresholdForDecision = (decisionType: string): number => {
    return thresholds[decisionType]?.current_threshold || 0.8;
  };

  // Run learning cycle every 5 minutes
  useEffect(() => {
    if (!learningActive) return;

    const interval = setInterval(runLearningCycle, 5 * 60 * 1000);
    
    // Run initial cycle
    runLearningCycle();

    return () => clearInterval(interval);
  }, [learningActive, runLearningCycle]);

  return {
    thresholds,
    learningActive,
    setLearningActive,
    runLearningCycle,
    logLearningData,
    getThresholdForDecision,
    analyzePerfomanceData,
    adjustThresholds
  };
};
