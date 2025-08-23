import React from 'react';

export default function ShipperPortal() {
  return (
    <div>
      <h2>📦 Shipper Portal</h2>
      <p>Welcome to the Shipper Operations Portal</p>
      
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
          <h3>🚚 Shipment Management</h3>
          <p>Create and track shipments</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>💵 Rate Quotes</h3>
          <p>Get competitive rate quotes</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>📊 Analytics</h3>
          <p>Shipping performance insights</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>🤝 Carrier Network</h3>
          <p>Connect with reliable carriers</p>
        </div>
      </div>
    </div>
  );
}
