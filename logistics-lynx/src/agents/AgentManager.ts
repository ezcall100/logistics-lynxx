export class AgentManager {
  private agents: Map<string, any> = new Map();

  constructor() {
    console.log('AgentManager initialized');
  }

  async registerAgent(agentId: string, agentConfig: any) {
    this.agents.set(agentId, agentConfig);
    console.log(`Agent ${agentId} registered`);
    return { success: true };
  }

  async startAgent(agentId: string) {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }
    console.log(`Agent ${agentId} started`);
    return { success: true };
  }

  async stopAgent(agentId: string) {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }
    console.log(`Agent ${agentId} stopped`);
    return { success: true };
  }

  async getAgentStatus(agentId: string) {
    const agent = this.agents.get(agentId);
    if (!agent) {
      throw new Error(`Agent ${agentId} not found`);
    }
    return { status: 'active', agent };
  }

  async getAllAgents() {
    return Array.from(this.agents.entries()).map(([id, config]) => ({
      id,
      config,
      status: 'active'
    }));
  }
}
