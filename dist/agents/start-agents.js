import { DevelopmentAgents } from './DevelopmentAgents';
import { TMSDecisionAgent } from './TMSDecisionAgent';
async function startAgents() {
    try {
        console.log('🤖 Starting TMS Agents...');
        // Initialize development agents
        const devAgents = new DevelopmentAgents();
        await devAgents.initialize();
        // Initialize TMS decision agent
        const decisionAgent = new TMSDecisionAgent();
        await decisionAgent.initialize();
        console.log('✅ TMS Agents started successfully');
        // Keep the process running
        process.on('SIGINT', async () => {
            console.log('\n🛑 Shutting down TMS Agents...');
            await decisionAgent.shutdown();
            await devAgents.shutdown();
            process.exit(0);
        });
    }
    catch (error) {
        console.error('❌ Failed to start TMS Agents:', error);
        process.exit(1);
    }
}
startAgents();
//# sourceMappingURL=start-agents.js.map