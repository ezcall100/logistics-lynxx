import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all the autonomous agent-created pages
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
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
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
import LiveMonitoringPage from './pages/LiveMonitoringPage';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Main Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* Content Pages */}
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="/downloads" element={<DownloadsPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          
          {/* Technical Pages */}
          <Route path="/support" element={<SupportPage />} />
          <Route path="/documentation" element={<DocumentationPage />} />
          <Route path="/api-reference" element={<APIReferencePage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/partners" element={<PartnersPage />} />
          
          {/* Legal Pages */}
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/compliance" element={<CompliancePage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          
          {/* Authentication Pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          
          {/* User Dashboard Pages */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/billing" element={<BillingPage />} />
          
          {/* Business Intelligence Pages */}
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/performance" element={<PerformancePage />} />
          
          {/* TMS Core Features */}
          <Route path="/fleet-management" element={<FleetManagementPage />} />
          <Route path="/route-optimization" element={<RouteOptimizationPage />} />
          <Route path="/load-management" element={<LoadManagementPage />} />
          <Route path="/driver-management" element={<DriverManagementPage />} />
          
          {/* Portal Pages */}
          <Route path="/shipper-portal" element={<ShipperPortalPage />} />
          <Route path="/carrier-portal" element={<CarrierPortalPage />} />
          <Route path="/broker-portal" element={<BrokerPortalPage />} />
          <Route path="/admin-portal" element={<AdminPortalPage />} />
          <Route path="/super-admin" element={<SuperAdminPage />} />
          <Route path="/autonomous-dashboard" element={<AutonomousDashboardPage />} />
          
          {/* System Pages */}
          <Route path="/live-monitoring" element={<LiveMonitoringPage />} />
          <Route path="/system-health" element={<SystemHealthPage />} />
          <Route path="/status" element={<StatusPage />} />
          
          {/* Development Pages */}
          <Route path="/scalability" element={<ScalabilityPage />} />
          <Route path="/innovation" element={<InnovationPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/development" element={<DevelopmentPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="/release-notes" element={<ReleaseNotesPage />} />
          <Route path="/migration" element={<MigrationPage />} />
          
          {/* Training & Community */}
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/certification" element={<CertificationPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/help-center" element={<HelpCenterPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;