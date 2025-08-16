/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCallback } from 'react';
import { AutonomousAgent } from '@/types/autonomous-agents';

export const useAgentInitializer = () => {
  const initializeAgents = useCallback((): AutonomousAgent[] => {
    const agents: AutonomousAgent[] = [];
    
    console.log('🚀 INITIALIZING ALL 250 AGENTS FOR 24/7 AUTONOMOUS OPERATION');
    
    // Agent distribution as per PRD requirements:
    // 50 Research Agents, 80 Frontend Agents, 60 Backend Agents, 
    // 30 Database Agents, 20 Testing Agents, 10 Deployment Agents
    
    const agentTypes = [
      // 50 Research Agents
      ...Array(50).fill(null).map((_, i) => ({
        category: 'research',
        name: `Market Research Agent ${i + 1}`,
        type: 'research' as const,
        tasks: ['market_analysis', 'competitor_analysis', 'technology_evaluation']
      })),
      
      // 80 Frontend Agents  
      ...Array(80).fill(null).map((_, i) => ({
        category: 'frontend',
        name: `Frontend Development Agent ${i + 1}`,
        type: 'frontend' as const,
        tasks: ['react_components', 'ui_optimization', 'responsive_design']
      })),
      
      // 60 Backend Agents
      ...Array(60).fill(null).map((_, i) => ({
        category: 'backend', 
        name: `Backend Development Agent ${i + 1}`,
        type: 'backend' as const,
        tasks: ['api_endpoints', 'business_logic', 'server_optimization']
      })),
      
      // 30 Database Agents
      ...Array(30).fill(null).map((_, i) => ({
        category: 'database',
        name: `Database Management Agent ${i + 1}`,
        type: 'database' as const,
        tasks: ['schema_optimization', 'data_modeling', 'migrations']
      })),
      
      // 20 Testing Agents
      ...Array(20).fill(null).map((_, i) => ({
        category: 'testing',
        name: `Quality Assurance Agent ${i + 1}`,
        type: 'testing' as const,
        tasks: ['unit_testing', 'integration_testing', 'e2e_testing']
      })),
      
      // 10 Deployment Agents
      ...Array(10).fill(null).map((_, i) => ({
        category: 'deployment',
        name: `Deployment Agent ${i + 1}`,
        type: 'deployment' as const,
        tasks: ['ci_cd_pipeline', 'cloud_deployment', 'monitoring_setup']
      }))
    ];

    agentTypes.forEach((agentConfig, index) => {
      // Immediate activation for 24/7 autonomous operation - no staggering needed
      const immediateStart = new Date(Date.now() + (index * 1000)); // Start each agent within seconds
      
      agents.push({
        id: `agent-${agentConfig.category}-${index + 1}`,
        name: agentConfig.name,
        type: agentConfig.type,
        status: 'active', // All agents start active immediately
        lastAction: `24/7 ${agentConfig.category} agent auto-activated`,
        successRate: 100,
        tasksCompleted: 0,
        nextScheduledRun: immediateStart.toISOString(),
        category: agentConfig.category,
        assignedTasks: agentConfig.tasks
      });
    });

    console.log(`✅ Initialized ${agents.length} autonomous agents across 6 categories`);
    return agents;
  }, []);

  return { initializeAgents };
};
