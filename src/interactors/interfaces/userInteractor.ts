import { ValidationError } from 'src/errors/validationErrors';
import { Result } from 'src/result';

import { CreateUserInputData, UpdateUserInputData } from '../types/userInputData';
import {
    CreateUserOutputData, FindUserByIdOutputData, ListAllUsersOutputData
} from '../types/userOutputData';

export interface UserInteractor {
  createUser(
    input: CreateUserInputData
  ): Promise<Result<CreateUserOutputData, ValidationError>>;
  listAllUsers(): Promise<Result<ListAllUsersOutputData, ValidationError>>;
  findUserById(
    id: string
  ): Promise<Result<FindUserByIdOutputData, ValidationError>>;
  updateUser(
    input: UpdateUserInputData
  ): Promise<Result<null, ValidationError>>;
  deleteUser(id: string): Promise<Result<null, ValidationError>>;
}
