import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Truck, 
  BarChart3, 
  DollarSign, 
  FileText, 
  ShoppingCart, 
  BookOpen, 
  Calculator,
  MessageSquare,
  Smartphone,
  Shield,
  Zap
} from 'lucide-react';

const WebsiteFeatures: React.FC = () => {
  const features = [
    {
      id: 'crm',
      icon: <Users className="w-8 h-8" />,
      title: 'CRM',
      description: 'Comprehensive customer relationship management for logistics businesses',
      benefits: ['Customer tracking', 'Lead management', 'Communication history', 'Pipeline management'],
      link: '/website/features/crm'
    },
    {
      id: 'load-board',
      icon: <Truck className="w-8 h-8" />,
      title: 'Load Board',
      description: 'Real-time load matching and freight exchange platform',
      benefits: ['Live load postings', 'Carrier matching', 'Rate optimization', 'Real-time tracking'],
      link: '/website/features/load-board'
    },
    {
      id: 'rates',
      icon: <DollarSign className="w-8 h-8" />,
      title: 'Rates & Pricing',
      description: 'Dynamic pricing and rate optimization tools',
      benefits: ['Market rate analysis', 'Dynamic pricing', 'Profit optimization', 'Competitive intelligence'],
      link: '/website/features/rates'
    },
    {
      id: 'financials',
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Financials',
      description: 'Complete financial management and settlement system',
      benefits: ['AR/AP management', 'Settlement automation', 'Financial reporting', 'Cash flow tracking'],
      link: '/website/features/financials'
    },
    {
      id: 'onboarding',
      icon: <FileText className="w-8 h-8" />,
      title: 'Onboarding',
      description: 'Streamlined onboarding for carriers, shippers, and brokers',
      benefits: ['Digital document processing', 'Compliance verification', 'Quick setup', 'Automated workflows'],
      link: '/website/features/onboarding'
    },
    {
      id: 'marketplace',
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Marketplace',
      description: 'B2B marketplace for logistics services and equipment',
      benefits: ['Service discovery', 'Equipment rentals', 'Vendor management', 'Transaction processing'],
      link: '/website/features/marketplace'
    },
    {
      id: 'directory',
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Directory',
      description: 'Comprehensive directory of logistics partners and vendors',
      benefits: ['Partner discovery', 'Verified listings', 'Reviews & ratings', 'Contact management'],
      link: '/website/features/directory'
    },
    {
      id: 'factoring',
      icon: <Calculator className="w-8 h-8" />,
      title: 'Factoring',
      description: 'Invoice factoring and cash flow management solutions',
      benefits: ['Quick funding', 'Invoice management', 'Reserve tracking', 'Partner network'],
      link: '/website/features/factoring'
    },
    {
      id: 'edi',
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'EDI & Documents',
      description: 'Electronic data interchange and document management',
      benefits: ['Automated data exchange', 'Document processing', 'Compliance automation', 'Integration ready'],
      link: '/website/features/edi'
    },
    {
      id: 'ai-agents',
      icon: <Zap className="w-8 h-8" />,
      title: 'AI Agents',
      description: 'Intelligent automation and AI-powered workflows',
      benefits: ['Process automation', 'Predictive analytics', 'Smart routing', 'Intelligent matching'],
      link: '/website/features/ai-agents'
    },
    {
      id: 'mobile',
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Mobile App',
      description: 'Mobile applications for drivers and field operations',
      benefits: ['Real-time tracking', 'Document capture', 'Communication tools', 'Offline capabilities'],
      link: '/website/features/mobile'
    },
    {
      id: 'super-admin',
      icon: <Shield className="w-8 h-8" />,
      title: 'Super Admin',
      description: 'Complete system administration and oversight tools',
      benefits: ['User management', 'System monitoring', 'Security controls', 'Analytics dashboard'],
      link: '/website/features/super-admin'
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Complete Logistics
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Features</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need to manage your transportation business, from load matching to financial settlements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/signup" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold"
              >
                Start Free Trial
              </Link>
              <Link 
                to="/website/integrations" 
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-all duration-200 font-semibold"
              >
                View Integrations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.id} className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-lg transition-all duration-200">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                
                <div className="space-y-2 mb-6">
                  {feature.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                      {benefit}
                    </div>
                  ))}
                </div>

                <Link 
                  to={feature.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Learn more →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Transform Your Logistics?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using Trans Bot AI to streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/website/plans" 
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 font-semibold"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebsiteFeatures;
