import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SoftwareAdminPortal from './components/portals/SoftwareAdminPortal';

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
            <div className="desktop-nav" style={{ display: 'flex', gap: '1rem' }}>
              <Link to="/" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>Home</Link>
              <Link to="/admin" style={{ color: 'white', textDecoration: 'none', padding: '0.5rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>Software Admin</Link>
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
                <Link to="/admin" style={{ color: 'white', textDecoration: 'none', padding: '0.75rem 1rem', borderRadius: '0.25rem', backgroundColor: 'rgba(255,255,255,0.1)' }}>Software Admin</Link>
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
                        <span style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>React App: Running</span>
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
                        <span style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>Software Admin: Available</span>
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
                        <span style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>Enhanced Sidebar: Active</span>
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
                        <span style={{ fontSize: 'clamp(0.875rem, 3vw, 1rem)' }}>FAB System: Ready</span>
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
                  }}>🌐 Access Portals</h2>
                  <div className="portal-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: 'clamp(0.75rem, 2vw, 1rem)'
                  }}>
                    <Link to="/admin" className="portal-card" style={{
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
                      borderLeft: '4px solid #6b7280',
                      minHeight: '80px'
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
                      }}>⚙️</span>
                      <div style={{ minWidth: 0 }}>
                        <h3 style={{ 
                          margin: 0, 
                          color: '#1e293b',
                          fontSize: 'clamp(1rem, 3vw, 1.125rem)',
                          lineHeight: '1.3'
                        }}>Software Admin Portal</h3>
                        <p style={{ 
                          margin: 0, 
                          color: '#64748b', 
                          fontSize: 'clamp(0.75rem, 2.5vw, 0.875rem)',
                          lineHeight: '1.4'
                        }}>Enhanced sidebar & FAB system</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          } />

          {/* Software Admin Portal */}
          <Route path="/admin" element={
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
              <SoftwareAdminPortal />
            </div>
          } />
          
          <Route path="/admin/software-admin" element={
            <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc' }}>
              <SoftwareAdminPortal />
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;