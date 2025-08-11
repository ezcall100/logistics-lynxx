import { SystemHealthMonitor } from './SystemHealthMonitor';
async function startMonitoring() {
    try {
        console.log('🔍 Starting System Health Monitor...');
        const monitor = new SystemHealthMonitor();
        await monitor.initialize();
        console.log('✅ System Health Monitor started successfully');
        // Keep the process running
        process.on('SIGINT', async () => {
            console.log('\n🛑 Shutting down System Health Monitor...');
            await monitor.shutdown();
            process.exit(0);
        });
    }
    catch (error) {
        console.error('❌ Failed to start System Health Monitor:', error);
        process.exit(1);
    }
}
startMonitoring();
//# sourceMappingURL=start-monitoring.js.map