// ========================
// 🤖 MCP Agent Assignment System
// ========================
// TransBot AI - Portal-based Agent Assignment
// Domain: transbotai.com

export type PortalType = 'shipper' | 'broker' | 'carrier' | 'admin' | 'driver';

export interface AgentConfig {
  id: string;
  name: string;
  autonomy: boolean;
  confidenceThreshold: number;
  retryAttempts: number;
  escalationLevel: 'low' | 'medium' | 'high' | 'critical';
  loggingMode: 'verbose' | 'standard' | 'minimal';
}

const agentRegistry: Record<PortalType, AgentConfig[]> = {
  shipper: [
    {
      id: 'UserSessionAgent',
      name: 'User Session Manager',
      autonomy: false,
      confidenceThreshold: 0.85,
      retryAttempts: 3,
      escalationLevel: 'medium',
      loggingMode: 'standard'
    },
    {
      id: 'AnalyticsAgent',
      name: 'Analytics Processor',
      autonomy: true,
      confidenceThreshold: 0.90,
      retryAttempts: 2,
      escalationLevel: 'low',
      loggingMode: 'verbose'
    },
    {
      id: 'OpsQAIntelligenceAgent',
      name: 'QA Intelligence Monitor',
      autonomy: true,
      confidenceThreshold: 0.88,
      retryAttempts: 3,
      escalationLevel: 'medium',
      loggingMode: 'verbose'
    }
  ],
  broker: [
    {
      id: 'AgentConfidenceMonitor',
      name: 'Confidence Monitor',
      autonomy: true,
      confidenceThreshold: 0.92,
      retryAttempts: 2,
      escalationLevel: 'high',
      loggingMode: 'verbose'
    },
    {
      id: 'DeploymentGuardAgent',
      name: 'Deployment Guardian',
      autonomy: true,
      confidenceThreshold: 0.95,
      retryAttempts: 1,
      escalationLevel: 'critical',
      loggingMode: 'verbose'
    }
  ],
  carrier: [
    {
      id: 'PerformanceMonitorAgent',
      name: 'Performance Monitor',
      autonomy: true,
      confidenceThreshold: 0.87,
      retryAttempts: 3,
      escalationLevel: 'medium',
      loggingMode: 'standard'
    },
    {
      id: 'SecurityScannerAgent',
      name: 'Security Scanner',
      autonomy: true,
      confidenceThreshold: 0.93,
      retryAttempts: 2,
      escalationLevel: 'high',
      loggingMode: 'verbose'
    },
    {
      id: 'SelfHealingAgent',
      name: 'Self-Healing System',
      autonomy: true,
      confidenceThreshold: 0.89,
      retryAttempts: 5,
      escalationLevel: 'medium',
      loggingMode: 'verbose'
    }
  ],
  admin: [
    {
      id: 'SystemAdminAgent',
      name: 'System Administrator',
      autonomy: false,
      confidenceThreshold: 0.98,
      retryAttempts: 1,
      escalationLevel: 'critical',
      loggingMode: 'verbose'
    },
    {
      id: 'AuditLogAgent',
      name: 'Audit Logger',
      autonomy: true,
      confidenceThreshold: 0.95,
      retryAttempts: 2,
      escalationLevel: 'high',
      loggingMode: 'verbose'
    }
  ],
  driver: [
    {
      id: 'DriverSessionAgent',
      name: 'Driver Session Manager',
      autonomy: false,
      confidenceThreshold: 0.85,
      retryAttempts: 3,
      escalationLevel: 'medium',
      loggingMode: 'standard'
    },
    {
      id: 'HOSMonitorAgent',
      name: 'Hours of Service Monitor',
      autonomy: true,
      confidenceThreshold: 0.90,
      retryAttempts: 2,
      escalationLevel: 'high',
      loggingMode: 'verbose'
    }
  ]
};

/**
 * Assign agents to a specific portal type
 * @param portal - The portal type to assign agents to
 * @returns Array of agent configurations
 */
export function assignAgentsToPortal(portal: PortalType): AgentConfig[] {
  return agentRegistry[portal] || [];
}

/**
 * Get all agents for multiple portals
 * @param portals - Array of portal types
 * @returns Combined array of agent configurations
 */
export function assignAgentsToPortals(portals: PortalType[]): AgentConfig[] {
  return portals.flatMap(portal => assignAgentsToPortal(portal));
}

/**
 * Get agent configuration by ID
 * @param agentId - The agent ID to find
 * @returns Agent configuration or null if not found
 */
export function getAgentConfig(agentId: string): AgentConfig | null {
  for (const portalAgents of Object.values(agentRegistry)) {
    const agent = portalAgents.find(a => a.id === agentId);
    if (agent) return agent;
  }
  return null;
}

/**
 * Get all autonomous agents
 * @returns Array of autonomous agent configurations
 */
export function getAutonomousAgents(): AgentConfig[] {
  return Object.values(agentRegistry)
    .flat()
    .filter(agent => agent.autonomy);
}

/**
 * Get agents by escalation level
 * @param level - The escalation level to filter by
 * @returns Array of agent configurations with the specified escalation level
 */
export function getAgentsByEscalationLevel(level: AgentConfig['escalationLevel']): AgentConfig[] {
  return Object.values(agentRegistry)
    .flat()
    .filter(agent => agent.escalationLevel === level);
}

/**
 * Validate agent assignment for a portal
 * @param portal - The portal type
 * @param agentIds - Array of agent IDs to validate
 * @returns Validation result with errors if any
 */
export function validateAgentAssignment(portal: PortalType, agentIds: string[]): {
  valid: boolean;
  errors: string[];
  missingAgents: string[];
} {
  const assignedAgents = assignAgentsToPortal(portal);
  const assignedIds = assignedAgents.map(a => a.id);
  
  const missingAgents = agentIds.filter(id => !assignedIds.includes(id));
  const errors = missingAgents.map(id => `Agent ${id} is not assigned to portal ${portal}`);
  
  return {
    valid: missingAgents.length === 0,
    errors,
    missingAgents
  };
}

// Usage Examples:
// const assignedAgents = assignAgentsToPortal('carrier');
// console.log('Assigned:', assignedAgents);

// const allAutonomous = getAutonomousAgents();
// console.log('Autonomous agents:', allAutonomous);

// const criticalAgents = getAgentsByEscalationLevel('critical');
// console.log('Critical agents:', criticalAgents);
