import Link from 'next/link'
import { 
  Package, 
  Truck, 
  Building2, 
  User, 
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react'

export function SolutionsSection() {
  const solutions = [
    {
      icon: Package,
      title: 'For Shippers',
      subtitle: 'Optimize your supply chain',
      description: 'Streamline your shipping operations with intelligent load matching, real-time tracking, and automated documentation.',
      features: [
        'Automated load matching',
        'Real-time shipment tracking',
        'Automated documentation',
        'Cost optimization',
        'Performance analytics'
      ],
      cta: 'Explore Shipper Solutions',
      href: '/solutions/shippers',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Truck,
      title: 'For Carriers',
      subtitle: 'Maximize your fleet efficiency',
      description: 'Optimize routes, reduce empty miles, and increase revenue with AI-powered dispatch and real-time fleet management.',
      features: [
        'AI-powered dispatch',
        'Route optimization',
        'Fleet management',
        'Driver communication',
        'Revenue analytics'
      ],
      cta: 'Explore Carrier Solutions',
      href: '/solutions/carriers',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Building2,
      title: 'For Brokers',
      subtitle: 'Scale your brokerage',
      description: 'Grow your business with automated load matching, instant quoting, and comprehensive customer management tools.',
      features: [
        'Automated load matching',
        'Instant quoting system',
        'Customer management',
        'Commission tracking',
        'Market analytics'
      ],
      cta: 'Explore Broker Solutions',
      href: '/solutions/brokers',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: User,
      title: 'For Owner-Operators',
      subtitle: 'Run your business smarter',
      description: 'Take control of your operations with simplified load booking, expense tracking, and business analytics.',
      features: [
        'Simplified load booking',
        'Expense tracking',
        'Business analytics',
        'Document management',
        'Tax preparation'
      ],
      cta: 'Explore Owner-Operator Solutions',
      href: '/solutions/owner-operators',
      color: 'from-orange-500 to-orange-600'
    }
  ]

  return (
    <section id="solutions" className="bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <div className="section-padding">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Tailored Solutions for
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                {' '}Every Role
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Whether you're a shipper, carrier, broker, or owner-operator, 
              we have the perfect solution to optimize your operations.
            </p>
          </div>

          {/* Solutions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {solutions.map((solution, index) => (
              <div
                key={solution.title}
                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${solution.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
                
                <div className="relative p-8">
                  {/* Header */}
                  <div className="flex items-start space-x-4 mb-6">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${solution.color} flex items-center justify-center flex-shrink-0`}>
                      <solution.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {solution.title}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-400">
                        {solution.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {solution.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <Link
                    href={solution.href}
                    className={`inline-flex items-center space-x-2 text-lg font-semibold bg-gradient-to-r ${solution.color} bg-clip-text text-transparent hover:opacity-80 transition-opacity group/cta`}
                  >
                    <span>{solution.cta}</span>
                    <ArrowRight className="h-5 w-5 group-hover/cta:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Section */}
          <div className="text-center">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <Star className="h-6 w-6 text-yellow-500" />
                <Star className="h-6 w-6 text-yellow-500" />
                <Star className="h-6 w-6 text-yellow-500" />
                <Star className="h-6 w-6 text-yellow-500" />
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Transform Your Operations?
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
                Join thousands of logistics professionals who have already revolutionized 
                their operations with Logistics Lynx. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signup"
                  className="btn-primary text-lg px-8 py-4"
                >
                  Start Free Trial
                </Link>
                <Link
                  href="/demo"
                  className="btn-secondary text-lg px-8 py-4"
                >
                  Schedule Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
