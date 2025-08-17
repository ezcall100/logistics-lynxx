
import { FC } from 'react';

const Dashboard: FC = () => {
  return (
    <div className="container mx-auto p-6">
      <header className="bg-primary text-primary-foreground p-4 rounded-lg mb-6">
        <h1 className="text-2xl font-bold">Autonomous TMS Dashboard</h1>
        <p className="text-sm opacity-90">24/7 Transportation Management Platform</p>
      </header>
      
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

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Quick Access Portals</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <a href="/super-admin" className="bg-red-100 hover:bg-red-200 p-4 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">👑</div>
            <div className="text-sm font-medium">Super Admin</div>
          </a>
          <a href="/broker" className="bg-blue-100 hover:bg-blue-200 p-4 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">🏢</div>
            <div className="text-sm font-medium">Broker</div>
          </a>
          <a href="/carrier" className="bg-green-100 hover:bg-green-200 p-4 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">🚛</div>
            <div className="text-sm font-medium">Carrier</div>
          </a>
          <a href="/driver" className="bg-yellow-100 hover:bg-yellow-200 p-4 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">🚗</div>
            <div className="text-sm font-medium">Driver</div>
          </a>
          <a href="/shipper" className="bg-purple-100 hover:bg-purple-200 p-4 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">📦</div>
            <div className="text-sm font-medium">Shipper</div>
          </a>
          <a href="/analytics" className="bg-orange-100 hover:bg-orange-200 p-4 rounded-lg text-center transition-colors">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm font-medium">Analytics</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
