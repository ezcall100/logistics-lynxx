import React, { useState } from 'react';

export default function SoftwareAdminPortal() {
  console.log('SoftwareAdminPortal component loaded successfully!');
  
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Enhanced Left Sidebar */}
      <div style={{
        width: isSidebarCollapsed ? '60px' : '280px',
        backgroundColor: '#1e293b',
        color: 'white',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
        transition: 'width 0.3s ease',
        overflowY: 'auto'
      }}>
        {/* Sidebar Header */}
        <div style={{
          padding: '1rem',
          borderBottom: '1px solid #334155',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          {!isSidebarCollapsed && (
            <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600' }}>
              Software Admin
            </h2>
          )}
          <button
            onClick={toggleSidebar}
            style={{
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '1.25rem',
              padding: '0.5rem',
              borderRadius: '0.25rem',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {isSidebarCollapsed ? '▶' : '◀'}
          </button>
        </div>

        {/* Navigation Menu */}
        <nav style={{ padding: '1rem 0' }}>
          {[
            { name: 'Dashboard', icon: '📊', path: '/admin/dashboard' },
            { name: 'Users', icon: '👥', path: '/admin/users' },
            { name: 'Settings', icon: '⚙️', path: '/admin/settings' },
            { name: 'Reports', icon: '📈', path: '/admin/reports' },
            { name: 'System', icon: '🔧', path: '/admin/system' }
          ].map((item, index) => (
            <div key={index} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              color: 'white',
              textDecoration: 'none',
              fontSize: '0.875rem',
              transition: 'background-color 0.2s',
              borderRadius: '0.25rem',
              margin: '0 0.5rem',
              cursor: 'pointer'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#334155'}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
              <span>{item.icon}</span>
              {!isSidebarCollapsed && <span>{item.name}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div style={{ marginLeft: isSidebarCollapsed ? '60px' : '280px', flex: 1, transition: 'margin-left 0.3s ease' }}>
        {/* Top Bar */}
        <header style={{
          height: '64px',
          borderBottom: '1px solid #e2e8f0',
          backgroundColor: 'white',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🌐</span>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Trans Bot AI</span>
              <span style={{ color: '#94a3b8' }}>▼</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {/* Command Palette */}
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 12px',
              fontSize: '14px',
              color: '#475569',
              backgroundColor: '#f1f5f9',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}>
              <span>🔍</span>
              <span>Search...</span>
              <span style={{ fontSize: '12px', backgroundColor: '#e2e8f0', padding: '2px 4px', borderRadius: '2px' }}>⌘K</span>
            </button>

            {/* Quick Add */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowQuickAdd(!showQuickAdd)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '6px 12px',
                  fontSize: '14px',
                  color: '#475569',
                  backgroundColor: '#f1f5f9',
                  borderRadius: '6px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e2e8f0'}
              >
                <span>➕</span>
                <span>Quick Add</span>
              </button>
              {showQuickAdd && (
                <div style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '4px',
                  width: '192px',
                  backgroundColor: 'white',
                  border: '1px solid #e2e8f0',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '4px 0',
                  zIndex: 50
                }}>
                  {['Lead', 'Contact', 'Opportunity', 'Ticket', 'Invoice', 'Load'].map((item, index) => (
                    <a key={index} href="#" style={{
                      display: 'block',
                      padding: '8px 12px',
                      fontSize: '14px',
                      color: '#374151',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s'
                    }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}>
                      {item}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Notifications */}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                position: 'relative',
                padding: '8px',
                color: '#475569',
                backgroundColor: 'transparent',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'background-color 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}
            >
              <span style={{ fontSize: '20px' }}>🔔</span>
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                height: '16px',
                width: '16px',
                backgroundColor: '#ef4444',
                color: 'white',
                fontSize: '12px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                3
              </span>
            </button>

            {/* Settings */}
            <button style={{
              padding: '8px',
              color: '#475569',
              backgroundColor: 'transparent',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f1f5f9'}>
              <span style={{ fontSize: '20px' }}>⚙️</span>
            </button>

            {/* Profile */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ fontSize: '16px', color: 'white' }}>👤</span>
              </div>
              <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>Admin User</span>
              <span style={{ color: '#94a3b8', fontSize: '16px' }}>▼</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
          {/* Welcome Section */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#1e293b', marginBottom: '8px' }}>
              Welcome to Software Admin
            </h1>
            <p style={{ color: '#64748b' }}>
              Manage your system, users, and configurations from one central location.
            </p>
          </div>

          {/* System Health Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '24px',
            marginBottom: '32px'
          }}>
            {[
              { title: 'System Status', value: 'Operational', icon: '✅', color: '#10b981' },
              { title: 'Active Users', value: '1,234', icon: '👥', color: '#3b82f6' },
              { title: 'API Latency', value: '75ms', icon: '⚡', color: '#8b5cf6' },
              { title: 'Open Tickets', value: '12', icon: '⚠️', color: '#f59e0b' }
            ].map((item, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                padding: '16px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    padding: '8px',
                    backgroundColor: `${item.color}20`,
                    borderRadius: '8px'
                  }}>
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: '14px', fontWeight: '500', color: '#6b7280', margin: 0 }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: '18px', fontWeight: '600', color: '#1e293b', margin: 0 }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Recent Activity</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { time: '10:30 AM', text: 'User John Doe logged in.' },
                { time: '09:45 AM', text: 'New customer Acme Corp added.' },
                { time: 'Yesterday', text: 'Autonomous agent #A7B9 completed task.' }
              ].map((item, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#374151' }}>
                  <span style={{ color: '#9ca3af' }}>{item.time}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Autonomous Agent Status */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            padding: '24px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Autonomous Agent Status</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}>
              {[
                { title: 'Active Agents', value: '250+', icon: '📈', color: '#10b981' },
                { title: 'Success Rate', value: '98.5%', icon: '⚡', color: '#3b82f6' },
                { title: 'Response Time', value: '~150ms', icon: '⏱️', color: '#8b5cf6' }
              ].map((item, index) => (
                <div key={index} style={{
                  textAlign: 'center',
                  padding: '16px',
                  background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}10 100%)`,
                  borderRadius: '8px'
                }}>
                  <span style={{ fontSize: '32px', color: item.color, marginBottom: '8px', display: 'block' }}>
                    {item.icon}
                  </span>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: item.color, margin: '0 0 4px 0' }}>
                    {item.value}
                  </p>
                  <p style={{ fontSize: '14px', color: item.color, margin: 0 }}>
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Floating Action Button */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 1000
      }}>
        <button style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
          fontSize: '24px',
          boxShadow: '0 4px 12px rgba(59, 130, 246, 0.4)',
          transition: 'all 0.2s ease'
        }} onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 16px rgba(59, 130, 246, 0.6)';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
        }}>
          ➕
        </button>
      </div>
    </div>
  );
}
