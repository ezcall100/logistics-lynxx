import { Metadata } from 'next';
import { CTASection } from '../../components/CTASection';

export const metadata: Metadata = {
  title: 'Terms of Service - Trans Bot AI Legal Terms & Conditions',
  description: 'Read Trans Bot AI\'s terms of service covering usage rights, limitations, and legal agreements for our transportation management platform.',
  keywords: 'Trans Bot AI terms of service, legal terms, usage agreement, service conditions',
  openGraph: {
    title: 'Terms of Service - Trans Bot AI Legal Terms & Conditions',
    description: 'Read Trans Bot AI\'s terms of service covering usage rights, limitations, and legal agreements for our transportation management platform.',
    type: 'website',
    url: 'https://transbot.ai/terms',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - Trans Bot AI Legal Terms & Conditions',
    description: 'Read Trans Bot AI\'s terms of service covering usage rights, limitations, and legal agreements for our transportation management platform.',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Terms of Service",
  "description": "Trans Bot AI Terms of Service",
  "publisher": {
    "@type": "Organization",
    "name": "Trans Bot AI"
  },
  "dateModified": "2024-01-15"
};

const sections = [
  {
    title: 'Acceptance of Terms',
    content: [
      {
        text: 'By accessing and using Trans Bot AI\'s transportation management platform and related services ("Services"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, you must not use our Services.',
        items: []
      },
      {
        text: 'These Terms apply to all users of our Services, including but not limited to:',
        items: [
          'Freight brokers and logistics providers',
          'Carriers and transportation companies',
          'Shippers and cargo owners',
          'Authorized users and administrators',
          'Third-party integrators and developers'
        ]
      }
    ]
  },
  {
    title: 'Service Description',
    content: [
      {
        text: 'Trans Bot AI provides an autonomous transportation management system that includes:',
        items: [
          'AI-powered route optimization and planning',
          'Real-time tracking and monitoring capabilities',
          'Load matching and freight management tools',
          'Analytics and reporting features',
          'API access and integration services',
          'Mobile applications and web interfaces'
        ]
      },
      {
        text: 'Our Services are designed to improve transportation efficiency, reduce costs, and enhance operational visibility for businesses in the logistics and transportation industry.',
        items: []
      }
    ]
  },
  {
    title: 'User Accounts and Registration',
    content: [
      {
        text: 'To access our Services, you must create an account and provide accurate, complete, and current information. You are responsible for:',
        items: [
          'Maintaining the confidentiality of your account credentials',
          'All activities that occur under your account',
          'Notifying us immediately of any unauthorized use',
          'Ensuring your account information remains accurate',
          'Complying with all applicable laws and regulations'
        ]
      },
      {
        text: 'You may not share your account credentials with others or allow unauthorized access to your account. We reserve the right to suspend or terminate accounts that violate these Terms.',
        items: []
      }
    ]
  },
  {
    title: 'Acceptable Use Policy',
    content: [
      {
        text: 'You agree to use our Services only for lawful purposes and in accordance with these Terms. You may not:',
        items: [
          'Use the Services for any illegal or unauthorized purpose',
          'Attempt to gain unauthorized access to our systems',
          'Interfere with or disrupt the Services or servers',
          'Transmit viruses, malware, or other harmful code',
          'Violate any applicable laws or regulations',
          'Infringe on the rights of others'
        ]
      },
      {
        text: 'We reserve the right to investigate and take appropriate action against any violations of this policy, including suspending or terminating access to our Services.',
        items: []
      }
    ]
  },
  {
    title: 'Intellectual Property Rights',
    content: [
      {
        text: 'Our Services and all content, features, and functionality are owned by Trans Bot AI and are protected by intellectual property laws. This includes:',
        items: [
          'Software, algorithms, and proprietary technology',
          'User interfaces and design elements',
          'Documentation and training materials',
          'Trademarks, service marks, and logos',
          'Patents and trade secrets'
        ]
      },
      {
        text: 'You may not copy, modify, distribute, sell, or lease any part of our Services without our express written consent. You retain ownership of any content you submit to our Services.',
        items: []
      }
    ]
  },
  {
    title: 'Payment Terms',
    content: [
      {
        text: 'Our Services are provided on a subscription basis with the following payment terms:',
        items: [
          'Fees are billed in advance on a monthly or annual basis',
          'All fees are non-refundable except as required by law',
          'We may change our pricing with 30 days notice',
          'Late payments may result in service suspension',
          'Taxes are additional and your responsibility'
        ]
      },
      {
        text: 'You authorize us to charge your payment method for all fees associated with your subscription. You are responsible for maintaining valid payment information.',
        items: []
      }
    ]
  },
  {
    title: 'Data and Privacy',
    content: [
      {
        text: 'We collect, use, and protect your data in accordance with our Privacy Policy. By using our Services, you agree to:',
        items: [
          'Our collection and use of your data as described',
          'The transfer of data to our servers and service providers',
          'Our use of data to improve and optimize our Services',
          'Compliance with applicable data protection laws',
          'Our data retention and deletion policies'
        ]
      },
      {
        text: 'You are responsible for ensuring you have the right to share any data you provide to us and for complying with applicable privacy laws.',
        items: []
      }
    ]
  },
  {
    title: 'Service Availability and Support',
    content: [
      {
        text: 'We strive to provide reliable and continuous service, but we do not guarantee:',
        items: [
          'Uninterrupted or error-free operation',
          'Specific response times or availability levels',
          'Compatibility with all devices or systems',
          'Support for all third-party integrations',
          'Backward compatibility with older versions'
        ]
      },
      {
        text: 'We provide support during business hours and may offer premium support options. We are not responsible for any losses resulting from service interruptions.',
        items: []
      }
    ]
  },
  {
    title: 'Limitation of Liability',
    content: [
      {
        text: 'To the maximum extent permitted by law, Trans Bot AI shall not be liable for:',
        items: [
          'Indirect, incidental, or consequential damages',
          'Loss of profits, revenue, or business opportunities',
          'Data loss or corruption',
          'Service interruptions or downtime',
          'Third-party actions or content'
        ]
      },
      {
        text: 'Our total liability shall not exceed the amount paid by you for our Services in the 12 months preceding the claim. Some jurisdictions do not allow liability limitations, so these may not apply to you.',
        items: []
      }
    ]
  },
  {
    title: 'Indemnification',
    content: [
      {
        text: 'You agree to indemnify and hold harmless Trans Bot AI from any claims, damages, or expenses arising from:',
        items: [
          'Your use of our Services',
          'Your violation of these Terms',
          'Your violation of any third-party rights',
          'Your violation of applicable laws',
          'Any content you submit to our Services'
        ]
      },
      {
        text: 'We reserve the right to assume the exclusive defense and control of any matter subject to indemnification, and you agree to cooperate with our defense.',
        items: []
      }
    ]
  },
  {
    title: 'Termination',
    content: [
      {
        text: 'Either party may terminate these Terms at any time:',
        items: [
          'You may cancel your subscription at any time',
          'We may terminate for violation of these Terms',
          'We may discontinue Services with reasonable notice',
          'Termination does not affect accrued obligations',
          'Surviving provisions remain in effect'
        ]
      },
      {
        text: 'Upon termination, your access to our Services will cease, and we may delete your data in accordance with our data retention policies.',
        items: []
      }
    ]
  }
];

export default function TermsPage() {
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
              Terms of <span className="text-blue-600">Service</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Please read these terms carefully before using Trans Bot AI. These terms govern 
              your use of our transportation management platform and services.
            </p>
            <div className="text-sm text-gray-500">
              Last updated: January 15, 2024
            </div>
          </div>
        </section>

        {/* Terms Content */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                  <p className="text-gray-600 mb-4">
                    These Terms of Service ("Terms") govern your use of Trans Bot AI's transportation 
                    management platform and related services. By accessing or using our Services, you 
                    agree to be bound by these Terms and our Privacy Policy.
                  </p>
                  <p className="text-gray-600">
                    If you are using our Services on behalf of an organization, you represent that 
                    you have the authority to bind that organization to these Terms.
                  </p>
                </div>

                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex} className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.title}</h2>
                    {section.content.map((content, contentIndex) => (
                      <div key={contentIndex} className="mb-6">
                        <p className="text-gray-600 mb-4">{content.text}</p>
                        {content.items.length > 0 && (
                          <ul className="list-disc list-inside space-y-2 text-gray-600">
                            {content.items.map((item, itemIndex) => (
                              <li key={itemIndex}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                ))}

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
                  <p className="text-gray-600 mb-4">
                    These Terms shall be governed by and construed in accordance with the laws of 
                    the State of California, without regard to its conflict of law provisions.
                  </p>
                  <p className="text-gray-600">
                    Any disputes arising from these Terms or your use of our Services shall be 
                    resolved in the courts of Santa Clara County, California.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Severability</h2>
                  <p className="text-gray-600">
                    If any provision of these Terms is found to be unenforceable or invalid, 
                    that provision will be limited or eliminated to the minimum extent necessary 
                    so that these Terms will otherwise remain in full force and effect.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Entire Agreement</h2>
                  <p className="text-gray-600">
                    These Terms, together with our Privacy Policy, constitute the entire agreement 
                    between you and Trans Bot AI regarding your use of our Services. These Terms 
                    supersede all prior agreements and understandings, whether written or oral.
                  </p>
                </div>

                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                  <p className="text-gray-600 mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="space-y-2">
                      <div>
                        <strong>Email:</strong> legal@transbot.ai
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

        {/* Key Points Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Terms Summary</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Your Responsibilities</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Provide accurate account information</li>
                  <li>• Maintain account security</li>
                  <li>• Use Services for lawful purposes only</li>
                  <li>• Comply with applicable laws</li>
                  <li>• Pay fees on time</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Commitments</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Provide reliable Services</li>
                  <li>• Protect your data and privacy</li>
                  <li>• Provide customer support</li>
                  <li>• Maintain security standards</li>
                  <li>• Give notice of changes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I cancel my subscription at any time?
                </h3>
                <p className="text-gray-600">
                  Yes, you can cancel your subscription at any time through your account settings. 
                  Your access will continue until the end of your current billing period.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What happens to my data if I cancel?
                </h3>
                <p className="text-gray-600">
                  We retain your data for a limited period after cancellation as described in our 
                  Privacy Policy. You can request data deletion by contacting our support team.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Can I use Trans Bot AI for multiple companies?
                </h3>
                <p className="text-gray-600">
                  Each company should have its own account. Sharing accounts between different 
                  organizations is not permitted under our Terms of Service.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  What if I disagree with changes to the Terms?
                </h3>
                <p className="text-gray-600">
                  If you disagree with any changes to these Terms, you may cancel your subscription 
                  within 30 days of the change. Continued use after 30 days constitutes acceptance.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Are there any usage limits?
                </h3>
                <p className="text-gray-600">
                  Usage limits depend on your subscription plan. We may implement reasonable 
                  limits to ensure fair use and system performance for all users.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  How do you handle service outages?
                </h3>
                <p className="text-gray-600">
                  We strive to minimize service interruptions and provide advance notice when 
                  possible. We are not liable for losses resulting from service outages, but 
                  we work to resolve issues quickly.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Legal Notice */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Legal Notice</h2>
            <p className="text-gray-600 mb-6">
              These Terms of Service are a legally binding agreement between you and Trans Bot AI. 
              By using our Services, you acknowledge that you have read, understood, and agree to 
              be bound by these Terms.
            </p>
            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-blue-800 font-medium">
                If you have any questions about these Terms or need legal clarification, 
                please contact our legal team at legal@transbot.ai
              </p>
            </div>
          </div>
        </section>

        <CTASection />
      </div>
    </>
  );
}
