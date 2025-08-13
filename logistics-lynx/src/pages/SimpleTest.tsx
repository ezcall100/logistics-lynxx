import React from 'react';

const SimpleTest = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>🚀 React App is Working!</h1>
      <p>If you can see this, the React application is loading correctly.</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      <div style={{ 
        background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        marginTop: '20px'
      }}>
        <h2>✅ Success!</h2>
        <p>The application is running on the correct port and React is working.</p>
      </div>
    </div>
  );
};

export default SimpleTest;
