'use client'

import React, { useState } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Operations Director',
      company: 'Global Logistics Corp',
      content: 'Logistics Lynx has transformed our operations completely. The AI-powered automation has reduced our costs by 35% while improving delivery times. Our team can now focus on strategic decisions instead of manual processes.',
      rating: 5,
      avatar: '/avatars/sarah.jpg'
    },
    {
      name: 'Michael Chen',
      role: 'Fleet Manager',
      company: 'Express Trucking',
      content: 'The real-time tracking and route optimization features are game-changers. Our drivers love the mobile app, and we have seen a 40% reduction in fuel costs. The ROI was immediate.',
      rating: 5,
      avatar: '/avatars/michael.jpg'
    },
    {
      name: 'Emily Rodriguez',
      role: 'CEO',
      company: 'Freight Forward Solutions',
      content: 'As a growing brokerage, we needed a platform that could scale with us. Logistics Lynx has been perfect - the automated load matching and customer management tools have helped us double our business in 6 months.',
      rating: 5,
      avatar: '/avatars/emily.jpg'
    },
    {
      name: 'David Thompson',
      role: 'Owner-Operator',
      company: 'Thompson Transport',
      content: 'I was skeptical about switching from my old system, but Logistics Lynx made it so easy. The expense tracking and business analytics have given me insights I never had before. Highly recommended!',
      rating: 5,
      avatar: '/avatars/david.jpg'
    },
    {
      name: 'Lisa Wang',
      role: 'Supply Chain Manager',
      company: 'Tech Manufacturing Inc',
      content: 'The integration with our ERP system was seamless, and the automated documentation has saved us countless hours. The platform reliability and 24/7 support are exceptional.',
      rating: 5,
      avatar: '/avatars/lisa.jpg'
    }
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 sm:py-24">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Trusted by Industry
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800">
                {' '}Leaders
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See how logistics professionals across the industry are transforming 
              their operations with Logistics Lynx.
            </p>
          </div>

          {/* Testimonials */}
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Main Testimonial */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 md:p-12 border border-gray-200 dark:border-gray-700">
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-lg">
                      {currentTestimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(currentTestimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {currentTestimonial.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {currentTestimonial.role} at {currentTestimonial.company}
                    </p>
                  </div>
                  <Quote className="h-8 w-8 text-blue-600 opacity-30" />
                </div>
                
                <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{currentTestimonial.content}"
                </blockquote>
              </div>

              {/* Navigation */}
              <div className="flex justify-center items-center space-x-4 mt-8">
                <button
                  onClick={prevTestimonial}
                  className="p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
                
                <div className="flex space-x-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentIndex
                          ? 'bg-blue-600'
                          : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextTestimonial}
                  className="p-3 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <ChevronRight className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-gray-600 dark:text-gray-400">Customer Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600 dark:text-gray-400">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">500K+</div>
              <div className="text-gray-600 dark:text-gray-400">Loads Managed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">30%</div>
              <div className="text-gray-600 dark:text-gray-400">Average Cost Reduction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
