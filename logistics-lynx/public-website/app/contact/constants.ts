import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Contact Us - Trans Bot AI Transportation Management',
  description: 'Get in touch with the Trans Bot AI team. We\'re here to help you optimize your transportation operations with AI-powered solutions.',
  keywords: 'contact Trans Bot AI, transportation management support, logistics software contact, TMS support',
  openGraph: {
    title: 'Contact Us - Trans Bot AI Transportation Management',
    description: 'Get in touch with the Trans Bot AI team. We\'re here to help you optimize your transportation operations with AI-powered solutions.',
    type: 'website',
    url: 'https://transbot.ai/contact',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - Trans Bot AI Transportation Management',
    description: 'Get in touch with the Trans Bot AI team. We\'re here to help you optimize your transportation operations with AI-powered solutions.',
  },
};

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Trans Bot AI Contact",
  "description": "Contact Trans Bot AI for transportation management solutions",
  "mainEntity": {
    "@type": "Organization",
    "name": "Trans Bot AI",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
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

export const contactMethods = [
  {
    name: 'Sales Inquiries',
    description: 'Learn about our solutions and pricing',
    email: 'sales@transbot.ai',
    phone: '+1-555-123-4567',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    )
  },
  {
    name: 'Technical Support',
    description: 'Get help with your implementation',
    email: 'support@transbot.ai',
    phone: '+1-555-123-4568',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  },
  {
    name: 'Partnership',
    description: 'Explore integration opportunities',
    email: 'partnerships@transbot.ai',
    phone: '+1-555-123-4569',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    )
  }
];
