import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './components/theme-provider';

// Import main pages
import ModernIndex from './pages/ModernIndex';
import AutonomousDashboardPage from './pages/AutonomousDashboardPage';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Main Routes */}
              <Route path="/" element={<ModernIndex />} />
              <Route path="/autonomous-dashboard" element={<AutonomousDashboardPage />} />
              
              {/* Catch-all route for 404 */}
              <Route path="*" element={<div>Page not found</div>} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;