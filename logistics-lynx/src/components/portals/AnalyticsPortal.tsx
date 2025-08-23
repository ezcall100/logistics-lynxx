import React from 'react';

export default function AnalyticsPortal() {
  return (
    <div>
      <h2>📊 Analytics Portal</h2>
      <p>Welcome to the Business Intelligence Portal</p>
      
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
          <h3>📈 Performance Metrics</h3>
          <p>Key performance indicators and trends</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>💰 Financial Reports</h3>
          <p>Revenue, costs, and profitability analysis</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>🚛 Operational Insights</h3>
          <p>Fleet utilization and efficiency metrics</p>
        </div>
        
        <div style={{
          background: 'white',
          padding: 20,
          borderRadius: 8,
          border: '1px solid #e2e8f0'
        }}>
          <h3>🎯 Predictive Analytics</h3>
          <p>AI-powered forecasting and insights</p>
        </div>
      </div>
    </div>
  );
}
