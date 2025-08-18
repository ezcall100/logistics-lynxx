import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import {
  MetricCard,
  ChartCard,
  ActivityFeed,
  QuickActions,
  StatusIndicator,
  ProgressBar,
  DataTable,
  AlertCard
} from './components/DashboardComponents';
import {
  CarrierDashboard, BrokerDashboard, AutonomousDashboard, AnalyticsDashboard,
  ShipperDashboard, DriverDashboard, OwnerOperatorDashboard, SuperAdminDashboard
} from './components/PortalDashboards';
import { SoftwareCompanyDashboard } from './components/SoftwareCompanyDashboard';
import LogisticsManagementDashboard from './pages/LogisticsManagementDashboard';
import { MasterAutonomousAgentDashboard } from './autonomous/MasterAutonomousAgent.tsx';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';
import CarrierBrokerRiskReview from './components/onboarding/CarrierBrokerRiskReview';
import OnboardingReviewDashboard from './components/admin/OnboardingReviewDashboard';
import SuperAdminPortal from './components/super-admin/SuperAdminPortal';
import EnhancedSuperAdminPortal from './components/super-admin/EnhancedSuperAdminPortal';

import ShippersPortal from './components/portals/ShippersPortal';
import BrokersPortal from './components/portals/BrokersPortal';
import CarriersPortal from './components/portals/CarriersPortal';
import { AccessAllPortals } from './components/portals/AccessAllPortals';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Sample data for dashboards
  const carrierData = {
    metrics: [
      { title: 'Active Vehicles', value: '24', change: 12, icon: '🚛', color: '#3b82f6' },
      { title: 'Active Drivers', value: '18', change: 8, icon: '👤', color: '#10b981' },
      { title: 'Active Loads', value: '12', change: -3, icon: '📦', color: '#f59e0b' },
      { title: 'Revenue (MTD)', value: '$45,231', change: 23, icon: '💰', color: '#8b5cf6' }
    ],
    activities: [
      { type: 'success', title: 'Load #1234 delivered successfully', time: '2 minutes ago' },
      { type: 'warning', title: 'Vehicle #567 needs maintenance', time: '15 minutes ago' },
      { type: 'success', title: 'New driver John Smith onboarded', time: '1 hour ago' },
      { type: 'success', title: 'Route optimization completed', time: '2 hours ago' }
    ],
    quickActions: [
      { icon: '➕', label: 'Add Vehicle' },
      { icon: '👤', label: 'Add Driver' },
      { icon: '📦', label: 'Assign Load' },
      { icon: '🗺️', label: 'Plan Route' }
    ]
  };

  const brokerData = {
    metrics: [
      { title: 'Available Loads', value: '156', change: 15, icon: '📋', color: '#10b981' },
      { title: 'Active Carriers', value: '89', change: 7, icon: '🚛', color: '#3b82f6' },
      { title: 'Match Rate', value: '96.7%', change: 2.1, icon: '🎯', color: '#f59e0b' },
      { title: 'Revenue (MTD)', value: '$67,890', change: 18, icon: '💰', color: '#8b5cf6' }
    ],
    activities: [
      { type: 'success', title: 'Load matched with carrier ABC Trucking', time: '5 minutes ago' },
      { type: 'success', title: 'Rate negotiation completed for Load #5678', time: '20 minutes ago' },
      { type: 'warning', title: 'Carrier XYZ needs documentation update', time: '1 hour ago' },
      { type: 'success', title: 'New shipper account created', time: '2 hours ago' }
    ],
    quickActions: [
      { icon: '📋', label: 'Post Load' },
      { icon: '🚛', label: 'Add Carrier' },
      { icon: '💰', label: 'Set Rates' },
      { icon: '📊', label: 'View Analytics' }
    ]
  };

  const autonomousData = {
    metrics: [
      { title: 'Active Agents', value: '250+', change: 5, icon: '🤖', color: '#6366f1' },
      { title: 'Success Rate', value: '98.5%', change: 0.3, icon: '✅', color: '#10b981' },
      { title: 'Response Time', value: '~150ms', change: -12, icon: '⚡', color: '#f59e0b' },
      { title: 'Code Changes', value: '47', change: 23, icon: '💻', color: '#8b5cf6' }
    ],
    activities: [
      { type: 'success', title: 'Agent #123 completed code review', time: '1 minute ago' },
      { type: 'success', title: 'Deployment to staging successful', time: '5 minutes ago' },
      { type: 'success', title: 'Performance optimization completed', time: '15 minutes ago' },
      { type: 'warning', title: 'Agent #456 needs attention', time: '30 minutes ago' }
    ],
    quickActions: [
      { icon: '🤖', label: 'Add Agent' },
      { icon: '📊', label: 'View Metrics' },
      { icon: '⚙️', label: 'Configure' },
      { icon: '📝', label: 'View Logs' }
    ]
  };

  const analyticsData = {
    metrics: [
      { title: 'Total Revenue', value: '$234,567', change: 15, icon: '💰', color: '#10b981' },
      { title: 'Active Users', value: '1,234', change: 8, icon: '👥', color: '#3b82f6' },
      { title: 'Conversion Rate', value: '3.2%', change: 0.5, icon: '📈', color: '#f59e0b' },
      { title: 'Avg. Order Value', value: '$189', change: 12, icon: '🛒', color: '#8b5cf6' }
    ],
    activities: [
      { type: 'success', title: 'Monthly report generated', time: '10 minutes ago' },
      { type: 'success', title: 'New insights available', time: '1 hour ago' },
      { type: 'success', title: 'Data export completed', time: '2 hours ago' },
      { type: 'success', title: 'Performance alert resolved', time: '3 hours ago' }
    ],
    quickActions: [
      { icon: '📊', label: 'Generate Report' },
      { icon: '📈', label: 'View Trends' },
      { icon: '📤', label: 'Export Data' },
      { icon: '⚙️', label: 'Settings' }
    ]
  };

  // Sidebar menu structure for portals
  const portalMenus = {
    carrier: [
      { name: 'Dashboard', icon: '📊', path: '/carrier/dashboard' },
      { name: 'Fleet Management', icon: '🚛', submenu: [
        { name: 'Vehicles', path: '/carrier/vehicles' },
        { name: 'Drivers', path: '/carrier/drivers' },
        { name: 'Maintenance', path: '/carrier/maintenance' }
      ]},
      { name: 'Load Management', icon: '📦', submenu: [
        { name: 'Available Loads', path: '/carrier/loads' },
        { name: 'Active Loads', path: '/carrier/active-loads' },
        { name: 'Completed Loads', path: '/carrier/completed-loads' }
      ]},
      { name: 'Route Optimization', icon: '🗺️', path: '/carrier/routes' },
      { name: 'Reports', icon: '📈', path: '/carrier/reports' },
      { name: 'Settings', icon: '⚙️', path: '/carrier/settings' }
    ],
    broker: [
      { name: 'Dashboard', icon: '📊', path: '/broker/dashboard' },
      { name: 'Load Board', icon: '📋', submenu: [
        { name: 'Available Loads', path: '/broker/loads' },
        { name: 'Post Load', path: '/broker/post-load' },
        { name: 'Load History', path: '/broker/load-history' }
      ]},
      { name: 'Carrier Network', icon: '🚛', submenu: [
        { name: 'Carriers', path: '/broker/carriers' },
        { name: 'Add Carrier', path: '/broker/add-carrier' },
        { name: 'Carrier Ratings', path: '/broker/carrier-ratings' }
      ]},
      { name: 'Rate Management', icon: '💰', path: '/broker/rates' },
      { name: 'Analytics', icon: '📈', path: '/broker/analytics' },
      { name: 'Settings', icon: '⚙️', path: '/broker/settings' }
    ],
    autonomous: [
      { name: 'AI Dashboard', icon: '🤖', path: '/autonomous/dashboard' },
      { name: 'Agent Management', icon: '👥', submenu: [
        { name: 'Active Agents', path: '/autonomous/agents' },
        { name: 'Agent Performance', path: '/autonomous/performance' },
        { name: 'Agent Logs', path: '/autonomous/logs' }
      ]},
      { name: 'System Monitoring', icon: '📊', submenu: [
        { name: 'Real-time Metrics', path: '/autonomous/metrics' },
        { name: 'System Health', path: '/autonomous/health' },
        { name: 'Alert Management', path: '/autonomous/alerts' }
      ]},
      { name: 'Development', icon: '💻', submenu: [
        { name: 'Code Changes', path: '/autonomous/code' },
        { name: 'Deployments', path: '/autonomous/deployments' },
        { name: 'Testing', path: '/autonomous/testing' }
      ]},
      { name: 'Configuration', icon: '⚙️', path: '/autonomous/config' }
    ],
    analytics: [
      { name: 'Overview', icon: '📊', path: '/analytics/overview' },
      { name: 'Performance', icon: '📈', submenu: [
        { name: 'Business Metrics', path: '/analytics/business' },
        { name: 'Operational KPIs', path: '/analytics/operational' },
        { name: 'Financial Reports', path: '/analytics/financial' }
      ]},
      { name: 'Data Insights', icon: '🔍', submenu: [
        { name: 'Trend Analysis', path: '/analytics/trends' },
        { name: 'Predictive Analytics', path: '/analytics/predictive' },
        { name: 'Custom Reports', path: '/analytics/custom' }
      ]},
      { name: 'Export', icon: '📤', path: '/analytics/export' }
    ]
  };

  const Sidebar = ({ portalType }) => {
    const [expandedMenus, setExpandedMenus] = useState({});
    const menu = portalMenus[portalType] || [];

    const toggleMenu = (menuName) => {
      setExpandedMenus(prev => ({
        ...prev,
        [menuName]: !prev[menuName]
      }));
    };

  return (
      <div style={{
        width: sidebarOpen ? '280px' : '60px',
        backgroundColor: '#1e293b',
        color: 'white',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        transition: 'width 0.3s ease',
        overflowY: 'auto'
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '1rem',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {sidebarOpen && (
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
              {portalType.charAt(0).toUpperCase() + portalType.slice(1)} Portal
            </h2>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.25rem',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {sidebarOpen ? '◀' : '▶'}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav style={{ padding: '1rem 0' }}>
          {menu.map((item, index) => (
            <div key={index}>
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.name)}
                    style={{
                      width: 'calc(100% - 1rem)',
                      background: 'none',
                      border: 'none',
                      color: 'white',
                      padding: '0.75rem 1rem',
                      textAlign: 'left',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      fontSize: '0.875rem',
                      transition: 'background-color 0.2s',
                      borderRadius: '0.25rem',
                      margin: '0 0.5rem'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <span>{item.icon}</span>
                    {sidebarOpen && (
                      <>
                        <span style={{ flex: 1 }}>{item.name}</span>
                        <span style={{ 
                          transition: 'transform 0.2s',
                          transform: expandedMenus[item.name] ? 'rotate(90deg)' : 'rotate(0deg)'
                        }}>
                          ▶
                        </span>
                      </>
                    )}
                  </button>
                  {expandedMenus[item.name] && sidebarOpen && (
                    <div style={{ 
                      backgroundColor: '#0f172a',
                      margin: '0 0.5rem',
                      borderRadius: '0.25rem',
                      overflow: 'hidden'
                    }}>
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          to={subItem.path}
                          style={{
                            display: 'block',
                            padding: '0.5rem 1rem 0.5rem 3rem',
                            color: 'white',
                            textDecoration: 'none',
                            fontSize: '0.8rem',
                            transition: 'background-color 0.2s'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem 1rem',
                    color: 'white',
                    textDecoration: 'none',
                    fontSize: '0.875rem',
                    transition: 'background-color 0.2s',
                    borderRadius: '0.25rem',
                    margin: '0 0.5rem',
                    width: 'calc(100% - 1rem)'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span>{item.icon}</span>
                  {sidebarOpen && <span>{item.name}</span>}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div style={{
            padding: '1rem',
            borderTop: '1px solid #334155',
            marginTop: 'auto'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.75rem',
              color: '#94a3b8'
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: '#10b981'
              }} />
              System Online
            </div>
          </div>
        )}
      </div>
    );
  };

  const PortalLayout = ({ children, portalType, title, description }) => (
    <div style={{ display: 'flex' }}>
      <Sidebar portalType={portalType} />
      
      {/* Main content */}
      <div style={{
        marginLeft: sidebarOpen ? '280px' : '60px',
        flex: 1,
        transition: 'margin-left 0.3s ease'
      }}>
        {/* Top bar */}
        <div style={{
          backgroundColor: 'white',
          padding: '1rem 2rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.875rem', color: '#1e40af' }}>
              {title}
            </h1>
            <p style={{ margin: '0.25rem 0 0 0', color: '#64748b' }}>
              {description}
            </p>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ☰
          </button>
        </div>

        {/* Page content */}
        <div style={{ padding: '2rem', backgroundColor: '#f8fafc', minHeight: 'calc(100vh - 80px)' }}>
          {children}
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <GlobalErrorBoundary>
        <div className="App">
        {/* Navigation Header */}
        <nav style={{
          backgroundColor: '#1e40af',
          padding: '1rem 2rem',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h1 style={{ color: 'white', margin: 0, fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>🚀 Trans Bot AI</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div className="desktop-nav" style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>Home</Link>
              <Link to="/autonomous" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>AI Dashboard</Link>
              <Link to="/analytics" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>Analytics</Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer'
              }}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="mobile-menu">
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>Home</Link>
                <Link to="/autonomous" style={{ color: 'white', textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>AI Dashboard</Link>
                <Link to="/analytics" style={{ color: 'white', textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>Analytics</Link>
              </div>
            </div>
          )}
        </nav>

        <Routes>
          {/* Enhanced Homepage */}
          <Route path="/" element={
            <div style={{
              minHeight: '100vh',
              backgroundColor: '#f8fafc',
              padding: 'clamp(1rem, 4vw, 2rem)'
            }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Hero Section */}
                <div style={{
                  textAlign: 'center',
                  padding: 'clamp(2rem, 8vw, 4rem) clamp(1rem, 4vw, 2rem)',
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  marginBottom: '2rem'
                }}>
                  <h1 style={{ 
                    fontSize: 'clamp(2rem, 8vw, 3rem)', 
                    marginBottom: '1rem', 
                    color: '#1e40af',
                    lineHeight: '1.2'
                  }}>🚀 Trans Bot AI</h1>
                  <p style={{ 
                    fontSize: 'clamp(1rem, 4vw, 1.5rem)', 
                    marginBottom: '2rem', 
                    color: '#64748b',
                    lineHeight: '1.4'
                  }}>Autonomous Transportation Management System</p>
                  <div style={{
                    backgroundColor: '#f1f5f9',
                    padding: 'clamp(1rem, 4vw, 2rem)',
                    borderRadius: '0.5rem',
                    display: 'inline-block',
                    width: '100%',
                    maxWidth: '600px'
                  }}>
                    <h2 style={{ 
                      fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', 
                      marginBottom: '1rem', 
                      color: '#1e40af' 
                    }}>✅ System Status</h2>
                    <div className="status-grid" style={{ 
                      textAlign: 'left', 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                      gap: '1rem'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#10b981',
                          borderRadius: '50%',
                          marginRight: '0.5rem',
                          flexShrink: 0
                        }}></span>
                        <span style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>Supabase API: Connected</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#10b981',
                          borderRadius: '50%',
                          marginRight: '0.5rem',
                          flexShrink: 0
                        }}></span>
                        <span style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>Autonomous Agents: 250+ Active</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#10b981',
                          borderRadius: '50%',
                          marginRight: '0.5rem',
                          flexShrink: 0
                        }}></span>
                        <span style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>Real-time Development: Active</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#10b981',
                          borderRadius: '50%',
                          marginRight: '0.5rem',
                          flexShrink: 0
                        }}></span>
                        <span style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>20 Portals: All Available</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Portal Grid */}
                <div style={{ marginBottom: '2rem' }}>
                  {/* Radix UI redesign */}
                  <AccessAllPortals />
                </div>
              </div>
            </div>
          } />
          
          {/* Enhanced Portal Dashboards */}
          <Route path="/carrier/*" element={
            <PortalLayout portalType="carrier" title="🚛 Carrier Portal" description="Fleet management and operations dashboard">
              <CarrierDashboard />
            </PortalLayout>
          } />
          
          <Route path="/broker/*" element={
            <PortalLayout portalType="broker" title="🏢 Broker Portal" description="Smart load matching and rate optimization">
              <BrokerDashboard />
            </PortalLayout>
          } />
          
          <Route path="/autonomous/*" element={
            <PortalLayout portalType="autonomous" title="🤖 Autonomous Portal" description="24/7 No-Human Operations Control Center">
              <AutonomousDashboard />
            </PortalLayout>
          } />
          
          <Route path="/analytics/*" element={
            <PortalLayout portalType="analytics" title="📊 Analytics Portal" description="Business intelligence and performance analytics">
              <AnalyticsDashboard />
            </PortalLayout>
          } />
          
          {/* Other portal routes with basic layout */}
          <Route path="/shipper/*" element={
            <PortalLayout portalType="shipper" title="📦 Shipper Portal" description="Shipment tracking and logistics management">
              <ShipperDashboard />
            </PortalLayout>
          } />
          
          <Route path="/driver/*" element={
            <PortalLayout portalType="driver" title="🚗 Driver Portal" description="Personalized driving command center">
              <DriverDashboard />
            </PortalLayout>
          } />
          
          <Route path="/owner-operator/*" element={
            <PortalLayout portalType="owner-operator" title="🚚 Owner Operator Portal" description="Independent trucking business management">
              <OwnerOperatorDashboard />
            </PortalLayout>
          } />
          
          <Route path="/super-admin/*" element={<EnhancedSuperAdminPortal />} />
          
          <Route path="/admin/*" element={
            <PortalLayout portalType="admin" title="⚙️ Admin Portal" description="System administration and configuration">
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>Administration</h2>
                <p>System configuration and management.</p>
              </div>
            </PortalLayout>
          } />
          
          <Route path="/factoring/*" element={
            <PortalLayout portalType="factoring" title="💰 Factoring Portal" description="Financial services and invoice factoring">
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>Invoice Factoring</h2>
                <p>Manage your factoring services and payments.</p>
              </div>
            </PortalLayout>
          } />
          
          <Route path="/financials/*" element={
            <PortalLayout portalType="financials" title="💳 Financials Portal" description="Financial management and reporting">
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>Financial Management</h2>
                <p>Comprehensive financial reporting and management.</p>
              </div>
            </PortalLayout>
          } />
          
          <Route path="/rates/*" element={
            <PortalLayout portalType="rates" title="💰 Rates Portal" description="Rate management and pricing optimization">
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>Rate Management</h2>
                <p>Optimize your pricing and rate strategies.</p>
              </div>
            </PortalLayout>
          } />
          
          <Route path="/load-board/*" element={
            <PortalLayout portalType="load-board" title="📋 Load Board" description="Real-time load matching and dispatch">
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>Load Board</h2>
                <p>Real-time load matching and dispatch system.</p>
              </div>
            </PortalLayout>
          } />
          
          <Route path="/workers/*" element={
            <PortalLayout portalType="workers" title="👷 Workers Portal" description="Workforce and resource management">
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>Workforce Management</h2>
                <p>Manage your workforce and resources effectively.</p>
              </div>
            </PortalLayout>
          } />
          
          <Route path="/crm/*" element={
            <PortalLayout portalType="crm" title="👥 CRM Portal" description="Customer relationship and lead management">
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>Customer Relationship Management</h2>
                <p>Manage customer relationships and leads.</p>
              </div>
            </PortalLayout>
          } />
          
          <Route path="/directory/*" element={
            <PortalLayout portalType="directory" title="📚 Directory Portal" description="Business directory and network management">
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>Business Directory</h2>
                <p>Access and manage business network directory.</p>
              </div>
            </PortalLayout>
          } />
          
          <Route path="/edi/*" element={
            <PortalLayout portalType="edi" title="📡 EDI Portal" description="Electronic data interchange management">
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>EDI Management</h2>
                <p>Manage electronic data interchange processes.</p>
              </div>
            </PortalLayout>
          } />
          
          <Route path="/marketplace/*" element={
            <PortalLayout portalType="marketplace" title="🛒 Marketplace" description="TMS marketplace and integrations">
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>TMS Marketplace</h2>
                <p>Access integrations and services marketplace.</p>
              </div>
            </PortalLayout>
          } />
          
          <Route path="/testing/*" element={
            <PortalLayout portalType="testing" title="🧪 Testing Center" description="Development and testing environment">
              <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h2>Testing Environment</h2>
                <p>Development and testing tools and utilities.</p>
              </div>
            </PortalLayout>
          } />

          {/* Software Company Dashboard */}
          <Route path="/software-company/*" element={
            <PortalLayout portalType="software-company" title="👨‍💻 Software Company Portal" description="Software development and product management">
              <SoftwareCompanyDashboard />
            </PortalLayout>
          } />

          {/* Logistics Management Dashboard */}
          <Route path="/logistics-management" element={
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
              <LogisticsManagementDashboard />
            </div>
          } />

          {/* Master Autonomous Agent Dashboard */}
          <Route path="/master-autonomous-agent" element={
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
              <MasterAutonomousAgentDashboard />
            </div>
          } />

          {/* Phase 7.3: Carrier & Broker Compliant Risk Management Onboarding */}
          <Route path="/onboarding/carrier-broker-risk-review" element={
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
              <CarrierBrokerRiskReview />
            </div>
          } />

          {/* Phase 7.3: Admin Review Dashboard */}
          <Route path="/admin/onboarding-review" element={
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
              <OnboardingReviewDashboard />
            </div>
          } />



          <Route path="/shippers/portal" element={
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
              <ShippersPortal />
            </div>
          } />

          <Route path="/brokers/portal" element={
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
              <BrokersPortal />
            </div>
          } />

          <Route path="/carriers/portal" element={
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
              <CarriersPortal />
            </div>
          } />
        </Routes>
        </div>
      </GlobalErrorBoundary>
    </Router>
  );
}

export default App;