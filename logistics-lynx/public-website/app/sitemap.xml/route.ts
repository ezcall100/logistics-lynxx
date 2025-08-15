import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://transbot.ai';
  
  const websitePages = [
    '', // home
    '/about',
    '/features',
    '/pricing',
    '/contact',
    '/careers',
    '/privacy',
    '/terms',
    '/support',
    '/resources',
    '/blog',
    '/solutions',
    '/roi-calculator',
    '/demo-request',
    '/docs',
    '/partners',
    '/integrations',
    '/api-reference',
    '/documentation',
    '/testimonials',
    '/case-studies',
    '/downloads',
    '/events',
    '/news',
    '/compliance',
    '/security',
    '/help-center',
    '/forum',
    '/community',
    '/certification',
    '/training',
    '/migration',
    '/release-notes',
    '/updates',
    '/roadmap',
    '/development',
    '/research',
    '/innovation',
    '/scalability',
    '/status',
    '/system-health',
    '/live-monitoring',
    '/autonomous-dashboard',
    '/super-admin',
    '/admin',
    '/tms-admin',
    '/onboarding',
    '/broker',
    '/shipper',
    '/carrier',
    '/driver',
    '/owner-operator'
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${websitePages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
