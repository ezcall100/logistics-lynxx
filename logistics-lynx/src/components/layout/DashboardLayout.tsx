import React from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#f8fafc',
      fontFamily: 'Inter, system-ui, Arial'
    }}>
      <header style={{
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        padding: '16px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
          🚀 Trans Bot AI
        </h1>
        <nav>
          <a href="#/" style={{ 
            color: '#2563eb', 
            textDecoration: 'none',
            marginLeft: 16
          }}>
            ← Back to Portals
          </a>
        </nav>
      </header>
      
      <main style={{ padding: 24 }}>
        {children}
      </main>
    </div>
  );
}
