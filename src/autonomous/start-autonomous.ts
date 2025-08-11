import { AutonomousTMSController } from './AutonomousTMSController';
import { AutonomousDevelopmentSystem } from './AutonomousDevelopmentSystem';

async function startAutonomousSystem() {
  try {
    console.log('🚀 Starting Autonomous TMS System...');
    
    // Initialize the autonomous development system
    const devSystem = new AutonomousDevelopmentSystem();
    await devSystem.initialize();
    
    // Initialize the TMS controller
    const tmsController = new AutonomousTMSController();
    await tmsController.initialize();
    
    console.log('✅ Autonomous TMS System started successfully');
    
    // Keep the process running
    process.on('SIGINT', async () => {
      console.log('\n🛑 Shutting down Autonomous TMS System...');
      await tmsController.shutdown();
      await devSystem.shutdown();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Failed to start Autonomous TMS System:', error);
    process.exit(1);
  }
}

startAutonomousSystem();
