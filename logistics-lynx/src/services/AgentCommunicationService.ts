/* eslint-disable @typescript-eslint/no-explicit-any */
// Mock Agent Communication Service
export class AgentCommunicationService {
  async sendPortalUpdate(portalId: string, message: string): Promise<boolean> {
    console.log(`Portal update sent to ${portalId}: ${message}`);
    return true;
  }

  async getPortalUpdates(portalId: string): Promise<any[]> {
    console.log(`Getting portal updates for ${portalId}`);
    return [];
  }

  async sendAgentNotification(agentId: string, message: string): Promise<boolean> {
    console.log(`Notification sent to agent ${agentId}: ${message}`);
    return true;
  }
}