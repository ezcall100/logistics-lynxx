import { HealthCheckRunner } from '../autonomous-system/HealthCheckRunner.js';
import { LogManager } from '../autonomous-system/LogManager.js';

const logManager = new LogManager();

async function main() {
  try {
    logManager.log('🚀 Starting Health Check Runner...', 'info');
    
    const healthRunner = new HealthCheckRunner();
    
    // Initialize the runner
    await healthRunner.initialize();
    
    // Start monitoring
    await healthRunner.start();
    
    logManager.log('✅ Health Check Runner started successfully', 'success');
    logManager.log('🔍 Monitoring system health every 30 seconds...', 'info');
    
    // Keep the process running
    process.on('SIGINT', async () => {
      logManager.log('🛑 Shutting down Health Check Runner...', 'info');
      await healthRunner.stop();
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      logManager.log('🛑 Shutting down Health Check Runner...', 'info');
      await healthRunner.stop();
      process.exit(0);
    });
    
  } catch (error) {
    logManager.log(`❌ Failed to start Health Check Runner: ${error}`, 'error');
    process.exit(1);
  }
}

// Run the main function
main().catch((error) => {
  logManager.log(`❌ Unhandled error: ${error}`, 'error');
  process.exit(1);
});
