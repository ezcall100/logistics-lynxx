'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Play, Truck, Zap, Shield, Users } from 'lucide-react'

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  const stats = [
    { label: 'Active Users', value: '10,000+', icon: Users },
    { label: 'Loads Managed', value: '500K+', icon: Truck },
    { label: 'AI Predictions', value: '99.2%', icon: Zap },
    { label: 'Uptime', value: '99.9%', icon: Shield },
  ]

  return (
    <section className="relative bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container-custom relative z-10">
        <div className="section-padding">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Autonomous{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                TMS Platform
              </span>
              <br />
              for Modern Logistics
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Revolutionize your transportation operations with AI-powered automation, 
              real-time tracking, and intelligent decision-making. 
              <span className="font-semibold text-primary-600 dark:text-primary-400">
                {' '}Reduce costs by 30% while improving efficiency.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                href="/signup"
                className="btn-primary text-lg px-8 py-4 flex items-center space-x-2 group"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button
                onClick={() => setIsVideoPlaying(true)}
                className="btn-secondary text-lg px-8 py-4 flex items-center space-x-2 group"
              >
                <Play className="h-5 w-5" />
                <span>Watch Demo</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-primary-600" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Trusted by leading logistics companies worldwide
              </p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                {/* Placeholder for company logos */}
                <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-8 w-24 bg-gray-300 dark:bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl"
            >
              ×
            </button>
            <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
              <p className="text-white text-lg">Video Demo Coming Soon</p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
