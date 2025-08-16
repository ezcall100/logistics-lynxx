/* eslint-disable @typescript-eslint/no-explicit-any */

import { useAutonomousAI } from '@/hooks/useAutonomousAI';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AutonomousAgent } from '@/types/autonomous-agents';

export const useGPTAssistance = () => {
  const { callAutonomousAI } = useAutonomousAI();
  const { toast } = useToast();

  const seekGPTAssistance = async (agent: AutonomousAgent, error: unknown, systemHealth: unknown, agents: AutonomousAgent[]) => {
    try {
      const gptAssistance = await callAutonomousAI('gpt_assistance', {
        agent_id: agent.id,
        agent_type: agent.type,
        error_context: error.message,
        system_context: {
          system_health: systemHealth,
          current_tasks: agents.map(a => ({ id: a.id, status: a.status, type: a.type }))
        },
        request: 'Please analyze this error and provide a solution or alternative approach'
      });

      // Log GPT assistance
      await supabase.from('agent_memory').insert({
        agent_id: 'gpt-assistant',
        goal: `Provide assistance for ${agent.type} agent error`,
        context: { original_agent: agent.id, error },
        prompt: `Help resolve error in ${agent.type} agent`,
        response: JSON.stringify(gptAssistance),
        action_taken: 'GPT consultation completed',
        confidence: 0.8,
        outcome: 'assistance_provided'
      });

      toast({
        title: "GPT Assistance Requested",
        description: `Seeking AI guidance for ${agent.name} error`,
      });

      return gptAssistance;
    } catch (gptError) {
      console.error('GPT assistance failed:', gptError);
    }
  };

  return { seekGPTAssistance };
};
