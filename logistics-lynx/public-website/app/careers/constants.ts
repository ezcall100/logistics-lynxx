import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Careers - Join Trans Bot AI Transportation Management Team',
  description: 'Join our team of innovators revolutionizing transportation management. Explore career opportunities in AI, engineering, logistics, and more.',
  keywords: 'Trans Bot AI careers, transportation jobs, AI engineering jobs, logistics careers, tech jobs',
  openGraph: {
    title: 'Careers - Join Trans Bot AI Transportation Management Team',
    description: 'Join our team of innovators revolutionizing transportation management. Explore career opportunities in AI, engineering, logistics, and more.',
    type: 'website',
    url: 'https://transbot.ai/careers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers - Join Trans Bot AI Transportation Management Team',
    description: 'Join our team of innovators revolutionizing transportation management. Explore career opportunities in AI, engineering, logistics, and more.',
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Trans Bot AI",
  "url": "https://transbot.ai",
  "sameAs": [
    "https://linkedin.com/company/transbotai",
    "https://twitter.com/transbotai"
  ]
};

export const jobOpenings = [
  {
    id: 1,
    title: 'Senior AI Engineer',
    department: 'Engineering',
    location: 'Remote / San Francisco',
    type: 'Full-time',
    experience: '5+ years',
    description: 'Lead the development of autonomous transportation algorithms and machine learning models.',
    requirements: [
      'Advanced degree in Computer Science, AI, or related field',
      'Experience with Python, TensorFlow, PyTorch',
      'Background in optimization algorithms',
      'Experience with transportation/logistics domain'
    ],
    benefits: [
      'Competitive salary and equity',
      'Flexible remote work',
      'Health, dental, and vision insurance',
      'Professional development budget'
    ]
  },
  {
    id: 2,
    title: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Remote / Austin',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Build scalable web applications and APIs for our transportation management platform.',
    requirements: [
      'Experience with React, Node.js, TypeScript',
      'Knowledge of cloud platforms (AWS, GCP)',
      'Database design and optimization',
      'API development and integration'
    ],
    benefits: [
      'Competitive salary and equity',
      'Flexible remote work',
      'Health, dental, and vision insurance',
      'Professional development budget'
    ]
  },
  {
    id: 3,
    title: 'Product Manager',
    department: 'Product',
    location: 'San Francisco',
    type: 'Full-time',
    experience: '4+ years',
    description: 'Drive product strategy and execution for our transportation management solutions.',
    requirements: [
      'Experience in B2B SaaS product management',
      'Background in logistics or transportation',
      'Data-driven decision making',
      'Strong stakeholder management'
    ],
    benefits: [
      'Competitive salary and equity',
      'Flexible work arrangements',
      'Health, dental, and vision insurance',
      'Professional development budget'
    ]
  },
  {
    id: 4,
    title: 'Sales Engineer',
    department: 'Sales',
    location: 'Remote / Chicago',
    type: 'Full-time',
    experience: '3+ years',
    description: 'Technical sales role helping customers understand and implement our solutions.',
    requirements: [
      'Technical background in software or logistics',
      'Experience in technical sales or consulting',
      'Strong presentation and communication skills',
      'Understanding of transportation industry'
    ],
    benefits: [
      'Competitive salary and commission',
      'Flexible remote work',
      'Health, dental, and vision insurance',
      'Travel opportunities'
    ]
  },
  {
    id: 5,
    title: 'Customer Success Manager',
    department: 'Customer Success',
    location: 'Remote / New York',
    type: 'Full-time',
    experience: '2+ years',
    description: 'Ensure customer satisfaction and success with our transportation management platform.',
    requirements: [
      'Experience in customer success or account management',
      'Background in logistics or transportation',
      'Strong problem-solving skills',
      'Excellent communication abilities'
    ],
    benefits: [
      'Competitive salary and bonuses',
      'Flexible remote work',
      'Health, dental, and vision insurance',
      'Professional development budget'
    ]
  }
];

export const values = [
  {
    title: 'Innovation',
    description: 'We push the boundaries of what\'s possible in transportation technology.',
    icon: '🚀'
  },
  {
    title: 'Collaboration',
    description: 'We believe the best solutions come from diverse teams working together.',
    icon: '🤝'
  },
  {
    title: 'Impact',
    description: 'We\'re solving real-world problems that affect millions of people.',
    icon: '💡'
  },
  {
    title: 'Growth',
    description: 'We invest in our people and provide opportunities for continuous learning.',
    icon: '📈'
  }
];

export const benefits = [
  {
    category: 'Health & Wellness',
    items: [
      'Comprehensive health, dental, and vision insurance',
      'Mental health support and counseling',
      'Fitness and wellness programs',
      'Flexible work arrangements'
    ]
  },
  {
    category: 'Professional Development',
    items: [
      'Annual learning and development budget',
      'Conference and training opportunities',
      'Mentorship programs',
      'Career growth paths'
    ]
  },
  {
    category: 'Work-Life Balance',
    items: [
      'Unlimited PTO and flexible holidays',
      'Remote work options',
      'Family-friendly policies',
      'Regular team events and activities'
    ]
  },
  {
    category: 'Financial',
    items: [
      'Competitive salary and equity packages',
      '401(k) with company matching',
      'Performance bonuses',
      'Stock options for all employees'
    ]
  }
];
