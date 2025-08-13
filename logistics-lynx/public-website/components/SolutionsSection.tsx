import Link from 'next/link'
import { ArrowRight, Package, Users, Truck, UserCheck } from 'lucide-react'

export function SolutionsSection() {
  const solutions = [
    {
      icon: Package,
      title: 'For Shippers',
      description: 'Optimize your supply chain with intelligent routing and real-time visibility.',
      features: ['Load Optimization', 'Real-time Tracking', 'Cost Analysis', 'Carrier Management'],
      href: '/solutions/shippers',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
    },
    {
      icon: Users,
      title: 'For Brokers',
      description: 'Streamline operations with automated load matching and carrier management.',
      features: ['Load Matching', 'Carrier Network', 'Rate Management', 'Documentation'],
      href: '/solutions/brokers',
      color: 'text-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
    },
    {
      icon: Truck,
      title: 'For Carriers',
      description: 'Maximize fleet efficiency with route optimization and driver management.',
      features: ['Route Optimization', 'Driver Management', 'Fuel Optimization', 'Compliance'],
      href: '/solutions/carriers',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
    },
    {
      icon: UserCheck,
      title: 'For Owner-Operators',
      description: 'Grow your business with smart load selection and financial management.',
      features: ['Load Selection', 'Financial Tracking', 'Maintenance Scheduling', 'Insurance'],
      href: '/solutions/owner-operators',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
    },
  ]

  return (
    <section className="section-padding bg-gray-50 dark:bg-gray-800">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Solutions for Every Role
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Tailored solutions designed specifically for your role in the transportation industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
            >
              <div className={`inline-flex p-3 rounded-lg ${solution.bgColor} mb-6`}>
                <solution.icon className={`h-8 w-8 ${solution.color}`} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {solution.title}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {solution.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                    <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href={solution.href}
                className="inline-flex items-center text-primary-600 dark:text-primary-400 font-semibold hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 group"
              >
                Learn More
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
