import { Metadata } from 'next';

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

export const jsonLd = {
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

export const featuredPosts = [
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

export const recentPosts = [
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
    date: '2024-01-01',
    readTime: '9 min read',
    category: 'Integration'
  }
];
