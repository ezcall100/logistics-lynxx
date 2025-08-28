/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { AIConfidenceLog, AIConfidenceFilters, AIConfidenceStats } from '@/types/ai-confidence';
import type { Json } from '@/integrations/supabase/types';

export const useAIConfidenceLogs = () => {
  const [logs, setLogs] = useState<AIConfidenceLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchLogs = useCallback(async (filters?: AIConfidenceFilters) => {
    setLoading(true);
    try {
      let query = supabase
        .from('ai_confidence_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (filters?.decision_type?.length) {
        query = query.in('decision_type', filters.decision_type);
      }

      if (filters?.confidence_threshold !== undefined) {
        query = query.lte('confidence_score', filters.confidence_threshold);
      }

      if (filters?.flagged_for_review !== undefined) {
        query = query.eq('flagged_for_review', filters.flagged_for_review);
      }

      if (filters?.date_range) {
        query = query
          .gte('created_at', filters.date_range.start)
          .lte('created_at', filters.date_range.end);
      }

      const { data, error } = await query;

      if (error) throw error;
      setLogs((data || []) as AIConfidenceLog[]);
    } catch (error) {
      console.error('Error fetching AI confidence logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch AI confidence logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const createLog = async (logData: Omit<AIConfidenceLog, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('ai_confidence_logs')
        .insert([logData])
        .select()
        .single();

      if (error) throw error;

      setLogs(prev => [data as AIConfidenceLog, ...prev]);
      
      toast({
        title: "Success",
        description: "AI decision logged successfully",
      });

      return data;
    } catch (error) {
      console.error('Error creating AI confidence log:', error);
      toast({
        title: "Error",
        description: "Failed to log AI decision",
        variant: "destructive",
      });
      throw error;
    }
  };

  const updateLog = async (id: string, updates: Partial<AIConfidenceLog>) => {
    try {
      const { data, error } = await supabase
        .from('ai_confidence_logs')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      setLogs(prev => prev.map(log => log.id === id ? data as AIConfidenceLog : log));
      
      toast({
        title: "Success",
        description: "Log updated successfully",
      });

      return data;
    } catch (error) {
      console.error('Error updating log:', error);
      toast({
        title: "Error",
        description: "Failed to update log",
        variant: "destructive",
      });
      throw error;
    }
  };

  const flagForReview = async (id: string, flag: boolean): Promise<void> => {
    await updateLog(id, { flagged_for_review: flag });
  };

  const markAsReviewed = async (id: string, reviewedBy: string): Promise<void> => {
    await updateLog(id, {
      reviewed_by: reviewedBy,
      reviewed_at: new Date().toISOString(),
      flagged_for_review: false
    });
  };

  const getStats = (): AIConfidenceStats => {
    const total_decisions = logs.length;
    const avg_confidence = logs.length > 0 
      ? logs.reduce((sum, log) => sum + log.confidence_score, 0) / logs.length 
      : 0;
    
    const flagged_count = logs.filter(log => log.flagged_for_review).length;
    const low_confidence_count = logs.filter(log => log.confidence_score < 0.8).length;

    const by_decision_type = logs.reduce((acc, log) => {
      acc[log.decision_type] = (acc[log.decision_type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const confidence_distribution = {
      high: logs.filter(log => log.confidence_score >= 0.8).length,
      medium: logs.filter(log => log.confidence_score >= 0.6 && log.confidence_score < 0.8).length,
      low: logs.filter(log => log.confidence_score < 0.6).length,
    };

    return {
      total_decisions,
      avg_confidence,
      flagged_count,
      low_confidence_count,
      by_decision_type,
      confidence_distribution
    };
  };

  // Real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('ai-confidence-logs-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'ai_confidence_logs' },
        () => fetchLogs()
      )
      .subscribe();

    // Initial load
    fetchLogs();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchLogs]);

  return {
    logs,
    loading,
    fetchLogs,
    createLog,
    updateLog,
    flagForReview,
    markAsReviewed,
    getStats
  };
};

export default useAIConfidenceLogs;