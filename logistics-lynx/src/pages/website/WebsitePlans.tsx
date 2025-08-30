import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  ArrowRight,
  Users,
  BarChart3
} from 'lucide-react';

const WebsitePlans: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: 'Broker Portal',
      price: billingCycle === 'monthly' ? 149 : 1490,
      description: 'Complete freight brokerage management platform',
      features: [
        'Load board management',
        'Carrier matching & vetting',
        'Rate optimization',
        'Compliance tracking',
        'Financial settlements',
        'Analytics & reporting',
        'Mobile app access',
        'API integrations'
      ],
      popular: false,
      color: 'purple'
    },
    {
      name: 'Carrier Portal',
      price: billingCycle === 'monthly' ? 99 : 990,
      description: 'Fleet management and operations optimization',
      features: [
        'Fleet management',
        'Route optimization',
        'Driver management',
        'Maintenance tracking',
        'Fuel management',
        'ELD compliance',
        'Mobile driver app',
        'Financial tracking'
      ],
      popular: true,
      color: 'blue'
    },
    {
      name: 'Shipper Portal',
      price: billingCycle === 'monthly' ? 79 : 790,
      description: 'Shipment tracking and cost optimization',
      features: [
        'Shipment tracking',
        'Cost optimization',
        'Service monitoring',
        'Compliance tracking',
        'Analytics dashboard',
        'Document management',
        'Mobile access',
        'Integration support'
      ],
      popular: false,
      color: 'green'
    },
    {
      name: 'Owner-Operator',
      price: billingCycle === 'monthly' ? 129 : 1290,
      description: 'Profit maximization and smart planning',
      features: [
        'Profit optimization',
        'Smart route planning',
        'Financial tracking',
        'Home time optimization',
        'Market analysis',
        'Expense management',
        'Mobile app',
        'Analytics insights'
      ],
      popular: false,
      color: 'indigo'
    }
  ];

  const enterpriseFeatures = [
    'Custom integrations',
    'Dedicated support',
    'SLA guarantees',
    'Custom branding',
    'Advanced analytics',
    'White-label options',
    'On-premise deployment',
    'Custom development'
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple':
        return 'from-purple-500 to-purple-600';
      case 'blue':
        return 'from-blue-500 to-blue-600';
      case 'green':
        return 'from-green-500 to-green-600';
      case 'indigo':
        return 'from-indigo-500 to-indigo-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Simple, Transparent
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose the plan that fits your business needs. All plans include a 14-day free trial.
            </p>
            
            {/* Billing Toggle */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  billingCycle === 'annual' ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-gray-900' : 'text-gray-500'}`}>
                Annual
                <span className="ml-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Plans Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white border-2 rounded-2xl p-8 ${
                  plan.popular 
                    ? 'border-blue-500 shadow-xl scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">${plan.price}</span>
                    <span className="text-gray-500">/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                  </div>

                  <Link
                    to="/signup"
                    className={`w-full bg-gradient-to-r ${getColorClasses(plan.color)} text-white py-3 px-6 rounded-lg hover:opacity-90 transition-all duration-200 font-semibold flex items-center justify-center space-x-2`}
                  >
                    <span>Start Free Trial</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 mb-4">What's included:</h4>
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-600">
                      <Check className="w-4 h-4 text-green-500 mr-3 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Enterprise Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Custom solutions for large organizations with specific requirements and compliance needs.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Tailored for Your Business
              </h3>
              <div className="space-y-4">
                {enterpriseFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <div className="text-center">
                <h4 className="text-xl font-bold text-gray-900 mb-4">Contact Sales</h4>
                <p className="text-gray-600 mb-6">
                  Get a custom quote tailored to your organization's needs.
                </p>
                <Link
                  to="/website/company/contact"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-8 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-semibold inline-flex items-center space-x-2"
                >
                  <span>Contact Sales</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes will be prorated based on your billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a setup fee?
              </h3>
              <p className="text-gray-600">
                No setup fees. All plans include a 14-day free trial, and you can start using the platform immediately.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, ACH transfers, and wire transfers for annual plans.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer volume discounts?
              </h3>
              <p className="text-gray-600">
                Yes, we offer volume discounts for organizations with multiple users. Contact our sales team for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of businesses already using Trans Bot AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-all duration-200 font-semibold"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/website/company/contact" 
              className="border border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-200 font-semibold"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebsitePlans;
