'use client'

import React from 'react'
import { Truck, Building2, User, Users, CreditCard, Package } from 'lucide-react'

export function SolutionsSection() {
  const solutions = [
    {
      icon: Building2,
      title: 'For Shippers',
      description: 'Optimize your supply chain with real-time visibility and automated load matching.',
      features: ['Real-time tracking', 'Automated load matching', 'Cost optimization', 'Compliance management'],
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Truck,
      title: 'For Carriers',
      description: 'Maximize your fleet efficiency with intelligent routing and load optimization.',
      features: ['Route optimization', 'Load matching', 'Fuel cost reduction', 'Driver management'],
      color: 'from-green-500 to-green-600'
    },
    {
      icon: Users,
      title: 'For Brokers',
      description: 'Streamline your brokerage operations with automated matching and customer management.',
      features: ['Automated matching', 'Customer portal', 'Commission tracking', 'Market insights'],
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: User,
      title: 'For Drivers',
      description: 'Simplify your daily operations with an intuitive mobile app and real-time updates.',
      features: ['Mobile app', 'Real-time updates', 'Document management', 'Payment tracking'],
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: CreditCard,
      title: 'For Factoring',
      description: 'Accelerate cash flow with integrated factoring and payment processing solutions.',
      features: ['Quick payments', 'Invoice management', 'Risk assessment', 'Payment tracking'],
      color: 'from-red-500 to-red-600'
    },
    {
      icon: Package,
      title: 'For Owner-Operators',
      description: 'Grow your business with comprehensive tools for independent trucking operations.',
      features: ['Business analytics', 'Expense tracking', 'Load optimization', 'Customer management'],
      color: 'from-indigo-500 to-indigo-600'
    }
  ]

  return (
    <section id="solutions" className="bg-gray-50 dark:bg-gray-800 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Solutions for Every
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              {' '}Logistics Role
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Tailored solutions designed specifically for your role in the logistics ecosystem.
          </p>
        </div>

        {/* Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${solution.color} flex items-center justify-center mb-6`}>
                <solution.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {solution.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {solution.description}
              </p>
              <ul className="space-y-3">
                {solution.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-400">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-6 w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                Learn More
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
