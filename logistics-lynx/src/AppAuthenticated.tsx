import React from 'react';

function AppAuthenticated() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f0f9ff', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h1 style={{ 
          fontSize: '3rem', 
          fontWeight: 'bold', 
          color: '#2563eb', 
          marginBottom: '1rem' 
        }}>
          Trans Bot AI
        </h1>
        <p style={{ 
          fontSize: '1.25rem', 
          color: '#4b5563', 
          marginBottom: '2rem' 
        }}>
          Autonomous TMS Platform for Modern Logistics
        </p>
        <div style={{ 
          backgroundColor: 'white', 
          padding: '1.5rem', 
          borderRadius: '0.5rem', 
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' 
        }}>
          <p style={{ 
            color: '#059669', 
            fontWeight: 'bold',
            fontSize: '1.125rem'
          }}>
            ✅ React is working! The app is loading successfully.
          </p>
          <p style={{ 
            color: '#6b7280', 
            marginTop: '0.5rem',
            fontSize: '0.875rem'
          }}>
            Server is running on localhost:8080
          </p>
        </div>
      </div>
    </div>
  );
}

export default AppAuthenticated;
