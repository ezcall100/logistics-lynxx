'use client'

import React from 'react'
import { Truck, Zap, Shield, Users, BarChart3, Globe, Clock, Target } from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Truck,
      title: 'Load Management',
      description: 'Streamline load booking, tracking, and delivery with our intelligent dispatch system.',
      color: 'text-blue-600'
    },
    {
      icon: Zap,
      title: 'AI-Powered Automation',
      description: 'Automate routine tasks and optimize routes using advanced machine learning algorithms.',
      color: 'text-green-600'
    },
    {
      icon: Shield,
      title: 'Real-time Security',
      description: 'Enterprise-grade security with end-to-end encryption and compliance monitoring.',
      color: 'text-purple-600'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Seamless communication between drivers, dispatchers, and customers in real-time.',
      color: 'text-orange-600'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive reporting and insights to optimize your operations and reduce costs.',
      color: 'text-red-600'
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      description: 'Manage shipments across borders with integrated customs and compliance tools.',
      color: 'text-indigo-600'
    },
    {
      icon: Clock,
      title: '24/7 Monitoring',
      description: 'Round-the-clock tracking and monitoring with instant alerts and notifications.',
      color: 'text-teal-600'
    },
    {
      icon: Target,
      title: 'Performance Optimization',
      description: 'Data-driven insights to improve efficiency, reduce costs, and increase profitability.',
      color: 'text-pink-600'
    }
  ]

  return (
    <section id="features" className="bg-white dark:bg-gray-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Powerful Features for
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
              {' '}Modern Logistics
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Everything you need to streamline your transportation operations and stay ahead of the competition.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Operations?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Join thousands of logistics professionals who have already revolutionized their business with Logistics Lynx.
            </p>
            <button className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-200">
              Get Started Today
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
