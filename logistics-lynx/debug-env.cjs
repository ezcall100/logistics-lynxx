require('dotenv').config();

console.log('🔍 Debug Environment Variables...\n');

// Check if OPENAI_API_KEY exists
const openaiKey = process.env.OPENAI_API_KEY;
console.log('OPENAI_API_KEY length:', openaiKey ? openaiKey.length : 'NOT FOUND');
console.log('OPENAI_API_KEY starts with:', openaiKey ? openaiKey.substring(0, 10) + '...' : 'NOT FOUND');

// List all environment variables that contain 'OPENAI'
console.log('\nAll environment variables containing "OPENAI":');
Object.keys(process.env).filter(key => key.includes('OPENAI')).forEach(key => {
  console.log(`${key}: ${process.env[key] ? 'SET' : 'NOT SET'}`);
});

// Test OpenAI API directly if we have a key
if (openaiKey) {
  console.log('\n🧠 Testing OpenAI API...');
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
        console.log('Response:', data);
      }
    });
  });

  req.on('error', (err) => {
    console.log('❌ OpenAI API connection error:', err.message);
  });

  req.end();
} else {
  console.log('❌ No OpenAI API key found in environment');
}
