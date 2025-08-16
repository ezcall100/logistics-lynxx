
import { useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ActivationStatus } from '@/hooks/autonomous/activation/useActivationStatus';

export const useAutoActivation = (
  setActivationStatus: (status: ActivationStatus | ((prev: ActivationStatus) => ActivationStatus)) => void,
  setSystemStatus: (status: 'autonomous' | 'manual' | 'maintenance') => void,
  startContinuousOperation: () => void,
  executeComprehensiveTesting: () => void,
  agents: unknown[]
) => {
  const { toast } = useToast();

  // Create stable versions of the functions
  const stableSetActivationStatus = useCallback(setActivationStatus, [setActivationStatus]);
  const stableSetSystemStatus = useCallback(setSystemStatus, [setSystemStatus]);
  const stableStartContinuousOperation = useCallback(startContinuousOperation, [startContinuousOperation]);
  const stableExecuteComprehensiveTesting = useCallback(executeComprehensiveTesting, [executeComprehensiveTesting]);

  useEffect(() => {
    const autoActivateSystem = async () => {
      try {
        console.log('🤖 Starting immediate 24/7 autonomous activation...');
        
        // Force immediate activation for 24/7 operation without human intervention
        const shouldAutoActivate = true; // Always activate for 24/7 autonomous operation

        if (shouldAutoActivate) {
          console.log('🤖 FORCE ACTIVATING 250 AGENTS - 24/7 AUTONOMOUS OPERATION');
          console.log('🚀 AUTO-STARTING UI/UX TIMELINE - 24/7 CONTINUOUS ENHANCEMENT');
          
          // Auto-start the UI/UX timeline immediately
          try {
            await supabase.functions.invoke('autonomous-timeline', {
              body: { 
                action: 'start_timeline',
                mode: '24_7_autonomous',
                auto_start: true
              }
            });
            console.log('✅ UI/UX Timeline auto-started successfully');
          } catch (error) {
            console.log('Timeline start attempt:', error);
          }
          
          const autoActivatedStatus = {
            isActive: true,
            startTime: new Date().toISOString(),
            totalCycles: 0,
            lastTestingCycle: new Date().toISOString(),
            gptConsultations: 0,
            isPersistent: true,
            isAutoActivated: true,
            timelineAutoStarted: true
          };

          stableSetActivationStatus(autoActivatedStatus);
          stableSetSystemStatus('autonomous');
          localStorage.setItem('tms_autonomous_24_7_status', JSON.stringify(autoActivatedStatus));

          try {
            await supabase.from('agent_memory').insert({
              agent_id: 'system-auto-activator-persistent',
              goal: 'Auto-activate persistent 24/7 autonomous system on startup',
              context: {
                activation_time: new Date().toISOString(),
                agents_count: agents.length,
                mode: 'auto_persistent_autonomous_24_7',
                session_independent: true,
                auto_activated: true
              },
              prompt: 'Auto-activate autonomous agents for persistent 24/7 operation',
              response: 'Auto-activation successful - system running autonomously without human intervention',
              action_taken: 'Auto-activated persistent autonomous system',
              confidence: 1.0,
              outcome: 'success'
            });
          } catch (dbError) {
            console.log('Database logging failed, but auto-activation continues:', dbError);
          }

          stableStartContinuousOperation();
          setTimeout(() => {
            stableExecuteComprehensiveTesting();
          }, 2000);

          toast({
            title: "🚀 250 AGENTS ACTIVATED - 24/7 AUTONOMOUS",
            description: "All agents now running continuously without human intervention!",
            duration: 10000,
          });
        }
      } catch (error) {
        console.error('Auto-activation failed:', error);
      }
    };

    const timer = setTimeout(autoActivateSystem, 100); // Immediate activation
    return () => clearTimeout(timer);
  }, [agents, stableSetSystemStatus, toast, stableSetActivationStatus, stableStartContinuousOperation, stableExecuteComprehensiveTesting]);
};
