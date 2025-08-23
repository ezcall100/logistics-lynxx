import { Routes, Route, Navigate } from "react-router-dom";
import EnhancedSuperAdminPortal from './components/super-admin/EnhancedSuperAdminPortal';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/super-admin" replace />} />
      <Route path="/super-admin/*" element={<EnhancedSuperAdminPortal />} />
      <Route path="*" element={<Navigate to="/super-admin" replace />} />
    </Routes>
  );
}
