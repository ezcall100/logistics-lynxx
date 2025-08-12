import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Users, Zap } from 'lucide-react'

export function CTASection() {
  const benefits = [
    {
      icon: Clock,
      title: 'Get Started in Minutes',
      description: 'No complex setup required. Start using the platform immediately.'
    },
    {
      icon: Users,
      title: 'Free 30-Day Trial',
      description: 'Full access to all features with no credit card required.'
    },
    {
      icon: Zap,
      title: 'Instant ROI',
      description: 'See cost savings and efficiency gains within the first week.'
    }
  ]

  return (
    <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      
      <div className="container-custom relative z-10">
        <div className="section-padding">
          <div className="max-w-4xl mx-auto text-center">
            {/* Main CTA */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Transform Your
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-100">
                {' '}Logistics Operations?
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-primary-100 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join thousands of logistics professionals who have already revolutionized 
              their operations. Start your free trial today and see the difference.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                href="/signup"
                className="bg-white text-primary-600 hover:bg-gray-100 text-lg font-semibold px-8 py-4 rounded-lg transition-colors duration-200 flex items-center space-x-2 group"
              >
                <span>Start Free Trial</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                href="/demo"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-600 text-lg font-semibold px-8 py-4 rounded-lg transition-colors duration-200"
              >
                Schedule Demo
              </Link>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {benefits.map((benefit, index) => (
                <div key={benefit.title} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-primary-100">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="border-t border-white/20 pt-8">
              <p className="text-primary-100 mb-4">
                Trusted by leading companies worldwide
              </p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                {/* Placeholder for company logos */}
                <div className="h-8 w-24 bg-white/20 rounded"></div>
                <div className="h-8 w-24 bg-white/20 rounded"></div>
                <div className="h-8 w-24 bg-white/20 rounded"></div>
                <div className="h-8 w-24 bg-white/20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
