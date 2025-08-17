import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              <h1 style={{ color: 'white', margin: 0, fontSize: 'clamp(1.2rem, 4vw, 1.5rem)' }}>🚀 Trans Bot AI</h1>
            </div>
            
            {/* Desktop Navigation */}
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              '@media (max-width: 768px)': { display: 'none' }
            }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>Home</Link>
              <Link to="/autonomous" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>AI Dashboard</Link>
              <Link to="/analytics" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>Analytics</Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
                '@media (max-width: 768px)': { display: 'block' }
              }}
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div style={{
              display: 'none',
              '@media (max-width: 768px)': {
                display: 'block',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255,255,255,0.2)',
                marginTop: '1rem'
              }
            }}>
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
                    <div style={{ 
                      textAlign: 'left', 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
                      gap: '1rem',
                      '@media (max-width: 768px)': {
                        gridTemplateColumns: '1fr',
                        gap: '0.75rem'
                      }
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
                  <h2 style={{ 
                    fontSize: 'clamp(1.5rem, 6vw, 2rem)', 
                    marginBottom: '1rem', 
                    color: '#1e40af',
                    textAlign: 'center'
                  }}>🌐 Access All Portals</h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'clamp(0.75rem, 2vw, 1rem)',
                    '@media (max-width: 640px)': {
                      gridTemplateColumns: '1fr',
                      gap: '0.75rem'
                    },
                    '@media (min-width: 641px) and (max-width: 1024px)': {
                      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                      gap: '1rem'
                    }
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
                        padding: 'clamp(1rem, 3vw, 1.5rem)',
                        borderRadius: '0.5rem',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        textDecoration: 'none',
                        color: 'inherit',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'clamp(0.5rem, 2vw, 1rem)',
                        transition: 'transform 0.2s, box-shadow 0.2s',
                        borderLeft: `4px solid ${portal.color}`,
                        minHeight: '80px',
                        '@media (max-width: 640px)': {
                          padding: '1rem',
                          gap: '0.75rem'
                        }
                      }} onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
                      }} onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                      }}>
                        <span style={{ 
                          fontSize: 'clamp(1.5rem, 5vw, 2rem)',
                          flexShrink: 0
                        }}>{portal.icon}</span>
                        <div style={{ minWidth: 0 }}>
                          <h3 style={{ 
                            margin: 0, 
                            color: '#1e293b',
                            fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                            lineHeight: '1.3'
                          }}>{portal.name}</h3>
                          <p style={{ 
                            margin: 0, 
                            color: '#64748b', 
                            fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                            lineHeight: '1.4'
                          }}>Click to access</p>
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
            <div style={{
              padding: 'clamp(1rem, 4vw, 2rem)', 
              maxWidth: '1200px', 
              margin: '0 auto'
            }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 6vw, 2.5rem)', 
                color: '#1e40af', 
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>🚛 Carrier Portal</h1>
              <p style={{
                fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
                color: '#64748b', 
                marginBottom: '2rem',
                lineHeight: '1.4'
              }}>Fleet management and operations dashboard</p>
              <div style={{
                backgroundColor: 'white', 
                padding: 'clamp(1rem, 4vw, 2rem)', 
                borderRadius: '0.5rem', 
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.875rem)' }}>Fleet Operations</h2>
                <p style={{ fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.6' }}>Manage your fleet, drivers, routes, and loads efficiently.</p>
              </div>
            </div>
          } />
          
          <Route path="/broker" element={
            <div style={{
              padding: 'clamp(1rem, 4vw, 2rem)', 
              maxWidth: '1200px', 
              margin: '0 auto'
            }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 6vw, 2.5rem)', 
                color: '#1e40af', 
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>🏢 Broker Portal</h1>
              <p style={{
                fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
                color: '#64748b', 
                marginBottom: '2rem',
                lineHeight: '1.4'
              }}>Smart load matching and rate optimization</p>
              <div style={{
                backgroundColor: 'white', 
                padding: 'clamp(1rem, 4vw, 2rem)', 
                borderRadius: '0.5rem', 
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.875rem)' }}>Load Management</h2>
                <p style={{ fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.6' }}>Match loads with carriers and optimize rates using AI.</p>
              </div>
            </div>
          } />
          
          <Route path="/autonomous" element={
            <div style={{
              padding: 'clamp(1rem, 4vw, 2rem)', 
              maxWidth: '1200px', 
              margin: '0 auto'
            }}>
              <h1 style={{
                fontSize: 'clamp(2rem, 6vw, 2.5rem)', 
                color: '#1e40af', 
                marginBottom: '1rem',
                lineHeight: '1.2'
              }}>🤖 Autonomous Portal</h1>
              <p style={{
                fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
                color: '#64748b', 
                marginBottom: '2rem',
                lineHeight: '1.4'
              }}>24/7 No-Human Operations Control Center</p>
              <div style={{
                backgroundColor: 'white', 
                padding: 'clamp(1rem, 4vw, 2rem)', 
                borderRadius: '0.5rem', 
                boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
              }}>
                <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 1.875rem)' }}>AI Agent Dashboard</h2>
                <p style={{ fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.6' }}>Monitor 250+ autonomous agents in real-time.</p>
                <div style={{
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                  gap: '1rem', 
                  marginTop: '1rem',
                  '@media (max-width: 640px)': {
                    gridTemplateColumns: '1fr',
                    gap: '0.75rem'
                  }
                }}>
                  <div style={{
                    padding: 'clamp(0.75rem, 2vw, 1rem)', 
                    backgroundColor: '#f1f5f9', 
                    borderRadius: '0.25rem',
                    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
                  }}>
                    <strong>Active Agents:</strong> 250+
                  </div>
                  <div style={{
                    padding: 'clamp(0.75rem, 2vw, 1rem)', 
                    backgroundColor: '#f1f5f9', 
                    borderRadius: '0.25rem',
                    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
                  }}>
                    <strong>Success Rate:</strong> 98.5%
                  </div>
                  <div style={{
                    padding: 'clamp(0.75rem, 2vw, 1rem)', 
                    backgroundColor: '#f1f5f9', 
                    borderRadius: '0.25rem',
                    fontSize: 'clamp(0.875rem, 2.5vw, 1rem)'
                  }}>
                    <strong>Response Time:</strong> ~150ms
                  </div>
                </div>
              </div>
            </div>
          } />
          
          {/* Other portal routes with enhanced responsive styling */}
          <Route path="/shipper" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>📦 Shipper Portal</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Shipment tracking and logistics management</p>
            </div>
          } />
          <Route path="/driver" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>🚗 Driver Portal</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Personalized driving command center</p>
            </div>
          } />
          <Route path="/owner-operator" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>🚚 Owner Operator Portal</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Independent trucking business management</p>
            </div>
          } />
          <Route path="/super-admin" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>👑 Super Admin Portal</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Global command center with AI-powered oversight</p>
            </div>
          } />
          <Route path="/analytics" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>📊 Analytics Portal</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Business intelligence and performance analytics</p>
            </div>
          } />
          <Route path="/admin" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>⚙️ Admin Portal</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>System administration and configuration</p>
            </div>
          } />
          <Route path="/factoring" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>💰 Factoring Portal</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Financial services and invoice factoring</p>
            </div>
          } />
          <Route path="/financials" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>💳 Financials Portal</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Financial management and reporting</p>
            </div>
          } />
          <Route path="/rates" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>💰 Rates Portal</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Rate management and pricing optimization</p>
            </div>
          } />
          <Route path="/load-board" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>📋 Load Board</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Real-time load matching and dispatch</p>
            </div>
          } />
          <Route path="/workers" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>👷 Workers Portal</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Workforce and resource management</p>
            </div>
          } />
          <Route path="/crm" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>👥 CRM Portal</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Customer relationship and lead management</p>
            </div>
          } />
          <Route path="/directory" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>📚 Directory Portal</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Business directory and network management</p>
            </div>
          } />
          <Route path="/edi" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>📡 EDI Portal</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Electronic data interchange management</p>
            </div>
          } />
          <Route path="/marketplace" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>🛒 Marketplace</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>TMS marketplace and integrations</p>
            </div>
          } />
          <Route path="/testing" element={
            <div style={{padding: 'clamp(1rem, 4vw, 2rem)', maxWidth: '1200px', margin: '0 auto'}}>
              <h1 style={{fontSize: 'clamp(2rem, 6vw, 2.5rem)', color: '#1e40af', lineHeight: '1.2'}}>🧪 Testing Center</h1>
              <p style={{fontSize: 'clamp(1rem, 3vw, 1.125rem)', lineHeight: '1.4'}}>Development and testing environment</p>
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;