#!/usr/bin/env node

const WebSocket = require('ws');

console.log('🔌 Testing WebSocket Connection...');
console.log('='.repeat(50));

// Test WebSocket connection
function testWebSocketConnection() {
  console.log('🌐 Attempting to connect to WebSocket server...');
  
  const ws = new WebSocket('ws://localhost:8085');
  
  ws.on('open', () => {
    console.log('✅ WebSocket Connection: SUCCESSFUL');
    console.log('   Connected to autonomous agent server');
    console.log('   Ready to receive real-time updates');
    
    // Send a test message
    ws.send(JSON.stringify({
      type: 'test_connection',
      message: 'Testing real-time connection from website',
      timestamp: new Date().toISOString()
    }));
  });
  
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data);
      console.log('📨 Received message from autonomous agents:');
      console.log(`   Type: ${message.type}`);
      console.log(`   Timestamp: ${message.timestamp}`);
      
      if (message.type === 'agent_status') {
        console.log(`   Agents: ${message.data.length} agents available`);
        message.data.forEach(agent => {
          console.log(`   - ${agent.name}: ${agent.status}`);
        });
      } else if (message.type === 'real_time_update') {
        console.log(`   Recent Updates: ${message.recentUpdates.length} updates`);
        console.log(`   System Status: ${message.systemStatus.totalAgents} total agents`);
      }
      
      console.log('✅ Real-time data flow: WORKING');
      
    } catch (error) {
      console.log('❌ Error parsing message:', error.message);
    }
  });
  
  ws.on('error', (error) => {
    console.log('❌ WebSocket Connection: FAILED');
    console.log(`   Error: ${error.message}`);
  });
  
  ws.on('close', () => {
    console.log('🔌 WebSocket Connection: CLOSED');
  });
  
  // Keep connection open for 10 seconds to receive updates
  setTimeout(() => {
    console.log('⏰ Test completed - closing connection');
    ws.close();
  }, 10000);
}

// Test if the website can connect
function testWebsiteConnection() {
  console.log('\n🌐 Testing if website can connect to WebSocket...');
  
  const http = require('http');
  
  const req = http.request({
    hostname: 'localhost',
    port: 8084,
    path: '/',
    method: 'GET',
    timeout: 5000
  }, (res) => {
    console.log('✅ Website is accessible');
    console.log(`   Status: ${res.statusCode}`);
    console.log(`   Content-Type: ${res.headers['content-type']}`);
    
    // Now test WebSocket connection
    testWebSocketConnection();
  });
  
  req.on('error', (err) => {
    console.log('❌ Website not accessible');
    console.log(`   Error: ${err.message}`);
  });
  
  req.end();
}

// Run the test
console.log('🚀 Starting WebSocket Connection Test...\n');
testWebsiteConnection();
