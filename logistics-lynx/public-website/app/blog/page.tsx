import { Metadata } from 'next';
import { CTASection } from '../../components/CTASection';

export const metadata: Metadata = {
  title: 'Blog - Trans Bot AI Transportation Management Insights',
  description: 'Stay updated with the latest insights, trends, and best practices in transportation management, logistics automation, and AI-powered operations.',
  keywords: 'transportation management blog, logistics insights, AI transportation, TMS best practices, logistics automation',
  openGraph: {
    title: 'Blog - Trans Bot AI Transportation Management Insights',
    description: 'Stay updated with the latest insights, trends, and best practices in transportation management, logistics automation, and AI-powered operations.',
    type: 'website',
    url: 'https://transbot.ai/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog - Trans Bot AI Transportation Management Insights',
    description: 'Stay updated with the latest insights, trends, and best practices in transportation management, logistics automation, and AI-powered operations.',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "name": "Trans Bot AI Blog",
  "description": "Transportation management insights and best practices",
  "url": "https://transbot.ai/blog",
  "publisher": {
    "@type": "Organization",
    "name": "Trans Bot AI"
  }
};

const featuredPosts = [
  {
    id: 1,
    title: 'The Future of Autonomous Transportation Management',
    excerpt: 'Discover how AI is revolutionizing the transportation industry and what it means for your business operations.',
    author: 'Trans Bot AI Team',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'AI & Automation',
    image: '/blog/autonomous-transportation.jpg',
    featured: true
  },
  {
    id: 2,
    title: '10 Ways to Optimize Your Fleet Operations',
    excerpt: 'Learn proven strategies to reduce costs, improve efficiency, and enhance customer satisfaction in fleet management.',
    author: 'Sarah Johnson',
    date: '2024-01-12',
    readTime: '8 min read',
    category: 'Fleet Management',
    image: '/blog/fleet-optimization.jpg',
    featured: true
  },
  {
    id: 3,
    title: 'Real-Time Analytics: The Key to Smart Logistics',
    excerpt: 'How real-time data and analytics are transforming decision-making in modern logistics operations.',
    author: 'Mike Chen',
    date: '2024-01-10',
    readTime: '6 min read',
    category: 'Analytics',
    image: '/blog/real-time-analytics.jpg',
    featured: true
  }
];

const recentPosts = [
  {
    id: 4,
    title: 'Building a Resilient Supply Chain in 2024',
    excerpt: 'Strategies for creating a supply chain that can withstand disruptions and adapt to changing market conditions.',
    author: 'Lisa Rodriguez',
    date: '2024-01-08',
    readTime: '7 min read',
    category: 'Supply Chain'
  },
  {
    id: 5,
    title: 'The Impact of Electric Vehicles on Logistics',
    excerpt: 'How the rise of electric vehicles is changing transportation planning and route optimization.',
    author: 'David Kim',
    date: '2024-01-05',
    readTime: '4 min read',
    category: 'Sustainability'
  },
  {
    id: 6,
    title: 'Customer Success Story: 50% Cost Reduction',
    excerpt: 'How one logistics company achieved dramatic cost savings using Trans Bot AI\'s autonomous optimization.',
    author: 'Trans Bot AI Team',
    date: '2024-01-03',
    readTime: '6 min read',
    category: 'Case Studies'
  },
  {
    id: 7,
    title: 'API Integration Best Practices for TMS',
    excerpt: 'Essential guidelines for integrating your transportation management system with existing business applications.',
    author: 'Alex Thompson',
    date: '2023-12-28',
    readTime: '9 min read',
    category: 'Technology'
  },
  {
    id: 8,
    title: 'The Role of Machine Learning in Route Optimization',
    excerpt: 'Deep dive into how ML algorithms are making route planning more efficient and cost-effective.',
    author: 'Dr. Emily Watson',
    date: '2023-12-25',
    readTime: '10 min read',
    category: 'AI & Automation'
  },
  {
    id: 9,
    title: 'Compliance and Safety in Modern Transportation',
    excerpt: 'Navigating the complex landscape of transportation regulations and safety requirements.',
    author: 'Robert Martinez',
    date: '2023-12-22',
    readTime: '5 min read',
    category: 'Compliance'
  }
];

const categories = [
  { name: 'AI & Automation', count: 12, color: 'bg-blue-500' },
  { name: 'Fleet Management', count: 8, color: 'bg-green-500' },
  { name: 'Analytics', count: 6, color: 'bg-purple-500' },
  { name: 'Supply Chain', count: 5, color: 'bg-orange-500' },
  { name: 'Sustainability', count: 4, color: 'bg-teal-500' },
  { name: 'Case Studies', count: 7, color: 'bg-pink-500' },
  { name: 'Technology', count: 9, color: 'bg-indigo-500' },
  { name: 'Compliance', count: 3, color: 'bg-red-500' }
];

export default function BlogPage() {
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
              Trans Bot AI <span className="text-blue-600">Blog</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Stay updated with the latest insights, trends, and best practices in transportation 
              management, logistics automation, and AI-powered operations.
            </p>
            <div className="flex justify-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="w-96 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-2 text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Posts */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Featured Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
                    <span className="text-white text-lg font-semibold">{post.title.split(' ').slice(0, 3).join(' ')}</span>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Read More →
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Browse by Category</h2>
            <div className="grid md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category.name}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${category.color} mr-3`}></div>
                    <span className="font-medium text-gray-900">{category.name}</span>
                  </div>
                  <span className="text-sm text-gray-500">{category.count}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Posts */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">Latest Articles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recentPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <span>By {post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Read More →
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-600">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Get the latest transportation insights, industry trends, and Trans Bot AI updates 
              delivered to your inbox.
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
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </section>

        {/* Popular Tags */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Topics</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {['Route Optimization', 'AI Automation', 'Cost Reduction', 'Fleet Management', 'Real-time Tracking', 'Supply Chain', 'Sustainability', 'Compliance', 'API Integration', 'Machine Learning'].map((tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
}
