import { Metadata } from 'next';
import { CTASection } from '../../components/CTASection';

export const metadata: Metadata = {
  title: 'Support - Trans Bot AI Customer Support & Help Center',
  description: 'Get help with Trans Bot AI. Access documentation, tutorials, FAQs, and contact our support team for assistance.',
  keywords: 'Trans Bot AI support, customer help, documentation, tutorials, contact support',
  openGraph: {
    title: 'Support - Trans Bot AI Customer Support & Help Center',
    description: 'Get help with Trans Bot AI. Access documentation, tutorials, FAQs, and contact our support team for assistance.',
    type: 'website',
    url: 'https://transbot.ai/support',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support - Trans Bot AI Customer Support & Help Center',
    description: 'Get help with Trans Bot AI. Access documentation, tutorials, FAQs, and contact our support team for assistance.',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SupportPage",
  "name": "Trans Bot AI Support",
  "description": "Customer support and help center for Trans Bot AI",
  "mainEntity": {
    "@type": "Organization",
    "name": "Trans Bot AI",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4568",
        "contactType": "customer service",
        "availableLanguage": "English"
      },
      {
        "@type": "ContactPoint",
        "email": "support@transbot.ai",
        "contactType": "customer service"
      }
    ]
  }
};

const helpCategories = [
  {
    title: 'Getting Started',
    description: 'Learn the basics and set up your account',
    icon: '🚀',
    articles: [
      'Quick Start Guide',
      'Account Setup',
      'First Shipment',
      'User Permissions'
    ]
  },
  {
    title: 'Features & Functionality',
    description: 'Master all platform features',
    icon: '⚙️',
    articles: [
      'Route Optimization',
      'Load Matching',
      'Real-time Tracking',
      'Analytics Dashboard'
    ]
  },
  {
    title: 'Integrations',
    description: 'Connect with your existing systems',
    icon: '🔗',
    articles: [
      'API Documentation',
      'ERP Integration',
      'WMS Connection',
      'Third-party Apps'
    ]
  },
  {
    title: 'Billing & Account',
    description: 'Manage your subscription and billing',
    icon: '💳',
    articles: [
      'Billing Overview',
      'Plan Changes',
      'Payment Methods',
      'Invoice History'
    ]
  }
];

const faqs = [
  {
    question: 'How do I get started with Trans Bot AI?',
    answer: 'Getting started is easy! Simply sign up for an account, complete your profile setup, and follow our quick start guide to create your first shipment. Our onboarding team is available to help you every step of the way.'
  },
  {
    question: 'What types of transportation can Trans Bot AI handle?',
    answer: 'Trans Bot AI supports all types of freight transportation including full truckload (FTL), less than truckload (LTL), intermodal, and specialized freight. Our platform adapts to your specific transportation needs.'
  },
  {
    question: 'How does the AI route optimization work?',
    answer: 'Our AI analyzes multiple factors including traffic patterns, weather conditions, fuel costs, and delivery windows to create the most efficient routes. The system learns from your operations to continuously improve optimization.'
  },
  {
    question: 'Can I integrate Trans Bot AI with my existing systems?',
    answer: 'Yes! Trans Bot AI offers comprehensive API integration and pre-built connectors for popular ERP, WMS, and accounting systems. Our integration team can help you set up seamless data flow between systems.'
  },
  {
    question: 'What kind of support do you provide?',
    answer: 'We offer 24/7 technical support, dedicated account managers for enterprise customers, comprehensive documentation, video tutorials, and regular training sessions. Support is available via phone, email, and live chat.'
  },
  {
    question: 'How secure is my data on Trans Bot AI?',
    answer: 'Security is our top priority. We use enterprise-grade encryption, SOC 2 compliance, regular security audits, and strict access controls. Your data is protected with the same security standards used by major financial institutions.'
  }
];

const supportChannels = [
  {
    name: 'Live Chat',
    description: 'Get instant help from our support team',
    responseTime: 'Immediate',
    icon: '💬',
    available: '24/7'
  },
  {
    name: 'Phone Support',
    description: 'Speak directly with our experts',
    responseTime: 'Immediate',
    icon: '📞',
    available: '24/7'
  },
  {
    name: 'Email Support',
    description: 'Send us detailed questions or issues',
    responseTime: '< 4 hours',
    icon: '✉️',
    available: '24/7'
  },
  {
    name: 'Video Call',
    description: 'Screen share for complex issues',
    responseTime: '< 2 hours',
    icon: '📹',
    available: 'Business Hours'
  }
];

