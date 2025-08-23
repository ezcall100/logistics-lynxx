import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { ErrorBoundary } from "./components/system/ErrorBoundary";

// Portal Components
import SuperAdminPortal from "./components/super-admin/EnhancedSuperAdminPortal";
import SoftwareAdminPortal from "./components/portals/SoftwareAdminPortal";
import CarrierPortal from "./components/portals/CarrierPortal";
import ShipperPortal from "./components/portals/ShipperPortal";
import BrokerPortal from "./components/portals/BrokerPortal";
import DriverPortal from "./components/portals/DriverPortal";
import AnalyticsPortal from "./components/portals/AnalyticsPortal";
import AutonomousPortal from "./components/portals/AutonomousPortal";

// Layout Components
import DashboardLayout from "./components/layout/DashboardLayout";
import LoadingSpinner from "./components/ui/LoadingSpinner";

export default function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontFamily: 'Inter, system-ui, Arial'
      }}>
        <LoadingSpinner />
        <p style={{ marginLeft: 16 }}>Loading Trans Bot AI...</p>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <Routes>
        {/* Super Admin Portal */}
        <Route 
          path="/super-admin/*" 
          element={
            <DashboardLayout>
              <SuperAdminPortal />
            </DashboardLayout>
          } 
        />

        {/* Software Admin Portal */}
        <Route 
          path="/software-admin/*" 
          element={
            <DashboardLayout>
              <SoftwareAdminPortal />
            </DashboardLayout>
          } 
        />

        {/* Carrier Portal */}
        <Route 
          path="/carrier/*" 
          element={
            <DashboardLayout>
              <CarrierPortal />
            </DashboardLayout>
          } 
        />

        {/* Shipper Portal */}
        <Route 
          path="/shipper/*" 
          element={
            <DashboardLayout>
              <ShipperPortal />
            </DashboardLayout>
          } 
        />

        {/* Broker Portal */}
        <Route 
          path="/broker/*" 
          element={
            <DashboardLayout>
              <BrokerPortal />
            </DashboardLayout>
          } 
        />

        {/* Driver Portal */}
        <Route 
          path="/driver/*" 
          element={
            <DashboardLayout>
              <DriverPortal />
            </DashboardLayout>
          } 
        />

        {/* Analytics Portal */}
        <Route 
          path="/analytics/*" 
          element={
            <DashboardLayout>
              <AnalyticsPortal />
            </DashboardLayout>
          } 
        />

        {/* Autonomous Portal */}
        <Route 
          path="/autonomous/*" 
          element={
            <DashboardLayout>
              <AutonomousPortal />
            </DashboardLayout>
          } 
        />

        {/* Default Route - Show Portal Selection */}
        <Route 
          path="/" 
          element={
            <div style={{ 
              padding: 24, 
              fontFamily: "Inter, system-ui, Arial",
              maxWidth: 1200,
              margin: '0 auto'
            }}>
              <h1>🚀 Trans Bot AI</h1>
              <p>Select your portal to get started:</p>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 16,
                marginTop: 24
              }}>
                <PortalCard 
                  title="Super Admin" 
                  description="System administration and configuration"
                  href="#/super-admin"
                  color="#dc2626"
                />
                <PortalCard 
                  title="Software Admin" 
                  description="Software management and deployment"
                  href="#/software-admin"
                  color="#2563eb"
                />
                <PortalCard 
                  title="Carrier" 
                  description="Carrier operations and fleet management"
                  href="#/carrier"
                  color="#059669"
                />
                <PortalCard 
                  title="Shipper" 
                  description="Shipping operations and logistics"
                  href="#/shipper"
                  color="#7c3aed"
                />
                <PortalCard 
                  title="Broker" 
                  description="Freight brokerage and matching"
                  href="#/broker"
                  color="#ea580c"
                />
                <PortalCard 
                  title="Driver" 
                  description="Driver interface and mobile app"
                  href="#/driver"
                  color="#0891b2"
                />
                <PortalCard 
                  title="Analytics" 
                  description="Business intelligence and reporting"
                  href="#/analytics"
                  color="#be185d"
                />
                <PortalCard 
                  title="Autonomous" 
                  description="AI-powered autonomous operations"
                  href="#/autonomous"
                  color="#65a30d"
                />
              </div>

              <section style={{ marginTop: 32 }}>
                <h3>Debug Info</h3>
                <pre style={{ 
                  whiteSpace: "pre-wrap", 
                  background: "#f5f5f5", 
                  padding: 12,
                  borderRadius: 4
                }}>
{`Current Path: ${location.pathname}
User: ${user ? user.email : 'Not authenticated'}
Loading: ${loading}`}
                </pre>
              </section>
            </div>
          } 
        />

        {/* Catch-all route */}
        <Route 
          path="*" 
          element={
            <div style={{ 
              padding: 24, 
              fontFamily: "Inter, system-ui, Arial",
              textAlign: 'center'
            }}>
              <h2>❓ Page Not Found</h2>
              <p>The route <code>{location.pathname}</code> doesn't exist.</p>
              <a href="#/" style={{ color: '#2563eb', textDecoration: 'none' }}>
                ← Back to Portal Selection
              </a>
            </div>
          } 
        />
      </Routes>
    </ErrorBoundary>
  );
}

// Portal Card Component
function PortalCard({ title, description, href, color }: {
  title: string;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <a 
      href={href}
      style={{
        display: 'block',
        padding: 24,
        border: `2px solid ${color}`,
        borderRadius: 8,
        textDecoration: 'none',
        color: 'inherit',
        transition: 'all 0.2s ease',
        background: 'white'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <h3 style={{ 
        margin: '0 0 8px 0', 
        color: color,
        fontSize: '1.25rem',
        fontWeight: 600
      }}>
        {title}
      </h3>
      <p style={{ 
        margin: 0, 
        color: '#6b7280',
        fontSize: '0.875rem',
        lineHeight: 1.5
      }}>
        {description}
      </p>
    </a>
  );
}
