/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const TestPage = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333' }}>✅ React App is Working!</h1>
      <p>If you can see this page, your React application is loading correctly.</p>
      
      <div style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        margin: '20px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h2>Current Status:</h2>
        <ul>
          <li>✅ React is running</li>
          <li>✅ Routing is working</li>
          <li>✅ Components are rendering</li>
          <li>✅ Development server is accessible</li>
        </ul>
      </div>
      
      <div style={{ 
        background: '#e8f5e8', 
        padding: '15px', 
        borderRadius: '8px',
        border: '1px solid #4caf50'
      }}>
        <h3>Next Steps:</h3>
        <p>Your React app is working! The blank page issue might be related to:</p>
        <ul>
          <li>Browser cache - try hard refresh (Ctrl+F5)</li>
          <li>JavaScript errors in console - check F12</li>
          <li>Component loading issues</li>
          <li>CSS/styling problems</li>
        </ul>
      </div>
      
      <button 
        onClick={() => window.location.href = '/'}
        style={{
          background: '#007bff',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          margin: '10px 5px'
        }}
      >
        Go to Home
      </button>
      
      <button 
        onClick={() => window.location.href = '/portal'}
        style={{
          background: '#28a745',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '4px',
          cursor: 'pointer',
          margin: '10px 5px'
        }}
      >
        Go to Portal
      </button>
    </div>
  );
};

export default TestPage;
