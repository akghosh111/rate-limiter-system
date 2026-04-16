import { Request, Response, NextFunction } from "express";
import { fixedWindow } from "../algorithms/fixedWindow";
import { getClientIp } from "../utils/getClientIp";

interface Options {
  limit: number;
  windowMs: number;
}

export function rateLimiter(options: Options) {
  const { limit, windowMs } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const ip = getClientIp(req);

    const result = fixedWindow(ip, limit, windowMs);

    res.setHeader("X-RateLimit-Limit", limit);
    res.setHeader("X-RateLimit-Remaining", result.remaining);
    res.setHeader("X-RateLimit-Reset", result.resetTime);

    if (!result.allowed) {
      return res.status(429).json({
        error: "Too many requests"
      });
    }

    next();
  };
}