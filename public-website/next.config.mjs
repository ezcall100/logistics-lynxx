/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers configuration
  async headers() {
    return [{
      source: "/(.*)",
      headers: [
        { 
          key: "Strict-Transport-Security", 
          value: "max-age=31536000; includeSubDomains; preload" 
        },
        { 
          key: "X-Frame-Options", 
          value: "DENY" 
        },
        { 
          key: "X-Content-Type-Options", 
          value: "nosniff" 
        },
        { 
          key: "Referrer-Policy", 
          value: "strict-origin-when-cross-origin" 
        },
        { 
          key: "Permissions-Policy", 
          value: "camera=(), microphone=(), geolocation=()" 
        },
        { 
          key: "Content-Security-Policy",
          value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';" 
        }
      ]
    }];
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    APP_DASHBOARD_URL: process.env.APP_DASHBOARD_URL || 'https://app.transbotai.com',
    SENTRY_DSN: process.env.SENTRY_DSN,
  },

  // Image optimization
  images: {
    domains: ['transbotai.com', 'app.transbotai.com'],
    formats: ['image/webp', 'image/avif'],
  },

  // Performance optimizations
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/dashboard',
        destination: process.env.APP_DASHBOARD_URL || 'https://app.transbotai.com',
        permanent: true,
      },
      {
        source: '/app',
        destination: process.env.APP_DASHBOARD_URL || 'https://app.transbotai.com',
        permanent: true,
      },
    ];
  },

  // Rewrites for API proxy (if needed)
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/:path*`,
      },
    ];
  },
};

export default nextConfig;
