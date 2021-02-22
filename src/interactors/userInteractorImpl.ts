import { UserDataAccess } from 'src/dataAccessInterfaces/userDataAccess';
import { UserValidator } from 'src/entities/interfaces/userValidator';
import { User } from 'src/entities/user';
import { ValidationError } from 'src/errors/validationErrors';
import { Failure, Result, Success } from 'src/result';
import { v4 as uuidv4 } from 'uuid';

import { UserWithIdNotFoundValidationError } from './errors';
import { UserInteractor } from './interfaces/userInteractor';
import { CreateUserInputData, UpdateUserInputData } from './types/userInputData';
import {
    CreateUserOutputData, FindUserByIdOutputData, ListAllUsersOutputData
} from './types/userOutputData';

export class UserInteractorImpl implements UserInteractor {
  private readonly dataAccess: UserDataAccess;
  private readonly validator: UserValidator;

  constructor(dataAccess: UserDataAccess, validator: UserValidator) {
    this.dataAccess = dataAccess;
    this.validator = validator;
  }

  public async createUser(
    input: CreateUserInputData
  ): Promise<Result<CreateUserOutputData, ValidationError>> {
    const id = uuidv4();
    const user = new User(id, input.name);

    const validResult = await user.validate(this.validator);
    if (validResult.isFailure()) {
      return new Failure(validResult.value);
    }

    await this.dataAccess.saveUser(user);
    return new Success({ id });
  }

  public async listAllUsers(): Promise<
    Result<ListAllUsersOutputData, ValidationError>
  > {
    const users = await this.dataAccess.listAllUsers();

    const formattedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
    }));
    return new Success(formattedUsers);
  }

  public async findUserById(
    id: string
  ): Promise<Result<FindUserByIdOutputData, ValidationError>> {
    const user = await this.dataAccess.findUserById(id);

    if (!user) {
      return new Failure(new UserWithIdNotFoundValidationError(id));
    }

    return new Success({ id: user.id, name: user.name });
  }

  public async updateUser(
    input: UpdateUserInputData
  ): Promise<Result<null, ValidationError>> {
    const user = await this.dataAccess.findUserById(input.id);

    if (!user) {
      return new Failure(new UserWithIdNotFoundValidationError(input.id));
    }

    user.name = input.name;
    const validResult = await user.validate(this.validator);
    if (validResult.isFailure()) {
      return new Failure(validResult.value);
    }

    await this.dataAccess.saveUser(user);
    return new Success(null);
  }

  public async deleteUser(id: string): Promise<Result<null, ValidationError>> {
    const user = await this.dataAccess.findUserById(id);

    if (!user) {
      return new Failure(new UserWithIdNotFoundValidationError(id));
    }

    await this.dataAccess.deleteUser(id);
    return new Success(null);
  }
}
