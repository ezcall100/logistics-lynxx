import React from 'react';

export default function BrokerPortal() {
  return (
    <div>
      <h2>🤝 Broker Portal</h2>
      <p>Welcome to the Freight Broker Portal</p>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 16,
        marginTop: 24
      }}>
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>📋 Load Management</h3>
          <p>Manage customer loads and assignments</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>🚛 Carrier Matching</h3>
          <p>Match loads with available carriers</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>💰 Commission Tracking</h3>
          <p>Track commissions and payments</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>📈 Performance Analytics</h3>
          <p>Broker performance metrics</p>
        </div>
      </div>
    </div>
  );
}
