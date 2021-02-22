import { UserInteractor } from 'src/interactors/interfaces/userInteractor';

import { UserController } from './interfaces/userController';
import { Request } from './types/request';
import { Response } from './types/response';
import {
    assertIsCreateUserRequest, assertIsDeleteUserRequest, assertIsFindUserByIdRequest,
    assertIsUpdateUserRequest
} from './types/userRequests';
import { buildErrorResponse } from './util';

export class UserControllerImpl implements UserController {
  private readonly interactor: UserInteractor;

  constructor(interactor: UserInteractor) {
    this.interactor = interactor;
  }

  public async createUser(request: Request): Promise<Response> {
    try {
      assertIsCreateUserRequest(request);
    } catch (error) {
      return buildErrorResponse(error);
    }

    const result = await this.interactor.createUser({
      name: request.body.name,
    });

    if (result.isFailure()) {
      return buildErrorResponse(result.value);
    }
    return {
      body: result.value,
      status: 201,
    };
  }

  public async listAllUsers(request: Request): Promise<Response> {
    // no request assertion as no request parameters needed

    const result = await this.interactor.listAllUsers();

    if (result.isFailure()) {
      return buildErrorResponse(result.value);
    }
    return {
      body: result.value,
      status: 200,
    };
  }

  public async findUserById(request: Request): Promise<Response> {
    try {
      assertIsFindUserByIdRequest(request);
    } catch (error) {
      return buildErrorResponse(error);
    }

    const result = await this.interactor.findUserById(request.params.id);

    if (result.isFailure()) {
      return buildErrorResponse(result.value);
    }
    return {
      body: result.value,
      status: 200,
    };
  }

  public async updateUser(request: Request): Promise<Response> {
    try {
      assertIsUpdateUserRequest(request);
    } catch (error) {
      return buildErrorResponse(error);
    }

    const result = await this.interactor.updateUser({
      id: request.params.id,
      name: request.body.name,
    });

    if (result.isFailure()) {
      return buildErrorResponse(result.value);
    }
    return {
      body: {},
      status: 204,
    };
  }

  public async deleteUser(request: Request): Promise<Response> {
    try {
      assertIsDeleteUserRequest(request);
    } catch (error) {
      return buildErrorResponse(error);
    }

    const result = await this.interactor.deleteUser(request.params.id);

    if (result.isFailure()) {
      return buildErrorResponse(result.value);
    }
    return {
      body: {},
      status: 204,
    };
  }
}
