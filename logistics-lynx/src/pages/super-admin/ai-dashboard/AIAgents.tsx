import React from 'react';

const AIAgents: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">AI Agents Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Development Agents</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Code Review Agent</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Testing Agent</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Deployment Agent</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Monitoring Agent</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Business Agents</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Pricing Agent</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Route Optimization</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Customer Service</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Analytics Agent</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">System Agents</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>Security Agent</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Backup Agent</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Performance Agent</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Integration Agent</span>
              <span className="text-green-600 font-semibold">Active</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Real-time Agent Activity</h2>
        <div className="space-y-2 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-green-500">●</span>
            <span>Code Review Agent: Reviewed 15 files in last 5 minutes</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-blue-500">●</span>
            <span>Testing Agent: Running automated tests on new features</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-purple-500">●</span>
            <span>Deployment Agent: Deploying updates to staging environment</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-orange-500">●</span>
            <span>Pricing Agent: Optimizing rates for 50+ active shipments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAgents;
