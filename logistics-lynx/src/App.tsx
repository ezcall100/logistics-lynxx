
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Simple test component
const TestPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
    <div className="text-center space-y-6">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-gray-900">
          🏢 TransBot AI
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Transportation Management System
        </p>
      </div>
      
      <div className="space-y-4">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          🚀 System is Working!
        </button>
        
        <div className="text-sm text-gray-500">
          <p>Development server is running successfully</p>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TestPage />} />
        <Route path="*" element={<TestPage />} />
      </Routes>
    </div>
  );
}

export default App;
