import type { Request, Response, NextFunction } from "express";

interface ErrorWithStack extends Error {
  stack?: string;
}

export const errorHandler = (
  err: ErrorWithStack,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const details = process.env['NODE_ENV'] === "production" ? undefined : err?.stack;
  
  console.error('Error:', err.message, details);
  
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env['NODE_ENV'] === "production" ? 'Something went wrong' : err.message,
    ...(details && { details })
  });
};