export default function SupportPage() {
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
              How Can We <span className="text-blue-600">Help?</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Get the support you need to make the most of Trans Bot AI. Find answers, 
              tutorials, and connect with our expert team.
            </p>
            <div className="flex justify-center">
              <div className="relative max-w-2xl w-full">
                <input
                  type="text"
                  placeholder="Search for help articles, tutorials, or FAQs..."
                  className="w-full px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
                <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Help Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Help Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {helpCategories.map((category) => (
                <div key={category.title} className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <ul className="space-y-2">
                    {category.articles.map((article) => (
                      <li key={article}>
                        <a href="#" className="text-blue-600 hover:text-blue-700 text-sm">
                          {article} →
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Support Channels */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Get Support</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {supportChannels.map((channel) => (
                <div key={channel.name} className="text-center">
                  <div className="text-4xl mb-4">{channel.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{channel.name}</h3>
                  <p className="text-gray-600 mb-3">{channel.description}</p>
                  <div className="space-y-1 text-sm">
                    <div className="text-gray-500">Response: {channel.responseTime}</div>
                    <div className="text-gray-500">Available: {channel.available}</div>
                  </div>
                  <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Contact {channel.name}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documentation & Resources */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Documentation & Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-3xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">User Guides</h3>
                <p className="text-gray-600 mb-4">
                  Comprehensive guides for every feature and workflow in Trans Bot AI.
                </p>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-blue-600 hover:text-blue-700">Platform Overview</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-700">User Manual</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-700">Best Practices</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-700">Troubleshooting</a></li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-3xl mb-4">🎥</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Video Tutorials</h3>
                <p className="text-gray-600 mb-4">
                  Step-by-step video tutorials to help you master Trans Bot AI quickly.
                </p>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-blue-600 hover:text-blue-700">Getting Started</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-700">Advanced Features</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-700">Integration Setup</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-700">Tips & Tricks</a></li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-3xl mb-4">🔧</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">API Documentation</h3>
                <p className="text-gray-600 mb-4">
                  Technical documentation for developers and system integrators.
                </p>
                <ul className="space-y-2 text-sm">
                  <li><a href="#" className="text-blue-600 hover:text-blue-700">API Reference</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-700">SDK Downloads</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-700">Code Examples</a></li>
                  <li><a href="#" className="text-blue-600 hover:text-blue-700">Webhooks</a></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Community & Training */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Community & Training</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="text-3xl mb-4">👥</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">User Community</h3>
                <p className="text-gray-600 mb-6">
                  Connect with other Trans Bot AI users, share best practices, and get answers from the community.
                </p>
                <div className="space-y-3">
                  <a href="#" className="block text-blue-600 hover:text-blue-700 font-medium">
                    Join Community Forum →
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-700 font-medium">
                    User Groups →
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-700 font-medium">
                    Success Stories →
                  </a>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-8 shadow-sm">
                <div className="text-3xl mb-4">🎓</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Training Programs</h3>
                <p className="text-gray-600 mb-6">
                  Comprehensive training programs to help your team maximize the value of Trans Bot AI.
                </p>
                <div className="space-y-3">
                  <a href="#" className="block text-blue-600 hover:text-blue-700 font-medium">
                    Online Training Courses →
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-700 font-medium">
                    Certification Program →
                  </a>
                  <a href="#" className="block text-blue-600 hover:text-blue-700 font-medium">
                    Custom Training →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Still Need Help?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Our support team is here to help you succeed with Trans Bot AI.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-2xl mb-4">📞</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Speak with our support team</p>
                <div className="text-xl font-bold text-blue-600">+1-555-123-4568</div>
                <div className="text-sm text-gray-500">Available 24/7</div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-2xl mb-4">✉️</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us a detailed message</p>
                <div className="text-xl font-bold text-blue-600">support@transbot.ai</div>
                <div className="text-sm text-gray-500">Response within 4 hours</div>
              </div>
            </div>
            
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
              Start Live Chat
            </button>
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
}
