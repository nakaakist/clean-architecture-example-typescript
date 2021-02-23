import { buildErrorResponse } from 'src/controllers/util';
import { UserNameNotUniqueValidationError } from 'src/entities/errors';
import { UserWithIdNotFoundValidationError } from 'src/interactors/errors';

describe('user controller util', () => {
  test('returns 404 error response for not found error', () => {
    const error = new UserWithIdNotFoundValidationError('1');
    expect(buildErrorResponse(error).status).toEqual(404);
  });

  test('returns 409 error response for resource conflict error', () => {
    const error = new UserNameNotUniqueValidationError('name');
    expect(buildErrorResponse(error).status).toEqual(409);
  });
});
