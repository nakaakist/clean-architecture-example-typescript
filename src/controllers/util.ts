import {
  InvalidInputValidationError,
  NotFoundValidationError,
  ResourceConflictValidationError,
} from 'src/errors/validationErrors';

import { Response } from './types/response';

export function buildErrorResponse(error: Error): Response {
  if (error instanceof InvalidInputValidationError) {
    return errorResponse(error, 400);
  } else if (error instanceof NotFoundValidationError) {
    return errorResponse(error, 404);
  } else if (error instanceof ResourceConflictValidationError) {
    return errorResponse(error, 409);
  } else {
    return errorResponse(error, 500);
  }
}

const errorResponse = function (error: Error, status: number): Response {
  return {
    body: { message: error.message },
    status,
  };
};
