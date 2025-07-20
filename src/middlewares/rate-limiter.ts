import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 15 menit
  max: 60, // maksimum 100 request per IP per windowMs
  message: { message: 'Too many requests, please try again later.' },
  standardHeaders: true, // return info di RateLimit-* headers
  legacyHeaders: false,  // disable X-RateLimit-* headers
});