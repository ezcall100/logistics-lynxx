import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import SuperAdminDashboard from './pages/super-admin/dashboard/SuperAdminDashboard';
import './index.css';

function App() {
  return (
    <Router>
      <div data-theme="mcp-v2" className="min-h-screen bg-[color:var(--bg-app)] text-[color:var(--fg)]">
        <AppShell>
          <Routes>
            <Route path="/" element={<SuperAdminDashboard />} />
            <Route path="/super-admin" element={<SuperAdminDashboard />} />
            <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
          </Routes>
        </AppShell>
      </div>
    </Router>
  );
}

export default App;