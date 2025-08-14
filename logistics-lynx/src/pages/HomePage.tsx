import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Live Update Indicator - Added by Autonomous Agent at 10:23:05 AM */}
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            <span className="text-sm font-medium">LIVE UPDATES ACTIVE</span>
          </div>
          <div className="text-xs mt-1">Last update: 10:23:05 AM</div>
          <div className="text-xs">Update #2</div>
        </div>
      {/* Header - Created by Autonomous Agent */}
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

      {/* Hero Section - Created by Autonomous Agent */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900 mb-6">
              The Future of Transportation Management
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Trans Bot AI delivers cutting-edge Transportation Management System (TMS) software 
              powered by autonomous agents. Streamline operations, optimize routes, and maximize 
              efficiency with AI-driven logistics solutions.
            </p>
            <div className="flex justify-center space-x-4">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-lg font-semibold">
                Start Free Trial
              </button>
              <button className="px-8 py-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-lg font-semibold">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Companies Served</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">$2.5M</div>
              <div className="text-gray-600">Cost Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Created by Autonomous Agent */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Autonomous TMS Features
            </h3>
            <p className="text-gray-600">
              Built and maintained by intelligent agents for maximum efficiency
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-blue-200 bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">🤖</div>
              <h4 className="text-lg font-semibold text-blue-700 mb-3">
                AI-Powered Fleet Management
              </h4>
              <p className="text-blue-600">
                Autonomous agents monitor and optimize your entire fleet in real-time, 
                reducing costs and improving efficiency by up to 40%.
              </p>
            </div>

            <div className="border border-green-200 bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">⚡</div>
              <h4 className="text-lg font-semibold text-green-700 mb-3">
                Real-Time Route Optimization
              </h4>
              <p className="text-green-600">
                Dynamic route planning with live traffic data, weather conditions, 
                and delivery windows for maximum on-time performance.
              </p>
            </div>

            <div className="border border-purple-200 bg-white rounded-lg p-6 shadow-sm">
              <div className="text-3xl mb-4">🎯</div>
              <h4 className="text-lg font-semibold text-purple-700 mb-3">
                Smart Load Management
              </h4>
              <p className="text-purple-600">
                Intelligent load matching and capacity optimization to maximize 
                revenue and minimize empty miles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Live Status Section - Created by Autonomous Agent */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Live Autonomous Agent Status
            </h3>
            <p className="text-gray-600">
              Our AI agents are continuously improving your TMS platform
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl mb-2">🤖</div>
              <h4 className="font-semibold text-sm mb-1">FleetOptimizer</h4>
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                active
              </span>
              <p className="text-xs text-gray-500 mt-2">Optimizing 1,247 vehicles</p>
            </div>
            
            <div className="text-center bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl mb-2">🧩</div>
              <h4 className="font-semibold text-sm mb-1">RouteMaster</h4>
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                optimizing
              </span>
              <p className="text-xs text-gray-500 mt-2">Planning 89 routes</p>
            </div>
            
            <div className="text-center bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl mb-2">🎨</div>
              <h4 className="font-semibold text-sm mb-1">LoadMatcher</h4>
              <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                matching
              </span>
              <p className="text-xs text-gray-500 mt-2">Processing 156 loads</p>
            </div>
            
            <div className="text-center bg-gray-50 p-6 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold text-sm mb-1">AnalyticsEngine</h4>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                analyzing
              </span>
              <p className="text-xs text-gray-500 mt-2">Generating insights</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your Transportation Operations?
          </h3>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join 500+ companies already using Trans Bot AI to streamline their logistics 
            and reduce costs by up to 40%.
          </p>
          <div className="flex justify-center space-x-4">
            <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 text-lg font-semibold">
              Start Free Trial
            </button>
            <button className="px-8 py-4 border border-white text-white rounded-lg hover:bg-blue-700 text-lg font-semibold">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer - Created by Autonomous Agent */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Trans Bot AI</h4>
              <p className="text-gray-400 text-sm">
                Leading Transportation Management System software company, 
                powered by autonomous agents for maximum efficiency.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Products</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• Fleet Management</li>
                <li>• Route Optimization</li>
                <li>• Load Management</li>
                <li>• Driver Management</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li>• About Us</li>
                <li>• Careers</li>
                <li>• News & Events</li>
                <li>• Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <div className="flex space-x-4">
                <button className="px-3 py-1 border border-gray-600 text-gray-300 rounded text-sm hover:bg-gray-800">
                  Help Center
                </button>
                <button className="px-3 py-1 border border-gray-600 text-gray-300 rounded text-sm hover:bg-gray-800">
                  Contact
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              🔥 Trans Bot AI - Built by autonomous agents for the future of transportation
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;