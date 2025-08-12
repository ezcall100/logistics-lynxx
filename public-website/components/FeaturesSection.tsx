import { 
  Brain, 
  Truck, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe, 
  Clock, 
  Users,
  TrendingUp,
  Smartphone,
  Database,
  Lock
} from 'lucide-react'

export function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Automation',
      description: 'Intelligent load matching, route optimization, and predictive analytics that learn from your operations.',
      category: 'Intelligence'
    },
    {
      icon: Truck,
      title: 'Real-Time Tracking',
      description: 'Live GPS tracking, status updates, and automated notifications for complete shipment visibility.',
      category: 'Visibility'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Comprehensive dashboards with real-time KPIs, performance metrics, and actionable insights.',
      category: 'Analytics'
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level security with end-to-end encryption, role-based access, and compliance certifications.',
      category: 'Security'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with sub-second response times and 99.9% uptime guarantee.',
      category: 'Performance'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Multi-language support, international compliance, and seamless cross-border operations.',
      category: 'Global'
    },
    {
      icon: Clock,
      title: '24/7 Operations',
      description: 'Round-the-clock monitoring, automated alerts, and continuous system availability.',
      category: 'Reliability'
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Real-time collaboration tools, shared workspaces, and integrated communication.',
      category: 'Collaboration'
    },
    {
      icon: TrendingUp,
      title: 'Scalable Growth',
      description: 'Grow from startup to enterprise with flexible pricing and unlimited scalability.',
      category: 'Scalability'
    },
    {
      icon: Smartphone,
      title: 'Mobile First',
      description: 'Native mobile apps for iOS and Android with offline capabilities and push notifications.',
      category: 'Mobile'
    },
    {
      icon: Database,
      title: 'Data Integration',
      description: 'Seamless integration with ERP, WMS, accounting systems, and third-party logistics platforms.',
      category: 'Integration'
    },
    {
      icon: Lock,
      title: 'Compliance Ready',
      description: 'Built-in compliance for ELD, HOS, IFTA, and other regulatory requirements.',
      category: 'Compliance'
    }
  ]

  const categories = ['All', 'Intelligence', 'Visibility', 'Analytics', 'Security', 'Performance', 'Global', 'Reliability', 'Collaboration', 'Scalability', 'Mobile', 'Integration', 'Compliance']

  return (
    <section id="features" className="bg-white dark:bg-gray-900">
      <div className="container-custom">
        <div className="section-padding">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Everything You Need to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                {' '}Transform Your Logistics
              </span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our comprehensive platform combines cutting-edge technology with industry expertise 
              to deliver unmatched efficiency and cost savings.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center group-hover:bg-primary-200 dark:group-hover:bg-primary-900/50 transition-colors">
                      <feature.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-2 py-1 rounded-full">
                        {feature.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors cursor-pointer">
              <span className="text-lg font-medium">Explore all features</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
