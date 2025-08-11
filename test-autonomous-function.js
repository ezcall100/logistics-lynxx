// Test script for autonomous function
const fetch = require('node-fetch');

async function testAutonomousFunction() {
  console.log('🧪 Testing Autonomous AI Function...\n');
  
  try {
    // Test the introspect action
    const response = await fetch('http://127.0.0.1:54321/functions/v1/autonomous-ai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
      },
      body: JSON.stringify({
        action: 'introspect'
      })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Autonomous function is working!');
      console.log('Response:', JSON.stringify(data, null, 2));
    } else {
      console.log('❌ Function returned error:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('Error details:', errorText);
    }
  } catch (error) {
    console.log('❌ Failed to test autonomous function:', error.message);
    console.log('\n💡 Make sure Supabase is running locally:');
    console.log('   npx supabase start');
  }
}

testAutonomousFunction();
