import { SystemHealthMonitor } from './SystemHealthMonitor';
async function performHealthCheck() {
    try {
        console.log('🏥 Performing System Health Check...');
        const monitor = new SystemHealthMonitor();
        await monitor.initialize();
        const healthStatus = await monitor.checkSystemHealth();
        if (healthStatus.isHealthy) {
            console.log('✅ System Health Check: PASSED');
            console.log('📊 Health Score:', healthStatus.score);
            console.log('🔧 Components:', healthStatus.components.join(', '));
            process.exit(0);
        }
        else {
            console.log('❌ System Health Check: FAILED');
            console.log('📊 Health Score:', healthStatus.score);
            console.log('🚨 Issues:', healthStatus.issues.join(', '));
            process.exit(1);
        }
    }
    catch (error) {
        console.error('❌ Health Check Failed:', error);
        process.exit(1);
    }
}
performHealthCheck();
//# sourceMappingURL=health-check.js.map