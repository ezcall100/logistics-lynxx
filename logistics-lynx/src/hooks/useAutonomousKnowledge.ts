
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { KnowledgeRule, KnowledgePattern, KnowledgeVersion, PerformanceMetrics } from '@/types/knowledge-base';

export const useAutonomousKnowledge = () => {
  const [knowledgeRules, setKnowledgeRules] = useState<KnowledgeRule[]>([]);
  const [patterns, setPatterns] = useState<KnowledgePattern[]>([]);
  const [versions, setVersions] = useState<KnowledgeVersion[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>({
    efficiency_score: 0,
    cost_savings: 0,
    accuracy_improvement: 0,
    decision_speed: 0,
    error_reduction: 0
  });
  const [isLearning, setIsLearning] = useState(false);
  const [lastAnalysis, setLastAnalysis] = useState<string | null>(null);
  const [currentVersion, setCurrentVersion] = useState<KnowledgeVersion | null>(null);
  const { toast } = useToast();

  // Simulate real-time pattern discovery
  useEffect(() => {
    loadKnowledgeBase();
    
    const interval = setInterval(() => {
      runPatternAnalysis();
      generateNewRules();
    }, 10 * 60 * 1000);

    return () => clearInterval(interval);
  }, [generateNewRules, loadKnowledgeBase, runPatternAnalysis]);

  const loadKnowledgeBase = async () => {
    try {
      // Load knowledge rules
      const { data: rules, error: rulesError } = await supabase
        .from('ai_confidence_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (rulesError) throw rulesError;

      // Transform confidence logs into knowledge rules
      const transformedRules: KnowledgeRule[] = (rules || []).map(log => ({
        id: log.id,
        rule_type: 'routing' as const,
        name: `Rule for ${log.decision_type}`,
        description: log.reasoning || 'Autonomous rule',
        conditions: (log.context && typeof log.context === 'object' && log.context !== null) 
          ? log.context as Record<string, unknown> 
          : {},
        actions: (log.decision_data && typeof log.decision_data === 'object' && log.decision_data !== null) 
          ? log.decision_data as Record<string, unknown> 
          : {},
        confidence_score: log.confidence_score || 0,
        performance_impact: Math.random() * 10,
        created_at: log.created_at,
        updated_at: log.updated_at,
        version: 1,
        is_active: !log.flagged_for_review,
        auto_generated: true,
        success_rate: log.confidence_score ? log.confidence_score * 100 : 80,
        usage_count: Math.floor(Math.random() * 50)
      }));

      setKnowledgeRules(transformedRules);

      // Generate mock performance metrics
      setPerformanceMetrics({
        efficiency_score: 85 + Math.random() * 10,
        cost_savings: Math.random() * 15000,
        accuracy_improvement: Math.random() * 20,
        decision_speed: 150 + Math.random() * 100,
        error_reduction: Math.random() * 30
      });

      setLastAnalysis(new Date().toISOString());

    } catch (error) {
      console.error('Error loading knowledge base:', error);
      toast({
        title: "Knowledge Base Error",
        description: "Failed to load autonomous knowledge base",
        variant: "destructive",
      });
    }
  };

  const runPatternAnalysis = async () => {
    setIsLearning(true);
    try {
      // Fetch recent AI decisions for pattern analysis
      const { data: decisions, error } = await supabase
        .from('ai_decisions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (error) throw error;

      // Analyze patterns from decisions
      const newPatterns: KnowledgePattern[] = [];
      
      if (decisions && decisions.length > 0) {
        // Group decisions by type
        const decisionGroups = decisions.reduce((acc: Record<string, typeof decisions>, decision) => {
          if (!acc[decision.decision_type]) {
            acc[decision.decision_type] = [];
          }
          acc[decision.decision_type].push(decision);
          return acc;
        }, {});

        // Generate patterns for each group
        Object.entries(decisionGroups).forEach(([type, groupDecisions]) => {
          if (groupDecisions.length >= 3) {
            newPatterns.push({
              id: `pattern-${Date.now()}-${type}`,
              pattern_type: type,
              data_points: groupDecisions.map(d => d.decision),
              confidence: groupDecisions.reduce((sum, d) => sum + (d.confidence_score || 0), 0) / groupDecisions.length,
              frequency: groupDecisions.length,
              impact_score: Math.random() * 10,
              discovered_at: new Date().toISOString(),
              rule_generated: false
            });
          }
        });
      }

      setPatterns(newPatterns);
      setLastAnalysis(new Date().toISOString());

      toast({
        title: "Pattern Analysis Complete",
        description: `Discovered ${newPatterns.length} new behavioral patterns`,
      });

    } catch (error) {
      console.error('Error in pattern analysis:', error);
      toast({
        title: "Analysis Error",
        description: "Failed to complete pattern analysis",
        variant: "destructive",
      });
    } finally {
      setIsLearning(false);
    }
  };

  const generateNewRules = async () => {
    try {
      const newRules: KnowledgeRule[] = patterns
        .filter(pattern => !pattern.rule_generated && pattern.confidence > 0.7)
        .map(pattern => ({
          id: `rule-${Date.now()}-${pattern.id}`,
          rule_type: 'routing' as const,
          name: `Auto-generated rule for ${pattern.pattern_type}`,
          description: `Rule generated from pattern analysis with ${pattern.frequency} occurrences`,
          conditions: { pattern_type: pattern.pattern_type, min_confidence: pattern.confidence },
          actions: { apply_pattern: true, confidence_threshold: pattern.confidence },
          confidence_score: pattern.confidence,
          performance_impact: pattern.impact_score,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          version: 1,
          is_active: true,
          auto_generated: true,
          success_rate: Math.round(pattern.confidence * 100),
          usage_count: 0
        }));

      if (newRules.length > 0) {
        setKnowledgeRules(prev => [...prev, ...newRules]);
        
        // Mark patterns as having rules generated
        setPatterns(prev => prev.map(p => 
          newRules.some(r => r.name.includes(p.pattern_type)) 
            ? { ...p, rule_generated: true }
            : p
        ));

        toast({
          title: "Rules Generated",
          description: `Generated ${newRules.length} new autonomous rules`,
        });
      }

    } catch (error) {
      console.error('Error generating rules:', error);
      toast({
        title: "Rule Generation Error",
        description: "Failed to generate new rules",
        variant: "destructive",
      });
    }
  };

  const createKnowledgeVersion = async () => {
    const newVersion: KnowledgeVersion = {
      id: `version-${Date.now()}`,
      version_number: versions.length + 1,
      changes_summary: `Version ${versions.length + 1} with ${knowledgeRules.length} rules`,
      performance_before: performanceMetrics.efficiency_score - 5,
      performance_after: performanceMetrics.efficiency_score,
      created_at: new Date().toISOString(),
      is_active: true,
      rules_count: knowledgeRules.length
    };

    setVersions(prev => prev.map(v => ({ ...v, is_active: false })).concat(newVersion));
    setCurrentVersion(newVersion);

    toast({
      title: "Version Created",
      description: `Knowledge base version ${newVersion.version_number} created`,
    });
  };

  const rollbackToVersion = async (version: KnowledgeVersion) => {
    setVersions(prev => prev.map(v => ({ ...v, is_active: v.id === version.id })));
    setCurrentVersion(version);

    toast({
      title: "Rollback Complete",
      description: `Rolled back to version ${version.version_number}`,
    });
  };

  const toggleRule = async (ruleId: string) => {
    setKnowledgeRules(prev => prev.map(rule => 
      rule.id === ruleId ? { ...rule, is_active: !rule.is_active } : rule
    ));
  };

  const optimizeRoute = (routeData: Record<string, unknown>) => {
    // Type-safe access to route data properties
    const fuelEfficiency = routeData && typeof routeData === 'object' && routeData !== null && 'fuel_efficiency' in routeData 
      ? routeData.fuel_efficiency as number 
      : 25; // default value
    
    const distance = routeData && typeof routeData === 'object' && routeData !== null && 'distance' in routeData 
      ? routeData.distance as number 
      : 100; // default value

    const trafficFactor = routeData && typeof routeData === 'object' && routeData !== null && 'traffic_factor' in routeData 
      ? routeData.traffic_factor as number 
      : 1.2; // default value

    // Apply knowledge rules for route optimization
    const applicableRules = knowledgeRules.filter(rule => 
      rule.rule_type === 'routing' && rule.is_active
    );

    let optimizedDistance = distance;
    let optimizedFuelCost = (distance / fuelEfficiency) * 3.5; // Base fuel cost

    applicableRules.forEach(rule => {
      if (rule.confidence_score > 0.8) {
        optimizedDistance *= 0.95; // 5% reduction
        optimizedFuelCost *= 0.92; // 8% reduction
      }
    });

    return {
      original_distance: distance,
      optimized_distance: Math.round(optimizedDistance),
      fuel_savings: Math.round((distance / fuelEfficiency - optimizedDistance / fuelEfficiency) * 3.5),
      time_savings: Math.round((distance - optimizedDistance) / 60 * trafficFactor),
      rules_applied: applicableRules.length
    };
  };

  return {
    knowledgeRules,
    patterns,
    versions,
    performanceMetrics,
    isLearning,
    lastAnalysis,
    currentVersion,
    discoveredPatterns: patterns, // Alias for compatibility
    knowledgeVersions: versions, // Alias for compatibility
    setIsLearning,
    loadKnowledgeBase,
    runPatternAnalysis,
    generateNewRules,
    createKnowledgeVersion,
    rollbackToVersion,
    toggleRule,
    optimizeRoute
  };
};
