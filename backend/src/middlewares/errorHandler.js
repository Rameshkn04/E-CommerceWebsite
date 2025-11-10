import { env } from '../config/env.js';
import { ApiError } from '../utils/ApiError.js';

export const notFoundHandler = (req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
};

export const errorHandler = (err, req, res, _next) => {
  const statusCode = err instanceof ApiError ? err.statusCode : 500;

  const response = {
    message: err.message || 'Unexpected error occurred'
  };

  if (err.details) {
    response.details = err.details;
  }

  if (env.nodeEnv !== 'production') {
    response.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

