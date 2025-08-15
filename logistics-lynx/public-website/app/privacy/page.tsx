import { Metadata } from 'next';
import { CTASection } from '../../components/CTASection';

export const metadata: Metadata = {
  title: 'Privacy Policy - Trans Bot AI Data Protection & Privacy',
  description: 'Learn how Trans Bot AI protects your data and respects your privacy. Read our comprehensive privacy policy covering data collection, usage, and your rights.',
  keywords: 'Trans Bot AI privacy policy, data protection, GDPR compliance, data security, privacy rights',
  openGraph: {
    title: 'Privacy Policy - Trans Bot AI Data Protection & Privacy',
    description: 'Learn how Trans Bot AI protects your data and respects your privacy. Read our comprehensive privacy policy covering data collection, usage, and your rights.',
    type: 'website',
    url: 'https://transbot.ai/privacy',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - Trans Bot AI Data Protection & Privacy',
    description: 'Learn how Trans Bot AI protects your data and respects your privacy. Read our comprehensive privacy policy covering data collection, usage, and your rights.',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Privacy Policy",
  "description": "Trans Bot AI Privacy Policy",
  "publisher": {
    "@type": "Organization",
    "name": "Trans Bot AI"
  },
  "dateModified": "2024-01-15"
};

const sections = [
  {
    title: 'Information We Collect',
    content: [
      {
        subtitle: 'Personal Information',
        text: 'We collect information you provide directly to us, such as when you create an account, contact us, or use our services. This may include:',
        items: [
          'Name, email address, and contact information',
          'Company information and business details',
          'Payment and billing information',
          'Transportation and logistics data',
          'Communication preferences'
        ]
      },
      {
        subtitle: 'Usage Information',
        text: 'We automatically collect certain information about your use of our services, including:',
        items: [
          'Log data and device information',
          'Usage patterns and preferences',
          'Performance and error data',
          'Location data (with your consent)',
          'Cookies and similar technologies'
        ]
      }
    ]
  },
  {
    title: 'How We Use Your Information',
    content: [
      {
        subtitle: 'Service Provision',
        text: 'We use your information to provide, maintain, and improve our services:',
        items: [
          'Process transactions and manage accounts',
          'Provide customer support and respond to inquiries',
          'Optimize routes and transportation solutions',
          'Analyze usage patterns to improve our platform',
          'Send important service updates and notifications'
        ]
      },
      {
        subtitle: 'Business Operations',
        text: 'We may use your information for legitimate business purposes:',
        items: [
          'Develop new features and services',
          'Conduct research and analytics',
          'Prevent fraud and ensure security',
          'Comply with legal obligations',
          'Send marketing communications (with consent)'
        ]
      }
    ]
  },
  {
    title: 'Information Sharing',
    content: [
      {
        subtitle: 'Service Providers',
        text: 'We may share your information with trusted third-party service providers who assist us in:',
        items: [
          'Cloud hosting and infrastructure',
          'Payment processing and billing',
          'Customer support and communication',
          'Analytics and data processing',
          'Security and fraud prevention'
        ]
      },
      {
        subtitle: 'Legal Requirements',
        text: 'We may disclose your information when required by law or to protect our rights:',
        items: [
          'Comply with legal obligations',
          'Respond to lawful requests from authorities',
          'Protect against fraud or security threats',
          'Enforce our terms of service',
          'Protect the rights and safety of others'
        ]
      }
    ]
  },
  {
    title: 'Data Security',
    content: [
      {
        subtitle: 'Security Measures',
        text: 'We implement comprehensive security measures to protect your data:',
        items: [
          'Encryption of data in transit and at rest',
          'Regular security audits and assessments',
          'Access controls and authentication',
          'Secure data centers and infrastructure',
          'Employee training on data protection'
        ]
      },
      {
        subtitle: 'Data Retention',
        text: 'We retain your information only as long as necessary:',
        items: [
          'To provide our services',
          'To comply with legal obligations',
          'To resolve disputes and enforce agreements',
          'To improve our services',
          'As required by applicable laws'
        ]
      }
    ]
  },
  {
    title: 'Your Rights and Choices',
    content: [
      {
        subtitle: 'Access and Control',
        text: 'You have the right to access and control your personal information:',
        items: [
          'Access and review your personal data',
          'Correct inaccurate information',
          'Request deletion of your data',
          'Export your data in a portable format',
          'Object to certain processing activities'
        ]
      },
      {
        subtitle: 'Communication Preferences',
        text: 'You can control how we communicate with you:',
        items: [
          'Opt out of marketing communications',
          'Manage notification preferences',
          'Update contact information',
          'Request data processing restrictions',
          'Withdraw consent where applicable'
        ]
      }
    ]
  }
];

export default function PrivacyPage() {
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
              Privacy <span className="text-blue-600">Policy</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Your privacy is important to us. This policy explains how we collect, use, 
              and protect your information when you use Trans Bot AI.
            </p>
            <div className="text-sm text-gray-500">
              Last updated: January 15, 2024
            </div>
          </div>
        </section>

        {/* Policy Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                  <p className="text-gray-600 mb-4">
                    Trans Bot AI ("we," "our," or "us") is committed to protecting your privacy. 
                    This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                    information when you use our transportation management platform and related services.
                  </p>
                  <p className="text-gray-600">
                    By using our services, you agree to the collection and use of information in 
                    accordance with this policy. If you have any questions about this Privacy Policy, 
                    please contact us at privacy@transbot.ai.
                  </p>
                </div>

                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                    {section.content.map((content, contentIndex) => (
                      <div key={contentIndex} className="mb-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                          {content.subtitle}
                        </h3>
                        <p className="text-gray-600 mb-4">{content.text}</p>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                          {content.items.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">International Data Transfers</h2>
                  <p className="text-gray-600 mb-4">
                    Your information may be transferred to and processed in countries other than your 
                    own. We ensure that such transfers comply with applicable data protection laws and 
                    implement appropriate safeguards to protect your information.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                  <p className="text-gray-600">
                    Our services are not intended for children under the age of 16. We do not 
                    knowingly collect personal information from children under 16. If you believe 
                    we have collected information from a child under 16, please contact us immediately.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
                  <p className="text-gray-600 mb-4">
                    We may update this Privacy Policy from time to time. We will notify you of any 
                    changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                  </p>
                  <p className="text-gray-600">
                    We encourage you to review this Privacy Policy periodically for any changes. 
                    Your continued use of our services after any changes constitutes acceptance of the updated policy.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-2">
                      <div>
                        <strong>Email:</strong> privacy@transbot.ai
                      </div>
                      <div>
                        <strong>Phone:</strong> +1-555-123-4567
                      </div>
                      <div>
                        <strong>Address:</strong> 123 Innovation Drive, Tech Valley, CA 94000
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Compliance Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Commitment to Privacy</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Protection</h3>
                <p className="text-gray-600">
                  We implement industry-standard security measures to protect your data from unauthorized access, 
                  alteration, disclosure, or destruction.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">GDPR Compliance</h3>
                <p className="text-gray-600">
                  We comply with the General Data Protection Regulation (GDPR) and other applicable 
                  data protection laws to ensure your rights are protected.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Transparency</h3>
                <p className="text-gray-600">
                  We believe in transparency and are committed to being clear about how we collect, 
                  use, and protect your information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Privacy FAQ</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How do I exercise my privacy rights?
                </h3>
                <p className="text-gray-600">
                  You can exercise your privacy rights by contacting us at privacy@transbot.ai. 
                  We'll respond to your request within 30 days and help you access, correct, 
                  or delete your personal information.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Do you sell my personal information?
                </h3>
                <p className="text-gray-600">
                  No, we do not sell your personal information to third parties. We only share 
                  your information as described in this Privacy Policy and with your consent.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How long do you keep my data?
                </h3>
                <p className="text-gray-600">
                  We retain your personal information only as long as necessary to provide our 
                  services, comply with legal obligations, resolve disputes, and enforce agreements. 
                  Specific retention periods vary based on the type of data and its purpose.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What security measures do you have in place?
                </h3>
                <p className="text-gray-600">
                  We implement comprehensive security measures including encryption, access controls, 
                  regular security audits, and employee training. We also use secure data centers 
                  and follow industry best practices to protect your information.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
}
