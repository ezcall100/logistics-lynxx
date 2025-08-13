// Simple OpenAI API test script
const https = require('https');

console.log('🧪 Testing OpenAI API directly...\n');

// You'll need to set your OpenAI API key
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.log('❌ OPENAI_API_KEY not found in environment variables');
  console.log('💡 Set your OpenAI API key:');
  console.log('   export OPENAI_API_KEY="your-api-key-here"');
  console.log('   or add it to your .env file');
  process.exit(1);
}

console.log('✅ OpenAI API key found');

// Test payload
const testPayload = {
  model: "gpt-4o-mini",
  messages: [
    {
      role: "system",
      content: "You are a helpful assistant that responds with short, concise answers."
    },
    {
      role: "user",
      content: "Say 'Hello from OpenAI API test!' and confirm you're working."
    }
  ],
  max_tokens: 100,
  temperature: 0.7
};

const postData = JSON.stringify(testPayload);

const options = {
  hostname: 'api.openai.com',
  port: 443,
  path: '/v1/chat/completions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('📡 Making API request to OpenAI...');

const req = https.request(options, (res) => {
  console.log(`📊 Response Status: ${res.statusCode}`);
  console.log(`📋 Response Headers:`, res.headers);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      
      if (res.statusCode === 200) {
        console.log('\n✅ OpenAI API is working!');
        console.log('🤖 Response:');
        console.log(response.choices[0].message.content);
        
        if (response.usage) {
          console.log('\n📊 Usage:');
          console.log(`   Prompt tokens: ${response.usage.prompt_tokens}`);
          console.log(`   Completion tokens: ${response.usage.completion_tokens}`);
          console.log(`   Total tokens: ${response.usage.total_tokens}`);
        }
      } else {
        console.log('\n❌ OpenAI API error:');
        console.log(response);
      }
    } catch (error) {
      console.log('\n❌ Error parsing response:');
      console.log(error);
      console.log('Raw response:', data);
    }
  });
});

req.on('error', (error) => {
  console.log('\n❌ Request error:');
  console.log(error);
});

req.write(postData);
req.end();

console.log('⏳ Waiting for response...\n');
