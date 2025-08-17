import React from 'react';

// Enhanced Dashboard Components
export const MetricCard = ({ title, value, change, icon, color = '#1e40af' }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: `1px solid #e5e7eb`,
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer'
  }} onMouseEnter={(e) => {
    e.currentTarget.style.transform = 'translateY(-2px)';
    e.currentTarget.style.boxShadow = '0 10px 25px -3px rgba(0, 0, 0, 0.1)';
  }} onMouseLeave={(e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <div style={{
        width: '48px',
        height: '48px',
        borderRadius: '12px',
        backgroundColor: `${color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem'
      }}>
        {icon}
      </div>
      <div style={{
        padding: '0.25rem 0.75rem',
        borderRadius: '9999px',
        fontSize: '0.75rem',
        fontWeight: '600',
        backgroundColor: change > 0 ? '#dcfce7' : '#fef2f2',
        color: change > 0 ? '#166534' : '#dc2626'
      }}>
        {change > 0 ? '+' : ''}{change}%
      </div>
    </div>
    <h3 style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0 0 0.5rem 0', fontWeight: '500' }}>
      {title}
    </h3>
    <p style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827', margin: 0 }}>
      {value}
    </p>
  </div>
);

export const ChartCard = ({ title, children, height = '300px' }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb',
    height
  }}>
    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: '0 0 1rem 0' }}>
      {title}
    </h3>
    {children}
  </div>
);

export const ActivityFeed = ({ activities }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  }}>
    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: '0 0 1rem 0' }}>
      Recent Activity
    </h3>
    <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {activities.map((activity, index) => (
        <div key={index} style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.75rem 0',
          borderBottom: index < activities.length - 1 ? '1px solid #f3f4f6' : 'none'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: activity.type === 'success' ? '#10b981' : 
                           activity.type === 'warning' ? '#f59e0b' : '#ef4444',
            marginRight: '0.75rem'
          }} />
          <div style={{ flex: 1 }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#111827', fontWeight: '500' }}>
              {activity.title}
            </p>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.75rem', color: '#6b7280' }}>
              {activity.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const QuickActions = ({ actions }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  }}>
    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: '0 0 1rem 0' }}>
      Quick Actions
    </h3>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
      {actions.map((action, index) => (
        <button key={index} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          backgroundColor: '#f9fafb',
          cursor: 'pointer',
          transition: 'all 0.2s',
          fontSize: '0.875rem',
          fontWeight: '500'
        }} onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#f3f4f6';
          e.currentTarget.style.borderColor = '#d1d5db';
        }} onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#f9fafb';
          e.currentTarget.style.borderColor = '#e5e7eb';
        }}>
          <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{action.icon}</span>
          {action.label}
        </button>
      ))}
    </div>
  </div>
);

export const StatusIndicator = ({ status, label }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: status === 'online' ? '#dcfce7' : '#fef2f2',
    color: status === 'online' ? '#166534' : '#dc2626',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '600',
    width: 'fit-content'
  }}>
    <div style={{
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      backgroundColor: status === 'online' ? '#16a34a' : '#dc2626',
      marginRight: '0.5rem'
    }} />
    {label}
  </div>
);

export const ProgressBar = ({ value, max, label, color = '#1e40af' }) => (
  <div style={{ marginBottom: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>{label}</span>
      <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{value}/{max}</span>
    </div>
    <div style={{
      width: '100%',
      height: '8px',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px',
      overflow: 'hidden'
    }}>
      <div style={{
        width: `${(value / max) * 100}%`,
        height: '100%',
        backgroundColor: color,
        borderRadius: '4px',
        transition: 'width 0.3s ease'
      }} />
    </div>
  </div>
);

export const DataTable = ({ headers, data, title }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '0.75rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e5e7eb'
  }}>
    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: '0 0 1rem 0' }}>
      {title}
    </h3>
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
            {headers.map((header, index) => (
              <th key={index} style={{
                padding: '0.75rem',
                textAlign: 'left',
                fontSize: '0.875rem',
                fontWeight: '600',
                color: '#374151',
                backgroundColor: '#f9fafb'
              }}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} style={{
              borderBottom: '1px solid #f3f4f6',
              '&:hover': { backgroundColor: '#f9fafb' }
            }}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{
                  padding: '0.75rem',
                  fontSize: '0.875rem',
                  color: '#374151'
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export const AlertCard = ({ type, title, message, onDismiss }) => (
  <div style={{
    padding: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid',
    backgroundColor: type === 'success' ? '#f0fdf4' : 
                   type === 'warning' ? '#fffbeb' : 
                   type === 'error' ? '#fef2f2' : '#eff6ff',
    borderColor: type === 'success' ? '#bbf7d0' : 
                type === 'warning' ? '#fde68a' : 
                type === 'error' ? '#fecaca' : '#bfdbfe',
    color: type === 'success' ? '#166534' : 
           type === 'warning' ? '#92400e' : 
           type === 'error' ? '#dc2626' : '#1e40af',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '1rem'
  }}>
    <div>
      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', fontWeight: '600' }}>
        {title}
      </h4>
      <p style={{ margin: 0, fontSize: '0.75rem' }}>{message}</p>
    </div>
    {onDismiss && (
      <button onClick={onDismiss} style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '1.25rem',
        color: 'inherit',
        opacity: 0.7
      }}>
        ×
      </button>
    )}
  </div>
);
