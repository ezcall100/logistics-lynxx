import { Metadata } from 'next';
import { CTASection } from '../../components/CTASection';

export const metadata: Metadata = {
  title: 'Resources - Trans Bot AI Transportation Management Resources & Downloads',
  description: 'Access comprehensive resources, guides, whitepapers, and educational materials to help you maximize the value of Trans Bot AI.',
  keywords: 'Trans Bot AI resources, transportation guides, logistics whitepapers, TMS documentation, industry reports',
  openGraph: {
    title: 'Resources - Trans Bot AI Transportation Management Resources & Downloads',
    description: 'Access comprehensive resources, guides, whitepapers, and educational materials to help you maximize the value of Trans Bot AI.',
    type: 'website',
    url: 'https://transbot.ai/resources',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Resources - Trans Bot AI Transportation Management Resources & Downloads',
    description: 'Access comprehensive resources, guides, whitepapers, and educational materials to help you maximize the value of Trans Bot AI.',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Resources",
  "description": "Trans Bot AI Resources and Downloads",
  "publisher": {
    "@type": "Organization",
    "name": "Trans Bot AI"
  }
};

const resourceCategories = [
  {
    title: 'Getting Started',
    description: 'Essential guides for new users',
    icon: '🚀',
    resources: [
      {
        title: 'Quick Start Guide',
        description: 'Get up and running with Trans Bot AI in 30 minutes',
        type: 'PDF',
        size: '2.3 MB',
        downloadUrl: '#',
        featured: true
      },
      {
        title: 'Platform Overview',
        description: 'Complete overview of all features and capabilities',
        type: 'PDF',
        size: '4.1 MB',
        downloadUrl: '#'
      },
      {
        title: 'Account Setup Checklist',
        description: 'Step-by-step checklist for optimal account configuration',
        type: 'PDF',
        size: '1.2 MB',
        downloadUrl: '#'
      },
      {
        title: 'First Shipment Tutorial',
        description: 'Video tutorial for creating your first shipment',
        type: 'Video',
        duration: '15 min',
        downloadUrl: '#'
      }
    ]
  },
  {
    title: 'Best Practices',
    description: 'Industry insights and optimization strategies',
    icon: '📈',
    resources: [
      {
        title: 'Route Optimization Guide',
        description: 'Advanced strategies for maximizing route efficiency',
        type: 'PDF',
        size: '3.8 MB',
        downloadUrl: '#',
        featured: true
      },
      {
        title: 'Cost Reduction Strategies',
        description: 'Proven methods to reduce transportation costs by 20-40%',
        type: 'PDF',
        size: '2.9 MB',
        downloadUrl: '#'
      },
      {
        title: 'Fleet Management Best Practices',
        description: 'Comprehensive guide to modern fleet management',
        type: 'PDF',
        size: '5.2 MB',
        downloadUrl: '#'
      },
      {
        title: 'Customer Success Stories',
        description: 'Real-world examples of successful implementations',
        type: 'PDF',
        size: '6.7 MB',
        downloadUrl: '#'
      }
    ]
  },
  {
    title: 'Technical Documentation',
    description: 'Developer resources and API documentation',
    icon: '🔧',
    resources: [
      {
        title: 'API Reference Guide',
        description: 'Complete API documentation with examples',
        type: 'PDF',
        size: '8.5 MB',
        downloadUrl: '#',
        featured: true
      },
      {
        title: 'Integration Guide',
        description: 'Step-by-step integration instructions',
        type: 'PDF',
        size: '3.4 MB',
        downloadUrl: '#'
      },
      {
        title: 'SDK Downloads',
        description: 'Software development kits for multiple languages',
        type: 'ZIP',
        size: '15.2 MB',
        downloadUrl: '#'
      },
      {
        title: 'Webhook Configuration',
        description: 'Real-time data integration setup guide',
        type: 'PDF',
        size: '2.1 MB',
        downloadUrl: '#'
      }
    ]
  },
  {
    title: 'Industry Reports',
    description: 'Market analysis and industry trends',
    icon: '📊',
    resources: [
      {
        title: '2024 Transportation Trends',
        description: 'Comprehensive analysis of industry trends and predictions',
        type: 'PDF',
        size: '12.3 MB',
        downloadUrl: '#',
        featured: true
      },
      {
        title: 'AI in Logistics Report',
        description: 'How AI is transforming the transportation industry',
        type: 'PDF',
        size: '9.8 MB',
        downloadUrl: '#'
      },
      {
        title: 'Sustainability in Transportation',
        description: 'Green logistics strategies and carbon reduction',
        type: 'PDF',
        size: '7.6 MB',
        downloadUrl: '#'
      },
      {
        title: 'Digital Transformation Guide',
        description: 'Modernizing transportation operations with technology',
        type: 'PDF',
        size: '11.2 MB',
        downloadUrl: '#'
      }
    ]
  }
];

const featuredResources = [
  {
    title: 'Complete Implementation Guide',
    description: 'Everything you need to successfully implement Trans Bot AI in your organization',
    category: 'Implementation',
    type: 'PDF',
    size: '18.5 MB',
    downloads: '2,847',
    rating: 4.9,
    featured: true
  },
  {
    title: 'ROI Calculator Tool',
    description: 'Interactive tool to calculate your potential savings with Trans Bot AI',
    category: 'Tools',
    type: 'Excel',
    size: '3.2 MB',
    downloads: '1,234',
    rating: 4.8,
    featured: true
  },
  {
    title: 'Security Whitepaper',
    description: 'Comprehensive overview of our security measures and compliance',
    category: 'Security',
    type: 'PDF',
    size: '4.7 MB',
    downloads: '956',
    rating: 4.7,
    featured: true
  }
];

const webinars = [
  {
    title: 'Getting Started with Trans Bot AI',
    date: 'January 25, 2024',
    duration: '45 minutes',
    speaker: 'Sarah Johnson, Product Manager',
    description: 'Learn the basics of Trans Bot AI and how to get started quickly.',
    registrationUrl: '#'
  },
  {
    title: 'Advanced Route Optimization',
    date: 'February 8, 2024',
    duration: '60 minutes',
    speaker: 'Dr. Michael Chen, AI Specialist',
    description: 'Deep dive into our AI-powered route optimization algorithms.',
    registrationUrl: '#'
  },
  {
    title: 'Integration Best Practices',
    date: 'February 22, 2024',
    duration: '50 minutes',
    speaker: 'Alex Thompson, Solutions Architect',
    description: 'Learn how to integrate Trans Bot AI with your existing systems.',
    registrationUrl: '#'
  }
];

export default function ResourcesPage() {
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
              Resources & <span className="text-blue-600">Downloads</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Access comprehensive guides, whitepapers, tools, and educational materials 
              to help you maximize the value of Trans Bot AI.
            </p>
            <div className="flex justify-center">
              <div className="relative max-w-2xl w-full">
                <input
                  type="text"
                  placeholder="Search resources, guides, or downloads..."
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

        {/* Featured Resources */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Featured Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredResources.map((resource) => (
                <div key={resource.title} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {resource.category}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>⭐ {resource.rating}</span>
                        <span className="mx-2">•</span>
                        <span>{resource.downloads} downloads</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <span>{resource.type}</span>
                        <span className="mx-2">•</span>
                        <span>{resource.size}</span>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Browse by Category</h2>
            <div className="space-y-12">
              {resourceCategories.map((category) => (
                <div key={category.title}>
                  <div className="flex items-center mb-6">
                    <div className="text-3xl mr-4">{category.icon}</div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{category.title}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    {category.resources.map((resource) => (
                      <div key={resource.title} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <h4 className="text-lg font-semibold text-gray-900">{resource.title}</h4>
                          {resource.featured && (
                            <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-4">{resource.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-gray-500">
                            <span>{resource.type}</span>
                            <span className="mx-2">•</span>
                            <span>{resource.size || resource.duration}</span>
                          </div>
                          <button className="text-blue-600 hover:text-blue-700 font-medium">
                            Download →
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Webinars Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Upcoming Webinars</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {webinars.map((webinar) => (
                <div key={webinar.title} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="text-3xl mb-4">🎥</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{webinar.title}</h3>
                  <div className="text-sm text-gray-500 mb-3">
                    <div>{webinar.date}</div>
                    <div>{webinar.duration} • {webinar.speaker}</div>
                  </div>
                  <p className="text-gray-600 mb-4">{webinar.description}</p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Register Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Library */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Video Library</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Platform Overview', duration: '8:32', views: '1.2K' },
                { title: 'Route Optimization Demo', duration: '12:45', views: '856' },
                { title: 'Mobile App Tutorial', duration: '6:18', views: '743' },
                { title: 'Analytics Dashboard', duration: '10:22', views: '621' },
                { title: 'API Integration Guide', duration: '15:07', views: '534' },
                { title: 'Customer Success Story', duration: '9:41', views: '892' }
              ].map((video) => (
                <div key={video.title} className="bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors">
                  <div className="h-32 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{video.title}</h3>
                    <div className="text-sm text-gray-500">
                      <span>{video.duration}</span>
                      <span className="mx-2">•</span>
                      <span>{video.views} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View All Videos
              </button>
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with New Resources
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get notified when we release new guides, whitepapers, and educational content.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-r-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-blue-200 mt-4">
              We'll send you updates about new resources and industry insights.
            </p>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Need Custom Resources?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Looking for specific documentation or resources for your use case? 
              Our team can help create custom materials for your organization.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-2xl mb-4">📧</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Request custom resources or documentation</p>
                <a href="mailto:resources@transbot.ai" className="text-blue-600 hover:text-blue-700 font-medium">
                  resources@transbot.ai
                </a>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-2xl mb-4">💬</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                <p className="text-gray-600 mb-4">Get instant help with resources</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Start Chat →
                </button>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
}
