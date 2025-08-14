import React from 'react';

const PricingPage = () => {
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
            Pricing Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transparent pricing plans designed to scale with your business needs. Start with a free trial today.
          </p>
        </div>

        {/* Page Specific Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Starter</h3>
            <div className="text-3xl font-bold text-blue-600 mb-4">$99<span className="text-lg text-gray-500">/month</span></div>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>• Up to 10 vehicles</li>
              <li>• Basic route optimization</li>
              <li>• Email support</li>
              <li>• Mobile app access</li>
            </ul>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Start Free Trial
            </button>
          </div>
          <div className="border-2 border-blue-600 rounded-lg p-6 bg-blue-50">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Professional</h3>
            <div className="text-3xl font-bold text-blue-600 mb-4">$299<span className="text-lg text-gray-500">/month</span></div>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>• Up to 50 vehicles</li>
              <li>• Advanced optimization</li>
              <li>• Priority support</li>
              <li>• API access</li>
              <li>• Analytics dashboard</li>
            </ul>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Start Free Trial
            </button>
          </div>
          <div className="border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
            <div className="text-3xl font-bold text-blue-600 mb-4">Custom</div>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li>• Unlimited vehicles</li>
              <li>• Custom integrations</li>
              <li>• 24/7 phone support</li>
              <li>• Dedicated account manager</li>
              <li>• Custom reporting</li>
            </ul>
            <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Contact Sales
            </button>
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

export default PricingPage;