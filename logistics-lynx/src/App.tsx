import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import AutonomousDashboard from './pages/autonomous-dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/autonomous-dashboard" element={<AutonomousDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;