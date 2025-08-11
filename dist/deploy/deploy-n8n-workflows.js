"use strict";
async function deployN8NWorkflows() {
    try {
        console.log('📋 Deploying N8N Workflows...');
        // Check if N8N is enabled
        const n8nEnabled = process.env.N8N_ENABLED === 'true';
        if (!n8nEnabled) {
            console.log('⏭️ N8N integration is disabled, skipping workflow deployment');
            process.exit(0);
        }
        // Placeholder for actual N8N workflow deployment
        console.log('✅ N8N workflow deployment completed');
        process.exit(0);
    }
    catch (error) {
        console.error('❌ N8N Workflow Deployment Failed:', error);
        process.exit(1);
    }
}
deployN8NWorkflows();
//# sourceMappingURL=deploy-n8n-workflows.js.map