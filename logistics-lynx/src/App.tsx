/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Simple test component
const TestPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">🚀 Trans Bot AI</h1>
        <p className="text-xl text-blue-700 mb-8">Autonomous TMS System</p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">✅ System Status</h2>
          <div className="space-y-2 text-left">
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              <span>Supabase API: Connected</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              <span>Autonomous Agents: 250+ Active</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
              <span>Real-time Development: Active</span>
            </div>
          </div>
          <div className="mt-6 space-x-4">
            <a 
              href="/autonomous" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              🤖 Autonomous Dashboard
            </a>
            <a 
              href="/super-admin" 
              className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              👑 Super Admin
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

// Import the main components
import SuperAdminRoutes from './pages/super-admin/SuperAdminRoutes';
import AutonomousTMS from './pages/AutonomousTMS';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="/super-admin/*" element={<SuperAdminRoutes />} />
        <Route path="/autonomous" element={<AutonomousTMS />} />
      </Routes>
    </Router>
  );
}

export default App;