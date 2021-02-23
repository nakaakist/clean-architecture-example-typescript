import { ValidationError } from 'src/errors/validationErrors';
import { Failure, Result, Success } from 'src/result';

import { UserNameEmptyValidationError, UserNameNotUniqueValidationError } from './errors';
import { UserValidator } from './interfaces/userValidator';

export class User {
  private _id: string;
  private _name: string;

  public get id(): string {
    return this._id;
  }

  public set id(id: string) {
    this._id = id;
  }

  public get name(): string {
    return this._name;
  }

  public set name(name: string) {
    this._name = name;
  }

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
  }

  public async validate(
    validator: UserValidator
  ): Promise<Result<null, ValidationError>> {
    if (!validator.isNameNotEmpty(this._name)) {
      return new Failure(new UserNameEmptyValidationError());
    }
    if (!(await validator.isNameUnique(this._name))) {
      return new Failure(new UserNameNotUniqueValidationError(this._name));
    }

    return new Success(null);
  }
}
