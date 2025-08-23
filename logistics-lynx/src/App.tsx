import { Routes, Route, Navigate } from "react-router-dom";
import EnhancedSuperAdminPortal from './components/super-admin/EnhancedSuperAdminPortal';
import MCPControlCenter from './components/super-admin/pages/MCPControlCenter';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/super-admin" replace />} />
      <Route path="/super-admin" element={<EnhancedSuperAdminPortal />}>
        {/* Default -> MCP intro */}
        <Route index element={<Navigate to="mcp/introduction" replace />} />
        <Route path="mcp/*" element={<MCPControlCenter />} />
        {/* Safety net */}
        <Route path="*" element={<Navigate to="mcp/introduction" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/super-admin" replace />} />
    </Routes>
  );
}
