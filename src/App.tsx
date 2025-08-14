
import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground p-4">
        <h1 className="text-2xl font-bold">Autonomous TMS System</h1>
        <p className="text-sm opacity-90">24/7 Transportation Management Platform</p>
      </header>
      
      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card text-card-foreground p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-2">System Status</h2>
            <p className="text-green-600">✅ Security Fixed - Super Admin Access Only</p>
          </div>
          
          <div className="bg-card text-card-foreground p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-2">Active Agents</h2>
            <p className="text-blue-600">🤖 250+ Agents Ready</p>
          </div>
          
          <div className="bg-card text-card-foreground p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-2">Integrations</h2>
            <div className="space-y-1 text-sm">
              <p>🔗 GitHub Actions</p>
              <p>🔗 N8n Workflows</p>
              <p>🔗 Supabase Backend</p>
              <p>🔗 OpenAI Intelligence</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
