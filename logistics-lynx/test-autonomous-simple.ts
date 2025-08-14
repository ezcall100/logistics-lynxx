#!/usr/bin/env node

console.log('🧪 Testing Autonomous System Components...');

try {
  console.log('📦 Importing LogManager...');
  const { LogManager } = await import('../autonomous-system/LogManager');
  console.log('✅ LogManager imported successfully');
  
  console.log('📦 Importing DatabaseManager...');
  const { DatabaseManager } = await import('../autonomous-system/DatabaseManager');
  console.log('✅ DatabaseManager imported successfully');
  
  console.log('📦 Importing NotificationManager...');
  const { NotificationManager } = await import('../autonomous-system/NotificationManager');
  console.log('✅ NotificationManager imported successfully');
  
  console.log('📦 Importing AutonomousTMSController...');
  const { AutonomousTMSController } = await import('../autonomous-system/AutonomousTMSController');
  console.log('✅ AutonomousTMSController imported successfully');
  
  console.log('📦 Importing PortalManager...');
  const { PortalManager } = await import('./src/agents/PortalManager');
  console.log('✅ PortalManager imported successfully');
  
  console.log('🎉 All imports successful!');
  
  // Test initialization
  console.log('🚀 Testing initialization...');
  const logManager = new LogManager();
  const dbManager = new DatabaseManager();
  const notificationManager = new NotificationManager();
  
  console.log('✅ Basic initialization successful!');
  
} catch (error) {
  console.error('❌ Test failed:', error);
  process.exit(1);
}
