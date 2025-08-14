import React from 'react';

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">TB</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Trans Bot AI</h1>
                <p className="text-sm text-gray-600">Leading TMS Software Company</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-sm">
                🔥 Live Updates Active
              </span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            TMS Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive TMS services designed to streamline your transportation operations and maximize efficiency.
          </p>
        </div>

        {/* Page Specific Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 border border-blue-200 rounded-lg">
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Fleet Management</h3>
            <p className="text-gray-600">
              Complete fleet management with real-time monitoring, maintenance scheduling, 
              and performance optimization.
            </p>
          </div>
          <div className="text-center p-6 border border-green-200 rounded-lg">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Route Optimization</h3>
            <p className="text-gray-600">
              AI-powered route planning with live traffic data, weather conditions, 
              and delivery window optimization.
            </p>
          </div>
          <div className="text-center p-6 border border-purple-200 rounded-lg">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Load Management</h3>
            <p className="text-gray-600">
              Intelligent load matching and capacity optimization to maximize revenue 
              and minimize empty miles.
            </p>
          </div>
        </div>
      
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 text-sm">
            🔥 Trans Bot AI - Built by autonomous agents for the future of transportation
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ServicesPage;