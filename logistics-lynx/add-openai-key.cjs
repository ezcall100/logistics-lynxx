const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🔑 Adding OpenAI API Key to .env file...\n');

rl.question('Please enter your OpenAI API key: ', (apiKey) => {
  if (!apiKey || apiKey.trim() === '') {
    console.log('❌ No API key provided');
    rl.close();
    return;
  }

  // Read existing .env file
  let envContent = '';
  try {
    envContent = fs.readFileSync('.env', 'utf8');
  } catch (error) {
    console.log('📝 Creating new .env file...');
  }

  // Check if OPENAI_API_KEY already exists
  if (envContent.includes('OPENAI_API_KEY=')) {
    // Replace existing key
    envContent = envContent.replace(/OPENAI_API_KEY=.*/g, `OPENAI_API_KEY=${apiKey}`);
    console.log('✅ Updated existing OPENAI_API_KEY');
  } else {
    // Add new key
    envContent += `\nOPENAI_API_KEY=${apiKey}\n`;
    console.log('✅ Added new OPENAI_API_KEY');
  }

  // Write back to .env file
  try {
    fs.writeFileSync('.env', envContent);
    console.log('✅ Successfully saved to .env file');
    
    // Test the key
    console.log('\n🧠 Testing OpenAI API key...');
    const https = require('https');
    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/models',
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + apiKey,
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
          console.log(`❌ OpenAI API key test failed. Status: ${res.statusCode}`);
        }
        rl.close();
      });
    });

    req.on('error', (err) => {
      console.log('❌ OpenAI API connection error:', err.message);
      rl.close();
    });

    req.end();
  } catch (error) {
    console.log('❌ Error saving to .env file:', error.message);
    rl.close();
  }
});
