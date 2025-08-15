import { Metadata } from 'next';
import { CTASection } from '../../components/CTASection';

export const metadata: Metadata = {
  title: 'Solutions - Trans Bot AI Transportation Management by Industry',
  description: 'Discover industry-specific transportation management solutions designed for freight brokers, carriers, shippers, and logistics providers.',
  keywords: 'transportation solutions, freight broker software, carrier management, shipper solutions, logistics software',
  openGraph: {
    title: 'Solutions - Trans Bot AI Transportation Management by Industry',
    description: 'Discover industry-specific transportation management solutions designed for freight brokers, carriers, shippers, and logistics providers.',
    type: 'website',
    url: 'https://transbot.ai/solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solutions - Trans Bot AI Transportation Management by Industry',
    description: 'Discover industry-specific transportation management solutions designed for freight brokers, carriers, shippers, and logistics providers.',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Trans Bot AI Solutions",
  "description": "Transportation management solutions by industry",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Freight Broker Solutions"
    },
    {
      "@type": "ListItem", 
      "position": 2,
      "name": "Carrier Management"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Shipper Solutions"
    }
  ]
};

const solutions = [
  {
    id: 'freight-broker',
    title: 'Freight Broker Solutions',
    subtitle: 'Streamline operations and maximize profitability',
    description: 'Comprehensive tools for load matching, rate negotiation, and customer management.',
    features: [
      'Intelligent load matching',
      'Automated rate negotiation',
      'Customer relationship management',
      'Real-time tracking and updates',
      'Documentation automation',
      'Financial management tools'
    ],
    benefits: [
      '50% faster load matching',
      '30% increase in profit margins',
      '24/7 automated operations',
      'Reduced administrative overhead'
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    color: 'bg-blue-500'
  },
  {
    id: 'carrier',
    title: 'Carrier Management',
    subtitle: 'Optimize fleet operations and driver efficiency',
    description: 'Complete fleet management solution with route optimization and driver management.',
    features: [
      'Fleet optimization',
      'Driver management',
      'Route planning',
      'Maintenance scheduling',
      'Fuel management',
      'Compliance tracking'
    ],
    benefits: [
      '25% reduction in fuel costs',
      '40% improvement in delivery times',
      'Automated compliance monitoring',
      'Enhanced driver satisfaction'
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    color: 'bg-green-500'
  },
  {
    id: 'shipper',
    title: 'Shipper Solutions',
    subtitle: 'Simplify shipping and improve customer satisfaction',
    description: 'End-to-end shipping management with real-time visibility and cost optimization.',
    features: [
      'Shipment booking',
      'Rate comparison',
      'Real-time tracking',
      'Documentation management',
      'Cost optimization',
      'Customer portal'
    ],
    benefits: [
      '35% reduction in shipping costs',
      'Improved delivery reliability',
      'Enhanced customer experience',
      'Streamlined operations'
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    color: 'bg-purple-500'
  },
  {
    id: 'logistics-provider',
    title: 'Logistics Provider',
    subtitle: 'Scale operations with intelligent automation',
    description: 'Enterprise-grade logistics management with advanced analytics and automation.',
    features: [
      'Multi-tenant architecture',
      'Advanced analytics',
      'API integrations',
      'Custom workflows',
      'White-label options',
      'Enterprise security'
    ],
    benefits: [
      'Unlimited scalability',
      'Custom integrations',
      'Advanced reporting',
      'Enterprise-grade security'
    ],
    icon: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'bg-orange-500'
  }
];

const industries = [
  {
    name: 'E-commerce',
    description: 'Fast, reliable shipping for online retailers',
    icon: '🛒'
  },
  {
    name: 'Manufacturing',
    description: 'Just-in-time delivery and supply chain optimization',
    icon: '🏭'
  },
  {
    name: 'Retail',
    description: 'Multi-location distribution and inventory management',
    icon: '🏪'
  },
  {
    name: 'Healthcare',
    description: 'Temperature-controlled and time-sensitive deliveries',
    icon: '🏥'
  },
  {
    name: 'Food & Beverage',
    description: 'Fresh food logistics and cold chain management',
    icon: '🍽️'
  },
  {
    name: 'Construction',
    description: 'Heavy equipment and materials transportation',
    icon: '🏗️'
  }
];

export default function SolutionsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Industry <span className="text-blue-600">Solutions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Tailored transportation management solutions designed for your specific industry 
              and business needs.
            </p>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {solutions.map((solution) => (
                <div key={solution.id} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-start mb-6">
                    <div className={`w-16 h-16 ${solution.color} rounded-lg flex items-center justify-center text-white mr-4`}>
                      {solution.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{solution.title}</h3>
                      <p className="text-lg text-gray-600">{solution.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6">{solution.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Key Features</h4>
                      <ul className="space-y-2">
                        {solution.features.map((feature, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Benefits</h4>
                      <ul className="space-y-2">
                        {solution.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center text-sm text-gray-600">
                            <svg className="w-4 h-4 text-blue-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Learn More About {solution.title}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Solutions for Every Industry
              </h2>
              <p className="text-xl text-gray-600">
                From e-commerce to healthcare, we have specialized solutions for your industry.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry) => (
                <div key={industry.name} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{industry.name}</h3>
                  <p className="text-gray-600">{industry.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies Preview */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600">
                See how companies are transforming their operations with Trans Bot AI.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-3xl mb-4">📈</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Freight Broker Success
                </h3>
                <p className="text-gray-600 mb-4">
                  "Trans Bot AI helped us increase our load matching efficiency by 50% and 
                  reduce operational costs by 30%."
                </p>
                <div className="text-sm text-gray-500">- ABC Logistics</div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-3xl mb-4">🚛</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Carrier Optimization
                </h3>
                <p className="text-gray-600 mb-4">
                  "Our fleet utilization improved by 40% and fuel costs decreased by 25% 
                  with Trans Bot AI's route optimization."
                </p>
                <div className="text-sm text-gray-500">- XYZ Trucking</div>
              </div>
              
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="text-3xl mb-4">📦</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Shipper Transformation
                </h3>
                <p className="text-gray-600 mb-4">
                  "We reduced shipping costs by 35% while improving delivery reliability 
                  and customer satisfaction."
                </p>
                <div className="text-sm text-gray-500">- Global Retail Co.</div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Connect Trans Bot AI with your existing systems and workflows.
            </p>
            
            <div className="grid md:grid-cols-4 gap-6">
              {['ERP Systems', 'WMS Platforms', 'Accounting Software', 'CRM Solutions'].map((integration) => (
                <div key={integration} className="bg-gray-50 rounded-lg p-4">
                  <div className="text-2xl mb-2">🔗</div>
                  <div className="font-medium text-gray-900">{integration}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View All Integrations
              </button>
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Calculate Your ROI
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              See how much Trans Bot AI can save your business with our interactive calculator.
            </p>
            
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Shipments
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="1000"
                    defaultValue="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Cost per Shipment
                  </label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    placeholder="50"
                    defaultValue="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                    <option>Freight Broker</option>
                    <option>Carrier</option>
                    <option>Shipper</option>
                    <option>Logistics Provider</option>
                  </select>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  Estimated Annual Savings: $180,000
                </div>
                <p className="text-gray-600">
                  Based on industry-specific optimization and cost reduction metrics
                </p>
              </div>
            </div>
            
            <button className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Get Detailed Analysis
            </button>
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
}
