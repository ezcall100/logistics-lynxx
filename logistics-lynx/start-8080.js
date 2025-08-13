const { spawn } = require('child_process');

console.log('🚀 Starting Vite server on port 8080...');
console.log('📍 Server will be available at: http://localhost:8080');
console.log('🌐 Server will bind to: 0.0.0.0:8080');

const vite = spawn('npx', ['vite', '--port', '8080', '--host', '0.0.0.0', '--strictPort'], {
  stdio: 'inherit',
  shell: true
});

vite.on('error', (error) => {
  console.error('❌ Failed to start Vite:', error);
});

vite.on('close', (code) => {
  console.log(`🏁 Vite process exited with code ${code}`);
});
