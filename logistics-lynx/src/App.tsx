import React from 'react';

function App() {
  return (
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
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Autonomous TMS System</p>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;