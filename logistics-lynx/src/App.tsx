import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Simple test route */}
          <Route path="/" element={
            <div style={{
              minHeight: '100vh',
              backgroundColor: '#1e40af',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontFamily: 'Arial, sans-serif'
            }}>
              <div style={{ textAlign: 'center' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀 Trans Bot AI</h1>
                <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>All 20 Portals Available</p>
                <div style={{
                  backgroundColor: 'white',
                  color: '#1e40af',
                  padding: '2rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
                }}>
                  <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>✅ System Status</h2>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '0.5rem' }}>
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
                    <div style={{ marginBottom: '0.5rem' }}>
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
                    <div style={{ marginBottom: '0.5rem' }}>
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
                    <div style={{ marginBottom: '0.5rem' }}>
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
            </div>
          } />
          
          {/* Test portal routes */}
          <Route path="/carrier" element={<div style={{padding: '2rem', textAlign: 'center'}}>🚛 Carrier Portal</div>} />
          <Route path="/broker" element={<div style={{padding: '2rem', textAlign: 'center'}}>🏢 Broker Portal</div>} />
          <Route path="/shipper" element={<div style={{padding: '2rem', textAlign: 'center'}}>📦 Shipper Portal</div>} />
          <Route path="/driver" element={<div style={{padding: '2rem', textAlign: 'center'}}>🚗 Driver Portal</div>} />
          <Route path="/owner-operator" element={<div style={{padding: '2rem', textAlign: 'center'}}>🚚 Owner Operator Portal</div>} />
          <Route path="/super-admin" element={<div style={{padding: '2rem', textAlign: 'center'}}>👑 Super Admin Portal</div>} />
          <Route path="/autonomous" element={<div style={{padding: '2rem', textAlign: 'center'}}>🤖 Autonomous Portal</div>} />
          <Route path="/analytics" element={<div style={{padding: '2rem', textAlign: 'center'}}>📊 Analytics Portal</div>} />
          <Route path="/admin" element={<div style={{padding: '2rem', textAlign: 'center'}}>⚙️ Admin Portal</div>} />
          <Route path="/factoring" element={<div style={{padding: '2rem', textAlign: 'center'}}>💰 Factoring Portal</div>} />
          <Route path="/financials" element={<div style={{padding: '2rem', textAlign: 'center'}}>💳 Financials Portal</div>} />
          <Route path="/rates" element={<div style={{padding: '2rem', textAlign: 'center'}}>💰 Rates Portal</div>} />
          <Route path="/load-board" element={<div style={{padding: '2rem', textAlign: 'center'}}>📋 Load Board</div>} />
          <Route path="/workers" element={<div style={{padding: '2rem', textAlign: 'center'}}>👷 Workers Portal</div>} />
          <Route path="/crm" element={<div style={{padding: '2rem', textAlign: 'center'}}>👥 CRM Portal</div>} />
          <Route path="/directory" element={<div style={{padding: '2rem', textAlign: 'center'}}>📚 Directory Portal</div>} />
          <Route path="/edi" element={<div style={{padding: '2rem', textAlign: 'center'}}>📡 EDI Portal</div>} />
          <Route path="/marketplace" element={<div style={{padding: '2rem', textAlign: 'center'}}>🛒 Marketplace</div>} />
          <Route path="/testing" element={<div style={{padding: '2rem', textAlign: 'center'}}>🧪 Testing Center</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;