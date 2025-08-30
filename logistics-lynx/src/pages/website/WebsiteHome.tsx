import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  ArrowRight, 
  CheckCircle, 
  Zap, 
  Shield, 
  BarChart3,
  Users,
  Globe,
  Clock,
  TrendingUp
} from 'lucide-react';

const WebsiteHome: React.FC = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Multi-Portal Ecosystem',
      description: 'Dedicated portals for Brokers, Carriers, Shippers, Drivers, and Owner-Operators'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'AI-Powered Optimization',
      description: 'Machine learning algorithms for route optimization and cost reduction'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Enterprise Security',
      description: 'SOC 2 Type II compliant with end-to-end encryption and RBAC'
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Real-Time Analytics',
      description: 'Comprehensive dashboards with predictive insights and reporting'
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Global Integration',
      description: 'Connect with 100+ TMS, ERP, and telematics systems worldwide'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '24/7 Support',
      description: 'Round-the-clock support with dedicated account managers'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '500K+', label: 'Shipments Managed' },
    { number: '98.5%', label: 'Uptime SLA' },
    { number: '45%', label: 'Cost Reduction' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-300 text-sm font-medium mb-8">
              <Truck className="w-4 h-4 mr-2" />
              MCP-V2 Platform Now Available
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              The Future of
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Logistics</span>
              <br />
              is Here
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Comprehensive logistics management platform powered by AI. Connect, optimize, and scale your transportation business with our MCP-V2 ecosystem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 text-lg font-semibold shadow-lg hover:shadow-xl"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/website/features" 
                className="border border-gray-600 text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-all duration-200 flex items-center justify-center space-x-2 text-lg"
              >
                <span>Explore Features</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Logistics Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage your transportation business, from load matching to financial settlements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-200">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Role-Based Portals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored experiences for every stakeholder in the logistics ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200">
              <h3 className="text-xl font-bold text-purple-900 mb-4">Broker Portal</h3>
              <p className="text-purple-700 mb-6">Connect shippers with carriers, optimize rates, and manage compliance.</p>
              <div className="flex items-center justify-between">
                <span className="text-purple-900 font-semibold">$149/month</span>
                <Link to="/broker" className="text-purple-600 hover:text-purple-700 font-medium">
                  Explore →
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200">
              <h3 className="text-xl font-bold text-blue-900 mb-4">Carrier Portal</h3>
              <p className="text-blue-700 mb-6">Manage fleet operations, optimize routes, and maximize revenue.</p>
              <div className="flex items-center justify-between">
                <span className="text-blue-900 font-semibold">$99/month</span>
                <Link to="/carrier" className="text-blue-600 hover:text-blue-700 font-medium">
                  Explore →
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border border-green-200">
              <h3 className="text-xl font-bold text-green-900 mb-4">Shipper Portal</h3>
              <p className="text-green-700 mb-6">Track shipments, optimize costs, and ensure compliance.</p>
              <div className="flex items-center justify-between">
                <span className="text-green-900 font-semibold">$79/month</span>
                <Link to="/shipper" className="text-green-600 hover:text-green-700 font-medium">
                  Explore →
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl border border-orange-200">
              <h3 className="text-xl font-bold text-orange-900 mb-4">Driver Portal</h3>
              <p className="text-orange-700 mb-6">Navigation, time tracking, and communication tools.</p>
              <div className="flex items-center justify-between">
                <span className="text-orange-900 font-semibold">Free</span>
                <Link to="/driver" className="text-orange-600 hover:text-orange-700 font-medium">
                  Explore →
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 p-8 rounded-2xl border border-indigo-200">
              <h3 className="text-xl font-bold text-indigo-900 mb-4">Owner-Operator</h3>
              <p className="text-indigo-700 mb-6">Profit maximization and smart route planning.</p>
              <div className="flex items-center justify-between">
                <span className="text-indigo-900 font-semibold">$129/month</span>
                <Link to="/owner-operator" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Explore →
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Super Admin</h3>
              <p className="text-gray-700 mb-6">Complete system administration and oversight.</p>
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-semibold">Enterprise</span>
                <Link to="/super-admin" className="text-gray-600 hover:text-gray-700 font-medium">
                  Explore →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Logistics?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using Trans Bot AI to streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-2 text-lg font-semibold"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/website/company/about" 
              className="border border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 text-lg"
            >
              <span>Learn More</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebsiteHome;
