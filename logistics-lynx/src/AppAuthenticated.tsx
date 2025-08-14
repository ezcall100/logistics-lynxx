import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a QueryClient instance for autonomous data management
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function HomePage() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">
          Trans Bot AI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Autonomous TMS Platform for Modern Logistics
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <p className="text-green-600 font-semibold mb-4">
            ✅ React is working! The app is loading successfully.
          </p>
          <p className="text-gray-600 text-sm">
            Server is running on localhost:8080
          </p>
        </div>
        
        {/* Autonomous Agent Pages Links */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            🤖 Autonomous Agent-Created Pages
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a 
              href="/autonomous" 
              className="block p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              <h3 className="font-semibold">🚀 Autonomous Portal</h3>
              <p className="text-sm opacity-90">AI Dashboard & Agent Management</p>
            </a>
            <a 
              href="/super-admin" 
              className="block p-4 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all"
            >
              <h3 className="font-semibold">👑 Super Admin</h3>
              <p className="text-sm opacity-90">Complete System Control</p>
            </a>
            <a 
              href="/autonomous-tms" 
              className="block p-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
            >
              <h3 className="font-semibold">🤖 Autonomous TMS</h3>
              <p className="text-sm opacity-90">24/7 System Operation</p>
            </a>
            <a 
              href="/testing/autonomous-agents" 
              className="block p-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition-all"
            >
              <h3 className="font-semibold">🧪 Agent Testing</h3>
              <p className="text-sm opacity-90">Development & Testing Center</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppAuthenticated() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<div className="container mx-auto py-20 text-center">Login Page Coming Soon</div>} />
              <Route path="/signup" element={<div className="container mx-auto py-20 text-center">Sign Up Page Coming Soon</div>} />
              
              {/* Autonomous Agent-Created Pages */}
              <Route path="/autonomous" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">🤖 Autonomous Portal</h1>
                <p className="text-lg mb-8">AI Dashboard & Agent Management</p>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-blue-800">This page will be loaded with the full autonomous system components.</p>
                </div>
              </div>} />
              
              <Route path="/super-admin/*" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">👑 Super Admin Portal</h1>
                <p className="text-lg mb-8">Complete System Control & AI Analytics</p>
                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-green-800">This page will be loaded with the full super admin components.</p>
                </div>
              </div>} />
              
              <Route path="/autonomous-tms" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">🤖 Autonomous TMS System</h1>
                <p className="text-lg mb-8">24/7 Autonomous Operation</p>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <p className="text-purple-800">This page will be loaded with the full autonomous TMS components.</p>
                </div>
              </div>} />
              
              <Route path="/testing/*" element={<div className="container mx-auto py-20 text-center">
                <h1 className="text-3xl font-bold mb-4">🧪 Agent Testing Center</h1>
                <p className="text-lg mb-8">Development & Testing Environment</p>
                <div className="bg-orange-50 p-6 rounded-lg">
                  <p className="text-orange-800">This page will be loaded with the full testing components.</p>
                </div>
              </div>} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default AppAuthenticated;
