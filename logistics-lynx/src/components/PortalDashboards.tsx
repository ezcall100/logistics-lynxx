import React, { useState } from 'react';
import {
  MetricCard,
  ChartCard,
  ActivityFeed,
  QuickActions,
  StatusIndicator,
  ProgressBar,
  DataTable,
  AlertCard
} from './DashboardComponents';

// Enhanced Portal Dashboard Components
export const CarrierDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [userRole, setUserRole] = useState('fleet-manager'); // fleet-manager, dispatcher, driver, owner, admin
  
  const fleetData = {
    vehicles: [
      { id: 'V001', type: 'Semi-Truck', status: 'Active', driver: 'John Smith', location: 'Chicago, IL', fuel: 85, maintenance: 'Good', nextService: '2024-02-15' },
      { id: 'V002', type: 'Box Truck', status: 'Maintenance', driver: 'Mike Johnson', location: 'Detroit, MI', fuel: 45, maintenance: 'Due', nextService: '2024-01-20' },
      { id: 'V003', type: 'Semi-Truck', status: 'Active', driver: 'Sarah Wilson', location: 'Atlanta, GA', fuel: 92, maintenance: 'Good', nextService: '2024-02-20' },
      { id: 'V004', type: 'Flatbed', status: 'Active', driver: 'David Brown', location: 'Dallas, TX', fuel: 78, maintenance: 'Good', nextService: '2024-02-25' }
    ],
    drivers: [
      { id: 'D001', name: 'John Smith', status: 'Active', rating: 4.8, hours: 42, location: 'Chicago, IL', license: 'Valid', medical: 'Valid', eldStatus: 'Compliant' },
      { id: 'D002', name: 'Mike Johnson', status: 'Off Duty', rating: 4.5, hours: 38, location: 'Detroit, MI', license: 'Valid', medical: 'Valid', eldStatus: 'Compliant' },
      { id: 'D003', name: 'Sarah Wilson', status: 'Active', rating: 4.9, hours: 45, location: 'Atlanta, GA', license: 'Valid', medical: 'Valid', eldStatus: 'Compliant' },
      { id: 'D004', name: 'David Brown', status: 'Active', rating: 4.7, hours: 40, location: 'Dallas, TX', license: 'Valid', medical: 'Valid', eldStatus: 'Compliant' }
    ],
    loads: [
      { id: 'L001', origin: 'Chicago, IL', destination: 'Atlanta, GA', status: 'In Transit', value: '$2,500', eta: '2 hours', driver: 'John Smith', vehicle: 'V001', fuelUsed: 45, miles: 750 },
      { id: 'L002', origin: 'Detroit, MI', destination: 'Dallas, TX', status: 'Loading', value: '$3,200', eta: '4 hours', driver: 'Mike Johnson', vehicle: 'V002', fuelUsed: 0, miles: 0 },
      { id: 'L003', origin: 'Atlanta, GA', destination: 'Chicago, IL', status: 'Delivered', value: '$2,800', eta: 'Completed', driver: 'Sarah Wilson', vehicle: 'V003', fuelUsed: 42, miles: 720 },
      { id: 'L004', origin: 'Dallas, TX', destination: 'Detroit, MI', status: 'Scheduled', value: '$2,900', eta: '6 hours', driver: 'David Brown', vehicle: 'V004', fuelUsed: 0, miles: 0 }
    ],
    financials: {
      revenue: { mtd: 45600, ytd: 234500, projected: 280000 },
      expenses: { fuel: 12500, maintenance: 8500, insurance: 4200, other: 6800 },
      profit: { mtd: 13600, ytd: 213500, margin: 91.1 }
    }
  };

  // Role-based tab configuration
  const getTabsForRole = (role: string) => {
    const baseTabs = [
      { id: 'overview', label: 'Overview', icon: '📊' },
      { id: 'fleet', label: 'Fleet Management', icon: '🚛' },
      { id: 'loads', label: 'Load Management', icon: '📦' },
      { id: 'drivers', label: 'Driver Management', icon: '👤' },
      { id: 'routes', label: 'Route Optimization', icon: '🗺️' },
      { id: 'maintenance', label: 'Maintenance', icon: '🔧' }
    ];

    switch (role) {
      case 'fleet-manager':
        return [
          ...baseTabs,
          { id: 'analytics', label: 'Analytics', icon: '📈' },
          { id: 'compliance', label: 'Compliance', icon: '✅' },
          { id: 'reports', label: 'Reports', icon: '📋' }
        ];
      case 'dispatcher':
        return [
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'loads', label: 'Load Management', icon: '📦' },
          { id: 'drivers', label: 'Driver Management', icon: '👤' },
          { id: 'routes', label: 'Route Optimization', icon: '🗺️' },
          { id: 'tracking', label: 'Real-time Tracking', icon: '📍' },
          { id: 'scheduling', label: 'Scheduling', icon: '📅' }
        ];
      case 'driver':
        return [
          { id: 'overview', label: 'My Dashboard', icon: '📊' },
          { id: 'current-load', label: 'Current Load', icon: '📦' },
          { id: 'route', label: 'Route Info', icon: '🗺️' },
          { id: 'documents', label: 'Documents', icon: '📋' },
          { id: 'earnings', label: 'Earnings', icon: '💰' },
          { id: 'compliance', label: 'Compliance', icon: '✅' }
        ];
      case 'owner':
        return [
          { id: 'overview', label: 'Business Overview', icon: '📊' },
          { id: 'financials', label: 'Financial Management', icon: '💰' },
          { id: 'fleet', label: 'Fleet Management', icon: '🚛' },
          { id: 'analytics', label: 'Analytics', icon: '📈' },
          { id: 'compliance', label: 'Compliance', icon: '✅' },
          { id: 'reports', label: 'Reports', icon: '📋' }
        ];
      case 'admin':
        return [
          { id: 'overview', label: 'System Overview', icon: '📊' },
          { id: 'users', label: 'User Management', icon: '👥' },
          { id: 'settings', label: 'System Settings', icon: '⚙️' },
          { id: 'compliance', label: 'Compliance', icon: '✅' },
          { id: 'reports', label: 'Reports', icon: '📋' },
          { id: 'audit', label: 'Audit Logs', icon: '📝' }
        ];
      default:
        return baseTabs;
    }
  };

  const tabs = getTabsForRole(userRole);

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      {/* Role Selector */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: '600', color: '#374151' }}>Role:</span>
          {['fleet-manager', 'dispatcher', 'driver', 'owner', 'admin'].map(role => (
            <button
              key={role}
              onClick={() => setUserRole(role)}
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                backgroundColor: userRole === role ? '#1e40af' : '#f3f4f6',
                color: userRole === role ? 'white' : '#374151'
              }}
            >
              {role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <AlertCard 
        type="success" 
        title="TMS System Status" 
        message={`Carrier Portal TMS is operating normally. ${userRole.replace('-', ' ')} dashboard active.`}
        onDismiss={() => {}}
      />
      
      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                backgroundColor: selectedTab === tab.id ? '#1e40af' : '#f3f4f6',
                color: selectedTab === tab.id ? 'white' : '#374151'
              }}
              onMouseEnter={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <>
          {/* Role-specific metrics */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {userRole === 'fleet-manager' && (
              <>
                <MetricCard title="Active Vehicles" value="24" change={12} icon="🚛" color="#3b82f6" />
                <MetricCard title="Active Drivers" value="18" change={8} icon="👤" color="#10b981" />
                <MetricCard title="Active Loads" value="12" change={-3} icon="📦" color="#f59e0b" />
                <MetricCard title="Revenue (MTD)" value="$45,600" change={23} icon="💰" color="#8b5cf6" />
              </>
            )}
            {userRole === 'dispatcher' && (
              <>
                <MetricCard title="Pending Loads" value="8" change={2} icon="📦" color="#f59e0b" />
                <MetricCard title="Available Drivers" value="6" change={1} icon="👤" color="#10b981" />
                <MetricCard title="In Transit" value="12" change={-1} icon="🚛" color="#3b82f6" />
                <MetricCard title="On-Time Rate" value="96%" change={2} icon="✅" color="#8b5cf6" />
              </>
            )}
            {userRole === 'driver' && (
              <>
                <MetricCard title="Current Load" value="L001" change={0} icon="📦" color="#f59e0b" />
                <MetricCard title="Hours This Week" value="42" change={5} icon="⏰" color="#3b82f6" />
                <MetricCard title="Miles Driven" value="750" change={120} icon="🚗" color="#10b981" />
                <MetricCard title="This Week's Pay" value="$1,250" change={150} icon="💰" color="#8b5cf6" />
              </>
            )}
            {userRole === 'owner' && (
              <>
                <MetricCard title="Monthly Revenue" value="$45,600" change={15} icon="💰" color="#8b5cf6" />
                <MetricCard title="Profit Margin" value="91.1%" change={3} icon="📈" color="#10b981" />
                <MetricCard title="Active Fleet" value="24" change={2} icon="🚛" color="#3b82f6" />
                <MetricCard title="Fuel Efficiency" value="6.8 mpg" change={-0.2} icon="⛽" color="#f59e0b" />
              </>
            )}
            {userRole === 'admin' && (
              <>
                <MetricCard title="Active Users" value="18" change={2} icon="👥" color="#3b82f6" />
                <MetricCard title="System Uptime" value="99.9%" change={0.1} icon="✅" color="#10b981" />
                <MetricCard title="Compliance Score" value="98%" change={1} icon="📋" color="#f59e0b" />
                <MetricCard title="Data Storage" value="2.4 TB" change={8} icon="💾" color="#8b5cf6" />
              </>
            )}
          </div>
          
          {/* Main Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <QuickActions actions={
                userRole === 'fleet-manager' ? [
                  { icon: '➕', label: 'Add Vehicle' },
                  { icon: '👤', label: 'Add Driver' },
                  { icon: '📦', label: 'Assign Load' },
                  { icon: '🗺️', label: 'Plan Route' }
                ] : userRole === 'dispatcher' ? [
                  { icon: '📦', label: 'Assign Load' },
                  { icon: '👤', label: 'Manage Drivers' },
                  { icon: '📍', label: 'Track Vehicles' },
                  { icon: '📅', label: 'Schedule' }
                ] : userRole === 'driver' ? [
                  { icon: '📦', label: 'View Load' },
                  { icon: '🗺️', label: 'Route Info' },
                  { icon: '📋', label: 'Documents' },
                  { icon: '💰', label: 'Earnings' }
                ] : userRole === 'owner' ? [
                  { icon: '💰', label: 'Financials' },
                  { icon: '🚛', label: 'Fleet Status' },
                  { icon: '📈', label: 'Analytics' },
                  { icon: '📋', label: 'Reports' }
                ] : [
                  { icon: '👥', label: 'Manage Users' },
                  { icon: '⚙️', label: 'Settings' },
                  { icon: '📋', label: 'Reports' },
                  { icon: '📝', label: 'Audit Logs' }
                ]
              } />
              <ChartCard title={`${userRole.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())} Performance Overview`}>
                <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
                  TMS Chart visualization would go here
                </div>
              </ChartCard>
            </div>
            <ActivityFeed activities={[
              { type: 'success', title: 'Load #1234 delivered successfully', time: '2 minutes ago' },
              { type: 'warning', title: 'Vehicle #567 needs maintenance', time: '15 minutes ago' },
              { type: 'success', title: 'New driver John Smith onboarded', time: '1 hour ago' },
              { type: 'success', title: 'Route optimization completed', time: '2 hours ago' }
            ]} />
          </div>
        </>
      )}

      {/* Fleet Management Tab */}
      {selectedTab === 'fleet' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Fleet Management - TMS"
            headers={['Vehicle ID', 'Type', 'Status', 'Driver', 'Location', 'Fuel %', 'Maintenance', 'Next Service', 'Actions']}
            data={fleetData.vehicles.map(v => [
              v.id,
              v.type,
              <StatusIndicator key={v.id} status={v.status === 'Active' ? 'online' : 'offline'} label={v.status} />,
              v.driver,
              v.location,
              <ProgressBar key={v.id} value={v.fuel} max={100} label="" color={v.fuel > 20 ? '#10b981' : '#ef4444'} />,
              <StatusIndicator key={v.id} status={v.maintenance === 'Good' ? 'online' : 'offline'} label={v.maintenance} />,
              v.nextService,
              <button key={v.id} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#1e40af',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>View Details</button>
            ])}
          />
        </div>
      )}

      {/* Load Management Tab */}
      {selectedTab === 'loads' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Load Management - TMS"
            headers={['Load ID', 'Origin', 'Destination', 'Status', 'Value', 'ETA', 'Driver', 'Vehicle', 'Fuel Used', 'Miles', 'Actions']}
            data={fleetData.loads.map(l => [
              l.id,
              l.origin,
              l.destination,
              <StatusIndicator key={l.id} status={l.status === 'In Transit' ? 'online' : 'offline'} label={l.status} />,
              l.value,
              l.eta,
              l.driver,
              l.vehicle,
              `${l.fuelUsed} gal`,
              `${l.miles} mi`,
              <button key={l.id} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#1e40af',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>Track Load</button>
            ])}
          />
        </div>
      )}

      {/* Driver Management Tab */}
      {selectedTab === 'drivers' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Driver Management - TMS"
            headers={['Driver ID', 'Name', 'Status', 'Rating', 'Hours', 'Location', 'License', 'Medical', 'ELD Status', 'Actions']}
            data={fleetData.drivers.map(d => [
              d.id,
              d.name,
              <StatusIndicator key={d.id} status={d.status === 'Active' ? 'online' : 'offline'} label={d.status} />,
              `${d.rating} ⭐`,
              `${d.hours}h`,
              d.location,
              <StatusIndicator key={d.id} status="online" label={d.license} />,
              <StatusIndicator key={d.id} status="online" label={d.medical} />,
              <StatusIndicator key={d.id} status="online" label={d.eldStatus} />,
              <button key={d.id} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#1e40af',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>View Details</button>
            ])}
          />
        </div>
      )}

      {/* Route Optimization Tab */}
      {selectedTab === 'routes' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <ChartCard title="Route Optimization - TMS">
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Interactive TMS route optimization map would go here
            </div>
          </ChartCard>
        </div>
      )}

      {/* Maintenance Tab */}
      {selectedTab === 'maintenance' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Maintenance Schedule - TMS"
            headers={['Vehicle ID', 'Type', 'Last Service', 'Next Service', 'Status', 'Cost', 'Actions']}
            data={[
              ['V002', 'Box Truck', '2024-01-15', '2024-01-20', <StatusIndicator status="offline" label="Due Soon" />, '$850',
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#ef4444',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>Schedule Service</button>],
              ['V005', 'Semi-Truck', '2024-01-20', '2024-02-20', <StatusIndicator status="online" label="Good" />, '$0',
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#1e40af',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>View History</button>]
            ]}
          />
        </div>
      )}

      {/* Financial Management Tab (Owner Role) */}
      {selectedTab === 'financials' && userRole === 'owner' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <MetricCard title="MTD Revenue" value={`$${fleetData.financials.revenue.mtd.toLocaleString()}`} change={15} icon="💰" color="#8b5cf6" />
            <MetricCard title="MTD Expenses" value={`$${Object.values(fleetData.financials.expenses).reduce((a, b) => a + b, 0).toLocaleString()}`} change={-8} icon="💸" color="#ef4444" />
            <MetricCard title="MTD Profit" value={`$${fleetData.financials.profit.mtd.toLocaleString()}`} change={23} icon="📈" color="#10b981" />
            <MetricCard title="Profit Margin" value={`${fleetData.financials.profit.margin}%`} change={3} icon="📊" color="#f59e0b" />
          </div>
          <ChartCard title="Financial Overview - TMS">
            <div style={{ height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              TMS Financial charts would go here
            </div>
          </ChartCard>
        </div>
      )}

      {/* Analytics Tab */}
      {selectedTab === 'analytics' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <ChartCard title="TMS Analytics Dashboard">
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Comprehensive TMS analytics would go here
            </div>
          </ChartCard>
        </div>
      )}

      {/* Compliance Tab */}
      {selectedTab === 'compliance' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Compliance Management - TMS"
            headers={['Category', 'Status', 'Last Check', 'Next Due', 'Score', 'Actions']}
            data={[
              ['DOT Regulations', <StatusIndicator status="online" label="Compliant" />, '2024-01-20', '2024-02-20', '98%',
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#1e40af',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>View Details</button>],
              ['ELD Compliance', <StatusIndicator status="online" label="Compliant" />, '2024-01-21', '2024-02-21', '100%',
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#1e40af',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>View Details</button>],
              ['Safety Records', <StatusIndicator status="online" label="Good" />, '2024-01-19', '2024-02-19', '95%',
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#1e40af',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>View Details</button>]
            ]}
          />
        </div>
      )}
    </div>
  );
};

export const BrokerDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const brokerData = {
    loads: [
      { id: 'L001', origin: 'Chicago, IL', destination: 'Atlanta, GA', rate: '$2,500', carrier: 'ABC Trucking', status: 'Matched' },
      { id: 'L002', origin: 'Detroit, MI', destination: 'Dallas, TX', rate: '$3,200', carrier: 'XYZ Transport', status: 'Available' },
      { id: 'L003', origin: 'Atlanta, GA', destination: 'Chicago, IL', rate: '$2,800', carrier: 'Fast Freight', status: 'In Transit' },
      { id: 'L004', origin: 'Dallas, TX', destination: 'Detroit, MI', rate: '$2,900', carrier: 'Reliable Haul', status: 'Completed' }
    ],
    carriers: [
      { id: 'C001', name: 'ABC Trucking', rating: 4.8, loads: 15, status: 'Active', location: 'Chicago, IL' },
      { id: 'C002', name: 'XYZ Transport', rating: 4.5, loads: 8, status: 'Active', location: 'Detroit, MI' },
      { id: 'C003', name: 'Fast Freight', rating: 4.9, loads: 22, status: 'Active', location: 'Atlanta, GA' },
      { id: 'C004', name: 'Reliable Haul', rating: 4.7, loads: 12, status: 'Active', location: 'Dallas, TX' }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'loads', label: 'Load Board', icon: '📋' },
    { id: 'carriers', label: 'Carrier Network', icon: '🚛' },
    { id: 'rates', label: 'Rate Management', icon: '💰' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      {/* Alerts */}
      <AlertCard 
        type="warning" 
        title="Rate Optimization" 
        message="15 loads need rate optimization. AI suggestions available."
        onDismiss={() => {}}
      />
      
      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                backgroundColor: selectedTab === tab.id ? '#10b981' : '#f3f4f6',
                color: selectedTab === tab.id ? 'white' : '#374151'
              }}
              onMouseEnter={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <>
          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <MetricCard title="Available Loads" value="156" change={15} icon="📋" color="#10b981" />
            <MetricCard title="Active Carriers" value="89" change={7} icon="🚛" color="#3b82f6" />
            <MetricCard title="Match Rate" value="96.7%" change={2.1} icon="🎯" color="#f59e0b" />
            <MetricCard title="Revenue (MTD)" value="$67,890" change={18} icon="💰" color="#8b5cf6" />
          </div>
          
          {/* Main Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <QuickActions actions={[
                { icon: '📋', label: 'Post Load' },
                { icon: '🚛', label: 'Add Carrier' },
                { icon: '💰', label: 'Set Rates' },
                { icon: '📊', label: 'View Analytics' }
              ]} />
              <ChartCard title="Load Matching Performance">
                <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
                  Chart visualization would go here
                </div>
              </ChartCard>
            </div>
            <ActivityFeed activities={[
              { type: 'success', title: 'Load matched with carrier ABC Trucking', time: '5 minutes ago' },
              { type: 'success', title: 'Rate negotiation completed for Load #5678', time: '20 minutes ago' },
              { type: 'warning', title: 'Carrier XYZ needs documentation update', time: '1 hour ago' },
              { type: 'success', title: 'New shipper account created', time: '2 hours ago' }
            ]} />
          </div>
        </>
      )}

      {selectedTab === 'loads' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Load Board"
            headers={['Load ID', 'Origin', 'Destination', 'Rate', 'Carrier', 'Status', 'Actions']}
            data={brokerData.loads.map(l => [
              l.id,
              l.origin,
              l.destination,
              l.rate,
              l.carrier,
              <StatusIndicator key={l.id} status={l.status === 'Matched' ? 'online' : 'offline'} label={l.status} />,
              <button key={l.id} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#10b981',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>View Details</button>
            ])}
          />
        </div>
      )}

      {selectedTab === 'carriers' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Carrier Network"
            headers={['Carrier ID', 'Name', 'Rating', 'Active Loads', 'Status', 'Location', 'Actions']}
            data={brokerData.carriers.map(c => [
              c.id,
              c.name,
              `${c.rating} ⭐`,
              c.loads,
              <StatusIndicator key={c.id} status="online" label={c.status} />,
              c.location,
              <button key={c.id} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#10b981',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>View Profile</button>
            ])}
          />
        </div>
      )}

      {selectedTab === 'rates' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <ChartCard title="Rate Analysis">
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Rate optimization charts would go here
            </div>
          </ChartCard>
        </div>
      )}

      {selectedTab === 'analytics' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <ChartCard title="Business Analytics">
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Analytics dashboard would go here
            </div>
          </ChartCard>
        </div>
      )}
    </div>
  );
};

export const AutonomousDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const agentData = [
    { id: 'A001', name: 'Code Review Agent', status: 'Active', performance: 98.5, tasks: 47, uptime: '99.9%' },
    { id: 'A002', name: 'Testing Agent', status: 'Active', performance: 97.2, tasks: 23, uptime: '99.8%' },
    { id: 'A003', name: 'Deployment Agent', status: 'Active', performance: 99.1, tasks: 15, uptime: '99.9%' },
    { id: 'A004', name: 'Monitoring Agent', status: 'Active', performance: 96.8, tasks: 89, uptime: '99.7%' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'agents', label: 'Agent Management', icon: '🤖' },
    { id: 'monitoring', label: 'System Monitoring', icon: '📈' },
    { id: 'development', label: 'Development', icon: '💻' },
    { id: 'logs', label: 'System Logs', icon: '📝' }
  ];

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      {/* System Status */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <StatusIndicator status="online" label="System Online" />
        <StatusIndicator status="online" label="250+ Agents Active" />
        <StatusIndicator status="online" label="98.5% Success Rate" />
      </div>
      
      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                backgroundColor: selectedTab === tab.id ? '#6366f1' : '#f3f4f6',
                color: selectedTab === tab.id ? 'white' : '#374151'
              }}
              onMouseEnter={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <>
          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <MetricCard title="Active Agents" value="250+" change={5} icon="🤖" color="#6366f1" />
            <MetricCard title="Success Rate" value="98.5%" change={0.3} icon="✅" color="#10b981" />
            <MetricCard title="Response Time" value="~150ms" change={-12} icon="⚡" color="#f59e0b" />
            <MetricCard title="Code Changes" value="47" change={23} icon="💻" color="#8b5cf6" />
          </div>
          
          {/* Main Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <QuickActions actions={[
                { icon: '🤖', label: 'Add Agent' },
                { icon: '📊', label: 'View Metrics' },
                { icon: '⚙️', label: 'Configure' },
                { icon: '📝', label: 'View Logs' }
              ]} />
              <ChartCard title="Agent Performance Metrics">
                <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
                  Chart visualization would go here
                </div>
              </ChartCard>
            </div>
            <ActivityFeed activities={[
              { type: 'success', title: 'Agent #123 completed code review', time: '1 minute ago' },
              { type: 'success', title: 'Deployment to staging successful', time: '5 minutes ago' },
              { type: 'success', title: 'Performance optimization completed', time: '15 minutes ago' },
              { type: 'warning', title: 'Agent #456 needs attention', time: '30 minutes ago' }
            ]} />
          </div>
        </>
      )}

      {selectedTab === 'agents' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Agent Management"
            headers={['Agent ID', 'Name', 'Status', 'Performance %', 'Tasks', 'Uptime', 'Actions']}
            data={agentData.map(a => [
              a.id,
              a.name,
              <StatusIndicator key={a.id} status="online" label={a.status} />,
              `${a.performance}%`,
              a.tasks,
              a.uptime,
              <button key={a.id} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#6366f1',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>Configure</button>
            ])}
          />
        </div>
      )}

      {selectedTab === 'monitoring' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <ChartCard title="System Health Monitoring">
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Real-time monitoring dashboard would go here
            </div>
          </ChartCard>
        </div>
      )}

      {selectedTab === 'development' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <ChartCard title="Development Activity">
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Development metrics and activity would go here
            </div>
          </ChartCard>
        </div>
      )}

      {selectedTab === 'logs' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="System Logs"
            headers={['Timestamp', 'Level', 'Agent', 'Message', 'Actions']}
            data={[
              ['2024-01-25 14:30:15', 'INFO', 'A001', 'Code review completed successfully', 
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#6366f1',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>View Details</button>],
              ['2024-01-25 14:28:42', 'WARN', 'A004', 'High memory usage detected', 
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#f59e0b',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>Investigate</button>]
            ]}
          />
        </div>
      )}
    </div>
  );
};

export const AnalyticsDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const analyticsData = {
    revenue: [
      { month: 'Jan', revenue: 45000, growth: 12 },
      { month: 'Feb', revenue: 52000, growth: 15 },
      { month: 'Mar', revenue: 48000, growth: 8 },
      { month: 'Apr', revenue: 61000, growth: 27 }
    ],
    users: [
      { id: 'U001', name: 'John Doe', activity: 'High', lastLogin: '2 hours ago', status: 'Active' },
      { id: 'U002', name: 'Jane Smith', activity: 'Medium', lastLogin: '1 day ago', status: 'Active' },
      { id: 'U003', name: 'Bob Johnson', activity: 'Low', lastLogin: '3 days ago', status: 'Inactive' },
      { id: 'U004', name: 'Alice Brown', activity: 'High', lastLogin: '30 minutes ago', status: 'Active' }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'revenue', label: 'Revenue Analytics', icon: '💰' },
    { id: 'users', label: 'User Analytics', icon: '👥' },
    { id: 'performance', label: 'Performance', icon: '📈' },
    { id: 'reports', label: 'Reports', icon: '📋' }
  ];

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                backgroundColor: selectedTab === tab.id ? '#06b6d4' : '#f3f4f6',
                color: selectedTab === tab.id ? 'white' : '#374151'
              }}
              onMouseEnter={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <>
          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <MetricCard title="Total Revenue" value="$234,567" change={15} icon="💰" color="#10b981" />
            <MetricCard title="Active Users" value="1,234" change={8} icon="👥" color="#3b82f6" />
            <MetricCard title="Conversion Rate" value="3.2%" change={0.5} icon="📈" color="#f59e0b" />
            <MetricCard title="Avg. Order Value" value="$189" change={12} icon="🛒" color="#8b5cf6" />
          </div>
          
          {/* Main Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <QuickActions actions={[
                { icon: '📊', label: 'Generate Report' },
                { icon: '📈', label: 'View Trends' },
                { icon: '📤', label: 'Export Data' },
                { icon: '⚙️', label: 'Settings' }
              ]} />
              <ChartCard title="Revenue Trends">
                <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
                  Chart visualization would go here
                </div>
              </ChartCard>
            </div>
            <ActivityFeed activities={[
              { type: 'success', title: 'Monthly report generated', time: '10 minutes ago' },
              { type: 'success', title: 'New insights available', time: '1 hour ago' },
              { type: 'success', title: 'Data export completed', time: '2 hours ago' },
              { type: 'success', title: 'Performance alert resolved', time: '3 hours ago' }
            ]} />
          </div>
        </>
      )}

      {selectedTab === 'revenue' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Revenue Analytics"
            headers={['Month', 'Revenue', 'Growth %', 'Trend', 'Actions']}
            data={analyticsData.revenue.map(r => [
              r.month,
              `$${r.revenue.toLocaleString()}`,
              `${r.growth}%`,
              <div key={r.month} style={{ color: r.growth > 0 ? '#10b981' : '#ef4444' }}>
                {r.growth > 0 ? '↗' : '↘'} {r.growth}%
              </div>,
              <button key={r.month} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#06b6d4',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>View Details</button>
            ])}
          />
        </div>
      )}

      {selectedTab === 'users' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="User Analytics"
            headers={['User ID', 'Name', 'Activity Level', 'Last Login', 'Status', 'Actions']}
            data={analyticsData.users.map(u => [
              u.id,
              u.name,
              <div key={u.id} style={{
                padding: '0.25rem 0.5rem',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                backgroundColor: u.activity === 'High' ? '#dcfce7' : u.activity === 'Medium' ? '#fef3c7' : '#fecaca',
                color: u.activity === 'High' ? '#166534' : u.activity === 'Medium' ? '#92400e' : '#dc2626'
              }}>
                {u.activity}
              </div>,
              u.lastLogin,
              <StatusIndicator key={u.id} status={u.status === 'Active' ? 'online' : 'offline'} label={u.status} />,
              <button key={u.id} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#06b6d4',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>View Profile</button>
            ])}
          />
        </div>
      )}

      {selectedTab === 'performance' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <ChartCard title="Performance Metrics">
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Performance analytics would go here
            </div>
          </ChartCard>
        </div>
      )}

      {selectedTab === 'reports' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Generated Reports"
            headers={['Report Name', 'Type', 'Generated', 'Status', 'Actions']}
            data={[
              ['Monthly Revenue Report', 'Revenue', '2024-01-25', <StatusIndicator status="online" label="Ready" />,
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#06b6d4',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>Download</button>],
              ['User Activity Report', 'Users', '2024-01-24', <StatusIndicator status="online" label="Ready" />,
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#06b6d4',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>Download</button>]
            ]}
          />
        </div>
      )}
    </div>
  );
};

export const ShipperDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const shipmentData = {
    shipments: [
      { id: 'S001', origin: 'Chicago, IL', destination: 'Atlanta, GA', status: 'In Transit', carrier: 'ABC Trucking', eta: '2 hours', value: '$15,000' },
      { id: 'S002', origin: 'Detroit, MI', destination: 'Dallas, TX', status: 'Loading', carrier: 'XYZ Transport', eta: '4 hours', value: '$22,500' },
      { id: 'S003', origin: 'Atlanta, GA', destination: 'Chicago, IL', status: 'Delivered', carrier: 'Fast Freight', eta: 'Completed', value: '$18,750' },
      { id: 'S004', origin: 'Dallas, TX', destination: 'Detroit, MI', status: 'Scheduled', carrier: 'Reliable Haul', eta: '6 hours', value: '$12,300' }
    ],
    carriers: [
      { id: 'C001', name: 'ABC Trucking', rating: 4.8, completed: 45, status: 'Active', location: 'Chicago, IL' },
      { id: 'C002', name: 'XYZ Transport', rating: 4.5, completed: 32, status: 'Active', location: 'Detroit, MI' },
      { id: 'C003', name: 'Fast Freight', rating: 4.9, completed: 67, status: 'Active', location: 'Atlanta, GA' },
      { id: 'C004', name: 'Reliable Haul', rating: 4.7, completed: 28, status: 'Active', location: 'Dallas, TX' }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'shipments', label: 'Shipment Tracking', icon: '📦' },
    { id: 'carriers', label: 'Carrier Network', icon: '🚛' },
    { id: 'rates', label: 'Rate Management', icon: '💰' },
    { id: 'analytics', label: 'Analytics', icon: '📈' }
  ];

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      {/* Alerts */}
      <AlertCard 
        type="success" 
        title="Shipment Status" 
        message="All active shipments are on track. Delivery efficiency at 96%."
        onDismiss={() => {}}
      />
      
      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                backgroundColor: selectedTab === tab.id ? '#f59e0b' : '#f3f4f6',
                color: selectedTab === tab.id ? 'white' : '#374151'
              }}
              onMouseEnter={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <>
          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <MetricCard title="Active Shipments" value="8" change={2} icon="📦" color="#f59e0b" />
            <MetricCard title="Carriers Used" value="12" change={1} icon="🚛" color="#3b82f6" />
            <MetricCard title="On-Time Delivery" value="96%" change={1.2} icon="✅" color="#10b981" />
            <MetricCard title="Total Value" value="$68,550" change={15} icon="💰" color="#8b5cf6" />
          </div>
          
          {/* Main Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <QuickActions actions={[
                { icon: '📦', label: 'Create Shipment' },
                { icon: '🚛', label: 'Find Carrier' },
                { icon: '💰', label: 'Get Quote' },
                { icon: '📊', label: 'View Analytics' }
              ]} />
              <ChartCard title="Shipment Performance">
                <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
                  Chart visualization would go here
                </div>
              </ChartCard>
            </div>
            <ActivityFeed activities={[
              { type: 'success', title: 'Shipment S001 delivered on time', time: '1 hour ago' },
              { type: 'success', title: 'New carrier ABC Trucking onboarded', time: '2 hours ago' },
              { type: 'success', title: 'Rate negotiation completed', time: '3 hours ago' },
              { type: 'warning', title: 'Shipment S002 delayed by 30 minutes', time: '4 hours ago' }
            ]} />
          </div>
        </>
      )}

      {selectedTab === 'shipments' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Shipment Tracking"
            headers={['Shipment ID', 'Origin', 'Destination', 'Status', 'Carrier', 'ETA', 'Value', 'Actions']}
            data={shipmentData.shipments.map(s => [
              s.id,
              s.origin,
              s.destination,
              <StatusIndicator key={s.id} status={s.status === 'In Transit' ? 'online' : 'offline'} label={s.status} />,
              s.carrier,
              s.eta,
              s.value,
              <button key={s.id} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#f59e0b',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>Track Shipment</button>
            ])}
          />
        </div>
      )}

      {selectedTab === 'carriers' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Carrier Network"
            headers={['Carrier ID', 'Name', 'Rating', 'Completed Shipments', 'Status', 'Location', 'Actions']}
            data={shipmentData.carriers.map(c => [
              c.id,
              c.name,
              `${c.rating} ⭐`,
              c.completed,
              <StatusIndicator key={c.id} status="online" label={c.status} />,
              c.location,
              <button key={c.id} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#f59e0b',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>View Profile</button>
            ])}
          />
        </div>
      )}

      {selectedTab === 'rates' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <ChartCard title="Rate Analysis">
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Rate comparison charts would go here
            </div>
          </ChartCard>
        </div>
      )}

      {selectedTab === 'analytics' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <ChartCard title="Shipping Analytics">
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Shipping analytics dashboard would go here
            </div>
          </ChartCard>
        </div>
      )}
    </div>
  );
};

export const DriverDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const driverData = {
    loads: [
      { id: 'L001', origin: 'Chicago, IL', destination: 'Atlanta, GA', status: 'In Transit', eta: '2 hours', pay: '$450', miles: 750 },
      { id: 'L002', origin: 'Detroit, MI', destination: 'Dallas, TX', status: 'Completed', eta: 'Completed', pay: '$380', miles: 650 },
      { id: 'L003', origin: 'Atlanta, GA', destination: 'Chicago, IL', status: 'Scheduled', eta: '6 hours', pay: '$420', miles: 720 },
      { id: 'L004', origin: 'Dallas, TX', destination: 'Detroit, MI', status: 'Available', eta: 'N/A', pay: '$395', miles: 680 }
    ],
    earnings: [
      { week: 'Week 1', earnings: 1850, miles: 2800, loads: 4 },
      { week: 'Week 2', earnings: 2100, miles: 3200, loads: 5 },
      { week: 'Week 3', earnings: 1950, miles: 2900, loads: 4 },
      { week: 'Week 4', earnings: 2200, miles: 3400, loads: 5 }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'loads', label: 'My Loads', icon: '📦' },
    { id: 'earnings', label: 'Earnings', icon: '💰' },
    { id: 'routes', label: 'Routes', icon: '🗺️' },
    { id: 'documents', label: 'Documents', icon: '📋' }
  ];

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      {/* Alerts */}
      <AlertCard 
        type="success" 
        title="Driver Status" 
        message="You're on track for this week's goals. Keep up the great work!"
        onDismiss={() => {}}
      />
      
      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                backgroundColor: selectedTab === tab.id ? '#ec4899' : '#f3f4f6',
                color: selectedTab === tab.id ? 'white' : '#374151'
              }}
              onMouseEnter={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <>
          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <MetricCard title="This Week's Earnings" value="$2,100" change={8} icon="💰" color="#ec4899" />
            <MetricCard title="Miles Driven" value="3,200" change={12} icon="🚗" color="#3b82f6" />
            <MetricCard title="Loads Completed" value="5" change={1} icon="📦" color="#10b981" />
            <MetricCard title="Rating" value="4.8 ⭐" change={0.1} icon="⭐" color="#f59e0b" />
          </div>
          
          {/* Main Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <QuickActions actions={[
                { icon: '📦', label: 'Find Loads' },
                { icon: '🗺️', label: 'Plan Route' },
                { icon: '📋', label: 'Update Status' },
                { icon: '💰', label: 'View Earnings' }
              ]} />
              <ChartCard title="Weekly Performance">
                <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
                  Chart visualization would go here
                </div>
              </ChartCard>
            </div>
            <ActivityFeed activities={[
              { type: 'success', title: 'Load L001 delivered successfully', time: '2 hours ago' },
              { type: 'success', title: 'Weekly earnings goal achieved', time: '1 day ago' },
              { type: 'success', title: 'Route optimization completed', time: '2 days ago' },
              { type: 'success', title: 'New load assigned - L003', time: '3 days ago' }
            ]} />
          </div>
        </>
      )}

      {selectedTab === 'loads' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="My Loads"
            headers={['Load ID', 'Origin', 'Destination', 'Status', 'ETA', 'Pay', 'Miles', 'Actions']}
            data={driverData.loads.map(l => [
              l.id,
              l.origin,
              l.destination,
              <StatusIndicator key={l.id} status={l.status === 'In Transit' ? 'online' : 'offline'} label={l.status} />,
              l.eta,
              l.pay,
              `${l.miles} mi`,
              <button key={l.id} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#ec4899',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>View Details</button>
            ])}
          />
        </div>
      )}

      {selectedTab === 'earnings' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Earnings History"
            headers={['Week', 'Earnings', 'Miles', 'Loads', 'Actions']}
            data={driverData.earnings.map(e => [
              e.week,
              `$${e.earnings}`,
              `${e.miles} mi`,
              e.loads,
              <button key={e.week} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#ec4899',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>View Details</button>
            ])}
          />
        </div>
      )}

      {selectedTab === 'routes' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <ChartCard title="Route Planning">
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Interactive route map would go here
            </div>
          </ChartCard>
        </div>
      )}

      {selectedTab === 'documents' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Document Management"
            headers={['Document', 'Type', 'Status', 'Expiry', 'Actions']}
            data={[
              ['Commercial Driver License', 'License', <StatusIndicator status="online" label="Valid" />, '2025-06-15',
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#ec4899',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>View</button>],
              ['Medical Certificate', 'Medical', <StatusIndicator status="online" label="Valid" />, '2024-12-31',
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#ec4899',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>View</button>]
            ]}
          />
        </div>
      )}
    </div>
  );
};

export const OwnerOperatorDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const businessData = {
    loads: [
      { id: 'L001', origin: 'Chicago, IL', destination: 'Atlanta, GA', status: 'In Transit', rate: '$2,500', profit: '$1,200', eta: '2 hours' },
      { id: 'L002', origin: 'Detroit, MI', destination: 'Dallas, TX', status: 'Completed', rate: '$3,200', profit: '$1,800', eta: 'Completed' },
      { id: 'L003', origin: 'Atlanta, GA', destination: 'Chicago, IL', status: 'Scheduled', rate: '$2,800', profit: '$1,400', eta: '6 hours' },
      { id: 'L004', origin: 'Dallas, TX', destination: 'Detroit, MI', status: 'Available', rate: '$2,900', profit: '$1,500', eta: 'N/A' }
    ],
    expenses: [
      { category: 'Fuel', amount: 850, percentage: 35 },
      { category: 'Maintenance', amount: 320, percentage: 13 },
      { category: 'Insurance', amount: 280, percentage: 12 },
      { category: 'Other', amount: 980, percentage: 40 }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'loads', label: 'Load Management', icon: '📦' },
    { id: 'finances', label: 'Finances', icon: '💰' },
    { id: 'maintenance', label: 'Maintenance', icon: '🔧' },
    { id: 'documents', label: 'Documents', icon: '📋' }
  ];

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      {/* Alerts */}
      <AlertCard 
        type="success" 
        title="Business Status" 
        message="Your business is performing well. Profit margin at 45% this month."
        onDismiss={() => {}}
      />
      
      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                backgroundColor: selectedTab === tab.id ? '#8b5cf6' : '#f3f4f6',
                color: selectedTab === tab.id ? 'white' : '#374151'
              }}
              onMouseEnter={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <>
          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <MetricCard title="Monthly Revenue" value="$12,400" change={18} icon="💰" color="#8b5cf6" />
            <MetricCard title="Profit Margin" value="45%" change={3} icon="📈" color="#10b981" />
            <MetricCard title="Active Loads" value="3" change={1} icon="📦" color="#f59e0b" />
            <MetricCard title="Fuel Efficiency" value="6.8 mpg" change={-2} icon="⛽" color="#3b82f6" />
          </div>
          
          {/* Main Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <QuickActions actions={[
                { icon: '📦', label: 'Find Loads' },
                { icon: '💰', label: 'Track Finances' },
                { icon: '🔧', label: 'Schedule Maintenance' },
                { icon: '📋', label: 'Manage Documents' }
              ]} />
              <ChartCard title="Business Performance">
                <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
                  Chart visualization would go here
                </div>
              </ChartCard>
            </div>
            <ActivityFeed activities={[
              { type: 'success', title: 'Load L002 completed - $1,800 profit', time: '1 hour ago' },
              { type: 'success', title: 'Maintenance completed on schedule', time: '2 hours ago' },
              { type: 'success', title: 'Fuel efficiency improved by 2%', time: '1 day ago' },
              { type: 'success', title: 'New load L003 assigned', time: '2 days ago' }
            ]} />
          </div>
        </>
      )}

      {selectedTab === 'loads' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Load Management"
            headers={['Load ID', 'Origin', 'Destination', 'Status', 'Rate', 'Profit', 'ETA', 'Actions']}
            data={businessData.loads.map(l => [
              l.id,
              l.origin,
              l.destination,
              <StatusIndicator key={l.id} status={l.status === 'In Transit' ? 'online' : 'offline'} label={l.status} />,
              l.rate,
              l.profit,
              l.eta,
              <button key={l.id} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#8b5cf6',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>View Details</button>
            ])}
          />
        </div>
      )}

      {selectedTab === 'finances' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Expense Breakdown"
            headers={['Category', 'Amount', 'Percentage', 'Actions']}
            data={businessData.expenses.map(e => [
              e.category,
              `$${e.amount}`,
              `${e.percentage}%`,
              <button key={e.category} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#8b5cf6',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>View Details</button>
            ])}
          />
        </div>
      )}

      {selectedTab === 'maintenance' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <ChartCard title="Maintenance Schedule">
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Maintenance tracking dashboard would go here
            </div>
          </ChartCard>
        </div>
      )}

      {selectedTab === 'documents' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="Business Documents"
            headers={['Document', 'Type', 'Status', 'Expiry', 'Actions']}
            data={[
              ['Operating Authority', 'Authority', <StatusIndicator status="online" label="Valid" />, '2025-12-31',
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#8b5cf6',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>View</button>],
              ['Insurance Certificate', 'Insurance', <StatusIndicator status="online" label="Valid" />, '2024-11-30',
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#8b5cf6',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>View</button>]
            ]}
          />
        </div>
      )}
    </div>
  );
};

export const SuperAdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const systemData = {
    users: [
      { id: 'U001', name: 'John Admin', role: 'Super Admin', status: 'Active', lastLogin: '2 minutes ago', permissions: 'Full' },
      { id: 'U002', name: 'Sarah Manager', role: 'System Admin', status: 'Active', lastLogin: '1 hour ago', permissions: 'Limited' },
      { id: 'U003', name: 'Mike Support', role: 'Support Admin', status: 'Active', lastLogin: '3 hours ago', permissions: 'Support' },
      { id: 'U004', name: 'Lisa Analyst', role: 'Data Analyst', status: 'Inactive', lastLogin: '2 days ago', permissions: 'Read Only' }
    ],
    systems: [
      { name: 'Database', status: 'Online', uptime: '99.9%', performance: 'Excellent' },
      { name: 'API Gateway', status: 'Online', uptime: '99.8%', performance: 'Good' },
      { name: 'File Storage', status: 'Online', uptime: '99.7%', performance: 'Good' },
      { name: 'Email Service', status: 'Online', uptime: '99.9%', performance: 'Excellent' }
    ]
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'users', label: 'User Management', icon: '👥' },
    { id: 'systems', label: 'System Health', icon: '🔧' },
    { id: 'security', label: 'Security', icon: '🔒' },
    { id: 'logs', label: 'System Logs', icon: '📝' }
  ];

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      {/* Alerts */}
      <AlertCard 
        type="success" 
        title="System Status" 
        message="All systems are operating normally. Security status: Excellent."
        onDismiss={() => {}}
      />
      
      {/* Tab Navigation */}
      <div style={{
        backgroundColor: 'white',
        padding: '1rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                backgroundColor: selectedTab === tab.id ? '#7c3aed' : '#f3f4f6',
                color: selectedTab === tab.id ? 'white' : '#374151'
              }}
              onMouseEnter={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#e5e7eb';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedTab !== tab.id) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {selectedTab === 'overview' && (
        <>
          {/* Metrics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <MetricCard title="Active Users" value="1,247" change={12} icon="👥" color="#7c3aed" />
            <MetricCard title="System Uptime" value="99.9%" change={0.1} icon="✅" color="#10b981" />
            <MetricCard title="Security Score" value="98/100" change={2} icon="🔒" color="#f59e0b" />
            <MetricCard title="Data Storage" value="2.4 TB" change={8} icon="💾" color="#3b82f6" />
          </div>
          
          {/* Main Content Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <QuickActions actions={[
                { icon: '👥', label: 'Manage Users' },
                { icon: '🔧', label: 'System Settings' },
                { icon: '🔒', label: 'Security Audit' },
                { icon: '📝', label: 'View Logs' }
              ]} />
              <ChartCard title="System Performance">
                <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
                  Chart visualization would go here
                </div>
              </ChartCard>
            </div>
            <ActivityFeed activities={[
              { type: 'success', title: 'Security audit completed successfully', time: '1 hour ago' },
              { type: 'success', title: 'New user account created', time: '2 hours ago' },
              { type: 'success', title: 'System backup completed', time: '3 hours ago' },
              { type: 'warning', title: 'High memory usage detected', time: '4 hours ago' }
            ]} />
          </div>
        </>
      )}

      {selectedTab === 'users' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="User Management"
            headers={['User ID', 'Name', 'Role', 'Status', 'Last Login', 'Permissions', 'Actions']}
            data={systemData.users.map(u => [
              u.id,
              u.name,
              u.role,
              <StatusIndicator key={u.id} status={u.status === 'Active' ? 'online' : 'offline'} label={u.status} />,
              u.lastLogin,
              u.permissions,
              <button key={u.id} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#7c3aed',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>Manage</button>
            ])}
          />
        </div>
      )}

      {selectedTab === 'systems' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="System Health"
            headers={['System', 'Status', 'Uptime', 'Performance', 'Actions']}
            data={systemData.systems.map(s => [
              s.name,
              <StatusIndicator key={s.name} status="online" label={s.status} />,
              s.uptime,
              s.performance,
              <button key={s.name} style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#7c3aed',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>Monitor</button>
            ])}
          />
        </div>
      )}

      {selectedTab === 'security' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <ChartCard title="Security Dashboard">
            <div style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280' }}>
              Security monitoring dashboard would go here
            </div>
          </ChartCard>
        </div>
      )}

      {selectedTab === 'logs' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <DataTable 
            title="System Logs"
            headers={['Timestamp', 'Level', 'Component', 'Message', 'Actions']}
            data={[
              ['2024-01-25 15:30:15', 'INFO', 'Auth', 'User login successful', 
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#7c3aed',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>View Details</button>],
              ['2024-01-25 15:28:42', 'WARN', 'System', 'High CPU usage detected', 
               <button style={{
                 padding: '0.25rem 0.5rem',
                 border: 'none',
                 borderRadius: '0.25rem',
                 backgroundColor: '#f59e0b',
                 color: 'white',
                 cursor: 'pointer',
                 fontSize: '0.75rem'
               }}>Investigate</button>]
            ]}
          />
        </div>
      )}
    </div>
  );
};
