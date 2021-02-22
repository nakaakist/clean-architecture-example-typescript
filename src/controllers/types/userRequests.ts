import { InvalidInputFormatValidationError } from '../errors';
import { Request } from './request';

export type CreateUserRequest = Request & {
  body: { name: string };
};

export function assertIsCreateUserRequest(
  request: Request
): asserts request is CreateUserRequest {
  if (!request.body.name) {
    throw new InvalidInputFormatValidationError('name is required');
  } else if (typeof request.body.name !== 'string') {
    throw new InvalidInputFormatValidationError('name must be string');
  }
}

export type ListAllUsersRequest = Request;

export type FindUserByIdRequest = Request & {
  params: { id: string };
};

export function assertIsFindUserByIdRequest(
  request: Request
): asserts request is FindUserByIdRequest {
  if (!request.params.id) {
    throw new InvalidInputFormatValidationError('id is required');
  } else if (typeof request.params.id !== 'string') {
    throw new InvalidInputFormatValidationError('id must be string');
  }
}

export type UpdateUserRequest = Request & {
  params: { id: string };
  body: { name: string };
};

export function assertIsUpdateUserRequest(
  request: Request
): asserts request is UpdateUserRequest {
  if (!request.params.id) {
    throw new InvalidInputFormatValidationError('id is required');
  } else if (typeof request.params.id !== 'string') {
    throw new InvalidInputFormatValidationError('id must be string');
  }

  if (!request.body.name) {
    throw new InvalidInputFormatValidationError('name is required');
  } else if (typeof request.body.name !== 'string') {
    throw new InvalidInputFormatValidationError('name must be string');
  }
}

export type DeleteUserRequest = Request & {
  params: { id: string };
};

export function assertIsDeleteUserRequest(
  request: Request
): asserts request is DeleteUserRequest {
  if (!request.params.id) {
    throw new InvalidInputFormatValidationError('id is required');
  } else if (typeof request.params.id !== 'string') {
    throw new InvalidInputFormatValidationError('id must be string');
  }
}
