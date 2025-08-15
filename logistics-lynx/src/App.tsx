import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './components/theme-provider';

// Import portal components
import BrokerPortal from './components/broker/BrokerPortal';
import CarrierPortal from './components/carrier/CarrierPortal';
import DriverPortal from './components/driver/DriverPortal';
import ShipperPortal from './components/shipper/ShipperPortal';
import OwnerOperatorPortal from './components/owner-operator/OwnerOperatorPortal';
import AdminPortal from './components/admin/AdminPortal';
import SuperAdminPortal from './components/super-admin/SuperAdminPortal';
import AutonomousPortal from './components/autonomous/AutonomousPortal';
import AnalyticsPortal from './components/analytics/AnalyticsPortal';

// Import authentication pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

// Import main pages
import HomePage from './pages/HomePage';
import Dashboard from './pages/Dashboard';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProductsPage from './pages/ProductsPage';
import PricingPage from './pages/PricingPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';
import SupportPage from './pages/SupportPage';
import DocumentationPage from './pages/DocumentationPage';
import APIReferencePage from './pages/APIReferencePage';
import IntegrationsPage from './pages/IntegrationsPage';
import PartnersPage from './pages/PartnersPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import TestimonialsPage from './pages/TestimonialsPage';
import NewsPage from './pages/NewsPage';
import EventsPage from './pages/EventsPage';
import ResourcesPage from './pages/ResourcesPage';
import DownloadsPage from './pages/DownloadsPage';
import SecurityPage from './pages/SecurityPage';
import CompliancePage from './pages/CompliancePage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import BillingPage from './pages/BillingPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ReportsPage from './pages/ReportsPage';
import FleetManagementPage from './pages/FleetManagementPage';
import RouteOptimizationPage from './pages/RouteOptimizationPage';
import LoadManagementPage from './pages/LoadManagementPage';
import DriverManagementPage from './pages/DriverManagementPage';
import ShipperPortalPage from './pages/ShipperPortalPage';
import CarrierPortalPage from './pages/CarrierPortalPage';
import BrokerPortalPage from './pages/BrokerPortalPage';
import AdminPortalPage from './pages/AdminPortalPage';
import SuperAdminPage from './pages/SuperAdminPage';
import AutonomousDashboardPage from './pages/AutonomousDashboardPage';
import PortalSelection from './pages/PortalSelection';
import LiveMonitoringPage from './pages/LiveMonitoringPage';
import { PORTALS, DEPRECATED_ROUTES } from './portals/registry';
import { LazyPortal } from './components/LazyPortal';
import { DeprecatedRoute } from './components/DeprecatedRoute';
import SystemHealthPage from './pages/SystemHealthPage';
import PerformancePage from './pages/PerformancePage';
import ScalabilityPage from './pages/ScalabilityPage';
import InnovationPage from './pages/InnovationPage';
import ResearchPage from './pages/ResearchPage';
import DevelopmentPage from './pages/DevelopmentPage';
import RoadmapPage from './pages/RoadmapPage';
import UpdatesPage from './pages/UpdatesPage';
import ReleaseNotesPage from './pages/ReleaseNotesPage';
import MigrationPage from './pages/MigrationPage';
import TrainingPage from './pages/TrainingPage';
import CertificationPage from './pages/CertificationPage';
import CommunityPage from './pages/CommunityPage';
import ForumPage from './pages/ForumPage';
import HelpCenterPage from './pages/HelpCenterPage';
import StatusPage from './pages/StatusPage';

