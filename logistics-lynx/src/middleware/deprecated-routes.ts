interface Request {
  path: string;
}

interface Response {
  redirect: (path: string) => void;
}

const deprecatedRoutes: Record<string, string> = {
  '/carrier-admin': '/admin/carrier',
  '/broker-admin': '/admin/broker', 
  '/shipper-admin': '/admin/shipper',
  '/carrier-dispatch': '/dispatch/carrier'
};

export const handleDeprecatedRoute = (req: Request, res: Response) => {
  const canonicalPath = deprecatedRoutes[req.path];
  
  if (canonicalPath) {
    res.redirect(canonicalPath);
    return true;
  }
  
  return false;
};