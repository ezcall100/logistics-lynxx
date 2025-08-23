import React from 'react';

export default function DriverPortal() {
  return (
    <div>
      <h2>🚗 Driver Portal</h2>
      <p>Welcome to the Driver Operations Portal</p>
      
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
          <h3>📱 Mobile App</h3>
          <p>Access your mobile driver interface</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>📋 Load Assignments</h3>
          <p>View and accept load assignments</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>📊 Hours & Pay</h3>
          <p>Track hours worked and earnings</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>📞 Communication</h3>
          <p>Contact dispatch and support</p>
        </div>
      </div>
    </div>
  );
}
