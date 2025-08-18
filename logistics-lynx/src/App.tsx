import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import { ModernLayout, portalMenus } from './components/layout/ModernLayout';
import { ModernDashboard } from './components/dashboard/ModernDashboard';
import { sampleDashboardData } from './components/dashboard/sample-data';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';
import { SoftwareCompanyDashboard } from './components/SoftwareCompanyDashboard';
import { MasterAutonomousAgentDashboard } from './autonomous/MasterAutonomousAgent.tsx';

function App() {
  const [currentPortal, setCurrentPortal] = useState('carrier');

  // Portal selection component
  const PortalSelector = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Logistics Lynx Portal
          </h1>
          <p className="text-xl text-gray-600">
            Select your portal to access the modern logistics management system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(portalMenus).map(([portalType, menuItems]) => (
            <div
              key={portalType}
              onClick={() => setCurrentPortal(portalType)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border border-gray-200"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 capitalize">
                    {portalType} Portal
                  </h3>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {portalType === 'carrier' && <span className="text-2xl">🚛</span>}
                    {portalType === 'broker' && <span className="text-2xl">📋</span>}
                    {portalType === 'autonomous' && <span className="text-2xl">🤖</span>}
                    {portalType === 'analytics' && <span className="text-2xl">📊</span>}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Access {portalType} management tools and analytics
                </p>
                <div className="flex flex-wrap gap-2">
                  {menuItems.slice(0, 3).map((item, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
                    >
                      {item.name}
                    </span>
                  ))}
                  {menuItems.length > 3 && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md">
                      +{menuItems.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Click on any portal to access the modern dashboard
          </p>
        </div>
      </div>
    </div>
  );

  // Portal Dashboard Component
  const PortalDashboard = () => {
    const portalData = sampleDashboardData[currentPortal as keyof typeof sampleDashboardData];
    const menuItems = portalMenus[currentPortal as keyof typeof portalMenus];
    
    const portalTitles = {
      carrier: 'Carrier Management Dashboard',
      broker: 'Broker Management Dashboard', 
      autonomous: 'Autonomous AI Dashboard',
      analytics: 'Analytics Dashboard'
    };

    const portalDescriptions = {
      carrier: 'Manage your fleet, drivers, and load assignments efficiently',
      broker: 'Connect carriers with shippers and manage load distribution',
      autonomous: 'Monitor AI agents and autonomous system performance',
      analytics: 'Comprehensive analytics and reporting for all operations'
    };

    return (
      <ModernLayout
        portalType={currentPortal}
        title={portalTitles[currentPortal as keyof typeof portalTitles]}
        description={portalDescriptions[currentPortal as keyof typeof portalDescriptions]}
        menuItems={menuItems}
      >
        <ModernDashboard
          title={portalTitles[currentPortal as keyof typeof portalTitles]}
          description={portalDescriptions[currentPortal as keyof typeof portalDescriptions]}
          data={portalData}
          portalType={currentPortal}
        />
      </ModernLayout>
    );
  };

  return (
    <GlobalErrorBoundary>
      <Router>
        <div className="App">
          <Routes>
            {/* Main Portal Selection */}
            <Route 
              path="/" 
              element={<PortalSelector />} 
            />

            {/* Portal Dashboards */}
            <Route 
              path="/carrier/*" 
              element={
                <ModernLayout
                  portalType="carrier"
                  title="Carrier Management Dashboard"
                  description="Manage your fleet, drivers, and load assignments efficiently"
                  menuItems={portalMenus.carrier}
                >
                  <ModernDashboard
                    title="Carrier Management Dashboard"
                    description="Manage your fleet, drivers, and load assignments efficiently"
                    data={sampleDashboardData.carrier}
                    portalType="carrier"
                  />
                </ModernLayout>
              } 
            />

            <Route 
              path="/broker/*" 
              element={
                <ModernLayout
                  portalType="broker"
                  title="Broker Management Dashboard"
                  description="Connect carriers with shippers and manage load distribution"
                  menuItems={portalMenus.broker}
                >
                  <ModernDashboard
                    title="Broker Management Dashboard"
                    description="Connect carriers with shippers and manage load distribution"
                    data={sampleDashboardData.broker}
                    portalType="broker"
                  />
                </ModernLayout>
              } 
            />

            <Route 
              path="/autonomous/*" 
              element={
                <ModernLayout
                  portalType="autonomous"
                  title="Autonomous AI Dashboard"
                  description="Monitor AI agents and autonomous system performance"
                  menuItems={portalMenus.autonomous}
                >
                  <ModernDashboard
                    title="Autonomous AI Dashboard"
                    description="Monitor AI agents and autonomous system performance"
                    data={sampleDashboardData.autonomous}
                    portalType="autonomous"
                  />
                </ModernLayout>
              } 
            />

            <Route 
              path="/analytics/*" 
              element={
                <ModernLayout
                  portalType="analytics"
                  title="Analytics Dashboard"
                  description="Comprehensive analytics and reporting for all operations"
                  menuItems={portalMenus.analytics}
                >
                  <ModernDashboard
                    title="Analytics Dashboard"
                    description="Comprehensive analytics and reporting for all operations"
                    data={sampleDashboardData.carrier} // Using carrier data as placeholder
                    portalType="analytics"
                  />
                </ModernLayout>
              } 
            />

            {/* Software Company Dashboard */}
            <Route 
              path="/software-company" 
              element={<SoftwareCompanyDashboard />} 
            />

            {/* Master Autonomous Agent Dashboard */}
            <Route 
              path="/master-agent" 
              element={<MasterAutonomousAgentDashboard />} 
            />

            {/* Catch-all route - redirect to portal selection */}
            <Route 
              path="*" 
              element={<PortalSelector />} 
            />
          </Routes>
        </div>
      </Router>
    </GlobalErrorBoundary>
  );
}

export default App;