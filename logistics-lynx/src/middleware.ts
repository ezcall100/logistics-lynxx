/* eslint-disable @typescript-eslint/no-explicit-any */
// Portal Decommission Middleware
// Returns 410 Gone for deprecated portal routes

const DEPRECATED_ROUTES = [
  '/carrier-admin',
  '/broker-admin',
  '/shipper-admin',
  '/carrier-dispatch'
];

export function middleware(request: Request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  // Check if the request is for a deprecated portal route
  for (const deprecatedRoute of DEPRECATED_ROUTES) {
    if (pathname.startsWith(deprecatedRoute)) {
      // Return 410 Gone with helpful message
      const canonicalRoute = getCanonicalRoute(deprecatedRoute);
      
      return new Response(
        JSON.stringify({
          error: 'portal_decommissioned',
          message: 'This portal has been decommissioned and consolidated into a canonical portal.',
          canonical_route: canonicalRoute,
          status: 410,
          timestamp: new Date().toISOString()
        }),
        {
          status: 410,
          headers: {
            'Content-Type': 'application/json',
            'X-Portal-Status': 'decommissioned',
            'X-Canonical-Route': canonicalRoute
          }
        }
      );
    }
  }

  // Continue with normal request processing
  return Response.next();
}

function getCanonicalRoute(deprecatedRoute: string): string {
  const routeMap: Record<string, string> = {
    '/carrier-admin': '/carrier',
    '/broker-admin': '/broker',
    '/shipper-admin': '/shipper',
    '/carrier-dispatch': '/load-board'
  };
  
  return routeMap[deprecatedRoute] || '/';
}

export const config = {
  matcher: [
    '/carrier-admin/:path*',
    '/broker-admin/:path*', 
    '/shipper-admin/:path*',
    '/carrier-dispatch/:path*'
  ]
};
