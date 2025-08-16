
import React, { useCallback } from 'react';
import { useAutonomousAgentManager } from './useAutonomousAgentManager';
import { useAutonomousAI } from '@/hooks/useAutonomousAI';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useActivationStatus } from './activation/useActivationStatus';
import { useAutoActivation } from './activation/useAutoActivation';

export const useAutonomousActivation = () => {
  const { activationStatus, setActivationStatus } = useActivationStatus();
  const { agents, setSystemStatus, executeAgentTask } = useAutonomousAgentManager();
  const { callAutonomousAI } = useAutonomousAI();
  const { toast } = useToast();

  const startContinuousOperation = useCallback(() => {
    const continuousInterval = setInterval(async () => {
      const persistentStatus = localStorage.getItem('tms_autonomous_24_7_status');
      if (!persistentStatus) return;
      
      const status = JSON.parse(persistentStatus);
      if (!status.isActive || !status.isPersistent) {
        clearInterval(continuousInterval);
        return;
      }

      try {
        for (const agent of agents) {
          if (agent.status === 'active') {
            await executeAgentTask(agent);
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
        }

        const hoursSinceLastTest = status.lastTestingCycle 
          ? (Date.now() - new Date(status.lastTestingCycle).getTime()) / (1000 * 60 * 60)
          : 999;

        if (hoursSinceLastTest >= 1) {
          await executeComprehensiveTesting();
        }

        const updatedStatus = {
          ...status,
          totalCycles: status.totalCycles + 1
        };
        localStorage.setItem('tms_autonomous_24_7_status', JSON.stringify(updatedStatus));
        setActivationStatus(updatedStatus);

      } catch (error) {
        console.error('Continuous operation error:', error);
      }
    }, 5000);

    return () => clearInterval(continuousInterval);
  }, [agents, executeAgentTask]);

  const executeComprehensiveTesting = useCallback(async () => {
    try {
      const testResults = await callAutonomousAI('comprehensive_testing', {
        test_scope: 'last_48_hours',
        session_independent: true,
        persistent_mode: true,
        features_to_test: [
          'quote_comparison_functionality',
          'ai_recommendations_accuracy',
          'role_based_dashboards',
          'margin_analysis_calculations',
          'pdf_export_generation',
          'autonomous_agent_operations',
          'system_performance_metrics',
          'session_independent_operations'
        ]
      });

      setActivationStatus(prev => {
        const newStatus = {
          ...prev,
          lastTestingCycle: new Date().toISOString(),
          totalCycles: prev.totalCycles + 1
        };
        
        if (newStatus.isPersistent) {
          localStorage.setItem('tms_autonomous_24_7_status', JSON.stringify(newStatus));
        }
        
        return newStatus;
      });

    } catch (error) {
      console.error('Comprehensive testing failed:', error);
    }
  }, [callAutonomousAI, setActivationStatus]);

  // Auto-activation hook
  useAutoActivation(
    setActivationStatus,
    setSystemStatus,
    startContinuousOperation,
    executeComprehensiveTesting,
    agents
  );

  const activateAutonomousSystem = useCallback(async () => {
    try {
      const newStatus = {
        isActive: true,
        startTime: new Date().toISOString(),
        totalCycles: 0,
        lastTestingCycle: null,
        gptConsultations: 0,
        isPersistent: true,
        isAutoActivated: false
      };

      setActivationStatus(newStatus);
      setSystemStatus('autonomous');
      localStorage.setItem('tms_autonomous_24_7_status', JSON.stringify(newStatus));

      await executeComprehensiveTesting();
      startContinuousOperation();

      toast({
        title: "🤖 24/7 Autonomous System Manually Activated",
        description: "System will continue running even if admins log out. Persistent 24/7 operation enabled.",
        duration: 6000,
      });

    } catch (error) {
      console.error('Manual activation failed:', error);
      toast({
        title: "Activation Error",
        description: "Failed to activate persistent autonomous system",
        variant: "destructive"
      });
    }
  }, [setActivationStatus, setSystemStatus, executeComprehensiveTesting, startContinuousOperation, toast]);

  const deactivateAutonomousSystem = useCallback(async () => {
    const newStatus = {
      isActive: false,
      startTime: null,
      totalCycles: 0,
      lastTestingCycle: null,
      gptConsultations: 0,
      isPersistent: false,
      isAutoActivated: false
    };

    setActivationStatus(newStatus);
    setSystemStatus('manual');
    localStorage.removeItem('tms_autonomous_24_7_status');

    toast({
      title: "Autonomous System Deactivated",
      description: "24/7 auto-activation has been stopped",
    });
  }, [setActivationStatus, setSystemStatus, toast]);

  return {
    activationStatus,
    activateAutonomousSystem,
    deactivateAutonomousSystem,
    executeComprehensiveTesting
  };
};
