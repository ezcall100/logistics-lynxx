import React from 'react';
import { Link } from 'react-router-dom';
import { Truck, ArrowRight, CheckCircle } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Trans Bot AI</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            The Future of
            <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"> Logistics</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Comprehensive logistics management platform powered by AI. Connect, optimize, and scale your transportation business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/login" 
              className="border border-gray-600 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 text-lg"
            >
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-20 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">Complete Logistics Ecosystem</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-8 rounded-2xl border border-purple-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Broker Portal</h3>
              <p className="text-gray-300 mb-4">Connect shippers with carriers, optimize rates, and manage compliance.</p>
              <div className="text-purple-400 font-semibold">$149/month</div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/50 to-cyan-900/50 p-8 rounded-2xl border border-blue-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Carrier Portal</h3>
              <p className="text-gray-300 mb-4">Manage fleet operations, optimize routes, and maximize revenue.</p>
              <div className="text-blue-400 font-semibold">$99/month</div>
            </div>

            <div className="bg-gradient-to-br from-green-900/50 to-emerald-900/50 p-8 rounded-2xl border border-green-500/20">
              <h3 className="text-xl font-bold text-white mb-4">Shipper Portal</h3>
              <p className="text-gray-300 mb-4">Track shipments, optimize costs, and ensure compliance.</p>
              <div className="text-green-400 font-semibold">$79/month</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Logistics?</h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of businesses already using Trans Bot AI
          </p>
          <Link 
            to="/signup" 
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 inline-flex items-center space-x-2 text-lg font-semibold"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
