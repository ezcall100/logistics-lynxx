const http = require('http');

const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      console.log('📥 Received webhook:', body);
      
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({
        success: true,
        message: 'Mock webhook received successfully',
        timestamp: new Date().toISOString(),
        received_data: JSON.parse(body || '{}')
      }));
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`🚀 Mock webhook server running on http://localhost:${PORT}/webhook`);
  console.log('📝 This server will always return 200 for POST requests to /webhook');
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down mock webhook server...');
  server.close(() => {
    console.log('✅ Mock webhook server stopped');
    process.exit(0);
  });
});
