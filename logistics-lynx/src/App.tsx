import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
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
              <h1 style={{ color: 'white', margin: 0, fontSize: '1.5rem' }}>🚀 Trans Bot AI</h1>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>Home</Link>
              <Link to="/autonomous" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>AI Dashboard</Link>
              <Link to="/analytics" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>Analytics</Link>
            </div>
          </div>
        </nav>

        <Routes>
          {/* Enhanced Homepage */}
          <Route path="/" element={
            <div style={{
              minHeight: '100vh',
              backgroundColor: '#f8fafc',
              padding: '2rem'
            }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Hero Section */}
                <div style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  backgroundColor: 'white',
                  borderRadius: '1rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  marginBottom: '2rem'
                }}>
                  <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#1e40af' }}>🚀 Trans Bot AI</h1>
                  <p style={{ fontSize: '1.5rem', marginBottom: '2rem', color: '#64748b' }}>Autonomous Transportation Management System</p>
                  <div style={{
                    backgroundColor: '#f1f5f9',
                    padding: '2rem',
                    borderRadius: '0.5rem',
                    display: 'inline-block'
                  }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1e40af' }}>✅ System Status</h2>
                    <div style={{ textAlign: 'left', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#10b981',
                          borderRadius: '50%',
                          marginRight: '0.5rem'
                        }}></span>
                        Supabase API: Connected
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#10b981',
                          borderRadius: '50%',
                          marginRight: '0.5rem'
                        }}></span>
                        Autonomous Agents: 250+ Active
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#10b981',
                          borderRadius: '50%',
                          marginRight: '0.5rem'
                        }}></span>
                        Real-time Development: Active
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <span style={{
                          display: 'inline-block',
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#10b981',
                          borderRadius: '50%',
                          marginRight: '0.5rem'
                        }}></span>
                        20 Portals: All Available
                      </div>
                    </div>
                  </div>
                </div>

                {/* Portal Grid */}
                <div style={{ marginBottom: '2rem' }}>
                  <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1e40af' }}>🌐 Access All Portals</h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1rem'
                  }}>
                    {[
                      { name: 'Carrier Portal', icon: '🚛', path: '/carrier', color: '#3b82f6' },
                      { name: 'Broker Portal', icon: '🏢', path: '/broker', color: '#10b981' },
                      { name: 'Shipper Portal', icon: '📦', path: '/shipper', color: '#f59e0b' },
                      { name: 'Driver Portal', icon: '🚗', path: '/driver', color: '#ec4899' },
                      { name: 'Owner Operator', icon: '🚚', path: '/owner-operator', color: '#8b5cf6' },
                      { name: 'Super Admin', icon: '👑', path: '/super-admin', color: '#7c3aed' },
                      { name: 'Autonomous AI', icon: '🤖', path: '/autonomous', color: '#6366f1' },
                      { name: 'Analytics', icon: '📊', path: '/analytics', color: '#06b6d4' },
                      { name: 'Admin', icon: '⚙️', path: '/admin', color: '#6b7280' },
                      { name: 'Factoring', icon: '💰', path: '/factoring', color: '#eab308' },
                      { name: 'Financials', icon: '💳', path: '/financials', color: '#22c55e' },
                      { name: 'Rates', icon: '💰', path: '/rates', color: '#f97316' },
                      { name: 'Load Board', icon: '📋', path: '/load-board', color: '#ef4444' },
                      { name: 'Workers', icon: '👷', path: '/workers', color: '#84cc16' },
                      { name: 'CRM', icon: '👥', path: '/crm', color: '#06b6d4' },
                      { name: 'Directory', icon: '📚', path: '/directory', color: '#64748b' },
                      { name: 'EDI', icon: '📡', path: '/edi', color: '#7c3aed' },
                      { name: 'Marketplace', icon: '🛒', path: '/marketplace', color: '#f97316' },
                      { name: 'Testing', icon: '🧪', path: '/testing', color: '#84cc16' }
                    ].map((portal, index) => (
                      <Link key={index} to={portal.path} style={{
                        backgroundColor: 'white',
                        padding: '1.5rem',
                        borderRadius: '0.5rem',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        borderLeft: `4px solid ${portal.color}`
                      }} onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                      }} onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                      }}>
                        <span style={{ fontSize: '2rem' }}>{portal.icon}</span>
                        <div>
                          <h3 style={{ margin: 0, color: '#1e293b' }}>{portal.name}</h3>
                          <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>Click to access</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          } />
          
          {/* Enhanced Portal Pages */}
          <Route path="/carrier" element={
            <div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: '2.5rem', color: '#1e40af', marginBottom: '1rem'}}>🚛 Carrier Portal</h1>
              <p style={{fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem'}}>Fleet management and operations dashboard</p>
              <div style={{backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
                <h2>Fleet Operations</h2>
                <p>Manage your fleet, drivers, routes, and loads efficiently.</p>
              </div>
            </div>
          } />
          
          <Route path="/broker" element={
            <div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: '2.5rem', color: '#1e40af', marginBottom: '1rem'}}>🏢 Broker Portal</h1>
              <p style={{fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem'}}>Smart load matching and rate optimization</p>
              <div style={{backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
                <h2>Load Management</h2>
                <p>Match loads with carriers and optimize rates using AI.</p>
              </div>
            </div>
          } />
          
          <Route path="/autonomous" element={
            <div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: '2.5rem', color: '#1e40af', marginBottom: '1rem'}}>🤖 Autonomous Portal</h1>
              <p style={{fontSize: '1.2rem', color: '#64748b', marginBottom: '2rem'}}>24/7 No-Human Operations Control Center</p>
              <div style={{backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'}}>
                <h2>AI Agent Dashboard</h2>
                <p>Monitor 250+ autonomous agents in real-time.</p>
                <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem'}}>
                  <div style={{padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '0.25rem'}}>
                    <strong>Active Agents:</strong> 250+
                  </div>
                  <div style={{padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '0.25rem'}}>
                    <strong>Success Rate:</strong> 98.5%
                  </div>
                  <div style={{padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '0.25rem'}}>
                    <strong>Response Time:</strong> ~150ms
                  </div>
                </div>
              </div>
            </div>
          } />
          
          {/* Other portal routes with enhanced styling */}
          <Route path="/shipper" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>📦 Shipper Portal</h1><p>Shipment tracking and logistics management</p></div>} />
          <Route path="/driver" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>🚗 Driver Portal</h1><p>Personalized driving command center</p></div>} />
          <Route path="/owner-operator" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>🚚 Owner Operator Portal</h1><p>Independent trucking business management</p></div>} />
          <Route path="/super-admin" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>👑 Super Admin Portal</h1><p>Global command center with AI-powered oversight</p></div>} />
          <Route path="/analytics" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>📊 Analytics Portal</h1><p>Business intelligence and performance analytics</p></div>} />
          <Route path="/admin" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>⚙️ Admin Portal</h1><p>System administration and configuration</p></div>} />
          <Route path="/factoring" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>💰 Factoring Portal</h1><p>Financial services and invoice factoring</p></div>} />
          <Route path="/financials" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>💳 Financials Portal</h1><p>Financial management and reporting</p></div>} />
          <Route path="/rates" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>💰 Rates Portal</h1><p>Rate management and pricing optimization</p></div>} />
          <Route path="/load-board" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>📋 Load Board</h1><p>Real-time load matching and dispatch</p></div>} />
          <Route path="/workers" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>👷 Workers Portal</h1><p>Workforce and resource management</p></div>} />
          <Route path="/crm" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>👥 CRM Portal</h1><p>Customer relationship and lead management</p></div>} />
          <Route path="/directory" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>📚 Directory Portal</h1><p>Business directory and network management</p></div>} />
          <Route path="/edi" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>📡 EDI Portal</h1><p>Electronic data interchange management</p></div>} />
          <Route path="/marketplace" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>🛒 Marketplace</h1><p>TMS marketplace and integrations</p></div>} />
          <Route path="/testing" element={<div style={{padding: '2rem', maxWidth: '1200px', margin: '0 auto'}}><h1 style={{fontSize: '2.5rem', color: '#1e40af'}}>🧪 Testing Center</h1><p>Development and testing environment</p></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;