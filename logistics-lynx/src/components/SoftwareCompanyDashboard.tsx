import React, { useState } from 'react';
import { MetricCard, ChartCard, ActivityFeed, QuickActions, StatusIndicator, ProgressBar, DataTable, AlertCard } from './DashboardComponents';

export const SoftwareCompanyDashboard = () => {
  const [selectedCustomerType, setSelectedCustomerType] = useState('all');
  const [selectedTier, setSelectedTier] = useState('all');
  
  // Customer data representing our SaaS platform customers
  const customerData = {
    shippers: [
      { id: 'S001', name: 'ABC Manufacturing', tier: 'enterprise', status: 'active', users: 45, loads: 1200, revenue: 899, features: ['analytics', 'integrations', 'mobile'] },
      { id: 'S002', name: 'XYZ Logistics', tier: 'professional', status: 'active', users: 12, loads: 450, revenue: 299, features: ['analytics'] },
      { id: 'S003', name: 'Startup Corp', tier: 'free', status: 'trial', users: 3, loads: 25, revenue: 0, features: [] }
    ],
    brokers: [
      { id: 'B001', name: 'Freight Masters Inc', tier: 'enterprise', status: 'active', users: 28, loads: 2500, revenue: 999, features: ['analytics', 'integrations', 'mobile', 'custom'] },
      { id: 'B002', name: 'Quick Ship Brokers', tier: 'professional', status: 'active', users: 8, loads: 800, revenue: 299, features: ['analytics'] },
      { id: 'B003', name: 'New Broker LLC', tier: 'free', status: 'trial', users: 2, loads: 15, revenue: 0, features: [] }
    ],
    carriers: [
      { id: 'C001', name: 'Mega Trucking Co', tier: 'enterprise', status: 'active', users: 156, loads: 3200, revenue: 999, features: ['analytics', 'integrations', 'mobile', 'compliance'] },
      { id: 'C002', name: 'Regional Haulers', tier: 'professional', status: 'active', users: 25, loads: 1200, revenue: 299, features: ['analytics', 'mobile'] },
      { id: 'C003', name: 'Small Fleet Inc', tier: 'free', status: 'trial', users: 5, loads: 80, revenue: 0, features: [] }
    ]
  };

  // Platform metrics
  const platformMetrics = {
    totalCustomers: 9,
    activeCustomers: 8,
    trialCustomers: 1,
    monthlyRevenue: 3794,
    averageRevenuePerCustomer: 421.56,
    customerSatisfaction: 4.8,
    platformUptime: 99.9,
    totalUsers: 280,
    totalLoads: 8470
  };

  // Revenue breakdown by tier
  const revenueByTier = {
    free: 0,
    professional: 897, // 3 customers * 299
    enterprise: 2897, // 3 customers * 999
    custom: 0
  };

  // Feature usage analytics
  const featureUsage = {
    analytics: 6,
    integrations: 3,
    mobile: 3,
    compliance: 1,
    custom: 1
  };

  const getFilteredCustomers = () => {
    let customers = [];
    if (selectedCustomerType === 'all') {
      customers = [...customerData.shippers, ...customerData.brokers, ...customerData.carriers];
    } else {
      customers = customerData[selectedCustomerType] || [];
    }
    
    if (selectedTier !== 'all') {
      customers = customers.filter(c => c.tier === selectedTier);
    }
    
    return customers;
  };

  const filteredCustomers = getFilteredCustomers();

  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      {/* Header with company info */}
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <h1 style={{ margin: '0 0 1rem 0', color: '#1f2937', fontSize: '2rem' }}>
          🏢 TMS Software Company Dashboard
        </h1>
        <p style={{ margin: '0', color: '#6b7280', fontSize: '1.1rem' }}>
          SaaS Platform Management - Multi-tenant TMS Solution
        </p>
      </div>

      {/* Filters */}
      <div style={{
        backgroundColor: 'white',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
              Customer Type:
            </label>
            <select 
              value={selectedCustomerType} 
              onChange={(e) => setSelectedCustomerType(e.target.value)}
              style={{
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            >
              <option value="all">All Customers</option>
              <option value="shippers">Shippers</option>
              <option value="brokers">Brokers</option>
              <option value="carriers">Carriers</option>
            </select>
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#374151' }}>
              Subscription Tier:
            </label>
            <select 
              value={selectedTier} 
              onChange={(e) => setSelectedTier(e.target.value)}
              style={{
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem'
              }}
            >
              <option value="all">All Tiers</option>
              <option value="free">Free Tier</option>
              <option value="professional">Professional</option>
              <option value="enterprise">Enterprise</option>
              <option value="custom">Custom</option>
            </select>
          </div>
        </div>
      </div>

      {/* Platform Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <MetricCard title="Total Customers" value={platformMetrics.totalCustomers.toString()} change={2} icon="👥" color="#3b82f6" />
        <MetricCard title="Active Customers" value={platformMetrics.activeCustomers.toString()} change={1} icon="✅" color="#10b981" />
        <MetricCard title="Monthly Revenue" value={`$${platformMetrics.monthlyRevenue.toLocaleString()}`} change={15} icon="💰" color="#8b5cf6" />
        <MetricCard title="Avg Revenue/Customer" value={`$${platformMetrics.averageRevenuePerCustomer.toFixed(0)}`} change={8} icon="📊" color="#f59e0b" />
        <MetricCard title="Platform Uptime" value={`${platformMetrics.platformUptime}%`} change={0.1} icon="🟢" color="#10b981" />
        <MetricCard title="Customer Satisfaction" value={`${platformMetrics.customerSatisfaction}/5`} change={0.2} icon="⭐" color="#f59e0b" />
      </div>

      {/* Revenue Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <ChartCard title="Revenue by Subscription Tier">
          <div style={{ padding: '1rem' }}>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Enterprise Tier</span>
                <span style={{ fontWeight: '600', color: '#8b5cf6' }}>${revenueByTier.enterprise.toLocaleString()}</span>
              </div>
              <ProgressBar value={revenueByTier.enterprise} max={platformMetrics.monthlyRevenue} label="" color="#8b5cf6" />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Professional Tier</span>
                <span style={{ fontWeight: '600', color: '#3b82f6' }}>${revenueByTier.professional.toLocaleString()}</span>
              </div>
              <ProgressBar value={revenueByTier.professional} max={platformMetrics.monthlyRevenue} label="" color="#3b82f6" />
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Free Tier</span>
                <span style={{ fontWeight: '600', color: '#6b7280' }}>${revenueByTier.free.toLocaleString()}</span>
              </div>
              <ProgressBar value={revenueByTier.free} max={platformMetrics.monthlyRevenue} label="" color="#6b7280" />
            </div>
          </div>
        </ChartCard>
        
        <ChartCard title="Feature Usage">
          <div style={{ padding: '1rem' }}>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Analytics</span>
                <span style={{ fontWeight: '600' }}>{featureUsage.analytics}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Integrations</span>
                <span style={{ fontWeight: '600' }}>{featureUsage.integrations}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Mobile Apps</span>
                <span style={{ fontWeight: '600' }}>{featureUsage.mobile}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Compliance</span>
                <span style={{ fontWeight: '600' }}>{featureUsage.compliance}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Custom Dev</span>
                <span style={{ fontWeight: '600' }}>{featureUsage.custom}</span>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Customer Management */}
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        <DataTable 
          title={`Customer Management - ${selectedCustomerType === 'all' ? 'All Customers' : selectedCustomerType.charAt(0).toUpperCase() + selectedCustomerType.slice(1)} (${filteredCustomers.length})`}
          headers={['Customer ID', 'Name', 'Type', 'Tier', 'Status', 'Users', 'Loads', 'Revenue', 'Features', 'Actions']}
          data={filteredCustomers.map(customer => [
            customer.id,
            customer.name,
            <span key={customer.id} style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: '500',
              backgroundColor: customer.id.startsWith('S') ? '#dbeafe' : customer.id.startsWith('B') ? '#fef3c7' : '#dcfce7',
              color: customer.id.startsWith('S') ? '#1e40af' : customer.id.startsWith('B') ? '#92400e' : '#166534'
            }}>
              {customer.id.startsWith('S') ? 'Shipper' : customer.id.startsWith('B') ? 'Broker' : 'Carrier'}
            </span>,
            <span key={customer.id} style={{
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.75rem',
              fontWeight: '500',
              backgroundColor: customer.tier === 'enterprise' ? '#fef3c7' : customer.tier === 'professional' ? '#dbeafe' : '#f3f4f6',
              color: customer.tier === 'enterprise' ? '#92400e' : customer.tier === 'professional' ? '#1e40af' : '#374151'
            }}>
              {customer.tier.charAt(0).toUpperCase() + customer.tier.slice(1)}
            </span>,
            <StatusIndicator key={customer.id} status={customer.status === 'active' ? 'online' : 'offline'} label={customer.status} />,
            customer.users,
            customer.loads.toLocaleString(),
            <span key={customer.id} style={{ fontWeight: '600', color: '#059669' }}>
              ${customer.revenue.toLocaleString()}
            </span>,
            <div key={customer.id} style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
              {customer.features.map(feature => (
                <span key={feature} style={{
                  padding: '0.125rem 0.375rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.625rem',
                  backgroundColor: '#f3f4f6',
                  color: '#374151'
                }}>
                  {feature}
                </span>
              ))}
            </div>,
            <div key={customer.id} style={{ display: 'flex', gap: '0.25rem' }}>
              <button style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#1e40af',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>View</button>
              <button style={{
                padding: '0.25rem 0.5rem',
                border: 'none',
                borderRadius: '0.25rem',
                backgroundColor: '#059669',
                color: 'white',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}>Support</button>
            </div>
          ])}
        />
      </div>

      {/* Quick Actions */}
      <QuickActions actions={[
        { icon: '➕', label: 'Add New Customer' },
        { icon: '📊', label: 'Generate Reports' },
        { icon: '💰', label: 'Billing Management' },
        { icon: '🔧', label: 'System Settings' },
        { icon: '📧', label: 'Customer Support' },
        { icon: '📈', label: 'Analytics Dashboard' }
      ]} />

      {/* System Status */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        <AlertCard 
          type="success" 
          title="Platform Status" 
          message="All systems operational. Platform uptime at 99.9%. No critical issues reported."
          onDismiss={() => {}}
        />
        <AlertCard 
          type="info" 
          title="Customer Success" 
          message="3 customers upgraded to Enterprise tier this month. Average satisfaction score: 4.8/5."
          onDismiss={() => {}}
        />
      </div>

      {/* Recent Activity */}
      <ActivityFeed activities={[
        { type: 'success', title: 'ABC Manufacturing upgraded to Enterprise tier', time: '2 hours ago' },
        { type: 'success', title: 'New customer "Startup Corp" signed up for free trial', time: '4 hours ago' },
        { type: 'warning', title: 'Freight Masters Inc requested custom integration', time: '1 day ago' },
        { type: 'success', title: 'Monthly revenue target exceeded by 15%', time: '2 days ago' },
        { type: 'info', title: 'Platform maintenance completed successfully', time: '3 days ago' }
      ]} />
    </div>
  );
};
