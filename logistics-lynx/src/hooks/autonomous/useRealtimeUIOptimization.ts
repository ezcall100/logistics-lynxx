/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react';

import { supabase } from '@/integrations/supabase/client';
import { useUserBehaviorData } from '@/hooks/analytics/useUserBehaviorData';
import { useToast } from '@/hooks/use-toast';

interface UIOptimizationRule {
  id: string;
  trigger: string;
  condition: string;
  action: string;
  impact_score: number;
  active: boolean;
}

interface UIChange {
  id: string;
  type: 'color' | 'layout' | 'typography' | 'spacing' | 'animation';
  target_element: string;
  change_description: string;
  css_changes: Record<string, string>;
  ab_test_group?: string;
  performance_impact: number;
  user_feedback_score?: number;
  applied_at: string;
  reverted_at?: string;
}

export const useRealtimeUIOptimization = () => {
  const { toast } = useToast();
  const { fetchUserBehaviorData } = useUserBehaviorData();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [appliedChanges, setAppliedChanges] = useState<UIChange[]>([]);
  const [optimizationRules, setOptimizationRules] = useState<UIOptimizationRule[]>([]);

  // Load optimization rules
  useEffect(() => {
    loadOptimizationRules();
  }, []);

  const loadOptimizationRules = async () => {
    // Mock optimization rules - in production these would come from the database
    const rules: UIOptimizationRule[] = [
      {
        id: '1',
        trigger: 'low_engagement',
        condition: 'user_engagement < 80',
        action: 'optimize_button_colors',
        impact_score: 8.5,
        active: true
      },
      {
        id: '2',
        trigger: 'high_bounce_rate',
        condition: 'page_bounce_rate > 60',
        action: 'improve_visual_hierarchy',
        impact_score: 7.2,
        active: true
      },
      {
        id: '3',
        trigger: 'slow_interaction',
        condition: 'avg_interaction_time > 2000ms',
        action: 'optimize_animations',
        impact_score: 6.8,
        active: true
      }
    ];
    setOptimizationRules(rules);
  };

  // Real-time behavior analysis and optimization
  const analyzeAndOptimize = useCallback(async () => {
    if (!isOptimizing) return;

    try {
      const behaviorData = await fetchUserBehaviorData(
        new Date(Date.now() - 3600000).toISOString() // Last hour
      );

      if (!behaviorData) return;

      // Analyze metrics and trigger optimizations
      const { sessionMetrics, featureUsage, heatmapData } = behaviorData;
      
      // Check if unknown optimization rules are triggered
      for (const rule of optimizationRules) {
        if (!rule.active) continue;

        let shouldTrigger = false;

        switch (rule.trigger) {
          case 'low_engagement':
            shouldTrigger = sessionMetrics.avgSessionDuration < 120; // Less than 2 minutes
            break;
          case 'high_bounce_rate':
            shouldTrigger = sessionMetrics.activeUsers < 5; // Low active users
            break;
          case 'slow_interaction':
            shouldTrigger = sessionMetrics.avgPageViews < 3; // Low page views
            break;
        }

        if (shouldTrigger) {
          await executeOptimization(rule, behaviorData);
        }
      }
    } catch (error) {
      console.error('Error in UI optimization analysis:', error);
    }
  }, [isOptimizing, optimizationRules, fetchUserBehaviorData, executeOptimization]);

  // Execute specific optimization
  const executeOptimization = useCallback(async (rule: UIOptimizationRule, behaviorData: unknown) => {
    const change: UIChange = {
      id: Date.now().toString(),
      type: getOptimizationType(rule.action),
      target_element: getTargetElement(rule.action),
      change_description: getChangeDescription(rule.action),
      css_changes: generateCSSChanges(rule.action),
      performance_impact: rule.impact_score,
      applied_at: new Date().toISOString()
    };

    // Apply the change to the DOM
    applyUIChange(change);
    
    // Store in state
    setAppliedChanges(prev => [change, ...prev.slice(0, 9)]); // Keep last 10 changes

    // Log to database for tracking
    await logUIOptimization(change, rule, behaviorData);

    toast({
      title: "UI Optimized",
      description: change.change_description,
      duration: 3000,
    });
  }, [toast, logUIOptimization]);

  // Apply UI changes to the DOM
  const applyUIChange = (change: UIChange) => {
    const elements = document.querySelectorAll(change.target_element);
    
    elements.forEach(element => {
      Object.entries(change.css_changes).forEach(([property, value]) => {
        (element as HTMLElement).style.setProperty(property, value);
      });
    });
  };

  // Revert a specific change
  const revertUIChange = useCallback((changeId: string) => {
    const change = appliedChanges.find(c => c.id === changeId);
    if (!change) return;

    const elements = document.querySelectorAll(change.target_element);
    
    elements.forEach(element => {
      Object.keys(change.css_changes).forEach(property => {
        (element as HTMLElement).style.removeProperty(property);
      });
    });

    setAppliedChanges(prev => 
      prev.map(c => 
        c.id === changeId 
          ? { ...c, reverted_at: new Date().toISOString() }
          : c
      )
    );

    toast({
      title: "Change Reverted",
      description: `Reverted: ${change.change_description}`,
      duration: 2000,
    });
  }, [appliedChanges, toast]);

  // Helper functions
  const getOptimizationType = (action: string): UIChange['type'] => {
    if (action.includes('color')) return 'color';
    if (action.includes('layout') || action.includes('hierarchy')) return 'layout';
    if (action.includes('animation')) return 'animation';
    if (action.includes('spacing')) return 'spacing';
    return 'typography';
  };

  const getTargetElement = (action: string): string => {
    switch (action) {
      case 'optimize_button_colors': return '.btn, button';
      case 'improve_visual_hierarchy': return 'h1, h2, h3, .card-title';
      case 'optimize_animations': return '.transition, .animate';
      default: return 'body';
    }
  };

  const getChangeDescription = (action: string): string => {
    switch (action) {
      case 'optimize_button_colors': return 'Enhanced button contrast and hover states';
      case 'improve_visual_hierarchy': return 'Adjusted heading sizes and spacing';
      case 'optimize_animations': return 'Refined transition timing and easing';
      default: return 'Applied UI optimization';
    }
  };

  const generateCSSChanges = (action: string): Record<string, string> => {
    switch (action) {
      case 'optimize_button_colors':
        return {
          '--primary': 'hsl(220, 100%, 55%)',
          '--primary-foreground': 'hsl(0, 0%, 100%)',
          'transition': 'all 0.2s ease-in-out'
        };
      case 'improve_visual_hierarchy':
        return {
          'line-height': '1.6',
          'margin-bottom': '1rem'
        };
      case 'optimize_animations':
        return {
          'transition-duration': '0.15s',
          'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)'
        };
      default:
        return {};
    }
  };

  // Log optimization to database  
  const logUIOptimization = useCallback(async (change: UIChange, rule: UIOptimizationRule, behaviorData: unknown) => {
    try {
      const insertData = {
        decision_type: 'ui_optimization',
        context: {
          rule_triggered: rule,
          behavior_data: behaviorData,
          change_applied: change
        },
        decision: change,
        confidence_score: rule.impact_score / 10
      };
      
      await supabase.from('ai_decisions').insert(insertData as unknown);
    } catch (error) {
      console.error('Error logging UI optimization:', error);
    }
  }, []);

  // Start/stop optimization monitoring
  const startOptimization = useCallback(() => {
    setIsOptimizing(true);
  }, []);

  const stopOptimization = useCallback(() => {
    setIsOptimizing(false);
  }, []);

  // Run optimization check every 30 seconds when active
  useEffect(() => {
    if (!isOptimizing) return;

    const interval = setInterval(analyzeAndOptimize, 30000); // Every 30 seconds
    
    // Initial check
    analyzeAndOptimize();

    return () => clearInterval(interval);
  }, [isOptimizing, analyzeAndOptimize]);

  return {
    isOptimizing,
    appliedChanges,
    optimizationRules,
    startOptimization,
    stopOptimization,
    revertUIChange,
    executeOptimization: (rule: UIOptimizationRule) => executeOptimization(rule, null)
  };
};

export default useRealtimeUIOptimization;