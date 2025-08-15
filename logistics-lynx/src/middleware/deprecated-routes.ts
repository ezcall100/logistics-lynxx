// Middleware for deprecated routes
export const handleDeprecatedRoute = (req, res) => {
  const deprecatedRoutes = {
    '/carrier-admin': '/carrier',
    '/broker-admin': '/broker',
    '/shipper-admin': '/shipper',
    '/carrier-dispatch': '/load-board'
  };

  const canonicalPath = deprecatedRoutes[req.path];
  
  if (canonicalPath) {
    return res.status(410).json({
      error: 'Route decommissioned',
      canonicalPath,
      message: 'This route has been moved. Please use the canonical path.',
      timestamp: new Date().toISOString()
    });
  }

  return null;
};