import type { Request, Response, NextFunction } from 'express';

const rateLimitStore = new Map<string, { count: number; startTime: number }>();

const WINDOW_MS = 1 * 60 * 1000; // 1 menit
const MAX_REQUESTS = 60;

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
  const ip = req.headers['x-forwarded-for']?.toString() || req.socket.remoteAddress || 'unknown';
  
  const currentTime = Date.now();

  const record = rateLimitStore.get(ip);

  if (!record) {
    rateLimitStore.set(ip, { count: 1, startTime: currentTime });
    return next();
  }

  const elapsedTime = currentTime - record.startTime;

  if (elapsedTime > WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, startTime: currentTime });
    return next();
  }

  if (record.count >= MAX_REQUESTS) {
    res.setHeader('Retry-After', Math.ceil((WINDOW_MS - elapsedTime) / 1000));
    return res.status(429).json({ message: 'Too many requests, please try again later.' });
  }

  rateLimitStore.set(ip, { count: record.count + 1, startTime: record.startTime });
  return next();
};
