import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          🚀 TMS Autonomous System
        </h1>
        <p className="text-xl text-blue-700 mb-8">
          Website is working! Autonomous agents are active.
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            System Status
          </h2>
          <div className="space-y-2 text-left">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              <span>React App: Running</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              <span>Autonomous Agents: Active</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              <span>Development Server: Port 8088</span>
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-gray-600">
          If you can see this, the basic React app is working!
        </p>
      </div>
    </div>
  );
}

export default App;