import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function SimpleHomePage() {
  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          🚀 Autonomous Agent Test Page
        </h1>
        <p className="text-xl text-blue-700 mb-8">
          This is a test page to verify React is working
        </p>
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ✅ React is Working!
          </h2>
          <p className="text-gray-600">
            The autonomous agents are ready to build pages
          </p>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<SimpleHomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;