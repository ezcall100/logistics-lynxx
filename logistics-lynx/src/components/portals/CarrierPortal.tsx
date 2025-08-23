import React from 'react';

export default function CarrierPortal() {
  return (
    <div>
      <h2>🚛 Carrier Portal</h2>
      <p>Welcome to the Carrier Operations Portal</p>
      
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
          <h3>📊 Fleet Management</h3>
          <p>Manage your fleet, drivers, and vehicles</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>📦 Load Board</h3>
          <p>Find and book available loads</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>💰 Financials</h3>
          <p>Track revenue, expenses, and payments</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>📈 Analytics</h3>
          <p>Performance metrics and reporting</p>
        </div>
      </div>
    </div>
  );
}
