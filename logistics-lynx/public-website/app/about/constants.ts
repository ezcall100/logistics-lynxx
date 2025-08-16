import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Trans Bot AI - Revolutionizing Transportation Management',
  description: 'Learn about Trans Bot AI, the autonomous transportation management system that\'s revolutionizing logistics with AI-powered operations, real-time analytics, and intelligent automation.',
  keywords: 'Trans Bot AI, transportation management, logistics automation, AI-powered TMS, autonomous operations',
  openGraph: {
    title: 'About Trans Bot AI - Revolutionizing Transportation Management',
    description: 'Learn about Trans Bot AI, the autonomous transportation management system that\'s revolutionizing logistics with AI-powered operations, real-time analytics, and intelligent automation.',
    type: 'website',
    url: 'https://transbot.ai/about',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Trans Bot AI - Revolutionizing Transportation Management',
    description: 'Learn about Trans Bot AI, the autonomous transportation management system that\'s revolutionizing logistics with AI-powered operations, real-time analytics, and intelligent automation.',
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Trans Bot AI",
  "description": "Autonomous transportation management system revolutionizing logistics with AI-powered operations",
  "url": "https://transbot.ai",
  "logo": "https://transbot.ai/logo.png",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/transbotai",
    "https://linkedin.com/company/transbotai"
  ]
};
