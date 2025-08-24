interface Request {
  path: string;
}

interface Response {
  status: (code: number) => Response;
  json: (data: any) => void;
}

interface NextFunction {
  (): void;
}

interface ErrorWithStack extends Error {
  stack?: string;
}

export const errorHandler = (
  err: ErrorWithStack,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const details = process.env['NODE_ENV'] === "production" ? undefined : err?.stack;
  
  console.error('Error:', err.message, details);
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env['NODE_ENV'] === "production" ? 'Something went wrong' : err.message,
    ...(details && { details })
  });
};
