import { Metadata } from 'next';
import { CTASection } from '../../components/CTASection';

export const metadata: Metadata = {
  title: 'ROI Calculator - Calculate Your Savings with Trans Bot AI',
  description: 'Use our interactive ROI calculator to estimate your potential cost savings and efficiency gains with Trans Bot AI transportation management.',
  keywords: 'ROI calculator, cost savings, transportation ROI, logistics calculator, TMS ROI',
  openGraph: {
    title: 'ROI Calculator - Calculate Your Savings with Trans Bot AI',
    description: 'Use our interactive ROI calculator to estimate your potential cost savings and efficiency gains with Trans Bot AI transportation management.',
    type: 'website',
    url: 'https://transbot.ai/roi-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ROI Calculator - Calculate Your Savings with Trans Bot AI',
    description: 'Use our interactive ROI calculator to estimate your potential cost savings and efficiency gains with Trans Bot AI transportation management.',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Trans Bot AI ROI Calculator",
  "description": "Calculate potential savings with Trans Bot AI transportation management",
  "url": "https://transbot.ai/roi-calculator",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web Browser"
};

const industryBenchmarks = {
  'freight-broker': {
    name: 'Freight Broker',
    avgSavings: 30,
    efficiencyGain: 50,
    fuelReduction: 15,
    adminReduction: 40
  },
  'carrier': {
    name: 'Carrier',
    avgSavings: 25,
    efficiencyGain: 40,
    fuelReduction: 25,
    adminReduction: 35
  },
  'shipper': {
    name: 'Shipper',
    avgSavings: 35,
    efficiencyGain: 45,
    fuelReduction: 20,
    adminReduction: 30
  },
  'logistics-provider': {
    name: 'Logistics Provider',
    avgSavings: 28,
    efficiencyGain: 42,
    fuelReduction: 18,
    adminReduction: 38
  }
};

const savingsBreakdown = [
  {
    category: 'Route Optimization',
    description: 'AI-powered route planning reduces fuel costs and delivery times',
    percentage: 25,
    color: 'bg-blue-500'
  },
  {
    category: 'Load Optimization',
    description: 'Better load matching and capacity utilization',
    percentage: 20,
    color: 'bg-green-500'
  },
  {
    category: 'Administrative Efficiency',
    description: 'Automated processes reduce manual work and errors',
    percentage: 30,
    color: 'bg-purple-500'
  },
  {
    category: 'Real-time Visibility',
    description: 'Better tracking and proactive issue resolution',
    percentage: 15,
    color: 'bg-orange-500'
  },
  {
    category: 'Predictive Analytics',
    description: 'Data-driven insights for better decision making',
    percentage: 10,
    color: 'bg-pink-500'
  }
];

export default function ROICalculatorPage() {
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
              ROI <span className="text-blue-600">Calculator</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Calculate your potential savings and return on investment with Trans Bot AI. 
              See how our transportation management platform can transform your operations.
            </p>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Input Form */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Calculate Your Savings</h2>
                
                <form className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry Type *
                    </label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                      <option value="">Select your industry</option>
                      <option value="freight-broker">Freight Broker</option>
                      <option value="carrier">Carrier</option>
                      <option value="shipper">Shipper</option>
                      <option value="logistics-provider">Logistics Provider</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Shipments *
                    </label>
                    <input
                      type="number"
                      placeholder="1000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Average Cost per Shipment ($) *
                    </label>
                    <input
                      type="number"
                      placeholder="150"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Fleet Size (Vehicles)
                    </label>
                    <input
                      type="number"
                      placeholder="50"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Revenue ($)
                    </label>
                    <input
                      type="number"
                      placeholder="5000000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Administrative Staff
                    </label>
                    <input
                      type="number"
                      placeholder="10"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Calculate ROI
                  </button>
                </form>
              </div>
              
              {/* Results Display */}
              <div className="bg-white rounded-lg shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Potential Savings</h2>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
                    <div className="text-3xl font-bold mb-2">$180,000</div>
                    <div className="text-blue-100">Estimated Annual Savings</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-600 mb-1">30%</div>
                      <div className="text-sm text-gray-600">Cost Reduction</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-blue-600 mb-1">50%</div>
                      <div className="text-sm text-gray-600">Efficiency Gain</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-orange-600 mb-1">25%</div>
                      <div className="text-sm text-gray-600">Fuel Savings</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-600 mb-1">40%</div>
                      <div className="text-sm text-gray-600">Admin Reduction</div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-800 mb-2">ROI Timeline</h3>
                    <div className="space-y-2 text-sm text-green-700">
                      <div>• Break-even: 3-6 months</div>
                      <div>• Full ROI: 12-18 months</div>
                      <div>• 3-year ROI: 300%+</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Savings Breakdown */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How You'll Save</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savingsBreakdown.map((item) => (
                <div key={item.category} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <div className={`w-4 h-4 ${item.color} rounded-full mr-3`}></div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.category}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">{item.percentage}%</span>
                    <span className="text-sm text-gray-500">of total savings</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Benchmarks */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Industry Benchmarks</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(industryBenchmarks).map(([key, benchmark]) => (
                <div key={key} className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">{benchmark.name}</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg. Savings:</span>
                      <span className="font-semibold text-green-600">{benchmark.avgSavings}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Efficiency:</span>
                      <span className="font-semibold text-blue-600">+{benchmark.efficiencyGain}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fuel Reduction:</span>
                      <span className="font-semibold text-orange-600">{benchmark.fuelReduction}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Admin Reduction:</span>
                      <span className="font-semibold text-purple-600">{benchmark.adminReduction}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Real Results from Our Customers</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-3xl mb-4">📈</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">ABC Logistics</h3>
                <p className="text-gray-600 mb-4">
                  "Trans Bot AI helped us reduce operational costs by 35% and improve 
                  delivery times by 40% within the first 6 months."
                </p>
                <div className="text-sm text-gray-500">
                  <div>• 35% cost reduction</div>
                  <div>• 40% faster deliveries</div>
                  <div>• 50% fewer delays</div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-3xl mb-4">🚛</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">XYZ Trucking</h3>
                <p className="text-gray-600 mb-4">
                  "Our fleet utilization improved by 45% and fuel costs decreased by 
                  28% with Trans Bot AI's route optimization."
                </p>
                <div className="text-sm text-gray-500">
                  <div>• 45% better utilization</div>
                  <div>• 28% fuel savings</div>
                  <div>• 30% more loads</div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-3xl mb-4">📦</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Global Retail Co.</h3>
                <p className="text-gray-600 mb-4">
                  "We achieved 42% cost savings while improving customer satisfaction 
                  scores by 25% through better tracking and communication."
                </p>
                <div className="text-sm text-gray-500">
                  <div>• 42% cost savings</div>
                  <div>• 25% customer satisfaction</div>
                  <div>• 60% fewer complaints</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Implementation Timeline */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Implementation Timeline</h2>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 1-2: Setup & Configuration</h3>
                  <p className="text-gray-600">
                    Initial setup, account configuration, and basic training for your team.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 3-4: Integration & Testing</h3>
                  <p className="text-gray-600">
                    Connect with existing systems, test workflows, and validate data flows.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Week 5-6: Go-Live & Optimization</h3>
                  <p className="text-gray-600">
                    Full deployment, team training, and initial optimization of AI models.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-orange-600 font-bold">4</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Month 2-3: Optimization & Scaling</h3>
                  <p className="text-gray-600">
                    Fine-tune AI models, expand usage, and begin seeing measurable ROI.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              Ready to Start Saving?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of companies already saving money with Trans Bot AI. 
              Get started with a free consultation and personalized ROI analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Free Consultation
              </button>
              <button className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Download Full Report
              </button>
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
}
