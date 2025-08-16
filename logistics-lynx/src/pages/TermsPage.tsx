/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const TermsPage = () => {
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
            Terms of Service
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Terms of service and usage agreements for Trans Bot AI platform.
          </p>
        </div>

        {/* Page Specific Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          
       <div className="text-center">
         <h3 className="text-2xl font-bold text-gray-900 mb-4">Terms of service and usage agreements for Trans Bot AI platform.</h3>
         <p className="text-gray-600">
           This page is being built by autonomous agents. Content will be available soon.
         </p>
         <div className="mt-6">
           <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
             🔥 Autonomous Agent Building
           </span>
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

export default TermsPage;