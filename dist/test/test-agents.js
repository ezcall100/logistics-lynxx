import { DevelopmentAgents } from '../agents/DevelopmentAgents';
import { TMSDecisionAgent } from '../agents/TMSDecisionAgent';
async function testAgents() {
    try {
        console.log('🤖 Testing TMS Agents...');
        // Test development agents
        console.log('🔧 Testing Development Agents...');
        const devAgents = new DevelopmentAgents();
        await devAgents.initialize();
        await devAgents.shutdown();
        // Test TMS decision agent
        console.log('🧠 Testing TMS Decision Agent...');
        const decisionAgent = new TMSDecisionAgent();
        await decisionAgent.initialize();
        await decisionAgent.shutdown();
        console.log('✅ All agent tests completed successfully');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ Agent Tests Failed:', error);
        process.exit(1);
    }
}
testAgents();
//# sourceMappingURL=test-agents.js.map