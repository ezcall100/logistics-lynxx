import type { Request, Response, NextFunction } from "express";

export function apiErrorHandler(err: Error & { status?: number; code?: string }, _req: Request, res: Response, _next: NextFunction) {
  const status = Number(err?.status || 500);
  const code = String(err?.code || "internal_error");
  const msg = err?.message || "Unexpected error";
  const details = process.env.NODE_ENV === "production" ? undefined : err?.stack;

  res.status(status).json({ ok: false, code, message: msg, details });
}
