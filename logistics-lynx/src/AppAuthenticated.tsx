import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function SimpleHomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">Logistics Lynx TMS</h1>
        <p className="text-lg text-gray-600 mb-8">
          Autonomous Transportation Management System
        </p>
        <div className="space-y-4">
          <p className="text-sm text-gray-500">
            Welcome to the TMS platform. The application is loading...
          </p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AppAuthenticated() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<SimpleHomePage />} />
          <Route path="/login" element={<div className="container mx-auto py-20 text-center">Login Page Coming Soon</div>} />
          <Route path="/signup" element={<div className="container mx-auto py-20 text-center">Sign Up Page Coming Soon</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default AppAuthenticated;
