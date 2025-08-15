import { NextResponse } from 'next/server';

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Allow crawling of public pages
Allow: /about
Allow: /features
Allow: /pricing
Allow: /contact
Allow: /careers
Allow: /privacy
Allow: /terms
Allow: /support
Allow: /resources
Allow: /blog
Allow: /solutions
Allow: /testimonials
Allow: /case-studies
Allow: /events
Allow: /news
Allow: /partners
Allow: /integrations
Allow: /api-reference
Allow: /documentation
Allow: /help-center
Allow: /forum
Allow: /community
Allow: /compliance
Allow: /security
Allow: /status
Allow: /system-health
Allow: /live-monitoring

# Disallow sensitive areas
Disallow: /admin
Disallow: /super-admin
Disallow: /tms-admin
Disallow: /broker
Disallow: /shipper
Disallow: /carrier
Disallow: /driver
Disallow: /owner-operator
Disallow: /factoring
Disallow: /load-board
Disallow: /crm
Disallow: /financials
Disallow: /edi
Disallow: /marketplace
Disallow: /analytics
Disallow: /autonomous
Disallow: /workers
Disallow: /rates
Disallow: /directory
Disallow: /onboarding
Disallow: /api/
Disallow: /_next/
Disallow: /static/

# Sitemap
Sitemap: ${process.env.NEXT_PUBLIC_BASE_URL || 'https://transbot.ai'}/sitemap.xml

# Crawl-delay
Crawl-delay: 1`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
