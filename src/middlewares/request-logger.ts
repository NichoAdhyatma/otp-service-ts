import type { Request, Response, NextFunction } from 'express';
import chalk from 'chalk';
import { logger } from '../utils/logger';


export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const originalJson = res.json;

  res.json = function (body: any): Response {
    res.locals.responseData = body;
    return originalJson.call(this, body);
  };

  res.on('finish', () => {
    const duration = Date.now() - start;

    const statusColor = res.statusCode >= 500
      ? chalk.red
      : res.statusCode >= 400
      ? chalk.yellow
      : chalk.green;

    const logLevel =
      res.statusCode >= 500
        ? 'error'
        : res.statusCode >= 400
        ? 'warn'
        : 'info';

    const logHeader = `${chalk.cyan(req.method)} ${req.originalUrl} → ${statusColor(res.statusCode)} (${duration}ms)`;

    const headers = JSON.stringify(req.headers, null, 2);
    const body = req.body && Object.keys(req.body).length ? JSON.stringify(req.body, null, 2) : '{}';
    const response = res.locals.responseData
      ? JSON.stringify(res.locals.responseData, null, 2)
      : '{}';

    const logMessage = [
      logHeader,
      `├─ Headers: ${headers}`,
      `├─ Request Body: ${body}`,
      `└─ Response: ${response}`,
    ].join('\n');

    logger.log({
      level: logLevel,
      message: logMessage,
    });
  });

  next();
};
