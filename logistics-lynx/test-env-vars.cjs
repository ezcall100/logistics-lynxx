require('dotenv').config();

console.log('🔍 Checking Environment Variables...\n');

// Check all relevant environment variables
const envVars = [
  'OPENAI_API_KEY',
  'NEXT_PUBLIC_OPENAI_API_KEY',
  'SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'GITHUB_TOKEN',
  'MCP_API_URL',
  'NEXT_PUBLIC_MCP_API_URL'
];

envVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}: CONFIGURED`);
  } else {
    console.log(`❌ ${varName}: NOT FOUND`);
  }
});

// Test OpenAI API if we have a key
console.log('\n🧠 Testing OpenAI API...');
const openaiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;

if (openaiKey) {
  const https = require('https');
  const options = {
    hostname: 'api.openai.com',
    port: 443,
    path: '/v1/models',
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + openaiKey,
      'Content-Type': 'application/json'
    }
  };

  const req = https.request(options, (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
      if (res.statusCode === 200) {
        console.log('✅ OpenAI API key is working!');
      } else {
        console.log(`❌ OpenAI API failed. Status: ${res.statusCode}`);
      }
    });
  });

  req.on('error', (err) => {
    console.log('❌ OpenAI API connection error:', err.message);
  });

  req.end();
} else {
  console.log('❌ No OpenAI API key found');
}
