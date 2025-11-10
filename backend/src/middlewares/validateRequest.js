import { validationResult } from 'express-validator';
import { ApiError } from '../utils/ApiError.js';

export const validateRequest = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const details = errors.array().map((error) => ({
      field: error.param,
      message: error.msg
    }));

    return next(new ApiError(422, 'Validation failed', details));
  }

  return next();
};