// Import the enhanced ProtectedRoute
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              
              {/* Main Content Pages */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/downloads" element={<DownloadsPage />} />
              <Route path="/case-studies" element={<CaseStudiesPage />} />
              <Route path="/testimonials" element={<TestimonialsPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/documentation" element={<DocumentationPage />} />
              <Route path="/api-reference" element={<APIReferencePage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/partners" element={<PartnersPage />} />
              <Route path="/security" element={<SecurityPage />} />
              <Route path="/compliance" element={<CompliancePage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              
              {/* Portal Selection Route */}
              <Route path="/portal-selection" element={
                <ProtectedRoute>
                  <PortalSelection />
                </ProtectedRoute>
              } />
              
              {/* Protected Portal Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* Registry-based Portal Routes */}
              {PORTALS.map(portal => (
                <Route
                  key={portal.key}
                  path={portal.path}
                  element={
                    <ProtectedRoute 
                      requiredFlag={portal.featureFlag} 
                      allowedRoles={portal.roles}
                    >
                      <LazyPortal title={portal.title} portalKey={portal.key} />
                    </ProtectedRoute>
                  }
                />
              ))}

              {/* Deprecated Routes - Return 410 */}
              {Object.entries(DEPRECATED_ROUTES).map(([from, to]) => (
                <Route
                  key={from}
                  path={from}
                  element={
                    <div>
                      {(() => {
                        // Set HTTP status to 410 for deprecated routes
                        if (typeof window !== 'undefined') {
                          // This is a client-side workaround - in production you'd want server-side 410s
                          console.log(`410 Gone: ${from} → ${to}`);
                        }
                        return <DeprecatedRoute from={from} to={to} />;
                      })()}
                    </div>
                  }
                />
              ))}
              
              {/* User Dashboard Pages */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
              <Route path="/billing" element={
                <ProtectedRoute>
                  <BillingPage />
                </ProtectedRoute>
              } />
              
              {/* Business Intelligence Pages */}
              <Route path="/analytics-dashboard" element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              } />
              <Route path="/performance" element={
                <ProtectedRoute>
                  <PerformancePage />
                </ProtectedRoute>
              } />
              
              {/* TMS Core Features */}
              <Route path="/fleet-management" element={
                <ProtectedRoute>
                  <FleetManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/route-optimization" element={
                <ProtectedRoute>
                  <RouteOptimizationPage />
                </ProtectedRoute>
              } />
              <Route path="/load-management" element={
                <ProtectedRoute>
                  <LoadManagementPage />
                </ProtectedRoute>
              } />
              <Route path="/driver-management" element={
                <ProtectedRoute>
                  <DriverManagementPage />
                </ProtectedRoute>
              } />
              
              {/* Legacy Portal Pages (for backward compatibility) */}
              <Route path="/shipper-portal" element={<ShipperPortalPage />} />
              <Route path="/carrier-portal" element={<CarrierPortalPage />} />
              <Route path="/broker-portal" element={<BrokerPortalPage />} />
              <Route path="/admin-portal" element={<AdminPortalPage />} />
              <Route path="/autonomous-dashboard" element={<AutonomousDashboardPage />} />
              
              {/* System Pages */}
              <Route path="/live-monitoring" element={
                <ProtectedRoute>
                  <LiveMonitoringPage />
                </ProtectedRoute>
              } />
              <Route path="/system-health" element={
                <ProtectedRoute>
                  <SystemHealthPage />
                </ProtectedRoute>
              } />
              <Route path="/status" element={<StatusPage />} />
              
              {/* Development Pages */}
              <Route path="/scalability" element={
                <ProtectedRoute>
                  <ScalabilityPage />
                </ProtectedRoute>
              } />
              <Route path="/innovation" element={
                <ProtectedRoute>
                  <InnovationPage />
                </ProtectedRoute>
              } />
              <Route path="/research" element={
                <ProtectedRoute>
                  <ResearchPage />
                </ProtectedRoute>
              } />
              <Route path="/development" element={
                <ProtectedRoute>
                  <DevelopmentPage />
                </ProtectedRoute>
              } />
              <Route path="/roadmap" element={
                <ProtectedRoute>
                  <RoadmapPage />
                </ProtectedRoute>
              } />
              <Route path="/updates" element={
                <ProtectedRoute>
                  <UpdatesPage />
                </ProtectedRoute>
              } />
              <Route path="/release-notes" element={
                <ProtectedRoute>
                  <ReleaseNotesPage />
                </ProtectedRoute>
              } />
              <Route path="/migration" element={
                <ProtectedRoute>
                  <MigrationPage />
                </ProtectedRoute>
              } />
              
              {/* Training & Community */}
              <Route path="/training" element={
                <ProtectedRoute>
                  <TrainingPage />
                </ProtectedRoute>
              } />
              <Route path="/certification" element={
                <ProtectedRoute>
                  <CertificationPage />
                </ProtectedRoute>
              } />
              <Route path="/community" element={
                <ProtectedRoute>
                  <CommunityPage />
                </ProtectedRoute>
              } />
              <Route path="/forum" element={
                <ProtectedRoute>
                  <ForumPage />
                </ProtectedRoute>
              } />
              <Route path="/help-center" element={
                <ProtectedRoute>
                  <HelpCenterPage />
                </ProtectedRoute>
              } />
              
              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;